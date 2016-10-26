var material = require('material-design-lite');
var slider = require('flickity');
var datatables = require('vanilla-datatables');
var elem = document.querySelector('.main-carousel');
if (document.querySelector('.main-carousel')) {
    var flkty = new slider('.main-carousel', {
        // options
        cellAlign: 'left'
        , cellSelector: '.carousel-cell'
        , wrapAround: true
        , autoPlay: 5000
    });
}
if (document.querySelector('.baner-carousel')) {
    var flkty_1 = new slider('.baner-carousel', {
        // options
        cellAlign: 'left'
        , contain: true
        , cellSelector: '.carousel-cell'
        , draggable: false
        , pageDots: false
        , wrapAround: true
        , autoPlay: 3000
    });
}
var options = {
    sortable: true
    , searchable: true
    , navPosition: 'both'
    , info: false
};
var elements = document.getElementsByTagName('table');
if (elements.length > 0) {
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        new datatables(element, options);
    }
    var headertext = []
        , headers = document.querySelectorAll("table th")
        , tablerows = document.querySelectorAll("table th")
        , tablebody = document.querySelector("table tbody");
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