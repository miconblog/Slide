/*global app, Backbone*/

app.Views = app.Views || {};

(function () {
  'use strict';

  app.Views.UserView = Backbone.View.extend({

    el : $("#main"),
    events : {
      "click .add" : "handleAdd",
      "click .edit" : "handleEdit",
    },

    handleAdd : function(){

      this.model.set({
          id : null,
          name : "POST or PUT"
      });
      this.model.save();
    },

    handleEdit : function(){
      console.log(22);

      this.model.set({
          name : "POST or PUT"
      });
      this.model.save();
    }
  });

})();
