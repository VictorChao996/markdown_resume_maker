import React, { useState, useEffect, useRef } from "react"
import showdown from "showdown"
import "./MarkdownPage.scss"
import TextEditor from "../components/textEditor"
import ResumePreviewCard from "../components/resumePreviewCard"
import convertMarkdownToHtml from "../utils/markdownConverter"

const MarkdownPage = ({ setResumeHTML }) => {
    const [markdown, setMarkdown] = useState("")
    const [html, setHtml] = useState("")
    const cardRef = useRef()

    useEffect(() => {
        // const converter = new showdown.Converter()
        // const convertedHtml = converter.makeHtml(markdown)
        const convertedHtml = convertMarkdownToHtml(markdown)
        console.log(convertedHtml)
        setHtml(convertedHtml)
        setResumeHTML(convertedHtml)
    }, [markdown])

    return (
        <>
            <div className="markdownPage">
                <div className="code-editor-container">
                    <TextEditor
                        markdownContent={markdown}
                        setMarkdown={setMarkdown}
                    />
                </div>
                {/* <div
                    dangerouslySetInnerHTML={{ __html: html }}
                    className="previewArea"
                /> */}
                <div className="previewArea">
                    <ResumePreviewCard
                        resumeHTML={html}
                        cardRef={cardRef}
                    />
                </div>
            </div>
        </>
    )
}

export default MarkdownPage
