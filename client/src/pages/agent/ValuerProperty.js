import React, { useEffect, useState } from 'react'
import '../../assets/css/property.css'
import { useLocation, useNavigate} from "react-router-dom";
import axios from 'axios'
import { ToastContainer,toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faCalendar, faHouse, faTag, faUser, faCheck, faTimes, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';




const AgentProperty = () => {
   const navigate = useNavigate()
   
   const makepurchase=()=>{
      navigate(`/payment/${property.property_id}`)
   }
   const proceedpurchase=()=>{
      try{
         axios.post("http://localhost:3001/api/property/startprocess",{
         property_id:lastItem,
         user_id:user_id,
         transfer:"no",
         search:"Begin"
       }).then((response)=>{
         if(response.data=="exists"){
           toast.warn("Search has already been inititiated.")
         } else {
           toast.success("Search process has began.")
           
         }
       })
         
       } catch (err){
         toast.error("Registration Unsuccessful.")
       }
   }
   const terminatepurchase=()=>{
      navigate("/payment")
   }
   const [property, setProperty] = useState([])
   const [saved, setSaved] = useState([])
   const [process, setProcess]=useState([])
   const [user, setUserData] = useState([])
   const [inquiry, setInquiry] = useState()
   const [feedback, setFeedback] = useState([])

   const user_id = window.localStorage.getItem("buyer")
   const location = useLocation()
   const thePath = location.pathname
   const lastItem = thePath.substring(thePath.lastIndexOf('/') + 1)

    useEffect(() => {
      async function fetchUserData(){
         const  response =  await axios.get(
             `http://localhost:3001/api/user/getuser/${user_id}`
         );
         // console.log(response.data)
         setUserData(response.data);
     }
     async function fetchProcess(){
      const  response =  await axios.get(
          `http://localhost:3001/api/property/getprocessbyup/${lastItem}`,{
           params:{
            user_id:user_id
           }
          }
      );
      console.log(response.data)
      setProcess(response.data);
  }
     async function fetchSaved(){
      const  response =  await axios.get(
          `http://localhost:3001/api/property/findsaved/${lastItem}`
      );
      console.log(response.data)
      setSaved(response.data);
  }


     async function fetchFeedback(){
      const  response =  await axios.get(
          `http://localhost:3001/api/feedback/getfeedback/${user_id}`,{
               property_id:property.property_id,
          }
      )
      console.log(response.data)
      setFeedback(response.data)
  }
        async function fetchData(){
            const  response =  await axios.get(
                `http://localhost:3001/api/property/${lastItem}`
            );
            // console.log(response.data)
            setProperty(response.data);
        }
        fetchData()
        fetchUserData()
        fetchFeedback()
        fetchSaved()
        fetchProcess()
    }, []);
    function makeEnquiry(inquiry){
      setInquiry(inquiry)
  }
  useEffect(()=>{
    const abortCont=new AbortController();
    makeEnquiry(inquiry,{signal:abortCont.signal})
    return()=>{
      abortCont.abort()
    }
  },[inquiry])

    const sendInquiry=(property_id)=>{
      if(!user_id){
         toast.warning("Sign In to send inquiries.")
      } else {
         try{
            axios.post("http://localhost:3001/api/enquiry/makeenquiry",{
            message:inquiry,
            user_id:user_id,
            property_id:property_id
          })
          setTimeout(()=>{
            window.location.reload()
          },1300)
          toast.success("Enquiry Sent Successfuly.")
          } catch (err){
            toast.error("Enquiry Unsuccessful.")
          }
      }
   }

   const saveProperty=(property_id)=>{
      if(!user_id){
         toast.warning("Sign In to Save Properties.")
      } else {
         if(saved=="nothing"){
            try{
               axios.post("http://localhost:3001/api/property/saveproperty",{
               user_id:user_id,
               property_id:property_id
             })
             setTimeout(()=>{
               window.location.reload()
             },2000)
             toast.success("Property Saved.")
             } catch (err){
               toast.error("Error.")
             }
         } else {
            try{
               axios.delete(`http://localhost:3001/api/property/deletesaved/${lastItem}`,{
             })
             setTimeout(()=>{
               window.location.reload()
             },2000)
             
             toast.success("Property Removed from Saved.")
             } catch (err){
               toast.error("Error.")
             }
         }
         
      }

   }

  return (
    <>
    <section className="view-property !capitalize">

   <div className="details">
      <div className="thumb">
        <div className="big-image">
        <img src={`/uploads/${property.image_01}`} alt='' />
         </div>
         <div className="small-images">
         <img src={`/uploads/${property.image_01}`} alt='' />
         <img src={`/uploads/${property.image_02}`} alt='' />
         <img src={`/uploads/${property.image_03}`} alt='' />
         <img src={`/uploads/${property.image_04}`} alt='' />
         <img src={`/uploads/${property.image_05}`} alt='' />
         <img src={`/uploads/${property.image_06}`} alt='' />
         
         </div>
         
      </div>
      <h3 className="name">{property.property_name}</h3>
      <p className="location"><FontAwesomeIcon icon={faMapMarkerAlt}/><span>{property.address}</span></p>
      <div className="info">
         <p><FontAwesomeIcon className='faicons' icon={faTag}/><span>15 lac</span></p>
         <p><FontAwesomeIcon className='faicons' icon={faUser}/><span>{property.first_name} (owner)</span></p>
         <p><FontAwesomeIcon className='faicons' icon={faBuilding}/><span>{property.type}</span></p>
         <p><FontAwesomeIcon className='faicons' icon={faHouse}/><span>{property.offer}</span></p>
         <p><FontAwesomeIcon className='faicons' icon={faCalendar}/><span>{property.creation_time}</span></p>
      </div>
      <h3 className="title">details</h3>
      <div className="flex">
         <div className="box">
            <p><i>rooms :</i><span>2 BHK</span></p>
            <p><i>deposit amount :</i><span>{property.deposite}</span></p>
            <p><i>status :</i><span>{property.status}</span></p>
            <p><i>bedroom :</i><span>{property.bedroom}</span></p>
            <p><i>bathroom :</i><span>{property.bathroom}</span></p>
            <p><i>balcony :</i><span>{property.balcony}</span></p>
         </div>
         <div className="box">
            <p><i>carpet area :</i><span>{property.carpet_area} sqft</span></p>
            <p><i>age :</i><span>{property.age} years</span></p>
            <p><i>total floors :</i><span>{property.total_floors}</span></p>
            <p><i>furnished :</i><span>{property.furnished}</span></p>
         </div>
      </div>
      <h3 className="title">amenities</h3>
      <div className="flex">
         <div className="box">
            <p>{property.lift=="yes"?<FontAwesomeIcon className='faicons' icon={faCheck}/>:<FontAwesomeIcon className='faiconsr' icon={faTimes}/>}
               <span>lifts</span></p>
            <p>{property.security_guard=="yes"?<FontAwesomeIcon className='faicons' icon={faCheck}/>:<FontAwesomeIcon className='faiconsr' icon={faTimes}/>}
               <span>security guards</span></p>
            <p>{property.play_ground=="yes"?<FontAwesomeIcon className='faicons' icon={faCheck}/>:<FontAwesomeIcon className='faiconsr' icon={faTimes}/>}
               <span>play ground</span></p>
            <p>{property.garden=="yes"?<FontAwesomeIcon className='faicons' icon={faCheck}/>:<FontAwesomeIcon className='faiconsr' icon={faTimes}/>}
               <span>gardens</span></p>
            <p>{property.water_supply=="yes"?<FontAwesomeIcon className='faicons' icon={faCheck}/>:<FontAwesomeIcon className='faiconsr' icon={faTimes}/>}
               <span>water supply</span></p>
            <p>{property.power_backup=="yes"?<FontAwesomeIcon className='faicons' icon={faCheck}/>:<FontAwesomeIcon className='faiconsr' icon={faTimes}/>}
               <span>power backup</span></p>
         </div>
         <div className="box">
            <p>{property.parking_area=="yes"?<FontAwesomeIcon className='faicons' icon={faCheck}/>:<FontAwesomeIcon className='faiconsr' icon={faTimes}/>}
               <span>parking area</span></p>
            <p>{property.gym=="yes"?<FontAwesomeIcon className='faicons' icon={faCheck}/>:<FontAwesomeIcon className='faiconsr' icon={faTimes}/>}
               <span>gym</span></p>
            <p>{property.shopping_mall=="yes"?<FontAwesomeIcon className='faicons' icon={faCheck}/>:<FontAwesomeIcon className='faiconsr' icon={faTimes}/>}
               <span>shopping mall</span></p>
            <p>{property.hospital=="yes"?<FontAwesomeIcon className='faicons' icon={faCheck}/>:<FontAwesomeIcon className='faiconsr' icon={faTimes}/>}
               <span>hospital</span></p>
            <p>{property.school=="yes"?<FontAwesomeIcon className='faicons' icon={faCheck}/>:<FontAwesomeIcon className='faiconsr' icon={faTimes}/>}
               <span>schools</span></p>
            <p>{property.market_area=="yes"?<FontAwesomeIcon className='faicons' icon={faCheck}/>:<FontAwesomeIcon className='faiconsr' icon={faTimes}/>}
               <span>market area</span></p>
         </div>
      </div>
      <h3 className="title">description</h3>
      <p className="description">{property.description}</p>
      
      <ToastContainer />
   </div>

</section>

    
    </>
  )
}

export default AgentProperty