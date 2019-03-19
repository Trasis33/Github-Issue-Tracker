'use strict'

const webHookController = {}
/**
 * index GET
 */
webHookController.index = (req, res, next) => res.render('home/index')

webHookController.webhook = async (req, res, next) => {
  const io = req.app.get('socket.io')

  let result = JSON.parse(req.body)

  let issues = {
    id: result.issue.id,
    number: result.issue.number,
    action: result.action,
    title: result.issue.title,
    username: result.issue.user.login,
    state: result.issue.state,
    comments: result.issue.comments,
    created_at: result.issue.created_at,
    updated_at: result.issue.updated_at,
    closed_at: result.issue.closed_at,
    body: result.issue.body
  }
  console.log(issues)

  // io.emit()

  res.sendStatus(200)
}

// Exports.
module.exports = webHookController
