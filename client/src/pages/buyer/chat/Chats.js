import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import '../../../assets/css/listings.css'
import Chat from './Chat'

const Chats = ({enquiries}) => {
    const location = useLocation()
   const thePath = location.pathname
   const lastItem = thePath.substring(thePath.lastIndexOf('/') + 1)
   const enquiry_id  = window.localStorage.getItem("enquiry_id")
   const property_id  = window.localStorage.getItem("propertyID")

    const [inquiry, sendInquiry] = useState('')

    function loginUser(inquiry){
        sendInquiry(inquiry)
    }
    useEffect(()=>{
      const abortCont=new AbortController();
      loginUser(inquiry,{signal:abortCont.signal})
      return()=>{
        abortCont.abort()
      }
    },[inquiry])
    
    
    function onSubmit(e){
        e.preventDefault()
        try{
          axios.post("http://localhost:3001/api/feedback/returnfeedback",{
          f_message:inquiry,
          enquiry_id:enquiry_id
        }).then((response)=>{
          if(response.data=="success"){
            setTimeout(()=>{
                window.location.reload()
            },1400)
            toast.success("Feedback Successful.")
          } else {
            toast.error("Feedback Unsuccessful.")
          }
        })
          
        } catch (err){
          toast.error("Feedback Unsuccessful.")
        }
        
        
      }
      return (
        <>
        <div className='chat_lists'>
          {enquiries.map((property, index,getProperty) => {
            
              return (
                  <Chat
                      key={index}
                      enquiry_id={property.enquiry_id}
                      property_id={property.property_id}
                      image={property.image_01}
                      name={property.property_name}
                      first_name = {property.first_name}
                      last_name={property.last_name}
                      e_message={property.e_message}
                      f_message={property.f_message}
                      creation_time={property.creation_time}
                      getProperty={getProperty}
    
                  />
              );
          })}
          <ToastContainer />
            </div>
            </>
      )
}

export default Chats