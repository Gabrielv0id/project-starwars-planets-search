import React, { useContext } from 'react';
import TableContext from '../Context/TableContext';

export default function Filters() {
  const {
    filters,
    setFilters,
    setOptions,
    options,
    filterPlanets,
    removeAllFilters,
  } = useContext(TableContext);

  const removeFilters = (object) => {
    const removeFilter = filters.filter((filter) => filter.column !== object.column);
    setFilters(removeFilter);
    setOptions([...options, object.column]);
    removeFilter
      .forEach(({ columns, comparison, number }) => (
        filterPlanets(comparison, number, columns)));
  };

  return (
    <div>
      {filters.map((filter) => (
        <p key={ filter.column } data-testid="filter">
          {filter.column}
          {filter.comparison}
          {filter.number}

          <button type="button" onClick={ () => removeFilters(filter) }>Remover</button>
        </p>

      ))}
      <button
        data-testid="button-remove-filters"
        type="button"
        onClick={ removeAllFilters }
      >
        Remover Tudo
      </button>
    </div>
  );
}
