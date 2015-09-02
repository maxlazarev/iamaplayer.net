var constants = require('node-constants');
var exports;
constants.define(exports, {
    DR:                 __dirname,
    TOKEN_EXPIRE_DAYS:  7,
    TOKEN_SECRET:       '0fc747136fd32fb8a97d98871b129b5c126f650a'
});

module.exports = exports;
