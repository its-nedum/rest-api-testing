// import mongoose
const mongoose = require('mongoose');

// set your mongodb connection string
const connectionString = "mongodb://localhost:27017/myposts";

if (process.env.NODE_ENV !== 'test') {
    mongoose.connect(connectionString, 
        { 
            useUnifiedTopology: true, 
            useNewUrlParser: true, 
            useFindAndModify: false 
        }
        )
        .then(() => console.log('Database connected successfully!'))
        .catch((error) => console.log('Connection error: ', error));
}