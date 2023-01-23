import React, { useContext } from 'react';
import TableContext from '../Context/TableContext';

export default function NameSearch() {
  const { filter, changeValue } = useContext(TableContext);
  return (
    <input
      type="text"
      onChange={ changeValue }
      value={ filter }
      data-testid="name-filter"
      name="name-search"
    />
  );
}
