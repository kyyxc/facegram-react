import axios from "axios";


const ax = axios.create({
    'baseURL': "http://127.0.0.1:8000/api",
    headers: {
        'Accept': 'application/json'
    }
})

export const Login = async (data, callback, navigate) => {
    try {
        const res = await ax.post('/v1/auth/login', data);
        localStorage.setItem('user', JSON.stringify(res.data.user))
        localStorage.setItem("token", res.data.token)
        navigate('/')
    }
    catch (err) {
        callback(err.response?.data);
    }
}

export const Register = async (data, callback, navigate) => {
    try {
        const res = await ax.post('/v1/auth/register', data);
        localStorage.setItem('user', JSON.stringify(res.data.user))
        localStorage.setItem("token", res.data.token)
        navigate('/')
    } catch (err) {
        callback(err.response?.data);
    }
}