const router = require('express').Router();
module.exports = router;
const models = require('../../db/models');
const Students = models.Students;

//get all students
router.get('/', ((req, res, next) => {
  Students.findAll({})
    .then(students => {
      res.json(students);
    })
    .catch(next);
}));

//get student by id
router.get('/:id', ((req, res, next) => {
  Students.findAll({
    where: {
      id: req.params.id
    }
  })
    .then(student => (
      res.json(student)
    ))
    .catch(next);
}));

//add new student if it doesn't exist, otherwise update location
router.post('/', ((req, res, next) => {
  Students.create(req.body)
  .then(student => {
    res.json(student);
  })
    .catch(next);
}));


//update student
router.put('/:id', ((req, res, next) => {
  Students.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(studentToUpdate => {
      return studentToUpdate.update(
        req.body
      )
    })
    .then((updatedStudent) => {
      res.json(updatedStudent)
    })
    .catch(next);
  }))

//update student campus
router.put('/:id/campus', ((req, res, next) => {
  Students.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(studentToUpdate => {
      //MAGIC METHOD!!!
      return studentToUpdate.setCampus(req.body.campusId)
    })
    .then((updatedStudent) => {
      res.json(updatedStudent)
    })
    .catch(next)
}))

// delete student
router.delete('/:id', ((req, res, next) => {
  Students.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => {
      res.json("student deleted")
    })
    .catch(next);
}))
