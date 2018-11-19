"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PropTable;
exports.multiLineText = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

require("core-js/fn/array/includes");

var _marked = _interopRequireDefault(require("marked"));

var _components = require("@storybook/components");

var _PropVal = _interopRequireDefault(require("./PropVal"));

var _PrettyPropType = _interopRequireDefault(require("./types/PrettyPropType"));

var multiLineText = function multiLineText(input) {
  if (!input) {
    return input;
  }

  var text = String(input);
  var arrayOfText = text.split(/\r?\n|\r/g);
  var isSingleLine = arrayOfText.length < 2;
  return isSingleLine ? text : arrayOfText.map(function (lineOfText, i) {
    return (// eslint-disable-next-line react/no-array-index-key
      _react.default.createElement("span", {
        key: "".concat(lineOfText, ".").concat(i)
      }, i > 0 && _react.default.createElement("br", null), " ", lineOfText)
    );
  });
};

exports.multiLineText = multiLineText;

var determineIncludedPropTypes = function determineIncludedPropTypes(propDefinitions, excludedPropTypes) {
  if (excludedPropTypes.length === 0) {
    return propDefinitions;
  }

  return propDefinitions.filter(function (propDefinition) {
    return !excludedPropTypes.includes(propDefinition.property);
  });
};

function PropTable(props) {
  var type = props.type,
      maxPropObjectKeys = props.maxPropObjectKeys,
      maxPropArrayLength = props.maxPropArrayLength,
      maxPropStringLength = props.maxPropStringLength,
      propDefinitions = props.propDefinitions,
      excludedPropTypes = props.excludedPropTypes;

  if (!type) {
    return null;
  }

  var includedPropDefinitions = determineIncludedPropTypes(propDefinitions, excludedPropTypes);

  if (!includedPropDefinitions.length) {
    return _react.default.createElement("small", null, "No propTypes defined!");
  }

  var propValProps = {
    maxPropObjectKeys: maxPropObjectKeys,
    maxPropArrayLength: maxPropArrayLength,
    maxPropStringLength: maxPropStringLength
  };
  return _react.default.createElement(_components.Table, null, _react.default.createElement("thead", null, _react.default.createElement("tr", null, _react.default.createElement(_components.Th, {
    bordered: true
  }, "property"), _react.default.createElement(_components.Th, {
    bordered: true
  }, "propType"), _react.default.createElement(_components.Th, {
    bordered: true
  }, "required"), _react.default.createElement(_components.Th, {
    bordered: true
  }, "default"), _react.default.createElement(_components.Th, {
    bordered: true
  }, "description"))), _react.default.createElement("tbody", null, includedPropDefinitions.map(function (row) {
    return _react.default.createElement("tr", {
      key: row.property
    }, _react.default.createElement(_components.Td, {
      bordered: true,
      code: true
    }, row.property), _react.default.createElement(_components.Td, {
      bordered: true,
      code: true
    }, _react.default.createElement(_PrettyPropType.default, {
      propType: row.propType
    })), _react.default.createElement(_components.Td, {
      bordered: true
    }, row.required ? 'yes' : '-'), _react.default.createElement(_components.Td, {
      bordered: true
    }, row.defaultValue === undefined ? '-' : _react.default.createElement(_PropVal.default, (0, _extends2.default)({
      val: row.defaultValue
    }, propValProps))), _react.default.createElement(_components.Td, {
      bordered: true
    }, _react.default.createElement("div", {
      style: {
        marginBottom: '-16px',
        overflow: 'hidden'
      },
      dangerouslySetInnerHTML: {
        __html: (0, _marked.default)(row.description)
      }
    })));
  })));
}

PropTable.displayName = 'PropTable';
PropTable.defaultProps = {
  type: null,
  propDefinitions: [],
  excludedPropTypes: []
};
PropTable.propTypes = {
  type: _propTypes.default.func,
  maxPropObjectKeys: _propTypes.default.number.isRequired,
  maxPropArrayLength: _propTypes.default.number.isRequired,
  maxPropStringLength: _propTypes.default.number.isRequired,
  excludedPropTypes: _propTypes.default.arrayOf(_propTypes.default.string),
  propDefinitions: _propTypes.default.arrayOf(_propTypes.default.shape({
    property: _propTypes.default.string.isRequired,
    propType: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.string]),
    required: _propTypes.default.bool,
    description: _propTypes.default.string,
    defaultValue: _propTypes.default.any
  }))
};