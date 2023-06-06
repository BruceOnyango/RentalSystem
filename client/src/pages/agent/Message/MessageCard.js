import React, { useEffect, useState } from 'react'
import '../../../assets/css/message.css'
import '../../../assets/css/button.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsd, faHouse, faTag, faTrowel, faCouch, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { useLocation } from 'react-router-dom'

const MessageCard = ({ image, e_message, first_name, last_name, property_id,name,creation_time,enquiry_id, user_id}) => {
    const [inIndex, setInIndex] = useState(false);

    const location=useLocation()
      useEffect(() => {
        //Checks if location.pathname is not "/".
        location.pathname==="/seller/home"?setInIndex(true):setInIndex(false)
      }, [location.pathname, inIndex]);
    const openMessage=(property_id)=>{
        window.location.assign(`/authuser/agent/userenquiries/${user_id}`)
        window.localStorage.setItem("propertyID",property_id)
        window.localStorage.setItem("enquiry_id",enquiry_id)
    }
    return (
    
      <div onClick={()=>openMessage(property_id)} className='card flex justify-evenly w-3/4 h-60'>
        <div className='card_image h-full'>
            <img src={require(`../../../assets/uploads/${image}`)} alt='' />
        </div>
        <div className=' text-center relative'>
            <div className='flex justify-evenly text-center align-middle'>
                <h1 className=' text-2xl'>{name}</h1>
                <div className='mx-5'>
                <h2>{first_name}</h2> 
                <h2>{last_name}</h2><br/>
                </div>
            </div>
        
        <p className=' '>{e_message}</p>
        <p className=' ml-32 mt-20 absolute'>{creation_time}</p>
        </div>
        
        </div>
    )
}

export default MessageCard