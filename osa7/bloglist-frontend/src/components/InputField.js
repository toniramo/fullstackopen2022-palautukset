import { React } from 'react';
import PropTypes from 'prop-types';
import { Input } from './StyledComponents';

const InputField = ({ label, type, value, name, onChange }) => (
  <div>
    <label>
      {label}:
      <Input
        type={type}
        value={value}
        name={name}
        onChange={({ target }) => onChange(target.value)}
      />
    </label>
  </div>
);

export default InputField;

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
