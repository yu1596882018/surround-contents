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
    } else {
      console.log('findTextNode', node)
    }
  }
}

// 原生surroundContents加强版
const surroundContents = (rangeAt, newDomMethod) => {
  const {commonAncestorContainer, startContainer, startOffset, endContainer, endOffset} = rangeAt
  console.log(rangeAt)

  const commonAncestorStartParent = getCommonAncestorParentAndJudge(startContainer, commonAncestorContainer)
  const commonAncestorEndParent = getCommonAncestorParentAndJudge(endContainer, commonAncestorContainer)

  if (startContainer !== endContainer) {
    console.log('findTextNode-text', startContainer.nodeValue.slice(startOffset))
    searchStartArriveEndMiddleNode(startContainer, commonAncestorStartParent, commonAncestorEndParent)
    if (commonAncestorEndParent !== endContainer) {
      searchEndArriveParentPreviousNode(endContainer, commonAncestorEndParent)
    }
    console.log('findTextNode-text', endContainer.nodeValue.slice(0, endOffset))
  } else {
    console.log('findTextNode-text', commonAncestorContainer.nodeValue.slice(startOffset, endOffset))
  }
}

export default surroundContents
