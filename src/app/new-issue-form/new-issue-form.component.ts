import { Component, OnInit } from '@angular/core';
import { IssuemanagerService } from '../shared/issue-manager.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-new-issue-form',
  templateUrl: './new-issue-form.component.html',
  styleUrls: ['./new-issue-form.component.scss']
})
export class NewIssueFormComponent implements OnInit {

  longDescription: string
  project: string
  shortDescription: string
  status: string
  title: string
  stepsToReproduce: string
  expected: string
  actual: string
  summary: string
  editorForm: FormGroup
  parsedProject: string 



  constructor(private db: IssuemanagerService, private router: Router) { 
    // find this project name from url
    let str = this.router.url
    this.project = str.slice(str.indexOf('/', 2)+1, str.lastIndexOf('/'))
    

  }

  ngOnInit() {
    // this.parsedProject = this.db.currentProject.replace(/-/g, ' ')
    let str = this.router.url
    this.parsedProject = str.slice(str.indexOf('/', 2)+1, str.lastIndexOf('/')).replace(/-/g, ' ').toUpperCase()
    this.editorForm = new FormGroup({
      'shortDesc': new FormControl(null),
      'steps': new FormControl(null),
      'expected': new FormControl(null),
      'actual': new FormControl(null),
      'summary': new FormControl(null),

    })
  }

  updateData(event, key) {
    console.log('Updated', key)
    this[key] = event.target.value
  }

  submitNewIssue(issue) {
    console.log(this)
    console.log('IS THIS CORRECT PROJECT?', this.project)
    
    this.db.addNewIssue(this.project, 
      issue.title, 
      issue.status, 
      // issue.shortDescription, 
      issue.longDescription, 
      issue.comments,
      issue.summary
      )
  }

  onSubmit() {
    
    let newLong = ''
    
    if (this.editorForm.get('summary').value != null && this.editorForm.get('summary').value.length > 0 ) {
      this.summary = this.editorForm.get('summary').value
    } else {
      alert("Short description must be present")
      return false
    }

    if (this.editorForm.get('shortDesc').value != null && this.editorForm.get('shortDesc').value.length > 0) {
      newLong = newLong + this.editorForm.get('shortDesc').value
    }
    if (this.editorForm.get('steps').value != null && this.editorForm.get('steps').value.length > 0) {
      newLong = newLong + 
      "<br><strong>Steps to reproduce:</strong><br>" +
      this.editorForm.get('steps').value
    }
    if (this.editorForm.get('expected').value != null && this.editorForm.get('expected').value.length > 0) {
      newLong = newLong + 
      "<br><strong>Expected results:</strong><br>" +
      this.editorForm.get('expected').value
    }
    if (this.editorForm.get('actual').value != null && this.editorForm.get('actual').value.length > 0) {
      newLong = newLong + 
      "<br><strong>Actual results:</strong><br>" +
      this.editorForm.get('actual').value
    }


    this.longDescription = newLong
    this.wrapData()
  }

  wrapData() {
    
    let newIssue = {
      title: this.title,
      status: 'pending',
      summary: this.summary,
      // shortDescription: this.shortDescription,
      longDescription: this.longDescription,
      comments:[]
    }

    if (newIssue.title == null || newIssue.title.length < 1) {
      alert("Please insert a title")
      return false
    }

    this.submitNewIssue(newIssue)
    this.router.navigateByUrl('/projects/'+this.project)
  }


}
