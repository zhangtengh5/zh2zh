var app = require('./base.js');
var config = require('config-lite')(__dirname);
app.use('/', require('./routers/m_router.js'));
app.listen(config.m_app.port, function(){
    console.log(`运行端口号为:${config.m_app.port}`)
})