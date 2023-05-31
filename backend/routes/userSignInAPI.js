const express = require("express")
const router = express.Router()
const Validators = require("../utils/validator")
const Query = require("../utils/query")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

router.post("/", async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        res.status(400).send("Missing required fields")
        return
    }
    const isPasswordMatch = await Validators.checkEmailAndPasswordMatch(
        email,
        password
    )
    if (!isPasswordMatch) {
        res.status(400).send("Email or password is incorrect")
        console.log("Failed to Sign In")
        return
    }
    const user = await Query.getUserByEmail(email)
    const userInfo = {
        id: user.id,
        name: user.name,
        email: user.email
    }
    const token = jwt.sign(userInfo, process.env.JWT_SECRET_KEY)
    res.status(200).json({
        data: {
            access_token: token,
            access_expired: 3600,
            user: userInfo
        }
    })
    console.log("Successful Sign In")
})

module.exports = router
