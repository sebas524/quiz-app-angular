// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, map } from 'rxjs';
// import { environments } from 'src/app/environments/environments';
// import { OpenTriviaDB, Result } from '../interfaces/openTriviaDb.interface';

// @Injectable({
//   providedIn: 'root',
// })
// export class ApiService {
//   private baseUrl: string = environments.baseUrl;

//   constructor(private http: HttpClient) {}

//   getQuestions(): Observable<Result[]> {
//     return this.http
//       .get<OpenTriviaDB>(
//         `${this.baseUrl}?amount=10&difficulty=easy&type=multiple`
//       )
//       .pipe(
//         map((data) => {
//           return data.results;
//         })
//       );
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environments } from 'src/app/environments/environments';
import { OpenTriviaDB, Result } from '../interfaces/openTriviaDb.interface';
import { Question } from '../interfaces/question.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) {}

  getQuestions(): Observable<Question[]> {
    return this.http
      .get<OpenTriviaDB>(
        `${this.baseUrl}?amount=10&difficulty=easy&type=multiple`
      )
      .pipe(
        map((data) => {
          return data.results.map((result: Result) => {
            const question: Question = {
              description: result.question,
              answers: [
                {
                  name: result.correct_answer,
                  isRight: 1, // Set isRight to 1 for the correct answer
                },
                ...result.incorrect_answers.map((incorrectAnswer) => ({
                  name: incorrectAnswer,
                  isRight: 0, // Set isRight to 0 for incorrect answers
                })),
              ],
            };
            return question;
          });
        })
      );
  }
}
