import React, { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from '../components/buyer/Navbar'
import SellerHome from '../pages/seller/SellerHome'
import MyListings from '../pages/seller/MyListings'
import SellerPayment from '../pages/seller/SellerPayment'
import SellerProfile from '../pages/seller/SellerProfile'
import PostProperty from '../pages/seller/PostProperty'
import UpdateProperty from '../pages/seller/UpdateProperty'


import Home from '../pages/buyer/Home'
import Property from '../pages/buyer/Property'
import Listings from '../pages/buyer/Listings'
import Listing from '../pages/buyer/Listing'
import Payment from '../pages/buyer/Payment'
import Receipt from '../pages/buyer/Receipt'
import Saved from '../pages/buyer/Saved'
import Login from '../components/auth/Login'
import Properties from '../pages/buyer/Properties'
import Registration from '../components/auth/Registration'
import SellerNavbar from '../components/seller/SellerNavbar'

import ValuatorListings from '../pages/valuator/ValuatorListings'
import ValuatorHome from '../pages/valuator/ValuatorHome'
import ValuatorProfile from '../pages/valuator/ValuatorProfile'
import ValuatorNavbar from '../components/valuator/ValuatorNavbar'
import AuthLogin from '../components/authuser/AuthLogin'
import AgentHome from '../pages/agent/AgentHome'
import AgentListings from '../pages/agent/AgentListings'
import Process from '../pages/agent/Process'
import UserEnquiries from '../pages/agent/UserEnquiries'
import AgentNavbar from '../components/agent/AgentNavbar'
import AgentProfile from '../pages/agent/AgentProfile'
import MessageCard from '../pages/agent/Message/MessageCard'
import Messages from '../pages/agent/Messages'

import Contact from '../pages/admin/scenes/contacts'
import Properc from '../pages/admin/scenes/property'


import Topbar from "../pages/admin/scenes/global/Topbar";
import Sidebar from "../pages/admin/scenes/global/Sidebar";
import Dashboard from "../pages/admin/scenes/dashboard";
import Team from "../pages/admin/scenes/team";
import Properts from "../pages/admin/scenes/properties"
import Invoices from "../pages/admin/scenes/invoices";
import Bar from "../pages/admin/scenes/bar";
import Form from "../pages/admin/scenes/form";
import PropertyForm from "../pages/admin/scenes/propertyform";
import Line from "../pages/admin/scenes/line";
import Pie from "../pages/admin/scenes/pie";
import Success from '../pages/buyer/Success'
import Cancel from '../pages/buyer/Cancel'
import SellerCancel from '../pages/seller/SellerCancel'
import SellerSuccess from '../pages/seller/SellerSuccess'
import SellerProperty from '../pages/seller/SellerProperty'
import ValuerProperty from '../pages/valuator/ValuerProperty'
import AgentProperty from '../pages/agent/ValuerProperty'
import AdminProfile from '../pages/admin/scenes/updateform'
import UsersProfile from '../pages/admin/scenes/updateuserform'
import BuyerProfile from '../pages/buyer/BuyerProfile'
import UpdatePropertyForm from '../pages/admin/scenes/updatepropertyform'





const RoutesHandler = () => {
  const [isSidebar, setIsSidebar] = useState(true);
  const [role,setRole]  = useState(window.localStorage.getItem("role"))
  useEffect(()=>{
    setRole(role)
  },[role])
  const location=useLocation()
  const thePath = location.pathname
  const lastItem = thePath.substring(thePath.lastIndexOf('/') + 1)
    
  return (
    <div className={`${role=="1"?"app":""}`}>
            {role=="1"?<Sidebar isSidebar={isSidebar} />:role=="2"?<Navbar/>:role=="3"?<SellerNavbar/>:role=="4"?<AgentNavbar/>:role=="5"?<ValuatorNavbar/>:<Navbar/>}
      <main className={`${role=="1"?"content":""}`}>
    {/* {(() => {
       if (role==2) {
          return (
            <Navbar/>
          )
        } else if (role==3) {
          return (
            <SellerNavbar/>
          )
        } if (role==4) {
          return (
            <AgentNavbar/>
          )
        } if (role==5) {
          return (
            <ValuatorNavbar/>
          )
        } else if(lastItem=="login"){
          return (
            <h2></h2>
          )

        } else {
          return (
            <Navbar/>
          )
        }
      })()} */}
      {role=="1"?<Topbar setIsSidebar={setIsSidebar} />:null}
      <Routes location={location} key={location.pathname}>
      <Route path='/' element={<Home />}/>
      <Route path={`/success/${lastItem}`} element={<Success />}/>
      <Route path={`/cancel/${lastItem}`} element={<Cancel />}/>
      <Route path='/home' element={<Home />}/>
      <Route path='/listings' element={<Listings />}/>
      <Route path='/listing' element={<Listing />}/>
      <Route path='/properties' element={<Properties />}/>
      <Route path={`/property/${lastItem}`} element={<Property />}/>
      <Route path={`/payment/${lastItem}`} element={<Payment />}/>
      <Route path='/receipt' element={<Receipt />}/>
      <Route path='/saved' element={<Saved />}/>
      <Route path='/profile' element={<BuyerProfile />}/>
      <Route path='/register' element={<Registration />}/>
      <Route path='/login' element={<Login />}/>

      <Route path='/authuser/login' element={<AuthLogin />}/>
      {/* <Route path='/cases' element={<Cases />}/>
      <Route path='/contact' element={<Contact />}/> */}
      <Route path={`/seller/success/${lastItem}`} element={<SellerSuccess />}/>
      <Route path={`/seller/cancel/${lastItem}`} element={<SellerCancel />}/>
      <Route path='/seller/home' element={<SellerHome />}/>
      <Route path='/seller/mylistings' element={<MyListings />}/>
      <Route path={`/seller/payment/${lastItem}`} element={<SellerPayment />}/>
      <Route path={`/seller/property/${lastItem}`} element={<SellerProperty />}/>

      <Route path='/seller/postproperty' element={<PostProperty />}/>
      <Route path='/seller/profile' element={<SellerProfile />}/>
      
      <Route path={`/seller/updateproperty/${lastItem}`} element={<UpdateProperty />}/>

      <Route path={`/authuser/valuer`} element={<ValuatorHome />}/>
      <Route path={`/authuser/valuer/property/${lastItem}`} element={<ValuerProperty />}/>
      <Route path={`/authuser/valuer/valuerlistings`} element={<ValuatorListings />}/>
      <Route path={`/authuser/valuer/valuerhome`} element={<ValuatorHome />}/>
      <Route path={`/authuser/valuer/valuerprofile`} element={<ValuatorProfile />}/>

      <Route path={`/authuser/agent`} element={<Messages />}/>
      <Route path={`/authuser/agent/property/${lastItem}`} element={<AgentProperty />}/>
      <Route path={`/authuser/agent/listings`} element={<AgentListings />}/>
      <Route path={`/authuser/agent/process`} element={<Process />}/>
      <Route path={`/authuser/agent/profile`} element={<AgentProfile />}/>
      <Route path={`/authuser/agent/userenquiries/${lastItem}`} element={<UserEnquiries />}/>
      {/* <Route path={`/authuser/agent/messages`} element={<Messages />}/> */}

      <Route path="/authuser/" element={<AuthLogin />} />


      <Route path="/authuser/admin" element={<Dashboard />} />
      <Route path="/authuser/admin/users" element={<Team />} />
      <Route path="/authuser/admin/properties" element={<Properts />} />
      <Route path="/authuser/admin/usercontacts" element={<Contact />} />
      <Route path="/authuser/admin/propertycontacts" element={<Properc />} />
      <Route path={`/authuser/admin/updatepropertyform/${lastItem}`} element={<UpdatePropertyForm />}/>

      <Route path="/authuser/admin/invoices" element={<Invoices />} />
      <Route path="/authuser/admin/updateform" element={<AdminProfile />} />

      <Route path={`/authuser/admin/updateuserform/${lastItem}`} element={<UsersProfile />}/>

      <Route path="/authuser/admin/form" element={<Form />} />
      <Route path="/authuser/admin/propertyform" element={<PropertyForm />} />
      <Route path="/authuser/admin/bar" element={<Bar />} />
      <Route path="/authuser/admin/pie" element={<Pie />} />
      <Route path="/authuser/admin/line" element={<Line />} />

      <Route path={`/test`} element={<Messages />}/>
    </Routes>
    </main>
    </div>
  )
}

export default RoutesHandler