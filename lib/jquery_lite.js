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
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/dom_node_collection.js":
/*!************************************!*\
  !*** ./lib/dom_node_collection.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class DomNodeCollection {\n  constructor (arr) {\n    this.elements = arr;\n  }\n  \n  html (string) {\n    if (string || string === '') {\n      \n      this.elements.forEach(el => {\n        el.innerHTML = string;\n      });\n      \n    } else {\n      \n      return this.elements[0].innerHTML;\n    }\n  }\n  \n  empty () {\n    this.html('');\n  }\n  \n  append (someEl) {\n    if (someEl instanceof DomNodeCollection) {\n      \n      this.elements.forEach(el => {\n        someEl.elements.forEach(subEl => {\n          el.innerHTML += subEl.outerHTML; \n        });\n      });\n      \n    } else if (someEl instanceof HTMLElement) {\n      \n      this.elements.forEach(el => {\n        el.innerHTML += someEl.outerHTML;\n      }); \n      \n    } else if (someEl instanceof String) {\n      \n      this.elements.forEach(el => {\n        el.innerHTML += someEl;\n      }); \n    }\n  }\n  \n  attr (someAttribute) {\n    const attrs = this.elements[0].attributes;\n    \n    if (attrs[someAttribute]) {\n      return attrs[someAttribute].nodeValue;\n    } else new Promise(function(resolve, reject) {\n      return undefined;\n    });\n  }\n  \n  addClass (...classes) {\n    this.elements.forEach(el => {\n      \n      classes.forEach(c => {\n          el.classList.add(c);\n      });\n    });\n  }\n  \n  removeClass (...classes) {\n    this.elements.forEach(el => {\n      \n      classes.forEach(c => {\n        el.classList.remove(c);\n      });\n    });\n  }\n  \n  children () {\n    const children = [];\n    \n    this.elements.forEach(el => {\n      Array.from(el.children).forEach(child => {\n        children.push(child);\n      });\n    });\n    \n    return new DomNodeCollection(children);\n  }\n  \n  parent () {\n    const parents = [];\n    \n    this.elements.forEach(el => {\n      parents.push(el.parentNode);\n    });\n    \n    return new DomNodeCollection(parents);\n  }\n  \n  find (selector) {\n    const results = [];\n    \n    this.elements.forEach(el => {\n      const hits = Array.from(el.querySelectorAll(`${selector}`));\n      hits.forEach(hit => results.push(hit));\n    });\n    \n    return new DomNodeCollection(results);\n  }\n  \n  remove (selector) {\n    this.elements.forEach(el => {\n      if (selector) {\n        Array.from(el.querySelectorAll(selector)).forEach(child => {\n          // el might not be the direct parent of the child\n          child.parentNode.removeChild(child);\n        });\n      } else {\n        el.parentNode.removeChild(el);\n        this.elements = [];\n      }\n    });\n  }\n  \n  on (ev, cb) {\n    this.elements.forEach(el => {\n      \n      el.addEventListener(ev, cb);\n      \n      if (!el.attributes.listeners) {\n        el.attributes.listeners = {};\n        el.attributes.listeners[ev] = cb;\n      } else {\n        el.attributes.listeners[ev] = cb;\n      }\n    });\n  }\n  \n  off (ev) {\n    this.elements.forEach(el => {\n      el.removeEventListener(ev, el.attributes.listeners[ev]);\n    });\n  }\n  \n  \n}\n\nmodule.exports = DomNodeCollection;\n\n//# sourceURL=webpack:///./lib/dom_node_collection.js?");

/***/ }),

/***/ "./lib/main.js":
/*!*********************!*\
  !*** ./lib/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const DomNodeCollection = __webpack_require__(/*! ./dom_node_collection */ \"./lib/dom_node_collection.js\");\n\nconst queue = [];\n\nconst $l = (arg) => {\n  \n  if (typeof arg === 'string') {\n    const arr = Array.from(document.querySelectorAll(`${arg}`));\n    return new DomNodeCollection(arr);\n  } else if (arg instanceof HTMLElement) {\n    return new DomNodeCollection([arg]);\n  } else if (arg instanceof Function) {\n    \n    if (document.readyState === 'complete') {\n      arg();\n    } else {\n      queue.push(arg);\n    }\n  }\n};\n\n$l.extend = (...args) => {\n  const newObj = {};\n  \n  args.forEach(obj => {\n    Object.keys(obj).forEach(key => {\n      newObj[key] = obj[key];\n    });\n  }); \n  \n  return newObj;\n};\n\n$l.ajax = (options) => {\n  const defaults = {\n    success: () => {},\n    error: () => {},\n    url: `${window.location.href}`, //default to the current page\n    method: 'GET',\n    data: '',\n    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'\n  };\n  \n  options = $l.extend(defaults, options);\n  \n  const xhr = new XMLHttpRequest();\n  xhr.open(options.method, options.url);\n  \n  xhr.onerror = options.error;\n  xhr.onload = () => {\n    options.success(JSON.parse(xhr.response));\n  };\n  \n  xhr.send(options.data);\n};\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  queue.forEach(func => {\n    func();\n  });\n});\n\nwindow.$l = $l;\n\n//# sourceURL=webpack:///./lib/main.js?");

/***/ })

/******/ });