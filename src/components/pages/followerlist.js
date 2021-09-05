import React,{useEffect,useState} from 'react'
import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
  Spacer
} from '@chakra-ui/react';
import {useParams} from "react-router-dom"
import axios from 'axios'
import {db} from '../../firebase'
import {Follow_btn} from "../atoms/follow_btn"

import Sidebar from '../../partials/Sidebar';
import {Header} from '../../partials/Header';
import { focusHandling } from 'cruip-js-toolkit';
import {useLocation} from 'react-router-dom';

export const FollowerList=(props)=> {

  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
   useEffect(() => {
     document.querySelector('html').style.scrollBehavior = 'auto'
     window.scroll({ top: 0 })
     document.querySelector('html').style.scrollBehavior = ''
     focusHandling('outline');
   }, [location.pathname]); // triggered on route change


//UIDのフォロワーを表示
 const {targetUid}= useParams();

 const handleClickicon=(jump_id)=>{
        
      
  props.history.push({
      pathname: `/profile/`+jump_id,
      
  });
}

  const [user_data,setUser_data]= useState([])

 useEffect(()=>{

//データ取得できたプロフィールを表示
const tmplist=[]
  db.collection("follow").where("followee", "==", targetUid)
  .get()
  .then(  async(res)=>{
         
         return Promise.all(res.docs.map(async (item) => {

             const stockAsync = (item) => new Promise((resolve) =>  {
              db.collection("user").doc(item.data().follower)
          .get().then(
            function(res) {
              if (res.exists) {
              console.log(res.data())
              tmplist.push(res.data())
               resolve("ok")}
               else{
                resolve("ok")
               }
            }

          )   
                 
                 
                 } )
             const asyncTaskA =await stockAsync(item)
             console.log(asyncTaskA)
             
           
             }))
         
    
       
 }

    ).then(()=>{
      setUser_data(tmplist)
    })
  

      },[targetUid])

  return (
   <>
   
     {/* Sidebar */}
     <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

     {/* Content area */}
     <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

     {/*  Site header */}
     <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
   <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto"> 
    
    <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-gray-200">
      <header className="px-5 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">フォロワーリスト</h2>
      </header>
      <div className="p-3">

        {/* Card content */}
        {/* "Today" group */}
        <div>

          <ul className="my-1">
            {/* Item */}
            {user_data.map((item) => (
            <li className="flex px-2">
              <div className="w-9 h-9 rounded-full flex-shrink-0 bg-red-500 my-2 mr-3">
                <Avatar
                size="md"
                src={item.iconimg}
                
                alt={'Author'}
                css={{
                  border: '2px solid white',
                }}
                onClick={()=>{handleClickicon(item.UID)}}
                />
              </div>
              <div className="flex-grow flex items-center border-b border-gray-100 text-sm py-2">
                <div className="flex-grow flex justify-between">
                  <div className="self-center">
                    <a className="text-xs uppercase text-black-400 bg-gray-50 rounded-sm font-semibold p-2" href="#0">
                    {item.username}
                    </a>
                    <div>
                    {item.text}
                  </div>
                  </div>
                 
                  <div className="flex-shrink-0 self-start ml-2">
                    <span className="font-medium text-gray-800">
                    <Follow_btn followornot={true} uid={targetUid} targetUid={item.UID}/>
                    </span>
                  </div>
                </div>
              </div>
            </li>
            
            ))}
          
           
            
          </ul>
        </div>

      </div>
    </div>
    
  
      
      </div>
   
   </div>
   </>
   
  );
}