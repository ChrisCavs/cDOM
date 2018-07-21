class DomNodeCollection {
  constructor (arr) {
    this.elements = arr;
  }
  
  html (string) {
    if (string || string === '') {
      
      this.elements.forEach(el => {
        el.innerHTML = string;
      });
      
    } else {
      
      return this.elements[0].innerHTML;
    }
  }
  
  empty () {
    this.html('');
  }
  
  append (someEl) {
    if (someEl instanceof DomNodeCollection) {
      
      this.elements.forEach(el => {
        someEl.elements.forEach(subEl => {
          el.innerHTML += subEl.outerHTML; 
        });
      });
      
    } else if (someEl instanceof HTMLElement) {
      
      this.elements.forEach(el => {
        el.innerHTML += someEl.outerHTML;
      }); 
      
    } else if (someEl instanceof String) {
      
      this.elements.forEach(el => {
        el.innerHTML += someEl;
      }); 
    }
  }
  
  attr (someAttribute) {
    const attrs = this.elements[0].attributes;
    
    if (attrs[someAttribute]) {
      return attrs[someAttribute].nodeValue;
    } else new Promise(function(resolve, reject) {
      return undefined;
    });
  }
  
  addClass (...classes) {
    this.elements.forEach(el => {
      
      classes.forEach(c => {
          el.classList.add(c);
      });
    });
  }
  
  removeClass (...classes) {
    this.elements.forEach(el => {
      
      classes.forEach(c => {
        el.classList.remove(c);
      });
    });
  }
  
  children () {
    const children = [];
    
    this.elements.forEach(el => {
      Array.from(el.children).forEach(child => {
        children.push(child);
      });
    });
    
    return new DomNodeCollection(children);
  }
  
  parent () {
    const parents = [];
    
    this.elements.forEach(el => {
      parents.push(el.parentNode);
    });
    
    return new DomNodeCollection(parents);
  }
  
  find (selector) {
    const results = [];
    
    this.elements.forEach(el => {
      const hits = Array.from(el.querySelectorAll(`${selector}`));
      hits.forEach(hit => results.push(hit));
    });
    
    return new DomNodeCollection(results);
  }
  
  remove (selector) {
    this.elements.forEach(el => {
      if (selector) {
        Array.from(el.querySelectorAll(selector)).forEach(child => {
          // el might not be the direct parent of the child
          child.parentNode.removeChild(child);
        });
      } else {
        el.parentNode.removeChild(el);
        this.elements = [];
      }
    });
  }
  
  on (ev, cb) {
    this.elements.forEach(el => {
      
      el.addEventListener(ev, cb);
      
      if (!el.attributes.listeners) {
        el.attributes.listeners = {};
        el.attributes.listeners[ev] = cb;
      } else {
        el.attributes.listeners[ev] = cb;
      }
    });
  }
  
  off (ev) {
    this.elements.forEach(el => {
      el.removeEventListener(ev, el.attributes.listeners[ev]);
    });
  }
  
  
}

module.exports = DomNodeCollection;