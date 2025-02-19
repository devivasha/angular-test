import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { signal } from '@angular/core';

import { CoursesFormComponent } from './courses-form.component';
import { CoursesService } from '../../services/courses.service';

describe('CoursesFormComponent', () => {
  let component: CoursesFormComponent;
  let fixture: ComponentFixture<CoursesFormComponent>;
  let coursesServiceMock: jasmine.SpyObj<CoursesService>;

  beforeEach(async () => {
    coursesServiceMock = jasmine.createSpyObj('CoursesService', ['filterItems'], {
      coursesSignal: signal([])
    });

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CoursesFormComponent, NoopAnimationsModule, HttpClientTestingModule],
      providers: [{ provide: CoursesService, useValue: coursesServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(CoursesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.filterForm.value).toEqual({
      searching: '',
      status: 'all'
    });
  });

  it('should update search term when calling onSearch()', fakeAsync(() => {
    spyOn(component['searchSubject'], 'next');

    component.onSearch('Credit', 'draft');

    tick(300);
    fixture.detectChanges();

    expect(component['searchSubject'].next).toHaveBeenCalledWith({
      searchTerm: 'Credit',
      status: 'draft'
    });
  }));

  it('should reset form when calling onClear()', () => {
    component.filterForm.patchValue({
      searching: 'Credit',
      status: 'draft'
    });

    component.onClear();

    expect(component.filterForm.value).toEqual({
      searching: '',
      status: 'all'
    });
  });

  it('should call filterItems() with correct parameters when searchSubject emits', fakeAsync(() => {
    component.onSearch('Credit', 'draft');

    tick(300);
    fixture.detectChanges();

    expect(coursesServiceMock.filterItems).toHaveBeenCalledWith({
      searchTerm: 'Credit',
      status: 'draft'
    });
  }));

  it('should debounce form value changes before triggering search', (done) => {
    spyOn(component, 'onSearch');

    component.filterForm.patchValue({ searching: 'credit' });

    setTimeout(() => {
      expect(component.onSearch).toHaveBeenCalled();
      done();
    }, 400);
  });

  afterEach(() => {
    fixture.destroy();
  });
});

