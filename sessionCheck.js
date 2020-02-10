module.exports = function (req, res, next) {
  if (req.session.login) {
    next();
  } else {
    res.redirect('/login');
  }
}
