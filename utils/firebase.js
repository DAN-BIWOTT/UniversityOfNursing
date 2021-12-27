import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

const config = {
  apiKey: process.env.GATSBY_apiKey,
  authDomain: process.env.GATSBY_authDomain,
  projectId: process.env.GATSBY_projectId,
  storageBucket: process.env.GATSBY_storageBucket,
  messagingSenderId: process.env.GATSBY_messagingSenderId,
  appId: process.env.GATSBY_appId,
  measurementId: process.env.GATSBY_measurementId,
};

  
  const App = initializeApp(config)
  const db = getFirestore(App);
export { db };
