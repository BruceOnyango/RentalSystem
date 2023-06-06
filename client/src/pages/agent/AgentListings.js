import React, { useEffect, useState } from "react";
import axios from "axios";

import Listings from "./Listings/Listings";
import Pagination from "./Listings/Pagination";

const AgentListings = () => {
    const [properties, setProperties] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(12);
    useEffect(() => {
        async function fetchData(){
            const  response =  await axios.get(
                "http://localhost:3001/api/property/approved",{
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

export default AgentListings