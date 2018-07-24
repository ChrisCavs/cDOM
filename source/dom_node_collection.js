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

  hide () {
    this.elements.forEach(el => {
      el.style.display = 'none'
    })
  }

  css (propName, propVal = null) {
    if (!propVal) {
      if (typeof propName === 'string') {
        return this.elements[0].style[propName]
      }

      if (propName instanceof Array) {
        return propName.map(name => this.elements[0].style[name])
      }

      if (Object.getPrototypeOf(propName) === Object.prototype) {
        this.elements.forEach(el => {
          Object.assign(el.style, propName)
        })
        return
      }
    }

    if (propVal instanceof Function) {
      this.elements.forEach((el, i) => {
        el.style[propName] = propVal(i, el.style[propName])
      })
      return
    }

    this.elements.forEach(el => {
      el.style[propName] = propVal
    })
  }

  animate (properties, duration = 1000, easing = 'ease', cb = () => {}) {
    this.elements.forEach(el => {
      
      const handleEnd = event => {
        el.removeEventListener('transitionend', handleEnd)
        Object.assign(el.style, initialStyles)
        cb(event)
      }

      el.addEventListener('transitionend', handleEnd)

      const initialStyles = {
        'transition-duration': el.style['transition-duration'],
        'transition-timing-function': el.style['transition-timing-function']
      }

      el.style['transition-duration'] = `${duration / 1000}s`
      el.style['transition-timing-function'] = easing

      Object.assign(el.style, properties)
    })
  }

  fadein (duration, cb) {
    this.animate({ opacity: 1 }, duration, undefined, cb)
  }

  fadeout (duration, cb) {
    this.animate({ opacity: 0 }, duration, undefined, cb)
  }
}

export default DomNodeCollection