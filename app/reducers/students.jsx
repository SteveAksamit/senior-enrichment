import axios from 'axios';


//ACTION TYPES
const SELECTED_SINGLE_STUDENT = 'SELECTED_SINGLE_STUDENT';
const EDIT_STUDENT = 'EDIT_STUDENT';
const EDIT_STUDENT_CAMPUS = 'EDIT_STUDENT_CAMPUS';
const DELETE_STUDENT = 'DELETE_STUDENT';
const GET_STUDENTS = 'GET_STUDENTS';
const CREATE_STUDENT = 'CREATE_STUDENT';

//ACTION CREATORS

export function setStudent(selectedStudent){
return {
  type: SELECTED_SINGLE_STUDENT,
  selectedStudent
};
}

export function editTheStudent(updatedStudent) {
  return {
    type: EDIT_STUDENT,
    updatedStudent
  };
}

export function editTheStudentCampus(edittedStudentCampus) {
  return {
    type: EDIT_STUDENT_CAMPUS,
    edittedStudentCampus
  };
}

export function deleteTheStudent(deletedStudentId) {
  return {
    type: DELETE_STUDENT,
    deletedStudentId
  };
}

export function getStudents(allStudents) {
  return {
    type: GET_STUDENTS,
    allStudents
  };
}

export function createTheStudent(newStudent) {
  return {
    type: CREATE_STUDENT,
    newStudent
  };
}


//THUNKS

export function editStudent(student) {
  return function thunk(dispatch) {
    return axios.put(`/api/students/${student.id}`, student)
      .then(res => res.data)
      .then((updatedStudent) => {
        const action = editTheStudent(updatedStudent);
        dispatch(action);
      })
  }
}

export function editStudentCampus(student) {
  console.log("STUDENT", student)
  return function thunk(dispatch) {
    return axios.put(`/api/students/${student.id}/campus`, student)
      .then(res => res.data)
      .then((updatedStudent) => {
        const action = editTheStudentCampus(updatedStudent);
        dispatch(action);
      })
  }
}

export function deleteStudent(studentId) {
  return function thunk(dispatch) {
    return axios.delete(`/api/students/${studentId}`)
      .then(() => {
        const action = deleteTheStudent(studentId);
        dispatch(action);
      })
  }
}

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

export function fetchStudent(id) {
  return function thunk(dispatch) {
    return axios.get(`/api/students/${id}`)
      .then(res => res.data)
      .then(student => {
        const action = setStudent(student[0]);
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

let initialState = {
  allStudents: [],
  selectedStudent: {}
}


export default function (prevState = initialState, action) {
  switch (action.type) {
    case SELECTED_SINGLE_STUDENT:
      return Object.assign({}, prevState, { selectedStudent: action.selectedStudent });
    case EDIT_STUDENT:
      prevState.allStudents.forEach((student, i) => {
        if (student.id === action.updatedStudent.id) {
          prevState.allStudents[i] = action.updatedStudent;
        }
      });
      return prevState;
    case EDIT_STUDENT_CAMPUS:
      prevState.allStudents.forEach((student, i) => {
        if (student.id === action.edittedStudentCampus.id) {
          prevState.allStudents[i] = action.edittedStudentCampus;
        }
      });
      return prevState;
    case DELETE_STUDENT:
      prevState.allStudents.forEach((student, i) => {
        if (student.id === action.deletedStudentId) {
          prevState.allStudents.splice(i, 1);
        }
       });
      return prevState;
    case GET_STUDENTS:
      return Object.assign({}, prevState, { allStudents: action.allStudents });
    case CREATE_STUDENT:
      return Object.assign({}, prevState, { allStudents: prevState.allStudents.concat(action.newStudent) });
    default:
      return prevState;
  }
}


