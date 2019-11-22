import { Component, OnInit, Input } from '@angular/core';
import { IssuemanagerService } from '../shared/issue-manager.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HostListener } from '@angular/core';
@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.scss']
})
export class IssueListComponent implements OnInit {

  
  @Input() issues
  currentProject = this.db.currentProject
  currentProjectIssues = []

  

  constructor(public db: IssuemanagerService, private router: Router) { 
    router.events.subscribe(val => {
      val && val['urlAfterRedirects'] ? 
      this.db.switchToProject(val['urlAfterRedirects'].slice(val['urlAfterRedirects'].lastIndexOf('/')+1, val['urlAfterRedirects'].length))
      : null
    })
  }



  ngOnInit() {

    // Filter all issues that are not this component

    this.db.items.subscribe(e => {
      // console.log('RETURNED ISSUES', e)
      this.issues = e
      this.updateIssues()
    })
    this.db.currentProjectSubj.subscribe(e => {
      this.currentProject = e
      this.updateIssues()
    })


    this.updateIssues()
    
  }
  

  updateIssues() {
    
    let tempArray = [];
    this.db.issues && this.db.issues.map(issue => {
      let current = this.currentProject
      if (current == issue.project) {
        tempArray.push(issue)
      } else if (current == 'all') {
        tempArray.push(issue)
      }      
    })
    this.currentProjectIssues = tempArray
  }


  submitNewIssue() {
    if (this.currentProject != "all") {
      this.router.navigateByUrl('/projects/'+this.db.currentProject+'/new-issue')

    } else {
      console.log('Cant submit a bug while viewing all issues')
    }
  }
  

}
