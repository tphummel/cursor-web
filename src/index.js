const series = require('run-series')
const config = require('./config')
const createServer = require('./server')
const helloRoute = require('./routes/hello')

const routes = {
  hello: helloRoute
}

const server = createServer(routes)

series([
  function startServer (cb) {
    server.listen(config.port, cb)
  }
], function (err) {
  if (err) {
    console.error('Failed to start:', err)
    process.exit(1)
  }
  console.log(`Server running on port ${config.port}`)
})
