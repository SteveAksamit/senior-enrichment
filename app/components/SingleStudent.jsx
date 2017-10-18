
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
      store.dispatch(fetchStudent(this.props.match.params.studentId ))
      this.unsubscribe = store.subscribe(() =>
        this.setState(store.getState())
      );
    }


  componentWillUnmount() {
    this.unsubscribe();
  }

  handleDeleteStudent(e) {
    const studentId = this.state.students.selectedStudent.id;
    store.dispatch(deleteStudent(studentId));
    this.props.history.push('/students');
  }


  render() {
    var name = '';
    const student = this.state.students.selectedStudent;
    const campusId = this.state.campuses.selectedCampus.id;
    var campus = this.state.campuses.allCampuses.filter((theCampus) => {
      return student.campusId === theCampus.id;
    });
    var campusObj = campus[0];
    if (campusObj) {
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
