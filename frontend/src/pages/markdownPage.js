import React, { useState, useEffect, useRef } from "react"
import showdown from "showdown"
import html2canvas from "html2canvas"
import "./MarkdownPage.scss"
import TextEditor from "../components/textEditor"
import ResumePreviewCard from "../components/resumePreviewCard"
import convertMarkdownToHtml from "../utils/markdownConverter"
import Draggable from "react-draggable"
import ResumePreviewScreenshot from "../components/resumePreviewScreeshot"

const MarkdownPage = ({ setResumeHTML, cardRef, template }) => {
    const [markdown, setMarkdown] = useState("")
    const [html, setHtml] = useState("")
    const [previewImageURL, setPreviewImageURL] = useState("")
    // const cardRef = useRef()

    useEffect(() => {
        // const converter = new showdown.Converter()
        // const convertedHtml = converter.makeHtml(markdown)
        const convertedHtml = convertMarkdownToHtml(markdown)
        // console.log(convertedHtml)
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
                <div className="previewArea">
                    <Draggable>
                        <div>
                            <ResumePreviewScreenshot
                                html={html}
                                cardRef={cardRef}
                                canResize={true}
                            />
                        </div>
                    </Draggable>
                    <div className="card">
                        <ResumePreviewCard
                            resumeHTML={html}
                            cardRef={cardRef}
                            template={template}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default MarkdownPage
