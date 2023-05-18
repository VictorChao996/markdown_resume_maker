import React, { useState, useEffect } from "react"
import showdown from "showdown"
import "./MarkdownPage.scss"
import TextEditor from "../components/textEditor"
import API from "../utils/API"
import axios from "axios"

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

    // const getResumeContent = async () => {
    //     const response = await axios.get(
    //         `${API.resumeGetAPI}?resumeId=${resumeId}`,
    //         {
    //             headers: {
    //                 Authorization: `Bearer ${localStorage.getItem(
    //                     "accessToken"
    //                 )}`
    //             }
    //         }
    //     )
    // }

    return (
        <div className="markdownPage">
            <div className="code-editor-container">
                <TextEditor
                    markdownContent={markdown}
                    setMarkdown={setMarkdown}
                />
            </div>
            <div
                dangerouslySetInnerHTML={{ __html: html }}
                className="previewArea"
            />
        </div>
    )
}

export default MarkdownPage
