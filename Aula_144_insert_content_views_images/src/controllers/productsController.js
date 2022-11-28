
// renderizar HTML
exports.productsPage = (req, res) => {
  let user;
  if (res.locals.loggedUser !== undefined) {
    user = res.locals.loggedUser.userName;
  } else {user = ''};
  res.render('products', {
    title: 'Produtos',
    user: user,
  });
}


