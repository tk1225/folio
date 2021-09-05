import React,{useState,useEffect} from 'react'
import { Portfolio_pie } from '../portfolio_molucules/portfolio_pie'
import {Modal_buy} from '../portfolio_molucules/modal_buy'
import {Modal_sell} from '../portfolio_molucules/modal_sell'
import { Tabs, TabList, TabPanels, Tab, TabPanel,Flex,Spinner,FormControl,FormLabel,Switch } from "@chakra-ui/react"
import {Graph} from '../portfolio_molucules/hist_asset_price'
import TotalAssets from '../dashboard_components/dashboard/TotalAssets'
import StockCard from '../dashboard_components/dashboard/StockCard'
import AssetsTable from '../dashboard_components/dashboard/AssetsTable'
import Transaction from '../dashboard_components/dashboard/Transaction'
import {Dividends} from '../portfolio_molucules/dividends'
import {UserContext} from '../../provider/UserProvider'
import {useContext} from "react"
import axios from 'axios'
import {db,auth} from '../../firebase'
import {Risk_ratio_pie} from "../portfolio_molucules/risk_ratio_pie"

import {First_login} from '../atoms/first_login'
import {ShareBt} from '../atoms/ShareBt'
import Sidebar from '../../partials/Sidebar';
import {Header} from '../../partials/Header';
import { focusHandling } from 'cruip-js-toolkit';
import {useLocation} from 'react-router-dom';
import WelcomeBanner_follow from '../dashboard_components/dashboard/WelcomeBanner_follow';


export const Myportfolio=(props)=>{

    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);
   
   //contextからログインユーザー情報値を取り出す
    const  [uid,photoUrl,displayName,setUserdata,TutorialOnOff_myp,setTutorialOnOff_myp]=useContext(UserContext)
   
   useEffect(() => {
     document.querySelector('html').style.scrollBehavior = 'auto'
     window.scroll({ top: 0 })
     document.querySelector('html').style.scrollBehavior = ''
     focusHandling('outline');
   }, [location.pathname]); // triggered on route change
   
    useEffect(() =>{
        //ログインログアウトが起きたときに呼ばれる
        //userに認証情報が入る、空の場合はログインしていない
       const unSub=auth.onAuthStateChanged ((user)=>{
           //ログインしていない場合は"/login"におくる
           user||props.history.push("/login")
            user||alert("この機能はログインが必要です。")
           return ()=>unSub()
       })
    },[uid])

    //portfolioのState
    const [totalAssets,setTotalAssets]=useState(0)
    const [totalprofit,setTotalProfit]=useState(0)
    const [totalrealizedprofit,setTotalRealizedProfit]=useState(0)

    //portfolioの変化を検知するstate
    const [handlePFchange,setHandlePFchange]=useState(0)

    const [portfolio, setPortfolio]=useState([])
    const [day_before_ratio,setDayBeforeRatio]=useState(0)
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
    //リスク最小化ポートフォリオとシャープレシオ最大化ポートフォリオstate
    const [risk_return_obj,setRisk_return_obj]=useState({
        "res_min_vola":0 ,
        "res_sharp_ratio": 0,
         "pfolio_vola":0 ,
         "pfolio_return": 0,
         "pfolio_historical_price": [{ttl:0,date:"2014-10-10"}],

    })
      
    useEffect(()=>{


        
        //guestが一瞬入っている
         console.log(uid)
        let data=[]
        let stock_price=[]
        let stock_list=[]  
        let now = new Date();   
        let Year = now.getFullYear();
        let Month = now.getMonth()+1;
        let Day = now.getDate();
        let to_date=`${Year}-${Month}-${Day}`
        //2021-6-28

        //１年前の日付
        let from_date=`${Year-1}-${Month}-${Day}`


         if(uid!="guest"){
        //firestore上の最新ポートフォリオデータを取得
         var docRef=db.collection('portfolio').doc(uid) 

         docRef.get()
         .then((doc)=>{
             //取得できたかどうかチェック
            if (doc.exists) {
                console.log('start')
                data=doc.data()
                
                return Promise.all(data.portfolio.map(async (item) => {
    
                    const stockAsync = (item) => new Promise((resolve) =>  {
                    
                    let url=`https://financialmodelingprep.com/api/v3/historical-price-full/${item.stock}?serietype=line&&from=${from_date}&to=${to_date}&apikey=${process.env.REACT_APP_FINANCIAL_MODELING_PREP}`
                    
                    axios.get(url).then((res)=>{
                        
                        console.log(res.data.historical)
                        //stock_priceに取得したデータを追加
                        stock_price.push(res.data.historical)
                        stock_list.push(item.stock)


                        const array=res.data.historical;
                        const nowprice=array[0]
                        console.log(nowprice["close"])
                        item.nowprice=nowprice["close"]
    
                        const price_before=array[1]
                        console.log(price_before["close"])
                        item.price_before=price_before["close"]
    
                        item.ttlprice=item.value*item.nowprice
                        item.ttlprice_before=item.value*item.price_before
                        console.log(item.value) 
                        console.log(item.ttlprice)  
                        resolve("ok")
                    })

                        
                        
                        } )
                    const asyncTaskA =await stockAsync(item)
                   
                  
                    }))
                
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                //取得できない場合の次の処理を止める
                return Promise.reject("No such document!");
            }
           
              
        })
        .then((res) => 
        {

        const funcNext =()=>{

            let total_assets=0
            let total_assets_before=0
            let total_getprice=0
            const tmp=data.portfolio
            console.log(tmp[0].ttlprice)
            console.log(data.portfolio)
            data.portfolio.forEach(function(item) {
                total_assets= total_assets+item.ttlprice
                total_assets_before=total_assets_before+item.ttlprice_before
                total_getprice=total_getprice+item.getprice*item.value
            });
            
            setTotalAssets(total_assets)
            setTotalProfit(total_assets-total_getprice)
            console.log(total_assets)
            setPortfolio(data.portfolio)
            setDayBeforeRatio((Math.round((total_assets/total_assets_before-1) * 100)  ))
            setPortfolio(data.portfolio)

            //リスクリターンの計算にバックエンドに株価とUID送信
            axios.post(`https://appfinance-8cbff.uc.r.appspot.com/portfolio/riskreturn`,{uid:uid,stock_price:stock_price,stock_list:stock_list})
            .then(
                function(response) {
            
            // {
            //     "res_min_vola": res_min_vola_list,
            //     "res_sharp_ratio": res_sharp_ratio_list,
            //     "pfolio_vola": pfolio_vola,
            //     "pfolio_return": pfolio_return,
            //     "pfolio_historical_price": sum_column,
            // }
                const res_data={
                    "res_min_vola":response.data.res_min_vola ,
                    "res_sharp_ratio": response.data.res_sharp_ratio,
                    "pfolio_vola":Math.round((response.data.pfolio_vola*100) ) ,
                    "pfolio_return": Math.round((response.data.pfolio_return*100) ),
                    "pfolio_historical_price": response.data.pfolio_historical_price,
        
                }
        
                setRisk_return_obj(res_data)

                db.collection("portfolio").doc(uid).set(
                {portfolio:data.portfolio}).then(() => {
                console.log("Document successfully written!");
                //portfolioデータ更新後にポートフォリオ詳細データを
                //計算するバックエンドにリクエスト
                axios.post(`https://appfinance-8cbff.uc.r.appspot.com/portfolio/details`,{uid:uid})
                    .then(console.log("portfolio_detail_dataisok"))
                

                })


                }
                
                )
                .catch(function(error) {
                    console.log(error.message)
                    
                })
          
                }
            
        funcNext()
    

    }).catch(function(error) {
        console.log(error.message)
        
    })
        }

      },[uid,handlePFchange])


useEffect(()=>{

//データ取得できたプロフィールを表示

 const followlist=[uid]
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
       //firestore上の最新取引履歴データを取得
        const transactions = [];


        db.collection("transaction").orderBy('timestamp','desc').where("UID", "in", followlist).limit(15)
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

               

            });




            setStock_transactions(sortArray);
         
                }

                
                )
                .catch(function(error) {
                    console.log(error.message)
                })



    })
  

      },[uid,,handlePFchange])

//実現損益の計算
useEffect(()=>{
    const transactions = [];
    db.collection("transaction").where("UID", "==",uid )
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
        setTotalRealizedProfit(totalrealizedprofit_tmp)
    })
},[uid,handlePFchange])
        


  



    return (
        <>

        
         {/* Sidebar */}
         <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

         {/* Content area */}
         <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

         {/*  Site header */}
         <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div>
          
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">    
           
            <WelcomeBanner_follow contents={{
                title:"追加ボタンよりポートフォリオ登録できます。",
                contents:"ポートフォリオ登録すると他ユーザーと比較できます。",
                link:"/otherportfolio",
            buttontext:"ポートフォリオ比較へ"}}/>

            <Modal_buy portfolio={portfolio} setHandlePFchange={setHandlePFchange} stock_transactions={stock_transactions}  />
            <Modal_sell portfolio={portfolio} setHandlePFchange={setHandlePFchange} stock_transactions={stock_transactions} />
        {/* Cards */}
        
        
        <div className="grid grid-cols-12 gap-6">
            <ShareBt url={'https://appfinance-8cbff.web.app/profile/'+uid}/>
            <TotalAssets
              totalAssets={totalAssets} 
              day_before_ratio={day_before_ratio}
              risk_return_obj={risk_return_obj} 
              totalprofit={totalprofit}
              totalrealizedprofit={totalrealizedprofit}
              />

            <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-gray-200">
                <div className="px-5 pt-5">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">資産内訳</h2>
                <Portfolio_pie portfolio={portfolio} />
            </div>
            </div>
            
            <AssetsTable portfolio={portfolio}/>

            <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-gray-200">
                <div className="px-5 pt-5">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">実績価格推移(対S&P500)</h2>
                <Graph historical_data={risk_return_obj.pfolio_historical_price}/>
            </div>
            </div>

            <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-gray-200">
                <div className="px-5 pt-5">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">リスクリターン分析</h2>
                <Risk_ratio_pie portfolio={portfolio}res_min_vola={risk_return_obj.res_min_vola} res_sharp_ratio={risk_return_obj.res_sharp_ratio} />
            </div>
            </div>

            <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-gray-200">
                <div className="px-5 pt-5">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">ポートフォリオの配当利回り</h2>
                <Dividends portfolio={portfolio}totalAssets={totalAssets}/>
            </div>
            </div>
            
        </div>

            <WelcomeBanner_follow contents={{
                title:"フォローユーザーの取引",
                contents:"ユーザーをフォローで最近の取引をマイページから見ることができます。2~3人フォローがおすすめ、最大10人までフォローできます。",
                link:"/otherportfolio",
            buttontext:"ユーザーを探す"}}/>
           
        <div className="grid grid-cols-12 gap-6">
            <Transaction stock_transactions={stock_transactions} private_mode={true} />
        </div>
            

    
        
        
        </div>
        </div>
        
        </div>
        </>
        )
}