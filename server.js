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
let app;
const PORT = process.env.PORT || 3000;

let users;
let client;
let server;

function createApp(collection) {
  const appInstance = express();
  appInstance.use(express.json());
  appInstance.use(express.static(path.join(__dirname, 'site')));
  appInstance.use('/static', express.static(path.join(__dirname, 'static')));
  users = collection;

  appInstance.post('/api/register', async (req, res) => {
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

  appInstance.post('/api/login', async (req, res) => {
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

  return appInstance;
}

async function start(port = PORT) {
  client = await getClient();
  await client.connect();
  const db = client.db();
  const collection = db.collection('users');
  app = createApp(collection);
  server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
  users = collection;
  return { app, client, server, users };
}

async function stop() {
  if (server) await new Promise(res => server.close(res));
  if (client) await client.close();
  if (memory) await memory.stop();
}


if (require.main === module) {
  start().catch(err => {
    console.error(err);
    process.exit(1);
  });

  process.on('SIGINT', async () => {
    await stop();
    process.exit(0);
  });
}

module.exports = { createApp, start, stop };
