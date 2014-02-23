/*global app, Backbone*/

app.Models = app.Models || {};

(function () {
  'use strict';

  app.Models.UserModel = Backbone.Model.extend({
    idAttribute : "id",
    defaults : {
      name : "someone",
      email: "someone@email.com"
    },
    urlRoot : "/users",
    url : function(){
      console.log("urlRoot: ", this.urlRoot);

      if(this.id){
        return [this.urlRoot, this.id].join("/");
      }else{
        return this.urlRoot;
      }
    },
    // parse : function(response, options){
    //   console.log("===> parse of model ", response, options);
    //   return {
    //     id : 1,
    //     data: response
    //   }
    // },

    /**
     * validate 함수가 정의 되면 서버로 호출되기전에 유효성을 검사한다. 
     *   - set함수 호출시 {validate:true} 옵션이 있으면 자동 호출된다. 
     *   - false 값이 아닌 값을 반환하면 서버로 호출되지 않는다. 
     *   - 반환되는 값이 invalid 이벤트에 실려 발생된다. 
     *   - 디버깅을 위해 마지막에 발생한 invalid 이벤트의 메시지가 
     *     validationError 속성에 저장된다.
     *
     */
    // validate: function(attributes, options){
    //   console.log("===> validate of model");
    //   return true;
    // },
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