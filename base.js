var express = require('express');
var app = express();
var path = require('path');
var swig = require('swig');
var mongoose = require('mongoose');
var config = require('config-lite')(__dirname);
var useragent = require('express-useragent');
require('events').EventEmitter.defaultMaxListeners = 0;
app.use('/public', express.static(path.join(__dirname, 'public')));
app.engine('html', swig.renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
swig.setDefaults({cache: false, autoescape: false});
app.use(useragent.express());
mongoose.connect(config.mongodb, function(err) {
    if (err) {
        console.warn('数据库连接失败')
    } else {
        console.log('数据库连接成功')
    }
})
module.exports = app;