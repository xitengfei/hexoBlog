
---
title: Gulp 入门与应用
---
<br/>

### Why Gulp? ###
*gulp是前端开发过程中对代码进行构建的工具，是自动化项目的构建利器；它不仅能对网站资源进行优化，而且在开发过程中很多重复的任务能够使用正确的工具自动完成；使用它，我们不仅可以很愉快的编写代码，而且大大提高我们的工作效率*


**举一个栗子**: 前端开发中，一个网站有二十几个的页面，因此也有很多的css和js,　如果不用gulp，你会怎么做，如果从代码方便维护的角度出发你应该把文件放在多个文件里，比如"header.css","global.css","index.css","mobile.css", 但是从网站性能的角度出发，你可能应该把所有css放在一个文件里，所有js也最好放在一个文件里（因为请求数量的减少往往意味网站性能的提高)， 但这样代码的可维护性也就差了， 矛盾就这样产生了。 而在这里gulp正好就可以来解决这种问题: 你依然可以将代码放在多个文件里，然后通过gulp进行合并、压缩等处理，最终网页上还是只引用一个文件。 性能和代码的可维护性都兼顾了， 你的css和js代码可以分得更细致也没关系。

当然，这只是gulp最常见的功能之一，他还能做很多其他的事情，比如对es6 javascript代码进行转码，使得常见的浏览器能够识别，它还可以用来做angularjs, vue, reactjs等前端框架的脚手架。

可以说gulp在前端构建方面扮演着非常重要的角色，所以说它是前端构建工具的代表，其他常见的还有webpack, grunt等。

-----

### How to Start

##### 开始的开始，安装nodejs和npm环境.
一般情况下，nodejs的安装包都自带了npm, 所以在安装完nodejs后即可直接使用npm了。 

这里有两个名词，第一个**nodejs**不用说了, 火遍了整个互联网，从前端到后台到处有它的身影，想必大家都知道。 npm可能有的人不清楚，npm是node package manager的缩写，这么说大家应该就明白了，说白了，npm就是nodejs的包管理器。 

使用了nodejs的项目，基本上都会有node_modules这么一个目录, 这个目录就是存放nodejs的包的地方。同时还会有一个文件package.json，这是npm用来管理node_modules模块的配置文件, 它看起来像这样
![package.json](/blog/images/gulp-tutorial/package.json.jpg) 

其中的 **dependencies** 指定了该项目所依赖的包

##### 入门指南
参考：[gulp中文网-入门指南](http://www.gulpjs.com.cn/docs/getting-started/)

-----	

### 实战
接下来，我们跟大家一起动手尝试一下用gulp来进行前端css/js压缩打包的例子

##### 目录结构
使用了gulp的项目资源目录通常会像这样
 
![screenshot](/blog/images/gulp-tutorial/gulp-structure.png)

gulpfile.js 这个是用来定义gulp要执行的任务的配置文件

#### 步骤
1. 建立目录结构
2. 创建package.json
	{% codeblock %}npm init{% endcodeblock %}
3. 下载所有必须的依赖包
	{% codeblock %}
	npm install --save-dev gulp
	npm install --save-dev gulp-sass
	npm install --save-dev gulp-concat
	npm install --save-dev gulp-minify
	npm install --save-dev gulp-uglifycss
	npm install --save-dev browser-sync
	{% endcodeblock %}

	也可以这样运行(注意: 模块之间应该用空格分隔, 不能用tab分隔)
	{% codeblock %}
	npm install --save-dev gulp gulp-sass gulp-concat gulp-minify gulp-uglifycss browser-sync
	{% endcodeblock %}

4. 建立gulpfile.js
5. 运行gulp, 进行项目的开发

最后, 附上一个gulpfile.js的例子:

{% codeblock [gulpfile] [lang: nodejs] %}
'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var uglifycss = require('gulp-uglifycss');
var browserSync = require('browser-sync');
var reload  = browserSync.reload;

gulp.task('styles',function(){
    gulp.src([
        'src/vender/rangeslider/rangeslider.css',
        'src/sass/app.scss'
    ])
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('styles.min.css'))
    .pipe(uglifycss({"maxLineLen": 800,"uglyComments": true}))
    .pipe(gulp.dest('dest/css'));
});

gulp.task('scripts', function() {
    gulp.src([
        'src/vender/rangeslider/rangeslider.min.js',
        'src/js/main.js'
    ])
    .pipe(concat('scripts.js'))
    .pipe(minify({ext:{src:'.debug.js',min:'.min.js'}}))
    .pipe(gulp.dest('dest/js'));
});

gulp.task('watch', ['build'], browserSync.reload);

// BrowserSync
gulp.task('serve', ['build'], function() {
	browserSync({
		server: {
			baseDir: 'dest'
		},
		open: true,
		online: false,
		notify: true,
	});

	//要监控的文件
	gulp.watch([
		'src/js/main.js'
	],['watch']);
});

gulp.task('build', ['styles', 'scripts']);

gulp.task('default', ['build']);

{% endcodeblock %}