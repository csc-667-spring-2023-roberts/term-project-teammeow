const isAuthenticated = (req, res, next) => {
  const { user } = req.session;
  if (user != undefined && user.id != undefined) res.locals.user = user;
  next();
};

module.exports = isAuthenticated;
