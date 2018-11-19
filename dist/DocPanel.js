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

var _react = _interopRequireDefault(require("react"));

var _marked = _interopRequireDefault(require("marked"));

require("!style-loader!css-loader!github-markdown-css/github-markdown.css");

var _generateMarkdown = _interopRequireDefault(require("./components/generateMarkdown"));

var _PropTable = _interopRequireDefault(require("./components/PropTable"));

var _constants = require("./constants");

var styles = {
  base: {
    boxSizing: "border-box"
  }
};

var DocPanel =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(DocPanel, _React$Component);

  function DocPanel(props) {
    var _this;

    (0, _classCallCheck2.default)(this, DocPanel);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(DocPanel).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      docgen: null
    });

    _this._listener = function (d) {
      _this.setState({
        docgen: d.docgen
      });
    };

    return _this;
  }

  (0, _createClass2.default)(DocPanel, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.channel.on(_constants.EVENT_ID, this._listener);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.props.channel.removeListener(_constants.EVENT_ID, this._listener);
    }
  }, {
    key: "render",
    value: function render() {
      var docgen = this.state.docgen;

      if (!docgen) {
        return null;
      }

      var md = (0, _generateMarkdown.default)({
        displayName: docgen.displayName,
        description: docgen.description
      });
      var html = (0, _marked.default)(md);
      var propDefinitions = docgen.props ? Object.keys(docgen.props).map(function (key) {
        var prop = docgen.props[key];
        return {
          property: key,
          propType: prop.type,
          required: prop.required,
          description: prop.description,
          defaultValue: prop.defaultValue ? prop.defaultValue.value || "COMPUTED" : undefined
        };
      }) : [];
      return _react.default.createElement("div", {
        style: styles.base,
        className: "markdown-body"
      }, _react.default.createElement("div", {
        dangerouslySetInnerHTML: {
          __html: html
        }
      }), _react.default.createElement("h2", null, "Props"), _react.default.createElement(_PropTable.default, {
        type: function type() {
          return "abc";
        },
        propDefinitions: propDefinitions,
        maxPropObjectKeys: 3,
        maxPropArrayLength: 3,
        maxPropStringLength: 50
      }));
    }
  }]);
  return DocPanel;
}(_react.default.Component);

exports.default = DocPanel;