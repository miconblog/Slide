Grunt 빌드와 Front-End 최적화 빌드
=====

# [Grunt][1] 란?
Task 중심의 빌드 도구로써 Java 진영에 있는 Ant나 Maven 같은 역할을 한다. 자세한 설명이 굳이 필요 없을 정도로 최근 JS 진영에서는 업계 표준으로 자리 잡고 있다해도 무방하다. 대항마로는 [Glup][2] 같은 새로운 도구들이 있다.

## npm 기반의 플러그인 설치
그런트는 npm을 기반으로 모듈의 의존성을 확인하고 필요한 플러그인을 설치하기 때문에 npm 모듈의 의존성을 기술한 **package.json** 파일이 필요하다. 파일은 직접 생성해도 되지만 간단히 아래와 같은 명령어를 입력해도 된다.
```
$> npm init
```
위와 같이 입력하면 몇가지 질의 응답만으로 package.json 파일을 만들수 있다. 일단 뭔소린지 모르면 그냥 Enter 키만 눌러도 된다. Enter 키만 눌러서 만들어진 내용은 다음과 같다.
```
{
  "name": "20140305",
  "version": "0.0.0",
  "description": "Grunt 빌드와 Front-End 최적화 빌드",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```
여기서 특이한 점은 README.md 파일을 같은 폴더에 만들어 두면 해당 파일의 타이틀을 가져다가 description을 채운다. 그런트 홈페이지에 있는 가이드 처럼 아래와 같이 작성해도 된다.
```
{
  "name": "my-project-name",
  "version": "0.1.0",
  "devDependencies": {
    "grunt": "~0.4.2",
    "grunt-contrib-jshint": "~0.6.3",
    "grunt-contrib-nodeunit": "~0.2.0",
    "grunt-contrib-uglify": "~0.2.2"
  }
}
```
그런트 홈페이지에서 가이드하고 있는 package.json 파일에는 예제로 쓰이는 플러그인들이 미리 정의되어 있다. 위에서 [***grunt-contrib-***][3] 붙은 녀석들은 모두 그런트 개발팀에서 개발한 공식 플러그인 들이다. 일단 모르니까 그냥 넘어가자.

## 그런트! 일단 닥치고 설치하기!
노드가 설치 됐다면 이제 npm으로 그런트를 설치하자! 거의 필수 도구 이므로 -g 옵션을 주고 전역에 깔도록 하자.
```
$> npm install -g grunt-cli
```

권한이 없다면 sudo 명령으로 깔자!
```
$> sudo npm install -g grunt-cli
```

### 여기서 잠깐!
**Q:** 그런데 grunt와 grunt-cli는 다른 녀석인가요? 예전엔 grunt만 설치하면 됐었는데.. 지금은 왜 grunt-cli를 깔라는 거죠? @.@

**A:** 네, 좋은 질문입니다. grunt-cli는 커맨드 라인 인터페이스의 약자로 커맨드라이으로 입력되는 명령어를 해석해서 태스크 러너(Task Runner)라고 불리는 실제 Grunt에게 넘기는 역할을 해주는 인터페이스에 불과합니다.

CLI는 실제 태스크 러너의 버전과 관계없이 동일하게 동작하므로 보통 전역에 설치합니다. 그래서 -g 옵션을 주고 까는 겁니다. 따라서 grunt-cli는 실제 태스크를 실행해주는 태스크 러너가 필요합니다. 하지만 태스크 러너는 하위 버전 호환이 되지 않으므로 로컬에 설치하는 것이 일반적이고, 러너 버전에 따라 의존된 플러그인도 다르기 때문에 플러그인도 같은 로컬에 설치하는 것이 일반적입니다.

## Grunt Task Runner 설치
앞에서 이야기 한 태스크 러너를 로컬에 설치해보자.
```
$> npm install grunt
또는
$> npm install grunt --save-dev
```
npm 으로 모듈을 설치할때 --save-dev 옵션을 주면, package.json 파일에 "이 녀석은 개발할때 쓰이는 플러그인이에요.." 라는 의미로 "devDependencies" 항목에 자동으로 해당 모듈을 넣어준다.

이제 모든 그런트 설치가 끝났다. 실행해보자!
```
$> grunt
...
Fatal error: Unable to find Gruntfile.
```
뚜둥~! 그랬더니 Gruntfile 파일이 없다고 에러가 뜬다!. 그런트는 Gruntfile.js 라는 설정 파일을 읽어서 실행하기 때문에 반드시 이 파일이 있어야 한다.


## 그런트의 시작과 끝은 모두 설정 파일에서 진행된다.
그럼 **설정 파일(Gruntfile.js)**을 만들어 보자. 일단 아무일도 하지 않는 Gruntfile.js 파일을 만들자.
```
module.exports = function(grunt) {

  // 아무일도 하지 않는 기본 테스크
  grunt.registerTask('default', []);

};
```
그리고 커맨드창에서 실행시켜보자.
```
$> grunt

Done, without errors.
```
아무일도 하지 않기 때문에 에러없이 위와 같이 출력된다. 만약 에러가 발생하면 색상도 변경되고, 삐~~ 하는 소리도 들린다. 에러날때 이런 소리가 거실리면 -no-color 옵션을 줘도 된다.
```
$> grunt -no-color
```
사실상 태스크 러너는 아무일도 하지 않고, 그저 정의된 태스크만 실행해주는 녀석이다. 따라서 우리가 지금부터 해야할 일은 필요한 그런트 플러그인을 찾는 일이다!

### 플러그인 설치
하지만 뭘 어떻게 할지 모르기 때문에 그런트 개발팀이 공식적으로 지원하고 운영하는 플러그인을 죄다 깔고 어떤 것들이 있는지 한번 [살펴보자][3]. 참고로 전부 설치하면 꾀나 오래걸린다! 한 2분쯤?
```
$> npm install grunt-contrib --save-dev
```
자 그럼 어떤 녀석들이 설치됐는지 package.json 파일을 열어 devDependencies 항목을 살펴보자.
```
"devDependencies": {
    "grunt": "^0.4.2",
    "grunt-contrib-copy": "^0.5.0",
    "grunt-contrib-concat": "^0.3.0",
    "grunt-contrib-clean": "^0.5.0",
    "grunt-contrib-htmlmin": "^0.2.0",
    "grunt-contrib-compass": "^0.7.2",
    "grunt-contrib-sass": "^0.7.2",
    "grunt-contrib-cssmin": "^0.7.0",
    "grunt-contrib-jst": "^0.5.1",
    "grunt-contrib-csslint": "^0.2.0",
    "grunt-contrib-watch": "^0.5.3",
    "grunt-contrib-coffee": "^0.10.1",
    "grunt-contrib-uglify": "^0.3.3",
    "grunt-contrib-requirejs": "^0.4.3",
    "grunt-contrib-qunit": "^0.4.0",
    "grunt-contrib-handlebars": "^0.6.1",
    "grunt-contrib-jasmine": "^0.6.1",
    "grunt-contrib-jshint": "^0.8.0",
    "grunt-contrib-compress": "^0.6.1",
    "grunt-contrib-stylus": "^0.12.0",
    "grunt-contrib-nodeunit": "^0.3.2",
    "grunt-contrib-jade": "^0.10.0",
    "grunt-contrib-imagemin": "^0.4.1",
    "grunt-contrib-connect": "^0.6.0",
    "grunt-contrib-less": "^0.9.0",
    "grunt-contrib-yuidoc": "^0.5.1",
    "grunt-contrib": "^0.9.0"
  }
```
보다시피 엄청 많은 플러그인들이 한꺼번에 깔렸다. 짐작했듯이 grunt-contrib 라는 플러그인 프로젝트는 그런트 개발팀이 개발한 녀석들을 하나의 묶어놓은 프로젝트라는 것을 알수 있다. 참고로 그런트 개발팀에서는 한꺼번에 설치하면 너무 많으므로 필요한 녀석만 따로 설치하라고 권장한다.

## 그런트 설정 파일과 플러그인 설정
이제 필요한 플러그인들은 대충 깔았으니 어떻게 사용하는지 알아보자. 사용하려는 플러그인은 모두 그런트 설정 파일에 기술해야한다. 설정파일은 크게 4가지 파트로 구성되어 있다.
```
// 1. 랩퍼 함수
module.exports = function(grunt) {

  // 2. 프로젝트 설정 및 플러그인 초기화
  grunt.initConfig({});

  // 3. 플러그인 로드
  grunt.loadNpmTasks('xxx');

  // 4. 태스크 등록
  grunt.registerTask('default', []);
};
```
이미 앞서서 Gruntfile에 1번과 4번은 기술해봤고, 이제 2번과 3번에 해당하는 플러그인 항목만 기술하면 된다.

### 랩퍼 함수
그런트 설정 파일은 아래와 같은 랩핑 함수 형태로 정의된다. 형태를 보면 알겠지만 일반 node 모듈과 동일하다.
```
module.exports = function(grunt) {
  ... 중략 ...
}
```
### 프로젝트 설정 및 플러그인 초기화
그런트에서 initConfig 함수는 가장 중요한 부분이다. 각 플러그인들은 자신만의 설정을 갖는데, 가령 파일을 병합해주는 concat 플러그인의 경우 어떤 파일들을 하나로 합쳐서 어디에 저장할 것인가를 설정파일에 기술하게 된다. 

따라서 플러그인 설정은 해당 플러그인 프로젝트 사이트에서 문서를 참고하는 것이 좋다.
```
grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),
  플러그인-이름:{
    타켓-이름:{
    	... 플러그인 고유 설정 ...
    }
  },
  uglify: {
    build: {
      src: 'src/<%= pkg.name %>.js',
      dest: 'build/<%= pkg.name %>.min.js'
    }
  },
  concat : {
    ... concat 플러그인 설정 ...
  }
  ... 기타 다른 플러그인 설정 ...
});
```
위에서 pkg에 설정된 값처럼 직접 파일을 읽어서 JSON 객체로 만들고 이것을 다시 설정 파일 안에서 ```<%= pkg.xxx %>``` 형태로 불러다가 쓸수도 있다.

플러그인 이름은 겹치지만 않으면 잘 동작한다.

### 플러그인 로드
플러그인 설정을 마무리 했다며 이제는 실제 그런트 플러그인을 쓸수 있도록 로드해야한다. 로드 과정은 단순히 npm 으로 플러그인을 설치한다고 끝나는게 아니라 설정 파일에 일일이 기술 해야한다.
```
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-concat');
```
하지만 위처럼 작성하는게 여간 귀찮은 일이 아니다. 그래서 설치된 모듈을 일일이 찾아서 그런트가 실행될때 자동으로 로드 해주는 [**load-grunt-tasks**][4] 라는 플러그인도 있다.

```
module.exports = function(grunt) {

  // 0. 아래 2번을 대신한다.
  require('load-grunt-tasks')(grunt);

  // 1. 프로젝트 설정 및 플러그인 초기화
  grunt.initConfig({});

  // 2. 플러그인 로드
  //grunt.loadNpmTasks('xxx');

  // 3. 태스크 등록
  grunt.registerTask('default', []);
};
```
### 태스크 등록
이제 마지막 단계는 커맨드 라인에서 명령어로 실행할 태스크를 등록하는 일이다. 이미 앞에서 본적이 있다. 커맨드 라인에서 아래와 같이 입력하면 default로 등록된 테스크가 실행된다. 즉, grunt default에서 default는 생략 해도 된다.
```
$> grunt [태스크 이름]:[타켓이름]
$> grunt default <--- default 는 생략 가능
```
태스크 등록은 아래와 같이 registerTask 함수를 통해 등록하는데, 첫번째 인자로 태스크 이름을 쓰고, 두번째 인자로 실행할 태스크 플러그인을 지정한다. 당연히 실행할 태스크를 여러개 등록할수도 있다.
```
grunt.registerTask('default', [
    'clean:dist',
    'copy:dist',
    'jadeUsemin'
]);
```
실행할 태스크 플러그인 중에 콜론(:)으로 연결된 녀석들은 해당 플러그인의 타켓을 여러개 등록해서 특정 타겟만 실행시킬수도 있다.

# Front-End 소스 최적화 빌드 만들기
Yahoo! 개발자들이 정리한 [웹사이트 최적화 기법][5]에 따르면 배포되는 소스는 하나로 최적화하는 것이 좋다. 기본적으로 CSS와 JS파일은 하나로 병합하고 압축할 것을 권장하지만 필요에 따라서는 2개 3개로 나누어 배포하기도 한다. 이때 나누는 기준은 얼마나 자주 파일이 갱신 되느냐에 따라 나눈다. 보통은 라이브러리성 파일 하나와 자주 수정되는 서비스 파일을 하나로 묶어 배포한다. 이렇게 파일을 2개로 나누면 파일이 자주 변경 배포되더라도 라이브러리성 파일의 캐시는 계속 유효하므로 전체적인 캐시 효율을 높일수 있다.

## 배포 폴더 초기화
배포할 소스는 별도의 폴더로 관리하는 것이 일반적이다. 이때 배포 폴더의 생성하고 초기화 하는데 사용되는 플러그인이 바로 [clean][6] 플러그인이다. 사용법도 간단하다. 아래와 같이 폴더명을 적어주면 해당 폴더의 모든 파일을 삭제해준다. (단, 해당 폴더의 파일중 일부가 다른 프로세스에 의해 열려있거나 사용중일때는 삭제 되지 않는다.)
```
clean: ["path/to/dir/one", "path/to/dir/two"]
```

## 소스 파일 병합
소스 파일 병합은 [concat][7] 플러그인을 이용해 하나로 합친다. 파일 병합은 빌드 배포의 기본이 되는 플러그인이라 보통 단독으로 사용되기 보다는 다른 플러그인과 함께 사용되는 경우가 많다.

```
concat: {
  options: {
    separator: ';',
  },
  dist: {
    src: ['src/intro.js', 'src/project.js', 'src/outro.js'],
    dest: 'dist/built.js',
  }
}
```
## 병합된 파일 압축
파일 압축은 [uglify][8] 플러그인을 사용한다. 이 플러그인은 특히 옵션이 다양하기 때문에 자세한 설정은 문서를 참고한다.
```
uglify: {
  my_target: {
    files: {
      'dest/output.min.js': ['src/input1.js', 'src/input2.js']
    }
  }
}
```
## 파일 배포
파일 배포는 [copy][9] 플러그인을 이용한다. 이름에서도 짐작하겠지만 파일을 복사해주는 역할을 담당한다. 이 플러그인 역시 다양한 옵션이 존재한다. 가령, 특정폴더 안에 있는 특정 확장자만 복사한다든가, 특정 패턴을 가진 이름만 복사한다든가, 다양하게 응용할 수 있다.
```
copy: {
  main: {
    src: 'src/*',
    dest: 'dest/'
  }
}
```

## 배포할 파일을 자동으로 검출하기
기본적인 배포는 앞에서 살펴본 플러그인만 있으면 진행할수있다. 하지만 개발중인 프로젝트의 소스 파일을 배포할때는 설정이 계속해서 바뀔 가능성이 있다.

가령, HTML에 링크시킨 JS 파일이 하나 추가 됐다면 이에 따른 배포 설정에도 해당 파일을 추가해줘야한다. 즉 매번 파일이 생성되거나 제거할때마다 배포빌드 스크립트도 변경해야한다는 엄청난 귀차니즘이 존재한다.

이 문제를 해결하기 위해서 yeoman 개발팀은 [usemin][10] 이라는 플러그인을 개발했다. 이 플러그인은 아래와 같이 HTML의 주석안에 있는 스크립트 태그나 스타일 태그를 다른 링크로 교체해준다. 즉, 주석의 내용을 컴파일 해서 주석 안에 포함된 링크를 하나로 병합해서 압축하고 배포해주는 역할을 한다.
```
// 기본 사용법
<!-- build:<type>(alternate search path) <path> -->
... HTML Markup, list of script / link tags.
<!-- endbuild -->

--------------------------

// HTML에 삽입된 모습
<!-- build:js js/app.js -->
<script src="js/app.js"></script>
<script src="js/controllers/thing-controller.js"></script>
<script src="js/models/thing-model.js"></script>
<script src="js/views/thing-view.js"></script>
<!-- endbuild -->
```
위와 같이 작성된 HTML은 usemin 과정을 거치면 아래와 같이 링크를 덮어쓰게 된다.
```
<script src="js/app.js"></script>
```
usemin은 본래 HTML 파일을 덮어쓰게 되므로 보통은 배포 할 HTML을 먼저 옮겨놓고 배포할 위치에서 usemin을 수행한다.

그래서 실질적으로 usemin 태스크는 2가지(useminPrepare와 usemin) 과정을 거친다.

1. 먼저 useminPrepare 과정을 통해 concat과 uglify 태스크 설정을 동적으로 만들어준다. 그리고 이 태스크를 실행하면 임시 폴더(.tmp)에 파일을 병합하고 압축해서 배포한다. 만약 css압축 설정도 있다면 cssmin 과정도 거친다.
```
  concat: {
    '.tmp/concat/js/app.js': [
      'app/js/app.js',
      'app/js/controllers/thing-controller.js',
      'app/js/models/thing-model.js',
      'app/js/views/thing-view.js'
      ]
  },
  uglifyjs: {
    'dist/js/app.js': ['.tmp/concat/js/app.js']
  }
```

1. 두번째 usemin 과정에서 배포 위치에 이 압축 병합된 파일을 옮겨준다.

이 전체 build 과정을 그런트 설정으로 표현하면 아래와 같다.
```
module.exports = function(grunt) {
  grunt.initConfig({
    clean: {
      dist: ['dist', '.tmp']
    },
    useminPrepare: {
      html: 'public/index.html'
    },
    copy:{
      dist:{
        files:[{
          expand: true,
          dot: true,
          cwd: 'public',
          dest: 'dist',
          src:['*.html']
        }]
      }
    },
    usemin: {
      html: 'dist/index.html',
      options: {
        assetsDirs: ['dist']
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-usemin");

  grunt.registerTask('build', [
    'clean:dist',		// 배포 폴더를 초기화
    'useminPrepare',	// usemin처리를 위한 사전 작업
    'concat',			// useminPrepare가 동적으로 설정해준다.
    'uglify',			// useminPrepare가 동적으로 설정해준다.
    'copy:dist',		// 배포할 위치로 HTML 파일 복사
    'usemin'			// 배포 위치에서 usemin 실행
  ]);
};
```


# 그밖에 자주 쓰이는 플러그인
## [jshint][11]
## [watch][12]
## [jadeUsemin][13]
## [shel][14]




[1]:http://gruntjs.com/getting-started
[2]:http://gulpjs.com/
[3]:https://github.com/gruntjs/grunt-contrib
[4]:https://github.com/sindresorhus/load-grunt-tasks
[5]:http://developer.yahoo.com/performance/rules.html
[6]:https://github.com/gruntjs/grunt-contrib-clean
[7]:https://github.com/gruntjs/grunt-contrib-concat
[8]:https://github.com/gruntjs/grunt-contrib-uglify
[9]:https://github.com/gruntjs/grunt-contrib-copy
[10]:https://github.com/yeoman/grunt-usemin
[11]:https://github.com/gruntjs/grunt-contrib-jshint
[12]:https://github.com/gruntjs/grunt-contrib-watch
[13]:https://github.com/pgilad/grunt-jade-usemin
[14]:https://github.com/sindresorhus/grunt-shell
[20]:http://jslinterrors.com/
[21]:http://flippinawesome.org/2013/07/01/building-a-javascript-library-with-grunt-js/