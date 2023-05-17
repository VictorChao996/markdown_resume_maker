import { useState } from "react"
import API from "../utils/API"
import axios from "axios"

const ResumeListPage = () => {
    const [resumeTitleList, setResumeTitleList] = useState([])

    const getResumeList = async () => {
        const response = await axios.get(API.resumeListAPI, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        console.log(response)
        setResumeTitleList(response.data.data.resumeTitleList)
    }

    const handleCreateResume = async () => {
        const response = await axios.post(
            API.resumeCreateAPI,
            {
                "resumeData": {
                    "title": "hello world",
                    "content": "",
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
        getResumeList()
    }

    return (
        <div>
            <h1>Resume List Page</h1>
            <button onClick={getResumeList}>Get Resume List</button>
            <button onClick={handleCreateResume}>Create new resume</button>
            <ul>
                {resumeTitleList.map((resume) => {
                    return <li>{resume.title}</li>
                })}
            </ul>
        </div>
    )
}

export default ResumeListPage
