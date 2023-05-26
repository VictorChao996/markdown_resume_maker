import { useEffect, useState } from "react"
import axios from "axios"
import { Form, Layout, Menu, Steps, FloatButton } from "antd"
import Body from "./components/body.js"
import SignInModal from "./components/SignInModal.js"
import SignUpModal from "./components/SignUpModal.js"
import {
    UserOutlined,
    FormOutlined,
    SaveOutlined,
    UnorderedListOutlined
} from "@ant-design/icons"
import NewResumeModal from "./components/newResumeModal.js"
import ResumeListModal from "./components/resumeListModal.js"
import ResumeList from "./components/resumeList.js"
import API from "./utils/API.js"
const { Header, Content, Footer, Sider } = Layout

function getItem(label, key, icon, children, onClick) {
    return { key, icon, children, label, onClick }
}

const MainLayout = () => {
    const [isSignInModalOpen, setIsSignInModalOpen] = useState(false)
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false)
    const [isNewResumeModalOpen, setIsNewResumeModalOpen] = useState(false)
    const [isResumeListModalOpen, setIsResumeListModalOpen] = useState(false)
    const [loginStatus, setLoginStatus] = useState(0)
    const [collapsed, setCollapsed] = useState(false)

    useEffect(() => {
        if (localStorage.getItem("accessToken") !== null) {
            setLoginStatus(2)
        }

        return () => {
            localStorage.clear()
            setLoginStatus(0)
        }
    }, [])

    const items = [
        getItem("New resume", "1", <FormOutlined />, null, () => {
            if (loginStatus !== 2) {
                setIsSignInModalOpen(true)
                return
            }
            setIsNewResumeModalOpen(true)
        }),
        getItem("my resume", "2", <UnorderedListOutlined />, null, () => {
            setIsResumeListModalOpen(true)
        }),
        getItem("save", "3", <SaveOutlined />, null, async () => {
            console.log("save")
            await saveResumeContentToDB()
        }),
        getItem(
            loginStatus === 2 ? "logout" : "login",
            "4",
            <UserOutlined />,
            null,
            () => {
                login_logout_button()
            }
        )
    ]

    const login_logout_button = () => {
        if (loginStatus !== 2) {
            setIsSignInModalOpen(true)
            return
        } else if (loginStatus === 2) {
            localStorage.removeItem("accessToken")
            localStorage.removeItem("markdownContent")
            localStorage.removeItem("resumeId")
            localStorage.removeItem("resumeTitle")
            localStorage.removeItem("resumeTitleList")
            setLoginStatus(0)
            return
        }
        setLoginStatus(0)
    }

    const open_signup_modal = () => {
        setIsSignUpModalOpen(true)
    }

    const saveResumeContentToDB = async () => {
        if (loginStatus !== 2) {
            setIsSignInModalOpen(true)
            return
        }
        const resumeId = localStorage.getItem("resumeId")
        const resumeTitle = localStorage.getItem("resumeTitle")
        const resumeContent = localStorage.getItem("markdownContent")
        try {
            const response = await axios.put(
                `${API.resumeUpdateAPI}?resumeId=${resumeId}`,
                {
                    "resumeData": {
                        "title": `${resumeTitle}`,
                        "content": `${resumeContent}`,
                        "updated_at": Date.now(),
                        "visibility": true
                    }
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`
                    }
                }
            )
            console.log(response)
        } catch (e) {
            console.log(e)
        }
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider
                // collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                style={{
                    position: "fixed",
                    height: "100vh",
                    overflow: "auto",
                    zIndex: 1,
                    borderRight: "5px solid #adacac"
                }}
                width={170}
            >
                <Menu
                    theme="dark"
                    selectable={false}
                    mode="inline"
                    items={items}
                />
            </Sider>
            <Layout
                className="layout"
                style={{ marginLeft: collapsed ? "80px" : "170px" }}
            >
                <Content style={{ height: "100%" }}>
                    <Body />
                </Content>

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
                <NewResumeModal
                    isModalOpen={isNewResumeModalOpen}
                    setIsModalOpen={setIsNewResumeModalOpen}
                    loginStatus={loginStatus}
                />
                <ResumeListModal
                    isModalOpen={isResumeListModalOpen}
                    setIsModalOpen={setIsResumeListModalOpen}
                />
                {/* <FloatButton
                    icon={<UpOutlined />}
                    type="primary"
                    onClick={scrollToTop}
                /> */}
            </Layout>
        </Layout>
    )
}
export default MainLayout
