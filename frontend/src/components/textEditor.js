import React, { useEffect, useRef } from "react"
import CodeMirror from "@uiw/react-codemirror"
import { markdown, markdownLanguage } from "@codemirror/lang-markdown"
import { sublime } from "@uiw/codemirror-theme-sublime"
// import { languages } from "@codemirror/language-data"

// const markdownContent = `## Title

// ### Subtitle
// - item 1
// - item 2
// - item 3
// - item 4

// ### Subtitle
// 1. item 1
// 2. item 2
// 3. item 3
// 4. item 4
// ### Subtitle
// - item 1
// - item 2
// - item 3
// - item 4

// ### Subtitle
// 1. item 1
// 2. item 2
// 3. item 3
// 4. item 4
// ### Subtitle
// - item 1
// - item 2
// - item 3
// - item 4

// ### Subtitle
// 1. item 1
// 2. item 2
// 3. item 3
// 4. item 4
// `

const TextEditor = ({ markdownContent, setMarkdown }) => {
    useEffect(() => {
        console.log(localStorage.getItem("markdownContent"))
        if (localStorage.getItem("markdownContent") !== null) {
            setMarkdown(localStorage.getItem("markdownContent"))
            return
        }
        // setMarkdown(markdownContent)
    }, [localStorage.getItem("markdownContent")])

    const handleTyping = (value) => {
        setMarkdown(value)
        localStorage.setItem("markdownContent", value)
    }

    return (
        <CodeMirror
            value={markdownContent}
            // extensions={[
            //     markdown({ base: markdownLanguage, codeLanguages: languages })
            // ]}
            extensions={[markdown({ base: markdownLanguage })]}
            theme={sublime}
            onChange={handleTyping}
            minHeight="800px"
            style={{ fontSize: "16px" }}
        />
    )
}

export default TextEditor
