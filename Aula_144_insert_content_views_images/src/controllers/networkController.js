// renderizar HTML
exports.networkPage = (req, res) => {
  let user;
  if (res.locals.loggedUser !== undefined) {
    user = res.locals.loggedUser.userName;
  } else {user = ''};
  res.render('network', {
    title: 'Nossas redes',
    user: user,
  });
}


