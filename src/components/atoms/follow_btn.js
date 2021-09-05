import React, {useState,useEffect}from 'react'
import { Button } from "@chakra-ui/react"
import {db} from '../../firebase'

export const Follow_btn=(props)=>{
    //uidは自分、targetは相手
    const {targetUid,uid} = props;
    const [follow,setFollow]=useState(false)

    useEffect(()=>{
      console.log(uid)

      db.collection("follow").doc(targetUid+uid).get()
      .then((doc)=>{
        if (doc.exists) {
          setFollow(true)

        }
        else {
            console.log("404");
        }
        })
        .catch( (error) => {
            console.log(`データを取得できませんでした (${error})`);
        });

    },[uid,targetUid])




    //add_numが１だと追加したとき、-1で減
    //targetのフォロワー増加、myidのフォロー増加




    const follow_adjust=(target,myid,add_num)=>{

            
      db.collection("user").doc(target).get()
      .then((res)=>{
        //userdata取得
        console.log(res.data())
        console.log("フォロワー数変動")
        const tmp=res.data()
        console.log(tmp.followers)
        tmp.followers=tmp.followers+add_num

        db.collection("user").doc(target).set(tmp)          })

        db.collection("user").doc(myid).get()
        .then((res)=>{
          //userdata取得
          console.log(res.data())
          console.log("フォロー数変動")
          const tmp=res.data()
          console.log(tmp.followers)
          tmp.follows=tmp.follows+add_num

          db.collection("user").doc(myid).set(tmp)          })
      }
        //フォローボタンを押したときの処理
        const handleClick =()=>{
          setFollow(!follow)
    
          const handlefirebasefollow=()=>{
          
    
                if(follow){
                  console.log("followはずします")
          
                  //firestore上でのunfollow
                  db.collection("follow").doc(targetUid+uid)
                  .delete().then(() => {
                    // success
                    console.log("unfollow successfully!")
          
                }).catch(error => {
                    // error
                })
          
                  follow_adjust(targetUid,uid,-1)
                
                }else{
                  console.log("followします")
          
                  //firestore上でのfollow
                  db.collection("follow").doc(targetUid+uid).set(
                    {
                      followee:targetUid,
                      follower:uid
          
                    }
                  )
                  .then(() => {
                      console.log("follow successfully!");
                  })     
                  follow_adjust(targetUid,uid,1) 
                }
          
        }
    
        //フォロー中の人数を取得し10人までに制限
        const tmplist=[]
        db.collection("follow").where("follower", "==",uid)
          .get()
          .then(  async(res)=>{
                 
                 return Promise.all(res.docs.map(async (item) => {
        
                     const stockAsync = (item) => new Promise((resolve) =>  {
                      db.collection("user").doc(item.data().followee)
                  .get().then(
                    function(res) {
                      if (res.exists) {
                  
                      tmplist.push(res.data())
                       resolve("ok")}
                       else{
                        resolve("ok")
                       }
                    }
        
                  )   
                         
                         
                         } )
                     const asyncTaskA =await stockAsync(item)
                     console.log(asyncTaskA)
                     
                   
                     }))
                 
            
               
         }
        
            ).then(() => {
              console.log(tmplist.length)
              console.log(tmplist)
    
              //followを外す場合は長さ関係なし
              if(follow){
                console.log("フォロー外します")
                  handlefirebasefollow()
              }else
              {
                if (tmplist.length>=10){
                  console.log("フォロー不可")
                  alert("フォローは最大10人です")
                }else{
                  console.log("フォローOK")
                  handlefirebasefollow()
                }
              }
    
    
             
    
            })
    
    
    
    
         
        }
    return (
        <>
        <Button
            w={'20'}
            mt={5}
            bg={ follow ? 'white' : '#00BFFF' }
            color={follow ? 'black' : 'white'}
            rounded={'full'}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg',

            }}
            onClick={handleClick}
            >
            {follow? "フォロー中":"フォローする"}
          </Button>
        </>
    )
}