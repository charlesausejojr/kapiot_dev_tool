import './App.css';
import React, { useEffect, useState } from 'react';
import DataTable from './components/Table';
import DataAccordion from './components/Accordion';
import Header from './components/Header';
import ActionField from './components/ActionField';
function App() {
  return (
    <div className="app">
    <Header/>
    <div className="app__table">
    <DataAccordion/>
     </div>
     <ActionField/>

    </div>
  );
}

export default App;
