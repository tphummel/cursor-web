const assert = require('assert')
const get = require('simple-get')
const series = require('run-series')
const createServer = require('../server')
const helloRoute = require('./hello')

const TEST_PORT = 9999
let server

// Named function helps describe the test runner's purpose
function runTest (name, fn, cb) {
  try {
    fn(cb)
    console.log(`✓ ${name}`)
  } catch (err) {
    console.error(`✗ ${name}`)
    cb(err)
  }
}

function getJson (url, cb) {
  get.concat({
    url,
    headers: {
      'Accept': 'application/json'
    }
  }, (err, res, data) => {
    if (err) return cb(err)
    try {
      const body = JSON.parse(data)
      cb(null, res, body)
    } catch (err) {
      cb(err)
    }
  })
}

series([
  // Named functions help identify stages in the test lifecycle
  function setup (cb) {
    const routes = { hello: helloRoute }
    server = createServer(routes)
    server.once('listening', cb)
    server.listen(TEST_PORT)
  },

  function runTests (cb) {
    series([
      function testHello (cb) {
        runTest('GET /hello returns 200 with valid json', (done) => {
          getJson(`http://localhost:${TEST_PORT}/hello`, (err, res, body) => {
            if (err) return done(err)
            try {
              assert.strictEqual(res.statusCode, 200)
              assert.strictEqual(typeof body, 'object')
              assert.strictEqual(body.status, 'ok')
              assert.ok(new Date(body.ts).getTime() > 0)
              done()
            } catch (err) {
              done(err)
            }
          })
        }, cb)
      },

      function testInvalid (cb) {
        runTest('GET /invalid returns 404', (done) => {
          getJson(`http://localhost:${TEST_PORT}/invalid`, (err, res, body) => {
            if (err) return done(err)
            try {
              assert.strictEqual(res.statusCode, 404)
              assert.strictEqual(body.error, 'Not Found')
              done()
            } catch (err) {
              done(err)
            }
          })
        }, cb)
      }
    ], cb)
  },

  function teardown (cb) {
    server.close(cb)
  }
], (err) => {
  if (err) {
    console.error('Test failed:', err)
    process.exit(1)
  }
  console.log('All tests passed!')
}) 