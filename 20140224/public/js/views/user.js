/*global app, Backbone*/

app.Views = app.Views || {};

(function () {
  'use strict';

  app.Views.UserView = Backbone.View.extend({

    el : $("#main"),
    events : {
      "click .add" : "handleAdd",
      "click .edit" : "handleEdit",
      "click .delete" : "handleDelete"
    },

    handleAdd : function(){

      this.model.set({
          id : null,
          name : "POST or PUT"
      });
      this.model.save();
    },

    handleEdit : function(){
      this.model.set({
          id : 1,
          name : "POST or PUT"
      });
      this.model.save();
    },

    handleDelete : function(){
      console.log("before...", this.model.toJSON());
      this.model.set("id", 1);
      this.model.destroy();
      console.log("after...", this.model.toJSON());

    }
  });

})();
