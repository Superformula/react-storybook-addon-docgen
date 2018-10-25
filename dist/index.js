'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _addons = require('@storybook/addons');

var _addons2 = _interopRequireDefault(_addons);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (fn) {
  var story = fn();

  var channel = _addons2.default.getChannel();

  var docgen = void 0;
  if (story.type.derivedComponents) {
    var _ref;

    var derivedComponents = [].concat(story.type.derivedComponents);
    docgen = _.cloneDeep(story.type.__docgenInfo);
    docgen.props = (_ref = _).merge.apply(_ref, [docgen.props].concat((0, _toConsumableArray3.default)(derivedComponents.map(function (x) {
      return x.__docgenInfo && x.__docgenInfo.props ? x.__docgenInfo.props : {};
    }))));
  } else {
    docgen = story.type.__docgenInfo;
  }

  channel.emit(_constants.EVENT_ID, { docgen: docgen });
  return fn();
};