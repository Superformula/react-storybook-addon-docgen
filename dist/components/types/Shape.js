"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _styled = _interopRequireDefault(require("@emotion/styled"));

var _PrettyPropType = _interopRequireDefault(require("./PrettyPropType"));

var _PropertyLabel = _interopRequireDefault(require("./PropertyLabel"));

var _proptypes = require("./proptypes");

var MARGIN_SIZE = 15;

var HighlightButton = _styled.default.button({
  border: '1px solid rgba(0, 0, 0, 0)',
  font: 'inherit',
  background: 'none',
  boxShadow: 'none',
  padding: 0,
  ':hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    border: '1px solid #ccc'
  }
}, function (_ref) {
  var highlight = _ref.highlight;
  return highlight ? [{
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    border: '1px solid #ccc'
  }] : [];
});

var Shape =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(Shape, _React$Component);

  function Shape(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Shape);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Shape).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleToggle", function () {
      var minimized = _this.state.minimized;

      _this.setState({
        minimized: !minimized
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleMouseEnter", function () {
      _this.setState({
        hover: true
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleMouseLeave", function () {
      _this.setState({
        hover: false
      });
    });
    _this.state = {
      minimized: false
    };
    return _this;
  }

  (0, _createClass2.default)(Shape, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          propType = _this$props.propType,
          depth = _this$props.depth;
      var _this$state = this.state,
          hover = _this$state.hover,
          minimized = _this$state.minimized;
      var propTypes = (0, _proptypes.getPropTypes)(propType);
      return _react.default.createElement("span", null, _react.default.createElement(HighlightButton, {
        onMouseEnter: this.handleMouseEnter,
        onMouseLeave: this.handleMouseLeave,
        highlight: hover,
        onClick: this.handleToggle
      }, '{'), _react.default.createElement(HighlightButton, {
        onClick: this.handleToggle
      }, "..."), !minimized && Object.keys(propTypes).map(function (childProperty) {
        return _react.default.createElement("div", {
          key: childProperty,
          style: {
            marginLeft: depth * MARGIN_SIZE
          }
        }, _react.default.createElement(_PropertyLabel.default, {
          property: childProperty,
          required: propTypes[childProperty].required
        }), _react.default.createElement(_PrettyPropType.default, {
          depth: depth + 1,
          propType: propTypes[childProperty]
        }), ",");
      }), _react.default.createElement(HighlightButton, {
        onMouseEnter: this.handleMouseEnter,
        onMouseLeave: this.handleMouseLeave,
        highlight: hover,
        onClick: this.handleToggle
      }, '}'));
    }
  }]);
  return Shape;
}(_react.default.Component);

Shape.propTypes = {
  propType: _proptypes.TypeInfo,
  depth: _propTypes.default.number.isRequired
};
Shape.defaultProps = {
  propType: null
};
var _default = Shape;
exports.default = _default;