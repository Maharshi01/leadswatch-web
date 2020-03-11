import React from 'react';
import { BrowserRouter, Route,NavLink } from "react-router-dom";
import PubDashboard from "./PubDashboard";
import PubNavBar from "./CustomComponents/PubNavBar";
import PubLeads from './Publisher/PubLeads';
import PubCampaigns from './Publisher/PubCampaigns';
import PubLeadDeatails from './Publisher/PubLeadDeatail';
import PublisherAccounting from './Publisher/PublisherAccounting';
import PublisherSettings from './Publisher/PublisherSettings';


function PublisherNav() {
  return (

<BrowserRouter>
        <div>
          <PubNavBar />
          <Route exact path="/" component={PubDashboard} />
          <Route exact path="/publeads" component={PubLeads}/>
          <Route exact path="/publeaddetail/:id" component={PubLeadDeatails}/>
          <Route exact path="/pubCampaigns" component={PubCampaigns}/>
          <Route exact path ="/pubsettings" component={PublisherSettings}/>
          <Route exact path ="/pubaccounting" component={PublisherAccounting}/>

        </div>
      </BrowserRouter>
  
  );
}

export default PublisherNav;