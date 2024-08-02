const jwt = require("jsonwebtoken")

const auth = async (req, res, next) => {
  try {
    const token = req?.headers?.authorization?.split(" ")[1];
    const custom = req?.headers?.authorization?.length < 500;

    let decodedData;

    if (token && custom && req?.headers?.authorization?.includes("Bearer")) {
      decodedData = jwt.verify(token, process.env.SECRET_KEY);
      req.userId = decodedData?.id;
    } else {
      // decodedData = jwt.decode(token);
      req.userId = req?.headers?.authorization;
    }

    next();
  } catch (error) {
    res.status(404).json({ message: "Unauthorized!" });
  }
};

module.exports = auth;