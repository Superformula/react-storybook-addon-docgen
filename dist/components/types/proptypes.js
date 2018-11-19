"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPropTypes = exports.TypeInfo = void 0;

var _propTypes = _interopRequireWildcard(require("prop-types"));

var TypeInfo = (0, _propTypes.oneOfType)([_propTypes.default.shape({
  name: _propTypes.default.string,
  value: _propTypes.default.any
}), _propTypes.default.string]);
exports.TypeInfo = TypeInfo;

var getPropTypes = function getPropTypes(propType) {
  return propType.value || propType.elements;
};

exports.getPropTypes = getPropTypes;