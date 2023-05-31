const express = require("express")
const cors = require("cors")
require("dotenv").config()

const healthCheckRoute = require("./routes/healthCheckAPI")
const userSignUpRoute = require("./routes/userSignUpAPI")
const userSignInRoute = require("./routes/userSignInAPI")
const resumeCreateRoute = require("./routes/resumeCreateAPI")
const resumeUpdateRoute = require("./routes/resumeUpdateAPI")
const resumeGetRoute = require("./routes/resumeGetAPI")
const resumeDeleteRoute = require("./routes/resumeDeleteAPI")
const resumeListRoute = require("./routes/resumeListAPI")

const app = express()
const port = process.env.PORT || 3003
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get("/api/", (req, res) => {
    res.send("backend: Hello World")
})

app.use("/api/healthCheck", healthCheckRoute)

app.use("/api/user/signup", userSignUpRoute)
app.use("/api/user/signin", userSignInRoute)

app.use("/api/resume/create", resumeCreateRoute)
app.use("/api/resume/update", resumeUpdateRoute)
app.use("/api/resume/get", resumeGetRoute)
app.use("/api/resume/delete", resumeDeleteRoute)
app.use("/api/resume/list", resumeListRoute)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
