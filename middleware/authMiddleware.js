const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).send({
        success: false,
        message: "Please provide auth token",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).send({
        success: false,
        message: "Invalid auth token",
      });
    }

    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "Unauthorized User",
        });
      }

      req.user = {
        id: decode.id,
      };

      next();
    });
  } catch (error) {
    console.log(error);

    return res.status(401).send({
      success: false,
      message: "Authentication failed",
    });
  }
};
