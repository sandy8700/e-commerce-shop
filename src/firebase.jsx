import { initializeApp } from "firebase/app";
// import { getAuth } from 'firebase/auth';
// import { getDatabase } from 'firebase/database';


const firebaseConfig = {
  apiKey: "AIzaSyAF58BM2OgClwB_UevMVm6akSlTA5TY4sE",
  authDomain: "ecommerce-web-app-7515a.firebaseapp.com",
  projectId: "ecommerce-web-app-7515a",
  storageBucket: "ecommerce-web-app-7515a.appspot.com",
  messagingSenderId: "774882942261",
  appId: "1:774882942261:web:0de696c918e6bd3bcbc07c",
  databaseURL: "https://ecommerce-web-app-7515a-default-rtdb.firebaseio.com"
};

export const firebaseApp = initializeApp(firebaseConfig);
// export const auth = getAuth(firebaseApp);
// export const database = getDatabase(firebaseApp);