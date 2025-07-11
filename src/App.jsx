import React, { useState } from 'react';
import CheckBox from './components/ui/Checkbox';

function App() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div style={{ padding: "40px" }}>
      <h1>CheckBox Test</h1>
      <CheckBox active={isChecked} onChange={() => setIsChecked(!isChecked)} />
    </div>
  );
}

export default App;
