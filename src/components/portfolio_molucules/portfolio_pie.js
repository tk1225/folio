import React from 'react'
import {PieChart,Pie ,Tooltip,ResponsiveContainer,Legend,Cell} from 'recharts';
import { Box } from "@chakra-ui/react"
import RatioTable from '../dashboard_components/dashboard/RatioTable'


export const Portfolio_pie=React.memo((props)=>{
    //propsからportfolioのStateとそれを更新する関数を生成
    const {portfolio} = props;
    const onPieClick=(e)=>{
        console.log(e)
    }
    const COLORS = ['#FC600A', '#FB9902', '#FCCC1A','#B2D732','#66B032','#347C98','#4424D6','#8601AF','#C21460'];


    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );}

    return (

      <div className="col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-gray-200 overflow-y-scroll h-72">
              
        <Box width="100%"  borderWidth="1px" height="300px"borderRadius="lg">
            <ResponsiveContainer width="100%" height="50%">
            <PieChart >
            
               <Pie
            data={portfolio!=null &&portfolio}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={50}
            fill="#8884d8"
            dataKey="ttlprice"
            onClick={onPieClick}
            nameKey="stock"
            
          >
            {portfolio!=null &&portfolio.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
            <Tooltip/>
            <Legend/>
            </PieChart>
            </ResponsiveContainer>
            
        
        
        <RatioTable portfolio={portfolio}/>

        </Box>

      </div>
        )
})

