'use strict'

const express = require('express')
const router = express.Router()

const controller = require('../controllers/webHookController')

router.post('/', controller.webhook)

// Exports.
module.exports = router
