import { Injectable } from '@angular/core';
import { Question } from '../interfaces/question.interface';
import { Answer } from '../interfaces/answer.interface';

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

  public questions: Question[] = [
    {
      description: 'what is the capital of colombia?',
      answers: [
        { name: 'cali', isRight: 0 },
        { name: 'bogota', isRight: 1 },
        { name: 'medellin', isRight: 0 },
        { name: 'barranquilla', isRight: 0 },
      ],
    },
    {
      description: 'what is the capital of germany?',
      answers: [
        { name: 'berlin', isRight: 1 },
        { name: 'stuttgart', isRight: 0 },
        { name: 'potsdam', isRight: 0 },
        { name: 'munich', isRight: 0 },
      ],
    },
  ];

  questionIndex: number = 0;
  chosenAnswer: Answer | undefined;
  btnStatus: boolean = true;
  acceptClicked: boolean = false;
  answerIndex: number = 0;
  userAnswers: Array<number> = []; //* remember userAnswers contains array of chosen answers!

  constructor() {}

  getQuestions() {
    const questions = [...this.questions];
    return questions;
  }
}
