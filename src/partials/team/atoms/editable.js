import { Editable, EditableInput, EditablePreview,ButtonGroup,IconButton,Flex } from "@chakra-ui/react"
import { CheckIcon, CloseIcon,EditIcon } from '@chakra-ui/icons'
import React,{useState,useEffect} from 'react'
import { TrainOutlined } from "@material-ui/icons"
import {auth} from '../../../firebase'





export const CustomControlsExample=(props)=> {
    const [isEditing,setIsEditing]=useState(false)
    const [name,setName]=useState(props.name)
    const handleChangeName = (event) => {setName(event)}

    const editName=async(input)=>{
        var user = await auth.currentUser;
        await user.updateProfile({
     
        displayName: input
      }).then(function() {
        console.log("update")
      }).catch(function(error) {
        // An error happened.
        console.log("error")
      });
    }
    /* Here's a custom control */
    function EditableControls() {
      
  
      return isEditing ? (
        <ButtonGroup justifyContent="center" size="sm">
          <IconButton icon={<CheckIcon />} onClick={()=>{setIsEditing(false)
            editName(name)
        }}/>
          <IconButton icon={<CloseIcon />} onClick={()=>{setIsEditing(false)}} />
        </ButtonGroup>
      ) : (
        <Flex justifyContent="center">
          <IconButton size="sm" icon={<EditIcon />} onClick={()=>{setIsEditing(true)}}/>
        </Flex>
      )
    }
   
  
    return (
      
      <Editable
        textAlign="center"
        
        fontSize="xl"
        isPreviewFocusable={isEditing ?true:false}
        defaultValue={name}
        value={name}
        onChange={ handleChangeName}
        
      >

        <Flex>
        <EditablePreview />
        <EditableInput />

        <EditableControls />
        </Flex>
      </Editable>

      
    )
  }