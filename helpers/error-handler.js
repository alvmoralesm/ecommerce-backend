function errorHandler(err, req, res, next) {
  //jwt auth err
  if (err.name === "UnauthorizedError") {
    return res.status(401).json({ message: "The user is not authorized" });
  }

  //validation err
  if (err.name === "ValidationError") {
    return res.status(401).json({ message: err });
  }

  //default err
  return res.status(500).json({ message: err.message });
}

module.exports = errorHandler;
