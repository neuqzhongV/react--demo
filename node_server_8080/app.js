// 项目的入口文件
// 1. 先导入express
var express = require('express');
// 2. 创建一个express服务
var app = express();
// 3. 导入Request模块，发起数据请求
var request = require('request');

// 设置Node.js跨域请求
app.use('*', function (req, res, next) {
    // 设置请求头为允许跨域
    res.header("Access-Control-Allow-Origin", "*");
    // 设置服务器支持的所有头信息字段
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    // 设置服务器支持的所有跨域请求的方法
    res.header("Access-Control-Allow-Methods", "POST,GET");
    // next()方法表示进入下一个路由
    next();
});

// 测试服务器是否启动成功
app.get('/', function (req, res) {
    res.send('服务器监听成功！');
});

// 获取电影列表
// 经过node.js转接之后，客户端浏览器只需要请求这三个地址，就能拿到对应的电影类型的数据：
// http://127.0.0.1:9999/getmovielist?type=in_theaters
// http://127.0.0.1:9999/getmovielist?type=coming_soon
// http://127.0.0.1:9999/getmovielist?type=top250
app.get('/getmovielist', function (req, res) {
    // 1. 获取到客户端浏览器发送过来的电影类型
    var movieType = req.query.type;
    // 2. 根据发送过来的电影类型，拼接上豆瓣电影的API地址，得到真正的豆瓣数据URL地址：
    var url = 'https://api.douban.com/v2/movie/' + movieType;
    // 3. 请求豆瓣API数据，并将请求回来的数据，转发给浏览器：使用第三方的`request`模块请求数据
    request(url, function (error, response, body) {
        // 第三个参数，也就是body，是我们真正获取过来的数据
        res.send(body);
    });
    // console.log(movieType);
    // res.send(movieType);
});

// 根据id ,获取电影详细数据
app.get('/getmoviedetail', function(req, res){
    // 获取电影Id
    const id = req.query.id;
    // 拼接URL地址
    const url = 'https://api.douban.com/v2/movie/subject/' + id;
    // 调用request获取电影详细数据并返回给浏览器
    request(url, function (error, response, body) {
        // 第三个参数，也就是body，是我们真正获取过来的数据
        res.send(body);
    });
});

// 启动监听程序
app.listen(9999, '127.0.0.1', function () {
    console.log('Node服务器正在监听http://127.0.0.1:9999这个地址...');
});