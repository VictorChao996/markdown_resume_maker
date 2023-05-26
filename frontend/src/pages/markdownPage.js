import React, { useState, useEffect, useRef } from "react"
import showdown from "showdown"
import html2canvas from "html2canvas"
import "./MarkdownPage.scss"
import TextEditor from "../components/textEditor"
import ResumePreviewCard from "../components/resumePreviewCard"
import convertMarkdownToHtml from "../utils/markdownConverter"
import Draggable from "react-draggable"
import ResumePreviewScreenshot from "../components/resumePreviewScreeshot"

const MarkdownPage = ({ setResumeHTML, cardRef }) => {
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
                {/* <div
                    dangerouslySetInnerHTML={{ __html: html }}
                    className="previewArea"
                /> */}
                <div className="previewArea">
                    {/* <Draggable>
                        <div
                            style={{
                                // width: "600px",
                                // height: "848px",
                                width: "400px",
                                height: "565.6px",
                                position: "absolute",
                                border: "1px solid black"
                            }}
                        >
                            <img
                                src={previewImageURL}
                                alt="Markdown Preview"
                                style={{
                                    width: "100%",
                                    height: "100%"
                                }}
                            />
                        </div>
                    </Draggable> */}
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
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default MarkdownPage
