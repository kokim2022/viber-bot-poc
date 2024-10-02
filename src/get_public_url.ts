'use strict';

import { request } from 'http';
const options = {
  hostname: '127.0.0.1',
  port: 4040,
  path: '/api/tunnels',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
};

export function getPublicUrl() {
  return new Promise((resolve, reject) => {
    const req = request(options, function (res) {
      res.setEncoding('utf8');
      res.on('data', function (config) {
        config = JSON.parse(config);
        const httpsTunnel = config.tunnels
          .filter((t) => t.proto === 'https')
          .pop();
        resolve(httpsTunnel.public_url);
      });
    });

    req.on('error', function (e) {
      reject(e.message);
    });

    req.end();
  });
}
