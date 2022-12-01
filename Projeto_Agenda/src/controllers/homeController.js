exports.homePage = (req, res) => {
  if (req.params.load === 'homePage') {
  res.render('home', {
    title: 'Home',
  });
  } else {
     return;
  }
}

