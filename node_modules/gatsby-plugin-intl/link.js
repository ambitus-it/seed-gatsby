"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.changeLocale = exports.navigate = exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _gatsby = require("gatsby");

var _intlContext = require("./intl-context");

var Link = function Link(_ref) {
  var to = _ref.to,
      language = _ref.language,
      children = _ref.children,
      onClick = _ref.onClick,
      rest = (0, _objectWithoutPropertiesLoose2.default)(_ref, ["to", "language", "children", "onClick"]);
  return _react.default.createElement(_intlContext.IntlContextConsumer, null, function (intl) {
    var languageLink = language || intl.language;
    var link = intl.routed || language ? "/" + languageLink + to : "" + to;

    var handleClick = function handleClick(e) {
      if (language) {
        localStorage.setItem("gatsby-intl-language", language);
      }

      if (onClick) {
        onClick(e);
      }
    };

    return _react.default.createElement(_gatsby.Link, (0, _extends2.default)({}, rest, {
      to: link,
      onClick: handleClick
    }), children);
  });
};

Link.propTypes = {
  children: _propTypes.default.node.isRequired,
  to: _propTypes.default.string,
  language: _propTypes.default.string
};
Link.defaultProps = {
  to: ""
};
var _default = Link;
exports.default = _default;

var navigate = function navigate(to, options) {
  if (typeof window === "undefined") {
    return;
  }

  var _window$___gatsbyIntl = window.___gatsbyIntl,
      language = _window$___gatsbyIntl.language,
      routed = _window$___gatsbyIntl.routed;
  var link = routed ? "/" + language + to : "" + to;
  (0, _gatsby.navigate)(link, options);
};

exports.navigate = navigate;

var changeLocale = function changeLocale(language, to) {
  if (typeof window === "undefined") {
    return;
  }

  var routed = window.___gatsbyIntl.routed;

  var removePrefix = function removePrefix(pathname) {
    var base = typeof __BASE_PATH__ !== "undefined" ? __BASE_PATH__ : __PATH_PREFIX__;

    if (base && pathname.indexOf(base) === 0) {
      pathname = pathname.slice(base.length);
    }

    return pathname;
  };

  var removeLocalePart = function removeLocalePart(pathname) {
    if (!routed) {
      return pathname;
    }

    var i = pathname.indexOf("/", 1);
    return pathname.substring(i);
  };

  var pathname = to || removeLocalePart(removePrefix(window.location.pathname)); // TODO: check slash

  var link = "/" + language + pathname + window.location.search;
  localStorage.setItem("gatsby-intl-language", language);
  (0, _gatsby.navigate)(link);
};

exports.changeLocale = changeLocale;