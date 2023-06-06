import React from 'react'
import '../../assets/css/services.css'
import icon1 from '../../assets/images/icon-1.png'
import icon3 from '../../assets/images/icon-3.png'
import icon4 from '../../assets/images/icon-4.png'

const Services = () => {
  return (
    <div className='w-full h-full'>
        <section className="services">

<h1 className="heading">our services</h1>

<div className="box-container">

   <div className="box">
      <img src={icon1} alt=""/>
      <h3>buy property</h3>
      <p>Find your place with an immersive photo experience and the most listings, including things you won't  anywhere else.</p>
   </div>

   

   <div className="box">
      <img src={icon3} alt=""/>
      <h3>sell property</h3>
      <p>No matter what path you take to sell your home, we can help you navigate a successful sale. This is the place to be.</p>
   </div>

   <div className="box">
      <img src={icon4} alt=""/>
      <h3>lease property</h3>
      <p>Discover a place that checks all of your boxes. Filter your rental search, and find exactly what you're looking for.</p>
   </div>

</div>

</section>
    </div>
  )
}

export default Services