const config = {
  port: process.env.APP_PORT || 8181,
  smtp: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  paths: {
    code: '/app/code',
    data: '/app/data'
  }
}

module.exports = config 