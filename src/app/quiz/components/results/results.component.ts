import { Component, OnInit } from '@angular/core';
import { Question } from '../../interfaces/question.interface';
import { Answer } from '../../interfaces/answer.interface';
import { QuizService } from '../../services/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styles: [],
})
export class ResultsComponent implements OnInit {
  listOfQuestions: Question[] | undefined;
  userAnswers: Array<number> | undefined;
  constructor(private quizService: QuizService, private router: Router) {}

  ngOnInit(): void {
    this.listOfQuestions = this.quizService.questions;
    this.userAnswers = this.quizService.userAnswers;
  }
  goBack(): void {
    this.quizService.userAnswers = []; //* remember userAnswers contains array of chosen answers!
    this.router.navigateByUrl('/quiz');
  }
}
