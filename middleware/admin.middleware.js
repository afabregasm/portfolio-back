const isAdmin = (req, res, next) => {
  if (req.payload.isAdmin) {
    next();
  } else {
    res.redirect("/profile");
  }
};

module.exports = {
  isAdmin,
};
