import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PaginationName from "../Pagination/Pagination";
import Pagination from "../Pagination/Pagination";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { MdDateRange, MdRefresh } from "react-icons/md";
import DatePicker from "react-datepicker";
import ToggleButton from "react-toggle-button";
import Modal from "react-modal";
import { IoIosClose } from "react-icons/io";
import { NavLink, withRouter } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { Media } from "reactstrap";
import "../Leads/Leads.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { API_URL ,logoutidle} from '../../AppConfig';
import Dropdown from "react-dropdown";
import {
  IoIosHome,
  IoIosStats,
  IoIosVolumeHigh,
  IoIosWalk,
  IoIosCheckmarkCircleOutline,
  IoIosPeople,
  IoIosList
} from "react-icons/io";

// function Leads() {
//   return (

// <Link to={'/publeaddetail/1'}>leaddetails</Link>

//   );
// }

//export default Leads;

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
  const [switch1, setswitch1] = useState("");
  const [prev, setPrev] = useState(null);

  const [next, setNext] = useState(2);
  const [open, setOpen] = useState(false);

  const [detail, setDetail] = useState(true);
  const [response, setResponse] = useState(false);
  const [id, setId] = useState();
  const [lead_butt1, setlead_butt1] = useState(true);
  const [lead_butt2, setlead_butt2] = useState(false);
  const [currentPage,setCurrentPage] = useState(1);

  const [details, setDetails] = useState({});
  const options = [
    // { label: 'Buyer Options', value: "", className:"buyer_status"},
    { label: "Accepted", value: "1", className: "option1_lead" },
    { label: "Rejected", value: "0", className: "option2_lead" },
    { label: "Duplicate", value: "2", className: "option2_lead3" }
  ];



  // <option value="">Status</option>

  // <option value="1" color="green">Accepted</option>
  // <option value="0">Rejected</option>
  //  <option value="2">Duplicate</option>



  const [totalpages, setTotalpages] = useState();

  const getLeadDetail = ids => {
    const config = {
      url: API_URL+'/lead/detail/${ids}',
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
        if(error.message=="Request failed with status code 401"){
          logoutidle()
        }
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

  const handlesatus = ss => {
    setstatusfil(ss);
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
    setswitch1(ss);
  };

  useEffect(() => {
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
          console.log(response.data.data.list, "in leads");
          setTotal(response.data.data.total_count);
          setTotalpages(response.data.data.total_pages);
          setPrev(response.data.data.prev_page);
          setNext(response.data.data.next_page);
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
          ////console.log(response.data.data.total_count, "total count");
          setLimit(response.data.data.per_page);
          ////console.log(response.data.data.per_page, "limit");
          ////console.log(response.data.data.list, "publishers list");
          setLeads(response.data.data.list);

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

  const getPublishersList = (limit, page, a = "created", b = -1) => {
    let dates;
    if (startdate == "" && enddate == "") {
      dates = "";
    } else if (startdate == "" && enddate != "") {
      var sdate = new Date(enddate);
      let stadate = sdate.setDate(sdate.getDate() - 1);
      dates = convert(stadate) + "to" + convert(enddate);
    } else if (enddate == "" && startdate != "") {
      var edate = new Date(startdate);
      let endate = edate.setDate(edate.getDate() + 1);
      dates = convert(startdate) + "to" + convert(endate);
    } else {
      dates = convert(startdate) + "to" + convert(enddate);
    }
    const data = {
      page: page,
      limit: limit,
      search: searchbarValue ? searchbarValue : "",
      filters: {
        status: statusfil == "" ? [] : [parseInt(statusfil)],
        buyer_status: switch1 == "" ? [] : [parseInt(switch1)],
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
        //console.log(response);
        setLeads(response.data.data.list);
        setTotal(response.data.data.total_count);
        setLimit(response.data.data.per_page);
        setTotalpages(response.data.data.total_pages);
        setPrev(response.data.data.prev_page);
        setNext(response.data.data.next_page);
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
    setswitch1("");
    setstatusfil("");
    setSearch("");

    getLeadsListRefreshed(limit, 1, "created", "1");
  };

  const getLeadsListRefreshed = (limit, page, a, b) => {
    let dates;
    if (startdate == "" && enddate == "") {
      dates = "";
    } else if (startdate == "" && enddate != "") {
      var sdate = new Date(enddate);
      let stadate = sdate.setDate(sdate.getDate() - 1);
      dates = convert(stadate) + "to" + convert(enddate);
    } else if (enddate == "" && startdate != "") {
      var edate = new Date(startdate);
      let endate = edate.setDate(edate.getDate() + 1);
      dates = convert(startdate) + "to" + convert(endate);
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
        setLimit(response.data.data.per_page);
        setPrev(response.data.data.prev_page);
        setNext(response.data.data.next_page);
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

  return (
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
                    dateFormat="MM-dd-yyyy"
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
                    dateFormat="MM-dd-yyyy"
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
                    dateFormat="MM-dd-yyyy"
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
            </div> */}



<div className="date_row_leads">
              <div className="showEntriesDiv">
                <label className="showEntriesLabel">
                  <div className="showEntriesLabelDiv"> <p>Show Entries</p></div>
                  <div className="showEntriesSelDiv">
                    <select 
         >onChange={event => entries(event.target.value)}
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
                {/* <div className="refresh_btn_div">
                  <Link
                    onClick={() => {
                      refreshfilter();
                    }}
                  >
                 
                  <MdRefresh className="refreshbtn"/>
                  </Link>
                </div> */}

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
                  <div className="dateIconleads2"><MdDateRange /></div>
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
                  <div className="dateIconleads1"><MdDateRange /></div>
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
                  <div className="dateIconleads2"><MdDateRange /></div>
                </div>





                <div className="apply_btn_div">
                      <IoIosCheckmarkCircleOutline
                        className="lead_apply_svg"
                        onClick={event => {
                          getPublishersList(filterLimit, 1);
        
                          let a = [];
                          for (let i = 1; i <= Math.ceil(total / filterLimit); i++) {
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
            
        <div className="searchbarValue_Div_leads011">
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












            <div className="id_row id_row_pub">
              <div className="publisherId">
                <p>Publisher ID</p>
                <input
                  className="id_row_input"
                  placeholder="ID1,ID2"
                  value={publisher_id}
                  type="text"
                  pattern="[0-9]*"
                  onChange={e => {
                    setPublisher_ID(e.target.value);
                  }}
                />
              </div>


              <div className="select_main123">
                  <Dropdown
                    options={options}
                    className="dropdown_leads1"
                    onChange={event => handlesatus(event.target.value)}
                    value={statusfil}
                    placeholder="Buyer Response"
                  ></Dropdown>
                </div>


{/* 
              <div className="">
                  <select
                  className="publead_selc"
                    value={statusfil}
                    onChange={event => handlesatus(event.target.value)}
                  >
                    <option value="">Status</option>

                    <option value="1" color="green">Accepted</option>
                    <option value="0">Rejected</option>
                     <option value="2">Duplicate</option>
                  </select>
                </div> */}

              {/* <div className="buyerStatus">
               
                <select
                  value={switch1}
                  onChange={event => handleSwitchChange(event.target.value)}
                >
                  <option value="">Buyer Status</option>

                  <option value="1">Success</option>
                  <option value="0">Failure</option>
                </select>
              </div> */}
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
                  <th class="th-sm extra_class text-center">
                    <div className="first_div">
                      LW_ID{" "}
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
                            fill="#484393"
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
                            fill="#484393"
                          />
                        </svg>
                      </div>
                    </div>
                  </th>
                  {/* lead id*/}
                  <th class="th-sm extra_class">
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
                            fill="#484393"
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
                            fill="#484393"
                          />
                        </svg>
                      </div>
                    </div>
                  </th>
                  {/* lead date*/}
                  <th class="th-sm extra_class">
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
                            fill="#484393"
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
                            fill="#484393"
                          />
                        </svg>
                      </div>
                    </div>
                  </th>
                  <th class="th-sm extra_class">
                    <div className="first_div">
                      Status{" "}
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
                            fill="#484393"
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
                            fill="#484393"
                          />
                        </svg>
                      </div>
                    </div>
                  </th>
                  {/* lead details */}
                  <th class="th-sm extra_class">
                    <div className="first_div">
                      Publisher ID{" "}
                      <div className="svg_grid">
                        <svg
                          className="svg_one"
                          onClick={event => {
                            getPublishersList(limit, 1, "publisher_id", "1");
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
                            fill="#484393"
                          />
                        </svg>
                        <svg
                          className="svg_two"
                          onClick={event => {
                            getPublishersList(limit, 1, "publisher_id", "-1");
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
                            fill="#484393"
                          />
                        </svg>
                      </div>
                    </div>
                  </th>

                  {/* lead details */}
                  <th class="th-sm extra_class">
                    <div className="first_div">
                      Price{" "}
                      <div className="svg_grid">
                        <svg
                          className="svg_one"
                          onClick={event => {
                            getPublishersList(limit, 1, "price", "1");
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
                            fill="#484393"
                          />
                        </svg>
                        <svg
                          className="svg_two"
                          onClick={event => {
                            getPublishersList(limit, 1, "price", "-1");
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
                            fill="#484393"
                          />
                        </svg>
                      </div>
                    </div>
                  </th>
                  {/* label explains it*/}
                  <th class="th-sm extra_class">
                    <div className="first_div">
                      Cost{" "}
                      <div className="svg_grid">
                        <svg
                          className="svg_one"
                          onClick={event => {
                            getPublishersList(limit, 1, "cost", "1");
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
                            fill="#484393"
                          />
                        </svg>
                        <svg
                          className="svg_two"
                          onClick={event => {
                            getPublishersList(limit, 1, "cost", "-1");
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
                            fill="#484393"
                          />
                        </svg>
                      </div>
                    </div>
                  </th>
                  {/* label explains it*/}
                  <th class="th-sm extra_class">
                    <div className="first_div">
                      Profit{" "}
                      <div className="svg_grid">
                        <svg
                          className="svg_one"
                          onClick={event => {
                            getPublishersList(limit, 1, "cost", "1");
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
                            fill="#484393"
                          />
                        </svg>
                        <svg
                          className="svg_two"
                          onClick={event => {
                            getPublishersList(limit, 1, "cost", "-1");
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
                            fill="#484393"
                          />
                        </svg>
                      </div>
                    </div>
                  </th>
                  {/* label explains it*/}
                  <th class="th-sm">Details </th>
                  {/* */}
                </tr>
              </thead>
              <tbody>
                {leads.length>0 && leads.map(item => (
                  <tr>
                    <td className="text-center">{item.lead_id}</td>
                   
                    {/* <td>{item.push_date.split("T")[0]}</td> */}
                    <td>{item.push_date==null ?("N/A"):(item.push_date.split("T")[0])}</td>
                    <td>{item.push_date==null ?("N/A"):(item.push_date.split("T")[1].split(".")[0])}</td>
                     {/* <td>{item.push_date.split("T")[1].split(".")[0]}</td> */}
                  
                    <td>
                      {item.status == 1 && (
                        <div className="accpt_class">Accepted</div>
                      ) }
                      {item.status == 0 &&(
                        <div className="reject_class">Rejected</div>
                      )}
                      {item.status == 2 &&(
                        <div className="duplicate_class">Duplicate</div>
                      )}
                    </td>
                    <td>{item.publisher_id}</td>
                    {/* <td>{item.buyer_id}</td>
                    <td>{item.buyer_status == 1 ? "Success" : "Failure"}</td> */}
                    <td>{item.price}</td>
                    <td>{item.cost}</td>
                    <td>{item.cost - item.price}</td>
                    {/* <td>{item.lead_details.firstname}</td>
                  <td>{item.lead_details.lastname}</td>

                  <td>{item.vertical_id}</td>
                  <td>{item.campaign_id}</td>
                  <td>{item.buyer_name}</td>
                  <td>{item.vertical_name}</td>
                  <td>{item.campaign_name}</td> */}

                    <td>
                      {/* <Link to={`leaddetail/${item.lead_id}`}> */}
                      {/* <svg
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
                      </svg> */}
                      <IoIosArrowForward
                        className="right_arrow"
                        onClick={() => {
                          handleArrowClick(item.lead_id);
                        }}
                      />
                      {/* </Link> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Modal isOpen={open} style={customStyles}>
              <div className="close_img_div" onClick={() => setOpen(false)}>
                <IoIosClose />
              </div>
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

              <div className="modal_inner_block">
                {/* <Navbar className="navbar_sec" expand="lg">
                  <Navbar.Brand></Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto navbar_list">
                      <NavLink
                        // className={dashstate == true ? "dash_class" : "navbar_list"}
                        // className="navbar_list"
                        // activeClassName="dash_class"
                        onClick={() => {
                          handleDetail();
                        }}
                      >
                        <span className="icon">
                          <IoIosHome />
                        </span>{" "}
                        Details
                      </NavLink>

                      <NavLink
                        //className="navbar_list" activeClassName="dash_class"
                        // className={
                        //   leadsstate == true ? "dash_class" : "navbar_list"
                        // }
                        onClick={() => {
                          handleResponse();
                        }}
                      >
                        <span className="icon">
                          <IoIosStats />
                        </span>{" "}
                        Response
                      </NavLink>
                    </Nav>
                  </Navbar.Collapse>
                </Navbar> */}
                <div className="modal_tab_btns">
                  <button
                    onClick={() => {
                      handleDetail();
                      setlead_butt1(true);
                      setlead_butt2(false);
                      ////console.log("hello", lead_butt1);
                    }}
                    className={lead_butt1 == true ? "butt_true" : "butt_false"}
                  >
                    Details
                  </button>
                  <button
                    onClick={() => {
                      handleResponse();
                      setlead_butt2(true);
                      setlead_butt1(false);
                    }}
                    className={lead_butt2 == true ? "butt_true" : "butt_false"}
                  >
                    Response
                  </button>
                </div>

                {Object.keys(details).length > 1 && detail && (
                  <div>
                    <div>
                      <div className="leads_checkResponse_inner">
                        <Row>
                          <Col lg={6} xl={6}>
                            <div className="response_div">
                              <p className="response_label">Status </p>
                              <p className="response_status_r">
                                <span>
                                {details.status == 1
                                    && "Accepted"}
                                    {details.status == 0
                                    && "Rejected"}
                                    {details.status == 2
                                    && "Duplicate"}
                                </span>
                              </p>
                            </div>

                            <div>
                              <div className="response_div">
                                <p className="response_label">
                                  <b>Lead details</b>
                                </p>
                              </div>
                              <div className="response_div">
                                <p className="response_label">First Name </p>

                                <p className="response_status_r">
                                  <span>{details.lead_details.firstname} </span>
                                </p>
                              </div>
                              <div className="response_div">
                                <p className="response_label">Last Name </p>
                                <p className="response_status_r">
                                  <span>{details.lead_details.lastname} </span>
                                </p>
                              </div>
                            </div>

                            {/* <h2>
              Buyer ID
              {details.buyer_id}{" "}
            </h2> */}

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

                            {/* <div className="response_div">
                              <p className="response_label">Buyer Status </p>
                              <p className="response_status_r">
                                <span>
                                  {details.buyer_status == 1
                                    ? "Success"
                                    : "Failure"}{" "}
                                </span>
                              </p>
                            </div> */}
                            {/* <h5>
              Price
              {details.price}{" "}
            </h5> */}
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
                {Object.keys(details).length > 1 && response && (
                  <div className="leads_checkResponse_inner01">
                    {/* <Col lg={6} xl={6}>
                      <p>
                        Buyer Response{" "}
                        <span>{details.response || "No Response"} </span>
                      </p>
                    </Col> */}
                    <Col lg={6} xl={6}>
                      <p>
                        System Response{" "}
                        <span>
                          {" "}
                          {details.status == 1 ? "Accepted" : "Rejected"}{" "}
                        </span>
                      </p>
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
                totalPages={totalpages}
                total={total}
                limit={limit}
                currentPage={currentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    overflow: "hidden"
    // height: "50%"
  }
};
export default Leads;
