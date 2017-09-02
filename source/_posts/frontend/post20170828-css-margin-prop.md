---
title: 子元素的 margin-top 传递给了父元素
date: 2017-08-28
categories:
- 前端
- Css
tags:
- css
- margin
---

我们可能经常碰到这样的情况，给一个child元素加了margin-top，但是没有生效，而是传递到了父元素上。例如下面一段代码：

```
<div id = "parent">
   <div id = "child">
      demo
   </div>
</div>
```


#### **原因**:

这是由于CSS的外边距合并造成的。
外边距合并指的是，当两个垂直外边距相遇时，它们将形成一个外边距。
合并后的外边距的高度等于两个发生合并的外边距的高度中的较大者。

margin折叠的产生有几个条件：

这些margin都处于普通流中，并在同一个BFC中；
这些margin没有被非空内容、padding、border 或 clear 分隔开；
这些margin在垂直方向上是毗邻的，包括以下几种情况：
1、一个box的top margin与第一个子box的top margin
2、一个box的bottom margin与最后一个子box的bottom margin，但须在该box的height 为auto的情况下
3、一个box的bottom margin与紧接着的下一个box的top margin
4、一个box的top margin与其自身的bottom margin，但须满足没创建BFC、零min-height、零或者“auto”的height、没有普通流的子box

垂直方向上毗邻的box不会发生折叠的情况：

根元素的外边距不会参与折叠
一个有clearance的box的上下margin毗邻，它会与紧接着的下一个box发生margin折叠，但折叠后的margin不会再与它们父box的bottom margin折叠

折叠边距的计算

当两个margin都是正值的时候，取两者的最大值；当 margin 都是负值的时候，取的是其中绝对值较大的，然后，从 0 位置，负向位移；当有正有负的时候，先取出负 margin 中绝对值中最大的，然后，和正 margin 值中最大的 margin 相加。但必须注意，所有毗邻的margin要一起参与运算，不能分步进行。

更具体的规则请参考[这里](http://www.w3school.com.cn/css/css_margin_collapsing.asp)。

----------
####　**解决方法：**

1、修改父元素的高度，增加padding-top样式模拟（padding-top：1px；常用） 
2、为父元素添加overflow：hidden；样式即可（完美） 
3、为父元素或者子元素声明浮动（float：left；可用） 
4、为父元素添加border（border:1px solid ） 
5、为父元素或者子元素声明绝对定位