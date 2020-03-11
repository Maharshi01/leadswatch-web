import React, { Component, useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import PaginationName from "../Pagination/Pagination";
import ShowEntriesName from "../Pagination/ShowEntries";
import { IoIosArrowForward, IoIosArrowBack,IoIosCheckmarkCircleOutline } from "react-icons/io";
import DatePicker from "react-datepicker";
import { MdDateRange, MdRefresh } from "react-icons/md";
import { API_URL ,logoutidle} from '../../AppConfig'
import "../Leads/Leads.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";

import axios from "axios";

const PubCampaigns = () => {
  // let match = useRouteMatch();

  // buyer state stores the list of buyers
  const [campaigns, setCampaigns] = useState([]);
  // This state is used for loading screen

  const [searchbarValue, setSearch] = useState("");

  const [myDeals, setMyDeals] = useState(campaigns);
  const [copy, setcopy] = useState(false);
  const [copyclip, setcopyclip] = useState("sda");
  const [prev, setPrev] = useState(null);

  const [next, setNext] = useState(2);
  const [total, setTotal] = useState("");
  const [limit, setLimit] = useState(0);
  const [filterLimit, setFilterLimit] = useState([10]);
  const [num, setNum] = useState([0]);
  const [enddate, setenddate] = useState("");
  const [startdate, setstartdate] = useState("");
  const [verticalId, setVerticalID] = useState("");
  const [currentPage,setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);
  // useEffect(() => {
  //   const config = {
  //     url: API_URL+"/campaign/publishers",
  //     method: "get",
  //     headers: {
  //       "Content-Type": "application/json",

  //       Authorization: "Bearer " + localStorage.getItem("access_token")
  //     }
  //   };
  //   axios(config)
  //     .then(response => {
  //       setCampaigns(response.data.data.list);
  //     })
  //     // Error handling
  //     .catch(error => {});
  // }, []);

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

  const refreshfilter = () => {
    setenddate("");
    setstartdate("");
    setVerticalID("");
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
      page: 1,
      limit: 10,
      search: "",
      filters: {
        daterange: "",
        vertical_id: ""
      },
      sortby: {
        [a]: parseInt(b)
      }
    };

    const config = {
      url: API_URL+"/campaign/publishers",
      data: data,
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    };
    axios(config)
      .then(response => {
        setCampaigns(response.data.data.list);
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

  useEffect(() => {
    const getPublishers = () => {
      const data = {
        page: 1,
        limit: 10,
        search: "",
        filters: {
          vertical_id: "",
          daterange: ""
        },
        sortby: {
          created: -1
        }
      };
      const config = {
        url: API_URL+"/campaign/publishers",
        data: data,
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token")
        }
      };
      axios(config)
        .then(response => {
          ////console.log("in response in useEffect", response);
          setCampaigns(response.data.data.list);
          setTotal(response.data.data.total_count);
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
        })
        .catch(error => {
          if(error.message=="Request failed with status code 401"){
            logoutidle()
          }
          // ////console.log("error failed");
          // if (error.message == "Network Error") {
          //   alert("Network Error \n Please Try Again later");
          // } else if (
          //   error.response.data.error.message ===
          //   "Your account had been deactivated"
          // ) {
          //   ////console.log(error.response);
          //   alert("error :" + error.response.data.error.message);
          // } else {
          //   ////console.log(error.response);
          //   alert("error :" + error.response.data.error.message);
          // }
        });
    };
    getPublishers();
  }, []);

  const getPublishersList = (limit, page, a, b) => {
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
        vertical_id: verticalId,
        daterange: dates
      },
      sortby: {
        [a]: parseInt(b)
      }
    };

    ////console.log("data being sent ", data);

    const config = {
      url: API_URL+"/campaign/publishers",
      data: data,
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    };
    axios(config)
      .then(response => {
        ////console.log("response after the search", response);
        setCampaigns(response.data.data.list);
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
        // ////console.log("error failed");
        // if (error.message == "Network Error") {
        //   alert("Network Error \n Please Try Again later");
        // } else if (
        //   error.response.data.error.message ===
        //   "Your account had been deactivated"
        // ) {
        //   ////console.log(error.response);
        //   alert("error :" + error.response.data.error.message);
        // } else {
        //   ////console.log(error.response);
        //   alert("error :" + error.response.data.error.message);
        // }
        ////console.log(error);
        ////console.log(error.message, "msg");
      });
    //////console.log("proceed to home screen");
  };

  return (
    <div className="body_bg">
      <div className="body_inner body_inner_pub">
        <div className="page_heading">
          {/* <div className="back_icon"><IoIosArrowBack /></div> */}
          <div className="page_heading_name">Campaigns</div>
        </div>
        <div className="body_inner_section">
          <div className="date_row">
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
        
        className="input_fields_dleads1"
        placeholderText="Start Date"
        dateFormat="MM-dd-yyyy"
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
          dateFormat="MM-dd-yyyy"
          selected={enddate}
          onChange={date => {
            handleend(date);
          }}
        />
                  <div className="dateIconleads2"><MdDateRange /></div>
                </div>

              <div className="campaignId">
                <p>Vertical ID</p>
                <input
                  className="id_row_input"
                  value={verticalId}
                  type="text"
                  placeholder="ID1,ID2"
                  pattern="[0-9]*"
                  onChange={e => {
                    setVerticalID(e.target.value);
                  }}
                />
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





              {/* <div className="apply_btn_div">
                <button
                  className="apply_btn"
                  onClick={event => {
                    getPublishersList(filterLimit, 1);

                    let a = [];
                    for (let i = 1; i <= Math.ceil(total / filterLimit); i++) {
                      a.push(i);
                    }
                    setNum(a);
                    setLimit(filterLimit);
                  }}
                >
                  Apply
                </button>
              </div> */}
            </div>
            </div>


            <div className="searchbarValue_Div_camp01">
         
          <div className="searchbarValue_fieldleads_div01">
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
                className="circularArrowleads circularArrowleads_pub"
              />
            </div>
            </div>
          </div>
        </div>
        <table
          id="dtBasicExample"
          class="table table-striped table-sm table_pub_campagins"
          cellspacing="0"
        >
          <thead>
            <tr
              style={{ color: "#484393", fontWeight: "bolder", fontSize: 20 }}
            >
              <th class="th-sm extra_class text-center">
                <div className="first_div">
                  ID
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
                        fill="#484393"
                      />
                    </svg>
                    <svg
                      className="svg_two"
                      onClick={event => {
                        getPublishersList(limit, 1, "campaign_id", "-1");
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
                  {" "}
                  Name
                  <div className="svg_grid">
                    <svg
                      className="svg_one"
                      onClick={event => {
                        getPublishersList(limit, 1, "name", "1");
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
                        getPublishersList(limit, 1, "name", "-1");
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
                {" "}
                <div className="first_div">
                  Description
                  <div className="svg_grid">
                    <svg
                      className="svg_one"
                      onClick={event => {
                        getPublishersList(limit, 1, "desc", "1");
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
                        getPublishersList(limit, 1, "desc", "-1");
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
                  Vertical ID
                  <div className="svg_grid">
                    <svg
                      className="svg_one"
                      onClick={event => {
                        getPublishersList(limit, 1, "vertical_id", "1");
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
                        getPublishersList(limit, 1, "vertical_id", "-1");
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
                  Price
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.length > 0 && 
              campaigns.map(item => (
                <tr>
                  <td className="text-center">{item.campaign_id}</td>

                  <td className="text-center">{item.name}</td>
                  <td>{item.desc}</td>
                 
                  <td>{item.vertical_id}</td>

                  <td>{item.price}</td>
                  <td>
                    {" "}
                    <CopyToClipboard
                      text={item.vertical_id}
                      onCopy={() => setcopyclip(item.vertical_id)}
                    >
                      <Link>
                        <div className="View_Vertical_Details">Copy</div>
                      </Link>
                    </CopyToClipboard>
                  </td>
                </tr>
              ))
          }
          </tbody>
        </table>
        {!fetching && campaigns.length == 0 && (
            <div className="no_record">
              {" "}
              <p>NO RECORDS FOUND</p>
            </div>
          )}
        <div>
          <PaginationName
            prev={prev}
            next={next}
            getPublishersList={getPublishersList}
            num={num}
            total={total}
            limit={limit}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default PubCampaigns;
