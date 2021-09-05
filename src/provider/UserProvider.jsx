import React,{createContext,useState,useEffect} from "react"
import firebase from "firebase";
import {auth,db} from "../firebase"
import axios from 'axios'

export const UserContext =createContext({})


export const UserProvider=(props)=>{
    const {children}=props;
    const [userdata,setUserdata]=useState({uid:"guest",photoUrl:"guest",displayName:"guest"})
    const [TutorialOnOff_myp,setTutorialOnOff_myp]=useState(false)

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser.photoURL)
        setUserdata({uid: authUser.uid,
          photoUrl: authUser.photoURL,
          displayName: authUser.displayName}
          )
        
          //ログインの際にFirestoreにuid,photoUrl,displayNameを追加
        
        try {
          db.collection("user").doc(authUser.uid).set(
            {
              UID:authUser.uid,
              username:authUser.displayName,
              iconimg:authUser.photoURL,
            }
          )
          .then(() => {
              console.log("Document successfully written!");
          })

          
    

} catch( e ) {

    //例外エラーが起きた時に実行する処理
    console.log(e)
}
  

      } else {
        //ユーザー情報がないときにはContext内のデータを消去
        setUserdata({uid:"guest",photoUrl:"guest",displayName:"guest"})
      }
    });
    return () => {
      unSub();
    };
  }, [props.history]);

   useEffect(() =>{

        try{

        if (auth.currentUser.metadata.creationTime ===
        auth.currentUser.metadata.lastSignInTime) {
            console.log("firstlogin")
          setTutorialOnOff_myp(true)

        } else {
            console.log("ひさしぶり")
            // This is an existing user, show them a welcome back screen.
        }
        }catch(e){
            console.log(e.message)
        }



    },[props.history]) 

    return(
          //valueに渡すことでグローバルなステートになる
          //[userdata,setUserdata]のまま渡すとオブジェクトが渡せないというエラーが出た
            <UserContext.Provider value={[userdata.uid,userdata.photoUrl,userdata.displayName,setUserdata,TutorialOnOff_myp,setTutorialOnOff_myp]}>
                {children}
            </UserContext.Provider>
    )
}
