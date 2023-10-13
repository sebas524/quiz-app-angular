import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFound404Component } from './shared/pages/page-not-found404/page-not-found404.component';

const routes: Routes = [
  {
    path: 'quiz',

    loadChildren: () => import('./quiz/quiz.module').then((m) => m.QuizModule),
  },

  {
    path: '404',
    component: PageNotFound404Component,
  },
  {
    path: '',
    redirectTo: 'quiz',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
