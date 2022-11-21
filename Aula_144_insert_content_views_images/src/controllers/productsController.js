// const HomeModel = require('../models/HomeModel');


// exports.showDataFromDB = (req, res) => {
//   HomeModel.find()
//   .then((data) => {
//     console.log(data);
//   })
//   .catch(err => console.log(err));
// }

// renderizar HTML
exports.productsPage = (req, res) => {
  res.render('products', {
    title: 'Produtos',
  });
}


