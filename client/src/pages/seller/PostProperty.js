import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import '../../assets/css/style.css'

const PostProperty = () => {
   const user_id=window.localStorage.getItem("seller")
   const [file1, setFile1] = useState(null);
   const [file2, setFile2] = useState(null);
   const [file3, setFile3] = useState(null);

   const [file4, setFile4] = useState(null);
   const [file5, setFile5] = useState(null);
   const [file6, setFile6] = useState(null);

   const [property_name, setPropertyName]=useState('')
   const [property_price, setPrice]=useState('')
   const [property_deposit, setDeposit]=useState('')
   const [property_address, setAddress]=useState('')
   const [property_offer, setOffer]=useState('sale')
   const [property_type, setType]=useState('house')

   const [property_status, setStatus]=useState('ready to move')
   const [property_furnished, setFurnished]=useState('furnished')
   const [property_bedrooms, setBedrooms]=useState(1)
   const [property_bathrooms, setBathrooms]=useState(1)
   const [property_balconys, setBalconys]=useState(1)
   const [property_carpet, setCarpet]=useState('')

   const [property_totalfloors, setTotalFloors]=useState('')
   const [property_age, setAge]=useState('')
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


const handleChange=(event)=>{
   var ch = event.target.checked
   // console.log(ch)
   
   if (event.target.checked) {
      

      setLift("yes")
    } else {
      
      setLift("no")

    }
    console.log(lift)

    
  
}

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
 

   async function onSubmit(e){
      e.preventDefault()
      const imgUrl1 = await upload(file1);
      const imgUrl2 = await upload(file2);
      const imgUrl3 = await upload(file3);

      const imgUrl4 = await upload(file4);
      const imgUrl5 = await upload(file5);
      const imgUrl6 = await upload(file6);
      try{
         axios.post("http://localhost:3001/api/property/addproperty",{
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
            image_04: file1 ? imgUrl4 : "",
            image_05: file2 ? imgUrl5 : "",
            image_06: file3 ? imgUrl6 : "",
            description: property_description,
            
         
       }).then((response)=>{
         if(response.data=="success"){
           toast.success("Property Added Successfully. Proceed to Pay For Valuation.")
           setTimeout(()=>{
            window.location.assign("/seller/mylistings")
           },1500)
         } else {
            toast.error("Propert Addition Unsuccessful.")

         }
       })
         
       } catch (err){
       }
   }
  return (
    <section className="property-form">

   <form action="" method="POST" encType="multipart/form-data" onSubmit={onSubmit}>
      <h3>property details</h3>
      <div className="box">
         <p>property name <span>*</span></p>
         <input value={property_name} onChange={(e)=>setPropertyName(e.target.value)}
          type="text" name="property_name" required maxLength="50" placeholder="enter property name" className="input"/>
      </div>
      <div className="flex">
         <div className="box">
            <p>property price <span>*</span></p>
            <input value={property_price} onChange={(e)=>setPrice(e.target.value)}
             type="number" name="price" required min="0" max="9999999999" maxLength="10" placeholder="enter property price" className="input"/>
         </div>
         <div className="box">
            <p>deposit amount <span>*</span></p>
            <input value={property_deposit} onChange={(e)=>setDeposit(e.target.value)}
             type="number" name="deposit" required min="0" max="9999999999" maxLength="10" placeholder="enter deposit amount" className="input"/>
         </div>
         <div className="box">
            <p>property address <span>*</span></p>
            <input value={property_address} onChange={(e)=>setAddress(e.target.value)} 
            type="text" name="address" required maxLength="100" placeholder="enter property full address" className="input"/>
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
            <input value={property_carpet} onChange={(e)=>setCarpet(e.target.value)}
             type="number" name="carpet" required min="1" max="9999999999" maxLength="10" placeholder="how many squarefits?" className="input"/>
         </div>
         <div className="box">
            <p>property age <span>*</span></p>
            <input value={property_age} onChange={(e)=>setAge(e.target.value)}
             type="number" name="age" required min="0" max="99" maxLength="2" placeholder="how old is property?" className="input"/>
         </div>
         <div className="box">
            <p>total floors <span>*</span></p>
            <input value={property_totalfloors} onChange={(e)=>setTotalFloors(e.target.value)}
             type="number" name="total_floors" required min="0" max="99" maxLength="2" placeholder="how floors available?" className="input"/>
         </div>
         
      </div>
      <div className="box">
         <p>property description <span>*</span></p>
         <textarea value={property_description} onChange={(e)=>setDescription(e.target.value)}
          name="description" maxLength="1000" className="input" required cols="30" rows="10" placeholder="write about property..."></textarea>
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
         <input onChange={(e) => setFile1(e.target.files[0])}
          type="file" name="file1" className="input" accept="image/*" required/>
      </div>
      <div className="flex"> 
         <div className="box">
            <p>image 02</p>
            <input onChange={(e) => setFile2(e.target.files[0])}
             type="file" name="file2" className="input" accept="image/*"/>
         </div>
         <div className="box">
            <p>image 03</p>
            <input onChange={(e) => setFile3(e.target.files[0])}
             type="file" name="file3" className="input" accept="image/*"/>
         </div>
         <div className="box">
            <p>image 04</p>
            <input onChange={(e) => setFile4(e.target.files[0])}
             type="file" name="file3" className="input" accept="image/*"/>
         </div>
         <div className="box">
            <p>image 05</p>
            <input onChange={(e) => setFile5(e.target.files[0])}
             type="file" name="file3" className="input" accept="image/*"/>
         </div>
         <div className="box">
            <p>image 06</p>
            <input onChange={(e) => setFile6(e.target.files[0])}
             type="file" name="file3" className="input" accept="image/*"/>
         </div>  
      </div>
      <input type="submit" value="post property" className="btn" name="post"/>
   </form>
   <ToastContainer/>

</section>
  )
}

export default PostProperty