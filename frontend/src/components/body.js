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
const { Header, Content, Footer } = Layout
const { Item } = Form

const Body = () => {
    const {
        token: { colorBgContainer }
    } = theme.useToken()
    return (
        <div>
            <Steps
                current={0}
                style={{
                    position: "sticky",
                    top: 0,
                    padding: "20px 20px",
                    width: "100%"
                }}
                items={[
                    {
                        title: "Fill in",
                        // status: "finish",
                        icon: <FormOutlined />
                    },
                    {
                        title: "Write",
                        // status: "finish",
                        icon: <FileMarkdownOutlined />
                    },
                    {
                        title: "Adjust",
                        // status: "process",
                        icon: <ControlOutlined />
                    },
                    {
                        title: "Download",
                        // status: "wait",
                        icon: <DownloadOutlined />
                    }
                ]}
            />
            <div
                className="site-layout-content"
                style={{
                    background: colorBgContainer
                }}
            >
                Content
            </div>
        </div>
    )
}

export default Body
