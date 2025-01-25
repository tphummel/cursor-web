const assert = require('assert')
const helloRoute = require('./hello')

// Mock HTTP request/response objects
const createMockRes = () => {
  const res = {
    statusCode: 0,
    headers: {},
    data: '',
    setHeader: (key, value) => {
      res.headers[key] = value
    },
    end: (data) => {
      res.data = data
    }
  }
  return res
}

const runTest = (name, fn) => {
  try {
    fn()
    console.log(`✓ ${name}`)
  } catch (err) {
    console.error(`✗ ${name}`)
    throw err
  }
}

runTest('hello route returns 200 status code', () => {
  const res = createMockRes()
  helloRoute({}, res)
  assert.strictEqual(res.statusCode, 200)
})

runTest('hello route returns application/json content type', () => {
  const res = createMockRes()
  helloRoute({}, res)
  assert.strictEqual(res.headers['Content-Type'], 'application/json')
})

runTest('hello route returns valid json with status and timestamp', () => {
  const res = createMockRes()
  helloRoute({}, res)
  const data = JSON.parse(res.data)
  assert.strictEqual(data.status, 'ok')
  assert.ok(new Date(data.ts).getTime() > 0) // Valid timestamp
})
