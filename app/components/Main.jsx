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

  componentDidMount() {
    store.dispatch(fetchCampuses());
    store.dispatch(fetchStudents());

  }

  render() {
    return (
      <div className="container">
        <Navbar />
        <div className="container">
            <Route exact path="/" component={AllCampuses} />
            <Route path="/campuses" component={AllCampuses} />
            <Route path="/campuses/view/:campusId" component={SingleCampus} />
            <Route exact path="/students" component={AllStudents} />
            <Route path="/students/view/:studentId" component={SingleStudent} />
            <Route path="/campuses/editcampus" component={EditCampus} />
            <Route path="/campuses/createcampus" component={CreateCampus} />
            <Route path="/students/editstudent" component={EditStudent} />
            <Route path="/students/createstudent" component={CreateStudent} />
            <Route path="/campuses/addstudenttocampus" component={AddStudentToCampus} />
        </div>
      </div>
    );
  }
}

