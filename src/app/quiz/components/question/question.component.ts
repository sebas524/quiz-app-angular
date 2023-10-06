import { Component, OnInit } from '@angular/core';
import { Answer } from '../../interfaces/answer.interface';
import { QuizService } from '../../services/quiz.service';
import { Question } from '../../interfaces/question.interface';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styles: [],
})
export class QuestionComponent implements OnInit {
  // ! attributes
  listOfQuestions: Question[] | undefined;
  // ! constructor
  constructor(private quizService: QuizService) {}
  // ! methods
  ngOnInit(): void {
    this.listOfQuestions = this.quizService.getQuestions();
    console.log('xxx: ', this.listOfQuestions);
  }
  getQuestion() {
    return this.listOfQuestions![this.getIndex()].description;
  }
  getIndex(): number {
    return this.quizService.currentQuestion;
  }

  getBtnStatus(): boolean {
    return this.quizService.btnStatus;
  }

  setChosenAnswer(answer: Answer) {
    this.quizService.chosenAnswer = answer;
    this.quizService.btnStatus = true;
  }
  getChosenAnwer() {
    return this.quizService.chosenAnswer;
  }

  highlightChosenAnswer(answer: Answer) {
    if (answer === this.quizService.chosenAnswer) {
      return;
    }
  }
}
