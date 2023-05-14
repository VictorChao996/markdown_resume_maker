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

module.exports = {
    showTables,
    getUserByEmail,
    getHashedPasswordByEmail,
    insertUser
}
