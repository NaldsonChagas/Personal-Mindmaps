#!/usr/bin/env node
const http = require('http');

const hostname = '0.0.0.0';
const port = process.env.PORT || 4000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<h1>Personal MindMaps</h1><p>Frontend placeholder — Phase 0</p>');
});

server.listen(port, hostname, () => {
  console.log(`Frontend placeholder running at http://${hostname}:${port}/`);
});
