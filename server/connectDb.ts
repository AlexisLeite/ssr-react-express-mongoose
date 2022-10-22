import mongoose from 'mongoose';
import chalk from 'chalk';

export default function connectDb() {
  return new Promise((resolve) => {
    const mongoString = process.env.DB_URL;
    if (!mongoString) throw new Error('There is no DB url');

    const connection = mongoose.connect(mongoString);

    connection.then(() => {
      resolve(true);
    }).catch((error) => {
      console.error(error);
      resolve(false);
    });

    const database = mongoose.connection;

    database.on('error', (e) => {
      console.error(chalk.red('Database error: '), e);
    });
  });
}
