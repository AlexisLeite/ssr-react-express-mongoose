import { shallowEqual } from 'react-redux';
import { useMount } from 'ahooks';
import store, { useAppSelector } from '../../../store';
import { peopleActions } from '../../../store/peopleSlice';
import Person from './Person';

const People = () => {
  const people = useAppSelector((global) => global.peopleSlice.people, shallowEqual);
  const isLoading = useAppSelector((global) => global.peopleSlice.isLoading);

  useMount(() => {
    void store.dispatch(peopleActions.loadAll());
  });

  return <div>
    {isLoading && <>Cargando...</>}
    {people.map((current) => (<Person key={current.name} person={current} />))}
  </div>;
};

export default People;
