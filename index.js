// Dependencies
const http = require('http');
const unifiedServer = require('./unifiedServer');

const httpServer = http.createServer((req, res) => {
    unifiedServer(req, res);
});

httpServer.listen(3000, () => {
   console.log('Server listening on port 3000');
});

