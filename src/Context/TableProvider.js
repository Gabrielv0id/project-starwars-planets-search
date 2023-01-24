/* eslint-disable camelcase */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import TableContext from './TableContext';
import useFetch from '../hooks/useFetch';

export default function TableProvider({ children }) {
  const optionsArr = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];
  const [planets, setPlanets] = useState([]);
  const [filter, setFilter] = useState('');
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [options, setOptions] = useState(optionsArr);
  const [globalFilter, setGlobalFilter] = useState({
    column: options[0],
    comparison: 'maior que',
    number: '0',
  });
  const [filters, setFilters] = useState([]);
  const [orders, setOrder] = useState({
    order: {
      column: 'population',
      sort: 'ASC',
    },
  });
  const { makeFetch, isLoading, errors } = useFetch();

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

  const { column, number } = globalFilter;

  const filterMoreThan = (columns, value) => {
    if (columns && value) {
      return planets.filter((planet) => +planet[columns] > +value);
    }
    return filteredPlanets.filter((planet) => +planet[column] > +number);
  };

  const filterLessThan = (columns, value) => {
    if (columns && value) {
      return planets.filter((planet) => +planet[columns] > +value);
    }
    return filteredPlanets.filter((planet) => +planet[column] < +number);
  };

  const filterEqualTo = (columns, value) => {
    if (columns && value) {
      return planets.filter((planet) => +planet[columns] > +value);
    }
    return filteredPlanets.filter((planet) => +planet[column] === +number);
  };

  const excludeColumn = () => {
    const filterOptions = options.filter((option) => option !== column);
    setOptions(filterOptions);
    setGlobalFilter({ column: filterOptions[0], comparison: 'maior que', number: '0' });
  };

  const filterPlanets = (comparison, value, columns) => {
    if (value) {
      switch (comparison) {
      case 'maior que':
        setFilteredPlanets(filterMoreThan(columns, value));
        break;
      case 'menor que':
        setFilteredPlanets(filterLessThan(columns, value));
        break;
      case 'igual a':
        setFilteredPlanets(filterEqualTo(columns, value));
        break;
      default:
        break;
      }
    }
  };

  const removeAllFilters = () => {
    setFilteredPlanets(planets);
    setFilters([]);
    setOptions(optionsArr);
  };

  useEffect(() => {
    if (filters.length === 0) {
      setFilteredPlanets(planets);
    }
  }, [filters]);

  const sortChange = ({ target: { name, value } }) => {
    setOrder({
      order: {
        ...orders.order,
        [name]: value,
      },
    });
  };

  const sortButtonClick = () => {
    const { order } = orders;
    const sortedPlanets = filteredPlanets.sort((a, b) => {
      const valueAfter = +a[order.column];
      const valueBefore = +b[order.column];
      const after = 1;
      const before = -1;
      if (a[order.column] === 'unknown') {
        return after;
      }
      if (b[order.column] === 'unknown') {
        return before;
      }
      if (order.sort === 'ASC') return valueAfter - valueBefore;
      return valueBefore - valueAfter;
    });
    setOrder({
      order: {
        ...orders.order,
        sort: order.sort,
      },
    });
    setFilteredPlanets(sortedPlanets);
  };

  const value = useMemo(() => ({
    isLoading,
    errors,
    filteredPlanets,
    filter,
    changeValue,
    globalFilter,
    setGlobalFilter,
    filterPlanets,
    options,
    filters,
    setFilters,
    setOptions,
    excludeColumn,
    removeAllFilters,
    orders,
    sortChange,
    sortButtonClick,
  }), [
    filteredPlanets, isLoading, errors, filter, globalFilter, options, filters, orders]);
  return (
    <TableContext.Provider value={ value }>
      {children}
    </TableContext.Provider>
  );
}

TableProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
