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
    function beginSearch(){
        try{
            axios.post("http://localhost:3001/api/property/startprocess",{
            user_id:lastItem,
            property_id:property_id
          }).then((response)=>{
            if(response.data=="exists"){
                  toast.warn("Search has already been initiated.")
              } else if(response.data=="success"){
                  toast.success("Search process has began.")
              }
          })
          
          } catch (err){
            toast.error("Error.")
          }
    }
    function endSearch(){
        try{
            axios.delete(`http://localhost:3001/api/property/deleteprocess/${lastItem}`,{
                params:{
                    property_id:property_id
                }
          }).then((response)=>{
            if(response.data=="success"){
                toast.success("Search process terminated.")
            }

          })
          } catch (err){
            toast.error("Error.")
          }

    }
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
        <div className='!block'>
        <h2 className=' text-center text-2xl mb-8'>Send Feedback</h2>
        <div className='chat_list'>
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
            <form onSubmit={onSubmit}>
            <div className=' !m-auto flex justify-evenly !mt-12 login-form-control-container'>
            <input value={inquiry}
              onChange={(e)=>sendInquiry(e.target.value)}
             className='finput !w-96'
            placeholder="Send feedback"
            type="text" name='text'/>
            <input type="submit" value="Send" name='login-btn' className='login-btn'/>
            </div>
            </form>

            </div>
      )
}

export default Chats