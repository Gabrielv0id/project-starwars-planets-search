/* eslint-disable camelcase */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import TableContext from './TableContext';
import useFetch from '../hooks/useFetch';

export default function TableProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filter, setFilter] = useState('');
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [globalFilter, setGlobalFilter] = useState({
    column: 'population',
    comparison: 'maior que',
    number: '0',
  });
  const [options, setOptions] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const { makeFetch, isLoading, errors } = useFetch();

  console.log(setOptions);

  useEffect(() => {
    const planetsList = async () => {
      const list = await makeFetch('https://swapi.dev/api/planets');
      setPlanets(list);
      setFilteredPlanets(list);
    };
    planetsList();
  }, []);

  const changeValue = ({ target: { value } }) => {
    setFilter(value);
    if (value.length) {
      const filterPlanets = planets.filter((planet) => (
        planet.name.toLowerCase().includes(value.toLowerCase())
      ));
      setFilteredPlanets(filterPlanets);
    } else {
      setFilteredPlanets(planets);
    }
  };

  const { column, comparison, number } = globalFilter;

  const filterMoreThan = () => (
    filteredPlanets.filter((planet) => +planet[column] > +number)
  );

  const filterLessThan = () => (
    filteredPlanets.filter((planet) => +planet[column] < +number)
  );

  const filterEqualTo = () => (
    filteredPlanets.filter((planet) => +planet[column] === +number)
  );

  const buttonClick = () => {
    if (number) {
      // const filterOptions = options.filter((option) => option !== column);
      // setOptions(filterOptions);
      switch (comparison) {
      case 'maior que':
        setFilteredPlanets(filterMoreThan);
        break;
      case 'menor que':
        setFilteredPlanets(filterLessThan);
        break;
      case 'igual a':
        setFilteredPlanets(filterEqualTo);
        break;
      default:
        break;
      }
    }
  };

  const value = useMemo(() => ({
    isLoading,
    errors,
    filteredPlanets,
    filter,
    changeValue,
    globalFilter,
    setGlobalFilter,
    buttonClick,
    options,
  }), [filteredPlanets, isLoading, errors, filter, globalFilter, options]);
  return (
    <TableContext.Provider value={ value }>
      {children}
    </TableContext.Provider>
  );
}

TableProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
