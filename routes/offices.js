const router = require('express').Router();
const Office = require('../db').models.Office;

router.get('/', (req, res, next)=> {
  Office.findUserCount()
    .then(offices=> {
      // or just send count......
      res.send(offices);
    })
    .catch(next);
})

module.exports = router;
