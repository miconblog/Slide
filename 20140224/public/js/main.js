/*global backboneTEST, $*/


window.app = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';
        console.log("--- main application init --- ");
    }
};

$(document).ready(function () {
    'use strict';
    app.init();
});