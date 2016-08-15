const { createServer } = require('../src/server');
const { argv } = require('yargs');

createServer(argv.port, argv.host);
