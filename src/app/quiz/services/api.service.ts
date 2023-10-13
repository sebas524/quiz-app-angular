import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environments } from 'src/app/environments/environments';
import { OpenTriviaDB, Result } from '../interfaces/openTriviaDb.interface';
import { Question } from '../interfaces/question.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) {}

  // ! decodeHtmlEntities is just because api shows "" incorrectly!!
  private decodeHtmlEntities(input: string | null): string {
    if (input === null) {
      return ''; // Or handle the null value in some appropriate way
    }

    const doc = new DOMParser().parseFromString(input, 'text/html');
    return doc.documentElement.textContent || ''; // Handle potential null value
  }

  fetchApiQuestions(): Observable<Question[]> {
    return this.http
      .get<OpenTriviaDB>(
        `${this.baseUrl}?amount=10&difficulty=easy&type=multiple`
      )
      .pipe(
        map((data) => {
          return data.results.map((result: Result) => {
            const answers = [
              {
                name: this.decodeHtmlEntities(result.correct_answer),
                isRight: 1, //* Set isRight to 1 for correct answers
              },
              ...result.incorrect_answers.map((incorrectAnswer) => ({
                name: this.decodeHtmlEntities(incorrectAnswer),
                isRight: 0, //* Set isRight to 0 for incorrect answers
              })),
            ];

            // Shuffle the answers randomly
            answers.sort(() => Math.random() - 0.5);

            const question: Question = {
              description: this.decodeHtmlEntities(result.question),
              answers: answers,
            };

            return question;
          });
        })
      );
  }
}
