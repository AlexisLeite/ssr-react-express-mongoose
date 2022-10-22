import { Router } from 'express';
import { ParamsDictionary } from '.';
import { todo, info } from '../util';
import { handleRequest } from '../handlers';
import Person, { IPerson } from '../model/person';

const prefix = '/person';

export default function person(router: Router) {
  router.post<ParamsDictionary, unknown, IPerson>(`${prefix}`, (req, res) => {
    handleRequest(req, res, async () => {
      todo('Search if there it exists some with the same name or maybe configure the schema to have a unique name');

      const data = new Person({
        name: req.body.name,
        age: req.body.age,
      });
      const dataToSave = await data.save();

      info((`Saved entry with name: ${req.body.name} and age ${req.body.age}`));
      res.status(200).json(dataToSave);
    });
  });

  router.get(prefix, (req, res) => {
    handleRequest(req, res, async () => {
      const data = await Person.find();
      res.json(data);
    });
  });

  router.get(`${prefix}/:id`, (req, res) => {
    handleRequest(req, res, async () => {
      const data = await Person.findById(req.params.id);
      res.json(data);
    });
  });

  router.patch<ParamsDictionary, unknown, Partial<IPerson>>(`${prefix}/:id`, (req, res) => {
    handleRequest(req, res, async () => {
      const { id } = req.params;
      const updatedData = req.body;
      const result = await Person.findByIdAndUpdate(id, updatedData, { new: true });
      res.json(result);
    });
  });

  router.delete(`${prefix}/:id`, (req, res) => {
    handleRequest(req, res, async () => {
      const result = await Person.findByIdAndDelete(req.params.id);
      res.json(result);
    });
  });
}
