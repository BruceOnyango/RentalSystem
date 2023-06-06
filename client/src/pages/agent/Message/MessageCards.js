import axios from 'axios'
import React from 'react'
import { toast, ToastContainer } from 'react-toastify'
import '../../../assets/css/listings.css'
import MessageCard from './MessageCard'

const MessageCards = ({properties}) => {
   
    function beginSearch(property_id){
        try{
          axios.put(`http://localhost:3001/api/property/updatedeclined/${property_id}`,{
        })
        setTimeout(()=>{
          window.location.reload()
        },1800)
        
        toast.success("Property Declined.")
        } catch (err){
          toast.error("Error.")
        }
      }
      function endSearch(property_id){
        try{
          axios.put(`http://localhost:3001/api/property/updateapproved/${property_id}`,{
        })
        setTimeout(()=>{
          window.location.reload()
        },1800)
        
        toast.success("Property Approved.")
        } catch (err){
          toast.error("Error.")
        }
      }
      return (
        <div className='crypto_list'>
          {properties.map((property, index) => {
              return (
                  <MessageCard
                      key={index}
                      enquiry_id={property.enquiry_id}
                      user_id={property.user_id}
                      property_id={property.property_id}
                      image={property.image_01}
                      name={property.property_name}
                      first_name = {property.first_name}
                      last_name={property.last_name}
                      e_message={property.e_message}
                      creation_time={property.creation_time}
    
                  />
              );
          })}
          <ToastContainer />
            </div>
      )
}

export default MessageCards