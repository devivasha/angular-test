import {
  Component,
  inject,
  input,
  InputSignal,
  OnInit,
  signal,
  WritableSignal
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { NgForOf } from '@angular/common';

import {
  NzContentComponent,
  NzHeaderComponent,
  NzLayoutComponent,
} from 'ng-zorro-antd/layout';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { NzOptionComponent, NzSelectComponent } from 'ng-zorro-antd/select';

import { HeaderComponent } from '../../components/header/header.component';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../models/course';

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
  styleUrl: './course-details.component.css',
})
export class CourseDetailsComponent implements OnInit {
  id: InputSignal<string> = input.required<string>();
  title: WritableSignal<string> = signal<string>('Courses');
  courseService: CoursesService = inject(CoursesService);

  courseDetails: WritableSignal<Course | null> = this.courseService.selectedCourseSignal;

  listOfOption: WritableSignal<{ label: string; value: string }[]> = signal<{ label: string; value: string }[]>([]);
  listOfSelectedValue: WritableSignal<string[]> = signal<string[]>([]);
  courseForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.courseForm = this.fb.group({
      courseName: ['', Validators.required],
      courseStatus: ['', Validators.required],
      instructors: [[]]
    });
  }

  ngOnInit() {
    if (this.id()) {
      this.courseService.getCourseDetails(this.id());

      const details = this.courseService
        .allCoursesSignal()
        .find((course) => String(course.id) === this.id());
      if (details) {

        this.courseForm.patchValue({
          courseName: details.name || '',
          courseStatus: details.status || '',
          instructors: details.instructors?.map((instructor) => instructor?.name || '') || []
        });

        if (details?.instructors) {
          this.listOfOption.set(
            details.instructors.map((instructor) => ({
              label: instructor?.name || '',
              value: instructor?.name || '',
            }))
          );

          this.listOfSelectedValue.set(
            details.instructors.map((instructor) => instructor?.name || '')
          );
        }
      }
    }
  }
}

