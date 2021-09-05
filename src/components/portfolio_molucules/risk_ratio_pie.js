import { Box } from '@chakra-ui/layout';
import React,{useState} from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer,Tooltip,Legend } from 'recharts';
import { Radio, RadioGroup,Stack } from "@chakra-ui/react"
import {Information} from '../atoms/information'

export const Risk_ratio_pie=React.memo((props)=> {
    const {portfolio,res_min_vola,res_sharp_ratio} = props;
    const [value, setValue] = useState("1")
    let assetprice=0
    portfolio.map((e)=>{
      assetprice=e.ttlprice+assetprice
    })
    portfolio.map((e)=>{
      e.ttlprice=Math.round(e.ttlprice/assetprice*100)/100
    })
    try{
      res_min_vola.map((e)=>{
        e.value=Math.round(e.value*100)/100
      })

    }catch (error) {
      console.error(error);
      // expected output: ReferenceError: nonExistentFunction is not defined
      // Note - error messages will vary depending on browser
    }
    try{
      res_sharp_ratio.map((e)=>{
        e.value=Math.round(e.value*100)/100
      })

    }catch (error) {
      console.error(error);
      // expected output: ReferenceError: nonExistentFunction is not defined
      // Note - error messages will vary depending on browser
    }
    

    const COLORS = ['#FC600A', '#FB9902', '#FCCC1A','#B2D732','#66B032','#347C98','#4424D6','#8601AF','#C21460'];

    
  
    return (
      <Box width="100%" height="250px" borderWidth="1px" borderRadius="lg" overflow="hidden">
          <RadioGroup onChange={setValue} value={value}>
            <Stack direction="row">
              <Radio value="1">リスク最小</Radio>
              <Radio value="2">シャープレシオ最大</Radio>
            </Stack>
            <Information  title={"内側:現状の構成比率"} contents={"外側:シャープレシオ最大（リスクに対してリターンが最大）もしくはリスク最小になる構成比率"}/>
      </RadioGroup>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart >
          <Pie data={portfolio} dataKey="ttlprice" cx="50%" cy="50%" outerRadius={40} fill="#8884d8"   nameKey="stock">
          {portfolio!=null &&portfolio.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie> 
          <Pie data={value==1?res_min_vola:res_sharp_ratio} dataKey="value" cx="50%" cy="50%" innerRadius={45} outerRadius={70} fill="#82ca9d"  nameKey="stock">
          {portfolio!=null &&portfolio.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip/>
          <Legend verticalAlign="top" height={5}/>
        </PieChart>
      </ResponsiveContainer>
      </Box>
    );
  
})
