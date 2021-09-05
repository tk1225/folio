import React from 'react'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box } from "@chakra-ui/react"

export const PL=React.memo((props)=>{
    const {setActiveItem,pl_data} = props;
    const data = [
        {
          name: '損益計算書',
          売上: pl_data[0].revenue,
          売上原価: pl_data[0].costOfRevenue,
          販管費:pl_data[0].revenue-pl_data[0].costOfRevenue-pl_data[0].operatingIncome,
          営業利益: pl_data[0].operatingIncome,

        }
    
      ];
  

    return (
      <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-gray-200">
      <div className="px-5 pt-5">
        <header className="text-xs uppercase text-gray-400 bg-gray-50 rounded-sm font-semibold p-2">損益計算書</header>
        <Box width="100%" height="260px" borderWidth="1px" borderRadius="lg" overflow="hidden">
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
              <Bar dataKey="営業利益" stackId="a" fill="#C21460" onClick={(d,i)=>{setActiveItem("営業利益")}} />
              <Bar dataKey="販管費" stackId="a" fill="#8601AF" onClick={(d,i)=>{setActiveItem("販管費")}} />
              <Bar dataKey="売上原価" stackId="a" fill="#4424D6" onClick={(d,i)=>{setActiveItem("売上原価")}}/>
              <Bar dataKey="売上" fill="#0247FE" onClick={(d,i)=>{setActiveItem("売上")}} />
              
              </BarChart>
            </ResponsiveContainer>
        </Box>
        </div>
        </div>
        )
})