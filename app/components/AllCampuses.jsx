import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import store, { fetchCampuses, deleteCampus } from '../store'


export default class AllCampuses extends Component {

  constructor(props) {
    super(props);
    this.state = store.getState();
    this.handleDeleteCampus = this.handleDeleteCampus.bind(this);
  }

  componentDidMount() {
    store.dispatch(fetchCampuses());
    this.unsubscribe = store.subscribe(() =>
      this.setState(store.getState())
    )
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleDeleteCampus(e) {
    const campusId = e.target.value;
    store.dispatch(deleteCampus(campusId));
    this.props.history.push('/campuses');
  }


  render() {
    const campuses = this.state.campuses.allCampuses;
    return (
      <div>
          <p><Link to={'/campuses/createcampus'} className="btn">Create New Campus</Link></p>
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
                  <td width="40%"><Link value={campus.id} to={`/campuses/view/${campus.id}`}>{campus.name}</Link></td>
                  <td width="40%">{campus.location}</td>
                  <td width="10%"><button className="btn" value={campus.id} onClick={this.handleDeleteCampus}>Delete</button></td>
                  <td width="10%"><Link value={campus.id} to={`/campuses/view/${campus.id}`}><button className="btn">View</button></Link></td>
                </tr>
              )
            })}
          </tbody>
        </table>

      </div>
    )
  }
}

