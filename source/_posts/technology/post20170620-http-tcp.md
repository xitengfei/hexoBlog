---
title: HTTP协议中的短轮询、长轮询、长连接和短连接
date: 2017-06-20 13:56:41
tags: 
category: 网络协议
---


很久之前LZ就听说过长连接的说法，而且还知道HTTP1.0协议不支持长连接，从HTTP1.1协议以后，连接默认都是长连接。但LZ终究觉得对于长连接一直懵懵懂懂的，有种抓不到关键点的感觉。

　　今天LZ通过一番研究，终于明白了这其中的奥秘。而之前，LZ也看过长连接相关的内容，但一直都是云里雾里的。这次之所以能在这么短的时间里搞清楚，和LZ自己技术的沉淀密不可分。因此，这里LZ借着这个机会，再次强调一下，千万不要试图去研究你研究了很久都整不明白的东西，或许是你的层次不到，也或许是你从未在实际的应用场景接触过，这种情况下你去研究，只会事倍功半，徒劳一番罢了。

　　回到正题，既然说是误解，那么LZ的误解到底是什么？

　　那就是LZ一直认为，HTTP连接分为长连接和短连接，而我们现在常用的都是HTTP1.1，因此我们用的都是长连接。

　　这句话其实只对了一半，我们现如今的HTTP协议，大部分都是1.1的，因此我们平时用的基本上都是长连接。但是前半句是不对的，HTTP协议根本没有长短连接这一说，也正因为误解了这个，导致LZ对于长连接一直不明不白，始终不得其要领，具体下面一段会说到。

　　网络上很多文章都是误人子弟，根本没有说明白这个概念。这里LZ要强调一下，HTTP协议是基于请求/响应模式的，因此只要服务端给了响应，本次HTTP连接就结束了，或者更准确的说，是本次HTTP请求就结束了，根本没有长连接这一说。那么自然也就没有短连接这一说了。

　　之所以网络上说HTTP分为长连接和短连接，其实本质上是说的TCP连接。TCP连接是一个双向的通道，它是可以保持一段时间不关闭的，因此TCP连接才有真正的长连接和短连接这一说。

　　其实知道了以后，会觉得这很好理解。HTTP协议说到底是应用层的协议，而TCP才是真正的传输层协议，只有负责传输的这一层才需要建立连接。

　　一个形象的例子就是，拿你在网上购物来说，HTTP协议是指的那个快递单，你寄件的时候填的单子就像是发了一个HTTP请求，等货物运到地方了，快递员会根据你发的请求把货物送给相应的收货人。而TCP协议就是中间运货的那个大货车，也可能是火车或者飞机，但不管是什么，它是负责运输的，因此必须要有路，不管是地上还是天上。那么这个路就是所谓的TCP连接，也就是一个双向的数据通道。

　　因此，LZ现在甚至觉得，“HTTP连接”这个词就不应该出现，它只是一个应用层的协议，根本就没有所谓的连接这一说，就像FTP也是应用层的协议，但是你有听说过FTP连接吗？（恩，好像是听过，-_-，但你现在知道了，其实所谓的FTP连接，严格来说，依旧是TCP连接）

　　实际上，说HTTP请求和HTTP响应会更准确一些，而HTTP请求和HTTP响应，都是通过TCP连接这个通道来回传输的。

　　不管怎么说，一定要务必记住，长连接是指的TCP连接，而不是HTTP连接。

　　
### 一个疑问

　　

　　之前LZ一直对一件事有些模糊不清，首先是怎么样就算是把HTTP变成长连接了，是不是只要设置Connection为keep-alive就算是了？

　　如果是的话，那都说HTTP1.1默认是长连接，而观察我们平时开发的Web应用的HTTP头部，Connection也确实是keep-alive，那就是说我们大部分都是用的长连接，但是长连接不是一般用于交互比较频繁的应用吗？像我们这种普通的Web应用，比如博客园这种，或者我的个人博客这种，长连接有什么用？

　　如果有用那用处到底是什么，我们又不是客户端与服务器交互频繁的那种应用（毕竟你打开网页肯定要半天才打开另外一个吧），如果没用的话，那到底应不应该把Connection为keep-alive这个header值给改掉，从而改成短连接？

　　这个疑问，在LZ明白了长连接其实是指的TCP连接之后，基本上就明白了。而这个疑问，也正是LZ在“以前的误解”那一段所提到的，那个因为误解导致LZ一直搞不明白的问题。

　　为什么解决了上面那个误解之后，前面所说的这些疑问LZ都明白了？

　　因为长连接意味着连接会被复用，毕竟一直保持着连接不就是为了重复使用嘛。但如果长连接是指的HTTP的话，那就是说HTTP连接可以被重复利用，这个话听起来就感觉很别扭。之所以觉得别扭，其实就是LZ的一种直觉，没什么理论依据。而这种别扭的根源就在于，之前一直没有融会贯通的感觉，所以总感觉缺少点什么。不过这点疑惑，并没有影响LZ的工作，因此也就没深究过。

　　但现在好了，明白了长连接实际上是指的TCP连接，LZ瞬间自己就想明白了上面的那些问题。

　　第一个问题是，是不是只要设置Connection为keep-alive就算是长连接了？

　　当然是的，但要服务器和客户端都设置。

　　第二个问题是，我们平时用的是不是长连接？

　　这个也毫无疑问，当然是的。（现在用的基本上都是HTTP1.1协议，你观察一下就会发现，基本上Connection都是keep-alive。而且HTTP协议文档上也提到了，HTTP1.1默认是长连接，也就是默认Connection的值就是keep-alive）

　　第三个问题，也是LZ之前最想不明白的问题，那就是我们这种普通的Web应用（比如博客园，我的个人博客这种）用长连接有啥好处？需不需要关掉长连接而使用短连接？

　　这个问题LZ现在终于明白了，问题的答案是好处还是有的。

　　好处是什么？

　　首先，刚才已经说了，长连接是为了复用，这个在之前LZ就明白。那既然长连接是指的TCP连接，也就是说复用的是TCP连接。那这就很好解释了，也就是说，长连接情况下，多个HTTP请求可以复用同一个TCP连接，这就节省了很多TCP连接建立和断开的消耗。

　　比如你请求了博客园的一个网页，这个网页里肯定还包含了CSS、JS等等一系列资源，如果你是短连接（也就是每次都要重新建立TCP连接）的话，那你每打开一个网页，基本要建立几个甚至几十个TCP连接，这浪费了多少资源就不用LZ去说了吧。

　　但如果是长连接的话，那么这么多次HTTP请求（这些请求包括请求网页内容，CSS文件，JS文件，图片等等），其实使用的都是一个TCP连接，很显然是可以节省很多消耗的。

　　这样一解释，就很明白了，不知道大家看了这些解释感觉如何，反正LZ在自己想明白以后，有种豁然开朗的感觉。

　　另外，最后关于长连接还要多提一句，那就是，长连接并不是永久连接的。如果一段时间内（具体的时间长短，是可以在header当中进行设置的，也就是所谓的超时时间），这个连接没有HTTP请求发出的话，那么这个长连接就会被断掉。

　　这一点其实很容易理解，否则的话，TCP连接将会越来越多，直到把服务器的TCP连接数量撑爆到上限为止。现在想想，对于服务器来说，服务器里的这些个长连接其实很有数据库连接池的味道，大家都是为了节省连接重复利用嘛，对不对？

　　
长轮询和短轮询

　　

　　前面基本上LZ已经把长短连接说的差不多了，接下来说说长短轮询，今天也正是为了研究长短轮询，LZ才顺便研究了下长短连接这回事。

　　短轮询相信大家都不难理解，比如你现在要做一个电商中商品详情的页面，这个详情界面中有一个字段是库存量（相信这个大家都不陌生，随便打开淘宝或者京东都能找到这种页面）。而这个库存量需要实时的变化，保持和服务器里实际的库存一致。

　　这个时候，你会怎么做？

　　最简单的一种方式，就是你用JS写个死循环，不停的去请求服务器中的库存量是多少，然后刷新到这个页面当中，这其实就是所谓的短轮询。

　　这种方式有明显的坏处，那就是你很浪费服务器和客户端的资源。客户端还好点，现在PC机配置高了，你不停的请求还不至于把用户的电脑整死，但是服务器就很蛋疼了。如果有1000个人停留在某个商品详情页面，那就是说会有1000个客户端不停的去请求服务器获取库存量，这显然是不合理的。

　　那怎么办呢？

　　长轮询这个时候就出现了，其实长轮询和短轮询最大的区别是，短轮询去服务端查询的时候，不管库存量有没有变化，服务器就立即返回结果了。而长轮询则不是，在长轮询中，服务器如果检测到库存量没有变化的话，将会把当前请求挂起一段时间（这个时间也叫作超时时间，一般是几十秒）。在这个时间里，服务器会去检测库存量有没有变化，检测到变化就立即返回，否则就一直等到超时为止。

　　而对于客户端来说，不管是长轮询还是短轮询，客户端的动作都是一样的，就是不停的去请求，不同的是服务端，短轮询情况下服务端每次请求不管有没有变化都会立即返回结果，而长轮询情况下，如果有变化才会立即返回结果，而没有变化的话，则不会再立即给客户端返回结果，直到超时为止。　

　　这样一来，客户端的请求次数将会大量减少（这也就意味着节省了网络流量，毕竟每次发请求，都会占用客户端的上传流量和服务端的下载流量），而且也解决了服务端一直疲于接受请求的窘境。

　　但是长轮询也是有坏处的，因为把请求挂起同样会导致资源的浪费，假设还是1000个人停留在某个商品详情页面，那就很有可能服务器这边挂着1000个线程，在不停检测库存量，这依然是有问题的。

　　因此，从这里可以看出，不管是长轮询还是短轮询，都不太适用于客户端数量太多的情况，因为每个服务器所能承载的TCP连接数是有上限的，这种轮询很容易把连接数顶满。之所以举这个例子，只是因为大家肯定都会网购，所以这个例子比较通俗一点。

　　哪怕轮询解决不了获取库存这个问题，但只要大家明白了长短轮询的区别，这就足够了。实际上，据LZ自己平日里购物的观察，那个库存量应该是不会变的，这个例子纯属LZ个人的意淫，-_-。

　　
长短轮询和长短连接的区别

　　

　　这里简单说一下它们的区别，LZ这里只说最根本的区别。

　　第一个区别是决定的方式，一个TCP连接是否为长连接，是通过设置HTTP的Connection Header来决定的，而且是需要两边都设置才有效。而一种轮询方式是否为长轮询，是根据服务端的处理方式来决定的，与客户端没有关系。

　　第二个区别就是实现的方式，连接的长短是通过协议来规定和实现的。而轮询的长短，是服务器通过编程的方式手动挂起请求来实现的。