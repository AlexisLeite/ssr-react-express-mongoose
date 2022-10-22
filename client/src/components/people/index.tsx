import { shallowEqual } from 'react-redux';
import { useMount } from 'ahooks';
import store, { useAppSelector } from '../../../store';
import { peopleActions } from '../../../store/peopleSlice';

const People = () => {
  const people = useAppSelector((global) => global.peopleSlice.people, shallowEqual);
  const isLoading = useAppSelector((global) => global.peopleSlice.isLoading);

  useMount(() => {
    console.log('Mount');
    void store.dispatch(peopleActions.loadAll());
  });

  return <div onClick={() => {
    void store.dispatch(peopleActions.loadAll());
  }}>
    {isLoading && <>Cargando...</>}
    {people.map((current) => (<div key={current.name}>{current.name}: {current.age}</div>))}
  </div>;
};

export default People;
