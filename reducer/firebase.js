import * as firebase from 'firebase';
import ApiKeys from '../constants/ApiKeys';

const db = firebase.initializeApp(ApiKeys.FirebaseConfig, 'Secondary');

export default db;
