import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB6hSIcL8Pq5WoJeZmMBbVY9qFUUKLtFrw",
    authDomain: "slack-clone-e69d8.firebaseapp.com",
    projectId: "slack-clone-e69d8",
    storageBucket: "slack-clone-e69d8.appspot.com",
    messagingSenderId: "102993825191",
    appId: "1:102993825191:web:20224dcfbec98606a3ba82",
    measurementId: "G-33CXM8E4GS"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  //google authentication
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth, provider, db};
