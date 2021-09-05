import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {PieChart,Pie ,Tooltip,ResponsiveContainer,Legend,Cell} from 'recharts';
import { Box } from "@chakra-ui/react"

export const Dividends=React.memo((props)=>{
    const {portfolio,totalAssets} = props;
    const [div, setDiv]=useState([])
    const [ttl_div, setTtldiv]=useState(0)
    
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

    useEffect(() => {
      let  div_dic=[]
      let ttl_div_tmp=0
      
      console.log(portfolio)
      const getdivasync=()=>{
      return Promise.all(
      portfolio.map(async(item)=>{
        console.log(item.stock)

        
        const divAsync=(item)=>new Promise((resolve) =>  {

        axios.post(`https://appfinance-8cbff.uc.r.appspot.com/portfolio/dividends`,{stock: item.stock})
                .then(
                    function(response) {

                      try {
                        console.log(response.data)
                        //response.dataを少数第3位で四捨五入
                        response.data=Math.round((response.data*100) )/100
                        console.log(response.data)
                        ttl_div_tmp=ttl_div_tmp+response.data*item.value
                        console.log(ttl_div)
                        

                        div_dic.push({"dividends": response.data*item.value,"stock": item.stock})
                      } catch (error) {
                        console.error(error);
                        
                      }       
               
              

               resolve("ok")
               
               
                })   
                .catch(function(error) {
                    console.log(error.message)
                })
              })

        const asyncTaskA =await divAsync(item)
        console.log(asyncTaskA)              

            
                
                } ))

      }
      getdivasync()
      .then((res)=>{
        console.log(res)
        console.log(ttl_div)
        console.log(div_dic)
        console.log(totalAssets)
        setTtldiv(ttl_div_tmp)
        
        setDiv(div_dic)
      })

    
    
    },[portfolio])
       
    return (
      <Box width="100%" height="150px" borderWidth="1px" borderRadius="lg" overflow="hidden">
            ポートフォリオ配当{Math.round(ttl_div/totalAssets*100)}%
            <ResponsiveContainer width="100%" height="100%">
             
            <PieChart >
            
               <Pie
            data={div!=[] &&div}
            dataKey="dividends"
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={50}
            fill="#8884d8"
           
            onClick={onPieClick}
            nameKey="stock"
          >
            {div!=[] &&div.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
            <Tooltip/>
            <Legend/>
            </PieChart>
            </ResponsiveContainer>
            
        </Box>
    );
  })