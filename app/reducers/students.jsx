import axios from 'axios';

//ACTION TYPES
const GET_STUDENTS = 'GET_STUDENTS';
const CREATE_STUDENT = 'CREATE_STUDENT';

//ACTION CREATORS
export function getStudents(students) {
  return {
    type: GET_STUDENTS,
    students
  };
}

export function createTheStudent(student) {
  return {
    type: CREATE_STUDENT,
    student

  };
}

//THUNKS
export function fetchStudents() {
  return function thunk(dispatch) {
    return axios.get('/api/students/')
      .then(res => res.data)
      .then(students => {
        const action = getStudents(students);
        dispatch(action);
      });
  }
}

export function createStudent(student) {
  return function thunk(dispatch) {
    return axios.post('/api/students', student)
      .then(res => res.data)
      .then((createdStudent) => {
        const action = createTheStudent(createdStudent);
        dispatch(action);
      })
  }
}


// REDUCER
export default function (prevState = [], action) {
  switch (action.type) {
    case GET_STUDENTS:
      return action.students;
    case CREATE_STUDENT:
      return [...prevState, action.student];
    default:
      return prevState;
  }
}
