import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path:'courses',
    loadComponent: () => import('../app/pages/courses/courses.component').then(m => m.CoursesComponent),
  },
  {
    path:'courses/:id',
    loadComponent: () => import('../app/pages/course-details/course-details.component').then(m => m.CourseDetailsComponent),
  },
  {
    path:'**',
    redirectTo:'courses',
  }
];
