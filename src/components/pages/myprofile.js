import React ,{useState,useContext,useEffect}from 'react'
import {Portfolio_pie} from "../portfolio_molucules/portfolio_pie"
import {useParams} from "react-router-dom"
import {UserContext} from '../../provider/UserProvider'
import {db,auth, storage} from '../../firebase'
import styles from "./Auth.module.css";

import Transaction from '../dashboard_components/dashboard/Transaction'
import TeamTilesCard from '../../partials/team/TeamTilesCard';

import Sidebar from '../../partials/Sidebar';
import {Header} from '../../partials/Header';
import { focusHandling } from 'cruip-js-toolkit';
import {useLocation} from 'react-router-dom';

  export const MyProfile=(props)=> {
    //contextから値を取り出す

    const location = useLocation();
   const [sidebarOpen, setSidebarOpen] = useState(false);
   
  
   
   useEffect(() => {
     document.querySelector('html').style.scrollBehavior = 'auto'
     window.scroll({ top: 0 })
     document.querySelector('html').style.scrollBehavior = ''
     focusHandling('outline');
   }, [location.pathname]); // triggered on route change

   

    const  [uid,photoUrl,displayName,setUserdata]=useContext(UserContext)

    const [profile, setmyProfile]=useState({
     bgurl:'',
    iconimg:photoUrl,
    username:displayName,
    text:"hello_React",
    follows:25,
    followers:40
    })  

    const item= 
        {
          id: 1,
          name: displayName,
          image: profile.iconimg,
          link: '#0',
          location: 'text',
          content: 'hello react',
          follows:profile.follows,
          followers:profile.followers,
          uid:uid
        }

    const [myportfolio, setmyPortfolio]=useState([])
    //取引履歴state
    const [mystock_transactions,setmyStock_transactions]= useState(
        [
            {
                "UID":12345,
                "transactionID":"fefdsae5fgb",
                "displayName":"guest",
                "photoUrl":"",
                "stock": "AA",
                "date":"2020-04-22",
                "securities":"",
                "value": 400,
                "price":1500,
                "buy":1,
                "profit":0,
                "text":"aaa"
            },
          
          ]
    )


    
    const [follow,setFollow]= useState(false);
    //DBからフォロー情報を取得し、フォロー済みかチェック

    //フォローリストを押したときの処理
    const handlefollow =()=>{
      setFollow(!follow)
    }

   

  useEffect(()=>{


        //firestore上の最新ポートフォリオデータを取得
        var docRef=db.collection('user').doc(uid)    

        docRef.get().then((doc)=>{
        if (doc.exists) {
            console.log( doc.data() );
            const data=doc.data()
            setmyProfile(data)
           

        }
        else {
            console.log("404");
        }
        })
        .catch( (error) => {
            console.log(`データを取得できませんでした (${error})`);
        });
        


        //firestore上の最新ポートフォリオデータを取得
        var docRef=db.collection('portfolio').doc(uid)    

        docRef.get().then((doc)=>{
        if (doc.exists) {
            console.log( doc.data() );
            const data=doc.data()
            console.log(data.portfolio)
            setmyPortfolio(data.portfolio)

        }
        else {
            console.log("404");
        }
        })
        .catch( (error) => {
            console.log(`データを取得できませんでした (${error})`);
        });
        

        console.log(uid)

        const transactions = [];
        db.collection("transaction").orderBy('timestamp','desc').where("UID", "==", uid).limit(15)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                console.log(doc.id, " => ", doc.data());
                transactions.push(doc.data())
                console.log(transactions)

            });
        }).then((res) => 
        {   
          transactions.forEach(function(doc) {
                
            const time=doc.timestamp.toDate()
            const formatTime = `${time.getFullYear()}/0${time.getMonth()+1}/0${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
            console.log(formatTime)
            doc.timestamp = formatTime
        });
            setmyStock_transactions(transactions);
        }
        )
        .catch(function(error) {
            console.log(error.message)
        })
        
       

      },[uid])
  
  const [avatarImage, setAvatarImage] = useState(null);
  const onChangeImageHandler = async(e) => {
        
        if (e.target.files[0]) {
          await setAvatarImage(e.target.files[0]);
          e.target.value = "";
        }

        let url = "";
      if (avatarImage) {
          //randomな文字列を作成している
        const S =
          "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        const N = 16;
        const randomChar = Array.from(crypto.getRandomValues(new Uint32Array(N)))
          .map((n) => S[n % S.length])
          .join("");
        const fileName = randomChar + "_" + avatarImage.name;
        console.log(fileName)
        await storage.ref(`avatars/${fileName}`).put(avatarImage);
        url = await storage.ref("avatars").child(fileName).getDownloadURL();
      }
      
      console.log(url);
      var user = await auth.currentUser;
      await user.updateProfile({
     
        photoURL: url
      }).then(function() {
        console.log("update")
      }).catch(function(error) {
        // An error happened.
        console.log("error")
      });

      };
      


    return (
      <>
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
 
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
 
      {/*  Site header */}
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />



      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto"> 
      

      
      {/* 写真を変更する部分未完成
      <text>{photoUrl}</text>
     
        
      <IconButton>
                    <label>
                      <EditIcon
                        fontSize="large"
                        className={
                          avatarImage
                            ? styles.login_addIconLoaded
                            : styles.login_addIcon
                        }
                      />
                      <input
                        className={styles.login_hiddenIcon}
                        type="file"
                        onChange={onChangeImageHandler}
                      />
                    </label>
      </IconButton>  */}

       {/* Cards */}     
          <div className="grid grid-cols-12 gap-6">
            <TeamTilesCard
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        image={item.image}
                        link={item.link}
                        location={item.location}
                        content={item.content}
                        followers={item.followers}
                        follows={item.follows}
                        uid={item.uid}
                      />

            <div className="col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-gray-200">
              <header className="px-5 py-4 border-b border-gray-100">
                  <h2 className="font-semibold text-gray-800">資産比率</h2>
              </header>
              <Portfolio_pie portfolio={myportfolio}/>
            </div>

            <Transaction stock_transactions={mystock_transactions} private_mode={false}/>
            
          
        
    
          </div>
      </div>

      </div>
      </>
    );
  }