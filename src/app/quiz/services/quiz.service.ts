import { Injectable } from '@angular/core';
import { Question } from '../interfaces/question.interface';
import { Answer } from '../interfaces/answer.interface';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  // public questions: Question[] = [
  //   new Question('what is the capital of colombia?', [
  //     new Answer('cali', 0),
  //     new Answer('bogota', 1),
  //     new Answer('medellin', 0),
  //     new Answer('barranquilla', 0),
  //   ]),
  //   new Question('what is the capital of germany?', [
  //     new Answer('berlin', 1),
  //     new Answer('stuttgart', 0),
  //     new Answer('potsdam', 0),
  //     new Answer('munich', 0),
  //   ]),
  // ];

  public questions: Question[] = [];

  constructor(private apiService: ApiService) {
    this.apiService.fetchApiQuestions().subscribe((fetchedQuestions) => {
      this.questions = fetchedQuestions; // Set the fetched questions in the service
    });
  }

  questionIndex: number = 0;
  chosenAnswer: Answer | undefined;
  btnStatus: boolean = true;
  acceptClicked: boolean = false;
  answerIndex: number = 0;
  userAnswers: Array<number> = []; //* remember userAnswers contains array of chosen answers!

  getQuestions(): Observable<Question[]> {
    return new Observable((observer) => {
      if (this.questions.length > 0) {
        observer.next(this.questions);
        observer.complete();
      } else {
        this.apiService.fetchApiQuestions().subscribe((fetchedQuestions) => {
          this.questions = fetchedQuestions;
          observer.next(this.questions);
          observer.complete();
        });
      }
    });
  }
}
