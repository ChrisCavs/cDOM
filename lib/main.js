const DomNodeCollection = require('./dom_node_collection');

const queue = [];

const $l = (arg) => {
  
  if (typeof arg === 'string') {
    const arr = Array.from(document.querySelectorAll(`${arg}`));
    return new DomNodeCollection(arr);
  } else if (arg instanceof HTMLElement) {
    return new DomNodeCollection([arg]);
  } else if (arg instanceof Function) {
    
    if (document.readyState === 'complete') {
      arg();
    } else {
      queue.push(arg);
    }
  }
};

$l.extend = (...args) => {
  const newObj = {};
  
  args.forEach(obj => {
    Object.keys(obj).forEach(key => {
      newObj[key] = obj[key];
    });
  }); 
  
  return newObj;
};

$l.ajax = (options) => {
  const defaults = {
    success: () => {},
    error: () => {},
    url: `${window.location.href}`, //default to the current page
    method: 'GET',
    data: '',
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
  };
  
  options = $l.extend(defaults, options);
  
  const xhr = new XMLHttpRequest();
  xhr.open(options.method, options.url);
  
  xhr.onerror = options.error;
  xhr.onload = () => {
    options.success(JSON.parse(xhr.response));
  };
  
  xhr.send(options.data);
};

document.addEventListener('DOMContentLoaded', () => {
  queue.forEach(func => {
    func();
  });
});

window.$l = $l;