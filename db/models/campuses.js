'use strict';
var Sequelize = require('sequelize');
var db = require('../index.js');

const Campuses = db.define('campuses', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  location: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

Campuses.beforeDestroy((campus) => {
  return campus.getStudents({
    where: {
      campusId: campus.id
    }
  })
    .then(studentsInCampus => {
      return studentsInCampus.destroy();
    });
});

module.exports = Campuses;

