const { createServer } = require('./index');
const { argv } = require('yargs');

createServer(argv.port, argv.host);
