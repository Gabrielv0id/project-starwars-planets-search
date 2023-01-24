/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import './App.css';
import Filters from './components/Filters';
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
        <Filters />
        <Table />
      </TableProvider>
    </div>
  );
}

export default App;
