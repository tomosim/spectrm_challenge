exports.handleCustomErrors = (err, req, res, next) => {
  const { status, msg } = err;
  if (status && msg) {
    res.status(status).send({ msg });
  } else {
    next(err);
  }
};

exports.handlePSQLErrors = (err, req, res, next) => {
  const codes = {
    22001: { status: 400, msg: "Maximum message length exceeded (255)" },
    "22P02": {
      status: 400,
      msg: "Incorrect format for message ID",
    },
  };
  if (err.code in codes) {
    res.status(codes[err.code].status).send({ msg: codes[err.code].msg });
  } else {
    next(err);
  }
};
