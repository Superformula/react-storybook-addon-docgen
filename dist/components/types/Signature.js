"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _proptypes = require("./proptypes");

var Signature = function Signature(_ref) {
  var propType = _ref.propType;
  return _react.default.createElement("span", null, propType.raw);
};

Signature.propTypes = {
  propType: _proptypes.TypeInfo.isRequired
};
var _default = Signature;
exports.default = _default;