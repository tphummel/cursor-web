function helloRoute (req, res) {
  const response = {
    status: 'ok',
    ts: new Date().toISOString()
  }

  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(response))
}

module.exports = helloRoute 