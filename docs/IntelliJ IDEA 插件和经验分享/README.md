### 前言

---

工欲善其事必先利其器，用 **IntelliJ IDEA** 开发几年了，它带来工作效率上的提升是很显著的。本文分享一些好用的插件和经验。

![cover](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/IntelliJ%20IDEA%20插件和经验分享/imgs/cover.png)

### 插件

---

#### 界面

- [activate-power-mode](https://plugins.jetbrains.com/plugin/8330-activate-power-mode)

  酷炫的代码编辑效果，玩玩就行了。

  同类产品： [activate-power-mode-x](https://plugins.jetbrains.com/plugin/14000-activate-power-mode-x) 、 [Power Mode II](https://plugins.jetbrains.com/plugin/8251-power-mode-ii) 、 [Power Mode - Zeranthium](https://plugins.jetbrains.com/plugin/13176-power-mode--zeranthium) 。

  ![activate-power-mode](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/IntelliJ%20IDEA%20插件和经验分享/imgs/activate_power_mode.gif)

- [Archive Browser](https://plugins.jetbrains.com/plugin/9491-archive-browser)

  直接在项目视图中展开压缩包，无需手动用压缩软件打开看，支持大部分压缩格式。

  ![Archive Browser](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/IntelliJ%20IDEA%20插件和经验分享/imgs/archive_browser.png)

- [Atom Material Icons](https://plugins.jetbrains.com/plugin/10044-atom-material-icons)

  从 **Material Theme UI** 插件中分离出来的图标插件。

  > 缺点：不能单独禁用某一类图标，和其他图标插件会产生冲突。

  ![Atom Material Icons](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/IntelliJ%20IDEA%20插件和经验分享/imgs/atom_material_icons.png)

- [Awesome Console](https://plugins.jetbrains.com/plugin/7677-awesome-console)

  使控制台和终端输出的文件名和链接可以跳转。

  > 不支持反斜杠路径，文件新创建后需要重启 **IDE** 才能高亮。

  ![Awesome Console](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/IntelliJ%20IDEA%20插件和经验分享/imgs/awesome_console.png)

- [Background Image Plus](https://plugins.jetbrains.com/plugin/17512-background-image-plus)

  众多 [背景图插件](https://plugins.jetbrains.com/search?orderBy=downloads&products=idea&search=Background%20Image) 中，目前这个插件算是最好用的，支持随机、定时、透明度。

  ![Background Image Plus](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/IntelliJ%20IDEA%20插件和经验分享/imgs/background_image_plus.jpg)

  > 新版 **IDE** 已支持右键图片设置为背景（ **Set Background Image** ），可以为其添加快捷键。

- [Base64 image encoder](https://plugins.jetbrains.com/plugin/8263-base64-image-encoder)

  图片一键转为 **Base64 DataUrl** ，小图可用，稍大点（ **几百 K** ）就会把整个 **IDE** 卡住。

  ![Base64 image encoder](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/IntelliJ%20IDEA%20插件和经验分享/imgs/base64_image_encoder.png)

- [Chinese (Simplified) Language Pack / 中文语言包](https://plugins.jetbrains.com/plugin/13710-chinese-simplified-language-pack----)

  官方提供的汉化支持，看个人喜好决定是否汉化。

- [CodeGlance](https://plugins.jetbrains.com/plugin/7275-codeglance)

  在滚动条边上显示代码文件内容缩略图，可以快速定位到指定位置。玩玩就行了。

  ![CodeGlance](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/IntelliJ%20IDEA%20插件和经验分享/imgs/codeglance.jpg)

- [Color Highlighter](https://plugins.jetbrains.com/plugin/13309-color-highlighter)

  颜色代码直接渲染为背景色，更直观。

  ![Color Highlighter](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/IntelliJ%20IDEA%20插件和经验分享/imgs/color_highlighter.png)

- [Extra Icons](https://plugins.jetbrains.com/plugin/11058-extra-icons)

  也是一个图标插件。

  ![Extra Icons](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/IntelliJ%20IDEA%20插件和经验分享/imgs/extra_icons.png)

- [GlassCode (For Windows)](https://plugins.jetbrains.com/plugin/15868-glasscode-for-windows-)

  **IDE** 背景透明化，同时保持代码清晰明亮。一般用不上。

  ![GlassCode (For Windows)](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/IntelliJ%20IDEA%20插件和经验分享/imgs/glasscode_for_windows.jpg)

- [Grep Console](https://plugins.jetbrains.com/plugin/7125-grep-console)

  主要用于日志输出颜色控制（ 但是 **error** 日志打印只有首行有颜色 ）。

  ![Grep Console](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/IntelliJ%20IDEA%20插件和经验分享/imgs/grep_console.png)

  配色清单：

  | 日志级别      | 前景色                              |
  | ------------- | ----------------------------------- |
  | .\*VERBOSE.\* | <font color="#BBBBBB">BBBBBB</font> |
  | .\*DEBUG.\*   | <font color="#0070BB">0070BB</font> |
  | .\*INFO.\*    | <font color="#48BB31">48BB31</font> |
  | .\*WARN.\*    | <font color="#BBBB23">BBBB23</font> |
  | .\*ERROR.\*   | <font color="#FF6464">FF6464</font> |
  | .\*ASSERT.\*  | <font color="#8F0005">8F0005</font> |

- [Icon Viewer 2](https://plugins.jetbrains.com/plugin/13995-icon-viewer-2)

  项目视图中图片文件直接在图标上预览，无需打开文件。

  > 如果启用了 **Atom Material Icons** 插件，则需要取消勾选 `Enable File Icons` 。
  >
  > 如果启用了 **Extra Icons** 插件，则需要禁用 **SVG** 文件的图标。

  ![Icon Viewer 2](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/IntelliJ%20IDEA%20插件和经验分享/imgs/icon_viewer_2.png)

- [Indent Rainbow](https://plugins.jetbrains.com/plugin/13308-indent-rainbow)

  给代码缩进着色，可以区分出错误的缩进。（ 看多了还是有点刺眼 ）

  ![Indent Rainbow](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/IntelliJ%20IDEA%20插件和经验分享/imgs/indent_rainbow.png)

- [Material Theme UI](https://plugins.jetbrains.com/plugin/8006-material-theme-ui)

  主题插件，用于配置 **IDEA** 的 **UI 组件** 的显示效果。刚开始用可能会比较刺眼，一个月使用下来就习惯了。

  ![Material Theme UI](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/IntelliJ%20IDEA%20插件和经验分享/imgs/material_theme_ui.png)

  我的配置方案：

  > **Settings -> Appearance & Behavior -> Material Theme**

  当然也可以直接点击状态栏的小图标直接进入（ 全局配置 ）。

  | 配置项                            |                                                               |
  | :-------------------------------- | ------------------------------------------------------------- |
  | **Selected Theme （ 基础模版 ）** | **Material Oceanic**                                          |
  | **Compact**                       | 勾选 `StatusBar` / `Table Cells` / `Dropdown Lists` / `Menus` |
  | **Project View**                  | **Sidebar Height** （ 项目视图行高 ）设置为 `22`              |
  | **Components**                    | 取消按钮大写：取消勾选 `Uppercase buttons`                    |
  | **编辑区的背景色**                | 改成和主体背景色一样的 `#263238`                              |

- [Rainbow Brackets](https://plugins.jetbrains.com/plugin/10080-rainbow-brackets)

  彩虹颜色的括号，配对括号相同颜色，防止括号错乱。

  ![Rainbow Brackets](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/IntelliJ%20IDEA%20插件和经验分享/imgs/rainbow_brackets.png)

- [Sexy Editor](https://plugins.jetbrains.com/plugin/1833-sexy-editor)

  可以在编辑器自定义位置显示插图，可以和 **背景图插件** 共存。

  ![Sexy Editor](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/IntelliJ%20IDEA%20插件和经验分享/imgs/sexy_editor.png)

#### Java 开发

- [Alibaba Java Coding Guidelines](https://plugins.jetbrains.com/plugin/10046-alibaba-java-coding-guidelines)

  基于 [阿里巴巴 Java 开发手册](https://github.com/alibaba/p3c) 的 **Java 代码规约扫描插件** 。对于不符合规范的代码会提示 **推荐用法** 或 **快捷修复** ，有代码洁癖的小伙伴赶紧去用吧。

- [Class File Indexer](https://plugins.jetbrains.com/plugin/17358-class-file-indexer)

  为 **class** 文件建立索引， **class** 文件可直接进行代码跳转而无需下载源码。

- [Debugger Enhancer](https://plugins.jetbrains.com/plugin/16187-debugger-enhancer)

  断点增强，可强制方法返回指定的值或者异常。

  ![Debugger Enhancer](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/IntelliJ%20IDEA%20插件和经验分享/imgs/debugger_enhancer.png)

- [Java Visualizer](https://plugins.jetbrains.com/plugin/11512-java-visualizer)

  调试的时候可视化显示调用栈和对象。

  ![Java Visualizer](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/IntelliJ%20IDEA%20插件和经验分享/imgs/java_visualizer.png)

- [jclasslib Bytecode Viewer](https://plugins.jetbrains.com/plugin/9248-jclasslib-bytecode-viewer)

  一个可以查看源码对应字节码的插件（ [参考](https://blog.csdn.net/w605283073/article/details/103209221) ）。

  ![Java Visualizer](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/IntelliJ%20IDEA%20插件和经验分享/imgs/jclasslib_bytecode_viewer.png)

  相关： [一键查看 Java 字节码以及其他类信息](https://www.cnblogs.com/javaguide/p/13810777.html)

- [JRebel and XRebel for IntelliJ](https://plugins.jetbrains.com/plugin/4441-jrebel-and-xrebel-for-intellij)

  **Java 热部署插件** ，大部分场景下修改了代码只要 `Ctrl + B` 编译下代码就即时生效了，无需频繁重启项目。比起 **SpringBoot** 的 **devtools** 好用多了。 **另外，不建议开启自动编译，很消耗性能。**

  [安装教程](http://wiki.jikexueyuan.com/project/intellij-idea-tutorial/jrebel-setup.html) [破解教程](https://www.hexianwei.com/2019/07/10/jrebel%E6%BF%80%E6%B4%BB)

- [Lombok](https://plugins.jetbrains.com/plugin/6317-lombok)

  提供对 [Lombok](https://projectlombok.org/features/all) 的支持。

  > 新版 **IDE** 已内置集成。

- [Maven Helper](https://plugins.jetbrains.com/plugin/7179-maven-helper)

  用于 **Maven** 依赖冲突检查（ [参考](https://segmentfault.com/a/1190000017542396) ）。

  ![Maven Helper](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/IntelliJ%20IDEA%20插件和经验分享/imgs/maven_helper.png)

- [Maven Version in Project View](https://plugins.jetbrains.com/plugin/12399-maven-version-in-project-view)

  在项目视图中直接显示每个 **Maven** 子项目的版本号。

  > 只在项目打开的时候读取，修改后不会实时刷新。

  ![Maven Version in Project View](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/IntelliJ%20IDEA%20插件和经验分享/imgs/maven_version_in_project_view.png)

- [~~MyBatis plugin~~](https://plugins.jetbrains.com/plugin/7293-mybatis-plugin)

  提供对 **MyBatis** 的支持，支持 **Mapper.java** 和 **Mapper.xml** 之间相互的代码跳转，根据 **Mapper.java** 自动生成对应的 **Mapper.xml** 和 **SQL** 等功能。这个插件是收费的，破解方法参考 [这里](https://github.com/myoss/profile/blob/master/idea/plugin/MybatisPlugin/Mybatis-Plugin%E6%8F%92%E4%BB%B6%E5%AD%A6%E4%B9%A0%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95.txt) ，破解版虽然能用，但是启动的时候还是会花几十秒联网校验，导致 **IDEA** 启动很慢。

  > 原插件免费了，新插件迁移到 [MinBatis](https://plugins.jetbrains.com/plugin/13720-minbatis) ，还是因为收费问题被喷得不行。

- [MyBatisCodeHelperPro](https://plugins.jetbrains.com/plugin/9837-mybatiscodehelperpro) （ [功能演示](https://www.bilibili.com/video/av50632948) ）

  应该是目前同类中最强大的一款插件（ 收费 ），提供代码跳转、代码检测、 **SQL** 自动补全、以及非常丰富的代码生成器。

  > 这个 [版本](https://plugins.jetbrains.com/plugin/14522-mybatiscodehelperpro-marketplace-edition-) 可重置试用。
  >
  > 免费版应该够用了，关于代码生成就看个人习惯了，用得不顺手就很鸡肋。

- [MyBatis Log Plugin](https://plugins.jetbrains.com/plugin/13905-mybatis-log-plugin)

  用于将 **MyBatis** 输出的日志转为实际执行的具体 **SQL** 。

  ![MyBatis Log Plugin](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/IntelliJ%20IDEA%20插件和经验分享/imgs/mybatis_log_plugin.gif)

- [MyBatisX](https://plugins.jetbrains.com/plugin/10119-mybatisx)

  **MyBatis plugin** 的免费替代品，功能相对少一点。

  > 可以通过图标识别出哪些 **Mapper** 没有创建对应的 **XML** 。

  ![MyBatisX](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/IntelliJ%20IDEA%20插件和经验分享/imgs/mybatisx.gif)

- [Package Search](https://plugins.jetbrains.com/plugin/12507-package-search)

  官方提供的 **Maven** 和 **Gradle** 依赖版本管理工具（ [参考](https://blog.jetbrains.com/idea/2021/06/intellij-idea-2021-2-eap-2/#package_search_integration) ）。

  > 新版 **IDE** 已内置集成。

  ![Package Search](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/IntelliJ%20IDEA%20插件和经验分享/imgs/package_search.png)

- [Restful Fast Request](https://plugins.jetbrains.com/plugin/16988-restful-fast-request)

  漂亮的接口调试工具。

  ![Restful Fast Request](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/IntelliJ%20IDEA%20插件和经验分享/imgs/restful_fast_request.png)

- [~~RestfulToolkit~~](https://plugins.jetbrains.com/plugin/10292-restfultoolkit)

  通过快捷键 `Ctrl + \` 快速检索项目中定义的 **@RequestMapping** ，支持模糊搜索。

  > 插件作者应该不会再维护了，可以考虑切换到 [RestfulTool](https://plugins.jetbrains.com/plugin/14280-restfultool) 。
  >
  > 另外，此类插件都无法识别子类覆写注解。

  ![RestfulToolkit](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/IntelliJ%20IDEA%20插件和经验分享/imgs/restfultoolkit.png)

- [SequenceDiagram](https://plugins.jetbrains.com/plugin/8286-sequencediagram)

  生成方法的执行时序图。

  ![SequenceDiagram](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/IntelliJ%20IDEA%20插件和经验分享/imgs/sequencediagram.png)

- [Swagger](https://plugins.jetbrains.com/plugin/8347-swagger)

  提供对 [Swagger](https://swagger.io) 的支持。

#### 前端开发

- [EJS](https://plugins.jetbrains.com/plugin/7296-ejs)

  提供对 [EJS 模板引擎](https://ejs.bootcss.com) 的支持。

- [element](https://plugins.jetbrains.com/plugin/10524-element)

  提供对 [饿了么 Element UI 组件库](https://element.eleme.cn) 的支持。

- [ESLint](https://plugins.jetbrains.com/plugin/7494-eslint)

  提供 [ESLint](https://cn.eslint.org) 的支持，用于前端代码的检查和快速修复。

  > 新版 **IDE** 已内置集成。

- [ESLint Restart Service Action](https://plugins.jetbrains.com/plugin/14119-eslint-restart-service-action)

  提供一个按钮用于重启 **ESLint Service** ，调试 **ESLint** 插件代码的时候很有用。

- [GraphQL](https://plugins.jetbrains.com/plugin/8097-graphql)

  提供对 [GraphQL](https://github.com/graphql/graphql-spec) 的支持。

- [Prettier](https://plugins.jetbrains.com/plugin/10456-prettier)

  提供对 [Prettier](https://prettier.io) 的支持（ [参考](https://segmentfault.com/a/1190000015235683) ），支持丰富的语言以及大量的配置规则，适用于团队开发中统一代码风格，非前端项目照样能用。以前的版本需要自己设置格式化快捷键或者配合上面的 **File Watchers** 使用，新版已经支持保存时自动格式化了，但可配置项太少了。

  > 设置自动格式化的文件类型： `{**/*,*}.{js,ts,jsx,tsx,json,md}` 。

- [PostCSS](https://plugins.jetbrains.com/plugin/8578-postcss)

  提供对 [PostCSS](https://postcss.org) 的支持。

- [React CSS Modules](https://plugins.jetbrains.com/plugin/9275-react-css-modules)

  提供对 [CSS Modules](https://github.com/css-modules/css-modules) 的支持。

- [TSReact](https://plugins.jetbrains.com/plugin/12410-tsreact)

  **Typescript** 语法的 **React** 片段。

- [Vue.js](https://plugins.jetbrains.com/plugin/9442-vue-js)

  提供对 [Vue.js](https://vuejs.org) 的支持。

#### 安卓开发

参考 [IntelliJ IDEA 搭建安卓开发环境](https://anyesu.github.io/blog/articles/39) 。

#### 插件开发

- [Plug-in DevKit Helper](https://plugins.jetbrains.com/plugin/14985-plug-in-devkit-helper)

  **plugin.xml** 增强。

  忘了从什么时候起，注解和 **JavaDoc** 中的关键字都被翻译成中文了，一直以为是 **IDEA** 更新后的新功能或者翻译插件造成的，就没去管它。最近想好好写下注释，但发现 **JavaDoc** 行首的星号被隐藏了，每次都要点开看才能知道是被隐藏了还是真漏写了，这也太过分了。 [搜了一圈](https://www.v2ex.com/t/758699) 后发现竟然是这个八竿子打不着的插件导致的（ [翻译配置文件](https://github.com/beansoft/visualgc_java8/blob/master/devkit-helper/resources/messages/JavaDocBundle_zh_CN.properties) ）。

  ![BUG - Plug-in DevKit Helper](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/IntelliJ%20IDEA%20插件和经验分享/imgs/plug_in_devkit_helper_bug.png)

#### 第三方语法支持

- [.env files support](https://plugins.jetbrains.com/plugin/9525--env-files-support)

  提供对 **.env** 文件的支持。

  > **File Types** 增加 `.env.*` 。

- [.ignore](https://plugins.jetbrains.com/plugin/7495--ignore)

  提供对 **.ignore** 文件的支持。

- [BashSupport](https://plugins.jetbrains.com/plugin/4230-bashsupport)

  提供对 **Bash** 语言的支持，支持运行配置、语法高亮、改名重构、查看注释文档、语法检查、命令提示，最主要还是可以做 **代码跳转** 。

  > `2020.3+` 需要使用收费版 [BashSupport Pro](https://plugins.jetbrains.com/plugin/13841-bashsupport-pro) 。

- [CMD Support](https://plugins.jetbrains.com/plugin/5834-cmd-support)

  此类插件（ [Batch Scripts Support](https://plugins.jetbrains.com/plugin/265-batch-scripts-support) ）基本就只支持 **批处理** 代码高亮。

- [CSV](https://plugins.jetbrains.com/plugin/10037-csv)

  提供对 **CSV/TSV/PSV** 文件的支持（ 编辑器、语法验证、结构突出显示、自定义着色 ）。

- [ExcelReader](https://plugins.jetbrains.com/plugin/14722-excelreader)

  右键打开 **Excel** 文件。

- [Ini](https://plugins.jetbrains.com/plugin/6981-ini)

  提供对 **.ini** 文件的支持。

  ![Ini](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/IntelliJ%20IDEA%20插件和经验分享/imgs/ini.png)

- [Ideolog](https://plugins.jetbrains.com/plugin/9746-ideolog)

  日志文件高亮显示。

- [Markdown](https://plugins.jetbrains.com/plugin/7793-markdown)

  默认集成的 **Markdown** 插件，除了 [gitmoji](https://github.com/carloscuesta/gitmoji) 表情支持不完善，其他都够用了。

  > 手动开启 **PlantUML** 和 **Mermaid** 扩展支持。

  **win10** 下高分辨率设置了 **显示缩放** 会导致 **Markdown 的预览效果页面** 文字很模糊。

  解决办法：使用 **JB SDK Bintray Downloader** 插件升级到最新的 **JB SDK** （ [参考](https://blog.csdn.net/zdxxinlang/article/details/78391060) ），或者使用自己下载的 **JDK** （ [参考](https://blog.csdn.net/zaemyn2015/article/details/84584458) ）。

- [Makefile Language](https://plugins.jetbrains.com/plugin/9333-makefile-language)

  ![Makefile Language](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/IntelliJ%20IDEA%20插件和经验分享/imgs/makefile_language.png)

- [nginx Support](https://plugins.jetbrains.com/plugin/4415-nginx-support)

  提供对 **Nginx** 配置文件的支持，支持 **语法高亮** 和 **语法提示** 。

  ![nginx Support](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/IntelliJ%20IDEA%20插件和经验分享/imgs/nginx_support.png)

- [PDF Viewer](https://plugins.jetbrains.com/plugin/14494-pdf-viewer)

  直接打开 **PDF** 。

  ![PDF Viewer](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/IntelliJ%20IDEA%20插件和经验分享/imgs/pdf_viewer.png)

- [PlantUML integration](https://plugins.jetbrains.com/plugin/7017-plantuml-integration)

  **PlantUML** 图表绘制。

  ![PlantUML integration](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/IntelliJ%20IDEA%20插件和经验分享/imgs/plantuml_integration.png)

- [PowerShell](https://plugins.jetbrains.com/plugin/10249-powershell)

- [Requirements](https://plugins.jetbrains.com/plugin/10837-requirements)

  ![Requirements](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/IntelliJ%20IDEA%20插件和经验分享/imgs/requirements.png)

- [Toml](https://plugins.jetbrains.com/plugin/8195-toml)

  提供对 **.toml** 文件的支持。

  ![Toml](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/IntelliJ%20IDEA%20插件和经验分享/imgs/toml.png)

- [Yet another emoji support](https://plugins.jetbrains.com/plugin/12512-yet-another-emoji-support)

  ![Yet another emoji support](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/IntelliJ%20IDEA%20插件和经验分享/imgs/yet_another_emoji_support.gif)

#### 监控与统计

- [Battery Status](https://plugins.jetbrains.com/plugin/12321-battery-status)

  在 **IDEA 状态栏** 显示 **电池状态** 。

  ![Battery Status](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/IntelliJ%20IDEA%20插件和经验分享/imgs/battery_status.png)

- [CPU Usage Indicator](https://plugins.jetbrains.com/plugin/8580-cpu-usage-indicator)

  在 **IDEA 状态栏** 显示 **CPU 使用率** 。

  ![CPU Usage Indicator](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/IntelliJ%20IDEA%20插件和经验分享/imgs/cpu_usage_indicator.png)

- [WakaTime](https://plugins.jetbrains.com/plugin/7425-wakatime)

  统计编码的时间（ 工作量 ）。

  > 需要注册获取一个 [api key](https://wakatime.com/settings/account?apikey=true) 。

  ![WakaTime](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/IntelliJ%20IDEA%20插件和经验分享/imgs/wakatime.png)

#### 其他插件

- [Action Tracker](https://plugins.jetbrains.com/plugin/7641-action-tracker)

  操作录制，不怎么实用。

- [All Format](https://plugins.jetbrains.com/plugin/10962-all-format)

  支持多种格式数据的转换工具，快捷键 `Alt + F` 。

  ![All Format](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/IntelliJ%20IDEA%20插件和经验分享/imgs/all_format.png)

- [any-rule](https://plugins.jetbrains.com/plugin/14162-any-rule)

  [常用正则大全](https://github.com/any86/any-rule) 。

  > [源文件](https://github.com/any86/any-rule/blob/master/packages/www/src/RULES.js) 访问不顺畅可以改为 [加速地址](https://cdn.jsdelivr.net/gh/any86/any-rule/packages/www/src/RULES.js) 。

- [Chinese Converter](https://plugins.jetbrains.com/plugin/13559-chinese-converter)

  中文简体/繁体转换。

- [Code Screenshots](https://plugins.jetbrains.com/plugin/9406-code-screenshots)

  选中代码进行截图。

- [CommonTools](https://plugins.jetbrains.com/plugin/16711-commontools)

  提供一些工具的常用命令和快捷操作：

  > **Flutter、ADB、Git, HttpClient and dart、java code generator**

- [File Path Autocomplete](https://plugins.jetbrains.com/plugin/11088-file-path-autocomplete)

  代码中写文件路径时自动补全，像在终端中输入路径一样。

- [File Watchers](https://plugins.jetbrains.com/plugin/7177-file-watchers)

  用于监听文件变化，比如可以用于 [代码保存的时候自动格式化](https://prettier.io/docs/en/webstorm.html#running-prettier-on-save-using-file-watcher) 。

- [GIdeaBrowser](https://plugins.jetbrains.com/plugin/14458-gideabrowser)

  内嵌浏览器。

  ![GIdeaBrowser](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/IntelliJ%20IDEA%20插件和经验分享/imgs/gideabrowser.png)

- [IDEA Mind Map](https://plugins.jetbrains.com/plugin/8045-idea-mind-map)

  思维导图。

  ![IDEA Mind Map](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/IntelliJ%20IDEA%20插件和经验分享/imgs/idea_mind_map.png)

- [IDEA Resolve Symlinks](https://plugins.jetbrains.com/plugin/16429-idea-resolve-symlinks)

  项目中用到 **符号链接** 的时候，从 **符号链接** 打开和从源文件打开会打开两个文件选项卡，而这个插件可以解决这个问题。

- [Index Viewer](https://plugins.jetbrains.com/plugin/13029-index-viewer)

  官方提供的查看 **IDE 索引** 的插件，虽然看不懂。

  > **View -> Tool Windows -> Indexes ( Indices ) **

- [IntelliJ IDEA Help](https://plugins.jetbrains.com/plugin/10260-intellij-idea-help)

  离线环境下也能打开 **IDE** 的帮助文档（ `F1` ），注意观察打开页面的域名。

- [~~JB SDK Bintray Downloader~~](https://plugins.jetbrains.com/plugin/9195-jb-sdk-bintray-downloader) （ [参考](https://zhuanlan.zhihu.com/p/125529357) ）

  切换用于 **IDEA** 启动的 **JVM** 。

- [jsDelivr package search](https://plugins.jetbrains.com/plugin/11230-jsdelivr-package-search)

  从 **jsDelivr** 查询静态资源（ **NPM** ）并按指定格式插入。

  ![jsDelivr package search](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/IntelliJ%20IDEA%20插件和经验分享/imgs/jsdelivr_package_search.gif)

- [Json Parser](https://plugins.jetbrains.com/plugin/10650-json-parser)

  **Json** 解析、格式化。

  ![Json Parser](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/IntelliJ%20IDEA%20插件和经验分享/imgs/json_parser.png)

- [Key Promoter X](https://plugins.jetbrains.com/plugin/9792-key-promoter-x)

  > **Key Promoter X** 帮助你在工作时学习基本的键盘快捷键。当你在 **IDE** 内部的按钮上使用鼠标时， **Key Promoter X** 会显示你应该使用的键盘快捷键。这提供了一种简单的方法来学习如何用键盘按键代替繁琐的鼠标工作，并有助于过渡到更快的无鼠标开发。 **Key Promoter X** 通过工具窗口显示最近的鼠标操作，并直接给出对应的快捷键。对于那些没有快捷键的按钮， **Key Promoter X** 会直接提示你去创建一个。

- [Kinetic Mouse Scrolling](https://plugins.jetbrains.com/plugin/16592-kinetic-mouse-scrolling)

  按住鼠标滚轮就可以像触摸板一样拖拽可滚动的窗口，操作横向滚动条更方便了。

- [LeetCode Editor](https://plugins.jetbrains.com/plugin/12132-leetcode-editor)

  **LeetCode** 刷题。

  ![LeetCode Editor](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/IntelliJ%20IDEA%20插件和经验分享/imgs/leetcode_editor.gif)

- [Multirun](https://plugins.jetbrains.com/plugin/7248-multirun)

  一次运行多个运行配置。

  ![Multirun](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/IntelliJ%20IDEA%20插件和经验分享/imgs/multirun.png)

- [Naming Is Hard](https://plugins.jetbrains.com/plugin/17272-naming-is-hard)

  新建项目或者模块的时候为你随机生成名称。

  ![Naming Is Hard](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/IntelliJ%20IDEA%20插件和经验分享/imgs/naming_is_hard.gif)

- [Network](https://plugins.jetbrains.com/plugin/9846-network)

  **HTTP** 抓包，注意不支持 **HTTPS** 。

  ![Network](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/IntelliJ%20IDEA%20插件和经验分享/imgs/network.png)

- [Presentation Assistant](https://plugins.jetbrains.com/plugin/7345-presentation-assistant)

  类似 **Key Promoter X** ，反向显示当前使用的功能的快捷键，适合做演示。

  ![Presentation Assistant](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/IntelliJ%20IDEA%20插件和经验分享/imgs/presentation_assistant.png)

- [Programmer Motivator: Chaoyue Yang](https://plugins.jetbrains.com/plugin/12204-programmer-motivator-chaoyue-yang)

  代码写累了，提醒你该休息了。

- [Proxy Toggle](https://plugins.jetbrains.com/plugin/17390-proxy-toggle)

  通过按钮或快捷键切换 **IDE** 的 **HTTP 代理** 的启用状态。

- [Save Actions](https://plugins.jetbrains.com/plugin/7642-save-actions)

  可配置的代码保存操作，主要用途还是代码自动格式化。（ [参考](https://blog.csdn.net/weixin_44712778/article/details/117332374) ）

  ![Save Actions](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/IntelliJ%20IDEA%20插件和经验分享/imgs/save_actions.png)

- [String Manipulation](https://plugins.jetbrains.com/plugin/2162-string-manipulation)

  字符串格式转换工具，比如大小写，驼峰与下划线互转，自己试试就知道了。快捷键 `Alt + M` 。

  ![String Manipulation](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/IntelliJ%20IDEA%20插件和经验分享/imgs/string_manipulation.gif)

- [ToolWindow Manager](https://plugins.jetbrains.com/plugin/1489-toolwindow-manager)

  自定义每个 **Tool Window** 的可见性。

  ![ToolWindow Manager](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/IntelliJ%20IDEA%20插件和经验分享/imgs/toolwindow_manager.png)

- [Translation](https://plugins.jetbrains.com/plugin/8579-translation)

  翻译插件，对于英语渣渣来说很有用，看源码不用再切出去百度了。我设置的翻译快捷键是 `Alt + Z` （ 选择文本和弹窗都设置这个快捷键，可以两用 ）。

  ![Translation](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/IntelliJ%20IDEA%20插件和经验分享/imgs/translation.gif)

- [UpperLowerCapitalize](https://plugins.jetbrains.com/plugin/183-upperlowercapitalize)

  大小写切换， `Alt + P` 切换到全大写， `Alt + L` 切换到全小写。

- [UUID Generator](https://plugins.jetbrains.com/plugin/8320-uuid-generator)

  [UUID](https://tools.ietf.org/html/rfc4122) 、 [ULID](https://github.com/ulid/spec) 、 [CUID](https://github.com/ericelliott/cuid) 生成器。

- [who did it](https://plugins.jetbrains.com/plugin/11269-who-did-it)

  目录树文件名后面像 **Eclipse** 一样显示 **版本控制（ Git / SVN ）** 的最后修改人/时间，没必要还是不要开了，有点卡。

  ![who did it](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/IntelliJ%20IDEA%20插件和经验分享/imgs/who_did_it.png)

[插件市场](https://plugins.jetbrains.com/search?orderBy=downloads&products=androidstudio&products=idea&products=idea_ce&products=idea_edu) 上 **5000+** 的插件稍微实用点的都列在上面了（ **按名称排序** ），剩下还有一些 **其他语言** 、 **框架** 相关的插件自己去搜一下吧。低配电脑还是少装点没必要的插件以避免不必要的性能开销。

> 各种乱七八糟的插件实在是太多了（ 看得头痛 ），本着不错过的原则我就花了几天时间人肉暴力扫描了 ~~全部~~ （ 大部分 ）插件，才有了上面的这个插件清单，以后不会再有第三次了，就算维护也只会添加一些新出现的爆款插件或者我做特定领域开发时发现的宝藏插件。

目前插件生态整体还算是良好的，有人愿意为那些很酷的想法写一个插件，也有人愿意为那些年久失修的插件再发行，一切都是为了使 **IDE** 功能更强大，使开发更便捷更智能。但随着插件越来越多问题就暴露出来了：

- 重复造轮子现象很严重

  插件的目的是为了让 **IDE** 更好用，但发现很多人写插件是为了秀肌肉而秀肌肉。看到一个酷炫的功能就有人想做个类似的，有些甚至 **fork** 了源码稍微修改一点就发布成了一个新的插件。所以搜索结果可以看到一堆形如 **xxx** 、 **xx x** 、 **xxx2** 、 **xxx3** 、 **xxx plus** 、 **xxx plus+** 、 **xxx plus++** 这样的插件名，这就给用户造成了很大的困扰，究竟谁是原版？谁 **fork** 了谁？谁更好用？所谓 **取别人的名字，让别人无名可用** 在这里体现的淋漓尽致。

- 描述文档极其不规范

  发布一个插件，好歹截图、按钮、快捷键都列一下，再不济也要描述下这个插件解决了什么问题，该怎么去使用。但现状就是很多插件（ 包括我文中推荐的一些插件 ）即使安装以后你也搞不清楚怎么用，看着没效果也分不清楚是不兼容还是压根做就很烂。和手机应用商店的坏风气一样，一个笼统性的标题不加描述或者夸大功能成分骗用户先下载下来用用再说。

- 插件发布门槛太低（ 我没发布过，但看了一些垃圾插件应该是这样的 ）

  很多人像建 **GitHub** 仓库一样一时兴起就发布一个插件，发布完就不管了，久而久之就遗留下来一堆垃圾，所以插件市场看着插件数量是很多，但精品实在是没有多少。

- 大部分插件都是用爱发电的，即使收费估计也产生不了多少收益，这就造成了开发者很难投入大量的精力专门去维护和迭代一个插件，所以一个优秀的插件横空出世并更新了几次之后再也没有动静的现象还是很普遍的。

- 兼容性差

  这几年插件 **API** 变化太频繁的，导致一堆不错的旧插件强制报废了， **IDE** 更新一个小版本就要重新去适配估计没几个人愿意。

其实上面这些问题是各种软件生态中都会遇到的，既想大量开发者免费开发又想要高品质本就是矛盾的。但不同的是， [JetBrains 官方](https://plugins.jetbrains.com/organizations/JetBrains) 是有自己下场开发特定领域的精品插件的，很多市场插件可以看作是 **IDE** 的实验室功能，它们的优点被集成到 **IDE** 的正式功能当中只是时间问题。希望官方能好好整顿下第三方插件提升市场的插件品质，同时能官方维护一个 `精品` 、 `垃圾` 的清单以提升用户的搜索体验（ 评分和下载量的水分太大了 ）。

### 设置

---

> 下述配置没有特殊说明均指全局配置而非项目配置。（ [参考](https://www.jetbrains.com/help/idea/working-with-projects.html#settings-types) ）

- 设置 **IDE** 编码（ [参考](https://blog.csdn.net/u014424628/article/details/49429393) ）

  > [idea(64).exe.vmoptions](https://www.jetbrains.com/help/idea/tuning-the-ide.html#configure-jvm-options)

  从根源解决各种莫名其妙的乱码问题。

  ```shell
  -Dfile.encoding=UTF-8
  ```

- [系统设置](https://www.jetbrains.com/help/idea/system-settings.html)

  > **Settings -> Appearance & Behavior -> System Settings**

  - 关闭 **IDE** 时不询问
    - [ ] `Confirm before exiting the IDE`
  - 启动 **IDE** 时不打开工程
    - [ ] `Reopen projects on startup`
  - 项目在新窗口中打开
    - [x] `New window`

- [Quick Lists](https://www.jetbrains.com/help/idea/customize-actions-menus-and-toolbars.html#configure_quick_lists)

  查看 **Keymap** 设置我们可以发现里面有很多的功能，不可能给它们全部设置快捷键。这时候就可以通过 **quick list** 把一些我们常用的功能整合在一起，然后设置一个快捷键来快速打开这个菜单面板，十分方便。

- [快捷键](https://www.jetbrains.com/help/idea/settings-keymap.html)

  > **Settings -> Keymap**

  我更习惯 **eclipse** 风格的快捷键。

  | 检索关键字                                             | 快捷键                    | 说明                                    |
  | ------------------------------------------------------ | ------------------------- | --------------------------------------- |
  | **GotoSuperMethod**                                    | `Ctrl + Shift + 鼠标左键` | 跳转到 **父类定义** 或 **父类方法定义** |
  | **GotoTypeDeclaration**                                | `Ctrl + Alt + 鼠标左键`   | 跳转到 **对象** 的 **类型定义**         |
  | **Quick Lists**                                        | `Ctrl + Alt + Shift + Q`  | 打开 **Quick Lists** 弹窗               |
  | **Reload from Disk**                                   | `Alt + F5`                | 项目视图从磁盘重新加载                  |
  | **RunSshConsoleAction**                                | `Alt + S`                 | 打开 **SSH** 会话                       |
  | Settings -> Build, Execution, Deployment -> Deployment |                           | 添加会话                                |
  | **Restart ESLint Service**                             | `Ctrl + Alt + 逗号`       | 重启 **ESLint** 服务                    |
  | 安装 **ESLint Restart Service Action** 插件            |                           |                                         |
  | **ReformatWithPrettierAction**                         | `Ctrl + Shift + 逗号`     | 使用 **Prettier** 格式化                |
  | **Decrease Font Size**                                 | `Ctrl + Wheel down`       | 减小字体大小                            |
  | **Increase Font Size**                                 | `Ctrl + Wheel up`         | 增大字体大小                            |
  | **Reset Font Size**                                    | `Ctrl + NumPad-0`         | 重置字体大小                            |
  | **Collapse [All]**                                     | `自行查看默认建`          | 折叠代码                                |
  | **Expand [All]**                                       | `自行查看默认建`          | 展开代码                                |

- [编辑器设置](https://www.jetbrains.com/help/idea/settings-editor.html)

  > **Settings -> Editor**

  - [光标可随意定位，默认：不超过行尾](https://www.jetbrains.com/help/idea/settings-editor-general.html)

    > **General -> Virtual Space**

    - [x] `After the end of line`

  - [文件末尾空行处理](https://www.jetbrains.com/help/idea/settings-editor-general.html)

    > **General -> On Save**

    - 删除文件末尾多余的空行
      - [x] `Remove trailing blank lines at the end of saved files`
    - 确保文件最后一行是空行（ 没有就插入一个 ）
      - [x] `Ensure every saved file ends with a line break`

  - [自动导包设置](https://www.jetbrains.com/help/idea/settings-auto-import.html)

    > **General -> Auto Import**

    - 编辑代码时自动导包

      - [x] `Add unambiguous imports on the fly`

    - [编辑代码时优化导入的包](https://www.jetbrains.com/help/idea/creating-and-optimizing-imports.html#947fd5bf) （ [参考](https://blog.csdn.net/huanxianglove/article/details/80743376) ）

      和撤销还原操作有冲突，体验并不好，最好还是保存时再优化。

      - [ ] `Optimize imports on the fly`

  - [代码提示](https://www.jetbrains.com/help/idea/auto-completing-code.html#code_completion_settings)

    > **General -> Code Completion**

    - 模糊搜索不区分大小写
      - [ ] **Match case**

  - [编辑器选项卡](https://www.jetbrains.com/help/idea/settings-editor-tabs.html)

    > **General -> Editor Tabs**

    - 为标签使用小字体
      - [x] `Use small font for labels`
    - 用星号标记已修改的标签
      - [x] `Mark modified (*)`
    - 在结尾打开新选项卡
      - [x] `Open new tabs at the end`
    - 允许单击预览文件（ 标题为斜体 ）
      - [x] `Enable preview tab`
    - [选项卡分行显示](https://blog.csdn.net/qq_27093465/article/details/52537364)

  - [配色方案](https://www.jetbrains.com/help/idea/settings-colors-and-fonts.html)

    > **Color Scheme**

    我的 **配色方案** 用了几年了，还不错，不过找不到原始地址了。分享一个 [项目](http://www.easycolor.cc) ，自己选一个合适的 **配色方案** 吧，不刺眼不太暗的，眼睛看着舒服点的比较好。

  - [代码风格](https://www.jetbrains.com/help/idea/settings-code-style.html) 推荐： [Google style](https://github.com/google/styleguide/blob/gh-pages/intellij-java-google-style.xml)

    > **Code Style -> Scheme**

    仅适用 **Java** 开发相关的文件，其他文件更推荐使用 [Prettier](https://prettier.io) 进行格式化。

    - [行注释设置](https://www.jetbrains.com/help/idea/settings-code-style-html.html#ws_html_settings_code_style_code_generation)

      > **Code Generation -> Comment Code**

      不显示在行首（ [参考](https://www.zhihu.com/question/35486841/answer/63054885) ）。

      - [ ] `Line comment at first column`
        - [x] `Add a space at comment start`
      - [ ] `Block comment at first column`

  - [文件模板](https://www.jetbrains.com/help/idea/settings-file-and-code-templates.html) （ [参考](https://blog.csdn.net/cgl125167016/article/details/78754246) ）

    > **File and Code Templates**

    - [文件模板变量](https://blog.csdn.net/yuanhang1996/article/details/86030070)

    - 文件头

      > **Includes -> File Header**

      比如作者信息：

      ```
      /**
       * Created with IntelliJ IDEA.
       *
       * @author anyesu
       * @date ${YEAR}-${MONTH}-${DAY}
       */
      ```

  - [编码设置](https://www.jetbrains.com/help/idea/encoding.html#file-encoding-settings)

    > **File Encodings**

    | 配置项                                     |         |
    | ------------------------------------------ | ------- |
    | **Global Encoding**                        | `UTF-8` |
    | **Project Encoding**                       | `UTF-8` |
    | **Default encoding for properties file**   | `UTF-8` |
    | **Transparent native-to-ascii conversion** | ✔       |

  - [文件类型](https://www.jetbrains.com/help/idea/creating-and-registering-file-types.html) （ [参考](https://blog.csdn.net/aaashen/article/details/46740817) ）

    > **File Types**

    - **Recognized File Types**

      | 文件类型                          | 模式                          |
      | --------------------------------- | ----------------------------- |
      | **Dockerfile**                    | `Dockerfile` -> `Dockerfile*` |
      | **nginx config file**             | + `*nginx*.conf`              |
      | 需要先安装 **nginx Support** 插件 |                               |
      | **TypeScript config**             | + `tsconfig.*.json`           |

    - **Ignore Files and Folders**

      项目视图隐藏无关的配置文件，追加下面内容（ 注意分号隔开 ）。

      ```shell
      *.iml;.idea;.classpath;.mymetadata;.project;.settings;.vscode;yarn.lock;
      ```

  - [内嵌提示](https://www.jetbrains.com/help/idea/inlay-hints.html)（ 比如提示缺省值，方法参数名，参数类型，返回类型等 ）

    > **Inlay Hints**

    - **TypeScript**
      - **Parameter hints**
        - [x] `For non-literal arguments`
      - **Type annotations**
        - [x] `Non-parenthesized single parameter`
        - [x] `Function returns`

- [版本控制](https://www.jetbrains.com/help/idea/version-control-integration.html)

  > **Settings -> Version Control**

  集成各种 **版本控制** 工具的客户端，也是我用过 **Windows** 平台下最好用的 **Git** 图形化客户端 ，没有之一。

  - 对修改的文件的父目录进行标色，从而快速发现哪些目录有改动（ [参考](https://blog.csdn.net/wangjun5159/article/details/71250367) ）

    - [x] `Show directories with changed descendants`

  - [提交代码使用模态框](https://www.jetbrains.com/help/idea/commit-dialog.html)

    > **Commit**

    - [ ] `Use non-modal commit interface`

  - 提交代码前的检测一般来说作用不大，建议都关闭

    > **Commit -> Before Commit**

- [构建工具](https://www.jetbrains.com/help/idea/settings-build-tools.html)

  > **Settings -> Build, Execution, Deployment -> Build Tools**

  - [配置全局的 Maven](https://www.jetbrains.com/help/idea/maven.html)

    - `Maven home path`
    - `User settings file`

    > **Settings -> Appearance & Behavior -> Path Variables**

    配置环境变量 **M2_HOME/MAVEN_HOME** 后， **IDE** 中的 **MAVEN_REPOSITORY** 变量可能会没有生效，解决办法：删掉 **MAVEN_REPOSITORY** 变量后重启 **IDE** 会自动生成。

- [设置受信任的项目路径](https://www.jetbrains.com/help/idea/project-security.html#trust_sources)

  > **Settings -> Build, Execution, Deployment -> Trusted Locations**

- [共享索引](https://www.jetbrains.com/help/idea/shared-indexes.html)

  > **Settings -> Tools -> Shared Indexes**

  通过共享公共类库的索引可以大大提升构建索引的速度。

  - [x] `Wait for shared indexes`

  - **JDKs**
    - [x] `Download automatically`
  - **Maven Libraries**
    - [x] `Download automatically`

- [打开之后自动启动项目](https://www.jetbrains.com/help/idea/settings-tools-startup-tasks.html)（ 项目级别配置 ）

  > **Settings -> Tools -> Startup Tasks**

  自行添加运行配置。

- [External Tools](https://www.jetbrains.com/help/idea/configuring-third-party-tools.html)

  将外部程序作为一个功能简单集成到 **IDE** 中（ 命令行调用 ），可添加到 **Quick Lists** 。

  > **Tools -> External Tools -> xxx**

### 使用经验

---

- **关于激活**

  ~~注册码点击 [这里](http://idea.lanyus.com) 获取 （ 目前已暂停提供激活码 ），需要把下面的配置加入到 **hosts** 文件中。~~

  ```ini
  0.0.0.0 account.jetbrains.com
  # 下面这个是官网，2019.1 版本起，IDEA 启动的时候会从官网校验注册码，所以需要屏蔽，需要访问官网时再注释掉配置
  0.0.0.0 www.jetbrains.com
  ```

  有条件的还是支持下正版吧。

  目前免费的激活码很不稳定，很快会过期，可以尝试 [重置试用](https://gitee.com/pengzhile/ide-eval-resetter) 的方法（ [文档](https://zhile.io/2020/11/18/jetbrains-eval-reset-da33a93d.html) ）。

- **关于升级**

  建议一直保持最新版，官网的 [更新日志](https://www.jetbrains.com/zh-cn/idea/whatsnew) 写的很详细了（ 可以指定某一版本 - [2021.2](https://www.jetbrains.com/zh-cn/idea/whatsnew/2021-2) ），尤其现在支持国际化了，可以好好阅读下。如果不想做小白鼠可以迟几小个版本。更新前最好做好配置文件的备份（ **Windows** 在 `%HOMEPATH%` 目录下，比如 `.IntelliJIdea2019.1` ， [参考](https://intellij-support.jetbrains.com/hc/en-us/articles/206544519-Directories-used-by-the-IDE-to-store-settings-caches-plugins-and-logs) ）。

- [全局检索](https://www.jetbrains.com/help/idea/searching-everywhere.html)

  `2018.3` 版本起，双击 `Shift` 即可调出全新的 **Search Everywhere** ，合并了原先 **类、文件、符号、Action** 的搜索。

- [运行一切](https://www.jetbrains.com/help/idea/running-anything.html)

  `2018.3` 版本起，双击 `Ctrl` 调出窗口，可以执行 **运行配置** 或者 **终端命令** 。在这个窗口下按 `Shift` 切换 `run/debug` 模式。

- [备份个性化设置](https://www.jetbrains.com/help/idea/sharing-your-ide-settings.html#import-export-settings)

  > **File -> [Manage IDE Settings] -> Export Settings**

- [Java bytecode decompiler](https://www.jetbrains.com/help/idea/decompiler.html)

  反编译 **class** 专用，谁用谁知道。要是整个 **Jar 包** 反编译还是用 [JD-GUI](https://github.com/java-decompiler/jd-gui) 吧。

- [Terminal](https://www.jetbrains.com/help/idea/terminal-emulator.html)

  轻量好用的终端工具，不仅支持本地命令执行，还能连接远程主机，可以 `Ctrl + C/V` 二连很重要。

### 其他

---

- 搭配 **Docker** 使用，详见 [IntelliJ IDEA 使用 Docker 远程部署](https://www.jianshu.com/p/410ea6e0b13a)
- [IntelliJ IDEA 如何查看或显示实时内存](https://jingyan.baidu.com/article/f96699bb040a63894e3c1bde.html)
- [配置 Tomcat 远程调试](https://blog.csdn.net/mingjie1212/article/details/52281847)
- [关于 IntelliJ IDEA 文档无法编辑的解决办法](https://www.cnblogs.com/lfm601508022/p/6529118.html)
- [支持 ES6 语法](https://www.cnblogs.com/wenston/p/5286150.html)
- [idea 下字符串的长度太大](https://blog.csdn.net/lilovfly/article/details/77659541)
- [设置忽略部分类编译错误](https://blog.csdn.net/zhyh1986/article/details/46469173)
- [idea 查看一个类的所有子类以及子类的子类并以层级关系显示](https://blog.csdn.net/qq_35170213/article/details/82953837)
- [使用 IntelliJ IDEA 查看类的继承关系图形](https://www.cnblogs.com/deng-cc/p/6927447.html)

---

#### 转载请注明出处： [https://www.jianshu.com/p/e3f83c4c2d7e](https://www.jianshu.com/p/e3f83c4c2d7e)
