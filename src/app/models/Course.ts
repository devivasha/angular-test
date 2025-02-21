import { CourseStatus } from "./course-status.enum";

interface Instructor {
  name: string;
  image: string;
}

export interface Course extends CourseDetails {
  id: number;
  name: string;
  imageUrl: string;
  status: CourseStatus;
  instructors: Instructor[];
}

export interface CourseDetails {
  images: string[];
}

export interface ISearchBarFilter {
  searchTerm?: string;
  status?: CourseStatus;
}
