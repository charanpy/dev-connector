const express = require('express');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const graphqlServer = require('./graphql');
const app = express();

app.use(
  cors({
    origin: ['http://localhost:4000', 'https://studio.apollographql.com'],
    credentials: true,
  })
);
app.use(cookieParser());

require('./services/passport')(app);
console.log(process.env.NODE_ENV, 22);
(async () => {
  await graphqlServer.start();
  graphqlServer.applyMiddleware({
    app,
    path: '/api/graphql',
    cors: {
      origin: ['http://localhost:4000', 'https://studio.apollographql.com'],
      credentials: true,
    },
  });
})();

module.exports = app;
