import {
    Button,
    ButtonGroup,
    Box,
    Text,
  } from "@chakra-ui/react"
  import {
    Container,
    SimpleGrid,
    Image,
    Flex,
    Heading,
    Stack,
    StackDivider,
  } from '@chakra-ui/react';
  import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverArrow,
    PopoverCloseButton,
    PopoverFooter
  } from "@chakra-ui/react"
import React,{useContext,useState} from 'react';
import {UserContext} from '../../provider/UserProvider'

  export const First_login=(props)=> {

    //contextからログインユーザー情報値を取り出す
    const  [uid,photoUrl,displayName,setUserdata,TutorialOn_myp,setTutorialOnOff_myp]=useContext(UserContext)

    const initialFocusRef = React.useRef()
  
    const [activePage ,setActivePage]=useState(0)
    
    
    const handlenextbt=()=>{
        setActivePage(activePage+1)

    }
    const handlebackbt=()=>{
        setActivePage(activePage-1)

    }
    const handlestartbt=()=>{
      setTutorialOnOff_myp(false)
    }

    const imgurl=[
        "https://firebasestorage.googleapis.com/v0/b/appfinance-8cbff.appspot.com/o/avatars%2Ftutorial1.PNG?alt=media&token=f95aa10a-e1c5-4291-a67b-a2af33f6b556",
        "https://firebasestorage.googleapis.com/v0/b/appfinance-8cbff.appspot.com/o/avatars%2Ftutorial2.PNG?alt=media&token=4e36c5d4-b778-4533-922c-1270d5ab782b",
        "https://firebasestorage.googleapis.com/v0/b/appfinance-8cbff.appspot.com/o/avatars%2Ftutorial3.PNG?alt=media&token=fd8836eb-f7b1-46ee-a5ed-48fa768f3832",
        "https://firebasestorage.googleapis.com/v0/b/appfinance-8cbff.appspot.com/o/avatars%2Ftutorial4.PNG?alt=media&token=8be10de5-5baf-42e8-ab1a-7826b1826eac"

    ]
    const textlist=[
        "ポートフォリオ共有アプリへようこそ。Xはポートフォリオを管理して他のユーザーと共有できるアプリです。",
        "ユーザーのプロフィールからはその人の持っている株の比率と最近の取引を見ることができます。",
        "さっそく、自分の興味のある株、持っている株を登録しましょう。",
        "ここから他のユーザーの持っている株を見ることもできます。"
    ]
    return (
        <>
   <Popover
      initialFocusRef={initialFocusRef}
      placement="bottom"
      closeOnBlur={false}
    >
       {({ isOpen, onClose }) => (
    <>
      <PopoverTrigger>
        <Button>使い方</Button>

      </PopoverTrigger>
      <PopoverContent color="white" bg="blue.800" borderColor="blue.800">

        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <Stack spacing={3}>
         
         <Heading>ポートフォリオ共有アプリXXX</Heading>
         <Text color={'gray.500'} fontSize={'lg'}>
         {textlist[activePage]}
         </Text>
         <Stack
           spacing={4}
           divider={
             <StackDivider
               borderColor={'gray.100'}
             />
           }>
          
         </Stack>
       
       </Stack>
          <Flex>
            <Image
              rounded={'md'}
              alt={'feature image'}
              src={
                imgurl[activePage]
              }
            />
          </Flex>
          </SimpleGrid> 
        </PopoverBody>
        <PopoverFooter
          border="0"
          d="flex"
          alignItems="center"
          justifyContent="space-between"
          pb={4}
        >
          <Box fontSize="sm">Step {activePage+1} of 4</Box>
                <ButtonGroup size="sm">
                  {
                      activePage!=0?
                <Button colorScheme="blue" ref={initialFocusRef}
              onClick={handlebackbt}>
                    Back
                </Button>
                :""
                    }
                    {
                    activePage!=3?    
                <Button colorScheme="blue" ref={initialFocusRef}
              onClick={handlenextbt}>
                    Next
                </Button>
                :""
                    }
                    {
                    activePage==3?    
                <Button colorScheme="blue" ref={initialFocusRef}
              onClick={onClose}>
                    始める
                </Button>
                :""
                    }
            </ButtonGroup>
        
        </PopoverFooter>
      </PopoverContent>
    </>
       )}
    </Popover>
    
 
  
    
        
    
      </>
    )
  }