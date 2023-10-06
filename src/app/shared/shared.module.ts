import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PageNotFound404Component } from './pages/page-not-found404/page-not-found404.component';

@NgModule({
  declarations: [NavbarComponent, PageNotFound404Component],
  imports: [CommonModule],
  exports: [NavbarComponent],
})
export class SharedModule {}
