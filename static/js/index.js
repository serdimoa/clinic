(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var material = require('material-design-lite');
var slider = require('flickity');
var datatables = require('vanilla-datatables');
var elem = document.querySelector('.main-carousel');
if (document.querySelector('.main-carousel')) {
    var flkty = new slider('.main-carousel', {
        // options
        cellAlign: 'left',
        cellSelector: '.carousel-cell',
        wrapAround: true,
        autoPlay: 5000
    });
}
if (document.querySelector('.baner-carousel')) {
    var flkty_1 = new slider('.baner-carousel', {
        // options
        cellAlign: 'left',
        contain: true,
        cellSelector: '.carousel-cell',
        draggable: false,
        pageDots: false,
        wrapAround: true,
        autoPlay: 3000
    });
}
var options = {
    sortable: true,
    searchable: true,
    navPosition: 'both',
    info: false
};
var elements = document.getElementsByTagName('table');
if (elements.length > 0) {
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        new datatables(element, options);
    }
    var headertext = [],
        headers = document.querySelectorAll("table th"),
        tablerows = document.querySelectorAll("table th"),
        tablebody = document.querySelector("table tbody");
    for (var i = 0; i < headers.length; i++) {
        var current = headers[i];
        headertext.push(current.textContent.replace(/\r?\n|\r/, ""));
    }
    for (var i = 0, row; row = tablebody.rows[i]; i++) {
        for (var j = 0, col; col = row.cells[j]; j++) {
            col.setAttribute("data-th", headertext[j]);
        }
    }
}
//var dataTable = new datatables(myTable, options);

},{"flickity":10,"material-design-lite":17,"vanilla-datatables":21}],2:[function(require,module,exports){
/**
 * matchesSelector v2.0.1
 * matchesSelector( element, '.selector' )
 * MIT license
 */

/*jshint browser: true, strict: true, undef: true, unused: true */

( function( window, factory ) {
  /*global define: false, module: false */
  'use strict';
  // universal module definition
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    window.matchesSelector = factory();
  }

}( window, function factory() {
  'use strict';

  var matchesMethod = ( function() {
    var ElemProto = Element.prototype;
    // check for the standard method name first
    if ( ElemProto.matches ) {
      return 'matches';
    }
    // check un-prefixed
    if ( ElemProto.matchesSelector ) {
      return 'matchesSelector';
    }
    // check vendor prefixes
    var prefixes = [ 'webkit', 'moz', 'ms', 'o' ];

    for ( var i=0; i < prefixes.length; i++ ) {
      var prefix = prefixes[i];
      var method = prefix + 'MatchesSelector';
      if ( ElemProto[ method ] ) {
        return method;
      }
    }
  })();

  return function matchesSelector( elem, selector ) {
    return elem[ matchesMethod ]( selector );
  };

}));

},{}],3:[function(require,module,exports){
/**
 * EvEmitter v1.0.3
 * Lil' event emitter
 * MIT License
 */

/* jshint unused: true, undef: true, strict: true */

( function( global, factory ) {
  // universal module definition
  /* jshint strict: false */ /* globals define, module, window */
  if ( typeof define == 'function' && define.amd ) {
    // AMD - RequireJS
    define( factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS - Browserify, Webpack
    module.exports = factory();
  } else {
    // Browser globals
    global.EvEmitter = factory();
  }

}( typeof window != 'undefined' ? window : this, function() {

"use strict";

function EvEmitter() {}

var proto = EvEmitter.prototype;

proto.on = function( eventName, listener ) {
  if ( !eventName || !listener ) {
    return;
  }
  // set events hash
  var events = this._events = this._events || {};
  // set listeners array
  var listeners = events[ eventName ] = events[ eventName ] || [];
  // only add once
  if ( listeners.indexOf( listener ) == -1 ) {
    listeners.push( listener );
  }

  return this;
};

proto.once = function( eventName, listener ) {
  if ( !eventName || !listener ) {
    return;
  }
  // add event
  this.on( eventName, listener );
  // set once flag
  // set onceEvents hash
  var onceEvents = this._onceEvents = this._onceEvents || {};
  // set onceListeners object
  var onceListeners = onceEvents[ eventName ] = onceEvents[ eventName ] || {};
  // set flag
  onceListeners[ listener ] = true;

  return this;
};

proto.off = function( eventName, listener ) {
  var listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) {
    return;
  }
  var index = listeners.indexOf( listener );
  if ( index != -1 ) {
    listeners.splice( index, 1 );
  }

  return this;
};

proto.emitEvent = function( eventName, args ) {
  var listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) {
    return;
  }
  var i = 0;
  var listener = listeners[i];
  args = args || [];
  // once stuff
  var onceListeners = this._onceEvents && this._onceEvents[ eventName ];

  while ( listener ) {
    var isOnce = onceListeners && onceListeners[ listener ];
    if ( isOnce ) {
      // remove listener
      // remove before trigger to prevent recursion
      this.off( eventName, listener );
      // unset once flag
      delete onceListeners[ listener ];
    }
    // trigger listener
    listener.apply( this, args );
    // get next listener
    i += isOnce ? 0 : 1;
    listener = listeners[i];
  }

  return this;
};

return EvEmitter;

}));

},{}],4:[function(require,module,exports){
/**
 * Fizzy UI utils v2.0.3
 * MIT license
 */

/*jshint browser: true, undef: true, unused: true, strict: true */

( function( window, factory ) {
  // universal module definition
  /*jshint strict: false */ /*globals define, module, require */

  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
      'desandro-matches-selector/matches-selector'
    ], function( matchesSelector ) {
      return factory( window, matchesSelector );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('desandro-matches-selector')
    );
  } else {
    // browser global
    window.fizzyUIUtils = factory(
      window,
      window.matchesSelector
    );
  }

}( window, function factory( window, matchesSelector ) {

'use strict';

var utils = {};

// ----- extend ----- //

// extends objects
utils.extend = function( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
};

// ----- modulo ----- //

utils.modulo = function( num, div ) {
  return ( ( num % div ) + div ) % div;
};

// ----- makeArray ----- //

// turn element or nodeList into an array
utils.makeArray = function( obj ) {
  var ary = [];
  if ( Array.isArray( obj ) ) {
    // use object if already an array
    ary = obj;
  } else if ( obj && typeof obj.length == 'number' ) {
    // convert nodeList to array
    for ( var i=0; i < obj.length; i++ ) {
      ary.push( obj[i] );
    }
  } else {
    // array of single index
    ary.push( obj );
  }
  return ary;
};

// ----- removeFrom ----- //

utils.removeFrom = function( ary, obj ) {
  var index = ary.indexOf( obj );
  if ( index != -1 ) {
    ary.splice( index, 1 );
  }
};

// ----- getParent ----- //

utils.getParent = function( elem, selector ) {
  while ( elem != document.body ) {
    elem = elem.parentNode;
    if ( matchesSelector( elem, selector ) ) {
      return elem;
    }
  }
};

// ----- getQueryElement ----- //

// use element as selector string
utils.getQueryElement = function( elem ) {
  if ( typeof elem == 'string' ) {
    return document.querySelector( elem );
  }
  return elem;
};

// ----- handleEvent ----- //

// enable .ontype to trigger from .addEventListener( elem, 'type' )
utils.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

// ----- filterFindElements ----- //

utils.filterFindElements = function( elems, selector ) {
  // make array of elems
  elems = utils.makeArray( elems );
  var ffElems = [];

  elems.forEach( function( elem ) {
    // check that elem is an actual element
    if ( !( elem instanceof HTMLElement ) ) {
      return;
    }
    // add elem if no selector
    if ( !selector ) {
      ffElems.push( elem );
      return;
    }
    // filter & find items if we have a selector
    // filter
    if ( matchesSelector( elem, selector ) ) {
      ffElems.push( elem );
    }
    // find children
    var childElems = elem.querySelectorAll( selector );
    // concat childElems to filterFound array
    for ( var i=0; i < childElems.length; i++ ) {
      ffElems.push( childElems[i] );
    }
  });

  return ffElems;
};

// ----- debounceMethod ----- //

utils.debounceMethod = function( _class, methodName, threshold ) {
  // original method
  var method = _class.prototype[ methodName ];
  var timeoutName = methodName + 'Timeout';

  _class.prototype[ methodName ] = function() {
    var timeout = this[ timeoutName ];
    if ( timeout ) {
      clearTimeout( timeout );
    }
    var args = arguments;

    var _this = this;
    this[ timeoutName ] = setTimeout( function() {
      method.apply( _this, args );
      delete _this[ timeoutName ];
    }, threshold || 100 );
  };
};

// ----- docReady ----- //

utils.docReady = function( callback ) {
  var readyState = document.readyState;
  if ( readyState == 'complete' || readyState == 'interactive' ) {
    // do async to allow for other scripts to run. metafizzy/flickity#441
    setTimeout( callback );
  } else {
    document.addEventListener( 'DOMContentLoaded', callback );
  }
};

// ----- htmlInit ----- //

// http://jamesroberts.name/blog/2010/02/22/string-functions-for-javascript-trim-to-camel-case-to-dashed-and-to-underscore/
utils.toDashed = function( str ) {
  return str.replace( /(.)([A-Z])/g, function( match, $1, $2 ) {
    return $1 + '-' + $2;
  }).toLowerCase();
};

var console = window.console;
/**
 * allow user to initialize classes via [data-namespace] or .js-namespace class
 * htmlInit( Widget, 'widgetName' )
 * options are parsed from data-namespace-options
 */
utils.htmlInit = function( WidgetClass, namespace ) {
  utils.docReady( function() {
    var dashedNamespace = utils.toDashed( namespace );
    var dataAttr = 'data-' + dashedNamespace;
    var dataAttrElems = document.querySelectorAll( '[' + dataAttr + ']' );
    var jsDashElems = document.querySelectorAll( '.js-' + dashedNamespace );
    var elems = utils.makeArray( dataAttrElems )
      .concat( utils.makeArray( jsDashElems ) );
    var dataOptionsAttr = dataAttr + '-options';
    var jQuery = window.jQuery;

    elems.forEach( function( elem ) {
      var attr = elem.getAttribute( dataAttr ) ||
        elem.getAttribute( dataOptionsAttr );
      var options;
      try {
        options = attr && JSON.parse( attr );
      } catch ( error ) {
        // log error, do not initialize
        if ( console ) {
          console.error( 'Error parsing ' + dataAttr + ' on ' + elem.className +
          ': ' + error );
        }
        return;
      }
      // initialize
      var instance = new WidgetClass( elem, options );
      // make available via $().data('namespace')
      if ( jQuery ) {
        jQuery.data( elem, namespace, instance );
      }
    });

  });
};

// -----  ----- //

return utils;

}));

},{"desandro-matches-selector":2}],5:[function(require,module,exports){
// add, remove cell
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
      './flickity',
      'fizzy-ui-utils/utils'
    ], function( Flickity, utils ) {
      return factory( window, Flickity, utils );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('./flickity'),
      require('fizzy-ui-utils')
    );
  } else {
    // browser global
    factory(
      window,
      window.Flickity,
      window.fizzyUIUtils
    );
  }

}( window, function factory( window, Flickity, utils ) {

'use strict';

// append cells to a document fragment
function getCellsFragment( cells ) {
  var fragment = document.createDocumentFragment();
  cells.forEach( function( cell ) {
    fragment.appendChild( cell.element );
  });
  return fragment;
}

// -------------------------- add/remove cell prototype -------------------------- //

var proto = Flickity.prototype;

/**
 * Insert, prepend, or append cells
 * @param {Element, Array, NodeList} elems
 * @param {Integer} index
 */
proto.insert = function( elems, index ) {
  var cells = this._makeCells( elems );
  if ( !cells || !cells.length ) {
    return;
  }
  var len = this.cells.length;
  // default to append
  index = index === undefined ? len : index;
  // add cells with document fragment
  var fragment = getCellsFragment( cells );
  // append to slider
  var isAppend = index == len;
  if ( isAppend ) {
    this.slider.appendChild( fragment );
  } else {
    var insertCellElement = this.cells[ index ].element;
    this.slider.insertBefore( fragment, insertCellElement );
  }
  // add to this.cells
  if ( index === 0 ) {
    // prepend, add to start
    this.cells = cells.concat( this.cells );
  } else if ( isAppend ) {
    // append, add to end
    this.cells = this.cells.concat( cells );
  } else {
    // insert in this.cells
    var endCells = this.cells.splice( index, len - index );
    this.cells = this.cells.concat( cells ).concat( endCells );
  }

  this._sizeCells( cells );

  var selectedIndexDelta = index > this.selectedIndex ? 0 : cells.length;
  this._cellAddedRemoved( index, selectedIndexDelta );
};

proto.append = function( elems ) {
  this.insert( elems, this.cells.length );
};

proto.prepend = function( elems ) {
  this.insert( elems, 0 );
};

/**
 * Remove cells
 * @param {Element, Array, NodeList} elems
 */
proto.remove = function( elems ) {
  var cells = this.getCells( elems );
  var selectedIndexDelta = 0;
  var len = cells.length;
  var i, cell;
  // calculate selectedIndexDelta, easier if done in seperate loop
  for ( i=0; i < len; i++ ) {
    cell = cells[i];
    var wasBefore = this.cells.indexOf( cell ) < this.selectedIndex;
    selectedIndexDelta -= wasBefore ? 1 : 0;
  }

  for ( i=0; i < len; i++ ) {
    cell = cells[i];
    cell.remove();
    // remove item from collection
    utils.removeFrom( this.cells, cell );
  }

  if ( cells.length ) {
    // update stuff
    this._cellAddedRemoved( 0, selectedIndexDelta );
  }
};

// updates when cells are added or removed
proto._cellAddedRemoved = function( changedCellIndex, selectedIndexDelta ) {
  // TODO this math isn't perfect with grouped slides
  selectedIndexDelta = selectedIndexDelta || 0;
  this.selectedIndex += selectedIndexDelta;
  this.selectedIndex = Math.max( 0, Math.min( this.slides.length - 1, this.selectedIndex ) );

  this.cellChange( changedCellIndex, true );
  // backwards compatibility
  this.emitEvent( 'cellAddedRemoved', [ changedCellIndex, selectedIndexDelta ] );
};

/**
 * logic to be run after a cell's size changes
 * @param {Element} elem - cell's element
 */
proto.cellSizeChange = function( elem ) {
  var cell = this.getCell( elem );
  if ( !cell ) {
    return;
  }
  cell.getSize();

  var index = this.cells.indexOf( cell );
  this.cellChange( index );
};

/**
 * logic any time a cell is changed: added, removed, or size changed
 * @param {Integer} changedCellIndex - index of the changed cell, optional
 */
proto.cellChange = function( changedCellIndex, isPositioningSlider ) {
  var prevSlideableWidth = this.slideableWidth;
  this._positionCells( changedCellIndex );
  this._getWrapShiftCells();
  this.setGallerySize();
  this.emitEvent( 'cellChange', [ changedCellIndex ] );
  // position slider
  if ( this.options.freeScroll ) {
    // shift x by change in slideableWidth
    // TODO fix position shifts when prepending w/ freeScroll
    var deltaX = prevSlideableWidth - this.slideableWidth;
    this.x += deltaX * this.cellAlign;
    this.positionSlider();
  } else {
    // do not position slider after lazy load
    if ( isPositioningSlider ) {
      this.positionSliderAtSelected();
    }
    this.select( this.selectedIndex );
  }
};

// -----  ----- //

return Flickity;

}));

},{"./flickity":9,"fizzy-ui-utils":4}],6:[function(require,module,exports){
// animate
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
      'fizzy-ui-utils/utils'
    ], function( utils ) {
      return factory( window, utils );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('fizzy-ui-utils')
    );
  } else {
    // browser global
    window.Flickity = window.Flickity || {};
    window.Flickity.animatePrototype = factory(
      window,
      window.fizzyUIUtils
    );
  }

}( window, function factory( window, utils ) {

'use strict';

// -------------------------- requestAnimationFrame -------------------------- //

// get rAF, prefixed, if present
var requestAnimationFrame = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame;

// fallback to setTimeout
var lastTime = 0;
if ( !requestAnimationFrame )  {
  requestAnimationFrame = function( callback ) {
    var currTime = new Date().getTime();
    var timeToCall = Math.max( 0, 16 - ( currTime - lastTime ) );
    var id = setTimeout( callback, timeToCall );
    lastTime = currTime + timeToCall;
    return id;
  };
}

// -------------------------- animate -------------------------- //

var proto = {};

proto.startAnimation = function() {
  if ( this.isAnimating ) {
    return;
  }

  this.isAnimating = true;
  this.restingFrames = 0;
  this.animate();
};

proto.animate = function() {
  this.applyDragForce();
  this.applySelectedAttraction();

  var previousX = this.x;

  this.integratePhysics();
  this.positionSlider();
  this.settle( previousX );
  // animate next frame
  if ( this.isAnimating ) {
    var _this = this;
    requestAnimationFrame( function animateFrame() {
      _this.animate();
    });
  }
};


var transformProperty = ( function () {
  var style = document.documentElement.style;
  if ( typeof style.transform == 'string' ) {
    return 'transform';
  }
  return 'WebkitTransform';
})();

proto.positionSlider = function() {
  var x = this.x;
  // wrap position around
  if ( this.options.wrapAround && this.cells.length > 1 ) {
    x = utils.modulo( x, this.slideableWidth );
    x = x - this.slideableWidth;
    this.shiftWrapCells( x );
  }

  x = x + this.cursorPosition;
  // reverse if right-to-left and using transform
  x = this.options.rightToLeft && transformProperty ? -x : x;
  var value = this.getPositionValue( x );
  // use 3D tranforms for hardware acceleration on iOS
  // but use 2D when settled, for better font-rendering
  this.slider.style[ transformProperty ] = this.isAnimating ?
    'translate3d(' + value + ',0,0)' : 'translateX(' + value + ')';

  // scroll event
  var firstSlide = this.slides[0];
  if ( firstSlide ) {
    var positionX = -this.x - firstSlide.target;
    var progress = positionX / this.slidesWidth;
    this.dispatchEvent( 'scroll', null, [ progress, positionX ] );
  }
};

proto.positionSliderAtSelected = function() {
  if ( !this.cells.length ) {
    return;
  }
  this.x = -this.selectedSlide.target;
  this.positionSlider();
};

proto.getPositionValue = function( position ) {
  if ( this.options.percentPosition ) {
    // percent position, round to 2 digits, like 12.34%
    return ( Math.round( ( position / this.size.innerWidth ) * 10000 ) * 0.01 )+ '%';
  } else {
    // pixel positioning
    return Math.round( position ) + 'px';
  }
};

proto.settle = function( previousX ) {
  // keep track of frames where x hasn't moved
  if ( !this.isPointerDown && Math.round( this.x * 100 ) == Math.round( previousX * 100 ) ) {
    this.restingFrames++;
  }
  // stop animating if resting for 3 or more frames
  if ( this.restingFrames > 2 ) {
    this.isAnimating = false;
    delete this.isFreeScrolling;
    // render position with translateX when settled
    this.positionSlider();
    this.dispatchEvent('settle');
  }
};

proto.shiftWrapCells = function( x ) {
  // shift before cells
  var beforeGap = this.cursorPosition + x;
  this._shiftCells( this.beforeShiftCells, beforeGap, -1 );
  // shift after cells
  var afterGap = this.size.innerWidth - ( x + this.slideableWidth + this.cursorPosition );
  this._shiftCells( this.afterShiftCells, afterGap, 1 );
};

proto._shiftCells = function( cells, gap, shift ) {
  for ( var i=0; i < cells.length; i++ ) {
    var cell = cells[i];
    var cellShift = gap > 0 ? shift : 0;
    cell.wrapShift( cellShift );
    gap -= cell.size.outerWidth;
  }
};

proto._unshiftCells = function( cells ) {
  if ( !cells || !cells.length ) {
    return;
  }
  for ( var i=0; i < cells.length; i++ ) {
    cells[i].wrapShift( 0 );
  }
};

// -------------------------- physics -------------------------- //

proto.integratePhysics = function() {
  this.x += this.velocity;
  this.velocity *= this.getFrictionFactor();
};

proto.applyForce = function( force ) {
  this.velocity += force;
};

proto.getFrictionFactor = function() {
  return 1 - this.options[ this.isFreeScrolling ? 'freeScrollFriction' : 'friction' ];
};

proto.getRestingPosition = function() {
  // my thanks to Steven Wittens, who simplified this math greatly
  return this.x + this.velocity / ( 1 - this.getFrictionFactor() );
};

proto.applyDragForce = function() {
  if ( !this.isPointerDown ) {
    return;
  }
  // change the position to drag position by applying force
  var dragVelocity = this.dragX - this.x;
  var dragForce = dragVelocity - this.velocity;
  this.applyForce( dragForce );
};

proto.applySelectedAttraction = function() {
  // do not attract if pointer down or no cells
  if ( this.isPointerDown || this.isFreeScrolling || !this.cells.length ) {
    return;
  }
  var distance = this.selectedSlide.target * -1 - this.x;
  var force = distance * this.options.selectedAttraction;
  this.applyForce( force );
};

return proto;

}));

},{"fizzy-ui-utils":4}],7:[function(require,module,exports){
// Flickity.Cell
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
      'get-size/get-size'
    ], function( getSize ) {
      return factory( window, getSize );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('get-size')
    );
  } else {
    // browser global
    window.Flickity = window.Flickity || {};
    window.Flickity.Cell = factory(
      window,
      window.getSize
    );
  }

}( window, function factory( window, getSize ) {

'use strict';

function Cell( elem, parent ) {
  this.element = elem;
  this.parent = parent;

  this.create();
}

var proto = Cell.prototype;

proto.create = function() {
  this.element.style.position = 'absolute';
  this.x = 0;
  this.shift = 0;
};

proto.destroy = function() {
  // reset style
  this.element.style.position = '';
  var side = this.parent.originSide;
  this.element.style[ side ] = '';
};

proto.getSize = function() {
  this.size = getSize( this.element );
};

proto.setPosition = function( x ) {
  this.x = x;
  this.updateTarget();
  this.renderPosition( x );
};

// setDefaultTarget v1 method, backwards compatibility, remove in v3
proto.updateTarget = proto.setDefaultTarget = function() {
  var marginProperty = this.parent.originSide == 'left' ? 'marginLeft' : 'marginRight';
  this.target = this.x + this.size[ marginProperty ] +
    this.size.width * this.parent.cellAlign;
};

proto.renderPosition = function( x ) {
  // render position of cell with in slider
  var side = this.parent.originSide;
  this.element.style[ side ] = this.parent.getPositionValue( x );
};

/**
 * @param {Integer} factor - 0, 1, or -1
**/
proto.wrapShift = function( shift ) {
  this.shift = shift;
  this.renderPosition( this.x + this.parent.slideableWidth * shift );
};

proto.remove = function() {
  this.element.parentNode.removeChild( this.element );
};

return Cell;

}));

},{"get-size":16}],8:[function(require,module,exports){
// drag
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
      './flickity',
      'unidragger/unidragger',
      'fizzy-ui-utils/utils'
    ], function( Flickity, Unidragger, utils ) {
      return factory( window, Flickity, Unidragger, utils );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('./flickity'),
      require('unidragger'),
      require('fizzy-ui-utils')
    );
  } else {
    // browser global
    window.Flickity = factory(
      window,
      window.Flickity,
      window.Unidragger,
      window.fizzyUIUtils
    );
  }

}( window, function factory( window, Flickity, Unidragger, utils ) {

'use strict';

// ----- defaults ----- //

utils.extend( Flickity.defaults, {
  draggable: true,
  dragThreshold: 3,
});

// ----- create ----- //

Flickity.createMethods.push('_createDrag');

// -------------------------- drag prototype -------------------------- //

var proto = Flickity.prototype;
utils.extend( proto, Unidragger.prototype );

// --------------------------  -------------------------- //

proto._createDrag = function() {
  this.on( 'activate', this.bindDrag );
  this.on( 'uiChange', this._uiChangeDrag );
  this.on( 'childUIPointerDown', this._childUIPointerDownDrag );
  this.on( 'deactivate', this.unbindDrag );
};

proto.bindDrag = function() {
  if ( !this.options.draggable || this.isDragBound ) {
    return;
  }
  this.element.classList.add('is-draggable');
  this.handles = [ this.viewport ];
  this.bindHandles();
  this.isDragBound = true;
};

proto.unbindDrag = function() {
  if ( !this.isDragBound ) {
    return;
  }
  this.element.classList.remove('is-draggable');
  this.unbindHandles();
  delete this.isDragBound;
};

proto._uiChangeDrag = function() {
  delete this.isFreeScrolling;
};

proto._childUIPointerDownDrag = function( event ) {
  event.preventDefault();
  this.pointerDownFocus( event );
};

// -------------------------- pointer events -------------------------- //

// nodes that have text fields
var cursorNodes = {
  TEXTAREA: true,
  INPUT: true,
  OPTION: true,
};

// input types that do not have text fields
var clickTypes = {
  radio: true,
  checkbox: true,
  button: true,
  submit: true,
  image: true,
  file: true,
};

proto.pointerDown = function( event, pointer ) {
  // dismiss inputs with text fields. #403, #404
  var isCursorInput = cursorNodes[ event.target.nodeName ] &&
    !clickTypes[ event.target.type ];
  if ( isCursorInput ) {
    // reset pointerDown logic
    this.isPointerDown = false;
    delete this.pointerIdentifier;
    return;
  }

  this._dragPointerDown( event, pointer );

  // kludge to blur focused inputs in dragger
  var focused = document.activeElement;
  if ( focused && focused.blur && focused != this.element &&
    // do not blur body for IE9 & 10, #117
    focused != document.body ) {
    focused.blur();
  }
  this.pointerDownFocus( event );
  // stop if it was moving
  this.dragX = this.x;
  this.viewport.classList.add('is-pointer-down');
  // bind move and end events
  this._bindPostStartEvents( event );
  // track scrolling
  this.pointerDownScroll = getScrollPosition();
  window.addEventListener( 'scroll', this );

  this.dispatchEvent( 'pointerDown', event, [ pointer ] );
};

var touchStartEvents = {
  touchstart: true,
  MSPointerDown: true
};

var focusNodes = {
  INPUT: true,
  SELECT: true
};

proto.pointerDownFocus = function( event ) {
  // focus element, if not touch, and its not an input or select
  if ( !this.options.accessibility || touchStartEvents[ event.type ] ||
      focusNodes[ event.target.nodeName ] ) {
    return;
  }
  var prevScrollY = window.pageYOffset;
  this.element.focus();
  // hack to fix scroll jump after focus, #76
  if ( window.pageYOffset != prevScrollY ) {
    window.scrollTo( window.pageXOffset, prevScrollY );
  }
};

proto.canPreventDefaultOnPointerDown = function( event ) {
  // prevent default, unless touchstart or <select>
  var isTouchstart = event.type == 'touchstart';
  var targetNodeName = event.target.nodeName;
  return !isTouchstart && targetNodeName != 'SELECT';
};

// ----- move ----- //

proto.hasDragStarted = function( moveVector ) {
  return Math.abs( moveVector.x ) > this.options.dragThreshold;
};

// ----- up ----- //

proto.pointerUp = function( event, pointer ) {
  delete this.isTouchScrolling;
  this.viewport.classList.remove('is-pointer-down');
  this.dispatchEvent( 'pointerUp', event, [ pointer ] );
  this._dragPointerUp( event, pointer );
};

proto.pointerDone = function() {
  window.removeEventListener( 'scroll', this );
  delete this.pointerDownScroll;
};

// -------------------------- dragging -------------------------- //

proto.dragStart = function( event, pointer ) {
  this.dragStartPosition = this.x;
  this.startAnimation();
  this.dispatchEvent( 'dragStart', event, [ pointer ] );
};

proto.pointerMove = function( event, pointer ) {
  var moveVector = this._dragPointerMove( event, pointer );
  this.dispatchEvent( 'pointerMove', event, [ pointer, moveVector ] );
  this._dragMove( event, pointer, moveVector );
};

proto.dragMove = function( event, pointer, moveVector ) {
  event.preventDefault();

  this.previousDragX = this.dragX;
  // reverse if right-to-left
  var direction = this.options.rightToLeft ? -1 : 1;
  var dragX = this.dragStartPosition + moveVector.x * direction;

  if ( !this.options.wrapAround && this.slides.length ) {
    // slow drag
    var originBound = Math.max( -this.slides[0].target, this.dragStartPosition );
    dragX = dragX > originBound ? ( dragX + originBound ) * 0.5 : dragX;
    var endBound = Math.min( -this.getLastSlide().target, this.dragStartPosition );
    dragX = dragX < endBound ? ( dragX + endBound ) * 0.5 : dragX;
  }

  this.dragX = dragX;

  this.dragMoveTime = new Date();
  this.dispatchEvent( 'dragMove', event, [ pointer, moveVector ] );
};

proto.dragEnd = function( event, pointer ) {
  if ( this.options.freeScroll ) {
    this.isFreeScrolling = true;
  }
  // set selectedIndex based on where flick will end up
  var index = this.dragEndRestingSelect();

  if ( this.options.freeScroll && !this.options.wrapAround ) {
    // if free-scroll & not wrap around
    // do not free-scroll if going outside of bounding slides
    // so bounding slides can attract slider, and keep it in bounds
    var restingX = this.getRestingPosition();
    this.isFreeScrolling = -restingX > this.slides[0].target &&
      -restingX < this.getLastSlide().target;
  } else if ( !this.options.freeScroll && index == this.selectedIndex ) {
    // boost selection if selected index has not changed
    index += this.dragEndBoostSelect();
  }
  delete this.previousDragX;
  // apply selection
  // TODO refactor this, selecting here feels weird
  // HACK, set flag so dragging stays in correct direction
  this.isDragSelect = this.options.wrapAround;
  this.select( index );
  delete this.isDragSelect;
  this.dispatchEvent( 'dragEnd', event, [ pointer ] );
};

proto.dragEndRestingSelect = function() {
  var restingX = this.getRestingPosition();
  // how far away from selected slide
  var distance = Math.abs( this.getSlideDistance( -restingX, this.selectedIndex ) );
  // get closet resting going up and going down
  var positiveResting = this._getClosestResting( restingX, distance, 1 );
  var negativeResting = this._getClosestResting( restingX, distance, -1 );
  // use closer resting for wrap-around
  var index = positiveResting.distance < negativeResting.distance ?
    positiveResting.index : negativeResting.index;
  return index;
};

/**
 * given resting X and distance to selected cell
 * get the distance and index of the closest cell
 * @param {Number} restingX - estimated post-flick resting position
 * @param {Number} distance - distance to selected cell
 * @param {Integer} increment - +1 or -1, going up or down
 * @returns {Object} - { distance: {Number}, index: {Integer} }
 */
proto._getClosestResting = function( restingX, distance, increment ) {
  var index = this.selectedIndex;
  var minDistance = Infinity;
  var condition = this.options.contain && !this.options.wrapAround ?
    // if contain, keep going if distance is equal to minDistance
    function( d, md ) { return d <= md; } : function( d, md ) { return d < md; };
  while ( condition( distance, minDistance ) ) {
    // measure distance to next cell
    index += increment;
    minDistance = distance;
    distance = this.getSlideDistance( -restingX, index );
    if ( distance === null ) {
      break;
    }
    distance = Math.abs( distance );
  }
  return {
    distance: minDistance,
    // selected was previous index
    index: index - increment
  };
};

/**
 * measure distance between x and a slide target
 * @param {Number} x
 * @param {Integer} index - slide index
 */
proto.getSlideDistance = function( x, index ) {
  var len = this.slides.length;
  // wrap around if at least 2 slides
  var isWrapAround = this.options.wrapAround && len > 1;
  var slideIndex = isWrapAround ? utils.modulo( index, len ) : index;
  var slide = this.slides[ slideIndex ];
  if ( !slide ) {
    return null;
  }
  // add distance for wrap-around slides
  var wrap = isWrapAround ? this.slideableWidth * Math.floor( index / len ) : 0;
  return x - ( slide.target + wrap );
};

proto.dragEndBoostSelect = function() {
  // do not boost if no previousDragX or dragMoveTime
  if ( this.previousDragX === undefined || !this.dragMoveTime ||
    // or if drag was held for 100 ms
    new Date() - this.dragMoveTime > 100 ) {
    return 0;
  }

  var distance = this.getSlideDistance( -this.dragX, this.selectedIndex );
  var delta = this.previousDragX - this.dragX;
  if ( distance > 0 && delta > 0 ) {
    // boost to next if moving towards the right, and positive velocity
    return 1;
  } else if ( distance < 0 && delta < 0 ) {
    // boost to previous if moving towards the left, and negative velocity
    return -1;
  }
  return 0;
};

// ----- staticClick ----- //

proto.staticClick = function( event, pointer ) {
  // get clickedCell, if cell was clicked
  var clickedCell = this.getParentCell( event.target );
  var cellElem = clickedCell && clickedCell.element;
  var cellIndex = clickedCell && this.cells.indexOf( clickedCell );
  this.dispatchEvent( 'staticClick', event, [ pointer, cellElem, cellIndex ] );
};

// ----- scroll ----- //

proto.onscroll = function() {
  var scroll = getScrollPosition();
  var scrollMoveX = this.pointerDownScroll.x - scroll.x;
  var scrollMoveY = this.pointerDownScroll.y - scroll.y;
  // cancel click/tap if scroll is too much
  if ( Math.abs( scrollMoveX ) > 3 || Math.abs( scrollMoveY ) > 3 ) {
    this._pointerDone();
  }
};

// ----- utils ----- //

function getScrollPosition() {
  return {
    x: window.pageXOffset,
    y: window.pageYOffset
  };
}

// -----  ----- //

return Flickity;

}));

},{"./flickity":9,"fizzy-ui-utils":4,"unidragger":19}],9:[function(require,module,exports){
// Flickity main
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
      'ev-emitter/ev-emitter',
      'get-size/get-size',
      'fizzy-ui-utils/utils',
      './cell',
      './slide',
      './animate'
    ], function( EvEmitter, getSize, utils, Cell, Slide, animatePrototype ) {
      return factory( window, EvEmitter, getSize, utils, Cell, Slide, animatePrototype );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('ev-emitter'),
      require('get-size'),
      require('fizzy-ui-utils'),
      require('./cell'),
      require('./slide'),
      require('./animate')
    );
  } else {
    // browser global
    var _Flickity = window.Flickity;

    window.Flickity = factory(
      window,
      window.EvEmitter,
      window.getSize,
      window.fizzyUIUtils,
      _Flickity.Cell,
      _Flickity.Slide,
      _Flickity.animatePrototype
    );
  }

}( window, function factory( window, EvEmitter, getSize,
  utils, Cell, Slide, animatePrototype ) {

'use strict';

// vars
var jQuery = window.jQuery;
var getComputedStyle = window.getComputedStyle;
var console = window.console;

function moveElements( elems, toElem ) {
  elems = utils.makeArray( elems );
  while ( elems.length ) {
    toElem.appendChild( elems.shift() );
  }
}

// -------------------------- Flickity -------------------------- //

// globally unique identifiers
var GUID = 0;
// internal store of all Flickity intances
var instances = {};

function Flickity( element, options ) {
  var queryElement = utils.getQueryElement( element );
  if ( !queryElement ) {
    if ( console ) {
      console.error( 'Bad element for Flickity: ' + ( queryElement || element ) );
    }
    return;
  }
  this.element = queryElement;
  // do not initialize twice on same element
  if ( this.element.flickityGUID ) {
    var instance = instances[ this.element.flickityGUID ];
    instance.option( options );
    return instance;
  }

  // add jQuery
  if ( jQuery ) {
    this.$element = jQuery( this.element );
  }
  // options
  this.options = utils.extend( {}, this.constructor.defaults );
  this.option( options );

  // kick things off
  this._create();
}

Flickity.defaults = {
  accessibility: true,
  // adaptiveHeight: false,
  cellAlign: 'center',
  // cellSelector: undefined,
  // contain: false,
  freeScrollFriction: 0.075, // friction when free-scrolling
  friction: 0.28, // friction when selecting
  namespaceJQueryEvents: true,
  // initialIndex: 0,
  percentPosition: true,
  resize: true,
  selectedAttraction: 0.025,
  setGallerySize: true
  // watchCSS: false,
  // wrapAround: false
};

// hash of methods triggered on _create()
Flickity.createMethods = [];

var proto = Flickity.prototype;
// inherit EventEmitter
utils.extend( proto, EvEmitter.prototype );

proto._create = function() {
  // add id for Flickity.data
  var id = this.guid = ++GUID;
  this.element.flickityGUID = id; // expando
  instances[ id ] = this; // associate via id
  // initial properties
  this.selectedIndex = 0;
  // how many frames slider has been in same position
  this.restingFrames = 0;
  // initial physics properties
  this.x = 0;
  this.velocity = 0;
  this.originSide = this.options.rightToLeft ? 'right' : 'left';
  // create viewport & slider
  this.viewport = document.createElement('div');
  this.viewport.className = 'flickity-viewport';
  this._createSlider();

  if ( this.options.resize || this.options.watchCSS ) {
    window.addEventListener( 'resize', this );
  }

  Flickity.createMethods.forEach( function( method ) {
    this[ method ]();
  }, this );

  if ( this.options.watchCSS ) {
    this.watchCSS();
  } else {
    this.activate();
  }

};

/**
 * set options
 * @param {Object} opts
 */
proto.option = function( opts ) {
  utils.extend( this.options, opts );
};

proto.activate = function() {
  if ( this.isActive ) {
    return;
  }
  this.isActive = true;
  this.element.classList.add('flickity-enabled');
  if ( this.options.rightToLeft ) {
    this.element.classList.add('flickity-rtl');
  }

  this.getSize();
  // move initial cell elements so they can be loaded as cells
  var cellElems = this._filterFindCellElements( this.element.children );
  moveElements( cellElems, this.slider );
  this.viewport.appendChild( this.slider );
  this.element.appendChild( this.viewport );
  // get cells from children
  this.reloadCells();

  if ( this.options.accessibility ) {
    // allow element to focusable
    this.element.tabIndex = 0;
    // listen for key presses
    this.element.addEventListener( 'keydown', this );
  }

  this.emitEvent('activate');

  var index;
  var initialIndex = this.options.initialIndex;
  if ( this.isInitActivated ) {
    index = this.selectedIndex;
  } else if ( initialIndex !== undefined ) {
    index = this.cells[ initialIndex ] ? initialIndex : 0;
  } else {
    index = 0;
  }
  // select instantly
  this.select( index, false, true );
  // flag for initial activation, for using initialIndex
  this.isInitActivated = true;
};

// slider positions the cells
proto._createSlider = function() {
  // slider element does all the positioning
  var slider = document.createElement('div');
  slider.className = 'flickity-slider';
  slider.style[ this.originSide ] = 0;
  this.slider = slider;
};

proto._filterFindCellElements = function( elems ) {
  return utils.filterFindElements( elems, this.options.cellSelector );
};

// goes through all children
proto.reloadCells = function() {
  // collection of item elements
  this.cells = this._makeCells( this.slider.children );
  this.positionCells();
  this._getWrapShiftCells();
  this.setGallerySize();
};

/**
 * turn elements into Flickity.Cells
 * @param {Array or NodeList or HTMLElement} elems
 * @returns {Array} items - collection of new Flickity Cells
 */
proto._makeCells = function( elems ) {
  var cellElems = this._filterFindCellElements( elems );

  // create new Flickity for collection
  var cells = cellElems.map( function( cellElem ) {
    return new Cell( cellElem, this );
  }, this );

  return cells;
};

proto.getLastCell = function() {
  return this.cells[ this.cells.length - 1 ];
};

proto.getLastSlide = function() {
  return this.slides[ this.slides.length - 1 ];
};

// positions all cells
proto.positionCells = function() {
  // size all cells
  this._sizeCells( this.cells );
  // position all cells
  this._positionCells( 0 );
};

/**
 * position certain cells
 * @param {Integer} index - which cell to start with
 */
proto._positionCells = function( index ) {
  index = index || 0;
  // also measure maxCellHeight
  // start 0 if positioning all cells
  this.maxCellHeight = index ? this.maxCellHeight || 0 : 0;
  var cellX = 0;
  // get cellX
  if ( index > 0 ) {
    var startCell = this.cells[ index - 1 ];
    cellX = startCell.x + startCell.size.outerWidth;
  }
  var len = this.cells.length;
  for ( var i=index; i < len; i++ ) {
    var cell = this.cells[i];
    cell.setPosition( cellX );
    cellX += cell.size.outerWidth;
    this.maxCellHeight = Math.max( cell.size.outerHeight, this.maxCellHeight );
  }
  // keep track of cellX for wrap-around
  this.slideableWidth = cellX;
  // slides
  this.updateSlides();
  // contain slides target
  this._containSlides();
  // update slidesWidth
  this.slidesWidth = len ? this.getLastSlide().target - this.slides[0].target : 0;
};

/**
 * cell.getSize() on multiple cells
 * @param {Array} cells
 */
proto._sizeCells = function( cells ) {
  cells.forEach( function( cell ) {
    cell.getSize();
  });
};

// --------------------------  -------------------------- //

proto.updateSlides = function() {
  this.slides = [];
  if ( !this.cells.length ) {
    return;
  }

  var slide = new Slide( this );
  this.slides.push( slide );
  var isOriginLeft = this.originSide == 'left';
  var nextMargin = isOriginLeft ? 'marginRight' : 'marginLeft';

  var canCellFit = this._getCanCellFit();

  this.cells.forEach( function( cell, i ) {
    // just add cell if first cell in slide
    if ( !slide.cells.length ) {
      slide.addCell( cell );
      return;
    }

    var slideWidth = ( slide.outerWidth - slide.firstMargin ) +
      ( cell.size.outerWidth - cell.size[ nextMargin ] );

    if ( canCellFit.call( this, i, slideWidth ) ) {
      slide.addCell( cell );
    } else {
      // doesn't fit, new slide
      slide.updateTarget();

      slide = new Slide( this );
      this.slides.push( slide );
      slide.addCell( cell );
    }
  }, this );
  // last slide
  slide.updateTarget();
  // update .selectedSlide
  this.updateSelectedSlide();
};

proto._getCanCellFit = function() {
  var groupCells = this.options.groupCells;
  if ( !groupCells ) {
    return function() {
      return false;
    };
  } else if ( typeof groupCells == 'number' ) {
    // group by number. 3 -> [0,1,2], [3,4,5], ...
    var number = parseInt( groupCells, 10 );
    return function( i ) {
      return ( i % number ) !== 0;
    };
  }
  // default, group by width of slide
  // parse '75%
  var percentMatch = typeof groupCells == 'string' &&
    groupCells.match(/^(\d+)%$/);
  var percent = percentMatch ? parseInt( percentMatch[1], 10 ) / 100 : 1;
  return function( i, slideWidth ) {
    return slideWidth <= ( this.size.innerWidth + 1 ) * percent;
  };
};

// alias _init for jQuery plugin .flickity()
proto._init =
proto.reposition = function() {
  this.positionCells();
  this.positionSliderAtSelected();
};

proto.getSize = function() {
  this.size = getSize( this.element );
  this.setCellAlign();
  this.cursorPosition = this.size.innerWidth * this.cellAlign;
};

var cellAlignShorthands = {
  // cell align, then based on origin side
  center: {
    left: 0.5,
    right: 0.5
  },
  left: {
    left: 0,
    right: 1
  },
  right: {
    right: 0,
    left: 1
  }
};

proto.setCellAlign = function() {
  var shorthand = cellAlignShorthands[ this.options.cellAlign ];
  this.cellAlign = shorthand ? shorthand[ this.originSide ] : this.options.cellAlign;
};

proto.setGallerySize = function() {
  if ( this.options.setGallerySize ) {
    var height = this.options.adaptiveHeight && this.selectedSlide ?
      this.selectedSlide.height : this.maxCellHeight;
    this.viewport.style.height = height + 'px';
  }
};

proto._getWrapShiftCells = function() {
  // only for wrap-around
  if ( !this.options.wrapAround ) {
    return;
  }
  // unshift previous cells
  this._unshiftCells( this.beforeShiftCells );
  this._unshiftCells( this.afterShiftCells );
  // get before cells
  // initial gap
  var gapX = this.cursorPosition;
  var cellIndex = this.cells.length - 1;
  this.beforeShiftCells = this._getGapCells( gapX, cellIndex, -1 );
  // get after cells
  // ending gap between last cell and end of gallery viewport
  gapX = this.size.innerWidth - this.cursorPosition;
  // start cloning at first cell, working forwards
  this.afterShiftCells = this._getGapCells( gapX, 0, 1 );
};

proto._getGapCells = function( gapX, cellIndex, increment ) {
  // keep adding cells until the cover the initial gap
  var cells = [];
  while ( gapX > 0 ) {
    var cell = this.cells[ cellIndex ];
    if ( !cell ) {
      break;
    }
    cells.push( cell );
    cellIndex += increment;
    gapX -= cell.size.outerWidth;
  }
  return cells;
};

// ----- contain ----- //

// contain cell targets so no excess sliding
proto._containSlides = function() {
  if ( !this.options.contain || this.options.wrapAround || !this.cells.length ) {
    return;
  }
  var isRightToLeft = this.options.rightToLeft;
  var beginMargin = isRightToLeft ? 'marginRight' : 'marginLeft';
  var endMargin = isRightToLeft ? 'marginLeft' : 'marginRight';
  var contentWidth = this.slideableWidth - this.getLastCell().size[ endMargin ];
  // content is less than gallery size
  var isContentSmaller = contentWidth < this.size.innerWidth;
  // bounds
  var beginBound = this.cursorPosition + this.cells[0].size[ beginMargin ];
  var endBound = contentWidth - this.size.innerWidth * ( 1 - this.cellAlign );
  // contain each cell target
  this.slides.forEach( function( slide ) {
    if ( isContentSmaller ) {
      // all cells fit inside gallery
      slide.target = contentWidth * this.cellAlign;
    } else {
      // contain to bounds
      slide.target = Math.max( slide.target, beginBound );
      slide.target = Math.min( slide.target, endBound );
    }
  }, this );
};

// -----  ----- //

/**
 * emits events via eventEmitter and jQuery events
 * @param {String} type - name of event
 * @param {Event} event - original event
 * @param {Array} args - extra arguments
 */
proto.dispatchEvent = function( type, event, args ) {
  var emitArgs = event ? [ event ].concat( args ) : args;
  this.emitEvent( type, emitArgs );

  if ( jQuery && this.$element ) {
    // default trigger with type if no event
    type += this.options.namespaceJQueryEvents ? '.flickity' : '';
    var $event = type;
    if ( event ) {
      // create jQuery event
      var jQEvent = jQuery.Event( event );
      jQEvent.type = type;
      $event = jQEvent;
    }
    this.$element.trigger( $event, args );
  }
};

// -------------------------- select -------------------------- //

/**
 * @param {Integer} index - index of the slide
 * @param {Boolean} isWrap - will wrap-around to last/first if at the end
 * @param {Boolean} isInstant - will immediately set position at selected cell
 */
proto.select = function( index, isWrap, isInstant ) {
  if ( !this.isActive ) {
    return;
  }
  index = parseInt( index, 10 );
  this._wrapSelect( index );

  if ( this.options.wrapAround || isWrap ) {
    index = utils.modulo( index, this.slides.length );
  }
  // bail if invalid index
  if ( !this.slides[ index ] ) {
    return;
  }
  this.selectedIndex = index;
  this.updateSelectedSlide();
  if ( isInstant ) {
    this.positionSliderAtSelected();
  } else {
    this.startAnimation();
  }
  if ( this.options.adaptiveHeight ) {
    this.setGallerySize();
  }

  this.dispatchEvent('select');
  // old v1 event name, remove in v3
  this.dispatchEvent('cellSelect');
};

// wraps position for wrapAround, to move to closest slide. #113
proto._wrapSelect = function( index ) {
  var len = this.slides.length;
  var isWrapping = this.options.wrapAround && len > 1;
  if ( !isWrapping ) {
    return index;
  }
  var wrapIndex = utils.modulo( index, len );
  // go to shortest
  var delta = Math.abs( wrapIndex - this.selectedIndex );
  var backWrapDelta = Math.abs( ( wrapIndex + len ) - this.selectedIndex );
  var forewardWrapDelta = Math.abs( ( wrapIndex - len ) - this.selectedIndex );
  if ( !this.isDragSelect && backWrapDelta < delta ) {
    index += len;
  } else if ( !this.isDragSelect && forewardWrapDelta < delta ) {
    index -= len;
  }
  // wrap position so slider is within normal area
  if ( index < 0 ) {
    this.x -= this.slideableWidth;
  } else if ( index >= len ) {
    this.x += this.slideableWidth;
  }
};

proto.previous = function( isWrap, isInstant ) {
  this.select( this.selectedIndex - 1, isWrap, isInstant );
};

proto.next = function( isWrap, isInstant ) {
  this.select( this.selectedIndex + 1, isWrap, isInstant );
};

proto.updateSelectedSlide = function() {
  var slide = this.slides[ this.selectedIndex ];
  // selectedIndex could be outside of slides, if triggered before resize()
  if ( !slide ) {
    return;
  }
  // unselect previous selected slide
  this.unselectSelectedSlide();
  // update new selected slide
  this.selectedSlide = slide;
  slide.select();
  this.selectedCells = slide.cells;
  this.selectedElements = slide.getCellElements();
  // HACK: selectedCell & selectedElement is first cell in slide, backwards compatibility
  // Remove in v3?
  this.selectedCell = slide.cells[0];
  this.selectedElement = this.selectedElements[0];
};

proto.unselectSelectedSlide = function() {
  if ( this.selectedSlide ) {
    this.selectedSlide.unselect();
  }
};

/**
 * select slide from number or cell element
 * @param {Element or Number} elem
 */
proto.selectCell = function( value, isWrap, isInstant ) {
  // get cell
  var cell;
  if ( typeof value == 'number' ) {
    cell = this.cells[ value ];
  } else {
    // use string as selector
    if ( typeof value == 'string' ) {
      value = this.element.querySelector( value );
    }
    // get cell from element
    cell = this.getCell( value );
  }
  // select slide that has cell
  for ( var i=0; cell && i < this.slides.length; i++ ) {
    var slide = this.slides[i];
    var index = slide.cells.indexOf( cell );
    if ( index != -1 ) {
      this.select( i, isWrap, isInstant );
      return;
    }
  }
};

// -------------------------- get cells -------------------------- //

/**
 * get Flickity.Cell, given an Element
 * @param {Element} elem
 * @returns {Flickity.Cell} item
 */
proto.getCell = function( elem ) {
  // loop through cells to get the one that matches
  for ( var i=0; i < this.cells.length; i++ ) {
    var cell = this.cells[i];
    if ( cell.element == elem ) {
      return cell;
    }
  }
};

/**
 * get collection of Flickity.Cells, given Elements
 * @param {Element, Array, NodeList} elems
 * @returns {Array} cells - Flickity.Cells
 */
proto.getCells = function( elems ) {
  elems = utils.makeArray( elems );
  var cells = [];
  elems.forEach( function( elem ) {
    var cell = this.getCell( elem );
    if ( cell ) {
      cells.push( cell );
    }
  }, this );
  return cells;
};

/**
 * get cell elements
 * @returns {Array} cellElems
 */
proto.getCellElements = function() {
  return this.cells.map( function( cell ) {
    return cell.element;
  });
};

/**
 * get parent cell from an element
 * @param {Element} elem
 * @returns {Flickit.Cell} cell
 */
proto.getParentCell = function( elem ) {
  // first check if elem is cell
  var cell = this.getCell( elem );
  if ( cell ) {
    return cell;
  }
  // try to get parent cell elem
  elem = utils.getParent( elem, '.flickity-slider > *' );
  return this.getCell( elem );
};

/**
 * get cells adjacent to a slide
 * @param {Integer} adjCount - number of adjacent slides
 * @param {Integer} index - index of slide to start
 * @returns {Array} cells - array of Flickity.Cells
 */
proto.getAdjacentCellElements = function( adjCount, index ) {
  if ( !adjCount ) {
    return this.selectedSlide.getCellElements();
  }
  index = index === undefined ? this.selectedIndex : index;

  var len = this.slides.length;
  if ( 1 + ( adjCount * 2 ) >= len ) {
    return this.getCellElements();
  }

  var cellElems = [];
  for ( var i = index - adjCount; i <= index + adjCount ; i++ ) {
    var slideIndex = this.options.wrapAround ? utils.modulo( i, len ) : i;
    var slide = this.slides[ slideIndex ];
    if ( slide ) {
      cellElems = cellElems.concat( slide.getCellElements() );
    }
  }
  return cellElems;
};

// -------------------------- events -------------------------- //

proto.uiChange = function() {
  this.emitEvent('uiChange');
};

proto.childUIPointerDown = function( event ) {
  this.emitEvent( 'childUIPointerDown', [ event ] );
};

// ----- resize ----- //

proto.onresize = function() {
  this.watchCSS();
  this.resize();
};

utils.debounceMethod( Flickity, 'onresize', 150 );

proto.resize = function() {
  if ( !this.isActive ) {
    return;
  }
  this.getSize();
  // wrap values
  if ( this.options.wrapAround ) {
    this.x = utils.modulo( this.x, this.slideableWidth );
  }
  this.positionCells();
  this._getWrapShiftCells();
  this.setGallerySize();
  this.emitEvent('resize');
  // update selected index for group slides, instant
  // TODO: position can be lost between groups of various numbers
  var selectedElement = this.selectedElements && this.selectedElements[0];
  this.selectCell( selectedElement, false, true );
};

// watches the :after property, activates/deactivates
proto.watchCSS = function() {
  var watchOption = this.options.watchCSS;
  if ( !watchOption ) {
    return;
  }

  var afterContent = getComputedStyle( this.element, ':after' ).content;
  // activate if :after { content: 'flickity' }
  if ( afterContent.indexOf('flickity') != -1 ) {
    this.activate();
  } else {
    this.deactivate();
  }
};

// ----- keydown ----- //

// go previous/next if left/right keys pressed
proto.onkeydown = function( event ) {
  // only work if element is in focus
  if ( !this.options.accessibility ||
    ( document.activeElement && document.activeElement != this.element ) ) {
    return;
  }

  if ( event.keyCode == 37 ) {
    // go left
    var leftMethod = this.options.rightToLeft ? 'next' : 'previous';
    this.uiChange();
    this[ leftMethod ]();
  } else if ( event.keyCode == 39 ) {
    // go right
    var rightMethod = this.options.rightToLeft ? 'previous' : 'next';
    this.uiChange();
    this[ rightMethod ]();
  }
};

// -------------------------- destroy -------------------------- //

// deactivate all Flickity functionality, but keep stuff available
proto.deactivate = function() {
  if ( !this.isActive ) {
    return;
  }
  this.element.classList.remove('flickity-enabled');
  this.element.classList.remove('flickity-rtl');
  // destroy cells
  this.cells.forEach( function( cell ) {
    cell.destroy();
  });
  this.unselectSelectedSlide();
  this.element.removeChild( this.viewport );
  // move child elements back into element
  moveElements( this.slider.children, this.element );
  if ( this.options.accessibility ) {
    this.element.removeAttribute('tabIndex');
    this.element.removeEventListener( 'keydown', this );
  }
  // set flags
  this.isActive = false;
  this.emitEvent('deactivate');
};

proto.destroy = function() {
  this.deactivate();
  window.removeEventListener( 'resize', this );
  this.emitEvent('destroy');
  if ( jQuery && this.$element ) {
    jQuery.removeData( this.element, 'flickity' );
  }
  delete this.element.flickityGUID;
  delete instances[ this.guid ];
};

// -------------------------- prototype -------------------------- //

utils.extend( proto, animatePrototype );

// -------------------------- extras -------------------------- //

/**
 * get Flickity instance from element
 * @param {Element} elem
 * @returns {Flickity}
 */
Flickity.data = function( elem ) {
  elem = utils.getQueryElement( elem );
  var id = elem && elem.flickityGUID;
  return id && instances[ id ];
};

utils.htmlInit( Flickity, 'flickity' );

if ( jQuery && jQuery.bridget ) {
  jQuery.bridget( 'flickity', Flickity );
}

Flickity.Cell = Cell;

return Flickity;

}));

},{"./animate":6,"./cell":7,"./slide":15,"ev-emitter":3,"fizzy-ui-utils":4,"get-size":16}],10:[function(require,module,exports){
/*!
 * Flickity v2.0.4
 * Touch, responsive, flickable carousels
 *
 * Licensed GPLv3 for open source use
 * or Flickity Commercial License for commercial use
 *
 * http://flickity.metafizzy.co
 * Copyright 2016 Metafizzy
 */

( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
      './flickity',
      './drag',
      './prev-next-button',
      './page-dots',
      './player',
      './add-remove-cell',
      './lazyload'
    ], factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      require('./flickity'),
      require('./drag'),
      require('./prev-next-button'),
      require('./page-dots'),
      require('./player'),
      require('./add-remove-cell'),
      require('./lazyload')
    );
  }

})( window, function factory( Flickity ) {
  /*jshint strict: false*/
  return Flickity;
});

},{"./add-remove-cell":5,"./drag":8,"./flickity":9,"./lazyload":11,"./page-dots":12,"./player":13,"./prev-next-button":14}],11:[function(require,module,exports){
// lazyload
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
      './flickity',
      'fizzy-ui-utils/utils'
    ], function( Flickity, utils ) {
      return factory( window, Flickity, utils );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('./flickity'),
      require('fizzy-ui-utils')
    );
  } else {
    // browser global
    factory(
      window,
      window.Flickity,
      window.fizzyUIUtils
    );
  }

}( window, function factory( window, Flickity, utils ) {
'use strict';

Flickity.createMethods.push('_createLazyload');
var proto = Flickity.prototype;

proto._createLazyload = function() {
  this.on( 'select', this.lazyLoad );
};

proto.lazyLoad = function() {
  var lazyLoad = this.options.lazyLoad;
  if ( !lazyLoad ) {
    return;
  }
  // get adjacent cells, use lazyLoad option for adjacent count
  var adjCount = typeof lazyLoad == 'number' ? lazyLoad : 0;
  var cellElems = this.getAdjacentCellElements( adjCount );
  // get lazy images in those cells
  var lazyImages = [];
  cellElems.forEach( function( cellElem ) {
    var lazyCellImages = getCellLazyImages( cellElem );
    lazyImages = lazyImages.concat( lazyCellImages );
  });
  // load lazy images
  lazyImages.forEach( function( img ) {
    new LazyLoader( img, this );
  }, this );
};

function getCellLazyImages( cellElem ) {
  // check if cell element is lazy image
  if ( cellElem.nodeName == 'IMG' &&
    cellElem.getAttribute('data-flickity-lazyload') ) {
    return [ cellElem ];
  }
  // select lazy images in cell
  var imgs = cellElem.querySelectorAll('img[data-flickity-lazyload]');
  return utils.makeArray( imgs );
}

// -------------------------- LazyLoader -------------------------- //

/**
 * class to handle loading images
 */
function LazyLoader( img, flickity ) {
  this.img = img;
  this.flickity = flickity;
  this.load();
}

LazyLoader.prototype.handleEvent = utils.handleEvent;

LazyLoader.prototype.load = function() {
  this.img.addEventListener( 'load', this );
  this.img.addEventListener( 'error', this );
  // load image
  this.img.src = this.img.getAttribute('data-flickity-lazyload');
  // remove attr
  this.img.removeAttribute('data-flickity-lazyload');
};

LazyLoader.prototype.onload = function( event ) {
  this.complete( event, 'flickity-lazyloaded' );
};

LazyLoader.prototype.onerror = function( event ) {
  this.complete( event, 'flickity-lazyerror' );
};

LazyLoader.prototype.complete = function( event, className ) {
  // unbind events
  this.img.removeEventListener( 'load', this );
  this.img.removeEventListener( 'error', this );

  var cell = this.flickity.getParentCell( this.img );
  var cellElem = cell && cell.element;
  this.flickity.cellSizeChange( cellElem );

  this.img.classList.add( className );
  this.flickity.dispatchEvent( 'lazyLoad', event, cellElem );
};

// -----  ----- //

Flickity.LazyLoader = LazyLoader;

return Flickity;

}));

},{"./flickity":9,"fizzy-ui-utils":4}],12:[function(require,module,exports){
// page dots
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
      './flickity',
      'tap-listener/tap-listener',
      'fizzy-ui-utils/utils'
    ], function( Flickity, TapListener, utils ) {
      return factory( window, Flickity, TapListener, utils );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('./flickity'),
      require('tap-listener'),
      require('fizzy-ui-utils')
    );
  } else {
    // browser global
    factory(
      window,
      window.Flickity,
      window.TapListener,
      window.fizzyUIUtils
    );
  }

}( window, function factory( window, Flickity, TapListener, utils ) {

// -------------------------- PageDots -------------------------- //

'use strict';

function PageDots( parent ) {
  this.parent = parent;
  this._create();
}

PageDots.prototype = new TapListener();

PageDots.prototype._create = function() {
  // create holder element
  this.holder = document.createElement('ol');
  this.holder.className = 'flickity-page-dots';
  // create dots, array of elements
  this.dots = [];
  // events
  this.on( 'tap', this.onTap );
  this.on( 'pointerDown', this.parent.childUIPointerDown.bind( this.parent ) );
};

PageDots.prototype.activate = function() {
  this.setDots();
  this.bindTap( this.holder );
  // add to DOM
  this.parent.element.appendChild( this.holder );
};

PageDots.prototype.deactivate = function() {
  // remove from DOM
  this.parent.element.removeChild( this.holder );
  TapListener.prototype.destroy.call( this );
};

PageDots.prototype.setDots = function() {
  // get difference between number of slides and number of dots
  var delta = this.parent.slides.length - this.dots.length;
  if ( delta > 0 ) {
    this.addDots( delta );
  } else if ( delta < 0 ) {
    this.removeDots( -delta );
  }
};

PageDots.prototype.addDots = function( count ) {
  var fragment = document.createDocumentFragment();
  var newDots = [];
  while ( count ) {
    var dot = document.createElement('li');
    dot.className = 'dot';
    fragment.appendChild( dot );
    newDots.push( dot );
    count--;
  }
  this.holder.appendChild( fragment );
  this.dots = this.dots.concat( newDots );
};

PageDots.prototype.removeDots = function( count ) {
  // remove from this.dots collection
  var removeDots = this.dots.splice( this.dots.length - count, count );
  // remove from DOM
  removeDots.forEach( function( dot ) {
    this.holder.removeChild( dot );
  }, this );
};

PageDots.prototype.updateSelected = function() {
  // remove selected class on previous
  if ( this.selectedDot ) {
    this.selectedDot.className = 'dot';
  }
  // don't proceed if no dots
  if ( !this.dots.length ) {
    return;
  }
  this.selectedDot = this.dots[ this.parent.selectedIndex ];
  this.selectedDot.className = 'dot is-selected';
};

PageDots.prototype.onTap = function( event ) {
  var target = event.target;
  // only care about dot clicks
  if ( target.nodeName != 'LI' ) {
    return;
  }

  this.parent.uiChange();
  var index = this.dots.indexOf( target );
  this.parent.select( index );
};

PageDots.prototype.destroy = function() {
  this.deactivate();
};

Flickity.PageDots = PageDots;

// -------------------------- Flickity -------------------------- //

utils.extend( Flickity.defaults, {
  pageDots: true
});

Flickity.createMethods.push('_createPageDots');

var proto = Flickity.prototype;

proto._createPageDots = function() {
  if ( !this.options.pageDots ) {
    return;
  }
  this.pageDots = new PageDots( this );
  // events
  this.on( 'activate', this.activatePageDots );
  this.on( 'select', this.updateSelectedPageDots );
  this.on( 'cellChange', this.updatePageDots );
  this.on( 'resize', this.updatePageDots );
  this.on( 'deactivate', this.deactivatePageDots );
};

proto.activatePageDots = function() {
  this.pageDots.activate();
};

proto.updateSelectedPageDots = function() {
  this.pageDots.updateSelected();
};

proto.updatePageDots = function() {
  this.pageDots.setDots();
};

proto.deactivatePageDots = function() {
  this.pageDots.deactivate();
};

// -----  ----- //

Flickity.PageDots = PageDots;

return Flickity;

}));

},{"./flickity":9,"fizzy-ui-utils":4,"tap-listener":18}],13:[function(require,module,exports){
// player & autoPlay
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
      'ev-emitter/ev-emitter',
      'fizzy-ui-utils/utils',
      './flickity'
    ], function( EvEmitter, utils, Flickity ) {
      return factory( EvEmitter, utils, Flickity );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      require('ev-emitter'),
      require('fizzy-ui-utils'),
      require('./flickity')
    );
  } else {
    // browser global
    factory(
      window.EvEmitter,
      window.fizzyUIUtils,
      window.Flickity
    );
  }

}( window, function factory( EvEmitter, utils, Flickity ) {

'use strict';

// -------------------------- Page Visibility -------------------------- //
// https://developer.mozilla.org/en-US/docs/Web/Guide/User_experience/Using_the_Page_Visibility_API

var hiddenProperty, visibilityEvent;
if ( 'hidden' in document ) {
  hiddenProperty = 'hidden';
  visibilityEvent = 'visibilitychange';
} else if ( 'webkitHidden' in document ) {
  hiddenProperty = 'webkitHidden';
  visibilityEvent = 'webkitvisibilitychange';
}

// -------------------------- Player -------------------------- //

function Player( parent ) {
  this.parent = parent;
  this.state = 'stopped';
  // visibility change event handler
  if ( visibilityEvent ) {
    this.onVisibilityChange = function() {
      this.visibilityChange();
    }.bind( this );
    this.onVisibilityPlay = function() {
      this.visibilityPlay();
    }.bind( this );
  }
}

Player.prototype = Object.create( EvEmitter.prototype );

// start play
Player.prototype.play = function() {
  if ( this.state == 'playing' ) {
    return;
  }
  // do not play if page is hidden, start playing when page is visible
  var isPageHidden = document[ hiddenProperty ];
  if ( visibilityEvent && isPageHidden ) {
    document.addEventListener( visibilityEvent, this.onVisibilityPlay );
    return;
  }

  this.state = 'playing';
  // listen to visibility change
  if ( visibilityEvent ) {
    document.addEventListener( visibilityEvent, this.onVisibilityChange );
  }
  // start ticking
  this.tick();
};

Player.prototype.tick = function() {
  // do not tick if not playing
  if ( this.state != 'playing' ) {
    return;
  }

  var time = this.parent.options.autoPlay;
  // default to 3 seconds
  time = typeof time == 'number' ? time : 3000;
  var _this = this;
  // HACK: reset ticks if stopped and started within interval
  this.clear();
  this.timeout = setTimeout( function() {
    _this.parent.next( true );
    _this.tick();
  }, time );
};

Player.prototype.stop = function() {
  this.state = 'stopped';
  this.clear();
  // remove visibility change event
  if ( visibilityEvent ) {
    document.removeEventListener( visibilityEvent, this.onVisibilityChange );
  }
};

Player.prototype.clear = function() {
  clearTimeout( this.timeout );
};

Player.prototype.pause = function() {
  if ( this.state == 'playing' ) {
    this.state = 'paused';
    this.clear();
  }
};

Player.prototype.unpause = function() {
  // re-start play if paused
  if ( this.state == 'paused' ) {
    this.play();
  }
};

// pause if page visibility is hidden, unpause if visible
Player.prototype.visibilityChange = function() {
  var isPageHidden = document[ hiddenProperty ];
  this[ isPageHidden ? 'pause' : 'unpause' ]();
};

Player.prototype.visibilityPlay = function() {
  this.play();
  document.removeEventListener( visibilityEvent, this.onVisibilityPlay );
};

// -------------------------- Flickity -------------------------- //

utils.extend( Flickity.defaults, {
  pauseAutoPlayOnHover: true
});

Flickity.createMethods.push('_createPlayer');
var proto = Flickity.prototype;

proto._createPlayer = function() {
  this.player = new Player( this );

  this.on( 'activate', this.activatePlayer );
  this.on( 'uiChange', this.stopPlayer );
  this.on( 'pointerDown', this.stopPlayer );
  this.on( 'deactivate', this.deactivatePlayer );
};

proto.activatePlayer = function() {
  if ( !this.options.autoPlay ) {
    return;
  }
  this.player.play();
  this.element.addEventListener( 'mouseenter', this );
};

// Player API, don't hate the ... thanks I know where the door is

proto.playPlayer = function() {
  this.player.play();
};

proto.stopPlayer = function() {
  this.player.stop();
};

proto.pausePlayer = function() {
  this.player.pause();
};

proto.unpausePlayer = function() {
  this.player.unpause();
};

proto.deactivatePlayer = function() {
  this.player.stop();
  this.element.removeEventListener( 'mouseenter', this );
};

// ----- mouseenter/leave ----- //

// pause auto-play on hover
proto.onmouseenter = function() {
  if ( !this.options.pauseAutoPlayOnHover ) {
    return;
  }
  this.player.pause();
  this.element.addEventListener( 'mouseleave', this );
};

// resume auto-play on hover off
proto.onmouseleave = function() {
  this.player.unpause();
  this.element.removeEventListener( 'mouseleave', this );
};

// -----  ----- //

Flickity.Player = Player;

return Flickity;

}));

},{"./flickity":9,"ev-emitter":3,"fizzy-ui-utils":4}],14:[function(require,module,exports){
// prev/next buttons
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
      './flickity',
      'tap-listener/tap-listener',
      'fizzy-ui-utils/utils'
    ], function( Flickity, TapListener, utils ) {
      return factory( window, Flickity, TapListener, utils );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('./flickity'),
      require('tap-listener'),
      require('fizzy-ui-utils')
    );
  } else {
    // browser global
    factory(
      window,
      window.Flickity,
      window.TapListener,
      window.fizzyUIUtils
    );
  }

}( window, function factory( window, Flickity, TapListener, utils ) {
'use strict';

var svgURI = 'http://www.w3.org/2000/svg';

// -------------------------- PrevNextButton -------------------------- //

function PrevNextButton( direction, parent ) {
  this.direction = direction;
  this.parent = parent;
  this._create();
}

PrevNextButton.prototype = new TapListener();

PrevNextButton.prototype._create = function() {
  // properties
  this.isEnabled = true;
  this.isPrevious = this.direction == -1;
  var leftDirection = this.parent.options.rightToLeft ? 1 : -1;
  this.isLeft = this.direction == leftDirection;

  var element = this.element = document.createElement('button');
  element.className = 'flickity-prev-next-button';
  element.className += this.isPrevious ? ' previous' : ' next';
  // prevent button from submitting form http://stackoverflow.com/a/10836076/182183
  element.setAttribute( 'type', 'button' );
  // init as disabled
  this.disable();

  element.setAttribute( 'aria-label', this.isPrevious ? 'previous' : 'next' );

  // create arrow
  var svg = this.createSVG();
  element.appendChild( svg );
  // events
  this.on( 'tap', this.onTap );
  this.parent.on( 'select', this.update.bind( this ) );
  this.on( 'pointerDown', this.parent.childUIPointerDown.bind( this.parent ) );
};

PrevNextButton.prototype.activate = function() {
  this.bindTap( this.element );
  // click events from keyboard
  this.element.addEventListener( 'click', this );
  // add to DOM
  this.parent.element.appendChild( this.element );
};

PrevNextButton.prototype.deactivate = function() {
  // remove from DOM
  this.parent.element.removeChild( this.element );
  // do regular TapListener destroy
  TapListener.prototype.destroy.call( this );
  // click events from keyboard
  this.element.removeEventListener( 'click', this );
};

PrevNextButton.prototype.createSVG = function() {
  var svg = document.createElementNS( svgURI, 'svg');
  svg.setAttribute( 'viewBox', '0 0 100 100' );
  var path = document.createElementNS( svgURI, 'path');
  var pathMovements = getArrowMovements( this.parent.options.arrowShape );
  path.setAttribute( 'd', pathMovements );
  path.setAttribute( 'class', 'arrow' );
  // rotate arrow
  if ( !this.isLeft ) {
    path.setAttribute( 'transform', 'translate(100, 100) rotate(180) ' );
  }
  svg.appendChild( path );
  return svg;
};

// get SVG path movmement
function getArrowMovements( shape ) {
  // use shape as movement if string
  if ( typeof shape == 'string' ) {
    return shape;
  }
  // create movement string
  return 'M ' + shape.x0 + ',50' +
    ' L ' + shape.x1 + ',' + ( shape.y1 + 50 ) +
    ' L ' + shape.x2 + ',' + ( shape.y2 + 50 ) +
    ' L ' + shape.x3 + ',50 ' +
    ' L ' + shape.x2 + ',' + ( 50 - shape.y2 ) +
    ' L ' + shape.x1 + ',' + ( 50 - shape.y1 ) +
    ' Z';
}

PrevNextButton.prototype.onTap = function() {
  if ( !this.isEnabled ) {
    return;
  }
  this.parent.uiChange();
  var method = this.isPrevious ? 'previous' : 'next';
  this.parent[ method ]();
};

PrevNextButton.prototype.handleEvent = utils.handleEvent;

PrevNextButton.prototype.onclick = function() {
  // only allow clicks from keyboard
  var focused = document.activeElement;
  if ( focused && focused == this.element ) {
    this.onTap();
  }
};

// -----  ----- //

PrevNextButton.prototype.enable = function() {
  if ( this.isEnabled ) {
    return;
  }
  this.element.disabled = false;
  this.isEnabled = true;
};

PrevNextButton.prototype.disable = function() {
  if ( !this.isEnabled ) {
    return;
  }
  this.element.disabled = true;
  this.isEnabled = false;
};

PrevNextButton.prototype.update = function() {
  // index of first or last slide, if previous or next
  var slides = this.parent.slides;
  // enable is wrapAround and at least 2 slides
  if ( this.parent.options.wrapAround && slides.length > 1 ) {
    this.enable();
    return;
  }
  var lastIndex = slides.length ? slides.length - 1 : 0;
  var boundIndex = this.isPrevious ? 0 : lastIndex;
  var method = this.parent.selectedIndex == boundIndex ? 'disable' : 'enable';
  this[ method ]();
};

PrevNextButton.prototype.destroy = function() {
  this.deactivate();
};

// -------------------------- Flickity prototype -------------------------- //

utils.extend( Flickity.defaults, {
  prevNextButtons: true,
  arrowShape: {
    x0: 10,
    x1: 60, y1: 50,
    x2: 70, y2: 40,
    x3: 30
  }
});

Flickity.createMethods.push('_createPrevNextButtons');
var proto = Flickity.prototype;

proto._createPrevNextButtons = function() {
  if ( !this.options.prevNextButtons ) {
    return;
  }

  this.prevButton = new PrevNextButton( -1, this );
  this.nextButton = new PrevNextButton( 1, this );

  this.on( 'activate', this.activatePrevNextButtons );
};

proto.activatePrevNextButtons = function() {
  this.prevButton.activate();
  this.nextButton.activate();
  this.on( 'deactivate', this.deactivatePrevNextButtons );
};

proto.deactivatePrevNextButtons = function() {
  this.prevButton.deactivate();
  this.nextButton.deactivate();
  this.off( 'deactivate', this.deactivatePrevNextButtons );
};

// --------------------------  -------------------------- //

Flickity.PrevNextButton = PrevNextButton;

return Flickity;

}));

},{"./flickity":9,"fizzy-ui-utils":4,"tap-listener":18}],15:[function(require,module,exports){
// slide
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    window.Flickity = window.Flickity || {};
    window.Flickity.Slide = factory();
  }

}( window, function factory() {
'use strict';

function Slide( parent ) {
  this.parent = parent;
  this.isOriginLeft = parent.originSide == 'left';
  this.cells = [];
  this.outerWidth = 0;
  this.height = 0;
}

var proto = Slide.prototype;

proto.addCell = function( cell ) {
  this.cells.push( cell );
  this.outerWidth += cell.size.outerWidth;
  this.height = Math.max( cell.size.outerHeight, this.height );
  // first cell stuff
  if ( this.cells.length == 1 ) {
    this.x = cell.x; // x comes from first cell
    var beginMargin = this.isOriginLeft ? 'marginLeft' : 'marginRight';
    this.firstMargin = cell.size[ beginMargin ];
  }
};

proto.updateTarget = function() {
  var endMargin = this.isOriginLeft ? 'marginRight' : 'marginLeft';
  var lastCell = this.getLastCell();
  var lastMargin = lastCell ? lastCell.size[ endMargin ] : 0;
  var slideWidth = this.outerWidth - ( this.firstMargin + lastMargin );
  this.target = this.x + this.firstMargin + slideWidth * this.parent.cellAlign;
};

proto.getLastCell = function() {
  return this.cells[ this.cells.length - 1 ];
};

proto.select = function() {
  this.changeSelectedClass('add');
};

proto.unselect = function() {
  this.changeSelectedClass('remove');
};

proto.changeSelectedClass = function( method ) {
  this.cells.forEach( function( cell ) {
    cell.element.classList[ method ]('is-selected');
  });
};

proto.getCellElements = function() {
  return this.cells.map( function( cell ) {
    return cell.element;
  });
};

return Slide;

}));

},{}],16:[function(require,module,exports){
/*!
 * getSize v2.0.2
 * measure size of elements
 * MIT license
 */

/*jshint browser: true, strict: true, undef: true, unused: true */
/*global define: false, module: false, console: false */

( function( window, factory ) {
  'use strict';

  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( function() {
      return factory();
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    window.getSize = factory();
  }

})( window, function factory() {
'use strict';

// -------------------------- helpers -------------------------- //

// get a number from a string, not a percentage
function getStyleSize( value ) {
  var num = parseFloat( value );
  // not a percent like '100%', and a number
  var isValid = value.indexOf('%') == -1 && !isNaN( num );
  return isValid && num;
}

function noop() {}

var logError = typeof console == 'undefined' ? noop :
  function( message ) {
    console.error( message );
  };

// -------------------------- measurements -------------------------- //

var measurements = [
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'paddingBottom',
  'marginLeft',
  'marginRight',
  'marginTop',
  'marginBottom',
  'borderLeftWidth',
  'borderRightWidth',
  'borderTopWidth',
  'borderBottomWidth'
];

var measurementsLength = measurements.length;

function getZeroSize() {
  var size = {
    width: 0,
    height: 0,
    innerWidth: 0,
    innerHeight: 0,
    outerWidth: 0,
    outerHeight: 0
  };
  for ( var i=0; i < measurementsLength; i++ ) {
    var measurement = measurements[i];
    size[ measurement ] = 0;
  }
  return size;
}

// -------------------------- getStyle -------------------------- //

/**
 * getStyle, get style of element, check for Firefox bug
 * https://bugzilla.mozilla.org/show_bug.cgi?id=548397
 */
function getStyle( elem ) {
  var style = getComputedStyle( elem );
  if ( !style ) {
    logError( 'Style returned ' + style +
      '. Are you running this code in a hidden iframe on Firefox? ' +
      'See http://bit.ly/getsizebug1' );
  }
  return style;
}

// -------------------------- setup -------------------------- //

var isSetup = false;

var isBoxSizeOuter;

/**
 * setup
 * check isBoxSizerOuter
 * do on first getSize() rather than on page load for Firefox bug
 */
function setup() {
  // setup once
  if ( isSetup ) {
    return;
  }
  isSetup = true;

  // -------------------------- box sizing -------------------------- //

  /**
   * WebKit measures the outer-width on style.width on border-box elems
   * IE & Firefox<29 measures the inner-width
   */
  var div = document.createElement('div');
  div.style.width = '200px';
  div.style.padding = '1px 2px 3px 4px';
  div.style.borderStyle = 'solid';
  div.style.borderWidth = '1px 2px 3px 4px';
  div.style.boxSizing = 'border-box';

  var body = document.body || document.documentElement;
  body.appendChild( div );
  var style = getStyle( div );

  getSize.isBoxSizeOuter = isBoxSizeOuter = getStyleSize( style.width ) == 200;
  body.removeChild( div );

}

// -------------------------- getSize -------------------------- //

function getSize( elem ) {
  setup();

  // use querySeletor if elem is string
  if ( typeof elem == 'string' ) {
    elem = document.querySelector( elem );
  }

  // do not proceed on non-objects
  if ( !elem || typeof elem != 'object' || !elem.nodeType ) {
    return;
  }

  var style = getStyle( elem );

  // if hidden, everything is 0
  if ( style.display == 'none' ) {
    return getZeroSize();
  }

  var size = {};
  size.width = elem.offsetWidth;
  size.height = elem.offsetHeight;

  var isBorderBox = size.isBorderBox = style.boxSizing == 'border-box';

  // get all measurements
  for ( var i=0; i < measurementsLength; i++ ) {
    var measurement = measurements[i];
    var value = style[ measurement ];
    var num = parseFloat( value );
    // any 'auto', 'medium' value will be 0
    size[ measurement ] = !isNaN( num ) ? num : 0;
  }

  var paddingWidth = size.paddingLeft + size.paddingRight;
  var paddingHeight = size.paddingTop + size.paddingBottom;
  var marginWidth = size.marginLeft + size.marginRight;
  var marginHeight = size.marginTop + size.marginBottom;
  var borderWidth = size.borderLeftWidth + size.borderRightWidth;
  var borderHeight = size.borderTopWidth + size.borderBottomWidth;

  var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter;

  // overwrite width and height if we can get it from style
  var styleWidth = getStyleSize( style.width );
  if ( styleWidth !== false ) {
    size.width = styleWidth +
      // add padding and border unless it's already including it
      ( isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth );
  }

  var styleHeight = getStyleSize( style.height );
  if ( styleHeight !== false ) {
    size.height = styleHeight +
      // add padding and border unless it's already including it
      ( isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight );
  }

  size.innerWidth = size.width - ( paddingWidth + borderWidth );
  size.innerHeight = size.height - ( paddingHeight + borderHeight );

  size.outerWidth = size.width + marginWidth;
  size.outerHeight = size.height + marginHeight;

  return size;
}

return getSize;

});

},{}],17:[function(require,module,exports){
/**
 * material-design-lite - Material Design Components in CSS, JS and HTML
 * @version v1.2.1
 * @license Apache-2.0
 * @copyright 2015 Google, Inc.
 * @link https://github.com/google/material-design-lite
 */
!function(){"use strict";function e(e,t){if(e){if(t.element_.classList.contains(t.CssClasses_.MDL_JS_RIPPLE_EFFECT)){var s=document.createElement("span");s.classList.add(t.CssClasses_.MDL_RIPPLE_CONTAINER),s.classList.add(t.CssClasses_.MDL_JS_RIPPLE_EFFECT);var i=document.createElement("span");i.classList.add(t.CssClasses_.MDL_RIPPLE),s.appendChild(i),e.appendChild(s)}e.addEventListener("click",function(s){s.preventDefault();var i=e.href.split("#")[1],n=t.element_.querySelector("#"+i);t.resetTabState_(),t.resetPanelState_(),e.classList.add(t.CssClasses_.ACTIVE_CLASS),n.classList.add(t.CssClasses_.ACTIVE_CLASS)})}}function t(e,t,s,i){function n(){var n=e.href.split("#")[1],a=i.content_.querySelector("#"+n);i.resetTabState_(t),i.resetPanelState_(s),e.classList.add(i.CssClasses_.IS_ACTIVE),a.classList.add(i.CssClasses_.IS_ACTIVE)}if(i.tabBar_.classList.contains(i.CssClasses_.JS_RIPPLE_EFFECT)){var a=document.createElement("span");a.classList.add(i.CssClasses_.RIPPLE_CONTAINER),a.classList.add(i.CssClasses_.JS_RIPPLE_EFFECT);var l=document.createElement("span");l.classList.add(i.CssClasses_.RIPPLE),a.appendChild(l),e.appendChild(a)}e.addEventListener("click",function(t){"#"===e.getAttribute("href").charAt(0)&&(t.preventDefault(),n())}),e.show=n}var s={upgradeDom:function(e,t){},upgradeElement:function(e,t){},upgradeElements:function(e){},upgradeAllRegistered:function(){},registerUpgradedCallback:function(e,t){},register:function(e){},downgradeElements:function(e){}};s=function(){function e(e,t){for(var s=0;s<h.length;s++)if(h[s].className===e)return"undefined"!=typeof t&&(h[s]=t),h[s];return!1}function t(e){var t=e.getAttribute("data-upgraded");return null===t?[""]:t.split(",")}function s(e,s){var i=t(e);return i.indexOf(s)!==-1}function i(t,s){if("undefined"==typeof t&&"undefined"==typeof s)for(var a=0;a<h.length;a++)i(h[a].className,h[a].cssClass);else{var l=t;if("undefined"==typeof s){var o=e(l);o&&(s=o.cssClass)}for(var r=document.querySelectorAll("."+s),_=0;_<r.length;_++)n(r[_],l)}}function n(i,n){if(!("object"==typeof i&&i instanceof Element))throw new Error("Invalid argument provided to upgrade MDL element.");var a=t(i),l=[];if(n)s(i,n)||l.push(e(n));else{var o=i.classList;h.forEach(function(e){o.contains(e.cssClass)&&l.indexOf(e)===-1&&!s(i,e.className)&&l.push(e)})}for(var r,_=0,d=l.length;_<d;_++){if(r=l[_],!r)throw new Error("Unable to find a registered component for the given class.");a.push(r.className),i.setAttribute("data-upgraded",a.join(","));var C=new r.classConstructor(i);C[p]=r,c.push(C);for(var u=0,E=r.callbacks.length;u<E;u++)r.callbacks[u](i);r.widget&&(i[r.className]=C);var m;"CustomEvent"in window&&"function"==typeof window.CustomEvent?m=new CustomEvent("mdl-componentupgraded",{bubbles:!0,cancelable:!1}):(m=document.createEvent("Events"),m.initEvent("mdl-componentupgraded",!0,!0)),i.dispatchEvent(m)}}function a(e){Array.isArray(e)||(e=e instanceof Element?[e]:Array.prototype.slice.call(e));for(var t,s=0,i=e.length;s<i;s++)t=e[s],t instanceof HTMLElement&&(n(t),t.children.length>0&&a(t.children))}function l(t){var s="undefined"==typeof t.widget&&"undefined"==typeof t.widget,i=!0;s||(i=t.widget||t.widget);var n={classConstructor:t.constructor||t.constructor,className:t.classAsString||t.classAsString,cssClass:t.cssClass||t.cssClass,widget:i,callbacks:[]};if(h.forEach(function(e){if(e.cssClass===n.cssClass)throw new Error("The provided cssClass has already been registered: "+e.cssClass);if(e.className===n.className)throw new Error("The provided className has already been registered")}),t.constructor.prototype.hasOwnProperty(p))throw new Error("MDL component classes must not have "+p+" defined as a property.");var a=e(t.classAsString,n);a||h.push(n)}function o(t,s){var i=e(t);i&&i.callbacks.push(s)}function r(){for(var e=0;e<h.length;e++)i(h[e].className)}function _(e){if(e){var t=c.indexOf(e);c.splice(t,1);var s=e.element_.getAttribute("data-upgraded").split(","),i=s.indexOf(e[p].classAsString);s.splice(i,1),e.element_.setAttribute("data-upgraded",s.join(","));var n;"CustomEvent"in window&&"function"==typeof window.CustomEvent?n=new CustomEvent("mdl-componentdowngraded",{bubbles:!0,cancelable:!1}):(n=document.createEvent("Events"),n.initEvent("mdl-componentdowngraded",!0,!0)),e.element_.dispatchEvent(n)}}function d(e){var t=function(e){c.filter(function(t){return t.element_===e}).forEach(_)};if(e instanceof Array||e instanceof NodeList)for(var s=0;s<e.length;s++)t(e[s]);else{if(!(e instanceof Node))throw new Error("Invalid argument provided to downgrade MDL nodes.");t(e)}}var h=[],c=[],p="mdlComponentConfigInternal_";return{upgradeDom:i,upgradeElement:n,upgradeElements:a,upgradeAllRegistered:r,registerUpgradedCallback:o,register:l,downgradeElements:d}}(),s.ComponentConfigPublic,s.ComponentConfig,s.Component,s.upgradeDom=s.upgradeDom,s.upgradeElement=s.upgradeElement,s.upgradeElements=s.upgradeElements,s.upgradeAllRegistered=s.upgradeAllRegistered,s.registerUpgradedCallback=s.registerUpgradedCallback,s.register=s.register,s.downgradeElements=s.downgradeElements,window.componentHandler=s,window.componentHandler=s,window.addEventListener("load",function(){"classList"in document.createElement("div")&&"querySelector"in document&&"addEventListener"in window&&Array.prototype.forEach?(document.documentElement.classList.add("mdl-js"),s.upgradeAllRegistered()):(s.upgradeElement=function(){},s.register=function(){})}),Date.now||(Date.now=function(){return(new Date).getTime()},Date.now=Date.now);for(var i=["webkit","moz"],n=0;n<i.length&&!window.requestAnimationFrame;++n){var a=i[n];window.requestAnimationFrame=window[a+"RequestAnimationFrame"],window.cancelAnimationFrame=window[a+"CancelAnimationFrame"]||window[a+"CancelRequestAnimationFrame"],window.requestAnimationFrame=window.requestAnimationFrame,window.cancelAnimationFrame=window.cancelAnimationFrame}if(/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent)||!window.requestAnimationFrame||!window.cancelAnimationFrame){var l=0;window.requestAnimationFrame=function(e){var t=Date.now(),s=Math.max(l+16,t);return setTimeout(function(){e(l=s)},s-t)},window.cancelAnimationFrame=clearTimeout,window.requestAnimationFrame=window.requestAnimationFrame,window.cancelAnimationFrame=window.cancelAnimationFrame}var o=function(e){this.element_=e,this.init()};window.MaterialButton=o,o.prototype.Constant_={},o.prototype.CssClasses_={RIPPLE_EFFECT:"mdl-js-ripple-effect",RIPPLE_CONTAINER:"mdl-button__ripple-container",RIPPLE:"mdl-ripple"},o.prototype.blurHandler_=function(e){e&&this.element_.blur()},o.prototype.disable=function(){this.element_.disabled=!0},o.prototype.disable=o.prototype.disable,o.prototype.enable=function(){this.element_.disabled=!1},o.prototype.enable=o.prototype.enable,o.prototype.init=function(){if(this.element_){if(this.element_.classList.contains(this.CssClasses_.RIPPLE_EFFECT)){var e=document.createElement("span");e.classList.add(this.CssClasses_.RIPPLE_CONTAINER),this.rippleElement_=document.createElement("span"),this.rippleElement_.classList.add(this.CssClasses_.RIPPLE),e.appendChild(this.rippleElement_),this.boundRippleBlurHandler=this.blurHandler_.bind(this),this.rippleElement_.addEventListener("mouseup",this.boundRippleBlurHandler),this.element_.appendChild(e)}this.boundButtonBlurHandler=this.blurHandler_.bind(this),this.element_.addEventListener("mouseup",this.boundButtonBlurHandler),this.element_.addEventListener("mouseleave",this.boundButtonBlurHandler)}},s.register({constructor:o,classAsString:"MaterialButton",cssClass:"mdl-js-button",widget:!0});var r=function(e){this.element_=e,this.init()};window.MaterialCheckbox=r,r.prototype.Constant_={TINY_TIMEOUT:.001},r.prototype.CssClasses_={INPUT:"mdl-checkbox__input",BOX_OUTLINE:"mdl-checkbox__box-outline",FOCUS_HELPER:"mdl-checkbox__focus-helper",TICK_OUTLINE:"mdl-checkbox__tick-outline",RIPPLE_EFFECT:"mdl-js-ripple-effect",RIPPLE_IGNORE_EVENTS:"mdl-js-ripple-effect--ignore-events",RIPPLE_CONTAINER:"mdl-checkbox__ripple-container",RIPPLE_CENTER:"mdl-ripple--center",RIPPLE:"mdl-ripple",IS_FOCUSED:"is-focused",IS_DISABLED:"is-disabled",IS_CHECKED:"is-checked",IS_UPGRADED:"is-upgraded"},r.prototype.onChange_=function(e){this.updateClasses_()},r.prototype.onFocus_=function(e){this.element_.classList.add(this.CssClasses_.IS_FOCUSED)},r.prototype.onBlur_=function(e){this.element_.classList.remove(this.CssClasses_.IS_FOCUSED)},r.prototype.onMouseUp_=function(e){this.blur_()},r.prototype.updateClasses_=function(){this.checkDisabled(),this.checkToggleState()},r.prototype.blur_=function(){window.setTimeout(function(){this.inputElement_.blur()}.bind(this),this.Constant_.TINY_TIMEOUT)},r.prototype.checkToggleState=function(){this.inputElement_.checked?this.element_.classList.add(this.CssClasses_.IS_CHECKED):this.element_.classList.remove(this.CssClasses_.IS_CHECKED)},r.prototype.checkToggleState=r.prototype.checkToggleState,r.prototype.checkDisabled=function(){this.inputElement_.disabled?this.element_.classList.add(this.CssClasses_.IS_DISABLED):this.element_.classList.remove(this.CssClasses_.IS_DISABLED)},r.prototype.checkDisabled=r.prototype.checkDisabled,r.prototype.disable=function(){this.inputElement_.disabled=!0,this.updateClasses_()},r.prototype.disable=r.prototype.disable,r.prototype.enable=function(){this.inputElement_.disabled=!1,this.updateClasses_()},r.prototype.enable=r.prototype.enable,r.prototype.check=function(){this.inputElement_.checked=!0,this.updateClasses_()},r.prototype.check=r.prototype.check,r.prototype.uncheck=function(){this.inputElement_.checked=!1,this.updateClasses_()},r.prototype.uncheck=r.prototype.uncheck,r.prototype.init=function(){if(this.element_){this.inputElement_=this.element_.querySelector("."+this.CssClasses_.INPUT);var e=document.createElement("span");e.classList.add(this.CssClasses_.BOX_OUTLINE);var t=document.createElement("span");t.classList.add(this.CssClasses_.FOCUS_HELPER);var s=document.createElement("span");if(s.classList.add(this.CssClasses_.TICK_OUTLINE),e.appendChild(s),this.element_.appendChild(t),this.element_.appendChild(e),this.element_.classList.contains(this.CssClasses_.RIPPLE_EFFECT)){this.element_.classList.add(this.CssClasses_.RIPPLE_IGNORE_EVENTS),this.rippleContainerElement_=document.createElement("span"),this.rippleContainerElement_.classList.add(this.CssClasses_.RIPPLE_CONTAINER),this.rippleContainerElement_.classList.add(this.CssClasses_.RIPPLE_EFFECT),this.rippleContainerElement_.classList.add(this.CssClasses_.RIPPLE_CENTER),this.boundRippleMouseUp=this.onMouseUp_.bind(this),this.rippleContainerElement_.addEventListener("mouseup",this.boundRippleMouseUp);var i=document.createElement("span");i.classList.add(this.CssClasses_.RIPPLE),this.rippleContainerElement_.appendChild(i),this.element_.appendChild(this.rippleContainerElement_)}this.boundInputOnChange=this.onChange_.bind(this),this.boundInputOnFocus=this.onFocus_.bind(this),this.boundInputOnBlur=this.onBlur_.bind(this),this.boundElementMouseUp=this.onMouseUp_.bind(this),this.inputElement_.addEventListener("change",this.boundInputOnChange),this.inputElement_.addEventListener("focus",this.boundInputOnFocus),this.inputElement_.addEventListener("blur",this.boundInputOnBlur),this.element_.addEventListener("mouseup",this.boundElementMouseUp),this.updateClasses_(),this.element_.classList.add(this.CssClasses_.IS_UPGRADED)}},s.register({constructor:r,classAsString:"MaterialCheckbox",cssClass:"mdl-js-checkbox",widget:!0});var _=function(e){this.element_=e,this.init()};window.MaterialIconToggle=_,_.prototype.Constant_={TINY_TIMEOUT:.001},_.prototype.CssClasses_={INPUT:"mdl-icon-toggle__input",JS_RIPPLE_EFFECT:"mdl-js-ripple-effect",RIPPLE_IGNORE_EVENTS:"mdl-js-ripple-effect--ignore-events",RIPPLE_CONTAINER:"mdl-icon-toggle__ripple-container",RIPPLE_CENTER:"mdl-ripple--center",RIPPLE:"mdl-ripple",IS_FOCUSED:"is-focused",IS_DISABLED:"is-disabled",IS_CHECKED:"is-checked"},_.prototype.onChange_=function(e){this.updateClasses_()},_.prototype.onFocus_=function(e){this.element_.classList.add(this.CssClasses_.IS_FOCUSED)},_.prototype.onBlur_=function(e){this.element_.classList.remove(this.CssClasses_.IS_FOCUSED)},_.prototype.onMouseUp_=function(e){this.blur_()},_.prototype.updateClasses_=function(){this.checkDisabled(),this.checkToggleState()},_.prototype.blur_=function(){window.setTimeout(function(){this.inputElement_.blur()}.bind(this),this.Constant_.TINY_TIMEOUT)},_.prototype.checkToggleState=function(){this.inputElement_.checked?this.element_.classList.add(this.CssClasses_.IS_CHECKED):this.element_.classList.remove(this.CssClasses_.IS_CHECKED)},_.prototype.checkToggleState=_.prototype.checkToggleState,_.prototype.checkDisabled=function(){this.inputElement_.disabled?this.element_.classList.add(this.CssClasses_.IS_DISABLED):this.element_.classList.remove(this.CssClasses_.IS_DISABLED)},_.prototype.checkDisabled=_.prototype.checkDisabled,_.prototype.disable=function(){this.inputElement_.disabled=!0,this.updateClasses_()},_.prototype.disable=_.prototype.disable,_.prototype.enable=function(){this.inputElement_.disabled=!1,this.updateClasses_()},_.prototype.enable=_.prototype.enable,_.prototype.check=function(){this.inputElement_.checked=!0,this.updateClasses_()},_.prototype.check=_.prototype.check,_.prototype.uncheck=function(){this.inputElement_.checked=!1,this.updateClasses_()},_.prototype.uncheck=_.prototype.uncheck,_.prototype.init=function(){if(this.element_){if(this.inputElement_=this.element_.querySelector("."+this.CssClasses_.INPUT),this.element_.classList.contains(this.CssClasses_.JS_RIPPLE_EFFECT)){this.element_.classList.add(this.CssClasses_.RIPPLE_IGNORE_EVENTS),this.rippleContainerElement_=document.createElement("span"),this.rippleContainerElement_.classList.add(this.CssClasses_.RIPPLE_CONTAINER),this.rippleContainerElement_.classList.add(this.CssClasses_.JS_RIPPLE_EFFECT),this.rippleContainerElement_.classList.add(this.CssClasses_.RIPPLE_CENTER),this.boundRippleMouseUp=this.onMouseUp_.bind(this),this.rippleContainerElement_.addEventListener("mouseup",this.boundRippleMouseUp);var e=document.createElement("span");e.classList.add(this.CssClasses_.RIPPLE),this.rippleContainerElement_.appendChild(e),this.element_.appendChild(this.rippleContainerElement_)}this.boundInputOnChange=this.onChange_.bind(this),this.boundInputOnFocus=this.onFocus_.bind(this),this.boundInputOnBlur=this.onBlur_.bind(this),this.boundElementOnMouseUp=this.onMouseUp_.bind(this),this.inputElement_.addEventListener("change",this.boundInputOnChange),this.inputElement_.addEventListener("focus",this.boundInputOnFocus),this.inputElement_.addEventListener("blur",this.boundInputOnBlur),this.element_.addEventListener("mouseup",this.boundElementOnMouseUp),this.updateClasses_(),this.element_.classList.add("is-upgraded")}},s.register({constructor:_,classAsString:"MaterialIconToggle",cssClass:"mdl-js-icon-toggle",widget:!0});var d=function(e){this.element_=e,this.init()};window.MaterialMenu=d,d.prototype.Constant_={TRANSITION_DURATION_SECONDS:.3,TRANSITION_DURATION_FRACTION:.8,CLOSE_TIMEOUT:150},d.prototype.Keycodes_={ENTER:13,ESCAPE:27,SPACE:32,UP_ARROW:38,DOWN_ARROW:40},d.prototype.CssClasses_={CONTAINER:"mdl-menu__container",OUTLINE:"mdl-menu__outline",ITEM:"mdl-menu__item",ITEM_RIPPLE_CONTAINER:"mdl-menu__item-ripple-container",RIPPLE_EFFECT:"mdl-js-ripple-effect",RIPPLE_IGNORE_EVENTS:"mdl-js-ripple-effect--ignore-events",RIPPLE:"mdl-ripple",IS_UPGRADED:"is-upgraded",IS_VISIBLE:"is-visible",IS_ANIMATING:"is-animating",BOTTOM_LEFT:"mdl-menu--bottom-left",BOTTOM_RIGHT:"mdl-menu--bottom-right",TOP_LEFT:"mdl-menu--top-left",TOP_RIGHT:"mdl-menu--top-right",UNALIGNED:"mdl-menu--unaligned"},d.prototype.init=function(){if(this.element_){var e=document.createElement("div");e.classList.add(this.CssClasses_.CONTAINER),this.element_.parentElement.insertBefore(e,this.element_),this.element_.parentElement.removeChild(this.element_),e.appendChild(this.element_),this.container_=e;var t=document.createElement("div");t.classList.add(this.CssClasses_.OUTLINE),this.outline_=t,e.insertBefore(t,this.element_);var s=this.element_.getAttribute("for")||this.element_.getAttribute("data-mdl-for"),i=null;s&&(i=document.getElementById(s),i&&(this.forElement_=i,i.addEventListener("click",this.handleForClick_.bind(this)),i.addEventListener("keydown",this.handleForKeyboardEvent_.bind(this))));var n=this.element_.querySelectorAll("."+this.CssClasses_.ITEM);this.boundItemKeydown_=this.handleItemKeyboardEvent_.bind(this),this.boundItemClick_=this.handleItemClick_.bind(this);for(var a=0;a<n.length;a++)n[a].addEventListener("click",this.boundItemClick_),n[a].tabIndex="-1",n[a].addEventListener("keydown",this.boundItemKeydown_);if(this.element_.classList.contains(this.CssClasses_.RIPPLE_EFFECT))for(this.element_.classList.add(this.CssClasses_.RIPPLE_IGNORE_EVENTS),a=0;a<n.length;a++){var l=n[a],o=document.createElement("span");o.classList.add(this.CssClasses_.ITEM_RIPPLE_CONTAINER);var r=document.createElement("span");r.classList.add(this.CssClasses_.RIPPLE),o.appendChild(r),l.appendChild(o),l.classList.add(this.CssClasses_.RIPPLE_EFFECT)}this.element_.classList.contains(this.CssClasses_.BOTTOM_LEFT)&&this.outline_.classList.add(this.CssClasses_.BOTTOM_LEFT),this.element_.classList.contains(this.CssClasses_.BOTTOM_RIGHT)&&this.outline_.classList.add(this.CssClasses_.BOTTOM_RIGHT),this.element_.classList.contains(this.CssClasses_.TOP_LEFT)&&this.outline_.classList.add(this.CssClasses_.TOP_LEFT),this.element_.classList.contains(this.CssClasses_.TOP_RIGHT)&&this.outline_.classList.add(this.CssClasses_.TOP_RIGHT),this.element_.classList.contains(this.CssClasses_.UNALIGNED)&&this.outline_.classList.add(this.CssClasses_.UNALIGNED),e.classList.add(this.CssClasses_.IS_UPGRADED)}},d.prototype.handleForClick_=function(e){if(this.element_&&this.forElement_){var t=this.forElement_.getBoundingClientRect(),s=this.forElement_.parentElement.getBoundingClientRect();this.element_.classList.contains(this.CssClasses_.UNALIGNED)||(this.element_.classList.contains(this.CssClasses_.BOTTOM_RIGHT)?(this.container_.style.right=s.right-t.right+"px",this.container_.style.top=this.forElement_.offsetTop+this.forElement_.offsetHeight+"px"):this.element_.classList.contains(this.CssClasses_.TOP_LEFT)?(this.container_.style.left=this.forElement_.offsetLeft+"px",this.container_.style.bottom=s.bottom-t.top+"px"):this.element_.classList.contains(this.CssClasses_.TOP_RIGHT)?(this.container_.style.right=s.right-t.right+"px",this.container_.style.bottom=s.bottom-t.top+"px"):(this.container_.style.left=this.forElement_.offsetLeft+"px",this.container_.style.top=this.forElement_.offsetTop+this.forElement_.offsetHeight+"px"))}this.toggle(e)},d.prototype.handleForKeyboardEvent_=function(e){if(this.element_&&this.container_&&this.forElement_){var t=this.element_.querySelectorAll("."+this.CssClasses_.ITEM+":not([disabled])");t&&t.length>0&&this.container_.classList.contains(this.CssClasses_.IS_VISIBLE)&&(e.keyCode===this.Keycodes_.UP_ARROW?(e.preventDefault(),t[t.length-1].focus()):e.keyCode===this.Keycodes_.DOWN_ARROW&&(e.preventDefault(),t[0].focus()))}},d.prototype.handleItemKeyboardEvent_=function(e){if(this.element_&&this.container_){var t=this.element_.querySelectorAll("."+this.CssClasses_.ITEM+":not([disabled])");if(t&&t.length>0&&this.container_.classList.contains(this.CssClasses_.IS_VISIBLE)){var s=Array.prototype.slice.call(t).indexOf(e.target);if(e.keyCode===this.Keycodes_.UP_ARROW)e.preventDefault(),s>0?t[s-1].focus():t[t.length-1].focus();else if(e.keyCode===this.Keycodes_.DOWN_ARROW)e.preventDefault(),t.length>s+1?t[s+1].focus():t[0].focus();else if(e.keyCode===this.Keycodes_.SPACE||e.keyCode===this.Keycodes_.ENTER){e.preventDefault();var i=new MouseEvent("mousedown");e.target.dispatchEvent(i),i=new MouseEvent("mouseup"),e.target.dispatchEvent(i),e.target.click()}else e.keyCode===this.Keycodes_.ESCAPE&&(e.preventDefault(),this.hide())}}},d.prototype.handleItemClick_=function(e){e.target.hasAttribute("disabled")?e.stopPropagation():(this.closing_=!0,window.setTimeout(function(e){this.hide(),this.closing_=!1}.bind(this),this.Constant_.CLOSE_TIMEOUT))},d.prototype.applyClip_=function(e,t){this.element_.classList.contains(this.CssClasses_.UNALIGNED)?this.element_.style.clip="":this.element_.classList.contains(this.CssClasses_.BOTTOM_RIGHT)?this.element_.style.clip="rect(0 "+t+"px 0 "+t+"px)":this.element_.classList.contains(this.CssClasses_.TOP_LEFT)?this.element_.style.clip="rect("+e+"px 0 "+e+"px 0)":this.element_.classList.contains(this.CssClasses_.TOP_RIGHT)?this.element_.style.clip="rect("+e+"px "+t+"px "+e+"px "+t+"px)":this.element_.style.clip=""},d.prototype.removeAnimationEndListener_=function(e){e.target.classList.remove(d.prototype.CssClasses_.IS_ANIMATING)},d.prototype.addAnimationEndListener_=function(){this.element_.addEventListener("transitionend",this.removeAnimationEndListener_),this.element_.addEventListener("webkitTransitionEnd",this.removeAnimationEndListener_)},d.prototype.show=function(e){if(this.element_&&this.container_&&this.outline_){var t=this.element_.getBoundingClientRect().height,s=this.element_.getBoundingClientRect().width;this.container_.style.width=s+"px",this.container_.style.height=t+"px",this.outline_.style.width=s+"px",this.outline_.style.height=t+"px";for(var i=this.Constant_.TRANSITION_DURATION_SECONDS*this.Constant_.TRANSITION_DURATION_FRACTION,n=this.element_.querySelectorAll("."+this.CssClasses_.ITEM),a=0;a<n.length;a++){var l=null;l=this.element_.classList.contains(this.CssClasses_.TOP_LEFT)||this.element_.classList.contains(this.CssClasses_.TOP_RIGHT)?(t-n[a].offsetTop-n[a].offsetHeight)/t*i+"s":n[a].offsetTop/t*i+"s",n[a].style.transitionDelay=l}this.applyClip_(t,s),window.requestAnimationFrame(function(){this.element_.classList.add(this.CssClasses_.IS_ANIMATING),this.element_.style.clip="rect(0 "+s+"px "+t+"px 0)",this.container_.classList.add(this.CssClasses_.IS_VISIBLE)}.bind(this)),this.addAnimationEndListener_();var o=function(t){t===e||this.closing_||t.target.parentNode===this.element_||(document.removeEventListener("click",o),this.hide())}.bind(this);document.addEventListener("click",o)}},d.prototype.show=d.prototype.show,d.prototype.hide=function(){if(this.element_&&this.container_&&this.outline_){for(var e=this.element_.querySelectorAll("."+this.CssClasses_.ITEM),t=0;t<e.length;t++)e[t].style.removeProperty("transition-delay");var s=this.element_.getBoundingClientRect(),i=s.height,n=s.width;this.element_.classList.add(this.CssClasses_.IS_ANIMATING),this.applyClip_(i,n),this.container_.classList.remove(this.CssClasses_.IS_VISIBLE),this.addAnimationEndListener_()}},d.prototype.hide=d.prototype.hide,d.prototype.toggle=function(e){this.container_.classList.contains(this.CssClasses_.IS_VISIBLE)?this.hide():this.show(e)},d.prototype.toggle=d.prototype.toggle,s.register({constructor:d,classAsString:"MaterialMenu",cssClass:"mdl-js-menu",widget:!0});var h=function(e){this.element_=e,this.init()};window.MaterialProgress=h,h.prototype.Constant_={},h.prototype.CssClasses_={INDETERMINATE_CLASS:"mdl-progress__indeterminate"},h.prototype.setProgress=function(e){this.element_.classList.contains(this.CssClasses_.INDETERMINATE_CLASS)||(this.progressbar_.style.width=e+"%")},h.prototype.setProgress=h.prototype.setProgress,h.prototype.setBuffer=function(e){this.bufferbar_.style.width=e+"%",this.auxbar_.style.width=100-e+"%"},h.prototype.setBuffer=h.prototype.setBuffer,h.prototype.init=function(){if(this.element_){var e=document.createElement("div");e.className="progressbar bar bar1",this.element_.appendChild(e),this.progressbar_=e,e=document.createElement("div"),e.className="bufferbar bar bar2",this.element_.appendChild(e),this.bufferbar_=e,e=document.createElement("div"),e.className="auxbar bar bar3",this.element_.appendChild(e),this.auxbar_=e,this.progressbar_.style.width="0%",this.bufferbar_.style.width="100%",this.auxbar_.style.width="0%",this.element_.classList.add("is-upgraded")}},s.register({constructor:h,classAsString:"MaterialProgress",cssClass:"mdl-js-progress",widget:!0});var c=function(e){this.element_=e,this.init()};window.MaterialRadio=c,c.prototype.Constant_={TINY_TIMEOUT:.001},c.prototype.CssClasses_={IS_FOCUSED:"is-focused",IS_DISABLED:"is-disabled",IS_CHECKED:"is-checked",IS_UPGRADED:"is-upgraded",JS_RADIO:"mdl-js-radio",RADIO_BTN:"mdl-radio__button",RADIO_OUTER_CIRCLE:"mdl-radio__outer-circle",RADIO_INNER_CIRCLE:"mdl-radio__inner-circle",RIPPLE_EFFECT:"mdl-js-ripple-effect",RIPPLE_IGNORE_EVENTS:"mdl-js-ripple-effect--ignore-events",RIPPLE_CONTAINER:"mdl-radio__ripple-container",RIPPLE_CENTER:"mdl-ripple--center",RIPPLE:"mdl-ripple"},c.prototype.onChange_=function(e){for(var t=document.getElementsByClassName(this.CssClasses_.JS_RADIO),s=0;s<t.length;s++){var i=t[s].querySelector("."+this.CssClasses_.RADIO_BTN);i.getAttribute("name")===this.btnElement_.getAttribute("name")&&t[s].MaterialRadio.updateClasses_()}},c.prototype.onFocus_=function(e){this.element_.classList.add(this.CssClasses_.IS_FOCUSED)},c.prototype.onBlur_=function(e){this.element_.classList.remove(this.CssClasses_.IS_FOCUSED)},c.prototype.onMouseup_=function(e){this.blur_()},c.prototype.updateClasses_=function(){this.checkDisabled(),this.checkToggleState()},c.prototype.blur_=function(){window.setTimeout(function(){this.btnElement_.blur()}.bind(this),this.Constant_.TINY_TIMEOUT)},c.prototype.checkDisabled=function(){this.btnElement_.disabled?this.element_.classList.add(this.CssClasses_.IS_DISABLED):this.element_.classList.remove(this.CssClasses_.IS_DISABLED)},c.prototype.checkDisabled=c.prototype.checkDisabled,c.prototype.checkToggleState=function(){this.btnElement_.checked?this.element_.classList.add(this.CssClasses_.IS_CHECKED):this.element_.classList.remove(this.CssClasses_.IS_CHECKED)},c.prototype.checkToggleState=c.prototype.checkToggleState,c.prototype.disable=function(){this.btnElement_.disabled=!0,this.updateClasses_()},c.prototype.disable=c.prototype.disable,c.prototype.enable=function(){this.btnElement_.disabled=!1,this.updateClasses_()},c.prototype.enable=c.prototype.enable,c.prototype.check=function(){this.btnElement_.checked=!0,this.onChange_(null)},c.prototype.check=c.prototype.check,c.prototype.uncheck=function(){this.btnElement_.checked=!1,this.onChange_(null)},c.prototype.uncheck=c.prototype.uncheck,c.prototype.init=function(){if(this.element_){this.btnElement_=this.element_.querySelector("."+this.CssClasses_.RADIO_BTN),this.boundChangeHandler_=this.onChange_.bind(this),this.boundFocusHandler_=this.onChange_.bind(this),this.boundBlurHandler_=this.onBlur_.bind(this),this.boundMouseUpHandler_=this.onMouseup_.bind(this);var e=document.createElement("span");e.classList.add(this.CssClasses_.RADIO_OUTER_CIRCLE);var t=document.createElement("span");t.classList.add(this.CssClasses_.RADIO_INNER_CIRCLE),this.element_.appendChild(e),this.element_.appendChild(t);var s;if(this.element_.classList.contains(this.CssClasses_.RIPPLE_EFFECT)){this.element_.classList.add(this.CssClasses_.RIPPLE_IGNORE_EVENTS),s=document.createElement("span"),s.classList.add(this.CssClasses_.RIPPLE_CONTAINER),s.classList.add(this.CssClasses_.RIPPLE_EFFECT),s.classList.add(this.CssClasses_.RIPPLE_CENTER),s.addEventListener("mouseup",this.boundMouseUpHandler_);var i=document.createElement("span");i.classList.add(this.CssClasses_.RIPPLE),s.appendChild(i),this.element_.appendChild(s)}this.btnElement_.addEventListener("change",this.boundChangeHandler_),this.btnElement_.addEventListener("focus",this.boundFocusHandler_),this.btnElement_.addEventListener("blur",this.boundBlurHandler_),this.element_.addEventListener("mouseup",this.boundMouseUpHandler_),this.updateClasses_(),this.element_.classList.add(this.CssClasses_.IS_UPGRADED)}},s.register({constructor:c,classAsString:"MaterialRadio",cssClass:"mdl-js-radio",widget:!0});var p=function(e){this.element_=e,this.isIE_=window.navigator.msPointerEnabled,this.init()};window.MaterialSlider=p,p.prototype.Constant_={},p.prototype.CssClasses_={IE_CONTAINER:"mdl-slider__ie-container",SLIDER_CONTAINER:"mdl-slider__container",BACKGROUND_FLEX:"mdl-slider__background-flex",BACKGROUND_LOWER:"mdl-slider__background-lower",BACKGROUND_UPPER:"mdl-slider__background-upper",IS_LOWEST_VALUE:"is-lowest-value",IS_UPGRADED:"is-upgraded"},p.prototype.onInput_=function(e){this.updateValueStyles_()},p.prototype.onChange_=function(e){this.updateValueStyles_()},p.prototype.onMouseUp_=function(e){e.target.blur()},p.prototype.onContainerMouseDown_=function(e){if(e.target===this.element_.parentElement){e.preventDefault();var t=new MouseEvent("mousedown",{target:e.target,buttons:e.buttons,clientX:e.clientX,clientY:this.element_.getBoundingClientRect().y});this.element_.dispatchEvent(t)}},p.prototype.updateValueStyles_=function(){var e=(this.element_.value-this.element_.min)/(this.element_.max-this.element_.min);0===e?this.element_.classList.add(this.CssClasses_.IS_LOWEST_VALUE):this.element_.classList.remove(this.CssClasses_.IS_LOWEST_VALUE),this.isIE_||(this.backgroundLower_.style.flex=e,this.backgroundLower_.style.webkitFlex=e,this.backgroundUpper_.style.flex=1-e,this.backgroundUpper_.style.webkitFlex=1-e)},p.prototype.disable=function(){this.element_.disabled=!0},p.prototype.disable=p.prototype.disable,p.prototype.enable=function(){this.element_.disabled=!1},p.prototype.enable=p.prototype.enable,p.prototype.change=function(e){"undefined"!=typeof e&&(this.element_.value=e),this.updateValueStyles_()},p.prototype.change=p.prototype.change,p.prototype.init=function(){if(this.element_){if(this.isIE_){var e=document.createElement("div");e.classList.add(this.CssClasses_.IE_CONTAINER),this.element_.parentElement.insertBefore(e,this.element_),this.element_.parentElement.removeChild(this.element_),e.appendChild(this.element_)}else{var t=document.createElement("div");t.classList.add(this.CssClasses_.SLIDER_CONTAINER),this.element_.parentElement.insertBefore(t,this.element_),this.element_.parentElement.removeChild(this.element_),t.appendChild(this.element_);var s=document.createElement("div");s.classList.add(this.CssClasses_.BACKGROUND_FLEX),t.appendChild(s),this.backgroundLower_=document.createElement("div"),this.backgroundLower_.classList.add(this.CssClasses_.BACKGROUND_LOWER),s.appendChild(this.backgroundLower_),this.backgroundUpper_=document.createElement("div"),this.backgroundUpper_.classList.add(this.CssClasses_.BACKGROUND_UPPER),s.appendChild(this.backgroundUpper_)}this.boundInputHandler=this.onInput_.bind(this),this.boundChangeHandler=this.onChange_.bind(this),this.boundMouseUpHandler=this.onMouseUp_.bind(this),this.boundContainerMouseDownHandler=this.onContainerMouseDown_.bind(this),this.element_.addEventListener("input",this.boundInputHandler),this.element_.addEventListener("change",this.boundChangeHandler),this.element_.addEventListener("mouseup",this.boundMouseUpHandler),this.element_.parentElement.addEventListener("mousedown",this.boundContainerMouseDownHandler),this.updateValueStyles_(),this.element_.classList.add(this.CssClasses_.IS_UPGRADED)}},s.register({constructor:p,classAsString:"MaterialSlider",cssClass:"mdl-js-slider",widget:!0});var C=function(e){if(this.element_=e,this.textElement_=this.element_.querySelector("."+this.cssClasses_.MESSAGE),this.actionElement_=this.element_.querySelector("."+this.cssClasses_.ACTION),!this.textElement_)throw new Error("There must be a message element for a snackbar.");if(!this.actionElement_)throw new Error("There must be an action element for a snackbar.");this.active=!1,this.actionHandler_=void 0,this.message_=void 0,this.actionText_=void 0,this.queuedNotifications_=[],this.setActionHidden_(!0)};window.MaterialSnackbar=C,C.prototype.Constant_={ANIMATION_LENGTH:250},C.prototype.cssClasses_={SNACKBAR:"mdl-snackbar",MESSAGE:"mdl-snackbar__text",ACTION:"mdl-snackbar__action",ACTIVE:"mdl-snackbar--active"},C.prototype.displaySnackbar_=function(){this.element_.setAttribute("aria-hidden","true"),this.actionHandler_&&(this.actionElement_.textContent=this.actionText_,
this.actionElement_.addEventListener("click",this.actionHandler_),this.setActionHidden_(!1)),this.textElement_.textContent=this.message_,this.element_.classList.add(this.cssClasses_.ACTIVE),this.element_.setAttribute("aria-hidden","false"),setTimeout(this.cleanup_.bind(this),this.timeout_)},C.prototype.showSnackbar=function(e){if(void 0===e)throw new Error("Please provide a data object with at least a message to display.");if(void 0===e.message)throw new Error("Please provide a message to be displayed.");if(e.actionHandler&&!e.actionText)throw new Error("Please provide action text with the handler.");this.active?this.queuedNotifications_.push(e):(this.active=!0,this.message_=e.message,e.timeout?this.timeout_=e.timeout:this.timeout_=2750,e.actionHandler&&(this.actionHandler_=e.actionHandler),e.actionText&&(this.actionText_=e.actionText),this.displaySnackbar_())},C.prototype.showSnackbar=C.prototype.showSnackbar,C.prototype.checkQueue_=function(){this.queuedNotifications_.length>0&&this.showSnackbar(this.queuedNotifications_.shift())},C.prototype.cleanup_=function(){this.element_.classList.remove(this.cssClasses_.ACTIVE),setTimeout(function(){this.element_.setAttribute("aria-hidden","true"),this.textElement_.textContent="",Boolean(this.actionElement_.getAttribute("aria-hidden"))||(this.setActionHidden_(!0),this.actionElement_.textContent="",this.actionElement_.removeEventListener("click",this.actionHandler_)),this.actionHandler_=void 0,this.message_=void 0,this.actionText_=void 0,this.active=!1,this.checkQueue_()}.bind(this),this.Constant_.ANIMATION_LENGTH)},C.prototype.setActionHidden_=function(e){e?this.actionElement_.setAttribute("aria-hidden","true"):this.actionElement_.removeAttribute("aria-hidden")},s.register({constructor:C,classAsString:"MaterialSnackbar",cssClass:"mdl-js-snackbar",widget:!0});var u=function(e){this.element_=e,this.init()};window.MaterialSpinner=u,u.prototype.Constant_={MDL_SPINNER_LAYER_COUNT:4},u.prototype.CssClasses_={MDL_SPINNER_LAYER:"mdl-spinner__layer",MDL_SPINNER_CIRCLE_CLIPPER:"mdl-spinner__circle-clipper",MDL_SPINNER_CIRCLE:"mdl-spinner__circle",MDL_SPINNER_GAP_PATCH:"mdl-spinner__gap-patch",MDL_SPINNER_LEFT:"mdl-spinner__left",MDL_SPINNER_RIGHT:"mdl-spinner__right"},u.prototype.createLayer=function(e){var t=document.createElement("div");t.classList.add(this.CssClasses_.MDL_SPINNER_LAYER),t.classList.add(this.CssClasses_.MDL_SPINNER_LAYER+"-"+e);var s=document.createElement("div");s.classList.add(this.CssClasses_.MDL_SPINNER_CIRCLE_CLIPPER),s.classList.add(this.CssClasses_.MDL_SPINNER_LEFT);var i=document.createElement("div");i.classList.add(this.CssClasses_.MDL_SPINNER_GAP_PATCH);var n=document.createElement("div");n.classList.add(this.CssClasses_.MDL_SPINNER_CIRCLE_CLIPPER),n.classList.add(this.CssClasses_.MDL_SPINNER_RIGHT);for(var a=[s,i,n],l=0;l<a.length;l++){var o=document.createElement("div");o.classList.add(this.CssClasses_.MDL_SPINNER_CIRCLE),a[l].appendChild(o)}t.appendChild(s),t.appendChild(i),t.appendChild(n),this.element_.appendChild(t)},u.prototype.createLayer=u.prototype.createLayer,u.prototype.stop=function(){this.element_.classList.remove("is-active")},u.prototype.stop=u.prototype.stop,u.prototype.start=function(){this.element_.classList.add("is-active")},u.prototype.start=u.prototype.start,u.prototype.init=function(){if(this.element_){for(var e=1;e<=this.Constant_.MDL_SPINNER_LAYER_COUNT;e++)this.createLayer(e);this.element_.classList.add("is-upgraded")}},s.register({constructor:u,classAsString:"MaterialSpinner",cssClass:"mdl-js-spinner",widget:!0});var E=function(e){this.element_=e,this.init()};window.MaterialSwitch=E,E.prototype.Constant_={TINY_TIMEOUT:.001},E.prototype.CssClasses_={INPUT:"mdl-switch__input",TRACK:"mdl-switch__track",THUMB:"mdl-switch__thumb",FOCUS_HELPER:"mdl-switch__focus-helper",RIPPLE_EFFECT:"mdl-js-ripple-effect",RIPPLE_IGNORE_EVENTS:"mdl-js-ripple-effect--ignore-events",RIPPLE_CONTAINER:"mdl-switch__ripple-container",RIPPLE_CENTER:"mdl-ripple--center",RIPPLE:"mdl-ripple",IS_FOCUSED:"is-focused",IS_DISABLED:"is-disabled",IS_CHECKED:"is-checked"},E.prototype.onChange_=function(e){this.updateClasses_()},E.prototype.onFocus_=function(e){this.element_.classList.add(this.CssClasses_.IS_FOCUSED)},E.prototype.onBlur_=function(e){this.element_.classList.remove(this.CssClasses_.IS_FOCUSED)},E.prototype.onMouseUp_=function(e){this.blur_()},E.prototype.updateClasses_=function(){this.checkDisabled(),this.checkToggleState()},E.prototype.blur_=function(){window.setTimeout(function(){this.inputElement_.blur()}.bind(this),this.Constant_.TINY_TIMEOUT)},E.prototype.checkDisabled=function(){this.inputElement_.disabled?this.element_.classList.add(this.CssClasses_.IS_DISABLED):this.element_.classList.remove(this.CssClasses_.IS_DISABLED)},E.prototype.checkDisabled=E.prototype.checkDisabled,E.prototype.checkToggleState=function(){this.inputElement_.checked?this.element_.classList.add(this.CssClasses_.IS_CHECKED):this.element_.classList.remove(this.CssClasses_.IS_CHECKED)},E.prototype.checkToggleState=E.prototype.checkToggleState,E.prototype.disable=function(){this.inputElement_.disabled=!0,this.updateClasses_()},E.prototype.disable=E.prototype.disable,E.prototype.enable=function(){this.inputElement_.disabled=!1,this.updateClasses_()},E.prototype.enable=E.prototype.enable,E.prototype.on=function(){this.inputElement_.checked=!0,this.updateClasses_()},E.prototype.on=E.prototype.on,E.prototype.off=function(){this.inputElement_.checked=!1,this.updateClasses_()},E.prototype.off=E.prototype.off,E.prototype.init=function(){if(this.element_){this.inputElement_=this.element_.querySelector("."+this.CssClasses_.INPUT);var e=document.createElement("div");e.classList.add(this.CssClasses_.TRACK);var t=document.createElement("div");t.classList.add(this.CssClasses_.THUMB);var s=document.createElement("span");if(s.classList.add(this.CssClasses_.FOCUS_HELPER),t.appendChild(s),this.element_.appendChild(e),this.element_.appendChild(t),this.boundMouseUpHandler=this.onMouseUp_.bind(this),this.element_.classList.contains(this.CssClasses_.RIPPLE_EFFECT)){this.element_.classList.add(this.CssClasses_.RIPPLE_IGNORE_EVENTS),this.rippleContainerElement_=document.createElement("span"),this.rippleContainerElement_.classList.add(this.CssClasses_.RIPPLE_CONTAINER),this.rippleContainerElement_.classList.add(this.CssClasses_.RIPPLE_EFFECT),this.rippleContainerElement_.classList.add(this.CssClasses_.RIPPLE_CENTER),this.rippleContainerElement_.addEventListener("mouseup",this.boundMouseUpHandler);var i=document.createElement("span");i.classList.add(this.CssClasses_.RIPPLE),this.rippleContainerElement_.appendChild(i),this.element_.appendChild(this.rippleContainerElement_)}this.boundChangeHandler=this.onChange_.bind(this),this.boundFocusHandler=this.onFocus_.bind(this),this.boundBlurHandler=this.onBlur_.bind(this),this.inputElement_.addEventListener("change",this.boundChangeHandler),this.inputElement_.addEventListener("focus",this.boundFocusHandler),this.inputElement_.addEventListener("blur",this.boundBlurHandler),this.element_.addEventListener("mouseup",this.boundMouseUpHandler),this.updateClasses_(),this.element_.classList.add("is-upgraded")}},s.register({constructor:E,classAsString:"MaterialSwitch",cssClass:"mdl-js-switch",widget:!0});var m=function(e){this.element_=e,this.init()};window.MaterialTabs=m,m.prototype.Constant_={},m.prototype.CssClasses_={TAB_CLASS:"mdl-tabs__tab",PANEL_CLASS:"mdl-tabs__panel",ACTIVE_CLASS:"is-active",UPGRADED_CLASS:"is-upgraded",MDL_JS_RIPPLE_EFFECT:"mdl-js-ripple-effect",MDL_RIPPLE_CONTAINER:"mdl-tabs__ripple-container",MDL_RIPPLE:"mdl-ripple",MDL_JS_RIPPLE_EFFECT_IGNORE_EVENTS:"mdl-js-ripple-effect--ignore-events"},m.prototype.initTabs_=function(){this.element_.classList.contains(this.CssClasses_.MDL_JS_RIPPLE_EFFECT)&&this.element_.classList.add(this.CssClasses_.MDL_JS_RIPPLE_EFFECT_IGNORE_EVENTS),this.tabs_=this.element_.querySelectorAll("."+this.CssClasses_.TAB_CLASS),this.panels_=this.element_.querySelectorAll("."+this.CssClasses_.PANEL_CLASS);for(var t=0;t<this.tabs_.length;t++)new e(this.tabs_[t],this);this.element_.classList.add(this.CssClasses_.UPGRADED_CLASS)},m.prototype.resetTabState_=function(){for(var e=0;e<this.tabs_.length;e++)this.tabs_[e].classList.remove(this.CssClasses_.ACTIVE_CLASS)},m.prototype.resetPanelState_=function(){for(var e=0;e<this.panels_.length;e++)this.panels_[e].classList.remove(this.CssClasses_.ACTIVE_CLASS)},m.prototype.init=function(){this.element_&&this.initTabs_()},s.register({constructor:m,classAsString:"MaterialTabs",cssClass:"mdl-js-tabs"});var L=function(e){this.element_=e,this.maxRows=this.Constant_.NO_MAX_ROWS,this.init()};window.MaterialTextfield=L,L.prototype.Constant_={NO_MAX_ROWS:-1,MAX_ROWS_ATTRIBUTE:"maxrows"},L.prototype.CssClasses_={LABEL:"mdl-textfield__label",INPUT:"mdl-textfield__input",IS_DIRTY:"is-dirty",IS_FOCUSED:"is-focused",IS_DISABLED:"is-disabled",IS_INVALID:"is-invalid",IS_UPGRADED:"is-upgraded",HAS_PLACEHOLDER:"has-placeholder"},L.prototype.onKeyDown_=function(e){var t=e.target.value.split("\n").length;13===e.keyCode&&t>=this.maxRows&&e.preventDefault()},L.prototype.onFocus_=function(e){this.element_.classList.add(this.CssClasses_.IS_FOCUSED)},L.prototype.onBlur_=function(e){this.element_.classList.remove(this.CssClasses_.IS_FOCUSED)},L.prototype.onReset_=function(e){this.updateClasses_()},L.prototype.updateClasses_=function(){this.checkDisabled(),this.checkValidity(),this.checkDirty(),this.checkFocus()},L.prototype.checkDisabled=function(){this.input_.disabled?this.element_.classList.add(this.CssClasses_.IS_DISABLED):this.element_.classList.remove(this.CssClasses_.IS_DISABLED)},L.prototype.checkDisabled=L.prototype.checkDisabled,L.prototype.checkFocus=function(){Boolean(this.element_.querySelector(":focus"))?this.element_.classList.add(this.CssClasses_.IS_FOCUSED):this.element_.classList.remove(this.CssClasses_.IS_FOCUSED)},L.prototype.checkFocus=L.prototype.checkFocus,L.prototype.checkValidity=function(){this.input_.validity&&(this.input_.validity.valid?this.element_.classList.remove(this.CssClasses_.IS_INVALID):this.element_.classList.add(this.CssClasses_.IS_INVALID))},L.prototype.checkValidity=L.prototype.checkValidity,L.prototype.checkDirty=function(){this.input_.value&&this.input_.value.length>0?this.element_.classList.add(this.CssClasses_.IS_DIRTY):this.element_.classList.remove(this.CssClasses_.IS_DIRTY)},L.prototype.checkDirty=L.prototype.checkDirty,L.prototype.disable=function(){this.input_.disabled=!0,this.updateClasses_()},L.prototype.disable=L.prototype.disable,L.prototype.enable=function(){this.input_.disabled=!1,this.updateClasses_()},L.prototype.enable=L.prototype.enable,L.prototype.change=function(e){this.input_.value=e||"",this.updateClasses_()},L.prototype.change=L.prototype.change,L.prototype.init=function(){if(this.element_&&(this.label_=this.element_.querySelector("."+this.CssClasses_.LABEL),this.input_=this.element_.querySelector("."+this.CssClasses_.INPUT),this.input_)){this.input_.hasAttribute(this.Constant_.MAX_ROWS_ATTRIBUTE)&&(this.maxRows=parseInt(this.input_.getAttribute(this.Constant_.MAX_ROWS_ATTRIBUTE),10),isNaN(this.maxRows)&&(this.maxRows=this.Constant_.NO_MAX_ROWS)),this.input_.hasAttribute("placeholder")&&this.element_.classList.add(this.CssClasses_.HAS_PLACEHOLDER),this.boundUpdateClassesHandler=this.updateClasses_.bind(this),this.boundFocusHandler=this.onFocus_.bind(this),this.boundBlurHandler=this.onBlur_.bind(this),this.boundResetHandler=this.onReset_.bind(this),this.input_.addEventListener("input",this.boundUpdateClassesHandler),this.input_.addEventListener("focus",this.boundFocusHandler),this.input_.addEventListener("blur",this.boundBlurHandler),this.input_.addEventListener("reset",this.boundResetHandler),this.maxRows!==this.Constant_.NO_MAX_ROWS&&(this.boundKeyDownHandler=this.onKeyDown_.bind(this),this.input_.addEventListener("keydown",this.boundKeyDownHandler));var e=this.element_.classList.contains(this.CssClasses_.IS_INVALID);this.updateClasses_(),this.element_.classList.add(this.CssClasses_.IS_UPGRADED),e&&this.element_.classList.add(this.CssClasses_.IS_INVALID),this.input_.hasAttribute("autofocus")&&(this.element_.focus(),this.checkFocus())}},s.register({constructor:L,classAsString:"MaterialTextfield",cssClass:"mdl-js-textfield",widget:!0});var I=function(e){this.element_=e,this.init()};window.MaterialTooltip=I,I.prototype.Constant_={},I.prototype.CssClasses_={IS_ACTIVE:"is-active",BOTTOM:"mdl-tooltip--bottom",LEFT:"mdl-tooltip--left",RIGHT:"mdl-tooltip--right",TOP:"mdl-tooltip--top"},I.prototype.handleMouseEnter_=function(e){var t=e.target.getBoundingClientRect(),s=t.left+t.width/2,i=t.top+t.height/2,n=-1*(this.element_.offsetWidth/2),a=-1*(this.element_.offsetHeight/2);this.element_.classList.contains(this.CssClasses_.LEFT)||this.element_.classList.contains(this.CssClasses_.RIGHT)?(s=t.width/2,i+a<0?(this.element_.style.top="0",this.element_.style.marginTop="0"):(this.element_.style.top=i+"px",this.element_.style.marginTop=a+"px")):s+n<0?(this.element_.style.left="0",this.element_.style.marginLeft="0"):(this.element_.style.left=s+"px",this.element_.style.marginLeft=n+"px"),this.element_.classList.contains(this.CssClasses_.TOP)?this.element_.style.top=t.top-this.element_.offsetHeight-10+"px":this.element_.classList.contains(this.CssClasses_.RIGHT)?this.element_.style.left=t.left+t.width+10+"px":this.element_.classList.contains(this.CssClasses_.LEFT)?this.element_.style.left=t.left-this.element_.offsetWidth-10+"px":this.element_.style.top=t.top+t.height+10+"px",this.element_.classList.add(this.CssClasses_.IS_ACTIVE)},I.prototype.hideTooltip_=function(){this.element_.classList.remove(this.CssClasses_.IS_ACTIVE)},I.prototype.init=function(){if(this.element_){var e=this.element_.getAttribute("for")||this.element_.getAttribute("data-mdl-for");e&&(this.forElement_=document.getElementById(e)),this.forElement_&&(this.forElement_.hasAttribute("tabindex")||this.forElement_.setAttribute("tabindex","0"),this.boundMouseEnterHandler=this.handleMouseEnter_.bind(this),this.boundMouseLeaveAndScrollHandler=this.hideTooltip_.bind(this),this.forElement_.addEventListener("mouseenter",this.boundMouseEnterHandler,!1),this.forElement_.addEventListener("touchend",this.boundMouseEnterHandler,!1),this.forElement_.addEventListener("mouseleave",this.boundMouseLeaveAndScrollHandler,!1),window.addEventListener("scroll",this.boundMouseLeaveAndScrollHandler,!0),window.addEventListener("touchstart",this.boundMouseLeaveAndScrollHandler))}},s.register({constructor:I,classAsString:"MaterialTooltip",cssClass:"mdl-tooltip"});var f=function(e){this.element_=e,this.init()};window.MaterialLayout=f,f.prototype.Constant_={MAX_WIDTH:"(max-width: 1024px)",TAB_SCROLL_PIXELS:100,RESIZE_TIMEOUT:100,MENU_ICON:"&#xE5D2;",CHEVRON_LEFT:"chevron_left",CHEVRON_RIGHT:"chevron_right"},f.prototype.Keycodes_={ENTER:13,ESCAPE:27,SPACE:32},f.prototype.Mode_={STANDARD:0,SEAMED:1,WATERFALL:2,SCROLL:3},f.prototype.CssClasses_={CONTAINER:"mdl-layout__container",HEADER:"mdl-layout__header",DRAWER:"mdl-layout__drawer",CONTENT:"mdl-layout__content",DRAWER_BTN:"mdl-layout__drawer-button",ICON:"material-icons",JS_RIPPLE_EFFECT:"mdl-js-ripple-effect",RIPPLE_CONTAINER:"mdl-layout__tab-ripple-container",RIPPLE:"mdl-ripple",RIPPLE_IGNORE_EVENTS:"mdl-js-ripple-effect--ignore-events",HEADER_SEAMED:"mdl-layout__header--seamed",HEADER_WATERFALL:"mdl-layout__header--waterfall",HEADER_SCROLL:"mdl-layout__header--scroll",FIXED_HEADER:"mdl-layout--fixed-header",OBFUSCATOR:"mdl-layout__obfuscator",TAB_BAR:"mdl-layout__tab-bar",TAB_CONTAINER:"mdl-layout__tab-bar-container",TAB:"mdl-layout__tab",TAB_BAR_BUTTON:"mdl-layout__tab-bar-button",TAB_BAR_LEFT_BUTTON:"mdl-layout__tab-bar-left-button",TAB_BAR_RIGHT_BUTTON:"mdl-layout__tab-bar-right-button",PANEL:"mdl-layout__tab-panel",HAS_DRAWER:"has-drawer",HAS_TABS:"has-tabs",HAS_SCROLLING_HEADER:"has-scrolling-header",CASTING_SHADOW:"is-casting-shadow",IS_COMPACT:"is-compact",IS_SMALL_SCREEN:"is-small-screen",IS_DRAWER_OPEN:"is-visible",IS_ACTIVE:"is-active",IS_UPGRADED:"is-upgraded",IS_ANIMATING:"is-animating",ON_LARGE_SCREEN:"mdl-layout--large-screen-only",ON_SMALL_SCREEN:"mdl-layout--small-screen-only"},f.prototype.contentScrollHandler_=function(){if(!this.header_.classList.contains(this.CssClasses_.IS_ANIMATING)){var e=!this.element_.classList.contains(this.CssClasses_.IS_SMALL_SCREEN)||this.element_.classList.contains(this.CssClasses_.FIXED_HEADER);this.content_.scrollTop>0&&!this.header_.classList.contains(this.CssClasses_.IS_COMPACT)?(this.header_.classList.add(this.CssClasses_.CASTING_SHADOW),this.header_.classList.add(this.CssClasses_.IS_COMPACT),e&&this.header_.classList.add(this.CssClasses_.IS_ANIMATING)):this.content_.scrollTop<=0&&this.header_.classList.contains(this.CssClasses_.IS_COMPACT)&&(this.header_.classList.remove(this.CssClasses_.CASTING_SHADOW),this.header_.classList.remove(this.CssClasses_.IS_COMPACT),e&&this.header_.classList.add(this.CssClasses_.IS_ANIMATING))}},f.prototype.keyboardEventHandler_=function(e){e.keyCode===this.Keycodes_.ESCAPE&&this.drawer_.classList.contains(this.CssClasses_.IS_DRAWER_OPEN)&&this.toggleDrawer()},f.prototype.screenSizeHandler_=function(){this.screenSizeMediaQuery_.matches?this.element_.classList.add(this.CssClasses_.IS_SMALL_SCREEN):(this.element_.classList.remove(this.CssClasses_.IS_SMALL_SCREEN),this.drawer_&&(this.drawer_.classList.remove(this.CssClasses_.IS_DRAWER_OPEN),this.obfuscator_.classList.remove(this.CssClasses_.IS_DRAWER_OPEN)))},f.prototype.drawerToggleHandler_=function(e){if(e&&"keydown"===e.type){if(e.keyCode!==this.Keycodes_.SPACE&&e.keyCode!==this.Keycodes_.ENTER)return;e.preventDefault()}this.toggleDrawer()},f.prototype.headerTransitionEndHandler_=function(){this.header_.classList.remove(this.CssClasses_.IS_ANIMATING)},f.prototype.headerClickHandler_=function(){this.header_.classList.contains(this.CssClasses_.IS_COMPACT)&&(this.header_.classList.remove(this.CssClasses_.IS_COMPACT),this.header_.classList.add(this.CssClasses_.IS_ANIMATING))},f.prototype.resetTabState_=function(e){for(var t=0;t<e.length;t++)e[t].classList.remove(this.CssClasses_.IS_ACTIVE)},f.prototype.resetPanelState_=function(e){for(var t=0;t<e.length;t++)e[t].classList.remove(this.CssClasses_.IS_ACTIVE)},f.prototype.toggleDrawer=function(){var e=this.element_.querySelector("."+this.CssClasses_.DRAWER_BTN);this.drawer_.classList.toggle(this.CssClasses_.IS_DRAWER_OPEN),this.obfuscator_.classList.toggle(this.CssClasses_.IS_DRAWER_OPEN),this.drawer_.classList.contains(this.CssClasses_.IS_DRAWER_OPEN)?(this.drawer_.setAttribute("aria-hidden","false"),e.setAttribute("aria-expanded","true")):(this.drawer_.setAttribute("aria-hidden","true"),e.setAttribute("aria-expanded","false"))},f.prototype.toggleDrawer=f.prototype.toggleDrawer,f.prototype.init=function(){if(this.element_){var e=document.createElement("div");e.classList.add(this.CssClasses_.CONTAINER);var s=this.element_.querySelector(":focus");this.element_.parentElement.insertBefore(e,this.element_),this.element_.parentElement.removeChild(this.element_),e.appendChild(this.element_),s&&s.focus();for(var i=this.element_.childNodes,n=i.length,a=0;a<n;a++){var l=i[a];l.classList&&l.classList.contains(this.CssClasses_.HEADER)&&(this.header_=l),l.classList&&l.classList.contains(this.CssClasses_.DRAWER)&&(this.drawer_=l),l.classList&&l.classList.contains(this.CssClasses_.CONTENT)&&(this.content_=l)}window.addEventListener("pageshow",function(e){e.persisted&&(this.element_.style.overflowY="hidden",requestAnimationFrame(function(){this.element_.style.overflowY=""}.bind(this)))}.bind(this),!1),this.header_&&(this.tabBar_=this.header_.querySelector("."+this.CssClasses_.TAB_BAR));var o=this.Mode_.STANDARD;if(this.header_&&(this.header_.classList.contains(this.CssClasses_.HEADER_SEAMED)?o=this.Mode_.SEAMED:this.header_.classList.contains(this.CssClasses_.HEADER_WATERFALL)?(o=this.Mode_.WATERFALL,this.header_.addEventListener("transitionend",this.headerTransitionEndHandler_.bind(this)),this.header_.addEventListener("click",this.headerClickHandler_.bind(this))):this.header_.classList.contains(this.CssClasses_.HEADER_SCROLL)&&(o=this.Mode_.SCROLL,e.classList.add(this.CssClasses_.HAS_SCROLLING_HEADER)),o===this.Mode_.STANDARD?(this.header_.classList.add(this.CssClasses_.CASTING_SHADOW),this.tabBar_&&this.tabBar_.classList.add(this.CssClasses_.CASTING_SHADOW)):o===this.Mode_.SEAMED||o===this.Mode_.SCROLL?(this.header_.classList.remove(this.CssClasses_.CASTING_SHADOW),this.tabBar_&&this.tabBar_.classList.remove(this.CssClasses_.CASTING_SHADOW)):o===this.Mode_.WATERFALL&&(this.content_.addEventListener("scroll",this.contentScrollHandler_.bind(this)),this.contentScrollHandler_())),this.drawer_){var r=this.element_.querySelector("."+this.CssClasses_.DRAWER_BTN);if(!r){r=document.createElement("div"),r.setAttribute("aria-expanded","false"),r.setAttribute("role","button"),r.setAttribute("tabindex","0"),r.classList.add(this.CssClasses_.DRAWER_BTN);var _=document.createElement("i");_.classList.add(this.CssClasses_.ICON),_.innerHTML=this.Constant_.MENU_ICON,r.appendChild(_)}this.drawer_.classList.contains(this.CssClasses_.ON_LARGE_SCREEN)?r.classList.add(this.CssClasses_.ON_LARGE_SCREEN):this.drawer_.classList.contains(this.CssClasses_.ON_SMALL_SCREEN)&&r.classList.add(this.CssClasses_.ON_SMALL_SCREEN),r.addEventListener("click",this.drawerToggleHandler_.bind(this)),r.addEventListener("keydown",this.drawerToggleHandler_.bind(this)),this.element_.classList.add(this.CssClasses_.HAS_DRAWER),this.element_.classList.contains(this.CssClasses_.FIXED_HEADER)?this.header_.insertBefore(r,this.header_.firstChild):this.element_.insertBefore(r,this.content_);var d=document.createElement("div");d.classList.add(this.CssClasses_.OBFUSCATOR),this.element_.appendChild(d),d.addEventListener("click",this.drawerToggleHandler_.bind(this)),this.obfuscator_=d,this.drawer_.addEventListener("keydown",this.keyboardEventHandler_.bind(this)),this.drawer_.setAttribute("aria-hidden","true")}if(this.screenSizeMediaQuery_=window.matchMedia(this.Constant_.MAX_WIDTH),this.screenSizeMediaQuery_.addListener(this.screenSizeHandler_.bind(this)),this.screenSizeHandler_(),this.header_&&this.tabBar_){this.element_.classList.add(this.CssClasses_.HAS_TABS);var h=document.createElement("div");h.classList.add(this.CssClasses_.TAB_CONTAINER),this.header_.insertBefore(h,this.tabBar_),this.header_.removeChild(this.tabBar_);var c=document.createElement("div");c.classList.add(this.CssClasses_.TAB_BAR_BUTTON),c.classList.add(this.CssClasses_.TAB_BAR_LEFT_BUTTON);var p=document.createElement("i");p.classList.add(this.CssClasses_.ICON),p.textContent=this.Constant_.CHEVRON_LEFT,c.appendChild(p),c.addEventListener("click",function(){this.tabBar_.scrollLeft-=this.Constant_.TAB_SCROLL_PIXELS}.bind(this));var C=document.createElement("div");C.classList.add(this.CssClasses_.TAB_BAR_BUTTON),C.classList.add(this.CssClasses_.TAB_BAR_RIGHT_BUTTON);var u=document.createElement("i");u.classList.add(this.CssClasses_.ICON),u.textContent=this.Constant_.CHEVRON_RIGHT,C.appendChild(u),C.addEventListener("click",function(){this.tabBar_.scrollLeft+=this.Constant_.TAB_SCROLL_PIXELS}.bind(this)),h.appendChild(c),h.appendChild(this.tabBar_),h.appendChild(C);var E=function(){this.tabBar_.scrollLeft>0?c.classList.add(this.CssClasses_.IS_ACTIVE):c.classList.remove(this.CssClasses_.IS_ACTIVE),this.tabBar_.scrollLeft<this.tabBar_.scrollWidth-this.tabBar_.offsetWidth?C.classList.add(this.CssClasses_.IS_ACTIVE):C.classList.remove(this.CssClasses_.IS_ACTIVE)}.bind(this);this.tabBar_.addEventListener("scroll",E),E();var m=function(){this.resizeTimeoutId_&&clearTimeout(this.resizeTimeoutId_),this.resizeTimeoutId_=setTimeout(function(){E(),this.resizeTimeoutId_=null}.bind(this),this.Constant_.RESIZE_TIMEOUT)}.bind(this);window.addEventListener("resize",m),this.tabBar_.classList.contains(this.CssClasses_.JS_RIPPLE_EFFECT)&&this.tabBar_.classList.add(this.CssClasses_.RIPPLE_IGNORE_EVENTS);for(var L=this.tabBar_.querySelectorAll("."+this.CssClasses_.TAB),I=this.content_.querySelectorAll("."+this.CssClasses_.PANEL),f=0;f<L.length;f++)new t(L[f],L,I,this)}this.element_.classList.add(this.CssClasses_.IS_UPGRADED)}},window.MaterialLayoutTab=t,s.register({constructor:f,classAsString:"MaterialLayout",cssClass:"mdl-js-layout"});var b=function(e){this.element_=e,this.init()};window.MaterialDataTable=b,b.prototype.Constant_={},b.prototype.CssClasses_={DATA_TABLE:"mdl-data-table",SELECTABLE:"mdl-data-table--selectable",SELECT_ELEMENT:"mdl-data-table__select",IS_SELECTED:"is-selected",IS_UPGRADED:"is-upgraded"},b.prototype.selectRow_=function(e,t,s){return t?function(){e.checked?t.classList.add(this.CssClasses_.IS_SELECTED):t.classList.remove(this.CssClasses_.IS_SELECTED)}.bind(this):s?function(){var t,i;if(e.checked)for(t=0;t<s.length;t++)i=s[t].querySelector("td").querySelector(".mdl-checkbox"),i.MaterialCheckbox.check(),s[t].classList.add(this.CssClasses_.IS_SELECTED);else for(t=0;t<s.length;t++)i=s[t].querySelector("td").querySelector(".mdl-checkbox"),i.MaterialCheckbox.uncheck(),s[t].classList.remove(this.CssClasses_.IS_SELECTED)}.bind(this):void 0},b.prototype.createCheckbox_=function(e,t){var i=document.createElement("label"),n=["mdl-checkbox","mdl-js-checkbox","mdl-js-ripple-effect",this.CssClasses_.SELECT_ELEMENT];i.className=n.join(" ");var a=document.createElement("input");return a.type="checkbox",a.classList.add("mdl-checkbox__input"),e?(a.checked=e.classList.contains(this.CssClasses_.IS_SELECTED),a.addEventListener("change",this.selectRow_(a,e))):t&&a.addEventListener("change",this.selectRow_(a,null,t)),i.appendChild(a),s.upgradeElement(i,"MaterialCheckbox"),i},b.prototype.init=function(){if(this.element_){var e=this.element_.querySelector("th"),t=Array.prototype.slice.call(this.element_.querySelectorAll("tbody tr")),s=Array.prototype.slice.call(this.element_.querySelectorAll("tfoot tr")),i=t.concat(s);if(this.element_.classList.contains(this.CssClasses_.SELECTABLE)){var n=document.createElement("th"),a=this.createCheckbox_(null,i);n.appendChild(a),e.parentElement.insertBefore(n,e);for(var l=0;l<i.length;l++){var o=i[l].querySelector("td");if(o){var r=document.createElement("td");if("TBODY"===i[l].parentNode.nodeName.toUpperCase()){var _=this.createCheckbox_(i[l]);r.appendChild(_)}i[l].insertBefore(r,o)}}this.element_.classList.add(this.CssClasses_.IS_UPGRADED)}}},s.register({constructor:b,classAsString:"MaterialDataTable",cssClass:"mdl-js-data-table"});var y=function(e){this.element_=e,this.init()};window.MaterialRipple=y,y.prototype.Constant_={INITIAL_SCALE:"scale(0.0001, 0.0001)",INITIAL_SIZE:"1px",INITIAL_OPACITY:"0.4",FINAL_OPACITY:"0",FINAL_SCALE:""},y.prototype.CssClasses_={RIPPLE_CENTER:"mdl-ripple--center",RIPPLE_EFFECT_IGNORE_EVENTS:"mdl-js-ripple-effect--ignore-events",RIPPLE:"mdl-ripple",IS_ANIMATING:"is-animating",IS_VISIBLE:"is-visible"},y.prototype.downHandler_=function(e){if(!this.rippleElement_.style.width&&!this.rippleElement_.style.height){var t=this.element_.getBoundingClientRect();this.boundHeight=t.height,this.boundWidth=t.width,this.rippleSize_=2*Math.sqrt(t.width*t.width+t.height*t.height)+2,this.rippleElement_.style.width=this.rippleSize_+"px",this.rippleElement_.style.height=this.rippleSize_+"px"}if(this.rippleElement_.classList.add(this.CssClasses_.IS_VISIBLE),"mousedown"===e.type&&this.ignoringMouseDown_)this.ignoringMouseDown_=!1;else{"touchstart"===e.type&&(this.ignoringMouseDown_=!0);var s=this.getFrameCount();if(s>0)return;this.setFrameCount(1);var i,n,a=e.currentTarget.getBoundingClientRect();if(0===e.clientX&&0===e.clientY)i=Math.round(a.width/2),n=Math.round(a.height/2);else{var l=e.clientX?e.clientX:e.touches[0].clientX,o=e.clientY?e.clientY:e.touches[0].clientY;i=Math.round(l-a.left),n=Math.round(o-a.top)}this.setRippleXY(i,n),this.setRippleStyles(!0),window.requestAnimationFrame(this.animFrameHandler.bind(this))}},y.prototype.upHandler_=function(e){e&&2!==e.detail&&window.setTimeout(function(){this.rippleElement_.classList.remove(this.CssClasses_.IS_VISIBLE)}.bind(this),0)},y.prototype.init=function(){if(this.element_){var e=this.element_.classList.contains(this.CssClasses_.RIPPLE_CENTER);this.element_.classList.contains(this.CssClasses_.RIPPLE_EFFECT_IGNORE_EVENTS)||(this.rippleElement_=this.element_.querySelector("."+this.CssClasses_.RIPPLE),this.frameCount_=0,this.rippleSize_=0,this.x_=0,this.y_=0,this.ignoringMouseDown_=!1,this.boundDownHandler=this.downHandler_.bind(this),this.element_.addEventListener("mousedown",this.boundDownHandler),this.element_.addEventListener("touchstart",this.boundDownHandler),this.boundUpHandler=this.upHandler_.bind(this),this.element_.addEventListener("mouseup",this.boundUpHandler),this.element_.addEventListener("mouseleave",this.boundUpHandler),this.element_.addEventListener("touchend",this.boundUpHandler),this.element_.addEventListener("blur",this.boundUpHandler),this.getFrameCount=function(){return this.frameCount_},this.setFrameCount=function(e){this.frameCount_=e},this.getRippleElement=function(){return this.rippleElement_},this.setRippleXY=function(e,t){this.x_=e,this.y_=t},this.setRippleStyles=function(t){if(null!==this.rippleElement_){var s,i,n,a="translate("+this.x_+"px, "+this.y_+"px)";t?(i=this.Constant_.INITIAL_SCALE,n=this.Constant_.INITIAL_SIZE):(i=this.Constant_.FINAL_SCALE,n=this.rippleSize_+"px",e&&(a="translate("+this.boundWidth/2+"px, "+this.boundHeight/2+"px)")),s="translate(-50%, -50%) "+a+i,this.rippleElement_.style.webkitTransform=s,this.rippleElement_.style.msTransform=s,this.rippleElement_.style.transform=s,t?this.rippleElement_.classList.remove(this.CssClasses_.IS_ANIMATING):this.rippleElement_.classList.add(this.CssClasses_.IS_ANIMATING)}},this.animFrameHandler=function(){this.frameCount_-- >0?window.requestAnimationFrame(this.animFrameHandler.bind(this)):this.setRippleStyles(!1)})}},s.register({constructor:y,classAsString:"MaterialRipple",cssClass:"mdl-js-ripple-effect",widget:!1})}();


},{}],18:[function(require,module,exports){
/*!
 * Tap listener v2.0.0
 * listens to taps
 * MIT license
 */

/*jshint browser: true, unused: true, undef: true, strict: true */

( function( window, factory ) {
  // universal module definition
  /*jshint strict: false*/ /*globals define, module, require */

  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
      'unipointer/unipointer'
    ], function( Unipointer ) {
      return factory( window, Unipointer );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('unipointer')
    );
  } else {
    // browser global
    window.TapListener = factory(
      window,
      window.Unipointer
    );
  }

}( window, function factory( window, Unipointer ) {

'use strict';

// --------------------------  TapListener -------------------------- //

function TapListener( elem ) {
  this.bindTap( elem );
}

// inherit Unipointer & EventEmitter
var proto = TapListener.prototype = Object.create( Unipointer.prototype );

/**
 * bind tap event to element
 * @param {Element} elem
 */
proto.bindTap = function( elem ) {
  if ( !elem ) {
    return;
  }
  this.unbindTap();
  this.tapElement = elem;
  this._bindStartEvent( elem, true );
};

proto.unbindTap = function() {
  if ( !this.tapElement ) {
    return;
  }
  this._bindStartEvent( this.tapElement, true );
  delete this.tapElement;
};

/**
 * pointer up
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.pointerUp = function( event, pointer ) {
  // ignore emulated mouse up clicks
  if ( this.isIgnoringMouseUp && event.type == 'mouseup' ) {
    return;
  }

  var pointerPoint = Unipointer.getPointerPoint( pointer );
  var boundingRect = this.tapElement.getBoundingClientRect();
  var scrollX = window.pageXOffset;
  var scrollY = window.pageYOffset;
  // calculate if pointer is inside tapElement
  var isInside = pointerPoint.x >= boundingRect.left + scrollX &&
    pointerPoint.x <= boundingRect.right + scrollX &&
    pointerPoint.y >= boundingRect.top + scrollY &&
    pointerPoint.y <= boundingRect.bottom + scrollY;
  // trigger callback if pointer is inside element
  if ( isInside ) {
    this.emitEvent( 'tap', [ event, pointer ] );
  }

  // set flag for emulated clicks 300ms after touchend
  if ( event.type != 'mouseup' ) {
    this.isIgnoringMouseUp = true;
    // reset flag after 300ms
    var _this = this;
    setTimeout( function() {
      delete _this.isIgnoringMouseUp;
    }, 400 );
  }
};

proto.destroy = function() {
  this.pointerDone();
  this.unbindTap();
};

// -----  ----- //

return TapListener;

}));

},{"unipointer":20}],19:[function(require,module,exports){
/*!
 * Unidragger v2.1.0
 * Draggable base class
 * MIT license
 */

/*jshint browser: true, unused: true, undef: true, strict: true */

( function( window, factory ) {
  // universal module definition
  /*jshint strict: false */ /*globals define, module, require */

  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
      'unipointer/unipointer'
    ], function( Unipointer ) {
      return factory( window, Unipointer );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('unipointer')
    );
  } else {
    // browser global
    window.Unidragger = factory(
      window,
      window.Unipointer
    );
  }

}( window, function factory( window, Unipointer ) {

'use strict';

// -----  ----- //

function noop() {}

// -------------------------- Unidragger -------------------------- //

function Unidragger() {}

// inherit Unipointer & EvEmitter
var proto = Unidragger.prototype = Object.create( Unipointer.prototype );

// ----- bind start ----- //

proto.bindHandles = function() {
  this._bindHandles( true );
};

proto.unbindHandles = function() {
  this._bindHandles( false );
};

var navigator = window.navigator;
/**
 * works as unbinder, as you can .bindHandles( false ) to unbind
 * @param {Boolean} isBind - will unbind if falsey
 */
proto._bindHandles = function( isBind ) {
  // munge isBind, default to true
  isBind = isBind === undefined ? true : !!isBind;
  // extra bind logic
  var binderExtra;
  if ( navigator.pointerEnabled ) {
    binderExtra = function( handle ) {
      // disable scrolling on the element
      handle.style.touchAction = isBind ? 'none' : '';
    };
  } else if ( navigator.msPointerEnabled ) {
    binderExtra = function( handle ) {
      // disable scrolling on the element
      handle.style.msTouchAction = isBind ? 'none' : '';
    };
  } else {
    binderExtra = noop;
  }
  // bind each handle
  var bindMethod = isBind ? 'addEventListener' : 'removeEventListener';
  for ( var i=0; i < this.handles.length; i++ ) {
    var handle = this.handles[i];
    this._bindStartEvent( handle, isBind );
    binderExtra( handle );
    handle[ bindMethod ]( 'click', this );
  }
};

// ----- start event ----- //

/**
 * pointer start
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.pointerDown = function( event, pointer ) {
  // dismiss range sliders
  if ( event.target.nodeName == 'INPUT' && event.target.type == 'range' ) {
    // reset pointerDown logic
    this.isPointerDown = false;
    delete this.pointerIdentifier;
    return;
  }

  this._dragPointerDown( event, pointer );
  // kludge to blur focused inputs in dragger
  var focused = document.activeElement;
  if ( focused && focused.blur ) {
    focused.blur();
  }
  // bind move and end events
  this._bindPostStartEvents( event );
  this.emitEvent( 'pointerDown', [ event, pointer ] );
};

// base pointer down logic
proto._dragPointerDown = function( event, pointer ) {
  // track to see when dragging starts
  this.pointerDownPoint = Unipointer.getPointerPoint( pointer );

  var canPreventDefault = this.canPreventDefaultOnPointerDown( event, pointer );
  if ( canPreventDefault ) {
    event.preventDefault();
  }
};

// overwriteable method so Flickity can prevent for scrolling
proto.canPreventDefaultOnPointerDown = function( event ) {
  // prevent default, unless touchstart or <select>
  return event.target.nodeName != 'SELECT';
};

// ----- move event ----- //

/**
 * drag move
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.pointerMove = function( event, pointer ) {
  var moveVector = this._dragPointerMove( event, pointer );
  this.emitEvent( 'pointerMove', [ event, pointer, moveVector ] );
  this._dragMove( event, pointer, moveVector );
};

// base pointer move logic
proto._dragPointerMove = function( event, pointer ) {
  var movePoint = Unipointer.getPointerPoint( pointer );
  var moveVector = {
    x: movePoint.x - this.pointerDownPoint.x,
    y: movePoint.y - this.pointerDownPoint.y
  };
  // start drag if pointer has moved far enough to start drag
  if ( !this.isDragging && this.hasDragStarted( moveVector ) ) {
    this._dragStart( event, pointer );
  }
  return moveVector;
};

// condition if pointer has moved far enough to start drag
proto.hasDragStarted = function( moveVector ) {
  return Math.abs( moveVector.x ) > 3 || Math.abs( moveVector.y ) > 3;
};


// ----- end event ----- //

/**
 * pointer up
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.pointerUp = function( event, pointer ) {
  this.emitEvent( 'pointerUp', [ event, pointer ] );
  this._dragPointerUp( event, pointer );
};

proto._dragPointerUp = function( event, pointer ) {
  if ( this.isDragging ) {
    this._dragEnd( event, pointer );
  } else {
    // pointer didn't move enough for drag to start
    this._staticClick( event, pointer );
  }
};

// -------------------------- drag -------------------------- //

// dragStart
proto._dragStart = function( event, pointer ) {
  this.isDragging = true;
  this.dragStartPoint = Unipointer.getPointerPoint( pointer );
  // prevent clicks
  this.isPreventingClicks = true;

  this.dragStart( event, pointer );
};

proto.dragStart = function( event, pointer ) {
  this.emitEvent( 'dragStart', [ event, pointer ] );
};

// dragMove
proto._dragMove = function( event, pointer, moveVector ) {
  // do not drag if not dragging yet
  if ( !this.isDragging ) {
    return;
  }

  this.dragMove( event, pointer, moveVector );
};

proto.dragMove = function( event, pointer, moveVector ) {
  event.preventDefault();
  this.emitEvent( 'dragMove', [ event, pointer, moveVector ] );
};

// dragEnd
proto._dragEnd = function( event, pointer ) {
  // set flags
  this.isDragging = false;
  // re-enable clicking async
  setTimeout( function() {
    delete this.isPreventingClicks;
  }.bind( this ) );

  this.dragEnd( event, pointer );
};

proto.dragEnd = function( event, pointer ) {
  this.emitEvent( 'dragEnd', [ event, pointer ] );
};

// ----- onclick ----- //

// handle all clicks and prevent clicks when dragging
proto.onclick = function( event ) {
  if ( this.isPreventingClicks ) {
    event.preventDefault();
  }
};

// ----- staticClick ----- //

// triggered after pointer down & up with no/tiny movement
proto._staticClick = function( event, pointer ) {
  // ignore emulated mouse up clicks
  if ( this.isIgnoringMouseUp && event.type == 'mouseup' ) {
    return;
  }

  // allow click in <input>s and <textarea>s
  var nodeName = event.target.nodeName;
  if ( nodeName == 'INPUT' || nodeName == 'TEXTAREA' ) {
    event.target.focus();
  }
  this.staticClick( event, pointer );

  // set flag for emulated clicks 300ms after touchend
  if ( event.type != 'mouseup' ) {
    this.isIgnoringMouseUp = true;
    // reset flag after 300ms
    setTimeout( function() {
      delete this.isIgnoringMouseUp;
    }.bind( this ), 400 );
  }
};

proto.staticClick = function( event, pointer ) {
  this.emitEvent( 'staticClick', [ event, pointer ] );
};

// ----- utils ----- //

Unidragger.getPointerPoint = Unipointer.getPointerPoint;

// -----  ----- //

return Unidragger;

}));

},{"unipointer":20}],20:[function(require,module,exports){
/*!
 * Unipointer v2.1.0
 * base class for doing one thing with pointer event
 * MIT license
 */

/*jshint browser: true, undef: true, unused: true, strict: true */

( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */ /*global define, module, require */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
      'ev-emitter/ev-emitter'
    ], function( EvEmitter ) {
      return factory( window, EvEmitter );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('ev-emitter')
    );
  } else {
    // browser global
    window.Unipointer = factory(
      window,
      window.EvEmitter
    );
  }

}( window, function factory( window, EvEmitter ) {

'use strict';

function noop() {}

function Unipointer() {}

// inherit EvEmitter
var proto = Unipointer.prototype = Object.create( EvEmitter.prototype );

proto.bindStartEvent = function( elem ) {
  this._bindStartEvent( elem, true );
};

proto.unbindStartEvent = function( elem ) {
  this._bindStartEvent( elem, false );
};

/**
 * works as unbinder, as you can ._bindStart( false ) to unbind
 * @param {Boolean} isBind - will unbind if falsey
 */
proto._bindStartEvent = function( elem, isBind ) {
  // munge isBind, default to true
  isBind = isBind === undefined ? true : !!isBind;
  var bindMethod = isBind ? 'addEventListener' : 'removeEventListener';

  if ( window.navigator.pointerEnabled ) {
    // W3C Pointer Events, IE11. See https://coderwall.com/p/mfreca
    elem[ bindMethod ]( 'pointerdown', this );
  } else if ( window.navigator.msPointerEnabled ) {
    // IE10 Pointer Events
    elem[ bindMethod ]( 'MSPointerDown', this );
  } else {
    // listen for both, for devices like Chrome Pixel
    elem[ bindMethod ]( 'mousedown', this );
    elem[ bindMethod ]( 'touchstart', this );
  }
};

// trigger handler methods for events
proto.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

// returns the touch that we're keeping track of
proto.getTouch = function( touches ) {
  for ( var i=0; i < touches.length; i++ ) {
    var touch = touches[i];
    if ( touch.identifier == this.pointerIdentifier ) {
      return touch;
    }
  }
};

// ----- start event ----- //

proto.onmousedown = function( event ) {
  // dismiss clicks from right or middle buttons
  var button = event.button;
  if ( button && ( button !== 0 && button !== 1 ) ) {
    return;
  }
  this._pointerDown( event, event );
};

proto.ontouchstart = function( event ) {
  this._pointerDown( event, event.changedTouches[0] );
};

proto.onMSPointerDown =
proto.onpointerdown = function( event ) {
  this._pointerDown( event, event );
};

/**
 * pointer start
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto._pointerDown = function( event, pointer ) {
  // dismiss other pointers
  if ( this.isPointerDown ) {
    return;
  }

  this.isPointerDown = true;
  // save pointer identifier to match up touch events
  this.pointerIdentifier = pointer.pointerId !== undefined ?
    // pointerId for pointer events, touch.indentifier for touch events
    pointer.pointerId : pointer.identifier;

  this.pointerDown( event, pointer );
};

proto.pointerDown = function( event, pointer ) {
  this._bindPostStartEvents( event );
  this.emitEvent( 'pointerDown', [ event, pointer ] );
};

// hash of events to be bound after start event
var postStartEvents = {
  mousedown: [ 'mousemove', 'mouseup' ],
  touchstart: [ 'touchmove', 'touchend', 'touchcancel' ],
  pointerdown: [ 'pointermove', 'pointerup', 'pointercancel' ],
  MSPointerDown: [ 'MSPointerMove', 'MSPointerUp', 'MSPointerCancel' ]
};

proto._bindPostStartEvents = function( event ) {
  if ( !event ) {
    return;
  }
  // get proper events to match start event
  var events = postStartEvents[ event.type ];
  // bind events to node
  events.forEach( function( eventName ) {
    window.addEventListener( eventName, this );
  }, this );
  // save these arguments
  this._boundPointerEvents = events;
};

proto._unbindPostStartEvents = function() {
  // check for _boundEvents, in case dragEnd triggered twice (old IE8 bug)
  if ( !this._boundPointerEvents ) {
    return;
  }
  this._boundPointerEvents.forEach( function( eventName ) {
    window.removeEventListener( eventName, this );
  }, this );

  delete this._boundPointerEvents;
};

// ----- move event ----- //

proto.onmousemove = function( event ) {
  this._pointerMove( event, event );
};

proto.onMSPointerMove =
proto.onpointermove = function( event ) {
  if ( event.pointerId == this.pointerIdentifier ) {
    this._pointerMove( event, event );
  }
};

proto.ontouchmove = function( event ) {
  var touch = this.getTouch( event.changedTouches );
  if ( touch ) {
    this._pointerMove( event, touch );
  }
};

/**
 * pointer move
 * @param {Event} event
 * @param {Event or Touch} pointer
 * @private
 */
proto._pointerMove = function( event, pointer ) {
  this.pointerMove( event, pointer );
};

// public
proto.pointerMove = function( event, pointer ) {
  this.emitEvent( 'pointerMove', [ event, pointer ] );
};

// ----- end event ----- //


proto.onmouseup = function( event ) {
  this._pointerUp( event, event );
};

proto.onMSPointerUp =
proto.onpointerup = function( event ) {
  if ( event.pointerId == this.pointerIdentifier ) {
    this._pointerUp( event, event );
  }
};

proto.ontouchend = function( event ) {
  var touch = this.getTouch( event.changedTouches );
  if ( touch ) {
    this._pointerUp( event, touch );
  }
};

/**
 * pointer up
 * @param {Event} event
 * @param {Event or Touch} pointer
 * @private
 */
proto._pointerUp = function( event, pointer ) {
  this._pointerDone();
  this.pointerUp( event, pointer );
};

// public
proto.pointerUp = function( event, pointer ) {
  this.emitEvent( 'pointerUp', [ event, pointer ] );
};

// ----- pointer done ----- //

// triggered on pointer up & pointer cancel
proto._pointerDone = function() {
  // reset properties
  this.isPointerDown = false;
  delete this.pointerIdentifier;
  // remove events
  this._unbindPostStartEvents();
  this.pointerDone();
};

proto.pointerDone = noop;

// ----- pointer cancel ----- //

proto.onMSPointerCancel =
proto.onpointercancel = function( event ) {
  if ( event.pointerId == this.pointerIdentifier ) {
    this._pointerCancel( event, event );
  }
};

proto.ontouchcancel = function( event ) {
  var touch = this.getTouch( event.changedTouches );
  if ( touch ) {
    this._pointerCancel( event, touch );
  }
};

/**
 * pointer cancel
 * @param {Event} event
 * @param {Event or Touch} pointer
 * @private
 */
proto._pointerCancel = function( event, pointer ) {
  this._pointerDone();
  this.pointerCancel( event, pointer );
};

// public
proto.pointerCancel = function( event, pointer ) {
  this.emitEvent( 'pointerCancel', [ event, pointer ] );
};

// -----  ----- //

// utility function for getting x/y coords from event
Unipointer.getPointerPoint = function( pointer ) {
  return {
    x: pointer.pageX,
    y: pointer.pageY
  };
};

// -----  ----- //

return Unipointer;

}));

},{"ev-emitter":3}],21:[function(require,module,exports){
/*!
 *
 * Vanilla-DataTables
 * Copyright (c) 2015 Karl Saunders (http://mobiuswebdesign.co.uk)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Version: 0.0.8
 *
 */
!function(a,b){var c="DataTable";"function"==typeof define&&define.amd?define([],b(c)):"object"==typeof exports?module.exports=b(c):a[c]=b(c)}(this,function(a){"use strict";function k(a,c){var d={perPage:10,perPageSelect:[5,10,15,20,25],navPosition:"bottom",navButtons:!0,nextPrev:!0,prevText:"&lsaquo;",nextText:"&rsaquo;",sortable:!1,searchable:!1,fixedHeight:!1,info:!0,hideUnusedNavs:!1,plugins:[]};this.options=b(d,c);var e=a.tagName.toLowerCase();if("table"!=e)throw new Error("The selected element ("+e+") is not a table!");if(null===a.tHead&&this.options.sortable)throw new Error("The sortable option requires table headings!");if(this.table=a,this.thead=this.table.tHead,this.options.data){var f=j(this.options.data);this.table.truncate(),this.table.appendChild(f)}this.tbody=this.table.tBodies[0],this.rows=Array.prototype.slice.call(this.tbody.rows),this.initialised=!1,this.sortEnabled=!1,this.isIE=!!/(msie|trident)/i.test(navigator.userAgent),this.paginators=[],this.currentPage=1,this.onFirstPage=!0,this.onLastPage=!1,this.searching=!1,this.init()}var b=function(a,b){var c;for(c in b)b.hasOwnProperty(c)&&(a[c]=b[c]);return a},c=function(a,b){return a.classList?a.classList.contains(b):!!a.className.match(new RegExp("(\\s|^)"+b+"(\\s|$)"))},d=function(a,b){a.classList?a.classList.add(b):c(b)||(a.className=a.className.trim()+" "+b)},e=function(a,b){a.classList?a.classList.remove(b):c(b)&&(a.className=a.className.replace(new RegExp("(^|\\c)"+b.split(" ").join("|")+"(\\c|$)","gi")," "))},f=function(){return document.createDocumentFragment()},g=function(a,b){var c=document,d=c.createElement(a);if(b&&"object"==typeof b){var e;for(e in b)if("html"===e)d.innerHTML=b[e];else if("text"===e){var f=c.createTextNode(b[e]);d.appendChild(f)}else d.setAttribute(e,b[e])}return d},h=function(a,b){var c,d;1===b?(c=0,d=a.length):b===-1&&(c=a.length-1,d=-1);for(var e=!0;e;){e=!1;for(var f=c;f!=d;f+=b)if(a[f+b]&&a[f].value>a[f+b].value){var g=a[f],h=a[f+b],i=g;a[f]=h,a[f+b]=i,e=!0}}return a},i=function(a,b,c){if("[object Object]"===Object.prototype.toString.call(a))for(var d in a)Object.prototype.hasOwnProperty.call(a,d)&&b.call(c,d,a[d],a);else for(var e=0,f=a.length;e<f;e++)b.call(c,e,a[e],a)},j=function(a){var b=f(),c=g("tbody");return i(a,function(a,c){var d=g("tr");i(c,function(a,b){var c=g("td",{html:b});d.appendChild(c)}),b.appendChild(d)}),c.appendChild(b),c};return k.prototype={init:function(){if(!this.initialised){var a=this;this.paginate(),this.wrapper=g("div",{class:"dataTable-wrapper"}),this.tableContainer=g("div",{class:"dataTable-container"}),this.selector=g("select",{class:"dataTable-selector"}),this.searchInput=g("input",{type:"text",class:"dataTable-input",placeholder:"Search..."}),this.label=g("div",{class:"dataTable-info"});var b=g("div",{class:"dataTable-top"}),e=g("div",{class:"dataTable-bottom"}),f=g("label",{class:"dataTable-selectWrapper"});if(i(this.options.perPageSelect,function(b,c){a.selector.appendChild(g("option",{value:c,html:c}))}),this.selector.value=this.options.perPage,f.appendChild(this.selector),f.insertAdjacentHTML("beforeend"," entries per page"),b.appendChild(f),d(this.table,"dataTable-table"),e.appendChild(this.label),this.wrapper.appendChild(b),this.wrapper.appendChild(this.tableContainer),this.wrapper.appendChild(e),this.options.searchable){var h=g("div",{class:"dataTable-search"});h.appendChild(this.searchInput),b.appendChild(h),d(b,"searchable")}this.showPage();var k,j=g("ul",{class:"dataTable-pagination"});switch(this.paginators.push(j),this.options.navPosition){case"top":b.appendChild(j);break;case"bottom":e.appendChild(j);break;case"both":k=g("ul",{class:"dataTable-pagination"}),this.paginators.push(k),b.appendChild(j),e.appendChild(k)}if(this.update(),this.options.sortable){if(this.sortEnabled)return;var a=this,l=a.thead.rows[0].cells;i(l,function(a,b){var c=g("a",{href:"#",class:"dataTable-sorter",html:b.innerHTML});b.idx=a,b.innerHTML="",b.appendChild(c)}),this.sortEnabled=!0}this.table.parentNode.insertBefore(this.wrapper,this.table),this.tableContainer.appendChild(this.table),this.containerRect=this.tableContainer.getBoundingClientRect(),this.options.fixedHeight&&(this.tableContainer.style.height=this.containerRect.height+"px");var m=a.table.tHead.rows[0].cells;i(m,function(b,c){var d=c.getBoundingClientRect(),e=d.width/a.containerRect.width*100;c.style.width=e+"%"}),this.options.plugins.length&&i(this.options.plugins,function(b,c){a[c]&&"function"==typeof a[c].init&&a[c].init(a)}),this.table.on=function(b,c){a.table.addEventListener(b,function(b){c.call(a,this)})},a.handleClickEvents=function(b){b=b||window.event;var d=b.target,e=d.nodeName.toLowerCase();"a"===e&&(d.hasAttribute("data-page")&&a.switchPage(d.getAttribute("data-page")),c(d,"dataTable-sorter")&&a.sortItems(b),b.preventDefault())},this.wrapper.addEventListener("click",a.handleClickEvents,!1),this.selector.addEventListener("change",a.update.bind(a),!1),this.searchInput.addEventListener("keyup",a.search.bind(a),!1),setTimeout(function(){a.emit("datatable.init")},10),a.initialised=!0}},paginate:function(){var a=this.options.perPage,b=this.searching?this.searchRows:this.rows;this.pages=b.map(function(c,d){return d%a==0?b.slice(d,d+a):null}).filter(function(a){return a}),this.lastPage=this.pages.length},switchPage:function(a){var b=this;if(a!=this.currentPage){if(isNaN(a)||(this.currentPage=parseInt(a,10)),"prev"==a){if(this.onFirstPage)return;this.currentPage--}if("next"==a){if(this.onLastPage)return;this.currentPage++}this.showPage(this.currentPage-1),i(b.paginators,function(a,c){var f=c.children,g=b.options.hideNavs?"hidden":"disabled";i(f,function(a,b){e(b,"active"),e(b,"disabled"),e(b,"hidden")}),b.onFirstPage&&b.options.nextPrev&&d(c.firstElementChild,g),b.onLastPage&&b.options.nextPrev&&d(c.lastElementChild,g);var h=b.options.nextPrev?b.currentPage:b.currentPage-1;d(c.children[h],"active")}),this.emit("datatable.change")}},showPage:function(a){a=a||0;var b=this,c=this.pages;if(c.length){var d=f();switch(i(c[a],function(a,b){d.appendChild(b)}),b.truncate(),b.tbody.appendChild(d),b.onFirstPage=!1,b.onLastPage=!1,b.currentPage){case 1:b.onFirstPage=!0;break;case b.lastPage:b.onLastPage=!0}}if(b.options.info){var j,e=0,g=0,h=0;c.length&&(e=b.currentPage-1,g=e*b.options.perPage,h=g+c[e].length,g+=1,j=this.searching?this.searchRows.length:this.rows.length);var k=["Showing ",g," to ",h," of ",j," rows"];this.label.innerHTML=k.join("")}},search:function(a){var b=this,c=a.target.value.toLowerCase();return this.searching=!0,this.searchRows=[],c.length?(this.truncate(),i(this.rows,function(a,d){i(d.cells,function(a,e){var f=e.textContent.toLowerCase(),g=b.searchRows.indexOf(d)>-1;f.indexOf(c)>-1&&!g&&b.searchRows.push(d)})}),b.searchRows.length||b.setMessage("No entries found."),this.update(),void this.emit("datatable.search")):(this.searching=!1,this.update(),void this.emit("datatable.search"))},setMessage:function(a){this.truncate(),this.tbody.appendChild(g("tr",{html:'<td class="dataTables-empty" colspan="'+this.colspan+'">'+a+"</td>"}))},update:function(a){function e(a){var b=g("li"),d=g("a",{href:"#","data-page":a,html:"prev"==a?c.options.prevText:c.options.nextText});return b.appendChild(d),b}if(a){var b=a.target;b===this.selector&&(this.options.perPage=parseInt(b.value,10)),this.emit("datatable.perpage")}this.currentPage=1,this.paginate(),this.showPage();var c=this,d=this.pages;i(c.paginators,function(a,b){var h=f();b.innerHTML="",d.length<=1||(c.options.nextPrev&&h.appendChild(e("prev")),c.options.navButtons&&i(d,function(a,b){var c=g("li",{class:0==a?"active":""}),d=g("a",{href:"#","data-page":a+1,html:a+1});c.appendChild(d),h.appendChild(c)}),c.options.nextPrev&&h.appendChild(e("next")),b.appendChild(h))}),this.initialised&&(this.tableContainer.style.height=null,this.options.fixedHeight&&(this.containerRect=this.tableContainer.getBoundingClientRect(),this.tableContainer.style.height=this.containerRect.height+"px"))},sortItems:function(a){var g,b=this,f=a.target,j=b.searching?b.searchRows:b.rows,k=[],l=[],m=0,n=0,o=f.parentNode;i(j,function(a,b){var c=b.cells[o.idx],d=c.textContent?c.textContent:c.innerText,e=d.replace(/(\$|\,|\s)/g,"");parseFloat(e)==e?l[n++]={value:Number(e),row:b}:k[m++]={value:d,row:b}});var q,r;c(o,"asc")?(q=h(k,-1),r=h(l,-1),g="descending",e(o,"asc"),d(o,"desc")):(q=h(l,1),r=h(k,1),g="ascending",e(o,"desc"),d(o,"asc")),this.lastTh&&o!=this.lastTh&&(e(this.lastTh,"desc"),e(this.lastTh,"asc")),this.lastTh=o;var j=q.concat(r);b.searching?(b.searchRows=[],i(j,function(a,c){b.searchRows.push(c.row)})):(b.rows=[],i(j,function(a,c){b.rows.push(c.row)})),b.sortOrder=g,b.update(a),b.emit("datatable.sort")},truncate:function(){if(this.isIE)for(;this.tbody.hasChildNodes();)this.tbody.removeChild(this.tbody.firstChild);else this.tbody.innerHTML=""},emit:function(a){this.table.dispatchEvent(new Event(a))}},k});
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHBcXGpzXFxpbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9kZXNhbmRyby1tYXRjaGVzLXNlbGVjdG9yL21hdGNoZXMtc2VsZWN0b3IuanMiLCJub2RlX21vZHVsZXMvZXYtZW1pdHRlci9ldi1lbWl0dGVyLmpzIiwibm9kZV9tb2R1bGVzL2Zpenp5LXVpLXV0aWxzL3V0aWxzLmpzIiwibm9kZV9tb2R1bGVzL2ZsaWNraXR5L2pzL2FkZC1yZW1vdmUtY2VsbC5qcyIsIm5vZGVfbW9kdWxlcy9mbGlja2l0eS9qcy9hbmltYXRlLmpzIiwibm9kZV9tb2R1bGVzL2ZsaWNraXR5L2pzL2NlbGwuanMiLCJub2RlX21vZHVsZXMvZmxpY2tpdHkvanMvZHJhZy5qcyIsIm5vZGVfbW9kdWxlcy9mbGlja2l0eS9qcy9mbGlja2l0eS5qcyIsIm5vZGVfbW9kdWxlcy9mbGlja2l0eS9qcy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9mbGlja2l0eS9qcy9sYXp5bG9hZC5qcyIsIm5vZGVfbW9kdWxlcy9mbGlja2l0eS9qcy9wYWdlLWRvdHMuanMiLCJub2RlX21vZHVsZXMvZmxpY2tpdHkvanMvcGxheWVyLmpzIiwibm9kZV9tb2R1bGVzL2ZsaWNraXR5L2pzL3ByZXYtbmV4dC1idXR0b24uanMiLCJub2RlX21vZHVsZXMvZmxpY2tpdHkvanMvc2xpZGUuanMiLCJub2RlX21vZHVsZXMvZ2V0LXNpemUvZ2V0LXNpemUuanMiLCJub2RlX21vZHVsZXMvbWF0ZXJpYWwtZGVzaWduLWxpdGUvZGlzdC9tYXRlcmlhbC5taW4uanMiLCJub2RlX21vZHVsZXMvdGFwLWxpc3RlbmVyL3RhcC1saXN0ZW5lci5qcyIsIm5vZGVfbW9kdWxlcy91bmlkcmFnZ2VyL3VuaWRyYWdnZXIuanMiLCJub2RlX21vZHVsZXMvdW5pcG9pbnRlci91bmlwb2ludGVyLmpzIiwibm9kZV9tb2R1bGVzL3ZhbmlsbGEtZGF0YXRhYmxlcy92YW5pbGxhLWRhdGFUYWJsZXMubWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsSUFBSSxXQUFXLFFBQVEsc0JBQVIsQ0FBZjtBQUNBLElBQUksU0FBUyxRQUFRLFVBQVIsQ0FBYjtBQUNBLElBQUksYUFBYSxRQUFRLG9CQUFSLENBQWpCO0FBQ0EsSUFBSSxPQUFPLFNBQVMsYUFBVCxDQUF1QixnQkFBdkIsQ0FBWDtBQUNBLElBQUksU0FBUyxhQUFULENBQXVCLGdCQUF2QixDQUFKLEVBQThDO0FBQzFDLFFBQUksUUFBUSxJQUFJLE1BQUosQ0FBVyxnQkFBWCxFQUE2QjtBQUNyQztBQUNBLG1CQUFXLE1BRjBCO0FBR25DLHNCQUFjLGdCQUhxQjtBQUluQyxvQkFBWSxJQUp1QjtBQUtuQyxrQkFBVTtBQUx5QixLQUE3QixDQUFaO0FBT0g7QUFDRCxJQUFJLFNBQVMsYUFBVCxDQUF1QixpQkFBdkIsQ0FBSixFQUErQztBQUMzQyxRQUFJLFVBQVUsSUFBSSxNQUFKLENBQVcsaUJBQVgsRUFBOEI7QUFDeEM7QUFDQSxtQkFBVyxNQUY2QjtBQUd0QyxpQkFBUyxJQUg2QjtBQUl0QyxzQkFBYyxnQkFKd0I7QUFLdEMsbUJBQVcsS0FMMkI7QUFNdEMsa0JBQVUsS0FONEI7QUFPdEMsb0JBQVksSUFQMEI7QUFRdEMsa0JBQVU7QUFSNEIsS0FBOUIsQ0FBZDtBQVVIO0FBQ0QsSUFBSSxVQUFVO0FBQ1YsY0FBVSxJQURBO0FBRVIsZ0JBQVksSUFGSjtBQUdSLGlCQUFhLE1BSEw7QUFJUixVQUFNO0FBSkUsQ0FBZDtBQU1BLElBQUksV0FBVyxTQUFTLG9CQUFULENBQThCLE9BQTlCLENBQWY7QUFDQSxJQUFJLFNBQVMsTUFBVCxHQUFrQixDQUF0QixFQUF5QjtBQUNyQixTQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksU0FBUyxNQUE3QixFQUFxQyxHQUFyQyxFQUEwQztBQUN0QyxZQUFJLFVBQVUsU0FBUyxDQUFULENBQWQ7QUFDQSxZQUFJLFVBQUosQ0FBZSxPQUFmLEVBQXdCLE9BQXhCO0FBQ0g7QUFDRCxRQUFJLGFBQWEsRUFBakI7QUFBQSxRQUNNLFVBQVUsU0FBUyxnQkFBVCxDQUEwQixVQUExQixDQURoQjtBQUFBLFFBRU0sWUFBWSxTQUFTLGdCQUFULENBQTBCLFVBQTFCLENBRmxCO0FBQUEsUUFHTSxZQUFZLFNBQVMsYUFBVCxDQUF1QixhQUF2QixDQUhsQjtBQUlBLFNBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxRQUFRLE1BQTVCLEVBQW9DLEdBQXBDLEVBQXlDO0FBQ3JDLFlBQUksVUFBVSxRQUFRLENBQVIsQ0FBZDtBQUNBLG1CQUFXLElBQVgsQ0FBZ0IsUUFBUSxXQUFSLENBQW9CLE9BQXBCLENBQTRCLFVBQTVCLEVBQXdDLEVBQXhDLENBQWhCO0FBQ0g7QUFDRCxTQUFLLElBQUksSUFBSSxDQUFSLEVBQVcsR0FBaEIsRUFBcUIsTUFBTSxVQUFVLElBQVYsQ0FBZSxDQUFmLENBQTNCLEVBQThDLEdBQTlDLEVBQW1EO0FBQy9DLGFBQUssSUFBSSxJQUFJLENBQVIsRUFBVyxHQUFoQixFQUFxQixNQUFNLElBQUksS0FBSixDQUFVLENBQVYsQ0FBM0IsRUFBeUMsR0FBekMsRUFBOEM7QUFDMUMsZ0JBQUksWUFBSixDQUFpQixTQUFqQixFQUE0QixXQUFXLENBQVgsQ0FBNUI7QUFDSDtBQUNKO0FBQ0o7QUFDRDs7O0FDbkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN09BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdFhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbDFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1TkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgbWF0ZXJpYWwgPSByZXF1aXJlKCdtYXRlcmlhbC1kZXNpZ24tbGl0ZScpO1xyXG52YXIgc2xpZGVyID0gcmVxdWlyZSgnZmxpY2tpdHknKTtcclxudmFyIGRhdGF0YWJsZXMgPSByZXF1aXJlKCd2YW5pbGxhLWRhdGF0YWJsZXMnKTtcclxudmFyIGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbi1jYXJvdXNlbCcpO1xyXG5pZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4tY2Fyb3VzZWwnKSkge1xyXG4gICAgdmFyIGZsa3R5ID0gbmV3IHNsaWRlcignLm1haW4tY2Fyb3VzZWwnLCB7XHJcbiAgICAgICAgLy8gb3B0aW9uc1xyXG4gICAgICAgIGNlbGxBbGlnbjogJ2xlZnQnXHJcbiAgICAgICAgLCBjZWxsU2VsZWN0b3I6ICcuY2Fyb3VzZWwtY2VsbCdcclxuICAgICAgICAsIHdyYXBBcm91bmQ6IHRydWVcclxuICAgICAgICAsIGF1dG9QbGF5OiA1MDAwXHJcbiAgICB9KTtcclxufVxyXG5pZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJhbmVyLWNhcm91c2VsJykpIHtcclxuICAgIHZhciBmbGt0eV8xID0gbmV3IHNsaWRlcignLmJhbmVyLWNhcm91c2VsJywge1xyXG4gICAgICAgIC8vIG9wdGlvbnNcclxuICAgICAgICBjZWxsQWxpZ246ICdsZWZ0J1xyXG4gICAgICAgICwgY29udGFpbjogdHJ1ZVxyXG4gICAgICAgICwgY2VsbFNlbGVjdG9yOiAnLmNhcm91c2VsLWNlbGwnXHJcbiAgICAgICAgLCBkcmFnZ2FibGU6IGZhbHNlXHJcbiAgICAgICAgLCBwYWdlRG90czogZmFsc2VcclxuICAgICAgICAsIHdyYXBBcm91bmQ6IHRydWVcclxuICAgICAgICAsIGF1dG9QbGF5OiAzMDAwXHJcbiAgICB9KTtcclxufVxyXG52YXIgb3B0aW9ucyA9IHtcclxuICAgIHNvcnRhYmxlOiB0cnVlXHJcbiAgICAsIHNlYXJjaGFibGU6IHRydWVcclxuICAgICwgbmF2UG9zaXRpb246ICdib3RoJ1xyXG4gICAgLCBpbmZvOiBmYWxzZVxyXG59O1xyXG52YXIgZWxlbWVudHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgndGFibGUnKTtcclxuaWYgKGVsZW1lbnRzLmxlbmd0aCA+IDApIHtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgZWxlbWVudCA9IGVsZW1lbnRzW2ldO1xyXG4gICAgICAgIG5ldyBkYXRhdGFibGVzKGVsZW1lbnQsIG9wdGlvbnMpO1xyXG4gICAgfVxyXG4gICAgdmFyIGhlYWRlcnRleHQgPSBbXVxyXG4gICAgICAgICwgaGVhZGVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJ0YWJsZSB0aFwiKVxyXG4gICAgICAgICwgdGFibGVyb3dzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcInRhYmxlIHRoXCIpXHJcbiAgICAgICAgLCB0YWJsZWJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwidGFibGUgdGJvZHlcIik7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGhlYWRlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgY3VycmVudCA9IGhlYWRlcnNbaV07XHJcbiAgICAgICAgaGVhZGVydGV4dC5wdXNoKGN1cnJlbnQudGV4dENvbnRlbnQucmVwbGFjZSgvXFxyP1xcbnxcXHIvLCBcIlwiKSk7XHJcbiAgICB9XHJcbiAgICBmb3IgKHZhciBpID0gMCwgcm93OyByb3cgPSB0YWJsZWJvZHkucm93c1tpXTsgaSsrKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaiA9IDAsIGNvbDsgY29sID0gcm93LmNlbGxzW2pdOyBqKyspIHtcclxuICAgICAgICAgICAgY29sLnNldEF0dHJpYnV0ZShcImRhdGEtdGhcIiwgaGVhZGVydGV4dFtqXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbi8vdmFyIGRhdGFUYWJsZSA9IG5ldyBkYXRhdGFibGVzKG15VGFibGUsIG9wdGlvbnMpOyIsIi8qKlxuICogbWF0Y2hlc1NlbGVjdG9yIHYyLjAuMVxuICogbWF0Y2hlc1NlbGVjdG9yKCBlbGVtZW50LCAnLnNlbGVjdG9yJyApXG4gKiBNSVQgbGljZW5zZVxuICovXG5cbi8qanNoaW50IGJyb3dzZXI6IHRydWUsIHN0cmljdDogdHJ1ZSwgdW5kZWY6IHRydWUsIHVudXNlZDogdHJ1ZSAqL1xuXG4oIGZ1bmN0aW9uKCB3aW5kb3csIGZhY3RvcnkgKSB7XG4gIC8qZ2xvYmFsIGRlZmluZTogZmFsc2UsIG1vZHVsZTogZmFsc2UgKi9cbiAgJ3VzZSBzdHJpY3QnO1xuICAvLyB1bml2ZXJzYWwgbW9kdWxlIGRlZmluaXRpb25cbiAgaWYgKCB0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCApIHtcbiAgICAvLyBBTURcbiAgICBkZWZpbmUoIGZhY3RvcnkgKTtcbiAgfSBlbHNlIGlmICggdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyApIHtcbiAgICAvLyBDb21tb25KU1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuICB9IGVsc2Uge1xuICAgIC8vIGJyb3dzZXIgZ2xvYmFsXG4gICAgd2luZG93Lm1hdGNoZXNTZWxlY3RvciA9IGZhY3RvcnkoKTtcbiAgfVxuXG59KCB3aW5kb3csIGZ1bmN0aW9uIGZhY3RvcnkoKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbWF0Y2hlc01ldGhvZCA9ICggZnVuY3Rpb24oKSB7XG4gICAgdmFyIEVsZW1Qcm90byA9IEVsZW1lbnQucHJvdG90eXBlO1xuICAgIC8vIGNoZWNrIGZvciB0aGUgc3RhbmRhcmQgbWV0aG9kIG5hbWUgZmlyc3RcbiAgICBpZiAoIEVsZW1Qcm90by5tYXRjaGVzICkge1xuICAgICAgcmV0dXJuICdtYXRjaGVzJztcbiAgICB9XG4gICAgLy8gY2hlY2sgdW4tcHJlZml4ZWRcbiAgICBpZiAoIEVsZW1Qcm90by5tYXRjaGVzU2VsZWN0b3IgKSB7XG4gICAgICByZXR1cm4gJ21hdGNoZXNTZWxlY3Rvcic7XG4gICAgfVxuICAgIC8vIGNoZWNrIHZlbmRvciBwcmVmaXhlc1xuICAgIHZhciBwcmVmaXhlcyA9IFsgJ3dlYmtpdCcsICdtb3onLCAnbXMnLCAnbycgXTtcblxuICAgIGZvciAoIHZhciBpPTA7IGkgPCBwcmVmaXhlcy5sZW5ndGg7IGkrKyApIHtcbiAgICAgIHZhciBwcmVmaXggPSBwcmVmaXhlc1tpXTtcbiAgICAgIHZhciBtZXRob2QgPSBwcmVmaXggKyAnTWF0Y2hlc1NlbGVjdG9yJztcbiAgICAgIGlmICggRWxlbVByb3RvWyBtZXRob2QgXSApIHtcbiAgICAgICAgcmV0dXJuIG1ldGhvZDtcbiAgICAgIH1cbiAgICB9XG4gIH0pKCk7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIG1hdGNoZXNTZWxlY3RvciggZWxlbSwgc2VsZWN0b3IgKSB7XG4gICAgcmV0dXJuIGVsZW1bIG1hdGNoZXNNZXRob2QgXSggc2VsZWN0b3IgKTtcbiAgfTtcblxufSkpO1xuIiwiLyoqXG4gKiBFdkVtaXR0ZXIgdjEuMC4zXG4gKiBMaWwnIGV2ZW50IGVtaXR0ZXJcbiAqIE1JVCBMaWNlbnNlXG4gKi9cblxuLyoganNoaW50IHVudXNlZDogdHJ1ZSwgdW5kZWY6IHRydWUsIHN0cmljdDogdHJ1ZSAqL1xuXG4oIGZ1bmN0aW9uKCBnbG9iYWwsIGZhY3RvcnkgKSB7XG4gIC8vIHVuaXZlcnNhbCBtb2R1bGUgZGVmaW5pdGlvblxuICAvKiBqc2hpbnQgc3RyaWN0OiBmYWxzZSAqLyAvKiBnbG9iYWxzIGRlZmluZSwgbW9kdWxlLCB3aW5kb3cgKi9cbiAgaWYgKCB0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCApIHtcbiAgICAvLyBBTUQgLSBSZXF1aXJlSlNcbiAgICBkZWZpbmUoIGZhY3RvcnkgKTtcbiAgfSBlbHNlIGlmICggdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyApIHtcbiAgICAvLyBDb21tb25KUyAtIEJyb3dzZXJpZnksIFdlYnBhY2tcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBCcm93c2VyIGdsb2JhbHNcbiAgICBnbG9iYWwuRXZFbWl0dGVyID0gZmFjdG9yeSgpO1xuICB9XG5cbn0oIHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiB0aGlzLCBmdW5jdGlvbigpIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIEV2RW1pdHRlcigpIHt9XG5cbnZhciBwcm90byA9IEV2RW1pdHRlci5wcm90b3R5cGU7XG5cbnByb3RvLm9uID0gZnVuY3Rpb24oIGV2ZW50TmFtZSwgbGlzdGVuZXIgKSB7XG4gIGlmICggIWV2ZW50TmFtZSB8fCAhbGlzdGVuZXIgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIHNldCBldmVudHMgaGFzaFxuICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzID0gdGhpcy5fZXZlbnRzIHx8IHt9O1xuICAvLyBzZXQgbGlzdGVuZXJzIGFycmF5XG4gIHZhciBsaXN0ZW5lcnMgPSBldmVudHNbIGV2ZW50TmFtZSBdID0gZXZlbnRzWyBldmVudE5hbWUgXSB8fCBbXTtcbiAgLy8gb25seSBhZGQgb25jZVxuICBpZiAoIGxpc3RlbmVycy5pbmRleE9mKCBsaXN0ZW5lciApID09IC0xICkge1xuICAgIGxpc3RlbmVycy5wdXNoKCBsaXN0ZW5lciApO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5wcm90by5vbmNlID0gZnVuY3Rpb24oIGV2ZW50TmFtZSwgbGlzdGVuZXIgKSB7XG4gIGlmICggIWV2ZW50TmFtZSB8fCAhbGlzdGVuZXIgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIGFkZCBldmVudFxuICB0aGlzLm9uKCBldmVudE5hbWUsIGxpc3RlbmVyICk7XG4gIC8vIHNldCBvbmNlIGZsYWdcbiAgLy8gc2V0IG9uY2VFdmVudHMgaGFzaFxuICB2YXIgb25jZUV2ZW50cyA9IHRoaXMuX29uY2VFdmVudHMgPSB0aGlzLl9vbmNlRXZlbnRzIHx8IHt9O1xuICAvLyBzZXQgb25jZUxpc3RlbmVycyBvYmplY3RcbiAgdmFyIG9uY2VMaXN0ZW5lcnMgPSBvbmNlRXZlbnRzWyBldmVudE5hbWUgXSA9IG9uY2VFdmVudHNbIGV2ZW50TmFtZSBdIHx8IHt9O1xuICAvLyBzZXQgZmxhZ1xuICBvbmNlTGlzdGVuZXJzWyBsaXN0ZW5lciBdID0gdHJ1ZTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbnByb3RvLm9mZiA9IGZ1bmN0aW9uKCBldmVudE5hbWUsIGxpc3RlbmVyICkge1xuICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzICYmIHRoaXMuX2V2ZW50c1sgZXZlbnROYW1lIF07XG4gIGlmICggIWxpc3RlbmVycyB8fCAhbGlzdGVuZXJzLmxlbmd0aCApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIGluZGV4ID0gbGlzdGVuZXJzLmluZGV4T2YoIGxpc3RlbmVyICk7XG4gIGlmICggaW5kZXggIT0gLTEgKSB7XG4gICAgbGlzdGVuZXJzLnNwbGljZSggaW5kZXgsIDEgKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxucHJvdG8uZW1pdEV2ZW50ID0gZnVuY3Rpb24oIGV2ZW50TmFtZSwgYXJncyApIHtcbiAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50cyAmJiB0aGlzLl9ldmVudHNbIGV2ZW50TmFtZSBdO1xuICBpZiAoICFsaXN0ZW5lcnMgfHwgIWxpc3RlbmVycy5sZW5ndGggKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBpID0gMDtcbiAgdmFyIGxpc3RlbmVyID0gbGlzdGVuZXJzW2ldO1xuICBhcmdzID0gYXJncyB8fCBbXTtcbiAgLy8gb25jZSBzdHVmZlxuICB2YXIgb25jZUxpc3RlbmVycyA9IHRoaXMuX29uY2VFdmVudHMgJiYgdGhpcy5fb25jZUV2ZW50c1sgZXZlbnROYW1lIF07XG5cbiAgd2hpbGUgKCBsaXN0ZW5lciApIHtcbiAgICB2YXIgaXNPbmNlID0gb25jZUxpc3RlbmVycyAmJiBvbmNlTGlzdGVuZXJzWyBsaXN0ZW5lciBdO1xuICAgIGlmICggaXNPbmNlICkge1xuICAgICAgLy8gcmVtb3ZlIGxpc3RlbmVyXG4gICAgICAvLyByZW1vdmUgYmVmb3JlIHRyaWdnZXIgdG8gcHJldmVudCByZWN1cnNpb25cbiAgICAgIHRoaXMub2ZmKCBldmVudE5hbWUsIGxpc3RlbmVyICk7XG4gICAgICAvLyB1bnNldCBvbmNlIGZsYWdcbiAgICAgIGRlbGV0ZSBvbmNlTGlzdGVuZXJzWyBsaXN0ZW5lciBdO1xuICAgIH1cbiAgICAvLyB0cmlnZ2VyIGxpc3RlbmVyXG4gICAgbGlzdGVuZXIuYXBwbHkoIHRoaXMsIGFyZ3MgKTtcbiAgICAvLyBnZXQgbmV4dCBsaXN0ZW5lclxuICAgIGkgKz0gaXNPbmNlID8gMCA6IDE7XG4gICAgbGlzdGVuZXIgPSBsaXN0ZW5lcnNbaV07XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbnJldHVybiBFdkVtaXR0ZXI7XG5cbn0pKTtcbiIsIi8qKlxuICogRml6enkgVUkgdXRpbHMgdjIuMC4zXG4gKiBNSVQgbGljZW5zZVxuICovXG5cbi8qanNoaW50IGJyb3dzZXI6IHRydWUsIHVuZGVmOiB0cnVlLCB1bnVzZWQ6IHRydWUsIHN0cmljdDogdHJ1ZSAqL1xuXG4oIGZ1bmN0aW9uKCB3aW5kb3csIGZhY3RvcnkgKSB7XG4gIC8vIHVuaXZlcnNhbCBtb2R1bGUgZGVmaW5pdGlvblxuICAvKmpzaGludCBzdHJpY3Q6IGZhbHNlICovIC8qZ2xvYmFscyBkZWZpbmUsIG1vZHVsZSwgcmVxdWlyZSAqL1xuXG4gIGlmICggdHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgKSB7XG4gICAgLy8gQU1EXG4gICAgZGVmaW5lKCBbXG4gICAgICAnZGVzYW5kcm8tbWF0Y2hlcy1zZWxlY3Rvci9tYXRjaGVzLXNlbGVjdG9yJ1xuICAgIF0sIGZ1bmN0aW9uKCBtYXRjaGVzU2VsZWN0b3IgKSB7XG4gICAgICByZXR1cm4gZmFjdG9yeSggd2luZG93LCBtYXRjaGVzU2VsZWN0b3IgKTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmICggdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyApIHtcbiAgICAvLyBDb21tb25KU1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShcbiAgICAgIHdpbmRvdyxcbiAgICAgIHJlcXVpcmUoJ2Rlc2FuZHJvLW1hdGNoZXMtc2VsZWN0b3InKVxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgLy8gYnJvd3NlciBnbG9iYWxcbiAgICB3aW5kb3cuZml6enlVSVV0aWxzID0gZmFjdG9yeShcbiAgICAgIHdpbmRvdyxcbiAgICAgIHdpbmRvdy5tYXRjaGVzU2VsZWN0b3JcbiAgICApO1xuICB9XG5cbn0oIHdpbmRvdywgZnVuY3Rpb24gZmFjdG9yeSggd2luZG93LCBtYXRjaGVzU2VsZWN0b3IgKSB7XG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0ge307XG5cbi8vIC0tLS0tIGV4dGVuZCAtLS0tLSAvL1xuXG4vLyBleHRlbmRzIG9iamVjdHNcbnV0aWxzLmV4dGVuZCA9IGZ1bmN0aW9uKCBhLCBiICkge1xuICBmb3IgKCB2YXIgcHJvcCBpbiBiICkge1xuICAgIGFbIHByb3AgXSA9IGJbIHByb3AgXTtcbiAgfVxuICByZXR1cm4gYTtcbn07XG5cbi8vIC0tLS0tIG1vZHVsbyAtLS0tLSAvL1xuXG51dGlscy5tb2R1bG8gPSBmdW5jdGlvbiggbnVtLCBkaXYgKSB7XG4gIHJldHVybiAoICggbnVtICUgZGl2ICkgKyBkaXYgKSAlIGRpdjtcbn07XG5cbi8vIC0tLS0tIG1ha2VBcnJheSAtLS0tLSAvL1xuXG4vLyB0dXJuIGVsZW1lbnQgb3Igbm9kZUxpc3QgaW50byBhbiBhcnJheVxudXRpbHMubWFrZUFycmF5ID0gZnVuY3Rpb24oIG9iaiApIHtcbiAgdmFyIGFyeSA9IFtdO1xuICBpZiAoIEFycmF5LmlzQXJyYXkoIG9iaiApICkge1xuICAgIC8vIHVzZSBvYmplY3QgaWYgYWxyZWFkeSBhbiBhcnJheVxuICAgIGFyeSA9IG9iajtcbiAgfSBlbHNlIGlmICggb2JqICYmIHR5cGVvZiBvYmoubGVuZ3RoID09ICdudW1iZXInICkge1xuICAgIC8vIGNvbnZlcnQgbm9kZUxpc3QgdG8gYXJyYXlcbiAgICBmb3IgKCB2YXIgaT0wOyBpIDwgb2JqLmxlbmd0aDsgaSsrICkge1xuICAgICAgYXJ5LnB1c2goIG9ialtpXSApO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBhcnJheSBvZiBzaW5nbGUgaW5kZXhcbiAgICBhcnkucHVzaCggb2JqICk7XG4gIH1cbiAgcmV0dXJuIGFyeTtcbn07XG5cbi8vIC0tLS0tIHJlbW92ZUZyb20gLS0tLS0gLy9cblxudXRpbHMucmVtb3ZlRnJvbSA9IGZ1bmN0aW9uKCBhcnksIG9iaiApIHtcbiAgdmFyIGluZGV4ID0gYXJ5LmluZGV4T2YoIG9iaiApO1xuICBpZiAoIGluZGV4ICE9IC0xICkge1xuICAgIGFyeS5zcGxpY2UoIGluZGV4LCAxICk7XG4gIH1cbn07XG5cbi8vIC0tLS0tIGdldFBhcmVudCAtLS0tLSAvL1xuXG51dGlscy5nZXRQYXJlbnQgPSBmdW5jdGlvbiggZWxlbSwgc2VsZWN0b3IgKSB7XG4gIHdoaWxlICggZWxlbSAhPSBkb2N1bWVudC5ib2R5ICkge1xuICAgIGVsZW0gPSBlbGVtLnBhcmVudE5vZGU7XG4gICAgaWYgKCBtYXRjaGVzU2VsZWN0b3IoIGVsZW0sIHNlbGVjdG9yICkgKSB7XG4gICAgICByZXR1cm4gZWxlbTtcbiAgICB9XG4gIH1cbn07XG5cbi8vIC0tLS0tIGdldFF1ZXJ5RWxlbWVudCAtLS0tLSAvL1xuXG4vLyB1c2UgZWxlbWVudCBhcyBzZWxlY3RvciBzdHJpbmdcbnV0aWxzLmdldFF1ZXJ5RWxlbWVudCA9IGZ1bmN0aW9uKCBlbGVtICkge1xuICBpZiAoIHR5cGVvZiBlbGVtID09ICdzdHJpbmcnICkge1xuICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCBlbGVtICk7XG4gIH1cbiAgcmV0dXJuIGVsZW07XG59O1xuXG4vLyAtLS0tLSBoYW5kbGVFdmVudCAtLS0tLSAvL1xuXG4vLyBlbmFibGUgLm9udHlwZSB0byB0cmlnZ2VyIGZyb20gLmFkZEV2ZW50TGlzdGVuZXIoIGVsZW0sICd0eXBlJyApXG51dGlscy5oYW5kbGVFdmVudCA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgdmFyIG1ldGhvZCA9ICdvbicgKyBldmVudC50eXBlO1xuICBpZiAoIHRoaXNbIG1ldGhvZCBdICkge1xuICAgIHRoaXNbIG1ldGhvZCBdKCBldmVudCApO1xuICB9XG59O1xuXG4vLyAtLS0tLSBmaWx0ZXJGaW5kRWxlbWVudHMgLS0tLS0gLy9cblxudXRpbHMuZmlsdGVyRmluZEVsZW1lbnRzID0gZnVuY3Rpb24oIGVsZW1zLCBzZWxlY3RvciApIHtcbiAgLy8gbWFrZSBhcnJheSBvZiBlbGVtc1xuICBlbGVtcyA9IHV0aWxzLm1ha2VBcnJheSggZWxlbXMgKTtcbiAgdmFyIGZmRWxlbXMgPSBbXTtcblxuICBlbGVtcy5mb3JFYWNoKCBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAvLyBjaGVjayB0aGF0IGVsZW0gaXMgYW4gYWN0dWFsIGVsZW1lbnRcbiAgICBpZiAoICEoIGVsZW0gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCApICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBhZGQgZWxlbSBpZiBubyBzZWxlY3RvclxuICAgIGlmICggIXNlbGVjdG9yICkge1xuICAgICAgZmZFbGVtcy5wdXNoKCBlbGVtICk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIGZpbHRlciAmIGZpbmQgaXRlbXMgaWYgd2UgaGF2ZSBhIHNlbGVjdG9yXG4gICAgLy8gZmlsdGVyXG4gICAgaWYgKCBtYXRjaGVzU2VsZWN0b3IoIGVsZW0sIHNlbGVjdG9yICkgKSB7XG4gICAgICBmZkVsZW1zLnB1c2goIGVsZW0gKTtcbiAgICB9XG4gICAgLy8gZmluZCBjaGlsZHJlblxuICAgIHZhciBjaGlsZEVsZW1zID0gZWxlbS5xdWVyeVNlbGVjdG9yQWxsKCBzZWxlY3RvciApO1xuICAgIC8vIGNvbmNhdCBjaGlsZEVsZW1zIHRvIGZpbHRlckZvdW5kIGFycmF5XG4gICAgZm9yICggdmFyIGk9MDsgaSA8IGNoaWxkRWxlbXMubGVuZ3RoOyBpKysgKSB7XG4gICAgICBmZkVsZW1zLnB1c2goIGNoaWxkRWxlbXNbaV0gKTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBmZkVsZW1zO1xufTtcblxuLy8gLS0tLS0gZGVib3VuY2VNZXRob2QgLS0tLS0gLy9cblxudXRpbHMuZGVib3VuY2VNZXRob2QgPSBmdW5jdGlvbiggX2NsYXNzLCBtZXRob2ROYW1lLCB0aHJlc2hvbGQgKSB7XG4gIC8vIG9yaWdpbmFsIG1ldGhvZFxuICB2YXIgbWV0aG9kID0gX2NsYXNzLnByb3RvdHlwZVsgbWV0aG9kTmFtZSBdO1xuICB2YXIgdGltZW91dE5hbWUgPSBtZXRob2ROYW1lICsgJ1RpbWVvdXQnO1xuXG4gIF9jbGFzcy5wcm90b3R5cGVbIG1ldGhvZE5hbWUgXSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciB0aW1lb3V0ID0gdGhpc1sgdGltZW91dE5hbWUgXTtcbiAgICBpZiAoIHRpbWVvdXQgKSB7XG4gICAgICBjbGVhclRpbWVvdXQoIHRpbWVvdXQgKTtcbiAgICB9XG4gICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG5cbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIHRoaXNbIHRpbWVvdXROYW1lIF0gPSBzZXRUaW1lb3V0KCBmdW5jdGlvbigpIHtcbiAgICAgIG1ldGhvZC5hcHBseSggX3RoaXMsIGFyZ3MgKTtcbiAgICAgIGRlbGV0ZSBfdGhpc1sgdGltZW91dE5hbWUgXTtcbiAgICB9LCB0aHJlc2hvbGQgfHwgMTAwICk7XG4gIH07XG59O1xuXG4vLyAtLS0tLSBkb2NSZWFkeSAtLS0tLSAvL1xuXG51dGlscy5kb2NSZWFkeSA9IGZ1bmN0aW9uKCBjYWxsYmFjayApIHtcbiAgdmFyIHJlYWR5U3RhdGUgPSBkb2N1bWVudC5yZWFkeVN0YXRlO1xuICBpZiAoIHJlYWR5U3RhdGUgPT0gJ2NvbXBsZXRlJyB8fCByZWFkeVN0YXRlID09ICdpbnRlcmFjdGl2ZScgKSB7XG4gICAgLy8gZG8gYXN5bmMgdG8gYWxsb3cgZm9yIG90aGVyIHNjcmlwdHMgdG8gcnVuLiBtZXRhZml6enkvZmxpY2tpdHkjNDQxXG4gICAgc2V0VGltZW91dCggY2FsbGJhY2sgKTtcbiAgfSBlbHNlIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCAnRE9NQ29udGVudExvYWRlZCcsIGNhbGxiYWNrICk7XG4gIH1cbn07XG5cbi8vIC0tLS0tIGh0bWxJbml0IC0tLS0tIC8vXG5cbi8vIGh0dHA6Ly9qYW1lc3JvYmVydHMubmFtZS9ibG9nLzIwMTAvMDIvMjIvc3RyaW5nLWZ1bmN0aW9ucy1mb3ItamF2YXNjcmlwdC10cmltLXRvLWNhbWVsLWNhc2UtdG8tZGFzaGVkLWFuZC10by11bmRlcnNjb3JlL1xudXRpbHMudG9EYXNoZWQgPSBmdW5jdGlvbiggc3RyICkge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoIC8oLikoW0EtWl0pL2csIGZ1bmN0aW9uKCBtYXRjaCwgJDEsICQyICkge1xuICAgIHJldHVybiAkMSArICctJyArICQyO1xuICB9KS50b0xvd2VyQ2FzZSgpO1xufTtcblxudmFyIGNvbnNvbGUgPSB3aW5kb3cuY29uc29sZTtcbi8qKlxuICogYWxsb3cgdXNlciB0byBpbml0aWFsaXplIGNsYXNzZXMgdmlhIFtkYXRhLW5hbWVzcGFjZV0gb3IgLmpzLW5hbWVzcGFjZSBjbGFzc1xuICogaHRtbEluaXQoIFdpZGdldCwgJ3dpZGdldE5hbWUnIClcbiAqIG9wdGlvbnMgYXJlIHBhcnNlZCBmcm9tIGRhdGEtbmFtZXNwYWNlLW9wdGlvbnNcbiAqL1xudXRpbHMuaHRtbEluaXQgPSBmdW5jdGlvbiggV2lkZ2V0Q2xhc3MsIG5hbWVzcGFjZSApIHtcbiAgdXRpbHMuZG9jUmVhZHkoIGZ1bmN0aW9uKCkge1xuICAgIHZhciBkYXNoZWROYW1lc3BhY2UgPSB1dGlscy50b0Rhc2hlZCggbmFtZXNwYWNlICk7XG4gICAgdmFyIGRhdGFBdHRyID0gJ2RhdGEtJyArIGRhc2hlZE5hbWVzcGFjZTtcbiAgICB2YXIgZGF0YUF0dHJFbGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoICdbJyArIGRhdGFBdHRyICsgJ10nICk7XG4gICAgdmFyIGpzRGFzaEVsZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCggJy5qcy0nICsgZGFzaGVkTmFtZXNwYWNlICk7XG4gICAgdmFyIGVsZW1zID0gdXRpbHMubWFrZUFycmF5KCBkYXRhQXR0ckVsZW1zIClcbiAgICAgIC5jb25jYXQoIHV0aWxzLm1ha2VBcnJheSgganNEYXNoRWxlbXMgKSApO1xuICAgIHZhciBkYXRhT3B0aW9uc0F0dHIgPSBkYXRhQXR0ciArICctb3B0aW9ucyc7XG4gICAgdmFyIGpRdWVyeSA9IHdpbmRvdy5qUXVlcnk7XG5cbiAgICBlbGVtcy5mb3JFYWNoKCBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgIHZhciBhdHRyID0gZWxlbS5nZXRBdHRyaWJ1dGUoIGRhdGFBdHRyICkgfHxcbiAgICAgICAgZWxlbS5nZXRBdHRyaWJ1dGUoIGRhdGFPcHRpb25zQXR0ciApO1xuICAgICAgdmFyIG9wdGlvbnM7XG4gICAgICB0cnkge1xuICAgICAgICBvcHRpb25zID0gYXR0ciAmJiBKU09OLnBhcnNlKCBhdHRyICk7XG4gICAgICB9IGNhdGNoICggZXJyb3IgKSB7XG4gICAgICAgIC8vIGxvZyBlcnJvciwgZG8gbm90IGluaXRpYWxpemVcbiAgICAgICAgaWYgKCBjb25zb2xlICkge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoICdFcnJvciBwYXJzaW5nICcgKyBkYXRhQXR0ciArICcgb24gJyArIGVsZW0uY2xhc3NOYW1lICtcbiAgICAgICAgICAnOiAnICsgZXJyb3IgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICAvLyBpbml0aWFsaXplXG4gICAgICB2YXIgaW5zdGFuY2UgPSBuZXcgV2lkZ2V0Q2xhc3MoIGVsZW0sIG9wdGlvbnMgKTtcbiAgICAgIC8vIG1ha2UgYXZhaWxhYmxlIHZpYSAkKCkuZGF0YSgnbmFtZXNwYWNlJylcbiAgICAgIGlmICggalF1ZXJ5ICkge1xuICAgICAgICBqUXVlcnkuZGF0YSggZWxlbSwgbmFtZXNwYWNlLCBpbnN0YW5jZSApO1xuICAgICAgfVxuICAgIH0pO1xuXG4gIH0pO1xufTtcblxuLy8gLS0tLS0gIC0tLS0tIC8vXG5cbnJldHVybiB1dGlscztcblxufSkpO1xuIiwiLy8gYWRkLCByZW1vdmUgY2VsbFxuKCBmdW5jdGlvbiggd2luZG93LCBmYWN0b3J5ICkge1xuICAvLyB1bml2ZXJzYWwgbW9kdWxlIGRlZmluaXRpb25cbiAgLyoganNoaW50IHN0cmljdDogZmFsc2UgKi9cbiAgaWYgKCB0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCApIHtcbiAgICAvLyBBTURcbiAgICBkZWZpbmUoIFtcbiAgICAgICcuL2ZsaWNraXR5JyxcbiAgICAgICdmaXp6eS11aS11dGlscy91dGlscydcbiAgICBdLCBmdW5jdGlvbiggRmxpY2tpdHksIHV0aWxzICkge1xuICAgICAgcmV0dXJuIGZhY3RvcnkoIHdpbmRvdywgRmxpY2tpdHksIHV0aWxzICk7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAoIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMgKSB7XG4gICAgLy8gQ29tbW9uSlNcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoXG4gICAgICB3aW5kb3csXG4gICAgICByZXF1aXJlKCcuL2ZsaWNraXR5JyksXG4gICAgICByZXF1aXJlKCdmaXp6eS11aS11dGlscycpXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBicm93c2VyIGdsb2JhbFxuICAgIGZhY3RvcnkoXG4gICAgICB3aW5kb3csXG4gICAgICB3aW5kb3cuRmxpY2tpdHksXG4gICAgICB3aW5kb3cuZml6enlVSVV0aWxzXG4gICAgKTtcbiAgfVxuXG59KCB3aW5kb3csIGZ1bmN0aW9uIGZhY3RvcnkoIHdpbmRvdywgRmxpY2tpdHksIHV0aWxzICkge1xuXG4ndXNlIHN0cmljdCc7XG5cbi8vIGFwcGVuZCBjZWxscyB0byBhIGRvY3VtZW50IGZyYWdtZW50XG5mdW5jdGlvbiBnZXRDZWxsc0ZyYWdtZW50KCBjZWxscyApIHtcbiAgdmFyIGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICBjZWxscy5mb3JFYWNoKCBmdW5jdGlvbiggY2VsbCApIHtcbiAgICBmcmFnbWVudC5hcHBlbmRDaGlsZCggY2VsbC5lbGVtZW50ICk7XG4gIH0pO1xuICByZXR1cm4gZnJhZ21lbnQ7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGFkZC9yZW1vdmUgY2VsbCBwcm90b3R5cGUgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxudmFyIHByb3RvID0gRmxpY2tpdHkucHJvdG90eXBlO1xuXG4vKipcbiAqIEluc2VydCwgcHJlcGVuZCwgb3IgYXBwZW5kIGNlbGxzXG4gKiBAcGFyYW0ge0VsZW1lbnQsIEFycmF5LCBOb2RlTGlzdH0gZWxlbXNcbiAqIEBwYXJhbSB7SW50ZWdlcn0gaW5kZXhcbiAqL1xucHJvdG8uaW5zZXJ0ID0gZnVuY3Rpb24oIGVsZW1zLCBpbmRleCApIHtcbiAgdmFyIGNlbGxzID0gdGhpcy5fbWFrZUNlbGxzKCBlbGVtcyApO1xuICBpZiAoICFjZWxscyB8fCAhY2VsbHMubGVuZ3RoICkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbGVuID0gdGhpcy5jZWxscy5sZW5ndGg7XG4gIC8vIGRlZmF1bHQgdG8gYXBwZW5kXG4gIGluZGV4ID0gaW5kZXggPT09IHVuZGVmaW5lZCA/IGxlbiA6IGluZGV4O1xuICAvLyBhZGQgY2VsbHMgd2l0aCBkb2N1bWVudCBmcmFnbWVudFxuICB2YXIgZnJhZ21lbnQgPSBnZXRDZWxsc0ZyYWdtZW50KCBjZWxscyApO1xuICAvLyBhcHBlbmQgdG8gc2xpZGVyXG4gIHZhciBpc0FwcGVuZCA9IGluZGV4ID09IGxlbjtcbiAgaWYgKCBpc0FwcGVuZCApIHtcbiAgICB0aGlzLnNsaWRlci5hcHBlbmRDaGlsZCggZnJhZ21lbnQgKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgaW5zZXJ0Q2VsbEVsZW1lbnQgPSB0aGlzLmNlbGxzWyBpbmRleCBdLmVsZW1lbnQ7XG4gICAgdGhpcy5zbGlkZXIuaW5zZXJ0QmVmb3JlKCBmcmFnbWVudCwgaW5zZXJ0Q2VsbEVsZW1lbnQgKTtcbiAgfVxuICAvLyBhZGQgdG8gdGhpcy5jZWxsc1xuICBpZiAoIGluZGV4ID09PSAwICkge1xuICAgIC8vIHByZXBlbmQsIGFkZCB0byBzdGFydFxuICAgIHRoaXMuY2VsbHMgPSBjZWxscy5jb25jYXQoIHRoaXMuY2VsbHMgKTtcbiAgfSBlbHNlIGlmICggaXNBcHBlbmQgKSB7XG4gICAgLy8gYXBwZW5kLCBhZGQgdG8gZW5kXG4gICAgdGhpcy5jZWxscyA9IHRoaXMuY2VsbHMuY29uY2F0KCBjZWxscyApO1xuICB9IGVsc2Uge1xuICAgIC8vIGluc2VydCBpbiB0aGlzLmNlbGxzXG4gICAgdmFyIGVuZENlbGxzID0gdGhpcy5jZWxscy5zcGxpY2UoIGluZGV4LCBsZW4gLSBpbmRleCApO1xuICAgIHRoaXMuY2VsbHMgPSB0aGlzLmNlbGxzLmNvbmNhdCggY2VsbHMgKS5jb25jYXQoIGVuZENlbGxzICk7XG4gIH1cblxuICB0aGlzLl9zaXplQ2VsbHMoIGNlbGxzICk7XG5cbiAgdmFyIHNlbGVjdGVkSW5kZXhEZWx0YSA9IGluZGV4ID4gdGhpcy5zZWxlY3RlZEluZGV4ID8gMCA6IGNlbGxzLmxlbmd0aDtcbiAgdGhpcy5fY2VsbEFkZGVkUmVtb3ZlZCggaW5kZXgsIHNlbGVjdGVkSW5kZXhEZWx0YSApO1xufTtcblxucHJvdG8uYXBwZW5kID0gZnVuY3Rpb24oIGVsZW1zICkge1xuICB0aGlzLmluc2VydCggZWxlbXMsIHRoaXMuY2VsbHMubGVuZ3RoICk7XG59O1xuXG5wcm90by5wcmVwZW5kID0gZnVuY3Rpb24oIGVsZW1zICkge1xuICB0aGlzLmluc2VydCggZWxlbXMsIDAgKTtcbn07XG5cbi8qKlxuICogUmVtb3ZlIGNlbGxzXG4gKiBAcGFyYW0ge0VsZW1lbnQsIEFycmF5LCBOb2RlTGlzdH0gZWxlbXNcbiAqL1xucHJvdG8ucmVtb3ZlID0gZnVuY3Rpb24oIGVsZW1zICkge1xuICB2YXIgY2VsbHMgPSB0aGlzLmdldENlbGxzKCBlbGVtcyApO1xuICB2YXIgc2VsZWN0ZWRJbmRleERlbHRhID0gMDtcbiAgdmFyIGxlbiA9IGNlbGxzLmxlbmd0aDtcbiAgdmFyIGksIGNlbGw7XG4gIC8vIGNhbGN1bGF0ZSBzZWxlY3RlZEluZGV4RGVsdGEsIGVhc2llciBpZiBkb25lIGluIHNlcGVyYXRlIGxvb3BcbiAgZm9yICggaT0wOyBpIDwgbGVuOyBpKysgKSB7XG4gICAgY2VsbCA9IGNlbGxzW2ldO1xuICAgIHZhciB3YXNCZWZvcmUgPSB0aGlzLmNlbGxzLmluZGV4T2YoIGNlbGwgKSA8IHRoaXMuc2VsZWN0ZWRJbmRleDtcbiAgICBzZWxlY3RlZEluZGV4RGVsdGEgLT0gd2FzQmVmb3JlID8gMSA6IDA7XG4gIH1cblxuICBmb3IgKCBpPTA7IGkgPCBsZW47IGkrKyApIHtcbiAgICBjZWxsID0gY2VsbHNbaV07XG4gICAgY2VsbC5yZW1vdmUoKTtcbiAgICAvLyByZW1vdmUgaXRlbSBmcm9tIGNvbGxlY3Rpb25cbiAgICB1dGlscy5yZW1vdmVGcm9tKCB0aGlzLmNlbGxzLCBjZWxsICk7XG4gIH1cblxuICBpZiAoIGNlbGxzLmxlbmd0aCApIHtcbiAgICAvLyB1cGRhdGUgc3R1ZmZcbiAgICB0aGlzLl9jZWxsQWRkZWRSZW1vdmVkKCAwLCBzZWxlY3RlZEluZGV4RGVsdGEgKTtcbiAgfVxufTtcblxuLy8gdXBkYXRlcyB3aGVuIGNlbGxzIGFyZSBhZGRlZCBvciByZW1vdmVkXG5wcm90by5fY2VsbEFkZGVkUmVtb3ZlZCA9IGZ1bmN0aW9uKCBjaGFuZ2VkQ2VsbEluZGV4LCBzZWxlY3RlZEluZGV4RGVsdGEgKSB7XG4gIC8vIFRPRE8gdGhpcyBtYXRoIGlzbid0IHBlcmZlY3Qgd2l0aCBncm91cGVkIHNsaWRlc1xuICBzZWxlY3RlZEluZGV4RGVsdGEgPSBzZWxlY3RlZEluZGV4RGVsdGEgfHwgMDtcbiAgdGhpcy5zZWxlY3RlZEluZGV4ICs9IHNlbGVjdGVkSW5kZXhEZWx0YTtcbiAgdGhpcy5zZWxlY3RlZEluZGV4ID0gTWF0aC5tYXgoIDAsIE1hdGgubWluKCB0aGlzLnNsaWRlcy5sZW5ndGggLSAxLCB0aGlzLnNlbGVjdGVkSW5kZXggKSApO1xuXG4gIHRoaXMuY2VsbENoYW5nZSggY2hhbmdlZENlbGxJbmRleCwgdHJ1ZSApO1xuICAvLyBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eVxuICB0aGlzLmVtaXRFdmVudCggJ2NlbGxBZGRlZFJlbW92ZWQnLCBbIGNoYW5nZWRDZWxsSW5kZXgsIHNlbGVjdGVkSW5kZXhEZWx0YSBdICk7XG59O1xuXG4vKipcbiAqIGxvZ2ljIHRvIGJlIHJ1biBhZnRlciBhIGNlbGwncyBzaXplIGNoYW5nZXNcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbSAtIGNlbGwncyBlbGVtZW50XG4gKi9cbnByb3RvLmNlbGxTaXplQ2hhbmdlID0gZnVuY3Rpb24oIGVsZW0gKSB7XG4gIHZhciBjZWxsID0gdGhpcy5nZXRDZWxsKCBlbGVtICk7XG4gIGlmICggIWNlbGwgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNlbGwuZ2V0U2l6ZSgpO1xuXG4gIHZhciBpbmRleCA9IHRoaXMuY2VsbHMuaW5kZXhPZiggY2VsbCApO1xuICB0aGlzLmNlbGxDaGFuZ2UoIGluZGV4ICk7XG59O1xuXG4vKipcbiAqIGxvZ2ljIGFueSB0aW1lIGEgY2VsbCBpcyBjaGFuZ2VkOiBhZGRlZCwgcmVtb3ZlZCwgb3Igc2l6ZSBjaGFuZ2VkXG4gKiBAcGFyYW0ge0ludGVnZXJ9IGNoYW5nZWRDZWxsSW5kZXggLSBpbmRleCBvZiB0aGUgY2hhbmdlZCBjZWxsLCBvcHRpb25hbFxuICovXG5wcm90by5jZWxsQ2hhbmdlID0gZnVuY3Rpb24oIGNoYW5nZWRDZWxsSW5kZXgsIGlzUG9zaXRpb25pbmdTbGlkZXIgKSB7XG4gIHZhciBwcmV2U2xpZGVhYmxlV2lkdGggPSB0aGlzLnNsaWRlYWJsZVdpZHRoO1xuICB0aGlzLl9wb3NpdGlvbkNlbGxzKCBjaGFuZ2VkQ2VsbEluZGV4ICk7XG4gIHRoaXMuX2dldFdyYXBTaGlmdENlbGxzKCk7XG4gIHRoaXMuc2V0R2FsbGVyeVNpemUoKTtcbiAgdGhpcy5lbWl0RXZlbnQoICdjZWxsQ2hhbmdlJywgWyBjaGFuZ2VkQ2VsbEluZGV4IF0gKTtcbiAgLy8gcG9zaXRpb24gc2xpZGVyXG4gIGlmICggdGhpcy5vcHRpb25zLmZyZWVTY3JvbGwgKSB7XG4gICAgLy8gc2hpZnQgeCBieSBjaGFuZ2UgaW4gc2xpZGVhYmxlV2lkdGhcbiAgICAvLyBUT0RPIGZpeCBwb3NpdGlvbiBzaGlmdHMgd2hlbiBwcmVwZW5kaW5nIHcvIGZyZWVTY3JvbGxcbiAgICB2YXIgZGVsdGFYID0gcHJldlNsaWRlYWJsZVdpZHRoIC0gdGhpcy5zbGlkZWFibGVXaWR0aDtcbiAgICB0aGlzLnggKz0gZGVsdGFYICogdGhpcy5jZWxsQWxpZ247XG4gICAgdGhpcy5wb3NpdGlvblNsaWRlcigpO1xuICB9IGVsc2Uge1xuICAgIC8vIGRvIG5vdCBwb3NpdGlvbiBzbGlkZXIgYWZ0ZXIgbGF6eSBsb2FkXG4gICAgaWYgKCBpc1Bvc2l0aW9uaW5nU2xpZGVyICkge1xuICAgICAgdGhpcy5wb3NpdGlvblNsaWRlckF0U2VsZWN0ZWQoKTtcbiAgICB9XG4gICAgdGhpcy5zZWxlY3QoIHRoaXMuc2VsZWN0ZWRJbmRleCApO1xuICB9XG59O1xuXG4vLyAtLS0tLSAgLS0tLS0gLy9cblxucmV0dXJuIEZsaWNraXR5O1xuXG59KSk7XG4iLCIvLyBhbmltYXRlXG4oIGZ1bmN0aW9uKCB3aW5kb3csIGZhY3RvcnkgKSB7XG4gIC8vIHVuaXZlcnNhbCBtb2R1bGUgZGVmaW5pdGlvblxuICAvKiBqc2hpbnQgc3RyaWN0OiBmYWxzZSAqL1xuICBpZiAoIHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kICkge1xuICAgIC8vIEFNRFxuICAgIGRlZmluZSggW1xuICAgICAgJ2Zpenp5LXVpLXV0aWxzL3V0aWxzJ1xuICAgIF0sIGZ1bmN0aW9uKCB1dGlscyApIHtcbiAgICAgIHJldHVybiBmYWN0b3J5KCB3aW5kb3csIHV0aWxzICk7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAoIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMgKSB7XG4gICAgLy8gQ29tbW9uSlNcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoXG4gICAgICB3aW5kb3csXG4gICAgICByZXF1aXJlKCdmaXp6eS11aS11dGlscycpXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBicm93c2VyIGdsb2JhbFxuICAgIHdpbmRvdy5GbGlja2l0eSA9IHdpbmRvdy5GbGlja2l0eSB8fCB7fTtcbiAgICB3aW5kb3cuRmxpY2tpdHkuYW5pbWF0ZVByb3RvdHlwZSA9IGZhY3RvcnkoXG4gICAgICB3aW5kb3csXG4gICAgICB3aW5kb3cuZml6enlVSVV0aWxzXG4gICAgKTtcbiAgfVxuXG59KCB3aW5kb3csIGZ1bmN0aW9uIGZhY3RvcnkoIHdpbmRvdywgdXRpbHMgKSB7XG5cbid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbi8vIGdldCByQUYsIHByZWZpeGVkLCBpZiBwcmVzZW50XG52YXIgcmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lO1xuXG4vLyBmYWxsYmFjayB0byBzZXRUaW1lb3V0XG52YXIgbGFzdFRpbWUgPSAwO1xuaWYgKCAhcmVxdWVzdEFuaW1hdGlvbkZyYW1lICkgIHtcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gZnVuY3Rpb24oIGNhbGxiYWNrICkge1xuICAgIHZhciBjdXJyVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIHZhciB0aW1lVG9DYWxsID0gTWF0aC5tYXgoIDAsIDE2IC0gKCBjdXJyVGltZSAtIGxhc3RUaW1lICkgKTtcbiAgICB2YXIgaWQgPSBzZXRUaW1lb3V0KCBjYWxsYmFjaywgdGltZVRvQ2FsbCApO1xuICAgIGxhc3RUaW1lID0gY3VyclRpbWUgKyB0aW1lVG9DYWxsO1xuICAgIHJldHVybiBpZDtcbiAgfTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gYW5pbWF0ZSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG52YXIgcHJvdG8gPSB7fTtcblxucHJvdG8uc3RhcnRBbmltYXRpb24gPSBmdW5jdGlvbigpIHtcbiAgaWYgKCB0aGlzLmlzQW5pbWF0aW5nICkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHRoaXMuaXNBbmltYXRpbmcgPSB0cnVlO1xuICB0aGlzLnJlc3RpbmdGcmFtZXMgPSAwO1xuICB0aGlzLmFuaW1hdGUoKTtcbn07XG5cbnByb3RvLmFuaW1hdGUgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5hcHBseURyYWdGb3JjZSgpO1xuICB0aGlzLmFwcGx5U2VsZWN0ZWRBdHRyYWN0aW9uKCk7XG5cbiAgdmFyIHByZXZpb3VzWCA9IHRoaXMueDtcblxuICB0aGlzLmludGVncmF0ZVBoeXNpY3MoKTtcbiAgdGhpcy5wb3NpdGlvblNsaWRlcigpO1xuICB0aGlzLnNldHRsZSggcHJldmlvdXNYICk7XG4gIC8vIGFuaW1hdGUgbmV4dCBmcmFtZVxuICBpZiAoIHRoaXMuaXNBbmltYXRpbmcgKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoIGZ1bmN0aW9uIGFuaW1hdGVGcmFtZSgpIHtcbiAgICAgIF90aGlzLmFuaW1hdGUoKTtcbiAgICB9KTtcbiAgfVxufTtcblxuXG52YXIgdHJhbnNmb3JtUHJvcGVydHkgPSAoIGZ1bmN0aW9uICgpIHtcbiAgdmFyIHN0eWxlID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlO1xuICBpZiAoIHR5cGVvZiBzdHlsZS50cmFuc2Zvcm0gPT0gJ3N0cmluZycgKSB7XG4gICAgcmV0dXJuICd0cmFuc2Zvcm0nO1xuICB9XG4gIHJldHVybiAnV2Via2l0VHJhbnNmb3JtJztcbn0pKCk7XG5cbnByb3RvLnBvc2l0aW9uU2xpZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciB4ID0gdGhpcy54O1xuICAvLyB3cmFwIHBvc2l0aW9uIGFyb3VuZFxuICBpZiAoIHRoaXMub3B0aW9ucy53cmFwQXJvdW5kICYmIHRoaXMuY2VsbHMubGVuZ3RoID4gMSApIHtcbiAgICB4ID0gdXRpbHMubW9kdWxvKCB4LCB0aGlzLnNsaWRlYWJsZVdpZHRoICk7XG4gICAgeCA9IHggLSB0aGlzLnNsaWRlYWJsZVdpZHRoO1xuICAgIHRoaXMuc2hpZnRXcmFwQ2VsbHMoIHggKTtcbiAgfVxuXG4gIHggPSB4ICsgdGhpcy5jdXJzb3JQb3NpdGlvbjtcbiAgLy8gcmV2ZXJzZSBpZiByaWdodC10by1sZWZ0IGFuZCB1c2luZyB0cmFuc2Zvcm1cbiAgeCA9IHRoaXMub3B0aW9ucy5yaWdodFRvTGVmdCAmJiB0cmFuc2Zvcm1Qcm9wZXJ0eSA/IC14IDogeDtcbiAgdmFyIHZhbHVlID0gdGhpcy5nZXRQb3NpdGlvblZhbHVlKCB4ICk7XG4gIC8vIHVzZSAzRCB0cmFuZm9ybXMgZm9yIGhhcmR3YXJlIGFjY2VsZXJhdGlvbiBvbiBpT1NcbiAgLy8gYnV0IHVzZSAyRCB3aGVuIHNldHRsZWQsIGZvciBiZXR0ZXIgZm9udC1yZW5kZXJpbmdcbiAgdGhpcy5zbGlkZXIuc3R5bGVbIHRyYW5zZm9ybVByb3BlcnR5IF0gPSB0aGlzLmlzQW5pbWF0aW5nID9cbiAgICAndHJhbnNsYXRlM2QoJyArIHZhbHVlICsgJywwLDApJyA6ICd0cmFuc2xhdGVYKCcgKyB2YWx1ZSArICcpJztcblxuICAvLyBzY3JvbGwgZXZlbnRcbiAgdmFyIGZpcnN0U2xpZGUgPSB0aGlzLnNsaWRlc1swXTtcbiAgaWYgKCBmaXJzdFNsaWRlICkge1xuICAgIHZhciBwb3NpdGlvblggPSAtdGhpcy54IC0gZmlyc3RTbGlkZS50YXJnZXQ7XG4gICAgdmFyIHByb2dyZXNzID0gcG9zaXRpb25YIC8gdGhpcy5zbGlkZXNXaWR0aDtcbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQoICdzY3JvbGwnLCBudWxsLCBbIHByb2dyZXNzLCBwb3NpdGlvblggXSApO1xuICB9XG59O1xuXG5wcm90by5wb3NpdGlvblNsaWRlckF0U2VsZWN0ZWQgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCAhdGhpcy5jZWxscy5sZW5ndGggKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRoaXMueCA9IC10aGlzLnNlbGVjdGVkU2xpZGUudGFyZ2V0O1xuICB0aGlzLnBvc2l0aW9uU2xpZGVyKCk7XG59O1xuXG5wcm90by5nZXRQb3NpdGlvblZhbHVlID0gZnVuY3Rpb24oIHBvc2l0aW9uICkge1xuICBpZiAoIHRoaXMub3B0aW9ucy5wZXJjZW50UG9zaXRpb24gKSB7XG4gICAgLy8gcGVyY2VudCBwb3NpdGlvbiwgcm91bmQgdG8gMiBkaWdpdHMsIGxpa2UgMTIuMzQlXG4gICAgcmV0dXJuICggTWF0aC5yb3VuZCggKCBwb3NpdGlvbiAvIHRoaXMuc2l6ZS5pbm5lcldpZHRoICkgKiAxMDAwMCApICogMC4wMSApKyAnJSc7XG4gIH0gZWxzZSB7XG4gICAgLy8gcGl4ZWwgcG9zaXRpb25pbmdcbiAgICByZXR1cm4gTWF0aC5yb3VuZCggcG9zaXRpb24gKSArICdweCc7XG4gIH1cbn07XG5cbnByb3RvLnNldHRsZSA9IGZ1bmN0aW9uKCBwcmV2aW91c1ggKSB7XG4gIC8vIGtlZXAgdHJhY2sgb2YgZnJhbWVzIHdoZXJlIHggaGFzbid0IG1vdmVkXG4gIGlmICggIXRoaXMuaXNQb2ludGVyRG93biAmJiBNYXRoLnJvdW5kKCB0aGlzLnggKiAxMDAgKSA9PSBNYXRoLnJvdW5kKCBwcmV2aW91c1ggKiAxMDAgKSApIHtcbiAgICB0aGlzLnJlc3RpbmdGcmFtZXMrKztcbiAgfVxuICAvLyBzdG9wIGFuaW1hdGluZyBpZiByZXN0aW5nIGZvciAzIG9yIG1vcmUgZnJhbWVzXG4gIGlmICggdGhpcy5yZXN0aW5nRnJhbWVzID4gMiApIHtcbiAgICB0aGlzLmlzQW5pbWF0aW5nID0gZmFsc2U7XG4gICAgZGVsZXRlIHRoaXMuaXNGcmVlU2Nyb2xsaW5nO1xuICAgIC8vIHJlbmRlciBwb3NpdGlvbiB3aXRoIHRyYW5zbGF0ZVggd2hlbiBzZXR0bGVkXG4gICAgdGhpcy5wb3NpdGlvblNsaWRlcigpO1xuICAgIHRoaXMuZGlzcGF0Y2hFdmVudCgnc2V0dGxlJyk7XG4gIH1cbn07XG5cbnByb3RvLnNoaWZ0V3JhcENlbGxzID0gZnVuY3Rpb24oIHggKSB7XG4gIC8vIHNoaWZ0IGJlZm9yZSBjZWxsc1xuICB2YXIgYmVmb3JlR2FwID0gdGhpcy5jdXJzb3JQb3NpdGlvbiArIHg7XG4gIHRoaXMuX3NoaWZ0Q2VsbHMoIHRoaXMuYmVmb3JlU2hpZnRDZWxscywgYmVmb3JlR2FwLCAtMSApO1xuICAvLyBzaGlmdCBhZnRlciBjZWxsc1xuICB2YXIgYWZ0ZXJHYXAgPSB0aGlzLnNpemUuaW5uZXJXaWR0aCAtICggeCArIHRoaXMuc2xpZGVhYmxlV2lkdGggKyB0aGlzLmN1cnNvclBvc2l0aW9uICk7XG4gIHRoaXMuX3NoaWZ0Q2VsbHMoIHRoaXMuYWZ0ZXJTaGlmdENlbGxzLCBhZnRlckdhcCwgMSApO1xufTtcblxucHJvdG8uX3NoaWZ0Q2VsbHMgPSBmdW5jdGlvbiggY2VsbHMsIGdhcCwgc2hpZnQgKSB7XG4gIGZvciAoIHZhciBpPTA7IGkgPCBjZWxscy5sZW5ndGg7IGkrKyApIHtcbiAgICB2YXIgY2VsbCA9IGNlbGxzW2ldO1xuICAgIHZhciBjZWxsU2hpZnQgPSBnYXAgPiAwID8gc2hpZnQgOiAwO1xuICAgIGNlbGwud3JhcFNoaWZ0KCBjZWxsU2hpZnQgKTtcbiAgICBnYXAgLT0gY2VsbC5zaXplLm91dGVyV2lkdGg7XG4gIH1cbn07XG5cbnByb3RvLl91bnNoaWZ0Q2VsbHMgPSBmdW5jdGlvbiggY2VsbHMgKSB7XG4gIGlmICggIWNlbGxzIHx8ICFjZWxscy5sZW5ndGggKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGZvciAoIHZhciBpPTA7IGkgPCBjZWxscy5sZW5ndGg7IGkrKyApIHtcbiAgICBjZWxsc1tpXS53cmFwU2hpZnQoIDAgKTtcbiAgfVxufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gcGh5c2ljcyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG5wcm90by5pbnRlZ3JhdGVQaHlzaWNzID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMueCArPSB0aGlzLnZlbG9jaXR5O1xuICB0aGlzLnZlbG9jaXR5ICo9IHRoaXMuZ2V0RnJpY3Rpb25GYWN0b3IoKTtcbn07XG5cbnByb3RvLmFwcGx5Rm9yY2UgPSBmdW5jdGlvbiggZm9yY2UgKSB7XG4gIHRoaXMudmVsb2NpdHkgKz0gZm9yY2U7XG59O1xuXG5wcm90by5nZXRGcmljdGlvbkZhY3RvciA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gMSAtIHRoaXMub3B0aW9uc1sgdGhpcy5pc0ZyZWVTY3JvbGxpbmcgPyAnZnJlZVNjcm9sbEZyaWN0aW9uJyA6ICdmcmljdGlvbicgXTtcbn07XG5cbnByb3RvLmdldFJlc3RpbmdQb3NpdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAvLyBteSB0aGFua3MgdG8gU3RldmVuIFdpdHRlbnMsIHdobyBzaW1wbGlmaWVkIHRoaXMgbWF0aCBncmVhdGx5XG4gIHJldHVybiB0aGlzLnggKyB0aGlzLnZlbG9jaXR5IC8gKCAxIC0gdGhpcy5nZXRGcmljdGlvbkZhY3RvcigpICk7XG59O1xuXG5wcm90by5hcHBseURyYWdGb3JjZSA9IGZ1bmN0aW9uKCkge1xuICBpZiAoICF0aGlzLmlzUG9pbnRlckRvd24gKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIGNoYW5nZSB0aGUgcG9zaXRpb24gdG8gZHJhZyBwb3NpdGlvbiBieSBhcHBseWluZyBmb3JjZVxuICB2YXIgZHJhZ1ZlbG9jaXR5ID0gdGhpcy5kcmFnWCAtIHRoaXMueDtcbiAgdmFyIGRyYWdGb3JjZSA9IGRyYWdWZWxvY2l0eSAtIHRoaXMudmVsb2NpdHk7XG4gIHRoaXMuYXBwbHlGb3JjZSggZHJhZ0ZvcmNlICk7XG59O1xuXG5wcm90by5hcHBseVNlbGVjdGVkQXR0cmFjdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAvLyBkbyBub3QgYXR0cmFjdCBpZiBwb2ludGVyIGRvd24gb3Igbm8gY2VsbHNcbiAgaWYgKCB0aGlzLmlzUG9pbnRlckRvd24gfHwgdGhpcy5pc0ZyZWVTY3JvbGxpbmcgfHwgIXRoaXMuY2VsbHMubGVuZ3RoICkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgZGlzdGFuY2UgPSB0aGlzLnNlbGVjdGVkU2xpZGUudGFyZ2V0ICogLTEgLSB0aGlzLng7XG4gIHZhciBmb3JjZSA9IGRpc3RhbmNlICogdGhpcy5vcHRpb25zLnNlbGVjdGVkQXR0cmFjdGlvbjtcbiAgdGhpcy5hcHBseUZvcmNlKCBmb3JjZSApO1xufTtcblxucmV0dXJuIHByb3RvO1xuXG59KSk7XG4iLCIvLyBGbGlja2l0eS5DZWxsXG4oIGZ1bmN0aW9uKCB3aW5kb3csIGZhY3RvcnkgKSB7XG4gIC8vIHVuaXZlcnNhbCBtb2R1bGUgZGVmaW5pdGlvblxuICAvKiBqc2hpbnQgc3RyaWN0OiBmYWxzZSAqL1xuICBpZiAoIHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kICkge1xuICAgIC8vIEFNRFxuICAgIGRlZmluZSggW1xuICAgICAgJ2dldC1zaXplL2dldC1zaXplJ1xuICAgIF0sIGZ1bmN0aW9uKCBnZXRTaXplICkge1xuICAgICAgcmV0dXJuIGZhY3RvcnkoIHdpbmRvdywgZ2V0U2l6ZSApO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKCB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzICkge1xuICAgIC8vIENvbW1vbkpTXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KFxuICAgICAgd2luZG93LFxuICAgICAgcmVxdWlyZSgnZ2V0LXNpemUnKVxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgLy8gYnJvd3NlciBnbG9iYWxcbiAgICB3aW5kb3cuRmxpY2tpdHkgPSB3aW5kb3cuRmxpY2tpdHkgfHwge307XG4gICAgd2luZG93LkZsaWNraXR5LkNlbGwgPSBmYWN0b3J5KFxuICAgICAgd2luZG93LFxuICAgICAgd2luZG93LmdldFNpemVcbiAgICApO1xuICB9XG5cbn0oIHdpbmRvdywgZnVuY3Rpb24gZmFjdG9yeSggd2luZG93LCBnZXRTaXplICkge1xuXG4ndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIENlbGwoIGVsZW0sIHBhcmVudCApIHtcbiAgdGhpcy5lbGVtZW50ID0gZWxlbTtcbiAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG5cbiAgdGhpcy5jcmVhdGUoKTtcbn1cblxudmFyIHByb3RvID0gQ2VsbC5wcm90b3R5cGU7XG5cbnByb3RvLmNyZWF0ZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICB0aGlzLnggPSAwO1xuICB0aGlzLnNoaWZ0ID0gMDtcbn07XG5cbnByb3RvLmRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcbiAgLy8gcmVzZXQgc3R5bGVcbiAgdGhpcy5lbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gJyc7XG4gIHZhciBzaWRlID0gdGhpcy5wYXJlbnQub3JpZ2luU2lkZTtcbiAgdGhpcy5lbGVtZW50LnN0eWxlWyBzaWRlIF0gPSAnJztcbn07XG5cbnByb3RvLmdldFNpemUgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5zaXplID0gZ2V0U2l6ZSggdGhpcy5lbGVtZW50ICk7XG59O1xuXG5wcm90by5zZXRQb3NpdGlvbiA9IGZ1bmN0aW9uKCB4ICkge1xuICB0aGlzLnggPSB4O1xuICB0aGlzLnVwZGF0ZVRhcmdldCgpO1xuICB0aGlzLnJlbmRlclBvc2l0aW9uKCB4ICk7XG59O1xuXG4vLyBzZXREZWZhdWx0VGFyZ2V0IHYxIG1ldGhvZCwgYmFja3dhcmRzIGNvbXBhdGliaWxpdHksIHJlbW92ZSBpbiB2M1xucHJvdG8udXBkYXRlVGFyZ2V0ID0gcHJvdG8uc2V0RGVmYXVsdFRhcmdldCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgbWFyZ2luUHJvcGVydHkgPSB0aGlzLnBhcmVudC5vcmlnaW5TaWRlID09ICdsZWZ0JyA/ICdtYXJnaW5MZWZ0JyA6ICdtYXJnaW5SaWdodCc7XG4gIHRoaXMudGFyZ2V0ID0gdGhpcy54ICsgdGhpcy5zaXplWyBtYXJnaW5Qcm9wZXJ0eSBdICtcbiAgICB0aGlzLnNpemUud2lkdGggKiB0aGlzLnBhcmVudC5jZWxsQWxpZ247XG59O1xuXG5wcm90by5yZW5kZXJQb3NpdGlvbiA9IGZ1bmN0aW9uKCB4ICkge1xuICAvLyByZW5kZXIgcG9zaXRpb24gb2YgY2VsbCB3aXRoIGluIHNsaWRlclxuICB2YXIgc2lkZSA9IHRoaXMucGFyZW50Lm9yaWdpblNpZGU7XG4gIHRoaXMuZWxlbWVudC5zdHlsZVsgc2lkZSBdID0gdGhpcy5wYXJlbnQuZ2V0UG9zaXRpb25WYWx1ZSggeCApO1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge0ludGVnZXJ9IGZhY3RvciAtIDAsIDEsIG9yIC0xXG4qKi9cbnByb3RvLndyYXBTaGlmdCA9IGZ1bmN0aW9uKCBzaGlmdCApIHtcbiAgdGhpcy5zaGlmdCA9IHNoaWZ0O1xuICB0aGlzLnJlbmRlclBvc2l0aW9uKCB0aGlzLnggKyB0aGlzLnBhcmVudC5zbGlkZWFibGVXaWR0aCAqIHNoaWZ0ICk7XG59O1xuXG5wcm90by5yZW1vdmUgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5lbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoIHRoaXMuZWxlbWVudCApO1xufTtcblxucmV0dXJuIENlbGw7XG5cbn0pKTtcbiIsIi8vIGRyYWdcbiggZnVuY3Rpb24oIHdpbmRvdywgZmFjdG9yeSApIHtcbiAgLy8gdW5pdmVyc2FsIG1vZHVsZSBkZWZpbml0aW9uXG4gIC8qIGpzaGludCBzdHJpY3Q6IGZhbHNlICovXG4gIGlmICggdHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgKSB7XG4gICAgLy8gQU1EXG4gICAgZGVmaW5lKCBbXG4gICAgICAnLi9mbGlja2l0eScsXG4gICAgICAndW5pZHJhZ2dlci91bmlkcmFnZ2VyJyxcbiAgICAgICdmaXp6eS11aS11dGlscy91dGlscydcbiAgICBdLCBmdW5jdGlvbiggRmxpY2tpdHksIFVuaWRyYWdnZXIsIHV0aWxzICkge1xuICAgICAgcmV0dXJuIGZhY3RvcnkoIHdpbmRvdywgRmxpY2tpdHksIFVuaWRyYWdnZXIsIHV0aWxzICk7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAoIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMgKSB7XG4gICAgLy8gQ29tbW9uSlNcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoXG4gICAgICB3aW5kb3csXG4gICAgICByZXF1aXJlKCcuL2ZsaWNraXR5JyksXG4gICAgICByZXF1aXJlKCd1bmlkcmFnZ2VyJyksXG4gICAgICByZXF1aXJlKCdmaXp6eS11aS11dGlscycpXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBicm93c2VyIGdsb2JhbFxuICAgIHdpbmRvdy5GbGlja2l0eSA9IGZhY3RvcnkoXG4gICAgICB3aW5kb3csXG4gICAgICB3aW5kb3cuRmxpY2tpdHksXG4gICAgICB3aW5kb3cuVW5pZHJhZ2dlcixcbiAgICAgIHdpbmRvdy5maXp6eVVJVXRpbHNcbiAgICApO1xuICB9XG5cbn0oIHdpbmRvdywgZnVuY3Rpb24gZmFjdG9yeSggd2luZG93LCBGbGlja2l0eSwgVW5pZHJhZ2dlciwgdXRpbHMgKSB7XG5cbid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0gZGVmYXVsdHMgLS0tLS0gLy9cblxudXRpbHMuZXh0ZW5kKCBGbGlja2l0eS5kZWZhdWx0cywge1xuICBkcmFnZ2FibGU6IHRydWUsXG4gIGRyYWdUaHJlc2hvbGQ6IDMsXG59KTtcblxuLy8gLS0tLS0gY3JlYXRlIC0tLS0tIC8vXG5cbkZsaWNraXR5LmNyZWF0ZU1ldGhvZHMucHVzaCgnX2NyZWF0ZURyYWcnKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gZHJhZyBwcm90b3R5cGUgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxudmFyIHByb3RvID0gRmxpY2tpdHkucHJvdG90eXBlO1xudXRpbHMuZXh0ZW5kKCBwcm90bywgVW5pZHJhZ2dlci5wcm90b3R5cGUgKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbnByb3RvLl9jcmVhdGVEcmFnID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMub24oICdhY3RpdmF0ZScsIHRoaXMuYmluZERyYWcgKTtcbiAgdGhpcy5vbiggJ3VpQ2hhbmdlJywgdGhpcy5fdWlDaGFuZ2VEcmFnICk7XG4gIHRoaXMub24oICdjaGlsZFVJUG9pbnRlckRvd24nLCB0aGlzLl9jaGlsZFVJUG9pbnRlckRvd25EcmFnICk7XG4gIHRoaXMub24oICdkZWFjdGl2YXRlJywgdGhpcy51bmJpbmREcmFnICk7XG59O1xuXG5wcm90by5iaW5kRHJhZyA9IGZ1bmN0aW9uKCkge1xuICBpZiAoICF0aGlzLm9wdGlvbnMuZHJhZ2dhYmxlIHx8IHRoaXMuaXNEcmFnQm91bmQgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdpcy1kcmFnZ2FibGUnKTtcbiAgdGhpcy5oYW5kbGVzID0gWyB0aGlzLnZpZXdwb3J0IF07XG4gIHRoaXMuYmluZEhhbmRsZXMoKTtcbiAgdGhpcy5pc0RyYWdCb3VuZCA9IHRydWU7XG59O1xuXG5wcm90by51bmJpbmREcmFnID0gZnVuY3Rpb24oKSB7XG4gIGlmICggIXRoaXMuaXNEcmFnQm91bmQgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdpcy1kcmFnZ2FibGUnKTtcbiAgdGhpcy51bmJpbmRIYW5kbGVzKCk7XG4gIGRlbGV0ZSB0aGlzLmlzRHJhZ0JvdW5kO1xufTtcblxucHJvdG8uX3VpQ2hhbmdlRHJhZyA9IGZ1bmN0aW9uKCkge1xuICBkZWxldGUgdGhpcy5pc0ZyZWVTY3JvbGxpbmc7XG59O1xuXG5wcm90by5fY2hpbGRVSVBvaW50ZXJEb3duRHJhZyA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgdGhpcy5wb2ludGVyRG93bkZvY3VzKCBldmVudCApO1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gcG9pbnRlciBldmVudHMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuLy8gbm9kZXMgdGhhdCBoYXZlIHRleHQgZmllbGRzXG52YXIgY3Vyc29yTm9kZXMgPSB7XG4gIFRFWFRBUkVBOiB0cnVlLFxuICBJTlBVVDogdHJ1ZSxcbiAgT1BUSU9OOiB0cnVlLFxufTtcblxuLy8gaW5wdXQgdHlwZXMgdGhhdCBkbyBub3QgaGF2ZSB0ZXh0IGZpZWxkc1xudmFyIGNsaWNrVHlwZXMgPSB7XG4gIHJhZGlvOiB0cnVlLFxuICBjaGVja2JveDogdHJ1ZSxcbiAgYnV0dG9uOiB0cnVlLFxuICBzdWJtaXQ6IHRydWUsXG4gIGltYWdlOiB0cnVlLFxuICBmaWxlOiB0cnVlLFxufTtcblxucHJvdG8ucG9pbnRlckRvd24gPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIgKSB7XG4gIC8vIGRpc21pc3MgaW5wdXRzIHdpdGggdGV4dCBmaWVsZHMuICM0MDMsICM0MDRcbiAgdmFyIGlzQ3Vyc29ySW5wdXQgPSBjdXJzb3JOb2Rlc1sgZXZlbnQudGFyZ2V0Lm5vZGVOYW1lIF0gJiZcbiAgICAhY2xpY2tUeXBlc1sgZXZlbnQudGFyZ2V0LnR5cGUgXTtcbiAgaWYgKCBpc0N1cnNvcklucHV0ICkge1xuICAgIC8vIHJlc2V0IHBvaW50ZXJEb3duIGxvZ2ljXG4gICAgdGhpcy5pc1BvaW50ZXJEb3duID0gZmFsc2U7XG4gICAgZGVsZXRlIHRoaXMucG9pbnRlcklkZW50aWZpZXI7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdGhpcy5fZHJhZ1BvaW50ZXJEb3duKCBldmVudCwgcG9pbnRlciApO1xuXG4gIC8vIGtsdWRnZSB0byBibHVyIGZvY3VzZWQgaW5wdXRzIGluIGRyYWdnZXJcbiAgdmFyIGZvY3VzZWQgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICBpZiAoIGZvY3VzZWQgJiYgZm9jdXNlZC5ibHVyICYmIGZvY3VzZWQgIT0gdGhpcy5lbGVtZW50ICYmXG4gICAgLy8gZG8gbm90IGJsdXIgYm9keSBmb3IgSUU5ICYgMTAsICMxMTdcbiAgICBmb2N1c2VkICE9IGRvY3VtZW50LmJvZHkgKSB7XG4gICAgZm9jdXNlZC5ibHVyKCk7XG4gIH1cbiAgdGhpcy5wb2ludGVyRG93bkZvY3VzKCBldmVudCApO1xuICAvLyBzdG9wIGlmIGl0IHdhcyBtb3ZpbmdcbiAgdGhpcy5kcmFnWCA9IHRoaXMueDtcbiAgdGhpcy52aWV3cG9ydC5jbGFzc0xpc3QuYWRkKCdpcy1wb2ludGVyLWRvd24nKTtcbiAgLy8gYmluZCBtb3ZlIGFuZCBlbmQgZXZlbnRzXG4gIHRoaXMuX2JpbmRQb3N0U3RhcnRFdmVudHMoIGV2ZW50ICk7XG4gIC8vIHRyYWNrIHNjcm9sbGluZ1xuICB0aGlzLnBvaW50ZXJEb3duU2Nyb2xsID0gZ2V0U2Nyb2xsUG9zaXRpb24oKTtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoICdzY3JvbGwnLCB0aGlzICk7XG5cbiAgdGhpcy5kaXNwYXRjaEV2ZW50KCAncG9pbnRlckRvd24nLCBldmVudCwgWyBwb2ludGVyIF0gKTtcbn07XG5cbnZhciB0b3VjaFN0YXJ0RXZlbnRzID0ge1xuICB0b3VjaHN0YXJ0OiB0cnVlLFxuICBNU1BvaW50ZXJEb3duOiB0cnVlXG59O1xuXG52YXIgZm9jdXNOb2RlcyA9IHtcbiAgSU5QVVQ6IHRydWUsXG4gIFNFTEVDVDogdHJ1ZVxufTtcblxucHJvdG8ucG9pbnRlckRvd25Gb2N1cyA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgLy8gZm9jdXMgZWxlbWVudCwgaWYgbm90IHRvdWNoLCBhbmQgaXRzIG5vdCBhbiBpbnB1dCBvciBzZWxlY3RcbiAgaWYgKCAhdGhpcy5vcHRpb25zLmFjY2Vzc2liaWxpdHkgfHwgdG91Y2hTdGFydEV2ZW50c1sgZXZlbnQudHlwZSBdIHx8XG4gICAgICBmb2N1c05vZGVzWyBldmVudC50YXJnZXQubm9kZU5hbWUgXSApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIHByZXZTY3JvbGxZID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xuICB0aGlzLmVsZW1lbnQuZm9jdXMoKTtcbiAgLy8gaGFjayB0byBmaXggc2Nyb2xsIGp1bXAgYWZ0ZXIgZm9jdXMsICM3NlxuICBpZiAoIHdpbmRvdy5wYWdlWU9mZnNldCAhPSBwcmV2U2Nyb2xsWSApIHtcbiAgICB3aW5kb3cuc2Nyb2xsVG8oIHdpbmRvdy5wYWdlWE9mZnNldCwgcHJldlNjcm9sbFkgKTtcbiAgfVxufTtcblxucHJvdG8uY2FuUHJldmVudERlZmF1bHRPblBvaW50ZXJEb3duID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICAvLyBwcmV2ZW50IGRlZmF1bHQsIHVubGVzcyB0b3VjaHN0YXJ0IG9yIDxzZWxlY3Q+XG4gIHZhciBpc1RvdWNoc3RhcnQgPSBldmVudC50eXBlID09ICd0b3VjaHN0YXJ0JztcbiAgdmFyIHRhcmdldE5vZGVOYW1lID0gZXZlbnQudGFyZ2V0Lm5vZGVOYW1lO1xuICByZXR1cm4gIWlzVG91Y2hzdGFydCAmJiB0YXJnZXROb2RlTmFtZSAhPSAnU0VMRUNUJztcbn07XG5cbi8vIC0tLS0tIG1vdmUgLS0tLS0gLy9cblxucHJvdG8uaGFzRHJhZ1N0YXJ0ZWQgPSBmdW5jdGlvbiggbW92ZVZlY3RvciApIHtcbiAgcmV0dXJuIE1hdGguYWJzKCBtb3ZlVmVjdG9yLnggKSA+IHRoaXMub3B0aW9ucy5kcmFnVGhyZXNob2xkO1xufTtcblxuLy8gLS0tLS0gdXAgLS0tLS0gLy9cblxucHJvdG8ucG9pbnRlclVwID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICBkZWxldGUgdGhpcy5pc1RvdWNoU2Nyb2xsaW5nO1xuICB0aGlzLnZpZXdwb3J0LmNsYXNzTGlzdC5yZW1vdmUoJ2lzLXBvaW50ZXItZG93bicpO1xuICB0aGlzLmRpc3BhdGNoRXZlbnQoICdwb2ludGVyVXAnLCBldmVudCwgWyBwb2ludGVyIF0gKTtcbiAgdGhpcy5fZHJhZ1BvaW50ZXJVcCggZXZlbnQsIHBvaW50ZXIgKTtcbn07XG5cbnByb3RvLnBvaW50ZXJEb25lID0gZnVuY3Rpb24oKSB7XG4gIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCAnc2Nyb2xsJywgdGhpcyApO1xuICBkZWxldGUgdGhpcy5wb2ludGVyRG93blNjcm9sbDtcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGRyYWdnaW5nIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbnByb3RvLmRyYWdTdGFydCA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgdGhpcy5kcmFnU3RhcnRQb3NpdGlvbiA9IHRoaXMueDtcbiAgdGhpcy5zdGFydEFuaW1hdGlvbigpO1xuICB0aGlzLmRpc3BhdGNoRXZlbnQoICdkcmFnU3RhcnQnLCBldmVudCwgWyBwb2ludGVyIF0gKTtcbn07XG5cbnByb3RvLnBvaW50ZXJNb3ZlID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICB2YXIgbW92ZVZlY3RvciA9IHRoaXMuX2RyYWdQb2ludGVyTW92ZSggZXZlbnQsIHBvaW50ZXIgKTtcbiAgdGhpcy5kaXNwYXRjaEV2ZW50KCAncG9pbnRlck1vdmUnLCBldmVudCwgWyBwb2ludGVyLCBtb3ZlVmVjdG9yIF0gKTtcbiAgdGhpcy5fZHJhZ01vdmUoIGV2ZW50LCBwb2ludGVyLCBtb3ZlVmVjdG9yICk7XG59O1xuXG5wcm90by5kcmFnTW92ZSA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciwgbW92ZVZlY3RvciApIHtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICB0aGlzLnByZXZpb3VzRHJhZ1ggPSB0aGlzLmRyYWdYO1xuICAvLyByZXZlcnNlIGlmIHJpZ2h0LXRvLWxlZnRcbiAgdmFyIGRpcmVjdGlvbiA9IHRoaXMub3B0aW9ucy5yaWdodFRvTGVmdCA/IC0xIDogMTtcbiAgdmFyIGRyYWdYID0gdGhpcy5kcmFnU3RhcnRQb3NpdGlvbiArIG1vdmVWZWN0b3IueCAqIGRpcmVjdGlvbjtcblxuICBpZiAoICF0aGlzLm9wdGlvbnMud3JhcEFyb3VuZCAmJiB0aGlzLnNsaWRlcy5sZW5ndGggKSB7XG4gICAgLy8gc2xvdyBkcmFnXG4gICAgdmFyIG9yaWdpbkJvdW5kID0gTWF0aC5tYXgoIC10aGlzLnNsaWRlc1swXS50YXJnZXQsIHRoaXMuZHJhZ1N0YXJ0UG9zaXRpb24gKTtcbiAgICBkcmFnWCA9IGRyYWdYID4gb3JpZ2luQm91bmQgPyAoIGRyYWdYICsgb3JpZ2luQm91bmQgKSAqIDAuNSA6IGRyYWdYO1xuICAgIHZhciBlbmRCb3VuZCA9IE1hdGgubWluKCAtdGhpcy5nZXRMYXN0U2xpZGUoKS50YXJnZXQsIHRoaXMuZHJhZ1N0YXJ0UG9zaXRpb24gKTtcbiAgICBkcmFnWCA9IGRyYWdYIDwgZW5kQm91bmQgPyAoIGRyYWdYICsgZW5kQm91bmQgKSAqIDAuNSA6IGRyYWdYO1xuICB9XG5cbiAgdGhpcy5kcmFnWCA9IGRyYWdYO1xuXG4gIHRoaXMuZHJhZ01vdmVUaW1lID0gbmV3IERhdGUoKTtcbiAgdGhpcy5kaXNwYXRjaEV2ZW50KCAnZHJhZ01vdmUnLCBldmVudCwgWyBwb2ludGVyLCBtb3ZlVmVjdG9yIF0gKTtcbn07XG5cbnByb3RvLmRyYWdFbmQgPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIgKSB7XG4gIGlmICggdGhpcy5vcHRpb25zLmZyZWVTY3JvbGwgKSB7XG4gICAgdGhpcy5pc0ZyZWVTY3JvbGxpbmcgPSB0cnVlO1xuICB9XG4gIC8vIHNldCBzZWxlY3RlZEluZGV4IGJhc2VkIG9uIHdoZXJlIGZsaWNrIHdpbGwgZW5kIHVwXG4gIHZhciBpbmRleCA9IHRoaXMuZHJhZ0VuZFJlc3RpbmdTZWxlY3QoKTtcblxuICBpZiAoIHRoaXMub3B0aW9ucy5mcmVlU2Nyb2xsICYmICF0aGlzLm9wdGlvbnMud3JhcEFyb3VuZCApIHtcbiAgICAvLyBpZiBmcmVlLXNjcm9sbCAmIG5vdCB3cmFwIGFyb3VuZFxuICAgIC8vIGRvIG5vdCBmcmVlLXNjcm9sbCBpZiBnb2luZyBvdXRzaWRlIG9mIGJvdW5kaW5nIHNsaWRlc1xuICAgIC8vIHNvIGJvdW5kaW5nIHNsaWRlcyBjYW4gYXR0cmFjdCBzbGlkZXIsIGFuZCBrZWVwIGl0IGluIGJvdW5kc1xuICAgIHZhciByZXN0aW5nWCA9IHRoaXMuZ2V0UmVzdGluZ1Bvc2l0aW9uKCk7XG4gICAgdGhpcy5pc0ZyZWVTY3JvbGxpbmcgPSAtcmVzdGluZ1ggPiB0aGlzLnNsaWRlc1swXS50YXJnZXQgJiZcbiAgICAgIC1yZXN0aW5nWCA8IHRoaXMuZ2V0TGFzdFNsaWRlKCkudGFyZ2V0O1xuICB9IGVsc2UgaWYgKCAhdGhpcy5vcHRpb25zLmZyZWVTY3JvbGwgJiYgaW5kZXggPT0gdGhpcy5zZWxlY3RlZEluZGV4ICkge1xuICAgIC8vIGJvb3N0IHNlbGVjdGlvbiBpZiBzZWxlY3RlZCBpbmRleCBoYXMgbm90IGNoYW5nZWRcbiAgICBpbmRleCArPSB0aGlzLmRyYWdFbmRCb29zdFNlbGVjdCgpO1xuICB9XG4gIGRlbGV0ZSB0aGlzLnByZXZpb3VzRHJhZ1g7XG4gIC8vIGFwcGx5IHNlbGVjdGlvblxuICAvLyBUT0RPIHJlZmFjdG9yIHRoaXMsIHNlbGVjdGluZyBoZXJlIGZlZWxzIHdlaXJkXG4gIC8vIEhBQ0ssIHNldCBmbGFnIHNvIGRyYWdnaW5nIHN0YXlzIGluIGNvcnJlY3QgZGlyZWN0aW9uXG4gIHRoaXMuaXNEcmFnU2VsZWN0ID0gdGhpcy5vcHRpb25zLndyYXBBcm91bmQ7XG4gIHRoaXMuc2VsZWN0KCBpbmRleCApO1xuICBkZWxldGUgdGhpcy5pc0RyYWdTZWxlY3Q7XG4gIHRoaXMuZGlzcGF0Y2hFdmVudCggJ2RyYWdFbmQnLCBldmVudCwgWyBwb2ludGVyIF0gKTtcbn07XG5cbnByb3RvLmRyYWdFbmRSZXN0aW5nU2VsZWN0ID0gZnVuY3Rpb24oKSB7XG4gIHZhciByZXN0aW5nWCA9IHRoaXMuZ2V0UmVzdGluZ1Bvc2l0aW9uKCk7XG4gIC8vIGhvdyBmYXIgYXdheSBmcm9tIHNlbGVjdGVkIHNsaWRlXG4gIHZhciBkaXN0YW5jZSA9IE1hdGguYWJzKCB0aGlzLmdldFNsaWRlRGlzdGFuY2UoIC1yZXN0aW5nWCwgdGhpcy5zZWxlY3RlZEluZGV4ICkgKTtcbiAgLy8gZ2V0IGNsb3NldCByZXN0aW5nIGdvaW5nIHVwIGFuZCBnb2luZyBkb3duXG4gIHZhciBwb3NpdGl2ZVJlc3RpbmcgPSB0aGlzLl9nZXRDbG9zZXN0UmVzdGluZyggcmVzdGluZ1gsIGRpc3RhbmNlLCAxICk7XG4gIHZhciBuZWdhdGl2ZVJlc3RpbmcgPSB0aGlzLl9nZXRDbG9zZXN0UmVzdGluZyggcmVzdGluZ1gsIGRpc3RhbmNlLCAtMSApO1xuICAvLyB1c2UgY2xvc2VyIHJlc3RpbmcgZm9yIHdyYXAtYXJvdW5kXG4gIHZhciBpbmRleCA9IHBvc2l0aXZlUmVzdGluZy5kaXN0YW5jZSA8IG5lZ2F0aXZlUmVzdGluZy5kaXN0YW5jZSA/XG4gICAgcG9zaXRpdmVSZXN0aW5nLmluZGV4IDogbmVnYXRpdmVSZXN0aW5nLmluZGV4O1xuICByZXR1cm4gaW5kZXg7XG59O1xuXG4vKipcbiAqIGdpdmVuIHJlc3RpbmcgWCBhbmQgZGlzdGFuY2UgdG8gc2VsZWN0ZWQgY2VsbFxuICogZ2V0IHRoZSBkaXN0YW5jZSBhbmQgaW5kZXggb2YgdGhlIGNsb3Nlc3QgY2VsbFxuICogQHBhcmFtIHtOdW1iZXJ9IHJlc3RpbmdYIC0gZXN0aW1hdGVkIHBvc3QtZmxpY2sgcmVzdGluZyBwb3NpdGlvblxuICogQHBhcmFtIHtOdW1iZXJ9IGRpc3RhbmNlIC0gZGlzdGFuY2UgdG8gc2VsZWN0ZWQgY2VsbFxuICogQHBhcmFtIHtJbnRlZ2VyfSBpbmNyZW1lbnQgLSArMSBvciAtMSwgZ29pbmcgdXAgb3IgZG93blxuICogQHJldHVybnMge09iamVjdH0gLSB7IGRpc3RhbmNlOiB7TnVtYmVyfSwgaW5kZXg6IHtJbnRlZ2VyfSB9XG4gKi9cbnByb3RvLl9nZXRDbG9zZXN0UmVzdGluZyA9IGZ1bmN0aW9uKCByZXN0aW5nWCwgZGlzdGFuY2UsIGluY3JlbWVudCApIHtcbiAgdmFyIGluZGV4ID0gdGhpcy5zZWxlY3RlZEluZGV4O1xuICB2YXIgbWluRGlzdGFuY2UgPSBJbmZpbml0eTtcbiAgdmFyIGNvbmRpdGlvbiA9IHRoaXMub3B0aW9ucy5jb250YWluICYmICF0aGlzLm9wdGlvbnMud3JhcEFyb3VuZCA/XG4gICAgLy8gaWYgY29udGFpbiwga2VlcCBnb2luZyBpZiBkaXN0YW5jZSBpcyBlcXVhbCB0byBtaW5EaXN0YW5jZVxuICAgIGZ1bmN0aW9uKCBkLCBtZCApIHsgcmV0dXJuIGQgPD0gbWQ7IH0gOiBmdW5jdGlvbiggZCwgbWQgKSB7IHJldHVybiBkIDwgbWQ7IH07XG4gIHdoaWxlICggY29uZGl0aW9uKCBkaXN0YW5jZSwgbWluRGlzdGFuY2UgKSApIHtcbiAgICAvLyBtZWFzdXJlIGRpc3RhbmNlIHRvIG5leHQgY2VsbFxuICAgIGluZGV4ICs9IGluY3JlbWVudDtcbiAgICBtaW5EaXN0YW5jZSA9IGRpc3RhbmNlO1xuICAgIGRpc3RhbmNlID0gdGhpcy5nZXRTbGlkZURpc3RhbmNlKCAtcmVzdGluZ1gsIGluZGV4ICk7XG4gICAgaWYgKCBkaXN0YW5jZSA9PT0gbnVsbCApIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBkaXN0YW5jZSA9IE1hdGguYWJzKCBkaXN0YW5jZSApO1xuICB9XG4gIHJldHVybiB7XG4gICAgZGlzdGFuY2U6IG1pbkRpc3RhbmNlLFxuICAgIC8vIHNlbGVjdGVkIHdhcyBwcmV2aW91cyBpbmRleFxuICAgIGluZGV4OiBpbmRleCAtIGluY3JlbWVudFxuICB9O1xufTtcblxuLyoqXG4gKiBtZWFzdXJlIGRpc3RhbmNlIGJldHdlZW4geCBhbmQgYSBzbGlkZSB0YXJnZXRcbiAqIEBwYXJhbSB7TnVtYmVyfSB4XG4gKiBAcGFyYW0ge0ludGVnZXJ9IGluZGV4IC0gc2xpZGUgaW5kZXhcbiAqL1xucHJvdG8uZ2V0U2xpZGVEaXN0YW5jZSA9IGZ1bmN0aW9uKCB4LCBpbmRleCApIHtcbiAgdmFyIGxlbiA9IHRoaXMuc2xpZGVzLmxlbmd0aDtcbiAgLy8gd3JhcCBhcm91bmQgaWYgYXQgbGVhc3QgMiBzbGlkZXNcbiAgdmFyIGlzV3JhcEFyb3VuZCA9IHRoaXMub3B0aW9ucy53cmFwQXJvdW5kICYmIGxlbiA+IDE7XG4gIHZhciBzbGlkZUluZGV4ID0gaXNXcmFwQXJvdW5kID8gdXRpbHMubW9kdWxvKCBpbmRleCwgbGVuICkgOiBpbmRleDtcbiAgdmFyIHNsaWRlID0gdGhpcy5zbGlkZXNbIHNsaWRlSW5kZXggXTtcbiAgaWYgKCAhc2xpZGUgKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgLy8gYWRkIGRpc3RhbmNlIGZvciB3cmFwLWFyb3VuZCBzbGlkZXNcbiAgdmFyIHdyYXAgPSBpc1dyYXBBcm91bmQgPyB0aGlzLnNsaWRlYWJsZVdpZHRoICogTWF0aC5mbG9vciggaW5kZXggLyBsZW4gKSA6IDA7XG4gIHJldHVybiB4IC0gKCBzbGlkZS50YXJnZXQgKyB3cmFwICk7XG59O1xuXG5wcm90by5kcmFnRW5kQm9vc3RTZWxlY3QgPSBmdW5jdGlvbigpIHtcbiAgLy8gZG8gbm90IGJvb3N0IGlmIG5vIHByZXZpb3VzRHJhZ1ggb3IgZHJhZ01vdmVUaW1lXG4gIGlmICggdGhpcy5wcmV2aW91c0RyYWdYID09PSB1bmRlZmluZWQgfHwgIXRoaXMuZHJhZ01vdmVUaW1lIHx8XG4gICAgLy8gb3IgaWYgZHJhZyB3YXMgaGVsZCBmb3IgMTAwIG1zXG4gICAgbmV3IERhdGUoKSAtIHRoaXMuZHJhZ01vdmVUaW1lID4gMTAwICkge1xuICAgIHJldHVybiAwO1xuICB9XG5cbiAgdmFyIGRpc3RhbmNlID0gdGhpcy5nZXRTbGlkZURpc3RhbmNlKCAtdGhpcy5kcmFnWCwgdGhpcy5zZWxlY3RlZEluZGV4ICk7XG4gIHZhciBkZWx0YSA9IHRoaXMucHJldmlvdXNEcmFnWCAtIHRoaXMuZHJhZ1g7XG4gIGlmICggZGlzdGFuY2UgPiAwICYmIGRlbHRhID4gMCApIHtcbiAgICAvLyBib29zdCB0byBuZXh0IGlmIG1vdmluZyB0b3dhcmRzIHRoZSByaWdodCwgYW5kIHBvc2l0aXZlIHZlbG9jaXR5XG4gICAgcmV0dXJuIDE7XG4gIH0gZWxzZSBpZiAoIGRpc3RhbmNlIDwgMCAmJiBkZWx0YSA8IDAgKSB7XG4gICAgLy8gYm9vc3QgdG8gcHJldmlvdXMgaWYgbW92aW5nIHRvd2FyZHMgdGhlIGxlZnQsIGFuZCBuZWdhdGl2ZSB2ZWxvY2l0eVxuICAgIHJldHVybiAtMTtcbiAgfVxuICByZXR1cm4gMDtcbn07XG5cbi8vIC0tLS0tIHN0YXRpY0NsaWNrIC0tLS0tIC8vXG5cbnByb3RvLnN0YXRpY0NsaWNrID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICAvLyBnZXQgY2xpY2tlZENlbGwsIGlmIGNlbGwgd2FzIGNsaWNrZWRcbiAgdmFyIGNsaWNrZWRDZWxsID0gdGhpcy5nZXRQYXJlbnRDZWxsKCBldmVudC50YXJnZXQgKTtcbiAgdmFyIGNlbGxFbGVtID0gY2xpY2tlZENlbGwgJiYgY2xpY2tlZENlbGwuZWxlbWVudDtcbiAgdmFyIGNlbGxJbmRleCA9IGNsaWNrZWRDZWxsICYmIHRoaXMuY2VsbHMuaW5kZXhPZiggY2xpY2tlZENlbGwgKTtcbiAgdGhpcy5kaXNwYXRjaEV2ZW50KCAnc3RhdGljQ2xpY2snLCBldmVudCwgWyBwb2ludGVyLCBjZWxsRWxlbSwgY2VsbEluZGV4IF0gKTtcbn07XG5cbi8vIC0tLS0tIHNjcm9sbCAtLS0tLSAvL1xuXG5wcm90by5vbnNjcm9sbCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgc2Nyb2xsID0gZ2V0U2Nyb2xsUG9zaXRpb24oKTtcbiAgdmFyIHNjcm9sbE1vdmVYID0gdGhpcy5wb2ludGVyRG93blNjcm9sbC54IC0gc2Nyb2xsLng7XG4gIHZhciBzY3JvbGxNb3ZlWSA9IHRoaXMucG9pbnRlckRvd25TY3JvbGwueSAtIHNjcm9sbC55O1xuICAvLyBjYW5jZWwgY2xpY2svdGFwIGlmIHNjcm9sbCBpcyB0b28gbXVjaFxuICBpZiAoIE1hdGguYWJzKCBzY3JvbGxNb3ZlWCApID4gMyB8fCBNYXRoLmFicyggc2Nyb2xsTW92ZVkgKSA+IDMgKSB7XG4gICAgdGhpcy5fcG9pbnRlckRvbmUoKTtcbiAgfVxufTtcblxuLy8gLS0tLS0gdXRpbHMgLS0tLS0gLy9cblxuZnVuY3Rpb24gZ2V0U2Nyb2xsUG9zaXRpb24oKSB7XG4gIHJldHVybiB7XG4gICAgeDogd2luZG93LnBhZ2VYT2Zmc2V0LFxuICAgIHk6IHdpbmRvdy5wYWdlWU9mZnNldFxuICB9O1xufVxuXG4vLyAtLS0tLSAgLS0tLS0gLy9cblxucmV0dXJuIEZsaWNraXR5O1xuXG59KSk7XG4iLCIvLyBGbGlja2l0eSBtYWluXG4oIGZ1bmN0aW9uKCB3aW5kb3csIGZhY3RvcnkgKSB7XG4gIC8vIHVuaXZlcnNhbCBtb2R1bGUgZGVmaW5pdGlvblxuICAvKiBqc2hpbnQgc3RyaWN0OiBmYWxzZSAqL1xuICBpZiAoIHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kICkge1xuICAgIC8vIEFNRFxuICAgIGRlZmluZSggW1xuICAgICAgJ2V2LWVtaXR0ZXIvZXYtZW1pdHRlcicsXG4gICAgICAnZ2V0LXNpemUvZ2V0LXNpemUnLFxuICAgICAgJ2Zpenp5LXVpLXV0aWxzL3V0aWxzJyxcbiAgICAgICcuL2NlbGwnLFxuICAgICAgJy4vc2xpZGUnLFxuICAgICAgJy4vYW5pbWF0ZSdcbiAgICBdLCBmdW5jdGlvbiggRXZFbWl0dGVyLCBnZXRTaXplLCB1dGlscywgQ2VsbCwgU2xpZGUsIGFuaW1hdGVQcm90b3R5cGUgKSB7XG4gICAgICByZXR1cm4gZmFjdG9yeSggd2luZG93LCBFdkVtaXR0ZXIsIGdldFNpemUsIHV0aWxzLCBDZWxsLCBTbGlkZSwgYW5pbWF0ZVByb3RvdHlwZSApO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKCB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzICkge1xuICAgIC8vIENvbW1vbkpTXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KFxuICAgICAgd2luZG93LFxuICAgICAgcmVxdWlyZSgnZXYtZW1pdHRlcicpLFxuICAgICAgcmVxdWlyZSgnZ2V0LXNpemUnKSxcbiAgICAgIHJlcXVpcmUoJ2Zpenp5LXVpLXV0aWxzJyksXG4gICAgICByZXF1aXJlKCcuL2NlbGwnKSxcbiAgICAgIHJlcXVpcmUoJy4vc2xpZGUnKSxcbiAgICAgIHJlcXVpcmUoJy4vYW5pbWF0ZScpXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBicm93c2VyIGdsb2JhbFxuICAgIHZhciBfRmxpY2tpdHkgPSB3aW5kb3cuRmxpY2tpdHk7XG5cbiAgICB3aW5kb3cuRmxpY2tpdHkgPSBmYWN0b3J5KFxuICAgICAgd2luZG93LFxuICAgICAgd2luZG93LkV2RW1pdHRlcixcbiAgICAgIHdpbmRvdy5nZXRTaXplLFxuICAgICAgd2luZG93LmZpenp5VUlVdGlscyxcbiAgICAgIF9GbGlja2l0eS5DZWxsLFxuICAgICAgX0ZsaWNraXR5LlNsaWRlLFxuICAgICAgX0ZsaWNraXR5LmFuaW1hdGVQcm90b3R5cGVcbiAgICApO1xuICB9XG5cbn0oIHdpbmRvdywgZnVuY3Rpb24gZmFjdG9yeSggd2luZG93LCBFdkVtaXR0ZXIsIGdldFNpemUsXG4gIHV0aWxzLCBDZWxsLCBTbGlkZSwgYW5pbWF0ZVByb3RvdHlwZSApIHtcblxuJ3VzZSBzdHJpY3QnO1xuXG4vLyB2YXJzXG52YXIgalF1ZXJ5ID0gd2luZG93LmpRdWVyeTtcbnZhciBnZXRDb21wdXRlZFN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGU7XG52YXIgY29uc29sZSA9IHdpbmRvdy5jb25zb2xlO1xuXG5mdW5jdGlvbiBtb3ZlRWxlbWVudHMoIGVsZW1zLCB0b0VsZW0gKSB7XG4gIGVsZW1zID0gdXRpbHMubWFrZUFycmF5KCBlbGVtcyApO1xuICB3aGlsZSAoIGVsZW1zLmxlbmd0aCApIHtcbiAgICB0b0VsZW0uYXBwZW5kQ2hpbGQoIGVsZW1zLnNoaWZ0KCkgKTtcbiAgfVxufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBGbGlja2l0eSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG4vLyBnbG9iYWxseSB1bmlxdWUgaWRlbnRpZmllcnNcbnZhciBHVUlEID0gMDtcbi8vIGludGVybmFsIHN0b3JlIG9mIGFsbCBGbGlja2l0eSBpbnRhbmNlc1xudmFyIGluc3RhbmNlcyA9IHt9O1xuXG5mdW5jdGlvbiBGbGlja2l0eSggZWxlbWVudCwgb3B0aW9ucyApIHtcbiAgdmFyIHF1ZXJ5RWxlbWVudCA9IHV0aWxzLmdldFF1ZXJ5RWxlbWVudCggZWxlbWVudCApO1xuICBpZiAoICFxdWVyeUVsZW1lbnQgKSB7XG4gICAgaWYgKCBjb25zb2xlICkge1xuICAgICAgY29uc29sZS5lcnJvciggJ0JhZCBlbGVtZW50IGZvciBGbGlja2l0eTogJyArICggcXVlcnlFbGVtZW50IHx8IGVsZW1lbnQgKSApO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cbiAgdGhpcy5lbGVtZW50ID0gcXVlcnlFbGVtZW50O1xuICAvLyBkbyBub3QgaW5pdGlhbGl6ZSB0d2ljZSBvbiBzYW1lIGVsZW1lbnRcbiAgaWYgKCB0aGlzLmVsZW1lbnQuZmxpY2tpdHlHVUlEICkge1xuICAgIHZhciBpbnN0YW5jZSA9IGluc3RhbmNlc1sgdGhpcy5lbGVtZW50LmZsaWNraXR5R1VJRCBdO1xuICAgIGluc3RhbmNlLm9wdGlvbiggb3B0aW9ucyApO1xuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfVxuXG4gIC8vIGFkZCBqUXVlcnlcbiAgaWYgKCBqUXVlcnkgKSB7XG4gICAgdGhpcy4kZWxlbWVudCA9IGpRdWVyeSggdGhpcy5lbGVtZW50ICk7XG4gIH1cbiAgLy8gb3B0aW9uc1xuICB0aGlzLm9wdGlvbnMgPSB1dGlscy5leHRlbmQoIHt9LCB0aGlzLmNvbnN0cnVjdG9yLmRlZmF1bHRzICk7XG4gIHRoaXMub3B0aW9uKCBvcHRpb25zICk7XG5cbiAgLy8ga2ljayB0aGluZ3Mgb2ZmXG4gIHRoaXMuX2NyZWF0ZSgpO1xufVxuXG5GbGlja2l0eS5kZWZhdWx0cyA9IHtcbiAgYWNjZXNzaWJpbGl0eTogdHJ1ZSxcbiAgLy8gYWRhcHRpdmVIZWlnaHQ6IGZhbHNlLFxuICBjZWxsQWxpZ246ICdjZW50ZXInLFxuICAvLyBjZWxsU2VsZWN0b3I6IHVuZGVmaW5lZCxcbiAgLy8gY29udGFpbjogZmFsc2UsXG4gIGZyZWVTY3JvbGxGcmljdGlvbjogMC4wNzUsIC8vIGZyaWN0aW9uIHdoZW4gZnJlZS1zY3JvbGxpbmdcbiAgZnJpY3Rpb246IDAuMjgsIC8vIGZyaWN0aW9uIHdoZW4gc2VsZWN0aW5nXG4gIG5hbWVzcGFjZUpRdWVyeUV2ZW50czogdHJ1ZSxcbiAgLy8gaW5pdGlhbEluZGV4OiAwLFxuICBwZXJjZW50UG9zaXRpb246IHRydWUsXG4gIHJlc2l6ZTogdHJ1ZSxcbiAgc2VsZWN0ZWRBdHRyYWN0aW9uOiAwLjAyNSxcbiAgc2V0R2FsbGVyeVNpemU6IHRydWVcbiAgLy8gd2F0Y2hDU1M6IGZhbHNlLFxuICAvLyB3cmFwQXJvdW5kOiBmYWxzZVxufTtcblxuLy8gaGFzaCBvZiBtZXRob2RzIHRyaWdnZXJlZCBvbiBfY3JlYXRlKClcbkZsaWNraXR5LmNyZWF0ZU1ldGhvZHMgPSBbXTtcblxudmFyIHByb3RvID0gRmxpY2tpdHkucHJvdG90eXBlO1xuLy8gaW5oZXJpdCBFdmVudEVtaXR0ZXJcbnV0aWxzLmV4dGVuZCggcHJvdG8sIEV2RW1pdHRlci5wcm90b3R5cGUgKTtcblxucHJvdG8uX2NyZWF0ZSA9IGZ1bmN0aW9uKCkge1xuICAvLyBhZGQgaWQgZm9yIEZsaWNraXR5LmRhdGFcbiAgdmFyIGlkID0gdGhpcy5ndWlkID0gKytHVUlEO1xuICB0aGlzLmVsZW1lbnQuZmxpY2tpdHlHVUlEID0gaWQ7IC8vIGV4cGFuZG9cbiAgaW5zdGFuY2VzWyBpZCBdID0gdGhpczsgLy8gYXNzb2NpYXRlIHZpYSBpZFxuICAvLyBpbml0aWFsIHByb3BlcnRpZXNcbiAgdGhpcy5zZWxlY3RlZEluZGV4ID0gMDtcbiAgLy8gaG93IG1hbnkgZnJhbWVzIHNsaWRlciBoYXMgYmVlbiBpbiBzYW1lIHBvc2l0aW9uXG4gIHRoaXMucmVzdGluZ0ZyYW1lcyA9IDA7XG4gIC8vIGluaXRpYWwgcGh5c2ljcyBwcm9wZXJ0aWVzXG4gIHRoaXMueCA9IDA7XG4gIHRoaXMudmVsb2NpdHkgPSAwO1xuICB0aGlzLm9yaWdpblNpZGUgPSB0aGlzLm9wdGlvbnMucmlnaHRUb0xlZnQgPyAncmlnaHQnIDogJ2xlZnQnO1xuICAvLyBjcmVhdGUgdmlld3BvcnQgJiBzbGlkZXJcbiAgdGhpcy52aWV3cG9ydCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICB0aGlzLnZpZXdwb3J0LmNsYXNzTmFtZSA9ICdmbGlja2l0eS12aWV3cG9ydCc7XG4gIHRoaXMuX2NyZWF0ZVNsaWRlcigpO1xuXG4gIGlmICggdGhpcy5vcHRpb25zLnJlc2l6ZSB8fCB0aGlzLm9wdGlvbnMud2F0Y2hDU1MgKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoICdyZXNpemUnLCB0aGlzICk7XG4gIH1cblxuICBGbGlja2l0eS5jcmVhdGVNZXRob2RzLmZvckVhY2goIGZ1bmN0aW9uKCBtZXRob2QgKSB7XG4gICAgdGhpc1sgbWV0aG9kIF0oKTtcbiAgfSwgdGhpcyApO1xuXG4gIGlmICggdGhpcy5vcHRpb25zLndhdGNoQ1NTICkge1xuICAgIHRoaXMud2F0Y2hDU1MoKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmFjdGl2YXRlKCk7XG4gIH1cblxufTtcblxuLyoqXG4gKiBzZXQgb3B0aW9uc1xuICogQHBhcmFtIHtPYmplY3R9IG9wdHNcbiAqL1xucHJvdG8ub3B0aW9uID0gZnVuY3Rpb24oIG9wdHMgKSB7XG4gIHV0aWxzLmV4dGVuZCggdGhpcy5vcHRpb25zLCBvcHRzICk7XG59O1xuXG5wcm90by5hY3RpdmF0ZSA9IGZ1bmN0aW9uKCkge1xuICBpZiAoIHRoaXMuaXNBY3RpdmUgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRoaXMuaXNBY3RpdmUgPSB0cnVlO1xuICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZmxpY2tpdHktZW5hYmxlZCcpO1xuICBpZiAoIHRoaXMub3B0aW9ucy5yaWdodFRvTGVmdCApIHtcbiAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZmxpY2tpdHktcnRsJyk7XG4gIH1cblxuICB0aGlzLmdldFNpemUoKTtcbiAgLy8gbW92ZSBpbml0aWFsIGNlbGwgZWxlbWVudHMgc28gdGhleSBjYW4gYmUgbG9hZGVkIGFzIGNlbGxzXG4gIHZhciBjZWxsRWxlbXMgPSB0aGlzLl9maWx0ZXJGaW5kQ2VsbEVsZW1lbnRzKCB0aGlzLmVsZW1lbnQuY2hpbGRyZW4gKTtcbiAgbW92ZUVsZW1lbnRzKCBjZWxsRWxlbXMsIHRoaXMuc2xpZGVyICk7XG4gIHRoaXMudmlld3BvcnQuYXBwZW5kQ2hpbGQoIHRoaXMuc2xpZGVyICk7XG4gIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCggdGhpcy52aWV3cG9ydCApO1xuICAvLyBnZXQgY2VsbHMgZnJvbSBjaGlsZHJlblxuICB0aGlzLnJlbG9hZENlbGxzKCk7XG5cbiAgaWYgKCB0aGlzLm9wdGlvbnMuYWNjZXNzaWJpbGl0eSApIHtcbiAgICAvLyBhbGxvdyBlbGVtZW50IHRvIGZvY3VzYWJsZVxuICAgIHRoaXMuZWxlbWVudC50YWJJbmRleCA9IDA7XG4gICAgLy8gbGlzdGVuIGZvciBrZXkgcHJlc3Nlc1xuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCAna2V5ZG93bicsIHRoaXMgKTtcbiAgfVxuXG4gIHRoaXMuZW1pdEV2ZW50KCdhY3RpdmF0ZScpO1xuXG4gIHZhciBpbmRleDtcbiAgdmFyIGluaXRpYWxJbmRleCA9IHRoaXMub3B0aW9ucy5pbml0aWFsSW5kZXg7XG4gIGlmICggdGhpcy5pc0luaXRBY3RpdmF0ZWQgKSB7XG4gICAgaW5kZXggPSB0aGlzLnNlbGVjdGVkSW5kZXg7XG4gIH0gZWxzZSBpZiAoIGluaXRpYWxJbmRleCAhPT0gdW5kZWZpbmVkICkge1xuICAgIGluZGV4ID0gdGhpcy5jZWxsc1sgaW5pdGlhbEluZGV4IF0gPyBpbml0aWFsSW5kZXggOiAwO1xuICB9IGVsc2Uge1xuICAgIGluZGV4ID0gMDtcbiAgfVxuICAvLyBzZWxlY3QgaW5zdGFudGx5XG4gIHRoaXMuc2VsZWN0KCBpbmRleCwgZmFsc2UsIHRydWUgKTtcbiAgLy8gZmxhZyBmb3IgaW5pdGlhbCBhY3RpdmF0aW9uLCBmb3IgdXNpbmcgaW5pdGlhbEluZGV4XG4gIHRoaXMuaXNJbml0QWN0aXZhdGVkID0gdHJ1ZTtcbn07XG5cbi8vIHNsaWRlciBwb3NpdGlvbnMgdGhlIGNlbGxzXG5wcm90by5fY3JlYXRlU2xpZGVyID0gZnVuY3Rpb24oKSB7XG4gIC8vIHNsaWRlciBlbGVtZW50IGRvZXMgYWxsIHRoZSBwb3NpdGlvbmluZ1xuICB2YXIgc2xpZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHNsaWRlci5jbGFzc05hbWUgPSAnZmxpY2tpdHktc2xpZGVyJztcbiAgc2xpZGVyLnN0eWxlWyB0aGlzLm9yaWdpblNpZGUgXSA9IDA7XG4gIHRoaXMuc2xpZGVyID0gc2xpZGVyO1xufTtcblxucHJvdG8uX2ZpbHRlckZpbmRDZWxsRWxlbWVudHMgPSBmdW5jdGlvbiggZWxlbXMgKSB7XG4gIHJldHVybiB1dGlscy5maWx0ZXJGaW5kRWxlbWVudHMoIGVsZW1zLCB0aGlzLm9wdGlvbnMuY2VsbFNlbGVjdG9yICk7XG59O1xuXG4vLyBnb2VzIHRocm91Z2ggYWxsIGNoaWxkcmVuXG5wcm90by5yZWxvYWRDZWxscyA9IGZ1bmN0aW9uKCkge1xuICAvLyBjb2xsZWN0aW9uIG9mIGl0ZW0gZWxlbWVudHNcbiAgdGhpcy5jZWxscyA9IHRoaXMuX21ha2VDZWxscyggdGhpcy5zbGlkZXIuY2hpbGRyZW4gKTtcbiAgdGhpcy5wb3NpdGlvbkNlbGxzKCk7XG4gIHRoaXMuX2dldFdyYXBTaGlmdENlbGxzKCk7XG4gIHRoaXMuc2V0R2FsbGVyeVNpemUoKTtcbn07XG5cbi8qKlxuICogdHVybiBlbGVtZW50cyBpbnRvIEZsaWNraXR5LkNlbGxzXG4gKiBAcGFyYW0ge0FycmF5IG9yIE5vZGVMaXN0IG9yIEhUTUxFbGVtZW50fSBlbGVtc1xuICogQHJldHVybnMge0FycmF5fSBpdGVtcyAtIGNvbGxlY3Rpb24gb2YgbmV3IEZsaWNraXR5IENlbGxzXG4gKi9cbnByb3RvLl9tYWtlQ2VsbHMgPSBmdW5jdGlvbiggZWxlbXMgKSB7XG4gIHZhciBjZWxsRWxlbXMgPSB0aGlzLl9maWx0ZXJGaW5kQ2VsbEVsZW1lbnRzKCBlbGVtcyApO1xuXG4gIC8vIGNyZWF0ZSBuZXcgRmxpY2tpdHkgZm9yIGNvbGxlY3Rpb25cbiAgdmFyIGNlbGxzID0gY2VsbEVsZW1zLm1hcCggZnVuY3Rpb24oIGNlbGxFbGVtICkge1xuICAgIHJldHVybiBuZXcgQ2VsbCggY2VsbEVsZW0sIHRoaXMgKTtcbiAgfSwgdGhpcyApO1xuXG4gIHJldHVybiBjZWxscztcbn07XG5cbnByb3RvLmdldExhc3RDZWxsID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmNlbGxzWyB0aGlzLmNlbGxzLmxlbmd0aCAtIDEgXTtcbn07XG5cbnByb3RvLmdldExhc3RTbGlkZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5zbGlkZXNbIHRoaXMuc2xpZGVzLmxlbmd0aCAtIDEgXTtcbn07XG5cbi8vIHBvc2l0aW9ucyBhbGwgY2VsbHNcbnByb3RvLnBvc2l0aW9uQ2VsbHMgPSBmdW5jdGlvbigpIHtcbiAgLy8gc2l6ZSBhbGwgY2VsbHNcbiAgdGhpcy5fc2l6ZUNlbGxzKCB0aGlzLmNlbGxzICk7XG4gIC8vIHBvc2l0aW9uIGFsbCBjZWxsc1xuICB0aGlzLl9wb3NpdGlvbkNlbGxzKCAwICk7XG59O1xuXG4vKipcbiAqIHBvc2l0aW9uIGNlcnRhaW4gY2VsbHNcbiAqIEBwYXJhbSB7SW50ZWdlcn0gaW5kZXggLSB3aGljaCBjZWxsIHRvIHN0YXJ0IHdpdGhcbiAqL1xucHJvdG8uX3Bvc2l0aW9uQ2VsbHMgPSBmdW5jdGlvbiggaW5kZXggKSB7XG4gIGluZGV4ID0gaW5kZXggfHwgMDtcbiAgLy8gYWxzbyBtZWFzdXJlIG1heENlbGxIZWlnaHRcbiAgLy8gc3RhcnQgMCBpZiBwb3NpdGlvbmluZyBhbGwgY2VsbHNcbiAgdGhpcy5tYXhDZWxsSGVpZ2h0ID0gaW5kZXggPyB0aGlzLm1heENlbGxIZWlnaHQgfHwgMCA6IDA7XG4gIHZhciBjZWxsWCA9IDA7XG4gIC8vIGdldCBjZWxsWFxuICBpZiAoIGluZGV4ID4gMCApIHtcbiAgICB2YXIgc3RhcnRDZWxsID0gdGhpcy5jZWxsc1sgaW5kZXggLSAxIF07XG4gICAgY2VsbFggPSBzdGFydENlbGwueCArIHN0YXJ0Q2VsbC5zaXplLm91dGVyV2lkdGg7XG4gIH1cbiAgdmFyIGxlbiA9IHRoaXMuY2VsbHMubGVuZ3RoO1xuICBmb3IgKCB2YXIgaT1pbmRleDsgaSA8IGxlbjsgaSsrICkge1xuICAgIHZhciBjZWxsID0gdGhpcy5jZWxsc1tpXTtcbiAgICBjZWxsLnNldFBvc2l0aW9uKCBjZWxsWCApO1xuICAgIGNlbGxYICs9IGNlbGwuc2l6ZS5vdXRlcldpZHRoO1xuICAgIHRoaXMubWF4Q2VsbEhlaWdodCA9IE1hdGgubWF4KCBjZWxsLnNpemUub3V0ZXJIZWlnaHQsIHRoaXMubWF4Q2VsbEhlaWdodCApO1xuICB9XG4gIC8vIGtlZXAgdHJhY2sgb2YgY2VsbFggZm9yIHdyYXAtYXJvdW5kXG4gIHRoaXMuc2xpZGVhYmxlV2lkdGggPSBjZWxsWDtcbiAgLy8gc2xpZGVzXG4gIHRoaXMudXBkYXRlU2xpZGVzKCk7XG4gIC8vIGNvbnRhaW4gc2xpZGVzIHRhcmdldFxuICB0aGlzLl9jb250YWluU2xpZGVzKCk7XG4gIC8vIHVwZGF0ZSBzbGlkZXNXaWR0aFxuICB0aGlzLnNsaWRlc1dpZHRoID0gbGVuID8gdGhpcy5nZXRMYXN0U2xpZGUoKS50YXJnZXQgLSB0aGlzLnNsaWRlc1swXS50YXJnZXQgOiAwO1xufTtcblxuLyoqXG4gKiBjZWxsLmdldFNpemUoKSBvbiBtdWx0aXBsZSBjZWxsc1xuICogQHBhcmFtIHtBcnJheX0gY2VsbHNcbiAqL1xucHJvdG8uX3NpemVDZWxscyA9IGZ1bmN0aW9uKCBjZWxscyApIHtcbiAgY2VsbHMuZm9yRWFjaCggZnVuY3Rpb24oIGNlbGwgKSB7XG4gICAgY2VsbC5nZXRTaXplKCk7XG4gIH0pO1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbnByb3RvLnVwZGF0ZVNsaWRlcyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnNsaWRlcyA9IFtdO1xuICBpZiAoICF0aGlzLmNlbGxzLmxlbmd0aCApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgc2xpZGUgPSBuZXcgU2xpZGUoIHRoaXMgKTtcbiAgdGhpcy5zbGlkZXMucHVzaCggc2xpZGUgKTtcbiAgdmFyIGlzT3JpZ2luTGVmdCA9IHRoaXMub3JpZ2luU2lkZSA9PSAnbGVmdCc7XG4gIHZhciBuZXh0TWFyZ2luID0gaXNPcmlnaW5MZWZ0ID8gJ21hcmdpblJpZ2h0JyA6ICdtYXJnaW5MZWZ0JztcblxuICB2YXIgY2FuQ2VsbEZpdCA9IHRoaXMuX2dldENhbkNlbGxGaXQoKTtcblxuICB0aGlzLmNlbGxzLmZvckVhY2goIGZ1bmN0aW9uKCBjZWxsLCBpICkge1xuICAgIC8vIGp1c3QgYWRkIGNlbGwgaWYgZmlyc3QgY2VsbCBpbiBzbGlkZVxuICAgIGlmICggIXNsaWRlLmNlbGxzLmxlbmd0aCApIHtcbiAgICAgIHNsaWRlLmFkZENlbGwoIGNlbGwgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgc2xpZGVXaWR0aCA9ICggc2xpZGUub3V0ZXJXaWR0aCAtIHNsaWRlLmZpcnN0TWFyZ2luICkgK1xuICAgICAgKCBjZWxsLnNpemUub3V0ZXJXaWR0aCAtIGNlbGwuc2l6ZVsgbmV4dE1hcmdpbiBdICk7XG5cbiAgICBpZiAoIGNhbkNlbGxGaXQuY2FsbCggdGhpcywgaSwgc2xpZGVXaWR0aCApICkge1xuICAgICAgc2xpZGUuYWRkQ2VsbCggY2VsbCApO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBkb2Vzbid0IGZpdCwgbmV3IHNsaWRlXG4gICAgICBzbGlkZS51cGRhdGVUYXJnZXQoKTtcblxuICAgICAgc2xpZGUgPSBuZXcgU2xpZGUoIHRoaXMgKTtcbiAgICAgIHRoaXMuc2xpZGVzLnB1c2goIHNsaWRlICk7XG4gICAgICBzbGlkZS5hZGRDZWxsKCBjZWxsICk7XG4gICAgfVxuICB9LCB0aGlzICk7XG4gIC8vIGxhc3Qgc2xpZGVcbiAgc2xpZGUudXBkYXRlVGFyZ2V0KCk7XG4gIC8vIHVwZGF0ZSAuc2VsZWN0ZWRTbGlkZVxuICB0aGlzLnVwZGF0ZVNlbGVjdGVkU2xpZGUoKTtcbn07XG5cbnByb3RvLl9nZXRDYW5DZWxsRml0ID0gZnVuY3Rpb24oKSB7XG4gIHZhciBncm91cENlbGxzID0gdGhpcy5vcHRpb25zLmdyb3VwQ2VsbHM7XG4gIGlmICggIWdyb3VwQ2VsbHMgKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gIH0gZWxzZSBpZiAoIHR5cGVvZiBncm91cENlbGxzID09ICdudW1iZXInICkge1xuICAgIC8vIGdyb3VwIGJ5IG51bWJlci4gMyAtPiBbMCwxLDJdLCBbMyw0LDVdLCAuLi5cbiAgICB2YXIgbnVtYmVyID0gcGFyc2VJbnQoIGdyb3VwQ2VsbHMsIDEwICk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCBpICkge1xuICAgICAgcmV0dXJuICggaSAlIG51bWJlciApICE9PSAwO1xuICAgIH07XG4gIH1cbiAgLy8gZGVmYXVsdCwgZ3JvdXAgYnkgd2lkdGggb2Ygc2xpZGVcbiAgLy8gcGFyc2UgJzc1JVxuICB2YXIgcGVyY2VudE1hdGNoID0gdHlwZW9mIGdyb3VwQ2VsbHMgPT0gJ3N0cmluZycgJiZcbiAgICBncm91cENlbGxzLm1hdGNoKC9eKFxcZCspJSQvKTtcbiAgdmFyIHBlcmNlbnQgPSBwZXJjZW50TWF0Y2ggPyBwYXJzZUludCggcGVyY2VudE1hdGNoWzFdLCAxMCApIC8gMTAwIDogMTtcbiAgcmV0dXJuIGZ1bmN0aW9uKCBpLCBzbGlkZVdpZHRoICkge1xuICAgIHJldHVybiBzbGlkZVdpZHRoIDw9ICggdGhpcy5zaXplLmlubmVyV2lkdGggKyAxICkgKiBwZXJjZW50O1xuICB9O1xufTtcblxuLy8gYWxpYXMgX2luaXQgZm9yIGpRdWVyeSBwbHVnaW4gLmZsaWNraXR5KClcbnByb3RvLl9pbml0ID1cbnByb3RvLnJlcG9zaXRpb24gPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5wb3NpdGlvbkNlbGxzKCk7XG4gIHRoaXMucG9zaXRpb25TbGlkZXJBdFNlbGVjdGVkKCk7XG59O1xuXG5wcm90by5nZXRTaXplID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuc2l6ZSA9IGdldFNpemUoIHRoaXMuZWxlbWVudCApO1xuICB0aGlzLnNldENlbGxBbGlnbigpO1xuICB0aGlzLmN1cnNvclBvc2l0aW9uID0gdGhpcy5zaXplLmlubmVyV2lkdGggKiB0aGlzLmNlbGxBbGlnbjtcbn07XG5cbnZhciBjZWxsQWxpZ25TaG9ydGhhbmRzID0ge1xuICAvLyBjZWxsIGFsaWduLCB0aGVuIGJhc2VkIG9uIG9yaWdpbiBzaWRlXG4gIGNlbnRlcjoge1xuICAgIGxlZnQ6IDAuNSxcbiAgICByaWdodDogMC41XG4gIH0sXG4gIGxlZnQ6IHtcbiAgICBsZWZ0OiAwLFxuICAgIHJpZ2h0OiAxXG4gIH0sXG4gIHJpZ2h0OiB7XG4gICAgcmlnaHQ6IDAsXG4gICAgbGVmdDogMVxuICB9XG59O1xuXG5wcm90by5zZXRDZWxsQWxpZ24gPSBmdW5jdGlvbigpIHtcbiAgdmFyIHNob3J0aGFuZCA9IGNlbGxBbGlnblNob3J0aGFuZHNbIHRoaXMub3B0aW9ucy5jZWxsQWxpZ24gXTtcbiAgdGhpcy5jZWxsQWxpZ24gPSBzaG9ydGhhbmQgPyBzaG9ydGhhbmRbIHRoaXMub3JpZ2luU2lkZSBdIDogdGhpcy5vcHRpb25zLmNlbGxBbGlnbjtcbn07XG5cbnByb3RvLnNldEdhbGxlcnlTaXplID0gZnVuY3Rpb24oKSB7XG4gIGlmICggdGhpcy5vcHRpb25zLnNldEdhbGxlcnlTaXplICkge1xuICAgIHZhciBoZWlnaHQgPSB0aGlzLm9wdGlvbnMuYWRhcHRpdmVIZWlnaHQgJiYgdGhpcy5zZWxlY3RlZFNsaWRlID9cbiAgICAgIHRoaXMuc2VsZWN0ZWRTbGlkZS5oZWlnaHQgOiB0aGlzLm1heENlbGxIZWlnaHQ7XG4gICAgdGhpcy52aWV3cG9ydC5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyAncHgnO1xuICB9XG59O1xuXG5wcm90by5fZ2V0V3JhcFNoaWZ0Q2VsbHMgPSBmdW5jdGlvbigpIHtcbiAgLy8gb25seSBmb3Igd3JhcC1hcm91bmRcbiAgaWYgKCAhdGhpcy5vcHRpb25zLndyYXBBcm91bmQgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIHVuc2hpZnQgcHJldmlvdXMgY2VsbHNcbiAgdGhpcy5fdW5zaGlmdENlbGxzKCB0aGlzLmJlZm9yZVNoaWZ0Q2VsbHMgKTtcbiAgdGhpcy5fdW5zaGlmdENlbGxzKCB0aGlzLmFmdGVyU2hpZnRDZWxscyApO1xuICAvLyBnZXQgYmVmb3JlIGNlbGxzXG4gIC8vIGluaXRpYWwgZ2FwXG4gIHZhciBnYXBYID0gdGhpcy5jdXJzb3JQb3NpdGlvbjtcbiAgdmFyIGNlbGxJbmRleCA9IHRoaXMuY2VsbHMubGVuZ3RoIC0gMTtcbiAgdGhpcy5iZWZvcmVTaGlmdENlbGxzID0gdGhpcy5fZ2V0R2FwQ2VsbHMoIGdhcFgsIGNlbGxJbmRleCwgLTEgKTtcbiAgLy8gZ2V0IGFmdGVyIGNlbGxzXG4gIC8vIGVuZGluZyBnYXAgYmV0d2VlbiBsYXN0IGNlbGwgYW5kIGVuZCBvZiBnYWxsZXJ5IHZpZXdwb3J0XG4gIGdhcFggPSB0aGlzLnNpemUuaW5uZXJXaWR0aCAtIHRoaXMuY3Vyc29yUG9zaXRpb247XG4gIC8vIHN0YXJ0IGNsb25pbmcgYXQgZmlyc3QgY2VsbCwgd29ya2luZyBmb3J3YXJkc1xuICB0aGlzLmFmdGVyU2hpZnRDZWxscyA9IHRoaXMuX2dldEdhcENlbGxzKCBnYXBYLCAwLCAxICk7XG59O1xuXG5wcm90by5fZ2V0R2FwQ2VsbHMgPSBmdW5jdGlvbiggZ2FwWCwgY2VsbEluZGV4LCBpbmNyZW1lbnQgKSB7XG4gIC8vIGtlZXAgYWRkaW5nIGNlbGxzIHVudGlsIHRoZSBjb3ZlciB0aGUgaW5pdGlhbCBnYXBcbiAgdmFyIGNlbGxzID0gW107XG4gIHdoaWxlICggZ2FwWCA+IDAgKSB7XG4gICAgdmFyIGNlbGwgPSB0aGlzLmNlbGxzWyBjZWxsSW5kZXggXTtcbiAgICBpZiAoICFjZWxsICkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNlbGxzLnB1c2goIGNlbGwgKTtcbiAgICBjZWxsSW5kZXggKz0gaW5jcmVtZW50O1xuICAgIGdhcFggLT0gY2VsbC5zaXplLm91dGVyV2lkdGg7XG4gIH1cbiAgcmV0dXJuIGNlbGxzO1xufTtcblxuLy8gLS0tLS0gY29udGFpbiAtLS0tLSAvL1xuXG4vLyBjb250YWluIGNlbGwgdGFyZ2V0cyBzbyBubyBleGNlc3Mgc2xpZGluZ1xucHJvdG8uX2NvbnRhaW5TbGlkZXMgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCAhdGhpcy5vcHRpb25zLmNvbnRhaW4gfHwgdGhpcy5vcHRpb25zLndyYXBBcm91bmQgfHwgIXRoaXMuY2VsbHMubGVuZ3RoICkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgaXNSaWdodFRvTGVmdCA9IHRoaXMub3B0aW9ucy5yaWdodFRvTGVmdDtcbiAgdmFyIGJlZ2luTWFyZ2luID0gaXNSaWdodFRvTGVmdCA/ICdtYXJnaW5SaWdodCcgOiAnbWFyZ2luTGVmdCc7XG4gIHZhciBlbmRNYXJnaW4gPSBpc1JpZ2h0VG9MZWZ0ID8gJ21hcmdpbkxlZnQnIDogJ21hcmdpblJpZ2h0JztcbiAgdmFyIGNvbnRlbnRXaWR0aCA9IHRoaXMuc2xpZGVhYmxlV2lkdGggLSB0aGlzLmdldExhc3RDZWxsKCkuc2l6ZVsgZW5kTWFyZ2luIF07XG4gIC8vIGNvbnRlbnQgaXMgbGVzcyB0aGFuIGdhbGxlcnkgc2l6ZVxuICB2YXIgaXNDb250ZW50U21hbGxlciA9IGNvbnRlbnRXaWR0aCA8IHRoaXMuc2l6ZS5pbm5lcldpZHRoO1xuICAvLyBib3VuZHNcbiAgdmFyIGJlZ2luQm91bmQgPSB0aGlzLmN1cnNvclBvc2l0aW9uICsgdGhpcy5jZWxsc1swXS5zaXplWyBiZWdpbk1hcmdpbiBdO1xuICB2YXIgZW5kQm91bmQgPSBjb250ZW50V2lkdGggLSB0aGlzLnNpemUuaW5uZXJXaWR0aCAqICggMSAtIHRoaXMuY2VsbEFsaWduICk7XG4gIC8vIGNvbnRhaW4gZWFjaCBjZWxsIHRhcmdldFxuICB0aGlzLnNsaWRlcy5mb3JFYWNoKCBmdW5jdGlvbiggc2xpZGUgKSB7XG4gICAgaWYgKCBpc0NvbnRlbnRTbWFsbGVyICkge1xuICAgICAgLy8gYWxsIGNlbGxzIGZpdCBpbnNpZGUgZ2FsbGVyeVxuICAgICAgc2xpZGUudGFyZ2V0ID0gY29udGVudFdpZHRoICogdGhpcy5jZWxsQWxpZ247XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGNvbnRhaW4gdG8gYm91bmRzXG4gICAgICBzbGlkZS50YXJnZXQgPSBNYXRoLm1heCggc2xpZGUudGFyZ2V0LCBiZWdpbkJvdW5kICk7XG4gICAgICBzbGlkZS50YXJnZXQgPSBNYXRoLm1pbiggc2xpZGUudGFyZ2V0LCBlbmRCb3VuZCApO1xuICAgIH1cbiAgfSwgdGhpcyApO1xufTtcblxuLy8gLS0tLS0gIC0tLS0tIC8vXG5cbi8qKlxuICogZW1pdHMgZXZlbnRzIHZpYSBldmVudEVtaXR0ZXIgYW5kIGpRdWVyeSBldmVudHNcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIC0gbmFtZSBvZiBldmVudFxuICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBvcmlnaW5hbCBldmVudFxuICogQHBhcmFtIHtBcnJheX0gYXJncyAtIGV4dHJhIGFyZ3VtZW50c1xuICovXG5wcm90by5kaXNwYXRjaEV2ZW50ID0gZnVuY3Rpb24oIHR5cGUsIGV2ZW50LCBhcmdzICkge1xuICB2YXIgZW1pdEFyZ3MgPSBldmVudCA/IFsgZXZlbnQgXS5jb25jYXQoIGFyZ3MgKSA6IGFyZ3M7XG4gIHRoaXMuZW1pdEV2ZW50KCB0eXBlLCBlbWl0QXJncyApO1xuXG4gIGlmICggalF1ZXJ5ICYmIHRoaXMuJGVsZW1lbnQgKSB7XG4gICAgLy8gZGVmYXVsdCB0cmlnZ2VyIHdpdGggdHlwZSBpZiBubyBldmVudFxuICAgIHR5cGUgKz0gdGhpcy5vcHRpb25zLm5hbWVzcGFjZUpRdWVyeUV2ZW50cyA/ICcuZmxpY2tpdHknIDogJyc7XG4gICAgdmFyICRldmVudCA9IHR5cGU7XG4gICAgaWYgKCBldmVudCApIHtcbiAgICAgIC8vIGNyZWF0ZSBqUXVlcnkgZXZlbnRcbiAgICAgIHZhciBqUUV2ZW50ID0galF1ZXJ5LkV2ZW50KCBldmVudCApO1xuICAgICAgalFFdmVudC50eXBlID0gdHlwZTtcbiAgICAgICRldmVudCA9IGpRRXZlbnQ7XG4gICAgfVxuICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlciggJGV2ZW50LCBhcmdzICk7XG4gIH1cbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIHNlbGVjdCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG4vKipcbiAqIEBwYXJhbSB7SW50ZWdlcn0gaW5kZXggLSBpbmRleCBvZiB0aGUgc2xpZGVcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gaXNXcmFwIC0gd2lsbCB3cmFwLWFyb3VuZCB0byBsYXN0L2ZpcnN0IGlmIGF0IHRoZSBlbmRcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gaXNJbnN0YW50IC0gd2lsbCBpbW1lZGlhdGVseSBzZXQgcG9zaXRpb24gYXQgc2VsZWN0ZWQgY2VsbFxuICovXG5wcm90by5zZWxlY3QgPSBmdW5jdGlvbiggaW5kZXgsIGlzV3JhcCwgaXNJbnN0YW50ICkge1xuICBpZiAoICF0aGlzLmlzQWN0aXZlICkge1xuICAgIHJldHVybjtcbiAgfVxuICBpbmRleCA9IHBhcnNlSW50KCBpbmRleCwgMTAgKTtcbiAgdGhpcy5fd3JhcFNlbGVjdCggaW5kZXggKTtcblxuICBpZiAoIHRoaXMub3B0aW9ucy53cmFwQXJvdW5kIHx8IGlzV3JhcCApIHtcbiAgICBpbmRleCA9IHV0aWxzLm1vZHVsbyggaW5kZXgsIHRoaXMuc2xpZGVzLmxlbmd0aCApO1xuICB9XG4gIC8vIGJhaWwgaWYgaW52YWxpZCBpbmRleFxuICBpZiAoICF0aGlzLnNsaWRlc1sgaW5kZXggXSApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGhpcy5zZWxlY3RlZEluZGV4ID0gaW5kZXg7XG4gIHRoaXMudXBkYXRlU2VsZWN0ZWRTbGlkZSgpO1xuICBpZiAoIGlzSW5zdGFudCApIHtcbiAgICB0aGlzLnBvc2l0aW9uU2xpZGVyQXRTZWxlY3RlZCgpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuc3RhcnRBbmltYXRpb24oKTtcbiAgfVxuICBpZiAoIHRoaXMub3B0aW9ucy5hZGFwdGl2ZUhlaWdodCApIHtcbiAgICB0aGlzLnNldEdhbGxlcnlTaXplKCk7XG4gIH1cblxuICB0aGlzLmRpc3BhdGNoRXZlbnQoJ3NlbGVjdCcpO1xuICAvLyBvbGQgdjEgZXZlbnQgbmFtZSwgcmVtb3ZlIGluIHYzXG4gIHRoaXMuZGlzcGF0Y2hFdmVudCgnY2VsbFNlbGVjdCcpO1xufTtcblxuLy8gd3JhcHMgcG9zaXRpb24gZm9yIHdyYXBBcm91bmQsIHRvIG1vdmUgdG8gY2xvc2VzdCBzbGlkZS4gIzExM1xucHJvdG8uX3dyYXBTZWxlY3QgPSBmdW5jdGlvbiggaW5kZXggKSB7XG4gIHZhciBsZW4gPSB0aGlzLnNsaWRlcy5sZW5ndGg7XG4gIHZhciBpc1dyYXBwaW5nID0gdGhpcy5vcHRpb25zLndyYXBBcm91bmQgJiYgbGVuID4gMTtcbiAgaWYgKCAhaXNXcmFwcGluZyApIHtcbiAgICByZXR1cm4gaW5kZXg7XG4gIH1cbiAgdmFyIHdyYXBJbmRleCA9IHV0aWxzLm1vZHVsbyggaW5kZXgsIGxlbiApO1xuICAvLyBnbyB0byBzaG9ydGVzdFxuICB2YXIgZGVsdGEgPSBNYXRoLmFicyggd3JhcEluZGV4IC0gdGhpcy5zZWxlY3RlZEluZGV4ICk7XG4gIHZhciBiYWNrV3JhcERlbHRhID0gTWF0aC5hYnMoICggd3JhcEluZGV4ICsgbGVuICkgLSB0aGlzLnNlbGVjdGVkSW5kZXggKTtcbiAgdmFyIGZvcmV3YXJkV3JhcERlbHRhID0gTWF0aC5hYnMoICggd3JhcEluZGV4IC0gbGVuICkgLSB0aGlzLnNlbGVjdGVkSW5kZXggKTtcbiAgaWYgKCAhdGhpcy5pc0RyYWdTZWxlY3QgJiYgYmFja1dyYXBEZWx0YSA8IGRlbHRhICkge1xuICAgIGluZGV4ICs9IGxlbjtcbiAgfSBlbHNlIGlmICggIXRoaXMuaXNEcmFnU2VsZWN0ICYmIGZvcmV3YXJkV3JhcERlbHRhIDwgZGVsdGEgKSB7XG4gICAgaW5kZXggLT0gbGVuO1xuICB9XG4gIC8vIHdyYXAgcG9zaXRpb24gc28gc2xpZGVyIGlzIHdpdGhpbiBub3JtYWwgYXJlYVxuICBpZiAoIGluZGV4IDwgMCApIHtcbiAgICB0aGlzLnggLT0gdGhpcy5zbGlkZWFibGVXaWR0aDtcbiAgfSBlbHNlIGlmICggaW5kZXggPj0gbGVuICkge1xuICAgIHRoaXMueCArPSB0aGlzLnNsaWRlYWJsZVdpZHRoO1xuICB9XG59O1xuXG5wcm90by5wcmV2aW91cyA9IGZ1bmN0aW9uKCBpc1dyYXAsIGlzSW5zdGFudCApIHtcbiAgdGhpcy5zZWxlY3QoIHRoaXMuc2VsZWN0ZWRJbmRleCAtIDEsIGlzV3JhcCwgaXNJbnN0YW50ICk7XG59O1xuXG5wcm90by5uZXh0ID0gZnVuY3Rpb24oIGlzV3JhcCwgaXNJbnN0YW50ICkge1xuICB0aGlzLnNlbGVjdCggdGhpcy5zZWxlY3RlZEluZGV4ICsgMSwgaXNXcmFwLCBpc0luc3RhbnQgKTtcbn07XG5cbnByb3RvLnVwZGF0ZVNlbGVjdGVkU2xpZGUgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHNsaWRlID0gdGhpcy5zbGlkZXNbIHRoaXMuc2VsZWN0ZWRJbmRleCBdO1xuICAvLyBzZWxlY3RlZEluZGV4IGNvdWxkIGJlIG91dHNpZGUgb2Ygc2xpZGVzLCBpZiB0cmlnZ2VyZWQgYmVmb3JlIHJlc2l6ZSgpXG4gIGlmICggIXNsaWRlICkge1xuICAgIHJldHVybjtcbiAgfVxuICAvLyB1bnNlbGVjdCBwcmV2aW91cyBzZWxlY3RlZCBzbGlkZVxuICB0aGlzLnVuc2VsZWN0U2VsZWN0ZWRTbGlkZSgpO1xuICAvLyB1cGRhdGUgbmV3IHNlbGVjdGVkIHNsaWRlXG4gIHRoaXMuc2VsZWN0ZWRTbGlkZSA9IHNsaWRlO1xuICBzbGlkZS5zZWxlY3QoKTtcbiAgdGhpcy5zZWxlY3RlZENlbGxzID0gc2xpZGUuY2VsbHM7XG4gIHRoaXMuc2VsZWN0ZWRFbGVtZW50cyA9IHNsaWRlLmdldENlbGxFbGVtZW50cygpO1xuICAvLyBIQUNLOiBzZWxlY3RlZENlbGwgJiBzZWxlY3RlZEVsZW1lbnQgaXMgZmlyc3QgY2VsbCBpbiBzbGlkZSwgYmFja3dhcmRzIGNvbXBhdGliaWxpdHlcbiAgLy8gUmVtb3ZlIGluIHYzP1xuICB0aGlzLnNlbGVjdGVkQ2VsbCA9IHNsaWRlLmNlbGxzWzBdO1xuICB0aGlzLnNlbGVjdGVkRWxlbWVudCA9IHRoaXMuc2VsZWN0ZWRFbGVtZW50c1swXTtcbn07XG5cbnByb3RvLnVuc2VsZWN0U2VsZWN0ZWRTbGlkZSA9IGZ1bmN0aW9uKCkge1xuICBpZiAoIHRoaXMuc2VsZWN0ZWRTbGlkZSApIHtcbiAgICB0aGlzLnNlbGVjdGVkU2xpZGUudW5zZWxlY3QoKTtcbiAgfVxufTtcblxuLyoqXG4gKiBzZWxlY3Qgc2xpZGUgZnJvbSBudW1iZXIgb3IgY2VsbCBlbGVtZW50XG4gKiBAcGFyYW0ge0VsZW1lbnQgb3IgTnVtYmVyfSBlbGVtXG4gKi9cbnByb3RvLnNlbGVjdENlbGwgPSBmdW5jdGlvbiggdmFsdWUsIGlzV3JhcCwgaXNJbnN0YW50ICkge1xuICAvLyBnZXQgY2VsbFxuICB2YXIgY2VsbDtcbiAgaWYgKCB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgKSB7XG4gICAgY2VsbCA9IHRoaXMuY2VsbHNbIHZhbHVlIF07XG4gIH0gZWxzZSB7XG4gICAgLy8gdXNlIHN0cmluZyBhcyBzZWxlY3RvclxuICAgIGlmICggdHlwZW9mIHZhbHVlID09ICdzdHJpbmcnICkge1xuICAgICAgdmFsdWUgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvciggdmFsdWUgKTtcbiAgICB9XG4gICAgLy8gZ2V0IGNlbGwgZnJvbSBlbGVtZW50XG4gICAgY2VsbCA9IHRoaXMuZ2V0Q2VsbCggdmFsdWUgKTtcbiAgfVxuICAvLyBzZWxlY3Qgc2xpZGUgdGhhdCBoYXMgY2VsbFxuICBmb3IgKCB2YXIgaT0wOyBjZWxsICYmIGkgPCB0aGlzLnNsaWRlcy5sZW5ndGg7IGkrKyApIHtcbiAgICB2YXIgc2xpZGUgPSB0aGlzLnNsaWRlc1tpXTtcbiAgICB2YXIgaW5kZXggPSBzbGlkZS5jZWxscy5pbmRleE9mKCBjZWxsICk7XG4gICAgaWYgKCBpbmRleCAhPSAtMSApIHtcbiAgICAgIHRoaXMuc2VsZWN0KCBpLCBpc1dyYXAsIGlzSW5zdGFudCApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gZ2V0IGNlbGxzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbi8qKlxuICogZ2V0IEZsaWNraXR5LkNlbGwsIGdpdmVuIGFuIEVsZW1lbnRcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbVxuICogQHJldHVybnMge0ZsaWNraXR5LkNlbGx9IGl0ZW1cbiAqL1xucHJvdG8uZ2V0Q2VsbCA9IGZ1bmN0aW9uKCBlbGVtICkge1xuICAvLyBsb29wIHRocm91Z2ggY2VsbHMgdG8gZ2V0IHRoZSBvbmUgdGhhdCBtYXRjaGVzXG4gIGZvciAoIHZhciBpPTA7IGkgPCB0aGlzLmNlbGxzLmxlbmd0aDsgaSsrICkge1xuICAgIHZhciBjZWxsID0gdGhpcy5jZWxsc1tpXTtcbiAgICBpZiAoIGNlbGwuZWxlbWVudCA9PSBlbGVtICkge1xuICAgICAgcmV0dXJuIGNlbGw7XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIGdldCBjb2xsZWN0aW9uIG9mIEZsaWNraXR5LkNlbGxzLCBnaXZlbiBFbGVtZW50c1xuICogQHBhcmFtIHtFbGVtZW50LCBBcnJheSwgTm9kZUxpc3R9IGVsZW1zXG4gKiBAcmV0dXJucyB7QXJyYXl9IGNlbGxzIC0gRmxpY2tpdHkuQ2VsbHNcbiAqL1xucHJvdG8uZ2V0Q2VsbHMgPSBmdW5jdGlvbiggZWxlbXMgKSB7XG4gIGVsZW1zID0gdXRpbHMubWFrZUFycmF5KCBlbGVtcyApO1xuICB2YXIgY2VsbHMgPSBbXTtcbiAgZWxlbXMuZm9yRWFjaCggZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgdmFyIGNlbGwgPSB0aGlzLmdldENlbGwoIGVsZW0gKTtcbiAgICBpZiAoIGNlbGwgKSB7XG4gICAgICBjZWxscy5wdXNoKCBjZWxsICk7XG4gICAgfVxuICB9LCB0aGlzICk7XG4gIHJldHVybiBjZWxscztcbn07XG5cbi8qKlxuICogZ2V0IGNlbGwgZWxlbWVudHNcbiAqIEByZXR1cm5zIHtBcnJheX0gY2VsbEVsZW1zXG4gKi9cbnByb3RvLmdldENlbGxFbGVtZW50cyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5jZWxscy5tYXAoIGZ1bmN0aW9uKCBjZWxsICkge1xuICAgIHJldHVybiBjZWxsLmVsZW1lbnQ7XG4gIH0pO1xufTtcblxuLyoqXG4gKiBnZXQgcGFyZW50IGNlbGwgZnJvbSBhbiBlbGVtZW50XG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1cbiAqIEByZXR1cm5zIHtGbGlja2l0LkNlbGx9IGNlbGxcbiAqL1xucHJvdG8uZ2V0UGFyZW50Q2VsbCA9IGZ1bmN0aW9uKCBlbGVtICkge1xuICAvLyBmaXJzdCBjaGVjayBpZiBlbGVtIGlzIGNlbGxcbiAgdmFyIGNlbGwgPSB0aGlzLmdldENlbGwoIGVsZW0gKTtcbiAgaWYgKCBjZWxsICkge1xuICAgIHJldHVybiBjZWxsO1xuICB9XG4gIC8vIHRyeSB0byBnZXQgcGFyZW50IGNlbGwgZWxlbVxuICBlbGVtID0gdXRpbHMuZ2V0UGFyZW50KCBlbGVtLCAnLmZsaWNraXR5LXNsaWRlciA+IConICk7XG4gIHJldHVybiB0aGlzLmdldENlbGwoIGVsZW0gKTtcbn07XG5cbi8qKlxuICogZ2V0IGNlbGxzIGFkamFjZW50IHRvIGEgc2xpZGVcbiAqIEBwYXJhbSB7SW50ZWdlcn0gYWRqQ291bnQgLSBudW1iZXIgb2YgYWRqYWNlbnQgc2xpZGVzXG4gKiBAcGFyYW0ge0ludGVnZXJ9IGluZGV4IC0gaW5kZXggb2Ygc2xpZGUgdG8gc3RhcnRcbiAqIEByZXR1cm5zIHtBcnJheX0gY2VsbHMgLSBhcnJheSBvZiBGbGlja2l0eS5DZWxsc1xuICovXG5wcm90by5nZXRBZGphY2VudENlbGxFbGVtZW50cyA9IGZ1bmN0aW9uKCBhZGpDb3VudCwgaW5kZXggKSB7XG4gIGlmICggIWFkakNvdW50ICkge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGVkU2xpZGUuZ2V0Q2VsbEVsZW1lbnRzKCk7XG4gIH1cbiAgaW5kZXggPSBpbmRleCA9PT0gdW5kZWZpbmVkID8gdGhpcy5zZWxlY3RlZEluZGV4IDogaW5kZXg7XG5cbiAgdmFyIGxlbiA9IHRoaXMuc2xpZGVzLmxlbmd0aDtcbiAgaWYgKCAxICsgKCBhZGpDb3VudCAqIDIgKSA+PSBsZW4gKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Q2VsbEVsZW1lbnRzKCk7XG4gIH1cblxuICB2YXIgY2VsbEVsZW1zID0gW107XG4gIGZvciAoIHZhciBpID0gaW5kZXggLSBhZGpDb3VudDsgaSA8PSBpbmRleCArIGFkakNvdW50IDsgaSsrICkge1xuICAgIHZhciBzbGlkZUluZGV4ID0gdGhpcy5vcHRpb25zLndyYXBBcm91bmQgPyB1dGlscy5tb2R1bG8oIGksIGxlbiApIDogaTtcbiAgICB2YXIgc2xpZGUgPSB0aGlzLnNsaWRlc1sgc2xpZGVJbmRleCBdO1xuICAgIGlmICggc2xpZGUgKSB7XG4gICAgICBjZWxsRWxlbXMgPSBjZWxsRWxlbXMuY29uY2F0KCBzbGlkZS5nZXRDZWxsRWxlbWVudHMoKSApO1xuICAgIH1cbiAgfVxuICByZXR1cm4gY2VsbEVsZW1zO1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gZXZlbnRzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbnByb3RvLnVpQ2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuZW1pdEV2ZW50KCd1aUNoYW5nZScpO1xufTtcblxucHJvdG8uY2hpbGRVSVBvaW50ZXJEb3duID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICB0aGlzLmVtaXRFdmVudCggJ2NoaWxkVUlQb2ludGVyRG93bicsIFsgZXZlbnQgXSApO1xufTtcblxuLy8gLS0tLS0gcmVzaXplIC0tLS0tIC8vXG5cbnByb3RvLm9ucmVzaXplID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMud2F0Y2hDU1MoKTtcbiAgdGhpcy5yZXNpemUoKTtcbn07XG5cbnV0aWxzLmRlYm91bmNlTWV0aG9kKCBGbGlja2l0eSwgJ29ucmVzaXplJywgMTUwICk7XG5cbnByb3RvLnJlc2l6ZSA9IGZ1bmN0aW9uKCkge1xuICBpZiAoICF0aGlzLmlzQWN0aXZlICkge1xuICAgIHJldHVybjtcbiAgfVxuICB0aGlzLmdldFNpemUoKTtcbiAgLy8gd3JhcCB2YWx1ZXNcbiAgaWYgKCB0aGlzLm9wdGlvbnMud3JhcEFyb3VuZCApIHtcbiAgICB0aGlzLnggPSB1dGlscy5tb2R1bG8oIHRoaXMueCwgdGhpcy5zbGlkZWFibGVXaWR0aCApO1xuICB9XG4gIHRoaXMucG9zaXRpb25DZWxscygpO1xuICB0aGlzLl9nZXRXcmFwU2hpZnRDZWxscygpO1xuICB0aGlzLnNldEdhbGxlcnlTaXplKCk7XG4gIHRoaXMuZW1pdEV2ZW50KCdyZXNpemUnKTtcbiAgLy8gdXBkYXRlIHNlbGVjdGVkIGluZGV4IGZvciBncm91cCBzbGlkZXMsIGluc3RhbnRcbiAgLy8gVE9ETzogcG9zaXRpb24gY2FuIGJlIGxvc3QgYmV0d2VlbiBncm91cHMgb2YgdmFyaW91cyBudW1iZXJzXG4gIHZhciBzZWxlY3RlZEVsZW1lbnQgPSB0aGlzLnNlbGVjdGVkRWxlbWVudHMgJiYgdGhpcy5zZWxlY3RlZEVsZW1lbnRzWzBdO1xuICB0aGlzLnNlbGVjdENlbGwoIHNlbGVjdGVkRWxlbWVudCwgZmFsc2UsIHRydWUgKTtcbn07XG5cbi8vIHdhdGNoZXMgdGhlIDphZnRlciBwcm9wZXJ0eSwgYWN0aXZhdGVzL2RlYWN0aXZhdGVzXG5wcm90by53YXRjaENTUyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgd2F0Y2hPcHRpb24gPSB0aGlzLm9wdGlvbnMud2F0Y2hDU1M7XG4gIGlmICggIXdhdGNoT3B0aW9uICkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBhZnRlckNvbnRlbnQgPSBnZXRDb21wdXRlZFN0eWxlKCB0aGlzLmVsZW1lbnQsICc6YWZ0ZXInICkuY29udGVudDtcbiAgLy8gYWN0aXZhdGUgaWYgOmFmdGVyIHsgY29udGVudDogJ2ZsaWNraXR5JyB9XG4gIGlmICggYWZ0ZXJDb250ZW50LmluZGV4T2YoJ2ZsaWNraXR5JykgIT0gLTEgKSB7XG4gICAgdGhpcy5hY3RpdmF0ZSgpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuZGVhY3RpdmF0ZSgpO1xuICB9XG59O1xuXG4vLyAtLS0tLSBrZXlkb3duIC0tLS0tIC8vXG5cbi8vIGdvIHByZXZpb3VzL25leHQgaWYgbGVmdC9yaWdodCBrZXlzIHByZXNzZWRcbnByb3RvLm9ua2V5ZG93biA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgLy8gb25seSB3b3JrIGlmIGVsZW1lbnQgaXMgaW4gZm9jdXNcbiAgaWYgKCAhdGhpcy5vcHRpb25zLmFjY2Vzc2liaWxpdHkgfHxcbiAgICAoIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgJiYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAhPSB0aGlzLmVsZW1lbnQgKSApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoIGV2ZW50LmtleUNvZGUgPT0gMzcgKSB7XG4gICAgLy8gZ28gbGVmdFxuICAgIHZhciBsZWZ0TWV0aG9kID0gdGhpcy5vcHRpb25zLnJpZ2h0VG9MZWZ0ID8gJ25leHQnIDogJ3ByZXZpb3VzJztcbiAgICB0aGlzLnVpQ2hhbmdlKCk7XG4gICAgdGhpc1sgbGVmdE1ldGhvZCBdKCk7XG4gIH0gZWxzZSBpZiAoIGV2ZW50LmtleUNvZGUgPT0gMzkgKSB7XG4gICAgLy8gZ28gcmlnaHRcbiAgICB2YXIgcmlnaHRNZXRob2QgPSB0aGlzLm9wdGlvbnMucmlnaHRUb0xlZnQgPyAncHJldmlvdXMnIDogJ25leHQnO1xuICAgIHRoaXMudWlDaGFuZ2UoKTtcbiAgICB0aGlzWyByaWdodE1ldGhvZCBdKCk7XG4gIH1cbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGRlc3Ryb3kgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuLy8gZGVhY3RpdmF0ZSBhbGwgRmxpY2tpdHkgZnVuY3Rpb25hbGl0eSwgYnV0IGtlZXAgc3R1ZmYgYXZhaWxhYmxlXG5wcm90by5kZWFjdGl2YXRlID0gZnVuY3Rpb24oKSB7XG4gIGlmICggIXRoaXMuaXNBY3RpdmUgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdmbGlja2l0eS1lbmFibGVkJyk7XG4gIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdmbGlja2l0eS1ydGwnKTtcbiAgLy8gZGVzdHJveSBjZWxsc1xuICB0aGlzLmNlbGxzLmZvckVhY2goIGZ1bmN0aW9uKCBjZWxsICkge1xuICAgIGNlbGwuZGVzdHJveSgpO1xuICB9KTtcbiAgdGhpcy51bnNlbGVjdFNlbGVjdGVkU2xpZGUoKTtcbiAgdGhpcy5lbGVtZW50LnJlbW92ZUNoaWxkKCB0aGlzLnZpZXdwb3J0ICk7XG4gIC8vIG1vdmUgY2hpbGQgZWxlbWVudHMgYmFjayBpbnRvIGVsZW1lbnRcbiAgbW92ZUVsZW1lbnRzKCB0aGlzLnNsaWRlci5jaGlsZHJlbiwgdGhpcy5lbGVtZW50ICk7XG4gIGlmICggdGhpcy5vcHRpb25zLmFjY2Vzc2liaWxpdHkgKSB7XG4gICAgdGhpcy5lbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgndGFiSW5kZXgnKTtcbiAgICB0aGlzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ2tleWRvd24nLCB0aGlzICk7XG4gIH1cbiAgLy8gc2V0IGZsYWdzXG4gIHRoaXMuaXNBY3RpdmUgPSBmYWxzZTtcbiAgdGhpcy5lbWl0RXZlbnQoJ2RlYWN0aXZhdGUnKTtcbn07XG5cbnByb3RvLmRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5kZWFjdGl2YXRlKCk7XG4gIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCAncmVzaXplJywgdGhpcyApO1xuICB0aGlzLmVtaXRFdmVudCgnZGVzdHJveScpO1xuICBpZiAoIGpRdWVyeSAmJiB0aGlzLiRlbGVtZW50ICkge1xuICAgIGpRdWVyeS5yZW1vdmVEYXRhKCB0aGlzLmVsZW1lbnQsICdmbGlja2l0eScgKTtcbiAgfVxuICBkZWxldGUgdGhpcy5lbGVtZW50LmZsaWNraXR5R1VJRDtcbiAgZGVsZXRlIGluc3RhbmNlc1sgdGhpcy5ndWlkIF07XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBwcm90b3R5cGUgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxudXRpbHMuZXh0ZW5kKCBwcm90bywgYW5pbWF0ZVByb3RvdHlwZSApO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBleHRyYXMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuLyoqXG4gKiBnZXQgRmxpY2tpdHkgaW5zdGFuY2UgZnJvbSBlbGVtZW50XG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1cbiAqIEByZXR1cm5zIHtGbGlja2l0eX1cbiAqL1xuRmxpY2tpdHkuZGF0YSA9IGZ1bmN0aW9uKCBlbGVtICkge1xuICBlbGVtID0gdXRpbHMuZ2V0UXVlcnlFbGVtZW50KCBlbGVtICk7XG4gIHZhciBpZCA9IGVsZW0gJiYgZWxlbS5mbGlja2l0eUdVSUQ7XG4gIHJldHVybiBpZCAmJiBpbnN0YW5jZXNbIGlkIF07XG59O1xuXG51dGlscy5odG1sSW5pdCggRmxpY2tpdHksICdmbGlja2l0eScgKTtcblxuaWYgKCBqUXVlcnkgJiYgalF1ZXJ5LmJyaWRnZXQgKSB7XG4gIGpRdWVyeS5icmlkZ2V0KCAnZmxpY2tpdHknLCBGbGlja2l0eSApO1xufVxuXG5GbGlja2l0eS5DZWxsID0gQ2VsbDtcblxucmV0dXJuIEZsaWNraXR5O1xuXG59KSk7XG4iLCIvKiFcbiAqIEZsaWNraXR5IHYyLjAuNFxuICogVG91Y2gsIHJlc3BvbnNpdmUsIGZsaWNrYWJsZSBjYXJvdXNlbHNcbiAqXG4gKiBMaWNlbnNlZCBHUEx2MyBmb3Igb3BlbiBzb3VyY2UgdXNlXG4gKiBvciBGbGlja2l0eSBDb21tZXJjaWFsIExpY2Vuc2UgZm9yIGNvbW1lcmNpYWwgdXNlXG4gKlxuICogaHR0cDovL2ZsaWNraXR5Lm1ldGFmaXp6eS5jb1xuICogQ29weXJpZ2h0IDIwMTYgTWV0YWZpenp5XG4gKi9cblxuKCBmdW5jdGlvbiggd2luZG93LCBmYWN0b3J5ICkge1xuICAvLyB1bml2ZXJzYWwgbW9kdWxlIGRlZmluaXRpb25cbiAgLyoganNoaW50IHN0cmljdDogZmFsc2UgKi9cbiAgaWYgKCB0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCApIHtcbiAgICAvLyBBTURcbiAgICBkZWZpbmUoIFtcbiAgICAgICcuL2ZsaWNraXR5JyxcbiAgICAgICcuL2RyYWcnLFxuICAgICAgJy4vcHJldi1uZXh0LWJ1dHRvbicsXG4gICAgICAnLi9wYWdlLWRvdHMnLFxuICAgICAgJy4vcGxheWVyJyxcbiAgICAgICcuL2FkZC1yZW1vdmUtY2VsbCcsXG4gICAgICAnLi9sYXp5bG9hZCdcbiAgICBdLCBmYWN0b3J5ICk7XG4gIH0gZWxzZSBpZiAoIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMgKSB7XG4gICAgLy8gQ29tbW9uSlNcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoXG4gICAgICByZXF1aXJlKCcuL2ZsaWNraXR5JyksXG4gICAgICByZXF1aXJlKCcuL2RyYWcnKSxcbiAgICAgIHJlcXVpcmUoJy4vcHJldi1uZXh0LWJ1dHRvbicpLFxuICAgICAgcmVxdWlyZSgnLi9wYWdlLWRvdHMnKSxcbiAgICAgIHJlcXVpcmUoJy4vcGxheWVyJyksXG4gICAgICByZXF1aXJlKCcuL2FkZC1yZW1vdmUtY2VsbCcpLFxuICAgICAgcmVxdWlyZSgnLi9sYXp5bG9hZCcpXG4gICAgKTtcbiAgfVxuXG59KSggd2luZG93LCBmdW5jdGlvbiBmYWN0b3J5KCBGbGlja2l0eSApIHtcbiAgLypqc2hpbnQgc3RyaWN0OiBmYWxzZSovXG4gIHJldHVybiBGbGlja2l0eTtcbn0pO1xuIiwiLy8gbGF6eWxvYWRcbiggZnVuY3Rpb24oIHdpbmRvdywgZmFjdG9yeSApIHtcbiAgLy8gdW5pdmVyc2FsIG1vZHVsZSBkZWZpbml0aW9uXG4gIC8qIGpzaGludCBzdHJpY3Q6IGZhbHNlICovXG4gIGlmICggdHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgKSB7XG4gICAgLy8gQU1EXG4gICAgZGVmaW5lKCBbXG4gICAgICAnLi9mbGlja2l0eScsXG4gICAgICAnZml6enktdWktdXRpbHMvdXRpbHMnXG4gICAgXSwgZnVuY3Rpb24oIEZsaWNraXR5LCB1dGlscyApIHtcbiAgICAgIHJldHVybiBmYWN0b3J5KCB3aW5kb3csIEZsaWNraXR5LCB1dGlscyApO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKCB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzICkge1xuICAgIC8vIENvbW1vbkpTXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KFxuICAgICAgd2luZG93LFxuICAgICAgcmVxdWlyZSgnLi9mbGlja2l0eScpLFxuICAgICAgcmVxdWlyZSgnZml6enktdWktdXRpbHMnKVxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgLy8gYnJvd3NlciBnbG9iYWxcbiAgICBmYWN0b3J5KFxuICAgICAgd2luZG93LFxuICAgICAgd2luZG93LkZsaWNraXR5LFxuICAgICAgd2luZG93LmZpenp5VUlVdGlsc1xuICAgICk7XG4gIH1cblxufSggd2luZG93LCBmdW5jdGlvbiBmYWN0b3J5KCB3aW5kb3csIEZsaWNraXR5LCB1dGlscyApIHtcbid1c2Ugc3RyaWN0JztcblxuRmxpY2tpdHkuY3JlYXRlTWV0aG9kcy5wdXNoKCdfY3JlYXRlTGF6eWxvYWQnKTtcbnZhciBwcm90byA9IEZsaWNraXR5LnByb3RvdHlwZTtcblxucHJvdG8uX2NyZWF0ZUxhenlsb2FkID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMub24oICdzZWxlY3QnLCB0aGlzLmxhenlMb2FkICk7XG59O1xuXG5wcm90by5sYXp5TG9hZCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgbGF6eUxvYWQgPSB0aGlzLm9wdGlvbnMubGF6eUxvYWQ7XG4gIGlmICggIWxhenlMb2FkICkge1xuICAgIHJldHVybjtcbiAgfVxuICAvLyBnZXQgYWRqYWNlbnQgY2VsbHMsIHVzZSBsYXp5TG9hZCBvcHRpb24gZm9yIGFkamFjZW50IGNvdW50XG4gIHZhciBhZGpDb3VudCA9IHR5cGVvZiBsYXp5TG9hZCA9PSAnbnVtYmVyJyA/IGxhenlMb2FkIDogMDtcbiAgdmFyIGNlbGxFbGVtcyA9IHRoaXMuZ2V0QWRqYWNlbnRDZWxsRWxlbWVudHMoIGFkakNvdW50ICk7XG4gIC8vIGdldCBsYXp5IGltYWdlcyBpbiB0aG9zZSBjZWxsc1xuICB2YXIgbGF6eUltYWdlcyA9IFtdO1xuICBjZWxsRWxlbXMuZm9yRWFjaCggZnVuY3Rpb24oIGNlbGxFbGVtICkge1xuICAgIHZhciBsYXp5Q2VsbEltYWdlcyA9IGdldENlbGxMYXp5SW1hZ2VzKCBjZWxsRWxlbSApO1xuICAgIGxhenlJbWFnZXMgPSBsYXp5SW1hZ2VzLmNvbmNhdCggbGF6eUNlbGxJbWFnZXMgKTtcbiAgfSk7XG4gIC8vIGxvYWQgbGF6eSBpbWFnZXNcbiAgbGF6eUltYWdlcy5mb3JFYWNoKCBmdW5jdGlvbiggaW1nICkge1xuICAgIG5ldyBMYXp5TG9hZGVyKCBpbWcsIHRoaXMgKTtcbiAgfSwgdGhpcyApO1xufTtcblxuZnVuY3Rpb24gZ2V0Q2VsbExhenlJbWFnZXMoIGNlbGxFbGVtICkge1xuICAvLyBjaGVjayBpZiBjZWxsIGVsZW1lbnQgaXMgbGF6eSBpbWFnZVxuICBpZiAoIGNlbGxFbGVtLm5vZGVOYW1lID09ICdJTUcnICYmXG4gICAgY2VsbEVsZW0uZ2V0QXR0cmlidXRlKCdkYXRhLWZsaWNraXR5LWxhenlsb2FkJykgKSB7XG4gICAgcmV0dXJuIFsgY2VsbEVsZW0gXTtcbiAgfVxuICAvLyBzZWxlY3QgbGF6eSBpbWFnZXMgaW4gY2VsbFxuICB2YXIgaW1ncyA9IGNlbGxFbGVtLnF1ZXJ5U2VsZWN0b3JBbGwoJ2ltZ1tkYXRhLWZsaWNraXR5LWxhenlsb2FkXScpO1xuICByZXR1cm4gdXRpbHMubWFrZUFycmF5KCBpbWdzICk7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIExhenlMb2FkZXIgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuLyoqXG4gKiBjbGFzcyB0byBoYW5kbGUgbG9hZGluZyBpbWFnZXNcbiAqL1xuZnVuY3Rpb24gTGF6eUxvYWRlciggaW1nLCBmbGlja2l0eSApIHtcbiAgdGhpcy5pbWcgPSBpbWc7XG4gIHRoaXMuZmxpY2tpdHkgPSBmbGlja2l0eTtcbiAgdGhpcy5sb2FkKCk7XG59XG5cbkxhenlMb2FkZXIucHJvdG90eXBlLmhhbmRsZUV2ZW50ID0gdXRpbHMuaGFuZGxlRXZlbnQ7XG5cbkxhenlMb2FkZXIucHJvdG90eXBlLmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5pbWcuYWRkRXZlbnRMaXN0ZW5lciggJ2xvYWQnLCB0aGlzICk7XG4gIHRoaXMuaW1nLmFkZEV2ZW50TGlzdGVuZXIoICdlcnJvcicsIHRoaXMgKTtcbiAgLy8gbG9hZCBpbWFnZVxuICB0aGlzLmltZy5zcmMgPSB0aGlzLmltZy5nZXRBdHRyaWJ1dGUoJ2RhdGEtZmxpY2tpdHktbGF6eWxvYWQnKTtcbiAgLy8gcmVtb3ZlIGF0dHJcbiAgdGhpcy5pbWcucmVtb3ZlQXR0cmlidXRlKCdkYXRhLWZsaWNraXR5LWxhenlsb2FkJyk7XG59O1xuXG5MYXp5TG9hZGVyLnByb3RvdHlwZS5vbmxvYWQgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIHRoaXMuY29tcGxldGUoIGV2ZW50LCAnZmxpY2tpdHktbGF6eWxvYWRlZCcgKTtcbn07XG5cbkxhenlMb2FkZXIucHJvdG90eXBlLm9uZXJyb3IgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIHRoaXMuY29tcGxldGUoIGV2ZW50LCAnZmxpY2tpdHktbGF6eWVycm9yJyApO1xufTtcblxuTGF6eUxvYWRlci5wcm90b3R5cGUuY29tcGxldGUgPSBmdW5jdGlvbiggZXZlbnQsIGNsYXNzTmFtZSApIHtcbiAgLy8gdW5iaW5kIGV2ZW50c1xuICB0aGlzLmltZy5yZW1vdmVFdmVudExpc3RlbmVyKCAnbG9hZCcsIHRoaXMgKTtcbiAgdGhpcy5pbWcucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ2Vycm9yJywgdGhpcyApO1xuXG4gIHZhciBjZWxsID0gdGhpcy5mbGlja2l0eS5nZXRQYXJlbnRDZWxsKCB0aGlzLmltZyApO1xuICB2YXIgY2VsbEVsZW0gPSBjZWxsICYmIGNlbGwuZWxlbWVudDtcbiAgdGhpcy5mbGlja2l0eS5jZWxsU2l6ZUNoYW5nZSggY2VsbEVsZW0gKTtcblxuICB0aGlzLmltZy5jbGFzc0xpc3QuYWRkKCBjbGFzc05hbWUgKTtcbiAgdGhpcy5mbGlja2l0eS5kaXNwYXRjaEV2ZW50KCAnbGF6eUxvYWQnLCBldmVudCwgY2VsbEVsZW0gKTtcbn07XG5cbi8vIC0tLS0tICAtLS0tLSAvL1xuXG5GbGlja2l0eS5MYXp5TG9hZGVyID0gTGF6eUxvYWRlcjtcblxucmV0dXJuIEZsaWNraXR5O1xuXG59KSk7XG4iLCIvLyBwYWdlIGRvdHNcbiggZnVuY3Rpb24oIHdpbmRvdywgZmFjdG9yeSApIHtcbiAgLy8gdW5pdmVyc2FsIG1vZHVsZSBkZWZpbml0aW9uXG4gIC8qIGpzaGludCBzdHJpY3Q6IGZhbHNlICovXG4gIGlmICggdHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgKSB7XG4gICAgLy8gQU1EXG4gICAgZGVmaW5lKCBbXG4gICAgICAnLi9mbGlja2l0eScsXG4gICAgICAndGFwLWxpc3RlbmVyL3RhcC1saXN0ZW5lcicsXG4gICAgICAnZml6enktdWktdXRpbHMvdXRpbHMnXG4gICAgXSwgZnVuY3Rpb24oIEZsaWNraXR5LCBUYXBMaXN0ZW5lciwgdXRpbHMgKSB7XG4gICAgICByZXR1cm4gZmFjdG9yeSggd2luZG93LCBGbGlja2l0eSwgVGFwTGlzdGVuZXIsIHV0aWxzICk7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAoIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMgKSB7XG4gICAgLy8gQ29tbW9uSlNcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoXG4gICAgICB3aW5kb3csXG4gICAgICByZXF1aXJlKCcuL2ZsaWNraXR5JyksXG4gICAgICByZXF1aXJlKCd0YXAtbGlzdGVuZXInKSxcbiAgICAgIHJlcXVpcmUoJ2Zpenp5LXVpLXV0aWxzJylcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIC8vIGJyb3dzZXIgZ2xvYmFsXG4gICAgZmFjdG9yeShcbiAgICAgIHdpbmRvdyxcbiAgICAgIHdpbmRvdy5GbGlja2l0eSxcbiAgICAgIHdpbmRvdy5UYXBMaXN0ZW5lcixcbiAgICAgIHdpbmRvdy5maXp6eVVJVXRpbHNcbiAgICApO1xuICB9XG5cbn0oIHdpbmRvdywgZnVuY3Rpb24gZmFjdG9yeSggd2luZG93LCBGbGlja2l0eSwgVGFwTGlzdGVuZXIsIHV0aWxzICkge1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBQYWdlRG90cyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG4ndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIFBhZ2VEb3RzKCBwYXJlbnQgKSB7XG4gIHRoaXMucGFyZW50ID0gcGFyZW50O1xuICB0aGlzLl9jcmVhdGUoKTtcbn1cblxuUGFnZURvdHMucHJvdG90eXBlID0gbmV3IFRhcExpc3RlbmVyKCk7XG5cblBhZ2VEb3RzLnByb3RvdHlwZS5fY3JlYXRlID0gZnVuY3Rpb24oKSB7XG4gIC8vIGNyZWF0ZSBob2xkZXIgZWxlbWVudFxuICB0aGlzLmhvbGRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29sJyk7XG4gIHRoaXMuaG9sZGVyLmNsYXNzTmFtZSA9ICdmbGlja2l0eS1wYWdlLWRvdHMnO1xuICAvLyBjcmVhdGUgZG90cywgYXJyYXkgb2YgZWxlbWVudHNcbiAgdGhpcy5kb3RzID0gW107XG4gIC8vIGV2ZW50c1xuICB0aGlzLm9uKCAndGFwJywgdGhpcy5vblRhcCApO1xuICB0aGlzLm9uKCAncG9pbnRlckRvd24nLCB0aGlzLnBhcmVudC5jaGlsZFVJUG9pbnRlckRvd24uYmluZCggdGhpcy5wYXJlbnQgKSApO1xufTtcblxuUGFnZURvdHMucHJvdG90eXBlLmFjdGl2YXRlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuc2V0RG90cygpO1xuICB0aGlzLmJpbmRUYXAoIHRoaXMuaG9sZGVyICk7XG4gIC8vIGFkZCB0byBET01cbiAgdGhpcy5wYXJlbnQuZWxlbWVudC5hcHBlbmRDaGlsZCggdGhpcy5ob2xkZXIgKTtcbn07XG5cblBhZ2VEb3RzLnByb3RvdHlwZS5kZWFjdGl2YXRlID0gZnVuY3Rpb24oKSB7XG4gIC8vIHJlbW92ZSBmcm9tIERPTVxuICB0aGlzLnBhcmVudC5lbGVtZW50LnJlbW92ZUNoaWxkKCB0aGlzLmhvbGRlciApO1xuICBUYXBMaXN0ZW5lci5wcm90b3R5cGUuZGVzdHJveS5jYWxsKCB0aGlzICk7XG59O1xuXG5QYWdlRG90cy5wcm90b3R5cGUuc2V0RG90cyA9IGZ1bmN0aW9uKCkge1xuICAvLyBnZXQgZGlmZmVyZW5jZSBiZXR3ZWVuIG51bWJlciBvZiBzbGlkZXMgYW5kIG51bWJlciBvZiBkb3RzXG4gIHZhciBkZWx0YSA9IHRoaXMucGFyZW50LnNsaWRlcy5sZW5ndGggLSB0aGlzLmRvdHMubGVuZ3RoO1xuICBpZiAoIGRlbHRhID4gMCApIHtcbiAgICB0aGlzLmFkZERvdHMoIGRlbHRhICk7XG4gIH0gZWxzZSBpZiAoIGRlbHRhIDwgMCApIHtcbiAgICB0aGlzLnJlbW92ZURvdHMoIC1kZWx0YSApO1xuICB9XG59O1xuXG5QYWdlRG90cy5wcm90b3R5cGUuYWRkRG90cyA9IGZ1bmN0aW9uKCBjb3VudCApIHtcbiAgdmFyIGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICB2YXIgbmV3RG90cyA9IFtdO1xuICB3aGlsZSAoIGNvdW50ICkge1xuICAgIHZhciBkb3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgIGRvdC5jbGFzc05hbWUgPSAnZG90JztcbiAgICBmcmFnbWVudC5hcHBlbmRDaGlsZCggZG90ICk7XG4gICAgbmV3RG90cy5wdXNoKCBkb3QgKTtcbiAgICBjb3VudC0tO1xuICB9XG4gIHRoaXMuaG9sZGVyLmFwcGVuZENoaWxkKCBmcmFnbWVudCApO1xuICB0aGlzLmRvdHMgPSB0aGlzLmRvdHMuY29uY2F0KCBuZXdEb3RzICk7XG59O1xuXG5QYWdlRG90cy5wcm90b3R5cGUucmVtb3ZlRG90cyA9IGZ1bmN0aW9uKCBjb3VudCApIHtcbiAgLy8gcmVtb3ZlIGZyb20gdGhpcy5kb3RzIGNvbGxlY3Rpb25cbiAgdmFyIHJlbW92ZURvdHMgPSB0aGlzLmRvdHMuc3BsaWNlKCB0aGlzLmRvdHMubGVuZ3RoIC0gY291bnQsIGNvdW50ICk7XG4gIC8vIHJlbW92ZSBmcm9tIERPTVxuICByZW1vdmVEb3RzLmZvckVhY2goIGZ1bmN0aW9uKCBkb3QgKSB7XG4gICAgdGhpcy5ob2xkZXIucmVtb3ZlQ2hpbGQoIGRvdCApO1xuICB9LCB0aGlzICk7XG59O1xuXG5QYWdlRG90cy5wcm90b3R5cGUudXBkYXRlU2VsZWN0ZWQgPSBmdW5jdGlvbigpIHtcbiAgLy8gcmVtb3ZlIHNlbGVjdGVkIGNsYXNzIG9uIHByZXZpb3VzXG4gIGlmICggdGhpcy5zZWxlY3RlZERvdCApIHtcbiAgICB0aGlzLnNlbGVjdGVkRG90LmNsYXNzTmFtZSA9ICdkb3QnO1xuICB9XG4gIC8vIGRvbid0IHByb2NlZWQgaWYgbm8gZG90c1xuICBpZiAoICF0aGlzLmRvdHMubGVuZ3RoICkge1xuICAgIHJldHVybjtcbiAgfVxuICB0aGlzLnNlbGVjdGVkRG90ID0gdGhpcy5kb3RzWyB0aGlzLnBhcmVudC5zZWxlY3RlZEluZGV4IF07XG4gIHRoaXMuc2VsZWN0ZWREb3QuY2xhc3NOYW1lID0gJ2RvdCBpcy1zZWxlY3RlZCc7XG59O1xuXG5QYWdlRG90cy5wcm90b3R5cGUub25UYXAgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIHZhciB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gIC8vIG9ubHkgY2FyZSBhYm91dCBkb3QgY2xpY2tzXG4gIGlmICggdGFyZ2V0Lm5vZGVOYW1lICE9ICdMSScgKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdGhpcy5wYXJlbnQudWlDaGFuZ2UoKTtcbiAgdmFyIGluZGV4ID0gdGhpcy5kb3RzLmluZGV4T2YoIHRhcmdldCApO1xuICB0aGlzLnBhcmVudC5zZWxlY3QoIGluZGV4ICk7XG59O1xuXG5QYWdlRG90cy5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmRlYWN0aXZhdGUoKTtcbn07XG5cbkZsaWNraXR5LlBhZ2VEb3RzID0gUGFnZURvdHM7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIEZsaWNraXR5IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbnV0aWxzLmV4dGVuZCggRmxpY2tpdHkuZGVmYXVsdHMsIHtcbiAgcGFnZURvdHM6IHRydWVcbn0pO1xuXG5GbGlja2l0eS5jcmVhdGVNZXRob2RzLnB1c2goJ19jcmVhdGVQYWdlRG90cycpO1xuXG52YXIgcHJvdG8gPSBGbGlja2l0eS5wcm90b3R5cGU7XG5cbnByb3RvLl9jcmVhdGVQYWdlRG90cyA9IGZ1bmN0aW9uKCkge1xuICBpZiAoICF0aGlzLm9wdGlvbnMucGFnZURvdHMgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRoaXMucGFnZURvdHMgPSBuZXcgUGFnZURvdHMoIHRoaXMgKTtcbiAgLy8gZXZlbnRzXG4gIHRoaXMub24oICdhY3RpdmF0ZScsIHRoaXMuYWN0aXZhdGVQYWdlRG90cyApO1xuICB0aGlzLm9uKCAnc2VsZWN0JywgdGhpcy51cGRhdGVTZWxlY3RlZFBhZ2VEb3RzICk7XG4gIHRoaXMub24oICdjZWxsQ2hhbmdlJywgdGhpcy51cGRhdGVQYWdlRG90cyApO1xuICB0aGlzLm9uKCAncmVzaXplJywgdGhpcy51cGRhdGVQYWdlRG90cyApO1xuICB0aGlzLm9uKCAnZGVhY3RpdmF0ZScsIHRoaXMuZGVhY3RpdmF0ZVBhZ2VEb3RzICk7XG59O1xuXG5wcm90by5hY3RpdmF0ZVBhZ2VEb3RzID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMucGFnZURvdHMuYWN0aXZhdGUoKTtcbn07XG5cbnByb3RvLnVwZGF0ZVNlbGVjdGVkUGFnZURvdHMgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5wYWdlRG90cy51cGRhdGVTZWxlY3RlZCgpO1xufTtcblxucHJvdG8udXBkYXRlUGFnZURvdHMgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5wYWdlRG90cy5zZXREb3RzKCk7XG59O1xuXG5wcm90by5kZWFjdGl2YXRlUGFnZURvdHMgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5wYWdlRG90cy5kZWFjdGl2YXRlKCk7XG59O1xuXG4vLyAtLS0tLSAgLS0tLS0gLy9cblxuRmxpY2tpdHkuUGFnZURvdHMgPSBQYWdlRG90cztcblxucmV0dXJuIEZsaWNraXR5O1xuXG59KSk7XG4iLCIvLyBwbGF5ZXIgJiBhdXRvUGxheVxuKCBmdW5jdGlvbiggd2luZG93LCBmYWN0b3J5ICkge1xuICAvLyB1bml2ZXJzYWwgbW9kdWxlIGRlZmluaXRpb25cbiAgLyoganNoaW50IHN0cmljdDogZmFsc2UgKi9cbiAgaWYgKCB0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCApIHtcbiAgICAvLyBBTURcbiAgICBkZWZpbmUoIFtcbiAgICAgICdldi1lbWl0dGVyL2V2LWVtaXR0ZXInLFxuICAgICAgJ2Zpenp5LXVpLXV0aWxzL3V0aWxzJyxcbiAgICAgICcuL2ZsaWNraXR5J1xuICAgIF0sIGZ1bmN0aW9uKCBFdkVtaXR0ZXIsIHV0aWxzLCBGbGlja2l0eSApIHtcbiAgICAgIHJldHVybiBmYWN0b3J5KCBFdkVtaXR0ZXIsIHV0aWxzLCBGbGlja2l0eSApO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKCB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzICkge1xuICAgIC8vIENvbW1vbkpTXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KFxuICAgICAgcmVxdWlyZSgnZXYtZW1pdHRlcicpLFxuICAgICAgcmVxdWlyZSgnZml6enktdWktdXRpbHMnKSxcbiAgICAgIHJlcXVpcmUoJy4vZmxpY2tpdHknKVxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgLy8gYnJvd3NlciBnbG9iYWxcbiAgICBmYWN0b3J5KFxuICAgICAgd2luZG93LkV2RW1pdHRlcixcbiAgICAgIHdpbmRvdy5maXp6eVVJVXRpbHMsXG4gICAgICB3aW5kb3cuRmxpY2tpdHlcbiAgICApO1xuICB9XG5cbn0oIHdpbmRvdywgZnVuY3Rpb24gZmFjdG9yeSggRXZFbWl0dGVyLCB1dGlscywgRmxpY2tpdHkgKSB7XG5cbid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gUGFnZSBWaXNpYmlsaXR5IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG4vLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9HdWlkZS9Vc2VyX2V4cGVyaWVuY2UvVXNpbmdfdGhlX1BhZ2VfVmlzaWJpbGl0eV9BUElcblxudmFyIGhpZGRlblByb3BlcnR5LCB2aXNpYmlsaXR5RXZlbnQ7XG5pZiAoICdoaWRkZW4nIGluIGRvY3VtZW50ICkge1xuICBoaWRkZW5Qcm9wZXJ0eSA9ICdoaWRkZW4nO1xuICB2aXNpYmlsaXR5RXZlbnQgPSAndmlzaWJpbGl0eWNoYW5nZSc7XG59IGVsc2UgaWYgKCAnd2Via2l0SGlkZGVuJyBpbiBkb2N1bWVudCApIHtcbiAgaGlkZGVuUHJvcGVydHkgPSAnd2Via2l0SGlkZGVuJztcbiAgdmlzaWJpbGl0eUV2ZW50ID0gJ3dlYmtpdHZpc2liaWxpdHljaGFuZ2UnO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBQbGF5ZXIgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuZnVuY3Rpb24gUGxheWVyKCBwYXJlbnQgKSB7XG4gIHRoaXMucGFyZW50ID0gcGFyZW50O1xuICB0aGlzLnN0YXRlID0gJ3N0b3BwZWQnO1xuICAvLyB2aXNpYmlsaXR5IGNoYW5nZSBldmVudCBoYW5kbGVyXG4gIGlmICggdmlzaWJpbGl0eUV2ZW50ICkge1xuICAgIHRoaXMub25WaXNpYmlsaXR5Q2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLnZpc2liaWxpdHlDaGFuZ2UoKTtcbiAgICB9LmJpbmQoIHRoaXMgKTtcbiAgICB0aGlzLm9uVmlzaWJpbGl0eVBsYXkgPSBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMudmlzaWJpbGl0eVBsYXkoKTtcbiAgICB9LmJpbmQoIHRoaXMgKTtcbiAgfVxufVxuXG5QbGF5ZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggRXZFbWl0dGVyLnByb3RvdHlwZSApO1xuXG4vLyBzdGFydCBwbGF5XG5QbGF5ZXIucHJvdG90eXBlLnBsYXkgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCB0aGlzLnN0YXRlID09ICdwbGF5aW5nJyApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgLy8gZG8gbm90IHBsYXkgaWYgcGFnZSBpcyBoaWRkZW4sIHN0YXJ0IHBsYXlpbmcgd2hlbiBwYWdlIGlzIHZpc2libGVcbiAgdmFyIGlzUGFnZUhpZGRlbiA9IGRvY3VtZW50WyBoaWRkZW5Qcm9wZXJ0eSBdO1xuICBpZiAoIHZpc2liaWxpdHlFdmVudCAmJiBpc1BhZ2VIaWRkZW4gKSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggdmlzaWJpbGl0eUV2ZW50LCB0aGlzLm9uVmlzaWJpbGl0eVBsYXkgKTtcbiAgICByZXR1cm47XG4gIH1cblxuICB0aGlzLnN0YXRlID0gJ3BsYXlpbmcnO1xuICAvLyBsaXN0ZW4gdG8gdmlzaWJpbGl0eSBjaGFuZ2VcbiAgaWYgKCB2aXNpYmlsaXR5RXZlbnQgKSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggdmlzaWJpbGl0eUV2ZW50LCB0aGlzLm9uVmlzaWJpbGl0eUNoYW5nZSApO1xuICB9XG4gIC8vIHN0YXJ0IHRpY2tpbmdcbiAgdGhpcy50aWNrKCk7XG59O1xuXG5QbGF5ZXIucHJvdG90eXBlLnRpY2sgPSBmdW5jdGlvbigpIHtcbiAgLy8gZG8gbm90IHRpY2sgaWYgbm90IHBsYXlpbmdcbiAgaWYgKCB0aGlzLnN0YXRlICE9ICdwbGF5aW5nJyApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgdGltZSA9IHRoaXMucGFyZW50Lm9wdGlvbnMuYXV0b1BsYXk7XG4gIC8vIGRlZmF1bHQgdG8gMyBzZWNvbmRzXG4gIHRpbWUgPSB0eXBlb2YgdGltZSA9PSAnbnVtYmVyJyA/IHRpbWUgOiAzMDAwO1xuICB2YXIgX3RoaXMgPSB0aGlzO1xuICAvLyBIQUNLOiByZXNldCB0aWNrcyBpZiBzdG9wcGVkIGFuZCBzdGFydGVkIHdpdGhpbiBpbnRlcnZhbFxuICB0aGlzLmNsZWFyKCk7XG4gIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoIGZ1bmN0aW9uKCkge1xuICAgIF90aGlzLnBhcmVudC5uZXh0KCB0cnVlICk7XG4gICAgX3RoaXMudGljaygpO1xuICB9LCB0aW1lICk7XG59O1xuXG5QbGF5ZXIucHJvdG90eXBlLnN0b3AgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5zdGF0ZSA9ICdzdG9wcGVkJztcbiAgdGhpcy5jbGVhcigpO1xuICAvLyByZW1vdmUgdmlzaWJpbGl0eSBjaGFuZ2UgZXZlbnRcbiAgaWYgKCB2aXNpYmlsaXR5RXZlbnQgKSB7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lciggdmlzaWJpbGl0eUV2ZW50LCB0aGlzLm9uVmlzaWJpbGl0eUNoYW5nZSApO1xuICB9XG59O1xuXG5QbGF5ZXIucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24oKSB7XG4gIGNsZWFyVGltZW91dCggdGhpcy50aW1lb3V0ICk7XG59O1xuXG5QbGF5ZXIucHJvdG90eXBlLnBhdXNlID0gZnVuY3Rpb24oKSB7XG4gIGlmICggdGhpcy5zdGF0ZSA9PSAncGxheWluZycgKSB7XG4gICAgdGhpcy5zdGF0ZSA9ICdwYXVzZWQnO1xuICAgIHRoaXMuY2xlYXIoKTtcbiAgfVxufTtcblxuUGxheWVyLnByb3RvdHlwZS51bnBhdXNlID0gZnVuY3Rpb24oKSB7XG4gIC8vIHJlLXN0YXJ0IHBsYXkgaWYgcGF1c2VkXG4gIGlmICggdGhpcy5zdGF0ZSA9PSAncGF1c2VkJyApIHtcbiAgICB0aGlzLnBsYXkoKTtcbiAgfVxufTtcblxuLy8gcGF1c2UgaWYgcGFnZSB2aXNpYmlsaXR5IGlzIGhpZGRlbiwgdW5wYXVzZSBpZiB2aXNpYmxlXG5QbGF5ZXIucHJvdG90eXBlLnZpc2liaWxpdHlDaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGlzUGFnZUhpZGRlbiA9IGRvY3VtZW50WyBoaWRkZW5Qcm9wZXJ0eSBdO1xuICB0aGlzWyBpc1BhZ2VIaWRkZW4gPyAncGF1c2UnIDogJ3VucGF1c2UnIF0oKTtcbn07XG5cblBsYXllci5wcm90b3R5cGUudmlzaWJpbGl0eVBsYXkgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5wbGF5KCk7XG4gIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoIHZpc2liaWxpdHlFdmVudCwgdGhpcy5vblZpc2liaWxpdHlQbGF5ICk7XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBGbGlja2l0eSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG51dGlscy5leHRlbmQoIEZsaWNraXR5LmRlZmF1bHRzLCB7XG4gIHBhdXNlQXV0b1BsYXlPbkhvdmVyOiB0cnVlXG59KTtcblxuRmxpY2tpdHkuY3JlYXRlTWV0aG9kcy5wdXNoKCdfY3JlYXRlUGxheWVyJyk7XG52YXIgcHJvdG8gPSBGbGlja2l0eS5wcm90b3R5cGU7XG5cbnByb3RvLl9jcmVhdGVQbGF5ZXIgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5wbGF5ZXIgPSBuZXcgUGxheWVyKCB0aGlzICk7XG5cbiAgdGhpcy5vbiggJ2FjdGl2YXRlJywgdGhpcy5hY3RpdmF0ZVBsYXllciApO1xuICB0aGlzLm9uKCAndWlDaGFuZ2UnLCB0aGlzLnN0b3BQbGF5ZXIgKTtcbiAgdGhpcy5vbiggJ3BvaW50ZXJEb3duJywgdGhpcy5zdG9wUGxheWVyICk7XG4gIHRoaXMub24oICdkZWFjdGl2YXRlJywgdGhpcy5kZWFjdGl2YXRlUGxheWVyICk7XG59O1xuXG5wcm90by5hY3RpdmF0ZVBsYXllciA9IGZ1bmN0aW9uKCkge1xuICBpZiAoICF0aGlzLm9wdGlvbnMuYXV0b1BsYXkgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRoaXMucGxheWVyLnBsYXkoKTtcbiAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdtb3VzZWVudGVyJywgdGhpcyApO1xufTtcblxuLy8gUGxheWVyIEFQSSwgZG9uJ3QgaGF0ZSB0aGUgLi4uIHRoYW5rcyBJIGtub3cgd2hlcmUgdGhlIGRvb3IgaXNcblxucHJvdG8ucGxheVBsYXllciA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnBsYXllci5wbGF5KCk7XG59O1xuXG5wcm90by5zdG9wUGxheWVyID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMucGxheWVyLnN0b3AoKTtcbn07XG5cbnByb3RvLnBhdXNlUGxheWVyID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMucGxheWVyLnBhdXNlKCk7XG59O1xuXG5wcm90by51bnBhdXNlUGxheWVyID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMucGxheWVyLnVucGF1c2UoKTtcbn07XG5cbnByb3RvLmRlYWN0aXZhdGVQbGF5ZXIgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5wbGF5ZXIuc3RvcCgpO1xuICB0aGlzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ21vdXNlZW50ZXInLCB0aGlzICk7XG59O1xuXG4vLyAtLS0tLSBtb3VzZWVudGVyL2xlYXZlIC0tLS0tIC8vXG5cbi8vIHBhdXNlIGF1dG8tcGxheSBvbiBob3ZlclxucHJvdG8ub25tb3VzZWVudGVyID0gZnVuY3Rpb24oKSB7XG4gIGlmICggIXRoaXMub3B0aW9ucy5wYXVzZUF1dG9QbGF5T25Ib3ZlciApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGhpcy5wbGF5ZXIucGF1c2UoKTtcbiAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdtb3VzZWxlYXZlJywgdGhpcyApO1xufTtcblxuLy8gcmVzdW1lIGF1dG8tcGxheSBvbiBob3ZlciBvZmZcbnByb3RvLm9ubW91c2VsZWF2ZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnBsYXllci51bnBhdXNlKCk7XG4gIHRoaXMuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCAnbW91c2VsZWF2ZScsIHRoaXMgKTtcbn07XG5cbi8vIC0tLS0tICAtLS0tLSAvL1xuXG5GbGlja2l0eS5QbGF5ZXIgPSBQbGF5ZXI7XG5cbnJldHVybiBGbGlja2l0eTtcblxufSkpO1xuIiwiLy8gcHJldi9uZXh0IGJ1dHRvbnNcbiggZnVuY3Rpb24oIHdpbmRvdywgZmFjdG9yeSApIHtcbiAgLy8gdW5pdmVyc2FsIG1vZHVsZSBkZWZpbml0aW9uXG4gIC8qIGpzaGludCBzdHJpY3Q6IGZhbHNlICovXG4gIGlmICggdHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgKSB7XG4gICAgLy8gQU1EXG4gICAgZGVmaW5lKCBbXG4gICAgICAnLi9mbGlja2l0eScsXG4gICAgICAndGFwLWxpc3RlbmVyL3RhcC1saXN0ZW5lcicsXG4gICAgICAnZml6enktdWktdXRpbHMvdXRpbHMnXG4gICAgXSwgZnVuY3Rpb24oIEZsaWNraXR5LCBUYXBMaXN0ZW5lciwgdXRpbHMgKSB7XG4gICAgICByZXR1cm4gZmFjdG9yeSggd2luZG93LCBGbGlja2l0eSwgVGFwTGlzdGVuZXIsIHV0aWxzICk7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAoIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMgKSB7XG4gICAgLy8gQ29tbW9uSlNcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoXG4gICAgICB3aW5kb3csXG4gICAgICByZXF1aXJlKCcuL2ZsaWNraXR5JyksXG4gICAgICByZXF1aXJlKCd0YXAtbGlzdGVuZXInKSxcbiAgICAgIHJlcXVpcmUoJ2Zpenp5LXVpLXV0aWxzJylcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIC8vIGJyb3dzZXIgZ2xvYmFsXG4gICAgZmFjdG9yeShcbiAgICAgIHdpbmRvdyxcbiAgICAgIHdpbmRvdy5GbGlja2l0eSxcbiAgICAgIHdpbmRvdy5UYXBMaXN0ZW5lcixcbiAgICAgIHdpbmRvdy5maXp6eVVJVXRpbHNcbiAgICApO1xuICB9XG5cbn0oIHdpbmRvdywgZnVuY3Rpb24gZmFjdG9yeSggd2luZG93LCBGbGlja2l0eSwgVGFwTGlzdGVuZXIsIHV0aWxzICkge1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgc3ZnVVJJID0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gUHJldk5leHRCdXR0b24gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuZnVuY3Rpb24gUHJldk5leHRCdXR0b24oIGRpcmVjdGlvbiwgcGFyZW50ICkge1xuICB0aGlzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcbiAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG4gIHRoaXMuX2NyZWF0ZSgpO1xufVxuXG5QcmV2TmV4dEJ1dHRvbi5wcm90b3R5cGUgPSBuZXcgVGFwTGlzdGVuZXIoKTtcblxuUHJldk5leHRCdXR0b24ucHJvdG90eXBlLl9jcmVhdGUgPSBmdW5jdGlvbigpIHtcbiAgLy8gcHJvcGVydGllc1xuICB0aGlzLmlzRW5hYmxlZCA9IHRydWU7XG4gIHRoaXMuaXNQcmV2aW91cyA9IHRoaXMuZGlyZWN0aW9uID09IC0xO1xuICB2YXIgbGVmdERpcmVjdGlvbiA9IHRoaXMucGFyZW50Lm9wdGlvbnMucmlnaHRUb0xlZnQgPyAxIDogLTE7XG4gIHRoaXMuaXNMZWZ0ID0gdGhpcy5kaXJlY3Rpb24gPT0gbGVmdERpcmVjdGlvbjtcblxuICB2YXIgZWxlbWVudCA9IHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICBlbGVtZW50LmNsYXNzTmFtZSA9ICdmbGlja2l0eS1wcmV2LW5leHQtYnV0dG9uJztcbiAgZWxlbWVudC5jbGFzc05hbWUgKz0gdGhpcy5pc1ByZXZpb3VzID8gJyBwcmV2aW91cycgOiAnIG5leHQnO1xuICAvLyBwcmV2ZW50IGJ1dHRvbiBmcm9tIHN1Ym1pdHRpbmcgZm9ybSBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xMDgzNjA3Ni8xODIxODNcbiAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoICd0eXBlJywgJ2J1dHRvbicgKTtcbiAgLy8gaW5pdCBhcyBkaXNhYmxlZFxuICB0aGlzLmRpc2FibGUoKTtcblxuICBlbGVtZW50LnNldEF0dHJpYnV0ZSggJ2FyaWEtbGFiZWwnLCB0aGlzLmlzUHJldmlvdXMgPyAncHJldmlvdXMnIDogJ25leHQnICk7XG5cbiAgLy8gY3JlYXRlIGFycm93XG4gIHZhciBzdmcgPSB0aGlzLmNyZWF0ZVNWRygpO1xuICBlbGVtZW50LmFwcGVuZENoaWxkKCBzdmcgKTtcbiAgLy8gZXZlbnRzXG4gIHRoaXMub24oICd0YXAnLCB0aGlzLm9uVGFwICk7XG4gIHRoaXMucGFyZW50Lm9uKCAnc2VsZWN0JywgdGhpcy51cGRhdGUuYmluZCggdGhpcyApICk7XG4gIHRoaXMub24oICdwb2ludGVyRG93bicsIHRoaXMucGFyZW50LmNoaWxkVUlQb2ludGVyRG93bi5iaW5kKCB0aGlzLnBhcmVudCApICk7XG59O1xuXG5QcmV2TmV4dEJ1dHRvbi5wcm90b3R5cGUuYWN0aXZhdGUgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5iaW5kVGFwKCB0aGlzLmVsZW1lbnQgKTtcbiAgLy8gY2xpY2sgZXZlbnRzIGZyb20ga2V5Ym9hcmRcbiAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdjbGljaycsIHRoaXMgKTtcbiAgLy8gYWRkIHRvIERPTVxuICB0aGlzLnBhcmVudC5lbGVtZW50LmFwcGVuZENoaWxkKCB0aGlzLmVsZW1lbnQgKTtcbn07XG5cblByZXZOZXh0QnV0dG9uLnByb3RvdHlwZS5kZWFjdGl2YXRlID0gZnVuY3Rpb24oKSB7XG4gIC8vIHJlbW92ZSBmcm9tIERPTVxuICB0aGlzLnBhcmVudC5lbGVtZW50LnJlbW92ZUNoaWxkKCB0aGlzLmVsZW1lbnQgKTtcbiAgLy8gZG8gcmVndWxhciBUYXBMaXN0ZW5lciBkZXN0cm95XG4gIFRhcExpc3RlbmVyLnByb3RvdHlwZS5kZXN0cm95LmNhbGwoIHRoaXMgKTtcbiAgLy8gY2xpY2sgZXZlbnRzIGZyb20ga2V5Ym9hcmRcbiAgdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoICdjbGljaycsIHRoaXMgKTtcbn07XG5cblByZXZOZXh0QnV0dG9uLnByb3RvdHlwZS5jcmVhdGVTVkcgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyggc3ZnVVJJLCAnc3ZnJyk7XG4gIHN2Zy5zZXRBdHRyaWJ1dGUoICd2aWV3Qm94JywgJzAgMCAxMDAgMTAwJyApO1xuICB2YXIgcGF0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyggc3ZnVVJJLCAncGF0aCcpO1xuICB2YXIgcGF0aE1vdmVtZW50cyA9IGdldEFycm93TW92ZW1lbnRzKCB0aGlzLnBhcmVudC5vcHRpb25zLmFycm93U2hhcGUgKTtcbiAgcGF0aC5zZXRBdHRyaWJ1dGUoICdkJywgcGF0aE1vdmVtZW50cyApO1xuICBwYXRoLnNldEF0dHJpYnV0ZSggJ2NsYXNzJywgJ2Fycm93JyApO1xuICAvLyByb3RhdGUgYXJyb3dcbiAgaWYgKCAhdGhpcy5pc0xlZnQgKSB7XG4gICAgcGF0aC5zZXRBdHRyaWJ1dGUoICd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKDEwMCwgMTAwKSByb3RhdGUoMTgwKSAnICk7XG4gIH1cbiAgc3ZnLmFwcGVuZENoaWxkKCBwYXRoICk7XG4gIHJldHVybiBzdmc7XG59O1xuXG4vLyBnZXQgU1ZHIHBhdGggbW92bWVtZW50XG5mdW5jdGlvbiBnZXRBcnJvd01vdmVtZW50cyggc2hhcGUgKSB7XG4gIC8vIHVzZSBzaGFwZSBhcyBtb3ZlbWVudCBpZiBzdHJpbmdcbiAgaWYgKCB0eXBlb2Ygc2hhcGUgPT0gJ3N0cmluZycgKSB7XG4gICAgcmV0dXJuIHNoYXBlO1xuICB9XG4gIC8vIGNyZWF0ZSBtb3ZlbWVudCBzdHJpbmdcbiAgcmV0dXJuICdNICcgKyBzaGFwZS54MCArICcsNTAnICtcbiAgICAnIEwgJyArIHNoYXBlLngxICsgJywnICsgKCBzaGFwZS55MSArIDUwICkgK1xuICAgICcgTCAnICsgc2hhcGUueDIgKyAnLCcgKyAoIHNoYXBlLnkyICsgNTAgKSArXG4gICAgJyBMICcgKyBzaGFwZS54MyArICcsNTAgJyArXG4gICAgJyBMICcgKyBzaGFwZS54MiArICcsJyArICggNTAgLSBzaGFwZS55MiApICtcbiAgICAnIEwgJyArIHNoYXBlLngxICsgJywnICsgKCA1MCAtIHNoYXBlLnkxICkgK1xuICAgICcgWic7XG59XG5cblByZXZOZXh0QnV0dG9uLnByb3RvdHlwZS5vblRhcCA9IGZ1bmN0aW9uKCkge1xuICBpZiAoICF0aGlzLmlzRW5hYmxlZCApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGhpcy5wYXJlbnQudWlDaGFuZ2UoKTtcbiAgdmFyIG1ldGhvZCA9IHRoaXMuaXNQcmV2aW91cyA/ICdwcmV2aW91cycgOiAnbmV4dCc7XG4gIHRoaXMucGFyZW50WyBtZXRob2QgXSgpO1xufTtcblxuUHJldk5leHRCdXR0b24ucHJvdG90eXBlLmhhbmRsZUV2ZW50ID0gdXRpbHMuaGFuZGxlRXZlbnQ7XG5cblByZXZOZXh0QnV0dG9uLnByb3RvdHlwZS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gIC8vIG9ubHkgYWxsb3cgY2xpY2tzIGZyb20ga2V5Ym9hcmRcbiAgdmFyIGZvY3VzZWQgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICBpZiAoIGZvY3VzZWQgJiYgZm9jdXNlZCA9PSB0aGlzLmVsZW1lbnQgKSB7XG4gICAgdGhpcy5vblRhcCgpO1xuICB9XG59O1xuXG4vLyAtLS0tLSAgLS0tLS0gLy9cblxuUHJldk5leHRCdXR0b24ucHJvdG90eXBlLmVuYWJsZSA9IGZ1bmN0aW9uKCkge1xuICBpZiAoIHRoaXMuaXNFbmFibGVkICkge1xuICAgIHJldHVybjtcbiAgfVxuICB0aGlzLmVsZW1lbnQuZGlzYWJsZWQgPSBmYWxzZTtcbiAgdGhpcy5pc0VuYWJsZWQgPSB0cnVlO1xufTtcblxuUHJldk5leHRCdXR0b24ucHJvdG90eXBlLmRpc2FibGUgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCAhdGhpcy5pc0VuYWJsZWQgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRoaXMuZWxlbWVudC5kaXNhYmxlZCA9IHRydWU7XG4gIHRoaXMuaXNFbmFibGVkID0gZmFsc2U7XG59O1xuXG5QcmV2TmV4dEJ1dHRvbi5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24oKSB7XG4gIC8vIGluZGV4IG9mIGZpcnN0IG9yIGxhc3Qgc2xpZGUsIGlmIHByZXZpb3VzIG9yIG5leHRcbiAgdmFyIHNsaWRlcyA9IHRoaXMucGFyZW50LnNsaWRlcztcbiAgLy8gZW5hYmxlIGlzIHdyYXBBcm91bmQgYW5kIGF0IGxlYXN0IDIgc2xpZGVzXG4gIGlmICggdGhpcy5wYXJlbnQub3B0aW9ucy53cmFwQXJvdW5kICYmIHNsaWRlcy5sZW5ndGggPiAxICkge1xuICAgIHRoaXMuZW5hYmxlKCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBsYXN0SW5kZXggPSBzbGlkZXMubGVuZ3RoID8gc2xpZGVzLmxlbmd0aCAtIDEgOiAwO1xuICB2YXIgYm91bmRJbmRleCA9IHRoaXMuaXNQcmV2aW91cyA/IDAgOiBsYXN0SW5kZXg7XG4gIHZhciBtZXRob2QgPSB0aGlzLnBhcmVudC5zZWxlY3RlZEluZGV4ID09IGJvdW5kSW5kZXggPyAnZGlzYWJsZScgOiAnZW5hYmxlJztcbiAgdGhpc1sgbWV0aG9kIF0oKTtcbn07XG5cblByZXZOZXh0QnV0dG9uLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuZGVhY3RpdmF0ZSgpO1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gRmxpY2tpdHkgcHJvdG90eXBlIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbnV0aWxzLmV4dGVuZCggRmxpY2tpdHkuZGVmYXVsdHMsIHtcbiAgcHJldk5leHRCdXR0b25zOiB0cnVlLFxuICBhcnJvd1NoYXBlOiB7XG4gICAgeDA6IDEwLFxuICAgIHgxOiA2MCwgeTE6IDUwLFxuICAgIHgyOiA3MCwgeTI6IDQwLFxuICAgIHgzOiAzMFxuICB9XG59KTtcblxuRmxpY2tpdHkuY3JlYXRlTWV0aG9kcy5wdXNoKCdfY3JlYXRlUHJldk5leHRCdXR0b25zJyk7XG52YXIgcHJvdG8gPSBGbGlja2l0eS5wcm90b3R5cGU7XG5cbnByb3RvLl9jcmVhdGVQcmV2TmV4dEJ1dHRvbnMgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCAhdGhpcy5vcHRpb25zLnByZXZOZXh0QnV0dG9ucyApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB0aGlzLnByZXZCdXR0b24gPSBuZXcgUHJldk5leHRCdXR0b24oIC0xLCB0aGlzICk7XG4gIHRoaXMubmV4dEJ1dHRvbiA9IG5ldyBQcmV2TmV4dEJ1dHRvbiggMSwgdGhpcyApO1xuXG4gIHRoaXMub24oICdhY3RpdmF0ZScsIHRoaXMuYWN0aXZhdGVQcmV2TmV4dEJ1dHRvbnMgKTtcbn07XG5cbnByb3RvLmFjdGl2YXRlUHJldk5leHRCdXR0b25zID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMucHJldkJ1dHRvbi5hY3RpdmF0ZSgpO1xuICB0aGlzLm5leHRCdXR0b24uYWN0aXZhdGUoKTtcbiAgdGhpcy5vbiggJ2RlYWN0aXZhdGUnLCB0aGlzLmRlYWN0aXZhdGVQcmV2TmV4dEJ1dHRvbnMgKTtcbn07XG5cbnByb3RvLmRlYWN0aXZhdGVQcmV2TmV4dEJ1dHRvbnMgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5wcmV2QnV0dG9uLmRlYWN0aXZhdGUoKTtcbiAgdGhpcy5uZXh0QnV0dG9uLmRlYWN0aXZhdGUoKTtcbiAgdGhpcy5vZmYoICdkZWFjdGl2YXRlJywgdGhpcy5kZWFjdGl2YXRlUHJldk5leHRCdXR0b25zICk7XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuRmxpY2tpdHkuUHJldk5leHRCdXR0b24gPSBQcmV2TmV4dEJ1dHRvbjtcblxucmV0dXJuIEZsaWNraXR5O1xuXG59KSk7XG4iLCIvLyBzbGlkZVxuKCBmdW5jdGlvbiggd2luZG93LCBmYWN0b3J5ICkge1xuICAvLyB1bml2ZXJzYWwgbW9kdWxlIGRlZmluaXRpb25cbiAgLyoganNoaW50IHN0cmljdDogZmFsc2UgKi9cbiAgaWYgKCB0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCApIHtcbiAgICAvLyBBTURcbiAgICBkZWZpbmUoIGZhY3RvcnkgKTtcbiAgfSBlbHNlIGlmICggdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyApIHtcbiAgICAvLyBDb21tb25KU1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuICB9IGVsc2Uge1xuICAgIC8vIGJyb3dzZXIgZ2xvYmFsXG4gICAgd2luZG93LkZsaWNraXR5ID0gd2luZG93LkZsaWNraXR5IHx8IHt9O1xuICAgIHdpbmRvdy5GbGlja2l0eS5TbGlkZSA9IGZhY3RvcnkoKTtcbiAgfVxuXG59KCB3aW5kb3csIGZ1bmN0aW9uIGZhY3RvcnkoKSB7XG4ndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIFNsaWRlKCBwYXJlbnQgKSB7XG4gIHRoaXMucGFyZW50ID0gcGFyZW50O1xuICB0aGlzLmlzT3JpZ2luTGVmdCA9IHBhcmVudC5vcmlnaW5TaWRlID09ICdsZWZ0JztcbiAgdGhpcy5jZWxscyA9IFtdO1xuICB0aGlzLm91dGVyV2lkdGggPSAwO1xuICB0aGlzLmhlaWdodCA9IDA7XG59XG5cbnZhciBwcm90byA9IFNsaWRlLnByb3RvdHlwZTtcblxucHJvdG8uYWRkQ2VsbCA9IGZ1bmN0aW9uKCBjZWxsICkge1xuICB0aGlzLmNlbGxzLnB1c2goIGNlbGwgKTtcbiAgdGhpcy5vdXRlcldpZHRoICs9IGNlbGwuc2l6ZS5vdXRlcldpZHRoO1xuICB0aGlzLmhlaWdodCA9IE1hdGgubWF4KCBjZWxsLnNpemUub3V0ZXJIZWlnaHQsIHRoaXMuaGVpZ2h0ICk7XG4gIC8vIGZpcnN0IGNlbGwgc3R1ZmZcbiAgaWYgKCB0aGlzLmNlbGxzLmxlbmd0aCA9PSAxICkge1xuICAgIHRoaXMueCA9IGNlbGwueDsgLy8geCBjb21lcyBmcm9tIGZpcnN0IGNlbGxcbiAgICB2YXIgYmVnaW5NYXJnaW4gPSB0aGlzLmlzT3JpZ2luTGVmdCA/ICdtYXJnaW5MZWZ0JyA6ICdtYXJnaW5SaWdodCc7XG4gICAgdGhpcy5maXJzdE1hcmdpbiA9IGNlbGwuc2l6ZVsgYmVnaW5NYXJnaW4gXTtcbiAgfVxufTtcblxucHJvdG8udXBkYXRlVGFyZ2V0ID0gZnVuY3Rpb24oKSB7XG4gIHZhciBlbmRNYXJnaW4gPSB0aGlzLmlzT3JpZ2luTGVmdCA/ICdtYXJnaW5SaWdodCcgOiAnbWFyZ2luTGVmdCc7XG4gIHZhciBsYXN0Q2VsbCA9IHRoaXMuZ2V0TGFzdENlbGwoKTtcbiAgdmFyIGxhc3RNYXJnaW4gPSBsYXN0Q2VsbCA/IGxhc3RDZWxsLnNpemVbIGVuZE1hcmdpbiBdIDogMDtcbiAgdmFyIHNsaWRlV2lkdGggPSB0aGlzLm91dGVyV2lkdGggLSAoIHRoaXMuZmlyc3RNYXJnaW4gKyBsYXN0TWFyZ2luICk7XG4gIHRoaXMudGFyZ2V0ID0gdGhpcy54ICsgdGhpcy5maXJzdE1hcmdpbiArIHNsaWRlV2lkdGggKiB0aGlzLnBhcmVudC5jZWxsQWxpZ247XG59O1xuXG5wcm90by5nZXRMYXN0Q2VsbCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5jZWxsc1sgdGhpcy5jZWxscy5sZW5ndGggLSAxIF07XG59O1xuXG5wcm90by5zZWxlY3QgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5jaGFuZ2VTZWxlY3RlZENsYXNzKCdhZGQnKTtcbn07XG5cbnByb3RvLnVuc2VsZWN0ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuY2hhbmdlU2VsZWN0ZWRDbGFzcygncmVtb3ZlJyk7XG59O1xuXG5wcm90by5jaGFuZ2VTZWxlY3RlZENsYXNzID0gZnVuY3Rpb24oIG1ldGhvZCApIHtcbiAgdGhpcy5jZWxscy5mb3JFYWNoKCBmdW5jdGlvbiggY2VsbCApIHtcbiAgICBjZWxsLmVsZW1lbnQuY2xhc3NMaXN0WyBtZXRob2QgXSgnaXMtc2VsZWN0ZWQnKTtcbiAgfSk7XG59O1xuXG5wcm90by5nZXRDZWxsRWxlbWVudHMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuY2VsbHMubWFwKCBmdW5jdGlvbiggY2VsbCApIHtcbiAgICByZXR1cm4gY2VsbC5lbGVtZW50O1xuICB9KTtcbn07XG5cbnJldHVybiBTbGlkZTtcblxufSkpO1xuIiwiLyohXG4gKiBnZXRTaXplIHYyLjAuMlxuICogbWVhc3VyZSBzaXplIG9mIGVsZW1lbnRzXG4gKiBNSVQgbGljZW5zZVxuICovXG5cbi8qanNoaW50IGJyb3dzZXI6IHRydWUsIHN0cmljdDogdHJ1ZSwgdW5kZWY6IHRydWUsIHVudXNlZDogdHJ1ZSAqL1xuLypnbG9iYWwgZGVmaW5lOiBmYWxzZSwgbW9kdWxlOiBmYWxzZSwgY29uc29sZTogZmFsc2UgKi9cblxuKCBmdW5jdGlvbiggd2luZG93LCBmYWN0b3J5ICkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgaWYgKCB0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCApIHtcbiAgICAvLyBBTURcbiAgICBkZWZpbmUoIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGZhY3RvcnkoKTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmICggdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyApIHtcbiAgICAvLyBDb21tb25KU1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuICB9IGVsc2Uge1xuICAgIC8vIGJyb3dzZXIgZ2xvYmFsXG4gICAgd2luZG93LmdldFNpemUgPSBmYWN0b3J5KCk7XG4gIH1cblxufSkoIHdpbmRvdywgZnVuY3Rpb24gZmFjdG9yeSgpIHtcbid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gaGVscGVycyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG4vLyBnZXQgYSBudW1iZXIgZnJvbSBhIHN0cmluZywgbm90IGEgcGVyY2VudGFnZVxuZnVuY3Rpb24gZ2V0U3R5bGVTaXplKCB2YWx1ZSApIHtcbiAgdmFyIG51bSA9IHBhcnNlRmxvYXQoIHZhbHVlICk7XG4gIC8vIG5vdCBhIHBlcmNlbnQgbGlrZSAnMTAwJScsIGFuZCBhIG51bWJlclxuICB2YXIgaXNWYWxpZCA9IHZhbHVlLmluZGV4T2YoJyUnKSA9PSAtMSAmJiAhaXNOYU4oIG51bSApO1xuICByZXR1cm4gaXNWYWxpZCAmJiBudW07XG59XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG52YXIgbG9nRXJyb3IgPSB0eXBlb2YgY29uc29sZSA9PSAndW5kZWZpbmVkJyA/IG5vb3AgOlxuICBmdW5jdGlvbiggbWVzc2FnZSApIHtcbiAgICBjb25zb2xlLmVycm9yKCBtZXNzYWdlICk7XG4gIH07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIG1lYXN1cmVtZW50cyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG52YXIgbWVhc3VyZW1lbnRzID0gW1xuICAncGFkZGluZ0xlZnQnLFxuICAncGFkZGluZ1JpZ2h0JyxcbiAgJ3BhZGRpbmdUb3AnLFxuICAncGFkZGluZ0JvdHRvbScsXG4gICdtYXJnaW5MZWZ0JyxcbiAgJ21hcmdpblJpZ2h0JyxcbiAgJ21hcmdpblRvcCcsXG4gICdtYXJnaW5Cb3R0b20nLFxuICAnYm9yZGVyTGVmdFdpZHRoJyxcbiAgJ2JvcmRlclJpZ2h0V2lkdGgnLFxuICAnYm9yZGVyVG9wV2lkdGgnLFxuICAnYm9yZGVyQm90dG9tV2lkdGgnXG5dO1xuXG52YXIgbWVhc3VyZW1lbnRzTGVuZ3RoID0gbWVhc3VyZW1lbnRzLmxlbmd0aDtcblxuZnVuY3Rpb24gZ2V0WmVyb1NpemUoKSB7XG4gIHZhciBzaXplID0ge1xuICAgIHdpZHRoOiAwLFxuICAgIGhlaWdodDogMCxcbiAgICBpbm5lcldpZHRoOiAwLFxuICAgIGlubmVySGVpZ2h0OiAwLFxuICAgIG91dGVyV2lkdGg6IDAsXG4gICAgb3V0ZXJIZWlnaHQ6IDBcbiAgfTtcbiAgZm9yICggdmFyIGk9MDsgaSA8IG1lYXN1cmVtZW50c0xlbmd0aDsgaSsrICkge1xuICAgIHZhciBtZWFzdXJlbWVudCA9IG1lYXN1cmVtZW50c1tpXTtcbiAgICBzaXplWyBtZWFzdXJlbWVudCBdID0gMDtcbiAgfVxuICByZXR1cm4gc2l6ZTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gZ2V0U3R5bGUgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuLyoqXG4gKiBnZXRTdHlsZSwgZ2V0IHN0eWxlIG9mIGVsZW1lbnQsIGNoZWNrIGZvciBGaXJlZm94IGJ1Z1xuICogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9NTQ4Mzk3XG4gKi9cbmZ1bmN0aW9uIGdldFN0eWxlKCBlbGVtICkge1xuICB2YXIgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKCBlbGVtICk7XG4gIGlmICggIXN0eWxlICkge1xuICAgIGxvZ0Vycm9yKCAnU3R5bGUgcmV0dXJuZWQgJyArIHN0eWxlICtcbiAgICAgICcuIEFyZSB5b3UgcnVubmluZyB0aGlzIGNvZGUgaW4gYSBoaWRkZW4gaWZyYW1lIG9uIEZpcmVmb3g/ICcgK1xuICAgICAgJ1NlZSBodHRwOi8vYml0Lmx5L2dldHNpemVidWcxJyApO1xuICB9XG4gIHJldHVybiBzdHlsZTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gc2V0dXAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxudmFyIGlzU2V0dXAgPSBmYWxzZTtcblxudmFyIGlzQm94U2l6ZU91dGVyO1xuXG4vKipcbiAqIHNldHVwXG4gKiBjaGVjayBpc0JveFNpemVyT3V0ZXJcbiAqIGRvIG9uIGZpcnN0IGdldFNpemUoKSByYXRoZXIgdGhhbiBvbiBwYWdlIGxvYWQgZm9yIEZpcmVmb3ggYnVnXG4gKi9cbmZ1bmN0aW9uIHNldHVwKCkge1xuICAvLyBzZXR1cCBvbmNlXG4gIGlmICggaXNTZXR1cCApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaXNTZXR1cCA9IHRydWU7XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gYm94IHNpemluZyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG4gIC8qKlxuICAgKiBXZWJLaXQgbWVhc3VyZXMgdGhlIG91dGVyLXdpZHRoIG9uIHN0eWxlLndpZHRoIG9uIGJvcmRlci1ib3ggZWxlbXNcbiAgICogSUUgJiBGaXJlZm94PDI5IG1lYXN1cmVzIHRoZSBpbm5lci13aWR0aFxuICAgKi9cbiAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBkaXYuc3R5bGUud2lkdGggPSAnMjAwcHgnO1xuICBkaXYuc3R5bGUucGFkZGluZyA9ICcxcHggMnB4IDNweCA0cHgnO1xuICBkaXYuc3R5bGUuYm9yZGVyU3R5bGUgPSAnc29saWQnO1xuICBkaXYuc3R5bGUuYm9yZGVyV2lkdGggPSAnMXB4IDJweCAzcHggNHB4JztcbiAgZGl2LnN0eWxlLmJveFNpemluZyA9ICdib3JkZXItYm94JztcblxuICB2YXIgYm9keSA9IGRvY3VtZW50LmJvZHkgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICBib2R5LmFwcGVuZENoaWxkKCBkaXYgKTtcbiAgdmFyIHN0eWxlID0gZ2V0U3R5bGUoIGRpdiApO1xuXG4gIGdldFNpemUuaXNCb3hTaXplT3V0ZXIgPSBpc0JveFNpemVPdXRlciA9IGdldFN0eWxlU2l6ZSggc3R5bGUud2lkdGggKSA9PSAyMDA7XG4gIGJvZHkucmVtb3ZlQ2hpbGQoIGRpdiApO1xuXG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGdldFNpemUgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuZnVuY3Rpb24gZ2V0U2l6ZSggZWxlbSApIHtcbiAgc2V0dXAoKTtcblxuICAvLyB1c2UgcXVlcnlTZWxldG9yIGlmIGVsZW0gaXMgc3RyaW5nXG4gIGlmICggdHlwZW9mIGVsZW0gPT0gJ3N0cmluZycgKSB7XG4gICAgZWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoIGVsZW0gKTtcbiAgfVxuXG4gIC8vIGRvIG5vdCBwcm9jZWVkIG9uIG5vbi1vYmplY3RzXG4gIGlmICggIWVsZW0gfHwgdHlwZW9mIGVsZW0gIT0gJ29iamVjdCcgfHwgIWVsZW0ubm9kZVR5cGUgKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIHN0eWxlID0gZ2V0U3R5bGUoIGVsZW0gKTtcblxuICAvLyBpZiBoaWRkZW4sIGV2ZXJ5dGhpbmcgaXMgMFxuICBpZiAoIHN0eWxlLmRpc3BsYXkgPT0gJ25vbmUnICkge1xuICAgIHJldHVybiBnZXRaZXJvU2l6ZSgpO1xuICB9XG5cbiAgdmFyIHNpemUgPSB7fTtcbiAgc2l6ZS53aWR0aCA9IGVsZW0ub2Zmc2V0V2lkdGg7XG4gIHNpemUuaGVpZ2h0ID0gZWxlbS5vZmZzZXRIZWlnaHQ7XG5cbiAgdmFyIGlzQm9yZGVyQm94ID0gc2l6ZS5pc0JvcmRlckJveCA9IHN0eWxlLmJveFNpemluZyA9PSAnYm9yZGVyLWJveCc7XG5cbiAgLy8gZ2V0IGFsbCBtZWFzdXJlbWVudHNcbiAgZm9yICggdmFyIGk9MDsgaSA8IG1lYXN1cmVtZW50c0xlbmd0aDsgaSsrICkge1xuICAgIHZhciBtZWFzdXJlbWVudCA9IG1lYXN1cmVtZW50c1tpXTtcbiAgICB2YXIgdmFsdWUgPSBzdHlsZVsgbWVhc3VyZW1lbnQgXTtcbiAgICB2YXIgbnVtID0gcGFyc2VGbG9hdCggdmFsdWUgKTtcbiAgICAvLyBhbnkgJ2F1dG8nLCAnbWVkaXVtJyB2YWx1ZSB3aWxsIGJlIDBcbiAgICBzaXplWyBtZWFzdXJlbWVudCBdID0gIWlzTmFOKCBudW0gKSA/IG51bSA6IDA7XG4gIH1cblxuICB2YXIgcGFkZGluZ1dpZHRoID0gc2l6ZS5wYWRkaW5nTGVmdCArIHNpemUucGFkZGluZ1JpZ2h0O1xuICB2YXIgcGFkZGluZ0hlaWdodCA9IHNpemUucGFkZGluZ1RvcCArIHNpemUucGFkZGluZ0JvdHRvbTtcbiAgdmFyIG1hcmdpbldpZHRoID0gc2l6ZS5tYXJnaW5MZWZ0ICsgc2l6ZS5tYXJnaW5SaWdodDtcbiAgdmFyIG1hcmdpbkhlaWdodCA9IHNpemUubWFyZ2luVG9wICsgc2l6ZS5tYXJnaW5Cb3R0b207XG4gIHZhciBib3JkZXJXaWR0aCA9IHNpemUuYm9yZGVyTGVmdFdpZHRoICsgc2l6ZS5ib3JkZXJSaWdodFdpZHRoO1xuICB2YXIgYm9yZGVySGVpZ2h0ID0gc2l6ZS5ib3JkZXJUb3BXaWR0aCArIHNpemUuYm9yZGVyQm90dG9tV2lkdGg7XG5cbiAgdmFyIGlzQm9yZGVyQm94U2l6ZU91dGVyID0gaXNCb3JkZXJCb3ggJiYgaXNCb3hTaXplT3V0ZXI7XG5cbiAgLy8gb3ZlcndyaXRlIHdpZHRoIGFuZCBoZWlnaHQgaWYgd2UgY2FuIGdldCBpdCBmcm9tIHN0eWxlXG4gIHZhciBzdHlsZVdpZHRoID0gZ2V0U3R5bGVTaXplKCBzdHlsZS53aWR0aCApO1xuICBpZiAoIHN0eWxlV2lkdGggIT09IGZhbHNlICkge1xuICAgIHNpemUud2lkdGggPSBzdHlsZVdpZHRoICtcbiAgICAgIC8vIGFkZCBwYWRkaW5nIGFuZCBib3JkZXIgdW5sZXNzIGl0J3MgYWxyZWFkeSBpbmNsdWRpbmcgaXRcbiAgICAgICggaXNCb3JkZXJCb3hTaXplT3V0ZXIgPyAwIDogcGFkZGluZ1dpZHRoICsgYm9yZGVyV2lkdGggKTtcbiAgfVxuXG4gIHZhciBzdHlsZUhlaWdodCA9IGdldFN0eWxlU2l6ZSggc3R5bGUuaGVpZ2h0ICk7XG4gIGlmICggc3R5bGVIZWlnaHQgIT09IGZhbHNlICkge1xuICAgIHNpemUuaGVpZ2h0ID0gc3R5bGVIZWlnaHQgK1xuICAgICAgLy8gYWRkIHBhZGRpbmcgYW5kIGJvcmRlciB1bmxlc3MgaXQncyBhbHJlYWR5IGluY2x1ZGluZyBpdFxuICAgICAgKCBpc0JvcmRlckJveFNpemVPdXRlciA/IDAgOiBwYWRkaW5nSGVpZ2h0ICsgYm9yZGVySGVpZ2h0ICk7XG4gIH1cblxuICBzaXplLmlubmVyV2lkdGggPSBzaXplLndpZHRoIC0gKCBwYWRkaW5nV2lkdGggKyBib3JkZXJXaWR0aCApO1xuICBzaXplLmlubmVySGVpZ2h0ID0gc2l6ZS5oZWlnaHQgLSAoIHBhZGRpbmdIZWlnaHQgKyBib3JkZXJIZWlnaHQgKTtcblxuICBzaXplLm91dGVyV2lkdGggPSBzaXplLndpZHRoICsgbWFyZ2luV2lkdGg7XG4gIHNpemUub3V0ZXJIZWlnaHQgPSBzaXplLmhlaWdodCArIG1hcmdpbkhlaWdodDtcblxuICByZXR1cm4gc2l6ZTtcbn1cblxucmV0dXJuIGdldFNpemU7XG5cbn0pO1xuIiwiLyoqXG4gKiBtYXRlcmlhbC1kZXNpZ24tbGl0ZSAtIE1hdGVyaWFsIERlc2lnbiBDb21wb25lbnRzIGluIENTUywgSlMgYW5kIEhUTUxcbiAqIEB2ZXJzaW9uIHYxLjIuMVxuICogQGxpY2Vuc2UgQXBhY2hlLTIuMFxuICogQGNvcHlyaWdodCAyMDE1IEdvb2dsZSwgSW5jLlxuICogQGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL2dvb2dsZS9tYXRlcmlhbC1kZXNpZ24tbGl0ZVxuICovXG4hZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBlKGUsdCl7aWYoZSl7aWYodC5lbGVtZW50Xy5jbGFzc0xpc3QuY29udGFpbnModC5Dc3NDbGFzc2VzXy5NRExfSlNfUklQUExFX0VGRkVDVCkpe3ZhciBzPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO3MuY2xhc3NMaXN0LmFkZCh0LkNzc0NsYXNzZXNfLk1ETF9SSVBQTEVfQ09OVEFJTkVSKSxzLmNsYXNzTGlzdC5hZGQodC5Dc3NDbGFzc2VzXy5NRExfSlNfUklQUExFX0VGRkVDVCk7dmFyIGk9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7aS5jbGFzc0xpc3QuYWRkKHQuQ3NzQ2xhc3Nlc18uTURMX1JJUFBMRSkscy5hcHBlbmRDaGlsZChpKSxlLmFwcGVuZENoaWxkKHMpfWUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsZnVuY3Rpb24ocyl7cy5wcmV2ZW50RGVmYXVsdCgpO3ZhciBpPWUuaHJlZi5zcGxpdChcIiNcIilbMV0sbj10LmVsZW1lbnRfLnF1ZXJ5U2VsZWN0b3IoXCIjXCIraSk7dC5yZXNldFRhYlN0YXRlXygpLHQucmVzZXRQYW5lbFN0YXRlXygpLGUuY2xhc3NMaXN0LmFkZCh0LkNzc0NsYXNzZXNfLkFDVElWRV9DTEFTUyksbi5jbGFzc0xpc3QuYWRkKHQuQ3NzQ2xhc3Nlc18uQUNUSVZFX0NMQVNTKX0pfX1mdW5jdGlvbiB0KGUsdCxzLGkpe2Z1bmN0aW9uIG4oKXt2YXIgbj1lLmhyZWYuc3BsaXQoXCIjXCIpWzFdLGE9aS5jb250ZW50Xy5xdWVyeVNlbGVjdG9yKFwiI1wiK24pO2kucmVzZXRUYWJTdGF0ZV8odCksaS5yZXNldFBhbmVsU3RhdGVfKHMpLGUuY2xhc3NMaXN0LmFkZChpLkNzc0NsYXNzZXNfLklTX0FDVElWRSksYS5jbGFzc0xpc3QuYWRkKGkuQ3NzQ2xhc3Nlc18uSVNfQUNUSVZFKX1pZihpLnRhYkJhcl8uY2xhc3NMaXN0LmNvbnRhaW5zKGkuQ3NzQ2xhc3Nlc18uSlNfUklQUExFX0VGRkVDVCkpe3ZhciBhPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO2EuY2xhc3NMaXN0LmFkZChpLkNzc0NsYXNzZXNfLlJJUFBMRV9DT05UQUlORVIpLGEuY2xhc3NMaXN0LmFkZChpLkNzc0NsYXNzZXNfLkpTX1JJUFBMRV9FRkZFQ1QpO3ZhciBsPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO2wuY2xhc3NMaXN0LmFkZChpLkNzc0NsYXNzZXNfLlJJUFBMRSksYS5hcHBlbmRDaGlsZChsKSxlLmFwcGVuZENoaWxkKGEpfWUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsZnVuY3Rpb24odCl7XCIjXCI9PT1lLmdldEF0dHJpYnV0ZShcImhyZWZcIikuY2hhckF0KDApJiYodC5wcmV2ZW50RGVmYXVsdCgpLG4oKSl9KSxlLnNob3c9bn12YXIgcz17dXBncmFkZURvbTpmdW5jdGlvbihlLHQpe30sdXBncmFkZUVsZW1lbnQ6ZnVuY3Rpb24oZSx0KXt9LHVwZ3JhZGVFbGVtZW50czpmdW5jdGlvbihlKXt9LHVwZ3JhZGVBbGxSZWdpc3RlcmVkOmZ1bmN0aW9uKCl7fSxyZWdpc3RlclVwZ3JhZGVkQ2FsbGJhY2s6ZnVuY3Rpb24oZSx0KXt9LHJlZ2lzdGVyOmZ1bmN0aW9uKGUpe30sZG93bmdyYWRlRWxlbWVudHM6ZnVuY3Rpb24oZSl7fX07cz1mdW5jdGlvbigpe2Z1bmN0aW9uIGUoZSx0KXtmb3IodmFyIHM9MDtzPGgubGVuZ3RoO3MrKylpZihoW3NdLmNsYXNzTmFtZT09PWUpcmV0dXJuXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHQmJihoW3NdPXQpLGhbc107cmV0dXJuITF9ZnVuY3Rpb24gdChlKXt2YXIgdD1lLmdldEF0dHJpYnV0ZShcImRhdGEtdXBncmFkZWRcIik7cmV0dXJuIG51bGw9PT10P1tcIlwiXTp0LnNwbGl0KFwiLFwiKX1mdW5jdGlvbiBzKGUscyl7dmFyIGk9dChlKTtyZXR1cm4gaS5pbmRleE9mKHMpIT09LTF9ZnVuY3Rpb24gaSh0LHMpe2lmKFwidW5kZWZpbmVkXCI9PXR5cGVvZiB0JiZcInVuZGVmaW5lZFwiPT10eXBlb2Ygcylmb3IodmFyIGE9MDthPGgubGVuZ3RoO2ErKylpKGhbYV0uY2xhc3NOYW1lLGhbYV0uY3NzQ2xhc3MpO2Vsc2V7dmFyIGw9dDtpZihcInVuZGVmaW5lZFwiPT10eXBlb2Ygcyl7dmFyIG89ZShsKTtvJiYocz1vLmNzc0NsYXNzKX1mb3IodmFyIHI9ZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5cIitzKSxfPTA7XzxyLmxlbmd0aDtfKyspbihyW19dLGwpfX1mdW5jdGlvbiBuKGksbil7aWYoIShcIm9iamVjdFwiPT10eXBlb2YgaSYmaSBpbnN0YW5jZW9mIEVsZW1lbnQpKXRocm93IG5ldyBFcnJvcihcIkludmFsaWQgYXJndW1lbnQgcHJvdmlkZWQgdG8gdXBncmFkZSBNREwgZWxlbWVudC5cIik7dmFyIGE9dChpKSxsPVtdO2lmKG4pcyhpLG4pfHxsLnB1c2goZShuKSk7ZWxzZXt2YXIgbz1pLmNsYXNzTGlzdDtoLmZvckVhY2goZnVuY3Rpb24oZSl7by5jb250YWlucyhlLmNzc0NsYXNzKSYmbC5pbmRleE9mKGUpPT09LTEmJiFzKGksZS5jbGFzc05hbWUpJiZsLnB1c2goZSl9KX1mb3IodmFyIHIsXz0wLGQ9bC5sZW5ndGg7XzxkO18rKyl7aWYocj1sW19dLCFyKXRocm93IG5ldyBFcnJvcihcIlVuYWJsZSB0byBmaW5kIGEgcmVnaXN0ZXJlZCBjb21wb25lbnQgZm9yIHRoZSBnaXZlbiBjbGFzcy5cIik7YS5wdXNoKHIuY2xhc3NOYW1lKSxpLnNldEF0dHJpYnV0ZShcImRhdGEtdXBncmFkZWRcIixhLmpvaW4oXCIsXCIpKTt2YXIgQz1uZXcgci5jbGFzc0NvbnN0cnVjdG9yKGkpO0NbcF09cixjLnB1c2goQyk7Zm9yKHZhciB1PTAsRT1yLmNhbGxiYWNrcy5sZW5ndGg7dTxFO3UrKylyLmNhbGxiYWNrc1t1XShpKTtyLndpZGdldCYmKGlbci5jbGFzc05hbWVdPUMpO3ZhciBtO1wiQ3VzdG9tRXZlbnRcImluIHdpbmRvdyYmXCJmdW5jdGlvblwiPT10eXBlb2Ygd2luZG93LkN1c3RvbUV2ZW50P209bmV3IEN1c3RvbUV2ZW50KFwibWRsLWNvbXBvbmVudHVwZ3JhZGVkXCIse2J1YmJsZXM6ITAsY2FuY2VsYWJsZTohMX0pOihtPWRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiRXZlbnRzXCIpLG0uaW5pdEV2ZW50KFwibWRsLWNvbXBvbmVudHVwZ3JhZGVkXCIsITAsITApKSxpLmRpc3BhdGNoRXZlbnQobSl9fWZ1bmN0aW9uIGEoZSl7QXJyYXkuaXNBcnJheShlKXx8KGU9ZSBpbnN0YW5jZW9mIEVsZW1lbnQ/W2VdOkFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGUpKTtmb3IodmFyIHQscz0wLGk9ZS5sZW5ndGg7czxpO3MrKyl0PWVbc10sdCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50JiYobih0KSx0LmNoaWxkcmVuLmxlbmd0aD4wJiZhKHQuY2hpbGRyZW4pKX1mdW5jdGlvbiBsKHQpe3ZhciBzPVwidW5kZWZpbmVkXCI9PXR5cGVvZiB0LndpZGdldCYmXCJ1bmRlZmluZWRcIj09dHlwZW9mIHQud2lkZ2V0LGk9ITA7c3x8KGk9dC53aWRnZXR8fHQud2lkZ2V0KTt2YXIgbj17Y2xhc3NDb25zdHJ1Y3Rvcjp0LmNvbnN0cnVjdG9yfHx0LmNvbnN0cnVjdG9yLGNsYXNzTmFtZTp0LmNsYXNzQXNTdHJpbmd8fHQuY2xhc3NBc1N0cmluZyxjc3NDbGFzczp0LmNzc0NsYXNzfHx0LmNzc0NsYXNzLHdpZGdldDppLGNhbGxiYWNrczpbXX07aWYoaC5mb3JFYWNoKGZ1bmN0aW9uKGUpe2lmKGUuY3NzQ2xhc3M9PT1uLmNzc0NsYXNzKXRocm93IG5ldyBFcnJvcihcIlRoZSBwcm92aWRlZCBjc3NDbGFzcyBoYXMgYWxyZWFkeSBiZWVuIHJlZ2lzdGVyZWQ6IFwiK2UuY3NzQ2xhc3MpO2lmKGUuY2xhc3NOYW1lPT09bi5jbGFzc05hbWUpdGhyb3cgbmV3IEVycm9yKFwiVGhlIHByb3ZpZGVkIGNsYXNzTmFtZSBoYXMgYWxyZWFkeSBiZWVuIHJlZ2lzdGVyZWRcIil9KSx0LmNvbnN0cnVjdG9yLnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eShwKSl0aHJvdyBuZXcgRXJyb3IoXCJNREwgY29tcG9uZW50IGNsYXNzZXMgbXVzdCBub3QgaGF2ZSBcIitwK1wiIGRlZmluZWQgYXMgYSBwcm9wZXJ0eS5cIik7dmFyIGE9ZSh0LmNsYXNzQXNTdHJpbmcsbik7YXx8aC5wdXNoKG4pfWZ1bmN0aW9uIG8odCxzKXt2YXIgaT1lKHQpO2kmJmkuY2FsbGJhY2tzLnB1c2gocyl9ZnVuY3Rpb24gcigpe2Zvcih2YXIgZT0wO2U8aC5sZW5ndGg7ZSsrKWkoaFtlXS5jbGFzc05hbWUpfWZ1bmN0aW9uIF8oZSl7aWYoZSl7dmFyIHQ9Yy5pbmRleE9mKGUpO2Muc3BsaWNlKHQsMSk7dmFyIHM9ZS5lbGVtZW50Xy5nZXRBdHRyaWJ1dGUoXCJkYXRhLXVwZ3JhZGVkXCIpLnNwbGl0KFwiLFwiKSxpPXMuaW5kZXhPZihlW3BdLmNsYXNzQXNTdHJpbmcpO3Muc3BsaWNlKGksMSksZS5lbGVtZW50Xy5zZXRBdHRyaWJ1dGUoXCJkYXRhLXVwZ3JhZGVkXCIscy5qb2luKFwiLFwiKSk7dmFyIG47XCJDdXN0b21FdmVudFwiaW4gd2luZG93JiZcImZ1bmN0aW9uXCI9PXR5cGVvZiB3aW5kb3cuQ3VzdG9tRXZlbnQ/bj1uZXcgQ3VzdG9tRXZlbnQoXCJtZGwtY29tcG9uZW50ZG93bmdyYWRlZFwiLHtidWJibGVzOiEwLGNhbmNlbGFibGU6ITF9KToobj1kb2N1bWVudC5jcmVhdGVFdmVudChcIkV2ZW50c1wiKSxuLmluaXRFdmVudChcIm1kbC1jb21wb25lbnRkb3duZ3JhZGVkXCIsITAsITApKSxlLmVsZW1lbnRfLmRpc3BhdGNoRXZlbnQobil9fWZ1bmN0aW9uIGQoZSl7dmFyIHQ9ZnVuY3Rpb24oZSl7Yy5maWx0ZXIoZnVuY3Rpb24odCl7cmV0dXJuIHQuZWxlbWVudF89PT1lfSkuZm9yRWFjaChfKX07aWYoZSBpbnN0YW5jZW9mIEFycmF5fHxlIGluc3RhbmNlb2YgTm9kZUxpc3QpZm9yKHZhciBzPTA7czxlLmxlbmd0aDtzKyspdChlW3NdKTtlbHNle2lmKCEoZSBpbnN0YW5jZW9mIE5vZGUpKXRocm93IG5ldyBFcnJvcihcIkludmFsaWQgYXJndW1lbnQgcHJvdmlkZWQgdG8gZG93bmdyYWRlIE1ETCBub2Rlcy5cIik7dChlKX19dmFyIGg9W10sYz1bXSxwPVwibWRsQ29tcG9uZW50Q29uZmlnSW50ZXJuYWxfXCI7cmV0dXJue3VwZ3JhZGVEb206aSx1cGdyYWRlRWxlbWVudDpuLHVwZ3JhZGVFbGVtZW50czphLHVwZ3JhZGVBbGxSZWdpc3RlcmVkOnIscmVnaXN0ZXJVcGdyYWRlZENhbGxiYWNrOm8scmVnaXN0ZXI6bCxkb3duZ3JhZGVFbGVtZW50czpkfX0oKSxzLkNvbXBvbmVudENvbmZpZ1B1YmxpYyxzLkNvbXBvbmVudENvbmZpZyxzLkNvbXBvbmVudCxzLnVwZ3JhZGVEb209cy51cGdyYWRlRG9tLHMudXBncmFkZUVsZW1lbnQ9cy51cGdyYWRlRWxlbWVudCxzLnVwZ3JhZGVFbGVtZW50cz1zLnVwZ3JhZGVFbGVtZW50cyxzLnVwZ3JhZGVBbGxSZWdpc3RlcmVkPXMudXBncmFkZUFsbFJlZ2lzdGVyZWQscy5yZWdpc3RlclVwZ3JhZGVkQ2FsbGJhY2s9cy5yZWdpc3RlclVwZ3JhZGVkQ2FsbGJhY2sscy5yZWdpc3Rlcj1zLnJlZ2lzdGVyLHMuZG93bmdyYWRlRWxlbWVudHM9cy5kb3duZ3JhZGVFbGVtZW50cyx3aW5kb3cuY29tcG9uZW50SGFuZGxlcj1zLHdpbmRvdy5jb21wb25lbnRIYW5kbGVyPXMsd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsZnVuY3Rpb24oKXtcImNsYXNzTGlzdFwiaW4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSYmXCJxdWVyeVNlbGVjdG9yXCJpbiBkb2N1bWVudCYmXCJhZGRFdmVudExpc3RlbmVyXCJpbiB3aW5kb3cmJkFycmF5LnByb3RvdHlwZS5mb3JFYWNoPyhkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcIm1kbC1qc1wiKSxzLnVwZ3JhZGVBbGxSZWdpc3RlcmVkKCkpOihzLnVwZ3JhZGVFbGVtZW50PWZ1bmN0aW9uKCl7fSxzLnJlZ2lzdGVyPWZ1bmN0aW9uKCl7fSl9KSxEYXRlLm5vd3x8KERhdGUubm93PWZ1bmN0aW9uKCl7cmV0dXJuKG5ldyBEYXRlKS5nZXRUaW1lKCl9LERhdGUubm93PURhdGUubm93KTtmb3IodmFyIGk9W1wid2Via2l0XCIsXCJtb3pcIl0sbj0wO248aS5sZW5ndGgmJiF3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lOysrbil7dmFyIGE9aVtuXTt3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lPXdpbmRvd1thK1wiUmVxdWVzdEFuaW1hdGlvbkZyYW1lXCJdLHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZT13aW5kb3dbYStcIkNhbmNlbEFuaW1hdGlvbkZyYW1lXCJdfHx3aW5kb3dbYStcIkNhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZVwiXSx3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lPXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUsd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lPXdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZX1pZigvaVAoYWR8aG9uZXxvZCkuKk9TIDYvLnRlc3Qod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQpfHwhd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZXx8IXdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSl7dmFyIGw9MDt3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lPWZ1bmN0aW9uKGUpe3ZhciB0PURhdGUubm93KCkscz1NYXRoLm1heChsKzE2LHQpO3JldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7ZShsPXMpfSxzLXQpfSx3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWU9Y2xlYXJUaW1lb3V0LHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWU9d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSx3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWU9d2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lfXZhciBvPWZ1bmN0aW9uKGUpe3RoaXMuZWxlbWVudF89ZSx0aGlzLmluaXQoKX07d2luZG93Lk1hdGVyaWFsQnV0dG9uPW8sby5wcm90b3R5cGUuQ29uc3RhbnRfPXt9LG8ucHJvdG90eXBlLkNzc0NsYXNzZXNfPXtSSVBQTEVfRUZGRUNUOlwibWRsLWpzLXJpcHBsZS1lZmZlY3RcIixSSVBQTEVfQ09OVEFJTkVSOlwibWRsLWJ1dHRvbl9fcmlwcGxlLWNvbnRhaW5lclwiLFJJUFBMRTpcIm1kbC1yaXBwbGVcIn0sby5wcm90b3R5cGUuYmx1ckhhbmRsZXJfPWZ1bmN0aW9uKGUpe2UmJnRoaXMuZWxlbWVudF8uYmx1cigpfSxvLnByb3RvdHlwZS5kaXNhYmxlPWZ1bmN0aW9uKCl7dGhpcy5lbGVtZW50Xy5kaXNhYmxlZD0hMH0sby5wcm90b3R5cGUuZGlzYWJsZT1vLnByb3RvdHlwZS5kaXNhYmxlLG8ucHJvdG90eXBlLmVuYWJsZT1mdW5jdGlvbigpe3RoaXMuZWxlbWVudF8uZGlzYWJsZWQ9ITF9LG8ucHJvdG90eXBlLmVuYWJsZT1vLnByb3RvdHlwZS5lbmFibGUsby5wcm90b3R5cGUuaW5pdD1mdW5jdGlvbigpe2lmKHRoaXMuZWxlbWVudF8pe2lmKHRoaXMuZWxlbWVudF8uY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuQ3NzQ2xhc3Nlc18uUklQUExFX0VGRkVDVCkpe3ZhciBlPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO2UuY2xhc3NMaXN0LmFkZCh0aGlzLkNzc0NsYXNzZXNfLlJJUFBMRV9DT05UQUlORVIpLHRoaXMucmlwcGxlRWxlbWVudF89ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIiksdGhpcy5yaXBwbGVFbGVtZW50Xy5jbGFzc0xpc3QuYWRkKHRoaXMuQ3NzQ2xhc3Nlc18uUklQUExFKSxlLmFwcGVuZENoaWxkKHRoaXMucmlwcGxlRWxlbWVudF8pLHRoaXMuYm91bmRSaXBwbGVCbHVySGFuZGxlcj10aGlzLmJsdXJIYW5kbGVyXy5iaW5kKHRoaXMpLHRoaXMucmlwcGxlRWxlbWVudF8uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIix0aGlzLmJvdW5kUmlwcGxlQmx1ckhhbmRsZXIpLHRoaXMuZWxlbWVudF8uYXBwZW5kQ2hpbGQoZSl9dGhpcy5ib3VuZEJ1dHRvbkJsdXJIYW5kbGVyPXRoaXMuYmx1ckhhbmRsZXJfLmJpbmQodGhpcyksdGhpcy5lbGVtZW50Xy5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLHRoaXMuYm91bmRCdXR0b25CbHVySGFuZGxlciksdGhpcy5lbGVtZW50Xy5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLHRoaXMuYm91bmRCdXR0b25CbHVySGFuZGxlcil9fSxzLnJlZ2lzdGVyKHtjb25zdHJ1Y3RvcjpvLGNsYXNzQXNTdHJpbmc6XCJNYXRlcmlhbEJ1dHRvblwiLGNzc0NsYXNzOlwibWRsLWpzLWJ1dHRvblwiLHdpZGdldDohMH0pO3ZhciByPWZ1bmN0aW9uKGUpe3RoaXMuZWxlbWVudF89ZSx0aGlzLmluaXQoKX07d2luZG93Lk1hdGVyaWFsQ2hlY2tib3g9cixyLnByb3RvdHlwZS5Db25zdGFudF89e1RJTllfVElNRU9VVDouMDAxfSxyLnByb3RvdHlwZS5Dc3NDbGFzc2VzXz17SU5QVVQ6XCJtZGwtY2hlY2tib3hfX2lucHV0XCIsQk9YX09VVExJTkU6XCJtZGwtY2hlY2tib3hfX2JveC1vdXRsaW5lXCIsRk9DVVNfSEVMUEVSOlwibWRsLWNoZWNrYm94X19mb2N1cy1oZWxwZXJcIixUSUNLX09VVExJTkU6XCJtZGwtY2hlY2tib3hfX3RpY2stb3V0bGluZVwiLFJJUFBMRV9FRkZFQ1Q6XCJtZGwtanMtcmlwcGxlLWVmZmVjdFwiLFJJUFBMRV9JR05PUkVfRVZFTlRTOlwibWRsLWpzLXJpcHBsZS1lZmZlY3QtLWlnbm9yZS1ldmVudHNcIixSSVBQTEVfQ09OVEFJTkVSOlwibWRsLWNoZWNrYm94X19yaXBwbGUtY29udGFpbmVyXCIsUklQUExFX0NFTlRFUjpcIm1kbC1yaXBwbGUtLWNlbnRlclwiLFJJUFBMRTpcIm1kbC1yaXBwbGVcIixJU19GT0NVU0VEOlwiaXMtZm9jdXNlZFwiLElTX0RJU0FCTEVEOlwiaXMtZGlzYWJsZWRcIixJU19DSEVDS0VEOlwiaXMtY2hlY2tlZFwiLElTX1VQR1JBREVEOlwiaXMtdXBncmFkZWRcIn0sci5wcm90b3R5cGUub25DaGFuZ2VfPWZ1bmN0aW9uKGUpe3RoaXMudXBkYXRlQ2xhc3Nlc18oKX0sci5wcm90b3R5cGUub25Gb2N1c189ZnVuY3Rpb24oZSl7dGhpcy5lbGVtZW50Xy5jbGFzc0xpc3QuYWRkKHRoaXMuQ3NzQ2xhc3Nlc18uSVNfRk9DVVNFRCl9LHIucHJvdG90eXBlLm9uQmx1cl89ZnVuY3Rpb24oZSl7dGhpcy5lbGVtZW50Xy5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuQ3NzQ2xhc3Nlc18uSVNfRk9DVVNFRCl9LHIucHJvdG90eXBlLm9uTW91c2VVcF89ZnVuY3Rpb24oZSl7dGhpcy5ibHVyXygpfSxyLnByb3RvdHlwZS51cGRhdGVDbGFzc2VzXz1mdW5jdGlvbigpe3RoaXMuY2hlY2tEaXNhYmxlZCgpLHRoaXMuY2hlY2tUb2dnbGVTdGF0ZSgpfSxyLnByb3RvdHlwZS5ibHVyXz1mdW5jdGlvbigpe3dpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dGhpcy5pbnB1dEVsZW1lbnRfLmJsdXIoKX0uYmluZCh0aGlzKSx0aGlzLkNvbnN0YW50Xy5USU5ZX1RJTUVPVVQpfSxyLnByb3RvdHlwZS5jaGVja1RvZ2dsZVN0YXRlPWZ1bmN0aW9uKCl7dGhpcy5pbnB1dEVsZW1lbnRfLmNoZWNrZWQ/dGhpcy5lbGVtZW50Xy5jbGFzc0xpc3QuYWRkKHRoaXMuQ3NzQ2xhc3Nlc18uSVNfQ0hFQ0tFRCk6dGhpcy5lbGVtZW50Xy5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuQ3NzQ2xhc3Nlc18uSVNfQ0hFQ0tFRCl9LHIucHJvdG90eXBlLmNoZWNrVG9nZ2xlU3RhdGU9ci5wcm90b3R5cGUuY2hlY2tUb2dnbGVTdGF0ZSxyLnByb3RvdHlwZS5jaGVja0Rpc2FibGVkPWZ1bmN0aW9uKCl7dGhpcy5pbnB1dEVsZW1lbnRfLmRpc2FibGVkP3RoaXMuZWxlbWVudF8uY2xhc3NMaXN0LmFkZCh0aGlzLkNzc0NsYXNzZXNfLklTX0RJU0FCTEVEKTp0aGlzLmVsZW1lbnRfLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5Dc3NDbGFzc2VzXy5JU19ESVNBQkxFRCl9LHIucHJvdG90eXBlLmNoZWNrRGlzYWJsZWQ9ci5wcm90b3R5cGUuY2hlY2tEaXNhYmxlZCxyLnByb3RvdHlwZS5kaXNhYmxlPWZ1bmN0aW9uKCl7dGhpcy5pbnB1dEVsZW1lbnRfLmRpc2FibGVkPSEwLHRoaXMudXBkYXRlQ2xhc3Nlc18oKX0sci5wcm90b3R5cGUuZGlzYWJsZT1yLnByb3RvdHlwZS5kaXNhYmxlLHIucHJvdG90eXBlLmVuYWJsZT1mdW5jdGlvbigpe3RoaXMuaW5wdXRFbGVtZW50Xy5kaXNhYmxlZD0hMSx0aGlzLnVwZGF0ZUNsYXNzZXNfKCl9LHIucHJvdG90eXBlLmVuYWJsZT1yLnByb3RvdHlwZS5lbmFibGUsci5wcm90b3R5cGUuY2hlY2s9ZnVuY3Rpb24oKXt0aGlzLmlucHV0RWxlbWVudF8uY2hlY2tlZD0hMCx0aGlzLnVwZGF0ZUNsYXNzZXNfKCl9LHIucHJvdG90eXBlLmNoZWNrPXIucHJvdG90eXBlLmNoZWNrLHIucHJvdG90eXBlLnVuY2hlY2s9ZnVuY3Rpb24oKXt0aGlzLmlucHV0RWxlbWVudF8uY2hlY2tlZD0hMSx0aGlzLnVwZGF0ZUNsYXNzZXNfKCl9LHIucHJvdG90eXBlLnVuY2hlY2s9ci5wcm90b3R5cGUudW5jaGVjayxyLnByb3RvdHlwZS5pbml0PWZ1bmN0aW9uKCl7aWYodGhpcy5lbGVtZW50Xyl7dGhpcy5pbnB1dEVsZW1lbnRfPXRoaXMuZWxlbWVudF8ucXVlcnlTZWxlY3RvcihcIi5cIit0aGlzLkNzc0NsYXNzZXNfLklOUFVUKTt2YXIgZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtlLmNsYXNzTGlzdC5hZGQodGhpcy5Dc3NDbGFzc2VzXy5CT1hfT1VUTElORSk7dmFyIHQ9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7dC5jbGFzc0xpc3QuYWRkKHRoaXMuQ3NzQ2xhc3Nlc18uRk9DVVNfSEVMUEVSKTt2YXIgcz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtpZihzLmNsYXNzTGlzdC5hZGQodGhpcy5Dc3NDbGFzc2VzXy5USUNLX09VVExJTkUpLGUuYXBwZW5kQ2hpbGQocyksdGhpcy5lbGVtZW50Xy5hcHBlbmRDaGlsZCh0KSx0aGlzLmVsZW1lbnRfLmFwcGVuZENoaWxkKGUpLHRoaXMuZWxlbWVudF8uY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuQ3NzQ2xhc3Nlc18uUklQUExFX0VGRkVDVCkpe3RoaXMuZWxlbWVudF8uY2xhc3NMaXN0LmFkZCh0aGlzLkNzc0NsYXNzZXNfLlJJUFBMRV9JR05PUkVfRVZFTlRTKSx0aGlzLnJpcHBsZUNvbnRhaW5lckVsZW1lbnRfPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpLHRoaXMucmlwcGxlQ29udGFpbmVyRWxlbWVudF8uY2xhc3NMaXN0LmFkZCh0aGlzLkNzc0NsYXNzZXNfLlJJUFBMRV9DT05UQUlORVIpLHRoaXMucmlwcGxlQ29udGFpbmVyRWxlbWVudF8uY2xhc3NMaXN0LmFkZCh0aGlzLkNzc0NsYXNzZXNfLlJJUFBMRV9FRkZFQ1QpLHRoaXMucmlwcGxlQ29udGFpbmVyRWxlbWVudF8uY2xhc3NMaXN0LmFkZCh0aGlzLkNzc0NsYXNzZXNfLlJJUFBMRV9DRU5URVIpLHRoaXMuYm91bmRSaXBwbGVNb3VzZVVwPXRoaXMub25Nb3VzZVVwXy5iaW5kKHRoaXMpLHRoaXMucmlwcGxlQ29udGFpbmVyRWxlbWVudF8uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIix0aGlzLmJvdW5kUmlwcGxlTW91c2VVcCk7dmFyIGk9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7aS5jbGFzc0xpc3QuYWRkKHRoaXMuQ3NzQ2xhc3Nlc18uUklQUExFKSx0aGlzLnJpcHBsZUNvbnRhaW5lckVsZW1lbnRfLmFwcGVuZENoaWxkKGkpLHRoaXMuZWxlbWVudF8uYXBwZW5kQ2hpbGQodGhpcy5yaXBwbGVDb250YWluZXJFbGVtZW50Xyl9dGhpcy5ib3VuZElucHV0T25DaGFuZ2U9dGhpcy5vbkNoYW5nZV8uYmluZCh0aGlzKSx0aGlzLmJvdW5kSW5wdXRPbkZvY3VzPXRoaXMub25Gb2N1c18uYmluZCh0aGlzKSx0aGlzLmJvdW5kSW5wdXRPbkJsdXI9dGhpcy5vbkJsdXJfLmJpbmQodGhpcyksdGhpcy5ib3VuZEVsZW1lbnRNb3VzZVVwPXRoaXMub25Nb3VzZVVwXy5iaW5kKHRoaXMpLHRoaXMuaW5wdXRFbGVtZW50Xy5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsdGhpcy5ib3VuZElucHV0T25DaGFuZ2UpLHRoaXMuaW5wdXRFbGVtZW50Xy5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNcIix0aGlzLmJvdW5kSW5wdXRPbkZvY3VzKSx0aGlzLmlucHV0RWxlbWVudF8uYWRkRXZlbnRMaXN0ZW5lcihcImJsdXJcIix0aGlzLmJvdW5kSW5wdXRPbkJsdXIpLHRoaXMuZWxlbWVudF8uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIix0aGlzLmJvdW5kRWxlbWVudE1vdXNlVXApLHRoaXMudXBkYXRlQ2xhc3Nlc18oKSx0aGlzLmVsZW1lbnRfLmNsYXNzTGlzdC5hZGQodGhpcy5Dc3NDbGFzc2VzXy5JU19VUEdSQURFRCl9fSxzLnJlZ2lzdGVyKHtjb25zdHJ1Y3RvcjpyLGNsYXNzQXNTdHJpbmc6XCJNYXRlcmlhbENoZWNrYm94XCIsY3NzQ2xhc3M6XCJtZGwtanMtY2hlY2tib3hcIix3aWRnZXQ6ITB9KTt2YXIgXz1mdW5jdGlvbihlKXt0aGlzLmVsZW1lbnRfPWUsdGhpcy5pbml0KCl9O3dpbmRvdy5NYXRlcmlhbEljb25Ub2dnbGU9XyxfLnByb3RvdHlwZS5Db25zdGFudF89e1RJTllfVElNRU9VVDouMDAxfSxfLnByb3RvdHlwZS5Dc3NDbGFzc2VzXz17SU5QVVQ6XCJtZGwtaWNvbi10b2dnbGVfX2lucHV0XCIsSlNfUklQUExFX0VGRkVDVDpcIm1kbC1qcy1yaXBwbGUtZWZmZWN0XCIsUklQUExFX0lHTk9SRV9FVkVOVFM6XCJtZGwtanMtcmlwcGxlLWVmZmVjdC0taWdub3JlLWV2ZW50c1wiLFJJUFBMRV9DT05UQUlORVI6XCJtZGwtaWNvbi10b2dnbGVfX3JpcHBsZS1jb250YWluZXJcIixSSVBQTEVfQ0VOVEVSOlwibWRsLXJpcHBsZS0tY2VudGVyXCIsUklQUExFOlwibWRsLXJpcHBsZVwiLElTX0ZPQ1VTRUQ6XCJpcy1mb2N1c2VkXCIsSVNfRElTQUJMRUQ6XCJpcy1kaXNhYmxlZFwiLElTX0NIRUNLRUQ6XCJpcy1jaGVja2VkXCJ9LF8ucHJvdG90eXBlLm9uQ2hhbmdlXz1mdW5jdGlvbihlKXt0aGlzLnVwZGF0ZUNsYXNzZXNfKCl9LF8ucHJvdG90eXBlLm9uRm9jdXNfPWZ1bmN0aW9uKGUpe3RoaXMuZWxlbWVudF8uY2xhc3NMaXN0LmFkZCh0aGlzLkNzc0NsYXNzZXNfLklTX0ZPQ1VTRUQpfSxfLnByb3RvdHlwZS5vbkJsdXJfPWZ1bmN0aW9uKGUpe3RoaXMuZWxlbWVudF8uY2xhc3NMaXN0LnJlbW92ZSh0aGlzLkNzc0NsYXNzZXNfLklTX0ZPQ1VTRUQpfSxfLnByb3RvdHlwZS5vbk1vdXNlVXBfPWZ1bmN0aW9uKGUpe3RoaXMuYmx1cl8oKX0sXy5wcm90b3R5cGUudXBkYXRlQ2xhc3Nlc189ZnVuY3Rpb24oKXt0aGlzLmNoZWNrRGlzYWJsZWQoKSx0aGlzLmNoZWNrVG9nZ2xlU3RhdGUoKX0sXy5wcm90b3R5cGUuYmx1cl89ZnVuY3Rpb24oKXt3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpe3RoaXMuaW5wdXRFbGVtZW50Xy5ibHVyKCl9LmJpbmQodGhpcyksdGhpcy5Db25zdGFudF8uVElOWV9USU1FT1VUKX0sXy5wcm90b3R5cGUuY2hlY2tUb2dnbGVTdGF0ZT1mdW5jdGlvbigpe3RoaXMuaW5wdXRFbGVtZW50Xy5jaGVja2VkP3RoaXMuZWxlbWVudF8uY2xhc3NMaXN0LmFkZCh0aGlzLkNzc0NsYXNzZXNfLklTX0NIRUNLRUQpOnRoaXMuZWxlbWVudF8uY2xhc3NMaXN0LnJlbW92ZSh0aGlzLkNzc0NsYXNzZXNfLklTX0NIRUNLRUQpfSxfLnByb3RvdHlwZS5jaGVja1RvZ2dsZVN0YXRlPV8ucHJvdG90eXBlLmNoZWNrVG9nZ2xlU3RhdGUsXy5wcm90b3R5cGUuY2hlY2tEaXNhYmxlZD1mdW5jdGlvbigpe3RoaXMuaW5wdXRFbGVtZW50Xy5kaXNhYmxlZD90aGlzLmVsZW1lbnRfLmNsYXNzTGlzdC5hZGQodGhpcy5Dc3NDbGFzc2VzXy5JU19ESVNBQkxFRCk6dGhpcy5lbGVtZW50Xy5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuQ3NzQ2xhc3Nlc18uSVNfRElTQUJMRUQpfSxfLnByb3RvdHlwZS5jaGVja0Rpc2FibGVkPV8ucHJvdG90eXBlLmNoZWNrRGlzYWJsZWQsXy5wcm90b3R5cGUuZGlzYWJsZT1mdW5jdGlvbigpe3RoaXMuaW5wdXRFbGVtZW50Xy5kaXNhYmxlZD0hMCx0aGlzLnVwZGF0ZUNsYXNzZXNfKCl9LF8ucHJvdG90eXBlLmRpc2FibGU9Xy5wcm90b3R5cGUuZGlzYWJsZSxfLnByb3RvdHlwZS5lbmFibGU9ZnVuY3Rpb24oKXt0aGlzLmlucHV0RWxlbWVudF8uZGlzYWJsZWQ9ITEsdGhpcy51cGRhdGVDbGFzc2VzXygpfSxfLnByb3RvdHlwZS5lbmFibGU9Xy5wcm90b3R5cGUuZW5hYmxlLF8ucHJvdG90eXBlLmNoZWNrPWZ1bmN0aW9uKCl7dGhpcy5pbnB1dEVsZW1lbnRfLmNoZWNrZWQ9ITAsdGhpcy51cGRhdGVDbGFzc2VzXygpfSxfLnByb3RvdHlwZS5jaGVjaz1fLnByb3RvdHlwZS5jaGVjayxfLnByb3RvdHlwZS51bmNoZWNrPWZ1bmN0aW9uKCl7dGhpcy5pbnB1dEVsZW1lbnRfLmNoZWNrZWQ9ITEsdGhpcy51cGRhdGVDbGFzc2VzXygpfSxfLnByb3RvdHlwZS51bmNoZWNrPV8ucHJvdG90eXBlLnVuY2hlY2ssXy5wcm90b3R5cGUuaW5pdD1mdW5jdGlvbigpe2lmKHRoaXMuZWxlbWVudF8pe2lmKHRoaXMuaW5wdXRFbGVtZW50Xz10aGlzLmVsZW1lbnRfLnF1ZXJ5U2VsZWN0b3IoXCIuXCIrdGhpcy5Dc3NDbGFzc2VzXy5JTlBVVCksdGhpcy5lbGVtZW50Xy5jbGFzc0xpc3QuY29udGFpbnModGhpcy5Dc3NDbGFzc2VzXy5KU19SSVBQTEVfRUZGRUNUKSl7dGhpcy5lbGVtZW50Xy5jbGFzc0xpc3QuYWRkKHRoaXMuQ3NzQ2xhc3Nlc18uUklQUExFX0lHTk9SRV9FVkVOVFMpLHRoaXMucmlwcGxlQ29udGFpbmVyRWxlbWVudF89ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIiksdGhpcy5yaXBwbGVDb250YWluZXJFbGVtZW50Xy5jbGFzc0xpc3QuYWRkKHRoaXMuQ3NzQ2xhc3Nlc18uUklQUExFX0NPTlRBSU5FUiksdGhpcy5yaXBwbGVDb250YWluZXJFbGVtZW50Xy5jbGFzc0xpc3QuYWRkKHRoaXMuQ3NzQ2xhc3Nlc18uSlNfUklQUExFX0VGRkVDVCksdGhpcy5yaXBwbGVDb250YWluZXJFbGVtZW50Xy5jbGFzc0xpc3QuYWRkKHRoaXMuQ3NzQ2xhc3Nlc18uUklQUExFX0NFTlRFUiksdGhpcy5ib3VuZFJpcHBsZU1vdXNlVXA9dGhpcy5vbk1vdXNlVXBfLmJpbmQodGhpcyksdGhpcy5yaXBwbGVDb250YWluZXJFbGVtZW50Xy5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLHRoaXMuYm91bmRSaXBwbGVNb3VzZVVwKTt2YXIgZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtlLmNsYXNzTGlzdC5hZGQodGhpcy5Dc3NDbGFzc2VzXy5SSVBQTEUpLHRoaXMucmlwcGxlQ29udGFpbmVyRWxlbWVudF8uYXBwZW5kQ2hpbGQoZSksdGhpcy5lbGVtZW50Xy5hcHBlbmRDaGlsZCh0aGlzLnJpcHBsZUNvbnRhaW5lckVsZW1lbnRfKX10aGlzLmJvdW5kSW5wdXRPbkNoYW5nZT10aGlzLm9uQ2hhbmdlXy5iaW5kKHRoaXMpLHRoaXMuYm91bmRJbnB1dE9uRm9jdXM9dGhpcy5vbkZvY3VzXy5iaW5kKHRoaXMpLHRoaXMuYm91bmRJbnB1dE9uQmx1cj10aGlzLm9uQmx1cl8uYmluZCh0aGlzKSx0aGlzLmJvdW5kRWxlbWVudE9uTW91c2VVcD10aGlzLm9uTW91c2VVcF8uYmluZCh0aGlzKSx0aGlzLmlucHV0RWxlbWVudF8uYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLHRoaXMuYm91bmRJbnB1dE9uQ2hhbmdlKSx0aGlzLmlucHV0RWxlbWVudF8uYWRkRXZlbnRMaXN0ZW5lcihcImZvY3VzXCIsdGhpcy5ib3VuZElucHV0T25Gb2N1cyksdGhpcy5pbnB1dEVsZW1lbnRfLmFkZEV2ZW50TGlzdGVuZXIoXCJibHVyXCIsdGhpcy5ib3VuZElucHV0T25CbHVyKSx0aGlzLmVsZW1lbnRfLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsdGhpcy5ib3VuZEVsZW1lbnRPbk1vdXNlVXApLHRoaXMudXBkYXRlQ2xhc3Nlc18oKSx0aGlzLmVsZW1lbnRfLmNsYXNzTGlzdC5hZGQoXCJpcy11cGdyYWRlZFwiKX19LHMucmVnaXN0ZXIoe2NvbnN0cnVjdG9yOl8sY2xhc3NBc1N0cmluZzpcIk1hdGVyaWFsSWNvblRvZ2dsZVwiLGNzc0NsYXNzOlwibWRsLWpzLWljb24tdG9nZ2xlXCIsd2lkZ2V0OiEwfSk7dmFyIGQ9ZnVuY3Rpb24oZSl7dGhpcy5lbGVtZW50Xz1lLHRoaXMuaW5pdCgpfTt3aW5kb3cuTWF0ZXJpYWxNZW51PWQsZC5wcm90b3R5cGUuQ29uc3RhbnRfPXtUUkFOU0lUSU9OX0RVUkFUSU9OX1NFQ09ORFM6LjMsVFJBTlNJVElPTl9EVVJBVElPTl9GUkFDVElPTjouOCxDTE9TRV9USU1FT1VUOjE1MH0sZC5wcm90b3R5cGUuS2V5Y29kZXNfPXtFTlRFUjoxMyxFU0NBUEU6MjcsU1BBQ0U6MzIsVVBfQVJST1c6MzgsRE9XTl9BUlJPVzo0MH0sZC5wcm90b3R5cGUuQ3NzQ2xhc3Nlc189e0NPTlRBSU5FUjpcIm1kbC1tZW51X19jb250YWluZXJcIixPVVRMSU5FOlwibWRsLW1lbnVfX291dGxpbmVcIixJVEVNOlwibWRsLW1lbnVfX2l0ZW1cIixJVEVNX1JJUFBMRV9DT05UQUlORVI6XCJtZGwtbWVudV9faXRlbS1yaXBwbGUtY29udGFpbmVyXCIsUklQUExFX0VGRkVDVDpcIm1kbC1qcy1yaXBwbGUtZWZmZWN0XCIsUklQUExFX0lHTk9SRV9FVkVOVFM6XCJtZGwtanMtcmlwcGxlLWVmZmVjdC0taWdub3JlLWV2ZW50c1wiLFJJUFBMRTpcIm1kbC1yaXBwbGVcIixJU19VUEdSQURFRDpcImlzLXVwZ3JhZGVkXCIsSVNfVklTSUJMRTpcImlzLXZpc2libGVcIixJU19BTklNQVRJTkc6XCJpcy1hbmltYXRpbmdcIixCT1RUT01fTEVGVDpcIm1kbC1tZW51LS1ib3R0b20tbGVmdFwiLEJPVFRPTV9SSUdIVDpcIm1kbC1tZW51LS1ib3R0b20tcmlnaHRcIixUT1BfTEVGVDpcIm1kbC1tZW51LS10b3AtbGVmdFwiLFRPUF9SSUdIVDpcIm1kbC1tZW51LS10b3AtcmlnaHRcIixVTkFMSUdORUQ6XCJtZGwtbWVudS0tdW5hbGlnbmVkXCJ9LGQucHJvdG90eXBlLmluaXQ9ZnVuY3Rpb24oKXtpZih0aGlzLmVsZW1lbnRfKXt2YXIgZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO2UuY2xhc3NMaXN0LmFkZCh0aGlzLkNzc0NsYXNzZXNfLkNPTlRBSU5FUiksdGhpcy5lbGVtZW50Xy5wYXJlbnRFbGVtZW50Lmluc2VydEJlZm9yZShlLHRoaXMuZWxlbWVudF8pLHRoaXMuZWxlbWVudF8ucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZCh0aGlzLmVsZW1lbnRfKSxlLmFwcGVuZENoaWxkKHRoaXMuZWxlbWVudF8pLHRoaXMuY29udGFpbmVyXz1lO3ZhciB0PWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7dC5jbGFzc0xpc3QuYWRkKHRoaXMuQ3NzQ2xhc3Nlc18uT1VUTElORSksdGhpcy5vdXRsaW5lXz10LGUuaW5zZXJ0QmVmb3JlKHQsdGhpcy5lbGVtZW50Xyk7dmFyIHM9dGhpcy5lbGVtZW50Xy5nZXRBdHRyaWJ1dGUoXCJmb3JcIil8fHRoaXMuZWxlbWVudF8uZ2V0QXR0cmlidXRlKFwiZGF0YS1tZGwtZm9yXCIpLGk9bnVsbDtzJiYoaT1kb2N1bWVudC5nZXRFbGVtZW50QnlJZChzKSxpJiYodGhpcy5mb3JFbGVtZW50Xz1pLGkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsdGhpcy5oYW5kbGVGb3JDbGlja18uYmluZCh0aGlzKSksaS5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLHRoaXMuaGFuZGxlRm9yS2V5Ym9hcmRFdmVudF8uYmluZCh0aGlzKSkpKTt2YXIgbj10aGlzLmVsZW1lbnRfLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuXCIrdGhpcy5Dc3NDbGFzc2VzXy5JVEVNKTt0aGlzLmJvdW5kSXRlbUtleWRvd25fPXRoaXMuaGFuZGxlSXRlbUtleWJvYXJkRXZlbnRfLmJpbmQodGhpcyksdGhpcy5ib3VuZEl0ZW1DbGlja189dGhpcy5oYW5kbGVJdGVtQ2xpY2tfLmJpbmQodGhpcyk7Zm9yKHZhciBhPTA7YTxuLmxlbmd0aDthKyspblthXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIix0aGlzLmJvdW5kSXRlbUNsaWNrXyksblthXS50YWJJbmRleD1cIi0xXCIsblthXS5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLHRoaXMuYm91bmRJdGVtS2V5ZG93bl8pO2lmKHRoaXMuZWxlbWVudF8uY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuQ3NzQ2xhc3Nlc18uUklQUExFX0VGRkVDVCkpZm9yKHRoaXMuZWxlbWVudF8uY2xhc3NMaXN0LmFkZCh0aGlzLkNzc0NsYXNzZXNfLlJJUFBMRV9JR05PUkVfRVZFTlRTKSxhPTA7YTxuLmxlbmd0aDthKyspe3ZhciBsPW5bYV0sbz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtvLmNsYXNzTGlzdC5hZGQodGhpcy5Dc3NDbGFzc2VzXy5JVEVNX1JJUFBMRV9DT05UQUlORVIpO3ZhciByPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO3IuY2xhc3NMaXN0LmFkZCh0aGlzLkNzc0NsYXNzZXNfLlJJUFBMRSksby5hcHBlbmRDaGlsZChyKSxsLmFwcGVuZENoaWxkKG8pLGwuY2xhc3NMaXN0LmFkZCh0aGlzLkNzc0NsYXNzZXNfLlJJUFBMRV9FRkZFQ1QpfXRoaXMuZWxlbWVudF8uY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuQ3NzQ2xhc3Nlc18uQk9UVE9NX0xFRlQpJiZ0aGlzLm91dGxpbmVfLmNsYXNzTGlzdC5hZGQodGhpcy5Dc3NDbGFzc2VzXy5CT1RUT01fTEVGVCksdGhpcy5lbGVtZW50Xy5jbGFzc0xpc3QuY29udGFpbnModGhpcy5Dc3NDbGFzc2VzXy5CT1RUT01fUklHSFQpJiZ0aGlzLm91dGxpbmVfLmNsYXNzTGlzdC5hZGQodGhpcy5Dc3NDbGFzc2VzXy5CT1RUT01fUklHSFQpLHRoaXMuZWxlbWVudF8uY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuQ3NzQ2xhc3Nlc18uVE9QX0xFRlQpJiZ0aGlzLm91dGxpbmVfLmNsYXNzTGlzdC5hZGQodGhpcy5Dc3NDbGFzc2VzXy5UT1BfTEVGVCksdGhpcy5lbGVtZW50Xy5jbGFzc0xpc3QuY29udGFpbnModGhpcy5Dc3NDbGFzc2VzXy5UT1BfUklHSFQpJiZ0aGlzLm91dGxpbmVfLmNsYXNzTGlzdC5hZGQodGhpcy5Dc3NDbGFzc2VzXy5UT1BfUklHSFQpLHRoaXMuZWxlbWVudF8uY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuQ3NzQ2xhc3Nlc18uVU5BTElHTkVEKSYmdGhpcy5vdXRsaW5lXy5jbGFzc0xpc3QuYWRkKHRoaXMuQ3NzQ2xhc3Nlc18uVU5BTElHTkVEKSxlLmNsYXNzTGlzdC5hZGQodGhpcy5Dc3NDbGFzc2VzXy5JU19VUEdSQURFRCl9fSxkLnByb3RvdHlwZS5oYW5kbGVGb3JDbGlja189ZnVuY3Rpb24oZSl7aWYodGhpcy5lbGVtZW50XyYmdGhpcy5mb3JFbGVtZW50Xyl7dmFyIHQ9dGhpcy5mb3JFbGVtZW50Xy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxzPXRoaXMuZm9yRWxlbWVudF8ucGFyZW50RWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTt0aGlzLmVsZW1lbnRfLmNsYXNzTGlzdC5jb250YWlucyh0aGlzLkNzc0NsYXNzZXNfLlVOQUxJR05FRCl8fCh0aGlzLmVsZW1lbnRfLmNsYXNzTGlzdC5jb250YWlucyh0aGlzLkNzc0NsYXNzZXNfLkJPVFRPTV9SSUdIVCk/KHRoaXMuY29udGFpbmVyXy5zdHlsZS5yaWdodD1zLnJpZ2h0LXQucmlnaHQrXCJweFwiLHRoaXMuY29udGFpbmVyXy5zdHlsZS50b3A9dGhpcy5mb3JFbGVtZW50Xy5vZmZzZXRUb3ArdGhpcy5mb3JFbGVtZW50Xy5vZmZzZXRIZWlnaHQrXCJweFwiKTp0aGlzLmVsZW1lbnRfLmNsYXNzTGlzdC5jb250YWlucyh0aGlzLkNzc0NsYXNzZXNfLlRPUF9MRUZUKT8odGhpcy5jb250YWluZXJfLnN0eWxlLmxlZnQ9dGhpcy5mb3JFbGVtZW50Xy5vZmZzZXRMZWZ0K1wicHhcIix0aGlzLmNvbnRhaW5lcl8uc3R5bGUuYm90dG9tPXMuYm90dG9tLXQudG9wK1wicHhcIik6dGhpcy5lbGVtZW50Xy5jbGFzc0xpc3QuY29udGFpbnModGhpcy5Dc3NDbGFzc2VzXy5UT1BfUklHSFQpPyh0aGlzLmNvbnRhaW5lcl8uc3R5bGUucmlnaHQ9cy5yaWdodC10LnJpZ2h0K1wicHhcIix0aGlzLmNvbnRhaW5lcl8uc3R5bGUuYm90dG9tPXMuYm90dG9tLXQudG9wK1wicHhcIik6KHRoaXMuY29udGFpbmVyXy5zdHlsZS5sZWZ0PXRoaXMuZm9yRWxlbWVudF8ub2Zmc2V0TGVmdCtcInB4XCIsdGhpcy5jb250YWluZXJfLnN0eWxlLnRvcD10aGlzLmZvckVsZW1lbnRfLm9mZnNldFRvcCt0aGlzLmZvckVsZW1lbnRfLm9mZnNldEhlaWdodCtcInB4XCIpKX10aGlzLnRvZ2dsZShlKX0sZC5wcm90b3R5cGUuaGFuZGxlRm9yS2V5Ym9hcmRFdmVudF89ZnVuY3Rpb24oZSl7aWYodGhpcy5lbGVtZW50XyYmdGhpcy5jb250YWluZXJfJiZ0aGlzLmZvckVsZW1lbnRfKXt2YXIgdD10aGlzLmVsZW1lbnRfLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuXCIrdGhpcy5Dc3NDbGFzc2VzXy5JVEVNK1wiOm5vdChbZGlzYWJsZWRdKVwiKTt0JiZ0Lmxlbmd0aD4wJiZ0aGlzLmNvbnRhaW5lcl8uY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuQ3NzQ2xhc3Nlc18uSVNfVklTSUJMRSkmJihlLmtleUNvZGU9PT10aGlzLktleWNvZGVzXy5VUF9BUlJPVz8oZS5wcmV2ZW50RGVmYXVsdCgpLHRbdC5sZW5ndGgtMV0uZm9jdXMoKSk6ZS5rZXlDb2RlPT09dGhpcy5LZXljb2Rlc18uRE9XTl9BUlJPVyYmKGUucHJldmVudERlZmF1bHQoKSx0WzBdLmZvY3VzKCkpKX19LGQucHJvdG90eXBlLmhhbmRsZUl0ZW1LZXlib2FyZEV2ZW50Xz1mdW5jdGlvbihlKXtpZih0aGlzLmVsZW1lbnRfJiZ0aGlzLmNvbnRhaW5lcl8pe3ZhciB0PXRoaXMuZWxlbWVudF8ucXVlcnlTZWxlY3RvckFsbChcIi5cIit0aGlzLkNzc0NsYXNzZXNfLklURU0rXCI6bm90KFtkaXNhYmxlZF0pXCIpO2lmKHQmJnQubGVuZ3RoPjAmJnRoaXMuY29udGFpbmVyXy5jbGFzc0xpc3QuY29udGFpbnModGhpcy5Dc3NDbGFzc2VzXy5JU19WSVNJQkxFKSl7dmFyIHM9QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodCkuaW5kZXhPZihlLnRhcmdldCk7aWYoZS5rZXlDb2RlPT09dGhpcy5LZXljb2Rlc18uVVBfQVJST1cpZS5wcmV2ZW50RGVmYXVsdCgpLHM+MD90W3MtMV0uZm9jdXMoKTp0W3QubGVuZ3RoLTFdLmZvY3VzKCk7ZWxzZSBpZihlLmtleUNvZGU9PT10aGlzLktleWNvZGVzXy5ET1dOX0FSUk9XKWUucHJldmVudERlZmF1bHQoKSx0Lmxlbmd0aD5zKzE/dFtzKzFdLmZvY3VzKCk6dFswXS5mb2N1cygpO2Vsc2UgaWYoZS5rZXlDb2RlPT09dGhpcy5LZXljb2Rlc18uU1BBQ0V8fGUua2V5Q29kZT09PXRoaXMuS2V5Y29kZXNfLkVOVEVSKXtlLnByZXZlbnREZWZhdWx0KCk7dmFyIGk9bmV3IE1vdXNlRXZlbnQoXCJtb3VzZWRvd25cIik7ZS50YXJnZXQuZGlzcGF0Y2hFdmVudChpKSxpPW5ldyBNb3VzZUV2ZW50KFwibW91c2V1cFwiKSxlLnRhcmdldC5kaXNwYXRjaEV2ZW50KGkpLGUudGFyZ2V0LmNsaWNrKCl9ZWxzZSBlLmtleUNvZGU9PT10aGlzLktleWNvZGVzXy5FU0NBUEUmJihlLnByZXZlbnREZWZhdWx0KCksdGhpcy5oaWRlKCkpfX19LGQucHJvdG90eXBlLmhhbmRsZUl0ZW1DbGlja189ZnVuY3Rpb24oZSl7ZS50YXJnZXQuaGFzQXR0cmlidXRlKFwiZGlzYWJsZWRcIik/ZS5zdG9wUHJvcGFnYXRpb24oKToodGhpcy5jbG9zaW5nXz0hMCx3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbihlKXt0aGlzLmhpZGUoKSx0aGlzLmNsb3NpbmdfPSExfS5iaW5kKHRoaXMpLHRoaXMuQ29uc3RhbnRfLkNMT1NFX1RJTUVPVVQpKX0sZC5wcm90b3R5cGUuYXBwbHlDbGlwXz1mdW5jdGlvbihlLHQpe3RoaXMuZWxlbWVudF8uY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuQ3NzQ2xhc3Nlc18uVU5BTElHTkVEKT90aGlzLmVsZW1lbnRfLnN0eWxlLmNsaXA9XCJcIjp0aGlzLmVsZW1lbnRfLmNsYXNzTGlzdC5jb250YWlucyh0aGlzLkNzc0NsYXNzZXNfLkJPVFRPTV9SSUdIVCk/dGhpcy5lbGVtZW50Xy5zdHlsZS5jbGlwPVwicmVjdCgwIFwiK3QrXCJweCAwIFwiK3QrXCJweClcIjp0aGlzLmVsZW1lbnRfLmNsYXNzTGlzdC5jb250YWlucyh0aGlzLkNzc0NsYXNzZXNfLlRPUF9MRUZUKT90aGlzLmVsZW1lbnRfLnN0eWxlLmNsaXA9XCJyZWN0KFwiK2UrXCJweCAwIFwiK2UrXCJweCAwKVwiOnRoaXMuZWxlbWVudF8uY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuQ3NzQ2xhc3Nlc18uVE9QX1JJR0hUKT90aGlzLmVsZW1lbnRfLnN0eWxlLmNsaXA9XCJyZWN0KFwiK2UrXCJweCBcIit0K1wicHggXCIrZStcInB4IFwiK3QrXCJweClcIjp0aGlzLmVsZW1lbnRfLnN0eWxlLmNsaXA9XCJcIn0sZC5wcm90b3R5cGUucmVtb3ZlQW5pbWF0aW9uRW5kTGlzdGVuZXJfPWZ1bmN0aW9uKGUpe2UudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoZC5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18uSVNfQU5JTUFUSU5HKX0sZC5wcm90b3R5cGUuYWRkQW5pbWF0aW9uRW5kTGlzdGVuZXJfPWZ1bmN0aW9uKCl7dGhpcy5lbGVtZW50Xy5hZGRFdmVudExpc3RlbmVyKFwidHJhbnNpdGlvbmVuZFwiLHRoaXMucmVtb3ZlQW5pbWF0aW9uRW5kTGlzdGVuZXJfKSx0aGlzLmVsZW1lbnRfLmFkZEV2ZW50TGlzdGVuZXIoXCJ3ZWJraXRUcmFuc2l0aW9uRW5kXCIsdGhpcy5yZW1vdmVBbmltYXRpb25FbmRMaXN0ZW5lcl8pfSxkLnByb3RvdHlwZS5zaG93PWZ1bmN0aW9uKGUpe2lmKHRoaXMuZWxlbWVudF8mJnRoaXMuY29udGFpbmVyXyYmdGhpcy5vdXRsaW5lXyl7dmFyIHQ9dGhpcy5lbGVtZW50Xy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQscz10aGlzLmVsZW1lbnRfLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO3RoaXMuY29udGFpbmVyXy5zdHlsZS53aWR0aD1zK1wicHhcIix0aGlzLmNvbnRhaW5lcl8uc3R5bGUuaGVpZ2h0PXQrXCJweFwiLHRoaXMub3V0bGluZV8uc3R5bGUud2lkdGg9cytcInB4XCIsdGhpcy5vdXRsaW5lXy5zdHlsZS5oZWlnaHQ9dCtcInB4XCI7Zm9yKHZhciBpPXRoaXMuQ29uc3RhbnRfLlRSQU5TSVRJT05fRFVSQVRJT05fU0VDT05EUyp0aGlzLkNvbnN0YW50Xy5UUkFOU0lUSU9OX0RVUkFUSU9OX0ZSQUNUSU9OLG49dGhpcy5lbGVtZW50Xy5xdWVyeVNlbGVjdG9yQWxsKFwiLlwiK3RoaXMuQ3NzQ2xhc3Nlc18uSVRFTSksYT0wO2E8bi5sZW5ndGg7YSsrKXt2YXIgbD1udWxsO2w9dGhpcy5lbGVtZW50Xy5jbGFzc0xpc3QuY29udGFpbnModGhpcy5Dc3NDbGFzc2VzXy5UT1BfTEVGVCl8fHRoaXMuZWxlbWVudF8uY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuQ3NzQ2xhc3Nlc18uVE9QX1JJR0hUKT8odC1uW2FdLm9mZnNldFRvcC1uW2FdLm9mZnNldEhlaWdodCkvdCppK1wic1wiOm5bYV0ub2Zmc2V0VG9wL3QqaStcInNcIixuW2FdLnN0eWxlLnRyYW5zaXRpb25EZWxheT1sfXRoaXMuYXBwbHlDbGlwXyh0LHMpLHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKXt0aGlzLmVsZW1lbnRfLmNsYXNzTGlzdC5hZGQodGhpcy5Dc3NDbGFzc2VzXy5JU19BTklNQVRJTkcpLHRoaXMuZWxlbWVudF8uc3R5bGUuY2xpcD1cInJlY3QoMCBcIitzK1wicHggXCIrdCtcInB4IDApXCIsdGhpcy5jb250YWluZXJfLmNsYXNzTGlzdC5hZGQodGhpcy5Dc3NDbGFzc2VzXy5JU19WSVNJQkxFKX0uYmluZCh0aGlzKSksdGhpcy5hZGRBbmltYXRpb25FbmRMaXN0ZW5lcl8oKTt2YXIgbz1mdW5jdGlvbih0KXt0PT09ZXx8dGhpcy5jbG9zaW5nX3x8dC50YXJnZXQucGFyZW50Tm9kZT09PXRoaXMuZWxlbWVudF98fChkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIixvKSx0aGlzLmhpZGUoKSl9LmJpbmQodGhpcyk7ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsbyl9fSxkLnByb3RvdHlwZS5zaG93PWQucHJvdG90eXBlLnNob3csZC5wcm90b3R5cGUuaGlkZT1mdW5jdGlvbigpe2lmKHRoaXMuZWxlbWVudF8mJnRoaXMuY29udGFpbmVyXyYmdGhpcy5vdXRsaW5lXyl7Zm9yKHZhciBlPXRoaXMuZWxlbWVudF8ucXVlcnlTZWxlY3RvckFsbChcIi5cIit0aGlzLkNzc0NsYXNzZXNfLklURU0pLHQ9MDt0PGUubGVuZ3RoO3QrKyllW3RdLnN0eWxlLnJlbW92ZVByb3BlcnR5KFwidHJhbnNpdGlvbi1kZWxheVwiKTt2YXIgcz10aGlzLmVsZW1lbnRfLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLGk9cy5oZWlnaHQsbj1zLndpZHRoO3RoaXMuZWxlbWVudF8uY2xhc3NMaXN0LmFkZCh0aGlzLkNzc0NsYXNzZXNfLklTX0FOSU1BVElORyksdGhpcy5hcHBseUNsaXBfKGksbiksdGhpcy5jb250YWluZXJfLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5Dc3NDbGFzc2VzXy5JU19WSVNJQkxFKSx0aGlzLmFkZEFuaW1hdGlvbkVuZExpc3RlbmVyXygpfX0sZC5wcm90b3R5cGUuaGlkZT1kLnByb3RvdHlwZS5oaWRlLGQucHJvdG90eXBlLnRvZ2dsZT1mdW5jdGlvbihlKXt0aGlzLmNvbnRhaW5lcl8uY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuQ3NzQ2xhc3Nlc18uSVNfVklTSUJMRSk/dGhpcy5oaWRlKCk6dGhpcy5zaG93KGUpfSxkLnByb3RvdHlwZS50b2dnbGU9ZC5wcm90b3R5cGUudG9nZ2xlLHMucmVnaXN0ZXIoe2NvbnN0cnVjdG9yOmQsY2xhc3NBc1N0cmluZzpcIk1hdGVyaWFsTWVudVwiLGNzc0NsYXNzOlwibWRsLWpzLW1lbnVcIix3aWRnZXQ6ITB9KTt2YXIgaD1mdW5jdGlvbihlKXt0aGlzLmVsZW1lbnRfPWUsdGhpcy5pbml0KCl9O3dpbmRvdy5NYXRlcmlhbFByb2dyZXNzPWgsaC5wcm90b3R5cGUuQ29uc3RhbnRfPXt9LGgucHJvdG90eXBlLkNzc0NsYXNzZXNfPXtJTkRFVEVSTUlOQVRFX0NMQVNTOlwibWRsLXByb2dyZXNzX19pbmRldGVybWluYXRlXCJ9LGgucHJvdG90eXBlLnNldFByb2dyZXNzPWZ1bmN0aW9uKGUpe3RoaXMuZWxlbWVudF8uY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuQ3NzQ2xhc3Nlc18uSU5ERVRFUk1JTkFURV9DTEFTUyl8fCh0aGlzLnByb2dyZXNzYmFyXy5zdHlsZS53aWR0aD1lK1wiJVwiKX0saC5wcm90b3R5cGUuc2V0UHJvZ3Jlc3M9aC5wcm90b3R5cGUuc2V0UHJvZ3Jlc3MsaC5wcm90b3R5cGUuc2V0QnVmZmVyPWZ1bmN0aW9uKGUpe3RoaXMuYnVmZmVyYmFyXy5zdHlsZS53aWR0aD1lK1wiJVwiLHRoaXMuYXV4YmFyXy5zdHlsZS53aWR0aD0xMDAtZStcIiVcIn0saC5wcm90b3R5cGUuc2V0QnVmZmVyPWgucHJvdG90eXBlLnNldEJ1ZmZlcixoLnByb3RvdHlwZS5pbml0PWZ1bmN0aW9uKCl7aWYodGhpcy5lbGVtZW50Xyl7dmFyIGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtlLmNsYXNzTmFtZT1cInByb2dyZXNzYmFyIGJhciBiYXIxXCIsdGhpcy5lbGVtZW50Xy5hcHBlbmRDaGlsZChlKSx0aGlzLnByb2dyZXNzYmFyXz1lLGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSxlLmNsYXNzTmFtZT1cImJ1ZmZlcmJhciBiYXIgYmFyMlwiLHRoaXMuZWxlbWVudF8uYXBwZW5kQ2hpbGQoZSksdGhpcy5idWZmZXJiYXJfPWUsZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLGUuY2xhc3NOYW1lPVwiYXV4YmFyIGJhciBiYXIzXCIsdGhpcy5lbGVtZW50Xy5hcHBlbmRDaGlsZChlKSx0aGlzLmF1eGJhcl89ZSx0aGlzLnByb2dyZXNzYmFyXy5zdHlsZS53aWR0aD1cIjAlXCIsdGhpcy5idWZmZXJiYXJfLnN0eWxlLndpZHRoPVwiMTAwJVwiLHRoaXMuYXV4YmFyXy5zdHlsZS53aWR0aD1cIjAlXCIsdGhpcy5lbGVtZW50Xy5jbGFzc0xpc3QuYWRkKFwiaXMtdXBncmFkZWRcIil9fSxzLnJlZ2lzdGVyKHtjb25zdHJ1Y3RvcjpoLGNsYXNzQXNTdHJpbmc6XCJNYXRlcmlhbFByb2dyZXNzXCIsY3NzQ2xhc3M6XCJtZGwtanMtcHJvZ3Jlc3NcIix3aWRnZXQ6ITB9KTt2YXIgYz1mdW5jdGlvbihlKXt0aGlzLmVsZW1lbnRfPWUsdGhpcy5pbml0KCl9O3dpbmRvdy5NYXRlcmlhbFJhZGlvPWMsYy5wcm90b3R5cGUuQ29uc3RhbnRfPXtUSU5ZX1RJTUVPVVQ6LjAwMX0sYy5wcm90b3R5cGUuQ3NzQ2xhc3Nlc189e0lTX0ZPQ1VTRUQ6XCJpcy1mb2N1c2VkXCIsSVNfRElTQUJMRUQ6XCJpcy1kaXNhYmxlZFwiLElTX0NIRUNLRUQ6XCJpcy1jaGVja2VkXCIsSVNfVVBHUkFERUQ6XCJpcy11cGdyYWRlZFwiLEpTX1JBRElPOlwibWRsLWpzLXJhZGlvXCIsUkFESU9fQlROOlwibWRsLXJhZGlvX19idXR0b25cIixSQURJT19PVVRFUl9DSVJDTEU6XCJtZGwtcmFkaW9fX291dGVyLWNpcmNsZVwiLFJBRElPX0lOTkVSX0NJUkNMRTpcIm1kbC1yYWRpb19faW5uZXItY2lyY2xlXCIsUklQUExFX0VGRkVDVDpcIm1kbC1qcy1yaXBwbGUtZWZmZWN0XCIsUklQUExFX0lHTk9SRV9FVkVOVFM6XCJtZGwtanMtcmlwcGxlLWVmZmVjdC0taWdub3JlLWV2ZW50c1wiLFJJUFBMRV9DT05UQUlORVI6XCJtZGwtcmFkaW9fX3JpcHBsZS1jb250YWluZXJcIixSSVBQTEVfQ0VOVEVSOlwibWRsLXJpcHBsZS0tY2VudGVyXCIsUklQUExFOlwibWRsLXJpcHBsZVwifSxjLnByb3RvdHlwZS5vbkNoYW5nZV89ZnVuY3Rpb24oZSl7Zm9yKHZhciB0PWRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUodGhpcy5Dc3NDbGFzc2VzXy5KU19SQURJTykscz0wO3M8dC5sZW5ndGg7cysrKXt2YXIgaT10W3NdLnF1ZXJ5U2VsZWN0b3IoXCIuXCIrdGhpcy5Dc3NDbGFzc2VzXy5SQURJT19CVE4pO2kuZ2V0QXR0cmlidXRlKFwibmFtZVwiKT09PXRoaXMuYnRuRWxlbWVudF8uZ2V0QXR0cmlidXRlKFwibmFtZVwiKSYmdFtzXS5NYXRlcmlhbFJhZGlvLnVwZGF0ZUNsYXNzZXNfKCl9fSxjLnByb3RvdHlwZS5vbkZvY3VzXz1mdW5jdGlvbihlKXt0aGlzLmVsZW1lbnRfLmNsYXNzTGlzdC5hZGQodGhpcy5Dc3NDbGFzc2VzXy5JU19GT0NVU0VEKX0sYy5wcm90b3R5cGUub25CbHVyXz1mdW5jdGlvbihlKXt0aGlzLmVsZW1lbnRfLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5Dc3NDbGFzc2VzXy5JU19GT0NVU0VEKX0sYy5wcm90b3R5cGUub25Nb3VzZXVwXz1mdW5jdGlvbihlKXt0aGlzLmJsdXJfKCl9LGMucHJvdG90eXBlLnVwZGF0ZUNsYXNzZXNfPWZ1bmN0aW9uKCl7dGhpcy5jaGVja0Rpc2FibGVkKCksdGhpcy5jaGVja1RvZ2dsZVN0YXRlKCl9LGMucHJvdG90eXBlLmJsdXJfPWZ1bmN0aW9uKCl7d2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKXt0aGlzLmJ0bkVsZW1lbnRfLmJsdXIoKX0uYmluZCh0aGlzKSx0aGlzLkNvbnN0YW50Xy5USU5ZX1RJTUVPVVQpfSxjLnByb3RvdHlwZS5jaGVja0Rpc2FibGVkPWZ1bmN0aW9uKCl7dGhpcy5idG5FbGVtZW50Xy5kaXNhYmxlZD90aGlzLmVsZW1lbnRfLmNsYXNzTGlzdC5hZGQodGhpcy5Dc3NDbGFzc2VzXy5JU19ESVNBQkxFRCk6dGhpcy5lbGVtZW50Xy5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuQ3NzQ2xhc3Nlc18uSVNfRElTQUJMRUQpfSxjLnByb3RvdHlwZS5jaGVja0Rpc2FibGVkPWMucHJvdG90eXBlLmNoZWNrRGlzYWJsZWQsYy5wcm90b3R5cGUuY2hlY2tUb2dnbGVTdGF0ZT1mdW5jdGlvbigpe3RoaXMuYnRuRWxlbWVudF8uY2hlY2tlZD90aGlzLmVsZW1lbnRfLmNsYXNzTGlzdC5hZGQodGhpcy5Dc3NDbGFzc2VzXy5JU19DSEVDS0VEKTp0aGlzLmVsZW1lbnRfLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5Dc3NDbGFzc2VzXy5JU19DSEVDS0VEKX0sYy5wcm90b3R5cGUuY2hlY2tUb2dnbGVTdGF0ZT1jLnByb3RvdHlwZS5jaGVja1RvZ2dsZVN0YXRlLGMucHJvdG90eXBlLmRpc2FibGU9ZnVuY3Rpb24oKXt0aGlzLmJ0bkVsZW1lbnRfLmRpc2FibGVkPSEwLHRoaXMudXBkYXRlQ2xhc3Nlc18oKX0sYy5wcm90b3R5cGUuZGlzYWJsZT1jLnByb3RvdHlwZS5kaXNhYmxlLGMucHJvdG90eXBlLmVuYWJsZT1mdW5jdGlvbigpe3RoaXMuYnRuRWxlbWVudF8uZGlzYWJsZWQ9ITEsdGhpcy51cGRhdGVDbGFzc2VzXygpfSxjLnByb3RvdHlwZS5lbmFibGU9Yy5wcm90b3R5cGUuZW5hYmxlLGMucHJvdG90eXBlLmNoZWNrPWZ1bmN0aW9uKCl7dGhpcy5idG5FbGVtZW50Xy5jaGVja2VkPSEwLHRoaXMub25DaGFuZ2VfKG51bGwpfSxjLnByb3RvdHlwZS5jaGVjaz1jLnByb3RvdHlwZS5jaGVjayxjLnByb3RvdHlwZS51bmNoZWNrPWZ1bmN0aW9uKCl7dGhpcy5idG5FbGVtZW50Xy5jaGVja2VkPSExLHRoaXMub25DaGFuZ2VfKG51bGwpfSxjLnByb3RvdHlwZS51bmNoZWNrPWMucHJvdG90eXBlLnVuY2hlY2ssYy5wcm90b3R5cGUuaW5pdD1mdW5jdGlvbigpe2lmKHRoaXMuZWxlbWVudF8pe3RoaXMuYnRuRWxlbWVudF89dGhpcy5lbGVtZW50Xy5xdWVyeVNlbGVjdG9yKFwiLlwiK3RoaXMuQ3NzQ2xhc3Nlc18uUkFESU9fQlROKSx0aGlzLmJvdW5kQ2hhbmdlSGFuZGxlcl89dGhpcy5vbkNoYW5nZV8uYmluZCh0aGlzKSx0aGlzLmJvdW5kRm9jdXNIYW5kbGVyXz10aGlzLm9uQ2hhbmdlXy5iaW5kKHRoaXMpLHRoaXMuYm91bmRCbHVySGFuZGxlcl89dGhpcy5vbkJsdXJfLmJpbmQodGhpcyksdGhpcy5ib3VuZE1vdXNlVXBIYW5kbGVyXz10aGlzLm9uTW91c2V1cF8uYmluZCh0aGlzKTt2YXIgZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtlLmNsYXNzTGlzdC5hZGQodGhpcy5Dc3NDbGFzc2VzXy5SQURJT19PVVRFUl9DSVJDTEUpO3ZhciB0PWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO3QuY2xhc3NMaXN0LmFkZCh0aGlzLkNzc0NsYXNzZXNfLlJBRElPX0lOTkVSX0NJUkNMRSksdGhpcy5lbGVtZW50Xy5hcHBlbmRDaGlsZChlKSx0aGlzLmVsZW1lbnRfLmFwcGVuZENoaWxkKHQpO3ZhciBzO2lmKHRoaXMuZWxlbWVudF8uY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuQ3NzQ2xhc3Nlc18uUklQUExFX0VGRkVDVCkpe3RoaXMuZWxlbWVudF8uY2xhc3NMaXN0LmFkZCh0aGlzLkNzc0NsYXNzZXNfLlJJUFBMRV9JR05PUkVfRVZFTlRTKSxzPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpLHMuY2xhc3NMaXN0LmFkZCh0aGlzLkNzc0NsYXNzZXNfLlJJUFBMRV9DT05UQUlORVIpLHMuY2xhc3NMaXN0LmFkZCh0aGlzLkNzc0NsYXNzZXNfLlJJUFBMRV9FRkZFQ1QpLHMuY2xhc3NMaXN0LmFkZCh0aGlzLkNzc0NsYXNzZXNfLlJJUFBMRV9DRU5URVIpLHMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIix0aGlzLmJvdW5kTW91c2VVcEhhbmRsZXJfKTt2YXIgaT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtpLmNsYXNzTGlzdC5hZGQodGhpcy5Dc3NDbGFzc2VzXy5SSVBQTEUpLHMuYXBwZW5kQ2hpbGQoaSksdGhpcy5lbGVtZW50Xy5hcHBlbmRDaGlsZChzKX10aGlzLmJ0bkVsZW1lbnRfLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIix0aGlzLmJvdW5kQ2hhbmdlSGFuZGxlcl8pLHRoaXMuYnRuRWxlbWVudF8uYWRkRXZlbnRMaXN0ZW5lcihcImZvY3VzXCIsdGhpcy5ib3VuZEZvY3VzSGFuZGxlcl8pLHRoaXMuYnRuRWxlbWVudF8uYWRkRXZlbnRMaXN0ZW5lcihcImJsdXJcIix0aGlzLmJvdW5kQmx1ckhhbmRsZXJfKSx0aGlzLmVsZW1lbnRfLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsdGhpcy5ib3VuZE1vdXNlVXBIYW5kbGVyXyksdGhpcy51cGRhdGVDbGFzc2VzXygpLHRoaXMuZWxlbWVudF8uY2xhc3NMaXN0LmFkZCh0aGlzLkNzc0NsYXNzZXNfLklTX1VQR1JBREVEKX19LHMucmVnaXN0ZXIoe2NvbnN0cnVjdG9yOmMsY2xhc3NBc1N0cmluZzpcIk1hdGVyaWFsUmFkaW9cIixjc3NDbGFzczpcIm1kbC1qcy1yYWRpb1wiLHdpZGdldDohMH0pO3ZhciBwPWZ1bmN0aW9uKGUpe3RoaXMuZWxlbWVudF89ZSx0aGlzLmlzSUVfPXdpbmRvdy5uYXZpZ2F0b3IubXNQb2ludGVyRW5hYmxlZCx0aGlzLmluaXQoKX07d2luZG93Lk1hdGVyaWFsU2xpZGVyPXAscC5wcm90b3R5cGUuQ29uc3RhbnRfPXt9LHAucHJvdG90eXBlLkNzc0NsYXNzZXNfPXtJRV9DT05UQUlORVI6XCJtZGwtc2xpZGVyX19pZS1jb250YWluZXJcIixTTElERVJfQ09OVEFJTkVSOlwibWRsLXNsaWRlcl9fY29udGFpbmVyXCIsQkFDS0dST1VORF9GTEVYOlwibWRsLXNsaWRlcl9fYmFja2dyb3VuZC1mbGV4XCIsQkFDS0dST1VORF9MT1dFUjpcIm1kbC1zbGlkZXJfX2JhY2tncm91bmQtbG93ZXJcIixCQUNLR1JPVU5EX1VQUEVSOlwibWRsLXNsaWRlcl9fYmFja2dyb3VuZC11cHBlclwiLElTX0xPV0VTVF9WQUxVRTpcImlzLWxvd2VzdC12YWx1ZVwiLElTX1VQR1JBREVEOlwiaXMtdXBncmFkZWRcIn0scC5wcm90b3R5cGUub25JbnB1dF89ZnVuY3Rpb24oZSl7dGhpcy51cGRhdGVWYWx1ZVN0eWxlc18oKX0scC5wcm90b3R5cGUub25DaGFuZ2VfPWZ1bmN0aW9uKGUpe3RoaXMudXBkYXRlVmFsdWVTdHlsZXNfKCl9LHAucHJvdG90eXBlLm9uTW91c2VVcF89ZnVuY3Rpb24oZSl7ZS50YXJnZXQuYmx1cigpfSxwLnByb3RvdHlwZS5vbkNvbnRhaW5lck1vdXNlRG93bl89ZnVuY3Rpb24oZSl7aWYoZS50YXJnZXQ9PT10aGlzLmVsZW1lbnRfLnBhcmVudEVsZW1lbnQpe2UucHJldmVudERlZmF1bHQoKTt2YXIgdD1uZXcgTW91c2VFdmVudChcIm1vdXNlZG93blwiLHt0YXJnZXQ6ZS50YXJnZXQsYnV0dG9uczplLmJ1dHRvbnMsY2xpZW50WDplLmNsaWVudFgsY2xpZW50WTp0aGlzLmVsZW1lbnRfLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnl9KTt0aGlzLmVsZW1lbnRfLmRpc3BhdGNoRXZlbnQodCl9fSxwLnByb3RvdHlwZS51cGRhdGVWYWx1ZVN0eWxlc189ZnVuY3Rpb24oKXt2YXIgZT0odGhpcy5lbGVtZW50Xy52YWx1ZS10aGlzLmVsZW1lbnRfLm1pbikvKHRoaXMuZWxlbWVudF8ubWF4LXRoaXMuZWxlbWVudF8ubWluKTswPT09ZT90aGlzLmVsZW1lbnRfLmNsYXNzTGlzdC5hZGQodGhpcy5Dc3NDbGFzc2VzXy5JU19MT1dFU1RfVkFMVUUpOnRoaXMuZWxlbWVudF8uY2xhc3NMaXN0LnJlbW92ZSh0aGlzLkNzc0NsYXNzZXNfLklTX0xPV0VTVF9WQUxVRSksdGhpcy5pc0lFX3x8KHRoaXMuYmFja2dyb3VuZExvd2VyXy5zdHlsZS5mbGV4PWUsdGhpcy5iYWNrZ3JvdW5kTG93ZXJfLnN0eWxlLndlYmtpdEZsZXg9ZSx0aGlzLmJhY2tncm91bmRVcHBlcl8uc3R5bGUuZmxleD0xLWUsdGhpcy5iYWNrZ3JvdW5kVXBwZXJfLnN0eWxlLndlYmtpdEZsZXg9MS1lKX0scC5wcm90b3R5cGUuZGlzYWJsZT1mdW5jdGlvbigpe3RoaXMuZWxlbWVudF8uZGlzYWJsZWQ9ITB9LHAucHJvdG90eXBlLmRpc2FibGU9cC5wcm90b3R5cGUuZGlzYWJsZSxwLnByb3RvdHlwZS5lbmFibGU9ZnVuY3Rpb24oKXt0aGlzLmVsZW1lbnRfLmRpc2FibGVkPSExfSxwLnByb3RvdHlwZS5lbmFibGU9cC5wcm90b3R5cGUuZW5hYmxlLHAucHJvdG90eXBlLmNoYW5nZT1mdW5jdGlvbihlKXtcInVuZGVmaW5lZFwiIT10eXBlb2YgZSYmKHRoaXMuZWxlbWVudF8udmFsdWU9ZSksdGhpcy51cGRhdGVWYWx1ZVN0eWxlc18oKX0scC5wcm90b3R5cGUuY2hhbmdlPXAucHJvdG90eXBlLmNoYW5nZSxwLnByb3RvdHlwZS5pbml0PWZ1bmN0aW9uKCl7aWYodGhpcy5lbGVtZW50Xyl7aWYodGhpcy5pc0lFXyl7dmFyIGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtlLmNsYXNzTGlzdC5hZGQodGhpcy5Dc3NDbGFzc2VzXy5JRV9DT05UQUlORVIpLHRoaXMuZWxlbWVudF8ucGFyZW50RWxlbWVudC5pbnNlcnRCZWZvcmUoZSx0aGlzLmVsZW1lbnRfKSx0aGlzLmVsZW1lbnRfLnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQodGhpcy5lbGVtZW50XyksZS5hcHBlbmRDaGlsZCh0aGlzLmVsZW1lbnRfKX1lbHNle3ZhciB0PWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7dC5jbGFzc0xpc3QuYWRkKHRoaXMuQ3NzQ2xhc3Nlc18uU0xJREVSX0NPTlRBSU5FUiksdGhpcy5lbGVtZW50Xy5wYXJlbnRFbGVtZW50Lmluc2VydEJlZm9yZSh0LHRoaXMuZWxlbWVudF8pLHRoaXMuZWxlbWVudF8ucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZCh0aGlzLmVsZW1lbnRfKSx0LmFwcGVuZENoaWxkKHRoaXMuZWxlbWVudF8pO3ZhciBzPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7cy5jbGFzc0xpc3QuYWRkKHRoaXMuQ3NzQ2xhc3Nlc18uQkFDS0dST1VORF9GTEVYKSx0LmFwcGVuZENoaWxkKHMpLHRoaXMuYmFja2dyb3VuZExvd2VyXz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLHRoaXMuYmFja2dyb3VuZExvd2VyXy5jbGFzc0xpc3QuYWRkKHRoaXMuQ3NzQ2xhc3Nlc18uQkFDS0dST1VORF9MT1dFUikscy5hcHBlbmRDaGlsZCh0aGlzLmJhY2tncm91bmRMb3dlcl8pLHRoaXMuYmFja2dyb3VuZFVwcGVyXz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLHRoaXMuYmFja2dyb3VuZFVwcGVyXy5jbGFzc0xpc3QuYWRkKHRoaXMuQ3NzQ2xhc3Nlc18uQkFDS0dST1VORF9VUFBFUikscy5hcHBlbmRDaGlsZCh0aGlzLmJhY2tncm91bmRVcHBlcl8pfXRoaXMuYm91bmRJbnB1dEhhbmRsZXI9dGhpcy5vbklucHV0Xy5iaW5kKHRoaXMpLHRoaXMuYm91bmRDaGFuZ2VIYW5kbGVyPXRoaXMub25DaGFuZ2VfLmJpbmQodGhpcyksdGhpcy5ib3VuZE1vdXNlVXBIYW5kbGVyPXRoaXMub25Nb3VzZVVwXy5iaW5kKHRoaXMpLHRoaXMuYm91bmRDb250YWluZXJNb3VzZURvd25IYW5kbGVyPXRoaXMub25Db250YWluZXJNb3VzZURvd25fLmJpbmQodGhpcyksdGhpcy5lbGVtZW50Xy5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIix0aGlzLmJvdW5kSW5wdXRIYW5kbGVyKSx0aGlzLmVsZW1lbnRfLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIix0aGlzLmJvdW5kQ2hhbmdlSGFuZGxlciksdGhpcy5lbGVtZW50Xy5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLHRoaXMuYm91bmRNb3VzZVVwSGFuZGxlciksdGhpcy5lbGVtZW50Xy5wYXJlbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIix0aGlzLmJvdW5kQ29udGFpbmVyTW91c2VEb3duSGFuZGxlciksdGhpcy51cGRhdGVWYWx1ZVN0eWxlc18oKSx0aGlzLmVsZW1lbnRfLmNsYXNzTGlzdC5hZGQodGhpcy5Dc3NDbGFzc2VzXy5JU19VUEdSQURFRCl9fSxzLnJlZ2lzdGVyKHtjb25zdHJ1Y3RvcjpwLGNsYXNzQXNTdHJpbmc6XCJNYXRlcmlhbFNsaWRlclwiLGNzc0NsYXNzOlwibWRsLWpzLXNsaWRlclwiLHdpZGdldDohMH0pO3ZhciBDPWZ1bmN0aW9uKGUpe2lmKHRoaXMuZWxlbWVudF89ZSx0aGlzLnRleHRFbGVtZW50Xz10aGlzLmVsZW1lbnRfLnF1ZXJ5U2VsZWN0b3IoXCIuXCIrdGhpcy5jc3NDbGFzc2VzXy5NRVNTQUdFKSx0aGlzLmFjdGlvbkVsZW1lbnRfPXRoaXMuZWxlbWVudF8ucXVlcnlTZWxlY3RvcihcIi5cIit0aGlzLmNzc0NsYXNzZXNfLkFDVElPTiksIXRoaXMudGV4dEVsZW1lbnRfKXRocm93IG5ldyBFcnJvcihcIlRoZXJlIG11c3QgYmUgYSBtZXNzYWdlIGVsZW1lbnQgZm9yIGEgc25hY2tiYXIuXCIpO2lmKCF0aGlzLmFjdGlvbkVsZW1lbnRfKXRocm93IG5ldyBFcnJvcihcIlRoZXJlIG11c3QgYmUgYW4gYWN0aW9uIGVsZW1lbnQgZm9yIGEgc25hY2tiYXIuXCIpO3RoaXMuYWN0aXZlPSExLHRoaXMuYWN0aW9uSGFuZGxlcl89dm9pZCAwLHRoaXMubWVzc2FnZV89dm9pZCAwLHRoaXMuYWN0aW9uVGV4dF89dm9pZCAwLHRoaXMucXVldWVkTm90aWZpY2F0aW9uc189W10sdGhpcy5zZXRBY3Rpb25IaWRkZW5fKCEwKX07d2luZG93Lk1hdGVyaWFsU25hY2tiYXI9QyxDLnByb3RvdHlwZS5Db25zdGFudF89e0FOSU1BVElPTl9MRU5HVEg6MjUwfSxDLnByb3RvdHlwZS5jc3NDbGFzc2VzXz17U05BQ0tCQVI6XCJtZGwtc25hY2tiYXJcIixNRVNTQUdFOlwibWRsLXNuYWNrYmFyX190ZXh0XCIsQUNUSU9OOlwibWRsLXNuYWNrYmFyX19hY3Rpb25cIixBQ1RJVkU6XCJtZGwtc25hY2tiYXItLWFjdGl2ZVwifSxDLnByb3RvdHlwZS5kaXNwbGF5U25hY2tiYXJfPWZ1bmN0aW9uKCl7dGhpcy5lbGVtZW50Xy5zZXRBdHRyaWJ1dGUoXCJhcmlhLWhpZGRlblwiLFwidHJ1ZVwiKSx0aGlzLmFjdGlvbkhhbmRsZXJfJiYodGhpcy5hY3Rpb25FbGVtZW50Xy50ZXh0Q29udGVudD10aGlzLmFjdGlvblRleHRfLFxudGhpcy5hY3Rpb25FbGVtZW50Xy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIix0aGlzLmFjdGlvbkhhbmRsZXJfKSx0aGlzLnNldEFjdGlvbkhpZGRlbl8oITEpKSx0aGlzLnRleHRFbGVtZW50Xy50ZXh0Q29udGVudD10aGlzLm1lc3NhZ2VfLHRoaXMuZWxlbWVudF8uY2xhc3NMaXN0LmFkZCh0aGlzLmNzc0NsYXNzZXNfLkFDVElWRSksdGhpcy5lbGVtZW50Xy5zZXRBdHRyaWJ1dGUoXCJhcmlhLWhpZGRlblwiLFwiZmFsc2VcIiksc2V0VGltZW91dCh0aGlzLmNsZWFudXBfLmJpbmQodGhpcyksdGhpcy50aW1lb3V0Xyl9LEMucHJvdG90eXBlLnNob3dTbmFja2Jhcj1mdW5jdGlvbihlKXtpZih2b2lkIDA9PT1lKXRocm93IG5ldyBFcnJvcihcIlBsZWFzZSBwcm92aWRlIGEgZGF0YSBvYmplY3Qgd2l0aCBhdCBsZWFzdCBhIG1lc3NhZ2UgdG8gZGlzcGxheS5cIik7aWYodm9pZCAwPT09ZS5tZXNzYWdlKXRocm93IG5ldyBFcnJvcihcIlBsZWFzZSBwcm92aWRlIGEgbWVzc2FnZSB0byBiZSBkaXNwbGF5ZWQuXCIpO2lmKGUuYWN0aW9uSGFuZGxlciYmIWUuYWN0aW9uVGV4dCl0aHJvdyBuZXcgRXJyb3IoXCJQbGVhc2UgcHJvdmlkZSBhY3Rpb24gdGV4dCB3aXRoIHRoZSBoYW5kbGVyLlwiKTt0aGlzLmFjdGl2ZT90aGlzLnF1ZXVlZE5vdGlmaWNhdGlvbnNfLnB1c2goZSk6KHRoaXMuYWN0aXZlPSEwLHRoaXMubWVzc2FnZV89ZS5tZXNzYWdlLGUudGltZW91dD90aGlzLnRpbWVvdXRfPWUudGltZW91dDp0aGlzLnRpbWVvdXRfPTI3NTAsZS5hY3Rpb25IYW5kbGVyJiYodGhpcy5hY3Rpb25IYW5kbGVyXz1lLmFjdGlvbkhhbmRsZXIpLGUuYWN0aW9uVGV4dCYmKHRoaXMuYWN0aW9uVGV4dF89ZS5hY3Rpb25UZXh0KSx0aGlzLmRpc3BsYXlTbmFja2Jhcl8oKSl9LEMucHJvdG90eXBlLnNob3dTbmFja2Jhcj1DLnByb3RvdHlwZS5zaG93U25hY2tiYXIsQy5wcm90b3R5cGUuY2hlY2tRdWV1ZV89ZnVuY3Rpb24oKXt0aGlzLnF1ZXVlZE5vdGlmaWNhdGlvbnNfLmxlbmd0aD4wJiZ0aGlzLnNob3dTbmFja2Jhcih0aGlzLnF1ZXVlZE5vdGlmaWNhdGlvbnNfLnNoaWZ0KCkpfSxDLnByb3RvdHlwZS5jbGVhbnVwXz1mdW5jdGlvbigpe3RoaXMuZWxlbWVudF8uY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmNzc0NsYXNzZXNfLkFDVElWRSksc2V0VGltZW91dChmdW5jdGlvbigpe3RoaXMuZWxlbWVudF8uc2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIixcInRydWVcIiksdGhpcy50ZXh0RWxlbWVudF8udGV4dENvbnRlbnQ9XCJcIixCb29sZWFuKHRoaXMuYWN0aW9uRWxlbWVudF8uZ2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIikpfHwodGhpcy5zZXRBY3Rpb25IaWRkZW5fKCEwKSx0aGlzLmFjdGlvbkVsZW1lbnRfLnRleHRDb250ZW50PVwiXCIsdGhpcy5hY3Rpb25FbGVtZW50Xy5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIix0aGlzLmFjdGlvbkhhbmRsZXJfKSksdGhpcy5hY3Rpb25IYW5kbGVyXz12b2lkIDAsdGhpcy5tZXNzYWdlXz12b2lkIDAsdGhpcy5hY3Rpb25UZXh0Xz12b2lkIDAsdGhpcy5hY3RpdmU9ITEsdGhpcy5jaGVja1F1ZXVlXygpfS5iaW5kKHRoaXMpLHRoaXMuQ29uc3RhbnRfLkFOSU1BVElPTl9MRU5HVEgpfSxDLnByb3RvdHlwZS5zZXRBY3Rpb25IaWRkZW5fPWZ1bmN0aW9uKGUpe2U/dGhpcy5hY3Rpb25FbGVtZW50Xy5zZXRBdHRyaWJ1dGUoXCJhcmlhLWhpZGRlblwiLFwidHJ1ZVwiKTp0aGlzLmFjdGlvbkVsZW1lbnRfLnJlbW92ZUF0dHJpYnV0ZShcImFyaWEtaGlkZGVuXCIpfSxzLnJlZ2lzdGVyKHtjb25zdHJ1Y3RvcjpDLGNsYXNzQXNTdHJpbmc6XCJNYXRlcmlhbFNuYWNrYmFyXCIsY3NzQ2xhc3M6XCJtZGwtanMtc25hY2tiYXJcIix3aWRnZXQ6ITB9KTt2YXIgdT1mdW5jdGlvbihlKXt0aGlzLmVsZW1lbnRfPWUsdGhpcy5pbml0KCl9O3dpbmRvdy5NYXRlcmlhbFNwaW5uZXI9dSx1LnByb3RvdHlwZS5Db25zdGFudF89e01ETF9TUElOTkVSX0xBWUVSX0NPVU5UOjR9LHUucHJvdG90eXBlLkNzc0NsYXNzZXNfPXtNRExfU1BJTk5FUl9MQVlFUjpcIm1kbC1zcGlubmVyX19sYXllclwiLE1ETF9TUElOTkVSX0NJUkNMRV9DTElQUEVSOlwibWRsLXNwaW5uZXJfX2NpcmNsZS1jbGlwcGVyXCIsTURMX1NQSU5ORVJfQ0lSQ0xFOlwibWRsLXNwaW5uZXJfX2NpcmNsZVwiLE1ETF9TUElOTkVSX0dBUF9QQVRDSDpcIm1kbC1zcGlubmVyX19nYXAtcGF0Y2hcIixNRExfU1BJTk5FUl9MRUZUOlwibWRsLXNwaW5uZXJfX2xlZnRcIixNRExfU1BJTk5FUl9SSUdIVDpcIm1kbC1zcGlubmVyX19yaWdodFwifSx1LnByb3RvdHlwZS5jcmVhdGVMYXllcj1mdW5jdGlvbihlKXt2YXIgdD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO3QuY2xhc3NMaXN0LmFkZCh0aGlzLkNzc0NsYXNzZXNfLk1ETF9TUElOTkVSX0xBWUVSKSx0LmNsYXNzTGlzdC5hZGQodGhpcy5Dc3NDbGFzc2VzXy5NRExfU1BJTk5FUl9MQVlFUitcIi1cIitlKTt2YXIgcz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO3MuY2xhc3NMaXN0LmFkZCh0aGlzLkNzc0NsYXNzZXNfLk1ETF9TUElOTkVSX0NJUkNMRV9DTElQUEVSKSxzLmNsYXNzTGlzdC5hZGQodGhpcy5Dc3NDbGFzc2VzXy5NRExfU1BJTk5FUl9MRUZUKTt2YXIgaT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO2kuY2xhc3NMaXN0LmFkZCh0aGlzLkNzc0NsYXNzZXNfLk1ETF9TUElOTkVSX0dBUF9QQVRDSCk7dmFyIG49ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtuLmNsYXNzTGlzdC5hZGQodGhpcy5Dc3NDbGFzc2VzXy5NRExfU1BJTk5FUl9DSVJDTEVfQ0xJUFBFUiksbi5jbGFzc0xpc3QuYWRkKHRoaXMuQ3NzQ2xhc3Nlc18uTURMX1NQSU5ORVJfUklHSFQpO2Zvcih2YXIgYT1bcyxpLG5dLGw9MDtsPGEubGVuZ3RoO2wrKyl7dmFyIG89ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtvLmNsYXNzTGlzdC5hZGQodGhpcy5Dc3NDbGFzc2VzXy5NRExfU1BJTk5FUl9DSVJDTEUpLGFbbF0uYXBwZW5kQ2hpbGQobyl9dC5hcHBlbmRDaGlsZChzKSx0LmFwcGVuZENoaWxkKGkpLHQuYXBwZW5kQ2hpbGQobiksdGhpcy5lbGVtZW50Xy5hcHBlbmRDaGlsZCh0KX0sdS5wcm90b3R5cGUuY3JlYXRlTGF5ZXI9dS5wcm90b3R5cGUuY3JlYXRlTGF5ZXIsdS5wcm90b3R5cGUuc3RvcD1mdW5jdGlvbigpe3RoaXMuZWxlbWVudF8uY2xhc3NMaXN0LnJlbW92ZShcImlzLWFjdGl2ZVwiKX0sdS5wcm90b3R5cGUuc3RvcD11LnByb3RvdHlwZS5zdG9wLHUucHJvdG90eXBlLnN0YXJ0PWZ1bmN0aW9uKCl7dGhpcy5lbGVtZW50Xy5jbGFzc0xpc3QuYWRkKFwiaXMtYWN0aXZlXCIpfSx1LnByb3RvdHlwZS5zdGFydD11LnByb3RvdHlwZS5zdGFydCx1LnByb3RvdHlwZS5pbml0PWZ1bmN0aW9uKCl7aWYodGhpcy5lbGVtZW50Xyl7Zm9yKHZhciBlPTE7ZTw9dGhpcy5Db25zdGFudF8uTURMX1NQSU5ORVJfTEFZRVJfQ09VTlQ7ZSsrKXRoaXMuY3JlYXRlTGF5ZXIoZSk7dGhpcy5lbGVtZW50Xy5jbGFzc0xpc3QuYWRkKFwiaXMtdXBncmFkZWRcIil9fSxzLnJlZ2lzdGVyKHtjb25zdHJ1Y3Rvcjp1LGNsYXNzQXNTdHJpbmc6XCJNYXRlcmlhbFNwaW5uZXJcIixjc3NDbGFzczpcIm1kbC1qcy1zcGlubmVyXCIsd2lkZ2V0OiEwfSk7dmFyIEU9ZnVuY3Rpb24oZSl7dGhpcy5lbGVtZW50Xz1lLHRoaXMuaW5pdCgpfTt3aW5kb3cuTWF0ZXJpYWxTd2l0Y2g9RSxFLnByb3RvdHlwZS5Db25zdGFudF89e1RJTllfVElNRU9VVDouMDAxfSxFLnByb3RvdHlwZS5Dc3NDbGFzc2VzXz17SU5QVVQ6XCJtZGwtc3dpdGNoX19pbnB1dFwiLFRSQUNLOlwibWRsLXN3aXRjaF9fdHJhY2tcIixUSFVNQjpcIm1kbC1zd2l0Y2hfX3RodW1iXCIsRk9DVVNfSEVMUEVSOlwibWRsLXN3aXRjaF9fZm9jdXMtaGVscGVyXCIsUklQUExFX0VGRkVDVDpcIm1kbC1qcy1yaXBwbGUtZWZmZWN0XCIsUklQUExFX0lHTk9SRV9FVkVOVFM6XCJtZGwtanMtcmlwcGxlLWVmZmVjdC0taWdub3JlLWV2ZW50c1wiLFJJUFBMRV9DT05UQUlORVI6XCJtZGwtc3dpdGNoX19yaXBwbGUtY29udGFpbmVyXCIsUklQUExFX0NFTlRFUjpcIm1kbC1yaXBwbGUtLWNlbnRlclwiLFJJUFBMRTpcIm1kbC1yaXBwbGVcIixJU19GT0NVU0VEOlwiaXMtZm9jdXNlZFwiLElTX0RJU0FCTEVEOlwiaXMtZGlzYWJsZWRcIixJU19DSEVDS0VEOlwiaXMtY2hlY2tlZFwifSxFLnByb3RvdHlwZS5vbkNoYW5nZV89ZnVuY3Rpb24oZSl7dGhpcy51cGRhdGVDbGFzc2VzXygpfSxFLnByb3RvdHlwZS5vbkZvY3VzXz1mdW5jdGlvbihlKXt0aGlzLmVsZW1lbnRfLmNsYXNzTGlzdC5hZGQodGhpcy5Dc3NDbGFzc2VzXy5JU19GT0NVU0VEKX0sRS5wcm90b3R5cGUub25CbHVyXz1mdW5jdGlvbihlKXt0aGlzLmVsZW1lbnRfLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5Dc3NDbGFzc2VzXy5JU19GT0NVU0VEKX0sRS5wcm90b3R5cGUub25Nb3VzZVVwXz1mdW5jdGlvbihlKXt0aGlzLmJsdXJfKCl9LEUucHJvdG90eXBlLnVwZGF0ZUNsYXNzZXNfPWZ1bmN0aW9uKCl7dGhpcy5jaGVja0Rpc2FibGVkKCksdGhpcy5jaGVja1RvZ2dsZVN0YXRlKCl9LEUucHJvdG90eXBlLmJsdXJfPWZ1bmN0aW9uKCl7d2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKXt0aGlzLmlucHV0RWxlbWVudF8uYmx1cigpfS5iaW5kKHRoaXMpLHRoaXMuQ29uc3RhbnRfLlRJTllfVElNRU9VVCl9LEUucHJvdG90eXBlLmNoZWNrRGlzYWJsZWQ9ZnVuY3Rpb24oKXt0aGlzLmlucHV0RWxlbWVudF8uZGlzYWJsZWQ/dGhpcy5lbGVtZW50Xy5jbGFzc0xpc3QuYWRkKHRoaXMuQ3NzQ2xhc3Nlc18uSVNfRElTQUJMRUQpOnRoaXMuZWxlbWVudF8uY2xhc3NMaXN0LnJlbW92ZSh0aGlzLkNzc0NsYXNzZXNfLklTX0RJU0FCTEVEKX0sRS5wcm90b3R5cGUuY2hlY2tEaXNhYmxlZD1FLnByb3RvdHlwZS5jaGVja0Rpc2FibGVkLEUucHJvdG90eXBlLmNoZWNrVG9nZ2xlU3RhdGU9ZnVuY3Rpb24oKXt0aGlzLmlucHV0RWxlbWVudF8uY2hlY2tlZD90aGlzLmVsZW1lbnRfLmNsYXNzTGlzdC5hZGQodGhpcy5Dc3NDbGFzc2VzXy5JU19DSEVDS0VEKTp0aGlzLmVsZW1lbnRfLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5Dc3NDbGFzc2VzXy5JU19DSEVDS0VEKX0sRS5wcm90b3R5cGUuY2hlY2tUb2dnbGVTdGF0ZT1FLnByb3RvdHlwZS5jaGVja1RvZ2dsZVN0YXRlLEUucHJvdG90eXBlLmRpc2FibGU9ZnVuY3Rpb24oKXt0aGlzLmlucHV0RWxlbWVudF8uZGlzYWJsZWQ9ITAsdGhpcy51cGRhdGVDbGFzc2VzXygpfSxFLnByb3RvdHlwZS5kaXNhYmxlPUUucHJvdG90eXBlLmRpc2FibGUsRS5wcm90b3R5cGUuZW5hYmxlPWZ1bmN0aW9uKCl7dGhpcy5pbnB1dEVsZW1lbnRfLmRpc2FibGVkPSExLHRoaXMudXBkYXRlQ2xhc3Nlc18oKX0sRS5wcm90b3R5cGUuZW5hYmxlPUUucHJvdG90eXBlLmVuYWJsZSxFLnByb3RvdHlwZS5vbj1mdW5jdGlvbigpe3RoaXMuaW5wdXRFbGVtZW50Xy5jaGVja2VkPSEwLHRoaXMudXBkYXRlQ2xhc3Nlc18oKX0sRS5wcm90b3R5cGUub249RS5wcm90b3R5cGUub24sRS5wcm90b3R5cGUub2ZmPWZ1bmN0aW9uKCl7dGhpcy5pbnB1dEVsZW1lbnRfLmNoZWNrZWQ9ITEsdGhpcy51cGRhdGVDbGFzc2VzXygpfSxFLnByb3RvdHlwZS5vZmY9RS5wcm90b3R5cGUub2ZmLEUucHJvdG90eXBlLmluaXQ9ZnVuY3Rpb24oKXtpZih0aGlzLmVsZW1lbnRfKXt0aGlzLmlucHV0RWxlbWVudF89dGhpcy5lbGVtZW50Xy5xdWVyeVNlbGVjdG9yKFwiLlwiK3RoaXMuQ3NzQ2xhc3Nlc18uSU5QVVQpO3ZhciBlPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7ZS5jbGFzc0xpc3QuYWRkKHRoaXMuQ3NzQ2xhc3Nlc18uVFJBQ0spO3ZhciB0PWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7dC5jbGFzc0xpc3QuYWRkKHRoaXMuQ3NzQ2xhc3Nlc18uVEhVTUIpO3ZhciBzPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO2lmKHMuY2xhc3NMaXN0LmFkZCh0aGlzLkNzc0NsYXNzZXNfLkZPQ1VTX0hFTFBFUiksdC5hcHBlbmRDaGlsZChzKSx0aGlzLmVsZW1lbnRfLmFwcGVuZENoaWxkKGUpLHRoaXMuZWxlbWVudF8uYXBwZW5kQ2hpbGQodCksdGhpcy5ib3VuZE1vdXNlVXBIYW5kbGVyPXRoaXMub25Nb3VzZVVwXy5iaW5kKHRoaXMpLHRoaXMuZWxlbWVudF8uY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuQ3NzQ2xhc3Nlc18uUklQUExFX0VGRkVDVCkpe3RoaXMuZWxlbWVudF8uY2xhc3NMaXN0LmFkZCh0aGlzLkNzc0NsYXNzZXNfLlJJUFBMRV9JR05PUkVfRVZFTlRTKSx0aGlzLnJpcHBsZUNvbnRhaW5lckVsZW1lbnRfPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpLHRoaXMucmlwcGxlQ29udGFpbmVyRWxlbWVudF8uY2xhc3NMaXN0LmFkZCh0aGlzLkNzc0NsYXNzZXNfLlJJUFBMRV9DT05UQUlORVIpLHRoaXMucmlwcGxlQ29udGFpbmVyRWxlbWVudF8uY2xhc3NMaXN0LmFkZCh0aGlzLkNzc0NsYXNzZXNfLlJJUFBMRV9FRkZFQ1QpLHRoaXMucmlwcGxlQ29udGFpbmVyRWxlbWVudF8uY2xhc3NMaXN0LmFkZCh0aGlzLkNzc0NsYXNzZXNfLlJJUFBMRV9DRU5URVIpLHRoaXMucmlwcGxlQ29udGFpbmVyRWxlbWVudF8uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIix0aGlzLmJvdW5kTW91c2VVcEhhbmRsZXIpO3ZhciBpPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO2kuY2xhc3NMaXN0LmFkZCh0aGlzLkNzc0NsYXNzZXNfLlJJUFBMRSksdGhpcy5yaXBwbGVDb250YWluZXJFbGVtZW50Xy5hcHBlbmRDaGlsZChpKSx0aGlzLmVsZW1lbnRfLmFwcGVuZENoaWxkKHRoaXMucmlwcGxlQ29udGFpbmVyRWxlbWVudF8pfXRoaXMuYm91bmRDaGFuZ2VIYW5kbGVyPXRoaXMub25DaGFuZ2VfLmJpbmQodGhpcyksdGhpcy5ib3VuZEZvY3VzSGFuZGxlcj10aGlzLm9uRm9jdXNfLmJpbmQodGhpcyksdGhpcy5ib3VuZEJsdXJIYW5kbGVyPXRoaXMub25CbHVyXy5iaW5kKHRoaXMpLHRoaXMuaW5wdXRFbGVtZW50Xy5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsdGhpcy5ib3VuZENoYW5nZUhhbmRsZXIpLHRoaXMuaW5wdXRFbGVtZW50Xy5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNcIix0aGlzLmJvdW5kRm9jdXNIYW5kbGVyKSx0aGlzLmlucHV0RWxlbWVudF8uYWRkRXZlbnRMaXN0ZW5lcihcImJsdXJcIix0aGlzLmJvdW5kQmx1ckhhbmRsZXIpLHRoaXMuZWxlbWVudF8uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIix0aGlzLmJvdW5kTW91c2VVcEhhbmRsZXIpLHRoaXMudXBkYXRlQ2xhc3Nlc18oKSx0aGlzLmVsZW1lbnRfLmNsYXNzTGlzdC5hZGQoXCJpcy11cGdyYWRlZFwiKX19LHMucmVnaXN0ZXIoe2NvbnN0cnVjdG9yOkUsY2xhc3NBc1N0cmluZzpcIk1hdGVyaWFsU3dpdGNoXCIsY3NzQ2xhc3M6XCJtZGwtanMtc3dpdGNoXCIsd2lkZ2V0OiEwfSk7dmFyIG09ZnVuY3Rpb24oZSl7dGhpcy5lbGVtZW50Xz1lLHRoaXMuaW5pdCgpfTt3aW5kb3cuTWF0ZXJpYWxUYWJzPW0sbS5wcm90b3R5cGUuQ29uc3RhbnRfPXt9LG0ucHJvdG90eXBlLkNzc0NsYXNzZXNfPXtUQUJfQ0xBU1M6XCJtZGwtdGFic19fdGFiXCIsUEFORUxfQ0xBU1M6XCJtZGwtdGFic19fcGFuZWxcIixBQ1RJVkVfQ0xBU1M6XCJpcy1hY3RpdmVcIixVUEdSQURFRF9DTEFTUzpcImlzLXVwZ3JhZGVkXCIsTURMX0pTX1JJUFBMRV9FRkZFQ1Q6XCJtZGwtanMtcmlwcGxlLWVmZmVjdFwiLE1ETF9SSVBQTEVfQ09OVEFJTkVSOlwibWRsLXRhYnNfX3JpcHBsZS1jb250YWluZXJcIixNRExfUklQUExFOlwibWRsLXJpcHBsZVwiLE1ETF9KU19SSVBQTEVfRUZGRUNUX0lHTk9SRV9FVkVOVFM6XCJtZGwtanMtcmlwcGxlLWVmZmVjdC0taWdub3JlLWV2ZW50c1wifSxtLnByb3RvdHlwZS5pbml0VGFic189ZnVuY3Rpb24oKXt0aGlzLmVsZW1lbnRfLmNsYXNzTGlzdC5jb250YWlucyh0aGlzLkNzc0NsYXNzZXNfLk1ETF9KU19SSVBQTEVfRUZGRUNUKSYmdGhpcy5lbGVtZW50Xy5jbGFzc0xpc3QuYWRkKHRoaXMuQ3NzQ2xhc3Nlc18uTURMX0pTX1JJUFBMRV9FRkZFQ1RfSUdOT1JFX0VWRU5UUyksdGhpcy50YWJzXz10aGlzLmVsZW1lbnRfLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuXCIrdGhpcy5Dc3NDbGFzc2VzXy5UQUJfQ0xBU1MpLHRoaXMucGFuZWxzXz10aGlzLmVsZW1lbnRfLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuXCIrdGhpcy5Dc3NDbGFzc2VzXy5QQU5FTF9DTEFTUyk7Zm9yKHZhciB0PTA7dDx0aGlzLnRhYnNfLmxlbmd0aDt0KyspbmV3IGUodGhpcy50YWJzX1t0XSx0aGlzKTt0aGlzLmVsZW1lbnRfLmNsYXNzTGlzdC5hZGQodGhpcy5Dc3NDbGFzc2VzXy5VUEdSQURFRF9DTEFTUyl9LG0ucHJvdG90eXBlLnJlc2V0VGFiU3RhdGVfPWZ1bmN0aW9uKCl7Zm9yKHZhciBlPTA7ZTx0aGlzLnRhYnNfLmxlbmd0aDtlKyspdGhpcy50YWJzX1tlXS5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuQ3NzQ2xhc3Nlc18uQUNUSVZFX0NMQVNTKX0sbS5wcm90b3R5cGUucmVzZXRQYW5lbFN0YXRlXz1mdW5jdGlvbigpe2Zvcih2YXIgZT0wO2U8dGhpcy5wYW5lbHNfLmxlbmd0aDtlKyspdGhpcy5wYW5lbHNfW2VdLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5Dc3NDbGFzc2VzXy5BQ1RJVkVfQ0xBU1MpfSxtLnByb3RvdHlwZS5pbml0PWZ1bmN0aW9uKCl7dGhpcy5lbGVtZW50XyYmdGhpcy5pbml0VGFic18oKX0scy5yZWdpc3Rlcih7Y29uc3RydWN0b3I6bSxjbGFzc0FzU3RyaW5nOlwiTWF0ZXJpYWxUYWJzXCIsY3NzQ2xhc3M6XCJtZGwtanMtdGFic1wifSk7dmFyIEw9ZnVuY3Rpb24oZSl7dGhpcy5lbGVtZW50Xz1lLHRoaXMubWF4Um93cz10aGlzLkNvbnN0YW50Xy5OT19NQVhfUk9XUyx0aGlzLmluaXQoKX07d2luZG93Lk1hdGVyaWFsVGV4dGZpZWxkPUwsTC5wcm90b3R5cGUuQ29uc3RhbnRfPXtOT19NQVhfUk9XUzotMSxNQVhfUk9XU19BVFRSSUJVVEU6XCJtYXhyb3dzXCJ9LEwucHJvdG90eXBlLkNzc0NsYXNzZXNfPXtMQUJFTDpcIm1kbC10ZXh0ZmllbGRfX2xhYmVsXCIsSU5QVVQ6XCJtZGwtdGV4dGZpZWxkX19pbnB1dFwiLElTX0RJUlRZOlwiaXMtZGlydHlcIixJU19GT0NVU0VEOlwiaXMtZm9jdXNlZFwiLElTX0RJU0FCTEVEOlwiaXMtZGlzYWJsZWRcIixJU19JTlZBTElEOlwiaXMtaW52YWxpZFwiLElTX1VQR1JBREVEOlwiaXMtdXBncmFkZWRcIixIQVNfUExBQ0VIT0xERVI6XCJoYXMtcGxhY2Vob2xkZXJcIn0sTC5wcm90b3R5cGUub25LZXlEb3duXz1mdW5jdGlvbihlKXt2YXIgdD1lLnRhcmdldC52YWx1ZS5zcGxpdChcIlxcblwiKS5sZW5ndGg7MTM9PT1lLmtleUNvZGUmJnQ+PXRoaXMubWF4Um93cyYmZS5wcmV2ZW50RGVmYXVsdCgpfSxMLnByb3RvdHlwZS5vbkZvY3VzXz1mdW5jdGlvbihlKXt0aGlzLmVsZW1lbnRfLmNsYXNzTGlzdC5hZGQodGhpcy5Dc3NDbGFzc2VzXy5JU19GT0NVU0VEKX0sTC5wcm90b3R5cGUub25CbHVyXz1mdW5jdGlvbihlKXt0aGlzLmVsZW1lbnRfLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5Dc3NDbGFzc2VzXy5JU19GT0NVU0VEKX0sTC5wcm90b3R5cGUub25SZXNldF89ZnVuY3Rpb24oZSl7dGhpcy51cGRhdGVDbGFzc2VzXygpfSxMLnByb3RvdHlwZS51cGRhdGVDbGFzc2VzXz1mdW5jdGlvbigpe3RoaXMuY2hlY2tEaXNhYmxlZCgpLHRoaXMuY2hlY2tWYWxpZGl0eSgpLHRoaXMuY2hlY2tEaXJ0eSgpLHRoaXMuY2hlY2tGb2N1cygpfSxMLnByb3RvdHlwZS5jaGVja0Rpc2FibGVkPWZ1bmN0aW9uKCl7dGhpcy5pbnB1dF8uZGlzYWJsZWQ/dGhpcy5lbGVtZW50Xy5jbGFzc0xpc3QuYWRkKHRoaXMuQ3NzQ2xhc3Nlc18uSVNfRElTQUJMRUQpOnRoaXMuZWxlbWVudF8uY2xhc3NMaXN0LnJlbW92ZSh0aGlzLkNzc0NsYXNzZXNfLklTX0RJU0FCTEVEKX0sTC5wcm90b3R5cGUuY2hlY2tEaXNhYmxlZD1MLnByb3RvdHlwZS5jaGVja0Rpc2FibGVkLEwucHJvdG90eXBlLmNoZWNrRm9jdXM9ZnVuY3Rpb24oKXtCb29sZWFuKHRoaXMuZWxlbWVudF8ucXVlcnlTZWxlY3RvcihcIjpmb2N1c1wiKSk/dGhpcy5lbGVtZW50Xy5jbGFzc0xpc3QuYWRkKHRoaXMuQ3NzQ2xhc3Nlc18uSVNfRk9DVVNFRCk6dGhpcy5lbGVtZW50Xy5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuQ3NzQ2xhc3Nlc18uSVNfRk9DVVNFRCl9LEwucHJvdG90eXBlLmNoZWNrRm9jdXM9TC5wcm90b3R5cGUuY2hlY2tGb2N1cyxMLnByb3RvdHlwZS5jaGVja1ZhbGlkaXR5PWZ1bmN0aW9uKCl7dGhpcy5pbnB1dF8udmFsaWRpdHkmJih0aGlzLmlucHV0Xy52YWxpZGl0eS52YWxpZD90aGlzLmVsZW1lbnRfLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5Dc3NDbGFzc2VzXy5JU19JTlZBTElEKTp0aGlzLmVsZW1lbnRfLmNsYXNzTGlzdC5hZGQodGhpcy5Dc3NDbGFzc2VzXy5JU19JTlZBTElEKSl9LEwucHJvdG90eXBlLmNoZWNrVmFsaWRpdHk9TC5wcm90b3R5cGUuY2hlY2tWYWxpZGl0eSxMLnByb3RvdHlwZS5jaGVja0RpcnR5PWZ1bmN0aW9uKCl7dGhpcy5pbnB1dF8udmFsdWUmJnRoaXMuaW5wdXRfLnZhbHVlLmxlbmd0aD4wP3RoaXMuZWxlbWVudF8uY2xhc3NMaXN0LmFkZCh0aGlzLkNzc0NsYXNzZXNfLklTX0RJUlRZKTp0aGlzLmVsZW1lbnRfLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5Dc3NDbGFzc2VzXy5JU19ESVJUWSl9LEwucHJvdG90eXBlLmNoZWNrRGlydHk9TC5wcm90b3R5cGUuY2hlY2tEaXJ0eSxMLnByb3RvdHlwZS5kaXNhYmxlPWZ1bmN0aW9uKCl7dGhpcy5pbnB1dF8uZGlzYWJsZWQ9ITAsdGhpcy51cGRhdGVDbGFzc2VzXygpfSxMLnByb3RvdHlwZS5kaXNhYmxlPUwucHJvdG90eXBlLmRpc2FibGUsTC5wcm90b3R5cGUuZW5hYmxlPWZ1bmN0aW9uKCl7dGhpcy5pbnB1dF8uZGlzYWJsZWQ9ITEsdGhpcy51cGRhdGVDbGFzc2VzXygpfSxMLnByb3RvdHlwZS5lbmFibGU9TC5wcm90b3R5cGUuZW5hYmxlLEwucHJvdG90eXBlLmNoYW5nZT1mdW5jdGlvbihlKXt0aGlzLmlucHV0Xy52YWx1ZT1lfHxcIlwiLHRoaXMudXBkYXRlQ2xhc3Nlc18oKX0sTC5wcm90b3R5cGUuY2hhbmdlPUwucHJvdG90eXBlLmNoYW5nZSxMLnByb3RvdHlwZS5pbml0PWZ1bmN0aW9uKCl7aWYodGhpcy5lbGVtZW50XyYmKHRoaXMubGFiZWxfPXRoaXMuZWxlbWVudF8ucXVlcnlTZWxlY3RvcihcIi5cIit0aGlzLkNzc0NsYXNzZXNfLkxBQkVMKSx0aGlzLmlucHV0Xz10aGlzLmVsZW1lbnRfLnF1ZXJ5U2VsZWN0b3IoXCIuXCIrdGhpcy5Dc3NDbGFzc2VzXy5JTlBVVCksdGhpcy5pbnB1dF8pKXt0aGlzLmlucHV0Xy5oYXNBdHRyaWJ1dGUodGhpcy5Db25zdGFudF8uTUFYX1JPV1NfQVRUUklCVVRFKSYmKHRoaXMubWF4Um93cz1wYXJzZUludCh0aGlzLmlucHV0Xy5nZXRBdHRyaWJ1dGUodGhpcy5Db25zdGFudF8uTUFYX1JPV1NfQVRUUklCVVRFKSwxMCksaXNOYU4odGhpcy5tYXhSb3dzKSYmKHRoaXMubWF4Um93cz10aGlzLkNvbnN0YW50Xy5OT19NQVhfUk9XUykpLHRoaXMuaW5wdXRfLmhhc0F0dHJpYnV0ZShcInBsYWNlaG9sZGVyXCIpJiZ0aGlzLmVsZW1lbnRfLmNsYXNzTGlzdC5hZGQodGhpcy5Dc3NDbGFzc2VzXy5IQVNfUExBQ0VIT0xERVIpLHRoaXMuYm91bmRVcGRhdGVDbGFzc2VzSGFuZGxlcj10aGlzLnVwZGF0ZUNsYXNzZXNfLmJpbmQodGhpcyksdGhpcy5ib3VuZEZvY3VzSGFuZGxlcj10aGlzLm9uRm9jdXNfLmJpbmQodGhpcyksdGhpcy5ib3VuZEJsdXJIYW5kbGVyPXRoaXMub25CbHVyXy5iaW5kKHRoaXMpLHRoaXMuYm91bmRSZXNldEhhbmRsZXI9dGhpcy5vblJlc2V0Xy5iaW5kKHRoaXMpLHRoaXMuaW5wdXRfLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLHRoaXMuYm91bmRVcGRhdGVDbGFzc2VzSGFuZGxlciksdGhpcy5pbnB1dF8uYWRkRXZlbnRMaXN0ZW5lcihcImZvY3VzXCIsdGhpcy5ib3VuZEZvY3VzSGFuZGxlciksdGhpcy5pbnB1dF8uYWRkRXZlbnRMaXN0ZW5lcihcImJsdXJcIix0aGlzLmJvdW5kQmx1ckhhbmRsZXIpLHRoaXMuaW5wdXRfLmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNldFwiLHRoaXMuYm91bmRSZXNldEhhbmRsZXIpLHRoaXMubWF4Um93cyE9PXRoaXMuQ29uc3RhbnRfLk5PX01BWF9ST1dTJiYodGhpcy5ib3VuZEtleURvd25IYW5kbGVyPXRoaXMub25LZXlEb3duXy5iaW5kKHRoaXMpLHRoaXMuaW5wdXRfLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsdGhpcy5ib3VuZEtleURvd25IYW5kbGVyKSk7dmFyIGU9dGhpcy5lbGVtZW50Xy5jbGFzc0xpc3QuY29udGFpbnModGhpcy5Dc3NDbGFzc2VzXy5JU19JTlZBTElEKTt0aGlzLnVwZGF0ZUNsYXNzZXNfKCksdGhpcy5lbGVtZW50Xy5jbGFzc0xpc3QuYWRkKHRoaXMuQ3NzQ2xhc3Nlc18uSVNfVVBHUkFERUQpLGUmJnRoaXMuZWxlbWVudF8uY2xhc3NMaXN0LmFkZCh0aGlzLkNzc0NsYXNzZXNfLklTX0lOVkFMSUQpLHRoaXMuaW5wdXRfLmhhc0F0dHJpYnV0ZShcImF1dG9mb2N1c1wiKSYmKHRoaXMuZWxlbWVudF8uZm9jdXMoKSx0aGlzLmNoZWNrRm9jdXMoKSl9fSxzLnJlZ2lzdGVyKHtjb25zdHJ1Y3RvcjpMLGNsYXNzQXNTdHJpbmc6XCJNYXRlcmlhbFRleHRmaWVsZFwiLGNzc0NsYXNzOlwibWRsLWpzLXRleHRmaWVsZFwiLHdpZGdldDohMH0pO3ZhciBJPWZ1bmN0aW9uKGUpe3RoaXMuZWxlbWVudF89ZSx0aGlzLmluaXQoKX07d2luZG93Lk1hdGVyaWFsVG9vbHRpcD1JLEkucHJvdG90eXBlLkNvbnN0YW50Xz17fSxJLnByb3RvdHlwZS5Dc3NDbGFzc2VzXz17SVNfQUNUSVZFOlwiaXMtYWN0aXZlXCIsQk9UVE9NOlwibWRsLXRvb2x0aXAtLWJvdHRvbVwiLExFRlQ6XCJtZGwtdG9vbHRpcC0tbGVmdFwiLFJJR0hUOlwibWRsLXRvb2x0aXAtLXJpZ2h0XCIsVE9QOlwibWRsLXRvb2x0aXAtLXRvcFwifSxJLnByb3RvdHlwZS5oYW5kbGVNb3VzZUVudGVyXz1mdW5jdGlvbihlKXt2YXIgdD1lLnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxzPXQubGVmdCt0LndpZHRoLzIsaT10LnRvcCt0LmhlaWdodC8yLG49LTEqKHRoaXMuZWxlbWVudF8ub2Zmc2V0V2lkdGgvMiksYT0tMSoodGhpcy5lbGVtZW50Xy5vZmZzZXRIZWlnaHQvMik7dGhpcy5lbGVtZW50Xy5jbGFzc0xpc3QuY29udGFpbnModGhpcy5Dc3NDbGFzc2VzXy5MRUZUKXx8dGhpcy5lbGVtZW50Xy5jbGFzc0xpc3QuY29udGFpbnModGhpcy5Dc3NDbGFzc2VzXy5SSUdIVCk/KHM9dC53aWR0aC8yLGkrYTwwPyh0aGlzLmVsZW1lbnRfLnN0eWxlLnRvcD1cIjBcIix0aGlzLmVsZW1lbnRfLnN0eWxlLm1hcmdpblRvcD1cIjBcIik6KHRoaXMuZWxlbWVudF8uc3R5bGUudG9wPWkrXCJweFwiLHRoaXMuZWxlbWVudF8uc3R5bGUubWFyZ2luVG9wPWErXCJweFwiKSk6cytuPDA/KHRoaXMuZWxlbWVudF8uc3R5bGUubGVmdD1cIjBcIix0aGlzLmVsZW1lbnRfLnN0eWxlLm1hcmdpbkxlZnQ9XCIwXCIpOih0aGlzLmVsZW1lbnRfLnN0eWxlLmxlZnQ9cytcInB4XCIsdGhpcy5lbGVtZW50Xy5zdHlsZS5tYXJnaW5MZWZ0PW4rXCJweFwiKSx0aGlzLmVsZW1lbnRfLmNsYXNzTGlzdC5jb250YWlucyh0aGlzLkNzc0NsYXNzZXNfLlRPUCk/dGhpcy5lbGVtZW50Xy5zdHlsZS50b3A9dC50b3AtdGhpcy5lbGVtZW50Xy5vZmZzZXRIZWlnaHQtMTArXCJweFwiOnRoaXMuZWxlbWVudF8uY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuQ3NzQ2xhc3Nlc18uUklHSFQpP3RoaXMuZWxlbWVudF8uc3R5bGUubGVmdD10LmxlZnQrdC53aWR0aCsxMCtcInB4XCI6dGhpcy5lbGVtZW50Xy5jbGFzc0xpc3QuY29udGFpbnModGhpcy5Dc3NDbGFzc2VzXy5MRUZUKT90aGlzLmVsZW1lbnRfLnN0eWxlLmxlZnQ9dC5sZWZ0LXRoaXMuZWxlbWVudF8ub2Zmc2V0V2lkdGgtMTArXCJweFwiOnRoaXMuZWxlbWVudF8uc3R5bGUudG9wPXQudG9wK3QuaGVpZ2h0KzEwK1wicHhcIix0aGlzLmVsZW1lbnRfLmNsYXNzTGlzdC5hZGQodGhpcy5Dc3NDbGFzc2VzXy5JU19BQ1RJVkUpfSxJLnByb3RvdHlwZS5oaWRlVG9vbHRpcF89ZnVuY3Rpb24oKXt0aGlzLmVsZW1lbnRfLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5Dc3NDbGFzc2VzXy5JU19BQ1RJVkUpfSxJLnByb3RvdHlwZS5pbml0PWZ1bmN0aW9uKCl7aWYodGhpcy5lbGVtZW50Xyl7dmFyIGU9dGhpcy5lbGVtZW50Xy5nZXRBdHRyaWJ1dGUoXCJmb3JcIil8fHRoaXMuZWxlbWVudF8uZ2V0QXR0cmlidXRlKFwiZGF0YS1tZGwtZm9yXCIpO2UmJih0aGlzLmZvckVsZW1lbnRfPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGUpKSx0aGlzLmZvckVsZW1lbnRfJiYodGhpcy5mb3JFbGVtZW50Xy5oYXNBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiKXx8dGhpcy5mb3JFbGVtZW50Xy5zZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiLFwiMFwiKSx0aGlzLmJvdW5kTW91c2VFbnRlckhhbmRsZXI9dGhpcy5oYW5kbGVNb3VzZUVudGVyXy5iaW5kKHRoaXMpLHRoaXMuYm91bmRNb3VzZUxlYXZlQW5kU2Nyb2xsSGFuZGxlcj10aGlzLmhpZGVUb29sdGlwXy5iaW5kKHRoaXMpLHRoaXMuZm9yRWxlbWVudF8uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIix0aGlzLmJvdW5kTW91c2VFbnRlckhhbmRsZXIsITEpLHRoaXMuZm9yRWxlbWVudF8uYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsdGhpcy5ib3VuZE1vdXNlRW50ZXJIYW5kbGVyLCExKSx0aGlzLmZvckVsZW1lbnRfLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsdGhpcy5ib3VuZE1vdXNlTGVhdmVBbmRTY3JvbGxIYW5kbGVyLCExKSx3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLHRoaXMuYm91bmRNb3VzZUxlYXZlQW5kU2Nyb2xsSGFuZGxlciwhMCksd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsdGhpcy5ib3VuZE1vdXNlTGVhdmVBbmRTY3JvbGxIYW5kbGVyKSl9fSxzLnJlZ2lzdGVyKHtjb25zdHJ1Y3RvcjpJLGNsYXNzQXNTdHJpbmc6XCJNYXRlcmlhbFRvb2x0aXBcIixjc3NDbGFzczpcIm1kbC10b29sdGlwXCJ9KTt2YXIgZj1mdW5jdGlvbihlKXt0aGlzLmVsZW1lbnRfPWUsdGhpcy5pbml0KCl9O3dpbmRvdy5NYXRlcmlhbExheW91dD1mLGYucHJvdG90eXBlLkNvbnN0YW50Xz17TUFYX1dJRFRIOlwiKG1heC13aWR0aDogMTAyNHB4KVwiLFRBQl9TQ1JPTExfUElYRUxTOjEwMCxSRVNJWkVfVElNRU9VVDoxMDAsTUVOVV9JQ09OOlwiJiN4RTVEMjtcIixDSEVWUk9OX0xFRlQ6XCJjaGV2cm9uX2xlZnRcIixDSEVWUk9OX1JJR0hUOlwiY2hldnJvbl9yaWdodFwifSxmLnByb3RvdHlwZS5LZXljb2Rlc189e0VOVEVSOjEzLEVTQ0FQRToyNyxTUEFDRTozMn0sZi5wcm90b3R5cGUuTW9kZV89e1NUQU5EQVJEOjAsU0VBTUVEOjEsV0FURVJGQUxMOjIsU0NST0xMOjN9LGYucHJvdG90eXBlLkNzc0NsYXNzZXNfPXtDT05UQUlORVI6XCJtZGwtbGF5b3V0X19jb250YWluZXJcIixIRUFERVI6XCJtZGwtbGF5b3V0X19oZWFkZXJcIixEUkFXRVI6XCJtZGwtbGF5b3V0X19kcmF3ZXJcIixDT05URU5UOlwibWRsLWxheW91dF9fY29udGVudFwiLERSQVdFUl9CVE46XCJtZGwtbGF5b3V0X19kcmF3ZXItYnV0dG9uXCIsSUNPTjpcIm1hdGVyaWFsLWljb25zXCIsSlNfUklQUExFX0VGRkVDVDpcIm1kbC1qcy1yaXBwbGUtZWZmZWN0XCIsUklQUExFX0NPTlRBSU5FUjpcIm1kbC1sYXlvdXRfX3RhYi1yaXBwbGUtY29udGFpbmVyXCIsUklQUExFOlwibWRsLXJpcHBsZVwiLFJJUFBMRV9JR05PUkVfRVZFTlRTOlwibWRsLWpzLXJpcHBsZS1lZmZlY3QtLWlnbm9yZS1ldmVudHNcIixIRUFERVJfU0VBTUVEOlwibWRsLWxheW91dF9faGVhZGVyLS1zZWFtZWRcIixIRUFERVJfV0FURVJGQUxMOlwibWRsLWxheW91dF9faGVhZGVyLS13YXRlcmZhbGxcIixIRUFERVJfU0NST0xMOlwibWRsLWxheW91dF9faGVhZGVyLS1zY3JvbGxcIixGSVhFRF9IRUFERVI6XCJtZGwtbGF5b3V0LS1maXhlZC1oZWFkZXJcIixPQkZVU0NBVE9SOlwibWRsLWxheW91dF9fb2JmdXNjYXRvclwiLFRBQl9CQVI6XCJtZGwtbGF5b3V0X190YWItYmFyXCIsVEFCX0NPTlRBSU5FUjpcIm1kbC1sYXlvdXRfX3RhYi1iYXItY29udGFpbmVyXCIsVEFCOlwibWRsLWxheW91dF9fdGFiXCIsVEFCX0JBUl9CVVRUT046XCJtZGwtbGF5b3V0X190YWItYmFyLWJ1dHRvblwiLFRBQl9CQVJfTEVGVF9CVVRUT046XCJtZGwtbGF5b3V0X190YWItYmFyLWxlZnQtYnV0dG9uXCIsVEFCX0JBUl9SSUdIVF9CVVRUT046XCJtZGwtbGF5b3V0X190YWItYmFyLXJpZ2h0LWJ1dHRvblwiLFBBTkVMOlwibWRsLWxheW91dF9fdGFiLXBhbmVsXCIsSEFTX0RSQVdFUjpcImhhcy1kcmF3ZXJcIixIQVNfVEFCUzpcImhhcy10YWJzXCIsSEFTX1NDUk9MTElOR19IRUFERVI6XCJoYXMtc2Nyb2xsaW5nLWhlYWRlclwiLENBU1RJTkdfU0hBRE9XOlwiaXMtY2FzdGluZy1zaGFkb3dcIixJU19DT01QQUNUOlwiaXMtY29tcGFjdFwiLElTX1NNQUxMX1NDUkVFTjpcImlzLXNtYWxsLXNjcmVlblwiLElTX0RSQVdFUl9PUEVOOlwiaXMtdmlzaWJsZVwiLElTX0FDVElWRTpcImlzLWFjdGl2ZVwiLElTX1VQR1JBREVEOlwiaXMtdXBncmFkZWRcIixJU19BTklNQVRJTkc6XCJpcy1hbmltYXRpbmdcIixPTl9MQVJHRV9TQ1JFRU46XCJtZGwtbGF5b3V0LS1sYXJnZS1zY3JlZW4tb25seVwiLE9OX1NNQUxMX1NDUkVFTjpcIm1kbC1sYXlvdXQtLXNtYWxsLXNjcmVlbi1vbmx5XCJ9LGYucHJvdG90eXBlLmNvbnRlbnRTY3JvbGxIYW5kbGVyXz1mdW5jdGlvbigpe2lmKCF0aGlzLmhlYWRlcl8uY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuQ3NzQ2xhc3Nlc18uSVNfQU5JTUFUSU5HKSl7dmFyIGU9IXRoaXMuZWxlbWVudF8uY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuQ3NzQ2xhc3Nlc18uSVNfU01BTExfU0NSRUVOKXx8dGhpcy5lbGVtZW50Xy5jbGFzc0xpc3QuY29udGFpbnModGhpcy5Dc3NDbGFzc2VzXy5GSVhFRF9IRUFERVIpO3RoaXMuY29udGVudF8uc2Nyb2xsVG9wPjAmJiF0aGlzLmhlYWRlcl8uY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuQ3NzQ2xhc3Nlc18uSVNfQ09NUEFDVCk/KHRoaXMuaGVhZGVyXy5jbGFzc0xpc3QuYWRkKHRoaXMuQ3NzQ2xhc3Nlc18uQ0FTVElOR19TSEFET1cpLHRoaXMuaGVhZGVyXy5jbGFzc0xpc3QuYWRkKHRoaXMuQ3NzQ2xhc3Nlc18uSVNfQ09NUEFDVCksZSYmdGhpcy5oZWFkZXJfLmNsYXNzTGlzdC5hZGQodGhpcy5Dc3NDbGFzc2VzXy5JU19BTklNQVRJTkcpKTp0aGlzLmNvbnRlbnRfLnNjcm9sbFRvcDw9MCYmdGhpcy5oZWFkZXJfLmNsYXNzTGlzdC5jb250YWlucyh0aGlzLkNzc0NsYXNzZXNfLklTX0NPTVBBQ1QpJiYodGhpcy5oZWFkZXJfLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5Dc3NDbGFzc2VzXy5DQVNUSU5HX1NIQURPVyksdGhpcy5oZWFkZXJfLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5Dc3NDbGFzc2VzXy5JU19DT01QQUNUKSxlJiZ0aGlzLmhlYWRlcl8uY2xhc3NMaXN0LmFkZCh0aGlzLkNzc0NsYXNzZXNfLklTX0FOSU1BVElORykpfX0sZi5wcm90b3R5cGUua2V5Ym9hcmRFdmVudEhhbmRsZXJfPWZ1bmN0aW9uKGUpe2Uua2V5Q29kZT09PXRoaXMuS2V5Y29kZXNfLkVTQ0FQRSYmdGhpcy5kcmF3ZXJfLmNsYXNzTGlzdC5jb250YWlucyh0aGlzLkNzc0NsYXNzZXNfLklTX0RSQVdFUl9PUEVOKSYmdGhpcy50b2dnbGVEcmF3ZXIoKX0sZi5wcm90b3R5cGUuc2NyZWVuU2l6ZUhhbmRsZXJfPWZ1bmN0aW9uKCl7dGhpcy5zY3JlZW5TaXplTWVkaWFRdWVyeV8ubWF0Y2hlcz90aGlzLmVsZW1lbnRfLmNsYXNzTGlzdC5hZGQodGhpcy5Dc3NDbGFzc2VzXy5JU19TTUFMTF9TQ1JFRU4pOih0aGlzLmVsZW1lbnRfLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5Dc3NDbGFzc2VzXy5JU19TTUFMTF9TQ1JFRU4pLHRoaXMuZHJhd2VyXyYmKHRoaXMuZHJhd2VyXy5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuQ3NzQ2xhc3Nlc18uSVNfRFJBV0VSX09QRU4pLHRoaXMub2JmdXNjYXRvcl8uY2xhc3NMaXN0LnJlbW92ZSh0aGlzLkNzc0NsYXNzZXNfLklTX0RSQVdFUl9PUEVOKSkpfSxmLnByb3RvdHlwZS5kcmF3ZXJUb2dnbGVIYW5kbGVyXz1mdW5jdGlvbihlKXtpZihlJiZcImtleWRvd25cIj09PWUudHlwZSl7aWYoZS5rZXlDb2RlIT09dGhpcy5LZXljb2Rlc18uU1BBQ0UmJmUua2V5Q29kZSE9PXRoaXMuS2V5Y29kZXNfLkVOVEVSKXJldHVybjtlLnByZXZlbnREZWZhdWx0KCl9dGhpcy50b2dnbGVEcmF3ZXIoKX0sZi5wcm90b3R5cGUuaGVhZGVyVHJhbnNpdGlvbkVuZEhhbmRsZXJfPWZ1bmN0aW9uKCl7dGhpcy5oZWFkZXJfLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5Dc3NDbGFzc2VzXy5JU19BTklNQVRJTkcpfSxmLnByb3RvdHlwZS5oZWFkZXJDbGlja0hhbmRsZXJfPWZ1bmN0aW9uKCl7dGhpcy5oZWFkZXJfLmNsYXNzTGlzdC5jb250YWlucyh0aGlzLkNzc0NsYXNzZXNfLklTX0NPTVBBQ1QpJiYodGhpcy5oZWFkZXJfLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5Dc3NDbGFzc2VzXy5JU19DT01QQUNUKSx0aGlzLmhlYWRlcl8uY2xhc3NMaXN0LmFkZCh0aGlzLkNzc0NsYXNzZXNfLklTX0FOSU1BVElORykpfSxmLnByb3RvdHlwZS5yZXNldFRhYlN0YXRlXz1mdW5jdGlvbihlKXtmb3IodmFyIHQ9MDt0PGUubGVuZ3RoO3QrKyllW3RdLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5Dc3NDbGFzc2VzXy5JU19BQ1RJVkUpfSxmLnByb3RvdHlwZS5yZXNldFBhbmVsU3RhdGVfPWZ1bmN0aW9uKGUpe2Zvcih2YXIgdD0wO3Q8ZS5sZW5ndGg7dCsrKWVbdF0uY2xhc3NMaXN0LnJlbW92ZSh0aGlzLkNzc0NsYXNzZXNfLklTX0FDVElWRSl9LGYucHJvdG90eXBlLnRvZ2dsZURyYXdlcj1mdW5jdGlvbigpe3ZhciBlPXRoaXMuZWxlbWVudF8ucXVlcnlTZWxlY3RvcihcIi5cIit0aGlzLkNzc0NsYXNzZXNfLkRSQVdFUl9CVE4pO3RoaXMuZHJhd2VyXy5jbGFzc0xpc3QudG9nZ2xlKHRoaXMuQ3NzQ2xhc3Nlc18uSVNfRFJBV0VSX09QRU4pLHRoaXMub2JmdXNjYXRvcl8uY2xhc3NMaXN0LnRvZ2dsZSh0aGlzLkNzc0NsYXNzZXNfLklTX0RSQVdFUl9PUEVOKSx0aGlzLmRyYXdlcl8uY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuQ3NzQ2xhc3Nlc18uSVNfRFJBV0VSX09QRU4pPyh0aGlzLmRyYXdlcl8uc2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIixcImZhbHNlXCIpLGUuc2V0QXR0cmlidXRlKFwiYXJpYS1leHBhbmRlZFwiLFwidHJ1ZVwiKSk6KHRoaXMuZHJhd2VyXy5zZXRBdHRyaWJ1dGUoXCJhcmlhLWhpZGRlblwiLFwidHJ1ZVwiKSxlLnNldEF0dHJpYnV0ZShcImFyaWEtZXhwYW5kZWRcIixcImZhbHNlXCIpKX0sZi5wcm90b3R5cGUudG9nZ2xlRHJhd2VyPWYucHJvdG90eXBlLnRvZ2dsZURyYXdlcixmLnByb3RvdHlwZS5pbml0PWZ1bmN0aW9uKCl7aWYodGhpcy5lbGVtZW50Xyl7dmFyIGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtlLmNsYXNzTGlzdC5hZGQodGhpcy5Dc3NDbGFzc2VzXy5DT05UQUlORVIpO3ZhciBzPXRoaXMuZWxlbWVudF8ucXVlcnlTZWxlY3RvcihcIjpmb2N1c1wiKTt0aGlzLmVsZW1lbnRfLnBhcmVudEVsZW1lbnQuaW5zZXJ0QmVmb3JlKGUsdGhpcy5lbGVtZW50XyksdGhpcy5lbGVtZW50Xy5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKHRoaXMuZWxlbWVudF8pLGUuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50XykscyYmcy5mb2N1cygpO2Zvcih2YXIgaT10aGlzLmVsZW1lbnRfLmNoaWxkTm9kZXMsbj1pLmxlbmd0aCxhPTA7YTxuO2ErKyl7dmFyIGw9aVthXTtsLmNsYXNzTGlzdCYmbC5jbGFzc0xpc3QuY29udGFpbnModGhpcy5Dc3NDbGFzc2VzXy5IRUFERVIpJiYodGhpcy5oZWFkZXJfPWwpLGwuY2xhc3NMaXN0JiZsLmNsYXNzTGlzdC5jb250YWlucyh0aGlzLkNzc0NsYXNzZXNfLkRSQVdFUikmJih0aGlzLmRyYXdlcl89bCksbC5jbGFzc0xpc3QmJmwuY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuQ3NzQ2xhc3Nlc18uQ09OVEVOVCkmJih0aGlzLmNvbnRlbnRfPWwpfXdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicGFnZXNob3dcIixmdW5jdGlvbihlKXtlLnBlcnNpc3RlZCYmKHRoaXMuZWxlbWVudF8uc3R5bGUub3ZlcmZsb3dZPVwiaGlkZGVuXCIscmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCl7dGhpcy5lbGVtZW50Xy5zdHlsZS5vdmVyZmxvd1k9XCJcIn0uYmluZCh0aGlzKSkpfS5iaW5kKHRoaXMpLCExKSx0aGlzLmhlYWRlcl8mJih0aGlzLnRhYkJhcl89dGhpcy5oZWFkZXJfLnF1ZXJ5U2VsZWN0b3IoXCIuXCIrdGhpcy5Dc3NDbGFzc2VzXy5UQUJfQkFSKSk7dmFyIG89dGhpcy5Nb2RlXy5TVEFOREFSRDtpZih0aGlzLmhlYWRlcl8mJih0aGlzLmhlYWRlcl8uY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuQ3NzQ2xhc3Nlc18uSEVBREVSX1NFQU1FRCk/bz10aGlzLk1vZGVfLlNFQU1FRDp0aGlzLmhlYWRlcl8uY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuQ3NzQ2xhc3Nlc18uSEVBREVSX1dBVEVSRkFMTCk/KG89dGhpcy5Nb2RlXy5XQVRFUkZBTEwsdGhpcy5oZWFkZXJfLmFkZEV2ZW50TGlzdGVuZXIoXCJ0cmFuc2l0aW9uZW5kXCIsdGhpcy5oZWFkZXJUcmFuc2l0aW9uRW5kSGFuZGxlcl8uYmluZCh0aGlzKSksdGhpcy5oZWFkZXJfLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLHRoaXMuaGVhZGVyQ2xpY2tIYW5kbGVyXy5iaW5kKHRoaXMpKSk6dGhpcy5oZWFkZXJfLmNsYXNzTGlzdC5jb250YWlucyh0aGlzLkNzc0NsYXNzZXNfLkhFQURFUl9TQ1JPTEwpJiYobz10aGlzLk1vZGVfLlNDUk9MTCxlLmNsYXNzTGlzdC5hZGQodGhpcy5Dc3NDbGFzc2VzXy5IQVNfU0NST0xMSU5HX0hFQURFUikpLG89PT10aGlzLk1vZGVfLlNUQU5EQVJEPyh0aGlzLmhlYWRlcl8uY2xhc3NMaXN0LmFkZCh0aGlzLkNzc0NsYXNzZXNfLkNBU1RJTkdfU0hBRE9XKSx0aGlzLnRhYkJhcl8mJnRoaXMudGFiQmFyXy5jbGFzc0xpc3QuYWRkKHRoaXMuQ3NzQ2xhc3Nlc18uQ0FTVElOR19TSEFET1cpKTpvPT09dGhpcy5Nb2RlXy5TRUFNRUR8fG89PT10aGlzLk1vZGVfLlNDUk9MTD8odGhpcy5oZWFkZXJfLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5Dc3NDbGFzc2VzXy5DQVNUSU5HX1NIQURPVyksdGhpcy50YWJCYXJfJiZ0aGlzLnRhYkJhcl8uY2xhc3NMaXN0LnJlbW92ZSh0aGlzLkNzc0NsYXNzZXNfLkNBU1RJTkdfU0hBRE9XKSk6bz09PXRoaXMuTW9kZV8uV0FURVJGQUxMJiYodGhpcy5jb250ZW50Xy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsdGhpcy5jb250ZW50U2Nyb2xsSGFuZGxlcl8uYmluZCh0aGlzKSksdGhpcy5jb250ZW50U2Nyb2xsSGFuZGxlcl8oKSkpLHRoaXMuZHJhd2VyXyl7dmFyIHI9dGhpcy5lbGVtZW50Xy5xdWVyeVNlbGVjdG9yKFwiLlwiK3RoaXMuQ3NzQ2xhc3Nlc18uRFJBV0VSX0JUTik7aWYoIXIpe3I9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSxyLnNldEF0dHJpYnV0ZShcImFyaWEtZXhwYW5kZWRcIixcImZhbHNlXCIpLHIuc2V0QXR0cmlidXRlKFwicm9sZVwiLFwiYnV0dG9uXCIpLHIuc2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIixcIjBcIiksci5jbGFzc0xpc3QuYWRkKHRoaXMuQ3NzQ2xhc3Nlc18uRFJBV0VSX0JUTik7dmFyIF89ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7Xy5jbGFzc0xpc3QuYWRkKHRoaXMuQ3NzQ2xhc3Nlc18uSUNPTiksXy5pbm5lckhUTUw9dGhpcy5Db25zdGFudF8uTUVOVV9JQ09OLHIuYXBwZW5kQ2hpbGQoXyl9dGhpcy5kcmF3ZXJfLmNsYXNzTGlzdC5jb250YWlucyh0aGlzLkNzc0NsYXNzZXNfLk9OX0xBUkdFX1NDUkVFTik/ci5jbGFzc0xpc3QuYWRkKHRoaXMuQ3NzQ2xhc3Nlc18uT05fTEFSR0VfU0NSRUVOKTp0aGlzLmRyYXdlcl8uY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuQ3NzQ2xhc3Nlc18uT05fU01BTExfU0NSRUVOKSYmci5jbGFzc0xpc3QuYWRkKHRoaXMuQ3NzQ2xhc3Nlc18uT05fU01BTExfU0NSRUVOKSxyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLHRoaXMuZHJhd2VyVG9nZ2xlSGFuZGxlcl8uYmluZCh0aGlzKSksci5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLHRoaXMuZHJhd2VyVG9nZ2xlSGFuZGxlcl8uYmluZCh0aGlzKSksdGhpcy5lbGVtZW50Xy5jbGFzc0xpc3QuYWRkKHRoaXMuQ3NzQ2xhc3Nlc18uSEFTX0RSQVdFUiksdGhpcy5lbGVtZW50Xy5jbGFzc0xpc3QuY29udGFpbnModGhpcy5Dc3NDbGFzc2VzXy5GSVhFRF9IRUFERVIpP3RoaXMuaGVhZGVyXy5pbnNlcnRCZWZvcmUocix0aGlzLmhlYWRlcl8uZmlyc3RDaGlsZCk6dGhpcy5lbGVtZW50Xy5pbnNlcnRCZWZvcmUocix0aGlzLmNvbnRlbnRfKTt2YXIgZD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO2QuY2xhc3NMaXN0LmFkZCh0aGlzLkNzc0NsYXNzZXNfLk9CRlVTQ0FUT1IpLHRoaXMuZWxlbWVudF8uYXBwZW5kQ2hpbGQoZCksZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIix0aGlzLmRyYXdlclRvZ2dsZUhhbmRsZXJfLmJpbmQodGhpcykpLHRoaXMub2JmdXNjYXRvcl89ZCx0aGlzLmRyYXdlcl8uYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIix0aGlzLmtleWJvYXJkRXZlbnRIYW5kbGVyXy5iaW5kKHRoaXMpKSx0aGlzLmRyYXdlcl8uc2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIixcInRydWVcIil9aWYodGhpcy5zY3JlZW5TaXplTWVkaWFRdWVyeV89d2luZG93Lm1hdGNoTWVkaWEodGhpcy5Db25zdGFudF8uTUFYX1dJRFRIKSx0aGlzLnNjcmVlblNpemVNZWRpYVF1ZXJ5Xy5hZGRMaXN0ZW5lcih0aGlzLnNjcmVlblNpemVIYW5kbGVyXy5iaW5kKHRoaXMpKSx0aGlzLnNjcmVlblNpemVIYW5kbGVyXygpLHRoaXMuaGVhZGVyXyYmdGhpcy50YWJCYXJfKXt0aGlzLmVsZW1lbnRfLmNsYXNzTGlzdC5hZGQodGhpcy5Dc3NDbGFzc2VzXy5IQVNfVEFCUyk7dmFyIGg9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtoLmNsYXNzTGlzdC5hZGQodGhpcy5Dc3NDbGFzc2VzXy5UQUJfQ09OVEFJTkVSKSx0aGlzLmhlYWRlcl8uaW5zZXJ0QmVmb3JlKGgsdGhpcy50YWJCYXJfKSx0aGlzLmhlYWRlcl8ucmVtb3ZlQ2hpbGQodGhpcy50YWJCYXJfKTt2YXIgYz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO2MuY2xhc3NMaXN0LmFkZCh0aGlzLkNzc0NsYXNzZXNfLlRBQl9CQVJfQlVUVE9OKSxjLmNsYXNzTGlzdC5hZGQodGhpcy5Dc3NDbGFzc2VzXy5UQUJfQkFSX0xFRlRfQlVUVE9OKTt2YXIgcD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtwLmNsYXNzTGlzdC5hZGQodGhpcy5Dc3NDbGFzc2VzXy5JQ09OKSxwLnRleHRDb250ZW50PXRoaXMuQ29uc3RhbnRfLkNIRVZST05fTEVGVCxjLmFwcGVuZENoaWxkKHApLGMuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsZnVuY3Rpb24oKXt0aGlzLnRhYkJhcl8uc2Nyb2xsTGVmdC09dGhpcy5Db25zdGFudF8uVEFCX1NDUk9MTF9QSVhFTFN9LmJpbmQodGhpcykpO3ZhciBDPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7Qy5jbGFzc0xpc3QuYWRkKHRoaXMuQ3NzQ2xhc3Nlc18uVEFCX0JBUl9CVVRUT04pLEMuY2xhc3NMaXN0LmFkZCh0aGlzLkNzc0NsYXNzZXNfLlRBQl9CQVJfUklHSFRfQlVUVE9OKTt2YXIgdT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTt1LmNsYXNzTGlzdC5hZGQodGhpcy5Dc3NDbGFzc2VzXy5JQ09OKSx1LnRleHRDb250ZW50PXRoaXMuQ29uc3RhbnRfLkNIRVZST05fUklHSFQsQy5hcHBlbmRDaGlsZCh1KSxDLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLGZ1bmN0aW9uKCl7dGhpcy50YWJCYXJfLnNjcm9sbExlZnQrPXRoaXMuQ29uc3RhbnRfLlRBQl9TQ1JPTExfUElYRUxTfS5iaW5kKHRoaXMpKSxoLmFwcGVuZENoaWxkKGMpLGguYXBwZW5kQ2hpbGQodGhpcy50YWJCYXJfKSxoLmFwcGVuZENoaWxkKEMpO3ZhciBFPWZ1bmN0aW9uKCl7dGhpcy50YWJCYXJfLnNjcm9sbExlZnQ+MD9jLmNsYXNzTGlzdC5hZGQodGhpcy5Dc3NDbGFzc2VzXy5JU19BQ1RJVkUpOmMuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLkNzc0NsYXNzZXNfLklTX0FDVElWRSksdGhpcy50YWJCYXJfLnNjcm9sbExlZnQ8dGhpcy50YWJCYXJfLnNjcm9sbFdpZHRoLXRoaXMudGFiQmFyXy5vZmZzZXRXaWR0aD9DLmNsYXNzTGlzdC5hZGQodGhpcy5Dc3NDbGFzc2VzXy5JU19BQ1RJVkUpOkMuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLkNzc0NsYXNzZXNfLklTX0FDVElWRSl9LmJpbmQodGhpcyk7dGhpcy50YWJCYXJfLmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIixFKSxFKCk7dmFyIG09ZnVuY3Rpb24oKXt0aGlzLnJlc2l6ZVRpbWVvdXRJZF8mJmNsZWFyVGltZW91dCh0aGlzLnJlc2l6ZVRpbWVvdXRJZF8pLHRoaXMucmVzaXplVGltZW91dElkXz1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7RSgpLHRoaXMucmVzaXplVGltZW91dElkXz1udWxsfS5iaW5kKHRoaXMpLHRoaXMuQ29uc3RhbnRfLlJFU0laRV9USU1FT1VUKX0uYmluZCh0aGlzKTt3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLG0pLHRoaXMudGFiQmFyXy5jbGFzc0xpc3QuY29udGFpbnModGhpcy5Dc3NDbGFzc2VzXy5KU19SSVBQTEVfRUZGRUNUKSYmdGhpcy50YWJCYXJfLmNsYXNzTGlzdC5hZGQodGhpcy5Dc3NDbGFzc2VzXy5SSVBQTEVfSUdOT1JFX0VWRU5UUyk7Zm9yKHZhciBMPXRoaXMudGFiQmFyXy5xdWVyeVNlbGVjdG9yQWxsKFwiLlwiK3RoaXMuQ3NzQ2xhc3Nlc18uVEFCKSxJPXRoaXMuY29udGVudF8ucXVlcnlTZWxlY3RvckFsbChcIi5cIit0aGlzLkNzc0NsYXNzZXNfLlBBTkVMKSxmPTA7ZjxMLmxlbmd0aDtmKyspbmV3IHQoTFtmXSxMLEksdGhpcyl9dGhpcy5lbGVtZW50Xy5jbGFzc0xpc3QuYWRkKHRoaXMuQ3NzQ2xhc3Nlc18uSVNfVVBHUkFERUQpfX0sd2luZG93Lk1hdGVyaWFsTGF5b3V0VGFiPXQscy5yZWdpc3Rlcih7Y29uc3RydWN0b3I6ZixjbGFzc0FzU3RyaW5nOlwiTWF0ZXJpYWxMYXlvdXRcIixjc3NDbGFzczpcIm1kbC1qcy1sYXlvdXRcIn0pO3ZhciBiPWZ1bmN0aW9uKGUpe3RoaXMuZWxlbWVudF89ZSx0aGlzLmluaXQoKX07d2luZG93Lk1hdGVyaWFsRGF0YVRhYmxlPWIsYi5wcm90b3R5cGUuQ29uc3RhbnRfPXt9LGIucHJvdG90eXBlLkNzc0NsYXNzZXNfPXtEQVRBX1RBQkxFOlwibWRsLWRhdGEtdGFibGVcIixTRUxFQ1RBQkxFOlwibWRsLWRhdGEtdGFibGUtLXNlbGVjdGFibGVcIixTRUxFQ1RfRUxFTUVOVDpcIm1kbC1kYXRhLXRhYmxlX19zZWxlY3RcIixJU19TRUxFQ1RFRDpcImlzLXNlbGVjdGVkXCIsSVNfVVBHUkFERUQ6XCJpcy11cGdyYWRlZFwifSxiLnByb3RvdHlwZS5zZWxlY3RSb3dfPWZ1bmN0aW9uKGUsdCxzKXtyZXR1cm4gdD9mdW5jdGlvbigpe2UuY2hlY2tlZD90LmNsYXNzTGlzdC5hZGQodGhpcy5Dc3NDbGFzc2VzXy5JU19TRUxFQ1RFRCk6dC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuQ3NzQ2xhc3Nlc18uSVNfU0VMRUNURUQpfS5iaW5kKHRoaXMpOnM/ZnVuY3Rpb24oKXt2YXIgdCxpO2lmKGUuY2hlY2tlZClmb3IodD0wO3Q8cy5sZW5ndGg7dCsrKWk9c1t0XS5xdWVyeVNlbGVjdG9yKFwidGRcIikucXVlcnlTZWxlY3RvcihcIi5tZGwtY2hlY2tib3hcIiksaS5NYXRlcmlhbENoZWNrYm94LmNoZWNrKCksc1t0XS5jbGFzc0xpc3QuYWRkKHRoaXMuQ3NzQ2xhc3Nlc18uSVNfU0VMRUNURUQpO2Vsc2UgZm9yKHQ9MDt0PHMubGVuZ3RoO3QrKylpPXNbdF0ucXVlcnlTZWxlY3RvcihcInRkXCIpLnF1ZXJ5U2VsZWN0b3IoXCIubWRsLWNoZWNrYm94XCIpLGkuTWF0ZXJpYWxDaGVja2JveC51bmNoZWNrKCksc1t0XS5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuQ3NzQ2xhc3Nlc18uSVNfU0VMRUNURUQpfS5iaW5kKHRoaXMpOnZvaWQgMH0sYi5wcm90b3R5cGUuY3JlYXRlQ2hlY2tib3hfPWZ1bmN0aW9uKGUsdCl7dmFyIGk9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpLG49W1wibWRsLWNoZWNrYm94XCIsXCJtZGwtanMtY2hlY2tib3hcIixcIm1kbC1qcy1yaXBwbGUtZWZmZWN0XCIsdGhpcy5Dc3NDbGFzc2VzXy5TRUxFQ1RfRUxFTUVOVF07aS5jbGFzc05hbWU9bi5qb2luKFwiIFwiKTt2YXIgYT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7cmV0dXJuIGEudHlwZT1cImNoZWNrYm94XCIsYS5jbGFzc0xpc3QuYWRkKFwibWRsLWNoZWNrYm94X19pbnB1dFwiKSxlPyhhLmNoZWNrZWQ9ZS5jbGFzc0xpc3QuY29udGFpbnModGhpcy5Dc3NDbGFzc2VzXy5JU19TRUxFQ1RFRCksYS5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsdGhpcy5zZWxlY3RSb3dfKGEsZSkpKTp0JiZhLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIix0aGlzLnNlbGVjdFJvd18oYSxudWxsLHQpKSxpLmFwcGVuZENoaWxkKGEpLHMudXBncmFkZUVsZW1lbnQoaSxcIk1hdGVyaWFsQ2hlY2tib3hcIiksaX0sYi5wcm90b3R5cGUuaW5pdD1mdW5jdGlvbigpe2lmKHRoaXMuZWxlbWVudF8pe3ZhciBlPXRoaXMuZWxlbWVudF8ucXVlcnlTZWxlY3RvcihcInRoXCIpLHQ9QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy5lbGVtZW50Xy5xdWVyeVNlbGVjdG9yQWxsKFwidGJvZHkgdHJcIikpLHM9QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy5lbGVtZW50Xy5xdWVyeVNlbGVjdG9yQWxsKFwidGZvb3QgdHJcIikpLGk9dC5jb25jYXQocyk7aWYodGhpcy5lbGVtZW50Xy5jbGFzc0xpc3QuY29udGFpbnModGhpcy5Dc3NDbGFzc2VzXy5TRUxFQ1RBQkxFKSl7dmFyIG49ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRoXCIpLGE9dGhpcy5jcmVhdGVDaGVja2JveF8obnVsbCxpKTtuLmFwcGVuZENoaWxkKGEpLGUucGFyZW50RWxlbWVudC5pbnNlcnRCZWZvcmUobixlKTtmb3IodmFyIGw9MDtsPGkubGVuZ3RoO2wrKyl7dmFyIG89aVtsXS5xdWVyeVNlbGVjdG9yKFwidGRcIik7aWYobyl7dmFyIHI9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO2lmKFwiVEJPRFlcIj09PWlbbF0ucGFyZW50Tm9kZS5ub2RlTmFtZS50b1VwcGVyQ2FzZSgpKXt2YXIgXz10aGlzLmNyZWF0ZUNoZWNrYm94XyhpW2xdKTtyLmFwcGVuZENoaWxkKF8pfWlbbF0uaW5zZXJ0QmVmb3JlKHIsbyl9fXRoaXMuZWxlbWVudF8uY2xhc3NMaXN0LmFkZCh0aGlzLkNzc0NsYXNzZXNfLklTX1VQR1JBREVEKX19fSxzLnJlZ2lzdGVyKHtjb25zdHJ1Y3RvcjpiLGNsYXNzQXNTdHJpbmc6XCJNYXRlcmlhbERhdGFUYWJsZVwiLGNzc0NsYXNzOlwibWRsLWpzLWRhdGEtdGFibGVcIn0pO3ZhciB5PWZ1bmN0aW9uKGUpe3RoaXMuZWxlbWVudF89ZSx0aGlzLmluaXQoKX07d2luZG93Lk1hdGVyaWFsUmlwcGxlPXkseS5wcm90b3R5cGUuQ29uc3RhbnRfPXtJTklUSUFMX1NDQUxFOlwic2NhbGUoMC4wMDAxLCAwLjAwMDEpXCIsSU5JVElBTF9TSVpFOlwiMXB4XCIsSU5JVElBTF9PUEFDSVRZOlwiMC40XCIsRklOQUxfT1BBQ0lUWTpcIjBcIixGSU5BTF9TQ0FMRTpcIlwifSx5LnByb3RvdHlwZS5Dc3NDbGFzc2VzXz17UklQUExFX0NFTlRFUjpcIm1kbC1yaXBwbGUtLWNlbnRlclwiLFJJUFBMRV9FRkZFQ1RfSUdOT1JFX0VWRU5UUzpcIm1kbC1qcy1yaXBwbGUtZWZmZWN0LS1pZ25vcmUtZXZlbnRzXCIsUklQUExFOlwibWRsLXJpcHBsZVwiLElTX0FOSU1BVElORzpcImlzLWFuaW1hdGluZ1wiLElTX1ZJU0lCTEU6XCJpcy12aXNpYmxlXCJ9LHkucHJvdG90eXBlLmRvd25IYW5kbGVyXz1mdW5jdGlvbihlKXtpZighdGhpcy5yaXBwbGVFbGVtZW50Xy5zdHlsZS53aWR0aCYmIXRoaXMucmlwcGxlRWxlbWVudF8uc3R5bGUuaGVpZ2h0KXt2YXIgdD10aGlzLmVsZW1lbnRfLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO3RoaXMuYm91bmRIZWlnaHQ9dC5oZWlnaHQsdGhpcy5ib3VuZFdpZHRoPXQud2lkdGgsdGhpcy5yaXBwbGVTaXplXz0yKk1hdGguc3FydCh0LndpZHRoKnQud2lkdGgrdC5oZWlnaHQqdC5oZWlnaHQpKzIsdGhpcy5yaXBwbGVFbGVtZW50Xy5zdHlsZS53aWR0aD10aGlzLnJpcHBsZVNpemVfK1wicHhcIix0aGlzLnJpcHBsZUVsZW1lbnRfLnN0eWxlLmhlaWdodD10aGlzLnJpcHBsZVNpemVfK1wicHhcIn1pZih0aGlzLnJpcHBsZUVsZW1lbnRfLmNsYXNzTGlzdC5hZGQodGhpcy5Dc3NDbGFzc2VzXy5JU19WSVNJQkxFKSxcIm1vdXNlZG93blwiPT09ZS50eXBlJiZ0aGlzLmlnbm9yaW5nTW91c2VEb3duXyl0aGlzLmlnbm9yaW5nTW91c2VEb3duXz0hMTtlbHNle1widG91Y2hzdGFydFwiPT09ZS50eXBlJiYodGhpcy5pZ25vcmluZ01vdXNlRG93bl89ITApO3ZhciBzPXRoaXMuZ2V0RnJhbWVDb3VudCgpO2lmKHM+MClyZXR1cm47dGhpcy5zZXRGcmFtZUNvdW50KDEpO3ZhciBpLG4sYT1lLmN1cnJlbnRUYXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7aWYoMD09PWUuY2xpZW50WCYmMD09PWUuY2xpZW50WSlpPU1hdGgucm91bmQoYS53aWR0aC8yKSxuPU1hdGgucm91bmQoYS5oZWlnaHQvMik7ZWxzZXt2YXIgbD1lLmNsaWVudFg/ZS5jbGllbnRYOmUudG91Y2hlc1swXS5jbGllbnRYLG89ZS5jbGllbnRZP2UuY2xpZW50WTplLnRvdWNoZXNbMF0uY2xpZW50WTtpPU1hdGgucm91bmQobC1hLmxlZnQpLG49TWF0aC5yb3VuZChvLWEudG9wKX10aGlzLnNldFJpcHBsZVhZKGksbiksdGhpcy5zZXRSaXBwbGVTdHlsZXMoITApLHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5hbmltRnJhbWVIYW5kbGVyLmJpbmQodGhpcykpfX0seS5wcm90b3R5cGUudXBIYW5kbGVyXz1mdW5jdGlvbihlKXtlJiYyIT09ZS5kZXRhaWwmJndpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dGhpcy5yaXBwbGVFbGVtZW50Xy5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuQ3NzQ2xhc3Nlc18uSVNfVklTSUJMRSl9LmJpbmQodGhpcyksMCl9LHkucHJvdG90eXBlLmluaXQ9ZnVuY3Rpb24oKXtpZih0aGlzLmVsZW1lbnRfKXt2YXIgZT10aGlzLmVsZW1lbnRfLmNsYXNzTGlzdC5jb250YWlucyh0aGlzLkNzc0NsYXNzZXNfLlJJUFBMRV9DRU5URVIpO3RoaXMuZWxlbWVudF8uY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuQ3NzQ2xhc3Nlc18uUklQUExFX0VGRkVDVF9JR05PUkVfRVZFTlRTKXx8KHRoaXMucmlwcGxlRWxlbWVudF89dGhpcy5lbGVtZW50Xy5xdWVyeVNlbGVjdG9yKFwiLlwiK3RoaXMuQ3NzQ2xhc3Nlc18uUklQUExFKSx0aGlzLmZyYW1lQ291bnRfPTAsdGhpcy5yaXBwbGVTaXplXz0wLHRoaXMueF89MCx0aGlzLnlfPTAsdGhpcy5pZ25vcmluZ01vdXNlRG93bl89ITEsdGhpcy5ib3VuZERvd25IYW5kbGVyPXRoaXMuZG93bkhhbmRsZXJfLmJpbmQodGhpcyksdGhpcy5lbGVtZW50Xy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsdGhpcy5ib3VuZERvd25IYW5kbGVyKSx0aGlzLmVsZW1lbnRfLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsdGhpcy5ib3VuZERvd25IYW5kbGVyKSx0aGlzLmJvdW5kVXBIYW5kbGVyPXRoaXMudXBIYW5kbGVyXy5iaW5kKHRoaXMpLHRoaXMuZWxlbWVudF8uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIix0aGlzLmJvdW5kVXBIYW5kbGVyKSx0aGlzLmVsZW1lbnRfLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsdGhpcy5ib3VuZFVwSGFuZGxlciksdGhpcy5lbGVtZW50Xy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIix0aGlzLmJvdW5kVXBIYW5kbGVyKSx0aGlzLmVsZW1lbnRfLmFkZEV2ZW50TGlzdGVuZXIoXCJibHVyXCIsdGhpcy5ib3VuZFVwSGFuZGxlciksdGhpcy5nZXRGcmFtZUNvdW50PWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZnJhbWVDb3VudF99LHRoaXMuc2V0RnJhbWVDb3VudD1mdW5jdGlvbihlKXt0aGlzLmZyYW1lQ291bnRfPWV9LHRoaXMuZ2V0UmlwcGxlRWxlbWVudD1mdW5jdGlvbigpe3JldHVybiB0aGlzLnJpcHBsZUVsZW1lbnRffSx0aGlzLnNldFJpcHBsZVhZPWZ1bmN0aW9uKGUsdCl7dGhpcy54Xz1lLHRoaXMueV89dH0sdGhpcy5zZXRSaXBwbGVTdHlsZXM9ZnVuY3Rpb24odCl7aWYobnVsbCE9PXRoaXMucmlwcGxlRWxlbWVudF8pe3ZhciBzLGksbixhPVwidHJhbnNsYXRlKFwiK3RoaXMueF8rXCJweCwgXCIrdGhpcy55XytcInB4KVwiO3Q/KGk9dGhpcy5Db25zdGFudF8uSU5JVElBTF9TQ0FMRSxuPXRoaXMuQ29uc3RhbnRfLklOSVRJQUxfU0laRSk6KGk9dGhpcy5Db25zdGFudF8uRklOQUxfU0NBTEUsbj10aGlzLnJpcHBsZVNpemVfK1wicHhcIixlJiYoYT1cInRyYW5zbGF0ZShcIit0aGlzLmJvdW5kV2lkdGgvMitcInB4LCBcIit0aGlzLmJvdW5kSGVpZ2h0LzIrXCJweClcIikpLHM9XCJ0cmFuc2xhdGUoLTUwJSwgLTUwJSkgXCIrYStpLHRoaXMucmlwcGxlRWxlbWVudF8uc3R5bGUud2Via2l0VHJhbnNmb3JtPXMsdGhpcy5yaXBwbGVFbGVtZW50Xy5zdHlsZS5tc1RyYW5zZm9ybT1zLHRoaXMucmlwcGxlRWxlbWVudF8uc3R5bGUudHJhbnNmb3JtPXMsdD90aGlzLnJpcHBsZUVsZW1lbnRfLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5Dc3NDbGFzc2VzXy5JU19BTklNQVRJTkcpOnRoaXMucmlwcGxlRWxlbWVudF8uY2xhc3NMaXN0LmFkZCh0aGlzLkNzc0NsYXNzZXNfLklTX0FOSU1BVElORyl9fSx0aGlzLmFuaW1GcmFtZUhhbmRsZXI9ZnVuY3Rpb24oKXt0aGlzLmZyYW1lQ291bnRfLS0gPjA/d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1GcmFtZUhhbmRsZXIuYmluZCh0aGlzKSk6dGhpcy5zZXRSaXBwbGVTdHlsZXMoITEpfSl9fSxzLnJlZ2lzdGVyKHtjb25zdHJ1Y3Rvcjp5LGNsYXNzQXNTdHJpbmc6XCJNYXRlcmlhbFJpcHBsZVwiLGNzc0NsYXNzOlwibWRsLWpzLXJpcHBsZS1lZmZlY3RcIix3aWRnZXQ6ITF9KX0oKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hdGVyaWFsLm1pbi5qcy5tYXBcbiIsIi8qIVxuICogVGFwIGxpc3RlbmVyIHYyLjAuMFxuICogbGlzdGVucyB0byB0YXBzXG4gKiBNSVQgbGljZW5zZVxuICovXG5cbi8qanNoaW50IGJyb3dzZXI6IHRydWUsIHVudXNlZDogdHJ1ZSwgdW5kZWY6IHRydWUsIHN0cmljdDogdHJ1ZSAqL1xuXG4oIGZ1bmN0aW9uKCB3aW5kb3csIGZhY3RvcnkgKSB7XG4gIC8vIHVuaXZlcnNhbCBtb2R1bGUgZGVmaW5pdGlvblxuICAvKmpzaGludCBzdHJpY3Q6IGZhbHNlKi8gLypnbG9iYWxzIGRlZmluZSwgbW9kdWxlLCByZXF1aXJlICovXG5cbiAgaWYgKCB0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCApIHtcbiAgICAvLyBBTURcbiAgICBkZWZpbmUoIFtcbiAgICAgICd1bmlwb2ludGVyL3VuaXBvaW50ZXInXG4gICAgXSwgZnVuY3Rpb24oIFVuaXBvaW50ZXIgKSB7XG4gICAgICByZXR1cm4gZmFjdG9yeSggd2luZG93LCBVbmlwb2ludGVyICk7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAoIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMgKSB7XG4gICAgLy8gQ29tbW9uSlNcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoXG4gICAgICB3aW5kb3csXG4gICAgICByZXF1aXJlKCd1bmlwb2ludGVyJylcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIC8vIGJyb3dzZXIgZ2xvYmFsXG4gICAgd2luZG93LlRhcExpc3RlbmVyID0gZmFjdG9yeShcbiAgICAgIHdpbmRvdyxcbiAgICAgIHdpbmRvdy5Vbmlwb2ludGVyXG4gICAgKTtcbiAgfVxuXG59KCB3aW5kb3csIGZ1bmN0aW9uIGZhY3RvcnkoIHdpbmRvdywgVW5pcG9pbnRlciApIHtcblxuJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgVGFwTGlzdGVuZXIgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuZnVuY3Rpb24gVGFwTGlzdGVuZXIoIGVsZW0gKSB7XG4gIHRoaXMuYmluZFRhcCggZWxlbSApO1xufVxuXG4vLyBpbmhlcml0IFVuaXBvaW50ZXIgJiBFdmVudEVtaXR0ZXJcbnZhciBwcm90byA9IFRhcExpc3RlbmVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIFVuaXBvaW50ZXIucHJvdG90eXBlICk7XG5cbi8qKlxuICogYmluZCB0YXAgZXZlbnQgdG8gZWxlbWVudFxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtXG4gKi9cbnByb3RvLmJpbmRUYXAgPSBmdW5jdGlvbiggZWxlbSApIHtcbiAgaWYgKCAhZWxlbSApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGhpcy51bmJpbmRUYXAoKTtcbiAgdGhpcy50YXBFbGVtZW50ID0gZWxlbTtcbiAgdGhpcy5fYmluZFN0YXJ0RXZlbnQoIGVsZW0sIHRydWUgKTtcbn07XG5cbnByb3RvLnVuYmluZFRhcCA9IGZ1bmN0aW9uKCkge1xuICBpZiAoICF0aGlzLnRhcEVsZW1lbnQgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRoaXMuX2JpbmRTdGFydEV2ZW50KCB0aGlzLnRhcEVsZW1lbnQsIHRydWUgKTtcbiAgZGVsZXRlIHRoaXMudGFwRWxlbWVudDtcbn07XG5cbi8qKlxuICogcG9pbnRlciB1cFxuICogQHBhcmFtIHtFdmVudH0gZXZlbnRcbiAqIEBwYXJhbSB7RXZlbnQgb3IgVG91Y2h9IHBvaW50ZXJcbiAqL1xucHJvdG8ucG9pbnRlclVwID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICAvLyBpZ25vcmUgZW11bGF0ZWQgbW91c2UgdXAgY2xpY2tzXG4gIGlmICggdGhpcy5pc0lnbm9yaW5nTW91c2VVcCAmJiBldmVudC50eXBlID09ICdtb3VzZXVwJyApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgcG9pbnRlclBvaW50ID0gVW5pcG9pbnRlci5nZXRQb2ludGVyUG9pbnQoIHBvaW50ZXIgKTtcbiAgdmFyIGJvdW5kaW5nUmVjdCA9IHRoaXMudGFwRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgdmFyIHNjcm9sbFggPSB3aW5kb3cucGFnZVhPZmZzZXQ7XG4gIHZhciBzY3JvbGxZID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xuICAvLyBjYWxjdWxhdGUgaWYgcG9pbnRlciBpcyBpbnNpZGUgdGFwRWxlbWVudFxuICB2YXIgaXNJbnNpZGUgPSBwb2ludGVyUG9pbnQueCA+PSBib3VuZGluZ1JlY3QubGVmdCArIHNjcm9sbFggJiZcbiAgICBwb2ludGVyUG9pbnQueCA8PSBib3VuZGluZ1JlY3QucmlnaHQgKyBzY3JvbGxYICYmXG4gICAgcG9pbnRlclBvaW50LnkgPj0gYm91bmRpbmdSZWN0LnRvcCArIHNjcm9sbFkgJiZcbiAgICBwb2ludGVyUG9pbnQueSA8PSBib3VuZGluZ1JlY3QuYm90dG9tICsgc2Nyb2xsWTtcbiAgLy8gdHJpZ2dlciBjYWxsYmFjayBpZiBwb2ludGVyIGlzIGluc2lkZSBlbGVtZW50XG4gIGlmICggaXNJbnNpZGUgKSB7XG4gICAgdGhpcy5lbWl0RXZlbnQoICd0YXAnLCBbIGV2ZW50LCBwb2ludGVyIF0gKTtcbiAgfVxuXG4gIC8vIHNldCBmbGFnIGZvciBlbXVsYXRlZCBjbGlja3MgMzAwbXMgYWZ0ZXIgdG91Y2hlbmRcbiAgaWYgKCBldmVudC50eXBlICE9ICdtb3VzZXVwJyApIHtcbiAgICB0aGlzLmlzSWdub3JpbmdNb3VzZVVwID0gdHJ1ZTtcbiAgICAvLyByZXNldCBmbGFnIGFmdGVyIDMwMG1zXG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICBzZXRUaW1lb3V0KCBmdW5jdGlvbigpIHtcbiAgICAgIGRlbGV0ZSBfdGhpcy5pc0lnbm9yaW5nTW91c2VVcDtcbiAgICB9LCA0MDAgKTtcbiAgfVxufTtcblxucHJvdG8uZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnBvaW50ZXJEb25lKCk7XG4gIHRoaXMudW5iaW5kVGFwKCk7XG59O1xuXG4vLyAtLS0tLSAgLS0tLS0gLy9cblxucmV0dXJuIFRhcExpc3RlbmVyO1xuXG59KSk7XG4iLCIvKiFcbiAqIFVuaWRyYWdnZXIgdjIuMS4wXG4gKiBEcmFnZ2FibGUgYmFzZSBjbGFzc1xuICogTUlUIGxpY2Vuc2VcbiAqL1xuXG4vKmpzaGludCBicm93c2VyOiB0cnVlLCB1bnVzZWQ6IHRydWUsIHVuZGVmOiB0cnVlLCBzdHJpY3Q6IHRydWUgKi9cblxuKCBmdW5jdGlvbiggd2luZG93LCBmYWN0b3J5ICkge1xuICAvLyB1bml2ZXJzYWwgbW9kdWxlIGRlZmluaXRpb25cbiAgLypqc2hpbnQgc3RyaWN0OiBmYWxzZSAqLyAvKmdsb2JhbHMgZGVmaW5lLCBtb2R1bGUsIHJlcXVpcmUgKi9cblxuICBpZiAoIHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kICkge1xuICAgIC8vIEFNRFxuICAgIGRlZmluZSggW1xuICAgICAgJ3VuaXBvaW50ZXIvdW5pcG9pbnRlcidcbiAgICBdLCBmdW5jdGlvbiggVW5pcG9pbnRlciApIHtcbiAgICAgIHJldHVybiBmYWN0b3J5KCB3aW5kb3csIFVuaXBvaW50ZXIgKTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmICggdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyApIHtcbiAgICAvLyBDb21tb25KU1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShcbiAgICAgIHdpbmRvdyxcbiAgICAgIHJlcXVpcmUoJ3VuaXBvaW50ZXInKVxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgLy8gYnJvd3NlciBnbG9iYWxcbiAgICB3aW5kb3cuVW5pZHJhZ2dlciA9IGZhY3RvcnkoXG4gICAgICB3aW5kb3csXG4gICAgICB3aW5kb3cuVW5pcG9pbnRlclxuICAgICk7XG4gIH1cblxufSggd2luZG93LCBmdW5jdGlvbiBmYWN0b3J5KCB3aW5kb3csIFVuaXBvaW50ZXIgKSB7XG5cbid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0gIC0tLS0tIC8vXG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBVbmlkcmFnZ2VyIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbmZ1bmN0aW9uIFVuaWRyYWdnZXIoKSB7fVxuXG4vLyBpbmhlcml0IFVuaXBvaW50ZXIgJiBFdkVtaXR0ZXJcbnZhciBwcm90byA9IFVuaWRyYWdnZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggVW5pcG9pbnRlci5wcm90b3R5cGUgKTtcblxuLy8gLS0tLS0gYmluZCBzdGFydCAtLS0tLSAvL1xuXG5wcm90by5iaW5kSGFuZGxlcyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLl9iaW5kSGFuZGxlcyggdHJ1ZSApO1xufTtcblxucHJvdG8udW5iaW5kSGFuZGxlcyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLl9iaW5kSGFuZGxlcyggZmFsc2UgKTtcbn07XG5cbnZhciBuYXZpZ2F0b3IgPSB3aW5kb3cubmF2aWdhdG9yO1xuLyoqXG4gKiB3b3JrcyBhcyB1bmJpbmRlciwgYXMgeW91IGNhbiAuYmluZEhhbmRsZXMoIGZhbHNlICkgdG8gdW5iaW5kXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGlzQmluZCAtIHdpbGwgdW5iaW5kIGlmIGZhbHNleVxuICovXG5wcm90by5fYmluZEhhbmRsZXMgPSBmdW5jdGlvbiggaXNCaW5kICkge1xuICAvLyBtdW5nZSBpc0JpbmQsIGRlZmF1bHQgdG8gdHJ1ZVxuICBpc0JpbmQgPSBpc0JpbmQgPT09IHVuZGVmaW5lZCA/IHRydWUgOiAhIWlzQmluZDtcbiAgLy8gZXh0cmEgYmluZCBsb2dpY1xuICB2YXIgYmluZGVyRXh0cmE7XG4gIGlmICggbmF2aWdhdG9yLnBvaW50ZXJFbmFibGVkICkge1xuICAgIGJpbmRlckV4dHJhID0gZnVuY3Rpb24oIGhhbmRsZSApIHtcbiAgICAgIC8vIGRpc2FibGUgc2Nyb2xsaW5nIG9uIHRoZSBlbGVtZW50XG4gICAgICBoYW5kbGUuc3R5bGUudG91Y2hBY3Rpb24gPSBpc0JpbmQgPyAnbm9uZScgOiAnJztcbiAgICB9O1xuICB9IGVsc2UgaWYgKCBuYXZpZ2F0b3IubXNQb2ludGVyRW5hYmxlZCApIHtcbiAgICBiaW5kZXJFeHRyYSA9IGZ1bmN0aW9uKCBoYW5kbGUgKSB7XG4gICAgICAvLyBkaXNhYmxlIHNjcm9sbGluZyBvbiB0aGUgZWxlbWVudFxuICAgICAgaGFuZGxlLnN0eWxlLm1zVG91Y2hBY3Rpb24gPSBpc0JpbmQgPyAnbm9uZScgOiAnJztcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIGJpbmRlckV4dHJhID0gbm9vcDtcbiAgfVxuICAvLyBiaW5kIGVhY2ggaGFuZGxlXG4gIHZhciBiaW5kTWV0aG9kID0gaXNCaW5kID8gJ2FkZEV2ZW50TGlzdGVuZXInIDogJ3JlbW92ZUV2ZW50TGlzdGVuZXInO1xuICBmb3IgKCB2YXIgaT0wOyBpIDwgdGhpcy5oYW5kbGVzLmxlbmd0aDsgaSsrICkge1xuICAgIHZhciBoYW5kbGUgPSB0aGlzLmhhbmRsZXNbaV07XG4gICAgdGhpcy5fYmluZFN0YXJ0RXZlbnQoIGhhbmRsZSwgaXNCaW5kICk7XG4gICAgYmluZGVyRXh0cmEoIGhhbmRsZSApO1xuICAgIGhhbmRsZVsgYmluZE1ldGhvZCBdKCAnY2xpY2snLCB0aGlzICk7XG4gIH1cbn07XG5cbi8vIC0tLS0tIHN0YXJ0IGV2ZW50IC0tLS0tIC8vXG5cbi8qKlxuICogcG9pbnRlciBzdGFydFxuICogQHBhcmFtIHtFdmVudH0gZXZlbnRcbiAqIEBwYXJhbSB7RXZlbnQgb3IgVG91Y2h9IHBvaW50ZXJcbiAqL1xucHJvdG8ucG9pbnRlckRvd24gPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIgKSB7XG4gIC8vIGRpc21pc3MgcmFuZ2Ugc2xpZGVyc1xuICBpZiAoIGV2ZW50LnRhcmdldC5ub2RlTmFtZSA9PSAnSU5QVVQnICYmIGV2ZW50LnRhcmdldC50eXBlID09ICdyYW5nZScgKSB7XG4gICAgLy8gcmVzZXQgcG9pbnRlckRvd24gbG9naWNcbiAgICB0aGlzLmlzUG9pbnRlckRvd24gPSBmYWxzZTtcbiAgICBkZWxldGUgdGhpcy5wb2ludGVySWRlbnRpZmllcjtcbiAgICByZXR1cm47XG4gIH1cblxuICB0aGlzLl9kcmFnUG9pbnRlckRvd24oIGV2ZW50LCBwb2ludGVyICk7XG4gIC8vIGtsdWRnZSB0byBibHVyIGZvY3VzZWQgaW5wdXRzIGluIGRyYWdnZXJcbiAgdmFyIGZvY3VzZWQgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICBpZiAoIGZvY3VzZWQgJiYgZm9jdXNlZC5ibHVyICkge1xuICAgIGZvY3VzZWQuYmx1cigpO1xuICB9XG4gIC8vIGJpbmQgbW92ZSBhbmQgZW5kIGV2ZW50c1xuICB0aGlzLl9iaW5kUG9zdFN0YXJ0RXZlbnRzKCBldmVudCApO1xuICB0aGlzLmVtaXRFdmVudCggJ3BvaW50ZXJEb3duJywgWyBldmVudCwgcG9pbnRlciBdICk7XG59O1xuXG4vLyBiYXNlIHBvaW50ZXIgZG93biBsb2dpY1xucHJvdG8uX2RyYWdQb2ludGVyRG93biA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgLy8gdHJhY2sgdG8gc2VlIHdoZW4gZHJhZ2dpbmcgc3RhcnRzXG4gIHRoaXMucG9pbnRlckRvd25Qb2ludCA9IFVuaXBvaW50ZXIuZ2V0UG9pbnRlclBvaW50KCBwb2ludGVyICk7XG5cbiAgdmFyIGNhblByZXZlbnREZWZhdWx0ID0gdGhpcy5jYW5QcmV2ZW50RGVmYXVsdE9uUG9pbnRlckRvd24oIGV2ZW50LCBwb2ludGVyICk7XG4gIGlmICggY2FuUHJldmVudERlZmF1bHQgKSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfVxufTtcblxuLy8gb3ZlcndyaXRlYWJsZSBtZXRob2Qgc28gRmxpY2tpdHkgY2FuIHByZXZlbnQgZm9yIHNjcm9sbGluZ1xucHJvdG8uY2FuUHJldmVudERlZmF1bHRPblBvaW50ZXJEb3duID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICAvLyBwcmV2ZW50IGRlZmF1bHQsIHVubGVzcyB0b3VjaHN0YXJ0IG9yIDxzZWxlY3Q+XG4gIHJldHVybiBldmVudC50YXJnZXQubm9kZU5hbWUgIT0gJ1NFTEVDVCc7XG59O1xuXG4vLyAtLS0tLSBtb3ZlIGV2ZW50IC0tLS0tIC8vXG5cbi8qKlxuICogZHJhZyBtb3ZlXG4gKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuICogQHBhcmFtIHtFdmVudCBvciBUb3VjaH0gcG9pbnRlclxuICovXG5wcm90by5wb2ludGVyTW92ZSA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgdmFyIG1vdmVWZWN0b3IgPSB0aGlzLl9kcmFnUG9pbnRlck1vdmUoIGV2ZW50LCBwb2ludGVyICk7XG4gIHRoaXMuZW1pdEV2ZW50KCAncG9pbnRlck1vdmUnLCBbIGV2ZW50LCBwb2ludGVyLCBtb3ZlVmVjdG9yIF0gKTtcbiAgdGhpcy5fZHJhZ01vdmUoIGV2ZW50LCBwb2ludGVyLCBtb3ZlVmVjdG9yICk7XG59O1xuXG4vLyBiYXNlIHBvaW50ZXIgbW92ZSBsb2dpY1xucHJvdG8uX2RyYWdQb2ludGVyTW92ZSA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgdmFyIG1vdmVQb2ludCA9IFVuaXBvaW50ZXIuZ2V0UG9pbnRlclBvaW50KCBwb2ludGVyICk7XG4gIHZhciBtb3ZlVmVjdG9yID0ge1xuICAgIHg6IG1vdmVQb2ludC54IC0gdGhpcy5wb2ludGVyRG93blBvaW50LngsXG4gICAgeTogbW92ZVBvaW50LnkgLSB0aGlzLnBvaW50ZXJEb3duUG9pbnQueVxuICB9O1xuICAvLyBzdGFydCBkcmFnIGlmIHBvaW50ZXIgaGFzIG1vdmVkIGZhciBlbm91Z2ggdG8gc3RhcnQgZHJhZ1xuICBpZiAoICF0aGlzLmlzRHJhZ2dpbmcgJiYgdGhpcy5oYXNEcmFnU3RhcnRlZCggbW92ZVZlY3RvciApICkge1xuICAgIHRoaXMuX2RyYWdTdGFydCggZXZlbnQsIHBvaW50ZXIgKTtcbiAgfVxuICByZXR1cm4gbW92ZVZlY3Rvcjtcbn07XG5cbi8vIGNvbmRpdGlvbiBpZiBwb2ludGVyIGhhcyBtb3ZlZCBmYXIgZW5vdWdoIHRvIHN0YXJ0IGRyYWdcbnByb3RvLmhhc0RyYWdTdGFydGVkID0gZnVuY3Rpb24oIG1vdmVWZWN0b3IgKSB7XG4gIHJldHVybiBNYXRoLmFicyggbW92ZVZlY3Rvci54ICkgPiAzIHx8IE1hdGguYWJzKCBtb3ZlVmVjdG9yLnkgKSA+IDM7XG59O1xuXG5cbi8vIC0tLS0tIGVuZCBldmVudCAtLS0tLSAvL1xuXG4vKipcbiAqIHBvaW50ZXIgdXBcbiAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XG4gKiBAcGFyYW0ge0V2ZW50IG9yIFRvdWNofSBwb2ludGVyXG4gKi9cbnByb3RvLnBvaW50ZXJVcCA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgdGhpcy5lbWl0RXZlbnQoICdwb2ludGVyVXAnLCBbIGV2ZW50LCBwb2ludGVyIF0gKTtcbiAgdGhpcy5fZHJhZ1BvaW50ZXJVcCggZXZlbnQsIHBvaW50ZXIgKTtcbn07XG5cbnByb3RvLl9kcmFnUG9pbnRlclVwID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICBpZiAoIHRoaXMuaXNEcmFnZ2luZyApIHtcbiAgICB0aGlzLl9kcmFnRW5kKCBldmVudCwgcG9pbnRlciApO1xuICB9IGVsc2Uge1xuICAgIC8vIHBvaW50ZXIgZGlkbid0IG1vdmUgZW5vdWdoIGZvciBkcmFnIHRvIHN0YXJ0XG4gICAgdGhpcy5fc3RhdGljQ2xpY2soIGV2ZW50LCBwb2ludGVyICk7XG4gIH1cbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGRyYWcgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuLy8gZHJhZ1N0YXJ0XG5wcm90by5fZHJhZ1N0YXJ0ID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICB0aGlzLmlzRHJhZ2dpbmcgPSB0cnVlO1xuICB0aGlzLmRyYWdTdGFydFBvaW50ID0gVW5pcG9pbnRlci5nZXRQb2ludGVyUG9pbnQoIHBvaW50ZXIgKTtcbiAgLy8gcHJldmVudCBjbGlja3NcbiAgdGhpcy5pc1ByZXZlbnRpbmdDbGlja3MgPSB0cnVlO1xuXG4gIHRoaXMuZHJhZ1N0YXJ0KCBldmVudCwgcG9pbnRlciApO1xufTtcblxucHJvdG8uZHJhZ1N0YXJ0ID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICB0aGlzLmVtaXRFdmVudCggJ2RyYWdTdGFydCcsIFsgZXZlbnQsIHBvaW50ZXIgXSApO1xufTtcblxuLy8gZHJhZ01vdmVcbnByb3RvLl9kcmFnTW92ZSA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciwgbW92ZVZlY3RvciApIHtcbiAgLy8gZG8gbm90IGRyYWcgaWYgbm90IGRyYWdnaW5nIHlldFxuICBpZiAoICF0aGlzLmlzRHJhZ2dpbmcgKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdGhpcy5kcmFnTW92ZSggZXZlbnQsIHBvaW50ZXIsIG1vdmVWZWN0b3IgKTtcbn07XG5cbnByb3RvLmRyYWdNb3ZlID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyLCBtb3ZlVmVjdG9yICkge1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB0aGlzLmVtaXRFdmVudCggJ2RyYWdNb3ZlJywgWyBldmVudCwgcG9pbnRlciwgbW92ZVZlY3RvciBdICk7XG59O1xuXG4vLyBkcmFnRW5kXG5wcm90by5fZHJhZ0VuZCA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgLy8gc2V0IGZsYWdzXG4gIHRoaXMuaXNEcmFnZ2luZyA9IGZhbHNlO1xuICAvLyByZS1lbmFibGUgY2xpY2tpbmcgYXN5bmNcbiAgc2V0VGltZW91dCggZnVuY3Rpb24oKSB7XG4gICAgZGVsZXRlIHRoaXMuaXNQcmV2ZW50aW5nQ2xpY2tzO1xuICB9LmJpbmQoIHRoaXMgKSApO1xuXG4gIHRoaXMuZHJhZ0VuZCggZXZlbnQsIHBvaW50ZXIgKTtcbn07XG5cbnByb3RvLmRyYWdFbmQgPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIgKSB7XG4gIHRoaXMuZW1pdEV2ZW50KCAnZHJhZ0VuZCcsIFsgZXZlbnQsIHBvaW50ZXIgXSApO1xufTtcblxuLy8gLS0tLS0gb25jbGljayAtLS0tLSAvL1xuXG4vLyBoYW5kbGUgYWxsIGNsaWNrcyBhbmQgcHJldmVudCBjbGlja3Mgd2hlbiBkcmFnZ2luZ1xucHJvdG8ub25jbGljayA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgaWYgKCB0aGlzLmlzUHJldmVudGluZ0NsaWNrcyApIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG59O1xuXG4vLyAtLS0tLSBzdGF0aWNDbGljayAtLS0tLSAvL1xuXG4vLyB0cmlnZ2VyZWQgYWZ0ZXIgcG9pbnRlciBkb3duICYgdXAgd2l0aCBuby90aW55IG1vdmVtZW50XG5wcm90by5fc3RhdGljQ2xpY2sgPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIgKSB7XG4gIC8vIGlnbm9yZSBlbXVsYXRlZCBtb3VzZSB1cCBjbGlja3NcbiAgaWYgKCB0aGlzLmlzSWdub3JpbmdNb3VzZVVwICYmIGV2ZW50LnR5cGUgPT0gJ21vdXNldXAnICkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIGFsbG93IGNsaWNrIGluIDxpbnB1dD5zIGFuZCA8dGV4dGFyZWE+c1xuICB2YXIgbm9kZU5hbWUgPSBldmVudC50YXJnZXQubm9kZU5hbWU7XG4gIGlmICggbm9kZU5hbWUgPT0gJ0lOUFVUJyB8fCBub2RlTmFtZSA9PSAnVEVYVEFSRUEnICkge1xuICAgIGV2ZW50LnRhcmdldC5mb2N1cygpO1xuICB9XG4gIHRoaXMuc3RhdGljQ2xpY2soIGV2ZW50LCBwb2ludGVyICk7XG5cbiAgLy8gc2V0IGZsYWcgZm9yIGVtdWxhdGVkIGNsaWNrcyAzMDBtcyBhZnRlciB0b3VjaGVuZFxuICBpZiAoIGV2ZW50LnR5cGUgIT0gJ21vdXNldXAnICkge1xuICAgIHRoaXMuaXNJZ25vcmluZ01vdXNlVXAgPSB0cnVlO1xuICAgIC8vIHJlc2V0IGZsYWcgYWZ0ZXIgMzAwbXNcbiAgICBzZXRUaW1lb3V0KCBmdW5jdGlvbigpIHtcbiAgICAgIGRlbGV0ZSB0aGlzLmlzSWdub3JpbmdNb3VzZVVwO1xuICAgIH0uYmluZCggdGhpcyApLCA0MDAgKTtcbiAgfVxufTtcblxucHJvdG8uc3RhdGljQ2xpY2sgPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIgKSB7XG4gIHRoaXMuZW1pdEV2ZW50KCAnc3RhdGljQ2xpY2snLCBbIGV2ZW50LCBwb2ludGVyIF0gKTtcbn07XG5cbi8vIC0tLS0tIHV0aWxzIC0tLS0tIC8vXG5cblVuaWRyYWdnZXIuZ2V0UG9pbnRlclBvaW50ID0gVW5pcG9pbnRlci5nZXRQb2ludGVyUG9pbnQ7XG5cbi8vIC0tLS0tICAtLS0tLSAvL1xuXG5yZXR1cm4gVW5pZHJhZ2dlcjtcblxufSkpO1xuIiwiLyohXG4gKiBVbmlwb2ludGVyIHYyLjEuMFxuICogYmFzZSBjbGFzcyBmb3IgZG9pbmcgb25lIHRoaW5nIHdpdGggcG9pbnRlciBldmVudFxuICogTUlUIGxpY2Vuc2VcbiAqL1xuXG4vKmpzaGludCBicm93c2VyOiB0cnVlLCB1bmRlZjogdHJ1ZSwgdW51c2VkOiB0cnVlLCBzdHJpY3Q6IHRydWUgKi9cblxuKCBmdW5jdGlvbiggd2luZG93LCBmYWN0b3J5ICkge1xuICAvLyB1bml2ZXJzYWwgbW9kdWxlIGRlZmluaXRpb25cbiAgLyoganNoaW50IHN0cmljdDogZmFsc2UgKi8gLypnbG9iYWwgZGVmaW5lLCBtb2R1bGUsIHJlcXVpcmUgKi9cbiAgaWYgKCB0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCApIHtcbiAgICAvLyBBTURcbiAgICBkZWZpbmUoIFtcbiAgICAgICdldi1lbWl0dGVyL2V2LWVtaXR0ZXInXG4gICAgXSwgZnVuY3Rpb24oIEV2RW1pdHRlciApIHtcbiAgICAgIHJldHVybiBmYWN0b3J5KCB3aW5kb3csIEV2RW1pdHRlciApO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKCB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzICkge1xuICAgIC8vIENvbW1vbkpTXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KFxuICAgICAgd2luZG93LFxuICAgICAgcmVxdWlyZSgnZXYtZW1pdHRlcicpXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBicm93c2VyIGdsb2JhbFxuICAgIHdpbmRvdy5Vbmlwb2ludGVyID0gZmFjdG9yeShcbiAgICAgIHdpbmRvdyxcbiAgICAgIHdpbmRvdy5FdkVtaXR0ZXJcbiAgICApO1xuICB9XG5cbn0oIHdpbmRvdywgZnVuY3Rpb24gZmFjdG9yeSggd2luZG93LCBFdkVtaXR0ZXIgKSB7XG5cbid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbmZ1bmN0aW9uIFVuaXBvaW50ZXIoKSB7fVxuXG4vLyBpbmhlcml0IEV2RW1pdHRlclxudmFyIHByb3RvID0gVW5pcG9pbnRlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBFdkVtaXR0ZXIucHJvdG90eXBlICk7XG5cbnByb3RvLmJpbmRTdGFydEV2ZW50ID0gZnVuY3Rpb24oIGVsZW0gKSB7XG4gIHRoaXMuX2JpbmRTdGFydEV2ZW50KCBlbGVtLCB0cnVlICk7XG59O1xuXG5wcm90by51bmJpbmRTdGFydEV2ZW50ID0gZnVuY3Rpb24oIGVsZW0gKSB7XG4gIHRoaXMuX2JpbmRTdGFydEV2ZW50KCBlbGVtLCBmYWxzZSApO1xufTtcblxuLyoqXG4gKiB3b3JrcyBhcyB1bmJpbmRlciwgYXMgeW91IGNhbiAuX2JpbmRTdGFydCggZmFsc2UgKSB0byB1bmJpbmRcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gaXNCaW5kIC0gd2lsbCB1bmJpbmQgaWYgZmFsc2V5XG4gKi9cbnByb3RvLl9iaW5kU3RhcnRFdmVudCA9IGZ1bmN0aW9uKCBlbGVtLCBpc0JpbmQgKSB7XG4gIC8vIG11bmdlIGlzQmluZCwgZGVmYXVsdCB0byB0cnVlXG4gIGlzQmluZCA9IGlzQmluZCA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6ICEhaXNCaW5kO1xuICB2YXIgYmluZE1ldGhvZCA9IGlzQmluZCA/ICdhZGRFdmVudExpc3RlbmVyJyA6ICdyZW1vdmVFdmVudExpc3RlbmVyJztcblxuICBpZiAoIHdpbmRvdy5uYXZpZ2F0b3IucG9pbnRlckVuYWJsZWQgKSB7XG4gICAgLy8gVzNDIFBvaW50ZXIgRXZlbnRzLCBJRTExLiBTZWUgaHR0cHM6Ly9jb2RlcndhbGwuY29tL3AvbWZyZWNhXG4gICAgZWxlbVsgYmluZE1ldGhvZCBdKCAncG9pbnRlcmRvd24nLCB0aGlzICk7XG4gIH0gZWxzZSBpZiAoIHdpbmRvdy5uYXZpZ2F0b3IubXNQb2ludGVyRW5hYmxlZCApIHtcbiAgICAvLyBJRTEwIFBvaW50ZXIgRXZlbnRzXG4gICAgZWxlbVsgYmluZE1ldGhvZCBdKCAnTVNQb2ludGVyRG93bicsIHRoaXMgKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBsaXN0ZW4gZm9yIGJvdGgsIGZvciBkZXZpY2VzIGxpa2UgQ2hyb21lIFBpeGVsXG4gICAgZWxlbVsgYmluZE1ldGhvZCBdKCAnbW91c2Vkb3duJywgdGhpcyApO1xuICAgIGVsZW1bIGJpbmRNZXRob2QgXSggJ3RvdWNoc3RhcnQnLCB0aGlzICk7XG4gIH1cbn07XG5cbi8vIHRyaWdnZXIgaGFuZGxlciBtZXRob2RzIGZvciBldmVudHNcbnByb3RvLmhhbmRsZUV2ZW50ID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICB2YXIgbWV0aG9kID0gJ29uJyArIGV2ZW50LnR5cGU7XG4gIGlmICggdGhpc1sgbWV0aG9kIF0gKSB7XG4gICAgdGhpc1sgbWV0aG9kIF0oIGV2ZW50ICk7XG4gIH1cbn07XG5cbi8vIHJldHVybnMgdGhlIHRvdWNoIHRoYXQgd2UncmUga2VlcGluZyB0cmFjayBvZlxucHJvdG8uZ2V0VG91Y2ggPSBmdW5jdGlvbiggdG91Y2hlcyApIHtcbiAgZm9yICggdmFyIGk9MDsgaSA8IHRvdWNoZXMubGVuZ3RoOyBpKysgKSB7XG4gICAgdmFyIHRvdWNoID0gdG91Y2hlc1tpXTtcbiAgICBpZiAoIHRvdWNoLmlkZW50aWZpZXIgPT0gdGhpcy5wb2ludGVySWRlbnRpZmllciApIHtcbiAgICAgIHJldHVybiB0b3VjaDtcbiAgICB9XG4gIH1cbn07XG5cbi8vIC0tLS0tIHN0YXJ0IGV2ZW50IC0tLS0tIC8vXG5cbnByb3RvLm9ubW91c2Vkb3duID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICAvLyBkaXNtaXNzIGNsaWNrcyBmcm9tIHJpZ2h0IG9yIG1pZGRsZSBidXR0b25zXG4gIHZhciBidXR0b24gPSBldmVudC5idXR0b247XG4gIGlmICggYnV0dG9uICYmICggYnV0dG9uICE9PSAwICYmIGJ1dHRvbiAhPT0gMSApICkge1xuICAgIHJldHVybjtcbiAgfVxuICB0aGlzLl9wb2ludGVyRG93biggZXZlbnQsIGV2ZW50ICk7XG59O1xuXG5wcm90by5vbnRvdWNoc3RhcnQgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIHRoaXMuX3BvaW50ZXJEb3duKCBldmVudCwgZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0gKTtcbn07XG5cbnByb3RvLm9uTVNQb2ludGVyRG93biA9XG5wcm90by5vbnBvaW50ZXJkb3duID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICB0aGlzLl9wb2ludGVyRG93biggZXZlbnQsIGV2ZW50ICk7XG59O1xuXG4vKipcbiAqIHBvaW50ZXIgc3RhcnRcbiAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XG4gKiBAcGFyYW0ge0V2ZW50IG9yIFRvdWNofSBwb2ludGVyXG4gKi9cbnByb3RvLl9wb2ludGVyRG93biA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgLy8gZGlzbWlzcyBvdGhlciBwb2ludGVyc1xuICBpZiAoIHRoaXMuaXNQb2ludGVyRG93biApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB0aGlzLmlzUG9pbnRlckRvd24gPSB0cnVlO1xuICAvLyBzYXZlIHBvaW50ZXIgaWRlbnRpZmllciB0byBtYXRjaCB1cCB0b3VjaCBldmVudHNcbiAgdGhpcy5wb2ludGVySWRlbnRpZmllciA9IHBvaW50ZXIucG9pbnRlcklkICE9PSB1bmRlZmluZWQgP1xuICAgIC8vIHBvaW50ZXJJZCBmb3IgcG9pbnRlciBldmVudHMsIHRvdWNoLmluZGVudGlmaWVyIGZvciB0b3VjaCBldmVudHNcbiAgICBwb2ludGVyLnBvaW50ZXJJZCA6IHBvaW50ZXIuaWRlbnRpZmllcjtcblxuICB0aGlzLnBvaW50ZXJEb3duKCBldmVudCwgcG9pbnRlciApO1xufTtcblxucHJvdG8ucG9pbnRlckRvd24gPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIgKSB7XG4gIHRoaXMuX2JpbmRQb3N0U3RhcnRFdmVudHMoIGV2ZW50ICk7XG4gIHRoaXMuZW1pdEV2ZW50KCAncG9pbnRlckRvd24nLCBbIGV2ZW50LCBwb2ludGVyIF0gKTtcbn07XG5cbi8vIGhhc2ggb2YgZXZlbnRzIHRvIGJlIGJvdW5kIGFmdGVyIHN0YXJ0IGV2ZW50XG52YXIgcG9zdFN0YXJ0RXZlbnRzID0ge1xuICBtb3VzZWRvd246IFsgJ21vdXNlbW92ZScsICdtb3VzZXVwJyBdLFxuICB0b3VjaHN0YXJ0OiBbICd0b3VjaG1vdmUnLCAndG91Y2hlbmQnLCAndG91Y2hjYW5jZWwnIF0sXG4gIHBvaW50ZXJkb3duOiBbICdwb2ludGVybW92ZScsICdwb2ludGVydXAnLCAncG9pbnRlcmNhbmNlbCcgXSxcbiAgTVNQb2ludGVyRG93bjogWyAnTVNQb2ludGVyTW92ZScsICdNU1BvaW50ZXJVcCcsICdNU1BvaW50ZXJDYW5jZWwnIF1cbn07XG5cbnByb3RvLl9iaW5kUG9zdFN0YXJ0RXZlbnRzID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICBpZiAoICFldmVudCApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgLy8gZ2V0IHByb3BlciBldmVudHMgdG8gbWF0Y2ggc3RhcnQgZXZlbnRcbiAgdmFyIGV2ZW50cyA9IHBvc3RTdGFydEV2ZW50c1sgZXZlbnQudHlwZSBdO1xuICAvLyBiaW5kIGV2ZW50cyB0byBub2RlXG4gIGV2ZW50cy5mb3JFYWNoKCBmdW5jdGlvbiggZXZlbnROYW1lICkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCBldmVudE5hbWUsIHRoaXMgKTtcbiAgfSwgdGhpcyApO1xuICAvLyBzYXZlIHRoZXNlIGFyZ3VtZW50c1xuICB0aGlzLl9ib3VuZFBvaW50ZXJFdmVudHMgPSBldmVudHM7XG59O1xuXG5wcm90by5fdW5iaW5kUG9zdFN0YXJ0RXZlbnRzID0gZnVuY3Rpb24oKSB7XG4gIC8vIGNoZWNrIGZvciBfYm91bmRFdmVudHMsIGluIGNhc2UgZHJhZ0VuZCB0cmlnZ2VyZWQgdHdpY2UgKG9sZCBJRTggYnVnKVxuICBpZiAoICF0aGlzLl9ib3VuZFBvaW50ZXJFdmVudHMgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRoaXMuX2JvdW5kUG9pbnRlckV2ZW50cy5mb3JFYWNoKCBmdW5jdGlvbiggZXZlbnROYW1lICkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCBldmVudE5hbWUsIHRoaXMgKTtcbiAgfSwgdGhpcyApO1xuXG4gIGRlbGV0ZSB0aGlzLl9ib3VuZFBvaW50ZXJFdmVudHM7XG59O1xuXG4vLyAtLS0tLSBtb3ZlIGV2ZW50IC0tLS0tIC8vXG5cbnByb3RvLm9ubW91c2Vtb3ZlID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICB0aGlzLl9wb2ludGVyTW92ZSggZXZlbnQsIGV2ZW50ICk7XG59O1xuXG5wcm90by5vbk1TUG9pbnRlck1vdmUgPVxucHJvdG8ub25wb2ludGVybW92ZSA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgaWYgKCBldmVudC5wb2ludGVySWQgPT0gdGhpcy5wb2ludGVySWRlbnRpZmllciApIHtcbiAgICB0aGlzLl9wb2ludGVyTW92ZSggZXZlbnQsIGV2ZW50ICk7XG4gIH1cbn07XG5cbnByb3RvLm9udG91Y2htb3ZlID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICB2YXIgdG91Y2ggPSB0aGlzLmdldFRvdWNoKCBldmVudC5jaGFuZ2VkVG91Y2hlcyApO1xuICBpZiAoIHRvdWNoICkge1xuICAgIHRoaXMuX3BvaW50ZXJNb3ZlKCBldmVudCwgdG91Y2ggKTtcbiAgfVxufTtcblxuLyoqXG4gKiBwb2ludGVyIG1vdmVcbiAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XG4gKiBAcGFyYW0ge0V2ZW50IG9yIFRvdWNofSBwb2ludGVyXG4gKiBAcHJpdmF0ZVxuICovXG5wcm90by5fcG9pbnRlck1vdmUgPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIgKSB7XG4gIHRoaXMucG9pbnRlck1vdmUoIGV2ZW50LCBwb2ludGVyICk7XG59O1xuXG4vLyBwdWJsaWNcbnByb3RvLnBvaW50ZXJNb3ZlID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICB0aGlzLmVtaXRFdmVudCggJ3BvaW50ZXJNb3ZlJywgWyBldmVudCwgcG9pbnRlciBdICk7XG59O1xuXG4vLyAtLS0tLSBlbmQgZXZlbnQgLS0tLS0gLy9cblxuXG5wcm90by5vbm1vdXNldXAgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIHRoaXMuX3BvaW50ZXJVcCggZXZlbnQsIGV2ZW50ICk7XG59O1xuXG5wcm90by5vbk1TUG9pbnRlclVwID1cbnByb3RvLm9ucG9pbnRlcnVwID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICBpZiAoIGV2ZW50LnBvaW50ZXJJZCA9PSB0aGlzLnBvaW50ZXJJZGVudGlmaWVyICkge1xuICAgIHRoaXMuX3BvaW50ZXJVcCggZXZlbnQsIGV2ZW50ICk7XG4gIH1cbn07XG5cbnByb3RvLm9udG91Y2hlbmQgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIHZhciB0b3VjaCA9IHRoaXMuZ2V0VG91Y2goIGV2ZW50LmNoYW5nZWRUb3VjaGVzICk7XG4gIGlmICggdG91Y2ggKSB7XG4gICAgdGhpcy5fcG9pbnRlclVwKCBldmVudCwgdG91Y2ggKTtcbiAgfVxufTtcblxuLyoqXG4gKiBwb2ludGVyIHVwXG4gKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuICogQHBhcmFtIHtFdmVudCBvciBUb3VjaH0gcG9pbnRlclxuICogQHByaXZhdGVcbiAqL1xucHJvdG8uX3BvaW50ZXJVcCA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgdGhpcy5fcG9pbnRlckRvbmUoKTtcbiAgdGhpcy5wb2ludGVyVXAoIGV2ZW50LCBwb2ludGVyICk7XG59O1xuXG4vLyBwdWJsaWNcbnByb3RvLnBvaW50ZXJVcCA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgdGhpcy5lbWl0RXZlbnQoICdwb2ludGVyVXAnLCBbIGV2ZW50LCBwb2ludGVyIF0gKTtcbn07XG5cbi8vIC0tLS0tIHBvaW50ZXIgZG9uZSAtLS0tLSAvL1xuXG4vLyB0cmlnZ2VyZWQgb24gcG9pbnRlciB1cCAmIHBvaW50ZXIgY2FuY2VsXG5wcm90by5fcG9pbnRlckRvbmUgPSBmdW5jdGlvbigpIHtcbiAgLy8gcmVzZXQgcHJvcGVydGllc1xuICB0aGlzLmlzUG9pbnRlckRvd24gPSBmYWxzZTtcbiAgZGVsZXRlIHRoaXMucG9pbnRlcklkZW50aWZpZXI7XG4gIC8vIHJlbW92ZSBldmVudHNcbiAgdGhpcy5fdW5iaW5kUG9zdFN0YXJ0RXZlbnRzKCk7XG4gIHRoaXMucG9pbnRlckRvbmUoKTtcbn07XG5cbnByb3RvLnBvaW50ZXJEb25lID0gbm9vcDtcblxuLy8gLS0tLS0gcG9pbnRlciBjYW5jZWwgLS0tLS0gLy9cblxucHJvdG8ub25NU1BvaW50ZXJDYW5jZWwgPVxucHJvdG8ub25wb2ludGVyY2FuY2VsID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICBpZiAoIGV2ZW50LnBvaW50ZXJJZCA9PSB0aGlzLnBvaW50ZXJJZGVudGlmaWVyICkge1xuICAgIHRoaXMuX3BvaW50ZXJDYW5jZWwoIGV2ZW50LCBldmVudCApO1xuICB9XG59O1xuXG5wcm90by5vbnRvdWNoY2FuY2VsID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICB2YXIgdG91Y2ggPSB0aGlzLmdldFRvdWNoKCBldmVudC5jaGFuZ2VkVG91Y2hlcyApO1xuICBpZiAoIHRvdWNoICkge1xuICAgIHRoaXMuX3BvaW50ZXJDYW5jZWwoIGV2ZW50LCB0b3VjaCApO1xuICB9XG59O1xuXG4vKipcbiAqIHBvaW50ZXIgY2FuY2VsXG4gKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuICogQHBhcmFtIHtFdmVudCBvciBUb3VjaH0gcG9pbnRlclxuICogQHByaXZhdGVcbiAqL1xucHJvdG8uX3BvaW50ZXJDYW5jZWwgPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIgKSB7XG4gIHRoaXMuX3BvaW50ZXJEb25lKCk7XG4gIHRoaXMucG9pbnRlckNhbmNlbCggZXZlbnQsIHBvaW50ZXIgKTtcbn07XG5cbi8vIHB1YmxpY1xucHJvdG8ucG9pbnRlckNhbmNlbCA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgdGhpcy5lbWl0RXZlbnQoICdwb2ludGVyQ2FuY2VsJywgWyBldmVudCwgcG9pbnRlciBdICk7XG59O1xuXG4vLyAtLS0tLSAgLS0tLS0gLy9cblxuLy8gdXRpbGl0eSBmdW5jdGlvbiBmb3IgZ2V0dGluZyB4L3kgY29vcmRzIGZyb20gZXZlbnRcblVuaXBvaW50ZXIuZ2V0UG9pbnRlclBvaW50ID0gZnVuY3Rpb24oIHBvaW50ZXIgKSB7XG4gIHJldHVybiB7XG4gICAgeDogcG9pbnRlci5wYWdlWCxcbiAgICB5OiBwb2ludGVyLnBhZ2VZXG4gIH07XG59O1xuXG4vLyAtLS0tLSAgLS0tLS0gLy9cblxucmV0dXJuIFVuaXBvaW50ZXI7XG5cbn0pKTtcbiIsIi8qIVxuICpcbiAqIFZhbmlsbGEtRGF0YVRhYmxlc1xuICogQ29weXJpZ2h0IChjKSAyMDE1IEthcmwgU2F1bmRlcnMgKGh0dHA6Ly9tb2JpdXN3ZWJkZXNpZ24uY28udWspXG4gKiBEdWFsIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgKGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwKVxuICogYW5kIEdQTCAoaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9ncGwtbGljZW5zZS5waHApIGxpY2Vuc2VzLlxuICpcbiAqIFZlcnNpb246IDAuMC44XG4gKlxuICovXG4hZnVuY3Rpb24oYSxiKXt2YXIgYz1cIkRhdGFUYWJsZVwiO1wiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoW10sYihjKSk6XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHM/bW9kdWxlLmV4cG9ydHM9YihjKTphW2NdPWIoYyl9KHRoaXMsZnVuY3Rpb24oYSl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gayhhLGMpe3ZhciBkPXtwZXJQYWdlOjEwLHBlclBhZ2VTZWxlY3Q6WzUsMTAsMTUsMjAsMjVdLG5hdlBvc2l0aW9uOlwiYm90dG9tXCIsbmF2QnV0dG9uczohMCxuZXh0UHJldjohMCxwcmV2VGV4dDpcIiZsc2FxdW87XCIsbmV4dFRleHQ6XCImcnNhcXVvO1wiLHNvcnRhYmxlOiExLHNlYXJjaGFibGU6ITEsZml4ZWRIZWlnaHQ6ITEsaW5mbzohMCxoaWRlVW51c2VkTmF2czohMSxwbHVnaW5zOltdfTt0aGlzLm9wdGlvbnM9YihkLGMpO3ZhciBlPWEudGFnTmFtZS50b0xvd2VyQ2FzZSgpO2lmKFwidGFibGVcIiE9ZSl0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc2VsZWN0ZWQgZWxlbWVudCAoXCIrZStcIikgaXMgbm90IGEgdGFibGUhXCIpO2lmKG51bGw9PT1hLnRIZWFkJiZ0aGlzLm9wdGlvbnMuc29ydGFibGUpdGhyb3cgbmV3IEVycm9yKFwiVGhlIHNvcnRhYmxlIG9wdGlvbiByZXF1aXJlcyB0YWJsZSBoZWFkaW5ncyFcIik7aWYodGhpcy50YWJsZT1hLHRoaXMudGhlYWQ9dGhpcy50YWJsZS50SGVhZCx0aGlzLm9wdGlvbnMuZGF0YSl7dmFyIGY9aih0aGlzLm9wdGlvbnMuZGF0YSk7dGhpcy50YWJsZS50cnVuY2F0ZSgpLHRoaXMudGFibGUuYXBwZW5kQ2hpbGQoZil9dGhpcy50Ym9keT10aGlzLnRhYmxlLnRCb2RpZXNbMF0sdGhpcy5yb3dzPUFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMudGJvZHkucm93cyksdGhpcy5pbml0aWFsaXNlZD0hMSx0aGlzLnNvcnRFbmFibGVkPSExLHRoaXMuaXNJRT0hIS8obXNpZXx0cmlkZW50KS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCksdGhpcy5wYWdpbmF0b3JzPVtdLHRoaXMuY3VycmVudFBhZ2U9MSx0aGlzLm9uRmlyc3RQYWdlPSEwLHRoaXMub25MYXN0UGFnZT0hMSx0aGlzLnNlYXJjaGluZz0hMSx0aGlzLmluaXQoKX12YXIgYj1mdW5jdGlvbihhLGIpe3ZhciBjO2ZvcihjIGluIGIpYi5oYXNPd25Qcm9wZXJ0eShjKSYmKGFbY109YltjXSk7cmV0dXJuIGF9LGM9ZnVuY3Rpb24oYSxiKXtyZXR1cm4gYS5jbGFzc0xpc3Q/YS5jbGFzc0xpc3QuY29udGFpbnMoYik6ISFhLmNsYXNzTmFtZS5tYXRjaChuZXcgUmVnRXhwKFwiKFxcXFxzfF4pXCIrYitcIihcXFxcc3wkKVwiKSl9LGQ9ZnVuY3Rpb24oYSxiKXthLmNsYXNzTGlzdD9hLmNsYXNzTGlzdC5hZGQoYik6YyhiKXx8KGEuY2xhc3NOYW1lPWEuY2xhc3NOYW1lLnRyaW0oKStcIiBcIitiKX0sZT1mdW5jdGlvbihhLGIpe2EuY2xhc3NMaXN0P2EuY2xhc3NMaXN0LnJlbW92ZShiKTpjKGIpJiYoYS5jbGFzc05hbWU9YS5jbGFzc05hbWUucmVwbGFjZShuZXcgUmVnRXhwKFwiKF58XFxcXGMpXCIrYi5zcGxpdChcIiBcIikuam9pbihcInxcIikrXCIoXFxcXGN8JClcIixcImdpXCIpLFwiIFwiKSl9LGY9ZnVuY3Rpb24oKXtyZXR1cm4gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpfSxnPWZ1bmN0aW9uKGEsYil7dmFyIGM9ZG9jdW1lbnQsZD1jLmNyZWF0ZUVsZW1lbnQoYSk7aWYoYiYmXCJvYmplY3RcIj09dHlwZW9mIGIpe3ZhciBlO2ZvcihlIGluIGIpaWYoXCJodG1sXCI9PT1lKWQuaW5uZXJIVE1MPWJbZV07ZWxzZSBpZihcInRleHRcIj09PWUpe3ZhciBmPWMuY3JlYXRlVGV4dE5vZGUoYltlXSk7ZC5hcHBlbmRDaGlsZChmKX1lbHNlIGQuc2V0QXR0cmlidXRlKGUsYltlXSl9cmV0dXJuIGR9LGg9ZnVuY3Rpb24oYSxiKXt2YXIgYyxkOzE9PT1iPyhjPTAsZD1hLmxlbmd0aCk6Yj09PS0xJiYoYz1hLmxlbmd0aC0xLGQ9LTEpO2Zvcih2YXIgZT0hMDtlOyl7ZT0hMTtmb3IodmFyIGY9YztmIT1kO2YrPWIpaWYoYVtmK2JdJiZhW2ZdLnZhbHVlPmFbZitiXS52YWx1ZSl7dmFyIGc9YVtmXSxoPWFbZitiXSxpPWc7YVtmXT1oLGFbZitiXT1pLGU9ITB9fXJldHVybiBhfSxpPWZ1bmN0aW9uKGEsYixjKXtpZihcIltvYmplY3QgT2JqZWN0XVwiPT09T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGEpKWZvcih2YXIgZCBpbiBhKU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhLGQpJiZiLmNhbGwoYyxkLGFbZF0sYSk7ZWxzZSBmb3IodmFyIGU9MCxmPWEubGVuZ3RoO2U8ZjtlKyspYi5jYWxsKGMsZSxhW2VdLGEpfSxqPWZ1bmN0aW9uKGEpe3ZhciBiPWYoKSxjPWcoXCJ0Ym9keVwiKTtyZXR1cm4gaShhLGZ1bmN0aW9uKGEsYyl7dmFyIGQ9ZyhcInRyXCIpO2koYyxmdW5jdGlvbihhLGIpe3ZhciBjPWcoXCJ0ZFwiLHtodG1sOmJ9KTtkLmFwcGVuZENoaWxkKGMpfSksYi5hcHBlbmRDaGlsZChkKX0pLGMuYXBwZW5kQ2hpbGQoYiksY307cmV0dXJuIGsucHJvdG90eXBlPXtpbml0OmZ1bmN0aW9uKCl7aWYoIXRoaXMuaW5pdGlhbGlzZWQpe3ZhciBhPXRoaXM7dGhpcy5wYWdpbmF0ZSgpLHRoaXMud3JhcHBlcj1nKFwiZGl2XCIse2NsYXNzOlwiZGF0YVRhYmxlLXdyYXBwZXJcIn0pLHRoaXMudGFibGVDb250YWluZXI9ZyhcImRpdlwiLHtjbGFzczpcImRhdGFUYWJsZS1jb250YWluZXJcIn0pLHRoaXMuc2VsZWN0b3I9ZyhcInNlbGVjdFwiLHtjbGFzczpcImRhdGFUYWJsZS1zZWxlY3RvclwifSksdGhpcy5zZWFyY2hJbnB1dD1nKFwiaW5wdXRcIix7dHlwZTpcInRleHRcIixjbGFzczpcImRhdGFUYWJsZS1pbnB1dFwiLHBsYWNlaG9sZGVyOlwiU2VhcmNoLi4uXCJ9KSx0aGlzLmxhYmVsPWcoXCJkaXZcIix7Y2xhc3M6XCJkYXRhVGFibGUtaW5mb1wifSk7dmFyIGI9ZyhcImRpdlwiLHtjbGFzczpcImRhdGFUYWJsZS10b3BcIn0pLGU9ZyhcImRpdlwiLHtjbGFzczpcImRhdGFUYWJsZS1ib3R0b21cIn0pLGY9ZyhcImxhYmVsXCIse2NsYXNzOlwiZGF0YVRhYmxlLXNlbGVjdFdyYXBwZXJcIn0pO2lmKGkodGhpcy5vcHRpb25zLnBlclBhZ2VTZWxlY3QsZnVuY3Rpb24oYixjKXthLnNlbGVjdG9yLmFwcGVuZENoaWxkKGcoXCJvcHRpb25cIix7dmFsdWU6YyxodG1sOmN9KSl9KSx0aGlzLnNlbGVjdG9yLnZhbHVlPXRoaXMub3B0aW9ucy5wZXJQYWdlLGYuYXBwZW5kQ2hpbGQodGhpcy5zZWxlY3RvciksZi5pbnNlcnRBZGphY2VudEhUTUwoXCJiZWZvcmVlbmRcIixcIiBlbnRyaWVzIHBlciBwYWdlXCIpLGIuYXBwZW5kQ2hpbGQoZiksZCh0aGlzLnRhYmxlLFwiZGF0YVRhYmxlLXRhYmxlXCIpLGUuYXBwZW5kQ2hpbGQodGhpcy5sYWJlbCksdGhpcy53cmFwcGVyLmFwcGVuZENoaWxkKGIpLHRoaXMud3JhcHBlci5hcHBlbmRDaGlsZCh0aGlzLnRhYmxlQ29udGFpbmVyKSx0aGlzLndyYXBwZXIuYXBwZW5kQ2hpbGQoZSksdGhpcy5vcHRpb25zLnNlYXJjaGFibGUpe3ZhciBoPWcoXCJkaXZcIix7Y2xhc3M6XCJkYXRhVGFibGUtc2VhcmNoXCJ9KTtoLmFwcGVuZENoaWxkKHRoaXMuc2VhcmNoSW5wdXQpLGIuYXBwZW5kQ2hpbGQoaCksZChiLFwic2VhcmNoYWJsZVwiKX10aGlzLnNob3dQYWdlKCk7dmFyIGssaj1nKFwidWxcIix7Y2xhc3M6XCJkYXRhVGFibGUtcGFnaW5hdGlvblwifSk7c3dpdGNoKHRoaXMucGFnaW5hdG9ycy5wdXNoKGopLHRoaXMub3B0aW9ucy5uYXZQb3NpdGlvbil7Y2FzZVwidG9wXCI6Yi5hcHBlbmRDaGlsZChqKTticmVhaztjYXNlXCJib3R0b21cIjplLmFwcGVuZENoaWxkKGopO2JyZWFrO2Nhc2VcImJvdGhcIjprPWcoXCJ1bFwiLHtjbGFzczpcImRhdGFUYWJsZS1wYWdpbmF0aW9uXCJ9KSx0aGlzLnBhZ2luYXRvcnMucHVzaChrKSxiLmFwcGVuZENoaWxkKGopLGUuYXBwZW5kQ2hpbGQoayl9aWYodGhpcy51cGRhdGUoKSx0aGlzLm9wdGlvbnMuc29ydGFibGUpe2lmKHRoaXMuc29ydEVuYWJsZWQpcmV0dXJuO3ZhciBhPXRoaXMsbD1hLnRoZWFkLnJvd3NbMF0uY2VsbHM7aShsLGZ1bmN0aW9uKGEsYil7dmFyIGM9ZyhcImFcIix7aHJlZjpcIiNcIixjbGFzczpcImRhdGFUYWJsZS1zb3J0ZXJcIixodG1sOmIuaW5uZXJIVE1MfSk7Yi5pZHg9YSxiLmlubmVySFRNTD1cIlwiLGIuYXBwZW5kQ2hpbGQoYyl9KSx0aGlzLnNvcnRFbmFibGVkPSEwfXRoaXMudGFibGUucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUodGhpcy53cmFwcGVyLHRoaXMudGFibGUpLHRoaXMudGFibGVDb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy50YWJsZSksdGhpcy5jb250YWluZXJSZWN0PXRoaXMudGFibGVDb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksdGhpcy5vcHRpb25zLmZpeGVkSGVpZ2h0JiYodGhpcy50YWJsZUNvbnRhaW5lci5zdHlsZS5oZWlnaHQ9dGhpcy5jb250YWluZXJSZWN0LmhlaWdodCtcInB4XCIpO3ZhciBtPWEudGFibGUudEhlYWQucm93c1swXS5jZWxscztpKG0sZnVuY3Rpb24oYixjKXt2YXIgZD1jLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLGU9ZC53aWR0aC9hLmNvbnRhaW5lclJlY3Qud2lkdGgqMTAwO2Muc3R5bGUud2lkdGg9ZStcIiVcIn0pLHRoaXMub3B0aW9ucy5wbHVnaW5zLmxlbmd0aCYmaSh0aGlzLm9wdGlvbnMucGx1Z2lucyxmdW5jdGlvbihiLGMpe2FbY10mJlwiZnVuY3Rpb25cIj09dHlwZW9mIGFbY10uaW5pdCYmYVtjXS5pbml0KGEpfSksdGhpcy50YWJsZS5vbj1mdW5jdGlvbihiLGMpe2EudGFibGUuYWRkRXZlbnRMaXN0ZW5lcihiLGZ1bmN0aW9uKGIpe2MuY2FsbChhLHRoaXMpfSl9LGEuaGFuZGxlQ2xpY2tFdmVudHM9ZnVuY3Rpb24oYil7Yj1ifHx3aW5kb3cuZXZlbnQ7dmFyIGQ9Yi50YXJnZXQsZT1kLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7XCJhXCI9PT1lJiYoZC5oYXNBdHRyaWJ1dGUoXCJkYXRhLXBhZ2VcIikmJmEuc3dpdGNoUGFnZShkLmdldEF0dHJpYnV0ZShcImRhdGEtcGFnZVwiKSksYyhkLFwiZGF0YVRhYmxlLXNvcnRlclwiKSYmYS5zb3J0SXRlbXMoYiksYi5wcmV2ZW50RGVmYXVsdCgpKX0sdGhpcy53cmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLGEuaGFuZGxlQ2xpY2tFdmVudHMsITEpLHRoaXMuc2VsZWN0b3IuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLGEudXBkYXRlLmJpbmQoYSksITEpLHRoaXMuc2VhcmNoSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsYS5zZWFyY2guYmluZChhKSwhMSksc2V0VGltZW91dChmdW5jdGlvbigpe2EuZW1pdChcImRhdGF0YWJsZS5pbml0XCIpfSwxMCksYS5pbml0aWFsaXNlZD0hMH19LHBhZ2luYXRlOmZ1bmN0aW9uKCl7dmFyIGE9dGhpcy5vcHRpb25zLnBlclBhZ2UsYj10aGlzLnNlYXJjaGluZz90aGlzLnNlYXJjaFJvd3M6dGhpcy5yb3dzO3RoaXMucGFnZXM9Yi5tYXAoZnVuY3Rpb24oYyxkKXtyZXR1cm4gZCVhPT0wP2Iuc2xpY2UoZCxkK2EpOm51bGx9KS5maWx0ZXIoZnVuY3Rpb24oYSl7cmV0dXJuIGF9KSx0aGlzLmxhc3RQYWdlPXRoaXMucGFnZXMubGVuZ3RofSxzd2l0Y2hQYWdlOmZ1bmN0aW9uKGEpe3ZhciBiPXRoaXM7aWYoYSE9dGhpcy5jdXJyZW50UGFnZSl7aWYoaXNOYU4oYSl8fCh0aGlzLmN1cnJlbnRQYWdlPXBhcnNlSW50KGEsMTApKSxcInByZXZcIj09YSl7aWYodGhpcy5vbkZpcnN0UGFnZSlyZXR1cm47dGhpcy5jdXJyZW50UGFnZS0tfWlmKFwibmV4dFwiPT1hKXtpZih0aGlzLm9uTGFzdFBhZ2UpcmV0dXJuO3RoaXMuY3VycmVudFBhZ2UrK310aGlzLnNob3dQYWdlKHRoaXMuY3VycmVudFBhZ2UtMSksaShiLnBhZ2luYXRvcnMsZnVuY3Rpb24oYSxjKXt2YXIgZj1jLmNoaWxkcmVuLGc9Yi5vcHRpb25zLmhpZGVOYXZzP1wiaGlkZGVuXCI6XCJkaXNhYmxlZFwiO2koZixmdW5jdGlvbihhLGIpe2UoYixcImFjdGl2ZVwiKSxlKGIsXCJkaXNhYmxlZFwiKSxlKGIsXCJoaWRkZW5cIil9KSxiLm9uRmlyc3RQYWdlJiZiLm9wdGlvbnMubmV4dFByZXYmJmQoYy5maXJzdEVsZW1lbnRDaGlsZCxnKSxiLm9uTGFzdFBhZ2UmJmIub3B0aW9ucy5uZXh0UHJldiYmZChjLmxhc3RFbGVtZW50Q2hpbGQsZyk7dmFyIGg9Yi5vcHRpb25zLm5leHRQcmV2P2IuY3VycmVudFBhZ2U6Yi5jdXJyZW50UGFnZS0xO2QoYy5jaGlsZHJlbltoXSxcImFjdGl2ZVwiKX0pLHRoaXMuZW1pdChcImRhdGF0YWJsZS5jaGFuZ2VcIil9fSxzaG93UGFnZTpmdW5jdGlvbihhKXthPWF8fDA7dmFyIGI9dGhpcyxjPXRoaXMucGFnZXM7aWYoYy5sZW5ndGgpe3ZhciBkPWYoKTtzd2l0Y2goaShjW2FdLGZ1bmN0aW9uKGEsYil7ZC5hcHBlbmRDaGlsZChiKX0pLGIudHJ1bmNhdGUoKSxiLnRib2R5LmFwcGVuZENoaWxkKGQpLGIub25GaXJzdFBhZ2U9ITEsYi5vbkxhc3RQYWdlPSExLGIuY3VycmVudFBhZ2Upe2Nhc2UgMTpiLm9uRmlyc3RQYWdlPSEwO2JyZWFrO2Nhc2UgYi5sYXN0UGFnZTpiLm9uTGFzdFBhZ2U9ITB9fWlmKGIub3B0aW9ucy5pbmZvKXt2YXIgaixlPTAsZz0wLGg9MDtjLmxlbmd0aCYmKGU9Yi5jdXJyZW50UGFnZS0xLGc9ZSpiLm9wdGlvbnMucGVyUGFnZSxoPWcrY1tlXS5sZW5ndGgsZys9MSxqPXRoaXMuc2VhcmNoaW5nP3RoaXMuc2VhcmNoUm93cy5sZW5ndGg6dGhpcy5yb3dzLmxlbmd0aCk7dmFyIGs9W1wiU2hvd2luZyBcIixnLFwiIHRvIFwiLGgsXCIgb2YgXCIsaixcIiByb3dzXCJdO3RoaXMubGFiZWwuaW5uZXJIVE1MPWsuam9pbihcIlwiKX19LHNlYXJjaDpmdW5jdGlvbihhKXt2YXIgYj10aGlzLGM9YS50YXJnZXQudmFsdWUudG9Mb3dlckNhc2UoKTtyZXR1cm4gdGhpcy5zZWFyY2hpbmc9ITAsdGhpcy5zZWFyY2hSb3dzPVtdLGMubGVuZ3RoPyh0aGlzLnRydW5jYXRlKCksaSh0aGlzLnJvd3MsZnVuY3Rpb24oYSxkKXtpKGQuY2VsbHMsZnVuY3Rpb24oYSxlKXt2YXIgZj1lLnRleHRDb250ZW50LnRvTG93ZXJDYXNlKCksZz1iLnNlYXJjaFJvd3MuaW5kZXhPZihkKT4tMTtmLmluZGV4T2YoYyk+LTEmJiFnJiZiLnNlYXJjaFJvd3MucHVzaChkKX0pfSksYi5zZWFyY2hSb3dzLmxlbmd0aHx8Yi5zZXRNZXNzYWdlKFwiTm8gZW50cmllcyBmb3VuZC5cIiksdGhpcy51cGRhdGUoKSx2b2lkIHRoaXMuZW1pdChcImRhdGF0YWJsZS5zZWFyY2hcIikpOih0aGlzLnNlYXJjaGluZz0hMSx0aGlzLnVwZGF0ZSgpLHZvaWQgdGhpcy5lbWl0KFwiZGF0YXRhYmxlLnNlYXJjaFwiKSl9LHNldE1lc3NhZ2U6ZnVuY3Rpb24oYSl7dGhpcy50cnVuY2F0ZSgpLHRoaXMudGJvZHkuYXBwZW5kQ2hpbGQoZyhcInRyXCIse2h0bWw6Jzx0ZCBjbGFzcz1cImRhdGFUYWJsZXMtZW1wdHlcIiBjb2xzcGFuPVwiJyt0aGlzLmNvbHNwYW4rJ1wiPicrYStcIjwvdGQ+XCJ9KSl9LHVwZGF0ZTpmdW5jdGlvbihhKXtmdW5jdGlvbiBlKGEpe3ZhciBiPWcoXCJsaVwiKSxkPWcoXCJhXCIse2hyZWY6XCIjXCIsXCJkYXRhLXBhZ2VcIjphLGh0bWw6XCJwcmV2XCI9PWE/Yy5vcHRpb25zLnByZXZUZXh0OmMub3B0aW9ucy5uZXh0VGV4dH0pO3JldHVybiBiLmFwcGVuZENoaWxkKGQpLGJ9aWYoYSl7dmFyIGI9YS50YXJnZXQ7Yj09PXRoaXMuc2VsZWN0b3ImJih0aGlzLm9wdGlvbnMucGVyUGFnZT1wYXJzZUludChiLnZhbHVlLDEwKSksdGhpcy5lbWl0KFwiZGF0YXRhYmxlLnBlcnBhZ2VcIil9dGhpcy5jdXJyZW50UGFnZT0xLHRoaXMucGFnaW5hdGUoKSx0aGlzLnNob3dQYWdlKCk7dmFyIGM9dGhpcyxkPXRoaXMucGFnZXM7aShjLnBhZ2luYXRvcnMsZnVuY3Rpb24oYSxiKXt2YXIgaD1mKCk7Yi5pbm5lckhUTUw9XCJcIixkLmxlbmd0aDw9MXx8KGMub3B0aW9ucy5uZXh0UHJldiYmaC5hcHBlbmRDaGlsZChlKFwicHJldlwiKSksYy5vcHRpb25zLm5hdkJ1dHRvbnMmJmkoZCxmdW5jdGlvbihhLGIpe3ZhciBjPWcoXCJsaVwiLHtjbGFzczowPT1hP1wiYWN0aXZlXCI6XCJcIn0pLGQ9ZyhcImFcIix7aHJlZjpcIiNcIixcImRhdGEtcGFnZVwiOmErMSxodG1sOmErMX0pO2MuYXBwZW5kQ2hpbGQoZCksaC5hcHBlbmRDaGlsZChjKX0pLGMub3B0aW9ucy5uZXh0UHJldiYmaC5hcHBlbmRDaGlsZChlKFwibmV4dFwiKSksYi5hcHBlbmRDaGlsZChoKSl9KSx0aGlzLmluaXRpYWxpc2VkJiYodGhpcy50YWJsZUNvbnRhaW5lci5zdHlsZS5oZWlnaHQ9bnVsbCx0aGlzLm9wdGlvbnMuZml4ZWRIZWlnaHQmJih0aGlzLmNvbnRhaW5lclJlY3Q9dGhpcy50YWJsZUNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSx0aGlzLnRhYmxlQ29udGFpbmVyLnN0eWxlLmhlaWdodD10aGlzLmNvbnRhaW5lclJlY3QuaGVpZ2h0K1wicHhcIikpfSxzb3J0SXRlbXM6ZnVuY3Rpb24oYSl7dmFyIGcsYj10aGlzLGY9YS50YXJnZXQsaj1iLnNlYXJjaGluZz9iLnNlYXJjaFJvd3M6Yi5yb3dzLGs9W10sbD1bXSxtPTAsbj0wLG89Zi5wYXJlbnROb2RlO2koaixmdW5jdGlvbihhLGIpe3ZhciBjPWIuY2VsbHNbby5pZHhdLGQ9Yy50ZXh0Q29udGVudD9jLnRleHRDb250ZW50OmMuaW5uZXJUZXh0LGU9ZC5yZXBsYWNlKC8oXFwkfFxcLHxcXHMpL2csXCJcIik7cGFyc2VGbG9hdChlKT09ZT9sW24rK109e3ZhbHVlOk51bWJlcihlKSxyb3c6Yn06a1ttKytdPXt2YWx1ZTpkLHJvdzpifX0pO3ZhciBxLHI7YyhvLFwiYXNjXCIpPyhxPWgoaywtMSkscj1oKGwsLTEpLGc9XCJkZXNjZW5kaW5nXCIsZShvLFwiYXNjXCIpLGQobyxcImRlc2NcIikpOihxPWgobCwxKSxyPWgoaywxKSxnPVwiYXNjZW5kaW5nXCIsZShvLFwiZGVzY1wiKSxkKG8sXCJhc2NcIikpLHRoaXMubGFzdFRoJiZvIT10aGlzLmxhc3RUaCYmKGUodGhpcy5sYXN0VGgsXCJkZXNjXCIpLGUodGhpcy5sYXN0VGgsXCJhc2NcIikpLHRoaXMubGFzdFRoPW87dmFyIGo9cS5jb25jYXQocik7Yi5zZWFyY2hpbmc/KGIuc2VhcmNoUm93cz1bXSxpKGosZnVuY3Rpb24oYSxjKXtiLnNlYXJjaFJvd3MucHVzaChjLnJvdyl9KSk6KGIucm93cz1bXSxpKGosZnVuY3Rpb24oYSxjKXtiLnJvd3MucHVzaChjLnJvdyl9KSksYi5zb3J0T3JkZXI9ZyxiLnVwZGF0ZShhKSxiLmVtaXQoXCJkYXRhdGFibGUuc29ydFwiKX0sdHJ1bmNhdGU6ZnVuY3Rpb24oKXtpZih0aGlzLmlzSUUpZm9yKDt0aGlzLnRib2R5Lmhhc0NoaWxkTm9kZXMoKTspdGhpcy50Ym9keS5yZW1vdmVDaGlsZCh0aGlzLnRib2R5LmZpcnN0Q2hpbGQpO2Vsc2UgdGhpcy50Ym9keS5pbm5lckhUTUw9XCJcIn0sZW1pdDpmdW5jdGlvbihhKXt0aGlzLnRhYmxlLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KGEpKX19LGt9KTsiXX0=
