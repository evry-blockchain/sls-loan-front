/**
 * Created by Oleksandr.Khymenko on 06.10.2016.
 */
import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: 'projects-table',
  templateUrl: 'projects-table.component.html',
  styleUrls: ['./projects-table.component.scss']
})
export class ProjectsTableComponent implements OnInit {

  @Input() projects;

  constructor(private router: Router) { }

  ngOnInit() { }

  goToProject(project) {
      this.router.navigate(['/projects', 1]);
    }

}
