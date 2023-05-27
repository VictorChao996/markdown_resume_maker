import logo from "./logo.svg"
import react from "react"
import "./App.css"
import { ConfigProvider } from "antd"

import MainLayout from "./MainLayout.js"

function App() {
    return (
        <ConfigProvider
            theme={{
                token: {
                    // colorPrimary: "#34b7eb",
                    colorPrimary: "#689689",
                    colorBgLayout: "#eeeeee",
                    // colorBgContainer: "#303841",
                    // colorText: "#ffffff",
                    colorBgTextHover: "#689689"
                }
            }}
        >
            <MainLayout />
        </ConfigProvider>
    )
}

export default App
