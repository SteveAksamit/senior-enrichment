import React, { Component } from 'react';
import axios from 'axios';
import store, { editCampus } from '../store';

export default class EditCampus extends Component {

  constructor() {
    super();
    this.state = store.getState();
    this.handleEditCampus = this.handleEditCampus.bind(this)
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() =>
      this.setState(store.getState())
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleEditCampus(event) {
    event.preventDefault();
    const editedCampus = {
      id: this.state.singleCampus.selectedCampus.id,
      location: event.target.location.value
    }
    store.dispatch(editCampus(editedCampus));
    this.props.history.push('/campuses')
  }



  render() {
    const campus = this.state.singleCampus.selectedCampus;
    return (
      <div>
        <div className="header">
          <h1 className="header-heading">Edit Campus Details</h1>
        </div>
        <hr />
        <h3>Campus Name:   {campus.name} </h3>
        <h3>Current Campus Location:   {campus.location}</h3>
        <br />
        <form onSubmit={this.handleEditCampus}>
          <div className="form-group">
            <label> Enter New Location:
              <input
                name="location"
                type="text"
                className="form-control"
                required
              />
            </label>
          </div>
          <button type="submit" className="btn btn-default">Submit</button>
        </form>
        <hr />
      </div>
    );
  }
}


