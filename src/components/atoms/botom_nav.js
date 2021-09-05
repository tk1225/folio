import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import PeopleIcon from '@material-ui/icons/People';
import HomeIcon from '@material-ui/icons/Home';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';

export const SimpleBottomNavigation=(props)=> {
  const pathname = window.location.pathname; // in case user visits the path directly. The BottomNavBar is able to follow suit.
  const [value, setValue] = React.useState(pathname);
  
  const bottomnav_style={
        position: "fixed",
        bottom: 0,
        width: "100%",
    }
 

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
       
      }}
      showLabels
      style={bottomnav_style}
      
    >
      
      <BottomNavigationAction 
        component={Link}
        to="/" 
        value="/"
        label="ポートフォリオ" 
        icon={<HomeIcon />} />
   
      
      <BottomNavigationAction
      component={Link}
      value="/otherportfolio"
      to="/otherportfolio"  
      label="ユーザーを探す" 
      icon={<PeopleIcon/>} />
      
     
      <BottomNavigationAction 
      component={Link}
      value="/stock/AAPL"
      to="/stock/AAPL" 
      label="個別株検索" 
      icon={<SearchIcon/>} />
     
    </BottomNavigation>
  );
}

