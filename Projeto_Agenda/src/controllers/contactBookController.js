exports.contactBookPage = (req, res) => {
  if (req.params.load === 'contactBookPage') {
  res.render('contactBook', {
    title: 'Agenda',
  });
  } else {
    res.render('index', {
      title: ''
    });
  }
}