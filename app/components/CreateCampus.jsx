import React, { Component } from 'react';
import axios from 'axios';
import store, { createCampus } from '../store';

export default class CreateCampus extends Component {

  constructor() {
    super();
    this.state = store.getState();
    this.handleCreateCampus = this.handleCreateCampus.bind(this)
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() =>
      this.setState(store.getState())
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleCreateCampus(event) {
    event.preventDefault();
    const newCampus = {
      name: event.target.name.value,
      location: event.target.location.value
    }
    store.dispatch(createCampus(newCampus));
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <div className="header">
          <h1 className="header-heading">Create New Campus</h1>
        </div>
        <hr />
        <form onSubmit={this.handleCreateCampus}>
          <div className="form-group">
            <label>Campus Name
              <input
                name="name"
                type="text"
                className="form-control"
                required
              />
            </label>
            <br />
            <label>Campus Location
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
