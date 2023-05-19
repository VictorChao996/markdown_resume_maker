import React from "react"
import { PDFDownloadLink, Document, Page } from "@react-pdf/renderer"
import htmlToPdfMake from "html-to-pdfmake"
import pdfMake from "pdfmake/build/pdfmake"
import pdfFonts from "pdfmake/build/vfs_fonts"

pdfMake.vfs = pdfFonts.pdfMake.vfs

const PdfPage = ({ resumeHTML }) => {
    const handleGeneratePDF = () => {
        console.log("resumeHTML on PDFpage", resumeHTML)
        // const htmlContent = "<h1>Hello, World!</h1>" // Replace with your dynamic HTML content
        const htmlContent = resumeHTML // Replace with your dynamic HTML content
        const pdfMakeData = htmlToPdfMake(htmlContent)
        console.log(pdfMakeData)
        var pdfData = pdfMakeData

        const docDefinition = {
            content: pdfMakeData
            // content: [
            //     {
            //         text: pdfMakeData,
            //         style: "htmlContent"
            //     }
            // ]
            // styles: {`
            //     header: {
            //         fontSize: 16,
            //         bold: true,
            //         marginBottom: 10
            //     },
            //     htmlContent: {
            //         margin: [0, 10, 0, 0]
            //     }
            // }
        }

        const pdfDocGenerator = pdfMake.createPdf(docDefinition)
        pdfDocGenerator.download("example.pdf")
        // pdfDocGenerator.open("example.pdf")
    }

    return (
        <div>
            <button onClick={handleGeneratePDF}>Generate PDF</button>
        </div>
    )
}

export default PdfPage
