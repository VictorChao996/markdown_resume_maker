import { useEffect, useState } from "react"
import { Alert, Modal, Button, Form, Input } from "antd"
import API from "../utils/API"
import axios from "axios"

const { Item } = Form

const NewResumeModal = ({ isModalOpen, setIsModalOpen }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [resumeCreateMessage, setResumeCreateMessage] = useState(
        "Make a new resume with the title."
    )
    const [resumeCreateStatus, setResumeCreateStatus] = useState(0)

    const handleOk = () => {
        if (resumeCreateStatus === 2) {
            setIsModalOpen(false)
            setResumeCreateStatus(0)
            setResumeCreateMessage("Make a new resume with the title")
            resetForm()
        }
    }
    const handleCancel = () => {
        setIsModalOpen(false)
        resetForm()
    }

    const resetForm = () => {
        const form = document.getElementById("createResumeForm")
        form.reset()
    }

    const handleCreateResume = async (values) => {
        const { title, description } = values
        setIsLoading(true)

        try {
            const response = await axios.post(
                API.resumeCreateAPI,
                {
                    "resumeData": {
                        "title": `${title}`,
                        "content": "This is a new resume....",
                        "created_at": Date.now(),
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
            if (response.status === 201) {
                setResumeCreateMessage("Resume created successfully")
                setResumeCreateStatus(2)
                localStorage.setItem(
                    "resumeListSize",
                    localStorage.getItem("resumeListSize") + 1
                )
                setResumeList()
            }
        } catch (e) {
            console.log(e)
            setResumeCreateMessage(
                "Failed to create resume, something went wrong"
            )
            setResumeCreateStatus(1)
        }

        setIsLoading(false)
    }

    const setResumeList = async () => {
        const response = await axios.get(API.resumeListAPI, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        console.log(response)
        localStorage.setItem(
            "resumeTitleList",
            response.data.data.resumeTitleList
        )
    }

    return (
        <Modal
            title="Create a new resume"
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
                    key="create"
                    type="primary"
                    htmlType="submit"
                    form="createResumeForm"
                    onClick={handleOk}
                >
                    {resumeCreateStatus === 2 ? "OK" : "Create"}
                </Button>
            ]}
        >
            <Form
                id="createResumeForm"
                onFinish={handleCreateResume}
                style={{
                    padding: "30px 0px 0px"
                }}
            >
                <Item
                    name="title"
                    label="Title"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Item>
                <Item>
                    <Alert
                        message={resumeCreateMessage}
                        type={
                            resumeCreateStatus === 0
                                ? "info"
                                : resumeCreateStatus === 1
                                ? "error"
                                : "success"
                        }
                        showIcon
                    />
                </Item>
            </Form>
        </Modal>
    )
}

export default NewResumeModal
