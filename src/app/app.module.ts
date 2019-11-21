import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule, routingComponents } from './app-routing.module';
import {RouterModule , Routes} from '@angular/router'
import { AppComponent } from './app.component';
import { IssueComponent } from './issue/issue.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
// import { AngularFireStorageModule } from '@angular/fire/storage';
// import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { SidebarComponent } from './sidebar/sidebar.component';
import { IssueListComponent } from './issue-list/issue-list.component';
import { IssueDetailsComponent } from './issue-details/issue-details.component';
import { NewIssueFormComponent } from './new-issue-form/new-issue-form.component';
import { QuillModule } from 'ngx-quill'
import { AngularFireAuth } from '@angular/fire/auth';
import { IssuemanagerService } from './shared/issue-manager.service';
// const appRoutes: Routes = [
//   { path: 'project/:projectName', component: CrisisListComponent },
//   { path: 'issue/:issueId',      component: HeroDetailComponent },
//   {
//     path: 'heroes',
//     component: HeroListComponent,
//     data: { title: 'Heroes List' }
//   },
//   { path: '',
//     redirectTo: '/heroes',
//     pathMatch: 'full'
//   },
//   { path: '**', component: PageNotFoundComponent }
// ];

@NgModule({
  declarations: [
    AppComponent,
    IssueComponent,
    SidebarComponent,
    routingComponents,
    IssueDetailsComponent,
    NewIssueFormComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    
    ReactiveFormsModule,
    QuillModule.forRoot()
  ],
  providers: [IssuemanagerService, AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
