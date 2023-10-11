import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizRoutingModule } from './quiz-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { QuestionComponent } from './components/question/question.component';
import { ResultsComponent } from './components/results/results.component';

@NgModule({
  declarations: [
    MainLayoutComponent,
    DashboardComponent,
    QuestionComponent,
    ResultsComponent,
  ],
  imports: [CommonModule, QuizRoutingModule, SharedModule],
})
export class QuizModule {}
