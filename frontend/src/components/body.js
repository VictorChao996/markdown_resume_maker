import { useState, useRef } from "react"
import { Steps, Tooltip } from "antd"
import {
    FormOutlined,
    DownloadOutlined,
    FileMarkdownOutlined
} from "@ant-design/icons"
import MarkdownPage from "../pages/markdownPage"
import TemplatePage from "../pages/TemplatePage"
import AdjustPage from "../pages/AdjustPage"
import "./body.scss"
import DownloadPage from "../pages/DownloadPage"

const Body = () => {
    const [currentStep, setCurrentStep] = useState(0)
    const [resumeHTML, setResumeHTML] = useState("")
    const [template, setTemplate] = useState(1)
    const cardRef = useRef()

    const handleStepClick = (stepIndex) => {
        console.log("Step clicked:", stepIndex)
        setCurrentStep(stepIndex)
    }

    const renderComponent = () => {
        switch (currentStep) {
            case 0:
                return (
                    <TemplatePage
                        setTemplate={setTemplate}
                        setCurrentStep={setCurrentStep}
                    />
                )
            case 1:
                return (
                    <MarkdownPage
                        setResumeHTML={setResumeHTML}
                        cardRef={cardRef}
                        template={template}
                    />
                )
            // case 2:
            //     return <AdjustPage resumeHTML={resumeHTML} />
            case 2:
                return (
                    <DownloadPage
                        resumeHTML={resumeHTML}
                        cardRef={cardRef}
                        template={template}
                    />
                )
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
                onChange={handleStepClick}
                style={{
                    position: "sticky",
                    top: 0,
                    // padding: "20px 20px",
                    width: "100%",
                    backgroundColor: "white",
                    borderBottom: "1px solid #e8e8e8",
                    zIndex: 1,
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                    fontWeight: 600,
                    letterSpacing: "1.6px"
                }}
                items={[
                    {
                        // title: "Fill in",
                        // onClick: () => handleStepClick(0),
                        title: "pick",
                        icon: (
                            <Tooltip title="Pick a template">
                                <FormOutlined />
                            </Tooltip>
                        )
                    },
                    {
                        title: "Write",
                        // status: "finish",
                        icon: (
                            <Tooltip title="Write your resume">
                                <FileMarkdownOutlined />
                            </Tooltip>
                        )
                        // onClick: () => handleStepClick(1),
                    },
                    // {
                    //     title: "Adjust",
                    //     // status: "process",
                    //     icon: <ControlOutlined />,
                    //     onClick: () => handleStepClick(2),
                    //     style: {
                    //         cursor: "pointer"
                    //     }
                    // },
                    {
                        title: "Download",
                        // status: "wait",
                        icon: (
                            <Tooltip title="Export your resume">
                                <DownloadOutlined />
                            </Tooltip>
                        )
                        // onClick: () => handleStepClick(2),
                    }
                ]}
            />
            {renderComponent()}
        </div>
    )
}

export default Body
