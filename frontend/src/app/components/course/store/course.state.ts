import { Course } from "../../../app.model";

export interface CourseState {
  list: Course[];
  loading: boolean;
  errorMsg: string | null;
}

export const initialState: CourseState = {
  list: [],
  loading: false,
  errorMsg: null,
};
