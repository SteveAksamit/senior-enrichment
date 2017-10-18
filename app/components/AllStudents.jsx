import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SingleStudent from './SingleStudent';
import store, { selectStudent, fetchStudents, deleteStudent } from '../store'

export default class AllStudents extends Component {

  constructor(props) {
    super(props);
    this.state = store.getState()
    this.handleDeleteStudent = this.handleDeleteStudent.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() =>
      this.setState(store.getState())
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleDeleteStudent(e) {
    console.log("in delete")
    const studentId = e.target.value;
    store.dispatch(deleteStudent(studentId));
    this.props.history.push('/students');
  }

  render() {


    return (
      <div>
         <p><Link to={'/createstudent'} className="btn" onClick={this.handleDeleteStudent}>Create New Student</Link></p>
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
            {this.state.students.allStudents.map(student => {
              let campus = this.state.campuses.allCampuses.filter(myCampus =>{return student.campusId == myCampus.id;});
              return (
                <tr key={student.id} >
                  <td width="25%">
                    <Link
                      value={student.id}
                      to={`/students/${student.id}`}>
                      {student.name}
                    </Link>
                  </td>
                  <td width="25%">{student.email}</td>
                  <td width="25%">{campus[0].name}</td>
                  <td><button className="btn" value={student.id}> Delete</button></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

