/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import './App.css';
import Table from './components/Table';
import { TableContext } from './context/TableProvider';

function App() {
  const { requestPlanets, planets, isLoading } = useContext(TableContext);
  useEffect(() => {
    requestPlanets();
  }, []);
  const columns = [
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Rotation Period',
      accessor: 'rotation_period',
    },
    {
      Header: 'Orbital Period',
      accessor: 'orbital_period',
    },
    {
      Header: 'Diameter',
      accessor: 'diameter',
    },
    {
      Header: 'Climate',
      accessor: 'climate',
    },
    {
      Header: 'Gravity',
      accessor: 'gravity',
    },
    {
      Header: 'Terrain',
      accessor: 'terrain',
    },
    {
      Header: 'Surface Water',
      accessor: 'surface_water',
    },
    {
      Header: 'Population',
      accessor: 'population',
    },
    {
      Header: 'Films',
      accessor: 'films',
    },
    {
      Header: 'Created',
      accessor: 'created',
    },
    {
      Header: 'Edited',
      accessor: 'edited',
    },
    {
      Header: 'URL',
      accessor: 'url',
    },
  ];
  return (
    <div>
      {isLoading ? 'Carregando...' : <Table columns={ columns } data={ planets } /> }
    </div>
  );
}

export default App;
