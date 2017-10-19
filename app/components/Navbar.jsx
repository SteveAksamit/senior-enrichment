import React, { Component } from 'react';
import { Link, Switch } from 'react-router-dom';

export default class SingleCampus extends Component {


  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <nav className="navbar navbar-fixed-top navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
          <Link to={'/'}><h6 className="navbar-brand">Home</h6></Link>
          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li><Link to={'/campuses'}>CAMPUSES</Link></li>
              <li><Link to={'/students'}>STUDENTS</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}
