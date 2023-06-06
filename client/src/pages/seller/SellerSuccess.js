import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import '../../assets/css/receipt.css'
import jsPDF from "jspdf"


const SellerSuccess = () => {
  const user_id=window.localStorage.getItem("buyer")
  const location = useLocation()
  const thePath = location.pathname
  const lastItem = thePath.substring(thePath.lastIndexOf('/') + 1)
const [sales,setSales] = useState([])

  useEffect(()=>{
    
    
    function insertSale(){
        try{
            axios.put(`http://localhost:3001/api/property/updateValuated/${lastItem}`,{
            
          })
          toast.success("Payment Successful.")
        
          } catch (err){
          }
      try{
        axios.post(
          `http://localhost:3001/api/property/newsaleseller`,{
            user_id:user_id,
            property_id:lastItem
          }
      )
      } catch(err){

      }
  }
  const fetchSales =async()=>{
    const  response =  await axios.get(
      `http://localhost:3001/api/property/${lastItem}`
  );
  // console.log(response.data)
  setSales(response.data);
}
  insertSale()
  fetchSales()
  },[])

  const generatepdf = ()=>{
    var doc = new jsPDF("p","pt","a4")
    doc.html(document.querySelector("#content2"),{
      callback:function(pdf){
        pdf.save("receipt.pdf")
      }
    })
  }
    return (
      <div className="my-5 page" size="A4" >
        <button className="inline-btn" onClick={generatepdf} >Download</button>
        <div className="p-5" size="A4" id="content2">
            <section className="top-content bb d-flex justify-content-between">
                <div className="logo">
                
                    {/* <img src={require(`../../assets/uploads/${sales.image_01}`)} alt="" className="img-fluid"/> */}
                </div>
                <div className="top-left">
                    <div className="graphic-path">
                        <p>Receipt</p>
                    </div>
                    <div className="position-relative">
                        <p>Receipt No. <span>3MxU{sales.user_id}{sales.property_id}</span></p>
                    </div>
                </div>
            </section>

            <section className="store-user mt-5">
                <div className="col-10">
                    <div className="row bb pb-3">
                        <div className="col-7">
                            <p>E-Mali,</p>
                            <h2>Properties</h2>
                            <p className="address"> Nairobi, <br/>Kenya </p>
                        </div>
                        <div className="col-5">
                            <p>Client Details</p>
                            <h2>First Name: {sales.first_name}
                            </h2>
                            <h2>Last Name: {sales.last_name}
                            </h2>
                            <h2>Email: {sales.email}
                            </h2>
                        </div>
                    </div>
                    <div className="row extra-info pt-3">
                        <div className="col-7">
                            <p>Payment Method: Card<span>{sales.payment_type}</span></p>
                            <p>Payment for: <span>Valuation</span></p>
                        </div>
                        <div className="col-5">
                            <p>Delivery Date: <span>{sales.creation_time}</span></p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="product-area mt-4">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <td>Item Description</td>
                            <td>Price</td>
                            <td>Quantity</td>
                            <td>Total</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div className="media">
                                {/* <img className="mr-3 img-fluid" src={`/uploads/${sales.image_01}`} alt=''/> */}
                                    <div className="media-body">
                                        <p className="mt-0 title">{sales.property_name}</p>
                                        <span
                                          className="text-overflow: ellipsis; display: block; width: 30vw; overflow: hidden; white-space: nowrap;">
                                            {sales.description}
                                        </span>
                                    </div>
                                </div>
                            </td>
                            <td>$ 150</td>
                            <td>1</td>
                            <td>1</td>
                        </tr>

                    </tbody>
                </table>
            </section>

            <section className="balance-info">
                <div className="row">
                    <div className="col-8">
                        <p className="m-0 font-weight-bold"> Note: </p>
                        <p>You may request to cancel your purchase for a full refund, up to 72 hours before the date and
                            time of the event. Cancellations between 25-72 hours before the event may transferred to a
                            different date/time of the same className. Cancellation requests made within 24 hours of the
                            purchase may not receive a refund nor a transfer. </p>
                    </div>
                    <div className="col-4">
                        <table className="table border-0 table-hover">
                            <tfoot>
                                <tr>
                                    <td>Total:</td>
                                    <td>$ 150</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </section>


            <footer>
                <hr/>
                <p className="m-0 text-center">
                   
                </p>
                <div className="social pt-3">
                    <span className="pr-2">
                        <i className="fas fa-mobile-alt"></i>
                        <span>+254790 229 229</span>
                    </span>
                    <span className="pr-2">
                        <i className="fas fa-envelope"></i>
                        <span>emaliproperties254@gmail.com</span>
                    </span>
                    
                </div>
            </footer>
        </div>
    </div>
      
    );
  };
  
  export default SellerSuccess;
  