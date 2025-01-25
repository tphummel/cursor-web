const net = require('net')

function createDevSmtp (port, cb) {
  const server = net.createServer((socket) => {
    socket.write('220 localhost SMTP Dev Server\r\n')

    socket.on('data', (data) => {
      const cmd = data.toString().trim()
      console.log('Received SMTP command:', cmd)

      if (cmd.startsWith('MAIL FROM:')) {
        socket.write('250 Ok\r\n')
      } else if (cmd.startsWith('RCPT TO:')) {
        socket.write('250 Ok\r\n')
      } else if (cmd === 'DATA') {
        socket.write('354 End data with <CR><LF>.<CR><LF>\r\n')
      } else if (cmd === '.') {
        socket.write('250 Ok: Message received\r\n')
      } else if (cmd === 'QUIT') {
        socket.write('221 Bye\r\n')
        socket.end()
      } else {
        socket.write('250 Ok\r\n')
      }
    })
  })

  server.listen(port, cb)
  return server
}

module.exports = createDevSmtp 