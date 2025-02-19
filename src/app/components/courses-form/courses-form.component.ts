import { Component, inject, OnDestroy } from '@angular/core';
import { NgForOf, NgIf} from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

import { NzOptionComponent, NzSelectComponent } from 'ng-zorro-antd/select';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { SearchBarComponent } from '../search-bar/search-bar.component';
import { CoursesService } from '../../services/courses.service';
import { ISearchBarFilter } from '../../models/Course';

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
  ],
  templateUrl: './courses-form.component.html',
  standalone: true,
  styleUrl: './courses-form.component.css'
})
export class CoursesFormComponent implements OnDestroy {
  coursesService:CoursesService = inject(CoursesService);
  fb:NonNullableFormBuilder = inject(NonNullableFormBuilder)

  private searchSubject: Subject<ISearchBarFilter> = new Subject();
  private searchTerm: string = '';

  loading: boolean = false;
  filterForm!: FormGroup;

  listOfCourses = this.coursesService.coursesSignal;

  constructor() {
    this.initializeForm();

    this.searchSubject.pipe(debounceTime(300), distinctUntilChanged()).subscribe((filter: ISearchBarFilter) => {
      this.loading = true;

      const { searchTerm, status } = filter;
      this.coursesService.filterItems({ searchTerm, status })

      this.loading = false;
    });
  }

  ngOnDestroy(): void {
    this.searchSubject.complete();
  }

  private initializeForm() {
    this.filterForm = this.fb.group({
      searching: new FormControl(''),
      status: new FormControl('all')
    });

    this.filterForm.valueChanges.subscribe(value => {
      const searchTerm = this.filterForm.get('searching')?.value;
      const status = this.filterForm.get('status')?.value;

      this.onSearch(searchTerm, status);
    });
  }

  public onSearch(value: string, status: string): void {
    this.loading = true;
    this.searchTerm = value;

    this.searchSubject.next({
      searchTerm: this.searchTerm,
      status: status === 'all' ? '' : status
    });
  }

  public onClear(): void {
    this.filterForm.reset({
      searching: '',
      status: 'all'
    });

    this.onSearch('', 'all');
  }
}
