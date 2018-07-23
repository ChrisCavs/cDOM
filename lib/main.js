import DomNodeCollection from './dom_node_collection'

const queue = []

const $l = (arg) => {
  
  if (typeof arg === 'string') {
    const arr = Array.from(document.querySelectorAll(`${arg}`))
    return new DomNodeCollection(arr)
  }

  if (arg instanceof HTMLElement) {
    return new DomNodeCollection([arg])
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
    xhr.addEventListener('readystatechange', change.bind(this))
    
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