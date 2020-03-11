import { Helmet } from "react-helmet";
import React, { Component, Checkbox, useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_URL ,logoutidle} from '../../AppConfig'
import axios from "axios";
import PaginationName from "../Pagination/PaginationLeads";
import {
  IoIosArrowForward,
  IoIosArrowBack,
  IoIosCheckmarkCircleOutline
} from "react-icons/io";
import { MdDateRange, MdRefresh } from "react-icons/md";
import { MDBInput } from "mdbreact";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import Select, { components } from "react-select";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import chroma from "chroma-js";
import DatePicker from "react-datepicker";
import ToggleButton from "react-toggle-button";
import Modal from "react-modal";
import { IoIosClose } from "react-icons/io";
import { NavLink, withRouter } from "react-router-dom";
import { Navbar, Nav, Form } from "react-bootstrap";
import { Media } from "reactstrap";
import "../Leads/Leads.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { AiFillCaretDown } from "react-icons/ai";

import {
  IoIosHome,
  IoIosStats,
  IoIosVolumeHigh,
  IoIosWalk,
  IoIosPeople,
  IoIosList
} from "react-icons/io";
import { Spinner } from "react-bootstrap";

var spaceMain = " ";
const Leads = () => {
  const [leads, setLeads] = useState([]);

  const [searchbarValue, setSearch] = useState("");

  const [total, setTotal] = useState("");
  const [limit, setLimit] = useState([0]);
  const [filterLimit, setFilterLimit] = useState([10]);
  const [num, setNum] = useState([0]);
  const [publisher_id, setPublisher_ID] = useState("");
  const [campaign_id, setCampaign_id] = useState("");
  const [buyer_id, setBuyer_id] = useState("");
  const [enddate, setenddate] = useState("");
  const [startdate, setstartdate] = useState("");
  const [date, setDate] = useState("");
  const [statusfil, setstatusfil] = useState("");
  const [switch1, setswitch1] = useState([]);

  const [prev, setPrev] = useState(null);
  const [totalpages, setTotalpages] = useState(0);
  const [next, setNext] = useState(2);
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [detail, setDetail] = useState(true);
  const [response, setResponse] = useState(false);
  const [id, setId] = useState();
  const [lead_butt1, setlead_butt1] = useState(true);
  const [lead_butt2, setlead_butt2] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [details, setDetails] = useState({});
  const [lead_drop, setLead_Drop] = useState(false);
  const [lead_drop1, setLead_Drop1] = useState(false);
  const [selectedOption, setSelected] = useState([]);
  const [defaultOption, setDefaultOption] = useState("");
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);
  const [d, setD] = useState(0);
  const [e, setE] = useState(0);
  const [f, setF] = useState(0);
  const [g, setG] = useState(0);
  const [h, setH] = useState(0);

  // sample
  // const wrapperRef = useRef(null);
  // useOutsideAlerter(wrapperRef);
  const options = [
    // { label: 'Buyer Options', value: "", className:"buyer_status"},
    { label: "Success", value: "1", className: "option1_lead" },
    { label: "Failure", value: "0", className: "option2_lead" }
  ];
  const options1 = [
    { label: "Accepted", value: "1", color: "#008000" },
    { label: "Rejected", value: "0", color: "#FF0000" },
    { label: "Duplicate", value: "2", color: "orange" }
  ];



  const DropdownIndicator = props => {
    return (
      <components.DropdownIndicator {...props}>
        <Dropdown />
      </components.DropdownIndicator>
    );
  };

  const getLeadDetail = ids => {
    const config = {
      url: API_URL+`/lead/detail/${ids}`,
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    };
    axios(config)
      .then(response => {
        ////console.log("lead detail");
        ////console.log("response", response);

        setDetails(response.data.data);
        ////console.log(details, "details");
      })
      .catch(error => {
        ////console.log("error", error);
      });
  };

  const handleArrowClick = ids => {
    setDetail(true);
    setResponse(false);
    setOpen(!open);
    setId(ids);
    getLeadDetail(ids);
  };

  //console.log("defaultOption",defaultOption);
  function enterPressed(event) {
    var code = event.keyCode || event.which;
    if (code === 13) {
      //13 is the enter keycode
      //  ////console.log("Enter Pressed");
      getPublishersList(limit, 1);
    }
  }
  const handleDetail = () => {
    ////console.log("in handle detail");
    setDetail(true);
    setResponse(false);
  };

  const handleResponse = () => {
    setDetail(false);
    setResponse(true);
  };
  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  const handlestart = sdate => {
    setstartdate(sdate);
  };

  const handleend = edate => {
    setenddate(edate);
  };
  const handledate = edate => {
    setDate(edate);
  };

  // const handlesatus = ss => {
  //   setstatusfil(ss);
  // };
  const handleChange = selectedOption => {
    if (selectedOption == null) {
      setSelected([]);
    } else {
      setSelected(selectedOption);
    }

    //console.log(`Option selected:`, selectedOption);
  };
  const entries = value => {
    //setLimit(value);
    getPublishersList(value, 1);

    let a = [];
    for (let i = 1; i <= Math.ceil(total / value); i++) {
      a.push(i);
    }
    setNum(a);
    setLimit(value);
  };

  const handleSwitchChange = ss => {
    setDefaultOption(ss.label);
    // //console.log("asadadad",ss);
    setswitch1([JSON.parse(ss.value)]);
    //console.log("Buyer status",ss.value)
  };
  //console.log("sending swihc",switch1);

  //   function useOutsideAlerter(ref) {
  //     /**
  //      * Alert if clicked on outside of element
  //      */
  //     function handleClickOutside(event) {
  //       if (ref.current && !ref.current.contains(event.target)) {
  //         onClose(true)
  //         // alert("You clicked outside of me!");
  //       }
  //     }
  //   useEffect(() => {
  //     // Bind the event listener
  //     document.addEventListener("mousedown", handleClickOutside);
  //     return () => {
  //       // Unbind the event listener on clean up
  //       document.removeEventListener("mousedown", handleClickOutside);
  //     };
  //   });
  // }

  useEffect(() => {
    document.title = "Leads - LeadsWatch";
    ////console.log("in UseEffect");
    const getPublishers = () => {
      const data = {
        page: 1,
        limit: 10,
        search: "",
        filters: {
          status: [],
          buyer_status: [],
          daterange: "",
          date: "",
          pub_id: "",
          buyer_id: "",
          campaign_id: ""
        },
        sortby: {
          created: -1
        }
      };
      const config = {
        url: API_URL+"/lead/list",
        data: data,
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token")
        }
      };
      axios(config)
        .then(response => {
          console.log(response, "in leads");
          setTotal(response.data.data.total_count);
          setTotalpages(response.data.data.total_pages);
          setPrev(response.data.data.page - 1);
          setNext(response.data.data.page + 1);
          setCurrentPage(response.data.data.page);
          setFetching(false);
          setswitch1([]);
          let a = [];
          for (
            let i = 1;
            i <=
            Math.ceil(
              response.data.data.total_count / response.data.data.per_page
            );
            i++
          ) {
            a.push(i);
          }
          setNum(a);
          ////console.log(response.data.data.total_count, "total count");
          setLimit(response.data.data.per_page);
          ////console.log(response.data.data.per_page, "limit");
          ////console.log(response.data.data.list, "publishers list");
          try {
            if (response.data.data.list) setLeads(response.data.data.list);
            else setLeads([]);
          } catch {
            setLeads([]);
          }

          // props.navigation.navigate('Dashboard')
          // ////console.log(response);
          // global.access_token = response.data.result.token;
        })
        .catch(error => {
          if(error.message=="Request failed with status code 401"){
            logoutidle()
          }
          ////console.log("error failed");
          if (error.message == "Network Error") {
            alert("Network Error \n Please Try Again later");
          } else if (
            error.response.data.error.message ===
            "Your account had been deactivated"
          ) {
            ////console.log(error.response);
            alert("error :" + error.response.data.error.message);
          } else {
            ////console.log(error.response);
            alert("error :" + error.response.data.error.message);
          }

          ////console.log(error);
          ////console.log(error.message, "msg");
        });
      ////console.log("proceed to home screen");
    };
    getPublishers();
  }, []);

  const getPublishersList = (limit, page, a, b) => {
    let status = [];
    //console.log("Selected Option",selectedOption)
    if (selectedOption.length > 0) {
      for (let i = 0; i < selectedOption.length; i++) {
        status.push(JSON.parse(selectedOption[i].value));
        //console.log("status",status)
      }
    } else {
      status = [];
    }
    let dates;
    if (startdate == "" && enddate == "") {
      dates = "";
    } else if (startdate == "" && enddate != "") {
      dates = convert(enddate);
    } else if (enddate == "" && startdate != "") {
      dates = convert(startdate);
    } else {
      dates = convert(startdate) + "to" + convert(enddate);
    }

    const data = {
      page: page,
      limit: limit,
      search: searchbarValue ? searchbarValue : "",
      filters: {
        status: status,
        buyer_status: switch1,
        daterange: dates,
        date: date == "" ? "" : convert(date),
        pub_id: publisher_id,
        buyer_id: buyer_id,
        campaign_id: campaign_id
      },
      sortby: {
        [a]: parseInt(b)
      }
    };
    //console.log("data to be sennd",data);
    const config = {
      url: API_URL+"/lead/list",
      data: data,
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    };
    axios(config)
      .then(response => {
        //console.log("response.data.data.list==",response.data.data.list);
        setLeads(response.data.data.list);
        setTotal(response.data.data.total_count);
        setTotalpages(response.data.data.total_pages);
        setLimit(response.data.data.per_page);
        setPrev(response.data.data.page - 1);
        setNext(response.data.data.page + 1);
        setCurrentPage(response.data.data.page);
        let a = [];
        for (
          let i = 1;
          i <=
          Math.ceil(
            response.data.data.total_count / response.data.data.per_page
          );
          i++
        ) {
          a.push(i);
        }
        setNum(a);
        //setLimit(filterLimit);
      })
      .catch(error => {
        if(error.message=="Request failed with status code 401"){
          logoutidle()
        }
        ////console.log("error failed");
        if (error.message == "Network Error") {
          alert("Network Error \n Please Try Again later");
        } else if (
          error.response.data.error.message ===
          "Your account had been deactivated"
        ) {
          ////console.log(error.response);
          alert("error :" + error.response.data.error.message);
        } else {
          ////console.log(error.response);
          alert("error :" + error.response.data.error.message);
        }

        ////console.log(error);
        ////console.log(error.message, "msg");
      });
    //////console.log("proceed to home screen");
  };

  const refreshfilter = () => {
    setenddate("");
    setstartdate("");
    setDate("");
    setPublisher_ID("");
    setBuyer_id("");
    setCampaign_id("");
    // setswitch1("");
    setstatusfil("");
    setSearch("");
    setSelected([]);
    setswitch1("");
    setDefaultOption("Buyer Status");

    getLeadsListRefreshed(limit, 1, "created", "1");
  };

  const getLeadsListRefreshed = (limit, page, a, b) => {
    let dates;
    if (startdate == "" && enddate == "") {
      dates = "";
    } else if (startdate == "" && enddate != "") {
      dates = convert(enddate);
    } else if (enddate == "" && startdate != "") {
      dates = convert(startdate);
    } else {
      dates = convert(startdate) + "to" + convert(enddate);
    }

    const data = {
      page: page,
      limit: limit,
      search: "",
      filters: {
        status: [],
        buyer_status: [],
        daterange: "",
        date: "",
        pub_id: "",
        buyer_id: "",
        campaign_id: ""
      },
      sortby: {
        [a]: parseInt(b)
      }
    };

    const config = {
      url: API_URL+"/lead/list",
      data: data,
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    };
    axios(config)
      .then(response => {
        setLeads(response.data.data.list);
        setTotal(response.data.data.total_count);
        setTotalpages(response.data.data.total_pages);
        setLimit(response.data.data.per_page);
        setPrev(response.data.data.page - 1);
        setNext(response.data.data.page + 1);
        setCurrentPage(response.data.data.page);
        let a = [];
        for (
          let i = 1;
          i <=
          Math.ceil(
            response.data.data.total_count / response.data.data.per_page
          );
          i++
        ) {
          a.push(i);
        }
        setNum(a);
        //setLimit(filterLimit);
      })
      .catch(error => {
        ////console.log("error failed");
        if (error.message == "Network Error") {
          alert("Network Error \n Please Try Again later");
        } else if (
          error.response.data.error.message ===
          "Your account had been deactivated"
        ) {
          ////console.log(error.response);
          alert("error :" + error.response.data.error.message);
        } else {
          ////console.log(error.response);
          alert("error :" + error.response.data.error.message);
        }

        ////console.log(error);
        ////console.log(error.message, "msg");
      });
    //////console.log("proceed to home screen");
  };

  return (
    <div>
      <Helmet>
        <title>Leads - LeadsWatch</title>
      </Helmet>
      <div>
        <div className="body_bg">
          <div className="body_inner">
            <div className="page_heading">
              {/* <div className="back_icon"><IoIosArrowBack /></div> */}
              <div className="page_heading_name">Leads</div>
            </div>

            <div className="body_inner_section">
              {/* <div className="date_row">
              <div className="showEntriesDiv">
                <label className="showEntriesLabel">
                  <div>
                    {" "}
                    <p>Show Entries</p>
                  </div>
                  <div>
                    <select onChange={event => entries(event.target.value)}>
                      <option selected value="10">
                        10
                      </option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>
                  </div>
                </label>
              </div>

              <div className="date_block">
                <div>
                  <Link
                    onClick={() => {
                      refreshfilter();
                    }}
                  >
                    <MdRefresh className="refreshbtn" />
                  </Link>
                </div>

                <div className="date_box">
                  <DatePicker
                    className="input_fields_dleads"
                    placeholderText="Date"
                    dateFormat="yyyy-MM-dd"
                    selected={date}
                    onChange={date => {
                      handledate(date);
                    }}
                  />
                  <div className="dateIconleads">
                    <MdDateRange />
                  </div>
                </div>

                <div className="date_box">
                  <DatePicker
                    className="input_fields_dleads1"
                    placeholderText="Start Date"
                    dateFormat="yyyy-MM-dd"
                    selected={startdate}
                    onChange={date => {
                      handlestart(date);
                    }}
                  />
                  <div className="dateIconleads1">
                    <MdDateRange />
                  </div>
                </div>

                <div className="date_box">
                  <DatePicker
                    className="input_fields_dleads2"
                    placeholderText="End Date"
                    dateFormat="yyyy-MM-dd"
                    selected={enddate}
                    onChange={date => {
                      handleend(date);
                    }}
                  />
                  <div className="dateIconleads2">
                    <MdDateRange />
                  </div>
                </div>

                <div className="active_status_leads">
                  <select
                    value={statusfil}
                    onChange={event => handlesatus(event.target.value)}
                  >
                    <option value="">Status</option>

                    <option value="1">Accepted</option>
                    <option value="0">Rejected</option>
                    <option value="2">Duplicate</option>
                  </select>
                </div>
                <div className="buyerStatus">
                  <select
                    value={switch1}
                    onChange={event => handleSwitchChange(event.target.value)}
                  >
                    <option value="">Buyer Status</option>

                    <option value="1">Success</option>
                    <option value="0">Failure</option>
                  </select>
                </div>
              </div>

              <div className="searchbarValue_Div_leads">
                <input
                  className="searchbarValue_fieldleads"
                  placeholder="Search"
                  value={searchbarValue}
                  type="text"
                  onChange={e => {
                    setSearch(e.target.value);
                  }}
                />
                <IoIosArrowForward
                  onClick={() => {
                    getPublishersList(limit, 1);
                  }}
                  className="circularArrowleads"
                />
                
              </div>
            </div>

             */}

              <div className="date_row_leads">
                <div className="showEntriesDiv">
                  <label className="showEntriesLabel">
                    <div className="showEntriesLabelDiv showEntriesLabelDivleadsp">
                      {" "}
                      <p>Show Entries</p>
                    </div>
                    <div className="showEntriesSelDiv">
                      <select onChange={event => entries(event.target.value)}>
                        <option selected value="10">
                          10
                        </option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                      </select>
                    </div>
                  </label>
                </div>

                <div className="date_block_campaign">
                  <div className="date_block_campaign_inner">
                    <div className="date_box">
                      <DatePicker
                        className="input_fields_dleads2"
                        placeholderText="Date"
                        dateFormat="yyyy-MM-dd"
                        selected={date}
                        onChange={date => {
                          handledate(date);
                        }}
                      />
                      <div className="dateIconleads2">
                        <MdDateRange />
                      </div>
                    </div>
                    <div className="date_box">
                      <DatePicker
                        className="input_fields_dleads1"
                        placeholderText="From"
                        dateFormat="yyyy-MM-dd"
                        selected={startdate}
                        onChange={date => {
                          handlestart(date);
                        }}
                      />
                      <div className="dateIconleads1">
                        <MdDateRange />
                      </div>
                    </div>

                    <div className="date_box">
                      <DatePicker
                        className="input_fields_dleads2"
                        placeholderText="To"
                        dateFormat="yyyy-MM-dd"
                        selected={enddate}
                        onChange={date => {
                          handleend(date);
                        }}
                      />
                      <div className="dateIconleads2">
                        <MdDateRange />
                      </div>
                    </div>
                    <div className="active_status_leads">
                      <ReactMultiSelectCheckboxes
                        className="multi_checkbox"
                        //  onClose={true}
                        //  isMulti
                        //  ref={wrapperRef}
                        width="174px"
                        styles={customStyles}
                        placeholderButtonLabel={"System Response"}
                        value={selectedOption}
                        onChange={value => handleChange(value)}
                        options={options1}
                        components={{ DropdownIndicator }}
                      />
                    </div>

                    {/* <div className="active_status_leads">

                <select  
         
        >
          <option value="">status</option>

          <option value="1">Active</option>
          <option value="0">InActive</option>
        </select>
                 
                </div> */}

                    <div className="apply_btn_div">
                      <IoIosCheckmarkCircleOutline
                        className="lead_apply_svg"
                        onClick={event => {
                          getPublishersList(filterLimit, 1);

                          let a = [];
                          for (
                            let i = 1;
                            i <= Math.ceil(total / filterLimit);
                            i++
                          ) {
                            a.push(i);
                          }
                          setNum(a);
                          setLimit(filterLimit);
                        }}
                      />
                    </div>
                    <div className="refresh_btn_div">
                      <Link
                        onClick={() => {
                          refreshfilter();
                        }}
                      >
                        <MdRefresh className="refreshbtn" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* <div className="active_status_leads">

                <select  
         
        >
          <option value="">status</option>

          <option value="1">Active</option>
          <option value="0">InActive</option>
        </select>
                 
                </div> */}

                {/* <div className="active_status_leads">

                <select  
         
        >
          <option value="">status</option>

          <option value="1">Active</option>
          <option value="0">InActive</option>
        </select>
                 
                </div> */}

                {/* <div className="butt_create_pub">
               
            <Link
              style={{ color: "#fff" }}
              
              
            >    
          <button   className="createBuyer_btn2_pub">
          
              Create Campaign
            
          </button>
          </Link> 
          </div>  */}
                <div className="butt_create_publ">
                  <div className="searchbarValue_Div_leads">
                    <input
                      className="searchbarValue_fieldleads"
                      placeholder="Search"
                      value={searchbarValue}
                      onChange={e => {
                        setSearch(e.target.value);
                      }}
                      onKeyPress={enterPressed.bind(this)}
                      type="text"
                    />
                    <Link
                      onClick={() => {
                        getPublishersList(limit, 1);
                      }}
                    >
                      <IoIosArrowForward className="circularArrowleads" />
                    </Link>
                  </div>
                </div>

                {/*         
        <div className="searchbarValue_Div_leads011">

     


                <input
                className="searchbarValue_fieldleads"
                placeholder="Search"
                 value={searchbarValue}
                  type="text"
                  onChange={e => {
                    setSearch(e.target.value);
                  }}
                  onKeyPress={enterPressed.bind(this)}
              /><Link  onClick={() => {
                getPublishersList(limit, 1);
              }}>
              <IoIosArrowForward className="circularArrowleads"/>
              </Link>
        
              </div> */}
              </div>

              <div className="id_row_lead">
                <div className="campaignId">
                  <p>Campaign ID</p>
                  <input
                    className="id_row_input"
                    value={campaign_id}
                    type="text"
                    placeholder="ID1,ID2"
                    pattern="[0-9]*"
                    onChange={e => {
                      setCampaign_id(e.target.value);
                    }}
                  />
                </div>
                <div className="publisherId">
                  <p>Publisher ID</p>
                  <input
                    className="id_row_input"
                    value={publisher_id}
                    type="text"
                    pattern="[0-9]*"
                    placeholder="ID1,ID2"
                    onChange={e => {
                      setPublisher_ID(e.target.value);
                    }}
                  />
                </div>

                <div className="buyerId">
                  <p>Buyer ID</p>
                  <input
                    className="id_row_input"
                    value={buyer_id}
                    type="text"
                    pattern="[0-9]*"
                    placeholder="ID1,ID2"
                    onChange={e => {
                      setBuyer_id(e.target.value);
                    }}
                  />
                </div>

                {/* <div className="buyerStatus">
                  <Select
                  
                   value={switch1}
                   
                   onChange={(value)=>handleSwitchChange(value)}
                   options={options}
              
                  >
                  
                  </  Select>
                 
                </div> */}
                <div className="select_main123">
                  <Dropdown
                    options={options}
                    className="dropdown_leads1"
                    onChange={value => handleSwitchChange(value)}
                    value={defaultOption}
                    placeholder="Buyer Response"
                  ></Dropdown>
                </div>
                {/* ref={wrapperRef}

                {/* <div className="buyerStatus_picker1"   onClick={()=>setLead_Drop(!lead_drop)}>
<p> Buyer status <span><AiFillCaretDown/></span></p>
{lead_drop == true?
                  <div className="lead_dropdown1">
                 <p >Buyer Status</p>
                 <p>Success</p>
                 <p>Failure</p>
                 </div>:<div></div>
                 
                 }
                </div> */}

                {/* <div onClick={()=>
                  setLead_Drop1(!lead_drop1)
                  }className="buyerStatus_picker2"  >

<p > Lead status <span ><AiFillCaretDown/></span></p>
{lead_drop1 == true?
                  <div className="lead_dropdown1">
                 <p style={{color:"green",paddingBottom:"5px"}}><span> <Form.Check   inline label=""   /></span>Accepted</p>
                 <p style={{color:"red"}}> Rejected</p>
                 <p style={{color:"orange"}}>Duplicate</p>
                 </div>:<div></div>
                 
                 }
                
                </div> */}
              </div>
              {fetching === true ? (
                <div className="spinner_div">
                  <Spinner className="buy_spinner" animation="border" />
                </div>
              ) : (
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
                      <th
                        class="th-sm extra_class text-center"
                        onClick={() => {
                          // alternate("name");
                          setB(0);
                          setC(0);
                          setD(0);
                          setE(0);
                          setF(0);
                          setG(0);
                          setH(0);

                          if (a == 1) {
                            getPublishersList(limit, 1, "lead_id", -1);
                            setA(2);
                          } else {
                            setA(1);
                            getPublishersList(limit, 1, "lead_id", 1);
                          }
                        }}
                      >
                        <div className="first_div">
                          ID{" "}
                          <div className="svg_grid">
                            <svg
                              className="svg_one"
                              onClick={event => {
                                getPublishersList(limit, 1, "lead_id", "1");
                                //getSortedSearched("id","-1",limit,1);
                              }}
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
                              onClick={event => {
                                getPublishersList(limit, 1, "lead_id", "-1");
                                //getSortedSearched("id","1",limit,1);
                              }}
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
                      <th
                        class="th-sm extra_class"
                        onClick={() => {
                          // alternate("name");
                          setA(0);
                          setC(0);
                          setD(0);
                          setE(0);
                          setF(0);
                          setG(0);
                          setH(0);

                          if (b == 1) {
                            getPublishersList(limit, 1, "created", -1);
                            setB(2);
                          } else {
                            setB(1);
                            getPublishersList(limit, 1, "created", 1);
                          }
                        }}
                      >
                        <div className="first_div">
                          Date
                          <div className="svg_grid">
                            <svg
                              className="svg_one"
                              onClick={event => {
                                getPublishersList(limit, 1, "created", "1");
                                //getSortedSearched("id","-1",limit,1);
                              }}
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
                              onClick={event => {
                                getPublishersList(limit, 1, "created", "-1");
                                //getSortedSearched("id","1",limit,1);
                              }}
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
                      <th
                        class="th-sm extra_class"
                        onClick={() => {
                          // alternate("name");
                          setA(0);
                          setB(0);
                          setD(0);
                          setE(0);
                          setF(0);
                          setG(0);
                          setH(0);

                          if (c == 1) {
                            getPublishersList(limit, 1, "created", -1);
                            setC(2);
                          } else {
                            setC(1);
                            getPublishersList(limit, 1, "created", 1);
                          }
                        }}
                      >
                        <div className="first_div">
                          Time
                          <div className="svg_grid">
                            <svg
                              className="svg_one"
                              onClick={event => {
                                getPublishersList(limit, 1, "created", "1");
                                //getSortedSearched("id","-1",limit,1);
                              }}
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
                              onClick={event => {
                                getPublishersList(limit, 1, "created", "-1");
                                //getSortedSearched("id","1",limit,1);
                              }}
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
                      <th
                        class="th-sm extra_class"
                        onClick={() => {
                          // alternate("name");
                          setA(0);
                          setB(0);
                          setC(0);
                          setE(0);
                          setF(0);
                          setG(0);
                          setH(0);

                          if (d == 1) {
                            getPublishersList(limit, 1, "status", 1);
                            setD(2);
                          } else {
                            setD(1);
                            getPublishersList(limit, 1, "status", -1);
                          }
                        }}
                      >
                        <div className="first_div">
                          System Response{" "}
                          <div className="svg_grid">
                            <svg
                              className="svg_one"
                              onClick={event => {
                                getPublishersList(limit, 1, "status", "1");
                                //getSortedSearched("id","-1",limit,1);
                              }}
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
                                fill={d == 1 ? "#484393" : "#d3d3d3"}
                              />
                            </svg>
                            <svg
                              className="svg_two"
                              onClick={event => {
                                getPublishersList(limit, 1, "status", "-1");
                                //getSortedSearched("id","1",limit,1);
                              }}
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
                                fill={d == 2 ? "#484393" : "#d3d3d3"}
                              />
                            </svg>
                          </div>
                        </div>
                      </th>
                      {/* lead details */}
                      <th
                        class="th-sm extra_class"
                        onClick={() => {
                          // alternate("name");
                          setA(0);
                          setB(0);
                          setC(0);
                          setD(0);
                          setF(0);
                          setG(0);
                          setH(0);

                          if (e == 1) {
                            getPublishersList(limit, 1, "publisher_id", 1);
                            setE(2);
                          } else {
                            setE(1);
                            getPublishersList(limit, 1, "publisher_id", -1);
                          }
                        }}
                      >
                        <div className="first_div12">
                          Publisher ID{" "}
                          <div className="svg_grid">
                            <svg
                              className="svg_one"
                              onClick={event => {
                                getPublishersList(
                                  limit,
                                  1,
                                  "publisher_id",
                                  "1"
                                );
                                //getSortedSearched("id","-1",limit,1);
                              }}
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
                                fill={e == 1 ? "#484393" : "#d3d3d3"}
                              />
                            </svg>
                            <svg
                              className="svg_two"
                              onClick={event => {
                                getPublishersList(
                                  limit,
                                  1,
                                  "publisher_id",
                                  "-1"
                                );
                                //getSortedSearched("id","1",limit,1);
                              }}
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
                                fill={e == 2 ? "#484393" : "#d3d3d3"}
                              />
                            </svg>
                          </div>
                        </div>
                      </th>
                      {/* lead details */}
                      <th
                        class="th-sm extra_class"
                        onClick={() => {
                          // alternate("name");
                          setA(0);
                          setB(0);
                          setC(0);
                          setD(0);
                          setE(0);
                          setG(0);
                          setH(0);

                          if (f == 1) {
                            getPublishersList(limit, 1, "buyer_id", 1);
                            setF(2);
                          } else {
                            setF(1);
                            getPublishersList(limit, 1, "buyer_id", -1);
                          }
                        }}
                      >
                        <div className="first_div">
                          Buyer ID{" "}
                          <div className="svg_grid">
                            <svg
                              className="svg_one"
                              onClick={event => {
                                getPublishersList(limit, 1, "buyer_id", "1");
                                //getSortedSearched("id","-1",limit,1);
                              }}
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
                                fill={f == 1 ? "#484393" : "#d3d3d3"}
                              />
                            </svg>
                            <svg
                              className="svg_two"
                              onClick={event => {
                                getPublishersList(limit, 1, "buyer_id", "-1");
                                //getSortedSearched("id","1",limit,1);
                              }}
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
                                fill={f == 2 ? "#484393" : "#d3d3d3"}
                              />
                            </svg>
                          </div>
                        </div>
                      </th>
                      {/* label explains it*/}
                      <th
                        class="th-sm extra_class"
                        onClick={() => {
                          // alternate("name");
                          setA(0);
                          setB(0);
                          setC(0);
                          setD(0);
                          setE(0);
                          setF(0);
                          setH(0);

                          if (g == 1) {
                            getPublishersList(limit, 1, "buyer_status", 1);
                            setG(2);
                          } else {
                            setG(1);
                            getPublishersList(limit, 1, "buyer_status", -1);
                          }
                        }}
                      >
                        <div className="first_div">
                          Buyer Response{" "}
                          <div className="svg_grid">
                            <svg
                              className="svg_one"
                              onClick={event => {
                                getPublishersList(
                                  limit,
                                  1,
                                  "buyer_status",
                                  "1"
                                );
                                //getSortedSearched("id","-1",limit,1);
                              }}
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
                                fill={g == 1 ? "#484393" : "#d3d3d3"}
                              />
                            </svg>
                            <svg
                              className="svg_two"
                              onClick={event => {
                                getPublishersList(
                                  limit,
                                  1,
                                  "buyer_status",
                                  "-1"
                                );
                                //getSortedSearched("id","1",limit,1);
                              }}
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
                                fill={g == 2 ? "#484393" : "#d3d3d3"}
                              />
                            </svg>
                          </div>
                        </div>
                      </th>
                      {/* lead details */}
                      <th
                        class="th-sm extra_class"
                        onClick={() => {
                          // alternate("name");
                          setA(0);
                          setB(0);
                          setC(0);
                          setD(0);
                          setE(0);
                          setF(0);
                          setG(0);

                          if (h == 1) {
                            getPublishersList(limit, 1, "campaign_id", 1);
                            setH(2);
                          } else {
                            setH(1);
                            getPublishersList(limit, 1, "campaign_id", -1);
                          }
                        }}
                      >
                        <div className="first_div">
                          Campaign ID{" "}
                          <div className="svg_grid">
                            <svg
                              className="svg_one"
                              onClick={event => {
                                getPublishersList(limit, 1, "campaign_id", "1");
                                //getSortedSearched("id","-1",limit,1);
                              }}
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
                                fill={h == 1 ? "#484393" : "#d3d3d3"}
                              />
                            </svg>
                            <svg
                              className="svg_two"
                              onClick={event => {
                                getPublishersList(
                                  limit,
                                  1,
                                  "campaign_id",
                                  "-1"
                                );
                                //getSortedSearched("id","1",limit,1);
                              }}
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
                                fill={h == 2 ? "#484393" : "#d3d3d3"}
                              />
                            </svg>
                          </div>
                        </div>
                      </th>
                      {/* label explains it*/}

                      {/* label explains it*/}
                      <th class="th-sm details_lead">Details </th>
                      {/* */}
                    </tr>
                  </thead>

                  <tbody>
                    {!fetching &&
                      leads.length > 0 &&
                      leads.map(item => (
                        <tr>
                          <td className="text-center">{item.unique_id}</td>
                          <td>{item.push_date.split("T")[0]}</td>
                          <td>{item.push_date.split("T")[1].split(".")[0]}</td>
                          <td>
                            {item.status == 1 && (
                              <div className="accpt_class">Accepted</div>
                            )}
                            {item.status == 0 && (
                              <div className="reject_class">Rejected</div>
                            )}
                            {item.status == 2 && (
                              <div className="duplicate_class">Duplicate</div>
                            )}
                          </td>
                          <td>{item.publisher_id}</td>
                          <td>{item.buyer_id == 0 ? "--" : item.buyer_id}</td>
                          <td>
                            {item.buyer_status_response == "Approved" && (
                              <div className="accpt_class">Approved</div>
                            )}
                             {item.buyer_status_response == "Pending" && (
                              <div className="duplicate_class">Pending</div>
                            )}
                            
                            {item.buyer_status_response == "Rejected" && (
                              <div className="reject_class">Rejected</div>
                            )}
                            {item.buyer_status_response == "Trash" && (
                              <div className="reject_class">Trash</div>
                            )}
                          </td>
                          <td>{item.campaign_id}</td>
                          {/* <td>{item.cost}</td>
                      <td>{item.cost - item.price}</td> */}

                          <td>
                            <IoIosArrowForward
                              className="right_arrow"
                              onClick={() => {
                                handleArrowClick(item.response_id);
                              }}
                            />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              )}
              {!fetching && leads.length == 0 && (
                <div className="no_record">
                  {" "}
                  <p>NO RECORDS FOUND</p>
                </div>
              )}

              <Modal
                isOpen={open}
                onRequestClose={() => setOpen(false)}
                className="leads_model_class"
                styles={customStyles}
              >
                <div
                  className="close_img_div_leadss"
                  onClick={() => setOpen(false)}
                >
                  <IoIosClose />
                </div>
                <Media className="mt-1">
                  <Media body>
                    <Media heading className="media_img_heading">
                      Lead ID: <span>{details.lead_id} </span>
                    </Media>
                  </Media>
                </Media>

                <div className="modal_inner_block">
                  <div className="modal_tab_btns">
                    <button
                      onClick={() => {
                        handleDetail();
                        setlead_butt1(true);
                        setlead_butt2(false);
                        ////console.log("hello", lead_butt1);
                      }}
                      className={
                        lead_butt1 == true ? "butt_true" : "butt_false"
                      }
                    >
                      Details
                    </button>
                    <button
                      onClick={() => {
                        handleResponse();
                        setlead_butt2(true);
                        setlead_butt1(false);
                      }}
                      className={
                        lead_butt2 == true ? "butt_true" : "butt_false"
                      }
                    >
                      Response
                    </button>
                  </div>

                  {Object.keys(details).length > 1 && lead_butt1 &&  (
                    <div>
                      <div>
                        <div className="leads_checkResponse_inner_lead">
                          <Row>
                            {/* <Col lg={6} xl={1}>
                          </Col> */}
                            <Col lg={6} xl={5}>
                              <div className="response_div">
                                <p className="response_label">System Response </p>
                                <p className="response_status_r">
                                  <span>
                                    {details.status == 1 && "Accepted"}
                                    {details.status == 0 && "Rejected"}
                                    {details.status == 2 && "Duplicate"}
                                  </span>
                                </p>
                              </div>

                              <div>
                                <div className="response_div">
                                  {/* <p className="response_label">
                                  <b>Lead details</b>
                                </p> */}
                                </div>

                              
                                {details.lead_details &&
                                  Object.entries(details.lead_details).map(
                                    ele => (
                                      <div className="response_div">
                                        <p className="response_label">
                                          {ele[0]}{" "}
                                        </p>
                                        <p className="response_status_r">
                                          <span className="email_align_lead">{ele[1]} </span>
                                        </p>
                                      </div>
                                    )
                                  )}
                              </div>

                            
                            </Col>
                            <Col lg={6} xl={6}>
                              <div className="response_div">
                                <p className="response_label">Campaign ID</p>
                                <p className="response_status_r">
                                  <span>{details.campaign_id} </span>
                                </p>
                              </div>

                              <div className="response_div">
                                <p className="response_label">Campaign Name</p>
                                <p className="response_status_r">
                                  <span>{details.campaign_name} </span>
                                </p>
                              </div>
                              <div className="response_div">
                                <p className="response_label">Publisher ID</p>
                                <p className="response_status_r">
                                  <span>{details.publisher_id} </span>
                                </p>
                              </div>
                              <div className="response_div">
                                <p className="response_label">Publisher Name</p>
                                <p className="response_status_r">
                                  <span>{details.publisher_name} </span>
                                </p>
                              </div>
                              <div className="response_div">
                                <p className="response_label">Vertical ID</p>
                                <p className="response_status_r">
                                  <span>{details.vertical_id} </span>
                                </p>
                              </div>
                              <div className="response_div">
                                <p className="response_label">Vertical Name</p>
                                <p className="response_status_r">
                                  <span>{details.vertical_name} </span>
                                </p>
                              </div>

                              <div className="response_div">
                                <p className="response_label">Buyer Id</p>
                                <p className="response_status_r">
                                  <span>{details.buyer_id} </span>
                                </p>
                              </div>

                              <div className="response_div">
                                <p className="response_label">Buyer Name</p>
                                <p className="response_status_r">
                                  <span>{details.buyer_name} </span>
                                </p>
                              </div>

                              <div className="response_div">
                                <p className="response_label">Buyer Response </p>
                                <p className="response_status_r">
                                  <span>
                                    {details.buyer_status == 1
                                      ? "Success"
                                      : "Failure"}{" "}
                                  </span>
                                </p>
                              </div>

                              <div className="response_div">
                                <p className="response_label">Cost</p>
                                <p className="response_status_r">
                                  <span> {details.cost} </span>
                                </p>
                              </div>

                              <div className="response_div">
                                <p className="response_label">Price</p>
                                <p className="response_status_r">
                                  <span>{details.price} </span>
                                </p>
                              </div>

                              <div className="response_div">
                                <p className="response_label">Profit</p>
                                <p className="response_status_r">
                                  <span>{details.cost - details.price} </span>
                                </p>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    </div>
                  )}
                  {Object.keys(details).length > 1 && lead_butt2  && (
                    <div className="leads_checkResponse_inner01">
                      <Col>
                        <div className="span_lead_div">
                        <p>
                            System Status:{" "}
                            <span>
                              {" "}
                              {/* {details.status == 1
                                ? "Accepted"
                                : "Rejected"}{" "} */}
                                {
                                  details.status_response
                                }
                            </span>
                          </p>
                          <p>
                            Buyer Status:{" "}
                            <span>
                                    {details.buyer_status == 1
                                      ? "Success"
                                      : "Failure"}{" "}
                                  </span>
                          </p>
                          <p>
                            Response:{" "}
                            <span className="buy_lead_res">
                              {details.buyer_status_response!==null?details.response:"--"}{" "}
                            </span>
                          </p>
                          
                        </div>
                      </Col>
                    </div>
                  )}
                </div>
              </Modal>

              <div>
                <PaginationName
                  prev={prev}
                  next={next}
                  getPublishersList={getPublishersList}
                  num={num}
                  total={total}
                  limit={limit}
                  totalPages={totalpages}
                  currentPage={currentPage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// const customStyles = {
//   content: {
//     top: "50%",
//     left: "50%",
//     right: "auto",
//     bottom: "auto",
//     marginRight: "-50%",
//     transform: "translate(-50%, -50%)",
//     width: "50%",
//     overflow: "hidden"
//     // height: "50%"
//   }
// };
const customStyles = {
  // container: (provided) => ({
  //   ...provided,
  //   width: '174px',
  //   border:"1px solid #434898"
  // }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    styles.minWidth = "168px";
    // }
    return {
      ...styles,
      //  backgroundColor:"red",
      //  justifyContent:"center",

      //  display:"flex !important" ,
      //  width:"136px",
      //  marginLeft:a==1?10:"1px",
      // marginLeft:"3%",
      // fontWeight:"500",
      // display:"flex",
      // marginRight:"3%",
      // justifyContent:"center",
      // alignItems:"center",
      backgroundColor: isSelected ? "#007bff" : "white",

      color: isDisabled
        ? "#fff"
        : isSelected
        ? chroma.contrast(color, "white") > 1
          ? data.color
          : "black"
        : data.color
    };
  }
  // multiValue: (styles, { data }) => {
  //   const color = chroma(data.color);
  //   return {
  //     ...styles,
  //     backgroundColor: color.alpha(0.1).css(),
  //   };
  // },
  // multiValueLabel: (styles, { data }) => ({
  //   ...styles,
  //   color: data.color,
  // }),
  // multiValueRemove: (styles, { data }) => ({
  //   ...styles,
  //   color: data.color,
  //   ':hover': {
  //     backgroundColor: data.color,
  //     color: 'white',
  //   },
  // }),
};
// const customStyles1 = {

//   container: (provided) => ({
//     ...provided,
//     width: '136px',

//   }),
//   dropdownIndicator:(provided)=>({
//     ...provided,
//     color: "#484393",
//     // fontSize:"12px"
//     width:"30px",

//   }),
//   option: (styles, { data, isDisabled, isFocused, isSelected }) => {
//     const color = chroma(data.color);
//     return {

//      //...styles,
//     //  width:"136px",
//     marginLeft:"3%",
//     fontWeight:"500",
//     display:"flex",
//     marginRight:"3%",
// justifyContent:"space-between",
// alignItems:"center",
// // border:"1px solid #484393",
//       backgroundColor: isSelected ? "#007bff"  : "white",

//       color: isDisabled
//         ? '#fff'
//         : isSelected
//         ? chroma.contrast(color, 'white') > 1
//           ? data.color
//           : 'black'
//         : data.color,
//     };
//   },

// }
export default Leads;
