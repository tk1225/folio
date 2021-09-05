import React,{useEffect,useContext,useState} from 'react';
import {Myportfolio} from "./components/pages/myportfolio"
import {Otherportfolio} from "./components/pages/otherportfolio"
import {Stock} from "./components/pages/stock"
import {Market} from "./components/pages/market"
import {Profile} from "./components/pages/profile"
import {Auth}  from "./components/pages/Auth"
import {MyProfile} from "./components/pages/myprofile"
import {FollowList} from "./components/pages/followlist"
import {FollowerList} from "./components/pages/followerlist"
import {Landing} from "./components/pages/landing"
import SignInScreen from "./components/pages/SignInScreen"

import {UserContext} from "./provider/UserProvider"

import {auth} from "./firebase"
import {SimpleBottomNavigation} from "./components/atoms/botom_nav"
import {
  Switch,
  useLocation
} from 'react-router-dom';
import Sidebar from './partials/Sidebar';
import {Header} from './partials/Header';

import './css/style.scss';
import WithSubnavigation from "./components/atoms/header_nav"
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './charts/ChartjsConfig';
import { focusHandling } from 'cruip-js-toolkit';
// Import pages



function App(props) {

   const location = useLocation();
   const [sidebarOpen, setSidebarOpen] = useState(false);
   console.log(sidebarOpen)
  
   
   useEffect(() => {
     document.querySelector('html').style.scrollBehavior = 'auto'
     window.scroll({ top: 0 })
     document.querySelector('html').style.scrollBehavior = ''
     focusHandling('outline');
   }, [location.pathname]); // triggered on route change
 
   const style={
    paddingBottom: 50
   
}

 

  return  (
    <Switch>
      <div className="flex h-screen overflow-hidden " style={style}>
      
        
          <Route exact path='/' component={Myportfolio}/>
          <Route exact path='/otherportfolio' component={Otherportfolio}/>
          <Route exact path='/stock/:ticker' component={Stock}/>
          <Route exact path='/market' component={Market}/>
          <Route exact path="/login" component={SignInScreen}/>
          <Route exact path="/profile/:targetUid" component={Profile}/>
          <Route exact path="/myprofile" component={MyProfile}/>
          <Route exact path="/followlist/:targetUid" component={FollowList}/>
          <Route exact path="/followerlist/:targetUid" component={FollowerList}/>
          <Route exact path="/landing" component={Landing}/>
          
         
          <SimpleBottomNavigation />
          
       
      </div>
    </Switch>

  );
}

export default App;
