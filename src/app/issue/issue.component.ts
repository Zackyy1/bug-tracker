import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { IssuemanagerService } from '../shared/issue-manager.service';


@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss']
})
export class IssueComponent implements OnInit {


  popupOpened = false
  issueId: number
  issueTitle: string
  issueShortDesc: string
  issueLongDesc: string
  issueProject: string
  issueStatus: string
  issueComments: string[]
  issueSummary: string
  issue

  @Input() data: Observable<any>

  constructor(private db: IssuemanagerService, private router: Router) { }

  ngOnInit() {
    // this.self = new Issue(this.issueName, this.issueId,  this.issueStatus)
    // console.log('DATA', this.data)
    this.issueId = this.data['id']
    this.issueTitle = this.data['title']
    // this.issueShortDesc = this.data['shortDescription']
    this.issueLongDesc = this.data['details']['longDescription']
    this.issueStatus = this.data['status']
    this.issueProject = this.data['project']
    this.issueComments = this.data['details']['comments']
    this.issueSummary = this.data['summary']

    this.issue = {
      id: this.issueId,
      title: this.issueTitle,
      summary: this.issueSummary,
      // shortDescription: this.issueShortDesc,
      details: {longDescription: this.issueLongDesc, comments: this.issueComments},
      status: this.issueStatus,
      project: this.issueProject
    }
  }

  togglePopup() {
    this.popupOpened = !this.popupOpened
  }

  goToIssue() {
    this.db.currentIssue = this.issue
    this.router.navigateByUrl('/issue/'+this.issueId);
  }

  updateIssueStatus(status) {
    this.issue.status = status
    this.db.updateIssue(this.issue)
  }

  deleteIssue() {
    this.db.removeFromCollection('new-bugs', this.issue)
  }

}
