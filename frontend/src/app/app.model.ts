export interface Student {
  id?: number;
  name: string;
  gpa: number;
  courses?: number[];
}

export interface Course {
  id?: number;
  name: string;
  startDate: Date;
  endDate: Date;
  minGpa?: number;
}