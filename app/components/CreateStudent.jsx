import React, { Component } from 'react';
import axios from 'axios';
import store, { createStudent } from '../store';

export default class CreateStudent extends Component {

  constructor() {
    super();
    this.state = store.getState();
    this.handleCreateStudent = this.handleCreateStudent.bind(this)
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() =>
      this.setState(store.getState())
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleCreateStudent(event) {
    event.preventDefault();
    const newStudent = {
      name: event.target.name.value,
      email: event.target.email.value,
      campusId: event.target.campusId.value
    }
    store.dispatch(createStudent(newStudent));
    this.props.history.push('/students')
  }

  render() {
    const campuses = this.state.campuses.allCampuses;
    return (
      <div>
        <div className="header">
          <h1 className="header-heading">Create New Student</h1>
        </div>
        <hr />
        <form onSubmit={this.handleCreateStudent}>
          <div className="form-group">
            <label>Student Name
                <input
                name="name"
                type="text"
                className="form-control"
                required
              />
            </label>
            <br />
            <br />
            <label>Student Email Address
                <input
                name="email"
                type="email"
                className="form-control"
                required
              />
            </label>
            <br />
            <br />
            <label> Assign Campus
              <br />
              <br />
              <select name='campusId'>
                {campuses.map((campus) =>
                  <option key={campus.id} value={campus.id}>{campus.name}</option>
                )}
              </select>
            </label>
            <br />
          </div>
          <button type="submit" className="btn btn-default">Submit</button>
        </form>
        <hr />
      </div>
    );
  }
}
