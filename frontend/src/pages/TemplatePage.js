import React from "react"
import { Skeleton, Row, Col, Button } from "antd"
import "./TemplatePage.scss"
import template1_screenshot from "../images/template1_screenshot.png"
import template2_screenshot from "../images/template2_screenshot.png"
import template3_screenshot from "../images/template3_screenshot.png"

const TemplatePage = ({ setTemplate, setCurrentStep, tourRefs }) => {
    const skeletonList = Array.from({ length: 10 }).map((_, index) => (
        <Col
            key={index}
            span={8}
            style={{
                display: "flex",
                justifyContent: "center",
                margin: "20px 0px"
            }}
        >
            <Skeleton.Image
                // active
                size={"large"}
                style={{ height: "297px", width: "210px" }}
            />
        </Col>
    ))
    return (
        <div className="templatePage">
            <div
                className="imgDiv"
                onClick={() => {
                    setTemplate(1)
                    setCurrentStep(1)
                }}
                ref={tourRefs[1]}
            >
                <img
                    src={template1_screenshot}
                    alt="template1_screenshot"
                />
                <Button
                    type="primary"
                    className="viewButton"
                    style={{
                        minWidth: "40%",
                        minHeight: "10%"
                    }}
                >
                    Use this template
                </Button>
            </div>
            <div
                className="imgDiv"
                onClick={() => {
                    setTemplate(2)
                    setCurrentStep(1)
                }}
            >
                <img
                    src={template2_screenshot}
                    alt="template2_screenshot"
                />
                <Button
                    type="primary"
                    className="viewButton"
                    style={{
                        minWidth: "40%",
                        minHeight: "10%"
                    }}
                >
                    Use this template
                </Button>
            </div>
            <div
                className="imgDiv"
                onClick={() => {
                    setTemplate(3)
                    setCurrentStep(1)
                }}
            >
                <img
                    src={template3_screenshot}
                    alt="template3_screenshot"
                />
                <Button
                    type="primary"
                    className="viewButton"
                    style={{
                        minWidth: "40%",
                        minHeight: "10%"
                    }}
                >
                    Use this template
                </Button>
            </div>
        </div>
    )
}

export default TemplatePage
