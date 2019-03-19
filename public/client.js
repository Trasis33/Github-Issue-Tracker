const socket = window.io.connect()

console.log('hej')

socket.on('newComment', issue => {
  // console.log(issue)
  console.log('new comment added')
  let comments = document.querySelector('.comments')
  console.log(comments)
})

socket.on('newIssue', issue => {
  console.log(issue)
  console.log('new issue added')
})
