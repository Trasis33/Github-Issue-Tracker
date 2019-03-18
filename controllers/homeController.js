'use strict'

const fetch = require('node-fetch')
const dotenv = require('dotenv').config()
const homeController = {}

/**
 * index GET
 */
homeController.index = async (req, res, next) => {
  res.render('home/index')
  const result = await fetch('https://api.github.com/repos/1dv023/fl222pw-examination-3/issues', {
    headers: {
      Authorization: 'token ' + process.env.SECRET
    }
  })
  console.log(await result.json())
}

// Exports.
module.exports = homeController
