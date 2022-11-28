const fs = require('fs');

exports.middlewareGlobal = (req, res, next) => {
  if (fs.existsSync(`./src/models/db/userLogged.json`)) {
    fs.readFile(`./src/models/db/userLogged.json`, (err, data) => {
      if (err) throw err;
      res.locals.loggedUser = JSON.parse(data);
      next();
    }); 
  } else {
    next();
  }
}