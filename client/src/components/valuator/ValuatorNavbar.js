import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHotel } from '@fortawesome/free-solid-svg-icons'
import { NavLink, useLocation } from 'react-router-dom'
import '../../assets/css/navbar.css'


const ValuatorNavbar = () => {
    const [loggedIn,setLoggedIn]  = useState(window.localStorage.getItem("valuerLoggedIn"))
    const [inIndex, setInIndex] = useState(false);
      const location=useLocation()
      useEffect(() => {
        location.pathname==="/authuser/login"?setInIndex(true):setInIndex(false)
      }, [location.pathname, inIndex]);
    const logout = ()=>{
      window.localStorage.removeItem("valuer")
      window.localStorage.removeItem("role")
      window.localStorage.removeItem("valuerLoggedIn")
      window.location.replace("/authuser/login")
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
                  <NavLink to='/authuser/valuer/valuerhome'>Home</NavLink>
              </li>
              <li>
                  <NavLink to='/authuser/valuer/valuerlistings'>All Listings</NavLink>
              </li>
          </ul>
      </nav>
      <nav className="navbar-links">
        <ul className="list-links">
          <li>
            <NavLink to='/authuser/valuer/valuerprofile'>Profile</NavLink>
          </li>
          <li>
            {loggedIn?<NavLink><button onClick={logout}>
              Logout</button></NavLink>:
            <NavLink to='login'>Login</NavLink>}
          </li>
        </ul>
      </nav>
      </header>
      </>
    )
}

export default ValuatorNavbar