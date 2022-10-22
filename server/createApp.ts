import chalk from 'chalk';
import dotenv from 'dotenv';
import express from 'express';
import { exit } from 'process';
import connectDb from './connectDb';
import router from './routes';

export default async function createApp() {
  dotenv.config();
  const app = express();
  const port = process.env.PORT;

  const connectionResult = await connectDb();
  if (!connectionResult) {
    console.log(chalk.red('Could not connect the database. Application terminated.'));
    exit();
  }
  console.log(chalk.green('Database started successfully.'));

  console.log('Creating application routes.');
  app.get('/', (req, res) => {
    res.send('Hello world');
  });
  app.use('/api', router);

  app.listen(port, () => {
    console.log(chalk.green('Everythink is ok, app is running.'));
  });
}
