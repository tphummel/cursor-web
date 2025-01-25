const fs = require('fs')
const path = require('path')

function getBuildInfo () {
  try {
    const buildInfoPath = path.join(__dirname, '..', '..', 'build-info.json')
    const info = JSON.parse(fs.readFileSync(buildInfoPath, 'utf8'))
    return info
  } catch (err) {
    return {
      date: 'development',
      gitSha: 'development'
    }
  }
}

function helloRoute (req, res) {
  const response = {
    status: 'ok',
    ts: new Date().toISOString(),
    build: getBuildInfo()
  }

  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(response))
}

module.exports = helloRoute
