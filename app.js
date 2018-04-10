const express = require('express')
const swig = require('swig')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({
  extended: true
}))


// 静态文件托管
app.use('/public', express.static(__dirname + '/public'))

// 模板配置-使用swig解析 html 类型文件
app.engine('html', swig.renderFile)
// 模板配置-设置模板存放目录
app.set('views', './views')
// 模板配置-注册模板引擎
app.set('view engine', 'html')
// 缓存
swig.setDefaults({
  cache: false
})

// 引入 三个（路由）模块 
app.use('/admin', require('./routers/admin'))
app.use('/api', require('./routers/api'))
app.use('/', require('./routers/main'))

mongoose.connect('mongodb://localhost:27017/blog', function (err) {
  if (err) {
    console.log('数据库连接失败')
  } else {
    console.log('数据库连接成功')
    app.listen(8082)
  }
})