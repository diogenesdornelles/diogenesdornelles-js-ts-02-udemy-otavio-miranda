const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String, required: true },
},
  {timestamp: true}
);

const ClientMessage = mongoose.model('clientmessage', ContactSchema);

class ValidateMessage {
  constructor (name, email, phone, message){
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.message = message;
    this.valid = this.name && this.email && this.phone && this.message;

    this.saveMessageDB = () => {
      if (this.valid) {
        ClientMessage.create({
          name: this.name,
          email: this.email,
          phone: this.phone,
          message: this.message,
        })
        .then((data) => {
          console.log(data);
        })
        .catch(err => console.log(err));
      }
    }
  }
}

module.exports = ValidateMessage;
