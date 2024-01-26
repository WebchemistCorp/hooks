import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import {
  useQueryString,
  useDebounce,
  useThrottle,
  useCopyToClipboard,
  useIdle,
} from '../dist';

const App = () => {
  const [number, setNumber] = React.useState<number>(0);
  const debounce = useDebounce();
  const throttle = useThrottle();
  const { query, setQuery, isLoading } = useQueryString({});
  const [clipboardRef, onCopy, cliped] = useCopyToClipboard<
    HTMLTextAreaElement
  >();
  const { isIdle } = useIdle(['mousemove']);

  const handleChange = () => {
    setQuery({ test: 111, tet: 123123 });
  };

  const addNumber = () => setNumber(n => n + 1);
  const subNumber = () => setNumber(n => n - 1);

  const handleDebounce = debounce(addNumber, 1000);
  const handleThrottle = throttle(subNumber, 1000);

  return (
    <div className="flex flex-col p-4 gap-6">
      <div className="grid grid-cols-3 grid-rows-3">
        <h1 className="text-xl font-bold">QueryString</h1>
        <p className="col-span-2">설명</p>
        <p className="col-span-3 text-2xl">Query : {JSON.stringify(query)}</p>
        <button
          className="col-span-3 bg-blue-500 text-white py-2 px-3"
          onClick={handleChange}
        >
          change query string
        </button>
      </div>

      <div className="grid grid-cols-3 grid-rows-3">
        <h1 className="text-xl font-bold">Debounce</h1>
        <p className="col-span-2 row-span-2">설명</p>
        <p className="text-2xl text-center">{number}</p>
        <button
          className="col-span-3 bg-blue-500 text-white py-2 px-3"
          onClick={handleDebounce}
        >
          증가
        </button>
      </div>

      <div className="grid grid-cols-3 grid-rows-3">
        <h1 className="text-xl font-bold">Throttle</h1>
        <p className="col-span-2 row-span-2">설명</p>
        <p className="text-2xl text-center">{number}</p>
        <button
          className="col-span-3 bg-blue-500 text-white py-2 px-3"
          onClick={handleThrottle}
        >
          감소
        </button>
      </div>

      <div className="grid grid-cols-3 grid-rows-3">
        <h1 className="text-xl font-bold">useCopyToClipboard</h1>
      </div>

      {cliped && <p>Cliped</p>}
      <textarea ref={clipboardRef} />
      <button onClick={onCopy}>Copy</button>

      <h1>{isIdle && 'IDLE'}</h1>

      <div className="w-20 h-20 bg-red-600"></div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
// ReactDOM.render(<App />, document.getElementById('root'));
