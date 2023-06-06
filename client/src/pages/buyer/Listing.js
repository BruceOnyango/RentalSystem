import React from 'react'
import '../../assets/css/listing.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsd, faHouse, faTag, faTrowel, faCouch, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

const Listing = ({ image, name, price, type, offer, propertystatus, furnished, address, property_id }) => {
  const openProperty=(property_id)=>{
    window.location.assign(`/property/${property_id}`)
  }
  return (
    <div className='card' onClick={()=>openProperty(property_id)}>
      <div className='card_image'>
          <img src={require(`../../assets/uploads/${image}`)} alt='' />
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
      </div>
      </div>
  )
}

export default Listing