import React, { useState, useEffect } from "react"
import Draggable from "react-draggable"
import html2canvas from "html2canvas"

const whitePaperImageURL =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZyGaBkIOOfxrpqcs3XM14tZDSQtsbo3tfnh_VjbVBiRA7_rthaMZuGOCRfC-uQR7yQmo&usqp=CAU"

const ResumePreviewScreenshot = ({ html, cardRef, canResize }) => {
    const [previewImageURL, setPreviewImageURL] = useState(whitePaperImageURL)
    const [size, setSize] = useState(350)

    useEffect(() => {
        if (html) {
            handlePreviewImage()
        }
    }, [html])

    useEffect(() => {
        if (canResize) {
            // const cardElement = cardRef.current
            const previewImage = document.getElementById("previewImage")
            previewImage.addEventListener("wheel", handleScroll)
            // window.addEventListener("wheel", handleScroll)
            return () => previewImage.removeEventListener("wheel", handleScroll)
        }
    }, [cardRef])

    // * Handle scroll to zoom in/out
    const handleScroll = (event) => {
        if (event.deltaY < 0) {
            setSize((prevSize) => Math.min(prevSize + 10, 700)) // Increase size, max A4 width in pixels
        } else {
            setSize((prevSize) => Math.max(prevSize - 10, 300)) // Decrease size, min 100px
        }
    }

    const handlePreviewImage = () => {
        if (cardRef.current) {
            html2canvas(cardRef.current, { scale: 5 }).then((canvas) => {
                const imgData = canvas.toDataURL("image/png")
                setPreviewImageURL(imgData) //
            })
        }
    }

    return (
        // <Draggable>
        <div
            style={{
                // width: "600px",
                // height: "848px",
                width: `${size}px`,
                height: `${size * 1.414}px`,
                // width: "400px",
                // height: "565.6px",
                position: "relative",
                // position: "fixed",
                // border: "1px solid black"
                boxShadow: "0px 0px 10px rgba(0,0,0,0.1)"
            }}
        >
            <img
                id="previewImage"
                src={previewImageURL}
                alt="Markdown Preview"
                style={{
                    width: "100%",
                    height: "100%",
                    cursor: "pointer"
                }}
                onDragStart={(e) => e.preventDefault()} // Disable default action when dragging img
            />
        </div>
        // </Draggable>
    )
}

export default ResumePreviewScreenshot
