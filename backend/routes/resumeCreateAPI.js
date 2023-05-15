const express = require("express")
const router = express.Router()
const Query = require("../utils/query")
const jwt = require("jsonwebtoken")
const Validator = require("../utils/validator")

router.post("/", async (req, res) => {
    const authorization = req.headers["authorization"]
    const authToken = authorization ? authorization.split(" ")[1] : null

    if (!authToken) {
        res.status(401).send("Unauthorized")
        return
    }

    // Verify and decode the JWT token
    let decodedToken
    try {
        decodedToken = jwt.verify(authToken, process.env.JWT_SECRET_KEY)
    } catch (error) {
        // Handle token verification failure
        return res.status(401).json({ error: "Invalid token" })
    }

    // Extract user data from the decoded token
    const { id, name, email } = decodedToken

    const { resumeData } = req.body

    if (!resumeData || !Validator.checkCreateResumeDataFormat) {
        res.status(400).send("Invalid resume data")
        return
    }

    // Create the resume
    const resumeId = await Query.createResume(id, resumeData)

    if (!resumeId) {
        res.status(500).send("Internal Server Error: Failed to create resume")
        return
    }

    res.status(201).json({
        message: "Resume created successfully",
        data: {
            resumeId: resumeId
        }
    })
})

module.exports = router
