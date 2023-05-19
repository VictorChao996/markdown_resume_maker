import React from "react"
import { Skeleton, Row, Col } from "antd"

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
        <>
            <Row>{skeletonList}</Row>
        </>
    )
}

export default TemplatePage
