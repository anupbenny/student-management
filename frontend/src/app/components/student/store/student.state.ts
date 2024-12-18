import { Student } from "../../../app.model";

export interface StudentState {
  list: Student[];
  loading: boolean;
  errorMsg: string | null;
}

export const initialState: StudentState = {
  list: [],
  loading: false,
  errorMsg: null,
};
