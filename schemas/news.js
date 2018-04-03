var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = new Schema ({
  image: String,
  title: String,
  describtion: String,
  content: String,
  addTime: {
    type: Date,
    default: new Date()
  }
})