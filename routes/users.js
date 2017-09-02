const router = require('express').Router();
const User = require('../db').models.User;
const Office = require('../db').models.Office;

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
  User.destroy({ where: { id: req.params.id }})
    .then(users=> {
      res.sendStatus(200);
    })
    .catch(next);
})

router.put('/:id', (req, res, next)=> {
  let user;
  User.findOne({ where: { id: req.params.id }})
    .then(_user=> {
      user = _user;
      return Office.findOne({ where: { id: req.body.officeId }})
    })
    .then(office=> {
      return user.setOffice(office);
    }).then(user=> {
      res.send(user);
    })
    .catch(next);
})

module.exports = router;
