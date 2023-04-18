const isAuthenticated = (req, res, next) => {
  const { user } = request.session;

  if (user != undefined && user.id != undefined) {
    next();
  } else {
    res.redirect("/login");
  }
};
