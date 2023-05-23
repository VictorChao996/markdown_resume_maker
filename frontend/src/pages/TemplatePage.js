import React from "react"
import { Skeleton, Row, Col } from "antd"
import "./TemplatePage.scss"
import template1_screenshot from "../images/template1_screenshot.png"

const TemplatePage = () => {
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
                active
                size={"large"}
                style={{ height: "297px", width: "210px" }}
            />
        </Col>
    ))
    return (
        <div className="templatePage">
            <Row>
                <Col
                    span={8}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        margin: "20px 0px",
                        cursor: "pointer"
                    }}
                >
                    <img
                        src={template1_screenshot}
                        alt="hello"
                        width={"210px"}
                        height={"297px"}
                        // cursor={"pointer"}
                    />
                </Col>
                {skeletonList}
            </Row>
        </div>
    )
}

export default TemplatePage
