import { useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/css/login.css'

const Login = () => {
  const [isReadonly, setIsReadonly] = useState(true);
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  function loginUser(email,password){
      setEmail(email)
      setPassword(password)
  }
  useEffect(()=>{
    const abortCont=new AbortController();
    loginUser(email,password,{signal:abortCont.signal})
    return()=>{
      // console.log('Login page aborted.')
      abortCont.abort()
    }
  },[email,password])
  const login =()=>{
    axios.post("http://localhost:3001/api/auth/login",{
      email:email,
      password:password
    }).then((response)=>{
      if(response.data=="wrong"){
        toast.warn("Wrong email and/ password.")
      } else if(response.data=="not found!"){
        toast.error("User with the email does not exist.")
      } else {      
        toast.success("Login Successful.")

      window.localStorage.setItem("role", response.data.user_role)
      if(response.data.user_role==2){
        window.localStorage.setItem("buyerLoggedIn", true)
        window.localStorage.setItem("buyer", response.data.user_id)
        setTimeout(()=>{
          window.location.replace("/home")
        },2000)
        
      } else if(response.data.user_role==3) {
        window.localStorage.setItem("sellerLoggedIn", true)
        window.localStorage.setItem("seller", response.data.user_id)
        setTimeout(()=>{
          window.location.replace("/seller/home")
        },2000)
      }
      console.log(response.data)
    }
    })
  }
  function onSubmit(e){
    e.preventDefault()
    login()
  }
  return (
    <div className='login-page'>
      <h5>Login</h5>
      <div className='login-form-container'>
      
      <form autoComplete="off" className='login-form' onSubmit={onSubmit}>
        <div className='login-form-control-container'>
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
        <input type="submit" value="Login" name='login-btn' className='login-btn'/>
        <ToastContainer />
        <br />
        <Link to='/register' className='register-link'>Create an Account?</Link>
      </form>
      </div>
    </div>
  )
}

export default Login