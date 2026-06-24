#!/usr/bin/env node
const http = require('http');

const hostname = '0.0.0.0';
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ status: 'ok', service: 'backend', phase: 'placeholder' }));
});

server.listen(port, hostname, () => {
  console.log(`Backend placeholder running at http://${hostname}:${port}/`);
});
