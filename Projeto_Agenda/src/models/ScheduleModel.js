const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: [true, "No need a name?"],
    trim: true,
    validate: {
      validator: function(value) {
        return /^[ A-Za-zÀ-ú]+$/.test(value);
      },
      message: props => `${props.value} is not a valid name!`
    },
  },
  surname: { 
    type: String,
    required: [true, "No need a surname?"],
    trim: true,
    validate: {
      validator: function(value) {
        return /^[ A-Za-zÀ-ú]+$/.test(value);
      },
      message: props => `${props.value} is not a valid name!`
    },
  },
  _idContact: { 
    type: String,
    required: [true, "Need a idContact."],
    trim: true,
  },
  date: {
    type: Date,
    trim: true,
    required: [true, "No have date?"],
  },
  time: {
    type: String,
    required: [true, "No have time?."],
    trim: true,
  },
  service: {
    type: String,
    required: [true, "No need type service?"],
    trim: true,
  },
  message: {
    type: String,
  },
}, {timestamps: true});

const Schedule = mongoose.model('Schedule', ScheduleSchema);

module.exports = {
  Schedule
}