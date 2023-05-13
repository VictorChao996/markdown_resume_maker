const express = require("express")
const cors = require("cors")
require("dotenv").config()

const app = express()
const port = process.env.PORT || 3003
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get("/api/", (req, res) => {
    res.send("backend: Hello World")
})

app.get("/api/healthCheck", (req, res) => {
    res.send("OK")
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
