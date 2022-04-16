### 前言

---

很久没有重装系统了，感觉技艺都生疏了，趁着最近在 [DIY 装机](https://diy.jd.com) 就顺便回顾一下。

本文仅记录我平常装系统的步骤以及遇到过的一些问题，不保证面面俱到，不包教会，有问题欢迎在评论区留言探讨。

![cover](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Windows%20系统安装/imgs/cover.png)

> **注意**
>
> **本文所列操作存在一定风险，造成的一切后果由使用者自行承担，请知悉。数据无价，请谨慎操作。**

### 安装方式

---

安装系统其实和我们平时安装软件差不多，无非就是下载~~安装包~~（ **镜像** ）、启动安装程序、完成安装。当然还有更简单粗暴的 **克隆系统** （ 二进制数据拷贝 ），这个在 [后面](#迁移系统) 介绍。

这里推荐两种方式进行安装：

#### 使用微软官方工具 [media creation tool](https://www.microsoft.com/software-download/windows10) 制作系统安装 U 盘

> 直接 **百度 - 下载 win10** 即可，注意选带 **`[官方]`** 认证小尾巴的链接。

这是官方方案，可以保证绝对的安全可靠，操作过程也比较简单，适合新手。缺点的话就是不够灵活，只能安装最新版本的系统而不能指定版本，而且每次制作要重新下载相对比较耗时。

![media creation tool 主要步骤](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Windows%20系统安装/imgs/media_creation_tool_steps.png)

#### 制作 PE 系统 ，在 PE 中使用 Windows 官方镜像完成安装

> [Windows PE (WinPE)](https://docs.microsoft.com/windows-hardware/manufacture/desktop/winpe-intro) 是一个小型操作系统，用于安装、部署和修复 Windows 10 桌面版（家庭版、专业版、企业版和教育版）、Windows Server 和其他 Windows 操作系统。 通过 Windows PE，你可以：
>
> - 在安装 Windows 之前设置硬盘。
> - 使用来自网络或本地驱动器的应用或脚本安装 Windows。
> - 捕获和应用 Windows 映像。
> - 在 Windows 操作系统未运行时，对其进行修改。
> - 设置自动恢复工具。
> - 从无法启动的设备中恢复数据。
> - 添加自己的自定义 shell 或 GUI 来使此类任务自动化。

**PE** 可以简单理解为一个可以安装到 **U 盘** 上的 **精简的 Windows 系统** ，一般会附带一些系统维护的工具软件，不仅可以 **安装系统** ，还可以做一些复杂的操作，适合有经验的用户。

> 顺带提一句，不要以为有系统密码就完事了，没做硬盘加密的话，随便用一个 **PE U 盘** 就能访问你硬盘上的数据， **所以不要让陌生人随意动你的电脑** 。

市面上常见的 **PE 工具** 其实就是在 **WinPE** 的基础上做了工具整合和定制，一般在界面、内置工具、侵入程度上有所差异，看个人喜好进行选择吧。有的 **PE 工具** 在启动菜单中直接添加了 **安装系统** 的选项，不需要进入 **PE 系统** 就可以进行傻瓜式安装，不过我个人还是倾向于进入 **PE 系统** 再安装系统，适合个性化的操作。我用过的有 [老毛桃](https://www.laomaotao.net) 、[大白菜](https://www.dabaicai.com) 、 [微 PE](http://www.wepe.com.cn) ，其中 **微 PE** 最简洁好用，下文也是以它作为操作环境。也有人推荐 [IT 天空](https://www.itsk.com) 的 [优启通](https://www.upe.net) ，不过我没用过。

**PE** 的桌面通常会提供 [Windows 安装器](http://www.wepe.com.cn/ubook/installtool.html) ，可以定制安装过程和安装内容，鉴于界面比较简陋且操作相对复杂，我还是选择原汁原味的镜像安装程序。这次特意试了下 [使用 Dism++ 安装系统](https://www.chuyu.me/zh-Hans/Document.html?file=Best/使用Dism++安装系统.md) ，真的很方便。**Dism++** 的 **释放映像** 功能不仅可以用于还原我们的备份，还可以直接安装官方原版系统镜像，重启后就直接进入 **海内存知己...** 的初始化设置界面了，很适合给空硬盘 **预装系统**（ 安装前先手动分区 ）。

> 插句题外话，自从我学会装系统以后一直是用 **PE** 的，这次为了写文章才特地去查了下有什么新的方法，结果遍地都是捧 **微软官方工具** 而踩 **PE** 的，**PE** 好像过街老鼠一样，不知怎么的还和盗版扯上了关系。
>
> **工具好坏取决于使用它的人！！！**

除了上面两种方式外，还有一种 **极不推荐** 的上个世纪比较流行的 **Ghost 大法** ，这种方式本质上就是对系统进行 **备份还原** ，优点就是很便利。这个技术本身是没问题的，但能下载到的镜像通常美曰其名为 "优化" 、"绿色" 、"精简" ，而实际上会删除了一些重要的系统组件，更恶劣的还会 **捆绑垃圾软件** 、 **暗藏木马** ，有非常大的安全隐患。为了日常使用没问题，还是建议通过官方原版镜像安装全新的系统，软件和配置再慢慢调校，不要嫌麻烦。资深用户倒是可以用这种方式 **备份系统** 、**定制系统** 、**大批量安装** ，小白建议绕坑。

我在 **B 站** 上随便找了个比较详细的安装视频，两种方式的都有，懒得看图文就直接看视频吧。（ [传送门](https://www.bilibili.com/video/av77344372) ）

### 准备工作

---

> 下文使用的方案：在 **微 PE** 下使用 **官方镜像** 将系统安装到新买的 **空白硬盘** 上。

#### 下载网卡驱动（ 可选 ）

如果你的电脑能接上网线则可以跳过这一步，**win10** 自带通用的 **有线网卡** 驱动（ 有些笔记本的 **无线网卡** 可能也支持 **"免驱"** ），插网线即可直接联网。如果需要连接无线网络，你就需要提前去整机品牌或者主板的官网下载 **无线网卡** 的驱动，否则安装完系统才发现连不了网就尴尬了。

这里分享一个笔记本共享无线网络给台式机的方法（ [参考](https://blog.csdn.net/weixin_44022219/article/details/85223886) ）：

> 笔记本连上无线后，打开 **网络和共享中心** -> **更改适配器设置**
>
> **桥接：**
>
> 同时选中 **有线网卡** 和 **无线网卡** 后鼠标右键点击 **桥接** ，用一根网线直连笔记本和台式机，过一会儿台式机就能直接联网了。（ 长时间无法识别可能是无法自动获取 **IP** ）
>
> **共享：**
>
> 右键 **无线网卡** -> **属性** -> **共享** -> 勾选 " **允许其他网络用户通过此计算机的 Internet 连接来连接** " 。没有识别可以尝试拔掉网线重连。

#### 下载官方原版镜像

##### [MSDN, 我告诉你](https://msdn.itellyou.cn)

一个个人维护的非微软官方网站，但几乎能下载到各个主要版本的 **Windows 镜像** ，也是大家都比较推荐的一个良心网站。要说缺点的话就是下载方式是 [ed2k](https://baike.baidu.com/item/ed2k) 协议的，国内支持的软件估计只有垃圾迅雷了吧（ [闪电下载](http://bbs.xiaokanba.com/download.html) 其实也可以 ）。目前这个网站 [新版](https://next.itellyou.cn) 开放测试，支持 [BT 下载](https://baike.baidu.com/item/BT下载) ，可以使用 [Xdown](http://xdown.org) 这个工具进行下载，当然 [P2P 技术](https://baike.baidu.com/item/对等网络) 嘛，下载速度就时快时慢了，看缘分。

下载完成后推荐使用 [iHasher](https://share.weiyun.com/5gtDK6E) 进行 [SHA1](https://baike.baidu.com/item/SHA-1) 校验，即使是别处下载的镜像也可以在线对比获取版本信息。

![iHasher 校验](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Windows%20系统安装/imgs/iHasher_verify.png)

##### media creation tool

官方工具不仅用于制作启动盘，还可以只下载 **ISO 镜像** （ 仅包含有限版本 ），速度非常快，我 **100 M** 的电信宽带基本上能跑满 **10 MB/s** ，等待十几分钟即可。

[Windows 11 官网页面](https://www.microsoft.com/software-download/windows11) 直接提供了下载链接（ 包含完整版本 ），借助 [IDM](http://www.internetdownloadmanager.com) + **HTTP 代理** 下载速度也很快。

> **MediaCreationTool** 的下载目录为 `%SystemDrive%\ESD\Download` ，每次执行都会重新下载临时文件，即使把中间产物 `installx64.esd` 备份后再直接放到这个路径下还是会重新下载。`installx64.esd` 的后加工产物临时文件在 `%SystemDrive%\$Windows.~WS\Sources` 目录下，安装完成后会自动清除。

##### [微 PE 下载页](http://www.wepe.com.cn/download.html)

提供最新版系统的下载链接。

##### 下载 ARM 镜像的方法

我在 [Lumia 950 XL 刷入 Windows 10 ARM 体验](https://www.jianshu.com/p/1a336b3053f4) 一文中用到过的，使用脚本下载文件并转换为 **ISO 镜像** ，不过可能会无法下载。

**不要去那些乱七八糟的下载站下载。**

#### 下载 [微 PE 安装包](http://www.wepe.com.cn/download.html) 并安装到 U 盘

打开 **微 PE 安装包** 选择 **安装 PE 到 U 盘** ，使用默认的 **方案一：全能三分区方式** 即可，这种方案兼容大部分新旧电脑。（ [微 PE 官方教程](http://www.wepe.com.cn/ubook) ）

![微 PE - 安装主界面](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Windows%20系统安装/imgs/wepe_1.png)

![微 PE - 安装配置项](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Windows%20系统安装/imgs/wepe_2.png)

安装完成后 **U 盘** 会被重新分区并格式化（ 注意提前备份 **U 盘** 中原来的数据 ），资源管理器下可见一个 **数据分区** ，可当作普通的 **U 盘** 分区来存储数据。推荐使用 **32 GB** 及以上容量的、读取速度超过 **100 MB/s** 的 **U 盘** ，可以将几个不同版本（ **XP** 、 **win7** 、 **win8** 、 **win10** 、 **win11** 、 **32 位** 、 **64 位** ）的镜像和其他常用的软件、驱动复制到 **数据分区** 中，这样就成了一个 **万能装机工具盘** ，走到哪装到哪 。

#### 将 U 盘插入要装系统的电脑中并重启进入 PE

一般在空硬盘上装系统的话，插入 **U 盘** 开机即可自动进入 **PE** ，无需额外操作了。

如果磁盘中原先已经装有系统 ，则需要在开机启动时按 **F1** ~ **F12** 以及 **DEL** 中的某个键以打开 **启动菜单**，选择从 **U 盘** 启动，或者进入 **BIOS** 后将 **U 盘** 的 **启动顺序** 调到最前面。

> 各个品牌的快捷键不同，一般启动画面下方有文字提示（ 可以录像看回放 ），或者自行去查询。（ [参考](http://www.wepe.com.cn/ubook/bootpe.html#_1-2-如何进入pe系统) ）
>
> 至于在 **启动顺序菜单** 中如何区分磁盘，一般看品牌名和容量就好了，支持 **UEFI** 启动的会以 **UEFI** 开头标识。
>
> 如果在 **BIOS** 中修改了 **启动顺序** ，安装重启的时候记得拔 **U 盘** 或者把 **启动顺序** 改回去。

进入 **PE** 后和操作正常的 **Windows 系统** 大体上没什么区别，打开 **资源管理器** ，找到要安装的 **镜像文件** ，双击即可打开。

> 印象中应该是从 **Windows 8** 起就原生支持打开镜像文件（ 即装载到虚拟光驱中 ），不需要再安装第三方软件，不需要解压缩。

根目录中的 `setup.exe` 就是安装文件入口，不过我一般更习惯打开 `sources\setup.exe` 以跳过一些不必要的联机检查。

![默认打开方式 - 联机检查](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Windows%20系统安装/imgs/iso_online_check.png)

### 正式安装系统

---

除了升级安装特殊一点，一般自定义安装都会进入到下面的步骤，现在才真正开始安装系统。

##### 主界面

![安装 - 0](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Windows%20系统安装/imgs/iso_0.png)

![安装 - 1](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Windows%20系统安装/imgs/iso_1.png)

##### 通常选择我没有产品密钥，之后系统安装完成了再进行激活

> 如果你使用的是链接到 **Microsoft** 帐户的数字许可证，则可以通过选择“我没有产品密钥”来运行安装程序并跳过产品密钥选项。 当你使用 **Microsoft** 帐户登录并连接到 **Internet** 时，则会被激活。

![安装 - 2](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Windows%20系统安装/imgs/iso_2.png)

##### 选择要安装的版本

**家庭版** 在功能上有所阉割，一般选择 **专业版** 即可，至于 **教育版** 和 **工作站版** 非专业用户也感觉不出什么区别。

**当然，还是要取决于你的密钥或数字证书能激活哪个版本的系统，不能激活也是白瞎。**

![安装 - 3](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Windows%20系统安装/imgs/iso_3.png)

##### 勾选我接受许可条款后点击下一步

> 勾选快捷键 - 空格键

![安装 - 4](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Windows%20系统安装/imgs/iso_4.png)

##### 选择自定义：仅安装 Windows（高级）

至于升级选项我自己是从来没用过的，升级后数据和设置能保留到什么程度不得而知，手动备份重要的用户数据还是很有必要的。

![安装 - 5](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Windows%20系统安装/imgs/iso_5.png)

##### 选择用于安装系统的分区

点击 **下一步** 安装程序会自动进行分区，但新硬盘最好还是使用 [分区工具](#分区工具) 进行 **快速分区** 。

![安装 - 6](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Windows%20系统安装/imgs/iso_6.png)

> 如果是在选中分区上重装系统的话，建议先格式化对应分区，不然系统安装完成后还是要去手动清理 **Windows.old** 。

> 另外，看了很多视频都喜欢在这一步删除分区，在这么简单的界面下执行这个高危的操作我是不认同的，建议到 **PE** 中确认分区内容后再用 **分区工具** 进行重新分区。
>
> 怕选错磁盘可以先卸载不相关的磁盘：磁盘管理 -> 选中磁盘右键属性 -> 驱动程序 -> 卸载设备。

##### 一般无法继续安装系统的几类错误

- 磁盘分区空间不足

  一般推荐分区大小至少 **60 GB** ，有些软件只能安装到系统盘（ 比如 **Visual Studio** ），初始空间分配太小了后面再调整就麻烦了，微信聊天记录比较多（ 我曾经见过微信数据超过 **60 GB** 的 ... ）的朋友可以再适当加大一些。

  自从加装至 **48 G** 内存后忽然发现 **C** 盘快满了，其中 **C:\hiberfil.sys** 这个文件占了 **20 G** ，一查是休眠功能用到的，以前内存小的时候不打紧，现在内存大了就跟着膨胀了。

  **解决办法：平时关闭休眠功能，需要的时候再打开。**

  ```powershell
  # 需要管理员权限，可以建两个快捷方式快速执行
  # 禁用休眠
  powercfg -h off

  # 启用休眠
  powercfg -h on
  ```

  ![错误 - 磁盘分区空间不足](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Windows%20系统安装/imgs/iso_error_1.png)

- 磁盘分区格式不对（ [参考](https://answers.microsoft.com/zh-hans/windows/forum/all/win10安装出现问/d724cf43-b1c8-4379-ac33-788af0b74003) ）

  ![错误 - 磁盘分区格式不对](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Windows%20系统安装/imgs/iso_error_2.png)

  **磁盘分区格式** 和 **BIOS 启动模式** 是有对应关系的，通常是 [**MBR + Legacy**](https://docs.microsoft.com/windows-hardware/manufacture/desktop/configure-biosmbr-based-hard-drive-partitions) 和 [**GPT + UEFI**](https://docs.microsoft.com/windows-hardware/manufacture/desktop/configure-uefigpt-based-hard-drive-partitions) 两种组合，显而易见要解决这个错误无非就是修改 **磁盘分区格式** 或者 **BIOS 启动模式** ，更多详情见 [文末](#BIOS-启动模式) 。

  > 一般重装系统的话还是建议修改 **BIOS 启动模式** 而不是 **磁盘分区格式** ，以避免不必要的数据损坏。新装还是推荐 **GPT + UEFI** 的组合，毕竟这才是未来的趋势。

- 缺少 **ESP/MSR 分区**

  ![错误 - 缺少 ESP/MSR 分区](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Windows%20系统安装/imgs/iso_error_3.png)

  这种情况是我在把 **MBR** 硬盘简单转为 **GPT** 后出现的，原因是缺少 **ESP/MSR 分区** 。

  **解决办法：** 磁盘先释放出一部分 **未使用空间** （ 一般 **300 MB** 够用了 ），刷新当前界面即可继续下一步，安装程序会自动建立或者修复 **ESP/MSR 分区** 。

- 无法安装到移动硬盘

  ![错误 - 无法安装到移动硬盘](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Windows%20系统安装/imgs/iso_error_4.png)

- 以前装机的时候还遇到过其他问题，一时想不起来了，以后遇到了再补充。

##### 拷贝文件和安装

![安装 - 7](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Windows%20系统安装/imgs/iso_7.png)

> `正在复制 Windows 文件` 在 **Windows** 下还要花点时间，在 **PE** 下秒过（ 应该是省去了拷贝到临时目录的步骤 ）。

之后会自动重启几遍进入初始化设置界面（ **海内存知己，天涯若比邻** ），这里用时一般 **几分钟** 到 **几小时** 不等，取决于你硬盘的读写速度。

![海内存知己，天涯若比邻](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Windows%20系统安装/imgs/windows_setup.png)

后面就没什么好讲的，一步一步设置就好了，**请坐和放宽** 。建议这里插网线并登录 **微软帐户** ，之后直接自动下载驱动一步到位。

> **注意**
>
> 如果之前在 **BIOS** 中修改了 **启动顺序** ，重启的时候记得拔 **U 盘** 或者把 **启动顺序** 改回去。

### 系统初始化工作

---

#### 激活系统

前面安装系统的时候我们没有输入密钥，因此安装完的系统是未激活的，未激活状态下很多功能都是受限制的。至于激活的方式网上一大堆，有免费的也有收费的，我就不多介绍了。

![激活 Windows](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Windows%20系统安装/imgs/activation_1.png)

根据官方文档的描述，理论上应该是如果 [微软帐户](https://account.microsoft.com) 绑定了 **数字许可证** 的话，即使更换了电脑也能直接激活 **Windows 10** ，但实际上我的帐户（ 在 **Windows 10 早期开发者预览版** 的时候注册的 ）换电脑后并不能激活。

- [激活 Windows](https://support.microsoft.com/windows/activate-windows-c39005d4-95ee-b91e-b399-2820fda32227)
- [在更换硬件后重新激活 Windows](https://support.microsoft.com/windows/reactivating-windows-after-a-hardware-change-2c0e962a-f04c-145b-6ead-fb3fc72b6665)

![Windows 未激活](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Windows%20系统安装/imgs/activation_2.png)

![无法激活 Windows](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Windows%20系统安装/imgs/activation_3.png)

#### 驱动安装

只要联网，**Windows 10** 就会自动通过 **Windows 更新** 来安装驱动程序，**不需要再安装 ~~第三方的驱动管理软件~~（ 流氓软件 ）**。自动安装的驱动已经能满足大部分需求了，一些特定硬件（ 比如主板、显卡、网卡、声卡、蓝牙 ）无法正常使用或者性能受限可以通过厂商提供的 **官方途径** 获取驱动进行安装。

> **注意**
>
> 非必要不要随意安装驱动程序，尤其是那些不兼容的驱动，严重的可能造成蓝屏开不了机。

#### 资源管理器设置

##### 打开文件资源管理器时打开此电脑而不是快速访问

![资源管理器设置](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Windows%20系统安装/imgs/config_explorer.png)

##### 启用预览窗格

直接在窗口右侧预览文件而无需打开。

##### 显示文件扩展名和隐藏的项目（ 可选 ）

##### 在快速访问中不显示最近访问的内容

保护隐私。

![软媒魔方 - 清理隐私](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Windows%20系统安装/imgs/PCMaster_cleanmaster.png)

##### 资源管理器添加常用右键菜单

![软媒魔方 - 设置大师](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Windows%20系统安装/imgs/PCMaster_winmaster.png)

##### 删除文件时显示确认对话框

![回收站属性设置](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Windows%20系统安装/imgs/RecycleBin.png)

##### [Quick Look](https://github.com/QL-Win/QuickLook)

像 **macOS** 一样通过空格键预览文件内容，[插件](https://github.com/QL-Win/QuickLook/wiki/Available-Plugins) ：

- [ApkViewer](https://github.com/canheo136/QuickLook.Plugin.ApkViewer) - 预览 **安卓 APK** 。
- [OfficeViewer-Native](https://github.com/QL-Win/QuickLook.Plugin.OfficeViewer-Native) - 预览 **Office 文件** 。

##### 额外的文件预览

- [SVG Viewer Extension for Windows Explorer](https://github.com/tibold/svg-explorer-extension) - 安装完无需设置即可自动支持 **SVG** 预览。

- [PowerToys](https://github.com/microsoft/PowerToys) - 支持 **Markdown** 、 **SVG** 和 **PDF** 。

  ![PowerToys - 设置文件预览](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Windows%20系统安装/imgs/PowerToys.png)

#### 美化

![桌面整体效果](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Windows%20系统安装/imgs/desktop_final.jpg)

##### 壁纸设置

> 桌面右键 > 个性化

- [必应壁纸](https://www.microsoft.com/bing/bing-wallpaper) - 将桌面壁纸同步为 [必应搜索](https://bing.com) 网站的每日壁纸。

- [Wallpaper Engine](https://store.steampowered.com/app/431960/Wallpaper_Engine) - 酷炫的壁纸效果，可交互，资源丰富。（ 比较吃显卡 ）

[删除 Win10 背景图片（壁纸）历史记录](https://answers.microsoft.com/zh-hans/windows/forum/all/answers/ff6e02c1-b329-4faf-99ae-e2fd1b65fc6f)

```ini
HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\Wallpapers
```

##### 桌面图标设置

![设置桌面图标](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Windows%20系统安装/imgs/desktop_icons.png)

##### [ModernFlyouts](https://github.com/ModernFlyouts-Community/ModernFlyouts)

用于将旧的 **Windows 8 Metro** 风格弹窗覆盖为 **Fluent Design** 风格弹窗。

![ModernFlyouts](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Windows%20系统安装/imgs/ModernFlyouts.png)

##### [任务栏图标居中](https://jingyan.baidu.com/article/d8072ac4689a1dec95cefdfd.html)

个人觉得 **仿 Dock 栏** 和 **Windows** 风格很不搭，显得不伦不类，简单居中图标就行了，而且 [Windows 11](https://www.microsoft.com/windows/windows-11) 默认支持居中了。

##### 隐藏默认的任务栏图标

![任务栏 - 图标](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Windows%20系统安装/imgs/taskbar_icons.png)

##### 添加工具栏

我桌面上不放 **快捷方式** ，所有 **常用软件** 的 **快捷方式** 统一放到一个目录下，再添加到 **任务栏** 的 **工具栏** 中，效果类似精简版的旧版开始菜单。

![任务栏 - 工具栏](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Windows%20系统安装/imgs/taskbar_toolbar.png)

##### 透明任务栏

曾经用过 **StartIsBack** ，功能也挺强大，但和系统会产生冲突就弃用了。

最新找到一个新的工具 [TranslucentTB](https://github.com/TranslucentTB/TranslucentTB) ，能设置透明，但桌面壁纸要好好选，不然更丑。

##### [XMeters](https://entropy6.com/xmeters)

任务栏监控。

![xmeters](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Windows%20系统安装/imgs/xmeters.png)

##### 其他美化资源

- [Windows 10 深度美化有什么技巧?](https://www.zhihu.com/question/39002007)
- [致美化 - 最专业的桌面美化交流平台](https://zhutix.com)

#### 其他设置

##### UAC 提示级别设置

![搜索 - UAC](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Windows%20系统安装/imgs/uac.png)

![UAC 设置](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Windows%20系统安装/imgs/uac2.png)

##### 默认程序设置

- 图片 - **2345 看图王** `去广告版` ( **不要去官网下载，不要更新** )

  > 广告确实很烦人但找不到比它更好用又好看的看图软件了。

- 压缩文件 - [Bandizip](http://www.bandisoft.com) `最后无广告版本 ( 6.25 )`

  > **好压** 虽然好用但广告禁不掉就弃用了，**Bandizip** 的话界面过于简陋，看图标一时也反应不过来是压缩包，凑合用吧。

- 音视频 - [PotPlayer](https://daumpotplayer.com/download)

- 文本 - [Sublime Text](https://www.sublimetext.com)

  > 轻量级的文本编辑器，可以用来记一些草稿。

  可以将下面的 **批处理脚本** （ 另存为 **ANSI 编码** ）放到 **安装目录** 下来注册到 **右键菜单** ：

  ```shell
  :: Sublime Text 注册到右键菜单
  @echo off

  net session >nul 2>&1 || ( echo 请使用右键管理员身份运行！&& pause >nul )

  :: 显示名称
  set DisplayName=Sublime Text

  :: 删除文件右键菜单
  call :unregister "HKEY_CLASSES_ROOT\*\shell"

  :: 删除选中文件夹右键菜单
  call :unregister "HKEY_CLASSES_ROOT\Directory\shell"

  :: 删除当前文件夹右键菜单
  call :unregister "HKEY_CLASSES_ROOT\Directory\Background\shell"

  :: 选项 /u 表示清除菜单
  if "%~1" == "/u" goto :eof

  :: 注册文件右键菜单
  call :register "HKEY_CLASSES_ROOT\*\shell"

  :: 注册选中文件夹右键菜单
  call :register "HKEY_CLASSES_ROOT\Directory\shell"

  :: 注册当前文件夹右键菜单
  call :register "HKEY_CLASSES_ROOT\Directory\Background\shell" "%%%%V"

  goto :eof

  :: 添加注册表项
  :register

  set KeyName=%~1\%DisplayName%

  :: 执行文件路径
  set Exec=%~dp0sublime_text.exe

  :: 设置菜单名称
  reg add "%KeyName%" /ve /d "使用 %DisplayName% 打开" >nul 2>&1

  :: 设置菜单图标
  reg add "%KeyName%" /v Icon /d "\"%Exec%\"" >nul 2>&1

  if "%~2" == "" ( set "p=%%1" ) else ( set "p=%~2" )

  :: 设置菜单执行的命令
  reg add "%KeyName%\Command" /ve /d "\"%Exec%\" \"%p%\"" >nul 2>&1

  goto :eof

  :: 删除已有的注册表项
  :unregister

  set KeyName=%~1\%DisplayName%

  reg delete "%KeyName%" /f >nul 2>&1

  goto :eof
  ```

  ![Sublime Text - 注册右键菜单](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Windows%20系统安装/imgs/sublime.png)

  > 批处理创建一个快捷方式并加上选项 `/u` 即可快捷删除右键菜单。

##### 常用软件修复

**90%** 的软件在系统重装后不需要重新安装，到安装目录下找到执行文件打开即可，最好还是找一个地方统一存放快捷方式。

有的还需要做额外的修复：

- 进入软件的设置，重新关联文件格式并修复右键菜单。
- 添加必要的环境变量。
- 安装 [微软常用运行库合集](https://www.haah.net/archives/2412.html) 可以解决大部分的 **DLL 缺失错误** 。

**QQ** 的话比较恶心，以前只要安装 **微软常用运行库合集** 就可以修复了，之后又需要备份 **QQ 安全组件（ QQProtect ）** ，再到现在不得不重装。不过保存好 **个人文件夹** 即使重装了数据应该也不会丢失。

微软自家的 [Visual Studio](https://visualstudio.microsoft.com) 和 [Office](https://www.microsoft.com/microsoft-365/microsoft-office) 尽管提供了自定义安装路径的选项，但还是会和系统文件做 **PY 交易** ，做不到绿色纯净，还不如无脑安装到系统盘，重装系统后再重装它们。

> 推荐使用 [Office Tool Plus](https://otp.landian.vip) 下载安装纯净的 **Office** ，同时也支持对 **Office** 进行管理。

##### 环境变量设置

![搜索 - 环境变量](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Windows%20系统安装/imgs/environment.png)

最好将自己设置的环境变量都放在 **用户变量** 下，使 **系统变量** 保持干净，需要备份的时候直接导出 **用户变量** 即可。（ [参考](https://my.oschina.net/dylan2hdf/blog/1543368) ）

```shell
reg export HKEY_CURRENT_USER\Environment D:\user_environment.reg
```

**非 UI 界面** 下修改 **环境变量** 后立即生效方法：

**任务管理器** 里找到 **资源管理器** ，右键 **重新启动** 。也可以执行下面的脚本：

```shell
tskill explorer
```

##### 开机启动设置

- 将快捷方式复制到开始菜单的启动项中

  > `win + R` > `shell:startup`

  ![「开始」菜单 - 程序 - 启动](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Windows%20系统安装/imgs/startmenu_startup.png)

  > **注意**
  >
  > 需要 **管理员权限** 运行的程序放这里是无法开机启动的。

- [**计划任务** 中添加任务](https://anyesu.github.io/blog/articles/8#WSL%20开机启动)

  支持更高级的开机启动配置。

- [注册为 **Windows 服务**](https://zhuanlan.zhihu.com/p/93808282)

- [通过 **组策略** 设置](https://blog.csdn.net/qq_38684504/article/details/88255081)

##### 输入法设置

我以前用着最趁手的是 **QQ 拼音** ，但随着这些输入法越做越 **流氓** 就弃用了，改用系统自带的。自带的 **微软输入法** 现在也挺好用的，功能也挺强大的，唯一要做的就是 **养词库** 。

> 有必要的话可以把 **全/半角切换** 和 **中/英文标点切换** 这类快捷键禁用了， **全/半角状态** 在不经意间换来换去会很混乱（ 比如显示 **全角的英文** ， **半角的中文符号** ）。

##### 电源选项 - 快速启动

> 以前的版本要先禁用掉重启后再启用才会真正生效，现在新版不知道还要不要这样设置。

##### 电源选项 - 电源计划

- [PowerSwitcher](https://github.com/petrroll/PowerSwitcher) - 快速切换电源计划的小工具

新版系统应该只有一个 **平衡模式** ，其他的需要自己手动创建。

![创建电源计划](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Windows%20系统安装/imgs/power_plan_new.png)

**卓越性能模式** （ 没发现什么特别之处，图个新鲜 ）通过下面的 **powershell** 命令创建：

```powershell
powercfg -duplicatescheme e9a42b02-d5df-448d-aa00-03f14749eb61
```

**高性能模式** 会强制 **CPU** 运行在全核睿频的频率上，而 **平衡模式** 会自动调节频率以降低功耗，一般轻度办公开 **平衡模式** 就够了，省电发热量也会少一点。

**最大最小处理器状态** ：最大值小于最小值时就固定为最小值，针对 **Intel CPU** ，有效最大值只要低于 **100%** 就不再 **睿频** ，最多维持在基准频率上。（ [参考](https://www.zhihu.com/question/349487250/answer/848139474) ）

- [CPU 为什么会有高频低负载的状态？](https://www.zhihu.com/question/305248464)
- [电脑开着高性能模式好还是平衡模式好？](https://www.zhihu.com/question/39485925)

##### 其他优化

一般用 [电脑管家](https://guanjia.qq.com) 的电脑加速就够了，也可以配合 [软媒魔方](https://mofang.ruanmei.com) 一起。

![电脑管家 - 优化](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Windows%20系统安装/imgs/QQPCMgr.png)

![软媒魔方 - 优化大师](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Windows%20系统安装/imgs/PCMaster_boostmaster.png)

杀毒软件这块两极分化比较严重，有的人选择 **裸奔** ，有的人选择 **360 全家桶** 、**X 大师** 等等一股脑都装上。我的选择是 **电脑管家** ，垃圾清理、软件卸载、弹窗拦截这些功能还是比较良心的。至于自带的 **Windows Defender** 其实也不错，但扫描频率有点高，而且容易误报，还是不适合我们的国情。

**这块主要就是些繁琐的配置，最好是按自己的使用习惯列一个清单一步一步操作。每次重装系统后都要重复配置这些，总是会丢三落四的，我曾经想过写一个小工具去 "一键设置" ，不过还是放弃了，花几天时间做一个工具结果只省下来几分钟的时间，这个投入产出太不划算了。而且需求总是在变化的，有时候挑剔，什么细节都要优化，有时候懒，装完系统什么都懒得改，所以通用性很难做，Dism++ 的优化功能可以凑合用着。**

![Dism++ - 优化](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Windows%20系统安装/imgs/Dism++_optimization.png)

### 扩展阅读

---

#### 关于 Windows 11

**2021-10-05** 微软正式发布 [Windows 11](https://www.microsoft.com/windows/windows-11) ，但还是不怎么稳定， 主力电脑不建议升级（ **主要考虑到会乱删文件** ），可以用其他设备尝鲜。

我的新电脑在 **Windows 10** 下已经通过了 [电脑健康状况检查应用](https://www.microsoft.com/windows/windows-11#pchealthcheck) 的检测，但在 **PE** 下还是不能直接安装（ ~~可能是需要对应的 **win11 PE**~~ ， [微 PE V2.2 已修复这个问题](https://www.wepe.com.cn/update/update2.2.html) ），可以用 **Dism++** 直接释放镜像来绕过检测。至于实际不满足条件的老设备还是不建议升级，毕竟官方不再保证兼容了。

![无法安装 Windows 11](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Windows%20系统安装/imgs/win11_can_not_install.png)

如果你的电脑上目前已经激活了 **Windows 10** ，那么可以直接激活 **Windows 11** 。

![Windows 11 激活](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Windows%20系统安装/imgs/activation_win11.png)

#### 在 Mac 上重新安装 Windows

最近拿到一台 [MacBookPro9,2](https://support.apple.com/kb/SP649) （ `OS X 10.8.4` ）需要重装系统（ **Windows 10** ），原先是通过 **Boot Camp** 安装的 **Windows 7** ，开机要一半天，进系统后还卡得不行，把各种流氓软件卸载完瞬间流畅了。

由于我也是第一次在苹果机子上装系统，安装方式还是选择最稳妥的镜像升级方式，临时安装了 **2345 好压** 把系统镜像加载到 **虚拟光驱** 中，打开安装主程序（ 需要等待一段时间才会显示界面 ）默认也只有升级安装的选项（ 自定义方式可能会打不开 ），一直点下一步就完事了。因为用的是老旧的机械硬盘，安装速度非常慢，过程和普通电脑没什么区别。中间一次重启转圈圈的时候突然卡住了，风扇在狂转，等了一小时没反应只好强制关机了，重启后还能继续安装。

**FAQ**

##### 在新 Mac 上安装 Windows

我没试过，可以看下官方文档（ [Windows 7](https://support.apple.com/HT205016) / [Windows 10](https://support.apple.com/HT201468) ），关键是分区，分完区之后的安装应该简单的。

##### 在 Windows 和 macOS 之间切换

重新启动，然后在启动过程中按住 `Option` （ 或 `Alt` ）⌥ 键，即可 [在 Windows 和 macOS 之间切换](https://support.apple.com/HT208123) 。

##### 未能找到 macOS 启动卷宗的位置

重装完 **Windows** 默认不识别 **macOS** 所在的分区（ 重装前还是可见的 ），所以通过 **Boot Camp** 切换系统会报这个错误。应该是有方法识别的，但意义不大而且容易误操作分区，还是通过 `Option` 方法省事。

##### 开机会有咚的一声。

重新进 **macOS** 静音即可。

##### 保持 Windows 默认启动

进入 **macOS** 后重启默认还是会启动 **macOS** ，点击左上角 **苹果菜单** > **系统偏好设置** > **启动磁盘** ，选中想要使用的磁盘的图标，然后 **重新启动** 。（ [参考](https://support.apple.com/guide/mac-help/mchlp1034/mac) ）

如果左下角的锁被锁定，点击锁按钮以 [解锁偏好设置面板](https://support.apple.com/guide/mac-help/aside/glosf17cc995) 。

##### 驱动安装

系统安装完最基本的通用驱动（ 包括无线网卡 ）都有了，需要通过 **Boot Camp** 安装其他特定驱动以适配我们的机器。

> **Boot Camp** 有两个概念，一个是在 **Mac** 下用于安装 **Windows** 的安装器，中文名叫 **启动转换助理** ，另一个则是由 **Apple** 提供的最新 **Windows** 支持软件（ 驱动程序 ），包括 `F1 - F12` 功能快捷键、触摸板、显卡、声卡、网卡等驱动。

本想从 [苹果官网下载](https://support.apple.com/downloads/Boot-Camp) ，但发现很零碎， [兼容性](https://xitongtiankong.com/archives/212) 也对不上，还是回 **macOS** 通过 **转换助理** 下载（ [参考](https://support.apple.com/HT204923) ）：只勾选 **从 Apple 下载最新的 Windows 支持软件** > 选择用于存储的 **U 盘** > 开始自动下载。

下载完成会添加下面的文件（ **6136** 版大概 **2.6 G** ）到 **U 盘** 中，应该不会清空 **U 盘** 不过最好还是备份下重要数据。

```ini
$WinPEDriver$（文件夹）
AutoUnattend.xml
BootCamp（文件夹）
```

回到 **Windows** 打开 **BootCamp\Setup.exe** 就会自动安装了，安装完需要重启。

**下载时遇到的一些问题：**

隔几个小时偶尔会提示 **下载 Windows 7 支持软件** 。

![bootcamp_win7](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Windows%20系统安装/imgs/bootcamp_win7.png)

点击 **继续** 会开始下载 **Windows 7 支持软件** ，而点击 **取消** 退出后重新开始就能下载 **Windows 10 支持软件** 了。

还可能会遇到 **Windows 支持软件未能存储到所选文件夹** 错误。

![bootcamp_save_error](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Windows%20系统安装/imgs/bootcamp_save_error.png)

这个问题是我 **第二次** 下载时遇到的，本以为是个偶然事件结果重试了几次发现都不行，看意思应该是数据写不进去，想起来 **U 盘** 之前按官方文档操作抹成 **FAT** 文件系统了，然而换了其他几种格式也还是不行。无意间打开 **磁盘工具** ，发现多出了好几个 **WindowsSupport.dmg** 文件，路径是：

```shell
/Library/Application Support/BootCamp/WindowsSupport.dmg
```

![bootcamp_cache](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Windows%20系统安装/imgs/bootcamp_cache.png)

这应该就是下载好的源文件，报错只是无法解压到 **U 盘** 而已，右键 **在 Finder 中显示** 后直接把压缩文件拷到 **U 盘** 里就好了（ 也可以双击打开把里面的文件复制出来 ）。利用这一点在开始下载后直接拔掉 **U 盘** 就能仅下载而不解压了。

经过反复测试，发现和抹掉后缺省的分区名 **UNTITLED** 有关系，这个名称和另一个 **Windows** 的 **NTFS** 分区 **重名** 了（ 不区分大小写 ），换成其他不一样的名称就行了。估计是按名称查找所选择的分区，内置磁盘的优先级更高一点，而 **NTFS** 只读，**FAT** 和 **exFAT** 才可写入。（ 同理上图中的 **UNTITLED 1** 和 **BOOTCAMP** 也一样不行 ）

##### 触摸板不丝滑

默认情况下设置里是找不到触摸板选项的（ 触摸板虽然能用但很生硬 ），下载第三方的开源驱动（ [mac-precision-touchpad](https://github.com/imbushuo/mac-precision-touchpad) ）即可完美支持。

##### 散热

测试了下，默认情况风扇按最低转速运行， **CPU** 接近 **100 ℃** 时才会开始加速，温度降到 **80 ℃** 左右就恢复到最低转速了。这个策略很有问题，闲的时候积热处理不及时，忙的时候就会迅速升温，等开始降频了才反应过来全速散热，这样就导致频率不稳定而且风扇老是狂响的问题。

使用 [Macs Fan Control](https://crystalidea.com/macs-fan-control) 可以修改风扇自动调节的温度区间，起到提前散热以避免触碰温度墙的作用，我的设置是 `CPU PECI - 70℃~90℃` 并开机启动。风扇转速超过 **4000 RPM** 就有点吵了，需要合理调整区间兼顾散热和噪声。（ [参考](https://www.zhihu.com/question/33606243/answer/701436667) ）

风扇 **6200 RPM** 全速运行下 [AIDA64](https://www.aida64.com) 单烤 **CPU** 测试：

| i7-3520M@2.9G(3.6G) | 平衡模式            | 高性能模式          |
| ------------------- | ------------------- | ------------------- |
| max 100% 空载       | 1.2G 54℃            | 2.1G~3.4G 55℃       |
| max 100% 满载       | 2.7G~3.4G 100℃~104℃ | 2.7G~3.4G 100℃~104℃ |
| max 99% 空载        | 1.2G 51℃            | 2.1G~2.9G 56℃       |
| max 99% 满载        | 2.9G 95℃            | 2.9G 100℃           |

单烤 **FPU** 的话不管哪种模式很快都会降频到 **2 G** 以下并有持续下降的趋势。

日常轻度办公选择 **平衡模式** 就够用了，空闲时可以减少发热量，必要的话还可以设置 **最大处理器状态** 为 **99%** 以禁用 **睿频** 。有需要的时候再通过 **PowerSwitcher** 快速切换到 **高性能模式** 。

##### 开机慢

由于是机械硬盘，正常开机需要一分半，启用 **快速启动** 之后一般在 **30** 秒以内。

##### 通过 PE 安装系统

试了下引导菜单是能进 **PE** 的，官方启动盘也是可行的，虽然没有走完全部流程，理论上应该是可行的。名为 **Windows** 的是 **Legacy** 启动盘，名为 **EFI Boot** 的是 **UEFI** 启动盘。

![macOS 启动管理器](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Windows%20系统安装/imgs/macos_startup_manager.png)

从 **Windows** 重启进引导菜单可能会无法识别 **USB 启动盘** ，可以试试先进 **macOS** 后再重启。

#### 重装系统

修电脑的万金油方法，遇事不决就重装系统，干净纯粹的系统可以令人心情愉悦。

重装方法和新装系统类似就不多说了，重要的是对原有系统的数据进行备份：

##### 用户文件夹

```ini
%USERPROFILE%
```

常用的 **桌面** 、**下载** 、**我的文档** 等都在这个目录下，系统盘你需要备份的数据 **90%** （ 这个数值是我编的 ）都在这里了，你不清楚哪些有用哪些没用的话就整体备份，以后再慢慢整理。

##### 应用程序数据

```ini
%SystemDrive%\ProgramData
```

##### 注册表

很多的系统配置项和软件配置项都在这里了，全部导出大概 **500 MB** ，重装后想直接拿备份全量还原是不太现实的，毕竟还是有很多差异的，只是做参考比较还是可以的。

##### 已安装的软件

```ini
%SystemDrive%\Program Files (x86)
%SystemDrive%\Program Files
```

在这两个目录下找找有没有你认识的软件，适当地做备份。当然，如果你平时习惯比较好，不往系统盘装软件，直接跳过这步。

##### 开机启动项

如果你设置了自定义的开机启动项，记得去导出下配置。（ 同上文设置开机启动的方法 ）

##### VPN 配置文件

```ini
%AppData%\Microsoft\Network\Connections\Pbk\rasphone.pbk
```

##### hosts 文件

```ini
%windir%\System32\drivers\etc\hosts
```

> **注意**
>
> 上面的路径中用到了环境变量而不是写死的 **C** 盘路径，适用于安装在其他盘符下的系统。

#### 备份还原系统

用 **Dism++** 备份系统非常方便（ [文档](https://www.chuyu.me/zh-Hans/Document.html?file=Quickstart.md#备份系统) ），可以增量备份（ 一个备份文件保存多个版本 ），还可以还原到任意分区（ 还原后目标分区可能需要重新 [4K 对齐](https://www.disktool.cn/jiaocheng/align-check.html) ）。

系统安装完成并且各种琐碎的通用配置都弄好的时候建议做一次备份以备不时之需。系统挂了之后用还原比重装系统省事多了，经历过几次深有体会。

值得一提的是，由于还原后还是原来的帐户，文件权限这块毫无障碍，许多残留的配置可以直接使用，没清空的回收站也可以直接查看，不像重装后留下一堆不可访问的回收站目录。

##### 备份时机

- 系统安装完设置好帐户后就重启进 **PE** 进行第一次备份。

  此时的系统是最干净的。

- 安装适当的驱动后进行第二次备份（ 增量备份 ）。

  出于安全考虑，很长时间（ 可能是几个月 ）之后再还原备份的时候在线帐户需要重置 **PIN** ，如果无法联网就会比较尴尬，所以我一般会内置无线网卡驱动。另外像显卡驱动这样经常需要升级的就没必要内置进去了，太占体积了。

- 根据配置清单做一些通用的配置后进行第三次备份。

  以后需要还原系统主要是还原到这个版本，可以保证还原后能无缝投入使用。这些配置项（ 比如开发环境还有上文提到的优化、美化等内容 ）通常比较繁琐，东点点西点点很容易就忘了接下来要做什么，所以建议把必要的操作步骤记录下来，按顺序配置下来就很方便。

  如果经过一段时间使用后发现配置不太满意需要调整可以回到上一个版本重新配置。

##### 备份要点

- 每次备份前用软媒魔方清理下系统垃圾和操作记录，有必要还可以清理下注册表，另外 **Dism++** 备份的时候会忽略掉一些缓存目录（ **%TEMP%** ），就不需要手动清理了。这样可以减小备份的大小，也可以避免夹杂隐私数据。
- 像 **Office** 这样较大型的软件不建议内置到备份中，会导致备份大小显著增大，最好是还原系统再后一次性安装。
- 做备份的时候不要包含符号链接，因为还原后可能会失效，而且容易导致数据不一致，最好还是投入正式使用前再做 [目录迁移](#迁移系统目录) 。

目前 **Windows 11** 出来以后 **Windows 10** 基本算是走到头了，可以一个备份用到老。

#### 迁移系统目录

上面提到了重装系统需要做大量的数据备份工作，也很容易遗漏，我就想能不能把这些数据直接保存在系统盘之外，果然找到方法：

- [Windows 系统目录迁移: Users, Program Files, ProgramData](https://blog.csdn.net/hansel/article/details/50813797)
- [更改 Windows 7 用户文件夹默认位置的方法](http://blog.sina.com.cn/s/blog_61abdd600100t7m3.html)

迁移的思路：**原文件移动到新的目录，在原路径建立符号链接指向新路径** 。最妙的地方就是用到了 **符号链接** （ 类似快捷方式的效果 ），这样的话路径的修改对于系统和应用程序来说完全是无感的，按照原先的路径该怎么访问就怎么访问，完全不需要去修改 **注册表** 和 **环境变量** 、甚至是一些隐藏在其他地方的配置文件。

> 注册表中的配置有些地方用的是环境变量 `%SystemDrive%` 有些地方是写死的 `C:\` ，太多地方需要修改了，也很难改全。

迁移的好处：用户数据都迁走了，系统盘就只剩下系统自带的文件以及一些不得不安装在系统的软件，可以有效避免系统盘空间不足的问题。这样即使直接格式化掉系统盘都不会有太大问题，重装前只需导出一些零碎的配置即可，遗留的数据可以等以后有空了再慢慢整理。

缺点的话就是遗留的数据比较占空间，需要及时清理。

**这个方法我从 2016 年开始一直在使用，至今基本上没发现什么问题（ 前提是迁移没出错且系统能正常运行 ）。**

最近重装系统时发现了一个例外—— [英特尔核显驱动](https://www.intel.cn/content/www/cn/zh/download/19344/intel-graphics-windows-dch-drivers.html) ，安装了驱动之后系统设置就坏掉打不开了（ 如下图所示 ），反复重装系统都不行，最严重的时候任务栏、开始菜单、任务管理器、快捷键全崩了，只能看着桌面干瞪眼。经过排查发现是因为 **ProgramData** 目录做了符号链接，而核显驱动安装包自解压运行后把这个符号链接删掉了！！！之后系统会自动创建空的 **ProgramData** 目录，这就导致了系统内置应用都无法正常运行。

![系统设置损坏无法打开](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Windows%20系统安装/imgs/ms_settings_error.png)

**解决办法：**

出现这个问题的时候还有一个标志就是驱动安装程序会提示 **“未找到在当前设备上可安装的驱动程序”** 错误，关了重新打开安装包就能正常安装了，等驱动安装完进 **PE** 恢复这个符号链接即可修复。缺点就是会丢失出错之后的 **ProgramData** 数据（ 应该问题不大 ），我还是建议调整操作顺序： **安装这个驱动之后再做目录迁移** 。

##### 迁移步骤

- 进入 **PE 系统**

  系统运行过程中会占用一些文件，导致无法移动，而有些文件又有权限问题，在 **PE** 下操作就一了百了。另外，**直接用资源管理器复制粘贴会导致文件权限丢失** 。

- 将下面的脚本保存为批处理文件，直接打开即可。

  > **注意**
  >
  > [PE 下的盘符顺序和本地系统内很可能不同](http://www.wepe.com.cn/ubook/checktable.html#pe下的盘符顺序和本地系统内很可能不同) ，进行迁移前建议在 **PE** 下将迁移目录所在盘符修改为本地系统显示的盘符，系统所在的盘符可以不用修改。
  >
  > **修改方法：开始菜单 - 所有程序 - 分区工具 - 系统自带磁盘管理 - 找到分区右键更改驱动器号，盘符被占用就先替换成未使用的。**

  ```shell
  :: 系统目录迁移工具.bat
  :: 函数中可以用 setlocal , 用到 goto 的地方尽量避免使用 setlocal 以避免超出递归限制
  @echo off & setlocal enabledelayedexpansion

  call :get_bs bs
  call :from_config

  :::::::::::::::::::::::::::::::: 命令行参数 ::::::::::::::::::::::::::::::::

  :: 迁移后的目录 - 可拖到此脚本上打开
  if not "%~1" == "" call :folder_path %1 & set "dest=!folder_path!"

  :::::::::::::::::::::::::::::::: 命令行参数 ::::::::::::::::::::::::::::::::

  :::::::::::::::::::::::::::::::: 界面设置 ::::::::::::::::::::::::::::::::

  set "scriptver=1.0.0"
  set w_title=系统目录迁移工具@%scriptver% by anyesu
  set w_cols=80
  set w_lines=25
  title %w_title% & mode con cols=%w_cols% lines=%w_lines% & color 2F

  set w_padding=2
  setlocal
  set "_chars=                                                                                                    ===================================================================================================="
  set /a _pos = %w_cols% - %w_padding% * 2 + 1
  set "_pad=!_chars:~0,%w_padding%!"
  set "_line=%_pad%!_chars:~-%_pos%,-1!"
  endlocal & set "w_pad=%_pad%" & set "w_line=%_line%"

  :::::::::::::::::::::::::::::::: 界面设置 ::::::::::::::::::::::::::::::::

  :::::::::::::::::::::::::::::::: main ::::::::::::::::::::::::::::::::

  goto menu_main

  :::::::::::::::::::::::::::::::: main ::::::::::::::::::::::::::::::::

  :::::::::::::::::::::::::::::::: 界面 ::::::::::::::::::::::::::::::::

  :menu_dest_fun4
  explorer %dest%

  :: 迁移目录选择菜单
  :menu_main_fun4
  :menu_dest_confirm3
  :menu_dest_error
  :menu_dest
  cls
  call :println
  call :println "选择迁移目录"
  call :drawLine
  call :println "【 0.    返    回    】    【 1. 选 择 文 件 夹 】"
  call :println "【 2.  手 动 输 入   】    【 3. 打开资源管理器 】"
  call :drawLine

  set "_path="
  call :do_choice "" 0123
  goto menu_dest_fun%choice%

  :menu_dest_fun2
  call :select_folder && set "_path=!select_folder!" && goto dest_selected || goto menu_dest

  :menu_dest_fun3
  call :select_folder_manual & set "_path=!select_folder_manual!" & goto dest_selected

  :dest_selected
  call :folder_path "%_path%"
  set "_path=%folder_path%"
  if not defined _path call :printf "  请选择合法的文件夹路径" & pause >nul & goto menu_dest_error
  call :println
  call :do_choice "确认选择目录 %_path% (Y/N)? " 0yn
  goto menu_dest_confirm%choice%

  :menu_dest_confirm2
  set "dest=%_path%"
  call :save_config
  goto menu_main

  :: 系统盘符选择菜单
  :menu_main_fun1
  :menu_drives_confirm3
  :menu_drives
  cls
  call :get_all_drives drives
  set "_choices="
  call :println
  call :println "选择系统分区盘符"
  call :drawLine
  :: 每行显示个数
  set row_count=5
  setlocal
  set "_chars=                                                                                "
  set /a _width = %w_cols% / %row_count% - 8
  set /a _width_left = ( %w_cols% - %_width% * ( %row_count% - 1 ) - 8 * %row_count% ) / 2
  set "_pad=!_chars:~0,%_width%!"
  set "_pad_left=!_chars:~0,%_width_left%!"
  for /L %%i in (0, 1, %drives.ubound%) do (
      set /a col = %%i %% %row_count% + 1
      set "_choices=!_choices!!drives[%%i]!"
      if !col! == 1 if not %%i == 0 echo;
      if !col! == 1 ( call :printf "!_pad_left!" ) else call :printf "!_pad!"
      call :printf "【 !drives[%%i]!: 】"
      if !col! == %row_count% if not %%i == %drives.ubound% echo;
  )
  endlocal & set "_choices=%_choices%"
  call :println
  call :drawLine
  call :println "  【 0. 返    回 】  "
  call :println

  call :do_choice "" "0%_choices%"
  if %choice% == 1 goto menu_main

  set /a _selected = %choice% - 2
  set "_drive=!drives[%_selected%]!"
  call :get_drive_name %_drive%
  set "_driveDisplay=【 %_drive%: %get_drive_name% 】"

  call :do_choice "  确认选择分区%_driveDisplay% (Y/N)? " 0yn
  goto menu_drives_confirm%choice%

  :menu_drives_confirm2
  set "drive=%_drive%"
  call :save_config
  goto menu_main

  :: 主菜单
  :menu_dest_fun1
  :menu_dest_confirm1
  :menu_drives_confirm1
  :menu_main
  title %w_title%
  cls
  if not defined drive goto menu_main_drive_check
  call :get_drive_name %drive%
  if not defined get_drive_name ( set "drive=" ) else set "driveDisplay=%drive%: %get_drive_name%"
  :menu_main_drive_check
  if not defined drive set "driveDisplay=未选择"
  if defined dest ( set "destDisplay=%dest%" ) else set "destDisplay=未选择"
  call :println
  call :println "操作系统分区 ( 0. 修改 ) : 【 %driveDisplay% 】"
  call :println "迁移至目录   ( D. 修改 ) : 【 %destDisplay% 】"
  call :println 请输入序号选择功能：
  call :drawLine
  call :println "  【 1. 】 迁移 Users"
  call :println "  【 2. 】 迁移 ProgramData"
  call :println "  【 3. 】 迁移 Program Files 和 Program Files (x86)"
  call :drawLine
  call :println "  【 Z. 重启脚本 】      【 X. 关    闭 】  "
  call :choice "" 1230zxd

  set "_max=3"
  if not "%choice%" == "" if "%choice%" leq "%_max%" (
      set "_fun=:fun%choice%"
      call :do_choice "确认执行相应功能 (Y/N)? "
      if !choice! == 2 goto menu_main

      echo; & call :printpad
      if not defined drive call :printf "系统分区盘符未选择, " & goto menu_main_back
      if not defined dest call :printf "迁移目录未选择, " & goto menu_main_back
      call :check_is_pe || goto menu_main
      mode con lines=9001 2>nul & cls
      call !_fun!

      :menu_main_back
      call :printf "请按任意键返回主菜单" & pause >nul
      mode con lines=%w_lines% 2>nul
      goto menu_main
  ) else (
      set /a _pos = %choice% - %_max%
      goto menu_main_fun!_pos!
  )
  goto menu_main

  :::::::::::::::::::::::::::::::: 界面 ::::::::::::::::::::::::::::::::

  :::::::::::::::::::::::::::::::: 实际业务逻辑 ::::::::::::::::::::::::::::::::

  :fun1
  call :exec "Users"
  goto :eof

  :fun2
  call :exec "ProgramData"
  goto :eof

  :fun3
  call :exec "Program Files"
  pause
  call :exec "Program Files (x86)"
  goto :eof

  :::::::::::::::::::::::::::::::: 实际业务逻辑 ::::::::::::::::::::::::::::::::

  :::::::::::::::::::::::::::::::: 业务操作 ::::::::::::::::::::::::::::::::

  :exec
  setlocal
  set "_dir=%~1"
  title 系统 %_dir% 目录迁移
  echo ================ 系统 %_dir% 目录迁移开始 ================
  call :println
  call :migrate "%drive%:\%_dir%" "%dest%\%_dir%" && echo 迁移成功 || echo 迁移失败
  call :println
  echo ================ 系统 %_dir% 目录迁移结束 ================
  call :println
  goto :eof

  :::::::::::::::::::::::::::::::: 业务操作 ::::::::::::::::::::::::::::::::

  :::::::::::::::::::::::::::::::: 目录迁移 ::::::::::::::::::::::::::::::::

  :migrate
  :: migrate.bat - 封装的目录迁移脚本
  @echo off & setlocal enabledelayedexpansion

  if "%~1" == "" goto migrate_usage
  if "%~2" == "" goto migrate_usage

  :: 原目录
  set "_src=%~1"
  :: 迁移至目录
  set "_dest=%~2"

  if not exist "%_dest%" goto migrate_copy

  call :choice "目标 %_dest% 已存在 (Y:覆盖/N:跳过/C:取消)? " ync
  if %choice% == 2 echo 跳过 & call :printf "目录拷贝已跳过, " & goto migrate_link
  if %choice% == 3 echo 取消 & goto migrate_error
  echo 覆盖

  :: 1. 拷贝
  :migrate_copy
  if not exist "%_src%" ( echo 目录 "%_src%" 不存在 & goto migrate_error )
  echo 开始拷贝目录: %_src% =^> %_dest%
  :: PE 中没有 Robocopy, xcopy 也够用了
  :: 目标路径结尾的 \ 表示是一个目录, 不能省略
  xcopy "%_src%" "%_dest%\" /E /H /K /X /Y /B /C
  if errorlevel 1 goto migrate_copy_error
  call :printf "目录拷贝已完成, "

  :: 2. 建立符号链接 ( 为避免误操作, 需要确认 )
  :migrate_link
  call :choice "删除原目录并创建符号链接文件(Y/N)? "
  if %choice% == 2 echo N & goto migrate_end
  echo Y
  if exist "%_src%" ( rmdir "%_src%" /S /Q && echo 原目录 "%_src%" 已删除 )
  mklink /J "%_src%" "%_dest%" || ( echo 符号链接创建失败，请重试 & goto migrate_error )

  :: 正常结束
  :migrate_end
  exit /b 0

  :migrate_usage
  echo 用法: %~n0 [src] [dest]

  :: 失败结束
  :migrate_error
  exit /b 1

  :migrate_copy_error
  echo 目录拷贝失败 & goto migrate_error

  :::::::::::::::::::::::::::::::: 目录迁移 ::::::::::::::::::::::::::::::::

  :::::::::::::::::::::::::::::::: UI 操作 ::::::::::::::::::::::::::::::::

  :printf <msg> <color>
  if "%~2" == "" goto printf_no_color
  setlocal
  set "_dir=%temp%\%~nx0\printf"
  if not exist "%_dir%" mkdir "%_dir%"
  pushd "%_dir%"
  set "_file=%~1"
  set /p="%bs% " <nul > "%_file%" & findstr /a:%~2 .* "%_file%*" 2>nul
  popd
  rmdir /S /Q "%_dir%" 2>nul
  goto :eof

  :printf_no_color <msg>
  :: 保持字符串首部的空字符, 末尾多一个空格用于被删
  set /p="%bs%%~1 " <nul
  goto :eof

  :printpad
  call :printf "%w_pad%"
  goto :eof

  :println <msg>
  echo %bs%%w_pad%%~1 & echo;
  goto :eof

  :debug <msg>
  echo %~1
  pause
  goto :eof

  :drawLine
  echo %w_line% & echo;
  goto :eof

  :do_choice <msg> <choices>
  call :choice "%w_pad%%~1" "%~2"
  goto :eof

  :choice <msg> <choices>
  call :exec_exist choice || (pause >nul & goto :eof)
  setlocal
  if not "%~1" == "" call :printf "%~1"
  if not "%~2" == "" ( set "_choices=%~2" ) else set "_choices=yn"
  choice /C %_choices% >nul
  :: 返回值
  endlocal & set "choice=%errorlevel%"
  goto :eof

  :exec_exist <exec>
  %~1 /? >nul 2>&1 || (call :println & call :println "%~1.exe 缺失, 请从 C:\Windows\System32 复制到当前目录下" 1>&2 & exit /b 1)
  exit /b 0

  :::::::::::::::::::::::::::::::: UI 操作 ::::::::::::::::::::::::::::::::

  :::::::::::::::::::::::::::::::: 分区信息 ::::::::::::::::::::::::::::::::

  :get_all_drives <array_name>
  :: 清空
  for /F "delims==" %%i in ( 'set %~1 2^>nul' ) do set "%%~i="
  set /a %~1.length = 0, %~1.ubound = -1
  for %%i in ( C D E F G H I J K L M N O P Q R S T U V W X Y Z ) do if exist "%%~i:" (
      set "%~1[!%~1.length!]=%%~i"
      set /a %~1.ubound = %~1.length, %~1.length += 1
  )
  goto :eof

  :get_drive_name <drive>
  :: vol 执行很慢, 考虑到名称大概率不会改变, 所以就做了缓存
  if not defined drives[%~1] for /F "usebackq tokens=2,3*" %%i in (`vol %~1: 2^>nul ^| find /I " %~1 "`) do set "drives[%~1]=%%k"
  :: 返回值
  set "get_drive_name=!drives[%~1]!"
  goto :eof

  :::::::::::::::::::::::::::::::: 分区信息 ::::::::::::::::::::::::::::::::

  :::::::::::::::::::::::::::::::: 脚本配置文件 ::::::::::::::::::::::::::::::::

  :from_config
  setlocal
  set "_file=%~n0_config.ini"
  (for /F "usebackq delims=" %%i in ( "%_file%" ) do set "%%~i") 2>nul
  set "drive=%drive:~0,1%"
  for %%i in ( C D E F G H I J K L M N O P Q R S T U V W X Y Z ) do if /I "%drive%" == "%%i" set "drive=%%i" & goto from_config_success
  set "drive="
  :from_config_success
  endlocal & set "drive=%drive%" & set "dest=%dest%"
  goto :eof

  :save_config
  setlocal
  set "_file=%~n0_config.ini"
  echo drive=%drive%> "%_file%"
  echo dest=%dest%>> "%_file%"
  goto :eof

  :::::::::::::::::::::::::::::::: 脚本配置文件 ::::::::::::::::::::::::::::::::

  :::::::::::::::::::::::::::::::: 其他 ::::::::::::::::::::::::::::::::

  :: 获取退格符
  :get_bs <name>
  for /F %%a in ('"prompt $h & for %%b in (1) do rem"') do set "%~1=%%a"
  goto :eof

  :check_is_pe
  if "%USERNAME%" == "SYSTEM" exit /b 0
  call :println
  :: 开启延迟变量会导致感叹号被吞
  setlocal disabledelayedexpansion
  call :printf "                           高危操作, 请在 PE 下执行!" 24 & pause >nul
  setlocal enabledelayedexpansion
  exit /b 1

  :menu_main_fun2
  :restart
  start "" "%~f0"

  :menu_main_fun3
  :stop
  exit

  :: 手动填写路径
  :select_folder_manual
  setlocal
  call :println & call :println "请将文件夹拖拽至下方（忽略所有引号）" & call :printpad
  set /p _path=
  if defined _path set "_path=!_path:"=!"
  rem 本行注释只是为了保持引号成对"
  endlocal & set "select_folder_manual=%_path%"
  if "%select_folder_manual%" == "0" goto menu_main
  goto :eof

  :: 打开“选择文件夹”对话框
  :select_folder
  call :exec_exist cscript || (call :printpad & pause >nul & exit /b 1)
  setlocal
  :: 创建 vbs 临时文件进行调用, 调用完删除
  set "_file=%temp%\%~nx0\temp.vbs"
  echo  > "%_file%" Function SelectFolder(default)
  echo >> "%_file%"     root = "::{20D04FE0-3AEA-1069-A2D8-08002B30309D}"
  echo >> "%_file%"     If IsNull(default) Then
  echo >> "%_file%"         default = root
  echo >> "%_file%"     End If
  echo >> "%_file%"     Set Folder = CreateObject("Shell.Application").BrowseForFolder(0, "", 0, default)
  echo >> "%_file%"     If Folder Is Nothing Then
  echo >> "%_file%"         SelectFolder = ""
  echo >> "%_file%"     ElseIf Left(Folder.Self.Path, 1) = ":" Then
  echo >> "%_file%"         SelectFolder = ""
  echo >> "%_file%"     Else
  echo >> "%_file%"         SelectFolder = Folder.Self.Path
  echo >> "%_file%"     End If
  echo >> "%_file%" End Function
  echo;>> "%_file%"
  echo >> "%_file%" WScript.Echo SelectFolder(Null)

  for /F "delims=" %%i in ( 'cscript //Nologo "%_file%"' ) do set "_path=%%i"
  del /Q "%_file%" 2>nul
  endlocal & set "select_folder=%_path%"
  exit /b 0

  :: 将路径转为最近的文件夹
  :folder_path
  :: 判断是文件还是文件夹
  if "%~a1" geq "d" ( set "folder_path=%~f1" ) else if "%~a1" geq "-" ( set "folder_path=%~dp1" ) else set "folder_path=%~f1"
  goto :eof

  :::::::::::::::::::::::::::::::: 其他 ::::::::::::::::::::::::::::::::
  ```

  > **注意**
  >
  > **此脚本加了限制只能在 PE 下执行，因为在 Windows 下操作很容易损坏数据，也容易误操作。我在调试脚本的时候不小心双击执行了半成品，差点把我吓死，还好原本已经做了迁移，只是把符号链接删掉了没有造成数据错乱，进 PE 修复下就恢复了。还是要强调一下，操作有风险，非战斗人员建议绕路。**

  > 通常的 **PE** 不包含此脚本依赖的 `choice.exe` 和 `cscript.exe` ，理论上来说从 `%SystemDrive%\Windows\System32` 目录下复制一份到脚本目录下可以直接用。
  >
  > ![系统目录迁移工具](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Windows%20系统安装/imgs/system_folder_transfer_dependencies.png)
  >
  > 另外，使用 **xcopy** 复制的时候个别文件可能会无法复制，就我的经验来说应该是没什么大问题的。
  >
  > **OneDrive** 可能存在毒瘤文件无法复制无法删除（ 可以用 **DiskGenius** 强制删除 ），用不到 **OneDrive** 的话建议在迁移前先卸载掉（ 联网会自动安装 **OneDrive** ）。

  本来以前就只是 `xcopy ... && rmdir ... && mklink ...` 这样简单地写了个脚本，每次重装完系统无脑跑一跑就完事了。写这篇文章的时候也不知道想的就改成了一个带模拟界面的小工具，也加了很多校验，相对来说更方便了，也不容易出错了。

  ![系统目录迁移工具](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Windows%20系统安装/imgs/system_folder_transfer.png)

  一般只迁移 `Users` 和 `ProgramData` 两个目录就够了，`Program Files` 没有备份的必要，这样既省时间也省空间。日常使用的时候，常用软件安装到其他分区，一些临时安装的软件可以直接无脑安装到默认的 `%SystemDrive%\Program Files` 下，重装系统的时候可以顺带清理掉。

- 重启进入系统看是否能正常进入。

#### 安装双系统或者多系统

就是字面上的意思，一台电脑上安装多个系统，可以是 **XP** 、**win7** 、**win8** 、**win10** ，也可以是 **Linux** 、**macOS** 、**Android** ，只要你硬盘足够大，想装多少个都行。每个系统都有各自的优缺点（ 办公、娱乐，软件生态、兼容、性能 ），多一个系统就多一种选择。我现在懒得折腾了，但一般还会留一个备用系统，主系统出故障了可以用来应急，**PE** 虽然好用但毕竟功能有限。

> 安装不同类型的系统还要额外修复引导，本文就不多讲了。

安装方式除了上面的 **U 盘大法** ，还可以在现有的操作系统下直接打开系统镜像安装到另外一个分区即可，和装软件一样的方便，就是限制可能会更多一点。

#### 可能造成系统蓝屏无法开机的原因

- 安装了不兼容的软件

  曾经安装过某一个版本的 **IDM** ，重启后就再也进不去系统了。

- 安装了不兼容的驱动

  曾经在 **win10** 上强行安装 **win8** 版本的 **电源管理驱动** ，系统就直接挂了，虽然可以用 **Dism++** 修改驱动，但毕竟不懂驱动程序的运行机制以及安装文件还修改了什么系统内容，没准越改越错，还不如重装算了。

  **驱动是很娇弱的，能正常使用就别瞎折腾了，一不小心就崩了。**

- 无意删除了什么重要的系统文件

- 错误修改环境变量或者注册表

- 硬盘模式不正确（ **IDE** / **AHCI** ）

  之前办公室一台 **Windows 7** 台式机突然开机蓝屏，根据错误发现是硬盘模式的问题，修改为 **AHCI** 后能正常开机。不过第二天开机又不行了，打开 **BIOS** 发现配置又自动改回 **IDE** 了，于是抠主板电池重启，发现默认配置就是 **IDE** ，估计是主板电池（ 用了大概 6、7 年 ）没电了，换了电池后就再也没出错了。

  关于免重装系统切换硬盘模式的方法见 [文末](#免重装系统-IDE--AHCI-模式互转) 。

- 网络重置

  > 设置 - 网络和 **Internet** - 状态 - 网络重置

  捣鼓完网卡驱动想看看 **网络重置** 能不能恢复，然后就崩了。

遇到上面这些情况（ 除了最后一种 ）基本只有重装系统的份了，虽然 **Windows** 提供了 **恢复环境** （ [Windows RE](https://docs.microsoft.com/windows-hardware/manufacture/desktop/windows-recovery-environment--windows-re--technical-reference) ），但你都不知道哪里出错了又谈何去修复呢，而且用的还是没有文档的命令行工具。

再说说 **系统还原点** 这个鸡肋功能，**Windows 10** [默认是关闭这个功能](https://docs.microsoft.com/troubleshoot/windows-client/deployment/system-restore-points-disabled) 的，等你想到还原的时候才会发现没有还原点可以用，或者说即使开启了也并不能保证能还原成功（ **能成功是你的幸运，失败是常态** ）。而且什么时候应该创建还原点，还原点又备份了什么内容，还原之后的程序和用户数据是否冲突更是一系列头痛的问题。

**不要把希望寄托在系统自带的恢复工具上，平时要养成良好的使用习惯，系统文件和用户数据要隔离开，重要文件定期备份，即使要重装系统了也能从容应对。**

参考：[解决蓝屏错误](https://www.windows.com/stopcode)

#### 迁移系统

将 **已有系统** 迁移到新的 **分区** 或者 **硬盘** 上，既可以避免 **重装系统** ，还能节约装系统之后相应程序安装以及环境配置所浪费大量的时间。

**分区助手** 提供了两种迁移方法：

##### [迁移系统到固态硬盘](https://www.disktool.cn/jiaocheng/migrate-system-drive.html)

> 仅适用于从一个硬盘迁移到另一个硬盘。

针对 **UEFI 启动模式** 不需要提前创建 **ESP 分区**，迁移过程中会自动复制，手动创建会导致出现多个 **ESP 分区** 。

##### [克隆分区](https://www.disktool.cn/content-center/clone-partition-gparted-1016.html)

> 适用于从一个分区迁移到另一个分区。

仅复制选中的分区，缺失隐藏分区的话需要手动修复。

**如果迁移后的系统无法引导：**

进入 **PE** 后打开 **Dism++** ，选中系统所在的盘符 > **恢复功能** > **引导修复** 。

> 针对 **UEFI 启动模式** 可以考虑先格式化 **ESP/MSR 分区** 或者删除分区后再重建。

**如果迁移后的系统分区启动后黑屏（ 仅鼠标可见 ）（ [参考](https://blog.csdn.net/hkzdcc/article/details/116452275) ）：**

强制关机，进入 **PE** 后加载 **对应的系统盘符** 下的注册表（ [参考](https://zhuanlan.zhihu.com/p/32487069) ），**整体删除** 已分配的盘符配置（ `HKEY_LOCAL_MACHINE\SYSTEM\MountedDevices` ），重启后会自动重新分配盘符。

> **注意**
>
> **如果安装了多系统，被克隆的系统分区盘符不是 C 盘的，光上面的操作还是不够的。**

#### 多系统硬盘启动后黑屏（ 仅鼠标可见 ）

实际上只是等待选择操作系统的界面不可见而已，依旧可以按上下键 **盲选** 要启动的系统。

我猜测因为 **引导项** 是通过工具修复的，而不是正儿八经装 **多系统** 时生成的，缺少相关界面文件。

重新安装一个系统应该能修复这个问题，临时解决办法：利用 [BOOTICE](http://bbs.wuyou.net/forum.php?mod=viewthread&tid=57675) 启用旧版的引导菜单。

![修改 BCD 引导菜单](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Windows%20系统安装/imgs/bcd_editor.png)

#### 电脑突然变得很卡

- 开了 **节能模式** 导致 **倍频** 被限制，打开 **高性能模式** 或 **平衡模式** 即可。

  ![电源计划](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Windows%20系统安装/imgs/power_plan.png)

- **Windows Update** 服务在后台偷跑。

  这是用 **Windows 10** 最恶心的地方，没有之一。**自动更新** 无法彻底关闭就算了，还经常后台偷跑抢占 **CPU** ，对低配电脑来说就是雪上加霜。

- 笔记本升级到 **2004** 版本后，发现偶尔睡眠后再开机会出现 **倍频** 被锁在最低档的情况。

  目前除了 **重启** 没找到别的解决办法。有人分析是风扇的问题，我感觉是温度的问题，温度能降下去估计就能解锁了。

- 磁盘性能达到瓶颈

  有时候 **磁盘利用率** 达到 **100%** 即使 **CPU 利用率** 是 **0%** 也会很卡。

  > 在 **win8** 时期和 **win10** 早期我一直用的是笔记本自带的 **5400** 转 **机械硬盘** ，开机也都在 10 秒内，即使后来加装了 **三星 850 EVO mSATA** 做 **系统盘** 在使用上也没有很明显的提升，以致我一直以为 **固态硬盘** 对系统没太大作用。
  >
  > 而这次装机的时候，新买的固态还在路上，我就拿这块拆机的 **机械硬盘** 先凑合用着亮机。这时我才发现卡得不行，开机要好几分钟，输密码也要卡一下，登录进桌面后还要等待几分钟才能正常响应，连关机都要等几分钟。
  >
  > 接着就是一顿操作找原因了，任务管理器一看 **磁盘利用率 100%** ，测一下 **系统盘** 读写速度只有 **50 MB/s** ，不对啊，之前拿来做 **移动硬盘** 的时候都有 **100 MB/s** 的，难道是 **SATA** 口没插对？线是劣质的？驱动没装好？再测一下这块硬盘其他分区读写速度发现是正常的 **100 MB/s** ，搜了一下才知道原来 [机械硬盘内圈比外圈读写要慢](https://www.zhihu.com/question/420495286) ，而我图省事在盘末划了 **100 G** 空间来装系统就造成了现在的龟速。
  >
  > 其实即便跑满 **100 MB/s** 的速度也无济于事，这个速度已经严重跟不上系统更新的步伐了，随随便便的杀软扫描和文件索引足以使系统失去响应。而目前的主流的 **M.2 固态** 读写速度不说理论值也有 **几千 MB/s** ，性能至少是机械硬盘的几十倍（ **IOPS** 另测 ）。

  **总结：能上固态还是上固态吧，否则要想不卡就只能用回旧版的系统了。**

- 内存使用超出限制

  我在 [记一次 win10 下的内存泄漏分析](https://www.jianshu.com/p/7510e57aeaff) 一文中提过的，实际的物理内存耗尽以后就会频繁使用由硬盘构成的虚拟内存，硬盘读写速度相对来说会慢很多，就会引起卡顿。

#### 系统更新后关机卡住

遇到过几次，共同点就是系统更新过且关机的时候断网了（ 不管是真机还是虚拟机 ），临时解决办法就是硬件强制关机。如果真的是有些设置需要在关机的时候联网就太恶心了。

![系统更新后关机卡住](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Windows%20系统安装/imgs/windows_shutdown_block.png)

#### BIOS 启动模式

> **BIOS** 代表基本输入输出系统。 **其实，它是一组固化到计算机内主板上一个 ROM 芯片上的程序，它保存着计算机最重要的基本输入输出的程序、开机后自检程序和系统自启动程序，它可从 CMOS 中读写系统设置的具体信息。** 其主要功能是为计算机提供最底层的、最直接的硬件设置和控制。此外，BIOS 还向作业系统提供一些系统参数。系统硬件的变化是由 **BIOS** 隐藏，程序使用 **BIOS** 功能而不是直接控制硬件。现代作业系统会忽略 **BIOS** 提供的抽象层并直接控制硬件组件。

启动模式（ **BOOT MODE** ）分为 **BIOS**（ 也称 **Legacy** ）和 **UEFI** 两种互不兼容的方式（ [参考 1](https://tieba.baidu.com/p/5805120650) 、 [参考 2](https://www.zhihu.com/question/26048255) ）。早期的电脑只支持 **BIOS** ，目前新出的电脑应该只支持 **UEFI** ，中间过渡时期两种模式都支持，可以自行切换（ [修改方法](https://jingyan.baidu.com/article/f54ae2fc57e0371e92b84988.html) ）。显而易见 **UEFI** 是未来趋势。

各种术语的定义可以看下这篇文章 → [传送门](https://www.disktool.cn/bbs/?thread-2068.htm)

启动引导过程分析参考：

- [MBR 和 EFI 启动过程](https://www.cnblogs.com/focus-g/p/11355298.html)
- [Windows 启动过程 ( MBR 引导过程分析 )](https://www.cnblogs.com/LittleHann/p/6974928.html)
- [主引导目录（ MBR ）结构及作用详解](http://c.biancheng.net/view/1015.html)

#### 磁盘分区格式

一般装过系统的硬盘就不用管了，原先是什么就是什么，而新硬盘是空的，需要我们去确认分区表类型。
分区表类型分为 **MBR** 和 **GPT** ，两者有什么区别自行搜索下 ( [参考](https://www.disktool.cn/content-center/mbr-vs-gpt-1016.html) ) ，可以借助 **分区工具** 无损切换类型。

需要注意的地方：

- 如果硬盘是 **GPT** 格式的，则只能从 **UEFI** 启动。如果硬盘是 **MBR** 格式的，则只能从 **Legacy BIOS** 启动。
- 安装系统选择磁盘的时候可能会提示 **无法安装到这个磁盘，选中的磁盘具有 xxx 分区表** 。
- 在哪种格式下安装的系统就要在哪种格式下运行。
- **macOS** 貌似就只能安装在 **GPT** 磁盘上。

#### 分区工具

- 一般 **PE** 中自带 [DiskGenius](https://www.diskgenius.cn) ，直接用就好了。
- 在安装好的 **Windows** 上可以用 [傲梅分区助手](https://www.disktool.cn) 。

非专业用户，暂时还体会不到两者的区别，哪个用着更顺就用哪个。

常用功能：**快速分区** 、 **无损转换分区表类型** 、 **无损分区** 、 **系统迁移** 、 **4K 对齐** 。

**分区助手** 遇到过一个问题：**U 盘** 从 **MBR** 转到 **GPT** 再转回 **MBR** 时可能会出错导致分区丢失，需要进行 **恢复分区** 。

#### 制作 USB 启动盘

一般 **PE** 都可以傻瓜式制作启动盘，但满足不了个性化需求（ 比如在一个 **U 盘** 上装多个 **PE** ），有想深入了解的点 [这里](https://www.zhihu.com/question/323397175) 。

#### 免重装系统 IDE / AHCI 模式互转

两种硬盘模式的区别自行了解，经过我的跑分测试，开启 **AHCI** 后对 **机械硬盘** 几乎没影响，而 **固态硬盘** 的跑分能提升 **2 倍** 。如果你用的是 **固态硬盘** + **Windows 10** ，那么强烈推荐开启 **AHCI** 。

![IDE / AHCI](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Windows%20系统安装/imgs/ide_ahci_compare.png)

理论上哪种模式下安装的系统就只能通过哪种模式来启动，要想切换模式只能重装系统。**但实际情况下可以通过修改注册表来实现免重装系统切换模式。**

> **注意**
>
> 在开始修改之前最好先备份相关注册表项，再准备一个 **PE U 盘** ，如果修改错误的话可以进 **PE** 修复注册表。

> **IDE** 转为 **AHCI** 的文章网上很多，但转回去的方法我在网上还真没搜到，有人提问但是要么答非所问要么直接开怼为什么要转回 **IDE** ，下面的方法还是我自己瞎试试出来的。至于为什么要转回 **IDE** ？每个人有不一样的需求罢了，可能是 **AHCI** 不兼容，也可能像我一样为了转回去对比硬盘读写速度，没什么好喷的。

##### IDE 转为 AHCI

1. 修改注册表。

   ```ini
   Windows Registry Editor Version 5.00

   [HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\storahci]
   "Start"=dword:00000000

   [HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\storahci\StartOverride]
   "0"=dword:00000000
   ```

2. 重启进 **BIOS** 修改为 **AHCI** 模式。

3. 重启进入系统。

##### AHCI 转为 IDE

1. 修改注册表。

   ```ini
   Windows Registry Editor Version 5.00

   [HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\pciide]
   "Start"=dword:00000000

   [HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\pciide\StartOverride]
   "0"=dword:00000000
   ```

2. 重启进 **BIOS** 修改为 **IDE** 模式（ **Compatible** ）。

3. 重启进入系统。

   这一步可能会蓝屏，不要慌。等待自动重启几遍后会进入 **Windows 恢复环境** ，按 **F8** 再选择启动 **安全模式** ，只要 **安全模式** 能正常打开，重启后就能正常进入系统了。

说明：

- 上面对应的是 **Windows 10** 下的注册表修改。除了 `pciide` 和 `storahci` 外还有 `stornvme` 、 `msahci` 、 `iaStorV` 、 `iaStorAVC` 等，根据实际情况进行修改。
- 已启用的类型下 **可能** 会有一个 `Enum` 子项。
- 当前启用的类型下 `StartOverride` 可能没有值，比如 **AHCI** 模式下安装的系统是没有 `storahci\StartOverride` 项的。
- 根据我反复修改测试后的理解：值 **0** 表示开启，值 **3** 表示关闭，`Start` 表示是否启用这个类型，`StartOverride` 表示是否参与优先级比较（ **Windows 7** 没有这项内容 ）。开机后，非当前启用的类型下的 `StartOverride` 会被自动改为 **3** 。

**试到后来我才发现，其实进 BIOS 改完模式后 Windows 10 直接进安全模式就能自动完成配置（ 自动安装驱动 ），无需自己去改注册表（ 前提是 `Start` 值为 0 ，[参考](https://zhuanlan.zhihu.com/p/265958371) ）。而 Windows 7 将 `Start` 值都设为 0 后，无需进入安全模式即可无缝切换。**

参考：

- [免重装系统 AHCI 转 IDE 或 IDE 转 AHCI](http://clxp.net.cn/thread-57-1-1.html)
- [win10 IDE 改 AHCI，无需重装系统](https://blog.csdn.net/qq_27859925/article/details/84103333)
- [不用重装系统，Win7 下直接开启 ACHI](https://www.win7china.com/html/4647.html)

### 最后

---

装系统不是什么难事，一回生二回熟，拿块空硬盘多练练就会了。

为了避免遗忘，废话比较多，流水账一样想到哪就写到哪，对从头看到尾的朋友表示感谢。感觉还有很多东西可以写但想不起来了，以后看情况补充吧。文中提到的一些专业名词尽可能找了相对靠谱的解释，用到的工具也尽可能贴了官网原址，不过个人能力有限，欢迎指正。

---

#### 转载请注明出处： [https://github.com/anyesu/blog/issues/38](https://anyesu.github.io/blog/articles/38)
