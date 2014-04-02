Yeoman으로 빠른 웹 개발 환경 구축하기
=====

# [Yeoman][1] 이란?
요맨은 한마디로 웹 개발에 필요한 '와꾸'를 만들어주는 도구다. 요맨이 내걸고 있는 슬로건을 보면 더욱 명확하다. ***"THE WEB'S SCAFFOLDING TOOL FOR MODERN WEBAPPS"***

최신 웹개발의 트랜드는 속도전에 가깝다. Grunt와 Bower로 자질구레한 귀찮은 작업들은 자동화를 하고, 많은 MVC 프레임워크들이 등장하면서 코드는 점점 구조화되고 있다. 그래서 요맨은 이런 트랜디한 경험들을 하나의 세트로 구성해준다. 가령, AngularJS로 무엇인가를 만들고 있다면 Angular 구조에 맞게 와꾸를 잡아줄 것이고, Backbone을 쓰고 싶다면 Backbone 구조에 맞춰 와꾸를 생성해줄 것이다. 참고로 '와꾸'를 영어식으로 표현하면 스캣폴딩(Scaffolding)이다.

자 그럼 설치부터 해보자!

## 요~맨! 설치하기
요맨은 grunt와 비슷하게 하나의 CLI에 불과하고 실제 스캣폴딩 작업은 **제너레이터**라고 불리는 모듈통해 진행된다. 요맨과 요맨-제너레이터는 프로젝트를 구성하는 역할을 하기 때문에 전역에 설치하는 것이 일반적이다. 이에 반해 요맨으로 생성되는 프로젝트는 로컬에 설치된다. 사실상 요맨 자체는 전역적으로 모든 프로젝트에 동일하게 영향을 주어야하기 때문에 [전역에 설치된다는 전제하에 디자인되었다.][2] 따라서 요맨과 제너레이터는 반드시 전역에 설치 해야한다. 
```
$> npm install yo -g
```
가끔 권한이 없어서 설치를 못하는 경우엔 sudo를 이용하자.
```
$> sudo npm install yo -g
```
참고로 sudo를 이용해 설치해야하는 경우는 root 계정 또는 root에 준하는 권한으로 node가 설치 되어 있음을 의미한다. 즉 node가 루트 계정에 설치되어 있다는 얘기다. 이렇게 루트 계정에 node가 설치되면 요맨과 모든 제너레이터 설치과정에서 항상 sudo를 입력해야한다. 따라서 가급적이면 로컬 계정에 자신만의 node를 설치하는 것이 좋다.  

## 요~우~맨! 실행하기
이제 실행해보자.
```
$> yo

[?] ==========================================================================
We're constantly looking for ways to make yo better!
May we anonymously report usage statistics to improve the tool over time?
More info: https://github.com/yeoman/insight & http://yeoman.io
==========================================================================: No
[?] What would you like to do?
  Install a generator
  Find some help
‣ Get me out of here!
```
요맨을 실행하면 위와 같은 대화형 인터페이스가 나온다. 

##### 여기서 잠깐, 
우리가 실습해볼 내용을 간단히 짚고 넘어가자. 우리는 express 프레임워크 기반의 노드 서버를 하나 만들어볼 것이다. 
그리고 여기에 bower를 이용해 소스를 링크하고 실제 페이지를 개발하는 간단한 개발 플로우를 실습할 것이다.

위와 같은 실습을 위해서 express 제너레이터를 설치하고 실행해보자. 
다음과 같이 **yo**를 입력하고, **Install a generator**를 선택한다음에 ***express***를 입력한다.
```
$> yo

[?] What would you like to do? Install a generator
[?] Search NPM for generators: express
```
만약 설치가 안된다면, 다음과 같이 NPM을 이용해 직접 설치해도 된다.  
```
npm install -g generator-express
```
이제는 제너레이터를 이용해 프로젝트의 뼈대를 만들어보자. 참고로 제너레이터는 전역에 설치한다고 앞에서 언급했다. 하지만 제너레이터로 생성되는 프로젝트는 로컬에 설치된다.
```
$> yo

[?] What would you like to do?
❯ Run the Express generator (1.0.8)
  Update your generators
  Install a generator
  Find some help
  Get me out of here!

``` 
위와 같이 대화형 명령어를 이용해도 되고 아래와 같이 직접 입력해도 된다. 
```
yo express --basic
```
express 제너레이터는 최근에 --basic 옵션외에 --mvc 옵션을 추가했기때문에 옵션없이 입력하면 둘중 하나를 선택하라고 나온다. 우리는 일단 기본 구조로 만들어본다. 완료되면 아마도 아래와 같은 파일들이 자동으로 생성됐을 것이다. 
```
$> ls

Gruntfile.js  app.js  bower.json  node_modules/  package.json  public/  routes/  views/
```
## 생성된 프로젝트 뜯어보기
자, 이제 생성된 프로젝트가 어떻게 구성되어 있는지 살펴볼 차례다. 요맨은 bower와 grunt를 기반으로 프로젝트를 구성하기 때문에 일단은 Gruntfile을 열어 프로젝트 구성을 어떻게 했는지 살펴보자. 

```
$> cat Gruntfile.js

'use strict';

var request = require('request');

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  var reloadPort = 35729, files;

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    develop: {
      server: {
        file: 'app.js'
      }
    },
    watch: {
      options: {
        nospawn: true,
        livereload: reloadPort
      },
      server: {
        files: [
          'app.js',
          'routes/*.js'
        ],
        tasks: ['develop', 'delayed-livereload']
      },
      js: {
        files: ['public/js/*.js'],
        options: {
          livereload: reloadPort
        }
      },
      css: {
        files: ['public/css/*.css'],
        options: {
          livereload: reloadPort
        }
      },
      jade: {
        files: ['views/*.jade'],
        options: {
          livereload: reloadPort
        }
      }
    }
  });

  grunt.config.requires('watch.server.files');
  files = grunt.config('watch.server.files');
  files = grunt.file.expand(files);

  grunt.registerTask('delayed-livereload', 'Live reload after the node server has restarted.', function () {
    var done = this.async();
    setTimeout(function () {
      request.get('http://localhost:' + reloadPort + '/changed?files=' + files.join(','),  function (err, res) {
          var reloaded = !err && res.statusCode === 200;
          if (reloaded) {
            grunt.log.ok('Delayed live reload successful.');
          } else {
            grunt.log.error('Unable to make a delayed live reload.');
          }
          done(reloaded);
        });
    }, 500);
  });

  grunt.registerTask('default', ['develop', 'watch']);
};
```
음.. 뭔가 많다. 일단 등록된 기본(defalut) 테스크부터 역추적해보자. 기본으로 실행되는 grunt는 **develop**라는 태스크와 **watch**라는 태스크 2개를 순차적으로 실행한다.

#### 1. [develop][3] 태스크
일단 grunt.initConfig() 항목에서 **develop**을 찾아보자. 
```
develop: {
  server: {
    file: 'app.js'
  }
}
```
아하! 간단하다. develop 플러그인은 개발 모드로 노드 애플리케이션을 실행시켜준다. 즉, 여기서는 ***app.js*** 파일을 개발 모드로 실행시켜준다. 

> 참고로 해당 태스크 플러그인이 어떤 동작을 하는지 잘 모를때는 node_modules 폴더를 뒤져서 README 파일을 읽어보는 것이 좋다.

#### 2. [watch][4] 태스크
```
watch: {
  options: {
    nospawn: true,
    livereload: reloadPort
  },
  server: {
    files: [
      'app.js',
      'routes/*.js'
    ],
    tasks: ['develop', 'delayed-livereload']
  },
  js: {
    files: ['public/js/*.js'],
    options: {
      livereload: reloadPort
    }
  },
  css: {
    files: ['public/css/*.css'],
    options: {
      livereload: reloadPort
    }
  },
  jade: {
    files: ['views/*.jade'],
    options: {
      livereload: reloadPort
    }
  }
}
```
watch 항목은 좀 긴데, 쉽게 얘기하면 파일이 변경됐을때 tasks로 지정된 항목들을 실행시켜준다. server 타켓의 경우 개발 모드로 서버를 재시작하고, delayed-livereload 태스크를 실행한다. 

watch는 livereload 라는 모듈을 지원하는데, 옵션으로 리로드 포트를 지정해주면 해당 포트로 웹소켓을 열고, 브라우저에게 파일이 변경됐음을 알려준다. 그러면 브라우저는 화면을 리프레쉬해준다. 

delayed-livereload 테스크는 결국 노드 서버를 개발모드로 재시작하고, 서버가 재구동 될때까지 약 500ms정도 대기하고 있다가 브라우저에게 웹소켓으로 변경사항을 알리는 작업을 수행한다. 

즉, 여기서 자동으로 구성된 watch 태스크는 서버 파일이 변경될 경우엔 서버를 재시작한 뒤에 브라우저를 리프레시 시켜주고, 클라이언트 파일이 변경될 경우엔 바로 브라우저를 리프레쉬 시켜주는 역할을 한다. 

그럼 그런트를 실행하고 [localhost:3000][5] 으로 접속해보자. 
```
$> grunt

Running "develop:server" (develop) task
>> started application "app.js".

Running "watch" task
Waiting...Express server listening on port 3000
```
## 간단한 RESTful API 서버 만들기
일단 기본 페이지에 지원하는 API 목록을 나열해주는 페이지를 만들어보자. views/index.jade 파일을 열어 ul 항목을 추가해준다.

```
extends layout

block content
  h1= title
  p Welcome to #{title}

  ul
    li '/' - API 목록

```
위와 같이 추가하면 자동으로 watch 태스크가 변경을 감지하고 있다가 서버를 리로드하면서 브라우저도 리프레쉬 해줄것이다. 

```
>> File "views/index.jade" changed.

Running "watch" task
... Reload views/index.jade ...
Completed in 0.008s at Wed Mar 12 2014 15:11:14 GMT+0900 (KST) - Waiting...
```

#### bower를 이용한 라이브러리 가져오기
이번에는 자주 쓰이는 jquery와 underscore, momentjs 같은 라이브러리들을 가져와보자. 과거에는 해당 홈페이지에서 소스를 긁어오거나 다운로드 혹은 링크를 복사해서 삽입했었다. 하지만 이제는 커맨드 라인 명령어로 최신소스를 받아올수있다.

bower를 사용하기 전에 먼저 .bowerrc 파일을 열어 받아온 소스를 어디에 설치하는지 확인해보자. 
```
$> cat .bowerrc

{
  "directory": "public/components",
  "json": "bower.json"
}
```
위와 같이 설정된 위치는 실행되는 루트 폴더를 기준으로 **public/components** 폴더에 설치된다. 위치를 파악했으니 이제는 필요한 라이브러리를 설치하자.
```
$> bower install jquery underscore moment
.. 중략 ..

$> ls public/components
jquery/     moment/     underscore/
```

bower도 npm과 마찬가지로 설치한 파일을 설정파일에 저장해둘수 있다. 아래와 같이 **--save** 옵션을 주면, bower.json에 의존성이 기술된다. 
```
$> bower install jquery underscore moment --save
```

이제 설치된 소스를 index 페이지에 링크 건다.
```
extends layout

block content
  h1= title
  p Welcome to #{title}

  ul
    li '/' - API 목록

  script(src="components/underscore/underscore.js")
  script(src="components/moment/moment.js")
  script(src="components/jquery/dist/jquery.js")
```
그리고 브라우저에서 라이브러리가 제대로 링크됐는지 확인해보자. 

## Yeoman에서 개발한 공식 제너레이터 살펴보기
이제는 다른 제너레이터도 살펴보자. Yeoman 개발팀에서도 몇몇 제너레이터를 만들었는데, 기본 가이드에도 있는 webapp 제너레이터부터 살펴보자.

이제 설치에 대한 설명은 따로 하지 않아도 될것 같다. 알아서 하자!
```
$> npm install -g generator-webapp
$> mkdir webapp
$> cd webapp
$> yo webapp

     _-----_
    |       |
    |--(o)--|   .--------------------------.
   `---------´  |    Welcome to Yeoman,    |
    ( _´U`_ )   |   ladies and gentlemen!  |
    /___A___\   '__________________________'
     |  ~  |
   __'.___.'__
 ´   `  |° ´ Y `

Out of the box I include HTML5 Boilerplate, jQuery, and a Gruntfile.js to build your app.
[?] What more would you like?
❯⬢ Bootstrap
 ⬡ Sass with Compass
 ⬡ Modernizr
```
webapp 제너레이터를 실행하면 위와같은 3개의 옵션이 있다. 
 - Bootstrap

그리고 Gruntfile.js을 열어보자. 자세한 설명은 [여기서][6] 확인한다.
요약하면 아래와 같다. 

#### 주요 태스크
1. 기본 테스크 (default) 
  1. 'newer:jshint' : 새로운 파일만 jshint 태스크를 수행하고,
  2. 'test' : 테스트를 거쳐서 모두 통과되면,
  3. 'build' : 빌드를 수행한다. 

2. 빌드 테스크 (build)
  1. 'clean:dist' 
  2. 'useminPrepare'
  3. 'concurrent:dist'
  4. 'autoprefixer'
  5. 'concat'
  6. 'cssmin'
  7. 'uglify'
  8. 'copy:dist'
  9. 'modernizr'
  10. 'rev'
  11. 'usemin'
  12. 'htmlmin'

3. 서버 테스크 (serve)
  0. if not dist, run build : dist 폴더가 없으면 빌드를 먼저 진행한다. 
  1. 'clean:server' 
  2. 'concurrent:server'
  3. 'autoprefixer'
  4. 'connect:livereload'
  5. 'watch'

## [LiveReload][7]를 활용한 멀티 디바이스 개발 환경 구축하기
로컬 서버의 방화벽을 풀고 같은 네트워크 상에서 해당 로컬 서버의 IP로 접속이 가능하다면 다음과 같은 구성을 할 수 있다. 

1. 개발용 로컬 서버(맥북) - 소스코드 작성
2. 같은 네트워크 상의 모든 디바이스 
  - PC: 디버깅 전용
  - 아이폰: 모바일 대응
  - 아이패드: 모바일 대응
  - 기타 등등 노트북: 기타 N스크린 사이즈 대응

#### 구성 방법
watch 테스크가 동작하면 지정된 포트(35729)로 livereload 서버가 자동으로 실행되는데 이 서버에 리로드 클라이언트 소스를 요청해 삽입만 하면 간단하게 리로드 서버를 구축할수 있다.

따라서 watch 태스크로 프로젝트를 구성할 경우 호스트 이름을 로컬 IP(localhost, 127.0.0.1)대신에 실제 네트워크 IP로 구성하면 원격 디버깅이 가능해진다.
```
<script src='http://localhost:35729/livereload.js'></script>
위와 같은 코드 대신에 아래와 같이 실제 IP로 구성한다. 
<script src='http://xxx.xxx.xxx.xxx:35729/livereload.js'></script>
```

#### 실습 1 - yeoman webapp
요맨의 webapp으로 먼저 실습해보자. 
```
$> mkdir webapp
$> cd webapp
$> yo webapp
... 이하는 알아서 옵션을 선택해서 구성한다. ..
```
이제 Gruntfile.js 를 열어서 connect 테스크의 옵션을 수정하자. 
```
connect: {
    options: {
        port: 9000,
        livereload: 35729,
        // Change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
    },
```
위 코드에서 hostname을 자신의 네트워크 IP로 변경한다.
```
connect: {
    options: {
        port: 9000,
        livereload: 35729,
        // Change this to '0.0.0.0' to access the server from outside
        hostname: '10.202.212.140'
    },
```
그리고 실행해보자. 
```
$> grunt serve
```

#### 실습 2 - yeoman express
요맨 express로도 실습해보자. 
```
$> mkdir express
$> cd express
$> yo express
... 중략 ...

$> grunt
```
express 제너레이터로 구성된 프로젝트의 경우, views/layout.jade 파일에 리로드 소스를 직접 삽입하고 있기 때문에 약간의 수정이 필요하다. 먼저 layout.jade 파일을 열어 아래와 같이 동적으로 ip 변수를 받도록 수정한다.
```
html
  head
    title= title
    link(rel='stylesheet', href='/css/style.css')
    script(src='http://'+ip+':35729/livereload.js')
```
jade에서 전역 변수 ip를 사용하려면 아래와 같은 추가작업이 필요하다. app.js 파일을 열고 아래 두줄을 추가한다.
```
var app = express();

// for remote livereload
var ip = require('ip').address();
app.locals.ip = ip;
```
이제 ip모듈을 설치하고 실행해보자. 
```
$> npm install ip --save
$> grunt
```

[1]:http://yeoman.io/
[2]:http://stackoverflow.com/questions/18212175/npm-yo-keeps-asking-for-sudo-permission/18277225#18277225
[3]:https://github.com/edwardhotchkiss/grunt-develop
[4]:https://github.com/gruntjs/grunt-contrib-watch
[5]:http://localhost:3000
[6]:http://blog.drunkhacker.me/?p=329
[7]:http://livereload.com/