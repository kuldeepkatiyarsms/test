import Firebase from 'firebase';  

var config = {
  	apiKey: "AIzaSyAzOlLQfIFs-TZg4HtshNMdlCoVS_Jig7g",
    authDomain: "****************************",
    databaseURL: "https://wecare-customer-d8511-default-rtdb.firebaseio.com/",
    projectId: "holy-basil-plus",
    storageBucket: "***********************",
    messagingSenderId: "***********************",
    appId: "1:87955217014:android:4bbe60033b32217c5f1d57"
};

let app = Firebase.initializeApp(config);  
export const fb = app.database(); 