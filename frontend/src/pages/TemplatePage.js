import React from "react"
import { Skeleton, Row, Col } from "antd"
import "./TemplatePage.scss"
import template1_screenshot from "../images/template1_screenshot.png"

const TemplatePage = ({ setTemplate }) => {
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
                }}
            >
                <img
                    src={template1_screenshot}
                    alt="template1_screenshot"
                />
            </div>
            <div
                className="imgDiv"
                onClick={() => {
                    setTemplate(2)
                }}
            >
                <img
                    src={template1_screenshot}
                    alt="template1_screenshot"
                />
            </div>
            <div
                className="imgDiv"
                onClick={() => {
                    setTemplate(3)
                }}
            >
                <img
                    src={template1_screenshot}
                    alt="template1_screenshot"
                />
            </div>
            <Skeleton.Image
                // active
                size={"large"}
                style={{ height: "297px", width: "210px" }}
            />
            <Skeleton.Image
                // active
                size={"large"}
                style={{ height: "297px", width: "210px" }}
            />
            <Skeleton.Image
                // active
                size={"large"}
                style={{ height: "297px", width: "210px" }}
            />
            {/* {skeletonList} */}
            {/* <Row>
                <Col
                    span={8}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        margin: "20px 0px",
                        cursor: "pointer"
                    }}
                >
                    <div
                        className="imgDiv"
                        onClick={() => {
                            setTemplate(1)
                        }}
                    >
                        <img
                            src={template1_screenshot}
                            alt="template1_screenshot"
                        />
                    </div>
                </Col>
                <Col
                    span={8}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        margin: "20px 0px",
                        cursor: "pointer"
                    }}
                >
                    <div
                        className="imgDiv"
                        onClick={() => {
                            setTemplate(2)
                        }}
                    >
                        <img
                            src={template1_screenshot}
                            alt="template1_screenshot"
                        />
                    </div>
                </Col>
                {skeletonList}
            </Row> */}
        </div>
    )
}

export default TemplatePage
