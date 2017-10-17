import axios from 'axios';

//ACTION TYPES
const GET_CAMPUSES = 'GET_CAMPUSES';
const CREATE_CAMPUS = 'CREATE_CAMPUS';

//ACTION CREATORS
export function getCampuses(campuses) {
  return {
    type: GET_CAMPUSES,
    campuses
  };
}

export function createTheCampus(campus) {
  return {
    type: CREATE_CAMPUS,
    campus
  };
}

//THUNKS
export function fetchCampuses() {
  return function thunk(dispatch) {
    return axios.get('/api/campuses/')
      .then(res => res.data)
      .then(campuses => {
        const action = getCampuses(campuses);
        dispatch(action);
      });
  }
}

export function createCampus(campus) {
  return function thunk(dispatch) {
    return axios.post('/api/campuses', campus)
      .then(res => res.data)
      .then((newCampus) => {
        const action = createTheCampus(newCampus);
        dispatch(action);
      })
  }
}

// REDUCER
export default function campusesReducer(prevState = [], action) {
  switch (action.type) {
    case GET_CAMPUSES:
      return action.campuses;
    case CREATE_CAMPUS:
      return [...prevState, action.campus];
    default:
      return prevState;
  }
}
