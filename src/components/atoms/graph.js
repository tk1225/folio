import React, {useState}from 'react'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
  } from 'recharts';
import { Box } from "@chakra-ui/react"

export const Graph=React.memo((props)=>{
  const {bs_data,pl_data} = props;
    const data = bs_data
;

    return (
      <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-gray-200">
      <div className="px-5 pt-5">
        <header className="text-xs uppercase text-gray-400 bg-gray-50 rounded-sm font-semibold p-2">指標推移</header>
      <Box width="100%" height="260px" borderWidth="1px" borderRadius="lg" overflow="hidden">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart width={500} height={300} data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" padding={{ left: 30, right: 30 }} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="inventory" stroke="#8884d8" activeDot={{ r: 8 }} />
                  
              </LineChart>
            </ResponsiveContainer>
      </Box>
      </div>
      </div>

     
        )
})