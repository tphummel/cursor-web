const http = require('http')

function createServer (routes) {
  const server = http.createServer((req, res) => {
    // ... existing code ...
    if (req.url === '/hello' && req.method === 'GET') {
      routes.hello(req, res)
      return
    }

    res.statusCode = 404
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ error: 'Not Found' }))
    // ... existing code ...
  })

  return server
}

module.exports = createServer
