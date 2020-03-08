import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

import { Quiz } from 'shared/service/quiz';
import { TimerService } from 'shared/service/timer';

/**
 * 録音モーダル
 */
@Component({
  selector: 'app-quiz-audio',
  templateUrl: './quiz-audio.component.html',
  styleUrls: ['./quiz-audio.component.scss']
})
export class QuizAudioComponent implements OnInit, OnChanges {

  /** クイズ情報 */
  @Input() quiz: Quiz;

  // audio data
  audioData = [];
  bufferSize = 1024;
  audio_sample_rate = null;
  localMediaStream;
  scriptProcessor;

  @Output() onRecord: EventEmitter<Blob> = new EventEmitter<Blob>();

  /** 残り時間 */
  time = 0;

  /** タイマー */
  timer: Subscription;

  constructor(
    private sanitizer: DomSanitizer,
    private timerService: TimerService
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // 持ち時間設定
    this.time = this.timerService.timeLimit;
  }

  /**
   * 残り時間表記
   */
  get timeStr(): string {
    const h = Math.floor(this.time / 60 / 60);
    const m = Math.floor(this.time / 60 % 60);
    const s = Math.floor(this.time % 60);

    if (h >= 1) {
      return `0${h}`.slice(-2) + ':' + `0${m}`.slice(-2) + ':' + `0${s}`.slice(-2);
    } else {
      return `0${m}`.slice(-2) + ':' + `0${s}`.slice(-2);
    }
  }

  /**
   * 録音を開始する
   */
  startRecord(): void {
    // 音声データ初期化
    this.audioData = [];
    this.quiz.soundUrl = undefined;
    // 持ち時間設定
    this.time = this.timerService.timeLimit;

    // 録音イベント
    navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then((stream) => {
      // カウントダウン
      this.timer = this.timerService.getTimer().subscribe(time => {
        this.time--;

        // 終了
        if (this.time <= 0) {
          this.stopRecord();
        }
      });

      this.localMediaStream = stream;

      const audioContext = new AudioContext();
      this.audio_sample_rate = audioContext.sampleRate;

      this.scriptProcessor = audioContext.createScriptProcessor(this.bufferSize, 1, 1);
      const mediastreamsource = audioContext.createMediaStreamSource(stream);
      mediastreamsource.connect(this.scriptProcessor);
      this.scriptProcessor.onaudioprocess = (e) => {
        console.debug('e', e);
        const input = e.inputBuffer.getChannelData(0);
        let bufferData = new Float32Array(this.bufferSize);
        for (let i = 0; i < this.bufferSize; i++) {
          bufferData[i] = input[i];
        }
        this.audioData.push(bufferData);
      };
      this.scriptProcessor.connect(audioContext.destination);
    });
  }

  /**
   * 録音を停止する
   */
  stopRecord(): void {
    this.timer.unsubscribe();

    this.localMediaStream.getTracks().forEach(track => track.stop());
    this.scriptProcessor.disconnect();
    this.saveWAV();
  }

  /**
   * 音声保存処理
   */
  saveWAV() {
    const audioBlob = this.exportWAV(this.audioData);
    this.onRecord.emit(audioBlob);

    let myURL = window.URL || window['webkitURL'];
    let url = myURL.createObjectURL(audioBlob);

    // オーディオに設定
    this.quiz.soundUrl = url;
  }

  /**
   * サニタイズ
   */
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  /**
   * WAVに変換し、Blobを返却する
   */
  exportWAV(audioData): Blob {

    let encodeWAV = function (samples, sampleRate) {
      let buffer = new ArrayBuffer(44 + samples.length * 2);
      let view = new DataView(buffer);

      let writeString = function (view, offset, string) {
        for (let i = 0; i < string.length; i++) {
          view.setUint8(offset + i, string.charCodeAt(i));
        }
      };

      let floatTo16BitPCM = function (output, offset, input) {
        for (let i = 0; i < input.length; i++ , offset += 2) {
          let s = Math.max(-1, Math.min(1, input[i]));
          output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
        }
      };

      writeString(view, 0, 'RIFF');  // RIFFヘッダ
      view.setUint32(4, 32 + samples.length * 2, true); // これ以降のファイルサイズ
      writeString(view, 8, 'WAVE'); // WAVEヘッダ
      writeString(view, 12, 'fmt '); // fmtチャンク
      view.setUint32(16, 16, true); // fmtチャンクのバイト数
      view.setUint16(20, 1, true); // フォーマットID
      view.setUint16(22, 1, true); // チャンネル数
      view.setUint32(24, sampleRate, true); // サンプリングレート
      view.setUint32(28, sampleRate * 2, true); // データ速度
      view.setUint16(32, 2, true); // ブロックサイズ
      view.setUint16(34, 16, true); // サンプルあたりのビット数
      writeString(view, 36, 'data'); // dataチャンク
      view.setUint32(40, samples.length * 2, true); // 波形データのバイト数
      floatTo16BitPCM(view, 44, samples); // 波形データ

      return view;
    };

    let mergeBuffers = function (audioData) {
      let sampleLength = 0;
      for (let i = 0; i < audioData.length; i++) {
        sampleLength += audioData[i].length;
      }
      let samples = new Float32Array(sampleLength);
      let sampleIdx = 0;
      for (let i = 0; i < audioData.length; i++) {
        for (let j = 0; j < audioData[i].length; j++) {
          samples[sampleIdx] = audioData[i][j];
          sampleIdx++;
        }
      }
      return samples;
    };

    let dataview = encodeWAV(mergeBuffers(audioData), this.audio_sample_rate);
    let audioBlob = new Blob([dataview], { type: 'audio/wav' });
    return audioBlob;
  }
}
