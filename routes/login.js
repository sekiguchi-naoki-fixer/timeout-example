var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login Page' });
});

router.post('/', function(req, res, next) {
  if (req.body.id) {
    req.session.login = true;
    res.redirect('../');
  }
  res.render('login', { title: 'Login Page' });
});

module.exports = router;
