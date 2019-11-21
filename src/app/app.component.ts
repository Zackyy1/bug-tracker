import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { IssuemanagerService } from './shared/issue-manager.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { environment } from 'src/environments/environment';

export class Book {
  constructor(public title: string) { 
    this.title = title
   }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'issue-tracker';
  issues
  currentProject = "all"
  devs = environment.devs

  constructor(
    private db: IssuemanagerService, 
    private router: Router, 
    private afAuth: AngularFireAuth
    ) {

    // If page is reloaded, check if we're looking at a project issue list and refresh issues
    let a = window.location.pathname
    let firstPath = a.slice(a.indexOf('/')+1, a.lastIndexOf('/'))
    let secondPath = a.slice(a.lastIndexOf('/')+1, a.length)
    if (firstPath == "projects") {
      this.currentProject = secondPath
      this.db.switchToProject(this.currentProject)
    }

  }

  ngOnInit() {
  }

  // Check if user is a developer (Can manage issues, flag and delete them)
  
  

  login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout() {
    this.afAuth.auth.signOut();
  }

  routeToMain() {

    // Logo click -> back to main page
    this.router.navigateByUrl('/projects/all')
  }



  


}
