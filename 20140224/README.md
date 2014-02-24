# Restful API with Backbone
## 빠른 실습을 위한 준비: node, yeoman, bower
 -  https://www.npmjs.org/package/generator-express
 -  https://github.com/bower/bower

### yeoman 및 제너레이터 설치
```
  <yeoman>
  $> npm install -g yo
  $> npm install -g generator-express
  $> yo express (basic mode)
```

### bower 설치 및 커스텀 설정
 - bower 설치 후 반드시 소스가 설치되는 폴더를 확인하자!
```
  $> npm install -g bower
  $> vi .bowerrc

  // 저장되는 폴더 위치를 변경 한다.
  {
     "directory": "public/bower_components"  ---> "public/components"
  }
```

### 기본 프로젝트의 소스 구성
  - jquery, backbone, underscore 소스를 bower를 이용해 설치한다.
  - bower로 설치한 소스들은 실행 경로를 기준으로 public/components 폴더에 설치된다.
  - jquert의 경우 dist 폴더에 소스파일이 설치된다.
```
  $> bower install jquery
  $> bower install underscore
  $> bower install backbone
```

### 에디터 설정
  - <strike>yeoman으로 프로젝트를 구성하면</strike> .editorconfig 파일에 에디터 설정이 포함되어 있다
  - 참고로 예제 소스는 Sublime Text2에서 space & tabsize 2로 설정되어있다.

# 실습 과정
## 0. yeoman으로 설정된 프로젝트 실행하기
 - Gruntfile.js 파일을 열어 등록된 테스크를 확인해보자.
 - 참고로 generator-express로 만들어진 프로젝트의 grunt 빌드의 태스크는 default만 등록 되어 있다.
 ```
  $> grunt default // 기본 default 태스크 실행
  $> grunt         // default는 생략할 수도 있다.
 ```


## 1. UserModel 추가하기
 - 백본의 모델은 테이블에서 하나의 ROW가 될수도 있고, 여러 ROWS의 집합이 될수도 있다.
 - 즉, 개발자가 원하는 형태로 모델을 정의할 수 있다.
 - Collection을 쓰지 않고, 모델 그 자체를 Collection 형태로 쓸 수도 있다.
 - 아래와 같은 구조로 파일과 폴더를 만든다.
 ```
   + views
   + public
      + js
         + models
            - user.js
         + views
      - main.js
 ```
 - public/js/main.js는 아래와 같이 작성한다.
 ```
 window.app = {
     Models: {},
     Collections: {},
     Views: {},
     Routers: {},
     init: function () {
         'use strict';
         var model = new app.Models.UserModel();
         console.log("--- main application init --- ");
     }
 };

 $(document).ready(function () {
     'use strict';
     app.init();
 });
 ```
 - public/js/models/user.js 는 아래와 같이 작성한다.
 ```
 app.Models = app.Models || {};

 (function () {
     'use strict';

     app.Models.UserModel = Backbone.Model.extend({
         initialize: function(){
          console.log("--- UserModel init ---", this.toJSON());
         }
     });
 })();
 ```
 - views/index.jade에 아래와 같이 링크를 추가한다.
 ```
 extends layout
 block content
     h1= title
     p Welcome to #{title}

   // jade는 온전한 태그를 삽입해도 된다.
   <script src="components/jquery/dist/jquery.js"></script>
   <script src="components/underscore/underscore.js"></script>
   <script src="components/backbone/backbone.js"></script>

   // 보통은 태그를 축약해서 사용한다.
   script(src="/js/main.js")
   script(src="/js/models/user.js")
 ```
 - 브라우저에서 실행해 동작을 확인해보자!
 > [http://localhost:3000][100]

[100]: http://localhost:3000

## 2. 추가한 모델에 대한 기본값 정의
 - defaults 속성을 이용한다. 다양하게 원하는 형태로 정의할 수 있다.
 - 1 depth의 key:value 쌍으로 정의할 수도 있다.
 - 2 depth 이상의 key:[], key:{} 쌍으로도 정의할 수 있다.
 ```
 app.Models.UserModel = Backbone.Model.extend({
     defaults : {
         name : "someone",
         email: "someone@email.com"
     },
     initialize: function(){
         console.log("---- UserModel init ---\n", this.toJSON());
     }
 });
 ```

## 3. 모델과 서버를 연결하기
 - 서버에 있는 데이터를 가져오려면 모델의 fetch() 메소드를 이용한다.
 ```
 window.app = {
     init: function () {
         'use strict';
         var model = new app.Models.UserModel();
         model.fetch();
         console.log("--- main application init --- ");
     }
 };
 ```
 - 모델과 서버를 맵핑하기 위한 url 속성을 정의해야 한다.
 - url은 function 이 될수도 있다.
 - url 대신에 urlRoot를 정의할 수도 있다.
 - 동적으로 url을 변경하려면, url을 함수로 정의해서 반환(return) 한다.
 - Network 탭에서 서버 호출을 확인한다.  (/users 호출 확인)
 ```
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
 }
 ```

## 4. CRUD에 해당하는 RESTful API 만들기
 - routes/user.js 파일에 서버에서 동작할 API를 정의한다.
 ```
 exports.list = function(req, res){
     res.json([{
         id : 1,
         name : "Sohn",
         email: "miconblog@gmail.com"
     }, {
         id : 2,
         name : "Kim",
         email: "kim@email.com"
     }])
 };

 exports.add = function(req, res){
     console.log("POST ID: ", req.body.id);
     res.json({
         success: "OK"
     })
 };

 exports.update = function(req, res){
     console.log("UPDATE ID: ", req.body.id);
     res.json({
         success: "OK"
     })
 };

 exports.remove = function(req, res){
     console.log("DELETE ID: ", req.params.id);
     res.json({
         success: "OK"
     })
 };
 ```
 - app.js 파일에 추가한 API와 URL 라우터를 맵핑한다.
 ```
 app.get('/', routes.index);
 app.get('/users', user.list);
 app.get('/users/:id', user.list);
 app.post('/users', user.add);
 app.post('/users/:id', user.add);
 app.put('/users/:id', user.update);
 app.delete('/users/:id', user.remove);
 ```
 - DELETE 메소드의 경우, request body가 무시되므로 주의하자!.
 - 자세한 내용은 HTTP 1.1 스펙 참고


## 5. 백본 모델의 기본 SYNC 과정
 - 백본 모델을 fetch 할 경우 정의된 url로 요청을 보낸다.
 - 따라서 fetch() 메소드는 반드시 모델에 url이 정의 되어 있어야 한다.
 - 요청을 보내기 전에 REQUEST 이벤트를 발생시킨다.
 - 응답을 받으면 모델에 저장 되기 전에  model의 parse 함수를 거친다.
 - 모델에 응답받은 데이터가 저장되면 최종적으로 SYNC 이벤트를 발생시킨다.
 - 정리하면,
  > REQUEST from model --> parse() of model --> SYNC from model
 - 동작확인을 위한 트레이스 코드를 public/js/main.js 파일에 심어본다.
 ```
 init: function () {
     'use strict';

     var model = new app.Models.UserModel();
     model.on("request", function(model, xhr, options){
         console.log("### REQUEST from app's model\n", model, xhr, options);
     });
     model.on("sync", function(model, response, options){
        console.log("### SYNC from app's model\n", model, response, options);
    });
    model.fetch();
    console.log("--- main application init --- ");
 }
 ```
 - public/js/models/user.js 모델에도 parse 함수를 오버라이딩 한다.
 - parse 함수는 서버에서 받은 값을 필터하거나 재가공할때 사용된다.
 - 최종적으로 return한 값이 모델의 값으로 싱크 된다.
 ```
 parse : function(response, options){
     console.log("===> parse of model ", response, options);
     return {
         data: response
     }
 }
 ```

## 6. 백본의 기본 SYNC 과정을 새롭게 정의할 수도 있다.
 - 새롭게 정의한다는 의미는 fetch 할 때, 어떻게 동작할 것인가를 정의하는 것이다.
 - localstroage 에서 데이터를 읽어올 수도 있다.
 - 재정의하면 기본으로 동작하던 SYNC 동작(서버요청)이 없어지므로 주의하자!
 - 싱크할 데이터는 success 콜백에 담아 보낸다.
 ```
 parse : function(response, options){
     console.log("===> parse of model ", response, options);
     return {
         data: response
     }
 },
 sync : function(method, model, options){
     console.log("===> sync of model\n", method, model, options);
     options.success && options.success([1,2,3,4]);
 }
 ```
 - 위와 같이 코드를 작성하면 서버 요청이 없어짐을 개발자 도구의 Network 탭을 열어 확인하자!
 - 확인후에는 다음 실습을 위해 **꼭!! 주석처리한다!!!!!**

## 7. 백본 뷰를 이용해 버튼을 추가한다.
 - 뷰의 el 속성에 엘리먼트를 지정하면 기준의 되는 뷰의 DOM이 지정된다.
 - events 속성에 델리게이트 핸들러를 정의한다.
 - public/js/views/user.js 파일을 생성하고 아래와 같이 작성한다.
 ```
 app.Views = app.Views || {};

 (function () {
     'use strict';

     app.Views.UserView = Backbone.View.extend({
         el : $("#main"),
         events : {
             "click .add" : "handleAdd"
         },
         handleAdd : function(){
             this.model.set({
                 id : null,
                 name : "POST or PUT"
             });
             this.model.save();
         }
     });
 })();
 ```
 - views/index.jade 파일에 버튼을 추가하고 백본 뷰를 링크한다.
 ```
 block content
     h1= title
     p Welcome to #{title}

     #main
         button.add ADD
         button.edit EDIT
         button.delete DELETE

  ... 중략 ...

     script(src="/js/models/user.js")
     script(src="/js/views/user.js")
 ```
 - public/js/main.js 파일을 열어 모델과 뷰를 연결한다.
 ```
 model.fetch();
 new app.Views.UserView({
     model : model
 });
 console.log("--- main application init --- ");
 ```

## 8. 모델의 값을 변경해 저장을 시도한다.
 - model.set() VS model.save() 두 메소드는 서버에 모델을 저장 하느냐의 차이만 있다.
 - validate 속성을 지정하면 서버로 요청하기 전에 client 딴에서 유효성이 검증된다.
 - validate의 값이 false가 아니면 해당 값이 invalid 이벤트의 값으로 넘어간다.
 - Network 탭에서 POST로 넘어가는지 PUT으로 넘어가는지 확인한다.
 ```
 parse : function(response, options){
     console.log("===> parse of model ", response, options);
     return {
         data: response
     }
 },
 validate: function(attributes, options){
     console.log("===> validate of model");
     return true;
 },
 //sync : function(method, model, options){
 //    console.log("===> sync of model\n", method, model, options);
 //    options.success && options.success([1,2,3,4]);
 //}
 ```

## 9. 모델의 값을 수정해 본다.
 - 값을 수정할때는 POST가 아닌 PUT으로 요청을 보내야한다.
 - PUT로 보내기 위해서는 서버에 해당 모델의 id를 지정해줘야 한다.
 - 모델은 기본적으로 테이블의 한 ROW와 1:1 맵핑된다.
 - id 지정은 idAttribute 속성에 지정된다.
 - id 값으로 지정된 속성은 model.id의 값으로 정의된다.
 - 가령, idAttribute로 'name'을 지정하면, model.id 값은 'someone'이 된다.
 ```
 app.Models.UserModel = Backbone.Model.extend({
     idAttribute : "id",
     defaults : {
         name : "someone",
         email: "someone@email.com"
     }
    ... 중략 ...
 });
 ```

## 10. 해당 모델을 서버에서 삭제한다.
 - 모델 삭제를 위해서는 destroy() 메소드를 호출한다.
 - 서버에서 해당 모델을 인지하고 삭제하려면 id가 필요하다.
 - 하지만 DELETE 메소드는 request body가 무시되므로 URL/:id 형식으로 만들거나,
 - URL?delete=ture&id=1 과 같은 형식으로 query를 사용한다.
 ```
 handleDelete : function(){
     this.model.set("id", 1);
     this.model.destroy();
 }
 ```
 - id 값의 유무에 따라 URL 생성을 다르게 했으므로 id를 지정을 잊지 말자!

### TIPS)
 > RESTful API에서 POST, DELETE는 같은 요청을 여러번 보내도 같은 값을 반환 해야한다.
 > GET과 POST는 여러번 요청할 경우 값이 달라질 수 있으므로 주의한다.

## [참고] HTTP 1.1 Spec의 메소드 종류
 - OPTIONS : 요청 URI에서 사용할 수 있는 Method를 물어본다. [스펙 참고][1]
 - GET : 요청 URI의 정보를 가져온다. [스펙 참고][2]
 - HEAD : GET 요청에서 body는 제외하고 헤더만 가져온다.[스펙 참고][3]
 - POST : 요청 URI의 리소스의 새로운 정보를 보낸다.[스펙 참고][4]
 - PUT : 요청 URI에 저장될 정보를 보낸다. [스펙 참고][5]
 - DELETE : 요청 URI의 리소스를 삭제한다. [스펙 참고][6]
 - TRACE : 보낸 메시지를 다시 돌려보낸다. [스펙 참고][7]
 - CONNECT : 프록시에 사용하기 위해 예약된 메서드이다. [스펙 참고][8]

[1]: http://tools.ietf.org/html/rfc2616#section-9.2
[2]: http://tools.ietf.org/html/rfc2616#section-9.3
[3]: http://tools.ietf.org/html/rfc2616#section-9.4
[4]: http://tools.ietf.org/html/rfc2616#section-9.5
[5]: http://tools.ietf.org/html/rfc2616#section-9.6
[6]: http://tools.ietf.org/html/rfc2616#section-9.7
[7]: http://tools.ietf.org/html/rfc2616#section-9.8
[8]: http://tools.ietf.org/html/rfc2616#section-9.9
