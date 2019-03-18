'use strict'

const webHookController = {}

/**
 * index GET
 */
webHookController.index = (req, res, next) => res.render('home/index')

webHookController.webhook = async (req, res, next) => {
  let result = JSON.parse(req.body)

  let issues = result.map(issue => ({
    id: issue.id,
    title: issue.title,
    state: issue.state,
    comments: issue.comments,
    created_at: issue.created_at,
    updated_at: issue.updated_at,
    closed_at: issue.closed_at,
    body: issue.body
  }))
  res.sendStatus(200)
}

// Exports.
module.exports = webHookController
