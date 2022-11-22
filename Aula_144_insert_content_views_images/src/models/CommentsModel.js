const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  comment: { type: String, required: true },
},
  {timestamps: true}
);

const ClientComment = mongoose.model('clientcomment', CommentSchema);

class ValidateComment {
  constructor (name, comment){
    this.name = name;
    this.comment = comment;
    this.valid = this.name && this.comment;

    this.saveCommentDB = () => {
      if (this.valid) {
        ClientComment.create({
          name: this.name,
          comment: this.comment,
        })
        .then((data) => {
          console.log(data);
        })
        .catch(err => console.log(err));
      }
    }
  }
}

module.exports = {
  ValidateComment,
  ClientComment
}