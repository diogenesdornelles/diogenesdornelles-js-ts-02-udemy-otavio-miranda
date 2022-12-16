exports.get_index_page = (req, res) => {
    res.render('index', { 
                logged: false,
                userName: false,
                _idUser: false,
              })
}

// exports.get_index_page_logOut = (req, res) => {
//     res.render('index', { 
//         logged: false,
//         userName: false,
//         _idUser: false,
//       })
// };


