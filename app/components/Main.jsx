import Navbar from './Navbar';
import AllCampuses from './AllCampuses';
import AllStudents from './AllStudents';
import SingleCampus from './SingleCampus';
import SingleStudent from './SingleStudent';
import EditCampus from './EditCampus';
import EditStudent from './EditStudent';
import CreateCampus from './CreateCampus';
import CreateStudent from './CreateStudent';
import AddStudentToCampus from './AddStudentToCampus';
import axios from 'axios';
import { Switch, Route } from 'react-router-dom';
import React, { Component } from 'react';
import store, { fetchCampuses, fetchStudents } from '../store';

export default class Main extends Component {

  componentWillMount() {
    const studentsThunk = fetchStudents();
    const campusesThunk = fetchCampuses();
    store.dispatch(campusesThunk);
    store.dispatch(studentsThunk);

  }

  render() {
    return (
      <div className="container">
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={AllCampuses} />
            <Route exact path="/campuses" component={AllCampuses} />
            <Route path="/campuses/:campusId" component={SingleCampus} />
            <Route exact path="/students" component={AllStudents} />
            <Route path="/students/:studentId" component={SingleStudent} />
            <Route path="/editcampus" component={EditCampus} />
            <Route path="/createcampus" component={CreateCampus} />
            <Route path="/editstudent" component={EditStudent} />
            <Route path="/createstudent" component={CreateStudent} />
            <Route path="/addstudenttocampus" component={AddStudentToCampus} />
          </Switch>
        </div>
      </div>
    );
  }
}

