import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Course, ISearchBarFilter } from '../models/Course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  http:HttpClient = inject(HttpClient)
  readonly coursesSignal: WritableSignal<Course[]> = signal<Course[]>([]);
  readonly allCoursesSignal: WritableSignal<Course[]> = signal<Course[]>([]);
  readonly selectedCourseSignal: WritableSignal<Course | null> = signal<Course | null>(null);
  readonly selectedCourseStatusSignal: WritableSignal<string | null> = signal<string | null>(null);

  constructor() {
    this.loadCourses();
  }

  private loadCourses(): Signal<Course[]> {
    this.http.get<Course[]>('/courses').subscribe({
      next: (courses) => {
        this.coursesSignal.set(courses);
        this.allCoursesSignal.set(courses);
      },
      error: (err) => {
        console.error('Failed to load courses', err);
      }
    });

    return this.allCoursesSignal;
  }

  public filterItems(filter: ISearchBarFilter) {
    const { searchTerm, status } = filter;

    if (this.allCoursesSignal().length === 0) {
      this.loadCourses();
      return;
    }

    if ((searchTerm === '' || !searchTerm) && (status === 'All' || !status)) {
      this.coursesSignal.set(this.allCoursesSignal());
      return;
    }

    const filteredCourses = this.allCoursesSignal()
      .filter((course) => {
        const lowerSearchTerm = searchTerm?.toLowerCase() || '';
        const matchesName = course.name.toLowerCase().includes(lowerSearchTerm);
        const matchesInstructor = course?.instructors?.some(instructor =>
          instructor.name.toLowerCase().includes(lowerSearchTerm)
        ) || false;
        const matchesStatus = status === 'All' || !status
          ? true
          : course.status.toLowerCase() === status.toLowerCase();

        return (matchesName || matchesInstructor) && matchesStatus;
        }
      );

    this.coursesSignal.set(filteredCourses);
  }

  public getCourseDetails(id:string): Signal<Course | null> {
    this.http.get<Course>(`courses/${id}`).subscribe({
      next: (course) => {
        this.selectedCourseSignal.set(course || null);
      },
      error: (err) => {
        console.error('Failed to load course', err);
      }
    });

    return this.selectedCourseSignal;
  }

  public getCourseStatus(id:string): Signal<string | null> {
    const courseStatus =this.allCoursesSignal().find((course) => String(course.id) === id)?.status || null;
    this.selectedCourseStatusSignal.set(courseStatus);

    return this.selectedCourseStatusSignal;
  }
}
