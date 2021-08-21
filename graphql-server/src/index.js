const app = require('./app');
require('./lib/connect-mongo')();

app.listen(5000, () => {
  console.log('Server started');
});
