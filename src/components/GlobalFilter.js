import React, { useContext } from 'react';
import TableContext from '../Context/TableContext';

export default function GlobalFilter() {
  const {
    globalFilter,
    setGlobalFilter,
    filterPlanets,
    options,
    setFilters,
    filters,
    excludeColumn,
    orders,
    sortChange,
    sortButtonClick,
  } = useContext(TableContext);

  const { column, comparison, number } = globalFilter;

  return (
    <div>
      <form>
        <label htmlFor="colum">
          <span>Coluna</span>
          <select
            name="column"
            id="colum"
            data-testid="column-filter"
            value={ column }
            onChange={
              ({ target: { name, value } }) => (
                setGlobalFilter((prevState) => ({ ...prevState, [name]: value })))
            }
          >
            {options.map((key) => (
              <option key={ key } value={ key }>
                {key}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="comparison">
          <span>Operador</span>
          <select
            name="comparison"
            id="comparison"
            data-testid="comparison-filter"
            value={ comparison }
            onChange={
              ({ target: { name, value } }) => (
                setGlobalFilter((prevState) => ({ ...prevState, [name]: value })))
            }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <input
          type="number"
          name="number"
          data-testid="value-filter"
          value={ number }
          onChange={
            ({ target: { name, value } }) => (
              setGlobalFilter((prevState) => ({ ...prevState, [name]: value })))
          }
        />
        <button
          type="button"
          onClick={ () => {
            filterPlanets(comparison, number);
            setFilters([...filters, globalFilter]);
            excludeColumn();
          } }
          data-testid="button-filter"
        >
          FILTRAR
        </button>
        <select
          name="column"
          data-testid="column-sort"
          value={ orders.column }
          onChange={ sortChange }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
        <label htmlFor="ASC">
          <input
            type="radio"
            name="sort"
            id="ASC"
            data-testid="column-sort-input-asc"
            value="ASC"
            checked={ orders.order.sort === 'ASC' }
            onChange={ sortChange }
          />
          Ascendente
        </label>
        <label htmlFor="DESC">
          <input
            type="radio"
            name="sort"
            id="DESC"
            data-testid="column-sort-input-desc"
            value="DESC"
            checked={ orders.order.sort === 'DESC' }
            onChange={ sortChange }
          />
          Descendente
        </label>
        <button
          data-testid="column-sort-button"
          type="button"
          onClick={ sortButtonClick }
        >
          Ordenar
        </button>
      </form>
    </div>
  );
}
