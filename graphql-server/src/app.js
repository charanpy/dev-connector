const express = require('express');
require('dotenv').config();
// const cors = require('cors');
const graphqlServer = require('./graphql');
const app = express();

// app.use(
//   cors({
//     credentials: true,
//     origin: 'https://studio.apollographql.com',
//   })
// );

require('./services/passport')(app);
console.log(process.env.NODE_ENV, 22);
(async () => {
  await graphqlServer.start();
  graphqlServer.applyMiddleware({
    app,
    path: '/api/graphql',
    cors: {
      origin: '*',
      credentials: true,
    },
  });
})();

module.exports = app;
