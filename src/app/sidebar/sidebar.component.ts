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
  parsedProjectName
  showForm: boolean = false
  constructor(private db: IssuemanagerService, private router: Router) {
    db.currentProjectSubj.subscribe(value => {
      this.currentProject = value
    });


   }

  ngOnInit() {
    this.db.projects.subscribe(e => {
      
     e.map(p => {
        p.parsedName = p.projectName.replace(/-/g, ' ')
      })
      this.projects = e
      return e
    })
    
  }

  toggleForm() {
    this.showForm = !this.showForm
  }

  submitNewProject(e) {
    e.preventDefault()
    if (e.target[0].value.length > 3) {
      this.db.addNewProject(e.target[0].value)
      e.target[0].value = null
      this.showForm = false
    } else {
      alert("Project must be at least 4 characters long")
    }
    
  }

  switchToProject(project) {
    this.router.navigateByUrl('/projects/'+this.db.unParseProjectName(project.projectName))
    this.db.switchToProject(this.db.unParseProjectName(project.projectName))

  }

  deleteProject(project) {
    console.log(project.projectName)
    this.db.removeProject(project)
  }

}
