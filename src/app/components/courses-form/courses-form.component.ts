import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

import { NzOptionComponent, NzSelectComponent } from 'ng-zorro-antd/select';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { SearchBarComponent } from '../search-bar/search-bar.component';
import { CoursesService } from '../../services/courses.service';
import { CourseStatus } from '../../models/course-status.enum';

@Component({
  selector: 'app-courses-form',
  imports: [
    NzSelectComponent,
    NzOptionComponent,
    SearchBarComponent,
    ReactiveFormsModule,
    FormsModule,
    NzSelectModule,
    NzDividerModule,
    NzTableModule,
    NzButtonComponent,
    NzButtonModule,
    NgForOf,
    NgIf,
    RouterLink,
    NgOptimizedImage,
  ],
  templateUrl: './courses-form.component.html',
  styleUrl: './courses-form.component.css',
})
export class CoursesFormComponent implements OnInit {
  coursesService: CoursesService = inject(CoursesService);
  fb: NonNullableFormBuilder = inject(NonNullableFormBuilder);

  loading: boolean = false;
  filterForm!: FormGroup;

  listOfCourses = this.coursesService.coursesSignal;

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm() {
    this.filterForm = this.fb.group({
      searching: [''],
      status: [CourseStatus.ALL],
    });

    this.filterForm.valueChanges.subscribe(() => {
      // unsibscribe ?
      this.loading = true;
      const searchTerm = this.filterForm.get('searching')?.value;
      const status = this.filterForm.get('status')?.value;
      this.coursesService.filterItems({ searchTerm, status });
    });
  }

  public onClear(): void {
    this.filterForm.reset({
      searching: '',
      status: CourseStatus.ALL,
    });
  }
}
