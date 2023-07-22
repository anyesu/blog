### 背景

---

打开一个几年前的老项目，发现启动巨慢，同样的代码没动过，当年在渣渣 **i5** 上运行也只要十几秒，现在升了配置反而要好几分钟。

![原始慢启动日志](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Spring%20Boot%20项目启动慢排查/imgs/log_raw.png)

> 截图中的项目已经精简了部分内容

### 问题定位

---

```shell
INFO  RocketmqRemoting:95 : closeChannel: close the connection to remote address[] result: true
```

首先注意到这句报错，意思是 [RocketMQ 没连上](https://www.cnblogs.com/changxy-codest/p/11942976.html) ，按理说应该没影响，不过以防万一还是本地启动一下 **RocketMQ** ：

```shell
start mqnamesrv && mqbroker -c ../conf/broker.conf
```

重启项目发现耗时还是差不多（ 相对于总时长来说几秒的误差可以忽略不计 ）。

再注意到下面的日志， **RocketMQListener** 注册成功之前等待了大约 **10** 秒的时间。

```shell
2022-12-19 18:53:21.484 - 42601   [NettyClientSelector_1] INFO  RocketmqRemoting:95 : closeChannel: close the connection to remote address[] result: true
2022-12-19 18:53:32.552 - 53669   [NettyClientSelector_1] INFO  RocketmqRemoting:95 : closeChannel: close the connection to remote address[] result: true
2022-12-19 18:53:32.554 - 53671   [main] INFO  org.apache.rocketmq.spring.support.DefaultRocketMQListenerContainer:243 : running container: DefaultRocketMQListenerContainer{consumerGroup='DEFAULT_GROUP', nameServer='127.0.0.1:9876', topic='DEFAULT_TOPIC', consumeMode=CONCURRENTLY, selectorType=TAG, selectorExpression='*', messageModel=CLUSTERING}
2022-12-19 18:53:32.554 - 53671   [main] INFO  org.apache.rocketmq.spring.autoconfigure.ListenerContainerConfiguration:107 : Register the listener to container, listenerBeanName:myRocketMQListener, containerBeanName:org.apache.rocketmq.spring.support.DefaultRocketMQListenerContainer_1
```

为了测试方便，之前只保留了一个 **RocketMQListener** ，其他的都注释掉了，现在放开注释后发现，每个 **RocketMQListener** 注册成功之前都会等待大约 **10** 秒。说明这部分的代码是有点问题的，但还不是启动慢的主要原因，继续看日志（ 把 **RocketMQListener** 都先注释掉 ）：

```shell
2022-12-19 18:52:45.440 - 6557    [main] INFO  com.Application:658 : The following profiles are active: dev
WARNING: An illegal reflective access operation has occurred
WARNING: Illegal reflective access by org.springframework.cglib.core.ReflectUtils$1 (file:/H:/maven/org/springframework/spring-core/5.0.12.RELEASE/spring-core-5.0.12.RELEASE.jar) to method java.lang.ClassLoader.defineClass(java.lang.String,byte[],int,int,java.security.ProtectionDomain)
WARNING: Please consider reporting this to the maintainers of org.springframework.cglib.core.ReflectUtils$1
WARNING: Use --illegal-access=warn to enable warnings of further illegal reflective access operations
WARNING: All illegal access operations will be denied in a future release
2022-12-19 18:53:18.903 - 40020   [main] INFO  org.apache.coyote.http11.Http11NioProtocol:180 : Initializing ProtocolHandler ["http-nio-0.0.0.0-3000"]
```

这部分警告日志的前后间隔了大约 **30** 秒，说明 **Spring** 初始化有点慢，但看不到具体的细节，需要在 **log4j2** 配置中放开一下 **Spring** 的 **debug** 日志：

```xml
<AsyncLogger name="org.springframework" level="debug"/>
```

可以看到每个 **Bean** 实例化都挺快的，唯独下面两个部分卡了一会儿：

```shell
2022-12-19 19:15:29.185 - 7538    [main] INFO  org.springframework.context.support.PostProcessorRegistrationDelegate$BeanPostProcessorChecker:326 : Bean 'rocketmq-org.apache.rocketmq.spring.autoconfigure.RocketMQProperties' of type [org.apache.rocketmq.spring.autoconfigure.RocketMQProperties] is not eligible for getting processed by all BeanPostProcessors (for example: not eligible for auto-proxying)
2022-12-19 19:15:39.070 - 17423   [main] INFO  org.springframework.context.support.PostProcessorRegistrationDelegate$BeanPostProcessorChecker:326 : Bean 'defaultMQProducer' of type [org.apache.rocketmq.client.producer.DefaultMQProducer] is not eligible for getting processed by all BeanPostProcessors (for example: not eligible for auto-proxying)
```

```shell
2022-12-19 19:15:39.120 - 17473   [main] INFO  org.springframework.context.support.PostProcessorRegistrationDelegate$BeanPostProcessorChecker:326 : Bean 'jacksonObjectMapper' of type [com.fasterxml.jackson.databind.ObjectMapper] is not eligible for getting processed by all BeanPostProcessors (for example: not eligible for auto-proxying)
2022-12-19 19:16:03.671 - 42024   [main] INFO  org.springframework.context.support.PostProcessorRegistrationDelegate$BeanPostProcessorChecker:326 : Bean 'rocketMQTemplate' of type [org.apache.rocketmq.spring.core.RocketMQTemplate] is not eligible for getting processed by all BeanPostProcessors (for example: not eligible for auto-proxying)
```

这里耗时大约 **30** 秒，和前面可以对上。

由于项目目前用不上 **RocketMQ** ，可以把 [**RocketMQAutoConfiguration**](https://github.com/apache/rocketmq-spring/blob/master/rocketmq-spring-boot/src/main/java/org/apache/rocketmq/spring/autoconfigure/RocketMQAutoConfiguration.java) 配置先屏蔽掉看下：

```java
@SpringBootApplication(exclude = { RocketMQAutoConfiguration.class })
public class Application {

  // ...

  @Bean
  public RocketMQTemplate rocketMQTemplate() {
    // 造一个假的 rocketMQTemplate 避免项目报错
    RocketMQTemplate rocketMQTemplate = new RocketMQTemplate();
    rocketMQTemplate.setProducer(new DefaultMQProducer("groupName"));
    return rocketMQTemplate;
  }
}

```

重启项目只需要 **20** 多秒了，虽然还是慢但至少能接受，可以确定是 **RocketMQ** 的问题了。而且所有依赖的中间件都是本地部署的，基本可以忽略网络问题了（ 后面打脸 ），实在想不通为什么会慢。

### 解决方法

---

拿着 `rocketMQTemplate 启动慢` 的关键词去搜问题简直是大海捞针，不过运气好找到了一篇文章《 [RocketMQ 很慢？引出了一个未解之谜](https://mp.weixin.qq.com/s/5qAhan527HTwEuXu9XzgPg) 》， **里面指出了 `NetworkInterface.getNetworkInterfaces` 这个 JDK 方法的耗时问题** ，本地测试了一下果然如此：

```java
public class NetworkInterfaceTest {

  public static void main(String[] args) throws SocketException {
    long start = System.currentTimeMillis();
    Enumeration<NetworkInterface> enumeration = NetworkInterface.getNetworkInterfaces();
    long end = System.currentTimeMillis();

    ArrayList<NetworkInterface> result = new ArrayList<>();
    while (enumeration.hasMoreElements()) {
      result.add(enumeration.nextElement());
    }
    System.out.printf(
      "NetworkInterface.getNetworkInterfaces() use %d ms, result size: %d%n",
      end - start,
      result.size()
    );
  }
}

```

![getNetworkInterfaces 测试](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Spring%20Boot%20项目启动慢排查/imgs/NetworkInterfaceTest1.png)

真凶果然是它，一次调用耗时将近 **6** 秒，不加限制多调用几次就能爆炸了。可以看一下这个方法的返回结果是什么：

![getNetworkInterfaces 返回结果](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Spring%20Boot%20项目启动慢排查/imgs/NetworkInterfaceTest2.png)

光看名字就能联想到 **控制面板\网络和 Internet\网络连接** 中的 **网络适配器** ，基本能对上：

![网络适配器](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Spring%20Boot%20项目启动慢排查/imgs/NIC.png)

之所以有这么多的设备是因为之前安装 [Genymotion](https://github.com/anyesu/blog/issues/43) 模拟器的时候 **VirtualBox** 给安装上的，因为没遇到过其他问题也就没在意，没想到却导致了 `getNetworkInterfaces` 调用变慢的问题。而 `getNetworkInterfaces` 方法底层调用的是 `getAll` 这个 **native** 方法，所以代码层面基本没得改了，目前 **唯一** 的 **解决方法** 就是 **把没用的网络适配器都禁用掉** ，最后耗时只要 **600** 毫秒了（ 不同的网卡耗时程度不同 ），这种程度基本能接受了。

![getNetworkInterfaces 测试 - 禁用后](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Spring%20Boot%20项目启动慢排查/imgs/NetworkInterfaceTest3.png)

> 把测试代码放 **VMware** 构建的纯净系统环境下又测了一遍，发现最初调用只要 **31** 毫秒，这种程度的耗时才是正常的，难怪以前都没发现这个问题，而安装 **Genymotion** 后耗时果然就显著增加了。

回到项目还原代码验证一下，启动时间果然恢复到正常的 **8** 秒了。

![问题解决后正常启动日志](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Spring%20Boot%20项目启动慢排查/imgs/log_raw_fixed.png)

### 问题复盘

---

这个问题得到解决得亏有人用 **RocketMQ** 的时候遇到类似的问题，不然就只能不了了之了。不过和别人说 `getNetworkInterfaces` 方法调用很慢大概率会被人当傻子，比如有人在 **RocketMQ** 仓库提过 [类似问题](https://github.com/apache/rocketmq/issues/3294) 直接被无视了。

> `xxxProducer` 和 `xxxConsumer` 都继承 [ClientConfig](https://github.com/apache/rocketmq/blob/f365685ae152f792f280922493321a00e2d5ef42/client/src/main/java/org/apache/rocketmq/client/ClientConfig.java#L42) ，因此每实例化一个就会调用一次 `getNetworkInterfaces` 。

继续查资料看有没有方法可以定位耗时的代码块，在《 [SpringBoot 服务启动慢排查思路](https://blog.csdn.net/lkx444368875/article/details/127268108) 》一文中看到了一张 **JProfiler** 的方法调用树截图，里面清楚标红了耗时比较长的方法，但是文章中没有具体的操作步骤，只能自己研究下。

> 后来才发现在 [JProfiler 帮助文档](https://www.ej-technologies.com/resources/jprofiler/v/13.0/help_zh_CN/doc/main/cpu.html) 中关于这部分内容已经介绍的很详细了。

**操作步骤：**

- [下载安装 JProfiler](https://blog.csdn.net/sinat_16998945/article/details/125636488)

- 在 **IDEA** 中用 **JProfiler** 图标启动项目

- 进 **JProfiler** 的 **bin** 目录启动主程序 **jprofiler.exe**

- **Attach** > 选择 **背景色标绿** 的项目进程 > **开始**

  配置项一路确定就好了。

  **许可证密钥** 错误会导致 [启动报错](https://www.cnblogs.com/yang101/p/11316103.html) 的，需要选择 **评估** （ 试用 **10** 天 ）。

  > 修改系统时间后重启 **JProfiler** 可以继续试用。（ 用完了再把系统时间还原回去 ）

  ```shell
  JProfiler> ERROR: Invalid license key. Aborting.
  JProfiler> Killing process
  ```

  清除已填写的注册码：

  ```shell
  cd /d "%USERPROFILE%/.jprofiler13" && del jprofiler_config.xml
  ```

- **CPU 视图 > 调用树 > 开始记录**

  这一步手速要快一点，不然可能会错过一些重要的调用过程。当然也可以在 **会话启动** 的配置窗口中设置 **初始化记录分析** 以自动开始记录。

  ![JProfiler 会话启动](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Spring%20Boot%20项目启动慢排查/imgs/JProfiler0.png)

- 等待项目启动完成

  ![JProfiler 分析调用树](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Spring%20Boot%20项目启动慢排查/imgs/JProfiler1.png)

调用树结果是有了，但坑爹的是展开之后报红的线索就断了，基本是 **1%** 以内的正常方法调用，完全看不到里层的慢方法。点击工具栏中的 **分析** 按钮，将结果转为火焰图看下：

![JProfiler 查看火焰图](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Spring%20Boot%20项目启动慢排查/imgs/JProfiler2.png)

可以看到两侧缺失了一大片的内容，说明有一些方法被隐藏了没记录在内，这时回到调用树，注意到每个方法前面的图标都不太一样，正好工具栏有一个 **显示图例** 的按钮，点击查看内容：

![JProfiler 树图例](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Spring%20Boot%20项目启动慢排查/imgs/JProfiler3.png)

这说明部分方法被过滤了，最后在 **会话设置 > 调用树过滤器 > 定义过滤器** 中发现默认配置把一堆第三方库都过滤了：

![JProfiler 定义过滤器 - 默认](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Spring%20Boot%20项目启动慢排查/imgs/JProfiler4.png)

这里只需要添加被分析的包（ 注意顺序，具体配置规则见 [官方文档](https://www.ej-technologies.com/resources/jprofiler/v/13.0/help_zh_CN/doc/main/cpu.html) ）即可：

```shell
java. // 看情况是否要加
javax.
org.apache.
```

![JProfiler 定义过滤器 - 自定义](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Spring%20Boot%20项目启动慢排查/imgs/JProfiler5.png)

重启项目重新开始分析就能得到想要的结果了：

![JProfiler 分析调用树 - 最终结果](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Spring%20Boot%20项目启动慢排查/imgs/JProfiler6.png)

查看火焰图效果更直观，可以看到大部分时间都花费在 **getNetworkInterfaces** 上了（ **8** 次调用共耗时 **37** 秒 ），也证实了前面问题定位没有错。

![JProfiler 查看火焰图 - 最终结果](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Spring%20Boot%20项目启动慢排查/imgs/JProfiler7.png)

### 其他相关问题

---

解决完这个问题忽然想到前段时间碰到的另一个问题：用到 **JSP** 的项目从 **JDK1.8** 切换到 **JDK11** 后，第一次访问页面很慢，并有警告日志：

```shell
WARN 6244 --- [nio-8080-exec-1] o.a.c.util.SessionIdGeneratorBase        : Creation of SecureRandom instance for session ID generation using [SHA1PRNG] took [6,337] milliseconds.
```

[SecureRandom 的耗时问题](https://github.com/anyesu/blog/issues/11) 以前在 **Docker 容器** 中运行 **Tomcat** 时遇到过，但和这次显然不是一回事，定位到打日志的代码：

![createSecureRandom](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Spring%20Boot%20项目启动慢排查/imgs/createSecureRandom.png)

发现耗时的地方在 `SecureRandom.nextInt()` ，只是肉眼去看代码不好去分析更底层的调用栈，还好刚学会了 **JProfiler** ，分析结果一目了然，这个问题同样也是 `getNetworkInterfaces` 在捣鬼。

![JProfiler 分析调用树 - SecureRandom](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Spring%20Boot%20项目启动慢排查/imgs/JProfiler8.png)

至于为什么 **JDK1.8** 没问题，由于调用栈发生了变化一时也查不出原因，我猜测可能是其他地方（ 可能无法被分析器拦截到 ）提前触发了 `SecureRandom.SeederHolder` 的 **static** 代码初始化。比如 **debug 模式** 运行项目时打断点发现 `sun.management.Agent.startAgent()` 中就间接调用了 `SecureRandom` 。

---

#### 转载请注明出处： [https://github.com/anyesu/blog/issues/44](https://anyesu.github.io/blog/articles/44)
