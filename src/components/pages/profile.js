import React ,{useState,useContext,useEffect}from 'react'
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
    Spinner
  } from '@chakra-ui/react';
import {Portfolio_pie} from "../portfolio_molucules/portfolio_pie"
import {Stock_transaction} from "../portfolio_molucules/stock_transaction"
import {useParams} from "react-router-dom"
import {db} from "../../firebase"
import {UserContext} from "../../provider/UserProvider"
import Transaction from '../dashboard_components/dashboard/Transaction'
import TeamTilesCard from '../../partials/team/TeamTilesCard';
import PortfolioTable from '../dashboard_components/dashboard/PortfolioTable'

import Sidebar from '../../partials/Sidebar';
import {Header} from '../../partials/Header';
import { focusHandling } from 'cruip-js-toolkit';
import {useLocation} from 'react-router-dom';
import WelcomeBanner_follow from '../dashboard_components/dashboard/WelcomeBanner_follow';


  export const Profile=(props)=> {
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    
   
    
    useEffect(() => {
      document.querySelector('html').style.scrollBehavior = 'auto'
      window.scroll({ top: 0 })
      document.querySelector('html').style.scrollBehavior = ''
      focusHandling('outline');
    }, [location.pathname]); // triggered on route change
    
    

    const {targetUid}= useParams();
    //ContextからStateを取得
    const [uid,photoUrl,displayName,setUserdata]=useContext(UserContext)

    const [follow,setFollow]= useState(false);
    const [portfoliodetails,setPortfolioDetails]= useState(
      {
      dividendYield:0,
      fiveYNetIncomeGrowthPerShare:0,
      fiveYRevenueGrowthPerShare:0,
      priceBookValueRatio:0,
      priceEarningsRatio:0,
      returnOnEquity:0}
    );

    const [profile,setProfile]=useState({
      bgurl:'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
     iconimg:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
     username:'guest_tmp',
     text:"hello_React",
     follows:25,
     followers:40
 });

 
 const item= 
 {
   id: 1,
   name: profile.username,
   image: profile.iconimg,
   link: '#0',
   location: 'text',
   content: 'hello react',
   follows:profile.follows,
   followers:profile.followers,
   uid:targetUid
 }
    const [portfolio, setPortfolio]= useState([{
      "stock": "",
      "value": 0,
  },
  {
      "stock": "TSLA",
      "value": 300,
  }])


  //stockの取引履歴をUIDより取得
  const [stock_transactions,setStock_transactions] =useState( [
    { "uid":12345,
      "transactionID":"fee5fgb",
      "displayName":"guest",
      "stock": "TSLA",
      "date":"2020-04-22",
      "value": 400,
      "price":1500,
      "buy":true,
      "profit":null,
      "text":"aaa"
    },
    
  
  ])
  const [profileIsLoading,setProfileIsLoading]=useState(true)

    //DBからフォロー情報を取得し、フォロー済みかチェック
    //followしているかいないかチェック
       useEffect(()=>{
        console.log(uid)
        setProfileIsLoading(true)

        //followしているかしていないか
        db.collection("follow").doc(targetUid+uid).get()
        .then((doc)=>{
          if (doc.exists) {
            setFollow(true)
  
          }
          else {
              console.log("404");
          }
          })
          .catch( (error) => {
              console.log(`データを取得できませんでした (${error})`);
          });

        //プロフィール詳細インポート
        db.collection("user").doc(targetUid).get()
          .then((doc)=>{
            if (doc.exists) {
              setProfile(doc.data())
              setProfileIsLoading(false)
            }
            else {
                console.log("404")
            }
            })
        //ポートフォリオ内訳インポート
        db.collection("portfolio").doc(targetUid).get().then((doc)=>{
            if (doc.exists) {
              console.log(doc.data())
              setPortfolio(doc.data().portfolio)
    
            }
            else {
                console.log("404");
            }
            })

        //firestore上の最新取引履歴データを取得
        const transactions = [];

        db.collection("transaction").orderBy('timestamp','desc').where("UID", "==", targetUid).limit(15)
        .get()
        .then(function(res) {
            res.forEach(function(doc) {  
                transactions.push(doc.data())   
            }
            );
        }).then((res) => 
        {
            transactions.forEach(function(doc) {
                
                const time=doc.timestamp.toDate()
                const formatTime = `${time.getFullYear()}/0${time.getMonth()+1}/0${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
               
                doc.timestamp = formatTime
            });
            setStock_transactions(transactions);
        
                }
                )
                .catch(function(error) {
                    console.log(error.message)
                })

            //ポートフォリオの特徴をインポート
            db.collection("otherportfolio").doc(targetUid).get().then((doc)=>{
                    if (doc.exists) {
                          console.log(doc.data())
                          setPortfolioDetails(doc.data())
                
                        }
                        else {
                            console.log("404");
                        }
                        })


        

      
      
      
      
      
      
      
      },[uid,targetUid])

  //add_numが１だと追加したとき、-1で減
    //targetのフォロワー増加、myidのフォロー増加
    const follow_adjust=(target,myid,add_num)=>{

            
      db.collection("user").doc(target).get()
      .then((res)=>{
        //userdata取得
        console.log(res.data())
        const tmp=res.data()
        console.log(tmp.followers)
        tmp.followers=tmp.followers+add_num

        db.collection("user").doc(target).set(tmp)          })



        db.collection("user").doc(myid).get()
        .then((res)=>{
          //userdata取得
          console.log(res.data())
          const tmp=res.data()
          console.log(tmp.followers)
          tmp.follows=tmp.follows+add_num

          db.collection("user").doc(myid).set(tmp)          })
      }
        //フォローボタンを押したときの処理
    const handlefollow =()=>{
      setFollow(!follow)

    const handlefirebasefollow=()=>{
      

      if(follow){
        console.log("followはずします")

        //firestore上でのunfollow
        db.collection("follow").doc(targetUid+uid)
        .delete().then(() => {
          // success
          console.log("unfollow successfully!")

      }).catch(error => {
          // error
      })

        follow_adjust(targetUid,uid,-1)
      
      }else{
        console.log("followします")

        //firestore上でのfollow
        db.collection("follow").doc(targetUid+uid).set(
          {
            followee:targetUid,
            follower:uid

          }
        )
        .then(() => {
            console.log("follow successfully!");
        })     
        follow_adjust(targetUid,uid,1) 
      }

    }

    //フォロー中の人数を取得し10人までに制限
    const tmplist=[]
    db.collection("follow").where("follower", "==",uid)
      .get()
      .then(  async(res)=>{
             
             return Promise.all(res.docs.map(async (item) => {
    
                 const stockAsync = (item) => new Promise((resolve) =>  {
                  db.collection("user").doc(item.data().followee)
              .get().then(
                function(res) {
                  if (res.exists) {
              
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
    
        ).then(() => {
          console.log(tmplist.length)

          //followを外す場合は長さ関係なし
          if(follow){
            console.log("フォロー外します")
              handlefirebasefollow()
          }else
          {
            if (tmplist.length>=10){
              console.log("フォロー不可")
              alert("フォローは最大10人です")
            }else{
              console.log("フォローOK")
              handlefirebasefollow()
            }
          }

        })




     
    }

  const handleClickFollow=(d,i)=>{
  
      props.history.push({
          pathname: `/followlist/`+targetUid,
          
      });
  }
  const handleClickFollower=(d,i)=>{

    props.history.push({
        pathname: `/followerlist/`+targetUid,
        
    });
}

    
     

    
   
    return (

      <>
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
 
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
 
      {/*  Site header */}
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto"> 

      <div className="relative bg-indigo-200 p-4 sm:p-6 rounded-sm overflow-hidden mb-8">

        {/* Background illustration */}
        <div className="absolute right-0 top-0 -mt-4 mr-16 pointer-events-none hidden xl:block" aria-hidden="true">
          <svg width="319" height="198" xmlnsXlink="http://www.w3.org/1999/xlink">
            <defs>
              <path id="welcome-a" d="M64 0l64 128-64-20-64 20z" />
              <path id="welcome-e" d="M40 0l40 80-40-12.5L0 80z" />
              <path id="welcome-g" d="M40 0l40 80-40-12.5L0 80z" />
              <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="welcome-b">
                <stop stopColor="#A5B4FC" offset="0%" />
                <stop stopColor="#818CF8" offset="100%" />
              </linearGradient>
              <linearGradient x1="50%" y1="24.537%" x2="50%" y2="100%" id="welcome-c">
                <stop stopColor="#4338CA" offset="0%" />
                <stop stopColor="#6366F1" stopOpacity="0" offset="100%" />
              </linearGradient>
            </defs>
            <g fill="none" fillRule="evenodd">
              <g transform="rotate(64 36.592 105.604)">
                <mask id="welcome-d" fill="#fff">
                  <use xlinkHref="#welcome-a" />
                </mask>
                <use fill="url(#welcome-b)" xlinkHref="#welcome-a" />
                <path fill="url(#welcome-c)" mask="url(#welcome-d)" d="M64-24h80v152H64z" />
              </g>
              <g transform="rotate(-51 91.324 -105.372)">
                <mask id="welcome-f" fill="#fff">
                  <use xlinkHref="#welcome-e" />
                </mask>
                <use fill="url(#welcome-b)" xlinkHref="#welcome-e" />
                <path fill="url(#welcome-c)" mask="url(#welcome-f)" d="M40.333-15.147h50v95h-50z" />
              </g>
              <g transform="rotate(44 61.546 392.623)">
                <mask id="welcome-h" fill="#fff">
                  <use xlinkHref="#welcome-g" />
                </mask>
                <use fill="url(#welcome-b)" xlinkHref="#welcome-g" />
                <path fill="url(#welcome-c)" mask="url(#welcome-h)" d="M40.333-15.147h50v95h-50z" />
              </g>
            </g>
          </svg>
        </div>

        {/* Content */}
        <div className="relative">
          <h1 className="text-2xl md:text-3xl text-gray-800 font-bold mb-1">気になるユーザーをフォローしよう</h1>
          <p>ユーザーをフォローするとマイページから取引履歴を見ることができ、ポートフォリオ比較の際にもフォローユーザーの色が変化します。</p>
          <Button
                          w={125}
                          
                          bg={ follow ? 'white' : '#151f21' }
                      
                          color={follow ? '#151f21' : 'white'}
                          rounded={'md'}
                          _hover={{
                            transform: 'translateY(-2px)',
                            boxShadow: 'lg', }}
                            onClick={handlefollow}
                        >
                          <div className="flex flex-grow">
                                <svg className="flex-shrink-0 h-6 w-6 mr-3" viewBox="0 0 24 24">
                                  <circle className={`fill-current text-gray-400 ${ 'text-indigo-300'}`} cx="18.5" cy="5.5" r="4.5" />
                                  <circle className={`fill-current text-gray-600 ${ 'text-indigo-500'}`} cx="5.5" cy="5.5" r="4.5" />
                                  <circle className={`fill-current text-gray-600 ${ 'text-indigo-500'}`} cx="18.5" cy="18.5" r="4.5" />
                                  <circle className={`fill-current text-gray-400 ${ 'text-indigo-300'}`} cx="5.5" cy="18.5" r="4.5" />
                                </svg>
                                <span className="text-sm font-medium"> {follow ? "フォロー中" : "フォロー!" }</span>
                              </div>
                        
          </Button>
        </div>

        </div>
        

          {/* Cards */}     
          <div className="grid grid-cols-12 gap-6">
            
             

            

            <TeamTilesCard
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        image={item.image}
                        link={item.link}
                        location={item.location}
                        content={item.content}
                        followers={item.followers}
                        follows={item.follows}
                        uid={item.uid}
                      />
             
            
            <Portfolio_pie portfolio={portfolio}/>
          



            <PortfolioTable portfoliodetails={portfoliodetails}/>

            <Transaction stock_transactions={stock_transactions} private_mode={true}/>
            
          
        
    
          </div>

          <div className="relative bg-indigo-200 p-4 sm:p-6 rounded-sm overflow-hidden mb-8">

        {/* Background illustration */}
        <div className="absolute right-0 top-0 -mt-4 mr-16 pointer-events-none hidden xl:block" aria-hidden="true">
          <svg width="319" height="198" xmlnsXlink="http://www.w3.org/1999/xlink">
            <defs>
              <path id="welcome-a" d="M64 0l64 128-64-20-64 20z" />
              <path id="welcome-e" d="M40 0l40 80-40-12.5L0 80z" />
              <path id="welcome-g" d="M40 0l40 80-40-12.5L0 80z" />
              <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="welcome-b">
                <stop stopColor="#A5B4FC" offset="0%" />
                <stop stopColor="#818CF8" offset="100%" />
              </linearGradient>
              <linearGradient x1="50%" y1="24.537%" x2="50%" y2="100%" id="welcome-c">
                <stop stopColor="#4338CA" offset="0%" />
                <stop stopColor="#6366F1" stopOpacity="0" offset="100%" />
              </linearGradient>
            </defs>
            <g fill="none" fillRule="evenodd">
              <g transform="rotate(64 36.592 105.604)">
                <mask id="welcome-d" fill="#fff">
                  <use xlinkHref="#welcome-a" />
                </mask>
                <use fill="url(#welcome-b)" xlinkHref="#welcome-a" />
                <path fill="url(#welcome-c)" mask="url(#welcome-d)" d="M64-24h80v152H64z" />
              </g>
              <g transform="rotate(-51 91.324 -105.372)">
                <mask id="welcome-f" fill="#fff">
                  <use xlinkHref="#welcome-e" />
                </mask>
                <use fill="url(#welcome-b)" xlinkHref="#welcome-e" />
                <path fill="url(#welcome-c)" mask="url(#welcome-f)" d="M40.333-15.147h50v95h-50z" />
              </g>
              <g transform="rotate(44 61.546 392.623)">
                <mask id="welcome-h" fill="#fff">
                  <use xlinkHref="#welcome-g" />
                </mask>
                <use fill="url(#welcome-b)" xlinkHref="#welcome-g" />
                <path fill="url(#welcome-c)" mask="url(#welcome-h)" d="M40.333-15.147h50v95h-50z" />
              </g>
            </g>
          </svg>
        </div>

        {/* Content */}
        <div className="relative">
          <h1 className="text-2xl md:text-3xl text-gray-800 font-bold mb-1">気になるユーザーをフォローしよう</h1>
          <p>ユーザーをフォローするとマイページから取引履歴を見ることができ、ポートフォリオ比較の際にもフォローユーザーの色が変化します。</p>
          <Button
                          w={125}
                          
                          bg={ follow ? 'white' : '#151f21' }
                      
                          color={follow ? '#151f21' : 'white'}
                          rounded={'md'}
                          _hover={{
                            transform: 'translateY(-2px)',
                            boxShadow: 'lg', }}
                            onClick={handlefollow}
                        >
                          <div className="flex flex-grow">
                                <svg className="flex-shrink-0 h-6 w-6 mr-3" viewBox="0 0 24 24">
                                  <circle className={`fill-current text-gray-400 ${ 'text-indigo-300'}`} cx="18.5" cy="5.5" r="4.5" />
                                  <circle className={`fill-current text-gray-600 ${ 'text-indigo-500'}`} cx="5.5" cy="5.5" r="4.5" />
                                  <circle className={`fill-current text-gray-600 ${ 'text-indigo-500'}`} cx="18.5" cy="18.5" r="4.5" />
                                  <circle className={`fill-current text-gray-400 ${ 'text-indigo-300'}`} cx="5.5" cy="18.5" r="4.5" />
                                </svg>
                                <span className="text-sm font-medium"> {follow ? "フォロー中" : "フォロー!" }</span>
                              </div>
                        
          </Button>
        </div>

        </div>


        
        </div>
   
      </div>
      </>

    );
  }