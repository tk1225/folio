import React from 'react'
import { Box } from "@chakra-ui/react"
import { Text ,StatHelpText,StatArrow,Stat,Avatar} from "@chakra-ui/react"
import { Wrap, WrapItem } from "@chakra-ui/react"
import {
  Table,
  Tbody,
  Tr,
  Td,
  Flex,
  Spacer,
  Image,
  Badge
} from "@chakra-ui/react"

import {  EditIcon ,StarIcon} from '@chakra-ui/icons'
import {Stock_list} from '../atoms/stock_list'

export const AssetsCards=React.memo((props)=>{

  const registeredTicker =  Stock_list()
  const {portfolio} = props;

   
    return (
     <>
     
      <Box width="100%" height="100%" mb="40px" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Wrap spacing="5px" width="100%" justify="center"pt="5px" >
      {portfolio.map(function(e,i)
      {
        //利益計算
        e.profit=e.nowprice-e.getprice
        
        const found = registeredTicker.find(element => element.ticker==e.stock);
        console.log(found)

        return (
          <WrapItem width="300px" key={e.stock+"id"}>
           
         
      <Box width="100%" height="230px" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image src={`https://financialmodelingprep.com/image-stock/${e.stock}.png`} alt={e.stock} p={2} />

      <Box >
        <Box d="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            {e.stock}
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {e.value} 株 &bull; 購入単価{e.getprice} 
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {found.name}
        </Box>

        <Box>
        {e.profit>0 && <StatArrow type="increase" />}
                        {e.profit<0 && <StatArrow type="decrease" />}
                        
                        {Math.abs(Math.round(e.profit*e.value))}
          <Box as="span" color="gray.600" fontSize="sm">
            / USD
          </Box>
        </Box>

        <Box d="flex" mt="2" alignItems="center">
          
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
          <Stat>
                        <StatHelpText>
                        
                    
                        {(e.nowprice-e.price_before)>0 && <StatArrow type="increase" />}
                        {(e.nowprice-e.price_before)<0 && <StatArrow type="decrease" />}
                        
                        {e.nowprice}
                        </StatHelpText>
                      </Stat>
          </Box>
        </Box>
      </Box>
    </Box>
            </WrapItem>


            


        )
      })}
      </Wrap>
            
            
      </Box>

     
     </>
     
    );
  })