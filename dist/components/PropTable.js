"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PropTable;
exports.multiLineText = exports.Th = exports.Td = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

require("core-js/fn/array/includes");

var _marked = _interopRequireDefault(require("marked"));

var _styled = _interopRequireDefault(require("@emotion/styled"));

var _PrettyPropType = _interopRequireDefault(require("./types/PrettyPropType"));

// Table, Td, Th used to be included in @storybook/components 
// but have been removed in version 5.0
var Table = _styled.default.table({
  borderCollapse: 'collapse'
});

Table.displayName = 'Table';

var dynamicStyles = function dynamicStyles(_ref) {
  var bordered = _ref.bordered,
      code = _ref.code;
  return (0, _objectSpread2.default)({}, bordered ? {
    border: '1px solid #ccc'
  } : {}, code ? {
    whiteSpace: 'nowrap',
    fontFamily: 'Monaco, Consolas, "Courier New", monospace'
  } : {});
};

var styles = {
  padding: '2px 6px'
};

var Td = _styled.default.td(styles, dynamicStyles);

exports.Td = Td;

var Th = _styled.default.th(styles, dynamicStyles);

exports.Th = Th;
Td.displayName = 'Td';
Th.displayName = 'Th';

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

  return _react.default.createElement(Table, null, _react.default.createElement("thead", null, _react.default.createElement("tr", null, _react.default.createElement(Th, {
    bordered: true
  }, "property"), _react.default.createElement(Th, {
    bordered: true
  }, "propType"), _react.default.createElement(Th, {
    bordered: true
  }, "required"), _react.default.createElement(Th, {
    bordered: true
  }, "default"), _react.default.createElement(Th, {
    bordered: true
  }, "description"))), _react.default.createElement("tbody", null, includedPropDefinitions.map(function (row) {
    return _react.default.createElement("tr", {
      key: row.property
    }, _react.default.createElement(Td, {
      bordered: true,
      code: true
    }, row.property), _react.default.createElement(Td, {
      bordered: true,
      code: true,
      style: {
        fontSize: '14px',
        whiteSpace: 'pre-wrap'
      }
    }, _react.default.createElement(_PrettyPropType.default, {
      propType: row.propType
    })), _react.default.createElement(Td, {
      bordered: true
    }, row.required ? 'yes' : '-'), _react.default.createElement(Td, {
      bordered: true,
      code: true,
      style: {
        fontSize: '14px',
        whiteSpace: 'pre-wrap'
      }
    }, row.defaultValue === undefined ? '-' : _react.default.createElement("span", {
      style: {
        color: 'rgb(34, 34, 170)'
      }
    }, row.defaultValue)), _react.default.createElement(Td, {
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