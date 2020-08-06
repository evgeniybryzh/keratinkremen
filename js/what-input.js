var whatInput = (function () {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var whatInput = createCommonjsModule(function (module, exports) {
	/**
	 * what-input - A global utility for tracking the current input method (mouse, keyboard or touch).
	 * @version v5.2.3
	 * @link https://github.com/ten1seven/what-input
	 * @license MIT
	 */
	(function webpackUniversalModuleDefinition(root, factory) {
	  module.exports = factory();
	})(commonjsGlobal, function () {
	  return (
	    /******/
	    function (modules) {
	      // webpackBootstrap

	      /******/
	      // The module cache

	      /******/
	      var installedModules = {};
	      /******/
	      // The require function

	      /******/

	      function __webpack_require__(moduleId) {
	        /******/
	        // Check if module is in cache

	        /******/
	        if (installedModules[moduleId])
	          /******/
	          return installedModules[moduleId].exports;
	        /******/
	        // Create a new module (and put it into the cache)

	        /******/

	        var module = installedModules[moduleId] = {
	          /******/
	          exports: {},

	          /******/
	          id: moduleId,

	          /******/
	          loaded: false
	          /******/

	        };
	        /******/
	        // Execute the module function

	        /******/

	        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	        /******/
	        // Flag the module as loaded

	        /******/

	        module.loaded = true;
	        /******/
	        // Return the exports of the module

	        /******/

	        return module.exports;
	        /******/
	      }
	      /******/
	      // expose the modules object (__webpack_modules__)

	      /******/


	      __webpack_require__.m = modules;
	      /******/
	      // expose the module cache

	      /******/

	      __webpack_require__.c = installedModules;
	      /******/
	      // __webpack_public_path__

	      /******/

	      __webpack_require__.p = "";
	      /******/
	      // Load entry module and return exports

	      /******/

	      return __webpack_require__(0);
	      /******/
	    }(
	    /************************************************************************/

	    /******/
	    [
	    /* 0 */

	    /***/
	    function (module, exports) {

	      module.exports = function () {
	        /*
	         * bail out if there is no document or window
	         * (i.e. in a node/non-DOM environment)
	         *
	         * Return a stubbed API instead
	         */
	        if (typeof document === 'undefined' || typeof window === 'undefined') {
	          return {
	            // always return "initial" because no interaction will ever be detected
	            ask: function ask() {
	              return 'initial';
	            },
	            // always return null
	            element: function element() {
	              return null;
	            },
	            // no-op
	            ignoreKeys: function ignoreKeys() {},
	            // no-op
	            specificKeys: function specificKeys() {},
	            // no-op
	            registerOnChange: function registerOnChange() {},
	            // no-op
	            unRegisterOnChange: function unRegisterOnChange() {}
	          };
	        }
	        /*
	         * variables
	         */
	        // cache document.documentElement


	        var docElem = document.documentElement; // currently focused dom element

	        var currentElement = null; // last used input type

	        var currentInput = 'initial'; // last used input intent

	        var currentIntent = currentInput; // UNIX timestamp of current event

	        var currentTimestamp = Date.now(); // check for sessionStorage support
	        // then check for session variables and use if available

	        try {
	          if (window.sessionStorage.getItem('what-input')) {
	            currentInput = window.sessionStorage.getItem('what-input');
	          }

	          if (window.sessionStorage.getItem('what-intent')) {
	            currentIntent = window.sessionStorage.getItem('what-intent');
	          }
	        } catch (e) {} // form input types


	        var formInputs = ['button', 'input', 'select', 'textarea']; // empty array for holding callback functions

	        var functionList = []; // list of modifier keys commonly used with the mouse and
	        // can be safely ignored to prevent false keyboard detection

	        var ignoreMap = [16, // shift
	        17, // control
	        18, // alt
	        91, // Windows key / left Apple cmd
	        93 // Windows menu / right Apple cmd
	        ];
	        var specificMap = []; // mapping of events to input types

	        var inputMap = {
	          keydown: 'keyboard',
	          keyup: 'keyboard',
	          mousedown: 'mouse',
	          mousemove: 'mouse',
	          MSPointerDown: 'pointer',
	          MSPointerMove: 'pointer',
	          pointerdown: 'pointer',
	          pointermove: 'pointer',
	          touchstart: 'touch',
	          touchend: 'touch' // boolean: true if the page is being scrolled

	        };
	        var isScrolling = false; // store current mouse position

	        var mousePos = {
	          x: null,
	          y: null // map of IE 10 pointer events

	        };
	        var pointerMap = {
	          2: 'touch',
	          3: 'touch',
	          // treat pen like touch
	          4: 'mouse' // check support for passive event listeners

	        };
	        var supportsPassive = false;

	        try {
	          var opts = Object.defineProperty({}, 'passive', {
	            get: function get() {
	              supportsPassive = true;
	            }
	          });
	          window.addEventListener('test', null, opts);
	        } catch (e) {}
	        /*
	         * set up
	         */


	        var setUp = function setUp() {
	          // add correct mouse wheel event mapping to `inputMap`
	          inputMap[detectWheel()] = 'mouse';
	          addListeners();
	          doUpdate('input');
	          doUpdate('intent');
	        };
	        /*
	         * events
	         */


	        var addListeners = function addListeners() {
	          // `pointermove`, `MSPointerMove`, `mousemove` and mouse wheel event binding
	          // can only demonstrate potential, but not actual, interaction
	          // and are treated separately
	          var options = supportsPassive ? {
	            passive: true
	          } : false; // pointer events (mouse, pen, touch)

	          if (window.PointerEvent) {
	            window.addEventListener('pointerdown', setInput);
	            window.addEventListener('pointermove', setIntent);
	          } else if (window.MSPointerEvent) {
	            window.addEventListener('MSPointerDown', setInput);
	            window.addEventListener('MSPointerMove', setIntent);
	          } else {
	            // mouse events
	            window.addEventListener('mousedown', setInput);
	            window.addEventListener('mousemove', setIntent); // touch events

	            if ('ontouchstart' in window) {
	              window.addEventListener('touchstart', setInput, options);
	              window.addEventListener('touchend', setInput);
	            }
	          } // mouse wheel


	          window.addEventListener(detectWheel(), setIntent, options); // keyboard events

	          window.addEventListener('keydown', setInput);
	          window.addEventListener('keyup', setInput); // focus events

	          window.addEventListener('focusin', setElement);
	          window.addEventListener('focusout', clearElement);
	        }; // checks conditions before updating new input


	        var setInput = function setInput(event) {
	          var eventKey = event.which;
	          var value = inputMap[event.type];

	          if (value === 'pointer') {
	            value = pointerType(event);
	          }

	          var ignoreMatch = !specificMap.length && ignoreMap.indexOf(eventKey) === -1;
	          var specificMatch = specificMap.length && specificMap.indexOf(eventKey) !== -1;
	          var shouldUpdate = value === 'keyboard' && eventKey && (ignoreMatch || specificMatch) || value === 'mouse' || value === 'touch'; // prevent touch detection from being overridden by event execution order

	          if (validateTouch(value)) {
	            shouldUpdate = false;
	          }

	          if (shouldUpdate && currentInput !== value) {
	            currentInput = value;

	            try {
	              window.sessionStorage.setItem('what-input', currentInput);
	            } catch (e) {}

	            doUpdate('input');
	          }

	          if (shouldUpdate && currentIntent !== value) {
	            // preserve intent for keyboard interaction with form fields
	            var activeElem = document.activeElement;
	            var notFormInput = activeElem && activeElem.nodeName && (formInputs.indexOf(activeElem.nodeName.toLowerCase()) === -1 || activeElem.nodeName.toLowerCase() === 'button' && !checkClosest(activeElem, 'form'));

	            if (notFormInput) {
	              currentIntent = value;

	              try {
	                window.sessionStorage.setItem('what-intent', currentIntent);
	              } catch (e) {}

	              doUpdate('intent');
	            }
	          }
	        }; // updates the doc and `inputTypes` array with new input


	        var doUpdate = function doUpdate(which) {
	          docElem.setAttribute('data-what' + which, which === 'input' ? currentInput : currentIntent);
	          fireFunctions(which);
	        }; // updates input intent for `mousemove` and `pointermove`


	        var setIntent = function setIntent(event) {
	          var value = inputMap[event.type];

	          if (value === 'pointer') {
	            value = pointerType(event);
	          } // test to see if `mousemove` happened relative to the screen to detect scrolling versus mousemove


	          detectScrolling(event); // only execute if scrolling isn't happening

	          if ((!isScrolling && !validateTouch(value) || isScrolling && event.type === 'wheel' || event.type === 'mousewheel' || event.type === 'DOMMouseScroll') && currentIntent !== value) {
	            currentIntent = value;

	            try {
	              window.sessionStorage.setItem('what-intent', currentIntent);
	            } catch (e) {}

	            doUpdate('intent');
	          }
	        };

	        var setElement = function setElement(event) {
	          if (!event.target.nodeName) {
	            // If nodeName is undefined, clear the element
	            // This can happen if click inside an <svg> element.
	            clearElement();
	            return;
	          }

	          currentElement = event.target.nodeName.toLowerCase();
	          docElem.setAttribute('data-whatelement', currentElement);

	          if (event.target.classList && event.target.classList.length) {
	            docElem.setAttribute('data-whatclasses', event.target.classList.toString().replace(' ', ','));
	          }
	        };

	        var clearElement = function clearElement() {
	          currentElement = null;
	          docElem.removeAttribute('data-whatelement');
	          docElem.removeAttribute('data-whatclasses');
	        };
	        /*
	         * utilities
	         */


	        var pointerType = function pointerType(event) {
	          if (typeof event.pointerType === 'number') {
	            return pointerMap[event.pointerType];
	          } else {
	            // treat pen like touch
	            return event.pointerType === 'pen' ? 'touch' : event.pointerType;
	          }
	        }; // prevent touch detection from being overridden by event execution order


	        var validateTouch = function validateTouch(value) {
	          var timestamp = Date.now();
	          var touchIsValid = value === 'mouse' && currentInput === 'touch' && timestamp - currentTimestamp < 200;
	          currentTimestamp = timestamp;
	          return touchIsValid;
	        }; // detect version of mouse wheel event to use
	        // via https://developer.mozilla.org/en-US/docs/Web/API/Element/wheel_event


	        var detectWheel = function detectWheel() {
	          var wheelType = null; // Modern browsers support "wheel"

	          if ('onwheel' in document.createElement('div')) {
	            wheelType = 'wheel';
	          } else {
	            // Webkit and IE support at least "mousewheel"
	            // or assume that remaining browsers are older Firefox
	            wheelType = document.onmousewheel !== undefined ? 'mousewheel' : 'DOMMouseScroll';
	          }

	          return wheelType;
	        }; // runs callback functions


	        var fireFunctions = function fireFunctions(type) {
	          for (var i = 0, len = functionList.length; i < len; i++) {
	            if (functionList[i].type === type) {
	              functionList[i].fn.call(undefined, type === 'input' ? currentInput : currentIntent);
	            }
	          }
	        }; // finds matching element in an object


	        var objPos = function objPos(match) {
	          for (var i = 0, len = functionList.length; i < len; i++) {
	            if (functionList[i].fn === match) {
	              return i;
	            }
	          }
	        };

	        var detectScrolling = function detectScrolling(event) {
	          if (mousePos['x'] !== event.screenX || mousePos['y'] !== event.screenY) {
	            isScrolling = false;
	            mousePos['x'] = event.screenX;
	            mousePos['y'] = event.screenY;
	          } else {
	            isScrolling = true;
	          }
	        }; // manual version of `closest()`


	        var checkClosest = function checkClosest(elem, tag) {
	          var ElementPrototype = window.Element.prototype;

	          if (!ElementPrototype.matches) {
	            ElementPrototype.matches = ElementPrototype.msMatchesSelector || ElementPrototype.webkitMatchesSelector;
	          }

	          if (!ElementPrototype.closest) {
	            do {
	              if (elem.matches(tag)) {
	                return elem;
	              }

	              elem = elem.parentElement || elem.parentNode;
	            } while (elem !== null && elem.nodeType === 1);

	            return null;
	          } else {
	            return elem.closest(tag);
	          }
	        };
	        /*
	         * init
	         */
	        // don't start script unless browser cuts the mustard
	        // (also passes if polyfills are used)


	        if ('addEventListener' in window && Array.prototype.indexOf) {
	          setUp();
	        }
	        /*
	         * api
	         */


	        return {
	          // returns string: the current input type
	          // opt: 'intent'|'input'
	          // 'input' (default): returns the same value as the `data-whatinput` attribute
	          // 'intent': includes `data-whatintent` value if it's different than `data-whatinput`
	          ask: function ask(opt) {
	            return opt === 'intent' ? currentIntent : currentInput;
	          },
	          // returns string: the currently focused element or null
	          element: function element() {
	            return currentElement;
	          },
	          // overwrites ignored keys with provided array
	          ignoreKeys: function ignoreKeys(arr) {
	            ignoreMap = arr;
	          },
	          // overwrites specific char keys to update on
	          specificKeys: function specificKeys(arr) {
	            specificMap = arr;
	          },
	          // attach functions to input and intent "events"
	          // funct: function to fire on change
	          // eventType: 'input'|'intent'
	          registerOnChange: function registerOnChange(fn, eventType) {
	            functionList.push({
	              fn: fn,
	              type: eventType || 'input'
	            });
	          },
	          unRegisterOnChange: function unRegisterOnChange(fn) {
	            var position = objPos(fn);

	            if (position || position === 0) {
	              functionList.splice(position, 1);
	            }
	          }
	        };
	      }();
	      /***/

	    }
	    /******/
	    ])
	  );
	});
	});

	return whatInput;

}());

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hhdC1pbnB1dC5qcyIsInNvdXJjZXMiOlsic3JjL2pzL3doYXQtaW5wdXQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiB3aGF0LWlucHV0IC0gQSBnbG9iYWwgdXRpbGl0eSBmb3IgdHJhY2tpbmcgdGhlIGN1cnJlbnQgaW5wdXQgbWV0aG9kIChtb3VzZSwga2V5Ym9hcmQgb3IgdG91Y2gpLlxuICogQHZlcnNpb24gdjUuMi4zXG4gKiBAbGluayBodHRwczovL2dpdGh1Yi5jb20vdGVuMXNldmVuL3doYXQtaW5wdXRcbiAqIEBsaWNlbnNlIE1JVFxuICovXG4oZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcIndoYXRJbnB1dFwiLCBbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJ3aGF0SW5wdXRcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wid2hhdElucHV0XCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gLyoqKioqKi8gKGZ1bmN0aW9uKG1vZHVsZXMpIHsgLy8gd2VicGFja0Jvb3RzdHJhcFxuLyoqKioqKi8gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbi8qKioqKiovIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbi8qKioqKiovIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4vKioqKioqLyBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4vKioqKioqLyBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4vKioqKioqLyBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuLyoqKioqKi8gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4vKioqKioqLyBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuLyoqKioqKi8gXHRcdFx0ZXhwb3J0czoge30sXG4vKioqKioqLyBcdFx0XHRpZDogbW9kdWxlSWQsXG4vKioqKioqLyBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4vKioqKioqLyBcdFx0fTtcblxuLyoqKioqKi8gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuLyoqKioqKi8gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4vKioqKioqLyBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuLyoqKioqKi8gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4vKioqKioqLyBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbi8qKioqKiovIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4vKioqKioqLyBcdH1cblxuXG4vKioqKioqLyBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbi8qKioqKiovIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuLyoqKioqKi8gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4vKioqKioqLyBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLyoqKioqKi8gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcbi8qKioqKiovIH0pXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKioqKi8gKFtcbi8qIDAgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG5cdCAgLypcblx0ICAgKiBiYWlsIG91dCBpZiB0aGVyZSBpcyBubyBkb2N1bWVudCBvciB3aW5kb3dcblx0ICAgKiAoaS5lLiBpbiBhIG5vZGUvbm9uLURPTSBlbnZpcm9ubWVudClcblx0ICAgKlxuXHQgICAqIFJldHVybiBhIHN0dWJiZWQgQVBJIGluc3RlYWRcblx0ICAgKi9cblx0ICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSAndW5kZWZpbmVkJyB8fCB0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykge1xuXHQgICAgcmV0dXJuIHtcblx0ICAgICAgLy8gYWx3YXlzIHJldHVybiBcImluaXRpYWxcIiBiZWNhdXNlIG5vIGludGVyYWN0aW9uIHdpbGwgZXZlciBiZSBkZXRlY3RlZFxuXHQgICAgICBhc2s6IGZ1bmN0aW9uIGFzaygpIHtcblx0ICAgICAgICByZXR1cm4gJ2luaXRpYWwnO1xuXHQgICAgICB9LFxuXG5cdCAgICAgIC8vIGFsd2F5cyByZXR1cm4gbnVsbFxuXHQgICAgICBlbGVtZW50OiBmdW5jdGlvbiBlbGVtZW50KCkge1xuXHQgICAgICAgIHJldHVybiBudWxsO1xuXHQgICAgICB9LFxuXG5cdCAgICAgIC8vIG5vLW9wXG5cdCAgICAgIGlnbm9yZUtleXM6IGZ1bmN0aW9uIGlnbm9yZUtleXMoKSB7fSxcblxuXHQgICAgICAvLyBuby1vcFxuXHQgICAgICBzcGVjaWZpY0tleXM6IGZ1bmN0aW9uIHNwZWNpZmljS2V5cygpIHt9LFxuXG5cdCAgICAgIC8vIG5vLW9wXG5cdCAgICAgIHJlZ2lzdGVyT25DaGFuZ2U6IGZ1bmN0aW9uIHJlZ2lzdGVyT25DaGFuZ2UoKSB7fSxcblxuXHQgICAgICAvLyBuby1vcFxuXHQgICAgICB1blJlZ2lzdGVyT25DaGFuZ2U6IGZ1bmN0aW9uIHVuUmVnaXN0ZXJPbkNoYW5nZSgpIHt9XG5cdCAgICB9O1xuXHQgIH1cblxuXHQgIC8qXG5cdCAgICogdmFyaWFibGVzXG5cdCAgICovXG5cblx0ICAvLyBjYWNoZSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnRcblx0ICB2YXIgZG9jRWxlbSA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxuXHQgIC8vIGN1cnJlbnRseSBmb2N1c2VkIGRvbSBlbGVtZW50XG5cdCAgdmFyIGN1cnJlbnRFbGVtZW50ID0gbnVsbDtcblxuXHQgIC8vIGxhc3QgdXNlZCBpbnB1dCB0eXBlXG5cdCAgdmFyIGN1cnJlbnRJbnB1dCA9ICdpbml0aWFsJztcblxuXHQgIC8vIGxhc3QgdXNlZCBpbnB1dCBpbnRlbnRcblx0ICB2YXIgY3VycmVudEludGVudCA9IGN1cnJlbnRJbnB1dDtcblxuXHQgIC8vIFVOSVggdGltZXN0YW1wIG9mIGN1cnJlbnQgZXZlbnRcblx0ICB2YXIgY3VycmVudFRpbWVzdGFtcCA9IERhdGUubm93KCk7XG5cblx0ICAvLyBjaGVjayBmb3Igc2Vzc2lvblN0b3JhZ2Ugc3VwcG9ydFxuXHQgIC8vIHRoZW4gY2hlY2sgZm9yIHNlc3Npb24gdmFyaWFibGVzIGFuZCB1c2UgaWYgYXZhaWxhYmxlXG5cdCAgdHJ5IHtcblx0ICAgIGlmICh3aW5kb3cuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnd2hhdC1pbnB1dCcpKSB7XG5cdCAgICAgIGN1cnJlbnRJbnB1dCA9IHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCd3aGF0LWlucHV0Jyk7XG5cdCAgICB9XG5cblx0ICAgIGlmICh3aW5kb3cuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnd2hhdC1pbnRlbnQnKSkge1xuXHQgICAgICBjdXJyZW50SW50ZW50ID0gd2luZG93LnNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3doYXQtaW50ZW50Jyk7XG5cdCAgICB9XG5cdCAgfSBjYXRjaCAoZSkge31cblxuXHQgIC8vIGZvcm0gaW5wdXQgdHlwZXNcblx0ICB2YXIgZm9ybUlucHV0cyA9IFsnYnV0dG9uJywgJ2lucHV0JywgJ3NlbGVjdCcsICd0ZXh0YXJlYSddO1xuXG5cdCAgLy8gZW1wdHkgYXJyYXkgZm9yIGhvbGRpbmcgY2FsbGJhY2sgZnVuY3Rpb25zXG5cdCAgdmFyIGZ1bmN0aW9uTGlzdCA9IFtdO1xuXG5cdCAgLy8gbGlzdCBvZiBtb2RpZmllciBrZXlzIGNvbW1vbmx5IHVzZWQgd2l0aCB0aGUgbW91c2UgYW5kXG5cdCAgLy8gY2FuIGJlIHNhZmVseSBpZ25vcmVkIHRvIHByZXZlbnQgZmFsc2Uga2V5Ym9hcmQgZGV0ZWN0aW9uXG5cdCAgdmFyIGlnbm9yZU1hcCA9IFsxNiwgLy8gc2hpZnRcblx0ICAxNywgLy8gY29udHJvbFxuXHQgIDE4LCAvLyBhbHRcblx0ICA5MSwgLy8gV2luZG93cyBrZXkgLyBsZWZ0IEFwcGxlIGNtZFxuXHQgIDkzIC8vIFdpbmRvd3MgbWVudSAvIHJpZ2h0IEFwcGxlIGNtZFxuXHQgIF07XG5cblx0ICB2YXIgc3BlY2lmaWNNYXAgPSBbXTtcblxuXHQgIC8vIG1hcHBpbmcgb2YgZXZlbnRzIHRvIGlucHV0IHR5cGVzXG5cdCAgdmFyIGlucHV0TWFwID0ge1xuXHQgICAga2V5ZG93bjogJ2tleWJvYXJkJyxcblx0ICAgIGtleXVwOiAna2V5Ym9hcmQnLFxuXHQgICAgbW91c2Vkb3duOiAnbW91c2UnLFxuXHQgICAgbW91c2Vtb3ZlOiAnbW91c2UnLFxuXHQgICAgTVNQb2ludGVyRG93bjogJ3BvaW50ZXInLFxuXHQgICAgTVNQb2ludGVyTW92ZTogJ3BvaW50ZXInLFxuXHQgICAgcG9pbnRlcmRvd246ICdwb2ludGVyJyxcblx0ICAgIHBvaW50ZXJtb3ZlOiAncG9pbnRlcicsXG5cdCAgICB0b3VjaHN0YXJ0OiAndG91Y2gnLFxuXHQgICAgdG91Y2hlbmQ6ICd0b3VjaCdcblxuXHQgICAgLy8gYm9vbGVhbjogdHJ1ZSBpZiB0aGUgcGFnZSBpcyBiZWluZyBzY3JvbGxlZFxuXHQgIH07dmFyIGlzU2Nyb2xsaW5nID0gZmFsc2U7XG5cblx0ICAvLyBzdG9yZSBjdXJyZW50IG1vdXNlIHBvc2l0aW9uXG5cdCAgdmFyIG1vdXNlUG9zID0ge1xuXHQgICAgeDogbnVsbCxcblx0ICAgIHk6IG51bGxcblxuXHQgICAgLy8gbWFwIG9mIElFIDEwIHBvaW50ZXIgZXZlbnRzXG5cdCAgfTt2YXIgcG9pbnRlck1hcCA9IHtcblx0ICAgIDI6ICd0b3VjaCcsXG5cdCAgICAzOiAndG91Y2gnLCAvLyB0cmVhdCBwZW4gbGlrZSB0b3VjaFxuXHQgICAgNDogJ21vdXNlJ1xuXG5cdCAgICAvLyBjaGVjayBzdXBwb3J0IGZvciBwYXNzaXZlIGV2ZW50IGxpc3RlbmVyc1xuXHQgIH07dmFyIHN1cHBvcnRzUGFzc2l2ZSA9IGZhbHNlO1xuXG5cdCAgdHJ5IHtcblx0ICAgIHZhciBvcHRzID0gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAncGFzc2l2ZScsIHtcblx0ICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG5cdCAgICAgICAgc3VwcG9ydHNQYXNzaXZlID0gdHJ1ZTtcblx0ICAgICAgfVxuXHQgICAgfSk7XG5cblx0ICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0ZXN0JywgbnVsbCwgb3B0cyk7XG5cdCAgfSBjYXRjaCAoZSkge31cblxuXHQgIC8qXG5cdCAgICogc2V0IHVwXG5cdCAgICovXG5cblx0ICB2YXIgc2V0VXAgPSBmdW5jdGlvbiBzZXRVcCgpIHtcblx0ICAgIC8vIGFkZCBjb3JyZWN0IG1vdXNlIHdoZWVsIGV2ZW50IG1hcHBpbmcgdG8gYGlucHV0TWFwYFxuXHQgICAgaW5wdXRNYXBbZGV0ZWN0V2hlZWwoKV0gPSAnbW91c2UnO1xuXG5cdCAgICBhZGRMaXN0ZW5lcnMoKTtcblx0ICAgIGRvVXBkYXRlKCdpbnB1dCcpO1xuXHQgICAgZG9VcGRhdGUoJ2ludGVudCcpO1xuXHQgIH07XG5cblx0ICAvKlxuXHQgICAqIGV2ZW50c1xuXHQgICAqL1xuXG5cdCAgdmFyIGFkZExpc3RlbmVycyA9IGZ1bmN0aW9uIGFkZExpc3RlbmVycygpIHtcblx0ICAgIC8vIGBwb2ludGVybW92ZWAsIGBNU1BvaW50ZXJNb3ZlYCwgYG1vdXNlbW92ZWAgYW5kIG1vdXNlIHdoZWVsIGV2ZW50IGJpbmRpbmdcblx0ICAgIC8vIGNhbiBvbmx5IGRlbW9uc3RyYXRlIHBvdGVudGlhbCwgYnV0IG5vdCBhY3R1YWwsIGludGVyYWN0aW9uXG5cdCAgICAvLyBhbmQgYXJlIHRyZWF0ZWQgc2VwYXJhdGVseVxuXHQgICAgdmFyIG9wdGlvbnMgPSBzdXBwb3J0c1Bhc3NpdmUgPyB7IHBhc3NpdmU6IHRydWUgfSA6IGZhbHNlO1xuXG5cdCAgICAvLyBwb2ludGVyIGV2ZW50cyAobW91c2UsIHBlbiwgdG91Y2gpXG5cdCAgICBpZiAod2luZG93LlBvaW50ZXJFdmVudCkge1xuXHQgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcmRvd24nLCBzZXRJbnB1dCk7XG5cdCAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVybW92ZScsIHNldEludGVudCk7XG5cdCAgICB9IGVsc2UgaWYgKHdpbmRvdy5NU1BvaW50ZXJFdmVudCkge1xuXHQgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignTVNQb2ludGVyRG93bicsIHNldElucHV0KTtcblx0ICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ01TUG9pbnRlck1vdmUnLCBzZXRJbnRlbnQpO1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgLy8gbW91c2UgZXZlbnRzXG5cdCAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBzZXRJbnB1dCk7XG5cdCAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBzZXRJbnRlbnQpO1xuXG5cdCAgICAgIC8vIHRvdWNoIGV2ZW50c1xuXHQgICAgICBpZiAoJ29udG91Y2hzdGFydCcgaW4gd2luZG93KSB7XG5cdCAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBzZXRJbnB1dCwgb3B0aW9ucyk7XG5cdCAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgc2V0SW5wdXQpO1xuXHQgICAgICB9XG5cdCAgICB9XG5cblx0ICAgIC8vIG1vdXNlIHdoZWVsXG5cdCAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihkZXRlY3RXaGVlbCgpLCBzZXRJbnRlbnQsIG9wdGlvbnMpO1xuXG5cdCAgICAvLyBrZXlib2FyZCBldmVudHNcblx0ICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgc2V0SW5wdXQpO1xuXHQgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgc2V0SW5wdXQpO1xuXG5cdCAgICAvLyBmb2N1cyBldmVudHNcblx0ICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdmb2N1c2luJywgc2V0RWxlbWVudCk7XG5cdCAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNvdXQnLCBjbGVhckVsZW1lbnQpO1xuXHQgIH07XG5cblx0ICAvLyBjaGVja3MgY29uZGl0aW9ucyBiZWZvcmUgdXBkYXRpbmcgbmV3IGlucHV0XG5cdCAgdmFyIHNldElucHV0ID0gZnVuY3Rpb24gc2V0SW5wdXQoZXZlbnQpIHtcblx0ICAgIHZhciBldmVudEtleSA9IGV2ZW50LndoaWNoO1xuXHQgICAgdmFyIHZhbHVlID0gaW5wdXRNYXBbZXZlbnQudHlwZV07XG5cblx0ICAgIGlmICh2YWx1ZSA9PT0gJ3BvaW50ZXInKSB7XG5cdCAgICAgIHZhbHVlID0gcG9pbnRlclR5cGUoZXZlbnQpO1xuXHQgICAgfVxuXG5cdCAgICB2YXIgaWdub3JlTWF0Y2ggPSAhc3BlY2lmaWNNYXAubGVuZ3RoICYmIGlnbm9yZU1hcC5pbmRleE9mKGV2ZW50S2V5KSA9PT0gLTE7XG5cblx0ICAgIHZhciBzcGVjaWZpY01hdGNoID0gc3BlY2lmaWNNYXAubGVuZ3RoICYmIHNwZWNpZmljTWFwLmluZGV4T2YoZXZlbnRLZXkpICE9PSAtMTtcblxuXHQgICAgdmFyIHNob3VsZFVwZGF0ZSA9IHZhbHVlID09PSAna2V5Ym9hcmQnICYmIGV2ZW50S2V5ICYmIChpZ25vcmVNYXRjaCB8fCBzcGVjaWZpY01hdGNoKSB8fCB2YWx1ZSA9PT0gJ21vdXNlJyB8fCB2YWx1ZSA9PT0gJ3RvdWNoJztcblxuXHQgICAgLy8gcHJldmVudCB0b3VjaCBkZXRlY3Rpb24gZnJvbSBiZWluZyBvdmVycmlkZGVuIGJ5IGV2ZW50IGV4ZWN1dGlvbiBvcmRlclxuXHQgICAgaWYgKHZhbGlkYXRlVG91Y2godmFsdWUpKSB7XG5cdCAgICAgIHNob3VsZFVwZGF0ZSA9IGZhbHNlO1xuXHQgICAgfVxuXG5cdCAgICBpZiAoc2hvdWxkVXBkYXRlICYmIGN1cnJlbnRJbnB1dCAhPT0gdmFsdWUpIHtcblx0ICAgICAgY3VycmVudElucHV0ID0gdmFsdWU7XG5cblx0ICAgICAgdHJ5IHtcblx0ICAgICAgICB3aW5kb3cuc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgnd2hhdC1pbnB1dCcsIGN1cnJlbnRJbnB1dCk7XG5cdCAgICAgIH0gY2F0Y2ggKGUpIHt9XG5cblx0ICAgICAgZG9VcGRhdGUoJ2lucHV0Jyk7XG5cdCAgICB9XG5cblx0ICAgIGlmIChzaG91bGRVcGRhdGUgJiYgY3VycmVudEludGVudCAhPT0gdmFsdWUpIHtcblx0ICAgICAgLy8gcHJlc2VydmUgaW50ZW50IGZvciBrZXlib2FyZCBpbnRlcmFjdGlvbiB3aXRoIGZvcm0gZmllbGRzXG5cdCAgICAgIHZhciBhY3RpdmVFbGVtID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcblx0ICAgICAgdmFyIG5vdEZvcm1JbnB1dCA9IGFjdGl2ZUVsZW0gJiYgYWN0aXZlRWxlbS5ub2RlTmFtZSAmJiAoZm9ybUlucHV0cy5pbmRleE9mKGFjdGl2ZUVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSkgPT09IC0xIHx8IGFjdGl2ZUVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2J1dHRvbicgJiYgIWNoZWNrQ2xvc2VzdChhY3RpdmVFbGVtLCAnZm9ybScpKTtcblxuXHQgICAgICBpZiAobm90Rm9ybUlucHV0KSB7XG5cdCAgICAgICAgY3VycmVudEludGVudCA9IHZhbHVlO1xuXG5cdCAgICAgICAgdHJ5IHtcblx0ICAgICAgICAgIHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCd3aGF0LWludGVudCcsIGN1cnJlbnRJbnRlbnQpO1xuXHQgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG5cblx0ICAgICAgICBkb1VwZGF0ZSgnaW50ZW50Jyk7XG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICB9O1xuXG5cdCAgLy8gdXBkYXRlcyB0aGUgZG9jIGFuZCBgaW5wdXRUeXBlc2AgYXJyYXkgd2l0aCBuZXcgaW5wdXRcblx0ICB2YXIgZG9VcGRhdGUgPSBmdW5jdGlvbiBkb1VwZGF0ZSh3aGljaCkge1xuXHQgICAgZG9jRWxlbS5zZXRBdHRyaWJ1dGUoJ2RhdGEtd2hhdCcgKyB3aGljaCwgd2hpY2ggPT09ICdpbnB1dCcgPyBjdXJyZW50SW5wdXQgOiBjdXJyZW50SW50ZW50KTtcblxuXHQgICAgZmlyZUZ1bmN0aW9ucyh3aGljaCk7XG5cdCAgfTtcblxuXHQgIC8vIHVwZGF0ZXMgaW5wdXQgaW50ZW50IGZvciBgbW91c2Vtb3ZlYCBhbmQgYHBvaW50ZXJtb3ZlYFxuXHQgIHZhciBzZXRJbnRlbnQgPSBmdW5jdGlvbiBzZXRJbnRlbnQoZXZlbnQpIHtcblx0ICAgIHZhciB2YWx1ZSA9IGlucHV0TWFwW2V2ZW50LnR5cGVdO1xuXG5cdCAgICBpZiAodmFsdWUgPT09ICdwb2ludGVyJykge1xuXHQgICAgICB2YWx1ZSA9IHBvaW50ZXJUeXBlKGV2ZW50KTtcblx0ICAgIH1cblxuXHQgICAgLy8gdGVzdCB0byBzZWUgaWYgYG1vdXNlbW92ZWAgaGFwcGVuZWQgcmVsYXRpdmUgdG8gdGhlIHNjcmVlbiB0byBkZXRlY3Qgc2Nyb2xsaW5nIHZlcnN1cyBtb3VzZW1vdmVcblx0ICAgIGRldGVjdFNjcm9sbGluZyhldmVudCk7XG5cblx0ICAgIC8vIG9ubHkgZXhlY3V0ZSBpZiBzY3JvbGxpbmcgaXNuJ3QgaGFwcGVuaW5nXG5cdCAgICBpZiAoKCFpc1Njcm9sbGluZyAmJiAhdmFsaWRhdGVUb3VjaCh2YWx1ZSkgfHwgaXNTY3JvbGxpbmcgJiYgZXZlbnQudHlwZSA9PT0gJ3doZWVsJyB8fCBldmVudC50eXBlID09PSAnbW91c2V3aGVlbCcgfHwgZXZlbnQudHlwZSA9PT0gJ0RPTU1vdXNlU2Nyb2xsJykgJiYgY3VycmVudEludGVudCAhPT0gdmFsdWUpIHtcblx0ICAgICAgY3VycmVudEludGVudCA9IHZhbHVlO1xuXG5cdCAgICAgIHRyeSB7XG5cdCAgICAgICAgd2luZG93LnNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ3doYXQtaW50ZW50JywgY3VycmVudEludGVudCk7XG5cdCAgICAgIH0gY2F0Y2ggKGUpIHt9XG5cblx0ICAgICAgZG9VcGRhdGUoJ2ludGVudCcpO1xuXHQgICAgfVxuXHQgIH07XG5cblx0ICB2YXIgc2V0RWxlbWVudCA9IGZ1bmN0aW9uIHNldEVsZW1lbnQoZXZlbnQpIHtcblx0ICAgIGlmICghZXZlbnQudGFyZ2V0Lm5vZGVOYW1lKSB7XG5cdCAgICAgIC8vIElmIG5vZGVOYW1lIGlzIHVuZGVmaW5lZCwgY2xlYXIgdGhlIGVsZW1lbnRcblx0ICAgICAgLy8gVGhpcyBjYW4gaGFwcGVuIGlmIGNsaWNrIGluc2lkZSBhbiA8c3ZnPiBlbGVtZW50LlxuXHQgICAgICBjbGVhckVsZW1lbnQoKTtcblx0ICAgICAgcmV0dXJuO1xuXHQgICAgfVxuXG5cdCAgICBjdXJyZW50RWxlbWVudCA9IGV2ZW50LnRhcmdldC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xuXHQgICAgZG9jRWxlbS5zZXRBdHRyaWJ1dGUoJ2RhdGEtd2hhdGVsZW1lbnQnLCBjdXJyZW50RWxlbWVudCk7XG5cblx0ICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NMaXN0ICYmIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QubGVuZ3RoKSB7XG5cdCAgICAgIGRvY0VsZW0uc2V0QXR0cmlidXRlKCdkYXRhLXdoYXRjbGFzc2VzJywgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC50b1N0cmluZygpLnJlcGxhY2UoJyAnLCAnLCcpKTtcblx0ICAgIH1cblx0ICB9O1xuXG5cdCAgdmFyIGNsZWFyRWxlbWVudCA9IGZ1bmN0aW9uIGNsZWFyRWxlbWVudCgpIHtcblx0ICAgIGN1cnJlbnRFbGVtZW50ID0gbnVsbDtcblxuXHQgICAgZG9jRWxlbS5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtd2hhdGVsZW1lbnQnKTtcblx0ICAgIGRvY0VsZW0ucmVtb3ZlQXR0cmlidXRlKCdkYXRhLXdoYXRjbGFzc2VzJyk7XG5cdCAgfTtcblxuXHQgIC8qXG5cdCAgICogdXRpbGl0aWVzXG5cdCAgICovXG5cblx0ICB2YXIgcG9pbnRlclR5cGUgPSBmdW5jdGlvbiBwb2ludGVyVHlwZShldmVudCkge1xuXHQgICAgaWYgKHR5cGVvZiBldmVudC5wb2ludGVyVHlwZSA9PT0gJ251bWJlcicpIHtcblx0ICAgICAgcmV0dXJuIHBvaW50ZXJNYXBbZXZlbnQucG9pbnRlclR5cGVdO1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgLy8gdHJlYXQgcGVuIGxpa2UgdG91Y2hcblx0ICAgICAgcmV0dXJuIGV2ZW50LnBvaW50ZXJUeXBlID09PSAncGVuJyA/ICd0b3VjaCcgOiBldmVudC5wb2ludGVyVHlwZTtcblx0ICAgIH1cblx0ICB9O1xuXG5cdCAgLy8gcHJldmVudCB0b3VjaCBkZXRlY3Rpb24gZnJvbSBiZWluZyBvdmVycmlkZGVuIGJ5IGV2ZW50IGV4ZWN1dGlvbiBvcmRlclxuXHQgIHZhciB2YWxpZGF0ZVRvdWNoID0gZnVuY3Rpb24gdmFsaWRhdGVUb3VjaCh2YWx1ZSkge1xuXHQgICAgdmFyIHRpbWVzdGFtcCA9IERhdGUubm93KCk7XG5cblx0ICAgIHZhciB0b3VjaElzVmFsaWQgPSB2YWx1ZSA9PT0gJ21vdXNlJyAmJiBjdXJyZW50SW5wdXQgPT09ICd0b3VjaCcgJiYgdGltZXN0YW1wIC0gY3VycmVudFRpbWVzdGFtcCA8IDIwMDtcblxuXHQgICAgY3VycmVudFRpbWVzdGFtcCA9IHRpbWVzdGFtcDtcblxuXHQgICAgcmV0dXJuIHRvdWNoSXNWYWxpZDtcblx0ICB9O1xuXG5cdCAgLy8gZGV0ZWN0IHZlcnNpb24gb2YgbW91c2Ugd2hlZWwgZXZlbnQgdG8gdXNlXG5cdCAgLy8gdmlhIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9FbGVtZW50L3doZWVsX2V2ZW50XG5cdCAgdmFyIGRldGVjdFdoZWVsID0gZnVuY3Rpb24gZGV0ZWN0V2hlZWwoKSB7XG5cdCAgICB2YXIgd2hlZWxUeXBlID0gbnVsbDtcblxuXHQgICAgLy8gTW9kZXJuIGJyb3dzZXJzIHN1cHBvcnQgXCJ3aGVlbFwiXG5cdCAgICBpZiAoJ29ud2hlZWwnIGluIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpKSB7XG5cdCAgICAgIHdoZWVsVHlwZSA9ICd3aGVlbCc7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICAvLyBXZWJraXQgYW5kIElFIHN1cHBvcnQgYXQgbGVhc3QgXCJtb3VzZXdoZWVsXCJcblx0ICAgICAgLy8gb3IgYXNzdW1lIHRoYXQgcmVtYWluaW5nIGJyb3dzZXJzIGFyZSBvbGRlciBGaXJlZm94XG5cdCAgICAgIHdoZWVsVHlwZSA9IGRvY3VtZW50Lm9ubW91c2V3aGVlbCAhPT0gdW5kZWZpbmVkID8gJ21vdXNld2hlZWwnIDogJ0RPTU1vdXNlU2Nyb2xsJztcblx0ICAgIH1cblxuXHQgICAgcmV0dXJuIHdoZWVsVHlwZTtcblx0ICB9O1xuXG5cdCAgLy8gcnVucyBjYWxsYmFjayBmdW5jdGlvbnNcblx0ICB2YXIgZmlyZUZ1bmN0aW9ucyA9IGZ1bmN0aW9uIGZpcmVGdW5jdGlvbnModHlwZSkge1xuXHQgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGZ1bmN0aW9uTGlzdC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuXHQgICAgICBpZiAoZnVuY3Rpb25MaXN0W2ldLnR5cGUgPT09IHR5cGUpIHtcblx0ICAgICAgICBmdW5jdGlvbkxpc3RbaV0uZm4uY2FsbCh1bmRlZmluZWQsIHR5cGUgPT09ICdpbnB1dCcgPyBjdXJyZW50SW5wdXQgOiBjdXJyZW50SW50ZW50KTtcblx0ICAgICAgfVxuXHQgICAgfVxuXHQgIH07XG5cblx0ICAvLyBmaW5kcyBtYXRjaGluZyBlbGVtZW50IGluIGFuIG9iamVjdFxuXHQgIHZhciBvYmpQb3MgPSBmdW5jdGlvbiBvYmpQb3MobWF0Y2gpIHtcblx0ICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBmdW5jdGlvbkxpc3QubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcblx0ICAgICAgaWYgKGZ1bmN0aW9uTGlzdFtpXS5mbiA9PT0gbWF0Y2gpIHtcblx0ICAgICAgICByZXR1cm4gaTtcblx0ICAgICAgfVxuXHQgICAgfVxuXHQgIH07XG5cblx0ICB2YXIgZGV0ZWN0U2Nyb2xsaW5nID0gZnVuY3Rpb24gZGV0ZWN0U2Nyb2xsaW5nKGV2ZW50KSB7XG5cdCAgICBpZiAobW91c2VQb3NbJ3gnXSAhPT0gZXZlbnQuc2NyZWVuWCB8fCBtb3VzZVBvc1sneSddICE9PSBldmVudC5zY3JlZW5ZKSB7XG5cdCAgICAgIGlzU2Nyb2xsaW5nID0gZmFsc2U7XG5cblx0ICAgICAgbW91c2VQb3NbJ3gnXSA9IGV2ZW50LnNjcmVlblg7XG5cdCAgICAgIG1vdXNlUG9zWyd5J10gPSBldmVudC5zY3JlZW5ZO1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgaXNTY3JvbGxpbmcgPSB0cnVlO1xuXHQgICAgfVxuXHQgIH07XG5cblx0ICAvLyBtYW51YWwgdmVyc2lvbiBvZiBgY2xvc2VzdCgpYFxuXHQgIHZhciBjaGVja0Nsb3Nlc3QgPSBmdW5jdGlvbiBjaGVja0Nsb3Nlc3QoZWxlbSwgdGFnKSB7XG5cdCAgICB2YXIgRWxlbWVudFByb3RvdHlwZSA9IHdpbmRvdy5FbGVtZW50LnByb3RvdHlwZTtcblxuXHQgICAgaWYgKCFFbGVtZW50UHJvdG90eXBlLm1hdGNoZXMpIHtcblx0ICAgICAgRWxlbWVudFByb3RvdHlwZS5tYXRjaGVzID0gRWxlbWVudFByb3RvdHlwZS5tc01hdGNoZXNTZWxlY3RvciB8fCBFbGVtZW50UHJvdG90eXBlLndlYmtpdE1hdGNoZXNTZWxlY3Rvcjtcblx0ICAgIH1cblxuXHQgICAgaWYgKCFFbGVtZW50UHJvdG90eXBlLmNsb3Nlc3QpIHtcblx0ICAgICAgZG8ge1xuXHQgICAgICAgIGlmIChlbGVtLm1hdGNoZXModGFnKSkge1xuXHQgICAgICAgICAgcmV0dXJuIGVsZW07XG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgZWxlbSA9IGVsZW0ucGFyZW50RWxlbWVudCB8fCBlbGVtLnBhcmVudE5vZGU7XG5cdCAgICAgIH0gd2hpbGUgKGVsZW0gIT09IG51bGwgJiYgZWxlbS5ub2RlVHlwZSA9PT0gMSk7XG5cblx0ICAgICAgcmV0dXJuIG51bGw7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICByZXR1cm4gZWxlbS5jbG9zZXN0KHRhZyk7XG5cdCAgICB9XG5cdCAgfTtcblxuXHQgIC8qXG5cdCAgICogaW5pdFxuXHQgICAqL1xuXG5cdCAgLy8gZG9uJ3Qgc3RhcnQgc2NyaXB0IHVubGVzcyBicm93c2VyIGN1dHMgdGhlIG11c3RhcmRcblx0ICAvLyAoYWxzbyBwYXNzZXMgaWYgcG9seWZpbGxzIGFyZSB1c2VkKVxuXHQgIGlmICgnYWRkRXZlbnRMaXN0ZW5lcicgaW4gd2luZG93ICYmIEFycmF5LnByb3RvdHlwZS5pbmRleE9mKSB7XG5cdCAgICBzZXRVcCgpO1xuXHQgIH1cblxuXHQgIC8qXG5cdCAgICogYXBpXG5cdCAgICovXG5cblx0ICByZXR1cm4ge1xuXHQgICAgLy8gcmV0dXJucyBzdHJpbmc6IHRoZSBjdXJyZW50IGlucHV0IHR5cGVcblx0ICAgIC8vIG9wdDogJ2ludGVudCd8J2lucHV0J1xuXHQgICAgLy8gJ2lucHV0JyAoZGVmYXVsdCk6IHJldHVybnMgdGhlIHNhbWUgdmFsdWUgYXMgdGhlIGBkYXRhLXdoYXRpbnB1dGAgYXR0cmlidXRlXG5cdCAgICAvLyAnaW50ZW50JzogaW5jbHVkZXMgYGRhdGEtd2hhdGludGVudGAgdmFsdWUgaWYgaXQncyBkaWZmZXJlbnQgdGhhbiBgZGF0YS13aGF0aW5wdXRgXG5cdCAgICBhc2s6IGZ1bmN0aW9uIGFzayhvcHQpIHtcblx0ICAgICAgcmV0dXJuIG9wdCA9PT0gJ2ludGVudCcgPyBjdXJyZW50SW50ZW50IDogY3VycmVudElucHV0O1xuXHQgICAgfSxcblxuXHQgICAgLy8gcmV0dXJucyBzdHJpbmc6IHRoZSBjdXJyZW50bHkgZm9jdXNlZCBlbGVtZW50IG9yIG51bGxcblx0ICAgIGVsZW1lbnQ6IGZ1bmN0aW9uIGVsZW1lbnQoKSB7XG5cdCAgICAgIHJldHVybiBjdXJyZW50RWxlbWVudDtcblx0ICAgIH0sXG5cblx0ICAgIC8vIG92ZXJ3cml0ZXMgaWdub3JlZCBrZXlzIHdpdGggcHJvdmlkZWQgYXJyYXlcblx0ICAgIGlnbm9yZUtleXM6IGZ1bmN0aW9uIGlnbm9yZUtleXMoYXJyKSB7XG5cdCAgICAgIGlnbm9yZU1hcCA9IGFycjtcblx0ICAgIH0sXG5cblx0ICAgIC8vIG92ZXJ3cml0ZXMgc3BlY2lmaWMgY2hhciBrZXlzIHRvIHVwZGF0ZSBvblxuXHQgICAgc3BlY2lmaWNLZXlzOiBmdW5jdGlvbiBzcGVjaWZpY0tleXMoYXJyKSB7XG5cdCAgICAgIHNwZWNpZmljTWFwID0gYXJyO1xuXHQgICAgfSxcblxuXHQgICAgLy8gYXR0YWNoIGZ1bmN0aW9ucyB0byBpbnB1dCBhbmQgaW50ZW50IFwiZXZlbnRzXCJcblx0ICAgIC8vIGZ1bmN0OiBmdW5jdGlvbiB0byBmaXJlIG9uIGNoYW5nZVxuXHQgICAgLy8gZXZlbnRUeXBlOiAnaW5wdXQnfCdpbnRlbnQnXG5cdCAgICByZWdpc3Rlck9uQ2hhbmdlOiBmdW5jdGlvbiByZWdpc3Rlck9uQ2hhbmdlKGZuLCBldmVudFR5cGUpIHtcblx0ICAgICAgZnVuY3Rpb25MaXN0LnB1c2goe1xuXHQgICAgICAgIGZuOiBmbixcblx0ICAgICAgICB0eXBlOiBldmVudFR5cGUgfHwgJ2lucHV0J1xuXHQgICAgICB9KTtcblx0ICAgIH0sXG5cblx0ICAgIHVuUmVnaXN0ZXJPbkNoYW5nZTogZnVuY3Rpb24gdW5SZWdpc3Rlck9uQ2hhbmdlKGZuKSB7XG5cdCAgICAgIHZhciBwb3NpdGlvbiA9IG9ialBvcyhmbik7XG5cblx0ICAgICAgaWYgKHBvc2l0aW9uIHx8IHBvc2l0aW9uID09PSAwKSB7XG5cdCAgICAgICAgZnVuY3Rpb25MaXN0LnNwbGljZShwb3NpdGlvbiwgMSk7XG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICB9O1xuXHR9KCk7XG5cbi8qKiovIH0pXG4vKioqKioqLyBdKVxufSk7XG47Il0sIm5hbWVzIjpbIndlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwicm9vdCIsImZhY3RvcnkiLCJtb2R1bGUiLCJ0aGlzIiwibW9kdWxlcyIsImluc3RhbGxlZE1vZHVsZXMiLCJfX3dlYnBhY2tfcmVxdWlyZV9fIiwibW9kdWxlSWQiLCJleHBvcnRzIiwiaWQiLCJsb2FkZWQiLCJjYWxsIiwibSIsImMiLCJwIiwiZG9jdW1lbnQiLCJ3aW5kb3ciLCJhc2siLCJlbGVtZW50IiwiaWdub3JlS2V5cyIsInNwZWNpZmljS2V5cyIsInJlZ2lzdGVyT25DaGFuZ2UiLCJ1blJlZ2lzdGVyT25DaGFuZ2UiLCJkb2NFbGVtIiwiZG9jdW1lbnRFbGVtZW50IiwiY3VycmVudEVsZW1lbnQiLCJjdXJyZW50SW5wdXQiLCJjdXJyZW50SW50ZW50IiwiY3VycmVudFRpbWVzdGFtcCIsIkRhdGUiLCJub3ciLCJzZXNzaW9uU3RvcmFnZSIsImdldEl0ZW0iLCJlIiwiZm9ybUlucHV0cyIsImZ1bmN0aW9uTGlzdCIsImlnbm9yZU1hcCIsInNwZWNpZmljTWFwIiwiaW5wdXRNYXAiLCJrZXlkb3duIiwia2V5dXAiLCJtb3VzZWRvd24iLCJtb3VzZW1vdmUiLCJNU1BvaW50ZXJEb3duIiwiTVNQb2ludGVyTW92ZSIsInBvaW50ZXJkb3duIiwicG9pbnRlcm1vdmUiLCJ0b3VjaHN0YXJ0IiwidG91Y2hlbmQiLCJpc1Njcm9sbGluZyIsIm1vdXNlUG9zIiwieCIsInkiLCJwb2ludGVyTWFwIiwic3VwcG9ydHNQYXNzaXZlIiwib3B0cyIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZ2V0IiwiYWRkRXZlbnRMaXN0ZW5lciIsInNldFVwIiwiZGV0ZWN0V2hlZWwiLCJhZGRMaXN0ZW5lcnMiLCJkb1VwZGF0ZSIsIm9wdGlvbnMiLCJwYXNzaXZlIiwiUG9pbnRlckV2ZW50Iiwic2V0SW5wdXQiLCJzZXRJbnRlbnQiLCJNU1BvaW50ZXJFdmVudCIsInNldEVsZW1lbnQiLCJjbGVhckVsZW1lbnQiLCJldmVudCIsImV2ZW50S2V5Iiwid2hpY2giLCJ2YWx1ZSIsInR5cGUiLCJwb2ludGVyVHlwZSIsImlnbm9yZU1hdGNoIiwibGVuZ3RoIiwiaW5kZXhPZiIsInNwZWNpZmljTWF0Y2giLCJzaG91bGRVcGRhdGUiLCJ2YWxpZGF0ZVRvdWNoIiwic2V0SXRlbSIsImFjdGl2ZUVsZW0iLCJhY3RpdmVFbGVtZW50Iiwibm90Rm9ybUlucHV0Iiwibm9kZU5hbWUiLCJ0b0xvd2VyQ2FzZSIsImNoZWNrQ2xvc2VzdCIsInNldEF0dHJpYnV0ZSIsImZpcmVGdW5jdGlvbnMiLCJkZXRlY3RTY3JvbGxpbmciLCJ0YXJnZXQiLCJjbGFzc0xpc3QiLCJ0b1N0cmluZyIsInJlcGxhY2UiLCJyZW1vdmVBdHRyaWJ1dGUiLCJ0aW1lc3RhbXAiLCJ0b3VjaElzVmFsaWQiLCJ3aGVlbFR5cGUiLCJjcmVhdGVFbGVtZW50Iiwib25tb3VzZXdoZWVsIiwidW5kZWZpbmVkIiwiaSIsImxlbiIsImZuIiwib2JqUG9zIiwibWF0Y2giLCJzY3JlZW5YIiwic2NyZWVuWSIsImVsZW0iLCJ0YWciLCJFbGVtZW50UHJvdG90eXBlIiwiRWxlbWVudCIsInByb3RvdHlwZSIsIm1hdGNoZXMiLCJtc01hdGNoZXNTZWxlY3RvciIsIndlYmtpdE1hdGNoZXNTZWxlY3RvciIsImNsb3Nlc3QiLCJwYXJlbnRFbGVtZW50IiwicGFyZW50Tm9kZSIsIm5vZGVUeXBlIiwiQXJyYXkiLCJvcHQiLCJhcnIiLCJldmVudFR5cGUiLCJwdXNoIiwicG9zaXRpb24iLCJzcGxpY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Q0FBQTs7Ozs7O0NBTUEsQ0FBQyxTQUFTQSxnQ0FBVCxDQUEwQ0MsSUFBMUMsRUFBZ0RDLE9BQWhELEVBQXlEO0NBQ3pELEVBQ0NDLGNBQUEsR0FBaUJELE9BQU8sRUFBeEI7Q0FPRCxDQVRELEVBU0dFLGNBVEgsRUFTUyxZQUFXO0NBQ3BCO0NBQU87Q0FBVSxjQUFTQyxPQUFULEVBQWtCO0NBQUU7O0NBQ3JDO0NBQVU7O0NBQ1Y7Q0FBVSxVQUFJQyxnQkFBZ0IsR0FBRyxFQUF2QjtDQUVWO0NBQVU7O0NBQ1Y7O0NBQVUsZUFBU0MsbUJBQVQsQ0FBNkJDLFFBQTdCLEVBQXVDO0NBRWpEO0NBQVc7O0NBQ1g7Q0FBVyxZQUFHRixnQkFBZ0IsQ0FBQ0UsUUFBRCxDQUFuQjtDQUNYO0NBQVksaUJBQU9GLGdCQUFnQixDQUFDRSxRQUFELENBQWhCLENBQTJCQyxPQUFsQztDQUVaO0NBQVc7O0NBQ1g7O0NBQVcsWUFBSU4sTUFBTSxHQUFHRyxnQkFBZ0IsQ0FBQ0UsUUFBRCxDQUFoQixHQUE2QjtDQUNyRDtDQUFZQyxVQUFBQSxPQUFPLEVB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
