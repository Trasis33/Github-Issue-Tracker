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
  let id = document.querySelector('.issue-id')
  let title = document.querySelector('.issue-title')
  let body = document.querySelector('.issue-body')
  let state = document.querySelector('.issue-state')
  let comments = document.querySelector('.issue-comments')
  let url = document.querySelector('.issue-url')

  id.setAttribute('id', `issue-${issue.id}`)
  title.textContent = issue.title
  body.textContent = issue.body
  state.textContent = `Issue state: ${issue.state}`
  comments.textContent = `Comments: ${issue.comments}`
  url.setAttribute('href', `https://github.com/${issue.url}`)

  issueContainer.insertBefore(issueClone, issueContainer)

  console.log(issueClone)
})
