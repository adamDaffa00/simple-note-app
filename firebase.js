 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    var firebaseConfig = {
      apiKey: "AIzaSyCeH9pjpHG0DxQaHDONI_a3AZn0cJrG0UI",
      authDomain: "note-app-45191.firebaseapp.com",
      projectId: "note-app-45191",
      storageBucket: "note-app-45191.appspot.com",
      messagingSenderId: "665891968573",
      appId: "1:665891968573:web:3fccccadaf89b628ee7c54",
      measurementId: "G-CLD5RWH81H"
    };
    // Initialize Firebase
  
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  const database = firebase.database()
  const noteRef = database.ref('catatan')