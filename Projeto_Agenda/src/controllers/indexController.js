exports.get_index_page = (req, res) => {
  console.log('index')
  res.render('index', { 
              logged: false,
              userName: false,
              _idUser: false,
            })
}
