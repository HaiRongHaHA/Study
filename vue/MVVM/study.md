> ## createDocumentFragment

**因为文档片段存在于内存中，并不在 DOM 树中，所以将子元素插入到文档片段时不会引起页面回流（对元素位置和几何上的计算）。因此，使用文档片段通常会带来更好的性能**

> ## nodeType

```
nodetype === 1 元素节点
nodetype === 3 文本节点
```

> ### appendChild

```
如果某个节点已经拥有父节点，在被传递给此方法后，它首先会被移除，再被插入到新的位置。若要保留已在文档中的节点，可以先使用 Node.cloneNode() 方法来为它创建一个副本，再将副本附加到目标父节点下。
```

> ## VUE 组件通信

```
- 父传子    props  emit
- $parent   $children
- $attrs    $listeners
- ref 获取真实dom元素，如果放到组件上代表的是当前组件的实例
- eventbus  创建全局发布订阅（不推荐，乱）
- provide   inject (可以在父组件中声明一个公共数据，在子组件中可以注入原理，比较混乱，名称问题，不会在业务代码中使用，多级通信可以使用provide)

```
