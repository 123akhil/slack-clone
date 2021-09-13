import firebase from "firebase";
// import 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    //add your firebase config keys
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  // const storage = firebaseApp.storage();
  const db = firebaseApp.firestore();
  //google authentication
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth, provider, db};
