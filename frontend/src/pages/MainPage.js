import React from "react"
import "./MainPage.scss"
import img2 from "../images/template2_screenshot.png"
import img1 from "../images/template1_screenshot.png"
import typingGIF from "../images/typing.gif"
import templateGIF from "../images/template_gif.gif"
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
                <button
                    className="how_it_works_button"
                    onClick={() => {
                        const section = document.getElementById("steps_head")
                        section.scrollIntoView({ behavior: "smooth" })
                    }}
                >
                    How it works
                </button>
                {/* <button className="make_resume_button">Make my resume</button> */}
                <button className="make_resume_button">
                    <Link to="editor">Make my resume</Link>
                </button>
            </nav>
            <div className="intro">
                <div className="firstPage">
                    <div className="left">
                        <h1>Make resumes with Markdown</h1>
                        <p>No worry for the style. Focus on your content.</p>
                        <Button
                            type="primary"
                            style={{ width: "150px" }}
                        >
                            <Link to="editor">Create my resume</Link>
                        </Button>
                    </div>
                    <div className="right">
                        <img
                            src={img2}
                            alt=""
                            style={{
                                width: "40%",
                                // height: "100%",
                                transform:
                                    "rotate(-15deg) translate(0px, 50px)",
                                boxShadow: "0px 0px 15px rgba(0,0,0,0.2)"
                            }}
                        />
                        <img
                            src={img1}
                            alt=""
                            style={{
                                width: "45%",
                                // height: "100%",
                                transform:
                                    "translate(50px, 50px) rotate(15deg) ",
                                boxShadow: "0px 0px 15px rgba(0,0,0,0.2)"
                            }}
                        />
                        <img
                            src={typingGIF}
                            alt=""
                            style={{
                                width: "80%",
                                // width: "100%",
                                // height: "100%",
                                transform: "translate(40px, -60px)",
                                boxShadow: "0px 0px 20px rgba(0,0,0,0.3)",
                                zIndex: "2"
                            }}
                        />
                    </div>
                </div>
                <div className="steps">
                    <div
                        id="steps_head"
                        style={{ height: "100px" }}
                    ></div>
                    <div className="step">
                        <div className="description">
                            <p className="small">STEP 1</p>
                            <h2>Pick the template</h2>
                            <p>Choose the template you would like to use.</p>
                        </div>
                        <img
                            src={templateGIF}
                            alt=""
                        />
                    </div>
                    <div className="step">
                        <div className="description">
                            <p className="small">STEP 2</p>
                            <h2>Write your content</h2>
                            <p>
                                Write your resume content in markdown, preview
                                the result in realtime.
                            </p>
                        </div>
                        <img
                            src={typingGIF}
                            alt=""
                            style={{
                                height: "70%",
                                transform: "translate(60px, 0px)"
                                // width: "auto"
                                // width: "100%"
                            }}
                        />
                    </div>
                    <div className="step">
                        <div className="description">
                            <p className="small">STEP 3</p>
                            <h2>Download !</h2>
                            <p>Export it as the PDF file when you finish.</p>
                        </div>
                        <img
                            src={img1}
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainPage
