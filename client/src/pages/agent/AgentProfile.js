import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'

const AgentProfile = () => {
    const [user, setUser] = useState([])
    const [first,setFirst]=useState('')
    const [last,setLast]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [cpassword,setCPassword]=useState('')
    const user_id = window.localStorage.getItem("agent")
    function fetchUser(){
        fetch( `http://localhost:3001/api/user/getuser/${user_id}`).then((result)=>{
           result.json().then((resp)=>{
            console.log(resp)
           setUser(resp);
           setFirst(resp.first_name)
           setLast(resp.last_name)
           setEmail(resp.email)
        //    setPassword(resp.password)
           })
        })
     }
     useEffect(()=>{
        fetchUser()
     },[])

     function onSubmit(e){
        e.preventDefault()
        if(password==cpassword){
         if(password.length<8){
            toast.error("Password must have more than 8 characters.")
         } else{
            try{
                axios.put(`http://localhost:3001/api/user/updatedetails/${user_id}`,{
                first:first,
                last:last,
                email:email,
                password:password,
              }).then((response)=>{
                if(response.data=="success"){
                    setTimeout(()=>{
                        window.location.assign("/authuser/agent")
                    },1700)
                  toast.success("Updated Successfully.")
                } else {
                  toast.success("Update unsuccessful.")
                  
                }
              })
                
              } catch (err){
                toast.error("Update Unsuccessful.")
              }
            }

        } else {
            toast.error("Passwords do not match.")
        }
        

     }

  return (
    <section className="form-container">
    <form action="" method="post" onSubmit={onSubmit}>
       <h3>update your account</h3>
       <input required defaultValue={first} onChange={(e)=>setFirst(e.target.value)} type="text" name="f_name" maxlength="50" placeholder="First Name" className="box"/>
       <input required defaultValue={last} onChange={(e)=>setLast(e.target.value)}
        type="text" name="l_name" maxlength="50" placeholder="Last Name" className="box"/>
       <input required defaultValue={email} onChange={(e)=>setEmail(e.target.value)} 
       type="email" name="email" maxlength="50" placeholder="Email" className="box"/>
       <input required defaultValue={password} onChange={(e)=>setPassword(e.target.value)} 
        type="password" name="new_pass" maxlength="20" placeholder="Enter New Password" className="box"/>
       <input required defaultValue={cpassword} onChange={(e)=>setCPassword(e.target.value)} 
        type="password" name="c_pass" maxlength="20" placeholder="Confirm Your New Password" className="box"/>
       <input type="submit" value="update" name="submit" className="btn"/>
    </form>
    <ToastContainer/>
 
 </section>
  )
}

export default AgentProfile