
import firebase from "firebase"
const firebaseConfig = {
    apiKey: "AIzaSyA8gu925OCcirpLskIzlOs4RH7wE9xtzlw",
    authDomain: "netflixpro-24d90.firebaseapp.com",
    projectId: "netflixpro-24d90",
    storageBucket: "netflixpro-24d90.appspot.com",
    messagingSenderId: "511339663171",
    appId: "1:511339663171:web:f3f8500fbe20745c95a9f6",
    measurementId: "G-18D93TYNMS"
  };

  firebase.initializeApp(firebaseConfig);
  const storage = firebase.storage();
  export default storage;