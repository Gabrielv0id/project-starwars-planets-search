/* eslint-disable react-hooks/exhaustive-deps */
import { useState, createContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';

export const TableContext = createContext();

function TableProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const { makeFetch, errors } = useFetch();

  const requestPlanets = async () => {
    const results = await makeFetch('https://swapi.dev/api/planets');
    const filteredPlanets = results
      .map((planet) => {
        delete planet.residents;
        return planet;
        /* Object.values(planet)
        .filter((key) => key !== 'residents')) */
      });
    setPlanets(filteredPlanets);
  };
  const values = useMemo(() => ({
    planets, setPlanets, errors, requestPlanets,
  }), [planets, setPlanets]);

  return (
    <TableContext.Provider value={ values }>
      { children }
    </TableContext.Provider>
  );
}

TableProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TableProvider;
