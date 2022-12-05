const { ValidateComment, ClientComment } = require('../models/CommentsModel');

// renderizar HTML
exports.commentsPage = (req, res) => {
  ClientComment.find()
    .then((comments) => {
      let user;
      if (res.locals.loggedUser !== undefined) {
      user = res.locals.loggedUser.userName;
      } else {user = ''};
      const result = comments.reverse();
      res.render('comments', {
        title: 'Comentários',    
        comments: result,
        user: user,
      });
    })
    
}

// // obter dados form via post
exports.commentsForm = (req, res, next) => {
  const msg = new ValidateComment(
    req.body.nome,
    req.body.comentario,
  )
  msg.saveCommentDB()
    .then(() => {
      next();
    })
    .catch(err => console.log(err));
}



