import {
  Component,
  signal,
  WritableSignal } from '@angular/core';

import {
  NzContentComponent,
  NzHeaderComponent,
  NzLayoutComponent } from 'ng-zorro-antd/layout';

import { HeaderComponent } from '../../components/header/header.component';
import { CoursesFormComponent } from '../../components/courses-form/courses-form.component';

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
export class CoursesComponent {
  title: WritableSignal<string> = signal<string>('Courses');
}
