"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var webpack = require("webpack");

function flattenMessages(nestedMessages, prefix) {
  if (prefix === void 0) {
    prefix = "";
  }

  return Object.keys(nestedMessages).reduce(function (messages, key) {
    var value = nestedMessages[key];
    var prefixedKey = prefix ? prefix + "." + key : key;

    if (typeof value === "string") {
      messages[prefixedKey] = value;
    } else {
      Object.assign(messages, flattenMessages(value, prefixedKey));
    }

    return messages;
  }, {});
}

exports.onCreateWebpackConfig = function (_ref, pluginOptions) {
  var actions = _ref.actions,
      plugins = _ref.plugins;
  var _pluginOptions$redire = pluginOptions.redirectComponent,
      redirectComponent = _pluginOptions$redire === void 0 ? null : _pluginOptions$redire,
      languages = pluginOptions.languages,
      defaultLanguage = pluginOptions.defaultLanguage;

  if (!languages.includes(defaultLanguage)) {
    languages.push(defaultLanguage);
  }

  var regex = new RegExp(languages.map(function (l) {
    return l.split("-")[0];
  }).join("|"));
  actions.setWebpackConfig({
    plugins: [plugins.define({
      GATSBY_INTL_REDIRECT_COMPONENT_PATH: JSON.stringify(redirectComponent)
    }), new webpack.ContextReplacementPlugin(/react-intl[/\\]locale-data$/, regex)]
  });
};

exports.onCreatePage =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(_ref2, pluginOptions) {
    var page, actions, createPage, deletePage, _pluginOptions$path, path, _pluginOptions$langua, languages, _pluginOptions$defaul, defaultLanguage, _pluginOptions$redire2, redirect, getMessages, generatePage, newPage;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            page = _ref2.page, actions = _ref2.actions;

            if (!(typeof page.context.intl === "object")) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return");

          case 3:
            createPage = actions.createPage, deletePage = actions.deletePage;
            _pluginOptions$path = pluginOptions.path, path = _pluginOptions$path === void 0 ? "." : _pluginOptions$path, _pluginOptions$langua = pluginOptions.languages, languages = _pluginOptions$langua === void 0 ? ["en"] : _pluginOptions$langua, _pluginOptions$defaul = pluginOptions.defaultLanguage, defaultLanguage = _pluginOptions$defaul === void 0 ? "en" : _pluginOptions$defaul, _pluginOptions$redire2 = pluginOptions.redirect, redirect = _pluginOptions$redire2 === void 0 ? false : _pluginOptions$redire2;

            getMessages = function getMessages(path, language) {
              try {
                // TODO load yaml here
                var messages = require(path + "/" + language + ".json"); //


                return flattenMessages(messages);
              } catch (err) {
                return {};
              }
            };

            generatePage = function generatePage(routed, language) {
              var messages = getMessages(path, language);
              var newPath = routed ? "/" + language + page.path : page.path;
              return (0, _extends2.default)({}, page, {
                path: newPath,
                context: (0, _extends2.default)({}, page.context, {
                  intl: {
                    language: language,
                    languages: languages,
                    messages: messages,
                    routed: routed,
                    originalPath: page.path,
                    redirect: redirect
                  }
                })
              });
            };

            newPage = generatePage(false, defaultLanguage);
            deletePage(page);
            createPage(newPage);
            languages.forEach(function (language) {
              var localePage = generatePage(true, language);
              var regexp = new RegExp("/404/?$");

              if (regexp.test(localePage.path)) {
                localePage.matchPath = "/" + language + "/*";
              }

              createPage(localePage);
            });

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref3.apply(this, arguments);
  };
}();