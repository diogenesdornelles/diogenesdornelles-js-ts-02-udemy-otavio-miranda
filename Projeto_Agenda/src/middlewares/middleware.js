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
    console.log(err)
    return res.redirect('/');
  }
}

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
}

exports.ignoreFavicon = (req, res, next) => {
  if (req.originalUrl.includes('favicon.ico')) {
    res.status(204).end();
  }
  next();
}


