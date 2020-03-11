import { Helmet } from "react-helmet";
import React, { Component, useState, useEffect } from "react";
import { API_URL,logoutidle } from '../../AppConfig'

import { BrowserRouter, Route, useParams, useHistory } from "react-router-dom";
import {
  Button,
  Form,
  Row,
  Col,
  Container,
  OverlayTrigger,
  Tooltip
} from "react-bootstrap";
import { FiPlusCircle } from "react-icons/fi";
import { CopyToClipboard } from "react-copy-to-clipboard";
import InfiniteScroll from "react-infinite-scroller";

import { MDBInput } from "mdbreact";
import ToggleButton from "react-toggle-button";
import DatePicker from "react-datepicker";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  IoIosCloseCircleOutline,
  IoMdArrowDropup,
  IoMdArrowDropdown
} from "react-icons/io";
import {
  IoIosClose,
  IoIosArrowForward,
  IoIosCopy,
  IoIosArrowBack
} from "react-icons/io";

import Modal from "react-modal";
import "./Newcamp.css";
import { Spinner } from "react-bootstrap";

import "react-datepicker/dist/react-datepicker.css";
const CreateCampaigns = props => {
  let history = useHistory();

  var a = localStorage.getItem("id");
  const [permissions, setPermissions] = useState({});
  const [name, setname] = useState();
  const [campid, setcampid] = useState();
  const [switch1, setswitch1] = useState(true);
  const [startdate, setstartdate] = useState();
  const [enddate, setenddate] = useState();
  const [table, setUpdate] = useState();
  const [verticalid, setverticalid] = useState();
  const [buyerlist, setBuyerlist] = useState([]);
  const [buyerlist1, setBuyerlist1] = useState([]);
  const [buyeropen, setbuyeropen] = useState(false);
  const [postback, setpostback] = useState("");

  const [pubmodalopen, setpubmodalopen] = useState(false);
  const [pubname, setpubname] = useState();
  const [pubpagenum, setpubpagenum] = useState(1);
  const [buyeraddid, setbuyeraddid] = useState([]);
  const [buyeraddidrouteid, setbuyeraddidrouteid] = useState([]);
  const [buyeraddall, setbuyeraddall] = useState([]);
  const [publisherlist, setPublisherlist] = useState([]);
  const [publisherlist1, setPublisherlist1] = useState([]);
  const [pubtotal, setpubtotal] = useState();
  const [pubid, setpubid] = useState([]);
  const [pubpricetype, setpubpricetype] = useState("pl");
  const [pubamount, setpubamount] = useState(100);
  const [pubamounttype, setpubamounttype] = useState("dollar");
  const [pubflist, setpubflist] = useState([]);
  const [verticallist, setVerticallist] = useState([]);
  const [pubfadlist, setpubfadlist] = useState([]);
  const [pubnamearray, setpubnamearray] = useState([]);
  const [description, setdescription] = useState();
  const [searchbarValue, setSearch] = useState("");
  const [myDeals, setMyDeals] = useState(buyerlist);
  const [allowduplicate, setallowduplicate] = useState();
  const [copyclip, setcopyclip] = useState();
  const [leaddis, setleaddis] = useState();
  const [copy, setcopy] = useState(false);
  const [pubhas, setpubhas] = useState(true);
  const [success_alert, setsuccess_alert] = useState(false);
  const [message, setmessage] = useState("");
  const [cvn, setcvn] = useState(false);
  const [cvd, setcvd] = useState(false);
  const [cvv, setcvv] = useState(false);
  const [cvp, setcvp] = useState(false);
  const [cve, setcve] = useState(false);

  const [verticalfeild, setverticalfeild] = useState();
  const [filterstatus, setFilterStatus] = useState(false);
  const [loader, setLoader] = useState(false);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "37%",
      padding: 0
    }
  };
  const customStyles01 = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "37%"
    }
  };
  var filterData;
  var anotherData;
  const handleSearch = value => {
    setSearch(value);
    value = value.toLowerCase();
    filterData = [...myDeals];
    // ////console.log("fiterdata  ", filterData);
    anotherData = [...filterData];
    // ////console.log("anotherData before filter  ", anotherData);
    if (value != "") {
      anotherData = filterData.filter(item => {
        let prope = item.buyer_routename;

        prope = prope.toLowerCase();
        return prope.includes(value);
      });
    }
    // ////console.log("anotherdata after", anotherData);
    setBuyerlist(anotherData);
  };
  function handlename(cname) {
    setname(cname);
    setcvn(false);
  }
  function buyeropenModal() {
    setbuyeropen(true);
  }
  function handledesc(desc) {
    setdescription(desc);
    setcvd(false);
  }
  function handleSwitchChange() {
    if (switch1 == true) {
      setswitch1(false);
    } else {
      setswitch1(true);
    }
  }
  const handleduplicate = dupli => {
    setallowduplicate(dupli);
  };
  function closebuyerModal() {
    setbuyeropen(false);
  }
  function closepubModal() {
    setpubmodalopen(false);
  }
  const publmodal = (id, fname, lname) => {
    setpubid(id);
    setpubname(fname + lname);

    setpubmodalopen(true);
  };
 const handlepostback = post=>{
   setpostback(post);
 }
  const handlepubamount = amount => {
    setpubamount(amount);
  };
  const uparray = id => {
    let a = buyeraddid.indexOf(id);
    if (buyeraddid.length < 2 && a == 0) {
    } else {
      var b = buyeraddid[a];
      buyeraddid[a] = buyeraddid[a - 1];
      buyeraddid[a - 1] = b;
      let z = buyeraddall[a];
      buyeraddall[a] = buyeraddall[a - 1];
      buyeraddall[a - 1] = z;
      let p = buyeraddidrouteid[a];
      buyeraddidrouteid[a] = buyeraddidrouteid[a - 1];
      buyeraddidrouteid[a - 1] = p;
    }
    update(Math.random);
  };
  const handlepricetype = ptype => {
    setpubpricetype(ptype);
  };
  const handleamounttype = atype => {
    setpubamounttype(atype);
  };
  const crecamp = () => {
    console.log("increcamp");
    let a = [];
    for (let i = 0; i < buyeraddidrouteid.length; i++) {
      a.push({
        id: buyeraddidrouteid[i].id,
        route_id: buyeraddidrouteid[i].routeid,
        priority: i + 1
      });
    }
    function convert(str) {
      var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      return [date.getFullYear(), mnth, day].join("-");
    }

    if (
      name == "" &&
      description == "" &&
      verticalid == "" &&
      pubfadlist.length <= 0
    ) {
      setcvn(true);
      setcvd(true);
      setcvv(true);
      setcvp(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (name == "" && description == "" && verticalid == "") {
      setcvn(true);
      setcvd(true);
      setcvv(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (
      description == "" &&
      verticalid == "" &&
      pubfadlist.length <= 0
    ) {
      setcvd(true);
      setcvv(true);
      setcvp(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (name == "" && description == "") {
      setcvn(true);
      setcvd(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (description == "" && verticalid == "") {
      setcvd(true);
      setcvv(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (verticalid == "" && pubfadlist.length <= 0) {
      setcvv(true);
      setcvp(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (verticalid == "") {
      setcvv(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (pubfadlist.length <= 0) {
      setcvp(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (name == "") {
      setcvn(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (description == "") {
      setcvd(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (
      name != "" &&
      description != "" &&
      verticalid != "" &&
      // a.length > 0 &&
      pubfadlist.length > 0
    ) {
      const data = {
        vertical_id: verticalid,
        name: name,
        desc: description,
        allowduplicate:
          allowduplicate == "allow duplicate in campaigns" ? 0 : 1,
        lead_distribution: leaddis == "priority" ? 1 : 0,
        startdate: convert(startdate),
        enddate: convert(enddate),
        buyers: a,
        publishers: pubfadlist,
        campaign_filters: verticalfeild
      };
      console.log("create data",data)
      const CreateCampigns = {
        url: API_URL+"/campaign/create",
        data: data,
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token")
          //"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDYsImVtYWlsIjoic2tpbmdAZ21haWwuY29tIiwicm9sZV9pZCI6MiwiaWF0IjoxNTcyODQ5NDY2LCJleHAiOjE1NzMxMDg2NjZ9.QRLzf5DERW8Zbe_pTFntY75X78j3Oaekbh6mI9AI0sc"
        }
      };
      axios(CreateCampigns)
        .then(response => {
          if (response.status == 200) {
            console.log("Post Campaign Data", response);
            
            setcvv(false);
            setcvn(false);
            setcvp(false);
            setcvd(false);
            setcve(false);
            setmessage("Created Campaigns Successfully");
            setsuccess_alert(true);
            // history.push("/campaigns");
           

          }

          //////console.log("Inside Create Vertical Field---(Post)", response.data.data.insertId)
        })
        .catch(error => {
          // ////console.log(error.response);
          if (error.response.status === 500) {
            //     setmessage(error.response.data.error.message)
            // setsuccess_alert(true)
            //alert(error.response.data.error.message);
            console.log("error");
            setcve(true);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        });
    }
  };

  const editcamp = () => {
    let a = [];
    for (let i = 0; i < buyeraddidrouteid.length; i++) {
      a.push({
        id: buyeraddidrouteid[i].id,
        route_id: buyeraddidrouteid[i].routeid,
        priority: i + 1
      });
    }
    function convert(str) {
      var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      return [date.getFullYear(), mnth, day].join("-");
    }

    if (
      name == "" &&
      description == "" &&
      verticalid == "" &&
      pubfadlist.length <= 0
    ) {
      setcvn(true);
      setcvd(true);
      setcvv(true);
      setcvp(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (name == "" && description == "" && verticalid == "") {
      setcvn(true);
      setcvd(true);
      setcvv(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (
      description == "" &&
      verticalid == "" &&
      pubfadlist.length <= 0
    ) {
      setcvd(true);
      setcvv(true);
      setcvp(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (name == "" && description == "") {
      setcvn(true);
      setcvd(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (description == "" && verticalid == "") {
      setcvd(true);
      setcvv(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (verticalid == "" && pubfadlist.length <= 0) {
      setcvv(true);
      setcvp(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (verticalid == "") {
      setcvv(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (pubfadlist.length <= 0) {
      setcvp(true);
      window.scrollTo({ top: 100, behavior: "smooth" });
    } else if (name == "") {
      setcvn(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (description == "") {
      setcvd(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (
      name !== "" &&
      description !== "" &&
      verticalid !== "" &&
      //a.length > 0 &&
      pubfadlist.length > 0
    ) {
      const data = {
        vertical_id: verticalid,
        name: name,
        desc: description,
        allowduplicate:
          allowduplicate == "allow duplicate in campaigns" ? 0 : 1,
        lead_distribution: leaddis == "priority" ? 1 : 0,
        startdate: convert(startdate),
        enddate: convert(enddate),
        active: switch1 == true ? 1 : 0,
        buyers: a,
        publishers: pubfadlist,
        campaign_filters: verticalfeild
      };
      console.log("editdata",data)
      const editcampaign = {
        url:
          API_URL+"/campaign/update/" +
          campid.toString(),
        data: data,
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token")
          // "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDYsImVtYWlsIjoic2tpbmdAZ21haWwuY29tIiwicm9sZV9pZCI6MiwiaWF0IjoxNTcyODQ5NDY2LCJleHAiOjE1NzMxMDg2NjZ9.QRLzf5DERW8Zbe_pTFntY75X78j3Oaekbh6mI9AI0sc"
        }
      };
      axios(editcampaign)
        .then(response => {
          if (response.status == 200) {
            // ////console.log("Post Campaign Data", response);
            setcvv(false);
            setcvn(false);
            setcvp(false);
            setcvd(false);
            setcve(false);
            history.push("/campaigns");
          }

          //// ////console.log("Inside Create Vertical Field---(Post)", response.data.data.insertId)
        })
        .catch(error => {
          // ////console.log(error.response);
          // ////console.log("errornumber", error.response.data.error.sqlMessage);
          if (error.response.status === 500) {
            setcve(true);
            window.scrollTo({ top: 0, behavior: "smooth" });
            // setmessage("Duplicate entry or empty feid is submitted")
            // setsuccess_alert(true)
            // alert("Duplicate entry or empty feid is submitted");
          } else {
          }
        });
    }
  };
  const modalclose = () => {
    setsuccess_alert(false);
    setmessage("");
  };
  const downarray = id => {
    let a = buyeraddid.indexOf(id);
    if (buyeraddid.length < 2 && a == buyeraddid.length) {
    } else {
      var b = buyeraddid[a];
      buyeraddid[a] = buyeraddid[a + 1];
      buyeraddid[a + 1] = b;
      let z = buyeraddall[a];
      buyeraddall[a] = buyeraddall[a + 1];
      buyeraddall[a + 1] = z;
      let p = buyeraddidrouteid[a];
      buyeraddidrouteid[a] = buyeraddidrouteid[a + 1];
      buyeraddidrouteid[a + 1] = p;
    }
    update(Math.random);
  };
  function handlevertical(verti) {
    setFilterStatus(false);

    if (campid != "") {
      setmessage("You can't change vertical once created");
      setsuccess_alert(true);
      //alert("you can't change once created");
    } else {
      if (verti == "default") {
        setBuyerlist([]);
      } else {
        // ////console.log("asasasasas", verticalid);
        const config1 = {
          url:
            API_URL+"/buyer/verticalbuyers/" +
            verti.toString(),
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("access_token")
            // "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDYsImVtYWlsIjoic2tpbmdAZ21haWwuY29tIiwicm9sZV9pZCI6MiwiaWF0IjoxNTcyODQ5NDY2LCJleHAiOjE1NzMxMDg2NjZ9.QRLzf5DERW8Zbe_pTFntY75X78j3Oaekbh6mI9AI0sc"
          }
        };
        axios(config1)
          .then(response => {
            setBuyerlist(response.data.data);
            setMyDeals(response.data.data);

            setBuyerlist1(response.data.data);
          })
          .catch(error => {
            // ////console.log("Buyerlisterror1", error);
          });
        const data = {
          page: 1,
          limit: 1,
          search: "",
          sortby: {
            created: -1
          }
        };
        const config2 = {
          url:
            API_URL+`/vertical/fieldlist/` +
            verti.toString(),
          data: data,
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("access_token")
          }
        };
        axios(config2)
          .then(response => {
            if (response.status == 200) {
              let verticalfeildtotalnumber = response.data.data.total_count;
              const data1111 = {
                page: 1,
                limit: verticalfeildtotalnumber,
                search: "",
                sortby: {
                  created: -1
                }
              };
              const config2111 = {
                url:
                API_URL+`/vertical/fieldlist/` +
                verti.toString(),
                data: data1111,
                method: "post",
                headers: {
                  "Content-Type": "application/json",
                  Authorization:
                    "Bearer " + localStorage.getItem("access_token")
                }
              };
              axios(config2111)
                .then(response => {
                  if (response.status == 200) {
                    global.verttoggle = [];
                    let a = [];
                    for (var i = 0; i < response.data.data.list.length; i++) {
                      global.verttoggle.push(1);
                      a.push({
                        key: response.data.data.list[i].name,
                        value: "",
                        allow: 1,
                        match: "exact"
                      });
                    }
                    setverticalfeild(a);
                    console.log("verticalfield", verticalfeild);
                    setFilterStatus(true);
                    setLoader(true);
                  }
                })
                .catch(error => {});
            }
          })
          .catch(error => {});

        setverticalid(verti);
        setcvv(false);
      }
    }
  }
  //// ////console.log("buyerlist",buyerlist)
  function update(a) {
    setUpdate(a);
  }
  const pubsubmit = () => {
    if (pubamount == "") {
      setmessage("Enter amount");
      setsuccess_alert(true);
      // setcvp(true)
      // alert("Enter amount ");
    } else {
      setcvp(false);

      if (pubflist.includes(pubid) || pubid == "") {
        setmessage("Already added");
        //alert("already add ");
      } else {
        let pricetype = "";
        if (pubpricetype == "ppl") {
          pricetype = "percentage per lead";
        } else {
          pricetype = "per lead";
        }
        pubfadlist.push({ id: pubid, price: pubamount, price_type: pricetype ,post_back_url:postback });
        pubflist.push(pubid);
        pubnamearray.push({ id: pubid, name: pubname });
      }
    }
    // ////console.log("pub", pubfadlist);
    setpubmodalopen(false);
    setpubid("");
    setpubname("");
    setpubpricetype("");
    setpubamounttype("");
    setpubamount("");
  };

  function handlestartdate(sdate) {
    setstartdate(sdate);
    var d = new Date(sdate);
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    var c = new Date(year + 2, month, day);
    setenddate(c);
  }
  const handleBuyerchange = (buyerid, name, routeid) => {
    if (buyeraddid.includes(routeid)) {
    } else {
      buyeraddid.push(routeid);
      buyeraddidrouteid.push({
        id: buyerid,
        routeid: routeid
      });
      buyeraddall.push({
        id: buyerid,
        name: name,
        routeid: routeid
      });
      // ////console.log("buyer", buyeraddidrouteid);
      update(Math.random);
    }
  };
  const cancelpub = pubid => {
    let a = pubflist.indexOf(pubid);
    const pubdeletelist = pubflist.filter((item, idx) => idx !== a);
    setpubflist(pubdeletelist);
    const pubdeletelistid = pubfadlist.filter((item, idx) => idx !== a);
    setpubfadlist(pubdeletelistid);
    const newpubnamearray = pubnamearray.filter((item, idx) => idx !== a);
    setpubnamearray(newpubnamearray);
  };

  const cancelbuyer = id => {
    let a = buyeraddid.indexOf(id);
    // ////console.log("index", a);
    const buyerdeletelist = buyeraddid.filter((item, idx) => idx !== a);
    setbuyeraddid(buyerdeletelist);

    const newbuyerroutedeletelist = buyeraddidrouteid.filter(
      (item, idx) => idx !== a
    );
    // ////console.log("newwwwww", newbuyerroutedeletelist);
    setbuyeraddidrouteid(newbuyerroutedeletelist);
    const newbuyerdeletelist = buyeraddall.filter((item, idx) => idx !== a);
    setbuyeraddall(newbuyerdeletelist);
  };
  function handleenddate(enddate) {
    setenddate(enddate);
  }
  useEffect(() => {
    document.title = "Create Campaigns - LeadsWatch";
    var ecamp = JSON.parse(localStorage.getItem("camp"));
    // let ecamp=localStorage.getItem("camp")
    setname(ecamp.name);
    setswitch1(ecamp.active == 1 ? true : false);
    setcampid(ecamp.id);
    setdescription(ecamp.description);
    setstartdate(new Date(ecamp.startdate));
    setenddate(new Date(ecamp.enddate));
    setverticalid(ecamp.verticalid);
    setbuyeraddall(ecamp.buyer2);
    setbuyeraddid(ecamp.buyer1);
    setbuyeraddidrouteid(ecamp.buyer3);
    setpubfadlist(ecamp.publisher1);
    setpubflist(ecamp.publisher2);
    setpubnamearray(ecamp.publisher3);
    setcopyclip(ecamp.url);
    if (ecamp.campfilter == "") {
      setverticalfeild([]);
    } else {
      setverticalfeild(ecamp.campfilter);
      setFilterStatus(true);
    }
    setleaddis(ecamp.leaddistribution == 1 ? "priority" : "simultaneos");
    setallowduplicate(
      ecamp.allowduplicate == 1
        ? "allow duplicate in Application"
        : "allow duplicate in campaigns"
    );
    if (ecamp.verticalid == "") {
    } else {
      const config1 = {
        url:
          API_URL+"/buyer/verticalbuyers/" +
          ecamp.verticalid.toString(),
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token")
          // "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDYsImVtYWlsIjoic2tpbmdAZ21haWwuY29tIiwicm9sZV9pZCI6MiwiaWF0IjoxNTcyODQ5NDY2LCJleHAiOjE1NzMxMDg2NjZ9.QRLzf5DERW8Zbe_pTFntY75X78j3Oaekbh6mI9AI0sc"
        }
      };
      axios(config1)
        .then(response => {
          setBuyerlist(response.data.data);
          setMyDeals(response.data.data);
          setBuyerlist1(response.data.data);
          //////console.log("aaaaaaaaaa", response.data.data);
        })
        .catch(error => {
          // ////console.log("vertticalbuy1", error);
        });
    }
  }, []);

  function verticalToggle(a, b) {
    let temp = [];
    temp = [...verticalfeild];
    temp[a] = b;
    verticalfeild[a] = b;
    setverticalfeild(temp);
  }

  const loadpub = () => {
    let publength = Math.ceil(pubtotal / 10);

    if (pubpagenum < publength) {
      let pageabc = pubpagenum + 1;
      setpubpagenum(pageabc);

      const data2 = {
        page: pageabc,
        limit: 10,
        search: "",
        filters: {
          status: [],
          pub_id: ""
        },
        sortby: {
          created: -1
        }
      };
      const config2 = {
        url: API_URL+"/publisher/list",
        data: data2,
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token")
        }
      };
      axios(config2)
        .then(response => {
          // setPublisherlist(response.data.data.list);
          // setPublisherlist1(response.data.data.list);
          // setpubtotal(response.data.data.total_count);
          var before = publisherlist;
          var now = response.data.data.list;
          var combo = before.concat(now);
          // ////console.log("aaaaaaaaaa2341111111111111", now);

          setPublisherlist(combo);
          setPublisherlist1(combo);
        })
        .catch(error => {
          // ////console.log("publisher", error);
        });
    } else {
      setpubhas(false);
    }
  };

  const handleleaddis = ldis => {
    setleaddis(ldis);
  };

  useEffect(() => {
    if (localStorage.getItem("role") == 4)
      var currentModule = JSON.parse(
        localStorage.getItem("permissions")
      ).filter(item => {
        return item.module_id == 3;
      });
    ////console.log("Create", currentModule);
    setPermissions(currentModule ? currentModule[0] : {});
    const data = {
      page: 1,
      limit: 1,
      search: "",
      sortby: {
        created: -1
      }
    };
    const config = {
      url: API_URL+"/vertical/list",
      data: data,
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token")
        // "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDYsImVtYWlsIjoic2tpbmdAZ21haWwuY29tIiwicm9sZV9pZCI6MiwiaWF0IjoxNTcyODQ5NDY2LCJleHAiOjE1NzMxMDg2NjZ9.QRLzf5DERW8Zbe_pTFntY75X78j3Oaekbh6mI9AI0sc"
      }
    };
    axios(config)
      .then(response => {
        // setVerticallist(response.data.data.list);
        // let tempdata = response.data.data;
        if (response.status == 200) {
          let verticaltotalnumber = response.data.data.total_count;
          const data123 = {
            page: 1,
            limit: verticaltotalnumber,
            search: "",
            sortby: {
              created: -1
            }
          };
          const config123 = {
            url: API_URL+"/vertical/list",
            data: data123,
            method: "post",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("access_token")
              // "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDYsImVtYWlsIjoic2tpbmdAZ21haWwuY29tIiwicm9sZV9pZCI6MiwiaWF0IjoxNTcyODQ5NDY2LCJleHAiOjE1NzMxMDg2NjZ9.QRLzf5DERW8Zbe_pTFntY75X78j3Oaekbh6mI9AI0sc"
            }
          };
          axios(config123)
            .then(response => {
              setVerticallist(response.data.data.list);
              // let tempdata = response.data.data;
              // let verticaltotalnumber=response.data.data.total_count

              //condition
            })
            .catch(error => {
              if(error.message=="Request failed with status code 401"){
                logoutidle()
              }
              // ////console.log("vertical", error);
            });
          //condition
        }
      })
      .catch(error => {
        if(error.message=="Request failed with status code 401"){
          logoutidle()
        }
        // ////console.log("vertical", error);
      });
    const data2 = {
      page: 1,
      limit: 10,
      search: "",
      filters: {
        status: [],
        pub_id: ""
      },
      sortby: {
        created: -1
      }
    };
    const config2 = {
      url: API_URL+"/publisher/list",
      data: data2,
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    };
    axios(config2)
      .then(response => {
        setPublisherlist(response.data.data.list);
        setPublisherlist1(response.data.data.list);
        setpubtotal(response.data.data.total_count);
        // ////console.log("aaaaaaaaaa234", response.data.data.list);
      })
      .catch(error => {
        if(error.message=="Request failed with status code 401"){
          logoutidle()
        }
        // ////console.log("publisher", error);
      });
    // localStorage.removeItem("camp")
  }, [table]);

  return (
    <div>
      <Container>
        <Helmet>
          <title>CreateCampaign - LeadsWatch</title>
        </Helmet>
        <div className="">
          <div className="camp_table">
            <div
              onClick={() => {
                history.push("/campaigns");
              }}
              className="back_buy_contact"
            >
              <IoIosArrowBack />
            </div>
            <div className="buyer_table_heading buyer_table_headingCampaignCreate">
              <p>Campaigns - Camapign Details</p>
            </div>
            <div className="c_main_block">
              <Col>
                <div className="camp_box1">
                  <div className="personal_heading_camp">
                    <p>Campaign Details</p>
                  </div>

                  <Row>
                    <div className="first_row">
                      <Col lg={6} xl={6} className="columns">
                        {campid == "" ? (
                          <div className="camp_input">
                            <div class="md-form md-outline campaign_name_create">
                              <input
                                type="text"
                                id="form1"
                                class="form-control"
                                value={name}
                                onChange={event =>
                                  handlename(event.target.value)
                                }
                                className="campaignsName"
                                // className={name==""?"active":"disabled"}
                              />
                              <label for="form1">Campaign Name</label>
                            </div>
                          </div>
                        ) : (
                          <div class="border-text">
                            <h1>Campaign Name</h1>
                            <input
                              type="text"
                              placeholder="Text"
                              value={name}
                              onChange={event => handlename(event.target.value)}
                            />
                          </div>
                        )}
                        {cvn == true ? (
                          <p className="camp_error122">
                            <span>
                              {" "}
                              <i
                                class="fa fa-exclamation-circle circle_err"
                                aria-hidden="true"
                              ></i>
                            </span>
                            Enter campaign name
                          </p>
                        ) : (
                          <p></p>
                        )}
                        {cve == true ? (
                          <p className="camp_error">
                            {" "}
                            <span>
                              {" "}
                              <i
                                class="fa fa-exclamation-circle circle_err"
                                aria-hidden="true"
                              ></i>
                            </span>
                            Duplicate Camapign Name
                          </p>
                        ) : (
                          <p></p>
                        )}

                        <div className="campaignStatusDiv">
                          <label>Campaign Status:</label>

                          <div className="on_create">
                            <ToggleButton
                              inactiveLabel={""}
                              activeLabel={""}
                              colors={{
                                active: {
                                  base: "#63E57D"
                                },
                                inactive: {
                                  base: "#9B9B9B"
                                }
                              }}
                              value={switch1}
                              onToggle={value => {
                                handleSwitchChange();
                              }}
                            />
                          </div>

                          <div>
                            {switch1 == true ? (
                              <div className="active_green">
                                <p>Active</p>
                              </div>
                            ) : (
                              <div className="active_red">
                                <p>Inactive</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </Col>
                      <Col lg={6} xl={6} className="columns">
                        {campid == "" ? (
                          <div className="campaign_description">
                            <div class="md-form md-outline create_camp_textarea">
                              <textarea
                                id="form75"
                                class="md-textarea form-control"
                                rows="3"
                                value={description}
                                background
                                onChange={event =>
                                  handledesc(event.target.value)
                                }
                              ></textarea>
                              <label for="form75">Description</label>
                            </div>
                          </div>
                        ) : (
                          <div class="border01">
                            <h1>Description</h1>
                            <textarea
                              rows="4"
                              cols="50"
                              value={description}
                              background
                              onChange={event => handledesc(event.target.value)}
                            ></textarea>
                          </div>
                        )}
                        {cvd == true ? (
                          <p className="camp_error1">
                            <span>
                              {" "}
                              <i
                                class="fa fa-exclamation-circle circle_err"
                                aria-hidden="true"
                              ></i>
                            </span>
                            Enter campaign description
                          </p>
                        ) : (
                          <p></p>
                        )}
                      </Col>
                    </div>
                  </Row>
                  {/* <Row></Row> */}
                  <Row>
                    <div className="third_row">
                      <div>
                        {/* <label>
                      Start Date
                      </label> */}
                        <br />
                        {/* <div class="md-form md-outline">
  <input type="text" id="form2" class="form-control" minDate={new Date()}
                        selected={startdate}
                        onChange={date => {
                          handlestartdate(date);
                        }} />
  <label for="form1">Start Date</label>
</div> */}
                        <div class="border02_startdate">
                          <h1> Start Date</h1>
                          <DatePicker
                            className="input_fields_d"
                            dateFormat="MM-dd-yyyy"
                            minDate={new Date()}
                            selected={startdate}
                            onChange={date => {
                              handlestartdate(date);
                            }}
                          />
                        </div>
                      </div>

                      <div className="end_date_div">
                        {/* <label>
                      End Date
                      </label> */}
                        <br />

                        <div class="border02_startdate">
                          <h1> End Date</h1>
                          <DatePicker
                            className="input_fields_d"
                            dateFormat="MM-dd-yyyy"
                            minDate={new Date()}
                            selected={enddate}
                            onChange={date => {
                              handleenddate(date);
                            }}
                          />
                        </div>
                      </div>
                      <div className="camp_vert_div">
                        {/* <label>
                      Vertical
                      </label> */}
                        <br />
                        <div class="border02_startdate">
                          <h1> Vertical</h1>
                          <select
                            className="input_fields_s input_fields_s_ex"
                            value={verticalid}
                            onChange={event =>
                              handlevertical(event.target.value)
                            }
                          >
                            <option value="default">Select one</option>
                            {verticallist.map(item => (
                              <option key={item.id + a} value={item.id}>
                                {item.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        {cvv == true ? (
                          <p className="camp_error">
                            {" "}
                            <span>
                              {" "}
                              <i
                                class="fa fa-exclamation-circle circle_err"
                                aria-hidden="true"
                              ></i>
                            </span>
                            Select Vertical
                          </p>
                        ) : (
                          <p></p>
                        )}
                      </div>
                    </div>
                  </Row>
                  <Row>
                    <div className="copy-link">
                      <div>
                        {campid == "" ? (
                          <p></p>
                        ) : (
                          <div>
                            <div class="border02_copy_clip">
                              <h1>Posting Instructions</h1>
                              <MDBInput
                                className="copyclip_input"
                                value={copyclip}
                              />
                              <span>
                                <CopyToClipboard
                                  text={copyclip}
                                  onCopy={() => setcopy(true)}
                                >
                                  {/* <IoIosCopy className="copy_clip_campaign"/> */}
                                  {copy ? (
                                    <button className="copy_clip_campaign">
                                      Copied{" "}
                                      <span>
                                        <IoIosCopy />
                                      </span>
                                    </button>
                                  ) : (
                                    // <span style={{ color: "#00B0EB",fontWeight:"400",fontSize:15,marginLeft:"-2%",marginRight:"5px" }}>
                                    //   Copied to your clipboard
                                    // </span>
                                    <button className="copy_clip_campaign">
                                      Copy{" "}
                                      <span>
                                        <IoIosCopy />
                                      </span>
                                    </button>
                                  )}
                                </CopyToClipboard>
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </Row>
                </div>

                <Row>
                  <div className="camp_box1_camp_table">
                    <div className="personal_heading_camp">
                      <p>Data Filters</p>
                    </div>
                    <div className="table_scroll_buy12_create">
                    <table
                      id="dtBasicExample"
                      class="table table-striped table-sm table_buy_con12 table_scroll_buy_create"
                      cellspacing="0"
                    >
                      <thead className="create_thead">
                        <tr
                          style={{
                            color: "#484393",
                            fontWeight: "bolder",
                            fontSize: 20
                          }}
                        >
                          {/* lead id*/}
                          <th class="th-sm extra_class">
                            <div className="first_div">
                              Vertical Field
                              <div className="svg_grid"></div>
                            </div>
                          </th>
                          {/* lead date*/}
                          <th class="th-sm extra_class">
                            <div className="first_div">
                              Filter Value
                              <div className="svg_grid"></div>
                            </div>
                          </th>
                          <th class="th-sm extra_class">
                            <div className="first_div">
                              Filter Type
                              <div className="svg_grid"></div>
                            </div>
                          </th>
                          {/* lead details */}
                          <th class="th-sm extra_class">
                            <div className="first_div12">
                              Match Type
                              <div className="svg_grid"></div>
                            </div>
                          </th>
                        </tr>
                      </thead>

                      {filterstatus == true
                        ? verticalfeild &&
                          verticalfeild.map((item, index) => (
                            <tbody class="buy_r_body12">
                              <tr>
                                <td className="text_center_buyroute">
                                  {item.key}
                                </td>
                                <td className="td_buy_con1">
                                  <div class="md-form md-outline create_buy_no_data11_test12_camp">
                                    <input
                                      type="text"
                                      id="email_id002a_12ab"
                                      className="form-control buyer_popup_field"
                                      value={item.value}
                                      onChange={e => {
                                        verticalToggle(index, {
                                          key: item.key,
                                          value: e.target.value,
                                          allow: item.allow,
                                          match: item.match
                                        });
                                      }}
                                    />
                                    <label
                                      className="input_text_buyer"
                                      for="email_id002a_12ab"
                                    >
                                      
                                    </label>
                                  </div>{" "}
                                </td>
                                <td>
                                  <div className="tog_butt1 tog_butt1_flex">
                                  <p style={{ color: "red", marginRight: "2rem" }}>
                                Block
                              </p>
                                    <ToggleButton
                                      inactiveLabel={""}
                                      activeLabel={""}
                                      colors={{
                                        active: {
                                          base: "#63E57D"
                                        },
                                        inactive: {
                                          base: "#9B9B9B"
                                        }
                                      }}
                                      value={item.allow}
                                      onToggle={e => {
                                        verticalToggle(index, {
                                          key: item.key,
                                          value: item.value,
                                          allow: item.allow ? 0 : 1,
                                          match: item.match
                                        });
                                      }}
                                    />
                                    <p style={{ color: "green",marginLeft:"2rem" }}>Allow</p>
                                  </div>
                                </td>
                                <td>
                                  <div className="tog_butt12">
                                    <select
                                      className="select_top_create"
                                      value={item.match}
                                      onChange={event => {
                                        verticalToggle(index, {
                                          key: item.key,
                                          value: item.value,
                                          allow: item.allow,
                                          match: event.target.value
                                        });
                                      }}
                                    >
                                      <option value="exact">Exact</option>
                                      <option value="contains">Contains</option>
                                    </select>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          ))
                        : verticalid != "" && (
                            <div className="spinner_div_create">
                              {/* <Spinner className="buy_spinner_create" animation="border" /> */}
                            </div>
                          )
                      // <p>hello</p>
                      }
                    </table>
</div>
                    {verticalid == "" && (
                      <div
                        style={{
                          marginTop: "4.5rem",
                          color: "#484393",
                          textAlign: "center",
                          fontWeight: "400",
                          // marginBottom: "0px",
                          fontSize: "18px"
                        }}
                      >
                        <p>Select Vertical to Configure Filters</p>
                      </div>
                    )}
                  </div>
                  {/* 
                <div class="border009 border009CreateBuyerResponse123 border009122_xd_camp">
              <h1>Data Filters</h1>
<div className="table_scroll_buy12_create">


             
            
              </div>

             
           
            </div> */}
                </Row>

                <div className="camp_box1">
                  <div className="personal_heading_camp">
                    <p>Campaign Configuration</p>
                  </div>
                  <Row>
                    <div className="camp_publish camp_publish_mtop">
                      <Col xs={12} sm={12} md={6} lg={6}>
                        <div className="allow_dup_div">
                          <div class="border02_dup">
                            <h1>Mark Duplicates</h1>

                            <select
                              className="input_fields_s allows"
                              value={allowduplicate}
                              onChange={event =>
                                handleduplicate(event.target.value)
                              }
                            >
                              <option value={"allow duplicate in campaigns"}>
                                In this camapign
                              </option>
                              <option value={"allow duplicate in Application"}>
                                In entire application
                              </option>
                            </select>
                          </div>
                          <div className="lead-distrub">
                            <div class="border02_simul">
                              <h1>Lead Distribution</h1>
                              <select
                                className="input_fields_s allows"
                                value={leaddis}
                                onChange={event =>
                                  handleleaddis(event.target.value)
                                }
                              >
                                <option value={"simultaneos"}>
                                  Simultaneos
                                </option>
                                <option value={"priority"}>Priority</option>
                              </select>
                            </div>
                          </div>

                          <div className="select">
                            {buyerlist == "" ? (
                              <p>
                                Select a vertical to show the list of buyers
                                associated with the selected vertical
                              </p>
                            ) : (
                              <div className="leads-btn">
                                <div class="border02_buy_camp">
                                  <h1> Available Buyers for the Vertical</h1>
                                  <button
                                    className="input_fields_buy"
                                    onClick={() => {
                                      buyeropenModal();
                                    }}
                                  >
                                    Add buyers
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </Col>
                      <Col xs={12} sm={12} md={6} lg={6}>
                        <div className="scroll-pub">
                          <div class="border02_pub_camp">
                            <h1> Available Publishers for the Campaign</h1>
                            <div className="pub_camp_scroll">
                              <InfiniteScroll
                                //pageStart={0}
                                //loadMore={()=>{loadFunc()}}
                                hasMore={pubhas}
                                loader={
                                  <Link
                                    onClick={() => loadpub()}
                                    className="loader"
                                    key={0}
                                  >
                                    show more ...
                                  </Link>
                                }
                                useWindow={true}
                              >
                                {publisherlist.map(plist => (
                                  <Row>
                                    <div className="items">
                                      <div className="alon">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          xmlns="http://www.w3.org/1999/xlink"
                                          width="28"
                                          height="28"
                                          viewBox="0 0 28 28"
                                        >
                                          <defs>
                                            <clipPath id="clip-path">
                                              <circle
                                                id="Ellipse_328"
                                                data-name="Ellipse 328"
                                                cx="14"
                                                cy="14"
                                                r="14"
                                                transform="translate(7328 5432)"
                                                fill="#f3f4f7"
                                              />
                                            </clipPath>
                                          </defs>
                                          <g
                                            id="Mask_Group_31"
                                            data-name="Mask Group 31"
                                            transform="translate(-7328 -5432)"
                                            clip-path="url(#clip-path)"
                                          >
                                            <circle
                                              id="Ellipse_304"
                                              data-name="Ellipse 304"
                                              cx="14"
                                              cy="14"
                                              r="14"
                                              transform="translate(7328 5432)"
                                              fill="#f3f4f7"
                                            />
                                            <g
                                              id="Profile"
                                              transform="translate(7331 5434.263)"
                                            >
                                              <circle
                                                id="Ellipse_305"
                                                data-name="Ellipse 305"
                                                cx="5.958"
                                                cy="5.958"
                                                r="5.958"
                                                transform="translate(4.861)"
                                                fill="#9b9b9b"
                                              />
                                              <path
                                                id="Path_5966"
                                                data-name="Path 5966"
                                                d="M14,23.185A10.842,10.842,0,0,0,3.185,34H24.823A10.842,10.842,0,0,0,14,23.185Z"
                                                transform="translate(-3.185 -8.267)"
                                                fill="#9b9b9b"
                                              />
                                            </g>
                                          </g>
                                        </svg>
                                      </div>
                                      <label className="name01">
                                        {plist.firstname} {plist.lastname}
                                      </label>
                                      <div className="link">
                                        <Link
                                          onClick={() =>
                                            publmodal(
                                              plist.id,
                                              plist.firstname,
                                              plist.lastname
                                            )
                                          }
                                        >

<FiPlusCircle style={{color:"#00b0eb"}}/>


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
                                        </Link>
                                      </div>
                                    </div>
                                  </Row>
                                ))}
                              </InfiniteScroll>
                            </div>
                          </div>
                          {cvp == true ? (
                            <p className="camp_error">
                              {" "}
                              <span>
                                {" "}
                                <i
                                  class="fa fa-exclamation-circle circle_err"
                                  aria-hidden="true"
                                ></i>
                              </span>
                              Add at least one publisher to create the campaign
                            </p>
                          ) : (
                            <p></p>
                          )}
                          {/* <label className="text">
                        Publishers for the Campaign
                      </label> */}
                        </div>
                      </Col>
                    </div>
                  </Row>
                </div>

                {/* <div>
              {campid == "" ? (
                <p></p>
              ) : (
                <div>

                <MDBInput
                value={copyclip}
              />
              <CopyToClipboard text={copyclip}
              onCopy={() => setcopy(true) }>
              <button>Copy to clipboard with button</button>
            </CopyToClipboard>
            {copy ? <span style={{color: '#00B0EB'}}>Copied to your clipboard</span> : null}

            </div>
              )}
              </div> */}

                <div className="buy">
                  <Row>
                    <Col lg={6} xl={6}>
                      {/* <div className="select">
                      {buyerlist == "" ? (
                        <p>
                          select one vertical to add buyer or there are no buyer
                          under this vertical
                        </p>
                      ) : (
                        <div>
                          <label> Buyers for the Campaign</label>

                          <button
                            className="input_fields_buy"
                            onClick={() => {
                              buyeropenModal();
                            }}
                          >
                            Add buyers
                          </button>
                        </div>
                      )}
                    </div> */}

                      <Modal
                        isOpen={buyeropen}
                        style={customStyles01}
                        contentLabel="Example Modal"
                      >
                        <div
                          className="close_img_div"
                          onClick={() => closebuyerModal()}
                        >
                          <IoIosClose />
                        </div>
                        {/* <button className="closeBtn" onClick={() => closebuyerModal()}>X</button> */}
                        <div>
                          <div className="search_box_icon_addBuyers">
                            <input
                              className="campaign_add_search"
                              placeholder="Search"
                              value={searchbarValue}
                              onChange={event =>
                                handleSearch(event.target.value)
                              }
                            />
                            <div className="icon_div_addBuyers">
                              <IoIosArrowForward className="circularArrowCamp01" />
                            </div>
                          </div>

                          {buyerlist.map(buyeradd => (
                            <Col key={buyeradd.id}>
                              <div className="added_buyer">
                                <label>
                                  {buyeradd.buyer_routename}
                                  <input
                                    type="checkbox"
                                    onChange={() =>
                                      handleBuyerchange(
                                        buyeradd.buyer_id,
                                        buyeradd.buyer_routename,
                                        buyeradd.routeid
                                      )
                                    }
                                  />
                                </label>
                              </div>
                            </Col>
                          ))}
                        </div>
                      </Modal>
                    </Col>
                    <Col lg={6} xl={6}>
                      {/* <div>
                      <label className="text">
                        Publishers for the Campaign
                      </label>
                      <div className="scroll">
                      <InfiniteScroll
        //pageStart={0}
        //loadMore={()=>{loadFunc()}}
        hasMore={pubhas}
        loader={<Link    onClick={() => loadpub()} className="loader" key={0}>show more  ...</Link>}
        useWindow={true}
    >
            
   
                        {publisherlist.map(plist => (
                          <Row>
                            <div className="items">
                              <div className="alon">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlns="http://www.w3.org/1999/xlink"
                                  width="28"
                                  height="28"
                                  viewBox="0 0 28 28"
                                >
                                  <defs>
                                    <clipPath id="clip-path">
                                      <circle
                                        id="Ellipse_328"
                                        data-name="Ellipse 328"
                                        cx="14"
                                        cy="14"
                                        r="14"
                                        transform="translate(7328 5432)"
                                        fill="#f3f4f7"
                                      />
                                    </clipPath>
                                  </defs>
                                  <g
                                    id="Mask_Group_31"
                                    data-name="Mask Group 31"
                                    transform="translate(-7328 -5432)"
                                    clip-path="url(#clip-path)"
                                  >
                                    <circle
                                      id="Ellipse_304"
                                      data-name="Ellipse 304"
                                      cx="14"
                                      cy="14"
                                      r="14"
                                      transform="translate(7328 5432)"
                                      fill="#f3f4f7"
                                    />
                                    <g
                                      id="Profile"
                                      transform="translate(7331 5434.263)"
                                    >
                                      <circle
                                        id="Ellipse_305"
                                        data-name="Ellipse 305"
                                        cx="5.958"
                                        cy="5.958"
                                        r="5.958"
                                        transform="translate(4.861)"
                                        fill="#9b9b9b"
                                      />
                                      <path
                                        id="Path_5966"
                                        data-name="Path 5966"
                                        d="M14,23.185A10.842,10.842,0,0,0,3.185,34H24.823A10.842,10.842,0,0,0,14,23.185Z"
                                        transform="translate(-3.185 -8.267)"
                                        fill="#9b9b9b"
                                      />
                                    </g>
                                  </g>
                                </svg>
                              </div>
                              <label className="name01">
                                {plist.firstname} {plist.lastname}
                              </label>
                              <div className="link">
                                <Link
                                  onClick={() =>
                                    publmodal(
                                      plist.id,
                                      plist.firstname,
                                      plist.lastname
                                    )
                                  }
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
                              </div>
                            </div>
                          </Row>
                        ))}
                            </InfiniteScroll>

                      </div>
                    </div> */}
                    </Col>
                    <Modal
                      isOpen={pubmodalopen}
                      style={customStyles}
                      contentLabel="Example Modal"
                    >
                      <div className="close_img_div01">
                        <div
                          className="close_img_div"
                          onClick={() => closepubModal()}
                        >
                          <IoIosClose />
                        </div>
                      </div>

                      {/* <button className="closeBtn" onClick={() => closepubModal()}>X</button> */}
                      <div className="campaign_popup_01">
                        <p className="pubname_p">{pubname}</p>
                        <Col>
                          {/* <div>
                          <label>
                            Amount:
                            <MDBInput
                              type="number"
                              value={pubamount}
                              onChange={event =>
                                handlepubamount(event.target.value)
                              }
                            />
                          </label>
                        </div> */}
                          <div class="border2019 border2019_margin">
                            <h1> Payout Type:</h1>
                            <select
                              className="campaign_popup_select campaign_popup_select_ex"
                              value={pubpricetype}
                              onChange={event =>
                                handlepricetype(event.target.value)
                              }
                            >
                              <option value="pl">Fixed Amount</option>
                              <option value="ppl">Percentage</option>
                            </select>
                          </div>

                     
                         

                        
                          <div class="border2019 border2019_margin">
                            <h1> Currency:</h1>
                            <select
                              className="campaign_popup_select campaign_popup_select_ex"
                              value={pubamounttype}
                              onChange={event =>
                                handleamounttype(event.target.value)
                              }
                            >
                              <option value="dollar">USD</option>
                              <option value="euro">EURO</option>

                              {/* <option value="rupee">RUPEE</option> */}
                            </select>
                          </div>
                          <div class="border2019 border2019_margin">
                            <h1>
                              {pubpricetype == "ppl" ? "Percentage:" : "Amount:"}
                            </h1>
                            <MDBInput
                              className="PubcampaignEdit"
                              type="number"
                              value={pubamount}
                              onChange={event =>
                                handlepubamount(event.target.value)
                              }
                            />
                             </div>
                            {/* <MDBInput
                              className="PubcampaignEdit"
                             
                              value={postback}
                              onChange={event =>
                                handlepostback(event.target.value)
                              }
                            /> */}
                             <div class="border2019 border2019_margin">
                             <h1>
                              Post Back Url
                            </h1>
                            <MDBInput
                            class="in_f_camp"
                              type="text"
                             value={postback}
                             onChange={event => handlepostback(event.target.value)}
                           />
                           </div>
                            
                         

                          <button
                            className="campaign_popup_btn"
                            onClick={() => {
                              pubsubmit();
                            }}
                          >
                            Add To Campaign
                          </button>


                        </Col>
                      </div>
                    </Modal>
                  </Row>
                </div>
              </Col>

              <div className="below-section">
                <div className="camp_box1_camp_table_box1">
                  <div className="personal_heading_camp">
                    <p>Buyers in this campaign</p>
                  </div>
                  <Col lg={6} xl={6}>
                    {/* <label className="select_pub_label_camp">Select the Buyers whom you want to add</label> */}
                    {buyeraddall == "" ? (
                      <p> </p>
                    ) : (
                      <div className="each">
                        {buyeraddall.map(cblist => (
                          <div className="add">
                            <div className="from">
                              <div className="up-arrow">
                                {/* <p>{buyeraddid.indexOf(cblist.routeid) + 1}</p> */}
                                {buyeraddid.indexOf(cblist.routeid) == 0 ? (
                                  <Link className="icons">
                                    <IoMdArrowDropup className="top_arrow_01" />
                                  </Link>
                                ) : (
                                  // <button onClick={()=>{uparray(cblist.routeid)}}>

                                  <div className="arrow">
                                    <Link
                                      className="icons"
                                      onClick={() => {
                                        uparray(cblist.routeid);
                                      }}
                                    >
                                      <IoMdArrowDropup />
                                    </Link>
                                  </div>
                                  //   up
                                  // </button>
                                )}
                                {buyeraddid.indexOf(cblist.routeid) ==
                                buyeraddid.length - 1 ? (
                                  <div className="arrow">
                                    <Link className="icons">
                                      <IoMdArrowDropdown className="down_arrow_01" />
                                    </Link>
                                  </div>
                                ) : (
                                 
                                  <div className="arrow">
                                    {/* <span className="icons" onClick={()=>{uparray(cblist.routeid)}}><IoMdArrowDropup/></span> */}

                                    <Link
                                      className="icons"
                                      onClick={() => {
                                        downarray(cblist.routeid);
                                      }}
                                    >
                                      <IoMdArrowDropdown />
                                    </Link>
                                  </div>
                                )}
                              </div>

                              <div className="one">
                                <p>{cblist.name} </p>
                                <p></p>
                              </div>
                              <div></div>
                            </div>

                            <span
                              className="icon-red"
                              onClick={() => {
                                cancelbuyer(cblist.routeid);
                              }}
                            >
                              <IoIosCloseCircleOutline />
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* closing buyer added */}
                  </Col>
                </div>
                <div className="camp_box1_camp_table_box1">
                  <div className="personal_heading_camp">
                    <p>Publishers in this campaign</p>
                  </div>
                  <Col lg={6} xl={6}>
                    {/* <div className="border2019_camp2 border2019SelectBuyers">
                    <h1>Select the publishers whom you want to add</h1> */}

                    <div>
                      {pubnamearray.map(palist => (
                        <div>
                          <div className="first-para"></div>
                          <div className="trak">
                            <p>{palist.name}</p>
                            <div className="close-icon">
                              <span
                                className="icon-red1"
                                onClick={() => cancelpub(palist.id)}
                              >
                                <IoIosCloseCircleOutline />
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* </div> */}
                  </Col>
                </div>
              </div>
            </div>

            <div className="create">
              {campid == "" ? (
                <button
                  className="creatvcmain_outline"
                  onClick={() => crecamp()}
                >
                  Create Campaign
                </button>
              ) : localStorage.getItem("role") == 2 ? (
                <button className="edit_camp_but" onClick={() => editcamp()}>
                  Update Campaign
                </button>
              ) : !permissions && permissions.actions.includes(3) ? (
                <button className="edit_camp_but" onClick={() => editcamp()}>
                  Update Campaign
                </button>
              ) : (
                <p></p>
              )}
            </div>
          </div>
        </div>

        {/* <Modal
            isOpen={success_alert}
            className="success_modal"
            contentLabel=" Invite Modal"
          >
            <div
              className="pub_close_div5"
              onClick={() => modalclose()}
            >
              <IoIosClose />
            </div>
            <div>

             {message}
            </div>
          </Modal> */}
        <Modal
          isOpen={success_alert}
          className="success_modal_camp"
          contentLabel=" Invite Modal"
        >
          <div className="close_camp_modal" onClick={() => modalclose()}>
            <IoIosClose />
          </div>
          <div className="camp_alert_text">{message}</div>
        </Modal>
      </Container>
    </div>
  );
};

export default CreateCampaigns;
