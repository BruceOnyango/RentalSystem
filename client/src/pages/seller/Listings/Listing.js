import React, { useEffect, useState } from 'react'
import '../../../assets/css/listing.css'
import '../../../assets/css/button.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsd, faHouse, faTag, faTrowel, faCouch, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

const Listing = ({ image, name, price, type, offer, propertystatus, furnished, address, property_id,valuated, deleteProperty }) => {
  const [inIndex, setInIndex] = useState(false);

  const location=useLocation()
    useEffect(() => {
      //Checks if location.pathname is not "/".
	  location.pathname==="/seller/home"?setInIndex(true):setInIndex(false)
    }, [location.pathname, inIndex]);
  const openProperty=(property_id)=>{
    window.location.assign(`/seller/property/${property_id}`)
  }
  const updateProperty=()=>{
    window.location.assign(`/seller/updateproperty/${property_id}`)
  }
  
  
  const payEvaluation=(property_id)=>{
    window.location.assign(`/seller/payment/${property_id}`)
  }
  return (
  
    <div className='card'>
      <div className='card_image'>
          <img src={require(`../../../assets/uploads/${image}`)} alt='' />
      </div>
      <div className='card_info'>
          <h2>{name}</h2>
          <h3><FontAwesomeIcon className='faicons' icon={faUsd} />{price.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</h3>
          <h3 className='!text-gray-700'><FontAwesomeIcon className='faicons' icon={faMapMarkerAlt} />{address}</h3>
          <div className='flex align-middle justify-between mt-4'>
          <h2><FontAwesomeIcon className='faicons' icon={faHouse} />{type}</h2>
          <h2><FontAwesomeIcon className='faicons' icon={faTag} />{offer}</h2>
          </div>
          <div className='flex align-middle justify-between'>
          <h2><FontAwesomeIcon className='faicons' icon={faTrowel} />{propertystatus}</h2>
          <h2><FontAwesomeIcon className='faicons' icon={faCouch} />{furnished}</h2>
          </div>
          <div className='flex align-middle justify-between'>
            <button className='vbutton '  onClick={updateProperty}>Update</button>
            <button className='vbutton ' onClick={deleteProperty} >Delete</button>
          </div>
          <div className='flex align-middle justify-between'>
            {inIndex?<button className='vbutton text-center' onClick={()=>payEvaluation(property_id)}>Pay Valuation</button>:
            <button className='vbutton text-center' onClick={()=>openProperty(property_id)}>View Property</button>}
            <h2 className={valuated=='Approved'?'!text-green-500 !font-black':valuated=='Declined'?'!text-red-600 !font-black':'!text-yellow-400 !font-black'}>
            {valuated}</h2>

          </div>
      </div>
      {/* <ToastContainer/> */}
      </div>
  )
}

export default Listing