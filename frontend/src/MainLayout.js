import { useState } from "react"
import axios from "axios"
import {
    Alert,
    Form,
    Modal,
    Steps,
    Layout,
    Menu,
    theme,
    Button,
    Input
} from "antd"
import {
    LoadingOutlined,
    SmileOutlined,
    SolutionOutlined,
    UserOutlined,
    MailOutlined
} from "@ant-design/icons"
import Body from "./components/body.js"
const { Header, Content, Footer } = Layout
const { Item } = Form

const MainLayout = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [access_token, setAccess_token] = useState(null)
    const [loginStatus, setLoginStatus] = useState(0)
    const [loginMessage, setLoginMessage] = useState("You are not login yet")

    const login_logout_button = () => {
        if (loginStatus !== 2) {
            setIsModalOpen(true)
            return
        }
        setLoginStatus(0)
    }
    const handleOk = () => {
        if (loginStatus === 2) {
            setIsModalOpen(false)
        }
    }
    const handleCancel = () => {
        setIsLoading(false)
        setIsModalOpen(false)
    }

    const handleSignIn = async (values) => {
        const { email, password } = values
        // Perform sign-in logic or navigate to another page
        setIsLoading(true)

        try {
            const requestBody = {
                "email": email,
                "password": password
            }
            const response = await axios.post(
                "http://localhost:3003/api/user/signin",
                requestBody
            )
            if (response.status === 200) {
                setIsLoading(false)
                setAccess_token(response.data.data.access_token)
                setLoginStatus(2)
                setLoginMessage("Successful Sign In")
                // setIsModalOpen(false)
            }
        } catch (e) {
            console.log(e)
            setLoginMessage("Email or password is incorrect")
            setLoginStatus(1)
        }

        setIsLoading(false)
    }

    const {
        token: { colorBgContainer }
    } = theme.useToken()
    return (
        <Layout className="layout">
            <Header
                style={{
                    height: "100%"
                }}
                // style={{
                //     position: "sticky",
                //     top: 0,
                //     zIndex: 1,
                //     width: "100%"
                // }}
            >
                <div
                    style={{
                        float: "left",
                        width: 120,
                        height: 31,
                        margin: "16px 24px 16px 0",
                        background: "rgba(255, 255, 255, 0.2)"
                    }}
                />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={["1"]}
                    style={{
                        justifyContent: "flex-end"
                    }}
                >
                    <Menu.Item key="1">New File</Menu.Item>
                    <Menu.Item key="2">About</Menu.Item>
                    <Menu.Item
                        key="3"
                        onClick={login_logout_button}
                    >
                        {loginStatus === 0 ? "Login" : "Logout"}
                    </Menu.Item>
                </Menu>
            </Header>
            <Content>
                <Body />
                <Modal
                    title="Sign In to store your content"
                    centered
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={[
                        <Button
                            key="cancel"
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>,
                        <Button
                            key="continue"
                            type="primary"
                            htmlType="submit"
                            form="loginForm"
                            loading={isLoading}
                            onClick={handleOk}
                        >
                            {isLoading
                                ? "Signing In"
                                : loginStatus !== 2
                                ? "Sign In"
                                : "Continue"}
                        </Button>
                    ]}
                >
                    <Form
                        id="loginForm"
                        onFinish={handleSignIn}
                    >
                        <Item
                            name="email"
                            label="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter your email"
                                }
                            ]}
                        >
                            <Input prefix={<MailOutlined />} />
                        </Item>
                        <Item
                            name="password"
                            label="Password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter your password"
                                }
                            ]}
                        >
                            <Input.Password />
                        </Item>

                        <Item>
                            <Alert
                                message={loginMessage}
                                type={
                                    loginStatus === 0
                                        ? "warning"
                                        : loginStatus === 1
                                        ? "error"
                                        : "success"
                                }
                                showIcon
                            />
                        </Item>
                    </Form>
                </Modal>
            </Content>
            <Footer
                style={{
                    textAlign: "center"
                }}
            >
                Ant Design ©2023 Created by Ant UED
            </Footer>
        </Layout>
    )
}
export default MainLayout
