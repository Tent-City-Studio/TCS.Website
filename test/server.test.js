const request = require('supertest');
const { createApp } = require('../server');

function createMemoryUsers() {
  const data = [];
  return {
    async findOne(q) { return data.find(u => u.username === q.username); },
    async insertOne(doc) { data.push({ ...doc }); },
    async deleteMany() { data.length = 0; }
  };
}

let app;
let users;

beforeEach(() => {
  users = createMemoryUsers();
  app = createApp(users);
});

test('registers a new user', async () => {
  const res = await request(app)
    .post('/api/register')
    .send({ username: 'alice', password: 'pass123' });
  expect(res.status).toBe(200);
  expect(res.body.message).toBe('User created');
});

test('prevents duplicate users', async () => {
  await request(app).post('/api/register').send({ username: 'bob', password: 'a' });
  const res = await request(app)
    .post('/api/register')
    .send({ username: 'bob', password: 'a' });
  expect(res.status).toBe(409);
});

test('login succeeds for existing user', async () => {
  await request(app).post('/api/register').send({ username: 'carol', password: 'p' });
  const res = await request(app)
    .post('/api/login')
    .send({ username: 'carol', password: 'p' });
  expect(res.status).toBe(200);
  expect(res.body.message).toBe('Login successful');
});

test('missing fields return 400', async () => {
  const res = await request(app).post('/api/register').send({ username: 'dave' });
  expect(res.status).toBe(400);
});
