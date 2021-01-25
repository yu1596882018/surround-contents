export const getCommonAncestorParent = (findNode, commonAncestorContainer) => {
  if (findNode.parentNode === commonAncestorContainer) {
    /*if (findNode.nodeType === 3) {
              return findNode.parentNode
            } else {
              return findNode
            }*/
    return findNode
  } else {
    return getCommonAncestorParent(findNode.parentNode, commonAncestorContainer)
  }
}

export const getCommonAncestorParentAndJudge = (findNode, commonAncestorContainer) => {
  if (commonAncestorContainer !== findNode) {
    return getCommonAncestorParent(findNode, commonAncestorContainer)
  } else {
    return findNode
  }
}

export const searchStartArriveEndMiddleNode = (startContainer, commonAncestorStartParent, commonAncestorEndParent) => {
  let currentNode = startContainer
  while (currentNode.nextSibling && currentNode.nextSibling !== commonAncestorEndParent) {
    currentNode = currentNode.nextSibling
    console.log('nextSibling', currentNode)
    findTextNode(currentNode)
  }
  if (startContainer !== commonAncestorStartParent) {
    searchStartArriveEndMiddleNode(startContainer.parentElement, commonAncestorStartParent, commonAncestorEndParent)
  }
}

export const searchEndArriveParentPreviousNode = (endContainer, commonAncestorEndParent) => {
  let currentNode = endContainer
  while (currentNode.previousSibling && currentNode.previousSibling !== commonAncestorEndParent) {
    console.log('previousSibling', currentNode.previousSibling)
    currentNode = currentNode.previousSibling
  }
  if (endContainer.parentElement !== commonAncestorEndParent) {
    searchEndArriveParentPreviousNode(endContainer.parentElement, commonAncestorEndParent)
  }
}

export const findTextNode = node => {
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

export const surroundContents = (rangeAt, newDomMethod) => {
  const { commonAncestorContainer, startContainer, startOffse, endContainer, endOffsett } = rangeAt
  console.log(rangeAt)

  const commonAncestorStartParent = getCommonAncestorParentAndJudge(startContainer, commonAncestorContainer)
  const commonAncestorEndParent = getCommonAncestorParentAndJudge(endContainer, commonAncestorContainer)

  if (startContainer !== endContainer) {
    searchStartArriveEndMiddleNode(startContainer, commonAncestorStartParent, commonAncestorEndParent)
    searchEndArriveParentPreviousNode(endContainer, commonAncestorEndParent)
  }
}
