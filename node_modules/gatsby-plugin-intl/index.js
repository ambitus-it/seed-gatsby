"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
var _exportNames = {
  Link: true,
  withIntl: true,
  navigate: true,
  changeLocale: true,
  IntlContextConsumer: true
};
exports.IntlContextConsumer = exports.changeLocale = exports.navigate = exports.withIntl = exports.Link = void 0;

var _reactIntl = require("react-intl");

Object.keys(_reactIntl).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  exports[key] = _reactIntl[key];
});

var _link = _interopRequireWildcard(require("./link"));

exports.Link = _link.default;
exports.navigate = _link.navigate;
exports.changeLocale = _link.changeLocale;

var _withIntl = _interopRequireDefault(require("./with-intl"));

exports.withIntl = _withIntl.default;

var _intlContext = require("./intl-context");

exports.IntlContextConsumer = _intlContext.IntlContextConsumer;