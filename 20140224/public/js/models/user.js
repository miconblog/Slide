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
    parse : function(response, options){
      console.log("===> parse of model ", response, options)
    },
    /**
     * sync 함수가 정의되면, Backbone.sync 의 기본 동작을 덮어 쓴다.
     * 
     *  - 백본 sync의 기본 동작은 url이 있을 경우 해당 url로 요청을 날린다.  
     *
     * method – the CRUD method ("create", "read", "update", or "delete")
     * model – the model to be saved (or collection to be read)
     * options – success and error callbacks, and all other jQuery request option
     */
    // sync : function(method, model, options){

    //   console.log("===> sync of model\n", method, model, options);
    //   options.success && options.success([1,2,3,4]);
    // },

    initialize: function(){
      console.log("---- UserModel init ---\n", this.toJSON());
    }

  });

})();