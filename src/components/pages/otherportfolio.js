import React ,{useState,useEffect,useContext}from 'react'
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis,Legend,CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Select } from "@chakra-ui/react"
import {db} from '../../firebase'
import {Follow_btn} from "../atoms/follow_btn"
import {UserContext} from '../../provider/UserProvider'
import OtherPortfolioTable from '../dashboard_components/dashboard/OtherPortfolioTable'
import { Portfolio_pie } from '../portfolio_molucules/portfolio_pie'
import { PortfolioScatter } from '../portfolio_molucules/portfolioscatter'

import Sidebar from '../../partials/Sidebar';
import {Header} from '../../partials/Header';
import { focusHandling } from 'cruip-js-toolkit';
import {useLocation} from 'react-router-dom';
import WelcomeBanner from '../dashboard_components/dashboard/WelcomeBanner';
import Transaction from '../dashboard_components/dashboard/Transaction';


export const Otherportfolio=(props)=>{


  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [nodataMyPF,setNodataMyPF]= useState(false)
 
  
  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
    focusHandling('outline');
  }, [location.pathname]); // triggered on route change

    const [portfolio_data,setPortfolio_data]=useState([{
      "pfolio_return":0,
      "pfolio_vola":0
    }])
   
    const [myportfolio_data,setmyPortfolio_data]=useState([{
      "pfolio_return":0,
      "pfolio_vola":0
    }])

    const [followportfolio_data,setfollowPortfolio_data]=useState([{
      "pfolio_return":0,
      "pfolio_vola":0
    }])

    const  [uid,photoUrl,displayName,setUserdata]=useContext(UserContext)

    const [activescatter,setActiveScatter]=useState("")
    const [activeprofile,setActiveProfile]=useState
            ( { 
              UID: "RrRGQ1xX4tawiUpMW8gavfwQGU43",
            bgurl: "",
            followers: 0,
            follows: 0,
            iconimg: "",
            pfolio_return: 0,
            pfolio_vola: 0,
            res_min_vola: 0,
            res_sharp_ratio: 0,
            text: "hello",
            username: "チャートをクリック!"})

    const [ActivePortfolio,setActivePortfolio]= useState([])
    //取引履歴state
    const [stock_transactions,setStock_transactions]= useState(
      [
          {
              "UID":12345,
              "transactionID":"fefdsae5fgb",
              "displayName":"guest",
              "photoUrl":"",
              "stock": "AA",
              "date":"2020-04-22",
              "securities":"",
              "value": 400,
              "price":1500,
              "buy":1,
              "profit":0,
              "text":"aaa"
          },
        
        ]
  )  

    //他ユーザーポートフォリオデータを取得
    useEffect(()=>{
      
        
        //firestore上の最新ポートフォリオデータを取得
        let otherPF=[]

        const Ref = db.collection('otherportfolio');
        Ref.get().then((item)=>{
            item.forEach(doc => {
               
                otherPF.push(doc.data())
              });
              setPortfolio_data(otherPF)
        })

    },[])
    //自分のポートフォリオデータを取得
    useEffect(() =>{
        //firestore上の自分のポートフォリオデータを取得
        let myPF=[]

        const myRef = db.collection('otherportfolio').doc(uid) 
        myRef.get().then((item)=>{
          if (item.exists) {
              
              myPF.push(item.data())
              
              console.log(myPF)
              setmyPortfolio_data(myPF)
              setNodataMyPF(false)
            }else{
              console.log("nodata_mypf")
              setNodataMyPF(true)
            }
        })
    },[uid])
    //フォローしているポートフォリオデータ
    useEffect(()=>{

        //データ取得できたプロフィールを表示
              const followlist=[]
                db.collection("follow").where("follower", "==", uid)
                .get()
                .then(  async(res)=>{
                    
                    return Promise.all(res.docs.map(async (item) => {

                        const stockAsync = (item) => new Promise((resolve) =>  {
                            followlist.push(item.data().followee)
                            resolve("ok")
                            
                            
                            } )
                        const asyncTaskA =await stockAsync(item)
                        console.log(asyncTaskA)
                        
                      
                        }))
                    
                
                  
            }

                ).then(()=>{
                console.log(followlist)
                  let followPF=[""]
                  //followしている人が０の場合のエラー回避
                  try {
                    db.collection('otherportfolio').where("UID", "in",followlist).get().then((item)=>{
                      item.forEach(doc => {
                        
                          followPF.push(doc.data())
                        });
                        console.log(followPF)
                        setfollowPortfolio_data(followPF)
                  }).catch((e)=>{console.log(e)})

                  } catch (error) {
                    console.error(error);
                    
                  }
                   


                })
  

      },[uid])
    
      useEffect(()=>{
                 //firestore上の最新取引履歴データを取得
        const transactions = [];
       


        db.collection("transaction").orderBy('timestamp','desc').limit(15)
        .get()
        .then(function(res) {

            res.forEach(function(doc) {  
                transactions.push(doc.data())   
            }
            );
        }).then((res) => 
        {
            //transactionsを日付で並び替え
            
            const sortArray = [...transactions].sort((a, b) => new Date(a.timestamp)- new Date(b.timestamp));
            console.log(sortArray)
            let totalrealizedprofit_tmp=0
            sortArray.forEach(function(doc) {
                
                const time=doc.timestamp.toDate()
                const formatTime =
                 `${time.getFullYear()}/${time.getMonth()+1}/${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
               
                doc.timestamp = formatTime

                console.log(doc.profit)
                totalrealizedprofit_tmp=totalrealizedprofit_tmp+doc.profit

            });

            setStock_transactions(sortArray);
          })

        

      },[])

  
    const handleClickScatter=(d,i)=>{
        setActiveScatter(d.UID)
        
        console.log(activescatter)
        
        const found = portfolio_data.find(element => element.UID==activescatter);

        if (found!=null){
        setActiveProfile(found)
        console.log(activeprofile)

        //firestore上の最新ポートフォリオデータを取得
        var docRef=db.collection('portfolio').doc(d.UID) 

        docRef.get()
        .then((doc)=>{
            //取得できたかどうかチェック
           if (doc.exists) {
             console.log(doc.data())
             setActivePortfolio(doc.data().portfolio)
           }
          })
        }
    
        //props.history.push({pathname: `/profile/`+d.UID,});
       
    }

    const CustomTooltip = ({ active, payload, label }) => {
      if (active && payload && payload.length) {
        const found = portfolio_data.find(element => element.UID==activescatter);
      

        return (
          
          <>
        
          </>
        );
      }
    
      return null;
    };



    return (
<>

     {/* Sidebar */}
     <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

     {/* Content area */}
     <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

     {/*  Site header */}
     <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">    
 {/* Cards */}
    <div className="grid grid-cols-12 gap-6">
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-gray-200">
    
    <div className="px-5 pt-5">
    <h2 className="text-lg font-semibold text-gray-800 mb-2">みんなのポートフォリオ</h2>
    </div>
   { nodataMyPF?<WelcomeBanner />:""}

    <PortfolioScatter  portfolio_data={portfolio_data}myportfolio_data={myportfolio_data} followportfolio_data={followportfolio_data}ActivePortfolio={ActivePortfolio}setActivePortfolio={setActivePortfolio}activeprofile={activeprofile}setActiveProfile={setActiveProfile}/>
    </div>


      
    
    <Transaction stock_transactions={stock_transactions} private_mode={true} />
  



    


    </div>




</div>

      </div>
</>
        )
}