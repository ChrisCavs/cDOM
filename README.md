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

[DOM Manipulation](#dom-manipulation)  
  * [`html`](#html)  
  * [`empty`](#empty)  
  * [`append`](#append)  
  * [`remove`](#remove)  
  * [`attr`](#attr)  
  * [`addClass`](#addclass)  
  * [`removeClass`](#removeclass)
  * [`css`](#css)

[Effects](#effects)
  * [`animate`](#animate)
  * [`fadein`](#fade-in)
  * [`fadeout`](#fade-out)
  
[Event Listeners](#event-listeners)  
  * [`on`](#on)  
  * [`off`](#off)  

[`c$.ajax`](#cajax) 
