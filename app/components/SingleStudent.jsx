
import React, { Component } from 'react';
import axios from 'axios';
import store, { fetchStudent, deleteStudent } from '../store';
import { Link } from 'react-router-dom';

export default class SingleStudent extends Component {

  constructor() {
    super();
    this.state = store.getState();
    this.handleDeleteStudent = this.handleDeleteStudent.bind(this);
  }

  componentDidMount() {
    const studentId = this.props.match.params.studentId;
    store.dispatch(fetchStudent(studentId));
    this.unsubscribe = store.subscribe(() =>
      this.setState(store.getState())
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleDeleteStudent(e) {
    const studentId = this.state.singleStudent.selectedStudent.id;
    store.dispatch(deleteStudent(studentId));
    this.props.history.push('/students');
  }


  //implemented funky logic to get the campus name out of my filter. It was giving a type error when I did it the normal way.
  render() {
    var name = '';
    const student = this.state.singleStudent.selectedStudent;
    const campusId = this.state.singleCampus.selectedCampus.id;
    var campus = this.state.campuses.filter((theCampus) => {
      return student.campusId === theCampus.id;
    });
    var campusObj = campus[0];
    if (campusObj) {
      console.log(campusObj.id)
      var campName = campusObj.name;
      var campId = campusObj.id;
    }
    return (
      <div>
        <div className="header">
          <h1 className="header-heading">Student Details</h1>
        </div>
        <hr />
        <h3>Student Name:   {student.name} </h3>
        <h3>Student Email:   {student.email}</h3>
        <h3>Student's Campus:  <Link value={campId} to={`/campuses/${campId}`}>{campName}</Link></h3>
        <br />
        <p><Link to={'/editstudent'} className="btn">Edit Student</Link></p>
        <p><a href="#" value={student.id} className="btn" onClick={this.handleDeleteStudent}>Delete Student</a></p>
        <hr />
      </div>
    );
  }
}

