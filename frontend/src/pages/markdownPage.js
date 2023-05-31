import React, { useState, useEffect, useRef } from "react"
// import showdown from "showdown"
// import html2canvas from "html2canvas"
import "./MarkdownPage.scss"
import TextEditor from "../components/textEditor"
import ResumePreviewCard from "../components/resumePreviewCard"
import convertMarkdownToHtml from "../utils/markdownConverter"
import Draggable from "react-draggable"
import ResumePreviewScreenshot from "../components/resumePreviewScreeshot"
import { FloatButton } from "antd"
import markdownContentExample from "../utils/example.js"

const MarkdownPage = ({ setResumeHTML, cardRef, template, tourRefs }) => {
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

    /**
     * Show example content in the text editor (Floating Button function)
     */
    const showExampleContent = () => {
        setMarkdown(markdownContentExample)
        localStorage.setItem("markdownContent", markdownContentExample)
    }

    return (
        <>
            <FloatButton
                type="primary"
                tooltip="Show Example Content"
                onClick={() => {
                    showExampleContent()
                }}
                ref={tourRefs[7]}
            ></FloatButton>
            <div className="markdownPage">
                <div
                    className="code-editor-container"
                    ref={tourRefs[3]}
                >
                    <TextEditor
                        markdownContent={markdown}
                        setMarkdown={setMarkdown}
                    />
                </div>
                <div className="previewArea">
                    <Draggable>
                        <div ref={tourRefs[4]}>
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
