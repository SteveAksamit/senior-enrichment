import React, { Component } from 'react';
import axios from 'axios';
import store, { editStudentCampus } from '../store';
import { Link } from 'react-router-dom';

export default class AddStudentToCampus extends Component {

  constructor() {
    super();
    this.state = store.getState();
    this.handleEditStudent = this.handleEditStudent.bind(this)
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() =>
      this.setState(store.getState())
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleEditStudent(event) {
    event.preventDefault();
    const campus = this.state.campuses.selectedCampus;
    const studentToAddToCampus = {
      id: event.target.studentId.value,
      campusId: campus.id
    }
    store.dispatch(editStudentCampus(studentToAddToCampus));
    this.props.history.push(`/campuses/${campus.id}`)
  }

  render() {
    const campus = this.state.campuses.selectedCampus;
    const students = this.state.students.allStudents;
    return (
      <div>
        <div className="header">
          <h1 className="header-heading">Add Student To Campus</h1>
        </div>
        <hr />
        <h3>Current Campus:   {campus.name} </h3><br /><br />
        <form onSubmit={this.handleEditStudent} >
          <div className="form-group">
            <label> Student to Add to Campus<br /> <br />
              <select name='studentId'>
                {students.map((student) =>
                  <option key={student.id} value={student.id}>{student.name}</option>
                )}
              </select>
            </label><br /><br />
          </div>
          <button type="submit" className="btn btn-default">Submit</button>
        </form>
        <hr />
      </div>
    );
  }
}
