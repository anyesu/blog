### 前言

---

项目中用到了类似于微信朋友圈的九宫格控件，没有找到合适的开箱即用的成品，只好自己去开发一个。开发过程中，每次修改了代码都要重新编译运行 **APP** 才能看到实际效果（ 因为编辑器的预览窗口是空白的或者说十分简陋 ），开发体验十分不友好：

- 硬编码造数据去测试，测试完了还不能留下脏数据。
- 控件所在页面层次比较深的话，就会造成一堆不必要的重复操作，浪费时间。
- 改一个属性值又要重新走一遍。
- ...

> 其实市面上大部分控件都是如此，不跑一遍根本不晓得是什么鬼效果。

为了提高开发效率，也为了 **所见即所得** ，于是就萌生了去适配 **[布局编辑器](https://developer.android.google.cn/studio/write/layout-editor) 预览窗口** 的想法。过程不易，但结果还是比较满意的。

![cover](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Android%20实时预览%20XML%20中的自定义控件/imgs/cover.png)

### 创建控件

---

首先我们新建一个简化的九宫格控件，看下默认的预览效果。

- **MainActivity.kt**

  ```kotlin
  package com.example.myapplication

  import android.os.Bundle
  import androidx.appcompat.app.AppCompatActivity

  class MainActivity : AppCompatActivity() {
      override fun onCreate(savedInstanceState: Bundle?) {
          super.onCreate(savedInstanceState)
          setContentView(R.layout.activity_main)

          findViewById<NineGridView<Int>>(R.id.nineGridView).apply {
              setList((0 until 7).toList())
          }
      }
  }
  ```

- **res/layout/activity_main.xml**

  ```xml
  <?xml version="1.0" encoding="utf-8"?>
  <FrameLayout
      xmlns:android="http://schemas.android.com/apk/res/android"
      xmlns:tools="http://schemas.android.com/tools"
      android:layout_width="match_parent"
      android:layout_height="match_parent"
      tools:context=".MainActivity">

      <com.example.myapplication.NineGridView
          android:id="@+id/nineGridView"
          android:layout_width="wrap_content"
          android:layout_height="wrap_content" />

  </FrameLayout>
  ```

- **NineGridView.kt**

  ```kotlin
  package com.example.myapplication

  import android.annotation.SuppressLint
  import android.content.Context
  import android.util.AttributeSet
  import android.view.LayoutInflater
  import android.view.View
  import android.view.ViewGroup
  import android.widget.TextView
  import androidx.annotation.LayoutRes
  import androidx.recyclerview.widget.GridLayoutManager
  import androidx.recyclerview.widget.RecyclerView

  class NineGridView<T> @JvmOverloads constructor(context: Context, attrs: AttributeSet? = null, defStyleAttr: Int? = null) :
      RecyclerView(context, attrs, defStyleAttr ?: androidx.recyclerview.R.attr.recyclerViewStyle) {

      private val mAdapter: NineGridViewAdapter<T>

      fun setList(mData: List<T>) = mAdapter.setList(mData)

      init {
          layoutManager = GridLayoutManager(context, 3)
          mAdapter = NineGridViewAdapter()
          adapter = mAdapter
      }
  }

  class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView)

  class NineGridViewAdapter<T>(
      @LayoutRes private val layoutResId: Int = R.layout.sample_grid_item,
      data: MutableList<T>? = null
  ) : RecyclerView.Adapter<ViewHolder>() {
      private var data = data ?: arrayListOf()

      fun setList(mData: List<T>) = data.run {
          if (this != mData) {
              clear()
              addAll(mData)
          }
          notifyDataSetChanged()
      }

      private fun ViewGroup.getItemView(@LayoutRes layoutResId: Int): View = LayoutInflater.from(context).inflate(layoutResId, this, false)

      override fun onCreateViewHolder(parent: ViewGroup, viewType: Int) = ViewHolder(parent.getItemView(layoutResId))

      @SuppressLint("SetTextI18n")
      override fun onBindViewHolder(holder: ViewHolder, position: Int) {
          holder.itemView.apply {
              findViewById<TextView>(R.id.text).text = "item-${data[position]?.toString()}"
          }
      }

      override fun getItemCount() = data.size
  }
  ```

- **res/layout/sample_grid_item.xml**

  ```xml
  <?xml version="1.0" encoding="utf-8"?>
  <androidx.constraintlayout.widget.ConstraintLayout
      xmlns:android="http://schemas.android.com/apk/res/android"
      xmlns:app="http://schemas.android.com/apk/res-auto"
      xmlns:tools="http://schemas.android.com/tools"
      android:layout_width="match_parent"
      android:layout_height="wrap_content"
      android:padding="5dp">

      <TextView
          android:id="@+id/text"
          android:layout_width="match_parent"
          android:layout_height="0dp"
          android:background="#4D000000"
          android:gravity="center"
          android:textColor="#000000"
          android:textSize="36sp"
          app:layout_constraintBottom_toBottomOf="parent"
          app:layout_constraintDimensionRatio="H,1:1"
          app:layout_constraintLeft_toLeftOf="parent"
          app:layout_constraintRight_toRightOf="parent"
          app:layout_constraintTop_toTopOf="parent"
          tools:text="@tools:sample/lorem" />

  </androidx.constraintlayout.widget.ConstraintLayout>
  ```

打开 **APP** 可以看到我们想要的九宫格效果了：

![APP 预览 1](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Android%20实时预览%20XML%20中的自定义控件/imgs/app_preview_1.png)

然而在编辑器里的预览效果却是这样的：

![编辑器预览 1](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Android%20实时预览%20XML%20中的自定义控件/imgs/editor_preview_1.png)

### 添加 [工具属性](https://developer.android.google.cn/studio/write/tool-attributes)

---

> Android Studio 支持 `tools` 命名空间中的多种 XML 属性，这些属性支持设计时功能（例如要在 Fragment 中显示哪种布局）或编译时行为（例如要对 XML 资源应用哪种压缩模式）。在您构建应用时，构建工具会移除这些属性，因此它们不会对 APK 大小或运行时行为产生影响。

添加 **工具属性** 可以使编辑器的预览效果变得丰富起来，相关用法和属性值官方文档中介绍的也比较详细了，我就提几个注意点：

- 可以使用 `tools:` 前缀的属性替换大部分的普通属性（ `android:xxx` 、 `app:xxx` ），可以和普通属性同时存在，但在预览时具有更高的优先级。
- `tools:` 前缀的属性只在预览时生效，不会影响 **APP** 实际的运行效果，也就是说可以在丰富预览效果的同时不会产生脏数据。
- `tools:` 前缀的属性不支持代码提示或者说只支持官方文档中提到的几个特定属性，可以先写成普通属性然后替换为 `tools:` 前缀。
- 可以使用 ["@tools:sample/\*" 资源](https://developer.android.google.cn/studio/write/tool-attributes#toolssample_resources) 将占位符数据或图片注入到视图中，除了自带的数据外也可以 [自定义 sample data](https://blog.csdn.net/s1674521/article/details/99231319#_sample_data_413) 。

我们的 `NineGridView` 继承自 `RecyclerView` ，所以我们可以通过 `tools:itemCount` 和 `tools:listitem` 属性来修改预览效果。

```diff
<com.example.myapplication.NineGridView
    android:id="@+id/nineGridView"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
+   tools:itemCount="9"
+   tools:listitem="@layout/sample_grid_item" />
```

![编辑器预览 2](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Android%20实时预览%20XML%20中的自定义控件/imgs/editor_preview_2.png)

### 添加自定义属性

---

添加 **工具属性** 后预览效果和 **APP** 中的实际显示效果比较接近了，但这样就结束了吗？

既然是自定义的控件，那自然少不了自定义的属性，我们添加一个自定义属性再看下效果如何。

- **res/values/attrs.xml**

  ```xml
  <?xml version="1.0" encoding="utf-8"?>
  <resources>
      <declare-styleable name="NineGridView">
          <!-- 读取 tools:itemCount 属性 -->
          <attr name="itemCount" format="integer" />

          <!-- item 的大小 - 单位: px -->
          <attr name="size" format="dimension" />
      </declare-styleable>
  </resources>
  ```

- **NineGridView.kt**

  ```diff
  class NineGridView<T> @JvmOverloads constructor(context: Context, attrs: AttributeSet? = null, defStyleAttr: Int? = null) :
      ...

  +   private var size: Int? = null

  +   private var itemCount = 0

      ...

      init {
  +       attrs?.also {
  +           context.withStyledAttributes(it, R.styleable.NineGridView) {
  +               itemCount = getInt(R.styleable.NineGridView_itemCount, itemCount)
  +               R.styleable.NineGridView_size.also { index ->
  +                   if (hasValue(index)) size = getDimensionPixelSize(index, LayoutParams.MATCH_PARENT)
  +               }
  +           }
  +       }

          ...
  -       mAdapter = NineGridViewAdapter()
  +       mAdapter = NineGridViewAdapter(size)
          ...
      }
  }

  ...

  class NineGridViewAdapter<T>(
  +   private val size: Int?,
      @LayoutRes private val layoutResId: Int = R.layout.sample_grid_item,
      data: MutableList<T>? = null
  ) : RecyclerView.Adapter<ViewHolder>() {

      ...

      override fun onBindViewHolder(holder: ViewHolder, position: Int) {
          holder.itemView.apply {
              findViewById<TextView>(R.id.text).text = "item-${data[position]?.toString()}"
  +           layoutParams?.run {
  +               width = size ?: ViewGroup.LayoutParams.MATCH_PARENT
  +               layoutParams = this
  +           }
          }
      }

     ...
  }
  ```

- **res/layout/activity_main.xml**

  ```xml
  <?xml version="1.0" encoding="utf-8"?>
  <FrameLayout
      xmlns:android="http://schemas.android.com/apk/res/android"
      xmlns:app="http://schemas.android.com/apk/res-auto"
      xmlns:tools="http://schemas.android.com/tools"
      android:layout_width="match_parent"
      android:layout_height="match_parent"
      tools:context=".MainActivity">

      <com.example.myapplication.NineGridView
          android:id="@+id/nineGridView"
          android:layout_width="wrap_content"
          android:layout_height="wrap_content"
          app:size="50dp"
          tools:itemCount="9"
          tools:listitem="@layout/sample_grid_item" />

  </FrameLayout>
  ```

重新运行 **APP** 可以看到 **item** 的大小已经产生了变化（ `app:size` 所设定的大小 ），而预览窗口没有发生变化。

> [!IMPORTANT]
>
> **Java / Kotlin** 代码改动之后要重新编译才能使预览窗口生效。

![APP 预览 2](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Android%20实时预览%20XML%20中的自定义控件/imgs/app_preview_2.png)

想要解决这个问题，我们需要了解预览窗口是如何完成渲染的，但是既看不到源码，也没办法调试，又陷入了另一个坑。

### 预览原理分析

---

经过不断尝试之后，我发现了一个方法就是 **抛异常** ，在预览窗口进行渲染的过程中，如果遇到了异常就会中止并提示错误（ 如下图所示 ）。（ [参考](https://developer.android.google.cn/studio/write/layout-editor#layout-warnings-errors) ）

```kotlin
fun debugInEditMode(vararg contents: Any?): Unit = throw RuntimeException(contents.joinToString { it?.toString() ?: "null" })
```

![编辑器预览 3](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Android%20实时预览%20XML%20中的自定义控件/imgs/editor_preview_3.png)

于是我们就可以不断调整抛异常的位置来推断究竟执行了哪些方法，最终推断出大概的执行过程用下面的伪代码来表示：

```kotlin
val context: com.android.layoutlib.bridge.android.BridgeContext
LayoutInflater.from(context).inflate()
    val view = BridgeInflater.createViewFromTag(..., context, attrs, ...)
        val view = NineGridView(context, attrs)
        setupViewInContext(view, attrs)
            ReflectionUtils.isInstanceOf(view, RecyclerViewUtil.CN_RECYCLER_VIEW) {
                RecyclerViewUtil.setAdapter(view, context, layoutlibCallback, adapterLayout, itemCount)
                    setLayoutManager(view, layoutMgrClassName, context, layoutlibCallback)
                    val adapter = RecyclerViewUtil.createAdapter(layoutlibCallback, adapterClassName)
                    view.setAdapter(adapter)
            }
    parent.addView(view, params)
```

所以，无法预览 `size` 属性的原因就找到了：

**预览时另外设置了一个内置的 `Adapter` 把我们自定义的 `NineGridViewAdapter` 给覆盖了。**

既然我们自己的 `adapter` 用不上，那么可以扩展 `layoutManager` 来实现同样的效果。但是不推荐这样做，因为这样做和实际运行的 **APP** 不是一种实现方式很容易埋雷。

```kotlin
(layoutManager as? GridLayoutManager)?.run {
    spanSizeLookup = object : SpanSizeLookup() {
        override fun getSpanSize(position: Int) = 1.also {
            getChildAt(position)?.apply {
                layoutParams?.run {
                    width = size ?: LayoutParams.MATCH_PARENT
                    layoutParams = this
                }
            }
        }
    }
}
```

更彻底的解决办法：通过覆盖 `setAdapter` 方法来屏蔽掉这个行为。

```diff
class NineGridView<T> @JvmOverloads constructor(context: Context, attrs: AttributeSet? = null, defStyleAttr: Int? = null) :
    ...

+   override fun setAdapter(adapter: Adapter<*>?) {
+       if (!isInEditMode) super.setAdapter(adapter)
+   }

    ...

    init {
        ...
-       adapter = mAdapter

+       // 由于禁用了 setAdapter ， 需要自己填充数据
+       super.setAdapter(mAdapter)
+       // 这里写死了数据，也可以借助 sample data 自定义数据
+       @Suppress("UNCHECKED_CAST")
+       if (isInEditMode) setList((0 until itemCount).toList() as List<T>)
    }
}
```

可以看到预览终于生效了。

![编辑器预览 4](https://cdn.jsdelivr.net/gh/anyesu/blog/docs/Android%20实时预览%20XML%20中的自定义控件/imgs/editor_preview_4.png)

现在我们在 **XML** 中不断修改属性值即可实时预览效果，无需再打开 **APP** 进行调试。

需要添加其他自定义属性（ 比如：缩放，间距，布局等 ）依葫芦画瓢即可。

### isInEditMode

---

眼尖的朋友应该看到了上面的代码中使用了 `isInEditMode()` 方法进行判断，使用这个方法可以帮助我们轻松识别控件的运行环境（ **APP** 还是编辑器 ）。

> 分享一个 [扩展函数](https://kotlinlang.org/docs/extensions.html#extension-functions) 来避免不断传递 `isInEditMode` 变量为参数：
>
> ```kotlin
> private var IS_IN_EDIT_MODE: Boolean? = null
>
> val Context.isInEditMode get() = IS_IN_EDIT_MODE ?: View(this).isInEditMode.also { IS_IN_EDIT_MODE = it }
> ```

在 `android.view.View` 类中它的定义是这样的：

```java
public boolean isInEditMode() {
    return false;
}
```

既然在预览时能返回 `true` ，那肯定是有地方对其进行了修改，于是定位到下面的代码：

```java
// android-23/com.android.tools.layoutlib.create.CreateInfo

public final static String[] DELEGATE_METHODS = new String[] {
    ...
    "android.view.View#isInEditMode",
    ...
 };
```

根据调用链一层一层定位到：

```java
// android-23/com.android.tools.layoutlib.create

Main.main()
    AsmGenerator.generate()
        transform()
            new DelegateClassAdapter()
```

大概意思就是利用 [ASM](https://asm.ow2.io) 重写相关的类和方法，然后打包字节码到一个 **jar** 包中，于是顺藤摸瓜找到了 [layoutlib.jar](https://www.zhihu.com/question/31811664) ：

```java
// ${ANDROID_SDK_ROOT}/platforms/android-xx/data/layoutlib.jar

@LayoutlibDelegate
public boolean isInEditMode() {
    return View_Delegate.isInEditMode(this);
}

public class View_Delegate {
    public View_Delegate() {
    }

    @LayoutlibDelegate
    static boolean isInEditMode(View thisView) {
        return true;
    }

    @LayoutlibDelegate
    static IBinder getWindowToken(View thisView) {
        Context baseContext = BridgeContext.getBaseContext(thisView.getContext());
        return baseContext instanceof BridgeContext ? ((BridgeContext)baseContext).getBinder() : null;
    }
}
```

可以推断出预览窗口利用 **layoutlib.jar** 代替了 **android.jar** 来构建渲染环境。

### 总结

---

经过前面的分析，编辑器预览的原理已经一目了然了：

**调用控件两个参数的构造方法进行初始化，然后加入到父视图中。**

因此，我们要做的适配工作也很简单：

- 在构造方法中利用 `isInEditMode` 和属性值填充一些用于预览的数据。
- 如果 **layoutlib** 做了额外的初始化配置（ 如上文的 `setAdapter()` ）影响到了控件的正常渲染，需要想办法去禁用。
- 利用 `isInEditMode` 过滤掉一些不必要的初始化操作以加速渲染。

按照上面的步骤就能轻松为我们自定义的控件提供比较完美的预览效果了（ 和实际运行效果基本保持一致 ）。

但是由于无法调试，遇到代码没有生效的问题还是会比较难受，需要不断黑盒测试定位问题，要有一定耐心。

---

#### 转载请注明出处： [https://github.com/anyesu/blog/issues/40](https://anyesu.github.io/blog/articles/40)
