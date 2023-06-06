import axios from 'axios'
import React from 'react'
import { toast, ToastContainer } from 'react-toastify'
import '../../../assets/css/listings.css'
import Listing from './Listing'


const Listings = ({properties}) => {
  
  function deleteProperty(property_id){
    try{
      axios.delete(`http://localhost:3001/api/property/deleteproperty/${property_id}`,{
    })
    setTimeout(()=>{
      window.location.reload()
    },1800)
    
    toast.success("Property Deleted.")
    } catch (err){
      toast.error("Error.")
    }
  }
  return (
    <div className='crypto_list'>
      {properties.map((property, index) => {
          return (
              <Listing
                  key={index}
                  property_id={property.property_id}
                  image={property.image_01}
                  name={property.property_name}
                  price={property.price}
                  valuated={property.valuated}
                  address={property.address}
                  type={property.type}
                  offer={property.offer}
                  propertystatus={property.status}
                  furnished={property.furnished}
                  deleteProperty={()=>deleteProperty(property.property_id)}
              />
          );
      })}
      <ToastContainer />
        </div>
  )
}

export default Listings