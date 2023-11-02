### 前言

---

前几天家人说办公室的电脑 [“中病毒”](https://www.zhihu.com/question/60106557/answer/571650593) 了， **QQ 远程** 一看果然是中了流氓软件的招：

- **满屏的广告弹窗**
- **桌面各种悬浮窗**
- **形形色色的浏览器图标**
- **疯狂闪烁的任务栏**
- **……**

![cover](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/聊聊流氓软件/imgs/cover.png)

还好不是真的中了破坏性的病毒，只是恶心了点，花了 **2** 个小时清理干净了。

趁着自己刚 [重装](https://anyesu.github.io/blog/articles/38) 完系统，顺便补一个手动清理的笔记。

### 傻瓜式处理方法

---

- 直接卸载所有能卸载的流氓软件。

- 用 **SoftCnKiller** （ 下文工具中 ）一键处理。

  ![利用 SoftCnKiller 处理](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/聊聊流氓软件/imgs/softcnkiller.png)

- 碰到 **顽固分子** 再回本文找对策。😜

### 工具汇总

---

这里先罗列一些可能有帮助的工具，后面会介绍脱离这些工具的操作方法。

| 名称                                                                                              | 说明                                                                                                                                                                                                                                                                                                               |
| ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [Sysinternals 套件](https://docs.microsoft.com/sysinternals/downloads/sysinternals-suite)         | 微软自家（ 收购的 ）的系统管理工具包，包含单独的故障排除实用工具和帮助文件。下文提到的 [Autoruns](https://docs.microsoft.com/sysinternals/downloads/autoruns) 、 [Process Explorer](https://docs.microsoft.com/sysinternals/downloads/process-explorer) 就包含在其中，也可以选取需要的工具单独下载。               |
| [Registry Workshop](http://www.torchsoft.com/en/download.html)                                    | 注册表工具，比系统自带的 [regedit](https://www.file.net/process/regedit.exe.html) 强太多了。                                                                                                                                                                                                                       |
| [PowerShell](https://docs.microsoft.com/zh-cn/powershell/scripting/install/installing-powershell) | **PowerShell** 是一种跨平台的任务自动化解决方案，由命令行 **shell** 、脚本语言和配置管理框架组成。 **PowerShell** 可在 **Windows** 、 **Linux** 和 **macOS** 上运行。                                                                                                                                              |
| [Everything](https://www.voidtools.com)                                                           | 目前 **Windows** 上最强的文件搜索引擎，没有之一。                                                                                                                                                                                                                                                                  |
| [FILExt](https://filext.com)                                                                      | 在线文件分析，用于提取文件（ 特别是病毒 ）的信息和内容。                                                                                                                                                                                                                                                           |
| [ContextMenuManager](https://github.com/BluePointLilac/ContextMenuManager)                        | 纯粹的 **Windows** 右键菜单管理程序。                                                                                                                                                                                                                                                                              |
| [软媒魔方](https://mofang.ruanmei.com)                                                            | 老牌国产 **Windows** 优化工具，不执行主程序（ `pcmaster.exe` ）就是绿色便携版软件。                                                                                                                                                                                                                                |
| [微 PE](http://www.wepe.com.cn)                                                                   | 推荐的 [PE](https://docs.microsoft.com/windows-hardware/manufacture/desktop/winpe-intro) 系统。                                                                                                                                                                                                                    |
| [SoftCnKiller](https://blog.csdn.net/hfhbutn/article/details/104799162)                           | 是一款专门针对国产流氓软件的清理工具（ [操作视频](https://www.bilibili.com/video/av674434089) ），基于数字签名和路径搜索，支持更新 [黑名单配置](https://gitee.com/softcnkiller/data) 。图省事的话可以用它一键处理，不过我还是建议用它来扫描问题而不是直接处理。附带的 **adwView** 支持窗口捕捉、任务栏及托盘查询。 |
| [Total Uninstall](https://www.martau.com)                                                         | 软件卸载工具，下文有介绍。                                                                                                                                                                                                                                                                                         |
| [火绒](https://www.huorong.cn)                                                                    | 到处被安利的中国特色杀毒软件，界面简洁，主打国产流氓软件查杀（ 刚安装完就把 **鲸彩壁纸** 当病毒杀掉了 ）和广告弹窗拦截。至于其特色的 **火绒剑** 及其他相关工具我对比 **试用** 后发现就是中文版的 **Sysinternals 套件** 。                                                                                          |

#### **PowerShell** 公共函数

注册表的操作还是过于繁琐，封装了几个函数，之后的 **PowerShell** 脚本在执行前需要在新窗口添加依赖：

```powershell
function Format-RegistryPath([String[]] $Path) {
    for ($i = 0; $i -lt $Path.Length; ++$i) {
        $Path[$i] = "Registry::$($Path[$i])"
    }
    $Path
}

function Get-RegistryChildItem([String[]] $Path) {
    ls -LiteralPath (Format-RegistryPath $Path) -ErrorAction Ignore
}

function Get-RegistryValue([String[]] $Path, [String] $Name) {
    (gp -LiteralPath (Format-RegistryPath $Path) -Name $Name -ErrorAction Ignore).$Name
}

function Get-RegistryDefault([String[]] $Path) {
    Get-RegistryValue $Path '(default)'
}

function Get-RegistryRefDll([String] $GUID) {
    Get-RegistryDefault "HKCR\CLSID\$($GUID)\InprocServer32"
}

function Get-RegistryProperties([String[]] $Path) {
    $col1 = @{l="Key";e={$Key}}
    $col2 = @{l="Name";e={$_}}
    $col3 = @{l="Data";e={Get-RegistryValue $Key $_}}
    gi -LiteralPath (Format-RegistryPath $Path) -ErrorAction Ignore | % {
        $Key = $_.Name
        $_ | select -ExpandProperty Property |
            select $col1, $col2, $col3
    }
}
```

由于批处理查询注册表很慢也很麻烦，所以本文以 **PowerShell** 脚本为主，旧版系统可能 [不支持](https://docs.microsoft.com/zh-cn/powershell/scripting/windows-powershell/install/installing-windows-powershell#upgrading-existing-windows-powershell) 而需要单独安装 **PowerShell** 。

#### 注册/反注册 DLL

```powershell
:: 注册 DLL
regsvr32 xxx.dll
:: 反注册 DLL
regsvr32 /u xxx.dll
```

将下面的内容保存到 **右键菜单-(反)注册 DLL.reg** 文件中（ 另存为 **ANSI 编码** ），双击导入到注册表后就能右键 **DLL** 文件进行 **注册/反注册** 。软媒设置大师集成了这个菜单项，但由于没有获取管理员权限所以会执行失败。

```ini
Windows Registry Editor Version 5.00

[HKEY_CLASSES_ROOT\dllfile\shell]

[HKEY_CLASSES_ROOT\dllfile\shell\Reg]
@="注册 DLL"
"HasLUAShield"=""

[HKEY_CLASSES_ROOT\dllfile\shell\Reg\Command]
@="powershell -WindowStyle Hidden -Command \"Start-Process 'regsvr32' '\\\"%1\\\"' -Verb RunAs\""

[HKEY_CLASSES_ROOT\dllfile\shell\UnReg]
@="反注册 DLL"
"HasLUAShield"=""

[HKEY_CLASSES_ROOT\dllfile\shell\UnReg\Command]
@="powershell -WindowStyle Hidden -Command \"Start-Process 'regsvr32' '/u \\\"%1\\\"' -Verb RunAs\""
```

### 流氓软件 FAQ

---

#### 明明没有安装这个软件，为什么会有？

一般下载站的 **高速下载器** 或者某些安装程序会默认勾选捆绑下载其他软件，不留神直接点下一步就会中招（ 现在可能连选择的机会都没有了 ）。

除此之外，流氓软件会有一个软件联盟，安装了 **A** 之后， **A** 会在后台偷偷安装 **B** ， **B** 可能还会反过来检测 **A** 是否已安装（ 未安装就去下载 ），这样就形成了一种保活机制。

#### 如何关闭一个软件或广告？

打开任务管理器找到对应的进程结束掉即可。有些进程可能会模仿成系统进程的样子（ 名字 ）或者扎根到系统目录令人难以分辨，分辨不出来可以考虑结束掉正在运行的其他软件后重启电脑。

> 任务管理器 > 详细信息 > 右键标题栏 > 选择列 > 勾选命令行 > 按命令行排序
>
> 右键进程可打开文件所在的位置，看看是否可以删除。有些进程是通过 **svchost.exe** 打开的，具有迷惑性，详见下文。

可以借助微软家的 **Process Explorer** 工具查询，它可以作为任务管理器的加强版来使用：

- 捕捉窗口所属的进程。
- 显示进程的父子关系（ 可能不太准 ）。
- 根据公司名称能快速分辨出哪些是第三方进程。
- 查看每个进程所加载的 **DLL** 。
- 查询占用 **DLL** 的进程。
- 查看进程开机启动的原因。

#### 软件关掉后为什么会又自动运行了？

- 手动结束后又自动打开了，说明还有一个进程在控制着它。比如以前很好用的 **2345 看图王** 总是会弹广告，广告怎么关都关不掉，根本解决办法就是卸载掉 **2345 看图王** ，找其他软件代替它。
- 重启后又自动打开，说明这个软件或者说它的母体是开机启动的，需要禁止或者删掉对应的开机启动项。

#### 软件是如何开机启动？

![Autoruns](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/聊聊流氓软件/imgs/autoruns.png)

可以借助微软家的 **Autoruns** 工具查询（ 选项 - 隐藏微软的项目 ），基于注册表查询所有自动运行的项目。常见的有下面几种方法：

##### 将快捷方式复制到开始菜单的启动项中

> `win + R` > `shell:startup`

最方便的开机启动方式，适合普通用户。

> [!IMPORTANT]
>
> 需要 **管理员权限** 运行的程序放这里是无法开机启动的。

##### 计划任务中添加任务

支持更高级的开机启动配置，本质上还是由一个 **计划任务** 的服务调度的，会有延迟。

参考《 [Windows 10 内置 Linux 子系统初体验](https://anyesu.github.io/blog/articles/8) 》中 **WSL 开机启动** 小节内容。

##### [注册为 Windows 服务](https://zhuanlan.zhihu.com/p/93808282)

更多服务相关内容参考《 [聊聊 Windows 服务](https://anyesu.github.io/blog/articles/41) 》。

##### [从注册表读取配置开机启动](https://blog.csdn.net/helloworlddm/article/details/108230925)

查看任务管理的启动页知道有些软件设置了开机启动，但找遍了服务和计划任务都没有对应的设置，原来是在这些注册表项里面：

```ini
HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Run
HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Run
HKLM\SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Run
```

##### [通过组策略设置](https://blog.csdn.net/qq_38684504/article/details/88255081)

##### 资源管理器插件项

有时候把上面几种启动方式都禁用了以后还是会开机启动，往往是这些插件造成的，容易被忽视。流氓软件在实现插件功能的基础上还会增加调起主程序的操作。

- **右键扩展菜单**

  > **FastSearch**

  右键文件、文件夹、桌面时调用，相当于延迟启动。

- **图标覆盖**

  > **FastSearch**

  图标显示的时候调用，显示桌面图标时加载相当于开机启动了。

- [**ShellExecuteHooks**](https://blog.csdn.net/laiboy/article/details/5755324)

  > **小鱼便签**

  相关资料很少，不过看名字 **hook** 应该是对 **shell** 的执行过程做了拦截。

  > [木马技术发展趋势回顾](https://bbs.csdn.net/topics/330166107)

#### 怎么避免中招？

主要还是注意下载软件的习惯：

- 能通过 [微软商店](https://www.microsoft.com/store) 安装的应用尽量用商店安装。

- 查询官网下载而不用第三方下载站， **带 `官方` 小尾巴的那种** ，而不是标题包含官网二字就行了。有些恶心的第三方网站还会模仿甚至复刻官网的页面，要注意分辨， **李鬼** 的域名一般都是乱七八糟的。

  ![搜索官网](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/聊聊流氓软件/imgs/search_official_website.png)

- 找开源软件上 [GitHub](https://github.com/search) ，比如文中的 **ContextMenuManager** ，找到项目地址后进 [Releases](https://github.com/BluePointLilac/ContextMenuManager/releases) 页面下载指定版本即可。不要图方便在论坛或者网盘上下载，因为有可能被篡改（ [参考](https://blog.csdn.net/freedom2017/article/details/3753219) ）。

- 实在不得已去下载站，避开 **高速下载** 和 **大号的下载按钮** ，找到小号的 **下载地址** 再选择 **普通下载地址** （ xx 电信下载、 xx 联通下载等等 ）。一般下载正确的话会是一个压缩包（ 一般软件至少有 **几 MB** 大小 ），而高速下载器通常是一个 **几百 KB** 的 **exe 文件** 而且文件名含有 **@** 符号和汉字。

  压缩包又是一个大坑，因为系统默认不带解压软件（ **win10** 只支持 **zip** ），所以又得去下解压软件……

  **经过 3·15 曝光，主流下载站整顿后都找不到高速下载按钮了，已下载的 P2P 下崽器也断网了。**

#### 有哪些流氓软件？

一般 **解压** 、 **看图** 、 **PDF** 这几类软件是必备软件，所以是下载重灾区，其他基本是附赠的。除了 **SoftCnKiller** [黑名单](https://gitee.com/softcnkiller/data/blob/master/Descrip/关于数签sign说明.txt) 中列出来的以外再补充几个：

> 飞火动态壁纸 海螺桌面
>
> 嗨格式数据恢复大师 失易得数据恢复 万能恢复大师
>
> 2345 全家桶 360 全家桶 金山全家桶 鲁大师 驱动人生 驱动精灵 瑞星杀毒 光速搜索 手机模拟器大师

我常用的几款软件（ **仅供参考，看个人喜好自行选择** ）：

- **浏览器** - [Chrome](https://www.google.cn/chrome?standalone=1)

  新版 **Edge** 确实还行，但是到处都是无脑安利 **Edge** 的就很反感，跟当初 **360 浏览器** 一样。而且新版系统直接深度捆绑，意外发现虚拟机里的 **Edge** 在控制面板还隐藏了卸载选项，不知道别的电脑上是不是也这样。

  顺便提一下那个傻瓜式同步功能（ 我自己是从来不用的 ）真的很傻瓜：同步时机不确定，同步进度和结果看不到，该保存的数据给弄丢了，不该同步的隐私数据给传云端去，解决冲突的能力约等于零，还不如给两个按钮让用户手动选择同步到云端还是同步到本地。我的做法是定期备份书签（ 或者考虑找插件？ ）和插件源文件，即使是多设备使用也是只在一台机器上修改，其他机器手动同步。

  在国内 **Edge** 被吹爆主要也是因为可以同步，不过由于 **DNS 污染** 也是半墙的状态。

  > [如何解决 Edge 浏览器无法翻译及下载/同步扩展问题](https://zhuanlan.zhihu.com/p/457789773)

- **图片** - **2345 看图王** `绿色去广告版`

- **压缩文件** - [Bandizip](http://www.bandisoft.com) `最后无广告版本 ( 6.25 )`

- **PDF** - 没有编辑需求用浏览器打开就行了（ **2345 看图王** 也支持 ）

### 清理思路

---

了解了流氓软件的存活机制就可以采取对应的措施：

- 断网以隔绝进一步感染以及和其他设备的交叉感染。

- 禁止自动运行并结束所有相关进程，避免继续产生影响。

  有些进程检测到自己的服务被禁用后会自动进行修复，不过一般会有一个较长的时间间隔，所以先杀进程再禁用还是先禁用再杀在顺序上影响不大，靠手速完全来得及。

- 清理源文件。

常规清理流程还是以先卸载为主，辅以清理残留配置和文件， **网上很多人反映一些软件怎么删都删不掉或者删了又出来了往往是因为残留文件没去清理导致的。**

### 搭建测试环境

---

既然是要测试，那自然得先把流氓软件养蛊的环境搭起来。虽然有多次清理的经验，但也不保证能完全清理干净，在电脑上留了后门就麻烦了，还是在虚拟机里运行比较好，测试完毕直接打包删掉。

#### 安装 [VMware](https://www.vmware.com/products/workstation-pro/workstation-pro-evaluation.html)

临时使用，从官网下载最新版试用 **30** 天即可。

#### 创建虚拟机

镜像是之前重装系统剩下来的，硬件配置： **4 C** / **8 G** 内存 / **30 G** 硬盘 / **NAT** 网络。

正常使用时占用空间大概 **19 G**（ 关机后大概 **11 G** ），所以硬盘可以适当再大点。

使用 [简易安装](https://docs.vmware.com/en/VMware-Workstation-Pro/16.0/context?id=IDH_EASY_INSTALL) 的方式，比平常装系统快多了，全程自动设置，进桌面就可以直接用了。

![虚拟机刚装完](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/聊聊流氓软件/imgs/vmware_init.png)

虚拟机正常开机后，建议先保存一个快照用于回滚，回滚跟 **挂起/还原** 一样快，只是每个快照会占用很多硬盘空间（ 看虚拟机实际的数据量 ）。

#### 安装流氓软件

随便找一个下载站 **高速** 下载 **飞压** 或者其他什么小软件， **为了加快下崽进度可以把安装程序复制 10 份然后依次执行，每次就会捆绑不同的软件** 。看到 **腾讯手游助手** 的时候注意暂停，因为会自动下载比较大的游戏，很容易撑爆虚拟机的硬盘（ 我前面分配的硬盘空间很小 ）。

**飞压** 本体安装完以后 **安装程序** 的窗口就不见了，但打开任务管理器可以发现这个进程实际上还在后台运行，网速还时不时拉满，说明正在不断安装新的软件。最终效果见文章首图。

> 还是 **P2P 下崽器** 比较给力，一下一窝崽。

### 开始清理

---

#### 停止 P2P 下崽器

打开任务管理器结束掉正在执行的 **P2P 下崽器** 进程，以避免我们一边在删东西它一边给我们装回去。如果分不清楚是哪个进程，就直接重启电脑。

#### 进入安全模式（ 可选 ）

进入安全模式可以禁用除系统外的第三方程序开机启动（ 选择 **诊断启动** 可进一步禁用杀毒软件 ），且默认无网络，可以很好地避免我们清理的时候恶意程序在后边捣乱。

理论上只是清理流氓软件不进安全模式不断网也没问题， **如果确认是病毒感染或者来不及杀还是建议进安全模式，只有魔法才能打败魔法。**

网上找的方法：

> - **win 7** 及 **XP** 开机疯狂按 `F8` 就能跳出安全模式的菜单了。
> - **win10** 按住 `Shift` 不松开 > 开始 > 电源 > 重启 > 进入恢复模式 > 疑难解答 > 高级选项 > 启动设置 > 重启。

一步到位的方法： `win + R` > `msconfig` > 引导 > 引导选项 > 勾选安全引导 > 按需选择启动参数（ 主要是有无网络 ） > 应用 > 重启。（ 退出安全模式时需要取消勾选安全引导 ）

![win + R > msconfig](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/聊聊流氓软件/imgs/msconfig.png)

还可以通过修改 [BCD](https://docs.microsoft.com/windows-hardware/manufacture/desktop/bcdedit-command-line-options) 进安全模式，适用于系统正常启动不了的情况，修改哪些属性一时讲不清楚，不过一般的 **BCD 工具** （ 比如 [BOOTICE](http://bbs.wuyou.net/forum.php?mod=viewthread&tid=57675) ）都提供了类似 **msconfig** 一样的友好界面可以快速设置。

#### 卸载程序

打开控制面板（ 安装时间倒序，虽然能造假 ），看到那些不认识的软件（ 除了微软字样的 ）都可以卸载了。桌面的弹窗广告可以不用管，卸载的时候会自动关闭。

卸载程序的注册信息在以下注册表项中：（ [参考](https://docs.microsoft.com/windows/win32/shell/cpl-setprogramaccess#filtering-the-add-or-remove-programs-list) ）

```ini
HKCU\Software\Microsoft\Windows\CurrentVersion\Uninstall
HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall
```

**注意卸载程序中的各种交互陷阱，看仔细了再点击。另外，有些老流氓会把一键去广告的功能放在卸载程序里面。**

如果提示 **此操作只对目前安装的产品有效** ，其实只是注册表残留而已，可以直接删掉（ [参考](https://www.zhihu.com/question/503525075/answer/2261933568) ）。

**复现方法：** 拖一个快捷方式到 **Total Uninstall** 的程序列表即可添加 **已安装程序** ，定位到注册表删掉 **UninstallString** 项，再去控制面板卸载看看。

##### 第三方卸载工具

试用了几个网上推荐的工具：

- [IObit Uninstaller](https://www.iobit.com/en/advanceduninstaller)

  界面上看似一堆花里胡哨的功能，实际有用的功能也只是卸载。可以批量卸载并清理残留文件，就是速度有点慢（ 怀疑进度条转圈的速度固定死了 ）。

  安装监视器还不错，安装的时候记录修改内容（ 文件、注册表等 ），卸载的时候根据这个记录进行回滚，卸载得更干净。

  ![IObit Uninstaller](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/聊聊流氓软件/imgs/iobit_uninstaller.png)

  ![IObit Uninstaller2](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/聊聊流氓软件/imgs/iobit_uninstaller2.png)

  ![IObit Uninstaller3](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/聊聊流氓软件/imgs/iobit_uninstaller3.png)

  **注意：不要强力卸载一个快捷方式，一不小心可能就把系统文件给删了（ 虽然不一定有权限 ）。**

  ![IObit Uninstaller4](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/聊聊流氓软件/imgs/iobit_uninstaller4.png)

- [GEEK UNINSTALLER](https://geekuninstaller.com)

  免安装，支持筛选。功能还是比较简单，专业版（ [Uninstall Tool](https://crystalidea.com/uninstall-tool) ）才支持批量卸载和 **追踪安装** 。

  ![GEEK UNINSTALLER](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/聊聊流氓软件/imgs/geek_uninstaller.png)

  ![GEEK UNINSTALLER2](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/聊聊流氓软件/imgs/geek_uninstaller2.png)

- [HiBit Uninstaller](http://hibitsoft.ir/Uninstaller.html)

  免安装，拖一个快捷方式进去就可以卸载了，支持批量卸载、后台静默卸载、编辑卸载信息、失败重试，还自带了一些清理工具。由于是等所有原始卸载程序执行完之后再一次性扫描的，比起 **IObit Uninstaller** 速度会快很多。

  ![HiBit Uninstaller](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/聊聊流氓软件/imgs/hibit_uninstaller.png)

- [~~可牛电脑助手~~](https://zs.keniu.com)

  本身就是个流氓软件，在它身上看到了 **2345 全家桶** 的影子， **不推荐** 。

- [Total Uninstall](https://www.martau.com)

  一个惊喜软件，界面虽然不怎么好看，但功能比前面的工具更强大。别的工具大都是卸载后再分析残留（ 用户角度 ），而它是先分析再卸载的，有哪些修改一目了然，还支持导出卸载配置为注册表文件，适合做单纯的捆绑分析工具。

  - 支持卸载备份和还原，通过备份的日志可以查看残留。
  - 支持拖放快捷方式添加卸载列表没有的程序进行分析。
  - 注册表分析更彻底。
  - 支持查询 ~~关联~~ （ 捆绑 ）的程序，腾讯全家桶和驱动类软件容易误删。

  ![Total Uninstall](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/聊聊流氓软件/imgs/total_uninstall.png)

- [CCleaner](https://www.ccleaner.com)

  一款清理工具，很久以前用过，忘了什么原因弃坑了，有需要的自行了解。

以上几款软件基本都支持定位到安装目录和注册表，和控制面板显示的程序数量基本一致（ 应该都是从注册表读取的 ），都支持强力卸载（ 自带卸载程序 + 清理残留内容 ），虽然都达不到完全卸载的程度，但还是比从控制面板卸载要干净许多。

**不过本文还是采用原生的控制面板卸载方式，毕竟更贴近广大用户的使用环境。** 缺点无非是多花点时间而已，毕竟正常人偶尔才会中招，消耗这点时间也能接受，天天中招说明真的不适合用电脑。

卸载工具的话其实我也不建议用，因为 **屠龙勇士终成恶龙** 。而且 **道高一尺魔高一丈** ，耍流氓的手段也在与时俱进，掌握好方法才是王道。

![卸载完成](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/聊聊流氓软件/imgs/base_uninstall.png)

初步卸载完毕各种弹窗和广告基本都没了，毕竟大部分软件还是比较良心地提供了卸载程序，卸载得也比较干净，估计开发者自己也深受其害不得不留条后路。

**有需要可以先重启下电脑，一些残留文件需要重启才会自动删除。**

#### 删除残留开机启动项

##### 删除服务

```ini
HKLM\SYSTEM\CurrentControlSet\Services\{ServiceName}
```

> 任务管理器 > 服务 > 随便选中一个服务右键 > 打开服务

一个一个排查（ 双击查看执行路径 ），需要留意下 **svchost** 进程，有些流氓软件就是通过 **svchost** 的方式启动以实现隐藏自身的目的。（ [参考](https://blog.csdn.net/yangyuankp/article/details/8170720) ）

![服务 - svchost](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/聊聊流氓软件/imgs/service_svchost.png)

**PowerShell** 列出所有服务：

```powershell
$Dll = @{n="Dll";e={ (gp "HKLM:\SYSTEM\CurrentControlSet\Services\$($_.Name)\Parameters" -ErrorAction Ignore).ServiceDll }}
gwmi win32_service |
    select $Dll, Name, DisplayName, State, Status, StartMode, PathName, Description, processId |
    ogv -Title '服务 by anyesu'
```

批处理删除服务（ **管理员权限** ）：

```powershell
:: 注意是服务名而不是显示名称
sc stop XIAOYUUPDATE & sc delete XIAOYUUPDATE
```

如果直接删除服务而未关闭就会只标记为删除，手动关进程或者重启后才会彻底删除。有些服务的停止按钮不可点击一般说明有其他关联服务控制着，只是单独删了重启还可能还原回来。

> [解决“指定的服务已经标记为删除”问题](https://www.cnblogs.com/C-Shark/archive/2011/03/19/1989032.html)

这么查还是很费劲的，借助 **Autoruns** 工具我们可以很方便地查看第三方服务，右键可直接删除服务。

![查看服务](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/聊聊流氓软件/imgs/autoruns_service.png)

##### 删除计划任务

> 控制面板 > 搜索计划任务
>
> 或者 `win + R` > `taskschd.msc`

![查看计划任务](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/聊聊流氓软件/imgs/autoruns_taskschd.png)

一般删掉 `任务计划程序库` 目录和 `Microsoft\windows` 目录下的直接子任务即可。双击任务查看操作，比起服务好分辨多了，右键可删除。

**PowerShell** 查询（ **管理员权限查看所有的任务** ）：

```powershell
Get-ScheduledTask |
    ? { ('\', '\Microsoft\windows') -contains $_.TaskPath } |
    select TaskPath, TaskName, Description, Author, State |
    ogv -Title '计划任务 by anyesu'
```

##### 删除开始菜单启动项

> [win10 startup 启动目录路径命令](https://www.cnblogs.com/wswind/p/10078682.html)

```powershell
explorer shell:startup
explorer shell:common startup
```

![「开始」菜单 > 程序 > 启动](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/聊聊流氓软件/imgs/startmenu_startup.png)

##### 删除注册表启动项

> - [Use Shell Launcher (Standard 7 SP1)](<https://docs.microsoft.com/previous-versions/windows/embedded/ff794318(v=winembedded.60)>)
> - [Use Shell Launcher to create a Windows client kiosk](https://docs.microsoft.com/windows/configuration/kiosk-shelllauncher)

![查看注册表启动项](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/聊聊流氓软件/imgs/autoruns_logon.png)

**PowerShell** 查询：

```powershell
Get-RegistryProperties (
'HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Run',
'HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\RunOnce',
'HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\RunOnceEx',
'HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Run',
'HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\RunOnce',
'HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\RunOnceEx',
'HKLM\SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Run',
'HKLM\SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\RunOnce',
'HKLM\SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\RunOnceEx',
'HKCU\Software\Microsoft\Windows\CurrentVersion\Policies\Explorer\Run'
) | ogv -Title '注册表启动项 by anyesu'
```

#### 清理残留注册表项

注册表的残留主要位于 **HKCR** （ **HKEY_CLASSES_ROOT** ）下，同样可以借助 **Autoruns** 工具查询。

![资源管理器残留](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/聊聊流氓软件/imgs/autoruns_explorer.png)

**理论上，暴力删文件可以使注册表项失效，所以对注册表一窍不通的话可以跳过此步骤，避免误操作导致系统崩溃。**

> **HKCR** 是下面两者的合并视图， **HKCU** 中的配置具有更高优先级（ 如果存在 ），对 **HKCR** 的修改优先作用于 **HKCU** 中（ 如果存在 ），也就是说如果两处都存在一个项则需要在 **HKCR** 中删除两次。（ [参考](https://docs.microsoft.com/windows/win32/sysinfo/hkey-classes-root-key) ）
>
> ```ini
> HKCU\SOFTWARE\Classes\*
> HKLM\SOFTWARE\Classes\*
> ```

##### 资源管理器右键菜单

- [Shell](https://docs.microsoft.com/windows/win32/shell/fa-verbs)

  一般常用的方式，给菜单赋值一串命令即可，比较简单。

  注册表结构：

  ```ini
  HKEY_CLASSES_ROOT
     MyProgram.exe
        shell
           open
              command
                 (Default) = C:\MyDir\MyProgram.exe /a "%1"
  ```

  - [创建快捷菜单](https://docs.microsoft.com/windows/win32/shell/context-menu-handlers)
  - [Add Ribbon Command to Context Menu in Windows 10](https://winaero.com/ribbon-command-context-menu-windows-10)
  - [感知类型](https://docs.microsoft.com/windows/win32/shell/fa-perceivedtypes)

- [Shell Extensions](https://docs.microsoft.com/windows/win32/shell/shell-exts)

  **Shell** 的扩展，通过编程方式（ [DLL](https://filext.com/file-extension/DLL) 、 [OCX](https://filext.com/file-extension/OCX) ）提供复杂的菜单效果。

  - [注册 Shell 扩展处理程序](https://docs.microsoft.com/windows/win32/shell/reg-shell-exts)

  注册表结构：

  ```ini
  HKEY_CLASSES_ROOT
     *
        shellex
           ContextMenuHandlers
              MyCommand
                 (Default) = {00021500-0000-0000-C000-000000000046}
     CLSID
        {00021500-0000-0000-C000-000000000046}
           InprocServer32
              (Default) = %windir%\System32\Example.dll
              ThreadingModel = Apartment
  HKEY_LOCAL_MACHINE
     Software
        Microsoft
           Windows
              CurrentVersion
                 Shell Extensions
                    Approved
                    {00021500-0000-0000-C000-000000000046} = MyCommand
  ```

  ```ini
  HKEY_CLASSES_ROOT
     .myp
        (Default) = MyProgram.1
     CLSID
        {11111111-2222-3333-4444-555555555555}
           InProcServer32
              (Default) = C:\MyDir\MyPropSheet.dll
              ThreadingModel = Apartment
     MyProgram.1
        (Default) = MyProgram Application
        Shellex
           PropertySheetHandlers
              MyPropSheet
                 (Default) = {11111111-2222-3333-4444-555555555555}
  ```

  借助 **FILExt** 分析 **52 好压** 扩展文件 `k52zip\kzip_ext64.dll` 的注册表配置，和实际的注册表内容可以对上：

  ```ini
  HKCR
  {
     NoRemove CLSID
     {
        ForceRemove s '%UUID_SHELL_MENU%' = s 'k52zip shell menu'
        {
           InprocServer32 = s '%MODULE%'
           {
              val ThreadingModel = s 'Apartment'
           }
        }
     }

     NoRemove *
     {
        NoRemove ShellEx
        {
           NoRemove ContextMenuHandlers
           {
              ForceRemove kzipext = s '%UUID_SHELL_MENU%'
           }
        }
     }

     NoRemove Directory
     {
        NoRemove ShellEx
        {
           NoRemove ContextMenuHandlers
           {
              ForceRemove kzipext = s '%UUID_SHELL_MENU%'
           }
        }
     }
  }
  ```

从上面的内容可以看出通常 **DLL** 会注册多个菜单以及多种类型的注册表项，手动删除注册表项很容易漏删和误删， **正确的办法是找到对应的 DLL 进行反注册** （ 会自动删除相关的注册表内容，反注册方法见 [工具汇总](#工具汇总) ）。

![资源管理器 - 右键菜单管理](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/聊聊流氓软件/imgs/contextmenumanager.png)

可以借助 **ContextMenuManager** 管理右键菜单。不借助工具的话比较麻烦，可以通过下面的 **PowerShell** 脚本来查询：

```powershell
function Get-RegistryShellTypes {
    $Types = '* AllFileSystemObjects Folder Directory Directory\Background DesktopBackground Drive Network NetShare NetServer Printers AudioCD DVD'.Split(' ')
    $Types += 'UserLibraryFolder lnkfile exefile Unknown'.Split(' ')
    # 此电脑
    $Types += 'CLSID\{20D04FE0-3AEA-1069-A2D8-08002B30309D}'
    # 回收站
    $Types += 'CLSID\{645FF040-5081-101B-9F08-00AA002F954E}'
    # 感知类型
    $Types += 'text document image video audio Compressed system'.Split(' ') |
        % { "SystemFileAssociations\$($_)" }
    $Types
}

function Get-Results {
    $Results = @()
    $Default = @{n="Default";e={ Get-RegistryDefault $_.Name }}
    $Type1 = @{n="Type";e={ "右键菜单" }}
    $Type2 = @{n="Type";e={ "右键扩展" }}
    $Type3 = @{n="Type";e={ "公共引用" }}
    $Detail1 = @{n="Detail";e={ Get-RegistryDefault "$($_.Name)\Command" }}
    $Detail2 = @{n="Detail";e={ Get-RegistryRefDll $_.Default }}
    foreach ($Type in Get-RegistryShellTypes) {
        $Results += (Get-RegistryChildItem "HKCR\$Type\shell" |
            select Name, $Type1, $Default, $Detail1
        )
        $Results += [pscustomobject]@{}

        $a = [string[]](Get-RegistryChildItem "HKCR\$Type\shellex").Name
        if ($a.Length -eq 0) { continue }
        $Results += (Get-RegistryChildItem $a | select Name, $Default |
            select Name, $Type2, Default, $Detail2
        )
        $Results += [pscustomobject]@{}
    }

    $Results += [pscustomobject]@{}
    # 公共引用，用于创建 SubCommands
    $Results += (ls "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\CommandStore\shell" -Exclude Windows* |
        select Name, $Type3, $Default, $Detail1
    )
    $Results
}
$Results = (Get-Results)
$Results | ogv -Title '资源管理器 - 右键加载项 by anyesu'
```

![资源管理器 - 右键加载项](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/聊聊流氓软件/imgs/explorer_shell.png)

本来写了个批处理，又臭又长速度还慢，优化不动了。意外发现 **PowerShell** 来实现效果更好，不仅速度快还支持表格展示（ 选中行后 `Ctrl + C` 可复制整行内容 ）和排序检索，就是刚开始接触， [语法](https://docs.microsoft.com/powershell/scripting/learn/ps101/01-getting-started) 不熟悉写得有点别扭，凑合着用。

也可以导出为 **CSV** 文件，通过比较前后的文件可以快速筛选出新增的项目。

```powershell
$Results | epcsv -Encoding utf8 results.csv
```

##### [新建菜单](https://docs.microsoft.com/windows/win32/shell/context#extending-the-new-submenu)

![资源管理器 - 新建菜单](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/聊聊流氓软件/imgs/shell_new.png)

注册表结构：

```ini
HKEY_CLASSES_ROOT
   .myp
      (Default) = MyProgram.1
      MyProgram.1
         ShellNew
            NullFile
```

批处理简单查询：

```powershell
:: HKCR\{.type}\ShellNew
reg query HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\Discardable\PostSetup\ShellNew /v Classes
```

**PowerShell** 查询：

```powershell
Get-RegistryValue HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\Discardable\PostSetup\ShellNew Classes |
    % { echo "HKCR\$($_)\ShellNew" }
```

不需要的文件类型删除对应的 **ShellNew** 项（ 比如 `HKCR\.bmp\ShellNew` ）即可。而 **Classes** 值的数据用于控制显示顺序，每次显示右键菜单时自动更新（ [可修改权限来固定内容](https://www.jianshu.com/p/8af973904347) ），不用手动改。

##### ShellExecuteHooks

```ini
HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\ShellExecuteHooks
HKLM\SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Explorer\ShellExecuteHooks
```

**PowerShell** 查询：

```powershell
Get-RegistryProperties (
'HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\ShellExecuteHooks',
'HKLM\SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Explorer\ShellExecuteHooks'
) | select Key, @{l="Dll";e={ Get-RegistryRefDll $_.Name }} |
ogv -Title '资源管理器 - ShellExecuteHooks by anyesu'
```

##### [预览](https://docs.microsoft.com/windows/win32/shell/preview-handlers)

> [PowerToys](https://github.com/microsoft/PowerToys)

注册表结构：

```ini
HKEY_CLASSES_ROOT
   xyzfile
      shellex
         {8895b1c6-b41f-4c1c-a562-0d564250836f}
            (Default) = [REG_SZ] {ec3a629a-a47c-4245-bc78-b4b63d0e3154}
HKEY_CLASSES_ROOT
   CLSID
      {ec3a629a-a47c-4245-bc78-b4b63d0e3154}
         (Default) = [REG_SZ] Fabricam XYZ Preview Handler
         DisplayName = [REG_SZ] @myhandler.dll,-101
         Icon = [REG_SZ] myhandler.dll,201
         AppID = [REG_SZ] {6d2b5079-2f0b-48dd-ab7f-97cec514d30b}
         InprocServer32
            (Default) = [REG_EXPAND_SZ] %ProgramFiles%\Fabricam\myhandler.dll
            ThreadingModel = [REG_SZ] Apartment
            ProgID = [REG_SZ] xyzfile
            VersionIndependentProgID = [REG_SZ] Version IndependentProgID
HKEY_LOCAL_MACHINE or HKEY_CURRENT_USER
   SOFTWARE
      Microsoft
         Windows
            CurrentVersion
               PreviewHandlers
                  {ec3a629a-a47c-4245-bc78-b4b63d0e3154}
                     (Default) = [REG_SZ] Fabricam XYZ Preview Handler
```

**PowerShell** 查询：

```powershell
Get-RegistryProperties (
'HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\PreviewHandlers',
'HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\PreviewHandlers'
) | select *, @{l="Dll";e={ Get-RegistryRefDll $_.Name }} |
ogv -Title '资源管理器 - 预览 by anyesu'
```

##### [任务栏 - 工具栏](https://github.com/Planet-Source-Code/rob-parsons-how-to-add-the-google-toobar-to-the-windows-taskbar__1-46033)

> [XMeters](https://entropy6.com/xmeters)

注册表结构：

```ini
HKEY_CLASSES_ROOT\CLSID\{Toolbar GUID}
   (Default) = Toolbar Name
   Implemented Categories
      {00021492-0000-0000-C000-000000000046}
```

其中 `Implemented Categories` 指明了类型为 `Desk Band` ：

```ini
HKEY_CLASSES_ROOT\Component Categories\{00021492-0000-0000-C000-000000000046}
   409 = Desk Band
```

借助 **FILExt** 分析 **52 好压** 扩展文件 `k52zip\kzip_ext64.dll` 的注册表配置：

```ini
HKCR
{
   NoRemove CLSID
   {
      ForceRemove s '%UUID_SHELL_BAND%' = s 'k52zip shell band'
      {
         InprocServer32 = s '%MODULE%'
         {
            val ThreadingModel = s 'Apartment'
         }
      }
   }
}
```

批处理简单查询：

```powershell
for /f "usebackq tokens=1-3 delims=\" %i in (`reg query HKCR\CLSID /f {00021492-0000-0000-C000-000000000046} /k /s 2^>nul^| findstr HKEY`) do @reg query "%i\%j\%k\InProcServer32" /ve 2>nul
```

反注册 **DLL** 后记得关闭已启用的工具栏或者直接重启资源管理器。

![删除工具栏](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/聊聊流氓软件/imgs/delete_toolbar.png)

##### [IE 插件](<https://docs.microsoft.com/previous-versions/windows/internet-explorer/ie-developer/platform-apis/aa753587(v=vs.85)>)

**IE** 现在很少用了，可以全部删掉。（ 修改后重启 **IE** 生效 ）

- [BHO 插件](https://en.wikipedia.org/wiki/Browser_Helper_Object)

  > **Internet** 选项 > 程序 > 管理加载项 > 右键插件 > 详细信息 > 定位到 **DLL** 文件进行反注册

  ```ini
  # BHO 删除此项即可
  HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\Browser Helper Objects\{GUID}
  HKLM\SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Explorer\Browser Helper Objects\{GUID}

  # lib
  HKCR\CLSID\{GUID}

  # 设置项
  HKCU\SOFTWARE\Microsoft\Internet Explorer\Approved Extensions
  HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Ext\Settings\{GUID}
  HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Ext\Stats\{GUID}
  ```

- [标准上下文菜单](<https://docs.microsoft.com/previous-versions/windows/internet-explorer/ie-developer/platform-apis/aa753589(v=vs.85)>)

  执行由 **URL** 指定的脚本。

  ```ini
  HKCU\SOFTWARE\Microsoft\Internet Explorer\MenuExt\<Menu Text>
  ```

- [工具或帮助的菜单项](<https://docs.microsoft.com/previous-versions/windows/internet-explorer/ie-developer/platform-apis/aa753591(v=vs.85)>)

  运行应用程序或脚本。

  ```ini
  HKCU\SOFTWARE\Microsoft\Internet Explorer\Extensions\{GUID}
  HKLM\SOFTWARE\Microsoft\Internet Explorer\Extensions\{GUID}
  ```

##### 图标

使用 [ie4uinit](https://www.file.net/process/ie4uinit.exe.html) 不重启资源管理器刷新文件图标（ [参考](https://www.cnblogs.com/prograys/p/14148644.html) ）：

```powershell
:: win10 ( 测试了 win7 发现也能用这个 )
ie4uinit -show

:: win10 之前的系统
ie4uinit -ClearIconCache
```

- [自定义图标分配给文件类型](https://docs.microsoft.com/windows/win32/shell/how-to-assign-a-custom-icon-to-a-file-type)

  注册表结构：

  ```ini
  HKEY_CLASSES_ROOT
     .myp
        (Default) = MyProgram.1
        DefaultIcon
           (Default) = C:\MyDir\MyProgram.exe,2

  HKEY_CLASSES_ROOT
     .myp
        (Default) = MyProgram.1
     MyProgram.1
        DefaultIcon
           (Default) = C:\MyDir\MyProgram.exe,2
  ```

- [图标覆盖](https://docs.microsoft.com/windows/win32/shell/how-to-register-icon-overlay-handlers)

  ```ini
  HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\ShellIconOverlayIdentifiers
  HKLM\SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Explorer\ShellIconOverlayIdentifiers
  ```

  比如安装 **Tortoise(GIT/SVN)** 后可以看到项目文件图标会多出同步状态的角标，就是通过这种方式实现的。覆盖顺序为注册表中的显示顺序，最前面的优先级最高，并且只有前 15 个（ 系统固定占用 4 个 ）有效， **通常在项名称前加空格以提升优先级** 。

  - [Why does Windows limit icon overlays to 15?](https://superuser.com/q/1166577)
  - [Registered icon overlay handlers aren't used by Windows Shell](https://docs.microsoft.com/troubleshoot/windows/win32/icon-overlay-handlers-windows-shell)
  - [What are those little overlay icons: Windows 7 edition](https://devblogs.microsoft.com/oldnewthing/20091209-00/?p=15723)
  - [Why is there a limit of 15 shell icon overlays?](https://devblogs.microsoft.com/oldnewthing/20190313-00/?p=101094)

  借助 **FILExt** 分析 **飞压** 扩展文件 `FeiRar\FeiRarHelp64.dll` 的注册表配置：

  ```ini
  HKCR
  {
     NoRemove CLSID
     {
        ForceRemove {937C4FD2-3242-4E1A-B7DF-27437B67B620} = s 'FeiRarShlExt Class'
        {
           ForceRemove Programmable
           InprocServer32 = s '%MODULE%'
           {
              val ThreadingModel = s 'Apartment'
           }
           TypeLib = s '{2920F6F2-E1D0-48C2-B202-555CA4900C7D}'
           Version = s '1.0'
        }
     }
  }
  HKLM
  {
     NoRemove SOFTWARE
     {
        NoRemove Microsoft
        {
           NoRemove Windows
           {
              NoRemove CurrentVersion
              {
                 NoRemove Explorer
                 {
                    NoRemove ShellIconOverlayIdentifiers
                    {
                       ForceRemove CFeiRarShlExt = s '{937C4FD2-3242-4E1A-B7DF-27437B67B620}'
                    }
                 }
              }
           }
        }
     }
  }
  ```

  批处理简单查询：

  ```ini
  for /f "usebackq tokens=1,2* delims= " %i in (`reg query "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\ShellIconOverlayIdentifiers" /s 2^>nul`) do @if "%k" == "" (echo; && echo 加载项： "%i %j") else (reg query "HKCR\CLSID\%k\InprocServer32" /ve 2>nul)
  ```

  **PowerShell** 查询：

  ```powershell
  Get-RegistryChildItem (
  'HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\ShellIconOverlayIdentifiers',
  'HKLM\SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Explorer\ShellIconOverlayIdentifiers'
  ) | select Name, @{n="Detail";e={ Get-RegistryRefDll (Get-RegistryDefault $_.Name) }} |
  ogv -Title '资源管理器 - 图标覆盖 by anyesu'
  ```

##### [控制面板附加项](https://docs.microsoft.com/windows/win32/shell/how-to-register-an-executable-control-panel-item-registration-)

```ini
HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\ControlPanel\NameSpace\{GUID}
```

一般除了卸载类软件（ **IObit Uninstaller** ）很少遇到动控制面板的，就不需要管了。

##### 其他注册表残留

上面只是清除一些常见的注册表项，应该还会剩余一些残留（ 比如驱动、文件类型关联、防火墙等 ），一般不清理问题也不大，只是稍微占点空间而已，删错了反而容易出问题。等之后源文件都删干净了，可以用注册表清理工具或杀毒软件扫描下，一般都能检测出残留的无效注册表，按需清理。比如用软媒清理大师（ **Windows 7** 兼容模式打开 ）清理错误的文件关联。

![软媒清理大师 - 注册表清理](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/聊聊流氓软件/imgs/cleanmaster.png)

#### 删除残留文件

**参考： [【C 盘娘】流氓软件纯手动暴力式彻底清理卸载，告别弹窗广告](https://zhuanlan.zhihu.com/p/443898850)**

> **SoftCnKiller** 的作者有一个 [视频](https://www.bilibili.com/video/av627360944) 中介绍了用命令行、 [Windows RE](https://docs.microsoft.com/windows-hardware/manufacture/desktop/windows-recovery-environment--windows-re--technical-reference) 、 **PE** 及各种工具删除文件的方法，不懂的话看着可能会比较懵。

**不懂的话不用管系统目录（ `%windir%\System32` 和 `%windir%\SysWOW64` ）中的文件，一般不清理没什么影响。**

##### 安装目录

包含程序的核心文件，删除可能导致其无法正常运行。

| 说明               | 环境变量                  | 实际路径                            |
| ------------------ | ------------------------- | ----------------------------------- |
| 程序安装目录 64 位 | %ProgramFiles%            | C:\Program Files                    |
| 程序安装目录 32 位 | %ProgramFiles(x86)%       | C:\Program Files (x86)              |
| 公用文件夹 64 位   | %CommonProgramFiles%      | C:\Program Files\Common Files       |
| 公用文件夹 32 位   | %CommonProgramFiles(x86)% | C:\Program Files (x86)\Common Files |

- **Common Files** 目录应该是用于多个软件之间共享文件的，不过很少有用到。

- 有些流氓软件还会选择安装到 **%APPDATA%** 目录下。

##### 程序数据

常用来存放程序运行时产生的配置文件和数据。

| 说明                | 环境变量                                       | 实际路径                                         |
| ------------------- | ---------------------------------------------- | ------------------------------------------------ |
| "所有用户" 配置文件 | %ALLUSERSPROFILE%                              | C:\ProgramData                                   |
| 本地程序数据        | %ProgramData%                                  | C:\ProgramData                                   |
| 用户程序数据漫游    | %APPDATA%                                      | C:\Users\test\AppData\Roaming                    |
| 用户程序数据本地    | %LOCALAPPDATA%                                 | C:\Users\test\AppData\Local                      |
| 系统 APPDATA 32 位  | %windir%\System32\config\systemprofile\AppData | C:\Windows\System32\config\systemprofile\AppData |
| 系统 APPDATA 64 位  | %windir%\SysWOW64\config\systemprofile\AppData | C:\Windows\SysWOW64\config\systemprofile\AppData |

- 系统是允许多用户操作的，因此 **ProgramData** 和 **AppData** 分别用于保存用户间共享和独享的配置文件和数据。

- [**ALLUSERSPROFILE** 与 **ProgramData** 的区别](https://stackoverflow.com/q/37269376)

- [**Local** 、 **LocalLow** 和 **Roaming** 之间的区别](https://www.howtogeek.com/318177/what-is-the-appdata-folder-in-windows)

  ![AppData 默认文件](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/聊聊流氓软件/imgs/explorer_appdata.png)

  都是用来存放用户配置文件或临时文件的，区别应该在于是否需要在网络上共享（ 漫游 ），平时没什么体会，不过看很多软件貌似都在随便乱用。

  **%APPDATA%** 目录初始只包含 **Adobe** 和 **Microsoft** 两个文件夹，其他目录（ 除了浏览器和 **IDE** 的配置 ）都可以删除。

- **系统 APPDATA** 是 **系统帐户** 的用户配置目录（ [参考](https://superuser.com/a/598626) ），目录需要一级一级进去。

  一般杀毒软件一类的进程是以 **系统帐户** 运行的，比如腾讯电脑管家。

- 有些恶心的软件可能会在 **%LOCALAPPDATA%\Packages** 目录下存放数据。

##### 用户目录

存放用户相关的数据。

| 说明         | 环境变量                                           | 实际路径                                                               |
| ------------ | -------------------------------------------------- | ---------------------------------------------------------------------- |
| 公共用户     | %PUBLIC%                                           | C:\Users\Public                                                        |
| 用户目录     | %USERPROFILE%                                      | C:\Users\test                                                          |
| 桌面         | %USERPROFILE%\Desktop                              | C:\Users\test\Desktop                                                  |
| 我的文档     | %USERPROFILE%\Documents                            | C:\Users\test\Documents                                                |
| 收藏夹       | %USERPROFILE%\Favorites\Links                      | C:\Users\test\Favorites\Links                                          |
| 快速启动     | %APPDATA%\Microsoft\Internet Explorer\Quick Launch | C:\Users\test\AppData\Roaming\Microsoft\Internet Explorer\Quick Launch |
| 用户开始菜单 | %APPDATA%\Microsoft\Windows\Start Menu             | C:\Users\test\AppData\Roaming\Microsoft\Windows\Start Menu             |
| 公用开始菜单 | %ProgramData%\Microsoft\Windows\Start Menu         | C:\ProgramData\Microsoft\Windows\Start Menu                            |
| 字体目录     | %windir%\Fonts                                     | C:\Windows\Fonts                                                       |
| 输入法目录   | %windir%\IME                                       | C:\Windows\IME                                                         |

- **PUBLIC** 是为了在多用户间共享数据，比如很多软件喜欢把快捷方式放到公共桌面下。

##### 临时文件

可以全部删除，可以用软媒清理大师一键清理。

| 说明           | 环境变量                           | 实际路径                                               |
| -------------- | ---------------------------------- | ------------------------------------------------------ |
| 系统临时文件   | %SystemRoot%\TEMP                  | C:\Windows\Temp                                        |
| 用户临时文件   | %TEMP% 和 %TMP%                    | C:\Users\test\AppData\Local\Temp                       |
| 最近使用的项目 | %APPDATA%\Microsoft\Windows\Recent | C:\Users\test\AppData\Roaming\Microsoft\Windows\Recent |

##### 操作步骤

我们要做的就是依次打开这些目录排查里面的子目录：

- 按创建日期（ **可以造假** ）倒序，一般流氓软件的文件会新一点。

  > 右键标题栏 > 其他 > 勾选公司，根据公司名很容易区分是不是第三方软件的文件。

  ![文件排序](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/聊聊流氓软件/imgs/explorer_details.png)

  **基本靠经验，一个实用的笨方法就是找一台相同系统的电脑，相同目录一个一个进行对比。**

- 如果包含卸载程序（ 一般是 `uninsxxx.exe` ）就先执行一下。

  有些软件很鸡贼不添加到注册表，一般人就找不到卸载的地方。

  **注意：之前碰到过一个流氓软件（ 忘了是什么 ）残留的卸载程序执行的时候被 Windows Defender 报病毒了，不放心的话就手动删吧。**

- 看到 **DLL** 文件就反注册（ [工具汇总](#工具汇总) ）一下，失败了不要紧。

  也可以用下面的方法批量删除。

- **C 盘** 刚装完系统大概是下图这样的，多出一些乱七八糟的文件/文件夹可以考虑删除。

  **不清楚有没有用就去网上搜一下文件名。**

  ![C 盘默认文件](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/聊聊流氓软件/imgs/drive_c.png)

- 删除各种乱七八糟的快捷方式，尤其是被篡改的 **IE** 快捷方式。

  ![网页快捷方式](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/聊聊流氓软件/imgs/ie_lnk.png)

- 删除整个安装目录。

- 收尾利用 **Everything** 搜索用户目录下残留的文件。

  ```ini
  *unins*.exe
  *.lnk
  \AppData *.exe
  \AppData *.dll
  ```

##### 文件占用

文件被占用一般是资源管理器、工具栏、输入法、字体、服务等还在运行，重启就可以释放占用，有的文件重启后会自动删除。当然不排除有些残留项会在重启的时候卷土重来，可以不重启直接根除源文件断绝后路。找到占用文件的进程，把它们关闭后就能删除了，查找占用的方法：

> 任务管理器 > 性能 > 打开资源监视器 > **CPU** > 搜索句柄 > 填入对应的目录名或文件名 > 结束掉搜索结果中的进程。

当然，用 **Process Explorer** 查询更好用。

**遇到权限问题或者其他问题怎么删都删不掉的可以用文件粉碎工具或者进 PE 里暴力删除。**

![资源监视器](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/聊聊流氓软件/imgs/taskmgr_perfmon.png)

##### 批量删除 DLL

如果通过资源监视器找不到进程，那通常是被资源管理器占用着（ 还可能是 **regsvr32** 进程 ），批处理简单查询（ **管理员权限** ）：

```powershell
:: 查询占用指定 DLL 的进程
tasklist /m xxxShellExt.dll

:: 查询指定进程占用的所有 DLL
tasklist /m /fi "IMAGENAME eq explorer.exe" | findstr /i shell
```

![tasklist 查询 DLL 占用](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/聊聊流氓软件/imgs/tasklist.png)

卸载 **DLL** 或者重命名都可以使注册表配置失效，再重启资源管理器就可以解除占用了。在桌面新建一个批处理文件 **批量删除 DLL.bat** ，随便拖拽需要删除的 **DLL** 文件所在目录下的文件到这个批处理文件的图标上即可安全删除对应目录下（ 包括子目录 ）所有的 **DLL** 文件（ 见下图动画 ）。

```powershell
:: 管理员提权
net session >nul 2>&1 || ( powershell -Command "Start-Process 'cmd' '/k \"\"%~f0\" \"%~1 \"\"' -Verb RunAs" & exit /b )
cd /d "%~dp1"
:: 避免删除系统目录
if /i "%cd%" == "%windir%\System32" goto :eof
if /i "%cd%" == "%windir%\SysWOW64" goto :eof
taskkill /f /im regsvr32.exe
pause
:: 卸载目录下所有的 dll
for %%i in (*.dll) do regsvr32 /s /u "%%~fi"
:: 结束资源管理器以释放占用
taskkill /f /im explorer.exe
:: 删除目录下所有的 dll
del /s /q *.dll
:: 启动资源管理器并定位到目录
start explorer & if exist %1 (explorer /select,%1) else explorer %cd%
:: 重试删除
del /s /q *.dll
```

![批量删除 DLL](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/聊聊流氓软件/imgs/batch_delete_dll.gif)

不用命令也是可以的，先用任务管理器把所有的 `explorer.exe` 进程杀掉，再执行：

> 任务管理器左上角 > 文件 > 运行新任务 > 浏览 > 下拉框选择 **所有文件** > 进要删除的目录一个一个删除

![任务管理器 > 运行 > 浏览](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/聊聊流氓软件/imgs/taskmgr_run_browse.png)

如果提示 **被任务管理器占用** 就把任务管理器关了再用快捷键 `Ctrl + Shift + Esc` 打开。结束 `explorer.exe` 进程会导致桌面变黑（ 桌面和任务栏都被关掉了 ），重新运行 `explorer.exe` 即可。

找资料时看到了 [AlwaysUnloadDll](https://techjourney.net/free-up-memory-automatically-by-unloading-dlls-in-windows-9x-and-nt-with-alwaysunloaddll) 这个注册表配置项，似乎是为了使古老系统（ **XP** 之前 ）在没有进程引用 **DLL** 后能尽快将其从内存中释放，这对于新系统来说是没作用的。（ [参考](https://www.neowin.net/forum/topic/741324-xpalwaysunloaddll-does-improve-ram-utilization/?do=findComment&comment=590647236) ）

> [The Shell automatically unloads any DLL when its usage count is zero, but only after the DLL has not been used for a period of time.](<https://docs.microsoft.com/previous-versions/windows/desktop/legacy/cc144064(v=vs.85)#unloading-the-dll>)

#### 重启电脑

到此基本算是清理干净了（ **SoftCnKiller** 应该扫不出问题了 ），重启一遍电脑再检查下是否还有残留文件。可以再用杀毒软件查杀下，有些系统配置也可能会被恶意篡改（ 比如浏览器主页和搜索引擎 ）。

### 关于微软电脑管家

---

> [【微软】微软电脑管家 v.1.0 内测，欢迎小众小伙伴们反馈和建议](https://meta.appinn.net/t/topic/29410)

![微软电脑管家](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/聊聊流氓软件/imgs/ms_pc_manager.png)

刷新闻时看到还以为看错了，结果是真的，下载试用后说说我的槽点：

- 是否山寨

  这个软件的 [官网](https://bing.com/guanjia) 挂在必应的域名下面，安装包的数字签名是微软的，公众号也通过了微软中国的企业认证， [微软社区](https://answers.microsoft.com/zh-hans/windows/forum/all/微软电脑管家/4a460771-247c-4c3d-865b-5dfa401808ff) 也证实了隶属于微软中国。也有说法这是世纪互联开发的中国特供版，反正和微软中国多少有点关系。

  **既然打着微软的旗号肯定是免费无广告的，那代价估计就是采集用户数据进行分析了。**

- 下载了离线安装包，结果安装的时候还要在线下载 **.Net5** 。

  头一回见到这样的离线安装包。

- 安装完毕会有 **QQ 群** 二维码，熟悉的味道。

- 界面和功能怎么看都像是腾讯电脑管家的弟弟，还是刚出生的那种。

  产品路线图如果只是想照着腾讯电脑管家抄那就大可不必了，做大了反而像 **Edge** 一样系统级捆绑。

从目前（ 2022-04 ）测试版已有的功能来看 **不推荐** 使用，鸡肋而且还有风险。虽然希望官方下场整顿，但更怕官方带头耍流氓，强制自动更新和半夜开机闹鬼就是前车之鉴。

再说了，这年头正常使用几乎没有杀毒的需求（ 想想自己有什么值得被黑的 ），真中毒了装什么都不管用。所谓一键优化、快速查杀只是为了迎合强迫症患者而已。我个人使用腾讯电脑管家也纯粹只是因为自带的 **Windows Defender** 严格过头了。

### 其他资料

---

- [一种利用证书规则禁用流氓软件的方法](https://www.zhihu.com/question/35135573/answer/96955614)

---

### 结语

---

经过反复测试发现这些流氓软件各自都还算本分，就算偷偷安装也是安装自己家族的兄弟，广告也就有数几个，只有流氓软件数量多了才能形成网上那种 [养蛊](https://search.bilibili.com/all?keyword=流氓软件) 的质变效果，而 **P2P 下崽器** 才是 **万恶之源** ，除此之外我目前 ~~还没找到~~ （ 没机会 ）其它软件有这个效果的。

**所以，平时好好注意上网习惯一般是没问题的，就算中招了，照着本文给的步骤也能轻松处理。**

站在软件开发的角度上，流氓软件的开机启动、定时任务、保活机制、右键菜单、自动恢复等等还是值得学习的，用在 **正途** 上还是能提高电脑的使用效率。

写这篇文章本来只是想做个笔记而已，结果跑偏学 [注册表](https://docs.microsoft.com/windows/win32/sysinfo/registry) 去了，对一个个路径的作用有了进一步了解。另外又学习了许多批处理脚本的特殊技巧（ [批处理之家](http://www.bathome.net) ），在记事本里面写批处理也算是手撸代码了，写的时候很痛苦，但写成功之后还是很上瘾的 😂 。

---

#### 转载请注明出处： [https://github.com/anyesu/blog/issues/42](https://anyesu.github.io/blog/articles/42)
