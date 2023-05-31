import React from "react"
import { Alert, Form, Modal, Button, Input } from "antd"
import MainPage from "../pages/MainPage"
import "./markdownExplainModal.scss"

const MarkdownExplainModal = ({ isModalOpen, setIsModalOpen }) => {
    const handleOk = () => {
        setIsModalOpen(false)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    return (
        <Modal
            centered={true}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            width={"70%"}
            footer={[
                <Button
                    type="primary"
                    onClick={handleOk}
                >
                    OK
                </Button>
            ]}
        >
            <div className="markdownExplainPage">
                <p className="title">Markdown language explain</p>
                <hr></hr>
                <p className="subtitle">Basic</p>
                <div className="card">
                    <h3>Heading</h3>
                    <p>Structure of the paraph</p>
                    <pre>
                        <h1># heading 1</h1>
                        <h2>## heading 2</h2>
                        <h3>### heading 3</h3>
                        <h4>#### heading 4</h4>
                        <h5>##### heading 5</h5>
                        <h6>###### heading 6</h6>
                    </pre>
                </div>
                <div className="card">
                    <h3>List</h3>
                    <p>list item</p>
                    <pre>
                        - item 1 <br />- item 2 <br />- item 3
                    </pre>
                </div>
                <div className="card">
                    <h3>Bold</h3>
                    <pre>**Bold word here**</pre>
                </div>
                <div className="card">
                    <h3>Italic</h3>
                    <pre>
                        <i>*Italic word here*</i>
                    </pre>
                </div>
                <p className="subtitle">Custom</p>
                <div className="card">
                    <h2>skills block</h2>
                    <p>list the skills in the grid layout</p>
                    <pre>
                        ::: skills start <br />
                        item 1 <br />
                        item 2 <br />
                        item 3 <br />
                        item 4 <br />
                        item 5 <br />
                        item 6 <br />
                        item 7 <br />
                        item 8 <br />
                        item 9 <br />
                        ::: skills end
                    </pre>
                    <h3>result</h3>
                    <div className="flex-skills">
                        <li>item 1</li>
                        <li>item 2</li>
                        <li>item 3</li>
                        <li>item 4</li>
                        <li>item 5</li>
                        <li>item 6</li>
                        <li>item 7</li>
                        <li>item 8</li>
                        <li>item 9</li>
                    </div>
                    {/* <pre>::: skills end</pre> */}
                </div>
                <div className="card">
                    <h2>info block</h2>
                    <p>For personal info</p>
                    <pre>
                        ::: info start <br />
                        some content here .... <br />
                        ::: info end
                    </pre>
                </div>
                <div className="card">
                    <h2>Single experience 1</h2>
                    <p>simple Job description in one line</p>
                    <pre>
                        ::: 20/01 - 20/12 ::: Junior Developer ::: MarkDown
                        Company :::
                    </pre>
                </div>
                <div className="card">
                    <h2>Single Experience 2</h2>
                    <p>simple job description in one line</p>
                    <pre>
                        ::: start <br />
                        some content here.. <br />
                        some content here... <br />
                        some content here.... <br />
                        ::: end
                    </pre>
                </div>
            </div>
        </Modal>
    )
}

export default MarkdownExplainModal
