import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllComponent } from './all/all.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { QuotesComponent } from './quotes/quotes.component';
import { NewQuotesComponent } from './new-quotes/new-quotes.component';

const routes: Routes = [
  { path: '', component: AllComponent },
  { path: 'new', component: AddComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: 'quotes/:id', component: QuotesComponent },
  { path: 'write/:id', component: NewQuotesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
