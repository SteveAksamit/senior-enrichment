const router = require('express').Router();
module.exports = router;



router.use('/campuses', require('./campuses'));
router.use('/students', require('./students'));

router.use(function (req, res) {
  res.status(404).end();
});
