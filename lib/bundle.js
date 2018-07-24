/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./source/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./source/dom_node_collection.js":
/*!***************************************!*\
  !*** ./source/dom_node_collection.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DomNodeCollection = function () {
  function DomNodeCollection(arr) {
    _classCallCheck(this, DomNodeCollection);

    this.elements = arr;
  }

  _createClass(DomNodeCollection, [{
    key: 'html',
    value: function html(string) {
      if (string || string === '') {

        this.elements.forEach(function (el) {
          el.innerHTML = string;
        });
      } else {

        return this.elements[0].innerHTML;
      }
    }
  }, {
    key: 'empty',
    value: function empty() {
      this.html('');
    }
  }, {
    key: 'append',
    value: function append(someEl) {
      if (someEl instanceof DomNodeCollection) {

        this.elements.forEach(function (el) {
          someEl.elements.forEach(function (subEl) {
            el.innerHTML += subEl.outerHTML;
          });
        });
      } else if (someEl instanceof HTMLElement) {

        this.elements.forEach(function (el) {
          el.innerHTML += someEl.outerHTML;
        });
      } else if (someEl instanceof String) {

        this.elements.forEach(function (el) {
          el.innerHTML += someEl;
        });
      }
    }
  }, {
    key: 'attr',
    value: function attr(someAttribute) {
      var attrs = this.elements[0].attributes;

      if (attrs[someAttribute]) {
        return attrs[someAttribute].nodeValue;
      } else {
        return undefined;
      }
    }
  }, {
    key: 'addClass',
    value: function addClass() {
      for (var _len = arguments.length, classes = Array(_len), _key = 0; _key < _len; _key++) {
        classes[_key] = arguments[_key];
      }

      this.elements.forEach(function (el) {
        el.className += ' ' + classes.join(' ');
      });
    }
  }, {
    key: 'removeClass',
    value: function removeClass() {
      for (var _len2 = arguments.length, classes = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        classes[_key2] = arguments[_key2];
      }

      this.elements.forEach(function (el) {

        classes.forEach(function (c) {
          el.classList.remove(c);
        });
      });
    }
  }, {
    key: 'children',
    value: function children() {
      var children = [];

      this.elements.forEach(function (el) {
        Array.from(el.children).forEach(function (child) {
          children.push(child);
        });
      });

      return new DomNodeCollection(children);
    }
  }, {
    key: 'parent',
    value: function parent() {
      var parents = [];

      this.elements.forEach(function (el) {
        parents.push(el.parentNode);
      });

      return new DomNodeCollection(parents);
    }
  }, {
    key: 'find',
    value: function find(selector) {
      var results = [];

      this.elements.forEach(function (el) {
        var hits = Array.from(el.querySelectorAll('' + selector));
        hits.forEach(function (hit) {
          return results.push(hit);
        });
      });

      return new DomNodeCollection(results);
    }
  }, {
    key: 'remove',
    value: function remove(selector) {
      var _this = this;

      this.elements.forEach(function (el) {
        if (selector) {
          Array.from(el.querySelectorAll(selector)).forEach(function (child) {
            // el might not be the direct parent of the child
            child.parentNode.removeChild(child);
          });
        } else {
          el.parentNode.removeChild(el);
          _this.elements = [];
        }
      });
    }
  }, {
    key: 'on',
    value: function on(ev, cb) {
      this.elements.forEach(function (el) {

        el.addEventListener(ev, cb);

        if (!el.attributes.listeners) {
          el.attributes.listeners = {};
          el.attributes.listeners[ev] = cb;
        } else {
          el.attributes.listeners[ev] = cb;
        }
      });
    }
  }, {
    key: 'off',
    value: function off(ev) {
      this.elements.forEach(function (el) {
        el.removeEventListener(ev, el.attributes.listeners[ev]);
      });
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.elements.forEach(function (el) {
        el.style.display = 'none';
      });
    }
  }, {
    key: 'animate',
    value: function animate(properties) {
      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;
      var easing = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'ease';
      var cb = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};

      this.elements.forEach(function (el) {

        var handleEnd = function handleEnd(event) {
          el.removeEventListener('transitionend', handleEnd);
          Object.assign(el.style, initialStyles);
          cb(event);
        };

        el.addEventListener('transitionend', handleEnd);

        var initialStyles = {
          'transition-duration': el.style['transition-duration'],
          'transition-timing-function': el.style['transition-timing-function']
        };

        el.style['transition-duration'] = duration / 1000 + 's';
        el.style['transition-timing-function'] = easing;

        Object.assign(el.style, properties);
      });
    }
  }, {
    key: 'fadein',
    value: function fadein(duration, cb) {
      this.animate({ opacity: 1 }, duration, undefined, cb);
    }
  }, {
    key: 'fadeout',
    value: function fadeout(duration, cb) {
      this.animate({ opacity: 0 }, duration, undefined, cb);
    }
  }]);

  return DomNodeCollection;
}();

exports.default = DomNodeCollection;

/***/ }),

/***/ "./source/main.js":
/*!************************!*\
  !*** ./source/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _dom_node_collection = __webpack_require__(/*! ./dom_node_collection */ "./source/dom_node_collection.js");

var _dom_node_collection2 = _interopRequireDefault(_dom_node_collection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var queue = [];

var c$ = function c$(arg) {

  if (typeof arg === 'string') {
    var arr = Array.from(document.querySelectorAll('' + arg));
    return new _dom_node_collection2.default(arr);
  }

  if (arg instanceof HTMLElement) {
    return new _dom_node_collection2.default([arg]);
  }

  if (arg instanceof Function) {

    if (document.readyState === 'complete') {
      arg();
      return;
    }

    queue.push(arg);
  }
};

var passthrough = function passthrough(x) {
  return x;
};

c$.ajax = function () {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$success = _ref.success,
      success = _ref$success === undefined ? passthrough : _ref$success,
      _ref$error = _ref.error,
      error = _ref$error === undefined ? passthrough : _ref$error,
      _ref$url = _ref.url,
      url = _ref$url === undefined ? '' + window.location.href : _ref$url,
      _ref$method = _ref.method,
      method = _ref$method === undefined ? 'GET' : _ref$method,
      _ref$data = _ref.data,
      data = _ref$data === undefined ? {} : _ref$data,
      _ref$contentType = _ref.contentType,
      contentType = _ref$contentType === undefined ? 'application/x-www-form-urlencoded; charset=UTF-8' : _ref$contentType;

  return new Promise(function (resolve, reject) {

    var change = function change(e) {

      if (xhr.readyState === 4 && xhr.status === 200) {
        resolve(success(xhr.responseText));
      }

      if (xhr.readyState === 4 && xhr.status !== 200) {
        reject(error(xhr.status));
      }
    };

    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.addEventListener('readystatechange', change);

    if (method.toLowerCase() === 'post') {
      xhr.contentType = contentType;
      xhr.send(data);
      return;
    }

    xhr.send();
  });
};

document.addEventListener('DOMContentLoaded', function () {
  queue.forEach(function (func) {
    func();
  });
});

window.c$ = c$;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map