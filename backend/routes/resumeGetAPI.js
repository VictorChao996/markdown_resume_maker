const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const Query = require("../utils/query")

router.get("/", async (req, res) => {
    const authorization = req.headers["authorization"]
    const authToken = authorization ? authorization.split(" ")[1] : null
    let { resumeId } = req.query
    if (!resumeId) {
        res.status(400).send("Missing required fields: resumeId")
        return
    }
    resumeId = parseInt(resumeId)

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
    console.log(JSON.stringify(decodedToken))
    // Extract user data from the decoded token
    const { id, name, email } = decodedToken
    const resumeIdList = await Query.getResumeIdListByUserId(id)

    if (!resumeIdList.includes(resumeId)) {
        res.status(400).send("Invalid resume id for this user")
        return
    }

    const resume = await Query.getResumeById(resumeId)
    if (!resume) {
        res.status(500).send("Internal Server Error: Failed to get resume")
        return
    }
    res.status(200).json({
        data: {
            resume
        }
    })
})

module.exports = router
