import { useState } from "react"
import axios from "axios"
import { Alert, Form, Modal, Button, Input, Typography } from "antd"
import { MailOutlined } from "@ant-design/icons"
import API from "../utils/API"
import SignUpModal from "./SignUpModal.js"

const signInUrl = API.signInAPI
// const signInUrl = "http://localhost:3003/api/user/signin"
const { Item } = Form

const SignInModal = ({
    isModalOpen,
    setIsModalOpen,
    loginStatus,
    setLoginStatus,
    openSignUpModal,
    setAccessToken
}) => {
    const [isLoading, setIsLoading] = useState(false)
    // const [loginStatus, setLoginStatus] = useState(0)
    const [loginMessage, setLoginMessage] = useState(
        "You are not logged in yet"
    )

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
        setIsLoading(true)

        try {
            const requestBody = {
                email: email,
                password: password
            }
            const response = await axios.post(signInUrl, requestBody)
            if (response.status === 200) {
                setIsLoading(false)
                setLoginStatus(2)
                setLoginMessage("Successful Sign In")
                setAccessToken(response.data.data.access_token)
                // console.log(response.data.data.access_token)
                // setIsModalOpen(false);
            }
        } catch (e) {
            console.log(e)
            setLoginMessage("Email or password is incorrect")
            setLoginStatus(1)
        }

        setIsLoading(false)
    }

    const handleSignUp = () => {
        openSignUpModal()
    }

    return (
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
                style={{
                    padding: "30px 0px 0px"
                }}
            >
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
                <Item
                    style={
                        {
                            // textAlign: "end"
                        }
                    }
                >
                    <Button
                        type="link"
                        onClick={handleSignUp}
                    >
                        Do not have a account?
                    </Button>
                </Item>
            </Form>
        </Modal>
    )
}

export default SignInModal
