import React, { useContext } from 'react';
import TableContext from '../Context/TableContext';
import Planets from './Planets';

export default function Table() {
  const { filteredPlanets, isLoading, errors } = useContext(TableContext);
  if (isLoading) {
    return (
      <p>Carregando...</p>
    );
  }

  if (errors) {
    return (
      <p>
        {errors}
      </p>
    );
  }
  return (
    <table>
      <thead>
        <tr>
          {filteredPlanets.length > 0 && Object.keys(filteredPlanets[0]).map((header) => (
            <th key={ header }>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {filteredPlanets.length > 0 && filteredPlanets.map((planet) => (
          <Planets key={ planet.name } value={ planet } />
        ))}
      </tbody>
    </table>
  );
}
