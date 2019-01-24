import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './app.material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";
import { AppRoutingModule } from './app-routing.module';

import { OkCancelDialogComponent } from './ok-cancel-dialog/ok-cancel-dialog.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryDialogComponent } from './category-dialog/category-dialog.component';

import { AppComponent } from './app.component';
import { TopnavComponent } from './topnav/topnav.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HomeComponent } from './home/home.component';
import { ExpenseComponent } from './expense/expense.component';
import { ExpenseDialogComponent } from './expense-dialog/expense-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    TopnavComponent,
    SidenavComponent,
    HomeComponent,
    ExpenseComponent,
    ExpenseDialogComponent,
    OkCancelDialogComponent,
    CategoriesComponent,
    CategoryDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    ExpenseDialogComponent,
    CategoryDialogComponent,
    OkCancelDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
