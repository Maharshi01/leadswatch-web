import { Helmet } from "react-helmet";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Publisher/Publisher.css";
import PaginationName from "../Pagination/Pagination";
import { cca } from "../UserManagement/cc";
import DatePicker from "react-datepicker";
import { FiPlusCircle } from "react-icons/fi";
import { API_URL ,logoutidle} from '../../AppConfig'
import { MdDateRange, MdRefresh } from "react-icons/md";
import Dropdown from "react-dropdown";
import { Col, Form, Row, Button, Image } from "react-bootstrap";
import {
  IoIosPerson,
  IoIosMail,
  IoIosUnlock,
  IoIosMailOpen,
  IoIosCheckmarkCircleOutline
} from "react-icons/io";
import { Spinner } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import Modal from "react-modal";
import { IoIosClose, IoIosArrowForward } from "react-icons/io";
import PublisherById from "./PublisherById.component.jsx";
import EditImage from "../../EditImage";

function Invite(props) {
  const [email, setEmail] = useState("");
  const [inviteemail, setinviteemail] = useState(false);
  const [invite_pub, setInvite_pub] = useState(false);
  const [success_alert, setsuccess_alert] = useState(false);
  const [success_alertText, setsuccess_alertText] = useState("");
  const [inviteErrorText, setInviteErrorText] = useState("");

  const checkEmail = str => {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (reg.test(str)) {
      return true;
    }
    return false;
  };
  const update=()=> {
    ////console.log("in update");
    if (checkEmail(email)) {
      const data = {
        email: email,
        member_type: "p"
      };
      const config = {
        url: API_URL+"/user/invite",
        data: data,
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token")
        }
      };
      axios(config)
        .then(response => {
          setEmail("");
          setInvite_pub(false);
          setsuccess_alert(true);
          setsuccess_alertText("Publisher invited Successfully");
          setInviteErrorText("");
          props.onHide();
        })
        .catch(error => {
          if(error.message=="Request failed with status code 401"){
            logoutidle()
          }
          ////console.log("error failed")
          if (error.message == "Network Error") {
            alert("Network Error \n Please Try Again later");
            // ////console.log(error);
            // ////console.log(error.message, "msg");
          } else {
            // ////console.log(error.response);
            try {
              setInviteErrorText("" + error.response.data.error.message);
              alert(error.response.data.error.message);
            } catch {}
          }

          ////console.log(error);
          // ////console.log(error.message, "msg");
        })
    } else {
      // alert("Check the format of email");
      setinviteemail(true);
    }
  }

  const handleEmail = value => {
    setEmail(value);
    setinviteemail(false);
  };

  return (
    <div>
      <div className="pub_inv_mail_butt_div">
        <button
          onClick={() => {
            setInvite_pub(true);
            
          }}
          className="pub_inv_mail_butt009"
        >
          Invite
          <span>
            {" "}
            <IoIosMail
              onClick={() => setInvite_pub(true)}
              className="pub_in_mail_icon"
            />
          </span>{" "}
         
        </button>
       
      </div>

      <Modal
        isOpen={invite_pub}
        className="addpub_modal8"
        contentLabel=" Invite  Modal"
      >
        <div
          className="pub_close_invite_pub"
          onClick={() => {
            setInvite_pub(false);
            setEmail("");
            setInviteErrorText("")
          }}
        >
          <IoIosClose />
        </div>
        <div>
          <div className="inv_pub_head">
        
          <div id="form2_class12">
            <div class="md-form md-outline FirstName2">
              <input
                id="email_id"
                type="email"
                class="form-control"
                value={email}
                onChange={event => handleEmail(event.target.value)}
              />
              <label className="input_text_buyer" for="email_id">
                Enter Email
              </label>
            </div>

           
          </div>
          <p className="inv_pub_err12" >{inviteErrorText}</p>
          {inviteemail == true ? (
            <div className="change_valid1234">
              <p>
                <span>
                  {" "}
                  <i
                    class="fa fa-exclamation-circle circle_err"
                    aria-hidden="true"
                  ></i>
                </span>
                Check the format of emails
              </p>
            </div>
          ) : (
            <p></p>
          )}
         

          {inviteErrorText == true ? (
            <div className="change_valid1234">
              <p>
                <span>
                  {" "}
                  <i
                    class="fa fa-exclamation-circle circle_err"
                    aria-hidden="true"
                  ></i>
                </span>
                Email already taken. Please choose other
              </p>
            </div>
          ) : (
            <p></p>
          )}

        

          <div className="buttonclass">
            <button
              onClick={() => {
                update();
              }}
              id="button_id"
            >
              {" "}
              Invite
            </button>
          </div>
        </div>
        </div>
      </Modal>

      <Modal
        isOpen={success_alert}
        className="success_modal_camp"
        contentLabel=" Invite Modal"
      >
        <div
          className="pub_close_div5 pub_close_mrgnc"
          onClick={() => setsuccess_alert(false)}
        >
          <IoIosClose />
        </div>
        {/* <div>Successfully Added Publisher</div> */}
        <div className="mail_invt_textcs">
          <p>{success_alertText}</p>
        </div>
      </Modal>

      <div></div>
    </div>
  );
}

function PublisherList() {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "30%"
    }
  };
  const [code, setcode] = useState("+1");
  const [list, setList] = useState([]);
  const [total, setTotal] = useState([0]);
  const [totalpages, setTotalpages] = useState([0]);
  const [limit, setLimit] = useState([0]);
  const [filterLimit, setFilterLimit] = useState([10]);
  const [filterStatus, setFilterStatus] = useState([]);
  const [search, setSearch] = useState("");
  const [pub_id, setPub_id] = useState([]);
  const [prev, setPrev] = useState(null);
  const [next, setNext] = useState(2);
  const [num, setNum] = useState([0]);
  const [addPublisher, setAddPublisher] = useState(false);
  const [addPublisher1, setAddPublisher1] = useState(false);
  const [success_alert, setsuccess_alert] = useState(false);
  const [success_alertText, setsuccess_alertText] = useState("");
  
  const [invite_pub, setInvite_pub] = useState(false);
  const [publid, setPublid] = useState("default");
  const [picture, setPicture] = useState(false);
  const [myid, setMyid] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  
  const [fetching, setFetching] = useState(true);
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);
  
  const [publisherDuplicate, setPublisherDuplicate] = useState(false);
  const [publisherDuplicateText, setPublisherDuplicateText] = useState("");
  const [ph_err1, setPhErr1] = useState(false);
  const [formValues, setFormValues] = useState(["", "", "", "", "", ""]);
  const [puberror, setpuberror] = useState(false);
  const [pubemail, setpubemail] = useState(false);
  const checkString = str => {
    var regex = new RegExp("^[a-zA-Z-,]+(s{0,1}[a-zA-Z-, ])*$");

    if (regex.test(str)) {
      return true;
    }

    return false;
  };
  
  const checkEmail = str => {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (reg.test(str)) {
      return true;
    }
    return false;
  };
  const checkPassword = str => {
    // var regex = new RegExp ('(?=^.{8,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&;*()_+}{";:;\'?/>;.<;,])(?!.*\s).*$');
    var regex = /(?=^.{8,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&;*()_+}{";:;'?/>;.<;,])(?!.*\s).*$/;
    
    if (regex.test(str)) {
      ////console.log("true");
      return true;
    }
    ////console.log("false");
    return false;
  };
  
  function enterPressed(event) {
    var code = event.keyCode || event.which;
    if (code === 13) {
      //13 is the enter keycode
      //  ////console.log("Enter Pressed");
      getPublishersList(limit, 1, filterStatus, search);
    }
  }
  const [defaultOption, setDefaultOption] = useState("");

  const options = [
    // { label: 'Buyer Options', value: "", className:"buyer_status"},
    { label: "Active", value: "1", className: "option1_lead" },
    { label: "Inactive", value: "0", className: "option2_lead" }
  ];
  const handlesatus = ss => {
    setDefaultOption(ss.label);
    // //console.log("asadadad",ss);
    setFilterStatus([JSON.parse(ss.value)]);
    //console.log("Campaign status",ss.value)

    // setstatusfil(ss);
  };
  useEffect(() => {
    document.title = "Publishers - LeadsWatch";
    ////console.log("in UseEffect");
    const getPublishers = () => {
      const data = {
        page: 1,
        limit: 10,
        search: "",
        filters: {
          status: [],
          pub_id: ""
        },
        sortby: {
          created: 1
        }
      };
      const config = {
        url: API_URL+"/publisher/list",
        data: data,
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token")
        }
      };
      axios(config)
        .then(response => {
          ////console.log(response, "publisher list reponse");
          ////console.log(response.data.data, "publishers list data?");
          setTotal(response.data.data.total_count);
          setTotalpages(response.data.data.total_pages);
          setPrev(response.data.data.prev_page);
          setNext(response.data.data.next_page);
          setCurrentPage(response.data.data.page);
          setFetching(false);
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
          setList(response.data.data.list);

          // props.navigation.navigate('Dashboard')
          ////console.log(response);
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

 

  const getPublishersList = (
    limit = limit,
    page = 1,
    status = filterStatus,
    search1 = search,
    pub_id1 = pub_id,
    a = "created",
    b = 1
  ) => {
    let sts = status;
    if (sts == 2) sts = [];

    const data = {
      page: page,
      limit: limit,
      search: search1,
      filters: {
        status: sts,
        pub_id: pub_id1
      },
      sortby: {
        [a]: parseInt(b)
      }
    };
    const config = {
      url: API_URL+"/publisher/list",
      data: data,
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    };
    axios(config)
      .then(response => {
        ////console.log(response, "publisher list response");
        // ////console.log(response.data.data, "publishers list");
        setTotal(response.data.data.total_count);
        setTotalpages(response.data.data.total_pages);
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

    // value => this.verifyEmail(value)
  };
  // list.map(ele =>(
  const list_items = (
    <div className="buyer_table">
      <div className="pub_table_heading">
        <p>Publishers</p>
        <div className="add_icon_pub">
          <Link to={{ pathname: "/publishers/create" }} style={{ color: "#fff" }}>
            <FiPlusCircle
              onClick={() => {
              }}
            />
          </Link>
        </div>
      </div>
      <div className="body_inner_section">
        {/* second */}

        <div className="date_row_pub">
          <div className="showEntriesDiv">
            <label className="showEntriesLabel">
              <div className="showEntriesLabelDiv showEntriesLabelDivleadsp">
                {" "}
                <p>Show Entries</p>
              </div>
              <div className="showEntriesSelDiv">
                <select
                  value={filterLimit}
                  onChange={event => {
                    setFilterLimit(event.target.value);
                    getPublishersList(event.target.value, 1);

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
            <div className="date_block_campaign_inner">
             
              <div className="select_main123">
                <Dropdown
                  options={options}
                  className="dropdown_leads1"
                  onChange={value => handlesatus(value)}
                  value={defaultOption}
                  placeholder="Status"
                ></Dropdown>
              </div>

              <div className="pub_id_create pub_id_createEC01">
                <p className="show_entries_div_para show_entries_div_paraEC01">
                  Publisher ID
                </p>

                <input
                  className="buy_id_input camp_id_input"
                  type="text"
                  pattern="[0-9]*"
                  value={pub_id}
                  placeholder="ID1,ID2"
                  onChange={e => {
                    setPub_id(e.target.value);
                  }}
                ></input>
              </div>

              

              <div className="apply_btn_div_pub">
                <IoIosCheckmarkCircleOutline
                  className="lead_apply_svg1"
                  onClick={event => {
                    getPublishersList(limit, 1, filterStatus, search, pub_id);
                  }}
                />
              </div>

              
              <div className="refresh_btn_div">
                <Link
                  onClick={() => {
                    getPublishersList(10, 1, [], "", "");
                    setSearch("");
                    setFilterLimit(10);
                    setFilterStatus("2");
                    setPub_id("");
                    setDefaultOption("Status");
                  }}
                >
                  <MdRefresh className="refreshbtn" />
                </Link>
              </div>

              <div className="date_box">
                <Invite />
              </div>
            </div>
          </div>

          <div className="butt_create_publ">
            <div className="searchbarValue_Div_leads">
              <input
                className="searchbarValue_fieldleads"
                placeholder="Search"
                value={search}
                onChange={e => {
                  setSearch(e.target.value);
                }}
                onKeyPress={enterPressed.bind(this)}
                type="text"
              />
              <Link
                onClick={event => {
                  getPublishersList(limit, 1, filterStatus, search);
                }}
              >
                <IoIosArrowForward className="circularArrowleads" />
              </Link>
            </div>
          </div>
        </div>

        {fetching ? (
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
                style={{ color: "#484393", fontWeight: "bolder", fontSize: 20 }}
              >
                <th
                  class="th-sm"
                  onClick={() => {
                    // alternate("name");
                    setB(0);
                    setC(0);

                    if (a == 1) {
                      getPublishersList(
                        limit,
                        1,
                        filterStatus,
                        search,
                        pub_id,
                        "id",
                        -1
                      );
                      setA(2);
                    } else {
                      setA(1);
                      getPublishersList(
                        limit,
                        1,
                        filterStatus,
                        search,
                        pub_id,
                        "id",
                        1
                      );
                    }
                  }}
                >
                  Publisher ID
                  <a className="a_class">
                    <svg
                      className="svg_up"
                      onClick ={event => {
                        // getPublishersList(limit, 1, "lead_id", "1");
                        getPublishersList(
                          limit,
                          1,
                          filterStatus,
                          search,
                          pub_id,
                          "id",
                          1
                        );
                        //getSortedSearched("id","-1",limit,1);
                      }}
                      id="Group_2411_pub"
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
                        getPublishersList(
                          limit,
                          1,
                          filterStatus,
                          search,
                          pub_id,
                          "id",
                          -1
                        );
                        //getSortedSearched("id","1",limit,1);
                      }}
                      id="Group_2411_pub"
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
                  class="th-sm text-left"
                  onClick={() => {
                    // alternate("name");
                    setA(0);
                    setC(0);

                    if (b == 1) {
                      getPublishersList(
                        limit,
                        1,
                        filterStatus,
                        search,
                        pub_id,
                        "firstname",
                        -1
                      );
                      setB(2);
                    } else {
                      setB(1);
                      getPublishersList(
                        limit,
                        1,
                        filterStatus,
                        search,
                        pub_id,
                        "firstname",
                        1
                      );
                    }
                  }}
                >
                  Publisher Name
                  <a className="a_class">
                    <svg
                      className="svg_up"
                      onClick={event => {
                        // getPublishersList(limit, 1, "lead_id", "1");
                        getPublishersList(
                          limit,
                          1,
                          filterStatus,
                          search,
                          pub_id,
                          "firstname",
                          1
                        );
                        //getSortedSearched("id","-1",limit,1);
                      }}
                      id="Group_2411_pub"
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
                      onClick={event => {
                        getPublishersList(
                          limit,
                          1,
                          filterStatus,
                          search,
                          pub_id,
                          "firstname",
                          -1
                        );
                        //getSortedSearched("id","1",limit,1);
                      }}
                      id="Group_2411_pub"
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
                  </a>
                </th>
                {/* lead id*/}

                <th
                  class="th-sm"
                  onClick={() => {
                    // alternate("name");
                    setA(0);
                    setB(0);

                    if (c == 1) {
                      getPublishersList(
                        limit,
                        1,
                        filterStatus,
                        search,
                        pub_id,
                        "active",
                        1
                      );
                      setC(2);
                    } else {
                      setC(1);
                      getPublishersList(
                        limit,
                        1,
                        filterStatus,
                        search,
                        pub_id,
                        "active",
                        -1
                      );
                    }
                  }}
                >
                  Account Status
                  <a className="a_class">
                    <svg
                      className="svg_up"
                      onClick={event => {
                        // getPublishersList(limit, 1, "lead_id", "1");
                        getPublishersList(
                          limit,
                          1,
                          filterStatus,
                          search,
                          pub_id,
                          "active",
                          1
                        );
                        //getSortedSearched("id","-1",limit,1);
                      }}
                      id="Group_2411_pub"
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
                        getPublishersList(
                          limit,
                          1,
                          filterStatus,
                          search,
                          pub_id,
                          "active",
                          -1
                        );
                        //getSortedSearched("id","1",limit,1);
                      }}
                      id="Group_2411_pub"
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
                {/* lead details */}
                {/* getPublishersList = (limit=limit,page=1,status=filterStatus,search1=search,pub_id1=pub_id,a="created",b=1) */}

                {/* lead details */}
                <th class="th-sm details_lead">Actions</th>
                {/* lead details */}
                {/* <th class="th-sm">Delete</th> */}
                {/* lead details */}
              </tr>
            </thead>
            <tbody>
              {list && list.map(ele => (
                <tr>
                  <td>{ele.unique_id}</td>
                  <td className="Publisher_name text-left">
                    {/* <img
                      src={API_URL+`/file/publisher/${ele.id}/26/26`}
                    /> */}
                    {ele.firstname} {ele.middlename} {ele.lastname}
                  </td>
                  {/* <td>N/A</td> */}
                  {/* <td>N/A</td>   */}
                  <td>
                    {" "}
                    {ele.active == 1 ? (
                      <div className="active_green">Active</div>
                    ) : (
                      <div className="active_red"> Inactive</div>
                    )}
                  </td>

                  <td>
                    <div className="acctions_acdeltcs">
                      {" "}
                      <Link to={{ pathname: `/publishers/${ele.id}` }} >
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
                      <a
                        className="pub_deltcs"
                        onClick={() => {
                          //
                          const data = {
                            id: ele.id
                          };
                          const config = {
                            url: API_URL+`/publisher/delete/${ele.id}`,
                            // data: data,
                            method: "delete",
                            headers: {
                              "Content-Type": "application/json",
                              Authorization:
                                "Bearer " + localStorage.getItem("access_token")
                            }
                          };
                          axios(config)
                            .then(response => {
                              ////console.log(response, "deleted a publisher");
                              // ////console.log(response.data.data, 'publishers list');
                              // setList(response.data.data);
                              getPublishersList();
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
                                alert(
                                  "Network Error \n Please Try Again later"
                                );
                              } else if (
                                error.response.data.error.message ===
                                "Your account had been deactivated"
                              ) {
                                ////console.log(error.response);
                                alert(
                                  "error :" + error.response.data.error.message
                                );
                              } else {
                                ////console.log(error.response);
                                alert(
                                  "error :" + error.response.data.error.message
                                );
                              }

                              ////console.log(error);
                              ////console.log(error.message, "msg");
                            });
                          ////console.log("proceed to home screen");

                          ////console.log("deleting the publisher");
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
                    </div>
                  </td>

                  {/* <td>
                  
                </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        
        )}
          {!fetching && list.length == 0 &&
            <div className="no_record"> <p>NO RECORDS FOUND</p>
            </div>}
        <div>
          <PaginationName
            prev={prev}
            next={next}
            getPublishersList={getPublishersList}
            num={num}
            total={total}
            totalPages={totalpages}
            limit={limit}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="body_bg">
      <Helmet>
        <title>Publishers - LeadsWatch</title>
      </Helmet>
      <div className="body_inner">
        {/* <button onClick={()=>{
          getPublishersList(10,1,[],"","")
          setSearch("")
          setFilterLimit(10)
          setFilterStatus("2")
          setPub_id("")
          // window.location.reload(true)
        }}><p>RESET</p></button> */}
        <div className="">
         
          <Modal
            isOpen={addPublisher1}
            className="addpub_modal6"
            contentLabel=" Invite  Modal"
            onRequestClose={() => setAddPublisher1(false)}
          >
            <div
              className="pub_close_div12_pub"
              onClick={() => setAddPublisher1(false)}
            >
              <IoIosClose />
            </div>
            {/* <button className="closeBtn" onClick={() => setAddPublisher(false)}>X</button> */}
            <div className="publist_popup_add">
              <div className="popup_heading_contact_edit">
                <p>Edit Publisher</p>
              </div>
              <PublisherById
                setSearch={setSearch}
                setFilterLimit={setFilterLimit}
                setFilterStatus={setFilterStatus}
                setPub_id={setPub_id}
                id={myid}
                getPublishersList={getPublishersList}
                setAddPublisher1={setAddPublisher1}
                setsuccess_alert={setsuccess_alert}
                setsuccess_alertText={setsuccess_alertText}
              />
            </div>
          </Modal>
        </div>

        {list_items}
      </div>
    </div>
  );
}
export default PublisherList;
