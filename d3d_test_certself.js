const selfsigned = require('selfsigned');
const fs = require('fs');

const attrs = [{ name: 'commonName', value: '192.168.0.3' }];
const opts = {
  days: 365,
  extensions: [{ name: 'subjectAltName', altNames: [{ type: 7, ip: '192.168.0.3' }] }]
};
const pems = selfsigned.generate(attrs, opts);

fs.writeFileSync('key.pem', pems.private);
fs.writeFileSync('cert.pem', pems.cert);
