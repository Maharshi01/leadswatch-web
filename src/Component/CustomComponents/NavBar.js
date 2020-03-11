//created by
//last modified 24 dec 2019
import React, { useState, useEffect, useRef } from "react";
import { API_URL ,logoutidle} from '../../AppConfig'

import { NavLink, withRouter } from "react-router-dom";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import { FaEllipsisV } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";
import { IoIosClose, IoMdLogOut, IoIosWarning } from "react-icons/io";
import { GoSettings } from "react-icons/go";
import SettingsPage from "../SettingsPage.component";
// import Accounting from "../Accounting";
import { MdAccountBox } from "react-icons/md";

import {
  IoIosHome,
  IoIosStats,
  IoIosVolumeHigh,
  IoIosWalk,
  IoIosPeople,
  IoIosList
} from "react-icons/io";
import Header from "../Header";

// const Sep = () => <span> || </span>;

const Navigation = props => {
  // const [dashstate, setDashState] = useState(true);
  // const [leadsstate, setLeadsState] = useState(false);
  // const [campaignstate, setCampaignState] = useState(false);
  // const [publisherstate, setPublisherState] = useState(false);
  // const [buyerstate, setBuyerState] = useState(false);
  // const [verticalstate, setVerticalState] = useState(false);
  const [dashtext, setdashtext] = useState(true);
  const [leadstext, setleadstext] = useState(false);
  const [campaignstext, setcampaignstext] = useState(false);
  const [publishertext, setpublishertext] = useState(false);
  const [buyertext, setbuyertext] = useState(false);
  const [verticaltext, setverticaltext] = useState(false);

  const [dashstate, setDashState] = useState(
    localStorage.getItem("key_leads") == "dashboard"
  );
  const [leadsstate, setLeadsState] = useState(
    localStorage.getItem("key_leads") == "Leads"
  );
  const [campaignstate, setCampaignState] = useState(
    localStorage.getItem("key_leads") == "Campaign"
  );
  const [publisherstate, setPublisherState] = useState(
    localStorage.getItem("key_leads") == "Publisher"
  );
  const [buyerstate, setBuyerState] = useState(
    localStorage.getItem("key_leads") == "Buyer"
  );
  const [dropstate, setDropState] = useState(
    localStorage.getItem("key_leads") == "Drop"
  );
  const [verticalstate, setVerticalState] = useState(
    localStorage.getItem("key_leads") == "Verticals"
  );
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
  useEffect(() => {
    let mytab = localStorage.getItem("tab")
      ? localStorage.getItem("tab")
      : props.activeTab;
    if (mytab == "leads") {
      Leads_Func();
    }
    if (mytab == "buyers") {
      Buy_Func();
    }
    if (mytab == "campaigns") {
      Camp_Func();
    }
    if (mytab == "publishers") {
      Pub_Func();
    }
    if (mytab == "verticals") {
      Vert_Func();
    }
  }, []);
  useEffect(() => {
    let mytab = localStorage.getItem("tab")
      ? localStorage.getItem("tab")
      : props.activeTab;
    if (mytab == "leads") {
      Leads_Func();
    } else if (mytab == "buyers") {
      Buy_Func();
    } else if (mytab == "campaigns") {
      Camp_Func();
    } else if (mytab == "publishers") {
      Pub_Func();
    } else if (mytab == "verticals") {
      Vert_Func();
    } else {
      if (props.tabChange == true) {
        localStorage.setItem("key_leads", "hjh");
        setDashState(false);
        setLeadsState(false);
        setCampaignState(false);
        setPublisherState(false);
        setBuyerState(false);
        setDropState(false);
        setVerticalState(false);
      }
      if (props.tabChange == false) {
        setDashState(false);
        setLeadsState(false);
        setCampaignState(false);
        setPublisherState(false);
        setBuyerState(false);
        setDropState(false);
        setVerticalState(false);
        localStorage.setItem("key_leads", "hjh");
      }
    }
  }, [props.tabChange, props.activeTab]);
  useEffect(() => {
    if (
      localStorage.getItem("tab") == "tab" ||
      localStorage.getItem("key_leads") == "key_leads"
    ) {
      if (props.tabChange == true) {
        localStorage.setItem("key_leads", "hjh");
        setDashState(false);
        setLeadsState(false);
        setCampaignState(false);
        setPublisherState(false);
        setBuyerState(false);
        setDropState(false);
        setVerticalState(false);
      }
      if (props.tabChange == false) {
        setDashState(false);
        setLeadsState(false);
        setCampaignState(false);
        setPublisherState(false);
        setBuyerState(false);
        setDropState(false);
        setVerticalState(false);
        localStorage.setItem("key_leads", "hjh");
      }
    }
  });

  const logout = () => {
    localStorage.clear();
    // history.push("/login");
    window.location.reload(true);
  };


  function Dash_func() {
    setdashtext(true);
    setDashState(true);
    setLeadsState(false);
    setCampaignState(false);
    setPublisherState(false);
    setBuyerState(false);
    setDropState(false);
    setVerticalState_state12(false);
    setVerticalState(false);
    localStorage.setItem("key_leads", "dashboard");

    // props.navigation.navigate("Header",{dashtext:dashtext})
  }
  function Leads_Func() {
    localStorage.setItem("tab", "leads");
    setleadstext(true);
    setDashState(false);
    setLeadsState(true);
    setCampaignState(false);
    setPublisherState(false);
    setBuyerState(false);
    setDropState(false);
    setVerticalState(false);
    setVerticalState_state12(false);
    localStorage.setItem("key_leads", "Leads");
  }
  function Camp_Func() {
    setcampaignstext(true);
    localStorage.setItem("tab", "campaigns");
    setDashState(false);
    setLeadsState(false);
    setCampaignState(true);
    setPublisherState(false);
    setBuyerState(false);
    setDropState(false);
    setVerticalState_state12(false);
    setVerticalState(false);
    localStorage.setItem("key_leads", "Campaign");
  }
  function Pub_Func() {
    localStorage.setItem("tab", "publishers");
    setpublishertext(true);
    setDashState(false);
    setLeadsState(false);
    setCampaignState(false);
    setPublisherState(true);
    setDropState(false);
    setVerticalState_state12(false);
    setBuyerState(false);
    setVerticalState(false);
    localStorage.setItem("key_leads", "Publisher");
  }
  function Buy_Func() {
    localStorage.setItem("tab", "buyers");
    setbuyertext(true);
    setDashState(false);
    setLeadsState(false);
    setCampaignState(false);
    setDropState(false);
    setDropState(false);
    setVerticalState_state12(false);
    setPublisherState(false);
    setBuyerState(true);
    setVerticalState(false);
    localStorage.setItem("key_leads", "Buyer");
  }

  function drop_func() {
    setbuyertext(false);
    setDashState(false);
    setLeadsState(false);
    setCampaignState(false);
    setPublisherState(false);
    setVerticalState_state12(false);
    setBuyerState(false);
    setDropState(true);
    setVerticalState(false);
  }
  function Vert_Func() {
    localStorage.setItem("tab", "verticals");
    //  setleadstext(false)
    //  setcampaignstext(false);
    //  setpublishertext(false);
    // setbuyertext(false);
    setverticaltext(true);
    setDashState(false);
    setLeadsState(false);
    setDropState(false);
    setVerticalState_state12(false);
    setCampaignState(false);
    setPublisherState(false);
    setBuyerState(false);
    setVerticalState(true);
    
    localStorage.setItem("key_leads", "Verticals");
  }

  return (
    <div>
      {/* <Link to="/">DashBoard</Link> <Sep/>
      <Link to="/buyer">Buyer</Link> <Sep/>
      <Link to="/leads">Leads</Link> <Sep/>
      <Link to="/publisherlist">PublisherList</Link> <Sep/>
      <Link to="/Vertical">Vertical</Link> <Sep/>
      <Link to="/campaigns">Campaign</Link> <Sep/>
      <hr /> */}
      <Header
        setTabChange={props.setTabChange}
        setImgchange={props.setImgchange}
        imgchange={props.imgchange}
        setLogochange={props.setLogochange}
        logochange={props.logochange}
      />
      <Navbar className="navbar_sec" expand="lg">
        <Navbar.Brand></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto navbar_list">
            

            <NavLink
              
              className={leadsstate == true ? "dash_class" : "navbar_list"}
              onClick={() => {
                props.setActiveTab();
                Leads_Func();
              }}
              to="/leads"
            >
              <span className="icon">
                <IoIosStats />
              </span>{" "}
              Leads
            </NavLink>
            <NavLink
              
              className={campaignstate == true ? "dash_class" : "navbar_list"}
              onClick={() => {
                props.setActiveTab();
                Camp_Func();
              }}
              // onClick={Camp_Func}
              to="/campaigns"
            >
              <span className="icon">
                <IoIosVolumeHigh />
              </span>{" "}
              Campaigns
            </NavLink>
            <NavLink
              //className="navbar_list" activeClassName="dash_class"
              className={publisherstate == true ? "dash_class" : "navbar_list"}
              onClick={() => {
                props.setActiveTab();
                Pub_Func();
              }}
              // onClick={Pub_Func}
              to="/publishers"
            >
              <span className="icon">
                <IoIosWalk />
              </span>{" "}
              Publishers
            </NavLink>
            <NavLink
              //className="navbar_list" activeClassName="dash_class"
              className={buyerstate == true ? "dash_class" : "navbar_list"}
              onClick={() => {
                props.setActiveTab();
                Buy_Func();
              }}
              // onClick={Buy_Func}
              to="/buyers"
            >
              <span className="icon">
                <IoIosPeople />
              </span>{" "}
              Buyers
            </NavLink>
            <NavLink
              // className="navbar_list" activeClassName="dash_class"
              className={verticalstate == true ? "dash_class" : "navbar_list"}
              onClick={() => {
                props.setActiveTab();
                Vert_Func();
              }}
              // onClick={Vert_Func}
              to="/verticals"
            >
              <span className="icon">
                <IoIosList />
              </span>{" "}
              Verticals
            </NavLink>

            <p
              className={VerticalState_state12 == true ? "dash_class1" : "navbar_list1"}
              onClick={() => {
                drop_func();
                setVerticalState1(true);
                setVerticalState_state(!VerticalState_state);
                setVerticalState_state12(true);
              }}
            >
              <FaEllipsisV className="FaEllipsisV_nav" />
            </p>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {VerticalState_state == true ? (
        <div ref={wrapperRef} className="nav_drop_down">
          <Link className="nav_set_link" to={{ pathname: "/settings" }}>
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
          <Link className="nav_set_link" to={{ pathname: "/Accounting" }}>
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
      ) : (
        <p></p>
      )}
    </div>
  );
};
export default Navigation;

var styles = {
  initialstyl: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "600",
    backgroundColor: "#484393",
    ":hover": {
      backgroundColor: "#484393"
    }
  },

  finalstyl: {
    padding: "1rem 4rem",
    borderRadius: "0px 0px 10px 10px",
    backgroundColor: "white",
    color: "#9B9B9B",
    marginRight: " 10px",
    fontWeight: "600",
    textDecoration: "none"
  }
};
