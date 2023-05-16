import { useState } from "react"
import axios from "axios"
import { Alert, Form, Modal, Button, Input } from "antd"
import { MailOutlined, UserOutlined } from "@ant-design/icons"
import API from "../utils/API"

// const singUpUrl = API.signUpAPI
const signUpUrl = "http://localhost:3003/api/user/signup"
const { Item } = Form

const SignUpModal = ({ isModalOpen, setIsModalOpen }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [signUpStatus, setSignUpStatus] = useState(0)
    const [singUpMessage, setSignUpMessage] = useState(
        "enter your email and password"
    )

    const handleOk = () => {
        if (signUpStatus === 2) {
            setIsModalOpen(false)
        }
        console.log("register button pressed")
        console.log(signUpUrl)
    }

    const handleCancel = () => {
        setIsLoading(false)
        setIsModalOpen(false)
    }

    const handleSignUp = async (values) => {
        // console.log("handleSignUp")
        const { name, email, password } = values
        console.log(name, email, password)
        setIsLoading(true)

        try {
            const requestBody = {
                name: name,
                email: email,
                password: password
            }
            const response = await axios.post(signUpUrl, requestBody)
            if (response.status === 200) {
                setIsLoading(false)
                setSignUpStatus(2)
                setSignUpMessage("You are now a member !")
                // setIsModalOpen(false);
            }
        } catch (e) {
            console.log(e)
            setSignUpMessage("Email or password is incorrect")
            setSignUpStatus(1)
        }

        setIsLoading(false)
    }

    return (
        <Modal
            title="Sign Up to become a member"
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
                    form="signupForm"
                    loading={isLoading}
                    onClick={handleOk}
                >
                    {isLoading
                        ? "Loading..."
                        : signUpStatus !== 2
                        ? "Register"
                        : "Continue"}
                </Button>
            ]}
        >
            <Form
                id="signupForm"
                onFinish={handleSignUp}
            >
                <Item
                    name="name"
                    label="Name"
                    rules={[
                        {
                            required: true,
                            message: "The name could not be empty"
                        }
                    ]}
                >
                    <Input prefix={<UserOutlined />} />
                </Item>
                <Item
                    name="email"
                    label="Email"
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
                        message={singUpMessage}
                        type={
                            signUpStatus === 0
                                ? "warning"
                                : signUpStatus === 1
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

export default SignUpModal
