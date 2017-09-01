const router = require('express').Router();
const User = require('../db').models.User;

router.get('/', (req, res, next)=> {
  User.findAll()
    .then(users=> {
      res.send(users);
    })
    .catch(next);
})

module.exports = router;
