# cDOM
cDOM is a lightweight DOM manipulation library inspired by jQuery. Look [HERE](https://chriscavs.github.io/cDOM-Demo/) for a demo.  

Users can:
* Select and manipulate DOM elements
* Queue up and remove event listeners
* Send HTTP requests
* and more

## Getting Started
cDOM is available via CDN, courtesy of StackPath.  Simply add the following script tag to your index.html page:

```html
<script src="https://cdn.rawgit.com/ChrisCavs/cDOM/0664338a/lib/bundle.js"></script>
```

## API

[`c$`](#c)

[DOM Selection](#dom-selection)
  * [`children`](#children)
  * [`parent`](#parent)
  * [`find`](#find)

[DOM Manipulation](#dom-manipulation)  
  * [`html`](#html)  
  * [`empty`](#empty)  
  * [`append`](#append)  
  * [`remove`](#remove)  
  * [`attr`](#attr)  
  * [`addClass`](#addclass)  
  * [`removeClass`](#removeclass)
  * [`hide`](#hide)
  * [`css`](#css)

[Effects](#effects)
  * [`animate`](#animate)
  * [`fadein`](#fade-in)
  * [`fadeout`](#fade-out)
  
[Event Listeners](#event-listeners)  
  * [`on`](#on)  
  * [`off`](#off)  

[`c$.ajax`](#cajax)

### c$
The cDOM library uses the global variable c$ as a wrapper for all methods in the cDOM library.  It has 3 uses:

1. c$ is commonly used to select one or multiple elements via CSS selector (ex: `c$('.test')`).  This returns a `DOMNodeCollection` object containing an array of `HTMLElement`s.  This collection has a multitude of instance methods defined on it.

2. c$ can take unwrapped `HTMLElement`s and wrap them into a `DOMNodeCollection`.

3. c$ can also queue functions to run once the DOM content of the page has fully loaded.  An example:

```javascript
// will only run once DOM Content is loaded

c$(() => {
  console.log('DOM Content Loaded')
})

// can also queue functions to run once loaded

const setup1 = () => {
  console.log('start 1')
}

const setup2 = () => {
  console.log('start 2')
}

c$(setup1)
c$(setup2)
```
