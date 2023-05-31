const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const Query = require("../utils/query")

router.get("/", async (req, res) => {
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
    console.log(JSON.stringify(decodedToken))
    // Extract user data from the decoded token
    const { id, name, email } = decodedToken
    const resumeTitleList = await Query.getResumeListInfoByUserId(id)

    res.status(200).json({
        data: {
            resumeTitleList
        }
    })
})

module.exports = router
