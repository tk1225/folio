import React, {useState}from 'react'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer  } from 'recharts';
import { Box } from "@chakra-ui/react"

export const BS=React.memo((props)=>{
    const {setActiveItem,bs_data} = props;
    const data = [
        {
          name: '貸借対照表',
          流動負債: bs_data[0].totalCurrentLiabilities,
          固定負債: bs_data[0].totalNonCurrentLiabilities,
          利益剰余金:bs_data[0].retainedEarnings,
          その他純資産: bs_data[0].totalStockholdersEquity-bs_data[0].retainedEarnings,

          現預金:bs_data[0].cashAndCashEquivalents,
          その他流動資産: bs_data[0].totalCurrentAssets-bs_data[0].cashAndCashEquivalents,
          有形固定資産: bs_data[0].propertyPlantEquipmentNet,
          その他固定資産: bs_data[0].totalNonCurrentAssets-bs_data[0].propertyPlantEquipmentNet,
        } 
      ];
    return (
        
            <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-gray-200">
            <div className="px-5 pt-5">
              <header className="text-xs uppercase text-gray-400 bg-gray-50 rounded-sm font-semibold p-2">貸借対照表</header>
              <Box width="100%" height="250px" borderWidth="1px" borderRadius="lg" overflow="hidden">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
              width={500}
              height={300}
              data={data}
              margin={{
                  top: 20,
                  right: 20,
                  left: 20,
                  bottom: 5,
              }}
              barGap={0}
          
              >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
            
              
              <Legend />
              <Bar dataKey="現預金" stackId="a" fill="#FEFE33" onClick={(d,i)=>{setActiveItem("現預金")}}/>
              <Bar dataKey="その他流動資産" stackId="a" fill="#B2D732" onClick={(d,i)=>{setActiveItem("その他流動資産")}} />
              <Bar dataKey="有形固定資産" stackId="a" fill="#66B032" onClick={(d,i)=>{setActiveItem("有形固定資産")}}/>
              <Bar dataKey="その他固定資産" stackId="a" fill="#347C98" onClick={(d,i)=>{setActiveItem("その他固定資産")}}/>
              
              <Bar dataKey="流動負債" stackId="b" fill="#FE2712" onClick={(d,i)=>{setActiveItem("流動負債")}} />
              <Bar dataKey="固定負債" stackId="b" fill="#FC600A" onClick={(d,i)=>{setActiveItem("固定負債")}}/>
              <Bar dataKey="利益剰余金" stackId="b" fill="#FB9902" onClick={(d,i)=>{setActiveItem("利益剰余金")}}/>
              <Bar dataKey="その他純資産" stackId="b" fill="#FCCC1A" onClick={(d,i)=>{setActiveItem("その他純資産")}}/>

              
              
              </BarChart>
            </ResponsiveContainer>
            </Box>
        
          </div>
          </div>
        
        )
})