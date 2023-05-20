const { Users } = require("../db");

const isAuthenticated = async (req, res, next) => {
  const sUser = req.session.user;

  try {
    const user = await Users.getUserByID(sUser.id);
    res.locals.user = user;
    next();
  } catch (err) {
    res.redirect("/auth/login");
  }
};

module.exports = isAuthenticated;
