import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { AllComponent } from './all/all.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ApiService } from './api.service';
import { QuotesComponent } from './quotes/quotes.component';
import { NewQuotesComponent } from './new-quotes/new-quotes.component';


@NgModule({
  declarations: [
    AppComponent,
    AllComponent,
    AddComponent,
    EditComponent,
    QuotesComponent,
    NewQuotesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
