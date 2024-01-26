import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useQueryString } from '../dist';

const App = () => {
  const [query, setQuery] = useQueryString();
  console.log(query);
  return (
    <div>
      <h1>HelloWorld</h1>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
