import * as firebase from 'firebase';

let firebaseConfig = {};
const env = 'dev';
if (env === 'dev') {
  firebaseConfig = {
    apiKey: "AIzaSyCtNfoeHBgYR1WTaSb8Q5ZlJTaYjgq0jSY",
    authDomain: "dicey-dev-cf774.firebaseapp.com",
    databaseURL: "https://dicey-dev-cf774.firebaseio.com",
    projectId: "dicey-dev-cf774",
    storageBucket: "dicey-dev-cf774.appspot.com",
    messagingSenderId: "368890616416",
    appId: "1:368890616416:web:a5348e92f527a43d"
  };
} else {
  firebaseConfig = {
    apiKey: "AIzaSyD6LjpcBvbhD6KSfrllZyEB4SxWzyzDT9E",
    authDomain: "dicey-test.firebaseapp.com",
    databaseURL: "https://dicey-test.firebaseio.com",
    projectId: "dicey-test",
    storageBucket: "dicey-test.appspot.com",
    messagingSenderId: "704900569107",
    appId: "1:704900569107:web:5a56af39e3695e2a"
  };
}

// console.log("firebaseConfig = " + JSON.stringify(firebaseConfig, null, 2));
const config = {
  apiKey: firebaseConfig.apiKey,
  authDomain: firebaseConfig.authDomain,
  databaseURL: firebaseConfig.databaseURL,
  projectId: firebaseConfig.projectId,
  storageBucket: firebaseConfig.storageBucket,
  messagingSenderId: firebaseConfig.messagingSenderId
};

firebase.initializeApp(config);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, env, database as default };
