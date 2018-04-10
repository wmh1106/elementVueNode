const express = require('express')
const router = express.Router()
const User = require('../models/User')


/*
1. `/`首页
2. `register` 用户注册
3. `login` 用户登录
4. `logout` 用户退出
4. `comment` 评论获取
5. `comment/post` 评论提交
*/
let responseData = null
router.use(function (request, response, next) {
  responseData = {
    code: 0,
    message: ''
  }
  next()
})


/*

用户注册

- 常规
  1. 用户名不能为空
  2. 密码不能为空
  3. 两次输入密码必须一致
- 数据库
  1. 用户名是否已注册：数据库查询
*/

router.post('/user/register', function (request, response) {
  const username = request.body.username
  const password = request.body.password
  const repassword = request.body.repassword

  if (username === '') {
    responseData.code = 1
    responseData.message = '用户名不能为空'
    response.json(responseData)
    return
  }
  if (password === '') {
    responseData.code = 1
    responseData.message = '密码不能为空'
    response.json(responseData)
    return
  }
  if (password !== repassword) {
    responseData.code = 1
    responseData.message = '两次输入密码不一致'
    response.json(responseData)
    return
  }

  // 数据库查询
  User.findOne({
    username: username
  }).then((userInfo) => {
    if (userInfo) {
      responseData.code = 1
      responseData.message = '用户名已注册'
      response.json(responseData)
      return
    } else {
      const user = new User({
        username: username,
        password: password
      })
      return user.save()
    }
  }).then((newUserInfo) => {
    responseData.message = '注册成功'
    response.json(responseData)
  }).catch((err) => {
    console.log('err', err)
  })

})

router.post('/user/login', (request, response) => {
  const username = request.body.username
  const password = request.body.password

  if (username === '') {
    responseData.code = 1
    responseData.message = '用户名不能为空'
    response.json(responseData)
    return
  }

  if (password === '') {
    responseData.code = 1
    responseData.message = '密码不能为空'
    response.json(responseData)
    return
  }

  User.findOne({
    username,
    password
  }).then((userInfo) => {
    if (!userInfo) {
      responseData.code = 1
      responseData.message = ' 用户名或密码错误'
      response.json(responseData)
      return
    }
    responseData.message = ' 登录成功'
    responseData.data = {
      id: userInfo._id,
      username: userInfo.username
    }
    request.cookies.set('userInfo', JSON.stringify({
      id: userInfo._id,
      username: userInfo.username
    }))
    response.json(responseData)
  }).catch((err) => {
    console.log('error', err)
  })
})

router.get('/user/logout', (request, response) => {
  request.cookies.set('userInfo', null)
  responseData.message = '退出成功'
  response.json(responseData)
})


module.exports = router