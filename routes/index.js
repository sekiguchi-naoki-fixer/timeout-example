var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var expires = req.session.cookie.expires;
  res.render('index', {
    title: 'Index Page',
    expires: expires
  });
});
router.post('/', function(req, res, next) {
  var expires = req.session.cookie.expires;
  res.render('index', {
    title: 'Index Page',
    expires: JSON.stringify(expires)
  });
});

module.exports = router;
