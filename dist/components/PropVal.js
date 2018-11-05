'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _glamorous = require('glamorous');

var _reactAddonsCreateFragment = require('react-addons-create-fragment');

var _reactAddonsCreateFragment2 = _interopRequireDefault(_reactAddonsCreateFragment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Source code originated from https://github.com/storybooks/storybook/tree/a2a2a914275296f5776b92cd36d45811a5b377d3/addons/info/src/components
var getValueStyles = function getValueStyles() {
  var codeColors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    func: {
      color: codeColors.func || '#170'
    },

    attr: {
      color: codeColors.attr || '#666'
    },

    object: {
      color: codeColors.object || '#666'
    },

    array: {
      color: codeColors.array || '#666'
    },

    number: {
      color: codeColors.number || '#a11'
    },

    string: {
      color: codeColors.string || '#22a',
      wordBreak: 'break-word'
    },

    bool: {
      color: codeColors.bool || '#a11'
    },

    empty: {
      color: '#777'
    }
  };
};

function indent(breakIntoNewLines, level, isBlock) {
  return breakIntoNewLines && _react2.default.createElement(
    'span',
    null,
    _react2.default.createElement('br', null),
    Array(level).join('  ') + '  ',
    !isBlock && '  '
  );
}

function PreviewArray(_ref) {
  var val = _ref.val,
      level = _ref.level,
      maxPropArrayLength = _ref.maxPropArrayLength,
      maxPropStringLength = _ref.maxPropStringLength,
      maxPropsIntoLine = _ref.maxPropsIntoLine,
      valueStyles = _ref.valueStyles;

  var items = {};
  var breakIntoNewLines = val.length > maxPropsIntoLine;
  val.slice(0, maxPropArrayLength).forEach(function (item, i) {
    items['n' + i] = _react2.default.createElement(
      'span',
      null,
      indent(breakIntoNewLines, level),
      _react2.default.createElement(PropVal, {
        val: item,
        level: level + 1,
        valueStyles: valueStyles,
        maxPropStringLength: maxPropStringLength,
        maxPropsIntoLine: maxPropsIntoLine
      })
    );
    items['c' + i] = ',';
  });
  if (val.length > maxPropArrayLength) {
    items.last = _react2.default.createElement(
      'span',
      null,
      indent(breakIntoNewLines, level),
      '…'
    );
  } else {
    delete items['c' + (val.length - 1)];
  }

  return _react2.default.createElement(
    'span',
    { style: valueStyles.array },
    '[',
    (0, _reactAddonsCreateFragment2.default)(items),
    indent(breakIntoNewLines, level, true),
    ']'
  );
}

PreviewArray.propTypes = {
  val: _propTypes2.default.any, // eslint-disable-line
  maxPropArrayLength: _propTypes2.default.number.isRequired,
  maxPropStringLength: _propTypes2.default.number.isRequired,
  maxPropsIntoLine: _propTypes2.default.number.isRequired,
  level: _propTypes2.default.number.isRequired,
  valueStyles: _propTypes2.default.shape({
    func: _propTypes2.default.object,
    attr: _propTypes2.default.object,
    object: _propTypes2.default.object,
    array: _propTypes2.default.object,
    number: _propTypes2.default.object,
    string: _propTypes2.default.object,
    bool: _propTypes2.default.object,
    empty: _propTypes2.default.object
  }).isRequired
};

function PreviewObject(_ref2) {
  var val = _ref2.val,
      level = _ref2.level,
      maxPropObjectKeys = _ref2.maxPropObjectKeys,
      maxPropStringLength = _ref2.maxPropStringLength,
      maxPropsIntoLine = _ref2.maxPropsIntoLine,
      valueStyles = _ref2.valueStyles;

  var names = (0, _keys2.default)(val);
  var items = {};
  var breakIntoNewLines = names.length > maxPropsIntoLine;
  names.slice(0, maxPropObjectKeys).forEach(function (name, i) {
    items['k' + i] = _react2.default.createElement(
      'span',
      null,
      indent(breakIntoNewLines, level),
      _react2.default.createElement(
        'span',
        { style: valueStyles.attr },
        name
      )
    );
    items['c' + i] = ': ';
    items['v' + i] = _react2.default.createElement(PropVal, {
      val: val[name],
      level: level + 1,
      valueStyles: valueStyles,
      maxPropStringLength: maxPropStringLength,
      maxPropsIntoLine: maxPropsIntoLine
    });
    items['m' + i] = ',';
  });
  if (names.length > maxPropObjectKeys) {
    items.rest = _react2.default.createElement(
      'span',
      null,
      indent(breakIntoNewLines, level),
      '…'
    );
  } else {
    delete items['m' + (names.length - 1)];
  }
  return _react2.default.createElement(
    'span',
    { style: valueStyles.object },
    '{',
    (0, _reactAddonsCreateFragment2.default)(items),
    indent(breakIntoNewLines, level, true),
    '}'
  );
}

PreviewObject.propTypes = {
  val: _propTypes2.default.any, // eslint-disable-line
  maxPropObjectKeys: _propTypes2.default.number.isRequired,
  maxPropStringLength: _propTypes2.default.number.isRequired,
  maxPropsIntoLine: _propTypes2.default.number.isRequired,
  level: _propTypes2.default.number.isRequired,
  valueStyles: _propTypes2.default.shape({
    func: _propTypes2.default.object,
    attr: _propTypes2.default.object,
    object: _propTypes2.default.object,
    array: _propTypes2.default.object,
    number: _propTypes2.default.object,
    string: _propTypes2.default.object,
    bool: _propTypes2.default.object,
    empty: _propTypes2.default.object
  }).isRequired
};

function PropVal(props) {
  var level = props.level,
      maxPropObjectKeys = props.maxPropObjectKeys,
      maxPropArrayLength = props.maxPropArrayLength,
      maxPropStringLength = props.maxPropStringLength,
      maxPropsIntoLine = props.maxPropsIntoLine,
      theme = props.theme;
  var val = props.val;

  var _ref3 = theme || {},
      codeColors = _ref3.codeColors;

  var content = null;
  var valueStyles = props.valueStyles || getValueStyles(codeColors);

  if (typeof val === 'number') {
    content = _react2.default.createElement(
      'span',
      { style: valueStyles.number },
      val
    );
  } else if (typeof val === 'string') {
    if (val.length > maxPropStringLength) {
      val = val.slice(0, maxPropStringLength) + '\u2026';
    }
    if (level > 1) {
      val = '\'' + val + '\'';
    }
    content = _react2.default.createElement(
      'span',
      { style: valueStyles.string },
      val
    );
  } else if (typeof val === 'boolean') {
    content = _react2.default.createElement(
      'span',
      { style: valueStyles.bool },
      '' + val
    );
  } else if (Array.isArray(val)) {
    content = _react2.default.createElement(PreviewArray, {
      val: val,
      level: level,
      maxPropArrayLength: maxPropArrayLength,
      maxPropStringLength: maxPropStringLength,
      maxPropsIntoLine: maxPropsIntoLine,
      valueStyles: valueStyles
    });
  } else if (typeof val === 'function') {
    content = _react2.default.createElement(
      'span',
      { style: valueStyles.func },
      val.name || 'anonymous'
    );
  } else if (!val) {
    content = _react2.default.createElement(
      'span',
      { style: valueStyles.empty },
      '' + val
    );
  } else if ((typeof val === 'undefined' ? 'undefined' : (0, _typeof3.default)(val)) !== 'object') {
    content = _react2.default.createElement(
      'span',
      null,
      '\u2026'
    );
  } else if (_react2.default.isValidElement(val)) {
    content = _react2.default.createElement(
      'span',
      { style: valueStyles.object },
      '<' + (val.type.displayName || val.type.name || val.type) + ' />'
    );
  } else {
    content = _react2.default.createElement(PreviewObject, {
      val: val,
      level: level,
      maxPropObjectKeys: maxPropObjectKeys,
      maxPropStringLength: maxPropStringLength,
      maxPropsIntoLine: maxPropsIntoLine,
      valueStyles: valueStyles
    });
  }

  return content;
}

PropVal.defaultProps = {
  val: null,
  maxPropObjectKeys: 3,
  maxPropArrayLength: 3,
  maxPropStringLength: 50,
  maxPropsIntoLine: 3,
  level: 1,
  theme: {},
  valueStyles: null
};

PropVal.propTypes = {
  val: _propTypes2.default.any, // eslint-disable-line
  maxPropObjectKeys: _propTypes2.default.number,
  maxPropArrayLength: _propTypes2.default.number,
  maxPropStringLength: _propTypes2.default.number,
  maxPropsIntoLine: _propTypes2.default.number,
  level: _propTypes2.default.number,
  theme: _propTypes2.default.shape({
    codeColors: _propTypes2.default.object
  }),
  valueStyles: _propTypes2.default.shape({
    func: _propTypes2.default.object,
    attr: _propTypes2.default.object,
    object: _propTypes2.default.object,
    array: _propTypes2.default.object,
    number: _propTypes2.default.object,
    string: _propTypes2.default.object,
    bool: _propTypes2.default.object,
    empty: _propTypes2.default.object
  })
};

exports.default = (0, _glamorous.withTheme)(PropVal);