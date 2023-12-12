const express = require('express')
const expressWs = require('express-ws')(express())
const path = require('path')

const app = expressWs.app
const port = 8000

const aWss = expressWs.getWss('/')

app.use(express.static(path.join(__dirname, 'static')))
app.use(express.json({ limit: '5mb' }))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'html', 'index.html'))
})

app.ws('/', function (ws, req) {
  ws.onmessage = function (msg) {
    aWss.clients.forEach(function (client) {
      if (client !== ws) {
        client.send(msg.data)
      }
    })
  }
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
