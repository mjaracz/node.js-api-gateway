import storiesRoutes from './stories/stories.routes';
import dotenv from 'dotenv';

import express from 'express';
import parser from 'body-parser';
import loginRoutes from './login/login.routes';

const app = express();
dotenv.config();
const port = process.env.PORT || 8080;

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Vary': 'Origin',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE',
    'Access-Control-Allow-Headers': 'Content-Type, Accept, X-Requested-With, remember-me'
  });
  next();
});
app.use('/api', storiesRoutes);
app.use('/api', loginRoutes);
app.use((req, res) => {
  res.send(JSON.stringify({'message': 'route not handler'}));
  res.status(404);
});

app.listen(port, () => {
  console.log('server started on port ' + port)
});
