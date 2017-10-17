import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SingleStudent from './SingleStudent';
import store, { fetchStudents } from '../store'

export default class AllStudents extends Component {

  constructor(props) {
    super(props);
    this.state = store.getState()
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() =>
      this.setState(store.getState())
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {

    return (
      <div>
        <div className='header'>
          <h1 className='header-heading'>Students</h1>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Student Email</th>
              <th>Campus</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.students.map(student => {
              const campus = this.state.campuses.filter(campus =>{return student.campusId == campus.id});
              return (
                <tr key={student.id}>
                  <td width="33%"><Link value={student.id} to={`/students/${student.id}`}>{student.name}</Link></td>
                  <td width="33%">{student.email}</td>
                  <td width="34%">{campus[0].name}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <hr />
        <p><Link to={'/createstudent'} className="btn">Create New Student</Link></p>
        <hr />
      </div>
    )
  }
}

