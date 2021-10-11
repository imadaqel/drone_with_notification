var fb=require('firebase')

var appIni=fb.initializaion({
    apiKey: "AIzaSyCN_GKsBRU4G6r_5TLpQnFjwxUY3NJXgxE",
    authDomain: "drone-a8919.firebaseapp.com",
    databaseURL: "https://drone-a8919-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "drone-a8919",
    storageBucket: "drone-a8919.appspot.com",
    messagingSenderId: "850784361168",
    appId: "1:850784361168:web:f9912bec86e793b444dcd5",
    measurementId: "G-13QW0X0YRW"
  })

  var firebase=fb.database();

  firebaseDB.ref("theText").set("caught string")