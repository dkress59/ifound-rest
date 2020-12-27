const fs = require('fs')
const app = require('./app')
const http = require('http')
const https = require('https')
const privateKey = fs.readFileSync(process.env.SSL_KEY_FILE, 'utf8')
const certificate = fs.readFileSync(process.env.SSL_CRT_FILE, 'utf8')
const credentials = {key: privateKey, cert: certificate}

const port = process.env.IFO_API_PORT
	? parseInt(process.env.IFO_API_PORT, 10)
	: 80

const server = http.createServer(app)
const httpsServer = https.createServer(credentials, app)

server.listen(port, () => console.log(`Server is listening on port ${port}...`))
httpsServer.listen(port + 1, () => console.log(`HTTPS server is listening on port ${port + 1}...`))