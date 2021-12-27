import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

const config = {
  apiKey: `${process.env.GATSBY_APIKEY}`,
  authDomain: `${process.env.GATSBY_AUTHDOMAIN}`,
  projectId: `${process.env.GATSBY_PROJECTID}`,
  storageBucket: `${process.env.GATSBY_STORAGEBUCKET}`,
  messagingSenderId: `${process.env.GATSBY_MESSAGINGSENDERID}`,
  appId: `${process.env.GATSBY_APPID}`,
  measurementId: `${process.env.GATSBY_MEASUREMENTID}`,
};

  
  const App = initializeApp(config)
  const db = getFirestore(App);
export { db };
