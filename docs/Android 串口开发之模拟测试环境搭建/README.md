### 前言

---

最近项目中需要使用串口从仪器中获取数据，然而手头并没有设备，都是远程调试的，非常麻烦。后来从朋友那了解到有 **虚拟串口** 可以用便尝试了下，效果很好，只要一台电脑就能完成开发测试整个流程，方便多了。

![cover](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Android%20串口开发之模拟测试环境搭建/imgs/cover.png)

### 搭建步骤

---

废话不多说，直接上配置步骤。

#### 安装 VSPD

![VSPD 安装](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Android%20串口开发之模拟测试环境搭建/imgs/VSPD.png)

直接从 [官网](https://www.eltima.com/vspdpro-post-download.html) 下载，可以免费试用 **14** 天。虽然是英文的，但操作很简单，选择 **Pair** 修改端口编号然后点击 **Create** 就创建好了，如图我这边创建的是 **COM2 <> COM3** 这一对虚拟串口。至于可以虚拟出几对我试了下似乎没有上限，不过测试用的话一两对完全够了。

![VSPD 创建虚拟串口](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Android%20串口开发之模拟测试环境搭建/imgs/VSPD2.png)

在设备管理器里面能看到多出了这对虚拟串口设备。

![设备管理器](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Android%20串口开发之模拟测试环境搭建/imgs/device_manager.png)

之所以是 **成对** 创建的，可以理解为把数据线的两个头都连在电脑上了，从线的一端发送数据到线的另一端，发送方和接收方都是自己的电脑，只是用了不同的端口编号。

另外，虚拟串口创建完就可以不用管了，即使重启了也还存在，还是很方便的，什么时候不需要了再在 **VSPD** 里面删掉。

#### 安装 Windows 侧串口调试工具

网上各种串口调试工具良莠不齐，而且只能在野鸡下载站下载，很不靠谱，我这里选用的是 [Win10 串口调试助手](https://zhuanlan.zhihu.com/p/109941792) ，通过微软商店下载安装，界面也比较清爽。

安装完成后打开两个窗口，分别设置不同的串口号并打开串口就能相互发送数据了。

![串口调试助手](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Android%20串口开发之模拟测试环境搭建/imgs/serial_debug_assistant.png)

回到 **VSPD** 可以看到这两个虚拟串口都处于使用中的状态了：

![VSPD 查看虚拟串口状态](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Android%20串口开发之模拟测试环境搭建/imgs/VSPD3.png)

#### 下载 [Genymotion](https://www.genymotion.com/download)

用于开发测试的安卓模拟器，安装包有两个版本，区别在于是否捆绑 **VirtualBox** 安装包，但鉴于 **VirtualBox** 是必须要安装的，干脆直接下载捆绑版本的，一条龙安装。

安装过程很简单没什么好说的，但是安装完打开的时候需要 [注册账号](https://www.genymotion.com/account/create) 并登录，否则无法使用。登录的目的可能是为了区分是个人使用还是商业使用，个人使用是免费的，但是会有 **水印** 。

登录后就是简单的模拟器列表页面，点击添加按钮选择 **API** 版本（ 理论上都能用 ）和机型安装即可， **dpi** 和分辨率以及性能配置什么的之后还可以自定义调整。如果下载失败可以手动进行下载， [参考这里](https://blog.csdn.net/liang_duo_yu/article/details/70800107) 。

![Genymotion](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Android%20串口开发之模拟测试环境搭建/imgs/Genymotion.png)

#### Genymotion 配置

下载完镜像先不要运行模拟器，要先打开 **VirtualBox** 进行串口设置。

![VirtualBox 中设置串口](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Android%20串口开发之模拟测试环境搭建/imgs/Genymotion2.png)

选中模拟器对应的虚拟机 > 设置 > 串口 > 启用串口 > 选择端口编号、端口模式和路径：

- **端口 1/2/3/4** 这个无所谓，随便选一个就好了，意思就是你在虚拟机里只能连四个串口。
- 端口编号对应的是虚拟机内部的路径地址，比如这里的 **COM1** 对应的是安卓中的 **/dev/ttyS0** , 然后依次类推。
- 填写的路径就是 **Windows** 中虚拟串口的串口号了，比如这里填了 **COM2** 就让模拟器占用了 **Windows** 上的这个串口，在 **Windows** 上的串口调试工具中就要打开对应的 **COM3** 串口和它进行通讯。如果还虚拟了 **COM4 <> COM5** 也是一样的道理，记住通讯的时候要成对匹配上。

设置完就可以打开模拟器了，第一次打开可能会报错，其实是自动创建的虚拟网卡还没有启用，需要自己手动启用（ [参考](https://blog.csdn.net/qq_43266597/article/details/117399296) ）。

![Genymotion 启动失败](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Android%20串口开发之模拟测试环境搭建/imgs/Genymotion3.png)

模拟器启动成功后，可以打开命令行窗口测试串口是否生效：

```shell
adb shell cat /dev/ttyS0
```

使用 **Windows** 上的串口调试工具发送数据，可以发现在串口调试工具自己的接收框收到了数据（ **注意这里没有勾选显示发送字符串的选项** ），相当于命令行直接把收到的数据发送回来了。另外由于 `cat` 命令是一行一行读取的，如果发送的数据不包含 **换行符** ，那么命令行就看不到数据，就会造成串口无法使用的假象。

#### 模拟器权限设置

在 **APP** 中要正常使用串口功能还需要设置串口设备的权限（ **模拟器每次重启就要重新设置** ），否则无法正常使用，这里照着做就好了后面再解释：

```shell
# 模拟器用到的串口无非是 ttyS0 ~ ttyS3 索性全部授权
adb -s shell chmod 777 /dev/ttyS*
```

如果连了多个设备，需要使用 `-s` 选项对指定的模拟器执行命令：

```shell
# 查询已连接的设备
adb devices
List of devices attached
192.168.49.101:5555     device
192.168.49.102:5555     device

adb -s 192.168.49.101:5555 shell chmod 777 /dev/ttyS*
```

#### 安装 Android 侧串口调试工具

这里用到的测试工具是 [SerialPortHelper](https://github.com/HuRuWo/SerialPortHelper) ，需要自己打包 **APK** ，或者直接在 **IDE** 中打开他的项目运行到模拟器中。

找到的 **串口 API** 库基本都是 [Fork](https://code.google.com/archive/p/android-serialport-api) 自 **Google** 开源的 **Android** 串口通信 **Demo** 的，上面的 **SerialPortHelper** 也是调用的这个 **API** 。只不过大部分仓库都只是简单的 **fork** 而且很久不更新了，属于年久失修的状态，目前还在活跃的应该是 [Android-SerialPort-API](https://github.com/licheedev/Android-SerialPort-API) 这个项目。而我在项目中实际使用的是 [serialPort](https://github.com/cl-6666/serialPort) 这个库（ 不用这个库的 **demo** 是因为还要安装 **NDK** ），相对来说这个库对数据的处理更完善点（ 比如拆包粘包 ），只是这个单例模式封装得有点尴尬，凑合用吧。

需要注意的一点：比如你在 **APP - A** 中打开了串口，那么在另一个 **APP - B** 中就接收不到这个串口发来的数据了，因为都被 **APP - A** 读取了。

### 遇到的问题

#### 关于项目中的串口地址

前面测试的时候用的串口地址是 **/dev/ttyS0** 这样的，而真机测试的时候地址也有可能是 **/dev/ttyXRUSB1** 这样的，所以建议先用串口工具把识别出来的串口都挨个测一遍，然后把有效的串口地址写在项目配置里面，这样项目中直接打开这个串口就好了，不用去扫描。

#### 为什么不用 **Android SDK** 自带的 **AVD** 模拟器

我一开始找的教程就是用的 **AVD** ，但发现用串口调试工具一发送测试数据模拟器就死机了。经过不断的测试，定位到 [只要数据超过 **8** 个字节就会导致模拟器卡死](https://blog.csdn.net/Shirley0207/article/details/103385762) ，数据再少一点没事，但这样的话整个测试环境就毫无意义了。我想这个是不是 **串口 API** 的 **BUG** 就去仓库搜，果然发现有人遇到一样的情况，他换成 **Genymotion** 就好使了，看来还是 **VirtualBox** 这样的虚拟机对硬件的虚拟化更完善点。

要用 **AVD** 测试的话也有点麻烦，不能直接在 **IDE** 中一键打开，需要自己通过命令行启动模拟器：

```shell
# Pixel_XL_API_30 替换成自己实际的模拟器名称
# emulator -list-avds
emulator @Pixel_XL_API_30 -qemu -serial COM2
```

需要注意的是这里的串口号逻辑和 **Genymotion** 中是不一样的，不管这里参数指定的是 **COM2** 还是 **COM3** 或者其他的串口，在模拟器中固定使用 **/dev/ttyS1** （ 不同设备可能不一样，需要挨个测试 ）来访问。

另外不知道为什么，用了 **qemu** 参数后模拟器就经常会花屏，文字显示都错乱了。

#### 关于权限

```shell
adb shell ls -l /dev/ttyS*
crw------- 1 root root 4,  64 /dev/ttyS0
crw------- 1 root root 4,  65 /dev/ttyS1
crw------- 1 root root 4,  66 /dev/ttyS2
crw------- 1 root root 4,  67 /dev/ttyS3
```

默认情况下模拟器中的 **APP** 是没有权限访问串口的，所以需要手动修改串口的权限（ 真机不需要 ）。网上很多教程没有提到权限这个问题是因为他们用的 **Android 4.4** 镜像默认就已经获取 **ROOT** 权限了。

高版本（ **API 5.0** 开始 ）设置权限的步骤是不一样的（ [参考](https://blog.csdn.net/uestc_ganlin/article/details/83377528) ）：

```shell
# 以 root 权限运行 adbd
adb root
# 关闭防火墙
adb shell setenforce 0
```

**串口 API** 在打开串口的时候会判断是否可读写，不可读写就申请 **ROOT** 权限去修改串口的权限，然而这个操作在高版本系统中是无效的，反而会导致 **APP** 卡死，所以前面配置步骤中需要在每次模拟器开机的时候先手动修改权限。

#### 关于 **Genymotion** 和 **VirtualBox**

之前不知道怎么操作的，模拟器突然就打不开了，一直卡在启动进度条那里（ 实际上重启电脑没准就能正常启动了 ），去网上查了说好像是 **VirtualBox** 版本太低的原因，于是去官网下了最新的 **VirtualBox** 直接升级安装。结果就出错了（ 和千牛捆绑的阿里巴巴服务有冲突 ），旧版的卸载到一半就错误回滚，怎么卸载也卸载不掉，新版的安装到一半也错误回滚安装不上，陷入了尴尬的局面。正想着要不要重装系统的时候，重新点开了 **Genymotion** 的安装包重新安装了一遍结果就好了，也是挺无语的。

顺便吐槽下 **Genymotion** 启动是真的慢。

#### 关于串口 API

如果项目打成 **release** 包后运行，可能会遇到关闭串口的时候 **APP** 崩溃闪退的情况，这很有可能是因为代码混淆造成的。一般 **串口 API** 都是通过 **JNI** 方式调用的，在关闭串口的时候 **JNI** 中的代码通过反射调用 **Java** 代码，由于代码被混淆了就会出错， **而这个异常是普通的全局异常拦截方案拦截不住的** ，所以一定要记得加混淆配置（ 根据自己用到的库进行调整，[参考](https://github.com/kongqw/AndroidSerialPort/issues/18) ）：

```
-keep class com.kongqw.** { *; }
```

#### 关于 USB 串口

项目中还用到了类似收银的那种扫二维码的盒子，虽然也有串口模式，但用上面的 **串口 API** 无法调用，最后发现 [UsbSerial](https://github.com/felHR85/UsbSerial) 这个库可以读取数据。但是通过模拟器没法测试而且扫码盒子可以切换成外接键盘的模式就没有继续折腾了。

网上有利用 **STM32CubeMX** 虚拟 **USB 串口** 的方案，但还要建工程写代码，感兴趣的自行研究下吧。

### 结语

---

在没接触串口开发之前本来觉得这方面应该是比较底层比较麻烦的，而事实是测试环境搭好后再配合现成的 **串口 API** 开发起来竟是如此的简单，还是要多试试啊。

---

#### 转载请注明出处： [https://github.com/anyesu/blog/issues/43](https://anyesu.github.io/blog/articles/43)
