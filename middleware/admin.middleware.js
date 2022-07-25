const isAdmin = (req, res, next) => {
  if (req.session.user.isAdmin) {
    next();
  } else {
    res.redirect("/profile");
  }
};

module.exports = {
  isAdmin,
};
