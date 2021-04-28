const Post = require('../model/post');

const create = async (entries) => {
    const post = await Post.create(entries);
    return post;
};

const get = async (id) => {
    const post = await Post.findOne({ _id: id });
    return post;
};

const getAll = async () => {
    const posts = await Post.find();
    return posts;
};

const update = async (id, entries) => {
    await Post.findByIdAndUpdate(id, entries);
    // fetch and return the updated post
    const post = await Post.findOne({ _id: id });
    return post;
};

const destroy = async (id) => {
    await Post.findByIdAndRemove(id);
    // verify deleted post
    const post = await Post.findOne({ _id: id });
    return post;
};

module.exports = {
    create,
    get,
    getAll,
    update,
    destroy,
};