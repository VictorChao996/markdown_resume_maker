import React, { useRef } from "react"
import ResumePreviewCard from "../components/resumePreviewCard"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import "./DownloadPage.scss"
import ResumePreviewScreenshot from "../components/resumePreviewScreeshot"
import { DownloadOutlined } from "@ant-design/icons"
import { Button } from "antd"

const DownloadPage = ({ resumeHTML }) => {
    const cardRef = useRef()

    //* 將卡片轉成 image 並放進 pdf 中下載
    const handleDownloadPDF = () => {
        html2canvas(cardRef.current, { scale: 5 }).then((canvas) => {
            const imgData = canvas.toDataURL("image/png")
            const pdf = new jsPDF("p", "mm", "a4")
            const pdfWidth = pdf.internal.pageSize.getWidth()
            const pdfHeight = pdf.internal.pageSize.getHeight()
            const imgWidthPx = canvas.width
            const imgHeightPx = canvas.height
            // Convert pixels to mm for jspdf
            const imgWidth = imgWidthPx * 0.2645833333
            const imgHeight = imgHeightPx * 0.2645833333
            let x, y, width, height
            if (imgWidth / imgHeight >= pdfWidth / pdfHeight) {
                width = pdfWidth
                height = (imgHeight * pdfWidth) / imgWidth
                x = 0
                y = (pdfHeight - height) / 2
            } else {
                height = pdfHeight
                width = (imgWidth * pdfHeight) / imgHeight
                y = 0
                x = (pdfWidth - width) / 2
            }
            pdf.addImage(imgData, "PNG", x, y, width, height)
            pdf.save("card.pdf")
        })
    }

    const handelMarkdownDownload = () => {
        if (localStorage.getItem("markdownContent")) {
            const markdownContent = localStorage.getItem("markdownContent")
            // Create a new Blob object with the data
            const blob = new Blob([markdownContent], {
                type: "text/markdown;charset=utf-8"
            })

            // Create a temporary link element
            const link = document.createElement("a")
            link.href = URL.createObjectURL(blob)
            link.download = "filename.md"
            if (localStorage.getItem("resumeTitle")) {
                link.download = localStorage.getItem("resumeTitle") + ".md"
            }

            // Append the link to the document body
            document.body.appendChild(link)

            // Programmatically click the link to start the download
            link.click()

            // Clean up the temporary link
            document.body.removeChild(link)
        }
    }

    const handleDownloadImage = () => {
        html2canvas(cardRef.current).then((canvas) => {
            const imgData = canvas.toDataURL("image/png")
            const link = document.createElement("a")
            link.href = imgData
            link.download = "screenshot.png"
            link.click()
        })
    }

    return (
        <div className="downloadPage">
            <div className="card">
                <ResumePreviewCard
                    resumeHTML={resumeHTML}
                    cardRef={cardRef}
                />
            </div>

            <div className="downloadArea">
                <Button
                    type="primary"
                    onClick={handleDownloadPDF}
                    icon={<DownloadOutlined />}
                    size="large"
                    shape="round"
                >
                    Download PDF
                </Button>
                <Button
                    type="primary"
                    onClick={handelMarkdownDownload}
                    icon={<DownloadOutlined />}
                    size="large"
                    shape="round"
                >
                    Download Markdown
                </Button>
            </div>

            <ResumePreviewScreenshot
                html={resumeHTML}
                cardRef={cardRef}
                canResize={false}
            />
            {/* <button onClick={handleDownloadPDF}>Download</button> */}

            {/* <button onClick={handleDownloadImage}>Download Image</button> */}
        </div>
    )
}

export default DownloadPage
