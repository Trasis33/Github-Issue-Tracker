'use strict'

const express = require('express')
const router = express.Router()

const controller = require('../controllers/homeController')

// GET /
router.get('/', controller.index).post('/', (req, res) => {
  res.send('Post request was made')
})

// Exports.
module.exports = router
