import React from 'react';

import { render } from 'react-dom';

import { BrowserRouter, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Buyers from "./Buyer/Buyers";
import Leads from "./Leads/Leads.component";
import Publisherlist from "./Publisher/PublisherList.component";
import VerticalsMainPage from "./Vertical/VerticalsMainPage";

import NavBar from "./CustomComponents/NavBar";
import campaigns from "./Campaigns/Campaign";
import LeadDetail from "./Leads/LeadDetail.component";
import BuyerContact from './Buyer/BuyerContact';
import BuyerRoutes from './Buyer/BuyerRoutes';
import PublisherById from './Publisher/PublisherById.component';
import CreateCampaigns from './Campaigns/CreateCampaigns';
import CreateVerticalFields from "./Vertical/CreateVerticalFields"
function MainNav() {
  return (

<BrowserRouter>
        <div>
          <NavBar />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/buyers" component={Buyers}/>
          <Route exact path="/buyercontacts/:id" component={BuyerContact}/>
          <Route exact path="/createbuyer" component={BuyerContact}/>
          <Route exact path="/buyerroutes/:id" component={BuyerRoutes}/>
         < Route path="/leaddetail/:id" component={LeadDetail}/>
         <Route path="/publisherList/:id" component={PublisherById} />
         <Route exact path="/verticalfield/:id" component={CreateVerticalFields} />
        {/* <Route exact path="/AddField/:id" component={AddField} /> */}
        <Route exact path="/DefaultFields/" component={CreateVerticalFields} />
          <Route exact path="/leads" component={Leads}/>
          <Route exact path="/publisherlist" component={Publisherlist}/>
          <Route exact path="/vertical" component={VerticalsMainPage}/>
          <Route exact path="/campaigns" component={campaigns}/>
          <Route exact path="/createcampaigns/:id" component={()=><CreateCampaigns/>}/>



          
        </div>
      </BrowserRouter>
  
  );
}

export default MainNav;
