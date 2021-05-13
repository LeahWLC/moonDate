/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/moonDate.js":
/*!*************************!*\
  !*** ./src/moonDate.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_mdate_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style/mdate.scss */ "./src/style/mdate.scss");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
*日历及时间类
*/


var moonDate = /*#__PURE__*/function () {
  function moonDate() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, moonDate);

    if (opts.dom) {
      this._elem = document.querySelector(opts.dom);
    } else {
      this._elem = document.createElement('div');
      document.body.appendChild(this._elem);
    }

    this._elem.onclick = this.onClick.bind(this);
    this.format = opts.format;
    this.activeDate = this.getDate(this.format);
    this.init();
  }

  _createClass(moonDate, [{
    key: "init",
    value: function init() {
      this.getAllDate();
      this.renderDom();
    }
  }, {
    key: "templateDom",
    value: function templateDom() {
      var allDisplayDate = this.getAllDate();
      var template = "\n<div class=\"mDate-wrapper\">\n  <div class=\"mDate-header\">\n    <a class=\"mDate-header-btns preyear\" data-action=\"changeYear('pre')\"><<</a>\n    <a class=\"mDate-header-btns nextyear\" data-action=\"changeYear('next')\">>></a>\n    <a class=\"mDate-header-btns premonth\" data-action=\"changeMonth('pre')\"><</a>\n    <a class=\"mDate-header-btns nextmonth\" data-action=\"changeMonth('next')\">></a>\n    <div class=\"mDate-header-title\">\n      <span class=\"mDate-month-btn\">".concat(this.activeDate.month + 1, "\u6708</span>\n      <span class=\"mDate-year-btn\">").concat(this.activeDate.year, "\u5E74</span> \n    </div>\n  </div>\n  <div class=\"mDate-body\">\n    <table>\n      <thead>\n        <tr>\n          <th>\u65E5</th>\n          <th>\u4E00</th>\n          <th>\u4E8C</th>\n          <th>\u4E09</th>\n          <th>\u56DB</th>\n          <th>\u4E94</th>\n          <th>\u516D</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr>");

      for (var i = 0; i < 42; i++) {
        var data = allDisplayDate[i];

        if (data.active && data.date == this.activeDate.date) {
          template += "\n          <td class=\"normal active\">".concat(data.date, "</td>");
        } else if (data.active) {
          template += "\n          <td class=\"normal\">".concat(data.date, "</td>");
        } else {
          template += "\n          <td class=\"unnormal\">".concat(data.date, "</td>");
        }

        if ((i + 1) % 7 == 0 && i != 41) {
          template += "\n        </tr><tr>";
        }
      }

      template += "\n        </tr>\n      </tbody>\n    </table>\n  </div>\n  <div class=\"mDate-footer\"></div>\n</div>";
      return template;
    }
  }, {
    key: "renderDom",
    value: function renderDom() {
      this._elem.innerHTML = this.templateDom(); // 方法二：字符串转为node节点
      // let node = new DOMParser().parseFromString(template,'text/html').querySelector('.mDate-wrapper');
      // this._elem.appendChild(node);   
    } //获取年月日信息

  }, {
    key: "getDate",
    value: function getDate(format) {
      var day = format ? new Date(format) : new Date();
      var dayYear = day.getFullYear();
      var dayMonth = day.getMonth();
      var dayDate = day.getDate();
      var dayDay = day.getDay();
      return {
        year: dayYear,
        month: dayMonth,
        date: dayDate,
        day: dayDay
      };
    }
  }, {
    key: "getAllDate",
    value: function getAllDate() {
      //当前日历展示所有日期信息，42个
      var allDisplayDate = []; //当前年份

      var acYear = this.activeDate.year; //当前月份

      var acMonth = this.activeDate.month; //本月第一天

      var firstDate = new Date(acYear, acMonth, 1); //本月最后一天

      var lastDate = new Date(acYear, acMonth + 1, 0); //本月天数

      var acDays = lastDate.getDate();
      var firstDateDay = firstDate.getDay();

      for (var i = 0; i < firstDateDay; i++) {
        var tempDate = new Date(this.activeDate.year, this.activeDate.month, -i);
        allDisplayDate.unshift({
          year: tempDate.getFullYear(),
          month: tempDate.getMonth(),
          date: tempDate.getDate(),
          active: false
        });
      }

      for (var _i = 0; _i < acDays; _i++) {
        allDisplayDate.push({
          year: acYear,
          month: acMonth,
          date: _i + 1,
          active: true
        });
      }

      while (allDisplayDate.length < 42) {
        var last = allDisplayDate[allDisplayDate.length - 1];

        var _tempDate = new Date(last.year, last.month, last.date + 1);

        allDisplayDate.push({
          year: _tempDate.getFullYear(),
          month: _tempDate.getMonth(),
          date: _tempDate.getDate(),
          active: false
        });
      }

      return allDisplayDate;
    } //补齐weishu

  }, {
    key: "twoDigit",
    value: function twoDigit(num) {
      return num < 10 ? '0' + (num || 0) : num;
    } //event

  }, {
    key: "onClick",
    value: function onClick(event) {
      var action = event.target.dataset.action;

      if (action) {
        var actionName = action.split('(')[0];
        var actionPara = action.split('(')[1].replace(/[)\']/g, '');
        this[actionName](actionPara);
      }
    }
  }, {
    key: "changeYear",
    value:
    /*
    *切换年份
    *type = 'next/pre'
    */
    function changeYear(type) {
      if (type == 'next') {
        this.activeDate.year += 1;
      } else {
        this.activeDate.year += -1;
      }

      this.getAllDate();
      this.renderDom();
    } //切换月份

  }, {
    key: "changeMonth",
    value: function changeMonth(type) {
      if (type == 'next') {
        if (this.activeDate.month == 11) {
          this.activeDate.month = 0;
          this.activeDate.year++;
        } else {
          this.activeDate.month++;
        }
      } else {
        if (this.activeDate.month == 0) {
          this.activeDate.month = 11;
          this.activeDate.year--;
        } else {
          this.activeDate.month--;
        }
      }

      this.getAllDate();
      this.renderDom();
    } //点击日期

  }, {
    key: "clickDay",
    value: function clickDay() {}
  }]);

  return moonDate;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (moonDate);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!./src/style/mdate.scss":
/*!*******************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!./src/style/mdate.scss ***!
  \*******************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".mDate-wrapper {\n  width: 230px;\n  border-radius: 4px;\n  display: inline-block;\n  border: 1px solid #e2e2e2;\n  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.15);\n  background-color: #fff;\n}\n.mDate-wrapper .mDate-header, .mDate-wrapper .mDate-body {\n  width: 100%;\n  text-align: center;\n}\n.mDate-wrapper .mDate-header th, .mDate-wrapper .mDate-header td, .mDate-wrapper .mDate-body th, .mDate-wrapper .mDate-body td {\n  height: 30px;\n  line-height: 30px;\n}\n.mDate-wrapper .mDate-header .active, .mDate-wrapper .mDate-body .active {\n  color: #FFFFFF;\n  background-color: green;\n}\n.mDate-wrapper .mDate-header .unnormal, .mDate-wrapper .mDate-body .unnormal {\n  color: #AAAAAA;\n}\n.mDate-wrapper .mDate-header {\n  width: 100%;\n  height: 36px;\n  line-height: 36px;\n  background-color: #f2f2f2;\n  text-align: center;\n  font-size: 14px;\n}\n.mDate-wrapper .mDate-header .mDate-header-title {\n  display: flex;\n  flex-flow: row nowrap;\n}\n.mDate-wrapper .mDate-header .mDate-header-title span {\n  flex: 1 1 auto;\n}\n.mDate-wrapper .mDate-header .mDate-header-btns {\n  width: 25px;\n  height: 100%;\n}\n.mDate-wrapper .mDate-header .preyear {\n  float: left;\n}\n.mDate-wrapper .mDate-header .premonth {\n  float: left;\n}\n.mDate-wrapper .mDate-header .nextyear {\n  float: right;\n}\n.mDate-wrapper .mDate-header .nextmonth {\n  float: right;\n}\n.mDate-wrapper .mDate-body table {\n  width: 100%;\n}", "",{"version":3,"sources":["webpack://./src/style/mdate.scss"],"names":[],"mappings":"AAEA;EACE,YAHa;EAIb,kBAAA;EACA,qBAAA;EACA,yBAAA;EACA,yCAAA;EACA,sBAAA;AADF;AAGE;EACE,WAAA;EACA,kBAAA;AADJ;AAEI;EACE,YAAA;EACA,iBAAA;AAAN;AAKI;EACE,cAAA;EACA,uBAAA;AAHN;AAKI;EACE,cAAA;AAHN;AAOE;EACE,WAAA;EACA,YAAA;EACA,iBAAA;EACA,yBAAA;EACA,kBAAA;EACA,eAAA;AALJ;AAMI;EACE,aAAA;EACA,qBAAA;AAJN;AAKM;EACE,cAAA;AAHR;AAMI;EACE,WAAA;EACA,YAAA;AAJN;AAMI;EACE,WAAA;AAJN;AAMI;EACE,WAAA;AAJN;AAMI;EACE,YAAA;AAJN;AAMI;EACE,YAAA;AAJN;AASI;EACE,WAAA;AAPN","sourcesContent":["$wrapperWidth: 230px;\n\n.mDate-wrapper {\n  width:$wrapperWidth;\n  border-radius: 4px;\n  display: inline-block;\n  border: 1px solid #e2e2e2;\n  box-shadow: 0 1px 6px rgb(0 0 0 / 15%);\n  background-color: #fff;\n\n  .mDate-header, .mDate-body {\n    width:100%;\n    text-align: center;\n    th, td{\n      height: 30px;\n      line-height: 30px;\n    }\n    .normal{\n\n    }\n    .active{\n      color:#FFFFFF;\n      background-color: green;\n    }\n    .unnormal{\n      color:#AAAAAA;\n    }\n  }\n\n  .mDate-header {\n    width: 100%;\n    height: 36px;\n    line-height: 36px;\n    background-color: #f2f2f2;\n    text-align: center;\n    font-size: 14px;\n    .mDate-header-title {\n      display: flex;\n      flex-flow: row nowrap;\n      span {\n        flex:1 1 auto;\n      }\n    }\n    .mDate-header-btns {\n      width:25px;\n      height: 100%;\n    }\n    .preyear {\n      float: left;\n    }\n    .premonth {\n      float: left;\n    }\n    .nextyear {\n      float: right;\n    }\n    .nextmonth {\n      float: right;\n    }\n  }\n\n  .mDate-body {\n    table {\n      width:100%;\n    }\n  }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js":
/*!************************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/cssWithMappingToString.js ***!
  \************************************************************************/
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/style/mdate.scss":
/*!******************************!*\
  !*** ./src/style/mdate.scss ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_mdate_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!./mdate.scss */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!./src/style/mdate.scss");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_mdate_scss__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_mdate_scss__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _moonDate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./moonDate.js */ "./src/moonDate.js");


window.onload = function () {
  var mDate = new _moonDate_js__WEBPACK_IMPORTED_MODULE_0__.default({
    dom: '#moonDate' //format:'2008-05-01'

  });
};
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tb29uZGF0ZS8uL3NyYy9tb29uRGF0ZS5qcyIsIndlYnBhY2s6Ly9tb29uZGF0ZS8uL3NyYy9zdHlsZS9tZGF0ZS5zY3NzIiwid2VicGFjazovL21vb25kYXRlLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9tb29uZGF0ZS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9jc3NXaXRoTWFwcGluZ1RvU3RyaW5nLmpzIiwid2VicGFjazovL21vb25kYXRlLy4vc3JjL3N0eWxlL21kYXRlLnNjc3M/NWIyMCIsIndlYnBhY2s6Ly9tb29uZGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9tb29uZGF0ZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9tb29uZGF0ZS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9tb29uZGF0ZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbW9vbmRhdGUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9tb29uZGF0ZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL21vb25kYXRlLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbIm1vb25EYXRlIiwib3B0cyIsImRvbSIsIl9lbGVtIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY3JlYXRlRWxlbWVudCIsImJvZHkiLCJhcHBlbmRDaGlsZCIsIm9uY2xpY2siLCJvbkNsaWNrIiwiYmluZCIsImZvcm1hdCIsImFjdGl2ZURhdGUiLCJnZXREYXRlIiwiaW5pdCIsImdldEFsbERhdGUiLCJyZW5kZXJEb20iLCJhbGxEaXNwbGF5RGF0ZSIsInRlbXBsYXRlIiwibW9udGgiLCJ5ZWFyIiwiaSIsImRhdGEiLCJhY3RpdmUiLCJkYXRlIiwiaW5uZXJIVE1MIiwidGVtcGxhdGVEb20iLCJkYXkiLCJEYXRlIiwiZGF5WWVhciIsImdldEZ1bGxZZWFyIiwiZGF5TW9udGgiLCJnZXRNb250aCIsImRheURhdGUiLCJkYXlEYXkiLCJnZXREYXkiLCJhY1llYXIiLCJhY01vbnRoIiwiZmlyc3REYXRlIiwibGFzdERhdGUiLCJhY0RheXMiLCJmaXJzdERhdGVEYXkiLCJ0ZW1wRGF0ZSIsInVuc2hpZnQiLCJwdXNoIiwibGVuZ3RoIiwibGFzdCIsIm51bSIsImV2ZW50IiwiYWN0aW9uIiwidGFyZ2V0IiwiZGF0YXNldCIsImFjdGlvbk5hbWUiLCJzcGxpdCIsImFjdGlvblBhcmEiLCJyZXBsYWNlIiwidHlwZSIsIndpbmRvdyIsIm9ubG9hZCIsIm1EYXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFFQTs7SUFFTUEsUTtBQUVKLHNCQUF1QjtBQUFBLFFBQVhDLElBQVcsdUVBQUosRUFBSTs7QUFBQTs7QUFDckIsUUFBR0EsSUFBSSxDQUFDQyxHQUFSLEVBQWE7QUFDWCxXQUFLQyxLQUFMLEdBQWFDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QkosSUFBSSxDQUFDQyxHQUE1QixDQUFiO0FBQ0QsS0FGRCxNQUVPO0FBQ0wsV0FBS0MsS0FBTCxHQUFhQyxRQUFRLENBQUNFLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBYjtBQUNBRixjQUFRLENBQUNHLElBQVQsQ0FBY0MsV0FBZCxDQUEwQixLQUFLTCxLQUEvQjtBQUNEOztBQUNELFNBQUtBLEtBQUwsQ0FBV00sT0FBWCxHQUFxQixLQUFLQyxPQUFMLENBQWFDLElBQWIsQ0FBa0IsSUFBbEIsQ0FBckI7QUFDQSxTQUFLQyxNQUFMLEdBQWNYLElBQUksQ0FBQ1csTUFBbkI7QUFDQSxTQUFLQyxVQUFMLEdBQWtCLEtB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O0FBRUE7QUFDQSwwQkFBMEI7QUFDMUI7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUIsNEJBQTRCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLG9CQUFvQiw2QkFBNkI7QUFDakQ7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEU7Ozs7OztVQzVRQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsZ0NBQWdDLFlBQVk7V0FDNUM7V0FDQSxFOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7Ozs7Ozs7O0FDTkE7O0FBRUEwRCxNQUFNLENBQUNDLE1BQVAsR0FBZ0IsWUFBSTtBQUNsQixNQUFJQyxLQUFLLEdBQUcsSUFBSTVELGlEQUFKLENBQWE7QUFDdkJFLE9BQUcsRUFBQyxXQURtQixDQUV2Qjs7QUFGdUIsR0FBYixDQUFaO0FBSUQsQ0FMRCxDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbirml6Xljoblj4rml7bpl7TnsbtcbiovXG5cbmltcG9ydCAnLi9zdHlsZS9tZGF0ZS5zY3NzJ1xuXG5jbGFzcyBtb29uRGF0ZSB7XG5cbiAgY29uc3RydWN0b3Iob3B0cyA9IHt9KSB7XG4gICAgaWYob3B0cy5kb20pIHtcbiAgICAgIHRoaXMuX2VsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKG9wdHMuZG9tKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLl9lbGVtKTtcbiAgICB9XG4gICAgdGhpcy5fZWxlbS5vbmNsaWNrID0gdGhpcy5vbkNsaWNrLmJpbmQodGhpcyk7XG4gICAgdGhpcy5mb3JtYXQgPSBvcHRzLmZvcm1hdDtcbiAgICB0aGlzLmFjdGl2ZURhdGUgPSB0aGlzLmdldERhdGUodGhpcy5mb3JtYXQpO1xuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgaW5pdCgpe1xuICAgIHRoaXMuZ2V0QWxsRGF0ZSgpO1xuICAgIHRoaXMucmVuZGVyRG9tKCk7XG4gIH1cbiAgICBcbiAgdGVtcGxhdGVEb20oKSB7XG4gICAgbGV0IGFsbERpc3BsYXlEYXRlID0gdGhpcy5nZXRBbGxEYXRlKCk7XG4gICAgbGV0IHRlbXBsYXRlID0gYFxuPGRpdiBjbGFzcz1cIm1EYXRlLXdyYXBwZXJcIj5cbiAgPGRpdiBjbGFzcz1cIm1EYXRlLWhlYWRlclwiPlxuICAgIDxhIGNsYXNzPVwibURhdGUtaGVhZGVyLWJ0bnMgcHJleWVhclwiIGRhdGEtYWN0aW9uPVwiY2hhbmdlWWVhcigncHJlJylcIj48PDwvYT5cbiAgICA8YSBjbGFzcz1cIm1EYXRlLWhlYWRlci1idG5zIG5leHR5ZWFyXCIgZGF0YS1hY3Rpb249XCJjaGFuZ2VZZWFyKCduZXh0JylcIj4+PjwvYT5cbiAgICA8YSBjbGFzcz1cIm1EYXRlLWhlYWRlci1idG5zIHByZW1vbnRoXCIgZGF0YS1hY3Rpb249XCJjaGFuZ2VNb250aCgncHJlJylcIj48PC9hPlxuICAgIDxhIGNsYXNzPVwibURhdGUtaGVhZGVyLWJ0bnMgbmV4dG1vbnRoXCIgZGF0YS1hY3Rpb249XCJjaGFuZ2VNb250aCgnbmV4dCcpXCI+PjwvYT5cbiAgICA8ZGl2IGNsYXNzPVwibURhdGUtaGVhZGVyLXRpdGxlXCI+XG4gICAgICA8c3BhbiBjbGFzcz1cIm1EYXRlLW1vbnRoLWJ0blwiPiR7dGhpcy5hY3RpdmVEYXRlLm1vbnRoKzF95pyIPC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJtRGF0ZS15ZWFyLWJ0blwiPiR7dGhpcy5hY3RpdmVEYXRlLnllYXJ95bm0PC9zcGFuPiBcbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJtRGF0ZS1ib2R5XCI+XG4gICAgPHRhYmxlPlxuICAgICAgPHRoZWFkPlxuICAgICAgICA8dHI+XG4gICAgICAgICAgPHRoPuaXpTwvdGg+XG4gICAgICAgICAgPHRoPuS4gDwvdGg+XG4gICAgICAgICAgPHRoPuS6jDwvdGg+XG4gICAgICAgICAgPHRoPuS4iTwvdGg+XG4gICAgICAgICAgPHRoPuWbmzwvdGg+XG4gICAgICAgICAgPHRoPuS6lDwvdGg+XG4gICAgICAgICAgPHRoPuWFrTwvdGg+XG4gICAgICAgIDwvdHI+XG4gICAgICA8L3RoZWFkPlxuICAgICAgPHRib2R5PlxuICAgICAgICA8dHI+YFxuICAgIGZvcihsZXQgaT0wOyBpPDQyOyBpKyspe1xuICAgICAgbGV0IGRhdGEgPSBhbGxEaXNwbGF5RGF0ZVtpXTtcbiAgICAgIGlmKGRhdGEuYWN0aXZlICYmIGRhdGEuZGF0ZSA9PSB0aGlzLmFjdGl2ZURhdGUuZGF0ZSkge1xuICAgICAgICB0ZW1wbGF0ZSArPSBgXG4gICAgICAgICAgPHRkIGNsYXNzPVwibm9ybWFsIGFjdGl2ZVwiPiR7ZGF0YS5kYXRlfTwvdGQ+YFxuICAgICAgfSBlbHNlIGlmIChkYXRhLmFjdGl2ZSkge1xuICAgICAgICB0ZW1wbGF0ZSArPSBgXG4gICAgICAgICAgPHRkIGNsYXNzPVwibm9ybWFsXCI+JHtkYXRhLmRhdGV9PC90ZD5gXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0ZW1wbGF0ZSArPSBgXG4gICAgICAgICAgPHRkIGNsYXNzPVwidW5ub3JtYWxcIj4ke2RhdGEuZGF0ZX08L3RkPmBcbiAgICAgIH1cbiAgICAgIGlmKChpKzEpJTc9PTAgJiYgaSE9NDEpIHtcbiAgICAgICAgdGVtcGxhdGUgKz0gYFxuICAgICAgICA8L3RyPjx0cj5gXG4gICAgICB9XG4gICAgfVxuICAgIHRlbXBsYXRlICs9IGBcbiAgICAgICAgPC90cj5cbiAgICAgIDwvdGJvZHk+XG4gICAgPC90YWJsZT5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJtRGF0ZS1mb290ZXJcIj48L2Rpdj5cbjwvZGl2PmBcbiAgICByZXR1cm4gdGVtcGxhdGU7XG4gIH1cblxuICByZW5kZXJEb20oKSB7XG4gICAgdGhpcy5fZWxlbS5pbm5lckhUTUwgPSB0aGlzLnRlbXBsYXRlRG9tKCk7XG5cbiAgICAvLyDmlrnms5XkuozvvJrlrZfnrKbkuLLovazkuLpub2Rl6IqC54K5XG4gICAgLy8gbGV0IG5vZGUgPSBuZXcgRE9NUGFyc2VyKCkucGFyc2VGcm9tU3RyaW5nKHRlbXBsYXRlLCd0ZXh0L2h0bWwnKS5xdWVyeVNlbGVjdG9yKCcubURhdGUtd3JhcHBlcicpO1xuICAgIC8vIHRoaXMuX2VsZW0uYXBwZW5kQ2hpbGQobm9kZSk7ICAgXG4gIH1cblxuICAvL+iOt+WPluW5tOaciOaXpeS/oeaBr1xuICBnZXREYXRlKGZvcm1hdCkge1xuICAgIGxldCBkYXkgPSBmb3JtYXQ/IG5ldyBEYXRlKGZvcm1hdCkgOiBuZXcgRGF0ZSgpO1xuICAgIGxldCBkYXlZZWFyID0gZGF5LmdldEZ1bGxZZWFyKCk7XG4gICAgbGV0IGRheU1vbnRoID0gZGF5LmdldE1vbnRoKCk7XG4gICAgbGV0IGRheURhdGUgPSBkYXkuZ2V0RGF0ZSgpO1xuICAgIGxldCBkYXlEYXkgPSBkYXkuZ2V0RGF5KCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgeWVhcjpkYXlZZWFyLFxuICAgICAgbW9udGg6ZGF5TW9udGgsXG4gICAgICBkYXRlOmRheURhdGUsXG4gICAgICBkYXk6ZGF5RGF5XG4gICAgfVxuICB9XG5cbiAgZ2V0QWxsRGF0ZSgpIHtcbiAgICAvL+W9k+WJjeaXpeWOhuWxleekuuaJgOacieaXpeacn+S/oeaBr++8jDQy5LiqXG4gICAgbGV0IGFsbERpc3BsYXlEYXRlID0gW107XG4gICAgLy/lvZPliY3lubTku71cbiAgICBsZXQgYWNZZWFyID0gdGhpcy5hY3RpdmVEYXRlLnllYXI7XG4gICAgLy/lvZPliY3mnIjku71cbiAgICBsZXQgYWNNb250aCA9IHRoaXMuYWN0aXZlRGF0ZS5tb250aDtcbiAgICAvL+acrOaciOesrOS4gOWkqVxuICAgIGxldCBmaXJzdERhdGUgPSBuZXcgRGF0ZShhY1llYXIsIGFjTW9udGgsIDEpO1xuICAgIC8v5pys5pyI5pyA5ZCO5LiA5aSpXG4gICAgbGV0IGxhc3REYXRlID0gbmV3IERhdGUoYWNZZWFyLCBhY01vbnRoKzEsIDApO1xuICAgIC8v5pys5pyI5aSp5pWwXG4gICAgbGV0IGFjRGF5cyA9IGxhc3REYXRlLmdldERhdGUoKTtcblxuICAgIGxldCBmaXJzdERhdGVEYXkgPSBmaXJzdERhdGUuZ2V0RGF5KCk7XG4gICAgZm9yKGxldCBpPTA7IGk8Zmlyc3REYXRlRGF5OyBpKyspe1xuICAgICAgbGV0IHRlbXBEYXRlID0gbmV3IERhdGUodGhpcy5hY3RpdmVEYXRlLnllYXIsIHRoaXMuYWN0aXZlRGF0ZS5tb250aCwgLWkpXG4gICAgICBhbGxEaXNwbGF5RGF0ZS51bnNoaWZ0KHtcbiAgICAgICAgeWVhcjogdGVtcERhdGUuZ2V0RnVsbFllYXIoKSxcbiAgICAgICAgbW9udGg6IHRlbXBEYXRlLmdldE1vbnRoKCksXG4gICAgICAgIGRhdGU6IHRlbXBEYXRlLmdldERhdGUoKSxcbiAgICAgICAgYWN0aXZlOmZhbHNlXG4gICAgICB9KVxuICAgIH1cbiAgICBmb3IobGV0IGk9MDsgaTxhY0RheXM7IGkrKyl7XG4gICAgICBhbGxEaXNwbGF5RGF0ZS5wdXNoKHtcbiAgICAgICAgeWVhcjogYWNZZWFyLFxuICAgICAgICBtb250aDogYWNNb250aCxcbiAgICAgICAgZGF0ZTogaSsxLFxuICAgICAgICBhY3RpdmU6dHJ1ZVxuICAgICAgfSlcbiAgICB9XG4gICAgd2hpbGUoYWxsRGlzcGxheURhdGUubGVuZ3RoPDQyKXtcbiAgICAgIGxldCBsYXN0ID0gYWxsRGlzcGxheURhdGVbYWxsRGlzcGxheURhdGUubGVuZ3RoLTFdOyBcbiAgICAgIGxldCB0ZW1wRGF0ZSA9IG5ldyBEYXRlKGxhc3QueWVhciwgbGFzdC5tb250aCwgbGFzdC5kYXRlKzEpO1xuICAgICAgYWxsRGlzcGxheURhdGUucHVzaCh7XG4gICAgICAgIHllYXI6IHRlbXBEYXRlLmdldEZ1bGxZZWFyKCksXG4gICAgICAgIG1vbnRoOiB0ZW1wRGF0ZS5nZXRNb250aCgpLFxuICAgICAgICBkYXRlOiB0ZW1wRGF0ZS5nZXREYXRlKCksXG4gICAgICAgIGFjdGl2ZTpmYWxzZVxuICAgICAgfSlcbiAgICB9XG4gICAgcmV0dXJuIGFsbERpc3BsYXlEYXRlO1xuICB9XG5cbiAgLy/ooaXpvZB3ZWlzaHVcbiAgdHdvRGlnaXQobnVtKXtcbiAgICByZXR1cm4gbnVtPDEwPyAnMCcrKG51bSB8fCAwKSA6IG51bTtcbiAgfVxuXG4gIC8vZXZlbnRcbiAgb25DbGljayhldmVudCkge1xuICAgIGxldCBhY3Rpb24gPSBldmVudC50YXJnZXQuZGF0YXNldC5hY3Rpb247XG4gICAgaWYgKGFjdGlvbikge1xuICAgICAgbGV0IGFjdGlvbk5hbWUgPSBhY3Rpb24uc3BsaXQoJygnKS5bMF07XG4gICAgICBsZXQgYWN0aW9uUGFyYSA9IGFjdGlvbi5zcGxpdCgnKCcpLlsxXS5yZXBsYWNlKC9bKVxcJ10vZywnJyk7XG4gICAgICB0aGlzW2FjdGlvbk5hbWVdKGFjdGlvblBhcmEpO1xuICAgIH1cbiAgfTtcbiAgLypcbiAgKuWIh+aNouW5tOS7vVxuICAqdHlwZSA9ICduZXh0L3ByZSdcbiAgKi9cbiAgY2hhbmdlWWVhcih0eXBlKSB7XG4gICAgaWYodHlwZSA9PSAnbmV4dCcpIHtcbiAgICAgIHRoaXMuYWN0aXZlRGF0ZS55ZWFyICs9IDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWN0aXZlRGF0ZS55ZWFyICs9IC0xO1xuICAgIH1cbiAgICB0aGlzLmdldEFsbERhdGUoKTtcbiAgICB0aGlzLnJlbmRlckRvbSgpO1xuICB9XG4gIC8v5YiH5o2i5pyI5Lu9XG4gIGNoYW5nZU1vbnRoKHR5cGUpIHtcbiAgICBpZih0eXBlID09ICduZXh0Jykge1xuICAgICAgaWYodGhpcy5hY3RpdmVEYXRlLm1vbnRoID09IDExKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlRGF0ZS5tb250aCA9IDA7XG4gICAgICAgIHRoaXMuYWN0aXZlRGF0ZS55ZWFyKys7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmFjdGl2ZURhdGUubW9udGgrKztcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYodGhpcy5hY3RpdmVEYXRlLm1vbnRoID09IDApIHtcbiAgICAgICAgdGhpcy5hY3RpdmVEYXRlLm1vbnRoID0gMTE7XG4gICAgICAgIHRoaXMuYWN0aXZlRGF0ZS55ZWFyLS07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmFjdGl2ZURhdGUubW9udGgtLTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5nZXRBbGxEYXRlKCk7XG4gICAgdGhpcy5yZW5kZXJEb20oKTtcbiAgfVxuXG4gIC8v54K55Ye75pel5pyfXG4gIGNsaWNrRGF5KCkge1xuXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbW9vbkRhdGVcblxuXG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2Nzc1dpdGhNYXBwaW5nVG9TdHJpbmcuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIi5tRGF0ZS13cmFwcGVyIHtcXG4gIHdpZHRoOiAyMzBweDtcXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGJvcmRlcjogMXB4IHNvbGlkICNlMmUyZTI7XFxuICBib3gtc2hhZG93OiAwIDFweCA2cHggcmdiYSgwLCAwLCAwLCAwLjE1KTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxufVxcbi5tRGF0ZS13cmFwcGVyIC5tRGF0ZS1oZWFkZXIsIC5tRGF0ZS13cmFwcGVyIC5tRGF0ZS1ib2R5IHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG4ubURhdGUtd3JhcHBlciAubURhdGUtaGVhZGVyIHRoLCAubURhdGUtd3JhcHBlciAubURhdGUtaGVhZGVyIHRkLCAubURhdGUtd3JhcHBlciAubURhdGUtYm9keSB0aCwgLm1EYXRlLXdyYXBwZXIgLm1EYXRlLWJvZHkgdGQge1xcbiAgaGVpZ2h0OiAzMHB4O1xcbiAgbGluZS1oZWlnaHQ6IDMwcHg7XFxufVxcbi5tRGF0ZS13cmFwcGVyIC5tRGF0ZS1oZWFkZXIgLmFjdGl2ZSwgLm1EYXRlLXdyYXBwZXIgLm1EYXRlLWJvZHkgLmFjdGl2ZSB7XFxuICBjb2xvcjogI0ZGRkZGRjtcXG4gIGJhY2tncm91bmQtY29sb3I6IGdyZWVuO1xcbn1cXG4ubURhdGUtd3JhcHBlciAubURhdGUtaGVhZGVyIC51bm5vcm1hbCwgLm1EYXRlLXdyYXBwZXIgLm1EYXRlLWJvZHkgLnVubm9ybWFsIHtcXG4gIGNvbG9yOiAjQUFBQUFBO1xcbn1cXG4ubURhdGUtd3JhcHBlciAubURhdGUtaGVhZGVyIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAzNnB4O1xcbiAgbGluZS1oZWlnaHQ6IDM2cHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjJmMmYyO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgZm9udC1zaXplOiAxNHB4O1xcbn1cXG4ubURhdGUtd3JhcHBlciAubURhdGUtaGVhZGVyIC5tRGF0ZS1oZWFkZXItdGl0bGUge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZmxvdzogcm93IG5vd3JhcDtcXG59XFxuLm1EYXRlLXdyYXBwZXIgLm1EYXRlLWhlYWRlciAubURhdGUtaGVhZGVyLXRpdGxlIHNwYW4ge1xcbiAgZmxleDogMSAxIGF1dG87XFxufVxcbi5tRGF0ZS13cmFwcGVyIC5tRGF0ZS1oZWFkZXIgLm1EYXRlLWhlYWRlci1idG5zIHtcXG4gIHdpZHRoOiAyNXB4O1xcbiAgaGVpZ2h0OiAxMDAlO1xcbn1cXG4ubURhdGUtd3JhcHBlciAubURhdGUtaGVhZGVyIC5wcmV5ZWFyIHtcXG4gIGZsb2F0OiBsZWZ0O1xcbn1cXG4ubURhdGUtd3JhcHBlciAubURhdGUtaGVhZGVyIC5wcmVtb250aCB7XFxuICBmbG9hdDogbGVmdDtcXG59XFxuLm1EYXRlLXdyYXBwZXIgLm1EYXRlLWhlYWRlciAubmV4dHllYXIge1xcbiAgZmxvYXQ6IHJpZ2h0O1xcbn1cXG4ubURhdGUtd3JhcHBlciAubURhdGUtaGVhZGVyIC5uZXh0bW9udGgge1xcbiAgZmxvYXQ6IHJpZ2h0O1xcbn1cXG4ubURhdGUtd3JhcHBlciAubURhdGUtYm9keSB0YWJsZSB7XFxuICB3aWR0aDogMTAwJTtcXG59XCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlL21kYXRlLnNjc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBRUE7RUFDRSxZQUhhO0VBSWIsa0JBQUE7RUFDQSxxQkFBQTtFQUNBLHlCQUFBO0VBQ0EseUNBQUE7RUFDQSxzQkFBQTtBQURGO0FBR0U7RUFDRSxXQUFBO0VBQ0Esa0JBQUE7QUFESjtBQUVJO0VBQ0UsWUFBQTtFQUNBLGlCQUFBO0FBQU47QUFLSTtFQUNFLGNBQUE7RUFDQSx1QkFBQTtBQUhOO0FBS0k7RUFDRSxjQUFBO0FBSE47QUFPRTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0EsaUJBQUE7RUFDQSx5QkFBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtBQUxKO0FBTUk7RUFDRSxhQUFBO0VBQ0EscUJBQUE7QUFKTjtBQUtNO0VBQ0UsY0FBQTtBQUhSO0FBTUk7RUFDRSxXQUFBO0VBQ0EsWUFBQTtBQUpOO0FBTUk7RUFDRSxXQUFBO0FBSk47QUFNSTtFQUNFLFdBQUE7QUFKTjtBQU1JO0VBQ0UsWUFBQTtBQUpOO0FBTUk7RUFDRSxZQUFBO0FBSk47QUFTSTtFQUNFLFdBQUE7QUFQTlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIkd3JhcHBlcldpZHRoOiAyMzBweDtcXG5cXG4ubURhdGUtd3JhcHBlciB7XFxuICB3aWR0aDokd3JhcHBlcldpZHRoO1xcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgYm9yZGVyOiAxcHggc29saWQgI2UyZTJlMjtcXG4gIGJveC1zaGFkb3c6IDAgMXB4IDZweCByZ2IoMCAwIDAgLyAxNSUpO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG5cXG4gIC5tRGF0ZS1oZWFkZXIsIC5tRGF0ZS1ib2R5IHtcXG4gICAgd2lkdGg6MTAwJTtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICB0aCwgdGR7XFxuICAgICAgaGVpZ2h0OiAzMHB4O1xcbiAgICAgIGxpbmUtaGVpZ2h0OiAzMHB4O1xcbiAgICB9XFxuICAgIC5ub3JtYWx7XFxuXFxuICAgIH1cXG4gICAgLmFjdGl2ZXtcXG4gICAgICBjb2xvcjojRkZGRkZGO1xcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IGdyZWVuO1xcbiAgICB9XFxuICAgIC51bm5vcm1hbHtcXG4gICAgICBjb2xvcjojQUFBQUFBO1xcbiAgICB9XFxuICB9XFxuXFxuICAubURhdGUtaGVhZGVyIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMzZweDtcXG4gICAgbGluZS1oZWlnaHQ6IDM2cHg7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmMmYyZjI7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgZm9udC1zaXplOiAxNHB4O1xcbiAgICAubURhdGUtaGVhZGVyLXRpdGxlIHtcXG4gICAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAgIGZsZXgtZmxvdzogcm93IG5vd3JhcDtcXG4gICAgICBzcGFuIHtcXG4gICAgICAgIGZsZXg6MSAxIGF1dG87XFxuICAgICAgfVxcbiAgICB9XFxuICAgIC5tRGF0ZS1oZWFkZXItYnRucyB7XFxuICAgICAgd2lkdGg6MjVweDtcXG4gICAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIH1cXG4gICAgLnByZXllYXIge1xcbiAgICAgIGZsb2F0OiBsZWZ0O1xcbiAgICB9XFxuICAgIC5wcmVtb250aCB7XFxuICAgICAgZmxvYXQ6IGxlZnQ7XFxuICAgIH1cXG4gICAgLm5leHR5ZWFyIHtcXG4gICAgICBmbG9hdDogcmlnaHQ7XFxuICAgIH1cXG4gICAgLm5leHRtb250aCB7XFxuICAgICAgZmxvYXQ6IHJpZ2h0O1xcbiAgICB9XFxuICB9XFxuXFxuICAubURhdGUtYm9keSB7XFxuICAgIHRhYmxlIHtcXG4gICAgICB3aWR0aDoxMDAlO1xcbiAgICB9XFxuICB9XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICByZXR1cm4gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGNvbnRlbnQsIFwifVwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIChtb2R1bGVzLCBtZWRpYVF1ZXJ5LCBkZWR1cGUpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1kZXN0cnVjdHVyaW5nXG4gICAgICAgIHZhciBpZCA9IHRoaXNbaV1bMF07XG5cbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbW9kdWxlcy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2ldKTtcblxuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb250aW51ZVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1lZGlhUXVlcnkpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhUXVlcnk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsyXSA9IFwiXCIuY29uY2F0KG1lZGlhUXVlcnksIFwiIGFuZCBcIikuY29uY2F0KGl0ZW1bMl0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHsgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgeyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoYXJyKSkpIHJldHVybjsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfZSA9IHVuZGVmaW5lZDsgdHJ5IHsgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSkge1xuICB2YXIgX2l0ZW0gPSBfc2xpY2VkVG9BcnJheShpdGVtLCA0KSxcbiAgICAgIGNvbnRlbnQgPSBfaXRlbVsxXSxcbiAgICAgIGNzc01hcHBpbmcgPSBfaXRlbVszXTtcblxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCBcIlwiKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJpbXBvcnQgYXBpIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICAgICAgICBpbXBvcnQgY29udGVudCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cnVsZVNldFsxXS5ydWxlc1sxXS51c2VbMV0hLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9ydWxlU2V0WzFdLnJ1bGVzWzFdLnVzZVsyXSEuL21kYXRlLnNjc3NcIjtcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5pbnNlcnQgPSBcImhlYWRcIjtcbm9wdGlvbnMuc2luZ2xldG9uID0gZmFsc2U7XG5cbnZhciB1cGRhdGUgPSBhcGkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgZGVmYXVsdCBjb250ZW50LmxvY2FscyB8fCB7fTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGlzT2xkSUUgPSBmdW5jdGlvbiBpc09sZElFKCkge1xuICB2YXIgbWVtbztcbiAgcmV0dXJuIGZ1bmN0aW9uIG1lbW9yaXplKCkge1xuICAgIGlmICh0eXBlb2YgbWVtbyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIC8vIFRlc3QgZm9yIElFIDw9IDkgYXMgcHJvcG9zZWQgYnkgQnJvd3NlcmhhY2tzXG4gICAgICAvLyBAc2VlIGh0dHA6Ly9icm93c2VyaGFja3MuY29tLyNoYWNrLWU3MWQ4NjkyZjY1MzM0MTczZmVlNzE1YzIyMmNiODA1XG4gICAgICAvLyBUZXN0cyBmb3IgZXhpc3RlbmNlIG9mIHN0YW5kYXJkIGdsb2JhbHMgaXMgdG8gYWxsb3cgc3R5bGUtbG9hZGVyXG4gICAgICAvLyB0byBvcGVyYXRlIGNvcnJlY3RseSBpbnRvIG5vbi1zdGFuZGFyZCBlbnZpcm9ubWVudHNcbiAgICAgIC8vIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIvaXNzdWVzLzE3N1xuICAgICAgbWVtbyA9IEJvb2xlYW4od2luZG93ICYmIGRvY3VtZW50ICYmIGRvY3VtZW50LmFsbCAmJiAhd2luZG93LmF0b2IpO1xuICAgIH1cblxuICAgIHJldHVybiBtZW1vO1xuICB9O1xufSgpO1xuXG52YXIgZ2V0VGFyZ2V0ID0gZnVuY3Rpb24gZ2V0VGFyZ2V0KCkge1xuICB2YXIgbWVtbyA9IHt9O1xuICByZXR1cm4gZnVuY3Rpb24gbWVtb3JpemUodGFyZ2V0KSB7XG4gICAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICAgIH1cblxuICAgIHJldHVybiBtZW1vW3RhcmdldF07XG4gIH07XG59KCk7XG5cbnZhciBzdHlsZXNJbkRvbSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRG9tLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRG9tW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM11cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5Eb21baW5kZXhdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRG9tW2luZGV4XS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlc0luRG9tLnB1c2goe1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiBhZGRTdHlsZShvYmosIG9wdGlvbnMpLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICB2YXIgYXR0cmlidXRlcyA9IG9wdGlvbnMuYXR0cmlidXRlcyB8fCB7fTtcblxuICBpZiAodHlwZW9mIGF0dHJpYnV0ZXMubm9uY2UgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSAndW5kZWZpbmVkJyA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICAgIGlmIChub25jZSkge1xuICAgICAgYXR0cmlidXRlcy5ub25jZSA9IG5vbmNlO1xuICAgIH1cbiAgfVxuXG4gIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIHN0eWxlLnNldEF0dHJpYnV0ZShrZXksIGF0dHJpYnV0ZXNba2V5XSk7XG4gIH0pO1xuXG4gIGlmICh0eXBlb2Ygb3B0aW9ucy5pbnNlcnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICBvcHRpb25zLmluc2VydChzdHlsZSk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHRhcmdldCA9IGdldFRhcmdldChvcHRpb25zLmluc2VydCB8fCAnaGVhZCcpO1xuXG4gICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gICAgfVxuXG4gICAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbiAgfVxuXG4gIHJldHVybiBzdHlsZTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGUucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGUpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxudmFyIHJlcGxhY2VUZXh0ID0gZnVuY3Rpb24gcmVwbGFjZVRleHQoKSB7XG4gIHZhciB0ZXh0U3RvcmUgPSBbXTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHJlcGxhY2UoaW5kZXgsIHJlcGxhY2VtZW50KSB7XG4gICAgdGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50O1xuICAgIHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpO1xuICB9O1xufSgpO1xuXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnKHN0eWxlLCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcbiAgdmFyIGNzcyA9IHJlbW92ZSA/ICcnIDogb2JqLm1lZGlhID8gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKS5jb25jYXQob2JqLmNzcywgXCJ9XCIpIDogb2JqLmNzczsgLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuICBpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpO1xuICB9IGVsc2Uge1xuICAgIHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcbiAgICB2YXIgY2hpbGROb2RlcyA9IHN0eWxlLmNoaWxkTm9kZXM7XG5cbiAgICBpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHtcbiAgICAgIHN0eWxlLnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcbiAgICB9XG5cbiAgICBpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcbiAgICAgIHN0eWxlLmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlLmFwcGVuZENoaWxkKGNzc05vZGUpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBhcHBseVRvVGFnKHN0eWxlLCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IG9iai5jc3M7XG4gIHZhciBtZWRpYSA9IG9iai5tZWRpYTtcbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKG1lZGlhKSB7XG4gICAgc3R5bGUuc2V0QXR0cmlidXRlKCdtZWRpYScsIG1lZGlhKTtcbiAgfSBlbHNlIHtcbiAgICBzdHlsZS5yZW1vdmVBdHRyaWJ1dGUoJ21lZGlhJyk7XG4gIH1cblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSAndW5kZWZpbmVkJykge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGUuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGUucmVtb3ZlQ2hpbGQoc3R5bGUuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxudmFyIHNpbmdsZXRvbiA9IG51bGw7XG52YXIgc2luZ2xldG9uQ291bnRlciA9IDA7XG5cbmZ1bmN0aW9uIGFkZFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgc3R5bGU7XG4gIHZhciB1cGRhdGU7XG4gIHZhciByZW1vdmU7XG5cbiAgaWYgKG9wdGlvbnMuc2luZ2xldG9uKSB7XG4gICAgdmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKys7XG4gICAgc3R5bGUgPSBzaW5nbGV0b24gfHwgKHNpbmdsZXRvbiA9IGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSk7XG4gICAgdXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCBmYWxzZSk7XG4gICAgcmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCB0cnVlKTtcbiAgfSBlbHNlIHtcbiAgICBzdHlsZSA9IGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgICB1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGUsIG9wdGlvbnMpO1xuXG4gICAgcmVtb3ZlID0gZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcbiAgICB9O1xuICB9XG5cbiAgdXBkYXRlKG9iaik7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGVTdHlsZShuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTsgLy8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTYtOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XG4gIC8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2VcblxuICBpZiAoIW9wdGlvbnMuc2luZ2xldG9uICYmIHR5cGVvZiBvcHRpb25zLnNpbmdsZXRvbiAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgb3B0aW9ucy5zaW5nbGV0b24gPSBpc09sZElFKCk7XG4gIH1cblxuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG5ld0xpc3QpICE9PSAnW29iamVjdCBBcnJheV0nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRvbVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRG9tW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRvbVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRvbS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgbW9vbkRhdGUgZnJvbSAnLi9tb29uRGF0ZS5qcydcblxud2luZG93Lm9ubG9hZCA9ICgpPT57XG4gIGxldCBtRGF0ZSA9IG5ldyBtb29uRGF0ZSh7XG4gICAgZG9tOicjbW9vbkRhdGUnXG4gICAgLy9mb3JtYXQ6JzIwMDgtMDUtMDEnXG4gIH0pO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==