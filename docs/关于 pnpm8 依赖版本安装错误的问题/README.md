### 背景

---

![cover](imgs/cover.png)

创建完 [Vue 3](https://github.com/vuejs/core) 版本的 [Taro](https://docs.taro.zone/docs/GETTING-STARTED) 项目，运行的时候发现报错了：

```javascript
I:\Temp\taro-demo-vue3>npm run dev:h5

> taro-demo-vue3@1.0.0 dev:h5
> npm run build:h5 -- --watch


> taro-demo-vue3@1.0.0 build:h5
> taro build --type h5 --watch

👽 Taro v3.6.25

Tips:
1. 建议开启持久化缓存功能，能有效提升二次编译速度，详情请参考: https://docs.taro.zone/docs/config-detail#cache。


node:internal/modules/cjs/loader:1028
  const err = new Error(message);
              ^

Error: Cannot find module 'vue/compiler-sfc'
Require stack:
- I:\Temp\taro-demo-vue3\node_modules\.pnpm\vue-loader@17.0.0_webpack@5.78.0\node_modules\vue-loader\dist\index.js
- I:\Temp\taro-demo-vue3\node_modules\.pnpm\@tarojs+plugin-framework-vue3@3.6.25_@tarojs+runtime@3.6.25_@tarojs+shared@3.6.25_@tarojs+taro@3.6.25_vue@3.0.0\node_modules\@tarojs\plugin-framework-vue3\dist\index.js
- I:\Temp\taro-demo-vue3\node_modules\.pnpm\@tarojs+plugin-framework-vue3@3.6.25_@tarojs+runtime@3.6.25_@tarojs+shared@3.6.25_@tarojs+taro@3.6.25_vue@3.0.0\node_modules\@tarojs\plugin-framework-vue3\index.js
- I:\Temp\taro-demo-vue3\node_modules\.pnpm\@tarojs+service@3.6.25_@tarojs+shared@3.6.25_@tarojs+taro@3.6.25\node_modules\@tarojs\service\dist\utils\index.js
- I:\Temp\taro-demo-vue3\node_modules\.pnpm\@tarojs+service@3.6.25_@tarojs+shared@3.6.25_@tarojs+taro@3.6.25\node_modules\@tarojs\service\dist\Kernel.js
- I:\Temp\taro-demo-vue3\node_modules\.pnpm\@tarojs+service@3.6.25_@tarojs+shared@3.6.25_@tarojs+taro@3.6.25\node_modules\@tarojs\service\dist\index.js
- I:\Temp\taro-demo-vue3\node_modules\.pnpm\@tarojs+service@3.6.25_@tarojs+shared@3.6.25_@tarojs+taro@3.6.25\node_modules\@tarojs\service\index.js
- I:\Temp\taro-demo-vue3\node_modules\.pnpm\@tarojs+cli@3.6.25_@tarojs+taro@3.6.25\node_modules\@tarojs\cli\dist\cli.js
- I:\Temp\taro-demo-vue3\node_modules\.pnpm\@tarojs+cli@3.6.25_@tarojs+taro@3.6.25\node_modules\@tarojs\cli\bin\taro
    at Function.Module._resolveFilename (node:internal/modules/cjs/loader:1028:15)
    at Function.Module._load (node:internal/modules/cjs/loader:873:27)
    at Module.require (node:internal/modules/cjs/loader:1100:19)
    at require (node:internal/modules/cjs/helpers:119:18)
    at Object.<anonymous> (I:\Temp\taro-demo-vue3\node_modules\.pnpm\vue-loader@17.0.0_webpack@5.78.0\node_modules\vue-loader\dist\index.js:8:24)
    at Module._compile (node:internal/modules/cjs/loader:1198:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1252:10)
    at Object.newLoader [as .js] (I:\Temp\taro-demo-vue3\node_modules\.pnpm\pirates@4.0.6\node_modules\pirates\lib\index.js:121:7)
    at Module.load (node:internal/modules/cjs/loader:1076:32)
    at Function.Module._load (node:internal/modules/cjs/loader:911:12) {
  code: 'MODULE_NOT_FOUND',
  requireStack: [
    'I:\\Temp\\taro-demo-vue3\\node_modules\\.pnpm\\vue-loader@17.0.0_webpack@5.78.0\\node_modules\\vue-loader\\dist\\index.js',
    'I:\\Temp\\taro-demo-vue3\\node_modules\\.pnpm\\@tarojs+plugin-framework-vue3@3.6.25_@tarojs+runtime@3.6.25_@tarojs+shared@3.6.25_@tarojs+taro@3.6.25_vue@3.0.0\\node_modules\\@tarojs\\plugin-framework-vue3\\dist\\index.js',
    'I:\\Temp\\taro-demo-vue3\\node_modules\\.pnpm\\@tarojs+plugin-framework-vue3@3.6.25_@tarojs+runtime@3.6.25_@tarojs+shared@3.6.25_@tarojs+taro@3.6.25_vue@3.0.0\\node_modules\\@tarojs\\plugin-framework-vue3\\index.js',
    'I:\\Temp\\taro-demo-vue3\\node_modules\\.pnpm\\@tarojs+service@3.6.25_@tarojs+shared@3.6.25_@tarojs+taro@3.6.25\\node_modules\\@tarojs\\service\\dist\\utils\\index.js',
    'I:\\Temp\\taro-demo-vue3\\node_modules\\.pnpm\\@tarojs+service@3.6.25_@tarojs+shared@3.6.25_@tarojs+taro@3.6.25\\node_modules\\@tarojs\\service\\dist\\Kernel.js',
    'I:\\Temp\\taro-demo-vue3\\node_modules\\.pnpm\\@tarojs+service@3.6.25_@tarojs+shared@3.6.25_@tarojs+taro@3.6.25\\node_modules\\@tarojs\\service\\dist\\index.js',
    'I:\\Temp\\taro-demo-vue3\\node_modules\\.pnpm\\@tarojs+service@3.6.25_@tarojs+shared@3.6.25_@tarojs+taro@3.6.25\\node_modules\\@tarojs\\service\\index.js',
    'I:\\Temp\\taro-demo-vue3\\node_modules\\.pnpm\\@tarojs+cli@3.6.25_@tarojs+taro@3.6.25\\node_modules\\@tarojs\\cli\\dist\\cli.js',
    'I:\\Temp\\taro-demo-vue3\\node_modules\\.pnpm\\@tarojs+cli@3.6.25_@tarojs+taro@3.6.25\\node_modules\\@tarojs\\cli\\bin\\taro'
  ]
}
```

### 问题定位

---

报错原因是 `vue` 包下找不到 `compiler-sfc` 这个目录，查一下 `vue` 的版本：

```powershell
I:\Temp\taro-demo-vue3>pnpm ls vue
Legend: production dependency, optional only, dev only

taro-demo-vue3@1.0.0 I:\Temp\taro-demo-vue3

dependencies:
vue 3.0.0
```

在 [package.json](https://github.com/NervJS/taro/blob/4153b769f77ee0170900aeda9b7b410dea259ead/packages/taro-cli/templates/default/package.json.tmpl#L65) 中定义的版本是 `"vue": "^3.0.0"` 然而就直接安装了 `3.0.0` 版本，这就很不合逻辑。

把 **node_modules** 删了，改用 **npm** 重新安装依赖，发现安装的就是最新版的 `vue` 了：

```powershell
> npx rimraf@5 -g node_modules
> npm i
> npm ls vue
taro-demo-vue3@1.0.0 I:\Temp\taro-demo-vue3
├─┬ @tarojs/plugin-framework-vue3@3.6.25
│ └── vue@3.4.21 deduped
├─┬ @tarojs/test-utils-vue3@0.1.1
│ └─┬ @vue/vue3-jest@29.2.6
│   └── vue@3.4.21 deduped
└─┬ vue@3.4.21
  └─┬ @vue/server-renderer@3.4.21
    └── vue@3.4.21 deduped
```

再次启动项目也不报错了，说明问题出在 **pnpm** 身上。

去 **pnpm** 官网搜索后发现原因了： **pnpm** 版本（ `v8.0.0` 到 `v8.6.12` ）中 [`resolution-mode`](https://pnpm.io/npmrc#resolution-mode) 的默认值是 `lowest-direct` ，即 **安装依赖的最低版本** 。从 [pnpm@8.7.0](https://github.com/pnpm/pnpm/releases/tag/v8.7.0) 开始，已经回滚默认值为 `highest` 了，所以出错的只有部分用户。而我好巧不巧安装了修复前的最后一个版本 `8.6.12` 后就没更新过。

- [installing a dependency, by default, installs the lowest matching version of that dependency pnpm/pnpm#6463](https://github.com/pnpm/pnpm/issues/6463)

### 解决方法

---

#### 1. 升级 `vue-loader` 到一个不会报错的版本，比如 `^17.1.0`

- [\[Error\] cannot find vue/compiler-sfc when using yarn workspace and lerna to install node_modules. vuejs/vue-loader#2031](https://github.com/vuejs/vue-loader/issues/2031)

#### 2. 升级 `vue3` 到一个不会报错的版本，比如 [`^3.2.13`](https://github.com/vuejs/core/commit/471f66a1f6cd182f3e106184b2e06f7753382996#diff-c9dac0430d95f1a4399b9f4640a50bbf68e8199fa90ad846392d401e19efb514)

#### 3. 项目根目录添加一个 `.npmrc` 文件

强制下载最高版本，可以兼容所有版本的 **pnpm** ，就是有点碍眼。

```bash
resolution-mode=highest
```

- [feat: set resolution-mode=highest in template .npmrc sveltejs/kit#9781](https://github.com/sveltejs/kit/pull/9781)

#### 4. [升级 pnpm 版本](https://pnpm.io/installation)

下载 **exe** 的方式以后升级还得手动替换，还是用 **npm** 仓库安装更加省事、通用。

```powershell
npm i -g @pnpm/exe
```

这里有一个小技巧：先用 **npm** 全局安装 **pnpm** ，再用 **pnpm** 套娃安装指定版本的自己：

```powershell
pnpm i -g @pnpm/exe@8.7.0
```

利用 **pnpm** 全局缓存的特性就可以快速切换不同版本的 **pnpm** 了。

```powershell
> where pnpm
C:\Users\xxx\AppData\Local\pnpm\pnpm
C:\Users\xxx\AppData\Local\pnpm\pnpm.CMD
D:\nodejs\node_global\pnpm
D:\nodejs\node_global\pnpm.cmd
```

可以看到其实安装了两个 **pnpm** ，只是 `%PNPM_HOME%` 目录处于 **PATH** 环境变量中靠前的位置（ **如果不是这样的话，自己调整一下环境变量的顺序** ），优先级更高，所以里面的 **pnpm** 就是我们实际用到的那个。

**总结：还是手动把 `vue-loader` 、`vue` 以及 pnpm 都升级掉，这样以后比较省事。**

### 小插曲

---

测试升级 **pnpm** 后的效果时，发现原先的报错是没了，但又报新的错了：

```powershell
I:\Temp\taro-demo-vue3>npm run dev:h5

> taro-demo-vue3@1.0.0 dev:h5 I:\Temp\taro-demo-vue3
> npm run build:h5 -- --watch


> taro-demo-vue3@1.0.0 build:h5 I:\Temp\taro-demo-vue3
> taro build --type h5 "--watch"

👽 Taro v3.6.25

Error: Cannot find module '@tarojs/binding-win32-x64-msvc'
Require stack:
- I:\Temp\taro-demo-vue3\node_modules\.pnpm\@tarojs+binding@3.6.25\node_modules\@tarojs\binding\binding.js
- I:\Temp\taro-demo-vue3\node_modules\.pnpm\@tarojs+cli@3.6.25_@tarojs+taro@3.6.25\node_modules\@tarojs\cli\dist\create\project.js
- I:\Temp\taro-demo-vue3\node_modules\.pnpm\@tarojs+cli@3.6.25_@tarojs+taro@3.6.25\node_modules\@tarojs\cli\dist\index.js
- I:\Temp\taro-demo-vue3\node_modules\.pnpm\@tarojs+cli@3.6.25_@tarojs+taro@3.6.25\node_modules\@tarojs\cli\index.js
- I:\Temp\taro-demo-vue3\config\index.ts
- I:\Temp\taro-demo-vue3\node_modules\.pnpm\@tarojs+service@3.6.25_@tarojs+shared@3.6.25_@tarojs+taro@3.6.25\node_modules\@tarojs\service\dist\Config.js
- I:\Temp\taro-demo-vue3\node_modules\.pnpm\@tarojs+service@3.6.25_@tarojs+shared@3.6.25_@tarojs+taro@3.6.25\node_modules\@tarojs\service\dist\index.js
- I:\Temp\taro-demo-vue3\node_modules\.pnpm\@tarojs+service@3.6.25_@tarojs+shared@3.6.25_@tarojs+taro@3.6.25\node_modules\@tarojs\service\index.js
- I:\Temp\taro-demo-vue3\node_modules\.pnpm\@tarojs+cli@3.6.25_@tarojs+taro@3.6.25\node_modules\@tarojs\cli\dist\cli.js
- I:\Temp\taro-demo-vue3\node_modules\.pnpm\@tarojs+cli@3.6.25_@tarojs+taro@3.6.25\node_modules\@tarojs\cli\bin\taro
    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:931:15)
    at Function.Module._load (internal/modules/cjs/loader.js:774:27)
    at Module.require (internal/modules/cjs/loader.js:1003:19)
    at require (internal/modules/cjs/helpers.js:107:18)
    at Object.<anonymous> (I:\Temp\taro-demo-vue3\node_modules\.pnpm\@tarojs+binding@3.6.25\node_modules\@tarojs\binding\binding.js:70:29)
    at Module._compile (internal/modules/cjs/loader.js:1114:14)
    at Module._extensions..js (internal/modules/cjs/loader.js:1143:10)
    at Object.newLoader [as .js] (I:\Temp\taro-demo-vue3\node_modules\.pnpm\pirates@4.0.6\node_modules\pirates\lib\index.js:121:7)
    at Module.load (internal/modules/cjs/loader.js:979:32)
    at Function.Module._load (internal/modules/cjs/loader.js:819:12) {
  code: 'MODULE_NOT_FOUND',
  requireStack: [
    'I:\\Temp\\taro-demo-vue3\\node_modules\\.pnpm\\@tarojs+binding@3.6.25\\node_modules\\@tarojs\\binding\\binding.js',
    'I:\\Temp\\taro-demo-vue3\\node_modules\\.pnpm\\@tarojs+cli@3.6.25_@tarojs+taro@3.6.25\\node_modules\\@tarojs\\cli\\dist\\create\\project.js',
    'I:\\Temp\\taro-demo-vue3\\node_modules\\.pnpm\\@tarojs+cli@3.6.25_@tarojs+taro@3.6.25\\node_modules\\@tarojs\\cli\\dist\\index.js',
    'I:\\Temp\\taro-demo-vue3\\node_modules\\.pnpm\\@tarojs+cli@3.6.25_@tarojs+taro@3.6.25\\node_modules\\@tarojs\\cli\\index.js',
    'I:\\Temp\\taro-demo-vue3\\config\\index.ts',
    'I:\\Temp\\taro-demo-vue3\\node_modules\\.pnpm\\@tarojs+service@3.6.25_@tarojs+shared@3.6.25_@tarojs+taro@3.6.25\\node_modules\\@tarojs\\service\\dist\\Config.js',
    'I:\\Temp\\taro-demo-vue3\\node_modules\\.pnpm\\@tarojs+service@3.6.25_@tarojs+shared@3.6.25_@tarojs+taro@3.6.25\\node_modules\\@tarojs\\service\\dist\\index.js',
    'I:\\Temp\\taro-demo-vue3\\node_modules\\.pnpm\\@tarojs+service@3.6.25_@tarojs+shared@3.6.25_@tarojs+taro@3.6.25\\node_modules\\@tarojs\\service\\index.js',
    'I:\\Temp\\taro-demo-vue3\\node_modules\\.pnpm\\@tarojs+cli@3.6.25_@tarojs+taro@3.6.25\\node_modules\\@tarojs\\cli\\dist\\cli.js',
    'I:\\Temp\\taro-demo-vue3\\node_modules\\.pnpm\\@tarojs+cli@3.6.25_@tarojs+taro@3.6.25\\node_modules\\@tarojs\\cli\\bin\\taro'
  ]
}
找不到插件依赖 "@tarojs/plugin-framework-react"，请先在项目中安装，项目路径：I:\Temp\taro-demo-vue3
```

这个 [@tarojs/binding-win32-x64-msvc](https://www.npmjs.com/package/@tarojs/binding-win32-x64-msvc) 包是 [@tarojs/binding](https://www.npmjs.com/package/@tarojs/binding) 包中的 [optionalDependencies （可选依赖项）](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#optionaldependencies) 。按理说应该会根据运行的系统环境自动安装的，但是没安装下来。又是耽误时间去怀疑是不是 **pnpm** 升级导致本地缓存错乱或者不再自动安装 **optionalDependencies** 了。

最后仔细看了 `@tarojs/binding-win32-x64-msvc` 包的 [package.json](https://github.com/NervJS/taro/blob/4153b769f77ee0170900aeda9b7b410dea259ead/npm/win32-x64-msvc/package.json#L17) 才发现它是依赖 **node16** 的，而我在升级 **pnpm** 的时候因为操作生疏把它安装的 **node16** 也一并删掉了，就只剩一个原装的 **node14** 了，知道真相后也是挺无语的。

- [使用 pnpm 安装并使用指定版本的 Node.js](https://pnpm.io/cli/env)
- [`pnpm install --froce` will install all optionalDependencies](https://github.com/pnpm/pnpm/issues/5931)

### 关联问题

---

- [Taro 3.6.2 初始化项目 #13554](https://github.com/NervJS/taro/issues/13554)

---

#### 转载请注明出处： [https://github.com/anyesu/blog/issues/50](https://anyesu.github.io/blog/articles/50)
