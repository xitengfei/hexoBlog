---
title: Gulp Tutorial
---

### Why Gulp?
*gulp是前端开发过程中对代码进行构建的工具，是自动化项目的构建利器；它不仅能对网站资源进行优化，而且在开发过程中很多重复的任务能够使用正确的工具自动完成；使用它，我们不仅可以很愉快的编写代码，而且大大提高我们的工作效率*


 举一个栗子: 前端开发中，一个网站有二十几个的页面，因此也有很多的css和js,　如果不用gulp，你会怎么做，






### How to Start

#####参考链接
参考链接：[gulp 中文网](http://www.gulpjs.com.cn/) 





#####其他
* 使用了gulp的项目资源目录通常会像这样
![screenshot](http://content.screencast.com/users/TengFeiXi/folders/MyBlog/media/64ad12ea-01c0-4a01-ab94-6a8cd0f904ce/static-01.png)

* 入门指南
请参考[gulp中文网-入门指南](http://www.gulpjs.com.cn/docs/getting-started/)

其中有几个文件需要注意：
1. package.json 这是npm用来管理node_modules模块的配置文件, 它看起来像这样
![package.json](https://content.screencast.com/users/TengFeiXi/folders/MyBlog/media/d30d3488-6f40-4885-b6f5-0df2c52a9314/package.json.jpg) 

其中的 **dependencies** 指定了所有的依赖项
2. gulpfile.js 这个是用来定义gulp要执行的任务的配置文件

---