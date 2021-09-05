import React, { useState,useEffect } from "react";
import firebase from '../../firebase';

import styles from "./Auth.module.css";
import { auth, provider, storage } from "../../firebase";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Paper,
  Grid,
  Typography,
  makeStyles,
  Modal,
  IconButton,
  Box,
} from "@material-ui/core";

import SendIcon from "@material-ui/icons/Send";
import CameraIcon from "@material-ui/icons/Camera";
import EmailIcon from "@material-ui/icons/Email";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Sidebar from '../../partials/Sidebar';
import {Header} from '../../partials/Header';
import { focusHandling } from 'cruip-js-toolkit';
import {useLocation} from 'react-router-dom';
import {UserContext} from '../../provider/UserProvider'
import {useContext} from "react"
import {StyledFirebaseAuth} from 'react-firebaseui/StyledFirebaseAuth';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  modal: {
    outline: "none",
    position: "absolute",
    width: 400,
    borderRadius: 10,
    backgroundColor: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(10),
  },
  image: {
    backgroundImage:
      "url(https://images.unsplash.com/photo-1581784368651-8916092072cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

 export const Auth= (props) => {

  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  //contextからログインユーザー情報値を取り出す
  const  [uid,photoUrl,displayName,setUserdata,TutorialOnOff_myp,setTutorialOnOff_myp]=useContext(UserContext)
   

   useEffect(() => {
     document.querySelector('html').style.scrollBehavior = 'auto'
     window.scroll({ top: 0 })
     document.querySelector('html').style.scrollBehavior = ''
     focusHandling('outline');
   }, [location.pathname]); // triggered on route change


  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [avatarImage, setAvatarImage] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [openModal, setOpenModal] =useState(false);
  const [resetEmail, setResetEmail] = useState("");

  //preview用のURL
  const [imageUrl, setImageUrl] = useState("");

  const onChangeImageHandler = (e) => {
    if (e.target.files[0]) {
      setAvatarImage(e.target.files[0]);
      console.log(avatarImage )
  
      function previewFile(file) {

          // FileReaderオブジェクトを作成
          const reader = new FileReader();
        
          setImageUrl(e.target.result)// URLはevent.target.resultで呼び出せる
            reader.onloadend = () => {
 
              setImageUrl(reader.result)
        }  
          // いざファイルをURLとして読み込む
          reader.readAsDataURL(file);
        }
      
      previewFile(e.target.files[0])
      e.target.value = "";

    }
  };
  const sendResetEmail = async (e) => {
    await auth
      .sendPasswordResetEmail(resetEmail)
      .then(() => {
        setOpenModal(false);
        setResetEmail("");
      })
      .catch((err) => {
        alert(err.message);
        setResetEmail("");
      });
  };
  // const signInGoogle = async () => {
  //   await auth.signInWithPopup(provider).catch((err) => alert(err.message));
  //   await props.history.push("/")
  // };

  const uiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: "/",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
}

  const signInEmail = async () => {
    console.log("メールログイン")
    await auth.signInWithEmailAndPassword(email, password).catch((err) => alert(err.message));
    await props.history.push("/")
  };
  const signUpEmail = async () => {
    const authUser = await auth.createUserWithEmailAndPassword(email, password);
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
      await storage.ref(`avatars/${fileName}`).put(avatarImage);
      url = await storage.ref("avatars").child(fileName).getDownloadURL();
    }

    await authUser.user?.updateProfile({
      displayName: username,
      photoURL: url,
    });
    const loginuser = auth.currentUser;
    await setUserdata({
      uid: loginuser.uid,
      photoUrl: url,
      displayName: username}
      )



    await props.history.push("/")
   
  };

  return (
    <>
     {/* Sidebar */}
     <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

     {/* Content area */}
     <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

     {/*  Site header */}
     <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          
           {!avatarImage ? 
            <Avatar className={classes.large} >
              <LockOutlinedIcon />
            
            </Avatar>
          :
            <Avatar  src={imageUrl} className={classes.large}/>
                      
                      }
          
        
          
          <Typography component="h1" variant="h5">
            {isLogin ? "ログイン" : "アカウント新規登録"}
          </Typography>
          
          <form className={classes.form} noValidate>
              
            {!isLogin && (
              <>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
                <Box textAlign="center">
                  <IconButton>
                    <label>
                      <AccountCircleIcon
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
                    
                  </IconButton>

                  

       
                  
                  <text>
                      {!isLogin ? 
                      !avatarImage ? "クリックしてプロフィール写真を登録!":""
                      :""
                      }

                  </text>
                </Box>
              </>
            )}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <text>
              {!isLogin?
              password.length < 6 ? "パスワードの長さを６文字以上にしてください":""
            :""
            }

            </text>
            
            <Button
              disabled={
                isLogin
                  ? !email || password.length < 6
                  : !username || !email || password.length < 6 || !avatarImage
              }
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              startIcon={<EmailIcon />}
              onClick={
                isLogin
                  ? async () => {
                      try {
                        await signInEmail();
                      } catch (err) {
                        alert(err.message);
                      }
                    }
                  : async () => {
                      try {
                        await signUpEmail();
                      } catch (err) {
                        alert(err.message);
                      }
                    }
              }
            >
              {isLogin ? "ログイン" : "登録"}
            </Button>
            <Grid container>
              <Grid item xs>
                <span
                  className={styles.login_reset}
                  onClick={() => setOpenModal(true)}
                >
                  パスワードを忘れた?
                </span>
              </Grid>
              <Grid item>
                <span
                  className={styles.login_toggleMode}
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? "アカウント新規作成はこちら" : "ログインに戻る"}
                </span>
              </Grid>
            </Grid>
            <div>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
            </div>

            {/* <Button
              fullWidth
              variant="contained"
              color="default"
              className={classes.submit}
              startIcon={<CameraIcon />}
              onClick={signInGoogle}
            >
              Google サインイン
            </Button> */}
          </form>

          <Modal open={openModal} onClose={() => setOpenModal(false)}>
            <div style={getModalStyle()} className={classes.modal}>
              <div className={styles.login_modal}>
                <TextField
                  InputLabelProps={{
                    shrink: true,
                  }}
                  type="email"
                  name="email"
                  label="Reset E-mail"
                  value={resetEmail}
                  onChange={(e) => {
                    setResetEmail(e.target.value);
                  }}
                />
                <IconButton onClick={sendResetEmail}>
                  <SendIcon />
                </IconButton>
              </div>
            </div>
          </Modal>
        </div>
      </Grid>
    </Grid>
    
      </div>
      </>
  );
};