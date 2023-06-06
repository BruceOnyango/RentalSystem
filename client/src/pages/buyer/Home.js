import '../../assets/css/home.css'
import Services from '../../components/buyer/Services'
import Properties from './Properties'
const Home = () => {
   
  return (
<div className='h-full w-screen absolute '>
<div className='mt-12 container h-screen w-screen'>

</div>
<Properties />
{/* <div className="home ">
     <section class="center">
        <form action="search.php" method="post">
          <h3>find your perfect home</h3>
           <div class="box">
             <p>enter location <span>*</span></p>
             <input type="text" name="h_location" required maxlength="100" placeholder="enter city name" class="input"/>
           </div>
            <div class="flex">
            <div class="box">
               <p>property type <span>*</span></p>
               <select name="h_type" class="input" required>
                  <option value="flat">flat</option>
                  <option value="house">house</option>
                  <option value="building">building</option>
                  <option value="building">building</option>
                  <option value="flat">flat</option>
               </select>
            </div>
            <div class="box">
               <p>offer type <span>*</span></p>
               <select name="h_offer" class="input" required>
                  <option value="sale">sale</option>
                  <option value="lease"> lease</option>
                  <option value="rent"> rent</option>
               </select>
            </div>

             </div>
           <input type="submit" value="search property" name="h_search" class="btn"/>
        </form>
      </section>
   </div> */}

   </div>
  )
}

export default Home