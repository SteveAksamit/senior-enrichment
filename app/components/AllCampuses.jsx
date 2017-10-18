import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import store, { fetchCampuses } from '../store'


export default class AllCampuses extends Component {

  constructor(props) {
    super(props);
    this.state = store.getState();
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() =>
      this.setState(store.getState())
    )
  }

  componentWillUnmount() {
    this.unsubscribe();
  }


  render() {
    const campuses = this.state.campuses.allCampuses;
    return (
      <div>
          <p><Link to={'/createcampus'} className="btn">Create New Campus</Link></p>
        <div className="header">
          <h1 className="header-heading">Campuses</h1>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Campus Name</th>
              <th>Campus Location</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {campuses.map(campus => {
              return (
                <tr key={campus.id}>
                  <td width="50%"><Link value={campus.id} to={`/campuses/${campus.id}`}>{campus.name}</Link></td>
                  <td width="50%">{campus.location}</td>
                </tr>
              )
            })}
          </tbody>
        </table>

      </div>
    )
  }
}

