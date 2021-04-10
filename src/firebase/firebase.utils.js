import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCkN4jOkvk-wAn2ZfstRahogSPnHitsIck",
    authDomain: "crown-db-50da8.firebaseapp.com",
    projectId: "crown-db-50da8",
    storageBucket: "crown-db-50da8.appspot.com",
    messagingSenderId: "915209561248",
    appId: "1:915209561248:web:f96b55e16a86a3620815c5",
    measurementId: "G-3LZJP4KQR6"
}
  
export const createUserProfileDocument = async (userAuth, additionalData)=> {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creatign user", error.message);
    }
  }
  return userRef;
}

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore=  firebase.firestore();


const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'})
export const signInWithGoogle =() =>auth.signInWithPopup(provider);

export default firebase;