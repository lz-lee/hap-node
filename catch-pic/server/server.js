// 依赖模块
var express = require('express')
var path = require('path')
var fs = require('fs')
var request = require('request')
var cheerio = require('cheerio')
var mkdirp = require('mkdirp')
var bodyParser = require('body-parser')

var app = express()

app.use(bodyParser.json())

var Router = express.Router()

Router.post('/catchPic', function(req, res) {
  const {url, filesName} = req.body
  // 本地存储目录
  const dir = path.join(__dirname, '..', filesName)
  console.log(dir)
  // 创建目录
  mkdirp(dir, function(err) {
    if (err) {
      console.log(err)
      return res.json({
        code: 1,
        msg: '后台错误'
      })
    }
  })

  // 发送请求
  request(url, function(error, response, body) {
    if (error) {
      console.log(error)
      return res.json({
        code: 1,
        msg: '请求url错误'
      })
    } else {
      if (response.statusCode === 200) {
        var $ = cheerio.load(body);
        var count = 0
        var len = $('.outside .lazy').length
        $('.outside .lazy').each(function(index) {
          var src = $(this).attr('data-lazy');
          console.log('正在下载' + src);
          var filename = (index + 1) + path.extname(src).slice(0, -6)
          download(src, dir, filename);
          console.log('下载完成')
          count++
        });
        if (count === len) {
          return res.json({
            code: 0,
            msg: `请查看${filesName}文件夹`
          })
        }
      }
    }
  });

  // 下载方法
  var download = function(url, dir, filename) {
    request.head(url, function(res, body) {
      request(url).pipe(fs.createWriteStream(dir + '/' + filename));
    });
  }
})

app.use('/', Router)

app.listen(4501, function() {
    console.log('app run port 4501')
})