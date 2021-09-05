import React from 'react';
import { QuestionOutlineIcon} from '@chakra-ui/icons'
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverArrow,
    PopoverCloseButton,
  } from "@chakra-ui/react"



export const Information=(props)=> {

  const {title,contents}=props
  return (
    <>
    
    <Popover>
        <PopoverTrigger>
            <QuestionOutlineIcon/>
        </PopoverTrigger>

        <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>{title}</PopoverHeader>
            <PopoverBody>{contents}</PopoverBody>
        </PopoverContent>
    </Popover>
    </>
  );
}