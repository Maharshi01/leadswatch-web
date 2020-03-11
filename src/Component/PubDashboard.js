import React, { useState, useEffect } from "react";
// import { Button, ButtonGroup, ButtonToolbar } from "react-bootstrap-buttons";
import { BrowserRouter, Route } from "react-router-dom";
import { Row, Col, Container, Button,Spinner } from "react-bootstrap";
import { styleSheet } from "react";
import axios from "axios";
import { API_URL ,logoutidle} from '../AppConfig'

export default function Dashboard() {
  const [data, setData] = useState("");
  const [avgLeads, setAvgLeads] = useState();
  const [campaigns, setCampaigns] = useState();

  const [totalLeads, setTotalLeads] = useState();
  const [weekstyle, setWeekStyle] = useState({
    backgroundColor: "#fff",
    padding: "4px 7px 2px 6px",
    border: " 1px solid white",
    borderRadius: 14,
    marginLeft: "6%",
    boxShadow: "none",
    fontSize: 10,
    outline:"none",
  });

  const [weekstyle1, setWeekStyle1] = useState({
    backgroundColor: "transparent",
    padding: "4px 7px 2px 6px",
    border: " 1px solid white",
    color: "#fff",
    borderRadius: 14,
    marginLeft: "6%",
    boxShadow: "none",
    fontSize: 10,
    outline:"none",
  });

  const [monthstyle, setMonthStyle] = useState({
    backgroundColor: "#fff",
    padding: "4px 7px 2px 6px",
    border: " 1px solid white",
    borderRadius: 14,
    marginLeft: "2%",
    boxShadow: "none",
    fontSize: 10,
    outline:"none",
  });

  const [monthstyle1, setMonthStyle1] = useState({
    backgroundColor: "transparent",
    padding: "4px 7px 2px 6px",
    border: " 1px solid white",
    color: "#fff",
    borderRadius: 14,
    marginLeft: "2%",
    boxShadow: "none",
    fontSize: 10,
    outline:"none",
  });

  const [yearstyle, setYearStyle] = useState({
    backgroundColor: "#fff",
    padding: "4px 7px 2px 6px",
    border: " 1px solid white",
    borderRadius: 14,
    marginLeft: "2%",
    boxShadow: "none",
    fontSize: 10,
    outline:"none",
  });

  const [yearstyle1, setYearStyle1] = useState({
    backgroundColor: "transparent",
    padding: "4px 7px 2px 6px",
    border: " 1px solid white",
    color: "#fff",
    borderRadius: 14,
    marginLeft: "2%",
    boxShadow: "none",
    fontSize: 10,
    outline:"none",
  });
  // const[monthstyle,setMonthStyle]=useState({backgroundColor:"#6D07C3",
  //   padding:"4px 7px 2px 6px",
  //   border:" 1px solid white",
  // borderRadius: 14,
  // marginLeft:"6%",
  // boxShadow: "none"});

  const [weekstate, setWeekState] = useState(true);
  const [monthstate, setMonthState] = useState(false);
  const [yearstate, setYearState] = useState(false);

  const [camp_weekstate, setcamp_WeekState] = useState(true);
  const [camp_monthstate, setcamp_MonthState] = useState(false);
  const [camp_yearstate, setcamp_YearState] = useState(false);
  const [avg_weekstate, setavg_WeekState] = useState(true);
  const [avg_monthstate, setavg_MonthState] = useState(false);
  const [avg_yearstate, setavg_YearState] = useState(false);

  useEffect(() => {
    const config = {
      url: API_URL+`/dashboard/publisher`,
      // data: data,
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer "+localStorage.getItem('access_token'),
      },
    };
    axios(config)
      .then(response => {
        //// ////console.log(response.data.data, "Dashboard details");
        setData(response.data.data);
        setAvgLeads(response.data.data.avg_leads.weekcount);
        //setCampaigns(response.data.data.campaigns.weekcount);

        setTotalLeads(response.data.data.total_leads.weekcount);
      })
      .catch(error => {
        if(error.message=="Request failed with status code 401"){
          logoutidle()
        }
       // ////console.log("errore", error);
      });
  }, []);

  function Week_func() {
    setWeekState(true);
    setMonthState(false);
    setYearState(false);
    setAvgLeads(data.avg_leads.weekcount);
  }

  function Month_func() {
    setMonthState(true);
    setWeekState(false);
    setYearState(false);
    setAvgLeads(data.avg_leads.monthcount);
  }
  function Year_func() {
    setYearState(true);
    setWeekState(false);
    setMonthState(false);
    setAvgLeads(data.avg_leads.yearcount);
  }
  function Camp_Week_func() {
    setcamp_WeekState(true);
    setcamp_MonthState(false);
    setcamp_YearState(false);
    // setCampaigns(data.campaigns.weekcount);
  }
  function Camp_Month_func() {
    setcamp_MonthState(true);
    setcamp_WeekState(false);
    setcamp_YearState(false);
    //setCampaigns(data.campaigns.monthcount);
  }
  function Camp_Year_func() {
    setcamp_YearState(true);
    setcamp_WeekState(false);
    setcamp_MonthState(false);
    //  setCampaigns(data.campaigns.yearcount);
  }

  function Avg_Week_func() {
    setavg_WeekState(true);
    setavg_MonthState(false);
    setavg_YearState(false);
    setTotalLeads(data.total_leads.weekcount);
  }
  function Avg_Month_func() {
    setavg_MonthState(true);
    setavg_WeekState(false);
    setavg_YearState(false);
    setTotalLeads(data.total_leads.monthcount);
  }
  function Avg_Year_func() {
    setavg_YearState(true);
    setavg_WeekState(false);
    setavg_MonthState(false);
    setTotalLeads(data.total_leads.yearcount);
  }

  return Object.keys(data).length > 0 ? (
    <div>
      <div>
        <Container>
          <Row>
            <Col xs={12} sm={12} md={6} lg={4}>
              <div className="">
                <div className="Average_leads margin">
                  <p>Average Leads</p>
                  <div className="button_class">
                    <button
                      onClick={Week_func}
                      style={weekstate == true ? weekstyle : weekstyle1}
                    >
                      Week
                    </button>
                    <button
                      onClick={Month_func}
                      style={monthstate == true ? monthstyle : monthstyle1}
                    >
                      Month
                    </button>
                    <button
                      onClick={Year_func}
                      style={yearstate == true ? yearstyle : yearstyle1}
                    >
                      Year
                    </button>
                  </div>
                  <div className="average_number">
                    <h5> {avgLeads} </h5>
                  </div>
                </div>
             
              </div>
            </Col>

            {/* second */}
            <Col xs={12} sm={12} md={6} lg={4}>
              <div class="">
                <div className="campaign_leads margin">
                  <p>Campaign every week</p>
                  <div className="button_class">
                    <button
                      onClick={Camp_Week_func}
                      style={camp_weekstate == true ? weekstyle : weekstyle1}
                    >
                      Week
                    </button>
                    <button
                      onClick={Camp_Month_func}
                      style={camp_monthstate == true ? monthstyle : monthstyle1}
                    >
                      Month
                    </button>
                    <button
                      onClick={Camp_Year_func}
                      style={camp_yearstate == true ? yearstyle : yearstyle1}
                    >
                      Year
                    </button>
                  </div>
                  <div className="average_number">
                    <h5> 0 </h5>
                  </div>
                </div>
              
              </div>
            </Col>
            {/* third */}
            <Col xs={12} sm={12} md={6} lg={4}>
              <div class="">
                <div className="publisher_leads margin">
                  <p>Total Leads</p>
                  <div className="button_class">
                    <button
                      onClick={Avg_Week_func}
                      style={avg_weekstate == true ? weekstyle : weekstyle1}
                    >
                      Week
                    </button>
                    <button
                      onClick={Avg_Month_func}
                      style={avg_monthstate == true ? monthstyle : monthstyle1}
                    >
                      Month
                    </button>
                    <button
                      onClick={Avg_Year_func}
                      style={avg_yearstate == true ? yearstyle : yearstyle1}
                    >
                      Year
                    </button>
                  </div>
                  <div className="average_number">
                    <h5> {totalLeads} </h5>
                  </div>
                </div>
             
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  ) : (
    <div className="spinn_class">
      <Spinner animation="grow" />
    </div>
  );
}
