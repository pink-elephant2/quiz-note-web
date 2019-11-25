import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.scss']
})
export class QuizCardComponent implements OnInit {

  @Input() quiz;

  constructor() { }

  ngOnInit() {
  }

}
