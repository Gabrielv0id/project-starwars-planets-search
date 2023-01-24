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
      </form>
    </div>
  );
}
