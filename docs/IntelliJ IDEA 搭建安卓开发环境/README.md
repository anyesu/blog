### 前言

---

前段时间重拾安卓开发，基于 **IntelliJ IDEA** 搭建了开发环境，整体体验还不错，就记录下我的配置过程。

![cover](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/IntelliJ%20IDEA%20搭建安卓开发环境/imgs/cover.png)

> 本来想写在 [IntelliJ IDEA 插件和经验分享](https://anyesu.github.io/blog/articles/28) 一文中，结果发现篇幅太长了就单独拎出来。

### 为什么不是 Android Studio ？

---

很久以前在同事的电脑上瞥过几眼 [Android Studio](https://developer.android.google.cn/studio) 的界面，有点丑陋而且看着不太好用的样子。当然，这不是主要原因，作为广大网友强烈推荐的安卓开发工具必然有它的独到之处，而我选择 **IntelliJ IDEA** 也是有我的考量：

- **Android Studio** 本来就是基于 **IntelliJ IDEA** 定制的（ 后者 + 一堆定制插件 ）。

  对比了 **Android Studio ( Arctic Fox | 2020.3.1 )** 和 **IntelliJ IDEA ( 2021.3 )** 之后，发现二者的界面功能就是一个模子刻出来的，而属于前者独有的功能：

  > - **免费** 。
  > - **C/C++** 语言、 **CMake** 、 [**NDK**](https://developer.android.google.cn/ndk) 支持。
  > - [**Jetpack Compose**](https://developer.android.google.cn/jetpack/compose/documentation) 支持。
  > - **Gradle** 文件创建模板（ `Gradle Build Script` ）。
  > - 内置对 [Google Cloud Platform](https://cloud.google.com/tools/android-studio/docs) 的支持，可轻松集成 **Google Cloud Messaging** 和 **App Engine** 。
  > - 其他功能：
  >   - [Profile or Debug APK](https://developer.android.google.cn/studio/debug/apk-debugger)
  >   - [Troubleshoot Device Connections](https://developer.android.google.cn/studio/run/device#assistant)
  >   - [Firebase](https://developer.android.google.cn/studio/write/firebase)
  >   - [App Links Assistant](https://developer.android.google.cn/studio/write/app-link-indexing)
  >   - 其他不可见的功能。

- 我在 **IntelliJ IDEA** 上安装了很多插件并做了较多配置，不想再重复一遍。而且能共用一个 **IDE** 也能节省很多磁盘空间。

- 我在 **IntelliJ IDEA** 上本来就做多种语言的开发： **前端** 、 **Java 后端** 、 **脚本语言（ Bat / Shell / Python ）** 等，能多一个安卓那自然是更好的。

理论上这个方案是没问题的，我实际开发也还没遇到过因为 **IntelliJ IDEA** 自身原因导致的问题。所以，不要无脑听别人说用什么就用什么，有疑惑就多试试。团队开发中，没能力还是建议使用团队统一的 **IDE** 。

### 配置环境变量

---

开发时下载的依赖包、缓存、临时配置等默认是保存在用户目录（ **${user.home}** ）下，通过配置环境变量可以将它们安排在自定义的目录下。

```ini
# 设置 Android SDK 安装目录的路径
# ref: https://developer.android.google.cn/studio/command-line/variables?hl=en
ANDROID_SDK_ROOT=E:\Android\SDK

# ANDROID_HOME 也指向 SDK 安装目录，但已弃用，只是为了兼容 AGP < 3.4.0
ANDROID_HOME=%ANDROID_SDK_ROOT%

# 注意和 ANDROID_SDK_ROOT 的区别，一般这个变量代表安卓模拟器配置文件目录的父目录
# adb 估计写死了路径， ${user.home}/.android/adbkey 无法根据这个变量迁移
# 按英文版文档说明：Android Studio 4.2 起这个变量被 ANDROID_PREFS_ROOT 代替
ANDROID_SDK_HOME=E:\Android

# 修改 Gradle 的全局配置和缓存的目录，IntelliJ IDEA 能够自动识别这个路径
GRADLE_USER_HOME=E:\Android\.gradle

# 将 adb 加入到系统全局路径中
Path=%ANDROID_SDK_ROOT%\platform-tools;%Path%
```

### 配置 Gradle

---

添加 **Gradle** 全局 [初始化脚本](https://docs.gradle.org/current/userguide/init_scripts.html) ，它们会在所有项目构建开始前执行，并可以对构建生命周期进行拦截，可以添加额外的配置和插件以及任务。（ [参考](https://blog.csdn.net/sbsujjbcy/article/details/52079413) ）

> [官网用法介绍](https://docs.gradle.org/current/userguide/init_scripts.html#sec:basic_usage) ：
>
> - 管理公司内部的配置，例如去哪里查找定制的插件。
> - 配置一些基于当前环境（ 开发环境还是持续集成环境 ）的属性。
> - 提供构建所需要的用户个人信息，例如仓库或数据库的用户名和密码。
> - 定义机器的环境，例如 **JDK** 安装在什么位置。
> - 注册一些监听器。这对一些需要监听 **Gradle** 事件的工具来说很有用。
> - 注册一些 **Logger** 。你可能希望去自定义如何输出 **Gradle** 产生的日志信息。

下面所有脚本（ 按需添加 ）采用 [Kotlin DSL](https://gradle.org/kotlin) 语法编写， [Gradle 5.0](https://gradle.org/whats-new/gradle-5) 起可用，如使用旧版本请自行改为 [Groovy](https://groovy-lang.org) 语法。

> 没有代码提示的话，写 **Gradle** 脚本比批处理还恶心。
>
> 在 **Gradle** 项目中打开下面的脚本才会有代码提示。

- **.gradle/init.d/0.repos.init.gradle.kts**

  ```kotlin
  /*
   * 国内的网络环境默认不设置镜像加速的话很大概率无法下载依赖包导致初始化报错，对于刚入门的新手来说直接劝退。
   *
   * 本脚本全局配置所有项目使用阿里云镜像源进行加速，这样就不用每个项目重复设置了，新项目拉下来就能跑。
   *
   * 文件名以 0 开头是为了把这个脚本的执行顺序排在前面。
   *
   * gradlew showRepos
   * gradlew switchDeleteRawRepos
   *
   * @author anyesu <https://github.com/anyesu>
   */

  val pluginRepositories = ArrayList<MavenArtifactRepository>()
  val CONFIG_FILE = File(gradleUserHomeDir, "init.d/.deleteRawRepos")

  /** 是否删除项目中配置的源地址 */
  var deleteRawRepos = CONFIG_FILE.exists()
  val GROUP_NAME = "init.gradle"
  val TASK_NAME_SHOW_REPOS = "showRepos"
  val TASK_NAME_SWITCH_DELETE_RAW_REPOS = "switchDeleteRawRepos"

  // 源地址
  val rawRepos = listOf(
      // central
      "https://repo1.maven.org/maven2/",
      "https://repo.maven.apache.org/maven2/",
      // jcenter
      "https://jcenter.bintray.com/",
      // google
      "https://maven.google.com/",
      "https://dl.google.com/dl/android/maven2/",
      // gradle-plugin
      "https://plugins.gradle.org/m2/"
  )

  // 代理地址
  object Repos {
      const val MAVEN_ALIYUN = "https://maven.aliyun.com/repository/public"
      const val MAVEN_JITPACK = "https://www.jitpack.io"
      const val GOOGLE_ALIYUN = "https://maven.aliyun.com/repository/google"
      const val GRADLE_PLUGIN_ALIYUN = "https://maven.aliyun.com/repository/gradle-plugin"
      const val GRADLE_PLUGIN_ALIYUN_OLD = "https://maven.aliyun.com/nexus/content/repositories/gradle-plugin"
  }

  projectsLoaded {
      allprojects {
          if (deleteRawRepos) deleteRawRepos()
          configureRepos()
          tasks.register(TASK_NAME_SHOW_REPOS) {
              group = GROUP_NAME
              description = "查看当前项目最终依赖的仓库"
              doLast { printRepositories() }
          }
      }
      rootProject {
          tasks.named(TASK_NAME_SHOW_REPOS) {
              doFirst {
                  displayScriptConfigs()
                  pluginRepositories.print("pluginManagement.repositories")
              }
          }
          tasks.register(TASK_NAME_SWITCH_DELETE_RAW_REPOS) {
              group = GROUP_NAME
              description = "切换 - 是否删除项目中配置的源地址"
              doLast {
                  if (deleteRawRepos) CONFIG_FILE.delete() else CONFIG_FILE.createNewFile()
                  deleteRawRepos = !deleteRawRepos
                  displayScriptConfigs()
              }
          }
      }
  }

  beforeSettings {
      configurePluginManagement()
  }

  fun displayScriptConfigs() {
      println("[ Current Initialization Script Configs ]")
      println("  - deleteRawRepos [${if (deleteRawRepos) "enabled" else "disabled"}]")
  }

  fun Settings.configurePluginManagement() = pluginManagement {
      repositories {
          all {
              if (this !is MavenArtifactRepository) return@all
              if (!deleteRawRepos) {
                  pluginRepositories.add(this)
                  return@all
              }
              val path = url.toString().run { if (endsWith("/")) this else "$this/" }
              if (rawRepos.contains(path)) {
                  logger.info("removed from `settings.pluginManagement.repositories`: ${display()}")
                  remove(this)
              } else {
                  pluginRepositories.add(this)
              }
          }
          // TODO 阿里云插件新版地址有时候 jar 会下载不下来，所以同时加上旧版的地址备用。
          maven(Repos.GRADLE_PLUGIN_ALIYUN_OLD)
          maven(Repos.GRADLE_PLUGIN_ALIYUN)
      }
  }

  fun Project.configureRepos() {
      buildscript.repositories.configureRepos()
      repositories.configureRepos()
  }

  fun Project.deleteRawRepos() {
      buildscript.repositories.deleteRawRepos(name, "buildscript.repositories")
      repositories.deleteRawRepos(name, "repositories")
  }

  fun Project.printRepositories() {
      buildscript.repositories.print("buildscript.repositories")
      repositories.print("repositories")
  }

  fun RepositoryHandler.deleteRawRepos(projectName: String = "", display: String = "") {
      // TODO: all 的逻辑不仅顺序执行还会作为回调
      all {
          if (this is MavenArtifactRepository && rawRepos.contains(url.toString())) {
              logger.info("removed from `${projectName}.${display}`: ${display()}")
              remove(this)
          }
      }
  }

  fun RepositoryHandler.configureRepos() {
      mavenLocal()
      mavenCentral { url = uri(Repos.MAVEN_ALIYUN) }
      maven(Repos.MAVEN_ALIYUN)
      google { url = uri(Repos.GOOGLE_ALIYUN) }
      maven(Repos.MAVEN_JITPACK)
      jcenter { url = uri(Repos.MAVEN_ALIYUN) }
      if (!deleteRawRepos) {
          mavenCentral()
          google()
          jcenter()
      }
  }

  fun RepositoryHandler.mavenArtifactRepositories() =
      map { if (it is MavenArtifactRepository) it else null }.filterNotNull()

  fun RepositoryHandler.print(display: String = "") {
      mavenArtifactRepositories().print(display)
  }

  fun List<MavenArtifactRepository>.print(display: String = "") {
      println("\n[ ${display} ]")
      forEach { println("  - ${it.display()}") }
  }

  fun MavenArtifactRepository.display() = "[ ${name.padEnd(32)} ] -> $url"
  ```

- **.gradle/init.d/cacheToLocalMavenRepository.init.gradle.kts**

  > 解决了原脚本的几个问题：
  >
  > - parts[1] 可能包含 `.` ，不能将其替换为 `/` ，比如：
  >
  >   ```
  >   org.jetbrains.intellij/org.jetbrains.intellij.gradle.plugin
  >   ```
  >
  > - 还要考虑更深的子目录，比如：
  >
  >   ```
  >   com.jetbrains.intellij.idea/ideaIC/2021.1.3/fef2d88b0f4771ce5ac9a9963d3717080439cf4f/ideaIC-2021.1.3
  >   ```

  ```kotlin
  /*
   * 添加一个 Task 用来把 Gradle 缓存的 Jar 包复制到 Maven 的本地仓库，这样和 Maven 就可以共用缓存了，而且 Maven 的目录结构更方便查找。
   *
   * 需要先设置环境变量 M2_HOME 为 Maven 的安装目录，否则会复制到默认的 ${user.home}/.m2 目录。
   *
   * 需要手动执行， Gradle 原有缓存在迁移后自行手动删除。
   *
   * gradlew cacheToLocalMavenRepository
   *
   * @see https://blog.csdn.net/feinifi/article/details/81458639
   *
   * @author anyesu <https://github.com/anyesu>
   */

  val GROUP_NAME = "init.gradle"

  projectsLoaded {
      rootProject {
          tasks.register<Copy>("cacheToLocalMavenRepository") {
              group = GROUP_NAME
              description = "Gradle 缓存复制到 Maven 本地仓库"

              from(File(gradleUserHomeDir, "caches/modules-2/files-2.1"))
              into(repositories.mavenLocal().url)
              eachFile {
                  val parts = ArrayList(path.split("/"))
                  parts[0] = parts[0].replace('.', '/') // 路径分割
                  if (parts.size > 3) parts.removeAt(3) // 去除随机值
                  path = parts.joinToString("/")
              }
              duplicatesStrategy = DuplicatesStrategy.EXCLUDE // 重复文件策略
              includeEmptyDirs = false
          }
      }
  }
  ```

- **.gradle/init.d/dependency-graph.init.gradle.kts**

  ```kotlin
  /*
   * 为所有项目添加 gradle-dependency-graph-generator-plugin 插件，用于生成项目的依赖关系图。
   *
   * gradlew generateDependencyGraph
   * gradlew generateProjectDependencyGraph
   *
   * @author anyesu <https://github.com/anyesu>
   */

  val PLUGIN_ID = "com.vanniktech.dependency.graph.generator"

  projectsLoaded {
      allprojects {
          buildscript {
              repositories {
                  mavenCentral()
              }

              dependencies {
                  classpath("com.vanniktech:gradle-dependency-graph-generator-plugin:+")
              }
          }

          afterEvaluate {
              // 和项目配置冲突，如果项目中已经配置了就忽略本配置
              if (!plugins.hasPlugin(PLUGIN_ID)) {
                  apply(plugin = PLUGIN_ID)
                  logger.info("project '$name' apply plugin: $PLUGIN_ID")
              }
          }
      }
  }
  ```

- **.gradle/init.d/dependencyUpdates.init.gradle.kts**

  > 借助 [Package Search](https://plugins.jetbrains.com/plugin/12507-package-search) 插件可以提供类似的功能，更直观。

  ```kotlin
  /*
   * 依赖版本管理，查看哪些依赖可以升级（ 可自定义升级规则 ）。
   *
   * gradlew dependencyUpdates
   *
   * @see https://github.com/ben-manes/gradle-versions-plugin#using-a-gradle-init-script
   *
   * @author anyesu <https://github.com/anyesu>
   */

  import com.github.benmanes.gradle.versions.VersionsPlugin
  import com.github.benmanes.gradle.versions.updates.DependencyUpdatesTask

  val GROUP_NAME = "init.gradle"
  val PLUGIN_ID = "com.github.ben-manes.versions"

  initscript {
      repositories {
          mavenLocal()
          gradlePluginPortal()
      }

      dependencies {
          classpath("com.github.ben-manes:gradle-versions-plugin:+")
      }
  }

  projectsEvaluated {
      allprojects {
          // 和项目配置冲突，如果项目中已经配置了就忽略本配置
          if (!plugins.hasPlugin(PLUGIN_ID)) {
              configureDependencyUpdates()
              logger.info("project '$name' apply plugin: $PLUGIN_ID")
          }
      }
  }

  val String.isNonStable
      get() = listOf("final", "rc", "m", "alpha", "beta", "ga").any {
          val regex = "^(?i).*[.-]${it}[.\\d-]*$".toRegex()
          regex.matches(this)
      }

  // 版本号以 v 开头，比如：v1.1.1
  val String.startsWithV get() = startsWith("v")

  fun Project.configureDependencyUpdates() {
      apply<VersionsPlugin>()
      tasks.withType<DependencyUpdatesTask> {
          group = GROUP_NAME
          rejectVersionIf {
              !currentVersion.isNonStable && candidate.version.isNonStable ||
                  currentVersion.startsWithV && !candidate.version.startsWithV
          }
      }
  }
  ```

### 配置 SDK

---

- 打开 **IntelliJ IDEA** 新建一个安卓项目

  这时因为还没有安装 **Android SDK** 所以无法新建项目，会提示我们去安装（ 如下图所示： `Install SDK` ）。我们照着提示安装就好了，安装路径会自动识别为我们前面设置的环境变量 `ANDROID_SDK_ROOT` 。

  ![新建安卓项目 - Android SDK 未安装](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/IntelliJ%20IDEA%20搭建安卓开发环境/imgs/new_android_project_without_android_sdk.png)

  ![新建安卓项目 - Android SDK 安装完成](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/IntelliJ%20IDEA%20搭建安卓开发环境/imgs/android_sdk_installed.png)

  安装完成就可以继续新建项目了（ 随便建一个 **Basic Activity** 的手机项目 ）。

  > **注意：**
  >
  > **Android 31** 依赖：（ [参考](https://blog.csdn.net/z736248591/article/details/121115431) ）
  >
  > - **com.android.tools.build:gradle:7.x**
  > - **Minimum supported Gradle version is 7.0.2.**
  > - **IntelliJ IDEA (or Android Studio) with version 2020.3.1 or newer.**

  当然，也可以进设置页面自定义选择 **SDK** 版本进行安装（ [参考](https://developer.android.google.cn/studio/intro/update) ）， **API 19 +** 可以兼容目前大部分的项目和手机。

  ![Android SDK 设置](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/IntelliJ%20IDEA%20搭建安卓开发环境/imgs/settings_android_sdk.png)

  > 新版本 **IntelliJ IDEA** 真的很方便，不像 N 年前用 [Eclipse](https://www.eclipse.org) 开发时要自己去网上东找西找地下载各种 **SDK** 然后配置。

- 打开新建的项目

  打开项目后会自动识别为 **Gradle** 项目，开始自动下载对应的 [Gradle wrapper](https://docs.gradle.org/current/userguide/gradle_wrapper.html) 和依赖包。刚开始使用的话因为本地没缓存所以下载会比较久，用一段时间以后攒够了缓存，之后再开任何项目就会比较快了。

  > 一般来说不用像 [Maven](https://maven.apache.org) 一样下载一个全局的 **Gradle** ，因为项目外基本用不上，而项目内每个项目设置的 **Gradle** 版本基本上都不一样，还是要下载多个版本的。

  同步项目的时候可能会出现下面的错误：

  ```
  你的主机中的软件中止了一个已建立的连接。

  # 查看 daemon 日志关键内容 .gradle/daemon/6.7.1/daemon-17316.out.log

  Ignoring unreachable local address on loopback interface /127.0.0.1
  ...
  Adding remote address /192.168.137.1
  ...
  Listening on [951c7aa5-4ce6-4311-8262-55d1396408a5 port:8653, addresses:[localhost/127.0.0.1]].
  ...
  Daemon server started.
  ...
  Cannot accept connection from remote address /127.0.0.1.
  ```

  看到 `192.168.137.1` 我就想起了热点，把热点关闭果然就好了，杀 **daemon** 后再打开热点就又不行了。总结下：

  - 有问题的 **Gradle** 版本为 `6.4.1 ~ 6.8.3` ，新建的项目版本为 `6.7.1` ，在这个区间内。
  - 应该是开启热点产生的虚拟网卡对 **daemon** 绑定端口和通讯的逻辑产生了干扰，导致 **daemon** 启动后就关闭了。
  - **daemon** 进程正常启动后再开启热点就不会有问题了。
  - **Easy Gradle** 插件的 `Kill Gradle` 按钮可以杀死 **daemon** 进程。

### 安装插件

---

- [Activity Stack View](https://plugins.jetbrains.com/plugin/12293-activity-stack-view)

  查看设备当前创建的 **Activity** 的堆栈状态，对应下面的命令：

  ```shell
  adb shell dumpsys activity activities
  ```

  > 此插件即将下架，感兴趣的可以看下 [源码](https://github.com/chengzhicao/AndroidActivityStackView) 。

- [ADBHelper](https://plugins.jetbrains.com/plugin/14333-adbhelper)

  可以测试 **URL Scheme** 。

- [ADB Idea](https://plugins.jetbrains.com/plugin/7380-adb-idea)

  提供常用的 [adb](https://developer.android.google.cn/studio/command-line/adb) 命令菜单（ 启动、关闭、调试等 ），快捷键 `Ctrl + Alt + Shift + A` 。

- [ADB Tools](https://plugins.jetbrains.com/plugin/16157-adb-tools)

  唯一有用的功能就是能修改手机的分辨率。

- [ADB Wi-Fi](https://plugins.jetbrains.com/plugin/14969-adb-wi-fi)

  无需手动敲命令，一键通过 **WiFi** 连接安卓手机。众多同类插件中颜值最高，还集成了 [scrcpy](https://github.com/Genymobile/scrcpy) 。

  > 使用 **scrcpy** 的时候可能会出现卡顿，我测试了两个手机发现 [adb wifi](https://developer.android.google.cn/studio/command-line/adb#wireless) 的带宽最多只能跑到 **5 Mbps** ，慢得离谱（ **USB** 差不多能跑 **80 Mbps** ），要想流畅点就要降低比特率和分辨率。
  >
  > ```shell
  > adb push D:/xxx /sdcard/
  > ```
  >
  > 按照网上的 [方法](https://stackoverflow.com/a/68740993) 通过热点（ 电脑开热点或者手机开热点都行 ）直连的话，带宽可以提升到 **14 Mbps** ，还是远远不够，这个速度安装微信这种 **APK** 光复制文件都要好几分钟。

- [Android Intent Sender](https://plugins.jetbrains.com/plugin/7945-android-intent-sender)

  自定义 **Intent** 调试。

- [AndroidProGuard Pro](https://plugins.jetbrains.com/plugin/10130-androidproguard-pro)

  一键生成 **proguard-rules.pro** 中的混淆配置，仅供参考。

- [AndroidSourceViewer](https://plugins.jetbrains.com/plugin/10187-androidsourceviewer)

  在线查看 **Android** 源码的插件。

- [Android WiFiADB](https://plugins.jetbrains.com/plugin/13156-android-wifiadb)

  支持手动输入 **IP** 和端口进行连接，支持扫描局域网可用设备，设备列表会持久化而不丢失。

- [AndroidZer](https://plugins.jetbrains.com/plugin/15200-androidzer)

  **APK** 反编译为 **Smali** （ 可用 **Jadx** 打开 ）。

- [Android Drawable Preview](https://plugins.jetbrains.com/plugin/10730-android-drawable-preview)

  **Drawable** 文件直接预览在项目视图的图标上，无需打开文件。

  > 用是能用，不过有时能显示出来有时又显示不出来，应该是性能上有问题。

- [Dex 2 Java](https://plugins.jetbrains.com/plugin/11399-dex-2-java)

  反编译 **Dex** 中的字节码，不过年久失修用不了了。

- [Easy Gradle](https://plugins.jetbrains.com/plugin/11920-easy-gradle)

  提供一个按钮强行终止 **Gradle** 进程。

- [Gradle Clean Snapshot Cache](https://plugins.jetbrains.com/plugin/17385-gradle-clean-snapshot-cache)

  清理 **Gradle** 缓存的 **Snapshot** 依赖包。

- [Gradle Utilities](https://plugins.jetbrains.com/plugin/16800-gradle-utilities)

  扩展 **Gradle** 工具窗口，管理本地的 **Gradle** 信息和缓存。

- [Gradle View](https://plugins.jetbrains.com/plugin/7150-gradle-view)

  查看 **Gradle** 依赖树。

  > 由于依赖 [Gradle Tooling API](https://docs.gradle.org/current/userguide/third_party_integration.html) `5.6.2` ，最高只能支持到 **Gradle** `6.x` 。

- [Install Apk](https://plugins.jetbrains.com/plugin/12890-install-apk)

  在项目中右键安装 **APK** 而无需手动敲命令。

- [Jadx Android Decompiler](https://plugins.jetbrains.com/plugin/17851-jadx-android-decompiler)

  集成 [Jadx GUI](https://github.com/skylot/jadx) ，一个 **Dex** 到 **Java** 的反编译器，可在项目文件（ apk, dex, jar, class, smali, zip, aar, arsc ）视图中右键选择 **在 Jadx GUI 中反编译** 。

  > **Jadx** 是目前我用过最好用的、最傻瓜式的 **APK 反编译器** ，不过需要设置好内存参数 `-Xmx` （ [参考](https://github.com/skylot/jadx/wiki/Troubleshooting-Q&A) ），不然随便多开几个就能撑爆你的内存。

- [Material Design Icon Generator](https://plugins.jetbrains.com/plugin/14170-material-design-icon-generator)

  辅助导入 [Material Design](https://github.com/google/material-design-icons) 图标到项目中，快捷键 `Ctrl + Alt + D` 。

- [scrcpy](https://plugins.jetbrains.com/plugin/14565-scrcpy)

  直接给 [scrcpy](https://github.com/Genymobile/scrcpy) 做了一个配置界面，使用更方便。当然，还是 [QtScrcpy](https://gitee.com/Barryda/QtScrcpy) 的体验更好。

  > **scrcpy** 是一个手机投屏到电脑的工具，有了它就可以在电脑上无缝操作手机，调试可以更加方便（ 尤其是有多个开发设备 ）。

- [Spock ADB](https://plugins.jetbrains.com/plugin/11591-spock-adb)

  > Plugin Helps you to have full control of your project and device.

- [SQL Android](https://plugins.jetbrains.com/plugin/11283-sql-android)

  看截图应该是个不错的数据库管理工具，不过太久没更新了，安装后使用没反应甚至会把 **IDE** 卡死。新版 **IDE** 可以考虑自带的 [Database Inspector](https://developer.android.google.cn/studio/inspect/database) 。

- [Vector Drawable Thumbnails](https://plugins.jetbrains.com/plugin/10741-vector-drawable-thumbnails)

  显示安卓项目中所有的 **Drawable** 文件。

### 其他配置和功能

---

- 代码风格

  > **Settings -> Editor -> Code Style**

  - [Kotlin](https://www.jetbrains.com/help/idea/code-style-kotlin.html)

    > **gradle.properties** 中的 `kotlin.code.style` 配置项会决定基础样式。（ [参考](https://kotlinlang.org/docs/code-style-migration-guide.html) ）

    按照 [ktlint](https://github.com/pinterest/ktlint#-with-intellij-idea) 的教程一键配置，应用到项目级别即可，免得恶心到其他项目。

    另外，开启样式检查可以帮助你快速找到项目中需要格式化的代码。

    > **Settings -> Editor -> Inspections**
    >
    > **Kotlin -> Style issues -> File is not formatted according to project settings**

    - [x] `enable`

    - [x] `Apply only to modified files`

    参考：

    - [Kotlin Coding conventions](https://kotlinlang.org/docs/coding-conventions.html)
    - [Kotlin 样式指南](https://developer.android.google.cn/kotlin/style-guide)
    - [面向贡献者的 AOSP 代码样式指南](https://source.android.com/source/code-style)
    - [Android 代码规范大全](https://www.jianshu.com/p/e3afd461ebce)
    - 静态代码分析工具 - [detekt](https://github.com/detekt/detekt)
    - [Android/Kotlin 项目模板](https://github.com/cortinico/kotlin-android-template)

  - [XML](https://www.jetbrains.com/help/idea/settings-code-style-xml.html)

    > **Set from... -> Android**

    导入 **Android** 的 **XML** 代码样式。

    > 启用属性排列很有用，比如 **layout** 属性不再杂乱无章。（ [参考](https://blog.csdn.net/choimroc/article/details/100010267) ）

    ![XML 属性排列规则](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/IntelliJ%20IDEA%20搭建安卓开发环境/imgs/code_style_xml_arrangement.png)

- **安卓模拟器** 内嵌在 **Tool Windows** 中打开

  > **Settings -> Tools -> Android Emulator**

  - [x] `Launch in a tool window`

- **Android 资源文件默认打开界面模式为纯代码编辑**

  > **Settings -> Editor -> Android Layout Editor -> Default Editor Mode**

  - [x] `Code`

- [分析堆栈轨迹](https://developer.android.google.cn/studio/debug/stacktraces)

  > **Code ( Analyze ) -> Analyze Stack Trace...**

- [使用布局检查器和布局验证工具调试布局](https://developer.android.google.cn/studio/debug/layout-inspector) （ [参考](https://blog.csdn.net/cadi2011/article/details/85212762) ）

  > **View -> Tool Windows -> Layout Inspector** （ 仅安卓项目可见 ）

  要启用实时刷新要安装 **Layout Inspector image server for xxx** 。（ 使用时应该会自动安装 ）

- [使用 Database Inspector 调试数据库](https://developer.android.google.cn/studio/inspect/database) （ [参考](https://www.jetbrains.com/help/idea/accessing-android-sqllite-databases-from-product.html) ）

  > **View -> Tool Windows -> [App Inspection] -> Database Inspector** （ 仅安卓项目可见 ）

- [使用后台任务检查器调试 WorkManager 工作器](https://developer.android.google.cn/studio/inspect/task) （ `Android Studio Arctic Fox+` ）

  > **View -> Tool Windows -> App Inspection -> Background Task Inspector** （ 仅安卓项目可见 ）

- [使用设备文件浏览器查看设备上的文件](https://developer.android.google.cn/studio/debug/device-file-explorer)

  > **View -> Tool Windows -> Device File Explorer** （ 仅安卓项目可见 ）

  修改默认的文件下载目录：

  > **Settings -> Tools -> Android Device File Explorer -> Download location**

- [使用 APK 分析器分析您的 build](https://developer.android.google.cn/studio/debug/apk-analyzer)

  双击打开 **APK** 文件即可。

- [利用 uiautomatorviewer 来检查当前屏幕显示的布局层次结构](https://developer.android.google.cn/training/testing/ui-automator)

  > `uiautomatorviewer` 工具位于 `<android-sdk>/tools/bin` 目录中。

- [AGP 配置](https://developer.android.google.cn/studio/build/gradle-tips) 可视化

  **Android Studio** 的 [Project Structure](https://developer.android.google.cn/studio/projects#ProjectStructure) 对应为 **IntelliJ IDEA** 的

  > **Settings -> Build, Execution, Deployment -> Android Project Structure**

  不成熟，动态生成的配置基本识别不出来。

- [Quick Lists](https://www.jetbrains.com/help/idea/customize-actions-menus-and-toolbars.html#configure_quick_lists)

  查看 **Keymap** 设置我们可以发现里面有很多的功能，不可能给它们全部设置快捷键。这时候就可以通过 **quick list** 把一些我们常用的功能整合在一起，然后设置一个快捷键来快速打开这个菜单面板，十分方便。

- [External Tools](https://www.jetbrains.com/help/idea/configuring-third-party-tools.html)

  将外部程序作为一个功能简单集成到 **IDE** 中（ 命令行调用 ），可添加到 **Quick Lists** 。

  > **Tools -> External Tools -> xxx**

### 常见错误

---

- 找不到 **SDK**

  > **SDK location not found. Define location with sdk.dir in the local.properties file or with an ANDROID_HOME environment variable.**

  **Android Studio** 在同步 **Gradle** 前会自动创建 [local.properties](https://developer.android.google.cn/studio/build#properties-files) 文件，而 **IntelliJ IDEA** 不会。

  为了避免每次打开新项目要手动创建，可以添加一个环境变量 `ANDROID_HOME` （ [参考](#配置环境变量) ）。

- 使用老旧 **Gradle** 的项目（ [比如](https://github.com/EdwardSituwende/WeChatAutomationUtil/tree/b17d777b003aedbf6b69ecd2ba6b849ebd79d384) ）构建失败

  > **Executing tasks: [:app:assembleDebug] in project ...**
  >
  > **Gradle build failed with 1 error(s) in 24 ms**

  找不到任何更多的错误信息，而且手动跑命令是完全没问题的。

  ```shell
  # gradlew :app:assembleDebug

  BUILD SUCCESSFUL in 0s
  25 actionable tasks: 1 executed, 24 up-to-date
  ```

  测试了 **Android Studio ( Arctic Fox | 2020.3.1 )** 和 **IntelliJ IDEA 2020.3** 都没问题，但 **IntelliJ IDEA 2021.x** 全都不行。

  **临时解决方案** ：构建步骤使用 **Gradle** 命令代替 `Gradle-aware Make` 。（ [参考](https://developer.android.google.cn/studio/run/rundebugconfig#definingbefore) ）

  > **Edit Configurations -> Android App -> app -> Before launch**

  ```diff
  - Gradle-aware Make
  + Run Gradle task :app:assembleDebug
  ```

  如果继续报错，可以考虑把安装步骤也替换了。（ [参考](https://blog.csdn.net/lzllzllhl/article/details/109468320) ）

  > **ApkProvisionException: No outputs for the main artifact of variant: debug**

  - [Android Studio 'Run' 按钮后面的秘密](https://www.jianshu.com/p/adc5cc0ee843)

### 学习资料

---

- [官方文档 - Android 开发者指南](https://developer.android.google.cn/guide)
- [官方文档 - Android Studio](https://developer.android.google.cn/studio/intro)
- [官方文档 - 使用 Kotlin 开发 Android 应用](https://developer.android.google.cn/kotlin)
- [Kotlin 基础语法](https://kotlinlang.org/docs/basic-syntax.html)
- [Gradle 用户手册](https://docs.gradle.org/current/userguide/userguide.html)

**新手入门强烈建议去看一遍官方文档，可以少走很多弯路。**

---

#### 转载请注明出处： [https://github.com/anyesu/blog/issues/39](https://anyesu.github.io/blog/articles/39)
