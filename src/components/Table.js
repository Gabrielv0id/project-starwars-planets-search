import React, { useState } from 'react';
import { useFilters, useTable } from 'react-table';
import PropTypes from 'prop-types';

function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters,
  );
  const [valueInput, setValueInput] = useState('');
  const handleChange = ({ target }) => {
    const value = target.value || undefined;
    setFilter('name', value);
    setValueInput(value);
  };
  return (
    <div>
      <form>
        <input
          type="text"
          value={ valueInput }
          onChange={ handleChange }
          data-testid="name-filter"
        />
      </form>
      <table { ...getTableProps() }>
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr key={ index } { ...headerGroup.getHeaderGroupProps() }>
              {headerGroup.headers.map((column, i) => (
                <th key={ i } { ...column.getHeaderProps() }>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody { ...getTableBodyProps() }>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr key={ i } { ...row.getRowProps() }>
                {row.cells.map((cell, index) => (
                  <td
                    key={ index }
                    { ...cell.getCellProps() }
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
Table.propTypes = {
  columns: PropTypes.arrayOf.isRequired,
  data: PropTypes.objectOf.isRequired,
};
export default Table;
