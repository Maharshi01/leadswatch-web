import React, { Component, useState,useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import Header from "../Header";
import { GoSettings } from "react-icons/go";
import { MdAccountBox } from "react-icons/md";
import {
  IoIosHome,
  IoIosStats,
  IoIosVolumeHigh,
  IoIosWalk,
  IoIosPeople,
  IoIosList,
  IoMdLogOut
} from "react-icons/io";
import { FaEllipsisV } from "react-icons/fa";
const Sep = () => <span> || </span>;
const NavBar = () => {
  const [dashstate, setDashState] = useState(
    localStorage.getItem("key_leads") == "dashboard"
  );
  // const [dashstate1, setDashState1] = useState(true);
  ////console.log("loadidng in naviafa   ",localStorage.getItem("key_leads"));
  const [leadsstate, setLeadsState] = useState(
    localStorage.getItem("key_leads") == "Leads"
  );
  const [campaignstate, setCampaignState] = useState(
    localStorage.getItem("key_leads") == "Campaign"
  );
  const [dropstate, setDropState] = useState(
    localStorage.getItem("key_leads") == "Drop"
  );
  const logout = () => {
    localStorage.clear();
    // history.push("/login");
    window.location.reload(true);
  };
  const [verticalstate1, setVerticalState1] = useState(false);
  const [VerticalState_state, setVerticalState_state] = useState(false);
  const [VerticalState_state12, setVerticalState_state12] = useState(false);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  function useOutsideAlerter(ref) {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setVerticalState_state(false);
        // alert("You clicked outside of me!");
      }
    }

    useEffect(() => {
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    });
  }
  const Dash_func = () => {
    // setdashtext(true)
    setDashState(true);
    setLeadsState(false);
    setCampaignState(false);
    // setDashState1(true);
    localStorage.setItem("key_leads", "dashboard");

    // props.navigation.navigate("Header",{dashtext:dashtext})
  };
  const Leads_Func = () => {
    setVerticalState_state12(false);
    // setleadstext(true)
    setDashState(false);
    setLeadsState(true);
    setCampaignState(false);
    setDropState(false);
    //setDashState1(false);

    localStorage.setItem("key_leads", "Leads");
  };
  function Camp_Func() {
    setVerticalState_state12(false);
    // setcampaignstext(true);
    setDropState(false)
    setDashState(false);
    setLeadsState(false);
    setCampaignState(true);
    //setDashState1(false);

    localStorage.setItem("key_leads", "Campaign");
  }
  function drop_func() {
    setVerticalState_state(true)
    setVerticalState_state12(!VerticalState_state12);
    setDashState(false);
    setLeadsState(false);
    setCampaignState(false);
   
    setDropState(true);
  
  }
  return (
    <div>
      

      <Header />
      <Navbar className="navbar_sec" expand="lg">
        <Navbar.Brand></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto navbar_list">
            
            <NavLink
              className={leadsstate == true ? "dash_class" : "navbar_list"}
              // className="navbar_list" activeClassName="dash_class"

              onClick={() => {
                Leads_Func();
              }}
              to="/p_leads"
            >
              {" "}
              <span className="icon">
                <IoIosStats />
              </span>{" "}
              Leads
            </NavLink>
            <NavLink
              className={campaignstate == true ? "dash_class" : "navbar_list"}
              //className="navbar_list" activeClassName="dash_class"

              onClick={Camp_Func}
              to="/p_campaigns"
            >
              <span className="icon">
                <IoIosVolumeHigh />
              </span>{" "}
              Campaigns
            </NavLink>
            <p
              className={VerticalState_state12 == true ? "dash_class1" : "navbar_list1"}
              onClick={() => {
                drop_func();
                setVerticalState1(true);
                setVerticalState_state(!VerticalState_state);
                setVerticalState_state12(true);
                setVerticalState_state(true)
              }}
            >
              <FaEllipsisV className="FaEllipsisV_nav" />
            </p>
          
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {VerticalState_state == true &&
        <div ref={wrapperRef} className="nav_drop_down nav_drop_down1">
          <Link className="nav_set_link" to={{ pathname: "/p_settings" }}>
            <div className="set_drop">
              <p
                onClick={() => {
                  setVerticalState_state(false);
                  setVerticalState_state12(true);
                }}
              >
                {" "}
                <span className="icon_nav1">
                  <GoSettings />
                </span>
                Settings
              </p>
            </div>
          </Link>
          <Link className="nav_set_link" to={{ pathname: "/p_accounting" }}>
          <div className="set_drop">
            <p
              onClick={() => {
                setVerticalState_state(false);
              
                setVerticalState_state12(true);
              }}
            >
              {" "}
              <span className="icon_nav1">
                <MdAccountBox />
              </span>{" "}
              Accounting
            </p>
          </div>
          </Link>
          <div className="set_drop">
            <p
              onClick={() => {
                logout();
                setVerticalState_state(false);
                setVerticalState_state12(false);
              }}
            >
              {" "}
              <span className="icon_nav1">
                <IoMdLogOut />
              </span>
              Logout
            </p>
          </div>
        
        </div>
       }
    </div>
  );
};
export default NavBar;
