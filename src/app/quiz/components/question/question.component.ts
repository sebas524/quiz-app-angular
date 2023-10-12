import { Component, OnDestroy, OnInit } from '@angular/core';
import { Answer } from '../../interfaces/answer.interface';
import { QuizService } from '../../services/quiz.service';
import { Question } from '../../interfaces/question.interface';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styles: [],
})
export class QuestionComponent implements OnInit, OnDestroy {
  // ! attributes
  listOfQuestions: Question[] | undefined;
  btnString: string = 'Accept';
  loading: boolean = true; // Add loading flag

  // ! constructor
  constructor(private quizService: QuizService, private router: Router) {}
  // ! methods

  private questionsSubscription: Subscription | undefined;

  ngOnInit(): void {
    this.questionsSubscription = this.quizService
      .getQuestions()
      .subscribe((questions) => {
        this.listOfQuestions = questions;
        this.loading = false; // Set loading to false when data is available

        console.log('xxx: ', this.listOfQuestions);
      });
  }
  ngOnDestroy(): void {
    if (this.questionsSubscription) {
      this.questionsSubscription.unsubscribe();
    }
  }

  getQuestion() {
    return this.listOfQuestions![this.getIndex()].description;
  }

  getIndex(): number {
    // * remember, getIndex is in html side in li (this determines the question being shown)
    return this.quizService.questionIndex;
  }

  getBtnStatus(): boolean {
    return this.quizService.btnStatus;
  }

  setChosenAnswer(answer: Answer, index: number) {
    if (this.quizService.acceptClicked === true) {
      return;
    }
    this.quizService.chosenAnswer = answer;
    this.quizService.btnStatus = false;
    this.quizService.answerIndex = index;
  }
  getChosenAnwer() {
    return this.quizService.chosenAnswer;
  }

  getAcceptClicked() {
    return this.quizService.acceptClicked;
  }

  next() {
    console.log('question index', this.getIndex());
    console.log('user answers', this.quizService.userAnswers);

    switch (this.btnString) {
      case 'Accept': {
        this.quizService.acceptClicked = true;
        this.btnString = 'Next';
        if (
          this.quizService.questions.length - 1 ===
          this.quizService.questionIndex
        ) {
          this.btnString = 'Results';
        }
        break;
      }
      // * here you move on to next question:
      case 'Next': {
        this.quizService.questionIndex++;
        this.quizService.userAnswers.push(this.quizService.answerIndex);
        this.quizService.btnStatus = true;
        this.quizService.acceptClicked = false;
        this.btnString = 'Accept';
        break;
      }
      case 'Results': {
        this.quizService.userAnswers.push(this.quizService.answerIndex);
        this.quizService.chosenAnswer = undefined;
        this.quizService.acceptClicked = false;
        this.quizService.questionIndex = 0;
        this.router.navigateByUrl('/quiz/results');
      }
    }
  }
}
