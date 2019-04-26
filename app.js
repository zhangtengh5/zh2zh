var express = require('express');
var app = express();
var path = require('path');
var swig = require('swig');
var mongoose = require('mongoose');
var config = require('config-lite')(__dirname);
var useragent = require('express-useragent');
var bodyParser = require('body-parser');
var Cookies = require('cookies');
var User = require('./models/User');
var ueditor = require("ueditor");
require('events').EventEmitter.defaultMaxListeners = 0;
app.use('/public', express.static(path.join(__dirname, 'public')));
app.engine('html', swig.renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
swig.setDefaults({cache: false, autoescape: false});
app.use(useragent.express());
app.use(express.static(path.join(__dirname, 'uditors')));
//post提交过来的数据
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//缓存
app.use(function(req, res, next) {
    req.cookies = new Cookies(req, res);
    req.userInfo = {};
    if(req.cookies.get('userInfo')) {
        try {
            req.userInfo = JSON.parse(req.cookies.get('userInfo'));
            User.findById(req.userInfo._id).then(function(userInfo){
                if (userInfo) {
                    req.userInfo.isAdmin = Boolean(userInfo.isAdmin); //进入后台验证
                    req.userInfo.isManage = Boolean(userInfo.isManage);//后台权限管理验证
                }
                next()
            })
        } catch (error) {
            next()
        }
    } else {
        next()
    }
})

app.use("/ueditor/ue", ueditor(path.join(__dirname), function(req, res, next) {
    // ueditor 客户发起上传图片请求
  
    if(req.query.action === 'uploadimage'){
  
      // 这里你可以获得上传图片的信息
      var foo = req.ueditor;
      //console.log(foo.filename); // exp.png
      //console.log(foo.encoding); // 7bit
      //console.log(foo.mimetype); // image/png
  
      // 下面填写你要把图片保存到的路径 （ 以 path.join(__dirname, 'public') 作为根路径）
      var img_url = '/public/images/ueditor';
      res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
    }
    //  客户端发起图片列表请求
    else if (req.query.action === 'listimage'){
      var dir_url = '/public/images/ueditor'; // 要展示给客户端的文件夹路径
      res.ue_list(dir_url) // 客户端会列出 dir_url 目录下的所有图片
    }
    // 客户端发起其它请求
    else {
      res.setHeader('Content-Type', 'application/json');
      // 这里填写 ueditor.config.json 这个文件的路径
      res.redirect('/ueditor/nodejs/config.json');
}}));

/* 
    根据不同的功能划分模块
 */
app.use('/admin', require('./routers/admin.js'));
app.use('/api', require('./api/api.js'));
app.use('/', require('./routers/router.js'));
mongoose.connect(config.mongodb, function(err) {
    if (err) {
        console.warn('数据库连接失败');
    } else {
        console.log('数据库连接成功');
        app.listen(config.app.port, function() {
            console.log(`http://localhost:${config.app.port}`);
        })
    }
})

