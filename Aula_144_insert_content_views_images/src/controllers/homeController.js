

// renderizar HTML
exports.homePage = (req, res) => {
  let user;
  if (res.locals.loggedUser !== undefined) {
    user = res.locals.loggedUser.userName;
  } else {user = ''};
  res.render('index', {
    title: 'Home',
    user: user,
  });
}

