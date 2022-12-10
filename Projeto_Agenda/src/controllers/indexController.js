exports.get_index_page = (req, res) => {
  res.render('index', {
    title: 'Home',
  });
}

