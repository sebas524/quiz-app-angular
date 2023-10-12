import { Component, OnInit } from '@angular/core';
import { Question } from '../../interfaces/question.interface';
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
  correctQuestionsCount: number = 0;

  constructor(private quizService: QuizService, private router: Router) {}

  ngOnInit(): void {
    this.listOfQuestions = this.quizService.questions;
    this.userAnswers = this.quizService.userAnswers;
    // Calculate the number of correct questions
    this.correctQuestionsCount = this.calculateCorrectQuestions();
  }
  goBack(): void {
    this.quizService.userAnswers = []; //* remember userAnswers contains array of chosen answers!
    this.quizService.questions = []; //* to clear questions array (so new questions can be fetched by api again)

    this.router.navigateByUrl('/quiz');
  }

  calculateCorrectQuestions(): number {
    let count = 0;
    if (this.listOfQuestions && this.userAnswers) {
      for (let i = 0; i < this.listOfQuestions.length; i++) {
        const question = this.listOfQuestions[i];
        if (
          question.answers[this.userAnswers[i]] &&
          question.answers[this.userAnswers[i]].isRight === 1
        ) {
          count++;
        }
      }
    }
    return count;
  }
}
