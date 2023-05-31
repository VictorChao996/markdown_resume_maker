const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const Query = require("../utils/query")
const Validator = require("../utils/validator")

router.put("/", async (req, res) => {
    const authorization = req.headers["authorization"]
    const authToken = authorization ? authorization.split(" ")[1] : null
    const { resumeId } = req.query

    if (!resumeId) {
        res.status(400).send("Missing required fields: resumeId")
        return
    }

    const parsedResumeId = parseInt(resumeId)

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

    const resumeIdList = await Query.getResumeIdListByUserId(id)

    if (!resumeIdList.includes(parsedResumeId)) {
        res.status(400).send("Invalid resume id for this user")
        return
    }

    const { resumeData } = req.body
    console.log(resumeData)

    const check = await Validator.checkUpdateResumeDataFormat(resumeData)
    if (!check) {
        res.status(400).send("Invalid resume data")
        return
    }

    // Update the resume
    const updatedResumeId = await Query.updateResume(parsedResumeId, resumeData)

    if (updatedResumeId === null) {
        res.status(500).send("Internal Server Error: Failed to update resume")
        return
    }

    res.status(200).json({
        message: "Resume updated successfully",
        data: {
            resumeId: resumeId
        }
    })
})

module.exports = router
