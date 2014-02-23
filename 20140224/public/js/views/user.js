/*global app, Backbone*/

app.Views = app.Views || {};

(function () {
    'use strict';

    app.Views.UserView = Backbone.View.extend({

    	el : $("#main"),
    	events : {
    		"click .add" : "handleAdd"
    	},
        
    	handleAdd : function(){
    		console.log(11);


    	}
    });

})();
