

// renderizar HTML
exports.homePage = (req, res) => {
  res.render('index', {
    title: 'Home',
  });
}

