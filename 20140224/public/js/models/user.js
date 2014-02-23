/*global backboneTEST, Backbone*/

app.Models = app.Models || {};

(function () {
    'use strict';

    app.Models.UserModel = Backbone.Model.extend({

   		initialize: function(){
   			console.log("---- UserModel init ---");
   		}

    });

})();