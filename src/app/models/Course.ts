interface Instructor {
  name:string;
  image: string
}

export interface Course {
  id: number;
  name: string;
  imageUrl: string;
  status: string;
  instructors: Instructor[]
}

export interface ISearchBarFilter {
  searchTerm?: string;
  status?: string;
}
