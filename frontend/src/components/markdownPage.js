import React, { useState, useEffect } from "react"
import showdown from "showdown"
import "./MarkdownPage.scss"

const MarkdownPage = () => {
    const [markdown, setMarkdown] = useState("")
    const [html, setHtml] = useState("")
    // const [textareaHeight, setTextareaHeight] = useState("100%")

    useEffect(() => {
        const converter = new showdown.Converter()
        const convertedHtml = converter.makeHtml(markdown)
        setHtml(convertedHtml)
    }, [markdown])

    const handleMarkdownChange = (e) => {
        const { value } = e.target
        setMarkdown(value)
        // convertToHtml(value)

        // console.log(value)
    }

    return (
        <div className="markdownPage">
            <textarea
                value={markdown}
                onInput={handleMarkdownChange}
                placeholder="Enter your content here...."
                // style={{ height: textareaHeight }}
            />
            <div
                dangerouslySetInnerHTML={{ __html: html }}
                className="previewArea"
            />
        </div>
    )
}

export default MarkdownPage
