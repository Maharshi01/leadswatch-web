//created by surya teja
//last modified 24 dec 2019
import React,{useState,useEffect} from 'react';
import { render } from 'react-dom';
import axios from "axios";
import { API_URL ,logoutidle} from '../AppConfig';
import { BrowserRouter, Route,Switch } from "react-router-dom";
import Login from "./UserManagement/Login.component";
import Signup from "./UserManagement/Signup.component";
import Home from "./UserManagement/Home.component";
import MainNav from "./MainNav";
import CreateBuyerRoute from './Buyer/CreateBuyerRoute';
import EditBuyerRoute from './Buyer/EditBuyerRoute';
import Dashboard from "./Dashboard";
import TeamMember from "./UserManagement/TeamMember.component";
import Buyers from "./Buyer/Buyers";
import Leads from "./Leads/Leads.component";
import  Vertical from "./Vertical/Vertical"
import NavBar from "./CustomComponents/NavBar";
import campaigns from "./Campaigns/Campaign";
import LeadDetail from "./Leads/LeadDetail.component";
import BuyerContact from './Buyer/BuyerContact';
import BuyerRoutes from './Buyer/BuyerRoutes';
import CreateCampaigns from './Campaigns/CreateCampaigns';
import SettingsPage from "./SettingsPage.component";
import Accounting from "./Accounting";
// import ChangePass from './UserManagement/ChangePass.component';
import ForgotPassword from './UserManagement/ForgotPassword.component';
import ResetPassword from './UserManagement/ResetPassword.component';
import ChangePass from './UserManagement/ChangePass.component';
import ProfileDetails from './UserManagement/ProfileDetails.component';
import InvitePublisher from './Publisher/InvitePublisher.component';
import Publisherlist from "./Publisher/PublisherList.component";
import PublisherById from './Publisher/PublisherById.component';
import CreateVerticalFields from "./Vertical/CreateVerticalFields"
import VerticalsMainPage from "./Vertical/VerticalsMainPage";
import Subscription from "./Subscription";
//imports for publish nav
import PubDashboard from "./PubDashboard";
import PubNavBar from "./CustomComponents/PubNavBar";
import PubLeads from './Publisher/PubLeads';
import PubCampaigns from './Publisher/PubCampaigns';
import PubLeadDeatails from './Publisher/PubLeadDeatail';
import PublisherAccounting from './Publisher/PublisherAccounting';
import PublisherSettings from './Publisher/PublisherSettings';
//end of publish nav
function LoginNav() {
  const [loginStatus,setLoginStatus]=useState("false");
  const [admin,setAdmin]=useState(2);
  const [activeTab,setActiveTab]=useState("leads")
  const [load,setLoad]=useState(true)
  const [logochange,setLogochange]=useState(false)
  const [imgchange,setImgchange]=useState(false)
  const[subscription1,setsubscription1]=useState(0)
  const[tabChange,setTabChange]=useState(false)

   useEffect(() => {
     // ////console.log("inside useeffect")
    const getdata = async () => {
      const d = new Date()
      const storeDay = await localStorage.getItem("day")
      const storeMonth = await localStorage.getItem("month")
      const storeHour = await localStorage.getItem("hour")
      const access_token = await localStorage.getItem("access_token")
      const user_id = await localStorage.getItem("user_id")
      const role = await localStorage.getItem("role")
      const email = await localStorage.getItem("email")
      const subscription=await localStorage.getItem("subscription")
     // ////console.log("email",email)
      global.email=email;
      const currentDay = "" + d.getDay()
      const currentMonth = "" + d.getMonth()
      const currentHour = "" + d.getHours()

     // ////console.log("stored", storeDay, "day", storeHour, "hour", storeMonth, "month")
     // ////console.log("current", currentDay, "day", currentHour, "hour", currentMonth, "month")
      if (currentMonth == storeMonth) {
        if (currentDay == storeDay) {
          if (currentHour - storeHour <= 4) {
            const config = {
              url: API_URL+`/user/detail/${user_id}`,
              method: "get",
              headers: {
                "Content-Type": "application/json",
                Authorization:
                  "Bearer "+ localStorage.getItem("access_token")
              }
            };
        
            axios(config)
              .then(response => {
               // ////console.log("response", response);
                if (response && response.data.data) {
                  if (response.data.status_code == 200) {
                    // setSuccess(true);
                   // ////console.log(response.data);
                  }
                  setsubscription1(response.data.data.subscription);

                }
        
               // ////console.log("response of publisher", response);
              })
              .catch(error => {
                if(error.message=="Request failed with status code 401"){
                  logoutidle()
                }
               // ////console.log(error);
              });
            global.access_token = access_token
            global.user_id = user_id
            global.subscription=subscription
            global.role = role
            setLoginStatus(true)
            setAdmin(role)
            setLoad(false)
            setsubscription1(subscription)
            
           
          }
          else {
            setLoginStatus(false)
           localStorage.clear()
           // ////console.log("deleted")
            setLoad(false);
          }
        }
        else if (currentDay - storeDay == 1) {
          if ((storeHour == 20 && currentHour == 0) || (storeHour == 21 && currentHour == 1) || (storeHour == 22 && currentHour == 2) || (storeHour == 23 && currentHour == 3)) {
            global.access_token = access_token
            global.user_id = user_id
            global.role = role
            global.subscription=subscription
            setLoginStatus(true)
            setAdmin(role)
            setsubscription1(subscription)
            const config = {
              url: API_URL+`/user/${user_id}`,
              method: "get",
              headers: {
                "Content-Type": "application/json",
                Authorization:
                  "Bearer "+ localStorage.getItem("access_token")
              }
            };
        
            axios(config)
              .then(response => {
               // ////console.log("response", response);
                if (response && response.data.data) {
                  if (response.data.status_code == 200) {
                    // setSuccess(true);
                   // ////console.log(response.data);
                  }
                  setsubscription1(response.data.data.subscription);

                }
        
               // ////console.log("response of publisher", response);
              })
              .catch(error => {
                if(error.message=="Request failed with status code 401"){
                  logoutidle()
                }
               // ////console.log(error);
              });

           
            setTimeout(() => {
             // ////console.log(load);
              setLoad(false);
            }, 2000);
          }
          else {
            localStorage.clear()
            setLoginStatus(false)
           // ////console.log("deleted")
            setLoad(false);
          }
        }
        else {
          localStorage.clear()
          setLoginStatus(false)
         // ////console.log("deleted")
          setLoad(false);
        }
      }
      else {
        localStorage.clear()
        setLoginStatus(false)
       // ////console.log("deleted")
        setLoad(false);
      }
      // SecureStore.deleteItemAsync(key, options)
      //// ////console.log(a,b,c,d,"key12")
    }
    getdata();
  }, [])
  const renderme=()=>{

    if(loginStatus==false){
      return (
        <div>
          <Switch>
            <Route exact path="/signup" component={Signup} />
            <Route
              exact
              path="/login"
              render={() => (
                <Login
                  setsubscription1={setsubscription1}
                  setAdmin={setAdmin}
                  setLoginStatus={setLoginStatus}
                />
              )}
            />
            <Route exact path="/forgotpassword" component={ForgotPassword} />
            <Route exact path="/resetpassword" component={ResetPassword} />
            <Route
              path="/"
              render={() => (
                <Login
                  setsubscription1={setsubscription1}
                  setAdmin={setAdmin}
                  setLoginStatus={setLoginStatus}
                />
              )}
            />
          </Switch>
        </div>
      );}
    else if(admin==2 || admin==4){
        if(subscription1==0){
          return(
            <Switch>
              <Route exact path="/subscription" component={Subscription} ></Route>
              {/* <Route path="/" component={Subscription} ></Route> */}
            </Switch>
          )
        }
         
      return(
            <div>
                <NavBar setTabChange={setTabChange} tabChange={tabChange} setImgchange={setImgchange} imgchange={imgchange} setLogochange={setLogochange} logochange={logochange} activeTab={activeTab} setActiveTab={setActiveTab} />
                <Switch>
                <Route exact path="/publishers/:id" component={PublisherById} />
                <Route exact path="/publishers/create" component={PublisherById} />
                <Route exact path="/publisherlist" component={Publisherlist}/>
                <Route exact path="/publishers"  render={()=><Publisherlist activeTab={activeTab} setActiveTab={setActiveTab} />}/>
          
                <Route exact path="/changepassword" component={ChangePass} />
                <Route exact path="/profile" render={()=><ProfileDetails setLoginStatus={setLoginStatus}/>}/>
                <Route exact path="/invite" component={InvitePublisher}/> 
              
                <Route exact path="/dashboard" component={Leads} />
                {/* <Route exact path="/dashboard" component={Dashboard} /> */}
     
                <Route exact path="/buyers"  render={()=><Buyers activeTab={activeTab} setActiveTab={setActiveTab} />}/>
                <Route exact path="/settings"  render={()=><SettingsPage tabChange={tabChange} setTabChange={setTabChange} activeTab={activeTab} setActiveTab={setActiveTab} setImgchange={setImgchange} setLogochange={setLogochange} />}/>
                <Route exact path="/Accounting"  component={Accounting} />}/>
                
                <Route exact path="/team" component={TeamMember}/>

                <Route exact path="/buyercontacts/:id" component={BuyerContact}/>
                <Route exact path="/buyerroutes/:id" component={BuyerRoutes}/>
                <Route exact path="/leaddetail/:id" component={LeadDetail}/>
                <Route exact path="/vertical/:id" component={CreateVerticalFields} />
                <Route exact path="/verticals"  render={()=><VerticalsMainPage activeTab={activeTab} setActiveTab={setActiveTab} />}/>
            
                <Route exact path ="/changepassword" component={ChangePass} />
                <Route exact path="/leads"  render={()=><Leads activeTab={activeTab} setActiveTab={setActiveTab} />}/>
        
                {/* <Route exact path="/vertical" component={Vertical}/> */}
                <Route exact path="/campaigns" component={campaigns}/>
                <Route exact path="/createbuyerroute/:id" component={CreateBuyerRoute}/>
                <Route exact path="/createbuyer" component={BuyerContact}/>
          <Route exact path="/editbuyerroute/:id" component={EditBuyerRoute}/>
                <Route exact path="/createcampaigns/:id" component={()=><CreateCampaigns/>}/>
                <Route path="/" component={Leads} />
                
                </Switch>
            </div>
      )}
    else{
      return(
            <div>
                {/* <NavBar /> */}
                  <PubNavBar />
                <Switch>
                  <Route exact path="/p_leads" component={PubLeads}/>
                  <Route exact path="/publeaddetail/:id" component={PubLeadDeatails}/>
                  <Route exact path="/p_campaigns" component={PubCampaigns}/>
                  <Route exact path ="/p_settings" component={PublisherSettings}/>
                  <Route exact path ="/p_accounting" component={PublisherAccounting}/>
                  <Route exact path="/" component={PubLeadDeatails} />
                  <Route path="/" component={PubLeads} />
                {/* <Route exact path="/PublisherList/:id" component={PublisherById} />
                <Route exact path="/publisherlist" component={Publisherlist}/>
                <Route exact path="/changepassword" component={ChangePass} />
                <Route exact path="/profile" render={()=><ProfileDetails setLoginStatus={setLoginStatus}/>}/>
                <Route exact path="/invite" component={InvitePublisher}/> 
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/buyer" component={Buyers}/>
                <Route exact path="/buyercontact/:id" component={BuyerContact}/>
                <Route exact path="/buyerroutes/:id" component={BuyerRoutes}/>
                <Route exact path="/leaddetail/:id" component={LeadDetail}/>
                <Route exact path="/VerticalField/:id" component={CreateVerticalFields} />
                <Route exact path="/Vertical" component={VerticalsMainPage}/>
                <Route exact path ="/changepassword" component={ChangePass} />
                <Route exact path="/leads" component={Leads}/>
                <Route exact path="/Vertical" component={Vertical}/>
                <Route exact path="/campaigns" component={campaigns}/>
                <Route exact path="/createbuyerroutes/:id" component={CreateBuyerRoute}/>
          <Route exact path="/editbuyerroutes/:id" component={EditBuyerRoute}/>
                <Route exact path="/createcampaigns/:id" component={()=><CreateCampaigns/>}/>
                <Route path="/" component={Dashboard} /> */}
                </Switch>
            </div>
      )} 
  }
  return (

<BrowserRouter>
        <div>
          
          {renderme()}
        </div>
      </BrowserRouter>
  
  );
}

export default LoginNav;
