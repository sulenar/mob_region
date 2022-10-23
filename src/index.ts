import e from 'express';
import { config } from 'dotenv';
import { getRegion } from './services';
config();

const app = e();
const { PORT } = process.env;

app.get('/getRegion/:phone', getRegion);

app.listen(PORT, () => {
  console.log('App on port 5000...');
});
