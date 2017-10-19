import axios from 'axios';


//ACTION TYPES
const EDIT_CAMPUS = 'EDIT_CAMPUS';
const DELETE_CAMPUS = 'DELETE_CAMPUS';
const SELECTED_SINGLE_CAMPUS = 'SELECTED_SINGLE_CAMPUS';
const GET_CAMPUSES = 'GET_CAMPUSES';
const CREATE_CAMPUS = 'CREATE_CAMPUS';


//ACTION CREATORS
export function editTheCampus(updatedCampus) {
  return {
    type: EDIT_CAMPUS,
    updatedCampus
  };
}

export function deleteTheCampus(deletedCampusId) {
  return {
    type: DELETE_CAMPUS,
    deletedCampusId
  };
}

export function selectedSingleCampus(campus) {
  return {
    type: SELECTED_SINGLE_CAMPUS,
    campus
  };
}

export function getCampuses(allCampuses) {
  return {
    type: GET_CAMPUSES,
    allCampuses
  };
}

export function createTheCampus(newCampus) {
  return {
    type: CREATE_CAMPUS,
    newCampus
  };
}


//THUNKS
export function editCampus(campus) {
  return function thunk(dispatch) {
    return axios.put(`/api/campuses/${campus.id}`, campus)
      .then(res => res.data)
      .then((updatedCampus) => {
        const action = editTheCampus(updatedCampus);
        dispatch(action);
      });
  };
}

export function deleteCampus(campusId) {
  return function thunk(dispatch) {
    return axios.delete(`/api/campuses/${campusId}`)
      .then(() => {
        const action = deleteTheCampus(campusId);
        dispatch(action);
      });
  };
}

export function fetchCampus(campusId) {
  return function thunk(dispatch) {
    return axios.get(`/api/campuses/${campusId}`)
      .then(res => res.data)
      .then(campus => {
        const action = selectedSingleCampus(campus[0]);
        dispatch(action);
      });
  };
}

export function fetchCampuses() {
  return function thunk(dispatch) {
    return axios.get('/api/campuses/')
      .then(res => res.data)
      .then(campuses => {
        const action = getCampuses(campuses);
        dispatch(action);
      });
  };
}

export function createCampus(campus) {
  return function thunk(dispatch) {
    return axios.post('/api/campuses', campus)
      .then(res => res.data)
      .then((newCampus) => {
        const action = createTheCampus(newCampus);
        dispatch(action);
      });
  };
}

let initialState = {
  allCampuses: [],
  selectedCampus: {}
};


// REDUCER
export default function (prevState = initialState, action) {
  switch (action.type) {
    case SELECTED_SINGLE_CAMPUS:
      return Object.assign({}, prevState, { selectedCampus: action.campus });
    case EDIT_CAMPUS:
      prevState.allCampuses.forEach((campus, i) => {
        if (campus.id === action.updatedCampus.id) {
          prevState.allCampuses[i] = action.updatedCampus;
        }
      });
      return prevState;
    case DELETE_CAMPUS:
      prevState.allCampuses.forEach((campus, i) => {
        if (campus.id == action.deletedCampusId) {
          prevState.allCampuses.splice(i, 1);
        }
      });
      return prevState;
    case GET_CAMPUSES:
      return Object.assign({}, prevState, { allCampuses: action.allCampuses });
    case CREATE_CAMPUS:
      return Object.assign({}, prevState, { allCampuses: prevState.allCampuses.concat(action.newCampus) });
    default:
      return prevState;
  }
}

