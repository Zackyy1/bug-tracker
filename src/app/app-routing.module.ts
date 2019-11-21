import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IssueListComponent } from './issue-list/issue-list.component';
import { IssueDetailsComponent } from './issue-details/issue-details.component';
import { NewIssueFormComponent } from './new-issue-form/new-issue-form.component';

const routes: Routes = [
  {path: 'projects/:projectName', component: IssueListComponent}, 
  {path: 'issue/:issueid', component: IssueDetailsComponent}, 
  {path: 'projects/:projectName/new-issue', component: NewIssueFormComponent},

  
  { path: '',
    redirectTo: '/projects/all',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [IssueListComponent, IssueDetailsComponent, NewIssueFormComponent]