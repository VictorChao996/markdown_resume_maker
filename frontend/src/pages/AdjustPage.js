import React, { useEffect, useState, useRef } from "react"
import "./AdjustPage.scss"
import ResumePreviewCard from "../components/resumePreviewCard"
import ResumePreviewScreenshot from "../components/resumePreviewScreeshot"

const AdjustPage = ({ resumeHTML }) => {
    const cardRef = useRef() // Add a reference to the card

    return (
        <div className="adjustPage">
            <div className="card">
                <ResumePreviewCard
                    resumeHTML={resumeHTML}
                    cardRef={cardRef}
                />
            </div>
            <ResumePreviewScreenshot
                html={resumeHTML}
                cardRef={cardRef}
                canResize={true}
            />
            {/* <Draggable>
                <div
                    ref={cardRef}
                    className="card"
                    style={{
                        width: `${size}px`,
                        height: `${size * 1.414}px`,
                        fontSize: `${fontSize}em`
                    }}
                >
                    <div dangerouslySetInnerHTML={{ __html: resumeHTML }} />
                </div>
            </Draggable> */}
            {/* <button onClick={handleDownloadPDF}>Download PDF</button>
            <button onClick={handleDownloadImage}>Download Image</button> */}
        </div>
    )
}

export default AdjustPage
