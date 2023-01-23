/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import './App.css';
import GlobalFilter from './components/GlobalFilter';
import NameSearch from './components/NameSearch';
import Table from './components/Table';
import TableProvider from './Context/TableProvider';

function App() {
  return (
    <div>
      <TableProvider>
        <NameSearch />
        <GlobalFilter />
        <Table />
      </TableProvider>
    </div>
  );
}

export default App;
