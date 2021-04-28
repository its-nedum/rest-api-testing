const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongoServer = new MongoMemoryServer();

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
};

// create a connection to an in-memory database
const connect = async () => {
    // disconnect any previous connection
    await mongoose.disconnect();

    // set the mongodb to generate different database name
    const mongoUri = await mongoServer.getUri(true);

    // connect to our in-memory database
    await mongoose.connect(mongoUri, options, (err) => {
        if (err) console.log(err);
    });
};

// close database connection and stop mongo server
const closeConnection = async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
};

// delete all data from collections
const clearCollection = async () => {
    const collections = mongoose.connection.collections;

    for (const item in collections) {
        await collections[item].deleteMany();
    }
};


module.exports = {
    connect,
    closeConnection,
    clearCollection,
};