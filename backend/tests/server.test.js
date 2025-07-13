const test = require('node:test');
const assert = require('assert');
const http = require('http');
const { spawn } = require('child_process');
const path = require('path');

const serverPath = path.join(__dirname, '..', 'server.js');
const PORT = 3100;

let serverProcess;

test.before(async () => {
  await new Promise((resolve) => {
    serverProcess = spawn(process.execPath, [serverPath], { env: { ...process.env, PORT } });
    serverProcess.stdout.on('data', data => {
      if (data.toString().includes(`http://localhost:${PORT}`)) {
        resolve();
      }
    });
  });
});

test.after(() => {
  serverProcess.kill();
});

test('returns asset data', async (t) => {
  await new Promise((resolve, reject) => {
    http.get(`http://localhost:${PORT}/api/assets`, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          assert(Array.isArray(json));
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', reject);
  });
});
