/*global backboneTEST, Backbone*/

app.Models = app.Models || {};

(function () {
  'use strict';

  app.Models.UserModel = Backbone.Model.extend({
    defaults : {
      name : "someone",
      email: "someone@email.com"
    },
    urlRoot : "/users",
    url : function(){
      console.log("urlRoot: ", this.urlRoot)
      return this.urlRoot;
    },

    initialize: function(){
      console.log("---- UserModel init ---\n", this.toJSON());
    }

  });

})();