const socket = window.io.connect()

console.log('hej')

socket.on('newComment', issue => {
  console.log('new comment added')
  let comments = document.querySelector(`#issue-${issue.id} .comments`)
  comments.textContent = `Comments: ${issue.comments + 1}`
})

socket.on('newIssue', issue => {
  console.log(issue)
  console.log('new issue added')
  let issueContainer = document.querySelector('.issue-container')
  let issues = document.querySelector('.issues')
  let issueClone = document.importNode(issues, true)
  let id = issueClone.querySelector('.issue-id')
  let title = issueClone.querySelector('.issue-title')
  let body = issueClone.querySelector('.issue-body')
  let state = issueClone.querySelector('.issue-state')
  let comments = issueClone.querySelector('.issue-comments')
  let url = issueClone.querySelector('.issue-url')

  id.setAttribute('id', `issue-${issue.id}`)
  title.textContent = issue.title
  body.textContent = issue.body
  state.textContent = `Issue state: ${issue.state}`
  comments.textContent = `Comments: ${issue.comments}`
  url.setAttribute('href', issue.url)

  issueContainer.insertBefore(issueClone, issues)

  console.log(issueClone)
})

socket.on('closedIssue', issue => {
  let issueContainer = document.querySelector('.issue-container')
  let id = document.querySelector(`#issue-${issue.id}`)
  // id.parentNode.parentNode.parentNode.removeChild()
  issueContainer.removeChild(id.parentNode.parentNode)
})

socket.on('newTitle', issue => {
  let title = document.querySelector(`#issue-${issue.id} .issue-title`)
  title.textContent = issue.title
})
