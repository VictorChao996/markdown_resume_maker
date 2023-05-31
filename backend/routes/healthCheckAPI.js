const express = require("express")
const router = express.Router()

router.get("/", async (req, res) => {
    res.send("OK")
})

router.get("/mysql", async (req, res) => {
    const Query = require("../utils/query.js")
    const mysqlResult = await Query.showTables()
    res.send(mysqlResult)
})

module.exports = router
