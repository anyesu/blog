### 前言

---

工欲善其事必先利其器，用 **IntelliJ IDEA** 开发几年了，它带来工作效率上的提升是很显著的。本文分享一些好用的插件和经验。

![cover](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/IntelliJ%20IDEA%20%E6%8F%92%E4%BB%B6%E5%92%8C%E7%BB%8F%E9%AA%8C%E5%88%86%E4%BA%AB/imgs/cover.png)

### 插件

---

- [activate-power-mode](https://plugins.jetbrains.com/plugin/8330-activate-power-mode)

  酷炫的代码编辑效果。玩玩就行了。

- [Alibaba Java Coding Guidelines](https://plugins.jetbrains.com/plugin/10046-alibaba-java-coding-guidelines)

  基于 [Java 开发手册](https://github.com/alibaba/p3c) 的 **Java 代码规约扫描插件** 。对于不符合规范的代码会提示 **推荐用法** 或 **快捷修复** ，有代码洁癖的小伙伴赶紧去用吧。

- [BashSupport](https://plugins.jetbrains.com/plugin/4230-bashsupport)

  提供对 **Bash** 语言的支持，支持运行配置、语法高亮、改名重构、查看注释文档、语法检查、命令提示，最主要还是可以做 **代码跳转**。

- [Battery Status](https://plugins.jetbrains.com/plugin/12321-battery-status)

  在 **IDEA 状态栏** 显示 **电池状态** 。

- [CodeGlance](https://plugins.jetbrains.com/plugin/7275-codeglance)

  在滚动条边上显示代码文件内容缩略图，可以快速定位到指定位置。玩玩就行了。

- [CPU Usage Indicator](https://plugins.jetbrains.com/plugin/8580-cpu-usage-indicator)

  在 **IDEA 状态栏** 显示 **CPU 使用率** 。

- [element](https://plugins.jetbrains.com/plugin/10524-element)

  提供对 [饿了么 Element UI 组件库](https://element.eleme.cn/) 的支持。前端开发有用。

- [.env files support](https://plugins.jetbrains.com/plugin/9525--env-files-support)

  提供对 **.env** 文件的支持。

- [EJS](https://plugins.jetbrains.com/plugin/7296-ejs)

  提供对 [EJS 模板引擎](https://ejs.bootcss.com/) 的支持。前端开发有用。

- [ESLint](https://plugins.jetbrains.com/plugin/7494-eslint)

  提供 [ESLint](https://cn.eslint.org/) 的支持，用于前端代码的检查和快速修复。前端开发有用。

- [File Watchers](https://plugins.jetbrains.com/plugin/7177-file-watchers)

  用于监听文件变化，可以用于 [前端代码保存的时候自动格式化](https://prettier.io/docs/en/webstorm.html#running-prettier-on-save-using-file-watcher) 。

- [Grep Console](https://plugins.jetbrains.com/plugin/7125-grep-console)

  主要用于日志输出颜色控制 ( 但是 error 日志打印只有首行有颜色 ) 。

  配色清单 ( 只设置前景色，不设置背景色 ) ：

  | 日志级别      | 颜色                                |
  | ------------- | ----------------------------------- |
  | .\*VERBOSE.\* | <font color="#BBBBBB">BBBBBB</font> |
  | .\*DEBUG.\*   | <font color="#0070BB">0070BB</font> |
  | .\*INFO.\*    | <font color="#48BB31">48BB31</font> |
  | .\*WARN.\*    | <font color="#BBBB23">BBBB23</font> |
  | .\*ERROR.\*   | <font color="#FF6464">FF6464</font> |
  | .\*ASSERT.\*  | <font color="#8F0005">8F0005</font> |

- [.ignore](https://plugins.jetbrains.com/plugin/7495--ignore)

  提供对 **.ignore** 文件的支持。

- [JB SDK Bintray Downloader](https://plugins.jetbrains.com/plugin/9195-jb-sdk-bintray-downloader)

  用于切换 **IDEA** 自带的 **JVM** 。

- [JRebel for IntelliJ](https://plugins.jetbrains.com/plugin/4441-jrebel-for-intellij)

  **Java 热部署插件** ，大部分场景下修改了代码只要 `Ctrl + B` 编译下代码就即时生效了，无需频繁重启项目。比起 **SpringBoot** 的 **devtools** 好用多了。**另外，不建议开启自动编译，很消耗性能。**

  [安装教程](http://wiki.jikexueyuan.com/project/intellij-idea-tutorial/jrebel-setup.html) [破解教程](https://www.hexianwei.com/2019/07/10/jrebel%E6%BF%80%E6%B4%BB/)

- [Lombok](https://plugins.jetbrains.com/plugin/6317-lombok)

  提供对 [Lombok](https://projectlombok.org/features/all) 的支持。

- [Markdown support](https://plugins.jetbrains.com/plugin/7793-markdown-support)

  默认集成的 **Markdown** 插件，除了不支持 **emoji** 表情，其他都够用了。

  **win10** 下高分辨率设置了 **显示缩放** 会导致 **Markdown 的预览效果页面** 文字很模糊。

  解决办法：使用 **JB SDK Bintray Downloader** 插件升级到最新的 **JB SDK** ( [参考](https://blog.csdn.net/zdxxinlang/article/details/78391060) ) ，或者使用自己下载的 **JDK** ( [参考](https://blog.csdn.net/zaemyn2015/article/details/84584458) ) 。

- [Material Theme UI](https://plugins.jetbrains.com/plugin/8006-material-theme-ui)

  主题插件，用于配置 **IDEA** 的 **UI 组件** 的显示效果。刚开始用可能会比较刺眼，一个月使用下来已经习惯了。

  我的配置方案：

  ```
  File -> Settings -> Appearance & Behavior -> Material Theme
  ( 当然也可以直接点击状态栏的小图标直接进入 )

  基础模版选择 Material Oceanic

  Compact: 勾选 StatusBar / Table Cells / Dropdown Lists / Menus
  Project View: Sidebar Height 设置为 22
  Components: 取消勾选 Uppercase buttons

  另外编辑区的背景色改成和主体背景色一样的 #263238
  ```

- [Maven Helper](https://plugins.jetbrains.com/plugin/7179-maven-helper)

  用于 **Maven** 依赖冲突检查 ( [参考](https://blog.csdn.net/keketrtr/article/details/52513671) ) 。

- [MyBatis plugin](https://plugins.jetbrains.com/plugin/7293-mybatis-plugin)

  提供对 **MyBatis** 的支持，支持 **Mapper.java** 和 **Mapper.xml** 之间相互的代码跳转，根据 **Mapper.java** 自动生成对应的 **Mapper.xml** 和 **SQL** 等功能。这个插件是收费的，破解方法参考 [这里](https://github.com/myoss/profile/blob/master/idea/plugin/MybatisPlugin/Mybatis-Plugin%E6%8F%92%E4%BB%B6%E5%AD%A6%E4%B9%A0%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95.txt) ，破解版虽然能用，但是启动的时候还是会花几十秒联网校验，导致 **IDEA** 启动很慢。

- [MyBatisX](https://plugins.jetbrains.com/plugin/10119-mybatisx)

  **MyBatis plugin** 的免费替代品，功能相对少一点。

- [MyBatis Log Plugin](https://plugins.jetbrains.com/plugin/10065-mybatis-log-plugin)

  用于将 **MyBatis** 输出的日志转为实际执行的具体 **SQL** 。

- [nginx Support](https://plugins.jetbrains.com/plugin/4415-nginx-support)

  提供对 **Nginx** 配置文件的支持，支持 **语法高亮** 和 **语法提示** 。

- [Prettier](https://plugins.jetbrains.com/plugin/10456-prettier)

  提供对 **Prettier** 的支持 ( [参考](http://web.jobbole.com/94786/) ) 。需要自己设置格式化快捷键或者配合上面的 **File Watchers** 使用。前端开发有用。

- [RestfulToolkit](https://plugins.jetbrains.com/plugin/10292-restfultoolkit)

  通过快捷键 `Ctrl + \` 快速检索项目中定义的 **@RequestMapping** ，支持模糊搜索。

- [String Manipulation](https://plugins.jetbrains.com/plugin/2162-string-manipulation)

  字符串格式转换工具，比如大小写，驼峰与下划线互转，自己试试就知道了。快捷键 `Alt + M` 。

- [Translation](https://plugins.jetbrains.com/plugin/8579-translation)

  翻译插件，对于英语渣渣来说很有用，看源码不用再切出去百度了。我设置的翻译快捷键是 `Alt + Z` 。

- [UpperLowerCapitalize](https://plugins.jetbrains.com/plugin/183-upperlowercapitalize)

  大小写切换插件， `Alt + P` 切换到全大写， `Alt + L` 切换到全小写。

- [Vue.js](https://plugins.jetbrains.com/plugin/9442-vue-js)

  提供对 [Vue.js](https://vuejs.org/) 的支持。前端开发有用。

- [who did it](https://plugins.jetbrains.com/plugin/11269-who-did-it)

  目录树文件名后面像 **Eclipse** 一样显示 **版本控制 ( Git / SVN )** 的最后修改人/时间，没必要还是不要开了，有点卡。

把 [插件市场](https://plugins.jetbrains.com/search?pr=idea&pr_productId=idea&orderBy=downloads&correctionAllowed=false&offset=0&max=10) 3000+ 的插件都大概浏览了一遍，稍微实用点的都列在上面了 ( **按名称排序** ) ，剩下还有一些 **其他语言** 、**框架** 相关的插件自己去搜一下吧。

### 使用经验

---

- **关于激活**

  ~~注册码点击 [这里](http://idea.lanyus.com/) 获取~~ ( 目前已暂停提供激活码 ) ，需要把下面的配置加入到 **hosts** 文件中。有条件的还是支持下正版吧。

  ```
  0.0.0.0 account.jetbrains.com
  # 下面这个是官网，2019.1版本起，IDEA启动的时候会从官网校验注册码，所以需要屏蔽，需要访问官网时再注释掉配置
  0.0.0.0 www.jetbrains.com
  ```

- **关于升级**

  建议一直保持最新版，官网的 [更新日志](https://www.jetbrains.com/idea/whatsnew/) 写的很详细了，可以好好阅读下。如果不放心，可以迟几小个版本。更新前最好做好配置文件的备份 ( **Windows** 在 `%HOMEPATH%` 目录下，比如 `.IntelliJIdea2019.1` ) 。

- **全局检索**

  `2018.3` 版本起，双击 `shift` 即可调出全新的 **Search Everywhere** ，合并了原先 **类、文件、符号、Action** 的搜索。

- **运行一切**

  `2018.3` 版本起，双击 `Ctrl` 调出窗口，可以执行 **运行配置** 或者 **终端命令**。在这个窗口下按 `shift` 切换 `run/debug` 模式。

- **关于配色方案**

  我的 **配色方案** 用了几年了，还不错，不过找不到原始地址了。分享一个 [项目](http://www.easycolor.cc/) ，自己选一个合适的 **配色方案** 吧，不刺眼不太暗的，眼睛看着舒服点的比较好。

- **关于快捷键**

  File -> Settings -> Keymap，我更习惯 **eclipse** 风格的快捷键。

- **启动时不打开工程**

  File -> Settings -> Appearance & Behavior -> System Settings -> Startup/Shutdown 标签项 -> 去掉 Reopen last project on startup 。

- **备份个性化设置**

  File -> Export Settings 。

- **Project 目录隐藏无关的配置文件**

  File -> Settings -> Editor -> File Types -> Ignore files and folders 追加下面内容 ( 注意分号隔开 ) 。

  ```
  *.log;*.iml;.idea;.classpath;.project;.settings;
  ```

- **打开之后自动启动项目**

  File -> Settings -> Tools -> Startup Tasks 自行添加运行配置。

- **Version Control**

  集成各种 **版本控制** 工具的客户端，也是我用过 **Windows** 平台下最好用的 **Git** 客户端 ，没有之一。

- **Decompiler**

  反编译 **class** 专用，谁用谁知道。要是整个 **Jar 包** 反编译还是用 [JD-GUI](https://github.com/java-decompiler/jd-gui) 吧。

- **Terminal**

  轻量好用的终端工具，不仅支持本地命令执行，还能连接远程主机，可以 `Ctrl + C/V` 二连很重要。

- 搭配 **Docker** 使用

  详见 [IntelliJ IDEA 使用 Docker 远程部署](https://www.jianshu.com/p/410ea6e0b13a) 。

- [不识别文件类型的解决方案](https://blog.csdn.net/aaashen/article/details/46740817)

- [IntelliJ IDEA 如何查看或显示实时内存](https://jingyan.baidu.com/article/f96699bb040a63894e3c1bde.html)

- [配置 Tomcat 远程调试](https://blog.csdn.net/mingjie1212/article/details/52281847)

- [IDEA 环境下设置 jvm 默认编码](https://blog.csdn.net/u014424628/article/details/49429393)

- [关于 IntelliJ IDEA 文档无法编辑的解决办法](https://www.cnblogs.com/lfm601508022/p/6529118.html)

- [支持 ES6 语法](https://www.cnblogs.com/wenston/p/5286150.html)

- [idea 下字符串的长度太大](https://blog.csdn.net/lilovfly/article/details/77659541)

- [设置忽略部分类编译错误](https://blog.csdn.net/zhyh1986/article/details/46469173)

- [版本控制下 修改文件后，父文件夹也标注修改](https://blog.csdn.net/wangjun5159/article/details/71250367) ( 项目级配置 )

- [行注释设置 ( 不显示在行首 )](https://blog.csdn.net/xu_joy/article/details/54139070)

  可以勾上 `Add a space at comment start`

- [使用 Docker](https://blog.csdn.net/chenhaifeng2016/article/details/54315472)

- [使用自带插件显示 java 类的字节码](https://jingyan.baidu.com/article/154b463108b81928cb8f417b.html)

- [自动删除类中无用的 import 包](https://blog.csdn.net/huanxianglove/article/details/80743376)

- [文件代码模板的使用](https://blog.csdn.net/cgl125167016/article/details/78754246)

- [文件模板变量](https://blog.csdn.net/yuanhang1996/article/details/86030070)

- [idea 查看一个类的所有子类以及子类的子类并以层级关系显示](https://blog.csdn.net/qq_35170213/article/details/82953837)

- [IntelliJ IDEA 中如何设置同时打开多个文件且分行显示 --- 即如何设置 tabs](https://blog.csdn.net/qq_27093465/article/details/52537364)

- [使用 IntelliJ IDEA 查看类的继承关系图形](https://www.cnblogs.com/deng-cc/p/6927447.html)

- [2018.3 更新内容](https://www.itcodemonkey.com/article/10886.html)

- [IntelliJ IDEA 使用教程（总目录篇）](https://blog.csdn.net/qq_27093465/article/details/77449117)

---

#### 转载请注明出处：[https://www.jianshu.com/p/e3f83c4c2d7e](https://www.jianshu.com/p/e3f83c4c2d7e)
