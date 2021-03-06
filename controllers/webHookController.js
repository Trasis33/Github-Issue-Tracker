'use strict'

const webHookController = {}

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
    created_at: result.issue.created_at.substring(0, 10),
    time: result.issue.created_at.substring(11, 16),
    updated_at: result.issue.updated_at.substring(0, 10),
    update_time: result.issue.updated_at.substring(11, 16),
    closed_at: result.issue.closed_at,
    body: result.issue.body,
    url: result.html_url
  }
  console.log(result.action)

  switch (result.action) {
    case 'created':
      io.emit('newComment', issues)
      break
    case 'opened':
      io.emit('newIssue', issues)
      break
    case 'reopened':
      io.emit('newIssue', issues)
      break
    case 'closed':
      io.emit('closedIssue', issues)
      break
    case 'edited':
      io.emit('newTitle', issues)
      break
    default:
      console.log('no action')
  }

  // if (issues.action === 'created') {
  //   io.emit('newComment', issues)
  // }

  res.sendStatus(200)
}

// Exports.
module.exports = webHookController
