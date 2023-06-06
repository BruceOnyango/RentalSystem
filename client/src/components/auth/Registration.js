import { useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";

import { ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/css/register.css'
const Register = () => {
  const [isReadonly, setIsReadonly] = useState(true);
  const [first,setFirst]=useState('')
  const [role,setRole]=useState()
  const [last,setLast]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  function loginUser(email,password){
    setEmail(email)
    setPassword(password)
    setLast(last)
    setFirst(first)
    setRole(role)
}
useEffect(()=>{
  const abortCont=new AbortController();
  loginUser(email,password,{signal:abortCont.signal})
  return()=>{
    // console.log('Login page aborted.')
    abortCont.abort()
  }
},[email,password,first,last,role])
const register =()=>{
  axios.post("http://localhost:3001/api/auth/register",{
    first:first,
    last:last,
    email:email,
    password:password,
    role:role
  }).then((response)=>{
    console.log(response)
  })
}
function onSubmit(e){
  e.preventDefault()
  if(password.length>8){
    try{
      axios.post("http://localhost:3001/api/auth/register",{
      first:first,
      last:last,
      email:email,
      password:password,
      role:role
    }).then((response)=>{
      if(response.data=="exists"){
        toast.error("User with email already exists.")
      } else {
        toast.success("Registration Successful. Sign In To Continue.")
        
      }
    })
      
    } catch (err){
      toast.error("Registration Unsuccessful.")
    }

  } else {
    toast.error("Password is too short. Password must be longer than 8 characters.")
  }
  
  
  
}
  return (
    <div className='register-page'>
      <h5>Register</h5>
      <div className='register-form-container'>
      
      <form autoComplete="off" className='register-form' onSubmit={onSubmit}>
        <div className='register-form-control-container'>
        <label htmlFor='first_name'>First Name</label>
        <br/><br/>
        <input value={first} 
        placeholder="First Name"
        onChange={(e)=>setFirst(e.target.value)}
        type="text" name='first_name'/>
        </div>

        <div className='register-form-control-container'>
        <label htmlFor='last_name'>Last Name</label>
        <br/><br/>
        <input value={last} 
        placeholder="Last Name"
        onChange={(e)=>setLast(e.target.value)}
        type="text" name='last_name'/>
        </div>

        <div className='register-form-control-container'>
        <label htmlFor='email'>Email</label>
        <br/><br/>
        <input value={email} 
        placeholder="Email"
        onChange={(e)=>setEmail(e.target.value)}
        type="email" name='email'/>
        </div>
        
        <div className='login-form-control-container'>
        <label htmlFor='password'>Password</label>
        <br/><br />
        <input value={password}
        readOnly={isReadonly} 
        onFocus={()=>setIsReadonly(prevState=>!prevState)}
        placeholder="Password"
        onChange={(e)=>setPassword(e.target.value)}
        type="password" name='password' autoComplete='new-password'/>
        </div>

        <div className='login-form-control-container'>
        <label htmlFor='role'>Role</label>
        <br/><br />
        <input type="radio" name="role" value="2"
        onChange={(e)=>setRole(e.target.value)}
        /> Buyer
        <input type="radio" name="role" value="3"
        onChange={(e)=>setRole(e.target.value)}
        />Seller
        </div>

        <input type="submit" value="Register" name='register-btn' className='register-btn'/>
        <ToastContainer />
        <br />
        <Link to='/login' className='login-link'>Have an Account? Log In</Link>
      </form>
      </div>
    </div>
  )
}

export default Register