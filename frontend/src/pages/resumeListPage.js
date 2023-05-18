import React, { useState, useEffect } from "react"
import { Divider, List, Typography, Button } from "antd"
import API from "../utils/API.js"
import axios, { toFormData } from "axios"

const data = [
    "Racing car sprays burning fuel into crowd.",
    "Japanese princess to wed commoner.",
    "Australian walks 100km after outback crash.",
    "Man charged over missing wedding girl.",
    "Los Angeles battles huge wildfires."
]

const ResumeListPage = ({ resumeTitleList, setResumeTitleList }) => {
    // const [resumeTitleList, setResumeTitleList] = useState([])

    useEffect(() => {
        // getResumeList()
        // setResumeTitleList(localStorage.getItem("resumeTitleList"))
        console.log(resumeTitleList)
    }, [resumeTitleList])

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
            localStorage.removeItem("markdownContent")
            localStorage.setItem(
                "markdownContent",
                response.data.data.resume.content
            )
            localStorage.setItem("resumeId", resumeId)
            localStorage.setItem("resumeTitle", response.data.data.resume.title)
            // console.log(localStorage.getItem("markdownContent"))
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            {/* <h1>Resume List Page</h1>
            <button onClick={getResumeList}>Get Resume List</button>
            <button onClick={handleCreateResume}>Create new resume</button>
            <ul>
                {resumeTitleList.map((resume) => {
                    return <li>{resume.title}</li>
                })}
            </ul> */}
            <List
                bordered
                dataSource={resumeTitleList}
                renderItem={(item) => (
                    <List.Item>
                        <a onClick={() => getResumeContent(item.id)}>
                            {item.title}
                            {/* <h3>{item.title}</h3> */}
                            {/* <p>{item.id}</p> */}
                        </a>
                    </List.Item>
                )}
            />
        </div>
    )
}

export default ResumeListPage
