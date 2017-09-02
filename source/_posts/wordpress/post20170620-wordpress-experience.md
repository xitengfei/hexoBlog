---
title: WordPress 开发心得
date: 2017-06-13 14:10:18
tags: php wordpress
categories: wordpress
---

*写这篇博客记录一下本人在两年以来在wordpress使用和开发中的心得, 也可以算是分享一下经验吧。*

*首先罗嗦两句，wordpress一个小型的php 博客系统，能在长达十几年的时间里长盛不衰，而且发展到今天还是如此受欢迎，
据统计，2015年全球运行WordPress网站数量占25%，远远领先其他的框架和cms系统。而且拥有海量的插件和主题，已经形成了完善的生态系统。*

*好了言归正传，对于简单的wordpress使用者来说，会安装主题，会用wordpress的CMS系统就行了，这篇博客主要针对的是基于wordpress的开发，所以怎么安装wordpress, 怎么安装插件和主题这类的东西不会在这里说明，大家可以在网上很容易地找到相关的教程。 *

-----

#### 主题开发

使用wordpress，我们可以很方便地定制自己的模板，但是要清楚地知道怎样给特定内容设置特定的模板，我们必须搞清楚wordpress的模板层次，或者说是模板优先级。
关于这个知识点，内容比较长，请参考这篇文章
http://www.chinaz.com/web/2015/0126/380586.shtml

#### 自定义字段神器, ACF Plugin
我们可以在后台添加自定义字段，从而为特定内容提供特定的附加内容。

然而有时候通过在后台定义字段的方式并不是最好的方式，如果有多个开发环境，在每个环境上都要做一遍
相同的配置，也是一件痛苦的事情，虽然可以使用export/import, 但还是会麻烦许多。
ACF允许我们在PHP中注册自定义字段，从而轻松地将什么内容有什么字段定义在了代码中，更加安全，节省了多环境下多次配置字段的时间，并且符合开发人员的习惯。

在PHP代码中注册自定义字段参考文档
https://www.advancedcustomfields.com/resources/register-fields-via-php/

#### 内容编辑, Visual Composer
简介: Visual Composer是一个可视化的内容编辑插件，功能强大：它提供了丰富的模块，支持直观地拖放排版，并且提供了接口可以建立自定义的模块。
开发文档：https://wpbakery.atlassian.net/wiki/display/VC/Inner+API