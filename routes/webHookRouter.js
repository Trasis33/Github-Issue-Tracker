'use strict'

const express = require('express')
const router = express.Router()
const crypto = require('crypto')

const controller = require('../controllers/webHookController')

// https://medium.com/chingu/how-to-verify-the-authenticity-of-a-github-apps-webhook-payload-8d63ccc81a24

const createComparisonSignature = (body) => {
  const hmac = crypto.createHmac('sha1', process.env.GHAUTH)
  const selfSignature = hmac.update(body).digest('hex')
  return `sha1=${selfSignature}`
}

const compareSignatures = (signature, comparisonSignature) => {
  const source = Buffer.from(signature)
  const comparison = Buffer.from(comparisonSignature)
  return crypto.timingSafeEqual(source, comparison)
}

const verifyGithubPayload = (req, res, next) => {
  const { headers, body } = req

  const signature = headers['x-hub-signature']
  const comparisonSignature = createComparisonSignature(body)

  if (!compareSignatures(signature, comparisonSignature)) {
    return res.status(401).send('Mismatched signatures')
  }

  next()
}

router.post('/', verifyGithubPayload, controller.webhook)

// Exports.
module.exports = router
