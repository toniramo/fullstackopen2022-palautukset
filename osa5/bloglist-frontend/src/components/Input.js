import { React } from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line object-curly-newline
function Input({ label, type, value, onChange }) {
  return (
    <div>
      {`${label}: `}
      <input
        type={type}
        value={value}
        onChange={({ target }) => onChange(target.value)}
      />
    </div>
  );
}

export default Input;

Input.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
