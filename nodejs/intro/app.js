const http = require('http'); // global module http

const routes = require('./routes');

const server = http.createServer(routes.handler);

server.listen(3000);