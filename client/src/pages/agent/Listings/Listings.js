import axios from 'axios'
import React from 'react'
import { toast, ToastContainer } from 'react-toastify'
import '../../../assets/css/listings.css'
import Listing from './Listing'


const Listings = ({properties}) => {

  function beginSearch(process_id){
    try{
      axios.put(`http://localhost:3001/api/property/updatesearch/${process_id}`,{
        search:'Progress',
    })
    setTimeout(()=>{
      window.location.reload()
    },1800)
    
    toast.success("Search has began.")
    } catch (err){
      toast.error("Error.")
    }
  }

  function searchComplete(process_id){
    try{
      axios.put(`http://localhost:3001/api/property/updatesearch/${process_id}`,{
        search:'Success',
    })
    setTimeout(()=>{
      window.location.reload()
    },1800)
    
    toast.success("Search was successful.")
    } catch (err){
      toast.error("Error.")
    }
  }

  function searchDeclined(process_id){
    try{
      axios.put(`http://localhost:3001/api/property/updatesearch/${process_id}`,{
        search:'Declined',
    })
    setTimeout(()=>{
      window.location.reload()
    },1800)
    
    toast.success("Search was unsuccessful.")
    } catch (err){
      toast.error("Error.")
    }
  }
  
  function completeTransfer(process_id){
    try{
      axios.put(`http://localhost:3001/api/property/updatetransfer/${process_id}`,{
        transfer:'yes',
    })
    setTimeout(()=>{
      window.location.reload()
    },1800)
    
    toast.success("Transfer Complete.")
    } catch (err){
      toast.error("Error.")
    }
  }
  function terminateTransfer(process_id){
    try{
      axios.put(`http://localhost:3001/api/property/updatetransfer/${process_id}`,{
        transfer:'no',
    }).then((response)=>{
      console.log(response.data)
    })
    setTimeout(()=>{
      window.location.reload()
    },1800)
    
    toast.success("Transfer Cancelled.")
    } catch (err){
      toast.error("Error.")
    }
  }
  return (
    <div className='crypto_list'>
      {properties.map((property, index) => {
          return (
              <Listing
                  transfer={property.transfer}
                  search={property.search}
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
                  searchComplete={()=>searchComplete(property.process_id)}
                  searchDeclined={()=>searchDeclined(property.process_id)}
                  beginSearch={()=>beginSearch(property.process_id)}

                  completeTransfer={()=>completeTransfer(property.process_id)}
                  terminateTransfer={()=>terminateTransfer(property.process_id)}

              />
          );
      })}
      <ToastContainer />
        </div>
  )
}

export default Listings