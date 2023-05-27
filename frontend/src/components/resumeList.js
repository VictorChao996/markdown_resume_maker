import React, { useState, useEffect } from "react"
import { List, message } from "antd"
import API from "../utils/API.js"
import axios from "axios"
import { DeleteOutlined } from "@ant-design/icons"
import "./resumeList.scss"

const ResumeList = ({
    resumeTitleList,
    setResumeTitleList,
    handleListRefresh
}) => {
    // const [resumeTitleList, setResumeTitleList] = useState([])
    const [currentSelectResume, setCurrentSelectResume] = useState(-1)

    const getResumeContent = async (resumeId) => {
        console.log(resumeId)
        try {
            const response = await axios.get(
                `${API.resumeGetAPI}?resumeId=${resumeId}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`
                    }
                }
            )
            console.log(response.data.data.resume)
            // localStorage.removeItem("markdownContent")
            // localStorage.setItem(
            //     "markdownContent",
            //     response.data.data.resume.content
            // )
            localStorage.setItem(
                "tempMarkdownContent",
                response.data.data.resume.content
            )
            localStorage.setItem("resumeId", resumeId)
            setCurrentSelectResume(resumeId)
            localStorage.setItem("resumeTitle", response.data.data.resume.title)
        } catch (e) {
            console.log(e)
        }
    }

    //* delete resume by resumeId in DB and remove it from the localStorage (resumeTitleList)
    const deleteResume = async (resumeId) => {
        try {
            const response = await axios.delete(
                `${API.resumeDeleteAPI}?resumeId=${resumeId}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`
                    }
                }
            )
            console.log(response)
            if (response.status === 200) {
                setResumeTitleList(
                    resumeTitleList.filter((item) => item.id !== resumeId)
                )
                localStorage.setItem(
                    "resumeTitleList",
                    resumeTitleList.filter((item) => item.id !== resumeId)
                )
                localStorage.setItem(
                    "resumeListSize",
                    localStorage.getItem("resumeListSize") - 1
                )
                setCurrentSelectResume(-1)
                localStorage.setItem("markdownContent", " ")
                localStorage.setItem("tempMarkdownContent", " ")
                console.log(
                    "markdownContent",
                    localStorage.getItem("markdownContent")
                )
            }
            message.success("Successful Delete")
        } catch (e) {
            console.log(e)
            message.error("Failed to delete resume: something went wrong")
        }
    }

    return (
        <div>
            <List
                className="resumeList"
                bordered
                dataSource={resumeTitleList}
                renderItem={(item) => (
                    // <List.Item>
                    //     <a onClick={() => getResumeContent(item.id)}>
                    //         {item.title}
                    //     </a>
                    // </List.Item>
                    // <div className="listItem">
                    <div
                        className={`listItem ${
                            item.id === currentSelectResume
                                ? "listItemSelected"
                                : ""
                        }`}
                        onClick={() => getResumeContent(item.id)}
                    >
                        <span>
                            {/* <span onClick={() => getResumeContent(item.id)}> */}
                            {item.title}
                        </span>

                        <DeleteOutlined
                            title="delete"
                            className="deleteIcon"
                            onClick={() => {
                                deleteResume(item.id)
                                // handleListRefresh()
                            }}
                        />
                    </div>
                )}
            />
        </div>
    )
}

export default ResumeList
