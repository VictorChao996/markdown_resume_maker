import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { Form, Layout, Menu, Steps, FloatButton, Tour } from "antd"
import Body from "./components/body.js"
import SignInModal from "./components/SignInModal.js"
import SignUpModal from "./components/SignUpModal.js"
import {
    UserOutlined,
    FormOutlined,
    SaveOutlined,
    UnorderedListOutlined,
    QuestionCircleOutlined
} from "@ant-design/icons"
import NewResumeModal from "./components/newResumeModal.js"
import ResumeListModal from "./components/resumeListModal.js"
import ResumeList from "./components/resumeList.js"
import API from "./utils/API.js"
import logo from "./images/logo2.png"
const { Header, Content, Footer, Sider } = Layout

function getItem(label, key, icon, children, onClick, ref) {
    return { key, icon, children, label, onClick, ref }
}

const MainLayout = () => {
    const [isSignInModalOpen, setIsSignInModalOpen] = useState(false)
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false)
    const [isNewResumeModalOpen, setIsNewResumeModalOpen] = useState(false)
    const [isResumeListModalOpen, setIsResumeListModalOpen] = useState(false)
    const [loginStatus, setLoginStatus] = useState(0)
    const [collapsed, setCollapsed] = useState(false)
    const [tourOpen, setTourOpen] = useState(false)
    const tourRefs = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null)
    ]

    const tourSteps = [
        {
            title: "Welcome to Markup and Down!",
            description: "This is a tour to show you how to use this website",
            placement: "leftTop",
            cover: (
                <img
                    src={logo}
                    alt="logo"
                    style={{
                        width: "70%",
                        height: "auto",
                        borderRadius: "10px"
                        // cursor: "pointer"
                    }}
                />
            ),
            target: () => tourRefs[0].current
        },
        {
            title: "Step 1: pick a template",
            description: "Choose a template you like",
            placement: "left",
            target: () => tourRefs[1].current
        },
        {
            title: "Write steps",
            description:
                "Now, move to the next steps by clicking the write button.",
            target: () => tourRefs[2].current
        },
        {
            title: "Step2: Write your resume",
            description:
                "Write your resume in markdown, try to type the text here.",
            placement: "left",
            target: () => tourRefs[3].current
        },
        {
            title: "Step2.1: preview the result here",
            description: "Scrolling to see the whole resume (zoom in/out)",
            placement: "right",
            target: () => tourRefs[4].current
        },
        {
            title: "Step2.2: Example Content",
            description:
                "you could also press this button to see the example content",
            target: () => tourRefs[7].current
        },
        {
            title: "Download steps",
            description:
                "Now, move to the next steps by clicking the download button.",
            target: () => tourRefs[2].current
        },
        {
            title: "Step 3: Download your resume",
            description: "Download your resume as PDF or Markdown!",
            target: () => tourRefs[5].current
        },
        {
            title: "Save your resume",
            description:
                "If you want to store the resume content, you could login.",
            placement: "left",
            target: () => tourRefs[6].current
        }
    ]

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
        getItem("My resume", "2", <UnorderedListOutlined />, null, () => {
            setIsResumeListModalOpen(true)
        }),
        getItem("Save", "3", <SaveOutlined />, null, async () => {
            console.log("save")
            await saveResumeContentToDB()
        }),
        getItem(
            loginStatus === 2 ? "Logout" : "Login",
            "4",
            <UserOutlined />,
            null,
            () => {
                login_logout_button()
            }
        ),
        getItem("Tour", "5", <QuestionCircleOutlined />, null, () => {
            setTourOpen(true)
        })
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
                    borderRight: "5px solid #3a4750"
                }}
                width={170}
                // theme="light"
            >
                <div
                    style={{
                        padding: "16px 24px 16px"
                        // borderBottom: "1px solid #3a4750",
                        // marginBottom: "16px"
                    }}
                    ref={tourRefs[0]}
                    onClick={() => {
                        window.location.href = "/"
                    }}
                >
                    <img
                        src={logo}
                        alt="logo"
                        style={{
                            width: "100%",
                            height: "auto",
                            borderRadius: "10px",
                            cursor: "pointer"
                        }}
                    />
                </div>
                <div
                    className="menu"
                    ref={tourRefs[6]}
                >
                    <Menu
                        theme="dark"
                        selectable={false}
                        mode="inline"
                        items={items}
                    ></Menu>
                </div>
            </Sider>
            <Layout
                className="layout"
                style={{ marginLeft: collapsed ? "80px" : "170px" }}
            >
                <Content style={{ height: "100%" }}>
                    <Body tourRefs={tourRefs} />
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
            <Tour
                open={tourOpen}
                onClose={() => setTourOpen(false)}
                steps={tourSteps}
            />
        </Layout>
    )
}
export default MainLayout
