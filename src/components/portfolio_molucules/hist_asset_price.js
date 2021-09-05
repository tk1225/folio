import React,{useEffect,useState} from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Brush,LineChart,ReferenceLine,Legend,Line} from 'recharts';
import { Box } from "@chakra-ui/react"
import axios from 'axios'



  
  export const Graph=React.memo((props)=>{
      const {historical_data} = props;

      const [graphdata,setGraphData]= useState(historical_data)

      let now = new Date();   
      let Year = now.getFullYear();
      let Month = now.getMonth()+1;
      let Day = now.getDate();
      let to_date=`${Year}-${Month}-${Day}`
      //１年前の日付
      let from_date=`${Year-1}-${Month}-${Day}`

      useEffect(()=>{
                  let url=`https://financialmodelingprep.com/api/v3/historical-price-full/index/^GSPC?serietype=line&&from=${from_date}&to=${to_date}&apikey=${process.env.REACT_APP_FINANCIAL_MODELING_PREP}`
                    
                  axios.get(url).then((res)=>{
                  console.log(res.data.historical)
                  const sp_data=res.data.historical
                  
                  //sp_dataの１年前データ
                  const sp500_standard_data=sp_data.slice(-1)[0].close
                  //1年前のデータ
                  const standard_data=historical_data[0].ttl
                  

                  //historical_dataを加工
                  const tmp=historical_data.concat()

                  tmp.map((e)=>{
                
                    let targetdata=sp_data.find((v)=>v.date===e.date)
                    
                    try {
                    
                      e.ttl=e.ttl/standard_data
                      e.indexttl=targetdata["close"]/sp500_standard_data
                      //例外エラーが発生するかもしれない処理
                  } catch(e) {
                      //例外エラーが起きた時に実行する処理
                  }
                    //e.indexttl=targetdata.close/sp500_standard_data
                    console.log(e)

                  })
                  
                  setGraphData(tmp)

                     })}
                   ,[historical_data])
      

      return (
        <>
        <Box width="100%" height="250px" borderWidth="1px" borderRadius="lg" overflow="hidden">
          <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={340}
          height={400}
          data={graphdata}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
          
        >
          <XAxis dataKey={"date"} />
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="top" height={36}/>
          <Brush/>
          <Area type="monotone" name="ポートフォリオ" dataKey="ttl" stroke="#f7931a" fill="#f7931a" />
          <Area type="monotone" name="S&P500" dataKey="indexttl" stroke="#8884d8" fill="white" />
        
        </AreaChart>
      </ResponsiveContainer>
           
            
      </Box>   
      

      
      </>

       
      );
    })
  

  