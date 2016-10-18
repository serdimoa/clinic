var material = require('material-design-lite');
var slider = require('flickity');
var elem = document.querySelector('.main-carousel');

var flkty = new slider('.main-carousel', {
    // options
    cellAlign: 'left'
    , cellSelector: '.carousel-cell',
    wrapAround: true,
        autoPlay: 5000

});

var flkty_1 = new slider('.baner-carousel', {
    // options
    cellAlign: 'left',
    contain: true
    , cellSelector: '.carousel-cell',
    draggable: false,
    pageDots: false,
    wrapAround: true,
    autoPlay: 3000
});