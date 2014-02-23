/*global backboneTEST, $*/


window.app = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';
        
        var model = new app.Models.UserModel();
        model.fetch();
        console.log("--- main application init --- ");
    }
};

$(document).ready(function () {
    'use strict';
    app.init();
});