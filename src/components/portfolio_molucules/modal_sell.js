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
    Select,
    Textarea
  } from "@chakra-ui/react"
  import {UserContext} from '../../provider/UserProvider'
  import {db} from '../../firebase'
  import firebase from "firebase";

  export const Modal_sell=React.memo((props)=>{
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
    //入力されたTickerの現在の保有株数を数量に反映
    const handleChangeTicker = (event) => 
    {
      setTicker(event.target.value)
      let targetStock = portfolio.find((v) => v.stock === event.target.value)
      console.log(targetStock.nowprice)
      setPrice(targetStock.nowprice)
      setValue(targetStock.value)
    }
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


        //Reactの仕様上リストやオブジェクトはコピーしてからでないと
        //更新できない
        let portfolio_tmp=portfolio.concat()

        
        let targetStock = portfolio.find((v) => v.stock === Ticker);
        console.log(targetStock.getprice)
        const profit=Number((Price-targetStock.getprice)*Value)
          
          db.collection("transaction").doc().set(

            {UID:uid,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              displayName:displayName,
              photoUrl:photoUrl,
              stock:Ticker,
              securities:null,
              value:Value,
              price:Price,
              buy:false,
              profit:profit,
              text:text
            }
          )
    .then(() => {
        console.log("Document successfully written!");
    })

        //入力されているTickerと現在のポートフォリオを比べて同じものを探す
        
        //ない場合はエラーが出るので追加する

       try{
        targetStock = portfolio_tmp.find((v) => v.stock === Ticker);
        targetStock.value=Number(targetStock.value)-Number(Value)
        
        //売却の結果valueがマイナスになった時の処理
        if(targetStock.value<0){
          alert("売却の結果マイナスになっています。")
          return
        }

        //売却の結果valueが０になった時の処理
        if(targetStock.value==0){
          portfolio_tmp = portfolio_tmp.filter((v) => {
            return (v.stock != Ticker);
            });


        }


        console.log(portfolio_tmp)

        //portfolio_tmpをFirestore上に保存
      db.collection("portfolio").doc(uid).set(
              {portfolio:portfolio_tmp}
            )
      .then(() => {
          console.log("Document successfully written!");
          setHandlePFchange(portfolio_tmp)
      })

     

        
        
       }catch(e){
            console.log(e.message)
            }
         
        
    }

      

    
    
    return (
      <>
       
        <Button onClick={onOpen}colorScheme="pink"
         position="fixed"
         right="30px"
         bottom="80px"
         zIndex="1"
        >-売却</Button>
        
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent  width="80%">
            <Box borderRadius="md">
                <CloseButton onClick={onClose}/>
                   
                銘柄
                <Select placeholder="選択してください" onChange={handleChangeTicker}>
                  {
                  portfolio!=null && portfolio.map(function(e,i){
                      return <option value={e.stock} key={e.stock+"id"}>{e.stock}</option>
                    })} 
                </Select>

                数量
                <NumberInput
                value={Value} 
                defaultValue={100}
                 min={0}>
                    <NumberInputField 
                    
                onChange={handleChangeValue}/>
                   
                </NumberInput>
                
                売却価格
                <NumberInput
                value={Price}
                defaultValue={100} min={0}>
                    <NumberInputField 
                    
                onChange={handleChangePrice}/>
                   
                </NumberInput>
                <Textarea
                  value={text}
                  onChange={handleTextChange}
                  placeholder="To the moon!"
                  size="sm"
                />
                <Button  colorScheme="blue" onClick={handle_buy_btn} >削除</Button>
            </Box>
          </ModalContent>
        </Modal>
      </>
    )
  })

    