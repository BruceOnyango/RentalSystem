import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import '../../assets/css/style.css'

const UpdateProperty = () => {
   const user_id=window.localStorage.getItem("seller")
   const [file1, setFile1] = useState(null);
   const [file2, setFile2] = useState(null);
   const [file3, setFile3] = useState(null);
   const [file4, setFile4] = useState(null);
   const [file5, setFile5] = useState(null);
   const [file6, setFile6] = useState(null);
   const [property_name, setPropertyName]=useState('')
   const [property_price, setPrice]=useState()
   const [property_deposit, setDeposit]=useState()
   const [property_address, setAddress]=useState()
   const [property_offer, setOffer]=useState('sale')
   const [property_type, setType]=useState('house')

   const [property_status, setStatus]=useState('ready to move')
   const [property_furnished, setFurnished]=useState('furnished')
   const [property_bedrooms, setBedrooms]=useState(1)
   const [property_bathrooms, setBathrooms]=useState(1)
   const [property_balconys, setBalconys]=useState(1)
   const [property_carpet, setCarpet]=useState()

   const [property_totalfloors, setTotalFloors]=useState()
   const [property_age, setAge]=useState()
   const [property_description, setDescription]=useState('')

   const [lift,setLift]=useState('no')
   const [guard,setGuard]=useState('no')
   const [play,setPlay]=useState('no')
   const [garden,setGarden]=useState('no')
   const [water,setWater]=useState('no')
   const [backup,setBackup]=useState('no')

   const [park,setPark]=useState('no')
   const [gym,setGym]=useState('no')
   const [mall,setMall]=useState('no')
   const [hospital,setHospital]=useState('no')
   const [school,setSchool]=useState('no')
   const [market,setMarket]=useState('no')

   const [property, setProperty] = useState([])
   const location = useLocation()
   const thePath = location.pathname
   const lastItem = thePath.substring(thePath.lastIndexOf('/') + 1)

   const upload = async (file) => {
      try {
        const formData = new FormData();
        formData.append("file", file);
        const res = await axios.post("http://localhost:3001/api/upload", formData);
        return res.data;
      } catch (err) {
        console.log(err);
      }
    };

const updateProperties = async()=>{
   
}

   async function onSubmit(e){
      e.preventDefault()
      const imgUrl1 = await upload(file1);
      const imgUrl2 = await upload(file2);
      const imgUrl3 = await upload(file3);
      const imgUrl4 = await upload(file4);
      const imgUrl5 = await upload(file5);
      const imgUrl6 = await upload(file6);
      try{
         axios.put(`http://localhost:3001/api/property/updateproperty/${lastItem}`,{
            user_id: user_id,
            property_name: property_name,
            address:property_address,
            price:property_price,
            type:property_type,
            offer:property_offer,
            prop_status:property_status ,
            furnished:property_furnished,
            carpet_area:property_carpet,
            age:property_age,
            total_floors:property_totalfloors,
            deposite:property_deposit,
            bedroom:property_bedrooms ,
            bathroom:property_bathrooms,
            balcony:property_balconys,
            lift:lift,
            guard:guard,
            play:play,
            garden:garden,
            water:water,
            backup:backup,
            park:park,
            gym:gym,
            mall:mall,
            hospital:hospital,
            school:school,
            market:market,
            image_01: file1 ? imgUrl1 : "",
            image_02: file2 ? imgUrl2 : "",
            image_03: file3 ? imgUrl3 : "",
            image_04: file4 ? imgUrl4 : "",
            image_05: file5 ? imgUrl5 : "",
            image_06: file6 ? imgUrl6 : "",
   
            description: property_description,
            
         
       }).then((response)=>{
         if(response.data=="success"){
           toast.success("Property Updated Successfully.")
           setTimeout(()=>{
            window.location.assign("/seller/mylistings")
           },1500)
         } else {
            toast.error("Property Update Unsuccessful.")
   
         }
       })
         
       } catch (err){
       }
   }

   function fetchProperty(){
      fetch( `http://localhost:3001/api/property/${lastItem}`).then((result)=>{
         result.json().then((resp)=>{
            console.log(resp)
         setProperty(resp);
         setPropertyName(resp.property_name)
        setPrice(resp.price)
        setDeposit(resp.deposite)
        setAddress(resp.address)
        setOffer(resp.offer)
        setType(resp.type)
     
        setStatus(resp.status)
        setFurnished(resp.furnished)
        setBedrooms(resp.bedroom)
        setBathrooms(resp.bathroom)
        setBalconys(resp.balcony)
        setCarpet(resp.carpet_area)
     
        setTotalFloors(resp.total_floors)
        setAge(resp.age)
        setDescription(resp.description)

        setFile1(resp.image_01)
        setFile2(resp.image_02)
        setFile3(resp.image_03)
        setFile4(resp.image_04)
        setFile5(resp.image_05)
        setFile6(resp.image_06)

      // setLift(resp.lift)
      // setGuard(resp.security_guard)
      // setPlay(resp.play_ground)
      // setGarden(resp.garden)
      // setWater(resp.water_supply)
      // setBackup(resp.power_backup)
     
      // setPark(resp.parking_area)
      // setGym(resp.gym)
      // setMall(resp.shopping_mall)
      // setHospital(resp.hospital)
      // setSchool(resp.school)
      // setMarket(resp.market_area)
         })
      })
   }
   useEffect(()=>{
      fetchProperty()
   },[])
   useEffect(() => {
        async function fetchData(){
            const  response =  await axios.get(
                `http://localhost:3001/api/property/${lastItem}`
            );

        }
        fetchData()
    }, []);
    


  return (
    <section className="property-form">
<form action="" method="POST" encType="multipart/form-data" onSubmit={onSubmit}>
      <h3>property details</h3>
      <div className="box">
         <p>property name <span>*</span></p>
         <input defaultValue={property.property_name} onChange={(e)=>setPropertyName(e.target.value)}
          type="text" name="property_name" required maxLength="50" placeholder={property.property_name} className="input"/>
      </div>
      <div className="flex">
         <div className="box">
            <p>property price <span>*</span></p>
            <input defaultValue={property.price} onChange={(e)=>setPrice(e.target.value)}
             type="number" name="price" required min="1" max="9999999999" maxLength="10" placeholder={property.price} className="input"/>
         </div>
         <div className="box">
            <p>deposit amount <span>*</span></p>
            <input defaultValue={property.deposite} onChange={(e)=>setDeposit(e.target.value)}
             type="number" name="deposit" required min="1" max="9999999999" maxLength="10" placeholder={property.deposite} className="input"/>
         </div>
         <div className="box">
            <p>property address <span>*</span></p>
            <input defaultValue={property.address} onChange={(e)=>setAddress(e.target.value)} 
            type="text" name="address" required maxLength="100" placeholder={property.address} className="input"/>
         </div>
         <div className="box">
            <p>offer type <span>*</span></p>
            <select value={property_offer} onChange={(e)=>setOffer(e.target.value)}
             name="offer" required className="input">
               <option value="sale" defaultValue>sale</option>
               <option value="resale">resale</option>
               <option value="rent">rent</option>
            </select>
         </div>
         <div className="box">
            <p>property type <span>*</span></p>
            <select value={property_type} onChange={(e)=>setType(e.target.value)}
             name="type" required className="input">
               <option value="apartment">apartment</option>
               <option value="maisonette" defaultValue>maisonette</option>
               <option value="bungalow">bungalow</option>
               <option value="condominium">condominium </option>
            </select>
         </div>
         <div className="box">
            <p>property status <span>*</span></p>
            <select value={property_status} onChange={(e)=>setStatus(e.target.value)}
             name="status" required className="input">
               <option value="ready to move" defaultValue>ready to move</option>
               <option value="under construction">under construction</option>
            </select>
         </div>
         <div className="box">
            <p>furnished status <span>*</span></p>
            <select value={property_furnished} onChange={(e)=>setFurnished(e.target.value)}
             name="furnished" required className="input">
               <option value="furnished" defaultValue>furnished</option>
               <option value="semi-furnished">semi-furnished</option>
               <option value="unfurnished">unfurnished</option>
            </select>
         </div>
         
         <div className="box">
            <p>how many bedrooms <span>*</span></p>
            <select value={property_bedrooms} onChange={(e)=>setBedrooms(e.target.value)}
             name="bedroom" required className="input">
               <option value="1" defaultValue>1 bedroom</option>
               <option value="2">2 bedroom</option>
               <option value="3">3 bedroom</option>
               <option value="4">4 bedroom</option>
               <option value="5">5 bedroom</option>
               <option value="6">6 bedroom</option>
               <option value="7">7 bedroom</option>
               <option value="8">8 bedroom</option>
               <option value="9">9 bedroom</option>
            </select>
         </div>
         <div className="box">
            <p>how many bathrooms <span>*</span></p>
            <select value={property_bathrooms} onChange={(e)=>setBathrooms(e.target.value)}
             name="bathroom" required className="input">
               <option value="1" defaultValue>1 bathroom</option>
               <option value="2">2 bathroom</option>
               <option value="3">3 bathroom</option>
               <option value="4">4 bathroom</option>
               <option value="5">5 bathroom</option>
               <option value="6">6 bathroom</option>
               <option value="7">7 bathroom</option>
               <option value="8">8 bathroom</option>
               <option value="9">9 bathroom</option>
            </select>
         </div>
         <div className="box">
            <p>how many balconys <span>*</span></p>
            <select value={property_balconys} onChange={(e)=>setBalconys(e.target.value)} 
            name="balcony" required className="input">
               <option value="1" defaultValue>1 balcony</option>
               <option value="2">2 balcony</option>
               <option value="3">3 balcony</option>
               <option value="4">4 balcony</option>
               <option value="5">5 balcony</option>
               <option value="6">6 balcony</option>
               <option value="7">7 balcony</option>
               <option value="8">8 balcony</option>
               <option value="9">9 balcony</option>
            </select>
         </div>
         <div className="box">
            <p>carpet area <span>*</span></p>
            <input defaultValue={property.carpet_area} onChange={(e)=>setCarpet(e.target.value)}
             type="number" name="carpet" required min="1" max="9999999999" maxLength="10" placeholder={`${property.carpet_area} square feet`} className="input"/>
         </div>
         <div className="box">
            <p>property age <span>*</span></p>
            <input defaultValue={property.age} onChange={(e)=>setAge(e.target.value)}
             type="number" name="age" required min="0" max="99" maxLength="2" placeholder={`${property.age} years old`} className="input"/>
         </div>
         <div className="box">
            <p>total floors <span>*</span></p>
            <input defaultValue={property.total_floors} onChange={(e)=>setTotalFloors(e.target.value)}
             type="number" name="total_floors" required min="1" max="99" maxLength="2" placeholder={`${property.total_floors} floors`} className="input"/>
         </div>
         
      </div>
      <div className="box">
         <p>property description <span>*</span></p>
         <textarea defaultValue={property.description} onChange={(e)=>setDescription(e.target.value)}
          name="description" maxLength="1000" className="input" required cols="30" rows="10" placeholder={`${property.description}`}></textarea>
      </div>
      <div className="checkbox">
         <div className="box">
            <p><input onChange={(event)=>{
               if (event.target.checked) {
      
            
                  setLift("yes")
                } else {
                  
                  setLift("no")
            
                }
            }}
            type="checkbox" name="lift" value={lift} />lifts</p>
            <p><input 
            onChange={(event)=>{
               if (event.target.checked) {
      
            
                  setGuard("yes")
                } else {
                  
                  setGuard("no")
            
                }
            }}
             type="checkbox" name="security_guard" value={guard} />security guard</p>
            <p><input 
            onChange={(event)=>{
               if (event.target.checked) {
      
            
                  setPlay("yes")
                } else {
                  
                  setPlay("no")
            
                }
            }}
             type="checkbox" name="play_ground" value={play} />play ground</p>
            <p><input 
            onChange={(event)=>{
               if (event.target.checked) {
      
            
                  setGarden("yes")
                } else {
                  
                  setGarden("no")
            
                }
            }}
             type="checkbox" name="garden" value={garden} />garden</p>
            <p><input 
            onChange={(event)=>{
               if (event.target.checked) {
      
            
                  setWater("yes")
                } else {
                  
                  setWater("no")
            
                }
            }}
             type="checkbox" name="water_supply" value={water} />water supply</p>
            <p><input 
            onChange={(event)=>{
               if (event.target.checked) {
      
            
                  setBackup("yes")
                } else {
                  
                  setBackup("no")
            
                }
            }}
             type="checkbox" name="power_backup" value={backup} />power backup</p>
         </div>
         <div className="box">
            <p><input 
            onChange={(event)=>{
               if (event.target.checked) {
      
            
                  setPark("yes")
                } else {
                  
                  setPark("no")
            
                }
            }}
             type="checkbox" name="parking_area" value={park} />parking area</p>
            <p><input 
            onChange={(event)=>{
               if (event.target.checked) {
      
            
                  setGym("yes")
                } else {
                  
                  setGym("no")
            
                }
            }}
             type="checkbox" name="gym" value={gym} />gym</p>
            <p><input 
            onChange={(event)=>{
               if (event.target.checked) {
      
            
                  setMall("yes")
                } else {
                  
                  setMall("no")
            
                }
            }}
             type="checkbox" name="shopping_mall" value={mall} />shopping_mall</p>
            <p><input 
            onChange={(event)=>{
               if (event.target.checked) {
      
            
                  setHospital("yes")
                } else {
                  
                  setHospital("no")
            
                }
            }}
             type="checkbox" name="hospital" value={hospital} />hospital</p>
            <p><input 
            onChange={(event)=>{
               if (event.target.checked) {
      
            
                  setSchool("yes")
                } else {
                  
                  setSchool("no")
            
                }
            }}
             type="checkbox" name="school" value={school} />school</p>
            <p><input 
            onChange={(event)=>{
               if (event.target.checked) {
      
            
                  setMarket("yes")
                } else {
                  
                  setMarket("no")
            
                }
            }}
             type="checkbox" name="market_area" value={market} />market area</p>
         </div>
      </div>
      <div className="box">
         <p>image 01 <span>*</span></p>
         <input defaultValue={property.image_01} onChange={(e)=>setFile1(e.target.files[0])}
          type="file" name="image_01" className="input" accept="image/*" required/>
      </div>
      <div className="flex"> 
         <div className="box">
            <p>image 02</p>
            <input defaultValue={property.image_02} onChange={(e)=>setFile2(e.target.files[0])}
             type="file" name="image_02" className="input" accept="image/*"/>
         </div>
         <div className="box">
            <p>image 03</p>
            <input defaultValue={property.image_03} onChange={(e)=>setFile3(e.target.files[0])}
             type="file" name="image_03" className="input" accept="image/*"/>
         </div>
         <div className="box">
            <p>image 04</p>
            <input defaultValue={property.image_04} onChange={(e) => setFile4(e.target.files[0])}
             type="file" name="file3" className="input" accept="image/*"/>
         </div>
         <div className="box">
            <p>image 05</p>
            <input defaultValue={property.image_05} onChange={(e) => setFile5(e.target.files[0])}
             type="file" name="file3" className="input" accept="image/*"/>
         </div>
         <div className="box">
            <p>image 06</p>
            <input defaultValue={property.image_06} onChange={(e) => setFile6(e.target.files[0])}
             type="file" name="file3" className="input" accept="image/*"/>
         </div>  
      </div>
      <input type="submit" value="Update Property" className="btn" name="post"/>
   </form>
   <ToastContainer/>

</section>
  )
}

export default UpdateProperty