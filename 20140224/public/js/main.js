/*global backboneTEST, $*/


window.app = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';
        
        var model = new app.Models.UserModel();

        model.on("invalid", function(model, error, options){

            console.log("### INVALID from app's model\n", error);

        });

        model.on("request", function(model, xhr, options){
            console.log("### REQUEST from app's model\n", model, xhr, options);
        });

        model.on("sync", function(model, response, options){

            console.log("### SYNC from app's model\n", model, response, options);

        });
        model.fetch();
        console.log("--- main application init --- ");


        new app.Views.UserView({
            model : model
        });

    }
};

$(document).ready(function () {
    'use strict';
    app.init();
});