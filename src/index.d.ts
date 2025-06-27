export interface SurroundContentsConfig {
  textNodes: Node[]
  newDomMethod: () => HTMLElement
}

export declare const config: SurroundContentsConfig
export declare function replaceNewDom(
  node: Node,
  startOffset?: number,
  endOffset?: number
): void
export declare function getCommonAncestorParent(
  findNode: Node,
  commonAncestorContainer: Node
): Node
export declare function getCommonAncestorParentAndJudge(
  findNode: Node,
  commonAncestorContainer: Node
): Node
export declare function searchStartArriveEndMiddleNode(
  startContainer: Node,
  commonAncestorStartParent: Node,
  commonAncestorEndParent: Node
): void
export declare function searchEndArriveParentPreviousNode(
  endContainer: Node,
  commonAncestorEndParent: Node
): void
export declare function findTextNode(node: Node): void

/**
 * 原生surroundContents加强版
 * @param rangeAt 需要处理的 Range 对象
 * @param newDomMethod 创建新节点的函数
 */
declare function surroundContents(
  rangeAt: Range,
  newDomMethod?: () => HTMLElement
): void
export default surroundContents
