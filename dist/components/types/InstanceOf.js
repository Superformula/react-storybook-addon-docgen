"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _proptypes = require("./proptypes");

var InstanceOf = function InstanceOf(_ref) {
  var propType = _ref.propType;
  return _react.default.createElement("span", null, (0, _proptypes.getPropTypes)(propType));
};

InstanceOf.propTypes = {
  propType: _proptypes.TypeInfo.isRequired
};
var _default = InstanceOf;
exports.default = _default;