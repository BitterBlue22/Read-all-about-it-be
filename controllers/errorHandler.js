exports.send404 = (req, res, next) => {
  res.status(404).send({ msg: "path not found" });
};

exports.handleInternalErrors = (err, req, res, next) => {
  console.log("unhandled error", err);
  res.status(500).send({ msg: "internal server error" });
};
