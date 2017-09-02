---
title: 使用 Hexo 碰到的一些问题
date: 2017-09-02
categories: githubBlog
tags: hexo blog
---

最近使用hexo的过程中碰到了一些问题，记录下来，希望或多或少能对再碰到这些问题的人有所帮助。

### issue1: windows deploy to github的问题
不知道大家有没有遇到，反正我是被这个问题困扰了一阵子。我的工作电脑是linux, 个人电脑则是windows.无论如何 hexo d, 完全同样的_config.yml文件，完全同样的git deployer配置，但是windows 运行 hexo d就是报错。根据报错信息来看，似乎是无法验证的问题

最后的解决方案：
将github的https方式换成ssl方式
不知道为什么hexo在windows上默认用了ssl验证的方式，没有用输入用户名和密码的方式，以后有时间再来研究这个问题。


### issue2: 如何将hexo部署到二级目录
说明：

1.创建git仓库username/blog， 开启github page
2.修改hexo配置_config.yml
3.修改hexo git deploy 配置



### issue3: 更换主题后页面错乱
方案：执行hexo clean 清理一下即可
`
hexo clean
hexo d
hexo server
`


### issue4: URL /categories 为空，如何创建 categories页面？

说明：我最近更换了主题，现在用的是icarus主题，是一个很不错的主题，[传送门](https://github.com/ppoffice/hexo-theme-icarus).然而在安装完以后，URL /categories 却是 404.

解决方案：
1. 新建一个名为 categories的页面，命令：
`
hexo new page categories
`
2. 编辑这个页面，将页面的layout设置为 categories。
`
---
layout: categories
title: 分类
date: 2017-09-02 19:03:03
tags:
---
`