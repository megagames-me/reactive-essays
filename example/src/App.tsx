import React from 'react';
import { REValue } from 'typescript-react-test';
import 'typescript-react-test/lib/css/recomponents.css';

function App() {
  return (
    <div className="App">
     <REValue name="var1" unit="cookie" value={3}/>
    </div>
  );
}

export default App;