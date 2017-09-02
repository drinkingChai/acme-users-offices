const router = require('express').Router();
const Office = require('../db').models.Office;

router.get('/', (req, res, next)=> {
  Office.findIncludeUser()
    .then(offices=> {
      res.send(offices);
    })
    .catch(next);
})

router.post('/', (req, res, next)=> {
  Office.create(req.body)
    .then(office=> {
      res.sendStatus(200);
    })
    .catch(next);
})

router.delete('/:id', (req, res, next)=> {
  Office.delete({ where: { id: req.params.id }})
    .then(office=> {
      res.sendStatus(200);
    })
    .catch(next);
})

module.exports = router;
