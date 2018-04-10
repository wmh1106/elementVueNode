const express = require('express')
const swig = require('swig')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookies = require('cookies')

const app = express()

const User = require('./models/User')
// bodyParser
app.use(bodyParser.urlencoded({
  extended: true
}))
// cookies
app.use((request, response, next) => {
  request.cookies = new cookies(request, response)

  const cookies_userInfo = request.cookies.get('userInfo')

  if (cookies_userInfo) {
    request.userInfo = JSON.parse(cookies_userInfo)
    // 获取当前登录用户的类型：普通|管理员
    User.findById(request.userInfo.id).then((userInfo) => {
      request.userInfo.isAdmin = Boolean(userInfo.isAdmin)
      next()
    })
  } else {
    request.userInfo = null
    next()
  }
})

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