import React, { useEffect, useState, useRef } from "react"
import Draggable from "react-draggable"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import "./AdjustPage.scss"

const AdjustPage = () => {
    const [size, setSize] = useState(200) // Initial size in pixels
    const [fontSize, setFontSize] = useState(1) // Initial font size in em units
    const cardRef = useRef() // Add a reference to the card

    const handleScroll = (event) => {
        if (event.deltaY < 0) {
            setSize((prevSize) => Math.min(prevSize + 10, 794)) // Increase size, max A4 width in pixels
            setFontSize((prevFontSize) => Math.min(prevFontSize + 0.05, 3.97)) // Increase font size, max for A4 width in em units
        } else {
            setSize((prevSize) => Math.max(prevSize - 10, 100)) // Decrease size, min 100px
            setFontSize((prevFontSize) => Math.max(prevFontSize - 0.05, 0.5)) // Decrease font size, min in em units
        }
    }

    useEffect(() => {
        window.addEventListener("wheel", handleScroll)
        return () => window.removeEventListener("wheel", handleScroll)
    }, [])

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
            <Draggable>
                <div
                    ref={cardRef}
                    className="card"
                    style={{
                        width: `${size}px`,
                        height: `${size * 1.414}px`,
                        fontSize: `${fontSize}em`
                    }}
                >
                    <h1>Adjust Page</h1>
                </div>
            </Draggable>
            <button onClick={handleDownloadPDF}>Download PDF</button>
            <button onClick={handleDownloadImage}>Download Image</button>
        </div>
    )
}

export default AdjustPage
