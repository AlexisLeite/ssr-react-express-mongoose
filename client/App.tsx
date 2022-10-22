import React from 'react';

export default function App() {
  const [times, setTimes] = React.useState(0);

  return <div>
    <button onClick={() => setTimes((current) => current + 1)}>{times} clicked</button>
  </div>;
}
