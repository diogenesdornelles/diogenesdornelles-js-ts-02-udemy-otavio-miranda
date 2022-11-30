const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  nome: { 
    type: String,
    required: [true, "No need a name?"],
    trim: true,
    validate: {
      values: /^[ A-Za-z]+$/, 
      message: "Name user must have only letters os spaces."
    }
  },
}, {timestamps: true});

const User = mongoose.model('User', UserSchema);

module.exports = User;