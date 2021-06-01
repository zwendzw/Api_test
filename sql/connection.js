const config = require('../config/develop_config');
const mysqlt = require('mysql');  
// const connection = mysqlt.createConnection({
const connection = mysqlt.createConnection({
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
    port: 6606
});

connection.connect(err => {
    if (err) {
        console.log('connecting error', err);
    } else {
        console.log('connecting success');
    }
});

module.exports = {
    connection
};