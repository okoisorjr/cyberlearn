import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'
import 'firebase/firebase-storage'

  const firebaseConfig = {
    apiKey:process.env.REACT_APP_API_KEY,
    authDomain:process.env.REACT_APP_AUTH_DOMAIN,
    projectId:process.env.REACT_APP_PROJECT_ID,
    storageBucket:process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId:process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId:process.env.REACT_APP_APP_ID,
    measurementId:process.env.REACT_APP_MEASUREMENT_ID
  };

// Initialize Firebase
const firebase = app.initializeApp(firebaseConfig);
export const persistence = app.auth.Auth.Persistence.SESSION

export default firebase;

/*
class Firebase{
  constructor(props){
    App.initializeApp(firebaseConfig);
    this.auth = App.auth();
    //this.db = App.Firebase();
  }

  login(email, password){
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  async register(email, password, firstname, lastname){
    await this.auth.createUserWithEmailAndPassword(email, password);
    return this.auth.currentUser.updateProfile({
      displayName:firstname + " " + lastname
    });
  }

  logout(){
    return this.auth.signOut();
  }

  getUser(){
    return this.auth.currentUser();
  }

  authChange(user){
    return this.auth.onAuthStateChanged(user);
  }
}

export default new Firebase();
*/