## Range.surroundContents()的加强版

### 用来解决原生surroundContents，无法跨边界用新节点包裹指定Range的问题。

### 用法：

``` js
import surroundContents from 'surround-contents'

surroundContents(getSelection().getRangeAt(0), () => {
    const span = document.createElement('span')
    span.style.background = 'red'
    return span
})
```
### 参数
| 参数名 | 是否必填 | 类型 | 默认值 | 描述 |
| :-----| ----: | :----: | :----:  | :----: |
| rangeAt | `true` | `Range` | `null` | 需要处理的 Range 对象 |
| newDomMethod | `false` | `Function` | `() => document.createElement('span')` | 创建新节点的函数，由于有跨边界的情况，每次需要创建新的节点，不能复用同一个节点 |
