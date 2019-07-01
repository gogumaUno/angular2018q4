import { arrayToIndexedObject } from "./../../shared/helpers/index";
import { CoursesState } from "../models/interfaces/courses-state.interface";
import { ReqStatus } from "./../../shared/types/index";
import {
  CoursesActions,
  CoursesActionTypes,
  LoadCoursesSucceed,
  UpdateCourseSucceed,
  DeleteCourseSucceed,
  CreateCourseSucceed,
  LoadCourseByIdSucceed,
  SearchCoursesSucceed,
  RestoreCoursesSucceed,
} from "./courses.actions";

const initialState: CoursesState = {
  courses: {},
  loading: ReqStatus.empty,
  counter: 0
};

const handleGetCourses = (state: CoursesState, action: LoadCoursesSucceed): CoursesState => {
  return {
    ...state,
    loading: ReqStatus.success,
    courses: action.payload.reduce((acc, course) => ({
      ...acc, [course.id]: course
    }), state.courses),
    counter: Object.keys(state.courses).length + action.payload.length
  };
};

const handleSingleCourse = (state: CoursesState, action: CreateCourseSucceed | LoadCourseByIdSucceed | UpdateCourseSucceed) => {
  return {
    ...state,
    loading: ReqStatus.success,
    courses: { ...state.courses, [action.payload.id]: action.payload }
  };
};

const handleDeleteCourse = (state: CoursesState, action: DeleteCourseSucceed) => {
  const { [action.payload]: deletedCourse, ...courses } = state.courses;
  return {
    ...state,
    loading: ReqStatus.success,
    courses
  };
};

const handleSearchCourses = (state: CoursesState, action: SearchCoursesSucceed) => {
  return {
    ...state,
    courses: arrayToIndexedObject(action.payload),
    loading: ReqStatus.success
  };
}
  ;
const handleRestoreCourses = (state: CoursesState, action: RestoreCoursesSucceed) => {
  return {
    ...state,
    courses: arrayToIndexedObject(action.payload),
    counter: action.payload.length,
    loading: ReqStatus.success
  };
};

const handleLoadStarted = (state: CoursesState) => {
  return {
    ...state,
    loading: ReqStatus.pending
  };
};

export function coursesReducer(state = initialState, action: CoursesActions): CoursesState {
  switch (action.type) {
    case CoursesActionTypes.LoadCoursesStarted:
    case CoursesActionTypes.CreateCourseStarted:
    case CoursesActionTypes.UpdateCourseStarted:
    case CoursesActionTypes.DeleteCourseStarted:
    case CoursesActionTypes.LoadCourseByIdStarted:
    case CoursesActionTypes.SearchCoursesStarted:
    case CoursesActionTypes.RestoreCoursesStarted:
      return handleLoadStarted(state);
    case CoursesActionTypes.LoadCoursesSucceed:
      return handleGetCourses(state, action);
    case CoursesActionTypes.UpdateCourseSucceed:
    case CoursesActionTypes.CreateCourseSucceed:
    case CoursesActionTypes.LoadCourseByIdSucceed:
      return handleSingleCourse(state, action);
    case CoursesActionTypes.DeleteCourseSucceed:
      return handleDeleteCourse(state, action);
    case CoursesActionTypes.SearchCoursesSucceed:
      return handleSearchCourses(state, action);
    case CoursesActionTypes.RestoreCoursesSucceed:
      return handleRestoreCourses(state, action);
    default:
      return state;
  }
}
