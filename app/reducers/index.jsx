import { combineReducers } from 'redux'
import campuses from './campuses';
import students from './students';
import singleStudent from './singleStudent';
import singleCampus from './singleCampus'


export default combineReducers({
  campuses,
  students,
  singleStudent,
  singleCampus
});

