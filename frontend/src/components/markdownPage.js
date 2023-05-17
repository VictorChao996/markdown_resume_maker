import React, { useState, useEffect } from "react"
import showdown from "showdown"
import "./MarkdownPage.scss"
import TextEditor from "./textEditor"

const MarkdownPage = ({ setResumeHTML }) => {
    const [markdown, setMarkdown] = useState("")
    const [html, setHtml] = useState("")

    useEffect(() => {
        const converter = new showdown.Converter()
        const convertedHtml = converter.makeHtml(markdown)
        console.log(convertedHtml)
        setHtml(convertedHtml)
        setResumeHTML(convertedHtml)
    }, [markdown])

    return (
        <div className="markdownPage">
            <div className="code-editor-container">
                <TextEditor setMarkdown={setMarkdown} />
            </div>
            <div
                dangerouslySetInnerHTML={{ __html: html }}
                className="previewArea"
            />
        </div>
    )
}

export default MarkdownPage
