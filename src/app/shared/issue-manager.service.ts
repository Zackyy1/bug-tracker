import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

// Send, Get data from database

export class IssuemanagerService {

  issues
  items: Observable<any[]>;
  counter: Observable<any>
  nextId: number = 0
  projects
  currentProject = "all"
  currentProjectSubj: Subject<string> = new Subject<string>()
  currentIssue
  currentIssueSubj: Subject<any> = new Subject<any>()
  devs: Array<string> = environment.devs

  constructor(
    private db: AngularFirestore, 
    private router: Router,
    public afAuth: AngularFireAuth) {

    this.currentProjectSubj.subscribe((value) => {
      this.currentProject = value
    });

    this.items = db.collection('new-bugs', ref => ref.orderBy('id', 'desc')).valueChanges()
    this.items.subscribe(e => {
      // console.log(e)
      this.issues = e
      return e
    })

    this.counter = db.collection('counter').doc('counter').valueChanges()
    this.counter.subscribe(e => {
      this.nextId = e.counter+1
      return e
    })
   
   this.projects = db.collection('projects').valueChanges()
    this.projects.subscribe(e => {
      this.projects = e
      return e
    })

   }


   isLoggedIn() {
    if (this.afAuth.auth && this.afAuth.auth.currentUser) {
      return true
    } else {
      return false
    }
    
   }

   isDev() {
     if (this.afAuth && this.afAuth.auth.currentUser) {
      let current = this.afAuth.auth.currentUser
      return this.devs.includes(current.email)
     }
    
  }

  
  login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout() {
    this.afAuth.auth.signOut();
  }


   updateCurrentIssue(issue) {
     this.currentIssueSubj.subscribe(e => {
        this.currentIssue = e
     })
     this.currentIssueSubj.next()
   }

   switchToProject(projectName) {
     this.currentProject = this.unParseProjectName(projectName)
     this.currentProjectSubj.next(this.currentProject)
     
   }

  addToCollection(collectionName: string, element) {
    let collection = this.db.collection(collectionName);
    collection.add(element);
  }

  updateCounter() {
    let counter = this.nextId
    let collection = this.db.collection('counter').doc('counter').update({counter})
  }

  addNewIssue(project, title, status,  longDescription, comments, summary) {
    let newIssue = {
      title, 
      status, 
      summary,
      id: this.nextId,
      
      project,
      details: 
        {longDescription, 
        comments: comments
        }
    }
    this.updateCounter()
    // this.addToCollection('new-bugs', newIssue)
    this.db.collection('new-bugs').doc(project+this.nextId).set(newIssue)
  }

  addNewProject(projectName) {
    const parsedNameLower = projectName.replace(/ /g, "-").toLowerCase()
    const parsedName = projectName.replace(/ /g, "-")

    this.db.collection('projects').doc(parsedNameLower).set({projectName: parsedName})
  }

  removeFromCollection(collectionName: string, issue) {
    this.db.collection(collectionName).doc(issue.project+issue.id).delete()
  }

  removeProject(project) {
    const unparsed = this.unParseProjectName(project.projectName)

    this.db.collection('projects').doc(unparsed).delete()

  }

  changeIssueStatus(issue, newStatus) {

  }

  updateIssue(issue) {
    this.db.collection('new-bugs').doc(issue.project+issue.id).update(issue)
  }

  parseProjectName(str) {
    return str.replace(/-/g, ' ')
  }
  unParseProjectName(str) {
    return str.replace(/ /g, '-').toLowerCase()
  }
  
}
