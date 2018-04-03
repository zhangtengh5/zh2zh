var mongoose = require('mongoose');
var newsSchema = require('../schemas/news');
module.exports = mongoose.model('News', newsSchema)