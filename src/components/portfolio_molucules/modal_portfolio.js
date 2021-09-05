import React, {useState,useContext}from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    Button,
    useDisclosure,
    NumberInput,
    NumberInputField,
    Input,
    CloseButton,
    Box,
    Textarea
  } from "@chakra-ui/react"
  import TextField from '@material-ui/core/TextField';
  import Autocomplete from '@material-ui/lab/Autocomplete';
  import {UserContext} from '../../provider/UserProvider'
  import {db} from '../../firebase'
  import firebase from "firebase";
  import {Stock_list} from '../atoms/stock_list'

  export const Modal_portfolio=React.memo((props)=>{
   
    //modal上で指定する株と数量のState
    const [Value, setValue] = useState(100)
    const [Ticker,setTicker]=useState(null)
    const [Ticker_input,setTicker_input]=useState(null)
    const [Price, setPrice] = useState(100)
    const [text, setText] = useState("")

    //Tickerのインプットを検知し見た目に反映
    const handleChangeTicker = (event) => setTicker(event.target.value)
    //valueのインプットを検知し見た目に反映
    const handleChangeValue = (valueAsNumber) => setValue(valueAsNumber.target.value)
    //priceのインプットを検知し見た目に反映
    const handleChangePrice = (valueAsNumber) => setPrice(valueAsNumber.target.value)

    //textのインプットを検知し見た目に反映
    const  handleTextChange = (e) => {
      let inputValue = e.target.value
      setText(inputValue)
    }
    const { isOpen, onOpen, onClose } = useDisclosure()

   


const registeredTicker =  Stock_list()
  
    

    return (
      <>
        
        <Button onClick={onOpen}colorScheme="green"
        position="fixed"
        right="80px"
        bottom="80px"
        zIndex="1"
        >+追加</Button>
        
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent width="80%">
            
            <Box borderRadius="md">
                <CloseButton onClick={onClose}/>
            

           
              
                <Button  colorScheme="blue" >追加</Button>
            </Box>
          </ModalContent>
        </Modal>
      </>
    )
  })

  

    