'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = PropTable;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _components = require('@storybook/components');

var _PropVal = require('./PropVal');

var _PropVal2 = _interopRequireDefault(_PropVal);

var _PrettyPropType = require('./types/PrettyPropType');

var _PrettyPropType2 = _interopRequireDefault(_PrettyPropType);

var _marked = require('marked');

var _marked2 = _interopRequireDefault(_marked);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Source code originated from https://github.com/storybooks/storybook/tree/a2a2a914275296f5776b92cd36d45811a5b377d3/addons/info/src/components
function PropTable(props) {
  var type = props.type,
      maxPropObjectKeys = props.maxPropObjectKeys,
      maxPropArrayLength = props.maxPropArrayLength,
      maxPropStringLength = props.maxPropStringLength,
      propDefinitions = props.propDefinitions;


  if (!type) {
    return null;
  }

  if (!propDefinitions.length) {
    return _react2.default.createElement(
      'small',
      null,
      'No propTypes defined!'
    );
  }

  var propValProps = {
    maxPropObjectKeys: maxPropObjectKeys,
    maxPropArrayLength: maxPropArrayLength,
    maxPropStringLength: maxPropStringLength
  };

  return _react2.default.createElement(
    _components.Table,
    null,
    _react2.default.createElement(
      'thead',
      null,
      _react2.default.createElement(
        'tr',
        null,
        _react2.default.createElement(
          _components.Th,
          { bordered: true },
          'property'
        ),
        _react2.default.createElement(
          _components.Th,
          { bordered: true },
          'propType'
        ),
        _react2.default.createElement(
          _components.Th,
          { bordered: true },
          'required'
        ),
        _react2.default.createElement(
          _components.Th,
          { bordered: true },
          'default'
        ),
        _react2.default.createElement(
          _components.Th,
          { bordered: true },
          'description'
        )
      )
    ),
    _react2.default.createElement(
      'tbody',
      null,
      propDefinitions.map(function (row) {
        return _react2.default.createElement(
          'tr',
          { key: row.property },
          _react2.default.createElement(
            _components.Td,
            { bordered: true, code: true },
            row.property
          ),
          _react2.default.createElement(
            _components.Td,
            { bordered: true, code: true },
            _react2.default.createElement(_PrettyPropType2.default, { propType: row.propType })
          ),
          _react2.default.createElement(
            _components.Td,
            { bordered: true },
            row.required ? 'yes' : '-'
          ),
          _react2.default.createElement(
            _components.Td,
            { bordered: true },
            row.defaultValue === undefined ? '-' : _react2.default.createElement(_PropVal2.default, (0, _extends3.default)({ val: row.defaultValue }, propValProps))
          ),
          _react2.default.createElement(
            _components.Td,
            { bordered: true },
            _react2.default.createElement('div', {
              style: { marginBottom: '-16px', overflow: 'hidden' },
              dangerouslySetInnerHTML: { __html: (0, _marked2.default)(row.description) }
            })
          )
        );
      })
    )
  );
}

PropTable.displayName = 'PropTable';
PropTable.defaultProps = {
  type: null,
  propDefinitions: []
};
PropTable.propTypes = {
  type: _propTypes2.default.func,
  maxPropObjectKeys: _propTypes2.default.number.isRequired,
  maxPropArrayLength: _propTypes2.default.number.isRequired,
  maxPropStringLength: _propTypes2.default.number.isRequired,
  propDefinitions: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    property: _propTypes2.default.string.isRequired,
    propType: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.string]),
    required: _propTypes2.default.bool,
    description: _propTypes2.default.string,
    defaultValue: _propTypes2.default.any
  }))
};