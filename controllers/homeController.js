'use strict'

const fetch = require('node-fetch')
const dotenv = require('dotenv').config()
const homeController = {}

/**
 * index GET
 */
homeController.index = async (req, res, next) => {
  const result = await fetch('https://api.github.com/repos/1dv023/fl222pw-examination-3/issues', {
    headers: {
      Authorization: 'token ' + process.env.SECRET
    }
  })
  const data = await result.json()
  let issues = data.map(issue => ({
    id: issue.id,
    username: issue.user.login,
    title: issue.title,
    state: issue.state,
    comments: issue.comments,
    created_at: issue.created_at,
    updated_at: issue.updated_at,
    closed_at: issue.closed_at,
    body: issue.body,
    url: issue.url.substring(28)
  }))

  console.log(issues)
  // console.log(await result.json())
  // return result
  res.render('home/index', { issues })
}

// Exports.
module.exports = homeController
