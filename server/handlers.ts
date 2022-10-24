import chalk from 'chalk';
import { Request, Response } from 'express';
import { isPromise } from 'util/types';

export function handleError(e: Error) {
  console.error(chalk.red('An error ocurred: '), e);
}

export function handleRequestError(res: Response, error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  handleError(new Error(message));
  res.status(500).json({ message });
}

export function handleRequest(
  req: Request,
  res: Response,
  request: () => unknown | Promise<unknown>,
) {
  console.log(chalk.yellow(`[${chalk.green(req.method)}]Received request with url:  ${req.url}`));
  if (Object.values(req.body as object).length > 0) console.log(chalk.yellow('Body: '), req.body);

  try {
    const result = request();
    if (isPromise(result)) {
      result.catch((error: unknown) => {
        handleRequestError(res, error);
      });
    }
  } catch (error: unknown) {
    handleRequestError(res, error);
  }
}
