import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useQueryString } from '../dist';

const App = () => {
  const { query, setQuery, isLoading } = useQueryString({});

  console.log(query, isLoading);

  const handleChange = () => {
    setQuery({ test: 111, tet: 123123 });
  };
  return (
    <div>
      <h1>HelloWorld</h1>
      <button onClick={handleChange}>test</button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
