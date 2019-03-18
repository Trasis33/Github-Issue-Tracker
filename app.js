
const express = require('express')
const hbs = require('express-hbs')
const path = require('path')
const logger = require('morgan')
const bodyParser = require('body-parser')

const app = express()

const server = require('http').createServer(app)
server.listen(3000, () => console.log('server running on port 3000'))
const io = require('socket.io')(server)
io.on('connection', (socket) => {
  console.log('user connected')
})

app.set('socket.io', io)

app.engine('hbs', hbs.express4({
  defaultLayout: path.join(__dirname, 'views', 'layouts', 'default'),
  partialsDir: path.join(__dirname, 'views', 'partials')
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

app.use(logger('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.raw({
  type: 'application/json'
}))

// app.use(handler.on('issues', function (event) {
//   console.log('Received an issue event for %s action=%s: #%d %s',
//     event.payload.repository.name,
//     event.payload.action,
//     event.payload.issue.number,
//     event.payload.issue.title)
// }))

// routes
app.use('/', require('./routes/homeRouter'))
app.use('/webhook', require('./routes/webHookRouter'))

// app.listen(3000, () => console.log('Server running at http://localhost:3000/'))
