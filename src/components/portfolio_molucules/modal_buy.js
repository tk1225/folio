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
  import {Stock_list_copy} from '../atoms/stock_list_copy'
  import _ from 'lodash';

  export const Modal_buy=React.memo((props)=>{
    //ContextからStateを取得
    const [uid,photoUrl,displayName,setUserdata]=useContext(UserContext)
   
    //propsからportfolioのStateとそれを更新する関数を生成
    const {portfolio,setHandlePFchange} = props;
    //modal上で指定する株と数量のState
    const [Value, setValue] = useState(100)
    const [Ticker,setTicker]=useState(null)
    
    const [Price, setPrice] = useState(100)
    const [text, setText] = useState("")

    //Tickerのインプットを検知し見た目に反映
    const handleChangeTicker = (event) => setTicker(event.target.value)
    //valueのインプットを検知し見た目に反映
    const handleChangeValue = (valueAsNumber) => setValue(Number(valueAsNumber.target.value))
    //priceのインプットを検知し見た目に反映
    const handleChangePrice = (valueAsNumber) => setPrice(Number(valueAsNumber.target.value))

    //textのインプットを検知し見た目に反映
    const  handleTextChange = (e) => {
      let inputValue = e.target.value
      setText(inputValue)
    }
    const { isOpen, onOpen, onClose } = useDisclosure()

    //追加ボタンを押したときの関数、ポートフォリオ更新する
    const handle_buy_btn=()=>{
        //画面を閉じる
        onClose()
        
        //銘柄をいれているか確認しnullであれば終了する
        if (Ticker===null){
            alert("銘柄を入力してください")
            return 
        }
        //数量と価格がしっかりとnumberで入力されておりマイナスでないか
        if(typeof Price==="number"&&typeof Value==="number"&&Price>0&&Value>0){
          console.log("数値です")
        }else{
          alert("正しい数値を入力してください")
          return 
        }

          

         
          db.collection("transaction").doc().set(
            {UID:uid,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              displayName:displayName,
              photoUrl:photoUrl,
              stock:Ticker,
              securities:null,
              value:Value,
              price:Price,
              buy:true,
              profit:0,
              text:text
            }
          )
    .then(() => {
        console.log("Document successfully written!");
    })

        //Reactの仕様上リストやオブジェクトはコピーしてからでないと
        //更新できない
        const portfolio_tmp=portfolio.concat()
        //入力されているTickerと現在のポートフォリオを比べて同じものを探す
        //ない場合はエラーが出るので追加する
       try{
         //同じ株を買い増ししたときのロジック
        const targetStock = portfolio_tmp.find((v) => v.stock === Ticker);
        //平均取得単価の変更
        const new_getprice=((Number(targetStock.value)*Number(targetStock.getprice))+
                              (Number(Value)*Number(Price)))/(Number(targetStock.value)+Number(Value))
       
        //valueを増やす
        targetStock.value=Number(targetStock.value)+Number(Value)
        //取得単価変更
        targetStock.getprice=new_getprice
        
       }catch(e){
            //銘柄が新しい時                     
                        const add_stock={
                          "stock": String(Ticker),
                          "value": Number(Value),
                          "getprice":Number(Price),
                          "nowprice":Number(0),
                          "price_before":Number(0),
                          "ttlprice":Number(0),
                          "ttlprice_before":Number(0),
                          "profit":Number(0),
                          
                            }
                        portfolio_tmp.push(add_stock)   
                    }    
            
    //portfolio_tmpをFirestore上に保存
    
      db.collection("portfolio").doc(uid).set(
        {portfolio:portfolio_tmp}).then(() => {
        console.log("Document successfully written!");
        setHandlePFchange(portfolio_tmp)

})
    setTicker(null)

}


const registeredTicker =  Stock_list_copy()
  
    

    return (
      <>
        
        <Button onClick={onOpen}colorScheme="whatsapp"
        size="lg"
        position="fixed"
        right="110px"
        bottom="80px"
        zIndex="1"
        >+追加</Button>
        
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent width="80%">
            
            <Box borderRadius="md">
                <CloseButton onClick={onClose}/>
            

        <Autocomplete
      
        disablePortal
        disableListWrap
        options={registeredTicker}
        getOptionLabel={(option) => option? option.name : ""}

        
        sx={{ width: 100 }}
        renderInput={(params) => 
        <TextField {...params} label="銘柄名" />}
       
        onChange={
          _.debounce((event, newValue) => setTicker(newValue.ticker), 500)
        }
       
        />
     

       
       
           
                数量
                <NumberInput defaultValue={100} min={0}>
                    <NumberInputField 
                    value={Value}
                onChange={handleChangeValue}/>
                   
                </NumberInput>
            
                取得価格
                <NumberInput defaultValue={100} min={0}>
                    <NumberInputField 
                    value={Price}
                onChange={handleChangePrice}/>
                   
                </NumberInput>
   
                <Textarea
                  value={text}
                  onChange={handleTextChange}
                  placeholder="To the moon!"
                  size="sm"
                />

                <Button  colorScheme="blue" onClick={handle_buy_btn} >追加</Button>
            </Box>
          </ModalContent>
        </Modal>
      </>
    )
  })

  

    