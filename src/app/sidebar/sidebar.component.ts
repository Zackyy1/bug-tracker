import { Component, OnInit } from '@angular/core';
import { IssuemanagerService } from '../shared/issue-manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {


  projects
  currentProject
  showForm: boolean = false
  constructor(private db: IssuemanagerService, private router: Router) {
    db.currentProjectSubj.subscribe(value => {
      this.currentProject = value
    });


   }

  ngOnInit() {
    this.db.projects.subscribe(e => {
      this.projects = e
      return e
    })
  }

  toggleForm() {
    this.showForm = !this.showForm
  }

  submitNewProject(e) {
    e.preventDefault()
    this.db.addNewProject(e.target[0].value)
    e.target[0].value = null
    this.showForm = false
  }

  switchToProject(project) {
    this.router.navigateByUrl('/projects/'+project.projectName)
    this.db.switchToProject(project.projectName)

  }

}
