import './App.css';
import React, { useEffect, useState } from 'react';
import DataTable from './components/Table';
import DataAccordion from './components/Accordion';
function App() {
  return (
    <div className="app">
    <div className="app__table">
    <DataAccordion></DataAccordion>
     </div>
    </div>
  );
}

export default App;
