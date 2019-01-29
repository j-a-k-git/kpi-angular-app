import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './app.material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import LOCALE_en_IN from '@angular/common/locales/en-IN';

import { XpenseApiModule } from 'xpense-api';

import { OkCancelDialogComponent } from './ok-cancel-dialog/ok-cancel-dialog.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryDialogComponent } from './category-dialog/category-dialog.component';

import { AppComponent } from './app.component';
import { TopnavComponent } from './topnav/topnav.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HomeComponent } from './home/home.component';
import { ExpenseComponent } from './expense/expense.component';
import { ExpenseDialogComponent } from './expense-dialog/expense-dialog.component';
import { LoadingIndicatorService } from './services/loading-indicator/loading-indicator.service';
import { LoadingIndicatorInterceptor } from './services/loading-indicator/loading-indicator.interceptor';

registerLocaleData(LOCALE_en_IN);

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
    HttpClientModule,
    FlexLayoutModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    XpenseApiModule
  ],
  entryComponents: [
    ExpenseDialogComponent,
    CategoryDialogComponent,
    OkCancelDialogComponent
  ],
  providers: [
    LoadingIndicatorService,
    {
      provide: LOCALE_ID,
      useValue: "en-IN"
    },
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: (service: LoadingIndicatorService) => new LoadingIndicatorInterceptor(service),
      multi: true,
      deps: [LoadingIndicatorService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
