const express = require('express')
const router = express.Router()
const User = require('../models/User')


/*
1. `/`首页
2. `register` 用户注册
3. `login` 用户登录
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
常规
1. 用户名不能为空
2. 密码不能为空
3. 两次输入密码必须一致
数据库
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
    console.log('userInfo', userInfo)
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
    console.log('newUserInfo', newUserInfo)
    responseData.message = '注册成功'
    response.json(responseData)
  }).catch((err) => {
    console.log('err', err)
  })
})

module.exports = router