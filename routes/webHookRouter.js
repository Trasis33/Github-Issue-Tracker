'use strict'

const express = require('express')
const router = express.Router()

const controller = require('../controllers/webHookController')

// GET /
// router.route('/webhook')
//   .get(controller.webhook)
router.get('/', controller.index).post('/', controller.webhook)

// Exports.
module.exports = router
