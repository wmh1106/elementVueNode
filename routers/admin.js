const express = require('express')
const router = express.Router()

router.get('/user', function (request, response) {
  response.send('admin-User')
})

module.exports = router