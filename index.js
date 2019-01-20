const express =require('express');
const bodyParser = require('body-parser');
const app = express();

const router = require('./src/router');

app.use(bodyParser.json());
app.use('/', router);

app.listen(9000, function() {
  console.log('Example app listening on port 9000!')
});

