![cover](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/聊聊%20Windows%20服务/imgs/cover.png)

### 什么是服务

---

**维基百科：** [Architecture of Windows NT](https://en.wikipedia.org/wiki/Architecture_of_Windows_NT#Executive) 、[Windows service](https://en.wikipedia.org/wiki/Windows_service)

> **The term "service" in this context generally refers to a callable routine, or set of callable routines.** This is distinct from the concept of a "**service process**", which is a user mode component somewhat analogous to a [daemon](<https://en.wikipedia.org/wiki/Daemon_(computing)>) in [Unix-like](https://en.wikipedia.org/wiki/Unix-like) operating systems.

从 [Microsoft 技术文档](https://docs.microsoft.com) 找的一些描述：

> **A service is an application type that runs in the system background and is similar to a UNIX daemon application.** Services provide core operating system features, such as Web serving, event logging, file serving, help and support, printing, cryptography, and error reporting. With the Services snap-in, you can manage services on local or remote computers.
>
> [原文](<https://docs.microsoft.com/previous-versions/windows/it-pro/windows-server-2003/cc783643(v=ws.10)#services-overview-1>)

> **A service is a long-running executable that does not support a user interface, and which might not run under the logged-on user account. The service can run without any user being logged on to the computer.**
>
> [原文](https://docs.microsoft.com/dotnet/api/system.serviceprocess.servicebase#remarks)

> **Microsoft Windows services, formerly known as NT services, enable you to create long-running executable applications that run in their own Windows sessions. These services can be automatically started when the computer boots, can be paused and restarted, and do not show any user interface.** These features make services ideal for use on a server or whenever you need long-running functionality that does not interfere with other users who are working on the same computer. You can also run services in the security context of a specific user account that is different from the logged-on user or the default computer account.
>
> **You can easily create services by creating an application that is installed as a service.** For example, suppose you want to monitor performance counter data and react to threshold values. You could write a Windows Service application that listens to the performance counter data, deploy the application, and begin collecting and analyzing data.
>
> [原文](https://docs.microsoft.com/dotnet/framework/windows-services/introduction-to-windows-service-applications)

> **A _service application_ conforms to the interface rules of the Service Control Manager (SCM). It can be started automatically at system boot, by a user through the Services control panel applet, or by an application that uses the service functions. Services can execute even when no user is logged on to the system.**
>
> **A _driver service_ conforms to the device driver protocols.** It is similar to a service application, but it does not interact with the SCM. For simplicity, **the term _service_ refers to a _service application_ in this overview.**
>
> [原文](https://docs.microsoft.com/windows/win32/services/services) （ [PDF](https://docs.microsoft.com/windows/win32/opbuildpdf/services/toc.pdf?branch=live) ）

按我的理解，服务就是一个抽象概念，是一套被设计用于管理那些 **需要长时间运行、具有依赖关系、没有用户界面、不需要用户登录、需要特殊权限、可跟随系统启动而自动运行的程序** 的体系结构，而相关的数据库、程序、进程都是其中不可或缺的一部分。用户向系统注册服务后便由系统来自动调度服务而无需用户参与。任务管理器的服务标签页中，每行数据可以表示一个服务，实际数据存储于注册表中：

```ini
HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services
```

**服务这个术语更倾向于描述程序的运行方式，比如以服务的方式运行（ run as a service ）。**

**Windows** 中的服务和 **Linux** 中的服务从目的性上（ 后台运行、开机启动等 ）来说比较类似，只不过实现方式和运行机制有所不同。 **Linux** 服务通常会在 `/etc/init.d` 目录下有一个对应的配置脚本（ [参考](https://unix.stackexchange.com/a/20361) ），比起在 **Windows** 上更直观易懂，配置服务也更容易。

- [Linux—服务管理三种方式（chkconfig 和 service 和 systemctl）](https://www.cnblogs.com/liuhaidon/p/11452072.html)

#### 服务变更历史

- [What's New in Services for Windows 8](https://docs.microsoft.com/windows/win32/services/what-s-new-in-services-for-windows-8)
- [What's New in Services for Windows 7](https://docs.microsoft.com/windows/win32/services/what-s-new-in-services)
- [Service Changes for Windows Vista](https://docs.microsoft.com/windows/win32/services/service-changes-for-windows-vista)

### 服务与程序和进程的关系

---

#### 类似的问答

- [What's the difference between an Application, a Process, and a Service?](https://superuser.com/q/209654)
- [What is the difference between 'Application' and 'Process' in OS X?](https://apple.stackexchange.com/q/131112)
- [windows 下的服务和进程有什么区别？](https://www.zhihu.com/question/23116273)

#### 相关术语解释

##### [操作系统](https://zh.wikipedia.org/wiki/操作系统)

> **Operating System**

> 操作系统是管理计算机资源并为用户提供服务的系统软件，作为硬件与应用软件之间的接口，操作系统起着承上启下的作用。
>
> 计算机系统大体上可以分为三个部分：硬件、系统软件和应用软件。硬件是所有软件运行的物质基础。而操作系统（简称 OS）则是最重要的系统软件。是管理计算机系统资源、控制程序执行的系统软件。操作系统作为计算机用户与计算机硬件之间的接口程序，向用户和应用软件提供各种服务，合理组织计算机工作流程，并为用户使用计算机提供良好运行环境。
>
> 操作系统的核心任务是管理计算机系统中的资源。操作系统为用户提供简单、有效的资源使用方法，分配资源使用权，解决资源争用冲突，跟踪资源使用状况，最大限度地实现资源共享，提高资源利用率。而操作系统地其他任务，如扩充机器功能、屏蔽使用细节、方便用户使用、合理组织工作流程、管理人机界面等，都是围绕着资源管理任务实现的。

##### 资源

> 所谓资源，泛指在计算机系统中，用户能够使用的各种硬件和软件部分。计算机系统中可以使用的硬件资源主要是处理机、存储器、输入/输出设备等。而软件资源则包括相应的程序和数据等。

##### [程序](https://zh.wikipedia.org/wiki/计算机程序)

> **Computer Program**

> 在早期的计算机中，人们是直接用机器语言（即机器指令代码）来编写程序的，这种方式编写的程序称为 **手编程序** 。这种用机器语言书写的程序，计算机完全可以“识别”并能执行，所以又叫做 **目的程序** 。
>
> 用某种高级语言或汇编语言编写的程序称为源程序 ，源程序不能直接在计算机上执行。如果源程序是用汇编语言编写的，则需要一个汇编程序将其翻译成目标程序后才能执行。如果源程序是用某种高级语言编写的，则需要对应的解释程序或者编译程序对其进行翻译，然后在机器上运行。

通常用源代码（ **Source code** ，人类可读的符合程序设计语言规范书写的文本文件 ）表示源程序，而程序泛指目的程序，即可执行的文件（ **Executable** ），不需要关联 **打开方式** 就能双击打开的文件。在 **Windows** 中除了常见的 **exe** 文件和批处理文件外，还可以用注册表查询 **HKEY_CLASSES_ROOT** 中数据为 `"%1" %*` 的项。

- [What are the differences between a Program, an Executable, and a Process?](https://stackoverflow.com/q/12999850)
- [操作系统是如何运行可执行文件的？](https://www.zhihu.com/question/430325644)
- [什么是程序（Program）](https://zhuanlan.zhihu.com/p/88387740)

##### [软件](https://zh.wikipedia.org/wiki/软件)

> **Software**

软件是一系列文档、程序以及其正常运行所需的相关数据的集合。我们常说的软件（ 手机上的 **APP** ）一般指的是运行在操作系统之上的应用软件（ **Application** ），比如 **QQ** ，打开安装目录可以看到除了 **exe** 文件外还有一堆其他的文件。

> 应用软件是指计算机用户利用计算机的软件、硬件资源为某一专门的应用目的而开发的软件。例如，科学计算、工程设计、数据处理、事务处理和过程控制等方面的程序，以及文字处理软件、表格处理软件、辅助设计软件（**CAD**）和实时处理软件等。

##### 应用与任务

> **App & Task**

对应 **win10** 任务管理器中进程标签页下的应用分类，每个应用展开后会有任务。应用是存在前台窗口与用户进行交互的主进程，任务是其子进程或者抽象出来的窗口。像常用的 **合并任务栏按钮** 设置项，没合并前显示全部的窗口任务，合并后只显示应用。（ [打开任务栏设置](ms-settings:taskbar) ）

它们和进程之间的对应关系不太好描述，自行感受吧：

- 打开两个文件夹窗口后，可以看到 **1** 个资源管理器应用、 **2** 个文件夹任务、 **1** 个 **explorer.exe** 进程。
- 使用 `regedit -m` 命令打开两个注册表编辑器，可以看到 **2** 个应用、 每个应用 **1** 个任务、 **2** 个 **regedit.exe** 进程。
- 打开 **nginx** 后不显示应用和任务，但可以看到 **2** 个 **nginx.exe** 后台进程。
- 像 **VMware** 虚拟机，最小化在托盘时不显示应用和任务，而双击打开后可以看到 **1** 个应用、 **2** 个任务、 **3** 个进程。

##### [进程](https://zh.wikipedia.org/wiki/进程)

> **Process**

> 进程是程序的一次执行，该程序可以和其他程序并发执行。进程通常是由程序、数据和进程控制块（PCB）组成的。
>
> 在操作系统中，通常使用 **进程（process）** 这一概念描述程序的动态执行过程。通俗地讲，程序是静态实体，而进程是动态实体，是执行中的程序。进程不仅仅包含程序代码，也包含了当前的状态（这由程序计数器和处理机中的相关寄存器表示）和资源。因此，如果两个用户用同样一段代码分别执行相同功能的程序，那么其中的每一个都是一个独立的进程。虽然其代码是相同的，但是数据却未必相同。

进程是可并发执行的程序在一个数据集合上的运行过程，是系统进行资源分配和调度的基本单位，是线程的容器。迄今为止对这一概念还没有一个确切的统一的描述。一个进程是特定程序的一个实例（ **instance** ），在运行过程中可以创建自己的子进程。 [后台进程](https://zh.wikipedia.org/wiki/后台进程) 就是不与用户进行交互（ 隐藏起来 ）的进程。

程序和进程就是 [名词](https://baike.baidu.com/item/名词) 与 [现在进行时](https://baike.baidu.com/item/现在进行时) 的关系，常见的比喻是菜谱和做菜过程。

- [进程基础知识](https://www.cnblogs.com/vincentqliu/p/7019500.html)
- [进程到底是什么？](https://www.zhihu.com/question/55185966)
- [并发编程 — 进程](https://blog.csdn.net/Struggle_Hard_Z/article/details/122542105)
- [什么是进程](https://zhuanlan.zhihu.com/p/106283969)
- [进程和程序的区别有哪几个方面？](https://www.zhihu.com/question/426548420)
- [进程和线程是不是操作系统才有的概念？](https://www.zhihu.com/question/346422354)

##### 服务程序

一种符合 [服务控制管理器 (SCM)](https://docs.microsoft.com/windows/win32/services/service-control-manager) 接口规范的应用程序，即 **Service Program** ，是服务启动实际所执行的可执行文件。（ 详见下文 ）

> **以上引用内容摘自 [计算机组成原理第 4 版](https://baike.baidu.com/item/计算机组成原理第4版) 和 [软件设计师教程（第三版）（修订版）](https://baike.baidu.com/item/软件设计师教程（第三版）（修订版）) ，多年以后再回顾教材发现上课学的东西早忘得一干二净了，还好书留着可以当词典用。**

**它们之间的关系：**

- 用户双击 > 运行 **程序** > 产生 **进程** 。
- 启动服务 > 运行 **服务程序** > 产生 **服务进程** 。

这些术语本就比较抽象，再加上翻译、口语化、场景（ 开发还是使用 ）等等因素就容易造成歧义令人困惑。就像 `1+1=2` 一样，不需要纠结为什么是这样，只需要知道这是约定成俗的，了解多了自然就懂了。这些术语的存在是为了帮助人们更容易理解复杂抽象的计算机软件体系结构。口语中的服务通常在各个语境中分别指代服务本身、服务程序和服务进程，能明白其中的含义就行了。

### 什么是服务控制管理器 (SCM)

---

> **Service Control Manager** (**SCM**) is a special system **process** under the **Windows NT** family of **operating systems**, which starts, stops and interacts with Windows service processes. It is located in the `%SystemRoot%\System32\services.exe` executable. Service processes interact with SCM through a well-defined [API](https://en.wikipedia.org/wiki/Application_programming_interface), and the same API is used internally by the interactive Windows service management tools such as the [MMC](https://en.wikipedia.org/wiki/Microsoft_Management_Console) snap-in `Services.msc` and the command-line Service Control utility `sc.exe`. Terminating this file is used as a method of causing the [Blue Screen of Death](https://en.wikipedia.org/wiki/Blue_Screen_of_Death).
>
> [维基百科](https://en.wikipedia.org/wiki/Service_Control_Manager)

我们都知道服务设置为自动后就能开机启动，而这个操控者就是 **SCM** 。**SCM** 是一个特殊的系统进程，它执行各种与服务有关的任务。它跟随系统启动而运行，之后它便会启动所有设置了 **自动启动** 的服务以及它们所依赖的 **手动启动** 的服务。**SCM** 维护了一个数据库来存储已安装的服务，并提供了安全统一的方式来管理它们。

**SCM** 就是整个服务体系的核心，由它直接管理服务的一切配置和行为，它提供一系列 [函数](https://docs.microsoft.com/windows/win32/services/service-functions) 供其他程序调用以间接控制服务：

- 维护已安装服务的数据库。
- 在系统启动时或按需启动服务和驱动程序服务。
- 枚举已安装的服务和驱动程序服务。
- 维护运行服务和驱动服务的状态信息。
- 将控制请求传输到正在运行的服务。
- 锁定和解锁服务数据库。

调用这些函数的程序根据职能主要分为以下几类：

#### [服务程序](https://docs.microsoft.com/windows/win32/services/service-programs)

> **Service Program**

为一个或多个服务提供可执行代码的应用程序。主要用到了连接 **SCM** 和修改服务状态的函数。一些 **服务程序** 还会通过命令行参数实现自 [安装](https://docs.microsoft.com/windows/win32/services/installing-a-service) 的功能，比如 `mysqld --install` 。

通常 **服务程序** 作为控制台程序直接运行而不是通过服务运行时会报错：

```ini
# 参考 StartServiceCtrlDispatcher 的返回值
1063 (ERROR_FAILED_SERVICE_CONTROLLER_CONNECT)
```

#### [服务配置程序](https://docs.microsoft.com/windows/win32/services/service-configuration-programs)

> **Service Configuration Program**

主要用于增删改查 **SCM** 数据库中服务配置信息的程序。虽然可以通过注册表管理数据库，但还是应该只使用 **SCM** 提供的相关函数以确保配置的正确性。系统自带的命令行工具 [Sc.exe](https://docs.microsoft.com/windows/win32/services/configuring-a-service-using-sc) 就包含此类功能。

#### [服务控制程序](https://docs.microsoft.com/windows/win32/services/service-control-programs)

> **Service Control Program**

主要用于 [启动服务程序](https://docs.microsoft.com/windows/win32/services/service-startup) 和 [控制服务进程](https://docs.microsoft.com/windows/win32/services/service-control-requests) 的程序，后面简称 **SCP** 。它们只是向 **SCM** 发送请求，再由 **SCM** 转发给服务。系统自带的命令行工具 [Sc.exe](https://docs.microsoft.com/windows/win32/services/controlling-a-service-using-sc) 、**net.exe** 就包含此类功能。

**SCM** 以串行的方式依次处理请求，一个服务处理完一个请求后 **SCM** 才会发送下一个请求。因此如果服务正忙于处理请求时 ，之后的 **StartService** 和 **ControlService** 都会阻塞，超时（ **30** 秒 ）直接返回错误。

**SCM** 同时是一个 [RPC](https://docs.microsoft.com/windows/win32/rpc/rpc-start-page) 服务器，因此服务配置和服务控制程序可以管理远程主机上的服务。

### 进一步了解服务

---

#### 服务属性

所有属性值详见下面的链接：

- [Win32_Service class](https://docs.microsoft.com/windows/win32/cimwin32prov/win32-service)
- [CreateService Parameters](https://docs.microsoft.com/windows/win32/api/winsvc/nf-winsvc-createservicea#parameters)
- [sc.exe create](https://docs.microsoft.com/windows-server/administration/windows-commands/sc-create)
- [Database of Installed Services](https://docs.microsoft.com/windows/win32/services/database-of-installed-services)
- [Service Record List](https://docs.microsoft.com/windows/win32/services/service-record-list)
- [ServiceInstaller Properties](https://docs.microsoft.com/dotnet/api/system.serviceprocess.serviceinstaller#properties)

提一下 **ServiceName** 、 **DisplayName** 、 **Description** 这三个属性， **ServiceName** 才是每个服务的唯一标识，比较时不区分大小写，另外两个则是显示名称和描述，是为了帮助用户识别这个服务的作用。另外， **DisplayName** 还用于 **NET START** 命令。然而在 **任务管理器** 和 **服务** 以及其他第三方工具的界面中通常只显示两个字段（ 名称和描述 ），内容则是这三个属性混用或者组合而成的，很混乱。

#### 服务类型

| 名称                            | 数值       | 说明                                                                                                                                  |
| ------------------------------- | :--------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| **SERVICE_ADAPTER**             | 0x00000004 | 保留的。                                                                                                                              |
| **SERVICE_FILE_SYSTEM_DRIVER**  | 0x00000002 | 文件系统驱动程序服务。                                                                                                                |
| **SERVICE_KERNEL_DRIVER**       | 0x00000001 | 设备驱动程序服务。                                                                                                                    |
| **SERVICE_RECOGNIZER_DRIVER**   | 0x00000008 | 保留的。                                                                                                                              |
| **SERVICE_WIN32_OWN_PROCESS**   | 0x00000010 | 独占一个进程的服务。                                                                                                                  |
| **SERVICE_WIN32_SHARE_PROCESS** | 0x00000020 | 与其他服务共享一个进程的服务。                                                                                                        |
| **SERVICE_USER_OWN_PROCESS**    | 0x00000050 | 在登录的用户帐户下运行的独占服务。                                                                                                    |
| **SERVICE_USER_SHARE_PROCESS**  | 0x00000060 | 在登录的用户帐户下运行的共享服务。                                                                                                    |
| **SERVICE_INTERACTIVE_PROCESS** | 0x00000100 | [可交互的服务](https://docs.microsoft.com/windows/win32/Services/interactive-services) 。**Windows Vista** 起服务不能直接与用户交互。 |

> 服务可以通过调用 [SetServiceBits](https://docs.microsoft.com/windows/win32/api/lmserver/nf-lmserver-setservicebits) 函数来注册其他类型信息。调用 [NetServerGetInfo](https://docs.microsoft.com/windows/win32/api/lmserver/nf-lmserver-netservergetinfo) 和 [NetServerEnum](https://docs.microsoft.com/windows/win32/api/lmserver/nf-lmserver-netserverenum) 函数获取支持的服务类型。（ [来源](https://docs.microsoft.com/windows/win32/services/service-record-list) ）
>
> **SERVICE_INTERACTIVE_PROCESS** 需要和 **SERVICE_WIN32_OWN_PROCESS** 或 **SERVICE_WIN32_SHARE_PROCESS** 组合使用，并且要在 **LocalSystem** 帐户上下文中运行。

- **驱动程序服务** 的运行和管理方式有所不同，本文先不做深入了解了。
- [用户服务](https://docs.microsoft.com/windows/application-management/per-user-services-in-windows) 在用户登录时使用模板创建，退出时删除，起到用户级别的隔离。名称形如 `OneSyncSvc_ff97b` ，这个后缀是每次登录后随机生成的。
- [保护反恶意软件服务](https://docs.microsoft.com/windows/win32/services/protecting-anti-malware-services-)

#### 服务启动类型

| 名称                     | 数值       | 说明                                                                                                                                                                                                                                                                                                    |
| ------------------------ | :--------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **SERVICE_AUTO_START**   | 0x00000002 | 系统启动时由 **SCM** 自动启动的服务。详见 [自动启动服务](https://docs.microsoft.com/windows/win32/services/automatically-starting-services) 。**DelayedAutostart** 设为 **1** 时表示 [自动(延迟启动)](https://docs.microsoft.com/windows/win32/api/winsvc/ns-winsvc-service_delayed_auto_start_info) 。 |
| **SERVICE_BOOT_START**   | 0x00000000 | 由系统加载程序启动的设备驱动程序。此值仅对驱动程序服务有效。                                                                                                                                                                                                                                            |
| **SERVICE_DEMAND_START** | 0x00000003 | 手动，当进程调用 **StartService** 函数时由 **SCM** 启动的服务 。详见 [按需启动服务](https://docs.microsoft.com/windows/win32/services/starting-services-on-demand) 。                                                                                                                                   |
| **SERVICE_DISABLED**     | 0x00000004 | 禁止启动的服务。尝试启动此类服务会返回 [错误代码](https://docs.microsoft.com/windows/win32/debug/system-error-codes) **ERROR_SERVICE_DISABLED** 。                                                                                                                                                      |
| **SERVICE_SYSTEM_START** | 0x00000001 | 由 **IoInitSystem** 函数启动的设备驱动程序。此值仅对驱动程序服务有效。                                                                                                                                                                                                                                  |

- ["Automatic" vs "Automatic (Delayed start)"](https://stackoverflow.com/a/11015576)
- [Service Trigger Events](https://docs.microsoft.com/windows/win32/services/service-trigger-events)

#### [服务状态](https://docs.microsoft.com/windows/win32/services/service-status-transitions)

| 名称                         | 数值       | 说明           |
| ---------------------------- | :--------- | :------------- |
| **SERVICE_CONTINUE_PENDING** | 0x00000005 | 服务正在恢复。 |
| **SERVICE_PAUSE_PENDING**    | 0x00000006 | 服务正在暂停。 |
| **SERVICE_PAUSED**           | 0x00000007 | 服务已暂停。   |
| **SERVICE_RUNNING**          | 0x00000004 | 服务正在运行。 |
| **SERVICE_START_PENDING**    | 0x00000002 | 服务正在启动。 |
| **SERVICE_STOP_PENDING**     | 0x00000003 | 服务正在停止。 |
| **SERVICE_STOPPED**          | 0x00000001 | 服务未运行。   |

服务运行后需要及时正确地向 **SCM** 更新自己最新的 [状态](https://docs.microsoft.com/windows/win32/api/winsvc/ns-winsvc-service_status) ，这样 **SCP** 才能通过 **SCM** 查询服务的状态。服务的状态决定了服务和 **SCM** 之间该如何交互。例如，如果服务正处于 **SERVICE_STOP_PENDING** 状态，则 **SCM** 不会向服务发送进一步的控制请求，因为此状态指示服务正在关闭。

> [The following table shows the action of the SCM in each of the possible service states.](https://docs.microsoft.com/windows/win32/api/winsvc/nf-winsvc-controlservice#remarks)

服务的初始化状态是 **SERVICE_STOPPED** ，主要的合法转换过程见下图：

![服务状态转换](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/聊聊%20Windows%20服务/imgs/service_status_flow_diagram.png)

#### 服务程序启动过程

看不到 [StartService](https://docs.microsoft.com/windows/win32/api/winsvc/nf-winsvc-startservicea#remarks) 的底层实现，我猜测 **SCM** [启动服务](https://docs.microsoft.com/windows/win32/services/service-startup) 的大概流程应该是这样的（ [参考](https://www.fujieace.com/reverse-engineering/msam/service-program-debugging.html) ）：

- **SCP** 调用 **StartService** 。

- **SCM** 准备启动服务。

  - 获取 **服务锁** 。

    确保同一时刻只有一个服务在启动，只有在启动服务时才会获取锁，并且不再允许除 **SCM** 外的其他进程控制锁。（ [参考](https://docs.microsoft.com/windows/win32/api/winsvc/nf-winsvc-lockservicedatabase#remarks) ）

  - 从注册表中读取服务路径（ **ImagePath** ）用于启动进程（ 包含启动参数 ）。

  - 从数据库查找 [帐户](https://docs.microsoft.com/windows/win32/services/service-user-accounts) 信息并登录，加载用户配置。

- 如果多个服务共享一个进程且该进程已存在则获取进程对应的连接。

- 否则创建新的服务进程（ 将登录令牌分配给进程 ），等待建立连接。

  在 [入口点](https://docs.microsoft.com/windows/win32/services/service-entry-point) 中调用 [StartServiceCtrlDispatcher](https://docs.microsoft.com/windows/win32/api/winsvc/nf-winsvc-startservicectrldispatchera#remarks) ：

  - 建立主线程和 **SCM** 之间的连接（ [命名管道](https://docs.microsoft.com/windows/win32/services/services-and-rpc-tcp) ）。
  - 将主线程作为 **dispatcher 线程** 驻留在一个循环内接收来自 **SCM** 的请求。
  - 直到发生错误或者进程中所有服务都结束了才会使主线程继续往下执行。

  默认超过 **30** 秒没有调用 **StartServiceCtrlDispatcher** 会直接终止进程。

  ![事件查看器 > 自定义视图 > 管理事件 > 服务启动失败](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/聊聊%20Windows%20服务/imgs/scm_startup_timeout.png)

  [修改超时时间](https://docs.microsoft.com/windows-hardware/drivers/debugger/preparing-to-debug-the-service-application#-adjusting-the-service-application-timeout) （ 重启才会生效 ）：

  ```ini
  HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control
      ServicesPipeTimeout = 60000
  ```

- 连接建立时， **SCM** 发送 **启动请求** 并传递启动参数。

  当收到通知用于执行 [ServiceMain](https://docs.microsoft.com/windows/win32/api/winsvc/nc-winsvc-lpservice_main_functiona#remarks) 的线程创建成功后， **StartService** 就直接返回以继续执行 **SCP** 中的代码（ 可定期 [查询](https://docs.microsoft.com/windows/win32/api/winsvc/nf-winsvc-queryservicestatus) 或者 [监听](https://docs.microsoft.com/windows/win32/api/winsvc/nf-winsvc-notifyservicestatuschangea) 服务的最新状态 ）。

- **SCM** 继续等待进程退出（ 表示启动失败 ）或者报告 **SERVICE_RUNNING** 状态。

  如果服务在 **80** 秒内没有更新其状态，则 **SCM** 会认为服务发生了错误，将记录一个事件并停止服务（ **不确定是否会终止进程** ）。

- 当 **SCM** 得知服务正在运行后便会 [释放](https://docs.microsoft.com/windows/win32/api/winsvc/nf-winsvc-unlockservicedatabase) **服务锁** 。

**dispatcher 线程** 的请求处理流程：

- **启动请求**

  新建线程调起此服务对应的 [ServiceMain](https://docs.microsoft.com/windows/win32/services/service-servicemain-function) 并通知 **SCM** 线程创建成功。

  - 调用 [RegisterServiceCtrlHandler](https://docs.microsoft.com/windows/win32/api/winsvc/nf-winsvc-registerservicectrlhandlera#remarks) 注册 [Service Control Handler](https://docs.microsoft.com/windows/win32/services/service-control-handler-function) 函数以监听来自 **SCM** 的 **控制请求** 。

    由于调用 [SetServiceStatus](https://docs.microsoft.com/windows/win32/api/winsvc/nf-winsvc-setservicestatus#remarks) 依赖于 **RegisterServiceCtrlHandler** 返回的 **服务状态句柄** ，所以只有将 **RegisterServiceCtrlHandler** 放置在 **ServiceMain** 中最开始的位置才能够在发生错误时总能将状态更新为 **SERVICE_STOPPED** 。

  - 执行服务初始化逻辑并更新服务状态为 **SERVICE_RUNNING** 。

    初始化过程应尽可能快（ 不超过 **1** 秒 ），否则要考虑特殊方法去优化。

  - 执行服务实际的业务逻辑。

    避免直接调用 [ExitThread](https://docs.microsoft.com/windows/win32/api/processthreadsapi/nf-processthreadsapi-exitthread) 来结束线程，这样做会跳过清理任务而导致内存泄漏。

- **控制请求** （ [ControlService](https://docs.microsoft.com/windows/win32/api/winsvc/nf-winsvc-controlservice#remarks) ）

  在当前线程上下文中调起 [Handler](https://docs.microsoft.com/windows/win32/api/winsvc/nc-winsvc-lphandler_function#remarks) ，根据请求的 **控制代码** 执行对应的业务代码。

  **Handler** 被调用的时候，如果业务代码会导致服务状态发生变化则一定要记得调用 **SetServiceStatus** ，如果不会导致状态变化则不需要调用。

  **控制代码** 除了已规定的几种外还可以是用户自定义的代码（ **128-255** ）如果有 [权限](https://docs.microsoft.com/windows/win32/services/service-security-and-access-rights) 的话。

> 以上流程只是我根据文档整理出来的，跟着代码走一遍也许能有进一步的理解。看文档的时候注意结合 [About Services](https://docs.microsoft.com/windows/win32/services/about-services) 、[Using Services](https://docs.microsoft.com/windows/win32/services/using-services) 、[winsvc](https://docs.microsoft.com/windows/win32/api/winsvc) ，因为一个概念的内容可能会分散在三个部分中。

### 什么是 Svchost

---

前面提到了 **与其他服务共享一个进程的服务** ，可以在多个服务之间共享代码，一个常见的例子就是服务主机 **Svchost.exe** ，它用来托管系统内部的服务（ [DLL](https://docs.microsoft.com/windows/win32/dlls/dynamic-link-libraries) 形式 ）。

> **Svchost.exe** （ **服务主机** ，或 **SvcHost** ）是一个系统进程，它可以承载 **Windows NT** 系列操作系统中的一个或多个 **Windows 服务** 。**Svchost** 在共享服务进程的实现中是必不可少的，其中多个服务可以共享一个进程以减少资源消耗。将多个服务组合到一个进程中可以节省计算资源，这一考虑是 **NT** 设计人员特别关心的，因为创建 **Windows** 进程比其他操作系统（ 例如 **Unix** 系列 ）需要更多时间和消耗更多内存。但是，如果其中一项服务导致未处理的异常，则整个进程可能会崩溃。此外，最终用户可能更难以识别组件服务。
>
> **svchost** 进程是在 **Windows 2000** 中引入的，尽管从 **Windows NT 3.1** 开始就存在对共享服务进程的底层支持。
>
> 它正确的位置应该位于系统盘根目录的 **\Windows\system32** 目录下（ 64 位系统则亦在系统盘根目录的 **\Windows\SysWOW64** ）。 **如果在其他地方看到，那么很可能是病毒程序。**
>
> [维基百科](https://en.wikipedia.org/wiki/Svchost.exe)

微软的 [文档](https://docs.microsoft.com/windows/win32/services/service-programs) 中明确指出了 **Svchost.exe 保留供操作系统使用，不应由非 Windows 服务使用，开发者应实现自己的服务托管程序** ，所以使用 **Svchost.exe** 伪装自己的行为就是在 **耍流氓** 。

早期的 **Windows** 一般只有有数几个 **svchost** 进程，之后才慢慢增多并划分成不同的主机组，不同组的服务在不同实例中运行。服务组是根据安全需求划分的。

**Windows 10 1703** 起有了新的改动：内存大于 **3.5 GB** 的机器自动为每个共享服务（ 有例外 ）分配一个单独进程。所以在任务管理器中看到密密麻麻一堆 **svchost** 进程是很正常的现象。单独进程会造成内存开销增大（ 大概 **500 MB** ），但好处是加强了安全性、稳定性、可扩展性，降低了故障排除的开销，以及更细致的资源管理和诊断数据。（ [参考](https://docs.microsoft.com/windows/application-management/svchost-service-refactoring) ）

#### Svchost 参考资料

- [创建 SvcHost.exe 调用的服务原理与实践](https://blog.csdn.net/lionzl/article/details/4241559)

  > **Svchost** 本身只是作为服务宿主，并不实现任何服务功能，需要 **Svchost** 启动的服务以动态链接库形式实现，在安装这些服务时，把服务的可执行程序指向 **Svchost** ，启动这些服务时由 **Svchost** 调用相应服务的动态链接库来启动服务。
  >
  > 那么 **Svchost** 如何知道某一服务是由哪个动态链接库负责呢？这不是由服务的可执行程序路径中的参数部分提供的，而是服务在注册表中的参数设置的，注册表中服务下边有一个 **Parameters** 子键其中的 **ServiceDll** 表明该服务由哪个动态链接库负责。并且所有这些服务动态链接库都必须要导出一个 **ServiceMain()** 函数，用来处理服务任务。

- [svchost.exe 启动服务原理(如何查看系统服务究竟启动了哪个文件)](https://blog.csdn.net/yangyuankp/article/details/8170720)

- [svchost.exe 为什么会占用那么多 CPU？](https://www.zhihu.com/question/24215752)

- [DLL 与 UEFI 的故事之一：Windows 下运行 Dll 的三种方式](https://zhuanlan.zhihu.com/p/30000572)

- [How to determine what services are running under a SVCHOST.EXE process](https://www.bleepingcomputer.com/tutorials/list-services-running-under-svchostexe-process)

- [安全之路 —— 利用 SVCHost.exe 系统服务实现后门自启动](https://www.cnblogs.com/PeterZ1997/p/9532033.html)

#### 编写在 Svchost 中运行的 DLL

- [How to run a dll as a service?](https://stackoverflow.com/q/30554180)
- [SVCHOST 启动服务实战](https://blog.csdn.net/huanglong8/article/details/70666987)
- [Window 服务学习笔记](http://www.youngroe.com/2015/11/20/Learning/windowservices)
- [SvcHostDemo](https://github.com/apriorit/SvcHostDemo)
- [DllSrv](https://github.com/kouzhudong/DllSrv)

### 注册任何程序为服务

---

一个标准的 **服务程序** 必须包含以下几点 **SCM** 接口规范：

- [Service Entry Point](https://docs.microsoft.com/windows/win32/services/service-entry-point)
- [Service ServiceMain Function](https://docs.microsoft.com/windows/win32/services/service-servicemain-function)
- [Service Control Handler Function](https://docs.microsoft.com/windows/win32/services/service-control-handler-function)

并不是说 **SCM** 会检测程序里是否暴露了这几个函数， **而是一个服务想要正常运行就需要进程和 SCM 之间建立连接并能够响应 SCM 发出的请求（ 正确更新状态 ）** ，要实现这一目的就不得不利用上面的几个函数。比如用 **sc** 命令可以成功创建一个记事本的服务，启动服务的时候记事本也能打开，但因为没法调用 **StartServiceCtrlDispatcher** ， **30** 秒之后就会被 **SCM** 强制关闭并提示启动失败。

我们日常使用的软件在设计的时候大多没有考虑以服务的形式运行，自然就不满足上面的接口规范。如果我们非要以服务的形式运行就需要在它们和 **SCM** 之间构建一座桥梁， **SCM** 通过这个 **第三者** 来间接控制进程，就像 **Svchost** 那样。

找了几个工具可以实现将任何程序注册为 **合法的 Windows 服务** 。工具可以放在任何位置，不必放在系统目录下，脚本在程序目录下执行。

#### [RunAsSrv](http://www.baiy.cn/utils/runassrv/index.htm)

> 最后更新时间： **2006-08-03**

缺失 [MSVCP71.DLL](https://cn.dll-files.com/msvcp71.dll.html) 和 [MSVCR71.DLL](https://cn.dll-files.com/msvcr71.dll.html) ，下载后放到 **exe** 同级目录下或者安装 [微软常用运行库合集](https://www.haah.net/archives/2412.html) 可以解决。

**可能会被杀软报病毒，介意者慎用。**

```shell
runassrv add /cmdline:"C:\Users\test\Desktop\nginx\nginx.exe" /name:nginx_runassrv
```

#### [SrvStart](https://github.com/rozanski/srvstart)

> 最后更新时间： **2000-06-30**

很古老的工具，号称支持 **Windows NT 4** 之后的所有 **Windows** 版本。配置项很多，文档也不是很清楚，调通有点费劲。

```shell
set name=nginx_srvstart
set startup_dir=C:\Users\test\Desktop\nginx
set startup=%startup_dir%\nginx.exe
set shutdown="%startup%" -p "%startup_dir%" -s stop
:: 写入配置文件
(
echo [%name%]
echo startup_dir=%startup_dir%
echo startup=%startup%
echo shutdown=%shutdown%
) > nginx.ini
:: 创建服务
srvstart install %name% -c "%cd%\nginx.ini"
```

#### [RunAsService](https://github.com/luisperezphd/RunAsService)

> 最后更新时间： **2020-10-01**

需要安装 **.NET Framework 3.5** 。[官网](http://runasservice.com) 下载的不是最新的代码，仅支持 **exe** 和 **com** 类型的文件作为启动命令。

**需要在管理员命令提示符中运行，否则会看不到任何信息。**

```shell
RunAsService install "nginx_RunAsService" "C:\Users\test\Desktop\nginx\nginx.exe" -p "C:\Users\test\Desktop\nginx"
```

如果应用子进程异常关闭了会导致无法直接关闭服务，需要手动杀死 **RunAsService.exe** 进程。

#### [srvany](https://wangye.org/blog/archives/42)

> **srvany.exe** 是 **Microsoft Windows Resource Kits** 工具集的一个实用的小工具，用于将任何 **EXE** 程序作为 **Windows** 服务运行。

官网已经找不到了，只能通过第三方下载（ [参考](https://zhuanlan.zhihu.com/p/93808282) ）。支持 **暂停/恢复** 。

由于它只是一个服务外壳并没有提供安装命令，需要自己手动创建服务：

```shell
set name=nginx_srvany
set startup_dir=C:\Users\test\Desktop\nginx
set startup=%startup_dir%\nginx.exe
set "AppParameters= "
set reg_path=HKLM\SYSTEM\CurrentControlSet\services\%name%\Parameters
:: 安装服务
sc create %name% binPath= "%cd%\srvany.exe"
:: 配置注册表中的服务参数
reg add "%reg_path%" /f /v AppDirectory /t REG_SZ /d "%startup_dir%"
reg add "%reg_path%" /f /v Application /t REG_SZ /d "%startup%"
reg add "%reg_path%" /f /v AppParameters /t REG_SZ /d "%AppParameters%"
```

有人专门为它写了一个管理工具 [SrvanyUI](https://wangye.org/blog/archives/644) （ 已内置 **srvany** ），还包括了对系统服务的管理，可以摆脱注册表操作。

![SrvanyUI](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/聊聊%20Windows%20服务/imgs/SrvanyUI.png)

#### [NSSM](http://nssm.cc)

> 最后更新时间： **2017-05-16**
>
> **_nssm_ is a service helper which doesn't suck. _srvany_ and other service helper programs suck because they don't handle failure of the application running as a service.**

提供了其他工具没有的异常处理机制，注册表的结构类似于 **srvany** 。也可通过 [Chocolatey](http://chocolatey.org/packages/NSSM) 的方式安装， **Chocolatey** 中的 [nginx](https://community.chocolatey.org/packages/nginx) 就是通过这种方式创建服务的。

```shell
nssm install nginx_nssm "C:\Users\test\Desktop\nginx\nginx.exe"
```

也可以使用命令打开服务的配置界面：

```shell
nssm install nginx_nssm
```

![NSSM 安装服务](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/聊聊%20Windows%20服务/imgs/nssm_install.png)

#### [winsw](https://github.com/winsw/winsw)

> **Windows Service Wrapper**

根据配置文件来加载安装和启动配置 ，类似于 **SrvStart** 的升级版。 [V2](https://github.com/winsw/winsw/tree/v2.11.0) 版本创建一个服务就要复制一份程序的做法略显笨重，在 [V3](https://github.com/winsw/winsw/tree/v3) 版本中增加了全局方式。

**V2** 版本的配置过程：

```shell
set "name=nginx_winsw"
set startup_dir=C:\Users\test\Desktop\nginx
set startup=%startup_dir%\nginx.exe
copy /y WinSW-x64.exe %name%.exe
:: 写入配置文件
(
echo id: %name%
echo name: ''
echo description: ''
echo executable: '"%startup%"'
echo arguments: -p "%startup_dir%"
echo stopArguments: -p "%startup_dir%" -s stop
) > %name%.yml
:: 安装服务
%name%.exe install
```

整体使用下来 **NSSM** 体验最好，功能多使用也方便。 **winsw** 也不错，毕竟有配置文件更适合复杂配置以及批量安装和迁移。而 **SrvanyUI** 是 **UI** 最强大的，上手难度最低适合普通用户。

**此类工具毕竟需要高权限，出于安全方面考虑还是建议使用开源项目。**

#### nginx 服务

**nginx** 说实话不太适合做成服务的形式，管理起来也比较麻烦，而且上面的工具中除了 **NSSM** 和 **SrvStart** 外都不能正常关闭服务，不是进程没杀全就是其他的异常。我更喜欢的做法：

- 把快捷方式丢到开始菜单的启动项（ `shell:startup` ）中用于开机启动。

- 再建两个快捷方式改参数丢到任务栏工具栏中用于关闭和重启：

  ```shell
  :: 关闭
  nginx -s stop
  :: 重启
  nginx -s reload
  ```

### C# 编写服务程序

---

这里演示如何在 **Visual Studio** 中创建可向事件日志中写入消息的 **Windows** 服务应用程序。（ [如何调试](https://docs.microsoft.com/dotnet/framework/windows-services/how-to-debug-windows-service-applications) ）

具体步骤可以看 [微软文档](https://docs.microsoft.com/dotnet/framework/windows-services/walkthrough-creating-a-windows-service-application-in-the-component-designer) ，只是机翻的文档很别扭，我重新整理了一下。

> 在 [.NET 5.0 SDK 或更高版本](https://dotnet.microsoft.com/download/dotnet) 中可以使用 [BackgroundService](https://docs.microsoft.com/dotnet/core/extensions/windows-service) 创建 **Windows** 服务。（ [demo](https://github.com/dotnet-labs/WindowsServiceDemo) ）

#### 下载安装 [Visual Studio](https://visualstudio.microsoft.com)

新版安装程序还是很清爽的，按需选择，不像以前那样一股脑安装各种不需要的东西，太占空间了。

只是为了测试，勾选 **.NET 桌面开发** 即可，安装占用空间（ 不压缩 **C 盘** ）大概 **7.36 G** 。

![安装 Visual Studio](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/聊聊%20Windows%20服务/imgs/visual_studio_install.png)

#### 新建项目

以 **管理员权限** 运行 **VS** 并新建项目 **WindowsServiceTest** 。

语言选择 **C#** ，平台选择 **Windows** ，选中 **Windows 服务** 模板。（ 可直接搜索 ）

> **.NET Framework 4.7.2**

![新建服务项目](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/聊聊%20Windows%20服务/imgs/service_project_new.png)

#### 修改代码

在 **解决方案资源管理器** 中，选择默认创建的 **Service1.cs** 右键重命名（ `F2` ）为 **MyNewService.cs** 并 **切换到代码视图** 。

- **Program.cs**

  ```c#
  using System.ServiceProcess;

  namespace WindowsServiceTest
  {
      internal static class Program
      {
          /// <summary>
          /// 应用程序的主入口点。
          /// </summary>
          static void Main(string[] args)
          {
              ServiceBase[] ServicesToRun = new ServiceBase[]
              {
                  new MyNewService(args)
              };
              ServiceBase.Run(ServicesToRun);
          }
      }
  }
  ```

- **MyNewService.cs**

  设置属性 **CanPauseAndContinue** 是为了启用 **暂停/恢复** 功能，可以在 **属性** 窗口直接设置，这里直接写死在初始化代码里。

  > 修改 **ServiceName** 属性值为 **MyNewService** （ **可选** ）

  注意有两个参数：一个是构造方法中的初始化参数，另一个是 **OnStart** 方法中的启动参数。

  ```c#
  using System;
  using System.Diagnostics;
  using System.ServiceProcess;
  using System.Timers;

  namespace WindowsServiceTest
  {
      public partial class MyNewService : ServiceBase
      {
          private readonly EventLog eventLog;

          private Timer timer;

          private int eventId = 1;

          public MyNewService(string[] args)
          {
              InitializeComponent();
              CanPauseAndContinue = true;

              eventLog = new EventLog();
              if (!EventLog.SourceExists("MySource"))
              {
                  EventLog.CreateEventSource("MySource", "MyNewLog");
              }
              eventLog.Source = "MySource";
              eventLog.Log = "MyNewLog";

              eventLog.WriteEntry("Init: " + string.Join(",", args));
          }

          protected override void OnStart(string[] args)
          {
              eventLog.WriteEntry("In OnStart: " + string.Join(",", args));

              // Set up a timer that triggers every minute.
              timer = new Timer();
              timer.Interval = 60000; // 60 seconds
              timer.Elapsed += new ElapsedEventHandler(this.OnTimer);
              timer.Start();
          }

          public void OnTimer(object sender, ElapsedEventArgs args)
          {
              eventLog.WriteEntry("Monitoring the System", EventLogEntryType.Information, eventId++);
          }

          protected override void OnStop()
          {
              eventLog.WriteEntry("In OnStop.");
          }

          protected override void OnPause()
          {
              timer.Stop();
              eventLog.WriteEntry("In OnPause.");
          }

          protected override void OnContinue()
          {
              timer.Start();
              eventLog.WriteEntry("In OnContinue.");
          }
      }
  }
  ```

#### 生成服务程序

在 **解决方案资源管理器** 中，右键项目名选择 **生成** 。（ `Ctrl + B` ）

```shell
已启动生成…
1>------ 已启动生成: 项目: WindowsServiceTest, 配置: Debug Any CPU ------
1>  WindowsServiceTest -> C:\Users\test\source\repos\WindowsServiceTest\WindowsServiceTest\bin\Debug\WindowsServiceTest.exe
========== 生成: 成功 1 个，失败 0 个，最新 0 个，跳过 0 个 ==========
```

生成的 **exe** 文件默认是不能直接运行的（ [可以修改](https://docs.microsoft.com/dotnet/framework/windows-services/how-to-debug-windows-service-applications#how-to-run-a-windows-service-as-a-console-application) ），需要注册为服务才行。

![Windows 服务启动失败](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/聊聊%20Windows%20服务/imgs/service_exe_open_error.png)

#### 安装服务

可以使用通用的 **sc** 命令进行注册，就是详细配置会繁琐一点。

```shell
:: 注意等号与值中间有个空格
sc create MyNewServiceSC binpath= "C:\Users\test\source\repos\WindowsServiceTest\WindowsServiceTest\bin\Debug\WindowsServiceTest.exe"
```

也可以按教程中的方法：

##### 添加安装程序

在 **解决方案资源管理器** 中，右键服务名（ **MyNewService.cs** ） **查看设计器** ，在 **设计器** 窗口中右键 **添加安装程序** 。

![添加安装程序](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/聊聊%20Windows%20服务/imgs/service_installer_new.png)

##### 修改执行用户

选中 [serviceProcessInstaller1](https://docs.microsoft.com/dotnet/api/system.serviceprocess.serviceprocessinstaller) ，在 **属性** 中修改 **Account** 为 [LocalSystem](https://docs.microsoft.com/windows/win32/services/localsystem-account) 。

> 这个就是任务管理器中看到的进程所属的用户，涉及到权限的问题。（ [参考](https://docs.microsoft.com/dotnet/framework/windows-services/how-to-specify-the-security-context-for-services) ）

![serviceProcessInstaller > Account](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/聊聊%20Windows%20服务/imgs/service_installer_account.png)

##### 修改服务配置（ **可选** ）

选中 [serviceInstaller1](https://docs.microsoft.com/dotnet/api/system.serviceprocess.serviceinstaller?view=netframework-4.8) ，在 **属性** 中修改服务名称、显示名称、描述等。

不修改就是默认的 **Service1** 。

![serviceInstaller](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/聊聊%20Windows%20服务/imgs/service_configuration.png)

重新生成服务程序（ `Ctrl + B` ）使安装配置生效。

##### 打开 [开发者命令提示](https://docs.microsoft.com/visualstudio/ide/reference/command-prompt-powershell)

![开发者命令提示](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/聊聊%20Windows%20服务/imgs/developer_command_prompt.png)

##### 执行安装命令

```shell
cd WindowsServiceTest\bin\Debug
:: 需要管理员权限
installutil WindowsServiceTest.exe

:: 卸载
installutil.exe /u WindowsServiceTest.exe
```

#### 启动服务

> 任务管理器 > 服务 > 随便选中一个服务右键 > 打开服务

![服务详情](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/聊聊%20Windows%20服务/imgs/service_info.png)

#### 验证结果

> `Win + X` > 事件查看器 > 应用程序和服务日志 > MyNewLog

看不到 **MyNewLog** 需要先启动服务后再重新打开 **事件查看器** 。

![事件查看器](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/聊聊%20Windows%20服务/imgs/event_viewer.png)

因为通用逻辑都封装在 [ServiceBase](https://docs.microsoft.com/dotnet/api/system.serviceprocess.servicebase) 里面了，只需要添加自己的业务代码，比起 [C++ 实现的 demo](https://docs.microsoft.com/windows/win32/services/svc-cpp) 要简单很多。编写 [多线程服务](https://docs.microsoft.com/windows/win32/services/multithreaded-services) 或者复杂应用时可能会遇到一些问题（ [参考](https://www.cnblogs.com/flying_bat/archive/2007/10/11/920338.html) ）。

### 参考文章

---

- [了解 Windows 服务体系结构](<https://docs.microsoft.com/zh-cn/previous-versions/exchange-server/exchange-server-2000//aa998749(v=exchg.65)>)
- [后台服务程序开发模式](https://blog.csdn.net/hireboy/article/details/8149692)
- [用 C 语言编写 Windows 服务程序的五个步骤](https://www.shuzhiduo.com/A/ke5j4k6azr)
- [Windows 操作系统的体系结构](https://blog.csdn.net/ganglia/article/details/6767007)
- **Windows 服务编写原理及探讨** [(1)](https://www.cnblogs.com/flying_bat/archive/2007/10/09/918424.html) 、 [(2)](https://www.cnblogs.com/flying_bat/archive/2007/10/11/920335.html) 、 [(3)](https://www.cnblogs.com/flying_bat/archive/2007/10/11/920337.html) 、 [(4)](https://www.cnblogs.com/flying_bat/archive/2007/10/11/920338.html)
- [解决“指定的服务已经标记为删除”问题](https://www.cnblogs.com/C-Shark/archive/2011/03/19/1989032.html)

### 结语

---

以上内容是我根据日常使用经验再结合有限的资料整理而成，难免有错误的地方，欢迎指正。相关内容比较多，全部引用太占篇幅了，感兴趣的话就多点点文中给出的外链。

---

#### 转载请注明出处：[https://github.com/anyesu/blog/issues/41](https://anyesu.github.io/blog/articles/41)
