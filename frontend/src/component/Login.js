import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function Login() {
    let history = useNavigate();
    const [credentials, setCredentials] = useState({email:"", password: ""});
    const handleSubmit = async(e) =>{
        e.preventDefault()
        await axios.post(`http://localhost:5000/api/auth/login`, credentials).then((res)=>{
            localStorage.setItem("token", res.data.Token)
            localStorage.setItem("Username", res.data.name)
            history('/')
        })
        .catch((error)=>{
            console.log('front')
            console.log(error)
        })
    }
    const onChange = (e) =>{
        setCredentials({...credentials, [e.target.name]:e.target.value})
    }
    return (
        <div className='container border rounded-3 my-2' style={{maxWidth:"400px"}}>
            <h2 className='my-2 text-center'>Login</h2>
            <form onSubmit={handleSubmit} className='d-flex flex-column justify-content-center my-2'>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email' value={credentials.email} id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' value={credentials.password} id="exampleInputPassword1" onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary mx-auto">Submit</button>
            </form>
        </div>
    )
}

export default Login