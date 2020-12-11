import React, { useCallback, useRef, useState } from 'react';
import '@tensorflow/tfjs';
import img from './timg.jpeg';
import './App.css';
import { processImg } from './tensor';

function App() {
  const imgRef = useRef();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [src, setSrc] = useState(img);
  const handleChange = useCallback((evt) => {
    setSrc(evt.target.value)
  }, [setSrc]);
  const handleClick = useCallback(async () => {
    setResult([]);
    setLoading(true);
    const result = await processImg(imgRef);
    setResult(result);
    setLoading(false);
  }, [setResult, setLoading]);
  return (
    <div className="App">
      <img ref={imgRef} alt="haha" style={{ height: '100px', width: '100px' }} src={src}></img>

      <input type="text" onChange={handleChange} />
      <div></div>
      <input type="button" onClick={handleClick} value="分类" />
      <div style={{ border: '1px solid black', height: '300px' }}>
        {loading && '正在计算'}
        <ul>
          {result.map(r => <li key={r.className}>{`It is ${r.className} at ${Math.floor(r.probability * 100)}%`}</li>)}
        </ul>
      </div>
    </div>
  );
}

export default App;
