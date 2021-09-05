import React,{useState,useEffect} from 'react'

import { Flex, Text ,Box} from "@chakra-ui/react"

import Sidebar from '../../partials/Sidebar';
import {Header} from '../../partials/Header';
import { focusHandling } from 'cruip-js-toolkit';
import {useLocation} from 'react-router-dom';

export const Market=()=>{


    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    
   
    
    useEffect(() => {
      document.querySelector('html').style.scrollBehavior = 'auto'
      window.scroll({ top: 0 })
      document.querySelector('html').style.scrollBehavior = ''
      focusHandling('outline');
    }, [location.pathname]); // triggered on route change

    return (
    
            <>
            
     {/* Sidebar */}
     <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

     {/* Content area */}
     <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

     {/*  Site header */}
     <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <Flex color="white">
                <Box bg="green.500" flex="5">
                     
                </Box>
                
                <Box bg="blue.500" flex="5">
                    <Text>Box 2</Text>
                </Box>

            </Flex>
            
        </div>
        
        </>
        )
}