import { Helmet } from "react-helmet";
import React, { Component, useState, useEffect } from "react";
import { API_URL ,logoutidle} from '../../AppConfig'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useHistory
} from "react-router-dom";
import { FiPlusCircle } from "react-icons/fi";
import { MdDateRange, MdRefresh } from "react-icons/md";
import { hashHistory } from "react-router";
import { Row, Col, Image } from "react-bootstrap";
import {
  IoIosClose,
  IoIosArrowForward,
  IoIosArrowBack,
  IoIosCheckmarkCircleOutline
} from "react-icons/io";
import Modal from "react-modal";
import PaginationName from "../Pagination/Pagination";
import axios from "axios";
import Dropdown from "react-dropdown";
import { render } from "react-dom";
import { Spinner, OverlayTrigger, Tooltip } from "react-bootstrap";
import "react-activity/dist/react-activity.css";
const BuyerRoutes = () => {
  let history = useHistory();

  let { id } = useParams();
  // buyer state stores the list of buyers
  const [buyerroutes, setBuyerRoutes] = useState([]);
  // This state is used for loading screen
  const [fetching, setFetching] = useState(true);
  const [head, setHead] = useState();
  const [permissions, setPermissions] = useState({});
  const [statusopen, setStatusOpen] = useState(false);
  const [editstatusopen, setEditStatusOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [count,setCount]=useState();
  const [list, setList] = useState([]);
  const [total, setTotal] = useState([0]);
  const [limit, setLimit] = useState([0]);
  const [filterLimit, setFilterLimit] = useState([10]);
  const [num, setNum] = useState([0]);
  const [prev, setPrev] = useState(null);
  const [next, setNext] = useState(2);
  const [statusvalue, setStatusValue] = useState([]);
  const [totalpages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [defaultOption, setDefaultOption] = useState("");
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);
  const [d, setD] = useState(0);

  const options = [
    // { label: 'Buyer Options', value: "", className:"buyer_status"},
    { label: "Active", value: "1", className: "option1_lead" },
    { label: "Inactive", value: "0", className: "option2_lead" }
  ];
  const handlesatus = ss => {
    setDefaultOption(ss.label);
    // //console.log("asadadad",ss);
    setStatusValue([JSON.parse(ss.value)]);
    ////console.log("Campaign status",ss.value)

    // setstatusfil(ss);
  };
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "35%"
    }
  };

  const buyeritems = 
  buyerroutes &&
  buyerroutes.map(item => (
    <tr>
      <td>{item.name}</td>
      {/* <td>{item.url}</td> */}
      <td>{item.method}</td>
      {/* <td style={{color:item.vertical_buyer_active==1?"#1BAC38":"#F53669"}}>{item.vertical_buyer_active ? "Active" : "Inactive"}</td> */}
      <td
        style={{
          color: item.vertical_buyer_active == 1 ? "#1BAC38" : "#F53669"
        }}
      >
        {item.vertical_buyer_active == 1 ? (
          <div className="active_green">Active</div>
        ) : (
          <div className="active_red">Inactive</div>
        )}
      </td>
      <td>
        <Link to={`/editbuyerroute/${item.routeid}`}>
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
    </tr>
  ));

  //function to get buyers list on loading
  useEffect(() => {
    document.title = "Buyer Routes - LeadsWatch";
    if (localStorage.getItem("role") == 4)
      var currentModule = JSON.parse(
        localStorage.getItem("permissions")
      ).filter(item => {
        return item.module_id == 4;
      });

    setPermissions(currentModule ? currentModule[0] : {});
    const data = {
      limit: 10,
      page: 1,
      search: "",
      filters: {
        status: statusvalue
      },
      sortby: { email: -1 }
    };
    const config = {
      url: API_URL+`/broutes/list/${id}`,
      data: data,
      method: "post",
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer " + global.access_token
        Authorization: "Bearer " + localStorage.getItem("access_token")
        //"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiZW1haWwiOiJzdXJ5YUBnbWFpbC5jb20iLCJyb2xlX2lkIjoyLCJpYXQiOjE1NzI2MDk3MzIsImV4cCI6MTU3MjYyNzczMn0.O-sYbYIhMSRWLl_hkHy02-fFeaEnfAmodykxIybd--w"
      }
    };
    axios(config)
      .then(response => {
        // ////console.log("BuyerList", response);
        setBuyerRoutes(response.data.data.list);
        setTotal(response.data.data.total_count);
        setLimit(response.data.data.per_page);
        setTotalPages(response.data.data.total_pages);
        setCount(response.data.data);
        setList(response.data.data.list);
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
        setLimit(response.data.data.per_page);
        setList(response.data.data.list);
        setFetching(false);
      })
      // Error handling
      .catch(error => {
        // ////console.log("Buyerlisterror1", error);
        // window.alert(error.response.data.error.message);
        if(error.message=="Request failed with status code 401"){
          logoutidle()
        }
      });
    const config1 = {
      url: API_URL+`/buyer/detail/${id}`, //URL

      method: "get", //Method
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer " + global.access_token
        Authorization: "Bearer " + localStorage.getItem("access_token")
        // "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiZW1haWwiOiJzdXJ5YUBnbWFpbC5jb20iLCJyb2xlX2lkIjoyLCJpYXQiOjE1NzI2MDk3MzIsImV4cCI6MTU3MjYyNzczMn0.O-sYbYIhMSRWLl_hkHy02-fFeaEnfAmodykxIybd--w"
      }
    };
    axios(config1)
      .then(response => {
        // ////console.log("BuyerList", response);
        //setBuyerDetail(response.data.data);
        setHead(response.data.data.firstname);
        // To make activity Indicator off
        setFetching(false);
      })
      // Error handling
      .catch(error => {
        alert(error.response.data.error.message);
        // ////console.log("Buyerlisterror1", error);
        // window.alert(error.response.data.error.message);
      });
  }, []);
  if (localStorage.getItem("success") == 1) {
    setStatusOpen(true);
    localStorage.setItem("success", 0);
  }
  if (localStorage.getItem("success1") == 1) {
    setEditStatusOpen(true);
    localStorage.setItem("success1", 0);
  }
  const getSearched = (limit, page, a, b) => {
    const data = {
      limit: limit,
      page: page,
      search: searchValue ? searchValue : "",
      filters: {
        status: statusvalue == 2 ? "" : statusvalue
      },
      sortby: { [a]: parseInt(b) }
    };
    const config = {
      url: API_URL+`/broutes/list/${id}`,
      data: data,
      method: "post",
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer " + global.access_token
        Authorization: "Bearer " + localStorage.getItem("access_token")
        //"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiZW1haWwiOiJzdXJ5YUBnbWFpbC5jb20iLCJyb2xlX2lkIjoyLCJpYXQiOjE1NzI2MDk3MzIsImV4cCI6MTU3MjYyNzczMn0.O-sYbYIhMSRWLl_hkHy02-fFeaEnfAmodykxIybd--w"
      }
    };
    axios(config)
      .then(response => {
        // ////console.log("BuyerList", response);

        setBuyerRoutes(response.data.data.list);
        setTotal(response.data.data.total_count);
        setLimit(response.data.data.per_page);
        setList(response.data.data.list);
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
        // ////console.log("");
        // To make activity Indicator off
        setFetching(false);
      })
      // Error handling
      .catch(error => {
        // ////console.log("Buyerlisterror1", error);
        // window.alert(error.response.data.error.message);
      });
  };
  function enterPressed(event) {
    var code = event.keyCode || event.which;
    if (code === 13) {
      //13 is the enter keycode
      //  ////console.log("Enter Pressed");
      getSearched();
    }
  }
  function getDataWithoutFilter() {
    const data = {
      limit: 10,
      page: 1,
      search: "",
      sortby: { email: -1 }
    };
    const config = {
      url: API_URL+`/broutes/list/${id}`,
      data: data,
      method: "post",
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer " + global.access_token
        Authorization: "Bearer " + localStorage.getItem("access_token")
        //"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiZW1haWwiOiJzdXJ5YUBnbWFpbC5jb20iLCJyb2xlX2lkIjoyLCJpYXQiOjE1NzI2MDk3MzIsImV4cCI6MTU3MjYyNzczMn0.O-sYbYIhMSRWLl_hkHy02-fFeaEnfAmodykxIybd--w"
      }
    };
    axios(config)
      .then(response => {
        // ////console.log("BuyerList", response);

        setBuyerRoutes(response.data.data.list);
        setTotal(response.data.data.total_count);
        setLimit(response.data.data.per_page);
        setList(response.data.data.list);
        setPrev(response.data.data.prev_page);
        setNext(response.data.data.next_page);
        setCurrentPage(response.data.data.page);
        setDefaultOption("Status");

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
        // ////console.log("");
        // To make activity Indicator off
        setFetching(false);
      })
      // Error handling
      .catch(error => {
        // ////console.log("Buyerlisterror1", error);
        // window.alert(error.response.data.error.message);
      });
  }
  return (
    <div className="body_bg">
      <Helmet>
        <title>Buyerroutes - LeadsWatch</title>
      </Helmet>
      <div className="body_inner">
        <Modal isOpen={statusopen} style={customStyles}>
          <div
            className="buyers_createBuyers_close"
            onClick={() => {
              setStatusOpen(false);
            }}
          >
            <IoIosClose />
          </div>
          <div>
            <p className="text-center buy_success_msg">
              Buyer Route created successfully
            </p>
          </div>
        </Modal>

        <Modal isOpen={editstatusopen} style={customStyles}>
          <div
            className="buyers_createBuyers_close"
            onClick={() => {
              setEditStatusOpen(false);
            }}
          >
            <IoIosClose />
          </div>
          <div>
            <p className="text-center_buyer">Buyer Route updated successfully</p>
          </div>
        </Modal>

        <div className="buyer_table">
          <div
            onClick={() => {
              history.goBack();
            }}
            className="back_buy_contact"
          >
            <IoIosArrowBack />
          </div>
          <div className="buyer_table_heading">
            <p>{head}'s Routes</p>
            <div className="add_icon_buy">
              {localStorage.getItem("role") == 2 ? (
                <Link to={`/createbuyerroute/${id}`} className="buyerRoute">
                  <FiPlusCircle />
                </Link>
              ) : !permissions && permissions.actions.includes(2) ? (
                <Link to={`/createbuyerroute/${id}`} className="buyerRoute">
                  <FiPlusCircle />
                </Link>
              ) : (
                <OverlayTrigger
                  overlay={
                    <Tooltip>Read only mode, changes not allowed!</Tooltip>
                  }
                >
                  <FiPlusCircle />
                </OverlayTrigger>
              )}
            </div>
          </div>

          <div className="body_inner_section">
            <div className="date_row_pub">
              <div className="showEntriesDiv">
                <label className="showEntriesLabel">
                  <div className="showEntriesLabelDiv">
                    {" "}
                    <p>Show Entries</p>
                  </div>
                  <div className="showEntriesSelDiv">
                    <select
                      className="show_entries_input"
                      onChange={event => {
                        setFilterLimit(event.target.value);
                        getSearched(event.target.value, 1);

                        let a = [];
                        for (
                          let i = 1;
                          i <= Math.ceil(total / event.target.value);
                          i++
                        ) {
                          a.push(i);
                        }
                        setNum(a);
                        setLimit(event.target.value);
                      }}
                    >
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
                <div className="date_block_buyyer_inner002">
                  <div className="pub_id_create">
                    <Dropdown
                      options={options}
                      className="dropdown_leads_buy"
                      onChange={value => handlesatus(value)}
                      value={defaultOption}
                      placeholder="Status"
                    ></Dropdown>
                  </div>

                  <div className="apply_btn_div">
                    <IoIosCheckmarkCircleOutline
                      className="lead_apply_svg"
                      onClick={() => {
                        getSearched();
                      }}
                    />
                  </div>
                  <div className="refresh_btn_div">
                    <Link
                      onClick={() => {
                        setSearchValue(" ");
                        setStatusValue([]);
                        getDataWithoutFilter();
                      }}
                    >
                      <MdRefresh className="refreshbtn1" />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="butt_create_buyers003">
                <div className="searchbarValue_Div_leads">
                  <input
                    className="searchbarValue_fieldleads"
                    placeholder="Search"
                    value={searchValue}
                    onChange={event => {
                      if (event.target.value == "") {
                        getDataWithoutFilter();
                      }
                      setSearchValue(event.target.value);
                    }}
                    onKeyPress={enterPressed.bind(this)}
                    type="text"
                  />
                  <Link
                    onClick={event => {
                      getSearched();
                    }}
                  >
                    <IoIosArrowForward className="circularArrowleads" />
                  </Link>
                </div>
              </div>
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
                      class="th-sm"
                      onClick={() => {
                        // alternate("name");
                        setB(0);
                        setC(0);
                        setD(0);

                        if (a == 1) {
                          getSearched(limit, 1, "name", "1");
                          setA(2);
                        } else {
                          setA(1);
                          getSearched(limit, 1, "name", "-1");
                        }
                      }}
                    >
                      Name
                      <a className="a_class">
                        <svg
                          className="svg_up"
                          onClick={event => {
                            getSearched(limit, 1, "name", "1");
                            //getSortedSearched("firstname","1",limit,1);
                          }}
                          id="Group_2411_route"
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
                          onClick={event => {
                            getSearched(limit, 1, "name", "-1");
                            // getSortedSearched("firstname","-1",limit,1);
                          }}
                          id="Group_2411_route"
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
                      </a>
                    </th>
                   
                    <th
                      class="th-sm"
                      onClick={() => {
                        // alternate("name");
                        setA(0);
                        setB(0);
                        setD(0);

                        if (c == 1) {
                          getSearched(limit, 1, "method", "1");
                          setC(2);
                        } else {
                          setC(1);
                          getSearched(limit, 1, "method", "-1");
                        }
                      }}
                    >
                      Method
                      <a className="a_class">
                        <svg
                          className="svg_up"
                          onClick={event => {
                            getSearched(limit, 1, "method", "1");
                            //getSortedSearched("firstname","1",limit,1);
                          }}
                          id="Group_2411_route"
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
                          onClick={event => {
                            getSearched(limit, 1, "method", "-1");
                            // getSortedSearched("firstname","-1",limit,1);
                          }}
                          id="Group_2411_route"
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
                      </a>
                    </th>
                    <th
                      class="th-sm"
                      onClick={() => {
                        // alternate("name");
                        setA(0);
                        setB(0);
                        setC(0);

                        if (d == 1) {
                          getSearched(limit, 1, "active", "1");
                          setD(2);
                        } else {
                          setD(1);
                          getSearched(limit, 1, "active", "-1");
                        }
                      }}
                    >
                     Route Status
                      <a className="a_class">
                        <svg
                          className="svg_up"
                          onClick={event => {
                            getSearched(limit, 1, "active", "1");
                            //getSortedSearched("firstname","1",limit,1);
                          }}
                          id="Group_2411_route"
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
                          onClick={event => {
                            getSearched(limit, 1, "active", "-1");
                            // getSortedSearched("firstname","-1",limit,1);
                          }}
                          id="Group_2411_route"
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
                      </a>
                    </th>
                    <th class="th-sm details_lead">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {(!fetching && buyerroutes)  && buyeritems}
                </tbody>
              </table>
            )}

            <div>
              <PaginationName
                prev={prev}
                next={next}
                getPublishersList={getSearched}
                num={num}
                total={total}
                limit={limit}
                totalPages={totalpages}
                currentPage={currentPage}
              />
            </div>
            {(!fetching && !buyerroutes) && (
              <p
                style={{
                  textAlign: "center",
                  color: "#484393",
                  fontWeight: "400",
                  marginTop: "2%"
                }}
              >
                No Routes Found For This Buyer!!
              </p>
            )}
         
          </div>
          {/* Table display ends here */}
        </div>
      </div>
    </div>
  );
};

export default BuyerRoutes;
