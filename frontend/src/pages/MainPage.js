import React from "react"
import "./MainPage.scss"
import img from "../images/template2_screenshot.png"
import logo from "../images/logo_small.png"
import { Button } from "antd"
import { Link } from "react-router-dom"

const MainPage = () => {
    return (
        <div>
            <nav>
                <div
                    className="logo_with_name"
                    onClick={() => {
                        window.location.href = "/"
                    }}
                >
                    <img
                        src={logo}
                        alt="logo"
                    />
                    <h2>Markup And Down</h2>
                </div>
                {/* <button className="make_resume_button">Make my resume</button> */}
                <button className="make_resume_button">
                    <Link to="editor">Make my resume</Link>
                </button>
            </nav>
            <div className="intro">
                <div className="step">
                    <div className="description">
                        <p className="small">STEP 1</p>
                        <h2>Pick the template</h2>
                        <p>Choose the template you would like to use.</p>
                    </div>
                    <img
                        src={img}
                        alt=""
                    />
                </div>
                <div className="step">
                    <div className="description">
                        <p className="small">STEP 2</p>
                        <h2>Write your content</h2>
                        <p>
                            Write your resume content in markdown, preview the
                            result in realtime.
                        </p>
                    </div>
                    <img
                        src={img}
                        alt=""
                    />
                </div>
                <div className="step">
                    <div className="description">
                        <p className="small">STEP 3</p>
                        <h2>Download !</h2>
                        <p>Export it as the PDF file when you finish.</p>
                    </div>
                    <img
                        src={img}
                        alt=""
                    />
                </div>
            </div>
        </div>
    )
}

export default MainPage
