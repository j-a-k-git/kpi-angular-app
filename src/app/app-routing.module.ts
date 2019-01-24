import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component'
import { ExpenseComponent } from './expense/expense.component'
import { CategoriesComponent } from './categories/categories.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent
}, {
  path: 'expenses',
  component: ExpenseComponent
}, {
  path: 'categories',
  component: CategoriesComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
