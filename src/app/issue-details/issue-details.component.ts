import { Component, OnInit } from '@angular/core';
import { IssuemanagerService } from '../shared/issue-manager.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-issue-details',
  templateUrl: './issue-details.component.html',
  styleUrls: ['./issue-details.component.scss']
})
export class IssueDetailsComponent implements OnInit {

  issues = []
  issue
  id: string

  commentForm: FormGroup


  constructor(private db: IssuemanagerService, private router: Router) { 
    this.db.items.subscribe(e => {
      this.issues = e
    
      this.id = this.router.url.slice(this.router.url.indexOf('/', 2)+1)
      this.issues.map(el => {
        if (el.id == this.id) {
          this.issue = el
          // this.db.updateCurrentIssue(el)
          console.log(this.issue)
          return true
        }
      })
    })
      // console.log('what?' ,this.db.issues, this.issues, this.issue)
    this.db.currentIssueSubj.subscribe(e => {
      this.issue = e
    })
    
    
  }

  ngOnInit() {
    this.issue= this.db.currentIssue
    this.commentForm = new FormGroup({
      'comment': new FormControl(null),
    })
    
  }

  updateIssueStatus(status) {
    this.issue.status = status
    this.db.updateIssue(this.issue)
  }

  submitComment() {
    const commentBody = this.commentForm.get('comment').value
    const email = this.db.afAuth.auth.currentUser.email;
    const username = email.slice(0, email.indexOf('@'))
    const timeDate = new Date();
    const date = timeDate.toLocaleDateString()
    const time = timeDate.toLocaleTimeString().slice(0, timeDate.toLocaleTimeString().lastIndexOf(':'))
    const comment = {
      commentBody,
      username,
      timeDate,
      email,
      date,
      time
    }
    this.issue.details.comments.unshift(comment)
    this.commentForm.reset()
    this.db.updateIssue(this.issue)
  }

  deleteComment(comment) {
    const idx = this.issue.details.comments.indexOf(comment)
    this.issue.details.comments.splice(idx, 1)
    this.db.updateIssue(this.issue)

  }

  

}
