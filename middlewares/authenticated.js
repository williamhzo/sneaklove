const isAuth = (req, res, next) => {
  if (res.locals.isLoggedIn) {
    next();
  } else {
    res.redirect('/');
  }
};

module.exports = isAuth;
