import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FeedbackListComponent} from './feedback-list/feedback-list.component';
import {AddFeedbackComponent} from './add-feedback/add-feedback.component';

const routes: Routes = [
  { path: '', redirectTo: 'view-feedback', pathMatch: 'full' },
  { path: 'add-feedback', component: AddFeedbackComponent },
  { path: 'view-feedback', component: FeedbackListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
