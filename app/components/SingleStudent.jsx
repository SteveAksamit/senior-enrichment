
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

  componentWillReceiveProps(nextProps){
    console.log("nextProps",nextProps)
    const studentId = nextProps.match.params.studentId;
    store.dispatch(fetchStudent(studentId));
  }

  render() {
    let campusName = ''
    const student = this.state.students.selectedStudent;
    if (Object.keys(student).length !== 0) campusName = student.campus.name
    return (
      <div>
        <div className="header">
          <h1 className="header-heading">Student Details</h1>
        </div>
        <hr />
        <h3>Student Name:   {student.name} </h3>
        <h3>Student Email:   {student.email}</h3>
        <h3>Student's Campus:  <Link value={student.campusId} to={`/campuses/view/${student.campusId}`}>{campusName}</Link></h3>
        <br />
        <Link to={'/students/editstudent'} className="btn">Edit Student</Link>
        <a href="#" value={student.campusId} className="btn" onClick={this.handleDeleteStudent}>Delete Student</a>
        <hr />
      </div>
    );
  }
}
