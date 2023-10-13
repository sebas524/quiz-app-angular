import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { QuizService } from '../services/quiz.service';

export const resultsGuard: CanActivateFn = (route, state) => {
  const quizService = inject(QuizService);
  const router = inject(Router);

  if (quizService.questions.length !== quizService.questionIndex) {
    // console.log('IFFFF');

    return true;
  }

  // console.log('OUTSSSSIDEE');

  router.navigateByUrl('/quiz/dashboard');

  return false; //* blocked
};
