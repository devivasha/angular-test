import { Component } from '@angular/core';
import {HeaderComponent} from '../../components/header/header.component';
import {NzContentComponent, NzHeaderComponent, NzLayoutComponent} from 'ng-zorro-antd/layout';
import {CoursesFormComponent} from '../../components/courses-form/courses-form.component';

@Component({
  selector: 'app-courses',
  imports: [
    HeaderComponent,
    NzLayoutComponent,
    NzHeaderComponent,
    NzContentComponent,
    CoursesFormComponent
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {}
