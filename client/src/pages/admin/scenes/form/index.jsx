import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
// import useMediaQuery from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useEffect, useState } from "react";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
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

  const sendData = () => {

    try{
      axios.post("http://localhost:3001/api/auth/register",{
      first:first,
      last:last,
      email:email,
      password:"password",
      role:role
    }).then((response)=>{
      if(response.data=="exists"){
        toast.error("User with email already exists.")
      } else {
        toast.success("Registration Successful.")
        
      }
    })
      
    } catch (err){
      toast.error("Registration Unsuccessful.")
    }
    
  };

  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />

      <Formik
        // onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          errors,
          touched,
          handleBlur,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={(e)=>setFirst(e.target.value)}
                value={first}
                name="firstName"
                error={!!touched.first && !!errors.first}
                helperText={touched.first && errors.first}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={(e)=>setLast(e.target.value)}
                value={last}
                name="lastName"
                error={!!touched.last && !!errors.last}
                helperText={touched.last && errors.last}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={(e)=>setEmail(e.target.value)}
                value={email}
                name="email"
                // error={!!touched.email && !!errors.email}
                // helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <div className='login-form-control-container'>
        <label htmlFor='role'>Role</label>
        <br/><br />
        <input type="radio" name="role" value="1"
        onChange={(e)=>setRole(e.target.value)}
        />Admin
        <input type="radio" name="role" value="4"
        onChange={(e)=>setRole(e.target.value)}
        />Agent
        <input type="radio" name="role" value="5"
        onChange={(e)=>setRole(e.target.value)}
        />Valuer
        </div>
              
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button onClick={sendData} color="secondary" variant="contained">
                Create New User
              </Button>
              <ToastContainer/>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  emailName: yup.string().email("invalid email").required("required"),
});
const initialValues = {
  firstName: "",
  lastName: "",
  emailName: "",

};

export default Form;
