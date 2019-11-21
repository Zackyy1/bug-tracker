import { Component, OnInit } from '@angular/core';
import { IssuemanagerService } from '../shared/issue-manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-issue-details',
  templateUrl: './issue-details.component.html',
  styleUrls: ['./issue-details.component.scss']
})
export class IssueDetailsComponent implements OnInit {

  issues = []
  issue
  id: string
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
    
  }

  updateIssueStatus(status) {
    this.issue.status = status
    this.db.updateIssue(this.issue)
  }

}
