
import React,{useState,useEffect} from 'react';
import { Box ,Flex,Spacer} from "@chakra-ui/react"
import { Badge ,Image} from "@chakra-ui/react"
import {
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    StatGroup,
  } from "@chakra-ui/react"
  import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
  } from "@chakra-ui/react"
import {Information} from "./information"
import LineChart from '../../charts/LineChart01';
import { tailwindConfig, hexToRGB } from '../../utils/Utils';


export const Company_card =React.memo((props)=>{
    const {profile_data,stockprice}=props

    const property = {
      imageUrl:profile_data[0].image,  
      title: profile_data[0].companyName,
      price: profile_data[0].price,
      industry: profile_data[0].sector,
      changes:profile_data[0].changes,
      mktCap:profile_data[0].mktCap,
      beta:profile_data[0].beta
      
    }

    const [chartData, setchartData] = useState(
            {
                labels: ["2011-11-11","2011-12-11","2012-01-11"],
                datasets: [
                  // Indigo line
                  {
                    data: [10,5,10],
                    fill: true,
                    backgroundColor: `rgba(${hexToRGB(tailwindConfig().theme.colors.blue[500])}, 0.08)`,
                    borderColor: tailwindConfig().theme.colors.indigo[500],
                    borderWidth: 2,
                    tension: 0,
                    pointRadius: 0,
                    pointHoverRadius: 3,
                    pointBackgroundColor: tailwindConfig().theme.colors.indigo[500],
                    clip: 20,
                  }
                ],
              }
            );


    
    useEffect(() =>{
        let label_list=[]
        let data_list=[]
          stockprice.map((e)=>{
              label_list.push(e.date)
              data_list.push(e.close) 
              
          })
  
          setchartData({
            labels: label_list,
            datasets: [
              // Indigo line
              {
                data: data_list,
                fill: true,
                backgroundColor: `rgba(${hexToRGB(tailwindConfig().theme.colors.blue[500])}, 0.08)`,
                borderColor: tailwindConfig().theme.colors.indigo[500],
                borderWidth: 2,
                tension: 0,
                pointRadius: 0,
                pointHoverRadius: 3,
                pointBackgroundColor: tailwindConfig().theme.colors.indigo[500],
                clip: 20,
              }
            ],
          })

    },[stockprice])
   

  
    
    
    return (
      <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-gray-200">
      <div className="px-5 pt-5">
      <header className="text-xs uppercase text-gray-400 bg-gray-50 rounded-sm font-semibold p-2">????????????</header>
        <Box >
          <Box alignItems="baseline">        
          <Flex>
                <Image 
                boxSize="100px"
                objectFit="contain" 
                src={property.imageUrl}/>
                <Spacer />
                <Box
                
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                isTruncated
            >
                    {property.title}
                    <Box>
                        <Stat>
                                    <StatLabel>??????</StatLabel>
                                    <StatNumber>{property.price}</StatNumber>
                                    <StatHelpText>
                                    <StatArrow type="decrease" />
                                    {property.changes}%
                                    </StatHelpText>
                        </Stat>
                    </Box>
                </Box>

                
                

          </Flex>

          <Table variant="simple"  size="sm">
                        
                       
                        <Tbody>
                            <Tr>
                            <Td>??????</Td>
                            
                            <Td>  {property.industry}</Td>
                            </Tr>
                            <Tr>
                            <Td>????????????</Td>
                        
                            <Td isNumeric>{Math.round(property.mktCap/100000000)}???$</Td>
                            </Tr>
                            <Tr>
                            <Td>??</Td>
                           
                            <Td isNumeric>{Math.round(property.beta*100)/100} </Td>
                            <Td ><Information title={"??"} contents={"??(?????????)????????????????????????????????????????????????????????????????????????????????????????????0.5???????????????????????????10%???????????????5%??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????"}/></Td>
                            </Tr>
                        </Tbody>
                     
            </Table>
          
                {/* Chart built with Chart.js 3 */}
            <div className="flex-grow">
                <LineChart data={chartData} width={189} height={128} />
            </div>
       
       
       
       
        </Box>
  

        </Box>
      </div>
      </div>
    )
  })