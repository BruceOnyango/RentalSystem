import React, { useEffect, useState } from 'react'
import '../../../assets/css/listing.css'
import '../../../assets/css/button.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsd, faHouse, faTag, faTrowel, faCouch, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { useLocation } from 'react-router-dom'

const Listing = ({ image, name, price, type, offer, propertystatus, furnished, address, property_id,valuated, transfer,terminateTransfer,completeTransfer,search,searchComplete,searchDeclined,beginSearch }) => {
  const [inIndex, setInIndex] = useState(false);

  const location=useLocation()
    useEffect(() => {
      //Checks if location.pathname is not "/".
	  location.pathname==="/seller/home"?setInIndex(true):setInIndex(false)
    }, [location.pathname, inIndex]);
  const openProperty=(property_id)=>{
    window.location.assign(`/authuser/agent/property/${property_id}`)
  }
  if(transfer==""){
    return(
      <h2 className=' text-2xl text-center'>No Tickets have been pushed yet.</h2>
    )
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
          <div className='flex justify-between'>
          {search=="Begin"&&transfer=="no"?<button onClick={beginSearch} className=' vbutton'>Begin Search</button>
          :null}
          <h2 className={search=='Success'?'!text-green-500 !font-black':search=='Terminate'?'!text-red-600 !font-black':'!text-yellow-400 !font-black'}>
            {search}</h2>
          </div>

          <div className='flex justify-between'>
          {search=="Progress"&&transfer=="no"?
          <>
          <button onClick={searchComplete} className=' vbutton'>Search Complete</button>
          <button onClick={searchDeclined} className=' vbutton '>Search Declined</button>
          </>
          :null}

        {search=="Success"&&transfer=="no"?
          <>
          <button onClick={completeTransfer} className=' vbutton'>Transfer Complete</button>
          <button onClick={terminateTransfer} className=' vbutton '>Transfer Declined</button>
          </>
          :null}
          </div>

          <div className='flex align-middle justify-between'>
            <button className=' vbutton text-center' onClick={()=>openProperty(property_id)}>View Property</button>
            <h2 className={valuated=='Approved'?'!text-green-500':valuated=='Declined'?'!text-red-600':'!text-yellow-400'}>
            {valuated}</h2>

          </div>
      </div>
      {/* <ToastContainer/> */}
      </div>
  )
}

export default Listing