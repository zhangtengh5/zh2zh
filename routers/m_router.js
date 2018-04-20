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
    res.render('mobile/index',{
      contentArr
    })
  })
})
/**
 * about
 */
router.get('/m_about', function(req, res, next){
  res.render('mobile/about_index')
})
router.get('/m_about/:name', function (req, res, next) {
  var params = req.params.name || 'about';
  switch(params) {
    case 'honor':
      res.render('mobile/about_honor')
      break;
    case 'team':
      res.render('mobile/about_team')
      break;
    case 'road':
      res.render('mobile/about_road');
      break;
    default:
      res.render('mobile/about_index')
  }
})

/**
 * contact
 */
router.get('/m_contact', function (req, res, next) {
  res.render('mobile/contact_index')
})

/**
 * product
 */
router.get('/m_product', function (req, res, next) {
  var typeIndex = Number(req.query.id || 0);
  switch(typeIndex) {
    case 0:
      res.render('mobile/product_index')
      break;
    case 1:
      res.render('mobile/product_yl')
      break;
    case 2:
      res.render('mobile/product_metro')
      break;
    case 3:
      res.render('mobile/product_noshop')
      break;
    case 4:
      res.render('mobile/product_idcard')
      break;
    case 5:
    res.render('mobile/product_management')
      break;
    case 6:
      res.render('mobile/product_pay')
      break;
    default: 
      res.render('mobile/product_index')
  }
  
})

/**
 * news
 */
router.get('/m_news', function (req, res, next) {
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
      res.render('mobile/news_index',{
        contents,
        count,
        pages,
        page,
        limit,
        pagesArr,
        url: '/m_news'
      })
    })
  })
})
/*
router.get('/news_detail', function (req, res, next) {
  res.render('mobile/news_detail1')
})
*/
router.get('/m_news/news_detail', function (req, res, next) {
  var page = Number(req.query.page || 1);
  var id = req.query.id || '';
  News.findById({
    _id: id
  }).then(function(content) {
    res.render('mobile/news_detail', {
      content,
      page,
      url: '/m_news'
    })
  })
  
})

module.exports = router;