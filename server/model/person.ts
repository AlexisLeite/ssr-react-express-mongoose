import { model, Schema } from 'mongoose';

export interface IPerson {
  name: string;
  age: number;
}

const dataSchema = new Schema({
  name: {
    required: true,
    type: String,
    unique: true,
  },
  age: {
    required: true,
    type: Number,
  },
});

const Person = model<IPerson>('Data', dataSchema);

export default Person;
