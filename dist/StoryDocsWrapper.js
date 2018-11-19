"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var StoryDocsWrapper = function StoryDocsWrapper(_ref) {
  var component = _ref.component,
      children = _ref.children;
  return _react.default.createElement("div", {
    className: "StoryDocsWrapper"
  }, children);
};

var _default = StoryDocsWrapper;
exports.default = _default;