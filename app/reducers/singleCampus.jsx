import axios from 'axios';


//ACTION TYPES
const EDIT_CAMPUS = 'EDIT_CAMPUS';
const DELETE_CAMPUS = 'DELETE_CAMPUS';
const SELECTED_SINGLE_CAMPUS = 'SELECTED_SINGLE_CAMPUS';


//ACTION CREATORS
export function editTheCampus() {
  return {
    type: EDIT_CAMPUS
  };
}

export function deleteTheCampus() {
  return {
    type: DELETE_CAMPUS
  };
}

export function selectedSingleCampus(campus) {
  return {
    type: SELECTED_SINGLE_CAMPUS,
    campus
  };
}


//THUNKS
export function editCampus(campus) {
  return function thunk(dispatch) {
    return axios.put(`/api/campuses`, campus)
      .then(() => {
        const action = editTheCampus();
        dispatch(action);
      })
  }
}

export function deleteCampus(campusId) {
  return function thunk(dispatch) {
    return axios.delete(`/api/campuses/${campusId}`)
      .then(() => {
        const action = deleteTheCampus();
        dispatch(action);
      })
  }
}

export function fetchCampus(campusId) {
  return function thunk(dispatch) {
    return axios.get(`/api/campuses/${campusId}`)
      .then(res => res.data)
      .then(campus => {
        const action = selectedSingleCampus(campus);
        dispatch(action);
      });
  }
}

//didn't finish updating all of these to update state on front end. Many for some,
//they did not need to go through reducer?
// REDUCER
export default function (prevState = { selectedCampus: {} }, action) {
  switch (action.type) {
    case SELECTED_SINGLE_CAMPUS:
      return Object.assign({}, prevState, { selectedCampus: action.campus[0] });
    case EDIT_CAMPUS:
      return prevState;
    case DELETE_CAMPUS:
      return prevState;
    default:
      return prevState;
  }
}

