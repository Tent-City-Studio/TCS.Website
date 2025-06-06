const path = require('path');
const express = require('express');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const bcrypt = require('bcryptjs');
const { loadEnv } = require('./scripts/config');

loadEnv();

let uri = process.env.MONGODB_URI;
let memory;

async function getClient() {
  if (uri) return new MongoClient(uri);
  memory = await MongoMemoryServer.create();
  uri = memory.getUri();
  console.warn('MONGODB_URI not set, using in-memory MongoDB');
  return new MongoClient(uri);
}
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'site')));
app.use('/static', express.static(path.join(__dirname, 'static')));

let users;
let client;

async function start() {
  client = await getClient();
  await client.connect();
  const db = client.db();
  users = db.collection('users');
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  const existing = await users.findOne({ username });
  if (existing) {
    return res.status(409).json({ error: 'User exists' });
  }
  const hash = await bcrypt.hash(password, 10);
  await users.insertOne({ username, password: hash });
  res.json({ message: 'User created' });
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  const user = await users.findOne({ username });
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  res.json({ message: 'Login successful' });
});

start().catch(err => {
  console.error(err);
  process.exit(1);
});

process.on('SIGINT', async () => {
  if (client) await client.close();
  if (memory) await memory.stop();
  process.exit(0);
});
