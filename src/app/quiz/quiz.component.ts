import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const options = {
      placeholder: 'タグを入力'
    };
    const elems = document.querySelectorAll('.chips');
    const instances = window['M'].Chips.init(elems, options);
  }

}
