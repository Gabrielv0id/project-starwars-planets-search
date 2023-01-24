import React from 'react';
import PropTypes from 'prop-types';

export default function Planets(props) {
  const { value } = props;

  return (
    <tr>
      {Object.keys(value).map((key) => (
        <td key={ value[key] } data-testid={ key === 'name' ? 'planet-name' : '' }>
          { value[key] }
        </td>
      ))}
    </tr>
  );
}

Planets.propTypes = {
  value: PropTypes.arrayOf().isRequired,
};
