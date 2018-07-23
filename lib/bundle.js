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

class DomNodeCollection {
  constructor (arr) {
    this.elements = arr
  }
  
  html (string) {
    if (string || string === '') {
      
      this.elements.forEach(el => {
        el.innerHTML = string
      })
      
    } else {
      
      return this.elements[0].innerHTML
    }
  }
  
  empty () {
    this.html('')
  }
  
  append (someEl) {
    if (someEl instanceof DomNodeCollection) {
      
      this.elements.forEach(el => {
        someEl.elements.forEach(subEl => {
          el.innerHTML += subEl.outerHTML 
        })
      })
      
    } else if (someEl instanceof HTMLElement) {
      
      this.elements.forEach(el => {
        el.innerHTML += someEl.outerHTML
      }) 
      
    } else if (someEl instanceof String) {
      
      this.elements.forEach(el => {
        el.innerHTML += someEl
      }) 
    }
  }
  
  attr (someAttribute) {
    const attrs = this.elements[0].attributes
    
    if (attrs[someAttribute]) {
      return attrs[someAttribute].nodeValue
    } else {
      return undefined
    }
  }
  
  addClass (...classes) {
    this.elements.forEach(el => {
      el.className += ' ' + classes.join(' ')
    })
  }
  
  removeClass (...classes) {
    this.elements.forEach(el => {
      
      classes.forEach(c => {
        el.classList.remove(c)
      })
    })
  }
  
  children () {
    const children = []
    
    this.elements.forEach(el => {
      Array.from(el.children).forEach(child => {
        children.push(child)
      })
    })
    
    return new DomNodeCollection(children)
  }
  
  parent () {
    const parents = []
    
    this.elements.forEach(el => {
      parents.push(el.parentNode)
    })
    
    return new DomNodeCollection(parents)
  }
  
  find (selector) {
    const results = []
    
    this.elements.forEach(el => {
      const hits = Array.from(el.querySelectorAll(`${selector}`))
      hits.forEach(hit => results.push(hit))
    })
    
    return new DomNodeCollection(results)
  }
  
  remove (selector) {
    this.elements.forEach(el => {
      if (selector) {
        Array.from(el.querySelectorAll(selector)).forEach(child => {
          // el might not be the direct parent of the child
          child.parentNode.removeChild(child)
        })
      } else {
        el.parentNode.removeChild(el)
        this.elements = []
      }
    })
  }
  
  on (ev, cb) {
    this.elements.forEach(el => {
      
      el.addEventListener(ev, cb)
      
      if (!el.attributes.listeners) {
        el.attributes.listeners = {}
        el.attributes.listeners[ev] = cb
      } else {
        el.attributes.listeners[ev] = cb
      }
    })
  }
  
  off (ev) {
    this.elements.forEach(el => {
      el.removeEventListener(ev, el.attributes.listeners[ev])
    })
  }
  
  
}

module.exports = DomNodeCollection

/***/ }),

/***/ "./lib/main.js":
/*!*********************!*\
  !*** ./lib/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dom_node_collection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom_node_collection */ "./lib/dom_node_collection.js");
/* harmony import */ var _dom_node_collection__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_dom_node_collection__WEBPACK_IMPORTED_MODULE_0__);


const queue = []

const $l = (arg) => {
  
  if (typeof arg === 'string') {
    const arr = Array.from(document.querySelectorAll(`${arg}`))
    return new _dom_node_collection__WEBPACK_IMPORTED_MODULE_0___default.a(arr)
  }

  if (arg instanceof HTMLElement) {
    return new _dom_node_collection__WEBPACK_IMPORTED_MODULE_0___default.a([arg])
  } 
  
  if (arg instanceof Function) {
    
    if (document.readyState === 'complete') {
      arg()
      return
    }

    queue.push(arg)
  }
}

const passthrough = x => x

$l.ajax = ({
  // default options
  success = passthrough,
  error = passthrough,
  url = `${window.location.href}`, //default to the current page
  method = 'GET',
  data = {},
  contentType = 'application/x-www-form-urlencoded; charset=UTF-8'
} = {}) => {
  return new Promise( (resolve, reject) => {

    const change = (e) => {
      xhr.readyState === 4 && xhr.status === 200
      ? resolve(success(xhr.responseText))
      : reject(error(xhr.status))
    }

    const xhr = new XMLHttpRequest()
    xhr.open(method, url)
    xhr.addEventListener('readystatechange', change.bind(undefined))
    
    if (method.toLowerCase() === 'post') {
      xhr.contentType = contentType
      xhr.send(data)
      return
    }

    xhr.send()
  })
}

document.addEventListener('DOMContentLoaded', () => {
  queue.forEach(func => {
    func()
  })
})

window.$l = $l

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map