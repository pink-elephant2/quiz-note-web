import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizAudioComponent } from './quiz-audio.component';

describe('QuizAudioComponent', () => {
  let component: QuizAudioComponent;
  let fixture: ComponentFixture<QuizAudioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizAudioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizAudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
