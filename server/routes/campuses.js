const router = require('express').Router();
const models = require('../../db/models');
const Campuses = models.Campuses;
var Promise = require('bluebird');
module.exports = router;

//get all campuses
router.get('/', ((req, res, next) => {
  Campuses.findAll({})
    .then(campuses => {
      res.json(campuses);
    })
    .catch(next);
}));

//get campus by id
router.get('/:id', ((req, res, next) => {
  Campuses.findAll({
    where: {
      id: req.params.id
    }
  })
    .then(campuses => (
      res.json(campuses)
    ))
    .catch(next);
}));

//add new campus
router.post('/', ((req, res, next) => {
  Campuses.create(req.body)
    .then((campus) => {
      res.json(campus);
    })
    .catch(next);
}));

//update campus
router.put('/:id', ((req, res, next) => {
  return Campuses.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(campusToUpdate => {
      return campusToUpdate.update({
        location: req.body.location
      })
      .then(updatedCampus =>{
        res.json(updatedCampus)
      })
    })
    .catch(next);
}));

// delete campus
router.delete('/:id', ((req, res, next) => {
  return Campuses.destroy({
    where: {
      id: req.params.id
    }
  })
    .then((deletedCampus) => {
      res.json(deletedCampus);
    })
    .catch(next);

}));

