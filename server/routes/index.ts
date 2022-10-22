import express from 'express';
import person from './person';

export type ParamsDictionary = Record<string, string>;

const router = express.Router();
person(router);

export default router;
