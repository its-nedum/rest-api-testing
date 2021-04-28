const app = require('../../server');
const supertest = require('supertest');
const request = supertest(app);
const db = require('../database/db');
const Post = require('../../model/post')
const { create } = require('../../services/post.service')

// set up connection to test database
beforeAll(async () => await db.connect());
beforeEach(async () => await db.clearCollection());
afterAll(async () => await db.closeConnection());

// test post
const samplePost = { 
    title: 'This is a test title', 
    content: 'This is a test content body'
  }

const editedPost = {
  title: 'You have edited me',
  content: 'This is a test edited content body'
}

// Test the create post route
describe('POST /api/v1/post/create', () => {
    test('should create a new post in the database', async done => {
        const res =  await request.post('/api/v1/post/create').send(samplePost)
        .expect(201);
        expect(res.body.data).toBeTruthy();
        const post = await Post.findOne({ _id: res.body.data._id });
        expect(post.title).toBe(res.body.data.title);
        expect(post.content).toBe(res.body.data.content);
        // should throw an error when post content is not provided
        await request.post('/api/v1/post/create').send({
          title: 'This is a test title', 
        })
        .expect(400);
        // should throw an error when post title is not provided
        await request.post('/api/v1/post/create').send({
          content: 'This is a test content body'
        })
        .expect(400);
        done();
    });
});

// Test the get all post route
describe('GET /api/v1/post/getAll', () => {
    test('should return all posts', async done => {
        await request.post('/api/v1/post/create').send(samplePost);
        const res = await request.get('/api/v1/post/getAll')
        .expect(200);
        expect(res.body.data.length).not.toBe(0);
        done();
    })
});

// Test the get single post route
describe('GET /api/v1/post/get/:id', () => {
  test('should return a single post', async done => {
    const post = await request.post('/api/v1/post/create').send(samplePost);
    expect(post.body.data._id).toBeDefined();
    const res = await request.get(`/api/v1/post/get/${post.body.data._id}`)
    .expect(200);
    expect(res.body.data._id).toBeDefined()
    expect(res.body.data.title).toEqual(samplePost.title);
    expect(res.body.data.content).toEqual(samplePost.content);
    done()
  })
});

// Test the update post route
describe('PUT /api/v1/post/update/:id', () => {
  test('should effectively update a post', async done => {
    const post = await request.post('/api/v1/post/create').send(samplePost);
    const res = await request.put(`/api/v1/post/update/${post.body.data._id}`).send(editedPost)
    .expect(200);
    expect(res.body.data._id).toBe(post.body.data._id)
    expect(res.body.data.title).toEqual(editedPost.title);
    expect(res.body.data.content).toEqual(editedPost.content);
    done();
  })
});

// Test the delete post route
describe('DELETE /api/v1/post/destroy/:id', () => {
  test('should delete ap post properly', async done => {
    const post = await request.post('/api/v1/post/create').send(samplePost);
    const res = await request.delete(`/api/v1/post/destroy/${post.body.data._id}`)
    .expect(200);
    expect(res.body.data).toBe(null)
    done()
  })
});