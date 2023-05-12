const express = require("express")
const cors = require("cors")
require("dotenv").config()

const app = express()
const port = process.env.PORT || 3001
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
