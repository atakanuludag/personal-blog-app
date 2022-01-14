require('dotenv').config()
const express = require('express')
const next = require('next')
const port = process.env.APP_PORT
const dev = false
const app = next({ dev })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()
    const router = express.Router()

    router.get('*', (req, res) => {
      return handle(req, res)
    })

    server.use(router)

    server.use(
      '/static',
      express.static(__dirname + '/static', {
        maxAge: '365d',
      }),
    )

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })
