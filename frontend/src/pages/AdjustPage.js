import React, { useEffect, useState, useRef } from "react"
import "./AdjustPage.scss"
import ResumePreviewCard from "../components/resumePreviewCard"

const AdjustPage = ({ resumeHTML }) => {
    const cardRef = useRef() // Add a reference to the card

    return (
        <div className="page">
            <ResumePreviewCard
                resumeHTML={resumeHTML}
                cardRef={cardRef}
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
