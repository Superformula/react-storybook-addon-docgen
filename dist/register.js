"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _addons = _interopRequireDefault(require("@storybook/addons"));

var _DocPanel = _interopRequireDefault(require("./DocPanel"));

var _constants = require("./constants");

_addons.default.register(_constants.ADDON_ID, function (api) {
  var channel = _addons.default.getChannel();

  _addons.default.addPanel(_constants.PANEL_ID, {
    title: 'Docs',
    render: function render(_ref) {
      var active = _ref.active;
      return active ? _react.default.createElement(_DocPanel.default, {
        channel: channel,
        api: api
      }) : null;
    }
  });
});