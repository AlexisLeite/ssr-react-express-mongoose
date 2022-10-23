import { useState } from 'react';
import { noNaN } from '../../../../server/util';
import store from '../../../store';
import { IPerson, peopleActions } from '../../../store/peopleSlice';

const Person = ({ person }: { person: IPerson }) => {
  const [state, setState] = useState(person);

  return (
    <div>
      <input
        value={state.name}
        onChange={(ev) => setState((current) => ({ ...current, name: ev.target.value }))}
      />
      :
      <input
        value={state.age}
        onChange={(ev) => setState((current) => ({ ...current, age: noNaN(ev.target.value) }))}
      />
      {(state.age !== person.age || state.name !== person.name) && (
        <button
          onClick={() => {
            store
              .dispatch(peopleActions.update(state))
              .unwrap()
              .then((res) => {
                if (!res) setState(person);
              })
              .catch(console.error);
          }}>
          Guardar
        </button>
      )}
    </div>
  );
};

export default Person;
