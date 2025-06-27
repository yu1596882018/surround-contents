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

| 参数名         | 类型      | 描述                                                         |
| -------------- | --------- | ------------------------------------------------------------ |
| rangeAt        | `Range`   | 必填。需要处理的 Range 对象。默认值：`null`                  |
| newDomMethod   | `Function`| 选填。创建新节点的函数。默认值见下方代码块。每次需新建节点，不能复用。 |

默认值示例：
```js
() => document.createElement('span')
```

### 安装
```bash
npm install surround-contents
# 或
yarn add surround-contents
```

### 贡献
欢迎提 issue 或 PR！

### License
MIT

### 变更日志
详见 [CHANGELOG.md](./CHANGELOG.md)
