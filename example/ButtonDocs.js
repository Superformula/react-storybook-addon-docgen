import React from 'react';
import PropTypes from 'prop-types';

/**
 * A well documented button component for react
 */
const ButtonDocs = ({ disabled, label, style, onClick }) => (
  <button disabled={disabled} onClick={onClick}>
    {label}
  </button>
);

ButtonDocs.displayName = 'ButtonDocs';
ButtonDocs.propTypes = {
  /**
   * Label used on the button
   */
  label: PropTypes.string.isRequired,
  /**
   * Style of the button as an inline style object
   */
  style: PropTypes.object,
  /**
   * Sets disabled flag on the button component
   */
  disabled: PropTypes.bool,
  icons: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      color: PropTypes.string
    }).isRequired
  ),
  /**
   * Click event handler function (receives an `event`)
   */
  onClick: PropTypes.func,
};
ButtonDocs.defaultProps = {
  disabled: false,
  icons: [
    { type: 'type1', color: 'color1' },
    { type: 'type2', color: 'color2' },
    { type: 'type3', color: 'color3' },
  ],
  label: "Submit"
};

export default ButtonDocs;
