var express = require('express');
var router = express.Router();
var User = require('../models/User');
var sha1 = require('sha1');
var responseData;
router.use(function(req, res, next){
    responseData = {
        code: 0,
        message: ''
    }
    next();
})
router.post('/user/login', function(req, res, next){
  var username = req.body.username;
  var password = req.body.password;
  if (username == '' || password == '') {
      responseData.code = 1;
      responseData.message = '账户或者密码不能为空';
      res.json(responseData);
      return
  }
  User.findOne({
    username: username
  })
  .then(function (user) {
    if(!user) {
      responseData.code = 2;
      responseData.message = '用户不存在';
      res.json(responseData);
      return
    }
    // 检查密码是否匹配
    if (sha1(password) !== user.password) {
      responseData.code = 2;
      responseData.message = '密码错误';
      res.json(responseData);
      return
    }
    responseData.message = '登陆成功';
    req.cookies.set('userInfo', JSON.stringify({
      _id: user._id,
      username: user.username
    }))
    res.json(responseData);
  })
})

module.exports = router;