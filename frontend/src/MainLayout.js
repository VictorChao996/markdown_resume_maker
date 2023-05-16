import { useState } from "react"
import axios from "axios"
import { Form, Layout, Menu } from "antd"
import Body from "./components/body.js"
import SignInModal from "./components/SingInModal.js"
import SignUpModal from "./components/SignUpModal.js"
const { Header, Content, Footer } = Layout

const MainLayout = () => {
    const [isSignInModalOpen, setIsSignInModalOpen] = useState(false)
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false)
    // const [isLoading, setIsLoading] = useState(false)
    const [access_token, setAccess_token] = useState(null)
    const [loginStatus, setLoginStatus] = useState(0)
    // const [loginMessage, setLoginMessage] = useState("You are not login yet")

    const login_logout_button = () => {
        if (loginStatus !== 2) {
            setIsSignInModalOpen(true)
            return
        }
        setLoginStatus(0)
    }

    const open_signup_modal = () => {
        setIsSignUpModalOpen(true)
    }

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
            </Content>
            <Footer
                style={{
                    textAlign: "center"
                }}
            >
                Ant Design ©2023 Created by Ant UED
            </Footer>
            <SignInModal
                isModalOpen={isSignInModalOpen}
                setIsModalOpen={setIsSignInModalOpen}
                loginStatus={loginStatus}
                setLoginStatus={setLoginStatus}
                openSignUpModal={open_signup_modal}
            />
            <SignUpModal
                isModalOpen={isSignUpModalOpen}
                setIsModalOpen={setIsSignUpModalOpen}
            />
        </Layout>
    )
}
export default MainLayout
