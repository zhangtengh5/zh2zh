var express = require('express');
var router = express.Router();
var User = require('../models/User');
var News = require('../models/News')
var path = require('path');
var sha1 = require('sha1');

router.use(function(req, res, next) {
  if(!req.userInfo.isAdmin) {
      res.redirect('/login')
      return
  }
  next()
})

router.get('/', function(req, res, next){
  res.render('servers/index', {
    userInfo: req.userInfo
  })
})

/**
 * 用户管理
 */
router.get('/user', function(req, res, next){
  if(!req.userInfo.isManage) {
    res.send('您没有用户管理权限')
    return
  }
  var page = Number(req.query.page || 1);
  var limit = 5;
  var pages = 0;
  var pagesArr = [];
  User.count().then(function (count) {
    pages = Math.ceil(count/limit);
    for(var i = 1; i < (pages+1); i++) {
      pagesArr.push(i)
    }
    //page范围
    page = Math.min(page, pages)
    page = Math.max(page, 1)
    //忽略条数
    var skip = (page-1)*limit;
    User.find().sort({_id: -1}).limit(limit).skip(skip).then(function (users){
      res.render('servers/user_index', {
        userInfo: req.userInfo,
        users,
        count,
        pages,
        page,
        limit,
        pagesArr,
        url: '/admin/user'
      })
    })
  })
})
router.get('/user/add', function(req, res, next) {
  if(!req.userInfo.isManage) {
    res.send('您没有用户管理权限')
    return
  }
  res.render('servers/user_add', {
    userInfo: req.userInfo
  })
})
router.post('/user/add', function(req, res, next){
  var username = req.body.username;
  var password = req.body.password;
  var repassword = req.body.repassword;
  if (!(username && password && repassword)) {
    res.render('servers/error', {
      userInfo: req.userInfo,
      message: '用户名或密码不能为空',
      url: '/admin/user/add'
    })
    return
  }
  if (password !== repassword) {
    res.render('servers/error', {
      userInfo: req.userInfo,
      message: '密码不一致',
      url: '/admin/user/add'
    })
    return
  }
  User.findOne({
    username: username
  }).then(function(user){
    if (user) {
      res.render('servers/error', {
        userInfo: req.userInfo,
        message: '用户名已存在',
        url: '/admin/user/add'
      })
      return Promise.reject();
    } else {
      password = sha1(password);
      return new User({
        username: username,
        password: password
      }).save()
    }
  }).then(function(newUser){
    res.redirect('/admin/user');
  })
})

router.get('/user/edit', function(req, res, next){
  res.render('servers/user_edit', {
    userInfo: req.userInfo
  })
})

router.post('/user/edit', function(req, res, next) {
  var oldPassword = req.body.oldpassword;
  var password = req.body.password;
  var id = req.query.id;
  if (!oldPassword || !password ) {
    res.render('servers/error', {
      userInfo: req.userInfo,
      message: '旧密码或新密码不能为空',
      url: '/admin/user'
    })
  } else {
    User.findById(id).then(function(user) {
      if (!user) {
        res.render('servers/error', {
          userInfo: req.userInfo,
          message: '用户不存在',
          url: '/admin/user'
        })
      } else {
        if (user.password !== sha1(oldPassword)) {
          res.render('servers/error', {
            userInfo: req.userInfo,
            message: '旧密码错误',
            url: '/admin/user'
          })
        } else {
          password = sha1(password);
          User.update({
            _id: id
          }, {
            password: password
          }).then(function(){
            res.redirect('/admin/user');
          })
        }
      }
    })
  }
})
router.get('/user/delete', function(req, res, next) {
  var id = req.query.id;
  User.remove({
    _id: id
  }).then(function(){
    res.redirect('/admin/user')
  })
})
/**
 * 新闻管理
 */
router.get('/news',function(req, res, next){
  var page = Number(req.query.page || 1);
  var limit = 5;
  var pages = 0;
  var pagesArr = [];
  News.count().then(function(count){
    pages = Math.ceil(count/limit);
    for(var i = 1; i < (pages+1); i++) {
      pagesArr.push(i)
    }
    //page范围
    page = Math.min(page, pages)
    page = Math.max(page, 1)
    //忽略条数
    var skip = (page-1)*limit;
    News.find().sort({_id: -1}).limit(limit).skip(skip).then(function (contents){
      res.render('servers/news', {
        userInfo: req.userInfo,
        contents,
        count,
        pages,
        page,
        limit,
        pagesArr,
        url: '/admin/news'
      })
    })
  })
})
router.get('/news/add', function(req, res, next){
  res.render('servers/news_add', {
    userInfo: req.userInfo
  })
})
router.post('/news/add', function(req, res, next){
  var image = req.body.image;
  var title = req.body.title;
  var describtion = req.body.describtion;
  var newscontent = req.body.editorValue;
  if (!(image && title && describtion && newscontent)) {
    res.render('servers/error', {
      userInfo: req.userInfo,
      message: '标题、概括、内容都不能为空',
      url: '/admin/news/add'
    })
  } else {
    News.findOne({
      title: title
    }).then(function(content){
      if (content) {
        res.render('servers/error', {
          userInfo: req.userInfo,
          message: '新闻标题已存在',
          url: '/admin/news/add'
        })
        return Promise.reject();
      } else {
        return new News ({
          title: title,
          describtion: describtion,
          content: newscontent,
          image: image
        }).save()
      }
    }).then(function(newConetent){
      res.redirect('/admin/news')
    })
  }
})
router.get('/news/edit', function(req, res, next){
  var id = req.query.id || '';
  News.findById({
    _id: id
  }).then(function(content){
    if(!content) {
      res.render('servers/error', {
        userInfo: req.userInfo,
        message: '此条新闻不存在',
        url: '/admin/news'
      })
    } else {
      res.render('servers/news_edit', {
        userInfo: req.userInfo,
        content
      })
    }
  })
})
router.post('/news/edit', function(req, res, next){
  var id = req.query.id || '';
  var title = req.body.title;
  var describtion = req.body.describtion;
  var newscontent = req.body.editorValue;
  var image = req.body.image;
  if (!(image && title && describtion && newscontent)) {
    res.render('servers/error', {
      userInfo: req.userInfo,
      message: '标题、概括、内容都不能为空',
      url: '/admin/news'
    })
  } else {
    News.findById({
      _id: id
    }).then(function(content){
      if (!content) {
        res.render('servers/error', {
          userInfo: req.userInfo,
          message: '新闻标题不存在',
          url: '/admin/news'
        })
        return Promise.reject();
      } else {
        return News.findOne({
            _id: {$ne: id},
            title: title
        })
      }
    }).then(function(sameConetent){
      if (sameConetent) {
        res.render('servers/error', {
          userInfo: req.userInfo,
          message: '新闻标题标题已经存在',
          url: '/admin/news'
        })
        return Promise.reject();
      } else {
        return News.update({
          _id: id
        }, {
          title: title,
          describtion: describtion,
          content: newscontent,
          image: image
        })
      }
    }).then(function(){
      res.redirect('/admin/news')
    })
  } 
})
router.get('/news/delete', function(req, res, next){
  var id = req.query.id;
  News.remove({
    _id: id
  }).then(function(){
    res.redirect('/admin/news')
  })
})
module.exports = router;