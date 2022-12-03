// EXAMPLE:
exports.middlewareGlobal = (req, res, next) => {
  if (!req.session.logged) {
    req.session.user = {
      logged: false,
      userName: null,
    }
  }
  next();
}

exports.checkCsrfError = (err, req, res, next) => {
  if (err && err.code === 'EBADCSRFTOKEN') {
    return res.render('404');
  }
}

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
}


