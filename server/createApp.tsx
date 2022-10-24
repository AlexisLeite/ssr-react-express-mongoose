import chalk from 'chalk';
import connectLiveReload from 'connect-livereload';
import dotenv from 'dotenv';
import express from 'express';
import livereload from 'livereload';
import { exit } from 'process';
import * as ReactDOMServer from 'react-dom/server';
import App from '../client/App';
import connectDb from './connectDb';
import router from './routes';
import templater from './util/templater';

export const apiPrefix = '/api';

export default async function createApp() {
  const liveReloadServer = livereload.createServer();
  liveReloadServer.server.once('connection', () => {
    setTimeout(() => {
      liveReloadServer.refresh('/');
    }, 100);
  });
  dotenv.config();
  const app = express();
  app.use(express.json());
  app.use(connectLiveReload());
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
    const html = templater.loadFromFile('./server/templates/application.html', {
      replacements: { reactApp },
    });
    res.send(html);
  });
  app.use(express.static('./build/client'));
  app.use(apiPrefix, router);

  app.listen(port, () => {
    console.log(chalk.green('Everythink is ok, app is running.'));
  });
}
