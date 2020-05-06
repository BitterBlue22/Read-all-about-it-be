exports.send404 = (req, res, next) => {
  res.status(404).send({ msg: "path not found" });
};

exports.handlePSQLErrors = (err, req, res, next) => {
  const codes = { syntax_error: 42601 };
  if (err.code in codes) {
    const { status, msg } = codes[err.code];
    res.status(status).send({ msg });
  } else next(err);
};

exports.handle405s = (req, res, next) => {
  res.status(405).send({ msg: "invalid method" });
};

exports.handleInternalErrors = (err, req, res, next) => {
  console.log("unhandled error", err);
  res.status(500).send({ msg: "internal server error" });
};
