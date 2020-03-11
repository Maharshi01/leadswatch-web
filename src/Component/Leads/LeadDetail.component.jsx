import {Helmet} from "react-helmet";
import React, { useState, useEffect } from "react";
import { API_URL ,logoutidle} from '../../AppConfig'


import { BrowserRouter, Route, useParams } from "react-router-dom";
import axios from "axios";
import '../Leads/Leads.css';
import { Media } from 'reactstrap';

const LeadDetail = () => {
  let { id } = useParams();
  const [details, setDetails] = useState({
    
  });
  //// ////console.log
  useEffect(() => {});
  useEffect(() => {
    const config = {
      url: API_URL+`/lead/detail/${id}`,
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization:"Bearer " +localStorage.getItem("access_token")
      }
    };
    axios(config)
      .then(response => {
         // ////console.log("lead detail")
       // ////console.log("response", response);
       // ////console.log("details", details);
        setDetails(response.data.data);
      })
      .catch(error => {
        if(error.message=="Request failed with status code 401"){
          logoutidle()
        }
       // ////console.log("error", error);
      });
  }, [id]);
  return Object.keys(details).length < 1 ? (
    <div></div>
  ) : (
    <div className="leads_body_bg">
      <div className="leads_checkResponse">
        <Media className="mt-1">
          {/* <Media left middle href="#">
            <Media
              className="media_img"
              object
              src={require("../../human.png")}
              alt="human placeholder image"
            />
          </Media> */}
          <Media body>
            <Media heading className="media_img_heading">
            Lead ID:<span>{details.lead_id} </span>
            </Media>
          </Media>
        </Media>

        <div className="leads_checkResponse_inner">
          <h5>
            {/* Lead ID <span>{details.lead_id} </span> */}
          </h5>
          <p>
            Status{" "}
            <span>{details.status_response== "Accepted"? "Accepted":"Rejected"}</span>
            
          </p>
          <div>
           <p>
              <b>Lead details</b>
            </p>
            <p>
              First Name <span>{details.lead_details.firstname} </span>
            </p>
            <p>
              Last Name <span>{details.lead_details.lastname} </span>
            </p>
          </div>

          {/* <h2>
          Buyer ID
          {details.buyer_id}{" "}
        </h2> */}

          <p>
            Publisher ID <span>{details.publisher_id} </span>
          </p>
          <p>
            Publisher Name <span>{details.publisher_name} </span>
          </p>
          <p>
            Vertical ID <span>{details.vertical_id} </span>
          </p>

          <p>
            Vertical Name <span>{details.vertical_name} </span>
          </p>
          <p>
            Campaign ID <span>{details.campaign_id} </span>
          </p>

          <p>
            Campaign Name <span>{details.campaign_name} </span>
          </p>
          <p>
            Buyer Id <span>{details.buyer_id} </span>
          </p>
          <p>
            Buyer Name <span>{details.buyer_name} </span>
          </p>
          <p>
            Buyer Status{" "}
            <span>
            {details.buyer_status_response == "true" ? "Success" : "Failure"}{" "}
            </span>
          </p>
          {/* <h5>
          Price
          {details.price}{" "}
        </h5> */}
          <p>
            Cost <span> {details.cost} </span>
          </p>
          <p>
            Price <span>{details.price} </span>
          </p>
          <p>
            Profit <span>{details.cost - details.price} </span>
          </p>

          <div className="leads_checkResponse_inner_btns_div">
            <div>
              <button>Status</button>

              <br /> 
              <div className="success_class">
              {details.status_response == "Accepted"? "Accepted":"Rejected"}{" "}
              </div>
        
            </div>
            <div>
              <button> Buyer Status</button>
              <br /> 
               <div className="success_class">
               {details.buyer_status_response == "true" ? "Success" : "Failure"}{" "}
                </div>
                
            </div>
            <div>
              <button>Price</button>
              <br /> 
               <div className="success_class">
               {details.price}
               </div>
            </div>
            <div>
              <button>Cost</button>
              <br /> 
               <div className="success_class">
               {details.cost}
               </div>
            </div>
            <div>
              <button>Profit</button>
              <br /> 
               <div className="success_class">
               {details.cost - details.price}
               </div>
            </div>
          </div>
        </div>

        <div className="leads_checkResponse_inner">
          <h3>
            <b>Response</b>
          </h3>
          <p>
            Buyer Response <span>{details.response || "No Response"} </span>
          </p>
          <p>
            System Response <span> </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeadDetail;
