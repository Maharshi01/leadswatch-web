//created by surya teja
//last modified 24 dec 2019
import React, { useState,useEffect } from "react";
import { API_URL ,logoutidle} from '../../AppConfig'

import { useHistory, Link } from "react-router-dom";
import {
  Col,
  Form,
  Row,
  Dropdown,
  Modal,
  Button,
  Image,
  ModalBody
} from "react-bootstrap";
import { IoIosClose, IoMdLogOut,IoIosWarning } from "react-icons/io";
import axios from "axios";
{/*
****************************************************************************************************************************************
****************************************************************************************************************************************
****************************************************************************************************************************************
****************************************************************************************************************************************
#####################################################################################################################################
#####################################################################################################################################
#####################################################################################################################################
#####################################################################################################################################
*/}
//ANCHOR MAIN PAGE OF TEAM 
const TeamMember = props => { 
  //this is the parent component 
  let history = useHistory();
  const [modalShow3, setModalShow3] = React.useState(false);//modal for invite team member component
  const [modalShow2, setModalShow2] = React.useState(false);//modal for edit invite team member component
  const [modalShow4, setModalShow4] = React.useState(false);//modal for edit team member component
  const [invitedList,setInvitedList]=useState([]); // variable to hold invited team members list
  const [invitedUser,setInvitedUser]=useState({}); // a variable to send data to edit invite team member components
  const [teamList,setTeamList]=useState([]);  // variable to hold  team members list
   const [leads,setLeads]=useState({"1":false,"2":false,"3":false,"4":false});//default values for the  edit components being sent from parent(this) to child(invite and team edit components)
   const [camp,setCamp]=useState({"1":false,"2":false,"3":false,"4":false});//default values for the  edit components being sent from parent(this) to child(invite and team edit components)
   const [buy,setBuy]=useState({"1":false,"2":false,"3":false,"4":false});//default values for the  edit components being sent from parent(this) to child(invite and team edit components)
   const [pub,setPub]=useState({"1":false,"2":false,"3":false,"4":false});//default values for the  edit components being sent from parent(this) to child(invite and team edit components)
   const [vert,setVert]=useState({"1":false,"2":false,"3":false,"4":false});//default values for the  edit components being sent from parent(this) to child(invite and team edit components)
   const [teamMember,setTeamMember]=useState({});// a variable to send data to edit  team member components
   const [success_alertText, setsuccess_alertText] = useState("");
   const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);
  const [aa,setAA] = useState(0);
  const [bb,setBB] = useState(0);
  const [cc,setCC] = useState(0);
  const [dd,setDD] = useState(0);

  useEffect(()=>{
    //this function fetches the data of invited members list
   const config = {
      url: API_URL+'/user/invited-members',
    //   data: data,
      method: 'post',
      headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token")
        }
    }; 
    axios(config)
      .then(response => {
            console.log(response,"invited team members")
            setInvitedList(response.data.data) 
      })
      .catch(error => {
        if(error.message=="Request failed with status code 401"){
          logoutidle()
        }
        // //console.log(error.response)
      })
  },[])
  useEffect(()=>{
    //this function fetches the data for team members
   const config = {
      url: API_URL+'/user/team-members',
    //   data: data,
      method: 'post',
      headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token")
        }
    }; //post data to db
    axios(config)
      .then(response => {
            console.log(response,"existing team")
            setTeamList(response.data.data)
      })
      .catch(error => {
        if(error.message=="Request failed with status code 401"){
          logoutidle()
        }
        ////console.log(error.response)
      })
  },[])
  useEffect(()=>{
  //this  function  helpes in rerender when we updating clicked memeber of invited list for edit
      if(global.invitedUser)
    setInvitedUser(global.invitedUser)
  },[global.invitedUser])

  const getinvitelistdata=(a="created",b=-1)=>{
    console.log("in get invire dara");
    //this function is used for render purpose when editted or deleted of invited team member
    const data={
  "sortby": {
    [a]: parseInt(b)
  }
}
     const config = {
      url: API_URL+'/user/invited-members',
      data: data,
      method: 'post',
      headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token")
        }
    }; //post data to db
    axios(config)
      .then(response => {
            // //console.log(response,"invited team members")
            setInvitedList(response.data.data)
      })
      .catch(error => {
        if(error.message=="Request failed with status code 401"){
          logoutidle()
        }
        // //console.log(error.response)
      })
  }
 
  const getteamlistdata= (a="created",b=-1)=>{
    //this function is used for render purpose when editted or deleted the team member
    const data={
  "sortby": {
    [a]: parseInt(b)
  }
}
     const config = {
      url: API_URL+'/user/team-members',
      data: data,
      method: 'post',
      headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token")
        }
    }; //post data to db
    axios(config)
      .then(response => {
            // //console.log(response,"existing team")
            setTeamList(response.data.data)
      })
      .catch(error => {
        ////console.log(error.response)
      })
  }
  
  
  const editInvitedMember=(ele)=>{
    //the function runs when the edit button of invited teamember is clicked
      setInvitedUser(ele)
      setModalShow2(true);//opens the edit  invite memebr modal
  }
  const editTeamMember=(ele)=>{
    //the function runs when the edit button of  team member is clicked
      setTeamMember(ele)
      setModalShow4(true);//opens the edit  team member modal
  }
  return (
    <div className="main_div_settings">
   {/* <div>

   <div className="personal_heading_set1">
            <p>Invite Team Member</p>
          </div>


       
   </div> */}
   {/* this button is for invite team member modal */}
   <div className="inv_butt_team">
   <Button 
   className="invite_set_button"
   onClick={()=>{
       setModalShow3(true);
   }}>Invite Team member </Button>
   </div>
{/* this component is for inviting a team member */}
      <Invite
                getinvitelistdata={getinvitelistdata}
                show={modalShow3}
                onHide={() => setModalShow3(false)}
        />
        {/* this component is for editting a invited team member permissions*/}
        <EditInvite
            getinvitelistdata={getinvitelistdata}
            leads={leads}
            camp={camp}
            buy={buy}
            pub={pub}
            vert={vert}
            id={invitedUser.id}
            user={invitedUser}
            show={modalShow2}
            onHide={()=> setModalShow2(false)}
        />
        {/* this componenet is for editting the permissions for existing team members */}
        <EditTeam
            getteamlistdata={getteamlistdata}
            leads={leads}
            camp={camp}
            buy={buy}
            pub={pub}
            vert={vert}
            id={teamMember.id}
            user={teamMember}
            show={modalShow4}
            onHide={()=> setModalShow4(false)}
        />

<div className="team1_box">

        <div className="personal_heading_set1">
            <p>Invited Team Members</p>
          </div>



          <table
              id="dtBasicExample"
              class="table table-striped table-sm"
              cellspacing="0"
            >
              <thead>
                <tr
                  style={{
                    color: "#484393",
                    fontWeight: "bolder",
                    fontSize: 20
                  }}
                >
                  <th class="th-sm extra_class text-center"
                   onClick={() => {
                    // alternate("name");
                    setB(0);
                    setC(0);

                    if (a == 1) {
                      getinvitelistdata("email",1)
                      setA(2);
                    } else {
                      setA(1);
                      getinvitelistdata("email",-1)
                    }
                  }} >
                    <div className="first_div">
                     Email
                      <div className="svg_grid">  
                        <svg
                          className="svg_one"
                         
                          id="Group_2411"
                          data-name="Group 2411"
                          xmlns="http://www.w3.org/2000/svg"
                          width="8"
                          height="12"
                          viewBox="0 0 8 12"
                        >
                          <path
                            id="Polygon_3"
                            data-name="Polygon 3"
                            d="M4,0,8,5H0Z"
                            fill={a == 1 ? "#484393" : "#d3d3d3"}
                          />
                        </svg>
                        <svg
                          className="svg_two"
                         
                          id="Group_2411"
                          data-name="Group 2411"
                          xmlns="http://www.w3.org/2000/svg"
                          width="8"
                          height="12"
                          viewBox="0 0 8 12"
                        >
                          <path
                            id="Polygon_4"
                            data-name="Polygon 4"
                            d="M4,0,8,5H0Z"
                            transform="translate(8 12) rotate(180)"
                            fill={a == 2 ? "#484393" : "#d3d3d3"}
                          />
                        </svg>
                      </div>
                    </div>
                  </th>
                  {/* lead id*/}
                  <th class="th-sm extra_class"
                  onClick={() => {
                    // alternate("name");
                    setA(0);
                    setC(0);

                    if (b == 1) {
                      getinvitelistdata("invitation_code",1)
                      setB(2);
                    } else {
                      setB(1);
                      getinvitelistdata("invitation_code",-1)
                    }}}>
                    <div className="first_div">
                      Invitation code
                      <div className="svg_grid">
                        <svg
                          className="svg_one"
                         
                          id="Group_2411"
                          data-name="Group 2411"
                          xmlns="http://www.w3.org/2000/svg"
                          width="8"
                          height="12"
                          viewBox="0 0 8 12"
                        >
                          <path
                            id="Polygon_3"
                            data-name="Polygon 3"
                            d="M4,0,8,5H0Z"
                            fill={b == 1 ? "#484393" : "#d3d3d3"}
                          />
                        </svg>
                        <svg
                          className="svg_two"
                         
                          id="Group_2411"
                          data-name="Group 2411"
                          xmlns="http://www.w3.org/2000/svg"
                          width="8"
                          height="12"
                          viewBox="0 0 8 12"
                        >
                          <path
                            id="Polygon_4"
                            data-name="Polygon 4"
                            d="M4,0,8,5H0Z"
                            transform="translate(8 12) rotate(180)"
                            fill={b == 2 ? "#484393" : "#d3d3d3"}
                          />
                        </svg>
                      </div>
                    </div>
                  </th>
                  {/* lead date*/}
                  <th class="th-sm extra_class"
                  onClick={() => {
                    // alternate("name");
                    setA(0);
                    setB(0);

                    if (c == 1) {
                      getinvitelistdata("id",1)
                      setC(2);
                    } else {
                      setC(1);
                      getinvitelistdata("id",-1)
                    }}}>
                    <div className="first_div">
                      User_id
                      <div className="svg_grid">
                        <svg
                          className="svg_one"
                        
                          id="Group_2411"
                          data-name="Group 2411"
                          xmlns="http://www.w3.org/2000/svg"
                          width="8"
                          height="12"
                          viewBox="0 0 8 12"
                        >
                          <path
                            id="Polygon_3"
                            data-name="Polygon 3"
                            d="M4,0,8,5H0Z"
                            fill={c == 1 ? "#484393" : "#d3d3d3"}
                          />
                        </svg>
                        <svg
                          className="svg_two"
                         
                          id="Group_2411"
                          data-name="Group 2411"
                          xmlns="http://www.w3.org/2000/svg"
                          width="8"
                          height="12"
                          viewBox="0 0 8 12"
                        >
                          <path
                            id="Polygon_4"
                            data-name="Polygon 4"
                            d="M4,0,8,5H0Z"
                            transform="translate(8 12) rotate(180)"
                            fill={c == 2 ? "#484393" : "#d3d3d3"}
                          />
                        </svg>
                      </div>
                    </div>
                  </th>
                  <th class="th-sm extra_class">
                    <div className="first_div">
                     Edit
                     
                    </div>
                  </th>
                  {/* lead details */}
                  <th class="th-sm extra_class">
                    <div className="first_div12">
                      Delete
                      
                    </div>
                  </th>
               
                </tr>
              </thead>
            
              <tbody>
              {invitedList.length>0 && 
                 invitedList.map(ele=>(
                    <tr>
                      <td className="text-center">{ele.email}</td>
                      <td>{ele.invitation_code}</td>
                      <td>{ele.id}</td>
                      <td>
                      <Link
                   onClick={()=>{
                    global.invitedUser=ele
                      setInvitedUser(ele)
                      editInvitedMember(ele);
         }}
                  >
                    <svg
                      width="12.489"
                      height="13.624"
                      fill="#9B9B9B"
                      viewBox="0 -1 381.53417 381"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="m370.589844 230.964844c-5.523438 0-10 4.476562-10 10v88.792968c-.019532 16.558594-13.4375 29.980469-30 30h-280.589844c-16.5625-.019531-29.980469-13.441406-30-30v-260.589843c.019531-16.5625 13.4375-29.980469 30-30h88.789062c5.523438 0 10-4.476563 10-10 0-5.523438-4.476562-10-10-10h-88.789062c-27.601562.03125-49.96875 22.398437-50 50v260.589843c.03125 27.601563 22.398438 49.96875 50 50h280.589844c27.601562-.03125 49.96875-22.398437 50-50v-88.789062c0-5.523438-4.476563-10.003906-10-10.003906zm0 0" />
                      <path d="m156.367188 178.34375 146.011718-146.015625 47.089844 47.089844-146.011719 146.015625zm0 0" />
                      <path d="m132.542969 249.257812 52.039062-14.414062-37.625-37.625zm0 0" />
                      <path d="m362.488281 7.578125c-9.769531-9.746094-25.585937-9.746094-35.355469 0l-10.605468 10.605469 47.089844 47.089844 10.605468-10.605469c9.75-9.769531 9.75-25.585938 0-35.355469zm0 0" />
                    </svg>
                  </Link>
                      </td>
                      <td>
                      <a
                    className="pub_deltcs"
                    onClick={()=>{
                      setInvitedUser({})
                     const data = {
                       "email":ele.email
                     };
                // //console.log("dataofinvite",data)
                const deleteinvitemember = {
                  url:
                    API_URL+"/user/remove-invited-member",
                  data: data,
                  method: "post",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("access_token"),
                  },
                };
                axios(deleteinvitemember)
                  .then(response => {
                    if (response.status == 200) {
                      
                   
              ////console.log(response,"success deleting invited member")
                          getinvitelistdata()
    
  
                    }

                  })
                  .catch(error => {
                  
                    if (error.response.status === 500) {
                      // //console.log("error",error)
                      ////console.log(error.response,"error upadting roles of team member")
                      alert("error")
                        //seterrormessage("Email Already exist")
                    } else {
                    }
                  });
               }}
                  >
                    <svg
                      height="15"
                      viewBox="-40 0 427 427.00131"
                      width="15"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="m232.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0" />
                      <path d="m114.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0" />
                      <path d="m28.398438 127.121094v246.378906c0 14.5625 5.339843 28.238281 14.667968 38.050781 9.285156 9.839844 22.207032 15.425781 35.730469 15.449219h189.203125c13.527344-.023438 26.449219-5.609375 35.730469-15.449219 9.328125-9.8125 14.667969-23.488281 14.667969-38.050781v-246.378906c18.542968-4.921875 30.558593-22.835938 28.078124-41.863282-2.484374-19.023437-18.691406-33.253906-37.878906-33.257812h-51.199218v-12.5c.058593-10.511719-4.097657-20.605469-11.539063-28.03125-7.441406-7.421875-17.550781-11.5546875-28.0625-11.46875h-88.796875c-10.511719-.0859375-20.621094 4.046875-28.0625 11.46875-7.441406 7.425781-11.597656 17.519531-11.539062 28.03125v12.5h-51.199219c-19.1875.003906-35.394531 14.234375-37.878907 33.257812-2.480468 19.027344 9.535157 36.941407 28.078126 41.863282zm239.601562 279.878906h-189.203125c-17.097656 0-30.398437-14.6875-30.398437-33.5v-245.5h250v245.5c0 18.8125-13.300782 33.5-30.398438 33.5zm-158.601562-367.5c-.066407-5.207031 1.980468-10.21875 5.675781-13.894531 3.691406-3.675781 8.714843-5.695313 13.925781-5.605469h88.796875c5.210937-.089844 10.234375 1.929688 13.925781 5.605469 3.695313 3.671875 5.742188 8.6875 5.675782 13.894531v12.5h-128zm-71.199219 32.5h270.398437c9.941406 0 18 8.058594 18 18s-8.058594 18-18 18h-270.398437c-9.941407 0-18-8.058594-18-18s8.058593-18 18-18zm0 0" />
                      <path d="m173.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0" />
                    </svg>
                  </a>
                      </td>
                      {/* <td>{item.publisher_id}</td> */}
                     
                      

                     
                    </tr>
                  ))}
             
              </tbody>
             
            </table>
            {invitedList.length==0 &&
        <p  className="inv_text"> Invite some members to expand your team</p>
        }
</div>














      
      



    {/* {teamList.length>0 &&  
        <div className="personal_heading_set1">
        <p>Team Members</p>
      </div>
   



    } */}


<div className="team1_box">
    <div className="personal_heading_set1">
        <p>Team Members</p>
      </div>

<table
              id="dtBasicExample"
              class="table table-striped table-sm"
              cellspacing="0"
            >
              <thead>
                <tr
                  style={{
                    color: "#484393",
                    fontWeight: "bolder",
                    fontSize: 20
                  }}
                >
                  <th class="th-sm extra_class text-center"
                   onClick={() => {
                    // alternate("name");
                    setBB(0);
                    setCC(0);
                    setDD(0);

                    if (aa == 1) {
                      getteamlistdata(
                        "email",1
                      );
                      setAA(2);
                    } else {
                      setAA(1);
                      getteamlistdata(
                        "email",-1
                      );
                    }
                  }}>
                    <div className="first_div">
                     Email
                      <div className="svg_grid">  
                        <svg
                          className="svg_one"
                         
                          id="Group_2411"
                          data-name="Group 2411"
                          xmlns="http://www.w3.org/2000/svg"
                          width="8"
                          height="12"
                          viewBox="0 0 8 12"
                        >
                          <path
                            id="Polygon_3"
                            data-name="Polygon 3"
                            d="M4,0,8,5H0Z"
                            fill={aa == 1 ? "#484393" : "#d3d3d3"}
                          />
                        </svg>
                        <svg
                          className="svg_two"
                         
                          id="Group_2411"
                          data-name="Group 2411"
                          xmlns="http://www.w3.org/2000/svg"
                          width="8"
                          height="12"
                          viewBox="0 0 8 12"
                        >
                          <path
                            id="Polygon_4"
                            data-name="Polygon 4"
                            d="M4,0,8,5H0Z"
                            transform="translate(8 12) rotate(180)"
                            fill={aa == 2 ? "#484393" : "#d3d3d3"}
                          />
                        </svg>
                      </div>
                    </div>
                  </th>
                  {/* lead id*/}
                  <th class="th-sm extra_class"
                  onClick={() => {
                    // alternate("name");
                    setAA(0);
                    setCC(0);
                    setDD(0);

                    if (bb == 1) {
                      getteamlistdata(
                        "firstname",1
                      );
                      setBB(2);
                    } else {
                      setBB(1);
                      getteamlistdata(
                        "firstname",-1
                      );
                    }
                  }}>
                    <div className="first_div">
                      First Name
                      <div className="svg_grid">
                        <svg
                          className="svg_one"
                         
                          id="Group_2411"
                          data-name="Group 2411"
                          xmlns="http://www.w3.org/2000/svg"
                          width="8"
                          height="12"
                          viewBox="0 0 8 12"
                        >
                          <path
                            id="Polygon_3"
                            data-name="Polygon 3"
                            d="M4,0,8,5H0Z"
                           fill={bb == 1 ? "#484393" : "#d3d3d3"}
                          />
                        </svg>
                        <svg
                          className="svg_two"
                         
                          id="Group_2411"
                          data-name="Group 2411"
                          xmlns="http://www.w3.org/2000/svg"
                          width="8"
                          height="12"
                          viewBox="0 0 8 12"
                        >
                          <path
                            id="Polygon_4"
                            data-name="Polygon 4"
                            d="M4,0,8,5H0Z"
                            transform="translate(8 12) rotate(180)"
                           fill={bb == 2 ? "#484393" : "#d3d3d3"}
                          />
                        </svg>
                      </div>
                    </div>
                  </th>
                  <th class="th-sm extra_class"
                   onClick={() => {
                    // alternate("name");
                    setAA(0);
                    setBB(0);
                    setDD(0);

                    if (cc == 1) {
                      getteamlistdata(
                        "lastname",1
                      );
                      setCC(2);
                    } else {
                      setCC(1);
                      getteamlistdata(
                        "lastname",-1
                      );
                    }
                  }}>
                    <div className="first_div">
                     Last Name
                      <div className="svg_grid">
                        <svg
                          className="svg_one"
                         
                          id="Group_2411"
                          data-name="Group 2411"
                          xmlns="http://www.w3.org/2000/svg"
                          width="8"
                          height="12"
                          viewBox="0 0 8 12"
                        >
                          <path
                            id="Polygon_3"
                            data-name="Polygon 3"
                            d="M4,0,8,5H0Z"
                             fill={cc == 1 ? "#484393" : "#d3d3d3"}
                          />
                        </svg>
                        <svg
                          className="svg_two"
                         
                          id="Group_2411"
                          data-name="Group 2411"
                          xmlns="http://www.w3.org/2000/svg"
                          width="8"
                          height="12"
                          viewBox="0 0 8 12"
                        >
                          <path
                            id="Polygon_4"
                            data-name="Polygon 4"
                            d="M4,0,8,5H0Z"
                            transform="translate(8 12) rotate(180)"
                             fill={cc == 2 ? "#484393" : "#d3d3d3"}
                          />
                        </svg>
                      </div>
                    </div>
                  </th>
                 
                  {/* lead date*/}
                  <th class="th-sm extra_class"
                   onClick={() => {
                    // alternate("name");
                    setAA(0);
                    setBB(0);
                    setCC(0);

                    if (dd == 1) {
                      getteamlistdata(
                        "id",1
                      );
                      setDD(2);
                    } else {
                      setDD(1);
                      getteamlistdata(
                        "id",-1
                      );
                    }
                  }}>
                    <div className="first_div">
                      User_id
                      <div className="svg_grid">
                        <svg
                          className="svg_one"
                        
                          id="Group_2411"
                          data-name="Group 2411"
                          xmlns="http://www.w3.org/2000/svg"
                          width="8"
                          height="12"
                          viewBox="0 0 8 12"
                        >
                          <path
                            id="Polygon_3"
                            data-name="Polygon 3"
                            d="M4,0,8,5H0Z"
                           fill={dd == 1 ? "#484393" : "#d3d3d3"}
                          />
                        </svg>
                        <svg
                          className="svg_two"
                         
                          id="Group_2411"
                          data-name="Group 2411"
                          xmlns="http://www.w3.org/2000/svg"
                          width="8"
                          height="12"
                          viewBox="0 0 8 12"
                        >
                          <path
                            id="Polygon_4"
                            data-name="Polygon 4"
                            d="M4,0,8,5H0Z"
                            transform="translate(8 12) rotate(180)"
                           fill={dd == 2 ? "#484393" : "#d3d3d3"}
                          />
                        </svg>
                      </div>
                    </div>
                  </th>
                  <th class="th-sm extra_class">
                    <div className="first_div">
                     Edit
                     
                    </div>
                  </th>
                  {/* lead details */}
                  <th class="th-sm extra_class">
                    <div className="first_div12">
                      Delete
                      
                    </div>
                  </th>
               
                </tr>
              </thead>
            
              <tbody>
              {teamList.length>0 && 
                teamList.map(ele=>(
                    <tr>
                      <td className="text-center">{ele.email}</td>
                      <td>{ele.firstname}</td>
                      <td>{ele.lastname}</td>
                      <td>{ele.id}</td>
                      <td>
                      <Link
                 onClick={()=>{
                                
                  setTeamMember(ele)
                  editTeamMember(ele);
     }}
                  >
                    <svg
                      width="12.489"
                      height="13.624"
                      fill="#9B9B9B"
                      viewBox="0 -1 381.53417 381"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="m370.589844 230.964844c-5.523438 0-10 4.476562-10 10v88.792968c-.019532 16.558594-13.4375 29.980469-30 30h-280.589844c-16.5625-.019531-29.980469-13.441406-30-30v-260.589843c.019531-16.5625 13.4375-29.980469 30-30h88.789062c5.523438 0 10-4.476563 10-10 0-5.523438-4.476562-10-10-10h-88.789062c-27.601562.03125-49.96875 22.398437-50 50v260.589843c.03125 27.601563 22.398438 49.96875 50 50h280.589844c27.601562-.03125 49.96875-22.398437 50-50v-88.789062c0-5.523438-4.476563-10.003906-10-10.003906zm0 0" />
                      <path d="m156.367188 178.34375 146.011718-146.015625 47.089844 47.089844-146.011719 146.015625zm0 0" />
                      <path d="m132.542969 249.257812 52.039062-14.414062-37.625-37.625zm0 0" />
                      <path d="m362.488281 7.578125c-9.769531-9.746094-25.585937-9.746094-35.355469 0l-10.605468 10.605469 47.089844 47.089844 10.605468-10.605469c9.75-9.769531 9.75-25.585938 0-35.355469zm0 0" />
                    </svg>
                  </Link>
                      </td>
                      <td>
                      <a
                    className="pub_deltcs"
                    onClick={()=>{
                      setInvitedUser({})
                     const data = {
                       "email":ele.email
                     };
                // //console.log("dataofinvite",data)
                const deleteinvitemember = {
                  url:
                    API_URL+"/user/remove-team-member",
                  data: data,
                  method: "post",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("access_token"),
                  },
                };
                axios(deleteinvitemember)
                  .then(response => {
                    if (response.status == 200) {
                      
                   
              ////console.log(response,"success deleting team member")
                      getteamlistdata()
    
  
                    }

                  })
                  .catch(error => {
                  
                    if (error.response.status === 500) {
                      // //console.log("error",error)
                      ////console.log(error.response,"error upadting roles of team member")
                      alert("error")
                        //seterrormessage("Email Already exist")
                    } else {
                    }
                  });
               }}
                  >
                    <svg
                      height="15"
                      viewBox="-40 0 427 427.00131"
                      width="15"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="m232.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0" />
                      <path d="m114.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0" />
                      <path d="m28.398438 127.121094v246.378906c0 14.5625 5.339843 28.238281 14.667968 38.050781 9.285156 9.839844 22.207032 15.425781 35.730469 15.449219h189.203125c13.527344-.023438 26.449219-5.609375 35.730469-15.449219 9.328125-9.8125 14.667969-23.488281 14.667969-38.050781v-246.378906c18.542968-4.921875 30.558593-22.835938 28.078124-41.863282-2.484374-19.023437-18.691406-33.253906-37.878906-33.257812h-51.199218v-12.5c.058593-10.511719-4.097657-20.605469-11.539063-28.03125-7.441406-7.421875-17.550781-11.5546875-28.0625-11.46875h-88.796875c-10.511719-.0859375-20.621094 4.046875-28.0625 11.46875-7.441406 7.425781-11.597656 17.519531-11.539062 28.03125v12.5h-51.199219c-19.1875.003906-35.394531 14.234375-37.878907 33.257812-2.480468 19.027344 9.535157 36.941407 28.078126 41.863282zm239.601562 279.878906h-189.203125c-17.097656 0-30.398437-14.6875-30.398437-33.5v-245.5h250v245.5c0 18.8125-13.300782 33.5-30.398438 33.5zm-158.601562-367.5c-.066407-5.207031 1.980468-10.21875 5.675781-13.894531 3.691406-3.675781 8.714843-5.695313 13.925781-5.605469h88.796875c5.210937-.089844 10.234375 1.929688 13.925781 5.605469 3.695313 3.671875 5.742188 8.6875 5.675782 13.894531v12.5h-128zm-71.199219 32.5h270.398437c9.941406 0 18 8.058594 18 18s-8.058594 18-18 18h-270.398437c-9.941407 0-18-8.058594-18-18s8.058593-18 18-18zm0 0" />
                      <path d="m173.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0" />
                    </svg>
                  </a>
                      </td>
                      {/* <td>{item.publisher_id}</td> */}
                     
                      

                     
                    </tr>
                  ))}
             
              </tbody>
             
            </table>
            {teamList.length==0 &&  
        <div className="personal_heading_set1aa">
        <p>No Records</p>
      </div>
   
    }
</div>

    </div>
  );
};
{/*
****************************************************************************************************************************************
****************************************************************************************************************************************
****************************************************************************************************************************************
****************************************************************************************************************************************
#####################################################################################################################################
#####################################################################################################################################
#####################################################################################################################################
#####################################################################################################################################
*/}
//ANCHOR INVITE TEAM MEMBER MODAL
function Invite(props) {
  // this is a modal component for sending invitation
  const [email, setEmail] = useState("");
  const [inviteemail, setinviteemail] = useState(false);
  const[showtable,setshowtable]=useState(false);
  const[leadper,setleadper]=useState([])
  const[campper,setcampper]=useState([])
  const[buyerper,setbuyerper]=useState([])
  const[pubper,setpubper]=useState([])
  const[vertiper,setvertiper]=useState([])
  const[onviewc,setonviewc]=useState(true)
  const[onviewb,setonviewb]=useState(true)
  const[onviewp,setonviewp]=useState(true)
  const[onviewv,setonviewv]=useState(true)
  const[errormessage,seterrormessage]=useState("")
  const [inviteemail2, setinviteemail2] = useState(false);

  const checkEmail = str => {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
// validation for email
    if (reg.test(str)) {
      return true;
    }
    return false;
  };
  const handleEmail = ema => {
    //function to check mail and if it is in correct format , shows a table for permissions
    setEmail(ema);
    if (checkEmail(ema) == false) {
      setinviteemail(true);
      setshowtable(false)

    } else {
      setinviteemail(false);
      setshowtable(true)

    }
  };
  const handlelead=(per)=>{
    
    if(leadper.includes(1)){
      leadper.pop(per)

    }
    else{
      leadper.push(per)
      // //console.log(leadper)
      

    }


  }
  const handlecamp=(per)=>{
    ////console.log(per,"camp")
   if(campper.includes(per)==false){
     if(campper.find(element => element == per)==undefined){
      if(per==1){
        setonviewc(false);
        campper.push(per);
        // //console.log("camp",campper)

      }
      else{
        campper.push(per);
        // //console.log("camp",campper)

      }

     }

   }
   else{
   let a = campper.indexOf(per);
       if(per==1){
         setonviewc(true);
         const newcampper = campper.filter((item, idx) => idx !== a);
    setcampper(newcampper);
    // //console.log("camp",campper)

       }
       else{
        const newcampper = campper.filter((item, idx) => idx !== a);
        setcampper(newcampper);
        // //console.log("camp",campper)

       }
      }
  }
  const handlebuyer=(per)=>{
    ////console.log(per,"buy")
    if(buyerper.includes(per)==false){
      if(buyerper.find(element => element == per)==undefined){
       if(per==1){
         setonviewb(false);
         buyerper.push(per);
        //  //console.log("buyer",buyerper)
 
       }
       else{
         buyerper.push(per);
        //  //console.log("buyer",buyerper)
 
       }
 
      }
 
    }
    else{
    let a = buyerper.indexOf(per);
        if(per==1){
          setonviewb(true);
          const newbuyerper = buyerper.filter((item, idx) => idx !== a);
     setbuyerper(newbuyerper);
    //  //console.log("buyer",buyerper)
 
        }
        else{
          const newbuyerper = buyerper.filter((item, idx) => idx !== a);
          setbuyerper(newbuyerper);
          // //console.log("buyer",buyerper)
 
        }
       }

  }
  const handlepub=(per)=>{
    ////console.log(per,"pub")
    if(pubper.includes(per)==false){
      if(pubper.find(element => element == per)==undefined){
       if(per==1){
         setonviewp(false);
         pubper.push(per);
        //  //console.log("publishe",pubper)
 
       }
       else{
         pubper.push(per);
        //  //console.log("publishe",pubper)
 
       }
 
      }
 
    }
    else{
    let a = pubper.indexOf(per);
        if(per==1){
          setonviewp(true);
          const newpubper = pubper.filter((item, idx) => idx !== a);
     setpubper(newpubper);
    //  //console.log("publishe",pubper)
 
        }
        else{
          const newpubper = pubper.filter((item, idx) => idx !== a);
          setpubper(newpubper);
          // //console.log("publishe",pubper)
 
        }
       }


  }
  const handlevert=(per)=>{
    ////console.log(per,"ver")
    if(vertiper.includes(per)==false){
      if(vertiper.find(element => element == per)==undefined){
       if(per==1){
         setonviewv(false);
         vertiper.push(per);
        //  //console.log("vertical",vertiper)
 
       }
       else{
         vertiper.push(per);
        //  //console.log("vertical",vertiper)
 
       }
 
      }
 
    }
    else{
    let a = vertiper.indexOf(per);
        if(per==1){
          setonviewv(true);
          const newvertiper = vertiper.filter((item, idx) => idx !== a);
     setvertiper(newvertiper);
    //  //console.log("vertical",vertiper)
 
        }
        else{
          const newvertiper = vertiper.filter((item, idx) => idx !== a);
          setvertiper(newvertiper);
          // //console.log("vertical",vertiper)
 
        }
       }


  }
  const checkEmail2 = str => {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (reg.test(str)) {
      return true;
    }
    return false;
  };
  const inviteteam=()=>{
   // let email=localStorage.getItem("email")
    if(email=="" || checkEmail2(email)==false){
      setinviteemail2(true)
      // alert("Enter Valid Email")
    }
else{
    const data = {
      email:email,
      member_type: "m",
      permission_ids: [
        {
        module_id: 2,
        actions: leadper,
      },
      {
        module_id: 3,
        actions: campper,

      },
      {
        module_id: 4,
        actions: buyerper,

      },
      {
        module_id: 5,
        actions: pubper,

      },
      {
        module_id: 6,
        actions: vertiper,

      }
       
      ]
    };
    // //console.log("dataofinvite",data)
    const inviteteammate = {
      url:
        API_URL+"/user/invite",
      data: data,
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    };
    axios(inviteteammate)
      .then(response => {
        if (response.status == 200) {
          setshowtable(false);
          setonviewc(true)
         setonviewb(true)
          setonviewp(true)
          setonviewv(true)
          seterrormessage("")
          props.onHide();
// //console.log("sucess")
          props.getinvitelistdata();
          //props.onHide
        
        }

      })
      .catch(error => {
       
        if (error.response.status === 500) {
          ////console.log("error",error)

            seterrormessage("Email Already exist")
        } else {
        }
      });
    }
  }

  return (
    <Modal
      id="main_modal"
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header id="modal_head">
        <div id="close_img2" onClick={props.onHide}>
          <IoIosClose onClick={props.onHide} />
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="modal_set_box">
        <div className="personal_heading_set1">
            <p>Invite Team Member</p>
          </div>
<Row>
          <div id="form2_class">
          <Form.Control
            value={email}
            onChange={event => handleEmail(event.target.value)}
            id="email_id_setting123"
            type="email"
            placeholder="Enter Email"
          />
        </div>
        {inviteemail2 == true ? (
          <div className="email_err_set1234">
            <p><span > <i class="fa fa-exclamation-circle circle_err" aria-hidden="true"></i></span>Enter valid email</p>
          </div>
        ) : (
          <p></p>
        )}
        {inviteemail == true ? (
          <div className="email_err_set123">
            <p><span > <i class="fa fa-exclamation-circle circle_err" aria-hidden="true"></i></span>Check the format of email</p>
          </div>
        ) : (
          <p></p>
        )}



        <div>
        <div className="buttonclass">
          <button id="button_id_set" onClick={()=>{inviteteam()}}> Invite</button>
        
        </div>

      
        </div>

     
        </Row>
        {errormessage==""?(<p></p>):(
    <p style={{color:'red',textAlign:'left',marginBottom:"0px",fontSize:"16px",fontWeight:"500",marginTop:"-1.5rem"}}>{errormessage}</p>
  )

  }
        </div>
      
  {
    showtable == true?(
      <table
      id="dtBasicExample"
      class="table table-striped table-sm"
      cellspacing="0"
    >
      <tr>
        <td></td>
        <th scope="col">Lead</th>
        <th scope="col">Campaign</th>
      
        <th scope="col">Buyer</th>
        <th scope="col">Publisher</th>
        <th scope="col">Vertical</th>
      </tr>
      <tr>
        <th scope="row">View</th>
        <td>
          {" "}
          <input type="checkbox"   onChange={() => handlelead(1)} />
        </td>
        <td>
          {" "}
          <input type="checkbox"  onChange={() =>handlecamp(1) }/>
        </td>
        <td>
          {" "}
          <input type="checkbox"  onChange={() => handlebuyer(1)}/>
        </td>
        <td>
          {" "}
          <input type="checkbox" onChange={() => handlepub(1)} />
        </td>
        <td>
          {" "}
          <input type="checkbox" onChange={() => handlevert(1)}/>
        </td>
      </tr>
      <tr>
        <th scope="row">Create</th>
        <td>
          {" "}
          {/* <input type="checkbox"  onChange={() => handlelead(2)} /> */}
        </td>
        <td>
          {" "}
          <input type="checkbox" disabled={onviewc} onChange={() =>handlecamp(2) }/>
        </td>
        <td>
          {" "}
          <input type="checkbox" disabled={onviewb} onChange={() => handlebuyer(2)}/>
        </td>
        <td>
          {" "}
          <input type="checkbox" disabled={onviewp} onChange={() => handlepub(2)} />
        </td>
        <td>
          {" "}
          <input type="checkbox" disabled={onviewv} onChange={() => handlevert(2)}/>
        </td>
      </tr>
      <tr>
        <th scope="row">Update</th>
        <td>
          {" "}
          {/* <input type="checkbox"  onChange={() => handlelead(3)} /> */}
        </td>
        <td>
          {" "}
          <input type="checkbox"  disabled={onviewc} onChange={() =>handlecamp(3) }/>
        </td>
        <td>
          {" "}
          <input type="checkbox"  disabled={onviewb} onChange={() => handlebuyer(3)}/>
        </td>
        <td>
          {" "}
          <input type="checkbox" disabled={onviewp} onChange={() => handlepub(3)} />
        </td>
        <td>
          {" "}
          <input type="checkbox" disabled={onviewv} onChange={() => handlevert(3)}/>
        </td>
      </tr>
      <tr>
        <th scope="row">Delete</th>
        <td>
          {" "}
          {/* <input type="checkbox"  onChange={() => handlelead(4)} /> */}
        </td>
        <td>
          {" "}
          <input type="checkbox"  disabled={onviewc} onChange={() =>handlecamp(4) }/>
        </td>
        <td>
          {" "}
          <input type="checkbox"  disabled={onviewb} onChange={() => handlebuyer(4)}/>
        </td>
        <td>
          {" "}
          <input type="checkbox" disabled={onviewp} onChange={() => handlepub(4)} />
        </td>
        <td>
          {" "}
          <input type="checkbox" disabled={onviewv} onChange={() => handlevert(4)}/>
        </td>
      </tr>
    </table>

    ):(
<p></p>
    )
  }
  
       

      
      </Modal.Body>
    </Modal>
  );
};
{/*
****************************************************************************************************************************************
****************************************************************************************************************************************
****************************************************************************************************************************************
****************************************************************************************************************************************
#####################################################################################################################################
#####################################################################################################################################
#####################################################################################################################################
#####################################################################################################################################
*/}
//ANCHOR MODAL FOR EDITTING INVITED TEAM MEMBER
function EditInvite(props) {
    //modal for editting invite team member
    const[onviewc,setonviewc]=useState(true);
    const[onviewb,setonviewb]=useState(true);
    const[onviewp,setonviewp]=useState(true);
    const[onviewv,setonviewv]=useState(true);
   const [leads,setLeads]=useState({"1":false,"2":false,"3":false,"4":false});
   const [camp,setCamp]=useState({"1":false,"2":false,"3":false,"4":false});
   const [buy,setBuy]=useState({"1":false,"2":false,"3":false,"4":false});
   const [pub,setPub]=useState({"1":false,"2":false,"3":false,"4":false});
   const [vert,setVert]=useState({"1":false,"2":false,"3":false,"4":false});
   const [refresh,setRefresh]=useState({});
  
     useEffect(()=>{
       //this functions sets the values in the permissions table that it recieves from props
         let user=(props.user);
        //  //console.log(user,"myuser*************************************************************************************")
         setonviewb(true)
         setonviewc(true)
         setonviewp(true)
         setonviewv(true)

            let data=user.permission_ids;
            let leads3=leads
            let camp3=camp
            let buy3=buy
            let pub3=pub
            let vert3=vert
            //    //console.log(data,"data")
            // //console.log("leads",leads3)
            // //console.log("camp",camp3)
            // //console.log("buy",buy3)
            // //console.log("pub",pub3)
            // //console.log("vert",vert3)
             let leads1=Object.assign({},{"1":false,"2":false,"3":false,"4":false})   
            setLeads(leads1)
            let camp1=Object.assign({},{"1":false,"2":false,"3":false,"4":false})
            setCamp(camp1)
            let buy1=Object.assign({},{"1":false,"2":false,"3":false,"4":false})
            setBuy(buy1)
            let pub1=Object.assign({},{"1":false,"2":false,"3":false,"4":false})
            setPub(pub1)
            let vert1=Object.assign({},{"1":false,"2":false,"3":false,"4":false})
            setVert(vert1)
            // //console.log(data,"data")
            // //console.log("leads",leads1)
            // //console.log("camp",camp1)
            // //console.log("buy",buy1)
            // //console.log("pub",pub1)
            // //console.log("vert",vert1)
            if(data){
                //this condition is added because ,js first compiles code and when it does so , the data is empty and cuases problems
                // //console.log(user,"myuser####################################################################################*")
            if(data.length>0 && user!={}){
              //proceed further only if the data has values
                data=JSON.parse(data)
                // //console.log(data,"data#####################################")
            data.forEach(element => {
                // //console.log(element,"ele")
                if(element.module_id==2){
                    // //console.log(element.module_id,"element.module_id")
                    const canTick = (element) => element===1;
                      if(element.actions.some(canTick)){
                        
                        element.actions.forEach(ele =>{
                          
                          
                          // //console.log(ele," element.actions")
                          // leads1 = Object.assign({}, leads1, {
                            // ele: true,
                            // });
                            leads1[ele]=true
                          })
                        }
                }
                if(element.module_id==3){
                  const canTick = (element) => element===1;
                      if(element.actions.some(canTick)){
                        setonviewc(false)
                      element.actions.forEach(ele =>{
                        camp1[ele]=true
                        // camp1 = Object.assign({}, camp1, {
                        // ele: true,
                        // });
                    })
                  }
                }
                if(element.module_id==4){
                  const canTick = (element) => element===1;
                      if(element.actions.some(canTick)){
                        setonviewb(false)
                      element.actions.forEach(ele =>{
                        buy1[ele]=true
                        //   buy1 = Object.assign({}, buy1, {
                        // ele: true,
                        // });
                    })
                  }
                }
                if(element.module_id==5){
                  const canTick = (element) => element===1;
                      if(element.actions.some(canTick)){
                        setonviewp(false)
                      element.actions.forEach(ele =>{
                        pub1[ele]=true
                        //   pub1 = Object.assign({}, pub1, {
                        // ele: true,
                        // });
                    })
                  }
                }
                if(element.module_id==6){
                  const canTick = (element) => element===1;
                      if(element.actions.some(canTick)){
                        setonviewv(false)
                      element.actions.forEach(ele =>{
                        vert1[ele]=true
                        //   vert1 = Object.assign({}, vert1, {
                        // ele: true,
                        // });
                    })
                  }
                }
                
            });
        }}
           let leads2=Object.assign({},leads1)
            setLeads(leads2)
            let camp2=Object.assign({},camp1)
            setCamp(camp2)
            let buy2=Object.assign({},buy1)
            setBuy(buy2)
            let pub2=Object.assign({},pub1)
            setPub(pub2)
            let vert2=Object.assign({},vert1)
            setVert(vert2)
            // //console.log("AFTER C H A N G I N G")
            // //console.log("leads",leads1)
            // //console.log("camp",camp1)
            // //console.log("buy",buy1)
            // //console.log("pub",pub1)
            // //console.log("vert",vert1)
            
    },[props.user,props.id,props.show])
  //   const handlelead=(per)=>{
  //   if(leadper.includes(1)){
  //     leadper.pop(per)

  //   }
  //   else{
  //     leadper.push(per)
  //     //console.log(leadper)
      

  //   }


  // }
  // const handlecamp=(per)=>{
  //   ////console.log(per,"camp")
  //  if(campper.includes(per)==false){
  //    if(campper.find(element => element == per)==undefined){
  //     if(per==1){
  //       setonviewc(false);
  //       campper.push(per);
  //       //console.log("camp",campper)

  //     }
  //     else{
  //       campper.push(per);
  //       //console.log("camp",campper)

  //     }

  //    }

  //  }
  //  else{
  //  let a = campper.indexOf(per);
  //      if(per==1){
  //        setonviewc(true);
  //        const newcampper = campper.filter((item, idx) => idx !== a);
  //   setcampper(newcampper);
  //   //console.log("camp",campper)

  //      }
  //      else{
  //       const newcampper = campper.filter((item, idx) => idx !== a);
  //       setcampper(newcampper);
  //       //console.log("camp",campper)

  //      }
  //     }
  // }
  // const handlebuyer=(per)=>{
  //   ////console.log(per,"buy")
  //   if(buyerper.includes(per)==false){
  //     if(buyerper.find(element => element == per)==undefined){
  //      if(per==1){
  //        setonviewb(false);
  //        buyerper.push(per);
  //        //console.log("buyer",buyerper)
 
  //      }
  //      else{
  //        buyerper.push(per);
  //        //console.log("buyer",buyerper)
 
  //      }
 
  //     }
 
  //   }
  //   else{
  //   let a = buyerper.indexOf(per);
  //       if(per==1){
  //         setonviewb(true);
  //         const newbuyerper = buyerper.filter((item, idx) => idx !== a);
  //    setbuyerper(newbuyerper);
  //    //console.log("buyer",buyerper)
 
  //       }
  //       else{
  //         const newbuyerper = buyerper.filter((item, idx) => idx !== a);
  //         setbuyerper(newbuyerper);
  //         //console.log("buyer",buyerper)
 
  //       }
  //      }

  // }
  // const handlepub=(per)=>{
  //   ////console.log(per,"pub")
  //   if(pubper.includes(per)==false){
  //     if(pubper.find(element => element == per)==undefined){
  //      if(per==1){
  //        setonviewp(false);
  //        pubper.push(per);
  //        //console.log("publishe",pubper)
 
  //      }
  //      else{
  //        pubper.push(per);
  //        //console.log("publishe",pubper)
 
  //      }
 
  //     }
 
  //   }
  //   else{
  //   let a = pubper.indexOf(per);
  //       if(per==1){
  //         setonviewp(true);
  //         const newpubper = pubper.filter((item, idx) => idx !== a);
  //    setpubper(newpubper);
  //    //console.log("publishe",pubper)
 
  //       }
  //       else{
  //         const newpubper = pubper.filter((item, idx) => idx !== a);
  //         setpubper(newpubper);
  //         //console.log("publishe",pubper)
 
  //       }
  //      }


  // }
  // const handlevert=(per)=>{
  //   ////console.log(per,"ver")
  //   if(vertiper.includes(per)==false){
  //     if(vertiper.find(element => element == per)==undefined){
  //      if(per==1){
  //        setonviewv(false);
  //        vertiper.push(per);
  //        //console.log("vertical",vertiper)
 
  //      }
  //      else{
  //        vertiper.push(per);
  //        //console.log("vertical",vertiper)
 
  //      }
 
  //     }
 
  //   }
  //   else{
  //   let a = vertiper.indexOf(per);
  //       if(per==1){
  //         setonviewv(true);
  //         const newvertiper = vertiper.filter((item, idx) => idx !== a);
  //    setvertiper(newvertiper);
  //    //console.log("vertical",vertiper)
 
  //       }
  //       else{
  //         const newvertiper = vertiper.filter((item, idx) => idx !== a);
  //         setvertiper(newvertiper);
  //         //console.log("vertical",vertiper)
 
  //       }
  //      }


  // }
    return(
                <Modal
                    id="main_modal"
                    {...props}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    >
                    <Modal.Header id="modal_head">
                        <div id="close_img2" onClick={()=>{
                            let leads2=Object.assign({},{})
                            setLeads(leads2)
                            let camp2=Object.assign({},{})
                            setCamp(camp2)
                            let buy2=Object.assign({},{})
                            setBuy(buy2)
                            let pub2=Object.assign({},{})
                            setPub(pub2)
                            let vert2=Object.assign({},{})
                            setVert(vert2)
  
                            let obj1=Object.assign({},{})
                            setRefresh(obj1)
                            setonviewb(true)
                            setonviewc(true)
                            setonviewp(true)
                            setonviewv(true)
                          props.onHide()
                        }
                          }>
                        <IoIosClose />
                        </div>
                    </Modal.Header>
                    <Modal.Body>
                        {/* <p>{props.user.email}</p> */}
                         <table
      id="dtBasicExample"
      class="table table-striped table-sm"
      cellspacing="0"
    >
      <tr>
              {/* leads-2 
                camp-3
                buyers-4
                publishers-5
                verticals-6

                view-1
                create-2
                update-3
                delete-4
                
        */}
        <td></td>
        <th scope="col">Lead</th>
        <th scope="col">Campaign</th>
      
        <th scope="col">Buyer</th>
        <th scope="col">Publisher</th>
        <th scope="col">Vertical</th>
      </tr>
      <tr>
        <th scope="row">View</th>
        {/* 111111111 */}
        <td>
          {" "}
          {/* leads  222222 */}
          <input type="checkbox"  
          checked={leads["1"]}
            onChange={(event) => {
              let temp=leads["1"]
              let jk=Object.assign({},leads,{"1":!temp})
              setLeads(jk)
            }} />
        </td>
        <td>
          {" "}
          {/* Campaign 33333333 */}
          <input type="checkbox" 
          checked={camp["1"]}
            onChange={() =>{
              let temp=camp["1"]
              let jk=Object.assign({},camp,{"1":!temp})
              setCamp(jk)
              setonviewc(temp)
            } }/>
        </td>
        <td>
          {" "}
          {/* buyer  44444444*/}
          <input type="checkbox" 
            checked={buy["1"]}
              onChange={() =>{
              let temp=buy["1"]
              let jk=Object.assign({},buy,{"1":!temp})
              setBuy(jk)
              setonviewb(temp)
            } }/>
        </td>
        <td>
          {" "}
          {/* publisher 5555555 */}
          <input type="checkbox" 
          checked={pub["1"]}
             onChange={() =>{
              let temp=pub["1"]
              let jk=Object.assign({},pub,{"1":!temp})
              setPub(jk)
              setonviewp(temp)
            } }/>
        </td>
        <td>
          {" "}
          {/* vertical  6666666*/}
          <input type="checkbox" 
          checked={vert["1"]}
             onChange={() =>{
              let temp=vert["1"]
              let jk=Object.assign({},vert,{"1":!temp})
              setVert(jk)
              setonviewv(temp)
            } }/>
        </td>
      </tr>
      <tr>
        <th scope="row">Create</th>
        {/* 222222222222 */}
        <td>
          {" "}
          {/* <input type="checkbox"  onChange={() => handlelead(2)} /> */}
        </td>
        <td>
          {" "}
          {/* campaigns 33333333333*/}
          <input type="checkbox" 
          checked={camp["2"]}
           disabled={onviewc} 
           onChange={() =>{
            let temp=camp["2"]
            let jk=Object.assign({},camp,{"2":!temp})
            setCamp(jk)
            } }/>
        </td>
        <td>
          {" "}
          {/* buyers 4444444444444*/}
          <input type="checkbox" 
          checked={buy["2"]}
           disabled={onviewb} 
           onChange={() =>{
            let temp=buy["2"]
            let jk=Object.assign({},buy,{"2":!temp})
            setBuy(jk)
            } }/>
        </td>
        <td>
          {" "}
          {/* publishers 5555555555*/}
          <input type="checkbox" 
          checked={pub["2"]}
           disabled={onviewp} 
           onChange={() =>{
            let temp=pub["2"]
            let jk=Object.assign({},pub,{"2":!temp})
            setPub(jk)
            } }/>
        </td>
        <td>
          {" "}
          {/* verticals 666666666*/}
          <input type="checkbox" 
          checked={vert["2"]}
           disabled={onviewv} 
           onChange={() =>{
            let temp=vert["2"]
            let jk=Object.assign({},vert,{"2":!temp})
            setVert(jk)
            } }/>
        </td>
      </tr>
      <tr>
        <th scope="row">Update</th>
        {/* 3333333333333333 */}
        <td>
          {" "}
          {/* <input type="checkbox"  onChange={() => handlelead(3)} /> */}
        </td>
        <td>
          {" "}
          {/* campaigns 3333333 */}
          <input type="checkbox" 
          checked={camp["3"]}
            disabled={onviewc} 
            onChange={() =>{
            let temp=camp["3"]
            let jk=Object.assign({},camp,{"3":!temp})
            setCamp(jk)
            } }/>
        </td>
        <td>
          {" "}
          {/* buyers 44444444 */}
          <input type="checkbox" 
          checked={buy["3"]}
           disabled={onviewb} 
           onChange={() =>{
            let temp=buy["3"]
            let jk=Object.assign({},buy,{"3":!temp})
            setBuy(jk)
            } }/>
        </td>
        <td>
          {" "}
          {/* publishers 555555555*/}
          <input type="checkbox" 
          checked={pub["3"]}
           disabled={onviewp} 
           onChange={() =>{
            let temp=pub["3"]
            let jk=Object.assign({},pub,{"3":!temp})
            setPub(jk)
            } }/>
        </td>
        <td>
          {" "}
          {/* verticals 6666666666 */}
          <input type="checkbox" 
          checked={vert["3"]}
           disabled={onviewv} 
           onChange={() =>{
            let temp=vert["3"]
            let jk=Object.assign({},vert,{"3":!temp})
            setVert(jk)
            } }/>
        </td>
      </tr>
      <tr>
        <th scope="row">Delete</th>
        {/* 44444444444444444 */}
        <td>
          {" "}
          {/* <input type="checkbox"  onChange={() => handlelead(4)} /> */}
        </td>
        <td>
          {" "}
          {/* campaigns 3333333333 */}
          <input type="checkbox" 
          checked={camp["4"]}
            disabled={onviewc} 
            onChange={() =>{
            let temp=camp["4"]
            let jk=Object.assign({},camp,{"4":!temp})
            setCamp(jk)
            } }/>
        </td>
        <td>
          {" "}
          {/* buyers 44444444444 */}
          <input type="checkbox" 
          checked={buy["4"]}
            disabled={onviewb} 
            onChange={() =>{
            let temp=buy["4"]
            let jk=Object.assign({},buy,{"4":!temp})
            setBuy(jk)
            } }/>
        </td>
        <td>
          {" "}
          {/* publishers 5555555555 */}
          <input type="checkbox" 
          checked={pub["4"]}
           disabled={onviewp} 
           onChange={() =>{
            let temp=pub["4"]
            let jk=Object.assign({},pub,{"4":!temp})
            setPub(jk)
            } }/>
        </td>
        <td>
          {" "}
          {/* verticals 66666666 */}
          <input type="checkbox" 
          checked={vert["4"]}
           disabled={onviewv} 
           onChange={() =>{
            let temp=vert["4"]
            let jk=Object.assign({},vert,{"4":!temp})
            setVert(jk)
            } }/>
        </td>
      </tr>
    </table>
    <Button 
    className="set_up_team_butt"
    onClick={()=>{
        //update roles for invited member
   let leadper=[]
   if(leads["1"]==true)
   leadper.push(1)
   let campper=[]
   if(camp["1"]==true){
     campper.push(1)
     if(camp["2"]==true)
     campper.push(2)
     if(camp["3"]==true)
     campper.push(3)
     if(camp["4"]==true)
     campper.push(4)
   }
   let buyerper=[]
   if(buy["1"]==true){
     buyerper.push(1)
     if(buy["2"]==true)
     buyerper.push(2)
     if(buy["3"]==true)
     buyerper.push(3)
     if(buy["4"]==true)
     buyerper.push(4)
   }
   let pubper=[]
   if(pub["1"]==true){
     pubper.push(1)
     if(pub["2"]==true)
     pubper.push(2)
     if(pub["3"]==true)
     pubper.push(3)
     if(pub["4"]==true)
     pubper.push(4)
   }
   let vertiper=[]
   if(vert["1"]==true){
     vertiper.push(1)
     if(vert["2"]==true)
     vertiper.push(2)
     if(vert["3"]==true)
     vertiper.push(3)
     if(vert["4"]==true)
     vertiper.push(4)
   }
    const data = {
    usertype:0,
    user_id:props.user.id,
      permission_ids: [
        {
        module_id: 2,
        actions: leadper,
      },
      {
        module_id: 3,
        actions: campper,

      },
      {
        module_id: 4,
        actions: buyerper,

      },
      {
        module_id: 5,
        actions: pubper,

      },
      {
        module_id: 6,
        actions: vertiper,

      }
       
      ]
    };
    // //console.log("dataofinvite",data)
    const updateinviteteammate = {
      url:
        API_URL+"/user/save-permissions",
      data: data,
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    };
    axios(updateinviteteammate)
      .then(response => {
        if (response.status == 200) {
          
           let leads2=Object.assign({},{})
                            setLeads(leads2)
                            let camp2=Object.assign({},{})
                            setCamp(camp2)
                            let buy2=Object.assign({},{})
                            setBuy(buy2)
                            let pub2=Object.assign({},{})
                            setPub(pub2)
                            let vert2=Object.assign({},{})
                            setVert(vert2)
  
                            let obj1=Object.assign({},{})
                            setRefresh(obj1)
                            setonviewb(true)
                            setonviewc(true)
                            setonviewp(true)
                            setonviewv(true)
                            props.getinvitelistdata()
                          props.onHide()
                    ////console.log(response,"success upadting roles of invited")

          //props.onHide
        
        }

      })
      .catch(error => {
       
        if (error.response.status === 500) {
          // //console.log("error",error)
          ////console.log(error.response,"error upadting roles of invited")
          alert("error")
            //seterrormessage("Email Already exist")
        } else {
        }
      });

    }}>Update</Button>

                    </Modal.Body>
                </Modal>
    );
}    
{/*
****************************************************************************************************************************************
****************************************************************************************************************************************
****************************************************************************************************************************************
****************************************************************************************************************************************
#####################################################################################################################################
#####################################################################################################################################
#####################################################################################################################################
#####################################################################################################################################
*/}
//ANCHOR MODAL FOR EDITTING TEAM MEMBER
function EditTeam(props) {
    // //console.log(props)
   
    const[onviewc,setonviewc]=useState(true);
    const[onviewb,setonviewb]=useState(true);
    const[onviewp,setonviewp]=useState(true);
    const[onviewv,setonviewv]=useState(true);
   const [leads,setLeads]=useState({"1":false,"2":false,"3":false,"4":false});
   const [camp,setCamp]=useState({"1":false,"2":false,"3":false,"4":false});
   const [buy,setBuy]=useState({"1":false,"2":false,"3":false,"4":false});
   const [pub,setPub]=useState({"1":false,"2":false,"3":false,"4":false});
   const [vert,setVert]=useState({"1":false,"2":false,"3":false,"4":false});
   const [refresh,setRefresh]=useState({});
     useEffect(()=>{
         let user=(props.user);
        //  //console.log(user,"myuser*************************************************************************************")
         setonviewb(true)
         setonviewc(true)
         setonviewp(true)
         setonviewv(true)

            let data=user.permission_ids;
            let leads3=leads
            let camp3=camp
            let buy3=buy
            let pub3=pub
            let vert3=vert
            //    //console.log(data,"data")
            // //console.log("leads",leads3)
            // //console.log("camp",camp3)
            // //console.log("buy",buy3)
            // //console.log("pub",pub3)
            // //console.log("vert",vert3)
             let leads1=Object.assign({},{"1":false,"2":false,"3":false,"4":false})   
            setLeads(leads1)
            let camp1=Object.assign({},{"1":false,"2":false,"3":false,"4":false})
            setCamp(camp1)
            let buy1=Object.assign({},{"1":false,"2":false,"3":false,"4":false})
            setBuy(buy1)
            let pub1=Object.assign({},{"1":false,"2":false,"3":false,"4":false})
            setPub(pub1)
            let vert1=Object.assign({},{"1":false,"2":false,"3":false,"4":false})
            setVert(vert1)
            // //console.log(data,"data")
            // //console.log("leads",leads1)
            // //console.log("camp",camp1)
            // //console.log("buy",buy1)
            // //console.log("pub",pub1)
            // //console.log("vert",vert1)
            if(data){
                
                // //console.log(user,"myuser####################################################################################*")
            if(data.length>0 && user!={}){
                data=JSON.parse(data)
                // //console.log(data,"data#####################################")
            data.forEach(element => {
                // //console.log(element,"ele")
                if(element.module_id==2){
                    // //console.log(element.module_id,"element.module_id")
                    const canTick = (element) => element===1;
                      if(element.actions.some(canTick)){
                        
                        element.actions.forEach(ele =>{
                          
                          
                          // //console.log(ele," element.actions")
                          // leads1 = Object.assign({}, leads1, {
                            // ele: true,
                            // });
                            leads1[ele]=true
                          })
                        }
                }
                if(element.module_id==3){
                  const canTick = (element) => element===1;
                      if(element.actions.some(canTick)){
                        setonviewc(false)
                      element.actions.forEach(ele =>{
                        camp1[ele]=true
                        // camp1 = Object.assign({}, camp1, {
                        // ele: true,
                        // });
                    })
                  }
                }
                if(element.module_id==4){
                  const canTick = (element) => element===1;
                      if(element.actions.some(canTick)){
                        setonviewb(false)
                      element.actions.forEach(ele =>{
                        buy1[ele]=true
                        //   buy1 = Object.assign({}, buy1, {
                        // ele: true,
                        // });
                    })
                  }
                }
                if(element.module_id==5){
                  const canTick = (element) => element===1;
                      if(element.actions.some(canTick)){
                        setonviewp(false)
                      element.actions.forEach(ele =>{
                        pub1[ele]=true
                        //   pub1 = Object.assign({}, pub1, {
                        // ele: true,
                        // });
                    })
                  }
                }
                if(element.module_id==6){
                  const canTick = (element) => element===1;
                      if(element.actions.some(canTick)){
                        setonviewv(false)
                      element.actions.forEach(ele =>{
                        vert1[ele]=true
                        //   vert1 = Object.assign({}, vert1, {
                        // ele: true,
                        // });
                    })
                  }
                }
                
            });
        }}
           let leads2=Object.assign({},leads1)
            setLeads(leads2)
            let camp2=Object.assign({},camp1)
            setCamp(camp2)
            let buy2=Object.assign({},buy1)
            setBuy(buy2)
            let pub2=Object.assign({},pub1)
            setPub(pub2)
            let vert2=Object.assign({},vert1)
            setVert(vert2)
            // //console.log("AFTER C H A N G I N G")
            // //console.log("leads",leads1)
            // //console.log("camp",camp1)
            // //console.log("buy",buy1)
            // //console.log("pub",pub1)
            // //console.log("vert",vert1)
            
    },[props.user,props.id,props.show])
  
    return(
                <Modal
                    id="main_modal"
                    {...props}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    >
                    <Modal.Header id="modal_head">
                        <div id="close_img2" onClick={()=>{
                            let leads2=Object.assign({},{})
                            setLeads(leads2)
                            let camp2=Object.assign({},{})
                            setCamp(camp2)
                            let buy2=Object.assign({},{})
                            setBuy(buy2)
                            let pub2=Object.assign({},{})
                            setPub(pub2)
                            let vert2=Object.assign({},{})
                            setVert(vert2)
  
                            let obj1=Object.assign({},{})
                            setRefresh(obj1)
                            setonviewb(true)
                            setonviewc(true)
                            setonviewp(true)
                            setonviewv(true)
                          props.onHide()
                        }
                          }>
                        <IoIosClose />
                        </div>
                    </Modal.Header>
                    <Modal.Body>
                        {/* <p>{props.user.email}</p> */}
                         <table
      id="dtBasicExample"
      class="table table-striped table-sm"
      cellspacing="0"
    >
      <tr>
              {/* leads-2 
                camp-3
                buyers-4
                publishers-5
                verticals-6

                view-1
                create-2
                update-3
                delete-4
                
        */}
        <td></td>
        <th scope="col">Lead</th>
        <th scope="col">Campaign</th>
      
        <th scope="col">Buyer</th>
        <th scope="col">Publisher</th>
        <th scope="col">Vertical</th>
      </tr>
      <tr>
        <th scope="row">View</th>
        {/* 111111111 */}
        <td>
          {" "}
          {/* leads  222222 */}
          <input type="checkbox"  
          checked={leads["1"]}
            onChange={(event) => {
              let temp=leads["1"]
              let jk=Object.assign({},leads,{"1":!temp})
              setLeads(jk)
            }} />
        </td>
        <td>
          {" "}
          {/* Campaign 33333333 */}
          <input type="checkbox" 
          checked={camp["1"]}
            onChange={() =>{
              let temp=camp["1"]
              let jk=Object.assign({},camp,{"1":!temp})
              setCamp(jk)
              setonviewc(temp)
            } }/>
        </td>
        <td>
          {" "}
          {/* buyer  44444444*/}
          <input type="checkbox" 
            checked={buy["1"]}
              onChange={() =>{
              let temp=buy["1"]
              let jk=Object.assign({},buy,{"1":!temp})
              setBuy(jk)
              setonviewb(temp)
            } }/>
        </td>
        <td>
          {" "}
          {/* publisher 5555555 */}
          <input type="checkbox" 
          checked={pub["1"]}
             onChange={() =>{
              let temp=pub["1"]
              let jk=Object.assign({},pub,{"1":!temp})
              setPub(jk)
              setonviewp(temp)
            } }/>
        </td>
        <td>
          {" "}
          {/* vertical  6666666*/}
          <input type="checkbox" 
          checked={vert["1"]}
             onChange={() =>{
              let temp=vert["1"]
              let jk=Object.assign({},vert,{"1":!temp})
              setVert(jk)
              setonviewv(temp)
            } }/>
        </td>
      </tr>
      <tr>
        <th scope="row">Create</th>
        {/* 222222222222 */}
        <td>
          {" "}
          {/* <input type="checkbox"  onChange={() => handlelead(2)} /> */}
        </td>
        <td>
          {" "}
          {/* campaigns 33333333333*/}
          <input type="checkbox" 
          checked={camp["2"]}
           disabled={onviewc} 
           onChange={() =>{
            let temp=camp["2"]
            let jk=Object.assign({},camp,{"2":!temp})
            setCamp(jk)
            } }/>
        </td>
        <td>
          {" "}
          {/* buyers 4444444444444*/}
          <input type="checkbox" 
          checked={buy["2"]}
           disabled={onviewb} 
           onChange={() =>{
            let temp=buy["2"]
            let jk=Object.assign({},buy,{"2":!temp})
            setBuy(jk)
            } }/>
        </td>
        <td>
          {" "}
          {/* publishers 5555555555*/}
          <input type="checkbox" 
          checked={pub["2"]}
           disabled={onviewp} 
           onChange={() =>{
            let temp=pub["2"]
            let jk=Object.assign({},pub,{"2":!temp})
            setPub(jk)
            } }/>
        </td>
        <td>
          {" "}
          {/* verticals 666666666*/}
          <input type="checkbox" 
          checked={vert["2"]}
           disabled={onviewv} 
           onChange={() =>{
            let temp=vert["2"]
            let jk=Object.assign({},vert,{"2":!temp})
            setVert(jk)
            } }/>
        </td>
      </tr>
      <tr>
        <th scope="row">Update</th>
        {/* 3333333333333333 */}
        <td>
          {" "}
          {/* <input type="checkbox"  onChange={() => handlelead(3)} /> */}
        </td>
        <td>
          {" "}
          {/* campaigns 3333333 */}
          <input type="checkbox" 
          checked={camp["3"]}
            disabled={onviewc} 
            onChange={() =>{
            let temp=camp["3"]
            let jk=Object.assign({},camp,{"3":!temp})
            setCamp(jk)
            } }/>
        </td>
        <td>
          {" "}
          {/* buyers 44444444 */}
          <input type="checkbox" 
          checked={buy["3"]}
           disabled={onviewb} 
           onChange={() =>{
            let temp=buy["3"]
            let jk=Object.assign({},buy,{"3":!temp})
            setBuy(jk)
            } }/>
        </td>
        <td>
          {" "}
          {/* publishers 555555555*/}
          <input type="checkbox" 
          checked={pub["3"]}
           disabled={onviewp} 
           onChange={() =>{
            let temp=pub["3"]
            let jk=Object.assign({},pub,{"3":!temp})
            setPub(jk)
            } }/>
        </td>
        <td>
          {" "}
          {/* verticals 6666666666 */}
          <input type="checkbox" 
          checked={vert["3"]}
           disabled={onviewv} 
           onChange={() =>{
            let temp=vert["3"]
            let jk=Object.assign({},vert,{"3":!temp})
            setVert(jk)
            } }/>
        </td>
      </tr>
      <tr>
        <th scope="row">Delete</th>
        {/* 44444444444444444 */}
        <td>
          {" "}
          {/* <input type="checkbox"  onChange={() => handlelead(4)} /> */}
        </td>
        <td>
          {" "}
          {/* campaigns 3333333333 */}
          <input type="checkbox" 
          checked={camp["4"]}
            disabled={onviewc} 
            onChange={() =>{
            let temp=camp["4"]
            let jk=Object.assign({},camp,{"4":!temp})
            setCamp(jk)
            } }/>
        </td>
        <td>
          {" "}
          {/* buyers 44444444444 */}
          <input type="checkbox" 
          checked={buy["4"]}
            disabled={onviewb} 
            onChange={() =>{
            let temp=buy["4"]
            let jk=Object.assign({},buy,{"4":!temp})
            setBuy(jk)
            } }/>
        </td>
        <td>
          {" "}
          {/* publishers 5555555555 */}
          <input type="checkbox" 
          checked={pub["4"]}
           disabled={onviewp} 
           onChange={() =>{
            let temp=pub["4"]
            let jk=Object.assign({},pub,{"4":!temp})
            setPub(jk)
            } }/>
        </td>
        <td>
          {" "}
          {/* verticals 66666666 */}
          <input type="checkbox" 
          checked={vert["4"]}
           disabled={onviewv} 
           onChange={() =>{
            let temp=vert["4"]
            let jk=Object.assign({},vert,{"4":!temp})
            setVert(jk)
            } }/>
        </td>
      </tr>
    </table>
    <Button onClick={()=>{
        //update roles for invited member
   let leadper=[]
   if(leads["1"]==true)
   leadper.push(1)
   let campper=[]
   if(camp["1"]==true){
     campper.push(1)
     if(camp["2"]==true)
     campper.push(2)
     if(camp["3"]==true)
     campper.push(3)
     if(camp["4"]==true)
     campper.push(4)
   }
   let buyerper=[]
   if(buy["1"]==true){
     buyerper.push(1)
     if(buy["2"]==true)
     buyerper.push(2)
     if(buy["3"]==true)
     buyerper.push(3)
     if(buy["4"]==true)
     buyerper.push(4)
   }
   let pubper=[]
   if(pub["1"]==true){
     pubper.push(1)
     if(pub["2"]==true)
     pubper.push(2)
     if(pub["3"]==true)
     pubper.push(3)
     if(pub["4"]==true)
     pubper.push(4)
   }
   let vertiper=[]
   if(vert["1"]==true){
     vertiper.push(1)
     if(vert["2"]==true)
     vertiper.push(2)
     if(vert["3"]==true)
     vertiper.push(3)
     if(vert["4"]==true)
     vertiper.push(4)
   }
    const data = {
      usertype:1,
    user_id:props.user.id,
      permission_ids: [
        {
        module_id: 2,
        actions: leadper,
      },
      {
        module_id: 3,
        actions: campper,

      },
      {
        module_id: 4,
        actions: buyerper,

      },
      {
        module_id: 5,
        actions: pubper,

      },
      {
        module_id: 6,
        actions: vertiper,

      }
       
      ]
    };
    // //console.log("dataofinvite",data)
    const updateinviteteammate = {
      url:
        API_URL+"/user/save-permissions",
      data: data,
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    };
    axios(updateinviteteammate)
      .then(response => {
        if (response.status == 200) {
          
           let leads2=Object.assign({},{})
                            setLeads(leads2)
                            let camp2=Object.assign({},{})
                            setCamp(camp2)
                            let buy2=Object.assign({},{})
                            setBuy(buy2)
                            let pub2=Object.assign({},{})
                            setPub(pub2)
                            let vert2=Object.assign({},{})
                            setVert(vert2)
  
                            let obj1=Object.assign({},{})
                            setRefresh(obj1)
                            setonviewb(true)
                            setonviewc(true)
                            setonviewp(true)
                            setonviewv(true)
                            props.getteamlistdata()
                          props.onHide()
                    ////console.log(response,"success upadting roles of team member")

          //props.onHide
        
        }

      })
      .catch(error => {
       
        if (error.response.status === 500) {
          // //console.log("error",error)
          ////console.log(error.response,"error upadting roles of team member")
          alert("error")
            //seterrormessage("Email Already exist")
        } else {
        }
      });

    }}>UPDATE</Button>

                    </Modal.Body>
                </Modal>
    );
}    

export default TeamMember;

