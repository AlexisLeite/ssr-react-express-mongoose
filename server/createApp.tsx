import chalk from 'chalk';
import dotenv from 'dotenv';
import express from 'express';
import { exit } from 'process';
import * as ReactDOMServer from 'react-dom/server';
import connectDb from './connectDb';
import router from './routes';
import App from '../client/App';
import templater from './util/templater';

export default async function createApp() {
  dotenv.config();
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  const port = process.env.PORT;

  const connectionResult = await connectDb();
  if (!connectionResult) {
    console.log(chalk.red('Could not connect the database. Application terminated.'));
    exit();
  }
  console.log(chalk.green('Database started successfully.'));

  console.log('Creating application routes.');
  app.get('/', (req, res) => {
    const reactApp = ReactDOMServer.renderToString(<App />);
    const html = templater.loadFromFile('./server/templates/application.html', { replacements: { reactApp } });
    res.send(html);
  });
  app.use(express.static('./build'));
  app.use('/api', router);

  app.listen(port, () => {
    console.log(chalk.green('Everythink is ok, app is running.'));
  });
}
