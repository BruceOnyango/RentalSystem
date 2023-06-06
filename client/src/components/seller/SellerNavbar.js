import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHotel } from '@fortawesome/free-solid-svg-icons'
import { NavLink, useLocation } from 'react-router-dom'
import '../../assets/css/navbar.css'

const SellerNavbar = () => {
  const [loggedIn,setLoggedIn]  = useState(window.localStorage.getItem("sellerLoggedIn"))
  const [inIndex, setInIndex] = useState(false);
    const location=useLocation()
    useEffect(() => {
      //Checks if location.pathname is not "/".
	  location.pathname==="/login"||location.pathname==="/register"?setInIndex(true):setInIndex(false)
    }, [location.pathname, inIndex]);
  // const loggedIn = window.localStorage.getItem("isLoggedIn")
  const logout = ()=>{
    window.localStorage.removeItem("seller")
    window.localStorage.removeItem("role")
    window.localStorage.removeItem("sellerLoggedIn")
    window.location.replace("/")
  }
  useEffect(()=>{
    setLoggedIn(loggedIn)
  },[loggedIn])
  return (
    <>
    <header className={`header ${inIndex?'!hidden':'visible'}`}>
    <nav className="logo-title">
      <h3>E-Mali</h3>
      <FontAwesomeIcon className='theme-button' icon={faHotel} size='2x'/>

    </nav>
    <nav className="navbar-links">
        <ul className="list-links">
            <li>
                <NavLink to='/seller/home'>Home</NavLink>
            </li>
            <li>
                <NavLink to='seller/mylistings'>My Listings</NavLink>
            </li>
            <li>
                <NavLink to='/seller/postproperty'>Post Property</NavLink>
            </li>
        </ul>
    </nav>
    <nav className="navbar-links">
      <ul className="list-links">
        <li>
          <NavLink to='/seller/profile'>Profile</NavLink>
        </li>
        <li>
          {loggedIn?<NavLink><button onClick={logout}>
            Logout</button></NavLink>:
          <NavLink to='login'>Login</NavLink>}
          {/* <NavLink to='login'>Login</NavLink> */}
        </li>
      </ul>
    </nav>
    </header>
    </>
  )
}

export default SellerNavbar