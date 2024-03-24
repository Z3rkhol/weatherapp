import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCont5ISmL5EQe0aJjS6iMRG1ZPyt0KD0g",
    authDomain: "weatherapp-cf6db.firebaseapp.com",
    databaseURL: "https://weatherapp-cf6db-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "weatherapp-cf6db",
    storageBucket: "weatherapp-cf6db.appspot.com",
    messagingSenderId: "274925317141",
    appId: "1:274925317141:web:023fb21ec04548bd7d721c"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export default firebaseApp;
export {
    firebaseApp,
    auth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    firebaseSignOut
};