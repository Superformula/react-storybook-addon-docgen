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

var _addons = _interopRequireWildcard(require("@storybook/addons"));

var _constants = require("./constants");

var _StoryDocsWrapper = _interopRequireDefault(require("./StoryDocsWrapper"));

var _lodash = _interopRequireDefault(require("lodash.merge"));

function getComponentDocgenInfo(component) {
  if (component.type === _StoryDocsWrapper.default) {
    return getComponentDocgenInfo({
      type: component.props.component
    });
  } else if (component.type.derivedComponents && component.type.derivedComponents.length > 0) {
    var derivedComponents = component.type.derivedComponents;
    return _lodash.default.apply(void 0, [{}, derivedComponents[derivedComponents.length - 1].__docgenInfo].concat((0, _toConsumableArray2.default)(derivedComponents.slice(0, -1).map(function (c) {
      var docgenInfo = getComponentDocgenInfo({
        type: c
      });
      return docgenInfo ? {
        props: docgenInfo.props
      } : {};
    }))));
  } else {
    return component.type.__docgenInfo;
  }
}

var _default = (0, _addons.makeDecorator)({
  name: 'withDocgen',
  parameterName: 'docgen',
  wrapper: function wrapper(storyFn, context, _ref) {
    var parameters = _ref.parameters;
    var story = storyFn(context);
    var docgen;

    if (parameters && parameters.component) {
      docgen = getComponentDocgenInfo({
        type: parameters.component
      });
    } else {
      docgen = docgen = getComponentDocgenInfo(story);
    }

    var channel = _addons.default.getChannel();

    channel.emit(_constants.EVENT_ID, {
      docgen: docgen
    });
    return story;
  }
});

exports.default = _default;