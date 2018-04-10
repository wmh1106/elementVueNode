const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.use((request, response, next) => {
  if (!request.userInfo.isAdmin) {
    response.send('对不起，只有管理员用户才可以访问')
    return
  }
  next()
})

router.get('/', (request, response) => {
  response.render('admin/index')
  return
})

router.get('/user', (request, response) => {
  // limit 限制获取的数据条数 , skip 忽略数据的条数
  let page = Number(request.query.page) || 1
  let limit = 1
  let skip = 0
  let pages = 0

  async function showDataList() {

    var count = await User.count()

    pages = Math.ceil(count / limit)
    // 页码不能大于总页数
    page = Math.min(page, pages)
    page = Math.max(page, 1)
    skip = (page - 1) * limit

    var users = await User.find().limit(limit).skip(skip)

    response.render('admin/user_index', {
      userInfo: request.userInfo,
      users: users,
      count: count,
      pages: pages,
      limit: limit,
      page: page
    })
  }

  showDataList()

  return
})

module.exports = router