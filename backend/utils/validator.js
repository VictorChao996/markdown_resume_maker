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

const checkCreateResumeDataFormat = async (resumeData) => {
    const { title, content, created_at, updated_at, visibility } = resumeData
    if (
        title == undefined ||
        content == undefined ||
        updated_at == undefined ||
        created_at == undefined ||
        typeof visibility !== "boolean"
    ) {
        return false
    }
    return true
}
const checkUpdateResumeDataFormat = async (resumeData) => {
    // console.log(resumeData)
    const { title, content, updated_at, visibility } = resumeData
    console.log(title, content, updated_at, visibility)
    if (
        title == undefined ||
        content == undefined ||
        updated_at == undefined ||
        typeof visibility !== "boolean"
    ) {
        return false
    }
    return true
}

module.exports = {
    checkUserEmailExist,
    checkEmailAndPasswordMatch,
    checkCreateResumeDataFormat,
    checkUpdateResumeDataFormat
}
