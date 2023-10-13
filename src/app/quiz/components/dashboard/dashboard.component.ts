import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [],
})
export class DashboardComponent implements OnInit {
  constructor(private quizService: QuizService) {}
  ngOnInit(): void {
    this.quizService.userAnswers = []; //* remember userAnswers contains array of chosen answers!
    this.quizService.questions = []; //* to clear questions array (so new questions can be fetched by api again)
    this.quizService.questionIndex = 0;
  }
}
