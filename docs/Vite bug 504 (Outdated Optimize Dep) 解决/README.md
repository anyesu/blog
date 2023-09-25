### 背景

---

还是 [之前](https://github.com/anyesu/blog/issues/45) 那个用 [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin) 搭建的项目，最近刚迁移到了 [Vite](https://github.com/vitejs/vite) 。一个比较大的问题就是虽然项目是秒启动，但首次打开页面会有几秒的 [白屏](https://github.com/vitejs/vite/pull/12809) ，非常难受。于是就去尝试了各种缓存方案，测试效果的时候就用到了 `vite --force` 这个命令来强制 **Vite** 重新构建依赖项，接着本文的问题就出现了：

```
GET http://localhost:5173/node_modules/.vite/deps/element-ui_lib_button.js?v=bc3e4ba5 504 (Outdated Optimize Dep)
```

用 `vite --force` 命令启动项目后，打开页面有几率会显示白屏，在控制台可以看到 **504 (Outdated Optimize Dep)** 错误，刷新页面是没用的，不过重新启动项目基本上能解决，这就意味着经常需要启动两遍项目并且时不时会看到这个错误，还是比较烦人的。

### 原因分析

---

根据关键字 **Outdated Optimize Dep** 加断点定位到了报错代码的 [位置](https://github.com/vitejs/vite/blob/v4.4.9/packages/vite/src/node/plugins/optimizedDeps.ts#L68-L73) ：

```javascript
try {
  return await fsp.readFile(file, 'utf-8')
} catch (e) {
  // Outdated non-entry points (CHUNK), loaded after a rerun
  throwOutdatedRequest(id)
}
```

去 **node_modules/.vite/deps** 目录下查看后发现 **element-ui_lib_button.js** 这个文件确实不存在，但应该报 **404** 错误而不是过时的，这点就很让人迷惑，先不管了。

根本原因就是： **optimizer 实际上并没有把第三方库预构建为对应的缓存文件，但 [resolvePlugin](https://github.com/vitejs/vite/blob/v4.4.9/packages/vite/src/node/plugins/resolve.ts#L128) 这个插件在执行 [tryOptimizedResolve](https://github.com/vitejs/vite/blob/v4.4.9/packages/vite/src/node/plugins/resolve.ts#L337-L351) 的时候却把需要预构建的第三方依赖的 id 改成预构建后的路径，而不管是否预构建成功，二者匹配不上所以就出错了。**

> 关于这点顺带再提一下，预构建和解析两个步骤分别写在两个插件里非常割裂，随着每个插件各自不断迭代就难免会出现各种不一致的行为，从而导致一些莫名其妙的问题。
>
> 比如把项目文件添加到 `optimizeDeps.include` 中会发现 `.vite/deps` 中已经预构建了，但实际访问的时候还是读取的源文件，估计是故意这么设计的，但还是可以通过 [preAliasPlugin](https://github.com/vitejs/vite/blob/v4.4.9/packages/vite/src/node/plugins/preAlias.ts#L24) 中的 [alias](https://github.com/vitejs/vite/pull/8869/files#diff-a22303cb710f9f228c72c6de0844de6f2b36a5033e7da5623dc9657d08328606R17-R26) 来绕过这个限制。

至于为什么没预构建上，打下 **debug** 日志看看：

```shell
cross-env DEBUG=vite:deps vite --force
```

反复启动项目然后对比启动日志发现了端倪，报错的时候包含下面的日志：

```
vite:deps ✨ using post-scan optimizer result, the scanner found every used dependency +74ms
```

而正常的时候包含下面的日志：

```
vite:deps ✨ new dependencies were found while crawling that weren't detected by the scanner +1ms
vite:deps ✨ re-running optimizer +0ms
vite:deps new dependencies found: element-ui/lib/button +1ms
```

根据日志内容定位到 [源码位置](https://github.com/vitejs/vite/blob/v4.4.9/packages/vite/src/node/optimizer/optimizer.ts#L651-L681) ：

```javascript
const crawlDeps = Object.keys(metadata.discovered)


// Await for the scan+optimize step running in the background
// It normally should be over by the time crawling of user code ended
await depsOptimizer.scanProcessing


if (!isBuild && optimizationResult && !config.optimizeDeps.noDiscovery) {
  const result = await optimizationResult.result
  optimizationResult = undefined
  currentlyProcessing = false


  const scanDeps = Object.keys(result.metadata.optimized)


  if (scanDeps.length === 0 && crawlDeps.length === 0) {
    debug?.(
      colors.green(
        `✨ no dependencies found by the scanner or crawling static imports`,
      ),
    )
    result.cancel()
    firstRunCalled = true
    return
  }


  const needsInteropMismatch = findInteropMismatches(
    metadata.discovered,
    result.metadata.optimized,
  )
  const scannerMissedDeps = crawlDeps.some((dep) => !scanDeps.includes(dep))
  const outdatedResult =
    needsInteropMismatch.length > 0 || scannerMissedDeps


  if (outdatedResult) {
    // Drop this scan result, and perform a new optimization to avoid a full reload
    result.cancel()


    // Add deps found by the scanner to the discovered deps while crawling
    for (const dep of scanDeps) {
      if (!crawlDeps.includes(dep)) {
        addMissingDep(dep, result.metadata.optimized[dep].src!)
      }
    }
    if (scannerMissedDeps) {
      debug?.(
        colors.yellow(
          `✨ new dependencies were found while crawling that weren't detected by the scanner`,
        ),
      )
    }
    debug?.(colors.green(`✨ re-running optimizer`))
    debouncedProcessing(0)
  } else {
    debug?.(
      colors.green(
        `✨ using post-scan optimizer result, the scanner found every used dependency`,
      ),
    )
    startNextDiscoveredBatch()
    runOptimizer(result)
  }
```

给 **else** 分支打上断点再复现问题，发现 `crawlDeps` 的值是：

```json
[
  "element-ui/packages/theme-chalk/src/index.scss"
]
```

并且 `scanDeps` 的值也是：

```json
[
  "element-ui/packages/theme-chalk/src/index.scss"
]
```

而手动计算的 `Object.keys(metadata.discovered)` 的值是：

```json
[
  "element-ui/packages/theme-chalk/src/index.scss",
  "element-ui/lib/button"
]
```

所以原因找到了： `crawlDeps` 的值错误导致本该进入 **if** 分支进行增量构建的，结果却走了 **else** 分支直接结束了。

[![Vite PR 8869](https://user-images.githubusercontent.com/583075/177045234-cf9fe6c9-2447-469a-8457-85494a505f7c.png)](https://github.com/vitejs/vite/pull/8869#issuecomment-1172902125)

粗看这段代码好像没什么问题，但注意到中间有两段 `await` ，盲猜和这有关系，再补充点日志看下。

> 使用 [patch-package](https://www.npmjs.com/package/patch-package) 把 **patches/vite+4.4.9.patch** 这个补丁文件应用上
>
> ```shell
> npx patch-package
> ```
>
> ```diff
> diff --git a/node_modules/vite/dist/node/chunks/dep-df561101.js b/node_modules/vite/dist/node/chunks/dep-df561101.js
> index 1bc8674..2603df8 100644
> --- a/node_modules/vite/dist/node/chunks/dep-df561101.js
> +++ b/node_modules/vite/dist/node/chunks/dep-df561101.js
> @@ -45413,11 +45413,18 @@ async function createDepsOptimizer(config, server) {
>             return;
>         }
>         const crawlDeps = Object.keys(metadata.discovered);
> +        const _debug = () => {
> +            const discovered = Object.keys(metadata.discovered);
> +            console.log(`metadata.discovered ( size: ${discovered.length} ) : ${depsLogString(discovered)}`)
> +        }
> +        _debug()
>         // Await for the scan+optimize step running in the background
>         // It normally should be over by the time crawling of user code ended
>         await depsOptimizer.scanProcessing;
> +        _debug()
>         if (!isBuild && optimizationResult && !config.optimizeDeps.noDiscovery) {
>             const result = await optimizationResult.result;
> +            _debug()
>             optimizationResult = undefined;
>             currentlyProcessing = false;
>             const scanDeps = Object.keys(result.metadata.optimized);
> ```

日志也证实了和 `await` 确实有关系，实际项目中依赖比较多构建比较慢还可以看到三次的值都是不同的。

```diff
    vite:deps ✨ static imports crawl ended +2s
+ metadata.discovered ( size: 1 ) : element-ui/packages/theme-chalk/src/index.scss
+ metadata.discovered ( size: 1 ) : element-ui/packages/theme-chalk/src/index.scss
    vite:deps Dependencies bundled in 1140.67ms +0ms
+ metadata.discovered ( size: 2 ) : element-ui/packages/theme-chalk/src/index.scss, element-ui/lib/button
    vite:deps ✨ using post-scan optimizer result, the scanner found every used dependency +75ms
    vite:deps ✨ dependencies optimized +1ms
```

### 问题解决

---

问题找到了，解决办法也很简单：调整定义 `crawlDeps` 的位置，等两段 `await` 都结束后再读取最新的 `metadata.discovered` 。最便捷的方法就是直接改 **npm** 包代码再用 **patch-package** 生成补丁，之后直接应用补丁就行了。（ [参考 patch-package 小节](https://github.com/anyesu/blog/issues/45) ）

**patches/vite+4.4.9.patch**

```diff
diff --git a/node_modules/vite/dist/node/chunks/dep-df561101.js b/node_modules/vite/dist/node/chunks/dep-df561101.js
index 1bc8674..092f4e0 100644
--- a/node_modules/vite/dist/node/chunks/dep-df561101.js
+++ b/node_modules/vite/dist/node/chunks/dep-df561101.js
@@ -45412,7 +45412,6 @@ async function createDepsOptimizer(config, server) {
         if (closed) {
             return;
         }
-        const crawlDeps = Object.keys(metadata.discovered);
         // Await for the scan+optimize step running in the background
         // It normally should be over by the time crawling of user code ended
         await depsOptimizer.scanProcessing;
@@ -45420,6 +45419,7 @@ async function createDepsOptimizer(config, server) {
             const result = await optimizationResult.result;
             optimizationResult = undefined;
             currentlyProcessing = false;
+            const crawlDeps = Object.keys(metadata.discovered);
             const scanDeps = Object.keys(result.metadata.optimized);
             if (scanDeps.length === 0 && crawlDeps.length === 0) {
                 debug$8?.(colors$1.green(`✨ no dependencies found by the scanner or crawling static imports`));
@@ -45452,6 +45452,7 @@ async function createDepsOptimizer(config, server) {
             }
         }
         else {
+            const crawlDeps = Object.keys(metadata.discovered);
             currentlyProcessing = false;
             if (crawlDeps.length === 0) {
                 debug$8?.(colors$1.green(`✨ no dependencies found while crawling the static imports`));
```

### 问题复现

---

问题解决了就想着去仓库提交一个 **PR** 从根源上进行修复，但这就需要提供一个 [最小复现](https://antfu.me/posts/why-reproductions-are-required-zh) 来证实这确实是个问题。前面也说了这个问题是偶现的，甚至可能和项目的复杂程度有关系，想要在一个新建的项目里稳定复现着实有点困难。花了几天时间各种试，终于找到一种特定情况可以稳定复现：

- 启动项目的同时立即访问任意 **url**（ 除了 `/` 和 `/favicon.ico` 以及 `public` 下的静态资源 ），比如 `/xxx` 。这一点非常重要，因为这会在 **transformMiddleware** 中触发额外的 [transformRequest](https://github.com/vitejs/vite/blob/v4.4.9/packages/vite/src/node/server/middlewares/transform.ts#L203-L205) ，会因此导致 [checkIfCrawlEndAfterTimeout](https://github.com/vitejs/vite/blob/v4.4.9/packages/vite/src/node/optimizer/optimizer.ts#L787-L795) 中的定时器提前启动。

  ```javascript
  const knownIgnoreList = new Set(['/', '/favicon.ico'])

  ...

  return async function viteTransformMiddleware(req, res, next) {
    if (req.method !== 'GET' || knownIgnoreList.has(req.url!)) {
      return next()
    }

  ...

  const result = await transformRequest(url, server, {
   html: req.headers.accept?.includes('text/html'),
  })
  ```

  为了不考验手速，直接写了一个插件来模拟请求：

  ```javascript
  function requestSimulation() {
    return {
      name: 'request-simulation',
      configureServer(server) {
        const { listen } = server;
        server.listen = async (...args) => {
          await listen.apply(server, args);
          // request as fast as server is ready without manually open browser
          const url = server.resolvedUrls.local[0] + 'not_root';
          axios.get(url, { headers: { Accept: 'text/html' } }).catch((e) => {
            console.error(e);
          });
        };
      },
    };
  }
  ```

- 通过插件在解析阶段动态增加依赖项（ 比如 [unplugin-auto-import](https://www.npmjs.com/package/unplugin-auto-import) 插件做的事 ），这类依赖在 [自动依赖搜寻](https://cn.vitejs.dev/guide/dep-pre-bundling.html#automatic-dependency-discovery) 阶段不会被识别到，只有请求源文件时才会通过 [addMissingDep](https://github.com/vitejs/vite/blob/v4.4.9/packages/vite/src/node/optimizer/optimizer.ts#L541) 追加到预构建依赖中。

  ```javascript
  function autoImport() {
    return {
      name: 'auto-import',
      transform(code, id) {
        if (id.includes('/main')) {
          // trigger addMissingDep
          return `import ElButton from 'element-ui/lib/button'\n${code}`;
        }
      },
    };
  }
  ```

- 执行缓慢的 [transformIndexHtml](https://github.com/vitejs/vite/blob/v4.4.9/packages/vite/src/node/server/middlewares/indexHtml.ts#L62-L64) 用来增加请求完 `/xxx` 到 [preTransformRequest](https://github.com/vitejs/vite/blob/v4.4.9/packages/vite/src/node/server/middlewares/indexHtml.ts#L348) 被调用前的时间间隔，会导致 [onCrawlEnd](https://github.com/vitejs/vite/blob/v4.4.9/packages/vite/src/node/optimizer/optimizer.ts#L612) 提前执行（ 因为 **checkIfCrawlEndAfterTimeout** 中设置的定时器到时间了而且没有被延长 ）。

  ```javascript
  function slowTransformIndexHtml() {
    return {
      name: 'slow-transform-index-html',
      transformIndexHtml: {
        order: 'pre',
        async handler(html) {
          // manually make it slower
          await new Promise((resolve) => {
            // wait time longer than callCrawlEndIfIdleAfterMs
            setTimeout(() => resolve(), 100);
          });
          return html;
        },
      },
    };
  }
  ```

  **preTransformRequest** 就是在请求 **html** 的时候就预先解析依赖文件而无需等到浏览器请求每个资源文件的时候请求一个解析一个，可通过配置关闭。

  ```javascript
  function preTransformRequest(server: ViteDevServer, url: string, base: string) {
   if (!server.config.server.preTransformRequests) return

   url = unwrapId(stripBase(url, base))

   // transform all url as non-ssr as html includes client-side assets only
   server.transformRequest(url).catch((e) => {
     if (
       e?.code === ERR_OUTDATED_OPTIMIZED_DEP ||
       e?.code === ERR_CLOSED_SERVER
     ) {
       // these are expected errors
       return
     }
     // Unexpected error, log the issue but avoid an unhandled exception
     server.config.logger.error(e.message)
   })
  }
  ```

- [预构建一个比较大的 scss 文件](https://github.com/vitejs/vite/issues/7719#issuecomment-1098683109) （ 比如 [element-ui](https://github.com/ElemeFE/element/blob/v2.15.14/packages/theme-chalk/src/index.scss) ），编译这个 **scss** 文件可能会花费数秒的时间，就会导致整个预构建阶段变慢，也就是增加前面提到的两段 `await` 前后的间隔时间。

  ```javascript
  function slowOptimize() {
    return {
      name: 'slow-optimize',
      config() {
        return {
          // pre-build scss file to make the optimize step slower
          // ref: https://github.com/vitejs/vite/issues/7719#issuecomment-1098683109
          optimizeDeps: {
            extensions: ['.scss', '.sass'],
            include: ['element-ui/packages/theme-chalk/src/index.scss'],
            esbuildOptions: {
              plugins: [
                sassPlugin({
                  type: 'style',
                  logger: { warn() {} },
                }),
              ],
            },
          },
        };
      },
    };
  }
  ```

### 复现步骤

---

[点击此处查看 demo](https://stackblitz.com/edit/vitejs-vite-imqoo8?file=vite.config.js)

![vite-bug](imgs/reproduction.gif)

```shell
pnpm i
pnpm run dev
```

启动项目后打开控制台就能看到 **504 (Outdated Optimize Dep)** 错误了。启动日志如下：

```diff
  Forced re-optimization of dependencies
    vite:deps scanning for dependencies... +0ms

    VITE v4.4.9  ready in 986 ms

    ➜  Local:   http://localhost:5173/
    ➜  Network: use --host to expose
    ➜  press h to show help
+ call delayDepsOptimizerUntil('/not_root') 0ms after the last
+ call markIdAsDone('/not_root') 0ms after the last
    vite:deps Crawling dependencies using entries:
    vite:deps   /home/projects/vitejs-vite-imqoo8/index.html +0ms
    vite:deps ✨ static imports crawl ended +871ms
+ metadata.discovered ( size: 1 ) : element-ui/packages/theme-chalk/src/index.scss
    vite:deps Scan completed in 927.22ms: no dependencies found +95ms
+ metadata.discovered ( size: 1 ) : element-ui/packages/theme-chalk/src/index.scss
+ call delayDepsOptimizerUntil('main.js') 177ms after the last
+ call delayDepsOptimizerUntil('node_modules/.vite/deps/element-ui_lib_button.js?v=1d7c7005') 10ms after the last
    vite:deps Dependencies bundled in 1216.69ms +0ms
+ metadata.discovered ( size: 2 ) : element-ui/packages/theme-chalk/src/index.scss, element-ui/lib/button
    vite:deps ✨ using post-scan optimizer result, the scanner found every used dependency +1s
    vite:deps ✨ dependencies optimized +1ms
+ call delayDepsOptimizerUntil('node_modules/.pnpm/vite@4.4.9_sass@1.66.1/node_modules/vite/dist/client/client.mjs') 1175ms after the last
+ call delayDepsOptimizerUntil('node_modules/.pnpm/vite@4.4.9_sass@1.66.1/node_modules/vite/dist/client/env.mjs') 3ms after the last
+ call delayDepsOptimizerUntil('node_modules/.vite/deps/element-ui_lib_button.js?v=1d7c7005') 405ms after the last
```

> 多次运行项目，你可能会发现绿色部分的日志出现在不同的位置。

根据日志可以看出两点：

- 调用 [`delayDepsOptimizerUntil('/not_root')`](https://github.com/vitejs/vite/blob/v4.4.9/packages/vite/src/node/optimizer/optimizer.ts#L708-L712) 之后 **177ms** 才调用的 `delayDepsOptimizerUntil('main.js')` 。

  这个时间间隔超出了 [callCrawlEndIfIdleAfterMs](https://github.com/vitejs/vite/blob/v4.4.9/packages/vite/src/node/optimizer/optimizer.ts#L718) 定义的 **50ms** ，所以定时器没有被延长反而早于预期地执行了 [onCrawlEnd](https://github.com/vitejs/vite/blob/v4.4.9/packages/vite/src/node/optimizer/optimizer.ts#L612) 。

  **硬编码来延长计时器的做法就不太合理，来个耗时的异步任务就打破这个链条导致提前结束了。**

  理想的效果：

  ```
       scan             optimize                     │
  ──────────────► ─────────────────────►             │
                                                     │
  ──────────────────────────────────────────────────►│
       crawl of static imports                       │
  ```

  实际运行的效果：

  ```
       scan             optimize             │
  ──────────────► ─────────────────────►     │
                                             │
  ──────────────────────────────────────────►│-------
       crawl of static imports               │
  ```

  这时提前结束很可能导致一部分依赖没有预构建上，不太好模拟自行想象吧。

- 如前面分析过的， `metadata.discovered` 的数量从 **1** 变为了 **2** 。

修改 **vite.config.js** 中的配置：

```diff
- process.env.NO_SLOW || slowTransformIndexHtml(),
+ // process.env.NO_SLOW || slowTransformIndexHtml(),
```

**Vite** 会自动重启，再看下启动日志：

```diff
  [vite] vite.config.js changed, restarting server...
  Forced re-optimization of dependencies
    vite:deps scanning for dependencies... +25m
  [vite] server restarted.
+ call delayDepsOptimizerUntil('/not_root') 0ms after the last
+ call markIdAsDone('/not_root') 0ms after the last
    vite:deps Crawling dependencies using entries:
    vite:deps   /home/projects/vitejs-vite-imqoo8/index.html +25m
+ call delayDepsOptimizerUntil('main.js') 823ms after the last
    vite:deps Scan completed in 928.80ms: no dependencies found +99ms
+ call delayDepsOptimizerUntil('node_modules/.vite/deps/element-ui_lib_button.js?v=e80a6e76') 100ms after the last
+ call markIdAsDone('/home/projects/vitejs-vite-imqoo8/main.js') 922ms after the last
    vite:deps ✨ static imports crawl ended +988ms
+ metadata.discovered ( size: 2 ) : element-ui/packages/theme-chalk/src/index.scss, element-ui/lib/button
+ metadata.discovered ( size: 2 ) : element-ui/packages/theme-chalk/src/index.scss, element-ui/lib/button
    vite:deps Dependencies bundled in 1137.07ms +25m
+ metadata.discovered ( size: 2 ) : element-ui/packages/theme-chalk/src/index.scss, element-ui/lib/button
    vite:deps ✨ new dependencies were found while crawling that weren't detected by the scanner +1s
    vite:deps ✨ re-running optimizer +0ms
    vite:deps new dependencies found: element-ui/packages/theme-chalk/src/index.scss, element-ui/lib/button +6ms
    vite:deps Dependencies bundled in 1032.49ms +1s
    vite:deps ✨ dependencies optimized +1s
+ call delayDepsOptimizerUntil('node_modules/.vite/deps/chunk-76J2PTFD.js?v=b0e72c20') 2196ms after the last
+ call delayDepsOptimizerUntil('node_modules/.pnpm/vite@4.4.9_sass@1.66.1/node_modules/vite/dist/client/client.mjs') 4394ms after the last
+ call delayDepsOptimizerUntil('node_modules/.pnpm/vite@4.4.9_sass@1.66.1/node_modules/vite/dist/client/env.mjs') 2ms after the last
```

会发现 `metadata.discovered` 的数量不再变化，并且 [re-running optimizer](https://github.com/vitejs/vite/blob/v4.4.9/packages/vite/src/node/optimizer/optimizer.ts#L671-L672) 这一步按照预期所想的被执行了。

此时在页面中可以看到 `Hello,World!` 的内容，并且控制台也不再报错了。

**另外，这里比较有意思的一点就是 `delayDepsOptimizerUntil('main.js')` 前的时间间隔变成了 823ms ，说明在此之前执行了 scss 文件的预构建，然而再重启项目会发现这个时间可能又变成 10ms 了，也就是说预构建 scss 文件的时机忽早忽迟的。**

### 后续思考

---

[async/await](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/async_function) 语法可以看作是 [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) 链式回调的语法糖，以类似写同步代码的顺序来写异步代码，更便于理解。加上 **JS** 本就是单线程执行的，所以用多了这种语法以后就会陷入一种 **就是在写同步代码** 的误区。[await](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/await) 表达式会跳出当前函数而执行 [队列（ event loop ）](https://developer.mozilla.org/docs/Web/JavaScript/Event_loop) 中的其他代码，等待异步操作结束后再跳回到当前函数继续执行， **这个中间过程需要多久，又执行了哪些不相关的其他代码** 是无法预料的，所以本文出现的这个问题就是因为没有考虑到 `await` 前后局部变量的状态会发生变化而导致的。

而且异步代码不只是 `Promise` ，还有各种 [事件监听](https://developer.mozilla.org/docs/Learn/JavaScript/Building_blocks/Events) 、 [定时器](https://developer.mozilla.org/docs/Web/API/setTimeout) 、 [微任务](https://developer.mozilla.org/docs/Web/API/queueMicrotask) 等，综合下来整个代码的运行顺序和想象中可能就不太一样了。思考下面这段代码的执行结果：

```javascript
const queue = [];

async function sleep(time) {
  await new Promise((resolve) => {
    setTimeout(() => resolve(), time);
  });
}

async function randomSleep() {
  await sleep(Math.round(Math.random() * 100));
}

async function a(n) {
  await randomSleep();
  queue.push(`a${n}`);
  await b(n);
}

async function b(n) {
  await randomSleep();
  queue.push(`b${n}`);
  await c(n);
}

async function c(n) {
  await randomSleep();
  queue.push(`c${n}`);
}

(async () => {
  await Promise.all(
    Array(5)
      .fill(null)
      .map((_, n) => a(n))
  );
  console.log(queue.join(' > '));
})();
```

`a[n] > b[n] > c[n]` 的顺序是必然的，但是 `a[i]` 和 `b[j]` 的顺序就说不准了。

另外，在写同步代码的时候都喜欢用这种方式来计算耗时：

```javascript
const start = Date.now();
foo();
console.log(`use ${Date.now() - start}ms`);
```

针对异步代码还用这种方式就不太准了，还是以上面的代码为例，运行结果可能是这样的：

```
a0 > a1 > b0 > b1 > c0 > c1
```

如果只是简单的以 `a0` 开始 `c0` 结束来计算时间差显然是错误的，因为中间还包括了 `a1` 和 `b1` 的耗时。

**Vite** 就是如此简单粗暴地计算耗时的。比如为了 [自定义 Element 主题](https://element.eleme.cn/#/zh-CN/component/custom-theme#zai-xiang-mu-zhong-gai-bian-scss-bian-liang) 就需要编译整个 **scss** 文件，然而打开 **debug** 日志后可以发现不仅是这个 **scss** 文件的耗时巨慢，其他代码的耗时也跟着增加了，这就对排查问题造成了干扰（ 明明慢的只是一个文件而已，结果日志却显示很多文件都慢 ）。

一个巨慢的同步任务导致整个主线程卡住显然是不好的体验，只能期待后续 [**Vite** 对多线程的应用](https://github.com/vitejs/vite/pull/13584) 。

### 关于 StackBlitz

---

曾经在分享 **demo** 的时候用到过一些在线编辑器： [CodeSandbox](https://codesandbox.io) 、 [CodePen](https://codepen.io) 、 [StackBlitz](https://stackblitz.com) 等，主要原理都是把代码上传到云端，然后单独启动一个容器来运行项目并提供端口供用户访问。限制还是比较多，写项目不现实，只适合做分享和演示，综合使用下来还是 **CodeSandbox** 体验好一点。

然而没想到几年过去 **StackBlitz** 直接弯道超车了， [WebContainers](https://developer.stackblitz.com/guides/user-guide/available-environments#webcontainers) 把整个 **Node.js** 环境搬到了浏览器上，可以像在本地环境中一样使用任意的前端框架并且支持各种 **Node.js** 后端框架，再加上 **VSCode** 风格的编辑器，和本地开发体验是非常接近的。

这次提 **PR** 就用到了 [StackBlitz Codeflow](https://stackblitz.com/codeflow) （ 强烈建议看下官网的演示视频 ），写 **demo** 、提 **issue** 、写 **PR** 整个流程一条龙服务，不需要 **clone** 项目到本地，所有操作全在浏览器内完成。

- [.new 域名](https://developer.stackblitz.com/guides/user-guide/starter-projects) 支持创建众多脚手架生成的模板项目。
- 打开任意的 **GitHub** 仓库，在 **url** 前面加上 [`pr.new`](https://developer.stackblitz.com/codeflow/using-pr-new) 前缀就能重定向到 [Codeflow IDE](https://developer.stackblitz.com/codeflow/working-in-codeflow-ide) 一键开始项目开发，而无需专门配置本地开发环境。
- 从 **issue** 页面跳转到 **pr.new** 后会自动拉取 **issue** 中提供的 [reproduction](https://developer.stackblitz.com/guides/integration/bug-reproductions) 项目和主体项目进行 [关联](https://developer.stackblitz.com/codeflow/integrating-codeflowapp-bot#pnpm-override-use-case-scenario) ，这样写 **PR** 的时候就能直接验证更改操作是否有效。 **这个功能非常有用！**

[如何评价 StackBlitz 可在浏览器运行 Node.js 程序的 WebContainers？](https://www.zhihu.com/question/460671381)

### 最后

---

这是我真正意义上的第一次提 [issue](https://github.com/vitejs/vite/issues/14284) 和 [PR](https://github.com/vitejs/vite/pull/14285) ，很荣幸成为 **Vite** 项目 **contributors** 中的一员，为开源贡献了一点自己的微薄之力。

不过，在本地定位问题并解决也就只需要几个小时，然而梳理原因、分析解释、翻译、提供最小复现、测试却花费了数天，挺耽误时间的。再加上项目成员看到问题、确认、合并 **PR** 、发包又是不短的时间，时效性太低了，这也是我一直以来不想提 **issue** 的原因。

仔细想想，还是自己改代码然后 **patch-package** 打补丁比较香，这也是 **node_modules** 这个 [屎山](https://www.zhihu.com/question/36697792) 为数不多的优点了。

---

#### 转载请注明出处： [https://github.com/anyesu/blog/issues/46](https://anyesu.github.io/blog/articles/46)
