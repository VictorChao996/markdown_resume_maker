import React, { useEffect, useRef } from "react"
import CodeMirror from "@uiw/react-codemirror"
import { markdown, markdownLanguage } from "@codemirror/lang-markdown"
import { sublime } from "@uiw/codemirror-theme-sublime"
// import { languages } from "@codemirror/language-data"

const code = `## Title

\`\`\`jsx
function Demo() {
  return <div>demo</div>
}
\`\`\`

\`\`\`bash
# Not dependent on uiw.
npm install @codemirror/lang-markdown --save
npm install @codemirror/language-data --save
\`\`\`

[weisit ulr](https://uiwjs.github.io/react-codemirror/)

\`\`\`go
package main
import "fmt"
func main() {
  fmt.Println("Hello, 世界")
}
\`\`\`
`

const TextEditor = ({ setMarkdown }) => {
    const handleTyping = (value) => {
        setMarkdown(value)
    }

    return (
        <CodeMirror
            value={code}
            // extensions={[
            //     markdown({ base: markdownLanguage, codeLanguages: languages })
            // ]}
            extensions={[markdown({ base: markdownLanguage })]}
            theme={sublime}
            onChange={handleTyping}
        />
    )
}

export default TextEditor
