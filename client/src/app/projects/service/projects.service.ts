/**
 * Created by Oleksandr.Khymenko on 06.10.2016.
 */
import { Injectable } from '@angular/core';

@Injectable()
export class ProjectsService {

    constructor() { }

    create(project) {
      console.log('project', project);
    }

}
