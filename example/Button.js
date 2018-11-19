import React from 'react';
import PropTypes from 'prop-types';

// A not well documented button component

const Button = ({ disabled, label, style, onClick }) => (
  <button disabled={disabled} onClick={onClick}>
    {label}
  </button>
);

Button.displayName = 'Button';
Button.propTypes = {
  label: PropTypes.string.isRequired,
  style: PropTypes.object,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Button;
