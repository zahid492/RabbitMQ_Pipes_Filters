var amqp = require('amqplib');
var Pipe = require('./pipe.js');

// this function returns a promise for each filter (which is returned by the pipe) to the code in main.js
var connect = function(filter, from, to) {
	return amqp.connect('amqp://localhost').then(function(connection) {
		return connection;
	}).then(function(connection) {
		return connection.createChannel();
	}).then(function(channel) {
		var pipe = new Pipe(channel, from, to, filter);
		return pipe.start();
	}).catch(function(e) {
		console.error(e);
	});
}

module.exports = connect;
