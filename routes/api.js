var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/time', function(req, res, next) {
  var time = Date.now();
  var expires = new Date(req.session.cookie.expires).getTime();
  if (req.query.shouldUpdateSession === 'true') {
    req.session.time = time;
    req.session.touch();
  }
  res.json({ time: time, expires: expires });
});

module.exports = router;
