"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var styles = {
  hasProperty: {
    whiteSpace: 'nowrap'
  }
};

var PropertyLabel = function PropertyLabel(_ref) {
  var property = _ref.property,
      required = _ref.required;
  if (!property) return null;
  return _react.default.createElement("span", {
    style: styles.hasProperty
  }, property, required ? '' : '?', ":", ' ');
};

PropertyLabel.propTypes = {
  property: _propTypes.default.string,
  required: _propTypes.default.bool
};
PropertyLabel.defaultProps = {
  property: '',
  required: false
};
var _default = PropertyLabel;
exports.default = _default;