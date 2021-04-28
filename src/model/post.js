const mongoose = require('mongoose');
const { Schema } = require('mongoose')

// create post schema
const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
});

// create a model
const Post = mongoose.model('Post', postSchema);

module.exports = Post;