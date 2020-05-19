const express = require('express');
const app = express();
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

require('dotenv').config();
//require('./authentication');
//const routes = require('./routes');

app.use(cors({ origin: process.env.ORIGIN }));
app.use(bodyParser.json());
app.use(passport.initialize());
//routes(router);
app.use('/api', router);
app.use('/public', express.static('public'));
app.use(
  '/uploads',
  passport.authenticate('jwt', { session: false }),
  express.static('uploads')
);

if (process.env.NODE_ENV === 'development') {
  app.get('/', (req, res) => {
    res.send(process.env.NODE_ENV);
  });
} else if (process.env.NODE_ENV === 'production') {
  app.use(
    express.static(path.join(__dirname, 'build'), {
      maxAge: '1y',
      setHeaders: (res, path) => {
        if (express.static.mime.lookup(path) === 'text/html') {
          res.setHeader('Cache-Control', 'public, max-age=0');
        }
      },
    })
  );
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Listening on port ' + port);
  console.log(process.env.NODE_ENV);
});
