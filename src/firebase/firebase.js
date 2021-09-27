import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';
import 'firebase/firestore';

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyDm2UwEuOaM-qljHYvdxc-UulbFOQhc_vQ',
    authDomain: 'aids-d763c.firebaseapp.com',
    projectId: 'aids-d763c',
    storageBucket: 'aids-d763c.appspot.com',
    messagingSenderId: '617891930103',
    appId: '1:617891930103:web:95feaa7d20481590f058f2'
  });
}

const db = firebase.firestore();

const storage = firebase.storage();

export default firebase;
