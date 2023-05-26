import { useState } from "react"
import axios from "axios"
import { Alert, Form, Modal, Button, Input } from "antd"
import { MailOutlined, UserOutlined } from "@ant-design/icons"
import API from "../utils/API"
import ResumeList from "./resumeList"

const signUpUrl = API.signUpAPI
// const signUpUrl = "http://localhost:3003/api/user/signup"
const { Item } = Form

const ResumeListModal = ({ isModalOpen, setIsModalOpen }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [resumeListMessage, setResumeListMessage] = useState(
        "Login to see your resume list"
    )
    const [resumeTitleList, setResumeTitleList] = useState([])

    const handleOk = () => {
        setIsModalOpen(false)
        const tempContent = localStorage.getItem("tempMarkdownContent")
        localStorage.setItem("markdownContent", tempContent)
    }

    const handleCancel = () => {
        setIsLoading(false)
        setIsModalOpen(false)
    }

    const handleListRefresh = () => {
        if (localStorage.getItem("accessToken") !== null) {
            getResumeList()
        }
    }

    const getResumeList = async () => {
        const response = await axios.get(API.resumeListAPI, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        console.log(response)
        setResumeTitleList(response.data.data.resumeTitleList)
        localStorage.setItem(
            "resumeTitleList",
            response.data.data.resumeTitleList
        )
    }

    return (
        <Modal
            title="Here is your resume list"
            centered={true}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
                <Button
                    key="close"
                    onClick={handleCancel}
                >
                    Close
                </Button>,
                <Button
                    key="refresh List"
                    onClick={handleListRefresh}
                >
                    Refresh
                </Button>,
                <Button
                    key="Confirm"
                    type="primary"
                    // htmlType="submit"
                    // form="signupForm"
                    // loading={isLoading}
                    onClick={handleOk}
                >
                    Confirm
                    {/* {isLoading
                        ? "Loading..."
                        : signUpStatus !== 2
                        ? "Register"
                        : "Continue"} */}
                </Button>
            ]}
        >
            {localStorage.getItem("accessToken") !== null ? (
                <>
                    <ResumeList
                        resumeTitleList={resumeTitleList}
                        setResumeTitleList={setResumeTitleList}
                        handleListRefresh={handleListRefresh}
                    />
                    <Alert
                        message={"Pick one to edit"}
                        type="info"
                        showIcon
                        style={{ marginTop: "20px" }}
                    />
                </>
            ) : (
                <Alert
                    message={"Login to see your resume list"}
                    type="warning"
                    showIcon
                />
            )}
        </Modal>
    )
}

export default ResumeListModal
