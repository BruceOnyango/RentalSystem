import React, { useEffect, useState } from "react";
import axios from "axios";

import Listings from "./Listings/Listings";
import Pagination from "./Listings/Pagination";

const SellerHome = () => {
  const [properties, setProperties] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(12);
    useEffect(() => {
        async function fetchData(){
            const  response =  await axios.post(
                "http://localhost:3001/api/property/pendingpayment",{
                    user_id:window.localStorage.getItem("seller"),
                }
            );
            console.log(response.data)
            setProperties(response.data)
        }
        fetchData()
    }, []);

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = properties.slice(firstPostIndex, lastPostIndex);
    if(properties==""){
        return(
            <h2 className="!m-auto text-2xl !text-center !mt-56">No Properties pending valuation payment.</h2>
        )
    }

    return (
        <div className='app'>
            <Listings properties={currentPosts} />
            <Pagination
                totalPosts={properties.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
        </div>
    );
}

export default SellerHome