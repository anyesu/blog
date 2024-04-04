### 前言

---

最近刚把公司项目从 **SVN** 迁移到了 **Git** 上，在这里做个记录。

### 数据迁移

---

```shell
# 检出空项目 proj
$ svn co --depth=empty --username=user svn://url proj

# 进入 proj 目录
$ cd proj

# 获取 user 列表
$ echo '(no author) = no_author <no_author@no_author>' > ../users.txt
$ svn log ^/ --xml | grep -P "^<author" | sort -u | perl -pe 's/<author>(.*?)<\/author>/$1 = $1 <$1\@email.com>/' >> ../users.txt

# 对 users.txt 进行编辑 - 替换用户名和邮箱内容

$ cd ../ && rm -rf proj

# 检出 svn r1 版本到最新版本的数据
$ git svn clone -r1:HEAD svn://url --username=user --no-metadata --authors-file=users.txt proj
```

执行上面的步骤就可以将 **SVN** 项目导出到本地 **Git** 仓库了。不过，一般项目比较大导出时间会比较长，可以中断 `git svn clone` 操作，采用下面的命令分段迁移，避免长时间运行把电脑弄卡或者死机：

```shell
# 进入 proj 目录
$ cd proj

# 更新远程分支 git-svn
$ git svn fetch

# 合并远程分支 git-svn 到 master 分支
$ git merge git-svn

# 如果迁移过程中 svn 地址有变动，可以修改 .git/config 文件中对应的 url
```

这里说一个迁移的细节，可以提早进行 `git svn clone` 操作，在下班的时候 `git svn fetch` 快速更新到最新版本然后停掉 **SVN** 服务器。

### 多模块项目拆分

---

我们的项目是一个 **maven** 多模块项目，原先在 **SVN** 下可以给不同的人开放不同子模块的权限，而 **Git** 无法做到目录级权限控制，所以能想到的解决办法就是拆拆拆。不过，我们项目的子模块比较多 ( 20 多个 )，全拆感觉会要命，就简单拆成前端和后端两个仓库吧。

```shell
# 1. 将子模块 [module1] 拆分为新的分支 module1
$ git subtree split -P module1 -b module1

# 2. 清理 master 分支中包含子模块 [module1] 的内容
$ git filter-branch -f --index-filter "git rm -rf --cached --ignore-unmatch module1" --prune-empty master

# 3. 将子模块推送到新仓库的 master 分支
$ git push http://gitlab/module1.git module1:master
```

需要深入使用 **subtree** 可以参考下面的步骤，不过个人认为 **subtree** 的引用在日常开发中不是很方便，还不如工作空间下引入多个项目。

```shell
# 4. 父模块引入新的仓库作为子模块
$ git subtree add --prefix=module1 http://gitlab/module1.git master

# 5. 父模块中 pull 子模块的数据
$ git subtree pull --prefix=module1 http://gitlab/module1.git master

# 6. 父模块向子模块 push
$ git subtree push --prefix=module1 http://gitlab/module1.git master
```

### 遇到的问题

---

- **耗时**
  `git svn clone` , `git subtree split` , `git filter-branch` 这三个步骤非常的耗时间，需要合理安排时间, 中途要经常备份。我们的项目有 **3w+** 的 **commits** ，在 **i5 8g** 的 **win10** 上耗时分别为 **30 h**, **2 h**, **10 h**，迁移后项目大小 **300 M** 。中途遇到过 **蓝屏重启后索引错乱需要重头再来** 、 **内存泄漏导致死机** ( [单独开篇讲](https://www.jianshu.com/p/7510e57aeaff) ) 、 **SVN 服务器经常断开连接** 等等问题。

- **空目录**
  迁移后，原先的空目录会被删除，如果需要保持原有目录结构，可以在空目录下添加占位文件并提交到 **SVN** 上，之后再导入 **Git** 。参考 [git 提交空文件夹](https://blog.csdn.net/fengchao2016/article/details/52769151) 。

- **换行符的问题**
  在 **SVN** 上这个不算什么大问题，迁移到 **Git** 之后就成了大问题，因为有 **autocrlf** 这个配置项。一般人安装 **Git** 的时候要么选择默认设置，要么被网上的文章误导一顿操作结果越设置越乱。解决方法：

  > 源码在仓库中统一用 LF 格式保存
  >
  > 在 Mac 上设置 autocrlf = input ( 检出的时候不转换，提交的时候自动转成 LF )
  >
  > 在 Windows 上设置 autocrlf = true ( 检出的时候自动转成 CRLF , 提交的时候自动转成 LF )

  我们的项目比较可怕，是 **CRLF** 文件和 **LF** 文件混合的，可以采用下面的命令批量替换，然后提交到 **SVN** 上。

  ```shell
  # 修改 svn 项目的换行符（ Linux 下或者进入 git-bash 执行 ）
  $ find . -type f -print -o -path ./.svn -prune | xargs dos2unix -k
  ```

  对了，迁移完最好使用 **Beyond Compare 4** 这样的工具对比下。

**其他问题**

- 迁移用的 **SVN** 帐号最好有所有目录的权限

- **users.txt** 中加一行：

  ```shell
  (no author) = no_author <no_author@no_author>
  ```

- 最好在 **Linux** 系统上进行迁移，耗时能从以 **小时** 为单位降低到以 **分钟** 为单位，而且可以同时进行多个项目的迁移。

### 参考

---

- **[SVN 迁移到 git](https://blog.csdn.net/xueshanhaizi/article/details/54929365)**
- **[Git 仓库拆拆拆](https://segmentfault.com/a/1190000002548731)**
- **[Git 多仓库作子目录的双向同步：一次 Git Subtree 的实践](https://typecodes.com/mix/gitsubtree1.html)**
- **[Windows 文件换行符转 Linux 换行符](https://blog.csdn.net/cjf_iceking/article/details/47836201)**

---

### 结语

---

整个迁移步骤就上面简单的几步，剩下的就是把本地仓库 **push** 到远程仓库 ( 如 **gitlab** ) 中，至于其他的坑各位自行体验吧。

---

#### 转载请注明出处：[https://www.jianshu.com/p/5dcf658851f7](https://www.jianshu.com/p/5dcf658851f7)
