var express = require('express');
var router = express.Router();
var News = require('../models/News');
router.use(function(req, res, next){
  next()
})
// client
router.get('/', function (req, res, next) {
  var contentArr = [];
  News.find().sort({_id: -1}).then(function (contents){
    for(var i=0; i<3; i++) {
      contentArr.push(contents[i])
    }
    res.render('clients/index/index',{
      contentArr
    })
  })
})
/**
 * about
 */
router.get('/about', function(req, res, next){
  res.render('clients/about/about')
})
router.get('/about/:name', function (req, res, next) {
  var params = req.params.name || 'about';
  switch(params) {
    case 'about':
      res.render('clients/about/about')
      break;
    case 'team':
      res.render('clients/about/about_team')
      break;
    case 'road':
      res.render('clients/about/about_road');
      break;
    default:
      res.render('clients/about/about')
  }
})
/**
 * honor
 */
router.get('/honor', function (req, res, next) {
  res.render('clients/honor/honor')
})
router.get('/honor/:name', function (req, res, next) {
  var params = req.params.name || 'honor';
  switch(params) {
    case 'honor':
      res.render('clients/honor/honor')
      break;
    default:
      res.render('clients/honor/honor')
  }
})
/**
 * contact
 */
router.get('/contact', function (req, res, next) {
  res.render('clients/contact/contact')
})
router.get('/honor/:name', function (req, res, next) {
  var params = req.params.name || 'contact';
  switch(params) {
    case 'contact':
      res.render('clients/contact/contact')
      break;
    default:
      res.render('clients/contact/contact')
  }
})
/**
 * career
 */
router.get('/career', function (req, res, next) {
  res.render('clients/career/career')
})
router.get('/career/:name', function (req, res, next) {
  var params = req.params.name || 'career';
  switch(params) {
    case 'career':
      res.render('clients/career/career')
      break;
    default:
      res.render('clients/career/career')
  }
})
/**
 * product
 */
router.get('/product', function (req, res, next) {
  var typeIndex = Number(req.query.id || 0);
  switch(typeIndex) {
    case 0:
      res.render('clients/product/product')
      break;
    case 1:
      res.render('clients/product/product_metro')
      break;
    case 2:
      res.render('clients/product/product_pay')
      break;
    case 3:
      res.render('clients/product/product_noshop')
      break;
    case 4:
      res.render('clients/product/product_idcard')
      break;
    case 5:
      res.render('clients/product/product_management')
      break;
    default: 
      res.render('clients/product/product')
  }
  
})
router.get('/product/:name', function (req, res, next) {
  var params = req.params.name || 'product';
  var typeIndex = Number(req.query.id || 0);
  switch(params) {
    case 'product':
      switch (typeIndex) {
        case 0:
          res.render('clients/product/product')
          break;
        case 1:
          res.render('clients/product/product_metro')
          break;
        case 2:
          res.render('clients/product/product_pay')
          break;
        case 3:
          res.render('clients/product/product_noshop')
          break;
        case 4:
          res.render('clients/product/product_idcard')
          break;
        case 5:
          res.render('clients/product/product_management')
          break;
        default: 
          res.render('clients/product/product')
      }
      break;
    default:
      res.render('clients/product/product');
  }
})
/**
 * news
 */
router.get('/news', function (req, res, next) {
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
      res.render('clients/news/news',{
        contents,
        count,
        pages,
        page,
        limit,
        pagesArr,
        url: '/news'
      })
    })
  })
})
router.get('/news/detail', function (req, res, next) {
  var page = Number(req.query.page || 1);
  var id = req.query.id || '';
  News.findById({
    _id: id
  }).then(function(content){
    res.render('clients/news/news_detail', {
      content,
      page,
      url: '/news'
    })
  })
  
})

/**
 * 登陆后台
 */
router.get('/login', function(req, res, next){
  //退出
  req.cookies.set('userInfo', null)
  res.render('servers/login')
})
module.exports = router;