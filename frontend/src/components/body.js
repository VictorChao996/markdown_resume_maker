import { useState } from "react"
import { Form, Modal, Steps, Layout, Menu, theme, Button, Input } from "antd"
import {
    LoadingOutlined,
    SmileOutlined,
    SolutionOutlined,
    UserOutlined,
    FormOutlined,
    ControlOutlined,
    DownloadOutlined,
    FileMarkdownOutlined
} from "@ant-design/icons"
import MarkdownPage from "../pages/markdownPage"
import PdfPage from "./pdfPage"
import TextEditor from "./textEditor"
import ResumeListPage from "../pages/resumeListPage"
import "./body.scss"
const { Header, Content, Footer } = Layout
const { Item } = Form

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
            case 1:
                return <MarkdownPage setResumeHTML={setResumeHTML} />
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
                    zIndex: 1
                }}
                items={[
                    {
                        // title: "Fill in",
                        title: "pick",
                        // status: "finish",
                        icon: <FormOutlined />,
                        onClick: () => handleStepClick(0),
                        style: {
                            cursor: "pointer"
                        }
                    },
                    {
                        title: "Write",
                        // status: "finish",
                        icon: <FileMarkdownOutlined />,
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
            {/* <ResumeListPage /> */}
            {renderComponent()}
            {/* <MarkdownPage setResumeHTML={setResumeHTML} /> */}

            {/* <PdfPage resumeHTML={resumeHTML} />
            <ResumeListPage /> */}
            {/* <CodeEditor /> */}
        </div>
    )
}

export default Body
