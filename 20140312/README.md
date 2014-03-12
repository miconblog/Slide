Yeoman으로 빠른 웹 개발 환경 구축하기
=====

# [Yeoman][1] 이란?
요맨은 한마디로 웹 개발에 필요한 '와꾸'를 만들어주는 도구다. 요맨이 내걸고 있는 슬로건을 보면 더욱 명확하다. ***"THE WEB'S SCAFFOLDING TOOL FOR MODERN WEBAPPS"***

최신 웹개발의 트랜드는 속도전에 가깝다. Grunt와 Bower로 자질구레한 귀찮은 작업들은 자동화를 하고, 많은 MVC 프레임워크들이 등장하면서 코드는 점점 구조화되고 있다. 그래서 요맨은 이런 트랜디한 경험들을 하나의 세트로 구성해준다. 가령, AngularJS로 무엇인가를 만들고 있다면 Angular 구조에 맞게 와꾸를 잡아줄 것이고, Backbone을 쓰고 싶다면 Backbone 구조에 맞춰 와꾸를 생성해줄 것이다. 참고로 와꾸를 영어식으로 표현하면 스캣폴딩(Scaffolding)이라고 말한다.

자 그럼 설치부터 해보자!

## 설치하기
요맨은 npm 기반의 모듈이므로 설치는 아래와 같다. 단 반드시 전역으로 설치해야한다. 요맨을 로컬에 설치하면 매번 같은 제너레이터를 프로젝트마다 설치해야하는 이유로 인해 제너레이터는 [전역에 설치된다는 가정하에 디자인 되었다.][2] 따라서 전역에 설치하자!
```
$> npm install yo -g
```
가끔 권한이 없어서 설치를 못하는 경우엔 sudo를 이용하자.
```
$> sudo npm install yo -g
```
참고로 sudo를 이용해 설치하는 경우는 root 계정 또는 권한으로 node가 설치 되어 있음을 의미한다. 이렇게 root계정으로 node를 설치하게 되면 모든 설치과정에 항상 sudo를 입력해야한다. 따라서 가급적이면 로컬 계정에 자신만의 node를 설치하는 것이 좋다.  

## 실행하기
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
요맨을 실행하면 위와 같은 대화형 인터페이스로 제너레이터를 설치할 것인지를 묻게 된다. 그럼 간단히 express를 이용한 웹서버를 하나 만든다고 가정하고 관련 제너레이터를 찾아서 설치해보자.

다음과 같이 **yo**를 입력하고, **Install a generator**를 선택한다음에 ***express***를 입력해보자.
```
$> yo

[?] What would you like to do? Install a generator
[?] Search NPM for generators: express
```
만약 설치가 안된다면, 다음과 같이 NPM을 이용해 직접 설치해도 된다.  
```
npm install -g generator-express
```
이제는 제너레이터를 이용해 프로젝트의 뼈대를 만들어보자. 참고로 제너레이터는 전역에 설치한다고 앞에서 언급했다. 하지만 제너레이터를 생성되는 프로젝트는 로컬에 설치된다.
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
아하! 간단하다. develop 플러그인은 ***app.js*** 파일을 서버로 실행시켜준다. 

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
watch 항목은 좀 긴데,.. 쉽게 얘기하면 변경된 파일을 감시하고, 변경이 일어나면 서버를 재구동시켜준다. 결국 자동으로 생성된 기본 프로젝트는 grunt 명령과 함께 서버를 실행하고 변경 파일을 감지해 서버를 재시작해준다. 그럼 그런트를 실행하고 localhost:3000 으로 접속해보자. 
```
$> grunt

Running "develop:server" (develop) task
>> started application "app.js".

Running "watch" task
Waiting...Express server listening on port 3000
```



[1]:http://yeoman.io/
[2]:http://stackoverflow.com/questions/18212175/npm-yo-keeps-asking-for-sudo-permission/18277225#18277225
[3]:https://github.com/edwardhotchkiss/grunt-develop
[4]:https://github.com/gruntjs/grunt-contrib-watch