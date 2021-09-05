import React,{useState} from 'react'
import { Box ,useDisclosure,Button,Modal,ModalOverlay,ModalContent,CloseButton,Select,Avatar} from "@chakra-ui/react"
import {Radarcharts} from './radarcharts'

import {db} from '../../firebase'

import { ResponsiveScatterPlotCanvas } from '@nivo/scatterplot'
import {Modal_portfolio} from './modal_portfolio'
import { Portfolio_pie } from './portfolio_pie'
import { NavLink, useLocation } from 'react-router-dom';


export const PortfolioScatter = (props) => {

    const {portfolio_data,myportfolio_data,followportfolio_data,ActivePortfolio,setActivePortfolio,activeprofile,setActiveProfile} = props;
    
    const [xaxis,setXaxis]= useState("pfolio_vola")
    const [yaxis,setYaxis]= useState("pfolio_return")
    const [zaxis,setZaxis]= useState("followers")
    //selectorのインプットを検知し見た目に反映
    const handleChangeXaxis = (e) => setXaxis(e.target.value)
    const handleChangeYaxis = (e) => setYaxis(e.target.value)
    const handleChangeZaxis = (e) => setZaxis(e.target.value)

    //modal用
    const { isOpen, onOpen, onClose } = useDisclosure()
     //計算で×比率を登録
    const ratio_axis_dict={
        "pfolio_vola":100,
        "pfolio_return":100,
        "followers":1,
        "follows":1,
        "returnOnEquity":100,
        "dividendYield":100,
        "priceBookValueRatio":1,
        "priceEarningsRatio":1,
        "fiveYNetIncomeGrowthPerShare":100,
        "fiveYRevenueGrowthPerShare":100,
    }
//軸表記を英語から日本語に変換
    const name_axis_dict={
        "pfolio_vola":"リスク",
        "pfolio_return":"リターン",
        "followers":"フォロワー数",
        "follows":"フォロー数",
        "returnOnEquity":"ROE",
        "dividendYield":"配当利回り",
        "priceBookValueRatio":"PBR",
        "priceEarningsRatio":"PER",
        "fiveYNetIncomeGrowthPerShare":"5年EPS成長率",
        "fiveYRevenueGrowthPerShare":"5年売上成長率",
    }

//デフォルトデータ
       const data=[ 
          
           {
          "id": "ユーザーポートフォリオ",
          "data": [
            {
              "x": 39,
              "y": 58
            },
            {
              "x": 40,
              "y": 89
            },
            {
              "x": 49,
              "y": 87
            }
            ]
        },
         {
          "id": "自分のポートフォリオ",
          "data": [
            {
              "x": 39,
              "y": 58
            },
            {
              "x": 40,
              "y": 89
            },
            {
              "x": 49,
              "y": 87
            }
            
            ]
        },
          {
          "id": "フォローポートフォリオ",
          "data": [
            {
              "x": 39,
              "y": 58
            },
            {
              "x": 40,
              "y": 89
            },
            {
              "x": 49,
              "y": 87
            }
            ]
        },
        
        ]

//散布図上のバブルをクリックした時の関数
const handleClickScatter=(d,i)=>{
    try {
    console.log(d.data.uid)
    const found = portfolio_data.find(element => element.UID==d.data.uid);
    console.log(found)
    if (found!=null){
        setActiveProfile(found)
        //firestore上の最新ポートフォリオデータを取得
        var docRef=db.collection('portfolio').doc(d.data.uid)

        docRef.get()
        .then((doc)=>{
            //取得できたかどうかチェック
           if (doc.exists) {
             console.log(doc.data())
             setActivePortfolio(doc.data().portfolio)
             onOpen()
           }
          })

        }
    
    
    }catch (error) {
                console.error(error);
            }
}
   
    const prep_portfolio_data=(i)=>{
        const tmp_list=[]
        i.map((e)=>{
           
            try {
                console.log(isNaN(e[xaxis]))
                if(isNaN(e[xaxis])||isNaN(e[yaxis])){
                    //どちらかが少なくともNaN
                }else{
              
                  const tmp={"x": Number(e[xaxis]*ratio_axis_dict[xaxis]),"y": Number(e[yaxis]*ratio_axis_dict[yaxis]),"uid":e["UID"],"iconimg":e["iconimg"],"username":e["username"]}
                  tmp_list.push(tmp)

                } 

            } catch (error) {
                console.error(error);
            }
        })
        
        return tmp_list
    }

    
    

    const data_list=prep_portfolio_data(portfolio_data)
    console.log(portfolio_data)
    const mydata_list=prep_portfolio_data(myportfolio_data)
    const followdata_list=prep_portfolio_data(followportfolio_data)

    data[0].data=data_list
    data[1].data=mydata_list
    data[2].data=followdata_list
    

    return (
        <>
        <Box width="100%" height="480px" borderWidth="1px"  overflow="hidden">
    <ResponsiveScatterPlotCanvas
        data={data}
        margin={{ top: 10, right: 10, bottom: 110, left: 50 }}
        xScale={{ type: 'linear', min: 0, max: 'auto' }}
        xFormat={function(e){return Math.round(e)}}
        yScale={{ type: 'linear', min: 0, max: 'auto' }}
        yFormat={function(e){return Math.round(e)}}
        nodeSize={5}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 0.1,
            tickPadding: 5,
            tickRotation: 0,
            legend: name_axis_dict[xaxis],
            legendPosition: 'middle',
            legendOffset: 30
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 0.01,
            tickPadding: 5,
            tickRotation: 0,
            legend: name_axis_dict[yaxis],
            legendPosition: 'middle',
            legendOffset: -35
        }}
        legends={[
            {
                anchor: 'bottom-left',
                direction: 'column',
                justify: false,
                translateX: -35,
                translateY: 95,
                itemWidth: 150,
                itemHeight: 12,
                itemsSpacing:5,
                itemDirection: 'left-to-right',
                symbolSize: 12,
                symbolShape: 'rect',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}

        tooltip={({ node }) =>
          (
         
                <strong>
                  {console.log(node)}
                {node.data.username}

                </strong>
        )}
        nodeSize={14}
        enableGridX={false}
        enableGridY={false}
        onClick={handleClickScatter }
    />

         </Box>


        <Select  
        bg="tomato"
        borderColor="tomato"
        
        onChange={handleChangeXaxis}
        >
          <option value="pfolio_vola">年間リスク</option>
          <option value="pfolio_return">年間実績リターン</option>
          <option value="returnOnEquity">収益性(ROE)</option>
          <option value="dividendYield">配当利回り</option>
          <option value="priceBookValueRatio">割安性(PBR)</option>
          <option value="priceEarningsRatio">割安性(PER)</option>
          <option value="fiveYNetIncomeGrowthPerShare">成長性(5年EPS成長率)</option>
          <option value="fiveYRevenueGrowthPerShare">成長性(5年売上成長率)</option>
          <option value="followers">人気度(フォロワー数)</option>
        </Select>
        
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent width="80%">
            
            <Box borderRadius="md">
              
                <Button colorScheme="teal" variant="solid" onClick={onClose}>
                  グラフに戻る
                </Button>


                <Portfolio_pie portfolio={ActivePortfolio}/>

                <Radarcharts activeprofile={activeprofile} myportfolio_data={myportfolio_data}/>
               
                <Button  colorScheme="blue" >
                  <NavLink exact to={`/profile/${activeprofile.UID}`} className={`block text-blue-200 hover:text-white transition duration-150 ${'hover:text-blue-200'}`}>
                        <div className="flex flex-grow">
                          <svg className="flex-shrink-0 h-6 w-6 mr-3" viewBox="0 0 24 24">
                            <circle className={`fill-current text-gray-400 ${ 'text-indigo-300'}`} cx="18.5" cy="5.5" r="4.5" />
                            <circle className={`fill-current text-gray-600 ${ 'text-indigo-500'}`} cx="5.5" cy="5.5" r="4.5" />
                            <circle className={`fill-current text-gray-600 ${ 'text-indigo-500'}`} cx="18.5" cy="18.5" r="4.5" />
                            <circle className={`fill-current text-gray-400 ${ 'text-indigo-300'}`} cx="5.5" cy="18.5" r="4.5" />
                          </svg>
                          <span className="text-sm font-medium">投資家プロフィールを見る</span>
                        </div>
                  </NavLink>
                </Button>
            </Box>
          </ModalContent>
        </Modal>

     </>
    )
}