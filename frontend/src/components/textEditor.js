import React, { useEffect, useRef } from "react"
import CodeMirror from "@uiw/react-codemirror"
import { markdown, markdownLanguage } from "@codemirror/lang-markdown"
import { sublime } from "@uiw/codemirror-theme-sublime"
// import { languages } from "@codemirror/language-data"

const TextEditor = ({ markdownContent, setMarkdown }) => {
    useEffect(() => {
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
            // minWidth="2000px"
            width="1600px"
            style={{ fontSize: "16px" }}
        />
    )
}

export default TextEditor
