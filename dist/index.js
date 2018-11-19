"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "StoryDocsWrapper", {
  enumerable: true,
  get: function get() {
    return _StoryDocsWrapper.default;
  }
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _react = _interopRequireDefault(require("react"));

var _addons = _interopRequireWildcard(require("@storybook/addons"));

var _constants = require("./constants");

var _StoryDocsWrapper = _interopRequireDefault(require("./StoryDocsWrapper"));

var _default = (0, _addons.makeDecorator)({
  name: 'withDocgen',
  parameterName: 'docgen',
  wrapper: function wrapper(storyFn, context, _ref) {
    var parameters = _ref.parameters;
    var story = storyFn(context);
    var docgen;

    if (parameters && parameters.component) {
      docgen = parameters.component.__docgenInfo;
    } else if (story.type === _StoryDocsWrapper.default) {
      docgen = story.props.component.__docgenInfo;
    } else if (story.type.derivedComponents) {
      var _ref2;

      var derivedComponents = [].concat(story.type.derivedComponents);
      docgen = _.cloneDeep(story.type.__docgenInfo);
      docgen.props = (_ref2 = _).merge.apply(_ref2, [docgen.props].concat((0, _toConsumableArray2.default)(derivedComponents.map(function (x) {
        return x.__docgenInfo && x.__docgenInfo.props ? x.__docgenInfo.props : {};
      }))));
    } else {
      docgen = story.type.__docgenInfo;
    }

    var channel = _addons.default.getChannel();

    channel.emit(_constants.EVENT_ID, {
      docgen: docgen
    });
    return story;
  }
});

exports.default = _default;