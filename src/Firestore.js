import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBEehWk-_U79DUY9x81lAzRdUmwdRzEjC8",
    authDomain: "exercise-log-df6cc.firebaseapp.com",
    projectId: "exercise-log-df6cc",
    storageBucket: "exercise-log-df6cc.appspot.com",
    messagingSenderId: "685328826210",
    appId: "1:685328826210:web:75b96ec4300307e50c363b",
    measurementId: "G-PFRS36YSFG"
};

firebase.initializeApp(firebaseConfig);

export default firebase;