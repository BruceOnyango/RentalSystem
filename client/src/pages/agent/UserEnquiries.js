import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Pagination from './Listings/Pagination';
import Chats from './chat/Chats';
import { useLocation } from 'react-router-dom';


const UserEnquiries = () => {
    
    const location = useLocation()
   const thePath = location.pathname
   const lastItem = thePath.substring(thePath.lastIndexOf('/') + 1)
   const property_id  = window.localStorage.getItem("propertyID")
   console.log(property_id)
    const [enquiries, setEnquiries] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(12);

    useEffect(() => {
        async function fetchData(){
            const  response =  await axios.get(
                "http://localhost:3001/api/enquiry/getenquiriesby",{
                    params:{
                        user_id:lastItem,
                        property_id:property_id
                    }
                }
            );
            console.log(response.data)
            setEnquiries(response.data)
        }
        fetchData()
    }, []);

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = enquiries.slice(firstPostIndex, lastPostIndex);

    return (
        <div className='app'>
            <Chats enquiries={currentPosts} />
            <Pagination
                totalPosts={enquiries.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
        </div>
    );
}

export default UserEnquiries