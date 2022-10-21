import { React } from 'react';
import PropTypes from 'prop-types';

const Input = ({ label, type, value, name, onChange }) =>
  <div>
    <label>{label}:
      <input
        type={type}
        value={value}
        name={name}
        onChange={({ target }) => onChange(target.value)}
      />
    </label>
  </div>;

export default Input;

Input.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
