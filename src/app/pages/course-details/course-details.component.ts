import {Component, inject, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';

import { NzContentComponent, NzHeaderComponent, NzLayoutComponent } from 'ng-zorro-antd/layout';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputDirective } from 'ng-zorro-antd/input';
import  {NzOptionComponent, NzSelectComponent } from 'ng-zorro-antd/select';

import { HeaderComponent } from '../../components/header/header.component';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-course-details',
  imports: [
    NzLayoutComponent,
    NzHeaderComponent,
    HeaderComponent,
    NzContentComponent,
    NzInputDirective,
    NzSelectComponent,
    NzOptionComponent,
    ReactiveFormsModule,
    FormsModule,
    NzSelectModule,
    NgForOf,
  ],
  templateUrl: './course-details.component.html',
  standalone: true,
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent implements OnInit {
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  courseService: CoursesService = inject(CoursesService);

  courseDetails = this.courseService.selectedCourseSignal;
  selectedCourseStatusSignal = this.courseService.selectedCourseStatusSignal;

  listOfOption:  Array<{ label: string; value: string}> = [];
  listOfSelectedValue: Array<string> = [];

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if(id){
        this.courseService.getCourseDetails(id);
        this.courseService.getCourseStatus(id);

        const details = this.courseService.allCoursesSignal().find((course)=> String(course.id) === id);

        if (details?.instructors) {

          this.listOfOption = details.instructors.map(instructor => ({
            label: instructor?.name || '',
            value: instructor?.name || ''
          }));

          this.listOfSelectedValue = details.instructors.map(instructor => instructor?.name || '');
        }
      }
    })
  }
}
