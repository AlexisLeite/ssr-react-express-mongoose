import store, { useAppSelector } from '../../store';
import { counterActions } from '../../store/counterSlice';

const Counter = () => {
  const counter = useAppSelector((global) => global.counterSlice.count);

  return <button onClick={() => store.dispatch(counterActions.sum(10))}>{counter} clicked</button>;
};

export default Counter;
