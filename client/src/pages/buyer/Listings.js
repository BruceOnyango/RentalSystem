import React from 'react'
import '../../assets/css/listings.css'
import Listing from './Listing'

const Listings = ({properties}) => {
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
                  address={property.address}
                  type={property.type}
                  offer={property.offer}
                  propertystatus={property.status}
                  furnished={property.furnished}
              />
          );
      })}
        </div>
  )
}

export default Listings