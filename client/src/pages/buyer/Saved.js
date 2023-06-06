import React, { useEffect, useState } from "react";
import axios from "axios";

import Listings from "./Listings";
import Pagination from "./Pagination";

const Saved = () => {
  
  const [loggedIn,setLoggedIn]  = useState(window.localStorage.getItem("buyerLoggedIn"))
  useEffect(()=>{
    setLoggedIn(loggedIn)
  },[loggedIn])
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(12);
  const user_id = window.localStorage.getItem("buyer")

  useEffect(() => {
      async function fetchData(){
          const  response =  await axios.get(
              `http://localhost:3001/api/property/getsaved/${user_id}`
          );
          console.log(response.data)
          setProperties(response.data)
      }
      fetchData()
  }, []);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = properties.slice(firstPostIndex, lastPostIndex);
  if(loggedIn && properties.length==0){
    return(
      <h2 className="!m-auto text-2xl !text-center !mt-56">No Properties Saved</h2>
    )
  }
  
  return (
    <>
    {loggedIn? (
    <div>
      <Listings properties={currentPosts} />
            <Pagination
                totalPosts={properties.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
    </div>
  ):(<h2 className="!m-auto text-2xl !text-center !mt-56">Please Log In to View / Save Items</h2>)}
    </>
  )
}

export default Saved