import { Answer } from './answer.interface';

export interface Question {
  description: string;
  answers: Answer[];
}

// export class Question {
//   description: string;
//   answers: Answer[];

//   constructor(description: string, answers: Answer[]) {
//     (this.description = description), (this.answers = answers);
//   }
// }
