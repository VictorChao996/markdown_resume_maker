const Query = require("./query.js")
const bcrypt = require("bcrypt")

const checkUserEmailExist = async (email) => {
    const emailExistResult = await Query.getUserByEmail(email)

    if (emailExistResult && emailExistResult["email"]) {
        return true
    }

    return false
}

const checkEmailAndPasswordMatch = async (email, password) => {
    const hashedPassword = await Query.getHashedPasswordByEmail(email)
    if (!hashedPassword) {
        return false
    }

    const isPasswordMatch = await bcrypt.compare(password, hashedPassword)
    if (!isPasswordMatch) {
        return false
    }

    return true
}

module.exports = {
    checkUserEmailExist,
    checkEmailAndPasswordMatch
}
