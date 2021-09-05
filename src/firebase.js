import * as firebase from 'firebase/app'
import "firebase/firestore"
import "firebase/auth"
import "firebase/storage"

const firebaseApp = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
    authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId:process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
  });

export const db=firebaseApp.firestore();
export const auth=firebaseApp.auth();
export const storage=firebaseApp.storage();
export const provider=new firebase.auth.GoogleAuthProvider();
export const analytics = firebase.analytics();
export default firebase;