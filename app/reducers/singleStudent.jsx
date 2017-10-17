import axios from 'axios';

//INITIAL STATE
const initialState = {
  selectedStudent: { id: 1 },
};

//ACTION TYPES
const SELECTED_SINGLE_STUDENT = 'SELECTED_SINGLE_STUDENT';
const EDIT_STUDENT = 'EDIT_STUDENT';
const EDIT_STUDENT_CAMPUS = 'EDIT_STUDENT_CAMPUS';
const DELETE_STUDENT = 'DELETE_STUDENT';

//ACTION CREATORS
export function fetchTheStudent(student) {
  return {
    type: SELECTED_SINGLE_STUDENT,
    student
  };
}

export function editTheStudent() {
  return {
    type: EDIT_STUDENT
  };
}

export function editTheStudentCampus() {
  return {
    type: EDIT_STUDENT_CAMPUS
  };
}

export function deleteTheStudent() {
  return {
    type: DELETE_STUDENT
  };
}


//THUNKS
export function fetchStudent(studentId) {
  return function thunk(dispatch) {
    return axios.get(`/api/students/${studentId}`)
      .then(res => res.data)
      .then(student => {
        const action = fetchTheStudent(student);
        dispatch(action);
      });
  }
}

export function editStudent(student) {
  return function thunk(dispatch) {
    return axios.put(`/api/students`, student)
      .then(() => {
        const action = editTheStudent();
        dispatch(action);
      })
  }
}

export function editStudentCampus(student) {
  return function thunk(dispatch) {
    return axios.put(`/api/students/${student.id}`, student)
      .then(() => {
        const action = editTheStudentCampus();
        dispatch(action);
      })
  }
}

export function deleteStudent(studentId) {
  return function thunk(dispatch) {
    return axios.delete(`/api/students/${studentId}`)
      .then(() => {
        const action = deleteTheStudent();
        dispatch(action);
      })
  }
}

//didn't finish updating all of these to update state on front end. Many for some,
//they did not need to go through reducer?
// REDUCER
export default function (prevState = initialState, action) {
  switch (action.type) {
    case SELECTED_SINGLE_STUDENT:
      return Object.assign({}, prevState, { selectedStudent: action.student[0] });
    case EDIT_STUDENT:
      return prevState;
    case EDIT_STUDENT_CAMPUS:
      return prevState;
    case DELETE_STUDENT:
      return prevState;
    default:
      return prevState;
  }
}

