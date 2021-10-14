### 前言

---

记录一下自己使用的 [Chrome 插件](https://chrome.google.com/webstore/category/extensions) 。

注：下面的插件链接需要 **科学上网** ，可以自行搜索插件名安装。

![cover](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Chrome%20%E6%8F%92%E4%BB%B6%E6%95%B4%E7%90%86/imgs/cover.png)

### 工具类

---

- [OneTab](https://chrome.google.com/webstore/detail/onetab/chphlpgkkbolifaimnlloiipkdnihall)

  可以理解是一个 **临时的收藏夹** ，**一键保存** 当前窗口的标签页，用法很简单，自行体会。

  找资料的过程中经常会遇到一些副产物 ( 有用的但是与当前目的相关性不大的资料 )，由于搜索引擎的尿性 ( 同样的关键字之后再也搜不出之前的结果 ) 就会把页面一直开着 ( 目前并没有时间去细看，也不会去收藏 ) ，久而久之开着上百个标签页就是很常见的事，这是很费内存的 ( **几个 G** ) ，有了这个插件就可以节省很多内存，同时浏览器也清净了不少。

- [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)

  油猴脚本。只要会前端就可以自行编写用户脚本对浏览的网页做修改 ( 美化、去广告等等 ) ，每个脚本都可以当作是轻量级的 **插件** 。下文会推荐一些我觉得实用的脚本。

- [Vimium](https://chrome.google.com/webstore/detail/vimium/dbepggeogbaibhgnhhndojpepiihcmeb)

  使用快捷键控制浏览器。由于我习惯使用触摸板，只用到 **快速关闭/还原标签页** 的功能，其他功能没有深入使用过。

- [有道词典 Chrome 划词插件](https://chrome.google.com/webstore/detail/%E6%9C%89%E9%81%93%E8%AF%8D%E5%85%B8chrome%E5%88%92%E8%AF%8D%E6%8F%92%E4%BB%B6/eopjamdnofihpioajgfdikhhbobonhbb)

  用过最好用的一款 **划词翻译** 插件。

- [Awesome Screenshot: Screen Video Recorder](https://chrome.google.com/webstore/detail/awesome-screenshot-screen/nlipoenfbbikpbjkfpfillcgkoblgpmj)

  网页截图: 注释&录屏 ( 不仅是浏览器截图 ) 。

  顺带分享下 **Chrome** 原生支持的 [截图方法](https://sspai.com/post/42193) 。

### 开发类

---

- [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)

  **React** 项目开发工具，可以看原始的 **React Element 树** ，类似于 **DOM 树**。

- [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)

  如果在项目中使用 [Redux](http://cn.redux.js.org/index.html) ，那么这个插件就很有用了，可以查看已执行的 **action** 和 **state** 值，这样就可以快速定位故障点而不用到处打印 **log** 了。具体用法见 [插件官方文档](https://github.com/zalmoxisus/redux-devtools-extension) 。

### 阅读类

---

- [Octotree](https://chrome.google.com/webstore/detail/octotree/bkhaagjahfmjljalopjnoealnfndnagc)

  为 **GitHub 仓库** 生成目录，可以快速定位文件而不用一级一级菜单盲点了。

  类似的插件有 [Sourcegraph](https://chrome.google.com/webstore/detail/sourcegraph/dgjhfomjieaadpoljlnidmbgkdffpack) 。

- [简悦 - SimpRead](https://chrome.google.com/webstore/detail/simpread-reader-view/ijllcpnolfcooahcekpamkbidhejabll)

  对浏览的网页提供阅读模式，可以更专注于内容的阅读。

- [Smart TOC](https://chrome.google.com/webstore/detail/smart-toc/lifgeihcfpkmmlfjbailfpfhbahhibba)

  为网页生成目录菜单，适合长页面的跳转。

### 广告类

---

使用过几款所谓的去广告插件，但是都没什么用，所以还是跑题推荐下 [ADSafe](http://www.ad-safe.com) ，官网下载的版本 ( `5.3.629.6500` ) 是没有用的。可以下载 [历史版本](http://pan.baidu.com/s/1pK7yvEj) ，亲测 `5.3.209.1800` 还是可以用的。

### 油猴脚本

---

可以在这个 [网站](https://greasyfork.org) 搜索自己需要的脚本。

下面是我用过的脚本：

- [百度网盘万能钥匙](https://greasyfork.org/zh-CN/scripts/370811-%E5%B7%B2%E6%8C%81%E7%BB%AD%E6%9B%B4%E6%96%B0%E4%B8%80%E5%B9%B4-%E6%94%BE%E5%BF%83%E4%BD%BF%E7%94%A8-%E7%BD%91%E7%9B%98%E4%B8%87%E8%83%BD%E9%92%A5%E5%8C%99-%E7%BD%91%E7%9B%98%E4%B8%8B%E8%BD%BD%E5%8A%A9%E6%89%8B-%E8%87%AA%E5%8A%A8%E6%9F%A5%E8%AF%A2%E7%99%BE%E5%BA%A6%E7%BD%91%E7%9B%98%E5%88%86%E4%BA%AB%E9%93%BE%E6%8E%A5%E7%9A%84%E6%8F%90%E5%8F%96%E7%A0%81-%E5%85%A8%E7%BD%91vip%E8%A7%86%E9%A2%91%E8%A7%A3%E6%9E%90%E6%92%AD%E6%94%BE-%E5%85%A8%E7%BD%91%E4%BB%98%E8%B4%B9%E9%9F%B3%E4%B9%90%E5%85%8D%E8%B4%B9%E4%B8%8B%E8%BD%BD-%E6%B7%98%E5%AE%9D-%E6%8B%BC%E5%A4%9A%E5%A4%9A%E5%A4%A7%E9%A2%9D%E8%B4%AD%E7%89%A9%E4%BC%98%E6%83%A0%E5%88%B8%E9%A2%86%E5%8F%96-%E6%94%AF%E6%8C%81%E5%8E%86%E5%8F%B2%E4%BB%B7%E6%A0%BC%E6%9F%A5%E8%AF%A2)

- [百度网盘直链下载助手](https://www.baiduyun.wiki/install.html)

  ~~需要登录百度账号~~

- [简书去广告，剪贴板尾部优化、去除无意义推荐](https://greasyfork.org/zh-CN/scripts/375311-%E7%AE%80%E4%B9%A6%E5%8E%BB%E5%B9%BF%E5%91%8A-%E5%89%AA%E8%B4%B4%E6%9D%BF%E5%B0%BE%E9%83%A8%E4%BC%98%E5%8C%96-%E5%8E%BB%E9%99%A4%E6%97%A0%E6%84%8F%E4%B9%89%E6%8E%A8%E8%8D%90)

- [知乎、简书、csdn、实验楼剪切板消毒](https://greasyfork.org/zh-CN/scripts/367724-%E7%9F%A5%E4%B9%8E-%E7%AE%80%E4%B9%A6-csdn-%E5%AE%9E%E9%AA%8C%E6%A5%BC%E5%89%AA%E5%88%87%E6%9D%BF%E6%B6%88%E6%AF%92)

- [CSDN 自动展开+去广告+净化剪贴板+免登陆](https://greasyfork.org/zh-CN/scripts/372452-csdn%E8%87%AA%E5%8A%A8%E5%B1%95%E5%BC%80-%E5%8E%BB%E5%B9%BF%E5%91%8A-%E5%87%80%E5%8C%96%E5%89%AA%E8%B4%B4%E6%9D%BF-%E5%85%8D%E7%99%BB%E9%99%86)

- [目录树导航](https://greasyfork.org/zh-CN/scripts/34479-%E7%9B%AE%E5%BD%95%E6%A0%91%E5%AF%BC%E8%88%AA)

- [简书外链去除重定向](https://greasyfork.org/zh-CN/scripts/377099-%E7%AE%80%E4%B9%A6%E5%A4%96%E9%93%BE%E5%8E%BB%E9%99%A4%E9%87%8D%E5%AE%9A%E5%90%91)

- [简书导出文章](https://greasyfork.org/zh-CN/scripts/371815-%E7%AE%80%E4%B9%A6%E5%AF%BC%E5%87%BA%E6%96%87%E7%AB%A0)

- [全网 VIP 会员视频免费看](https://greasyfork.org/zh-CN/scripts/34952-%E5%85%A8%E7%BD%91vip%E4%BC%9A%E5%91%98%E8%A7%86%E9%A2%91%E5%85%8D%E8%B4%B9%E7%9C%8B-2019%E5%B9%B45%E6%9C%8824%E6%97%A5%E6%9B%B4%E6%96%B0-%E6%94%AF%E6%8C%81%E7%88%B1%E5%A5%87%E8%89%BA%E6%AD%A3%E7%A1%AE%E9%80%89%E9%9B%86)

---

#### 转载请注明出处：[https://www.jianshu.com/p/6fd2c88560a8](https://www.jianshu.com/p/6fd2c88560a8)
