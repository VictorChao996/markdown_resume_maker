import React, { useRef } from "react"
import ResumePreviewCard from "../components/resumePreviewCard"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

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
        <div className="page">
            <ResumePreviewCard
                resumeHTML={resumeHTML}
                cardRef={cardRef}
            />
            <button onClick={handleDownloadPDF}>Download</button>
            <button onClick={handleDownloadImage}>Download Image</button>
        </div>
    )
}

export default DownloadPage
