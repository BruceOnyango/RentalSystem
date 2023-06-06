import React, { useEffect, useState } from 'react'
import '../../../assets/css/chat.css'
import '../../../assets/css/button.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsd, faHouse, faTag, faTrowel, faCouch, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { useLocation } from 'react-router-dom'
const Chat = ({f_message, e_message,enquiry_id}) => {
    const [inIndex, setInIndex] = useState(false);

    const location=useLocation()
      useEffect(() => {
        //Checks if location.pathname is not "/".
        location.pathname==="/seller/home"?setInIndex(true):setInIndex(false)
      }, [location.pathname, inIndex]);
    const openMessage=(property_id)=>{
        window.location.assign(`/authuser/agent/userenquiries/${enquiry_id}`)
    }
    return (
        <>
        <div className='card_out w-full m-auto'>
      <div onClick={openMessage} className='card w-fit h-fit'>
        <h2>{e_message}</h2>
        </div>
        <div onClick={openMessage} className='!ml-80 card w-48 h-fit'>
        <h2 className=''>{f_message}</h2>
        </div>
        </div>
        </>
    )
}

export default Chat