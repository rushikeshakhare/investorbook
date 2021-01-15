import React from 'react';
import { SpreadSheet } from './SpreadSheet';
import { getPageRecords } from './MockData';

function App() {
  return (
    <div className='app'>
      <h1 className='app-title'>All Records</h1>
      <SpreadSheet getPageRecords={getPageRecords} />
    </div>
  );
}

export default App;
