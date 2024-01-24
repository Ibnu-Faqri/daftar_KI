const { User } = require("../models");

async function isAdmin(req, res, next) {
  try {
    const userId = req.userId;

    const user = await User.findByPk(userId);

    if (user && user.isAdmin) {
      req.isAdmin = true;
      next();
    } else {
      req.isAdmin = false;
      throw new Error("Anda Bukan Admin!");
    }
  } catch (error) {
    next(error);
  }
}

module.exports = isAdmin;
