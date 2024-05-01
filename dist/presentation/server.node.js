"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// server.mjs
const node_http_1 = require("node:http");
const server = (0, node_http_1.createServer)((req, res) => {
    console.log(req.url);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World!\n');
});
// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {
    console.log('Listening on 127.0.0.1:3000');
});
// run with `node server.mjs`
