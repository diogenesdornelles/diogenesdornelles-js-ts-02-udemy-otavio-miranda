

// renderizar HTML
exports.aboutPage = (req, res) => {
  let user;
  if (res.locals.loggedUser !== undefined) {
    user = res.locals.loggedUser.userName;
  } else {user = ''};
  res.render('about', {
    title: 'Sobre',
    user: user,
  });
}


