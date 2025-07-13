const http = require('http');
const fs = require('fs');
const path = require('path');

const assets = [
  { id: 1, symbol: 'BTC', name: 'Bitcoin', price: 30000, marketCap: 600000000000 },
  { id: 2, symbol: 'ETH', name: 'Ethereum', price: 2000, marketCap: 240000000000 },
  { id: 3, symbol: 'DOGE', name: 'Dogecoin', price: 0.1, marketCap: 14000000000 }
];

function serveStatic(filePath, res) {
  const abs = path.join(__dirname, '..', 'frontend', filePath);
  fs.readFile(abs, (err, data) => {
    if (err) {
      res.statusCode = 404;
      res.end('Not found');
    } else {
      if (filePath.endsWith('.css')) res.setHeader('Content-Type', 'text/css');
      if (filePath.endsWith('.js')) res.setHeader('Content-Type', 'application/javascript');
      res.end(data);
    }
  });
}

const server = http.createServer((req, res) => {
  if (req.url === '/api/assets') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(assets));
    return;
  }

  if (req.url === '/' || req.url === '/index.html') {
    serveStatic('index.html', res);
    return;
  }

  if (req.url === '/script.js') {
    serveStatic('script.js', res);
    return;
  }

  if (req.url === '/styles.css') {
    serveStatic('styles.css', res);
    return;
  }

  res.statusCode = 404;
  res.end('Not found');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
