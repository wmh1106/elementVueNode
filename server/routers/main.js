const express = require('express')
const router = express.Router()

router.get('/', function (request, response) {
  // 传入用户登录信息（cookie 中）
  response.render('main/index', {
    userInfo: request.userInfo
  })
})

module.exports = router