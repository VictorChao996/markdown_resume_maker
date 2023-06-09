import logo from "./logo.svg"
import react from "react"
import { Routes, Route, Link } from "react-router-dom"
import "./App.css"
import { ConfigProvider } from "antd"

import MainLayout from "./MainLayout.js"
import MainPage from "./pages/MainPage.js"

function App() {
    return (
        //* 更改 ant design 預設主題色
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#689689",
                    colorBgLayout: "#eeeeee",
                    colorBgTextHover: "#689689",
                    colorLink: "#689689",
                    colorLinkHover: "#5b7a73",
                    colorSuccess: "#689689",
                    colorInfo: "#689689",
                    colorError: "#c41e3d",
                    colorWarning: "#FCA311"
                }
            }}
        >
            <Routes>
                <Route
                    path="/"
                    element={<MainPage />}
                />
                <Route
                    path="editor"
                    element={<MainLayout />}
                />
            </Routes>
        </ConfigProvider>
    )
}

export default App
