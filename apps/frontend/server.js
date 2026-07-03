#!/usr/bin/env node
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 4000;
const API_URL = process.env.API_URL || 'http://localhost:3000';

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/config.js', (_req, res) => {
  res.type('application/javascript');
  res.send(`window.APP_CONFIG = { API_URL: ${JSON.stringify(API_URL)} };`);
});

app.get('/map/:id', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'map.html'));
});

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  // eslint-disable-next-line no-console
  console.log(`Frontend server running at http://localhost:${PORT}/`);
});