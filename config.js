import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCohwlyGb0-j1Bmrm2IhTf8qex7W1JTEgk",
    authDomain: "teamvotingapp-6fc8c.firebaseapp.com",
    databaseURL: "https://teamvotingapp-6fc8c-default-rtdb.firebaseio.com",
    projectId: "teamvotingapp-6fc8c",
    storageBucket: "teamvotingapp-6fc8c.appspot.com",
    messagingSenderId: "1052820207151",
    appId: "1:1052820207151:web:d9167e1ed55ae4556f78da"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase.database();