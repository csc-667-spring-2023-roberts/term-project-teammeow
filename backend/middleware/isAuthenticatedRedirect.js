const isAuthenticated = (req, res, next) => {
  const { user, id } = req.session;

  if (user != undefined && user.id != undefined) {
    res.locals = { user, session: id };
    next();
  } else {
    res.redirect("/auth/login");
  }
};

module.exports = isAuthenticated;
