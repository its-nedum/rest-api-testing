const express = require('express');
const postRoutes = express.Router();

const post = require('../controllers/postController');

postRoutes.post('/create', post.createPost);
postRoutes.get('/get/:id', post.getPost);
postRoutes.get('/getAll', post.getAllPosts);
postRoutes.put('/update/:id', post.updatePost);
postRoutes.delete('/destroy/:id', post.destroyPost);

module.exports = postRoutes;