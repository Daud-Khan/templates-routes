var Twit = require('twit');
var T = new Twit({
	consumer_key: 'kC2RB0Io38DJjc60wGnGI1gbs',
	consumer_secret: '7QcjeltFxDV8Hk6wXVOakl80kOPOiXPPjVNn8tB8Riv8bwVDf2',
	access_token: '859975418438443008-Y8JAWhmBmlAP57zO3u5zlzcX9AxYlhI',
	access_token_secret: 'xflhhcieGr0A8qQOoe6WElVyWmU5LUuSgAXDFTc7NBmPG',
	 timeout_ms:           60*1000, 

});


module.exports = T;