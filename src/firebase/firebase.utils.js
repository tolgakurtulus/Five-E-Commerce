import firebase from 'firebase/compat/app';
// import { initializeApp } from "firebase/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const config = {
    apiKey: "AIzaSyAfktlw4tGUVI_ZZYAu4dOLzRlBbkEK7tE",
    authDomain: "ecommerce-db-3015c.firebaseapp.com",
    projectId: "ecommerce-db-3015c",
    storageBucket: "ecommerce-db-3015c.appspot.com",
    messagingSenderId: "968916308019",
    appId: "1:968916308019:web:b2e4cbe42b9a67b12ad346",
    measurementId: "G-82SG01V6PQ"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
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
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
