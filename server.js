const http = require('http');
const app = require('./app')

const port = process.env.IFO_API_PORT || 80;

const server = http.createServer(app);

server.listen(port, () => console.log(`Server is listening on port ${port}...`));