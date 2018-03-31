import firebase from '@firebase/app';
import '@firebase/firestore';

const config = {
    apiKey: 'AIzaSyATW24g8Trn2Kr0I2U47zpEEMrxHyqGZEM',
    authDomain: 'quick-todo-c952a.firebaseapp.com',
    databaseURL: 'https://quick-todo-c952a.firebaseio.com',
    projectId: 'quick-todo-c952a',
    storageBucket: 'quick-todo-c952a.appspot.com',
    messagingSenderId: '863231589260'
  };

const app = firebase.initializeApp(config);
const firestore = firebase.firestore(app);

export default firestore;