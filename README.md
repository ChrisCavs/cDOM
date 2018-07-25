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

### `c$`
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

### DOM Selection
In addition to the `c$` method, there are methods defined on the `DOMNodeCollection` that will help traverse and select DOM elements.

#### `children`
Returns a `DOMNodeCollection` containing all of the children elements of the wrapped `HTMLElement`/s.  Note that this only includes *direct* children.

#### `parent`
Returns a `DOMNodeCollection` containing the parent elements of the wrapped `HTMLElement`/s.

#### `find( selector )`
Returns a `DOMNodeCollection` containing descendants of all wrapped `HTMLElement`s, filtered by selector.

### DOM Manipulation

#### `html( [string] )`

* With arguement: modifies the `innerHTML` of each element wrapped in the `DOMNodeCollection`.
* Without arguement: returns the `innerHTML` of the first element wrapped in the collection.

#### `empty`

Empties the innerHTML of each `DOMNodeCollection` element.

#### `append( selection )`

Takes a single `HTMLElement`, `DOMNodeCollection`, or `string` argument and appends it to each wrapped element.

#### `remove( selector )`

Removes `HTMLElements` that are decendents of wrapped elements, filtered by selector.

#### `attr( attribute )`

Returns the selected HTML attribute for the first wrapped element in the `DOMNodeCollection`.

#### `addClass( string/array )`

* With `string`: adds the class to all wrapped elements in the `DOMNodeCollection`.
* with `array`: adds all classes in the array to all wrapped elements.

#### `removeClass( string/array )`

* With `string`: removes the class from all wrapped elements in the `DOMNodeCollection`.
* With `array`: removes all classes in the array from all wrapped elements.

#### `hide`

Hides all wrapped elements in the `DOMNodeCollection` by setting their display property.

#### `css( propName, [propVal] )`

The `css` method will provide different functionality based on the arguements given.

* With `propName` as `string`: returns the value of the specified css property on the first wrapped element.
* With `propName` as `array`: returns the values of the specified css properties on the first wrapped element.
* With `propName` as `object`: sets the specified css properties for each wrapped element.

```javascript
// will apply all css properties specified in the POJO

c$('.test').css({
  width: '200px',
  height: '200px',
  'background-color': 'red'
})
```

* With `propName` as `string` and `propVal` as `string`: will set the specified css property to the specified value for each wrapped element.
* With `propName` as `string` and `propVal` as `function`: will set the specified css property to the return value of the provided function.  The function receives 2 arguements: the index of the wrapped element, and the current css property value.

### Effects

#### `animate( properties, [duration, easing, callback] )`

Perform an animation on the wrapped elements.

Animate will accept the following arguements:
* Properties object, with key-value pairs pointing towards css properties.
* Duration, given in milliseconds, in which the animation will take place.
* Easing function, given as a string (ex: `ease-in`, `easeOutElastic`)
* Callback

#### `fadein( [duration, callback] )`

Fades the wrapped elements in.

#### `fadeout( [duration, callback] )`

Fades the wrapped elements out.

### Event Listeners

```javascript
// define a handler
const handler = () => {
  console.log("Click event fired")
}

// select the appropriate elements
const collection = c$('.test')

// add/remove listeners
collection.on('click', handler)
collection.off('click')
```

#### `on( listener, callback )`

Adds event listener to each wrapped element.  List of events are available [here](https://developer.mozilla.org/en-US/docs/Web/Events).

#### `off( listener )`

Removes event listener from each wrapped element.

### c$.ajax

Sends HTTP Request and returns a `Promise` object.  Accepts a `Hash` object as an argument with any of the following attributes:
  * method (default: 'GET'): HTTP Request method or type
  * url (default: window.location.href): URL for HTTP Request
  * success: success callback
  * error: error callback
  * data: data object (for 'POST')
  * contentType (default: 'application/x-www-form-urlencoded; charset=UTF-8'): content type of HTTP Request

```javascript
// basic GET request

const test = c$.ajax({
  url: '/api/example',
  method: 'GET',
  success: (Data) => {
    console.log('Example created!');
  }
})
```

Because `c$.ajax` returns a promise, additional callbacks can be chained to the above HTTP request.

```javascript
...

test.then(
  success => console.log(`the result was: ${success}`),
  er => console.log(`we hit an error: ${er}`)
)
```
