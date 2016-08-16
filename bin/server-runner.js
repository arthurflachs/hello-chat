const { createServer } = require('../src/server');
const config = require('../config');

createServer(config.serverPort, config.serverHost);
