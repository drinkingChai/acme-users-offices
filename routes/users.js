const router = require('express').Router();
const User = require('../db').models.User;

router.get('/', (req, res, next)=> {
  User.findIncludeOffice()
    .then(users=> {
      res.send(users);
    })
    .catch(next);
})

router.post('/', (req, res, next)=> {
  User.create(req.body)
    .then(user=> {
      res.send(user);
    })
    .catch(next);
})

router.delete('/:id', (req, res, next)=> {
  User.delete({ where: { id: req.params.id }})
    .then(users=> {
      res.sendStatus(200);
    })
    .catch(next);
})

router.put('/:id', (req, res, next)=> {
  User.update(req.body, { where: { id: req.params.id }})
    .then(users=> {
      res.sendStatus(200);
    })
    .catch(next);
})

module.exports = router;
