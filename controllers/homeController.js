'use strict'

const fetch = require('node-fetch')
const dotenv = require('dotenv')
dotenv.config()
const homeController = {}

/**
 * index GET
 */
homeController.index = async (req, res, next) => {
  const result = await fetch('https://api.github.com/repos/1dv023/fl222pw-examination-3/issues?state=open', {
    headers: {
      Authorization: 'token ' + process.env.SECRET
    }
  })
  // const result2 = await fetch('https://api.github.com/repos/1dv023/fl222pw-examination-3/issues?state=closed', {
  //   headers: {
  //     Authorization: 'token ' + process.env.SECRET
  //   }
  // })

  // await result.json()
  // await result2.json()

  // console.log(JSON.parse(result))
  // console.log(JSON.parse(result2))

  // let concatIssues = result.concat(result2)

  // concatIssues.sort((a, b) => b.number - a.number)

  const data = await result.json()
  let issues = data.map(issue => ({
    id: issue.id,
    username: issue.user.login,
    title: issue.title,
    state: issue.state,
    comments: issue.comments,
    created_at: issue.created_at.substring(0, 10),
    time: issue.created_at.substring(11, 16),
    updated_at: issue.updated_at.substring(0, 10),
    update_time: issue.updated_at.substring(11, 16),
    closed_at: issue.closed_at,
    body: issue.body,
    url: issue.html_url
  }))

  // console.log(issues)
  // console.log(await result.json())
  // return result
  res.render('home/index', { issues })
}

// Exports.
module.exports = homeController
