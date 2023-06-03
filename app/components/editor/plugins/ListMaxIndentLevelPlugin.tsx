// ** react
import { useEffect } from 'react'

// ** third party
import { $getListDepth, $isListItemNode, $isListNode } from '@lexical/list'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import {
  $getSelection,
  $isElementNode,
  $isRangeSelection,
  INDENT_CONTENT_COMMAND,
  COMMAND_PRIORITY_HIGH,
  RangeSelection,
  LexicalNode,
} from 'lexical'

type ListMaxIndentLevelPluginProps = {
  maxDepth: number
}

function getElementNodesInSelection(selection: RangeSelection | null) {
  if (!selection) return null

  const nodesInSelection = selection.getNodes()

  if (nodesInSelection.length === 0) {
    return new Set([
      selection.anchor.getNode().getParentOrThrow(),
      selection.focus.getNode().getParentOrThrow(),
    ])
  }

  return new Set(
    nodesInSelection.map((n: LexicalNode) =>
      $isElementNode(n) ? n : n.getParentOrThrow(),
    ),
  )
}

function isIndentPermitted(maxDepth: number) {
  const selection = $getSelection()

  if (!$isRangeSelection(selection)) {
    return false
  }

  const elementNodesInSelection: any = getElementNodesInSelection(selection)

  let totalDepth = 0

  for (const elementNode of elementNodesInSelection) {
    if ($isListNode(elementNode)) {
      totalDepth = Math.max($getListDepth(elementNode) + 1, totalDepth)
    } else if ($isListItemNode(elementNode)) {
      const parent = elementNode.getParent()
      if (!$isListNode(parent)) {
        throw new Error(
          'ListMaxIndentLevelPlugin: A ListItemNode must have a ListNode for a parent.',
        )
      }

      totalDepth = Math.max($getListDepth(parent) + 1, totalDepth)
    }
  }

  return totalDepth <= maxDepth
}

export default function ListMaxIndentLevelPlugin({
  maxDepth,
}: ListMaxIndentLevelPluginProps) {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    return editor.registerCommand(
      INDENT_CONTENT_COMMAND,
      () => !isIndentPermitted(maxDepth ?? 7),
      COMMAND_PRIORITY_HIGH,
    )
  }, [editor, maxDepth])

  return null
}
