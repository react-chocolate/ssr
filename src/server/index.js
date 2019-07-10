import express from 'express';
import api from './api';
import back4front from './back4front';
import { ESRCH } from 'constants';
 
const app = express();

app.use(express.json());
app.use('/public', express.static('build/public'));
app.use('/favicon*', (req, res) => { res.send('FAVICON') }); // Te odio, favicon...

app.use('/api', api);
app.use('/', back4front);

app.listen(3000, err => {
  if (err) throw new Error('Error:' + err);
  console.log('Running in localhost:3000');
});
