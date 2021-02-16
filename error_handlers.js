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

exports.containsHTML = (req, res, next) => {
  const htmlTag = /<.+?>/;
  const message = req.body.content;
  if (htmlTag.test(message)) {
    next({ msg: "Message cannot contain HTML tags", status: 400 });
  } else next();
};

exports.hasNoContent = (req, res, next) => {
  const message = req.body.content;
  if (message === undefined) {
    return next({
      msg: "No message content provided",
      status: 400,
    });
  } else next();
};
