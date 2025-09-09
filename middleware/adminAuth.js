const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;

module.exports = function (req, res, next) {
  const authToken = req.headers["authorization"];

  if (authToken != undefined) {
    const bearer = authToken.split(" ");
    const token = bearer[1];

    try {
      const decoded = jwt.verify(token, jwtSecret);

      if (decoded.role == 1) {
        next();
      } else {
        res.status(403).json({ message: "Você não tem permissão para isso!" });
        return;
      }
    } catch (error) {
      res.status(403).json({ message: "Você não está autenticado" });
      return;
    }
  } else {
    res.status(403).json({ message: "Você não está autenticado" });
    return;
  }
};
