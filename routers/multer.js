//上传图片
//引进multer模块  记得在终端安装multer模块
var multer = require('multer');
var path = require('path');
//开始配置
var storage = multer.diskStorage({
    //上传图片的路径，是在你的静态目录下（public）uploads会自动进行创建
    destination: path.join(__dirname, '../public/images/ueditor'),
  //给上传文件重命名，获取添加后缀名
    filename: function(req, file, callback){
      //图片命名
      callback(null, file.fieldname + '-' + Date.now()+'.jpg');
    }
})
//导出模块
module.exports = multer({storage:storage})