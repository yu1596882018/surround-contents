export const config = {
  textNodes: [],
  newDomMethod() {
    return document.createElement('span')
  },
}

export const replaceNewDom = (node, startOffset, endOffset) => {
  const tempRange = document.createRange()
  tempRange.setStart(node, startOffset || 0)
  tempRange.setEnd(node, endOffset || node.nodeValue.length)
  tempRange.surroundContents(config.newDomMethod())
}

// 获取共同父级节点以下的顶级子节点
export const getCommonAncestorParent = (findNode, commonAncestorContainer) => {
  if (findNode.parentNode === commonAncestorContainer) {
    return findNode
  } else {
    return getCommonAncestorParent(findNode.parentNode, commonAncestorContainer)
  }
}

// 递归获取共同父级节点以下的顶级子节点
export const getCommonAncestorParentAndJudge = (findNode, commonAncestorContainer) => {
  if (commonAncestorContainer !== findNode) {
    return getCommonAncestorParent(findNode, commonAncestorContainer)
  } else {
    return findNode
  }
}

// 获取开始到结束的中间节点
export const searchStartArriveEndMiddleNode = (startContainer, commonAncestorStartParent, commonAncestorEndParent) => {
  let currentNode = startContainer
  while (currentNode.nextSibling && currentNode.nextSibling !== commonAncestorEndParent) {
    currentNode = currentNode.nextSibling
    findTextNode(currentNode)
  }
  if (startContainer !== commonAncestorStartParent) {
    searchStartArriveEndMiddleNode(startContainer.parentElement, commonAncestorStartParent, commonAncestorEndParent)
  }
}

// 获取结束节点到顶级子节点的前面所有节点
export const searchEndArriveParentPreviousNode = (endContainer, commonAncestorEndParent) => {
  let currentNode = endContainer
  while (currentNode.previousSibling) {
    currentNode = currentNode.previousSibling
    findTextNode(currentNode)
  }
  if (endContainer.parentElement !== commonAncestorEndParent) {
    searchEndArriveParentPreviousNode(endContainer.parentElement, commonAncestorEndParent)
  }
}

// 查找元素下面的所有text元素
export const findTextNode = (node) => {
  if (node.nodeType === 1) {
    for (let i = 0; i < node.childNodes.length; i++) {
      findTextNode(node.childNodes[i])
    }
  } else {
    if (node.nodeType === 3) {
      console.log('findTextNode-text', node)
      // replaceNewDom(node)
      config.textNodes.push(node)
    } else {
      // console.log('findTextNode', node)
    }
  }
}

/**
 * 原生surroundContents加强版
 * @param rangeAt {Range} 需要处理的 Range 对象
 * @param newDomMethod {Function} 创建新节点的函数，由于有跨边界的情况，每次需要创建新的节点，不能复用同一个节点
 */
const surroundContents = (rangeAt, newDomMethod) => {
  newDomMethod && (config.newDomMethod = newDomMethod)
  const {commonAncestorContainer, startContainer, startOffset, endContainer, endOffset} = rangeAt
  // console.log(rangeAt)

  const commonAncestorStartParent = getCommonAncestorParentAndJudge(startContainer, commonAncestorContainer)
  const commonAncestorEndParent = getCommonAncestorParentAndJudge(endContainer, commonAncestorContainer)

  if (startContainer !== endContainer) {
    // console.log('findTextNode-text', startContainer.nodeValue.slice(startOffset))
    // console.log('findTextNode-text', endContainer.nodeValue.slice(0, endOffset))
    searchStartArriveEndMiddleNode(startContainer, commonAncestorStartParent, commonAncestorEndParent)
    if (commonAncestorEndParent !== endContainer) {
      searchEndArriveParentPreviousNode(endContainer, commonAncestorEndParent)
    }

    replaceNewDom(startContainer, startOffset)
    config.textNodes.forEach((textNode) => {
      replaceNewDom(textNode)
    })
    config.textNodes = []
    replaceNewDom(endContainer, null, endOffset)
  } else {
    // console.log('findTextNode-text', commonAncestorContainer.nodeValue.slice(startOffset, endOffset))
    replaceNewDom(startContainer, startOffset, endOffset)
  }
  window.getSelection().removeAllRanges()
}

export default surroundContents
