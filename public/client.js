const socket = window.io.connect()

console.log('hej')

socket.on('newComment', issue => {
  console.log('new comment added')
  let comments = document.querySelector(`#issue-${issue.id} .issue-comments`)
  comments.classList.add('new', 'red')
  comments.textContent = `Comments: ${issue.comments + 1}`
})

socket.on('newIssue', issue => {
  // console.log(issue)
  console.log('new issue added')
  let issueContainer = document.querySelector('.issue-container')
  let issues = document.querySelector('.issues')
  let issueClone = document.importNode(issues, true)
  let card = issueClone.querySelector('.card')
  let id = issueClone.querySelector('.issue-id')
  let title = issueClone.querySelector('.issue-title')
  let body = issueClone.querySelector('.issue-body')
  let createdAt = issueClone.querySelector('.created-at')
  let updatedAt = issueClone.querySelector('.updated')
  let comments = issueClone.querySelector('.issue-comments')
  let url = issueClone.querySelector('.issue-url')

  // console.log(card)

  card.classList.remove('blue-grey', 'darken-1')
  card.classList.add('green', 'lighten-1')

  id.setAttribute('id', `issue-${issue.id}`)
  title.textContent = issue.title
  body.textContent = issue.body
  createdAt.textContent = `Created at: ${issue.created_at}, ${issue.time}`
  updatedAt.textContent = `Updated at: ${issue.updated_at}, ${issue.update_time}`
  comments.textContent = `Comments: ${issue.comments}`
  url.setAttribute('href', issue.url)

  issueContainer.insertBefore(issueClone, issues)

  // console.log(issueClone)
})

socket.on('closedIssue', issue => {
  let issueContainer = document.querySelector('.issue-container')
  let id = document.querySelector(`#issue-${issue.id}`)
  issueContainer.removeChild(id.parentNode.parentNode)
})

socket.on('newTitle', issue => {
  let title = document.querySelector(`#issue-${issue.id} .issue-title`)
  let updatedAt = document.querySelector(`#issue-${issue.id} .updated`)
  updatedAt.classList.add('new', 'blue')
  title.textContent = issue.title
})
