import { Answer } from './answer.interface';

// export class Question {
//   description: string;
//   answers: Answer[];

//   constructor(description: string, answers: Answer[]) {
//     (this.description = description), (this.answers = answers);
//   }
// }

export interface Question {
  description: string;
  answers: Answer[];
}
