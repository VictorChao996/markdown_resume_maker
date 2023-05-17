import { useState } from "react"
import axios from "axios"
import { Form, Layout, Menu } from "antd"
import Body from "./components/body.js"
import SignInModal from "./components/SignInModal.js"
import SignUpModal from "./components/SignUpModal.js"
const { Header, Content, Footer } = Layout

const MainLayout = () => {
    const [isSignInModalOpen, setIsSignInModalOpen] = useState(false)
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false)
    const [loginStatus, setLoginStatus] = useState(0)

    const login_logout_button = () => {
        if (loginStatus !== 2) {
            setIsSignInModalOpen(true)
            return
        } else if (loginStatus === 2) {
            localStorage.removeItem("accessToken")
            setLoginStatus(0)
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
                    // defaultSelectedKeys={["1"]}
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
                        {/* {loginStatus === 0 ? "Login" : "Logout"} */}
                        {localStorage.getItem("accessToken") === null
                            ? "Login"
                            : "Logout"}
                    </Menu.Item>
                </Menu>
            </Header>
            <Content>
                <Body />
            </Content>
            {/* <Footer
                style={{
                    textAlign: "center",
                    border: "1px solid #e8e8e8"
                }}
            >
                Ant Design ©2023 Created by Ant UED
            </Footer> */}
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
