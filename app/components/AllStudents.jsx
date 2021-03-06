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
    store.dispatch(fetchStudents());
    this.unsubscribe = store.subscribe(() =>
      this.setState(store.getState())
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleDeleteStudent(e) {
    const studentId = e.target.value;
    store.dispatch(deleteStudent(studentId));
    this.props.history.push('/students');
  }

  render() {
    let campusName = '';
    let students = this.state.students.allStudents;
    return (
      <div>
         <p><Link to={'/students/createstudent'} className="btn">Create New Student</Link></p>
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
            {students.map(student => {
              let campus = this.state.campuses.allCampuses.filter(myCampus =>{return student.campusId == myCampus.id;});
              return (
                <tr key={student.id} >
                  <td width="25%">
                    <Link
                      value={student.id}
                      to={`/students/view/${student.id}`}>
                      {student.name}
                    </Link>
                  </td>
                  <td width="25%">{student.email}</td>
                  <td width="25%">{Object.keys(student).length === 0 ? campusName : student.campus.name}</td>
                  <td width="12.5%"><button className="btn" value={student.id} onClick={this.handleDeleteStudent}>Delete</button></td>
                  <td width="12.5%"><Link value={student.id} to={`/students/view/${student.id}`}><button className="btn">View</button></Link></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

