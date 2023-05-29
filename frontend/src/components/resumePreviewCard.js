import React, { useRef, useState, useEffect } from "react"
import Draggable from "react-draggable"
// import "./resumePreviewCard.scss"
import "./template/template1.scss"
import "./template/template2.scss"
import "./template/template3.scss"

const ResumePreviewCard = ({ resumeHTML, cardRef, template }) => {
    //! This is the old code for zooming in/out，先不要使用
    // const [size, setSize] = useState(400) // Initial size in pixels
    // const [fontSize, setFontSize] = useState(1) // Initial font size in em units
    // const [paddingSize, setPaddingSize] = useState(5)

    // useEffect(() => {
    //     const cardElement = cardRef.current
    //     cardElement.addEventListener("wheel", handleScroll)
    //     return () => cardElement.removeEventListener("wheel", handleScroll)
    // }, [cardRef])

    // // * Handle scroll to zoom in/out
    // const handleScroll = (event) => {
    //     if (event.deltaY < 0) {
    //         setSize((prevSize) => Math.min(prevSize + 10, 794)) // Increase size, max A4 width in pixels
    //     } else {
    //         setSize((prevSize) => Math.max(prevSize - 10, 300)) // Decrease size, min 100px
    //     }
    // }

    // // Update font size whenever the size changes
    // useEffect(() => {
    //     setFontSize(size / 400) // Base font size on the new width, assuming base font size of 1 at 400px width
    //     setPaddingSize(size * 0.05) // Set padding size as 5% of the current card size
    // }, [size])
    let className = ""
    switch (template) {
        case 1:
            className = "template1"
            break
        case 2:
            className = "template2"
            break
        case 3:
            className = "template3"
            break
        default:
            className = "template1"
    }

    return (
        <Draggable>
            <div
                ref={cardRef}
                className={`${className}`}
                style={{
                    // width: `${size}px`,
                    // height: `${size * 1.414}px`,
                    // fontSize: `${fontSize}em`,
                    // padding: `${paddingSize}px`
                    width: `600px`,
                    height: `${600 * 1.414}px`
                }}
            >
                <div dangerouslySetInnerHTML={{ __html: resumeHTML }} />
            </div>
        </Draggable>
    )
}

export default ResumePreviewCard
