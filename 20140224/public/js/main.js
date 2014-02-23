/*global backboneTEST, $*/


window.app = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';
        
        new app.Models.UserModel();

        console.log("--- main application init --- ");
    }
};

$(document).ready(function () {
    'use strict';
    app.init();
});