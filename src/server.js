const express = require('express');
require('./database/db');
const app = express();
const port = process.env.PORT || 7000;

// import posts routes
const postRoutes = require('./routes/posts');

// parsing the request body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// set up api routes
app.use('/api/v1/post', postRoutes);

app.listen(port, () => console.log(`Server is running on port ${port}`));

module.exports = app;