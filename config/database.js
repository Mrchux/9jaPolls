module.exports = {

    'url' : 'mongodb://127.0.0.1:27017/test',
    'options' : {
    	useMongoClient : true,
    	poolSize: 10, // Maintain up to 10 socket connections
    	bufferMaxEntries: 0, // If not connected, return errors immediately rather than waiting for reconnect
    	connectTimeoutMS: 0,
    	keepAlive: true,
    }

};
