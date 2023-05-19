import React, { useState, useEffect } from "react"
import showdown from "showdown"
import "./MarkdownPage.scss"
import TextEditor from "../components/textEditor"
import { Input, Button } from "antd"
import { SaveOutlined } from "@ant-design/icons"
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
        <>
            {/* <div className="editorBar">
                <Input
                    placeholder="Title"
                    className="input"
                />
                <Button icon={<SaveOutlined />}></Button>
            </div> */}
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
        </>
    )
}

export default MarkdownPage
