const express = require('express')
const router = express.Router()

router.get('/', function (request, response) {
  response.render('main/index')
})

module.exports = router