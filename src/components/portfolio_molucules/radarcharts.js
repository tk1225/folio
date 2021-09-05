import React ,{useState,useEffect}from 'react'
import { Box } from "@chakra-ui/react"
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";

export const Radarcharts=React.memo((props)=>{
    //propsからportfolioのStateとそれを更新する関数を生成
    const {activeprofile,myportfolio_data} = props;
    console.log(activeprofile)
    console.log(myportfolio_data[0])
    console.log(typeof activeprofile.fiveYRevenueGrowthPerShare)
    const [radardata,setRadarData]= useState([])

    useEffect(() => {
      console.log(activeprofile)
      //activeprofileのデータを５段階評価する
      let valuation={
        "returnOnEquity":1,
        "priceEarningsRatio":1,
        "fiveYRevenueGrowthPerShare":1,
        "pfolio_return":1,
        "pfolio_vola":1}

      let myvaluation={
        "returnOnEquity":1,
        "priceEarningsRatio":1,
        "fiveYRevenueGrowthPerShare":1,
        "pfolio_return":1,
        "pfolio_vola":1}
     
      const standard_dict={
        "returnOnEquity":[0.3,0.05,-0.1,-0.3],
        "priceEarningsRatio":[10,15,20,25],//マイナス除く
        "fiveYRevenueGrowthPerShare": [1,0.5,0,-0.5],
        "pfolio_return":[1,0.5,0,-0.5],
        "pfolio_vola":[1,0.5,0,-0.5],
      
      }
      const name_list=["returnOnEquity","priceEarningsRatio","fiveYRevenueGrowthPerShare","pfolio_return","pfolio_vola"]
      console.log(standard_dict["returnOnEquity"])

    //activeprofileを評価
     try {
      
      for (let i in name_list) {

        let tmp=name_list[i]
        console.log(i)
        let valarray=standard_dict[tmp]
        console.log(valarray)

        if(activeprofile[tmp]> valarray[0]){
          valuation[tmp]=5
        }else if(activeprofile[tmp]>valarray[1]){
          valuation[tmp]=4
        }else if(activeprofile[tmp]>valarray[2]){
          valuation[tmp]=3
        }else if(activeprofile[tmp]>valarray[3]){
          valuation[tmp]=2
        }
      }
      console.log(valuation)
    } catch (error) {
      console.error(error);
      // expected output: ReferenceError: nonExistentFunction is not defined
      // Note - error messages will vary depending on browser
    }

    try {
      
      for (let i in name_list) {

        let tmp=name_list[i]
        console.log(i)
        let valarray=standard_dict[tmp]
        console.log(valarray)

        if(myportfolio_data[0][tmp]> valarray[0]){
          myvaluation[tmp]=5
        }else if(myportfolio_data[0][tmp]>valarray[1]){
          myvaluation[tmp]=4
        }else if(myportfolio_data[0][tmp]>valarray[2]){
          myvaluation[tmp]=3
        }else if(myportfolio_data[0][tmp]>valarray[3]){
          myvaluation[tmp]=2
        }
      }
      console.log(myvaluation)
    } catch (error) {
      console.error(error);
      // expected output: ReferenceError: nonExistentFunction is not defined
      // Note - error messages will vary depending on browser
    }


    const tmp_data=[
      {
        subject: "成長性(5年売上)",
        A: Number(valuation.fiveYRevenueGrowthPerShare),
        B: Number(myvaluation.fiveYRevenueGrowthPerShare),
     
      fullMark: 3,
        
      },
      {
        subject: "収益性(ROE)",
        A: Number(valuation.returnOnEquity),
       
        B: Number(myvaluation.returnOnEquity),
        
        fullMark: 3,
      },
      {
        subject: "割安性(PER)",
        A: Number(valuation.priceEarningsRatio),
        B: Number(myvaluation.priceEarningsRatio),
      
        fullMark: 3,
      },
      {
        subject: "年間リターン",
        A: valuation.pfolio_return,
        B: myvaluation.pfolio_return,
    
        fullMark: 3,
        
      },
      {
        subject: "年間リスク",
       A: valuation.pfolio_vola,
       B: myvaluation.pfolio_vola,
    
       fullMark: 3
      },
      
    ]
    setRadarData(tmp_data)}
    ,[activeprofile])
   

    return (

      <div className="col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-gray-200 ">
              <header className="px-5 py-4 border-b border-gray-100">
                  <h2 className="font-semibold text-gray-800">投資戦略</h2>
              </header>
        <Box width="100%"  borderWidth="1px" height="200px"borderRadius="lg">
            <ResponsiveContainer width="100%" height="100%">
           
            
                <RadarChart
                  
                    outerRadius={50}
                    width={150}
                    height={200}
                    data={radardata}
                  >
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 5]} />
                   
                    <Radar
                      name={activeprofile.username}
                      dataKey="A"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.6}
                    />
                    <Radar name={myportfolio_data[0].username} dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                    <Legend />
                  </RadarChart>
                

            </ResponsiveContainer>
            
        
        
       

        </Box>

      </div>
        )
})

