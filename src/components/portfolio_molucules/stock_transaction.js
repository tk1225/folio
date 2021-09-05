import React from 'react'
import { Box } from "@chakra-ui/react"
import { Avatar, Flex,Text,Badge ,StatHelpText,StatArrow,Stat} from "@chakra-ui/react"


export const Stock_transaction=React.memo((props)=>{
    const { stock_transactions} = props;

    
    return (
     <>
      <Box width="100%" height="100%" mb="40px" borderWidth="1px" borderRadius="lg" overflow="hidden">
      {stock_transactions.map(function(e){
        return (
          <Box key={e.timestanp} width="100%" height="60px" borderWidth="1px" borderRadius="lg" overflow="hidden">
          <Flex p="5px">
              <Avatar src={e.photoUrl} />
              <Box ml="3">
                
                <Text fontWeight="bold">
                  {e.displayName}
                 
                  
                </Text>
               
                
                <Text fontSize="sm">
                                
                
                {e.timestamp}
                {(e.buy==1) && <Badge colorScheme="green">購入</Badge>}
                {(e.buy==0) && <Badge colorScheme="red">売却</Badge>}
                </Text>

              </Box>
              <Box ml="3">
                <Text fontWeight="bold">
                  {e.stock}
                </Text>

                <Text fontSize="sm">{e.value}</Text>

              </Box>
              <Box ml="3">
                <Stat>
                  <StatHelpText>

                  {e.profit>0 && <StatArrow type="increase" />}
                  {e.profit<0 && <StatArrow type="decrease" />}
                  
                  {e.profit!=0&&Math.abs(e.profit)}

                  </StatHelpText>
                </Stat>
              </Box>
            </Flex>
            </Box>


        )
      })}
            
            
      </Box>
     </>
     
    );
  })