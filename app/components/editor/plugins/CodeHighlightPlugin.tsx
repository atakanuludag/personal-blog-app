// ** react
import { useEffect } from 'react'

// ** third party
import { registerCodeHighlighting } from '@lexical/code'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'

export default function CodeHighlightPlugin() {
  const [editor] = useLexicalComposerContext()
  useEffect(() => {
    return registerCodeHighlighting(editor)
  }, [editor])
  return null
}
