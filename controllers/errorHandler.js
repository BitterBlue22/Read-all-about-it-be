exports.send404 = (req, res, next) => {
  res.status(404).send({ msg: "path not found" });
};
exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};
exports.handlePSQLErrors = (err, req, res, next) => {
  const codes400 = ["42601", "22P02", "42702"];

  if (codes400.includes(err.code)) {
    res.status(400).send({ msg: "bad request" });
  } else next(err);
};

exports.handle405s = (req, res, next) => {
  res.status(405).send({ msg: "invalid method" });
};

exports.handleInternalErrors = (err, req, res, next) => {
  console.log("unhandled error", err);
  res.status(500).send({ msg: "internal server error" });
};
