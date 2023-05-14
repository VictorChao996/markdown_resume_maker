const express = require("express")
const router = express.Router()
const Query = require("../utils/query")
const Validator = require("../utils/validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

router.post("/", async (req, res) => {
    console.log(req.body)
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(400).send("Missing required fields")
        return
    }
    const emailExist = await Validator.checkUserEmailExist(email)
    if (emailExist) {
        res.status(400).send("Email already exists")
        return
    }

    //*register user
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const insertId = await Query.insertUser(name, email, hashedPassword)
        if (insertId < 0) {
            res.send(500).send("Internal server error")
            return
        }
        const userInfo = {
            id: insertId,
            name: name,
            email: email
        }
        const token = jwt.sign(userInfo, process.env.JWT_SECRET_KEY)
        res.status(200).json({
            data: {
                access_token: token,
                access_expired: 3600,
                user: userInfo
            }
        })
        console.log("User created successfully")
    } catch (e) {
        console.log(e)
        res.status(500).send("Internal server error")
    }
})

module.exports = router
