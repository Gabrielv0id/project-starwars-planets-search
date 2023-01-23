import React, { useContext } from 'react';
import TableContext from '../Context/TableContext';

export default function GlobalFilter() {
  const {
    globalFilter,
    setGlobalFilter,
    buttonClick,
    options,
  } = useContext(TableContext);

  return (
    <form>
      <label htmlFor="colum">
        <span>Coluna</span>
        <select
          name="column"
          id="colum"
          data-testid="column-filter"
          value={ globalFilter.column }
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
          value={ globalFilter.comparison }
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
        value={ globalFilter.number }
        onChange={
          ({ target: { name, value } }) => (
            setGlobalFilter((prevState) => ({ ...prevState, [name]: value })))
        }
      />
      <button
        type="button"
        onClick={ buttonClick }
        data-testid="button-filter"
      >
        FILTRAR
      </button>
    </form>
  );
}
