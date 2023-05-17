const mysql = require("mysql2")
const config = {
    connectionLimit: 10, // maximum number of connections to create at once
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: "markdown_resume_maker"
}

const pool = mysql.createPool(config)

const showTables = async () => {
    return new Promise((resolve, reject) => {
        pool.query(`SHOW TABLES`, (err, results) => {
            if (err) {
                reject(err)
            }
            resolve(results)
        })
    })
}

const getUserByEmail = async (email) => {
    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT * FROM users WHERE email = ?`,
            [email],
            (err, results) => {
                if (err) {
                    reject(null)
                }
                // console.log("email query results: ", results)
                if (results[0]) {
                    resolve(results[0])
                } else {
                    resolve(null)
                }
            }
        )
    })
}

const getHashedPasswordByEmail = async (email) => {
    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT password_hash FROM users WHERE email = ?`,
            [email],
            (err, results) => {
                // console.log(results)
                if (err) {
                    reject(null)
                }
                if (results[0]) {
                    resolve(results[0]["password_hash"])
                } else {
                    resolve(null)
                }
            }
        )
    })
}

const getResumeIdListByUserId = async (user_id) => {
    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT id FROM resumes WHERE user_id = ?`,
            [user_id],
            (err, results) => {
                if (err) {
                    console.log(err)
                    reject(null)
                }
                resolve(results.map((res) => res.id))
            }
        )
    })
}

/**
 * * Get resume title & resume_id list by user id
 * @param {*} user_id
 * @returns
 */
const getResumeListInfoByUserId = async (user_id) => {
    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT title, id FROM resumes WHERE user_id = ?`,
            [user_id],
            (err, results) => {
                if (err) {
                    console.log(err)
                    reject([])
                }
                console.log(results)
                resolve(results)
            }
        )
    })
}

const getResumeById = async (resume_id) => {
    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT * FROM resumes WHERE id = ?`,
            [resume_id],
            (err, results) => {
                if (err) {
                    console.log(err)
                    reject(null)
                }
                resolve(results[0])
            }
        )
    })
}

const insertUser = async (name, email, password_hash) => {
    return new Promise((resolve, reject) => {
        pool.query(
            `INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)`,
            [name, email, password_hash],
            (err, results) => {
                if (err) {
                    console.log(err)
                    reject(-1)
                }
                resolve(results.insertId)
            }
        )
    })
}

const createResume = async (user_id, resumeData) => {
    console.log(resumeData)
    const { title, content, created_at, updated_at, visibility } = resumeData
    return new Promise((resolve, reject) => {
        pool.query(
            `INSERT INTO resumes (user_id, title, content, created_at, updated_at, visibility) VALUES (?, ?, ?, ?, ?, ?)`,
            [user_id, title, content, created_at, updated_at, visibility],
            (err, results) => {
                if (err) {
                    console.log(err)
                    reject(null)
                }
                // console.log(results)
                resolve(results.insertId)
            }
        )
    })
}

const updateResume = async (resume_id, resumeData) => {
    const { title, content, updated_at, visibility } = resumeData
    return new Promise((resolve, reject) => {
        pool.query(
            `UPDATE resumes SET title = ?, content = ?, updated_at = ?, visibility = ? WHERE id = ?`,
            [title, content, updated_at, visibility, resume_id],
            (err, results) => {
                if (err) {
                    console.log(err)
                    reject(null)
                }
                console.log(results)
                resolve(results.insertId)
            }
        )
    })
}

module.exports = {
    showTables,
    getUserByEmail,
    getHashedPasswordByEmail,
    getResumeIdListByUserId,
    getResumeListInfoByUserId,
    getResumeById,
    insertUser,
    createResume,
    updateResume
}
