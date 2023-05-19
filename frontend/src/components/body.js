import { useState } from "react"
import { Form, Modal, Steps, Layout, Menu, theme, Button, Input } from "antd"
import {
    FormOutlined,
    ControlOutlined,
    DownloadOutlined,
    FileMarkdownOutlined
} from "@ant-design/icons"
import MarkdownPage from "../pages/markdownPage"
import PdfPage from "../pages/pdfPage"
import TemplatePage from "../pages/TemplatePage"
import AdjustPage from "../pages/AdjustPage"
import "./body.scss"

const Body = () => {
    const [currentStep, setCurrentStep] = useState(0)
    const [resumeHTML, setResumeHTML] = useState("")
    const {
        token: { colorBgContainer }
    } = theme.useToken()

    const handleStepClick = (stepIndex) => {
        console.log("Step clicked:", stepIndex)
        setCurrentStep(stepIndex)
    }

    const renderComponent = () => {
        switch (currentStep) {
            case 0:
                return <MarkdownPage setResumeHTML={setResumeHTML} />
            case 1:
                return <TemplatePage />
            case 2:
                return <AdjustPage />
            case 3:
                return <PdfPage resumeHTML={resumeHTML} />
            default:
                return null
        }
    }

    return (
        <div className="body">
            <Steps
                size="small"
                type="navigation"
                current={currentStep}
                style={{
                    position: "sticky",
                    top: 0,
                    padding: "20px 20px",
                    width: "100%",
                    backgroundColor: "white",
                    borderBottom: "1px solid #e8e8e8",
                    zIndex: 1,
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)"
                }}
                items={[
                    {
                        title: "Write",
                        // status: "finish",
                        icon: <FileMarkdownOutlined />,
                        onClick: () => handleStepClick(0),
                        style: {
                            cursor: "pointer"
                        }
                    },
                    {
                        // title: "Fill in",
                        title: "pick",
                        // status: "finish",
                        icon: <FormOutlined />,
                        onClick: () => handleStepClick(1),
                        style: {
                            cursor: "pointer"
                        }
                    },
                    {
                        title: "Adjust",
                        // status: "process",
                        icon: <ControlOutlined />,
                        onClick: () => handleStepClick(2),
                        style: {
                            cursor: "pointer"
                        }
                    },
                    {
                        title: "Download",
                        // status: "wait",
                        icon: <DownloadOutlined />,
                        onClick: () => handleStepClick(3),
                        style: {
                            cursor: "pointer"
                        }
                    }
                ]}
            />
            {/* <div
                className="site-layout-content"
                style={{
                    background: colorBgContainer,
                    height: "1000px"
                }}
            >
                Content
            </div> */}
            {renderComponent()}
        </div>
    )
}

export default Body
