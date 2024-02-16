import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useQueryString, useDebounce, useThrottle } from '../dist';

const App = () => {
  const [number, setNumber] = React.useState<number>(0);
  const debounce = useDebounce();
  const throttle = useThrottle();
  const { query, setQuery, isLoading } = useQueryString({});

  const handleChange = () => {
    setQuery({ test: 111, tet: 123123 });
  };

  const addNumber = () => setNumber(n => n + 1);
  const subNumber = () => setNumber(n => n - 1);

  const handleDebounce = debounce(addNumber, 1000);
  const handleThrottle = throttle(subNumber, 1000);

  if (isLoading) <div>Loading ...</div>;

  return (
    <div>
      <h1 className="text-xl font-bold">useQueryString</h1>
      <p>Query : {JSON.stringify(query)}</p>
      <button onClick={handleChange}>change query string</button>

      <h1 className="text-xl font-bold">useDebounce</h1>
      <p>{number}</p>
      <button onClick={handleDebounce}>debounce - add</button>

      <h1 className="text-xl font-bold">useThrottle</h1>
      <p>{number}</p>
      <button onClick={handleThrottle}>throttle - sub</button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
