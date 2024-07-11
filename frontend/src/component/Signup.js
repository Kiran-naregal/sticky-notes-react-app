import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Signup() {
  let history = useNavigate();
  const [credentials, setCredentials] = useState({name:"", email:"", password:""})

  const handleSubmit = (e) =>{
    e.preventDefault()
    // console.log(credentials)
    let data = {name: credentials.name, email: credentials.email, password: credentials.password}
    axios.post(`http://localhost:5000/api/auth/createUser`,data).then((res)=>{
        localStorage.setItem("token", res.data.Token)
        localStorage.setItem("Username", res.data.name)
        history('/')
    })
  }

  const handleChange = (e) =>{
    setCredentials({...credentials, [e.target.name]: e.target.value})
  }
  return (
    <div className='container border rounded-3 my-2' style={{maxWidth:"400px"}}>
      <h2 className='my-2 text-center'>Sign Up</h2>
            <form onSubmit={handleSubmit} className='d-flex flex-column justify-content-center my-2'>
                <div className="mb-2">
                    <label htmlFor="name" className="form-label">User name</label>
                    <input type="name" className="form-control" name='name' value={credentials.name} id="name" aria-describedby="emailHelp" onChange={handleChange} />
                </div>
                <div className="mb-2">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email' value={credentials.email} id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleChange} />
                </div>
                <div className="mb-2">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' value={credentials.password} id="exampleInputPassword1" onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary mx-auto">Submit</button>
            </form>
        </div>
  )
}

export default Signup