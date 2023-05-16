// const url = "http://54.64.217.57/"
// const url = "http://localhost:3003"
const url = process.env.REACT_APP_API_URL

const apiUrls = {
    signInAPI: `${url}/api/user/signin`,
    signUpAPI: `${url}/api/user/signup`
}

export default apiUrls
