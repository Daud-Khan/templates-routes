var NodeGeoCoder = require('node-geocoder');
var options = {
	provider: 'google',
	httpAdapter: 'https',
	apiKey: 'AIzaSyCmqpGNuLYmFj8m8_RTGklSAv1xZytlomI'
};

var GeoCoder = NodeGeoCoder(options);

module.exports = GeoCoder;