import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAJlz7q_Sb1_ukmuQAa2NuV6hXgPZPSIXI",
//   authDomain: "lcap-nexus.firebaseapp.com",
//   projectId: "lcap-nexus",
//   storageBucket: "lcap-nexus.firebasestorage.app",
//   messagingSenderId: "288701725741",
//   appId: "1:288701725741:web:1adf5823f4eb2f17168ca4",
//   measurementId: "G-YFM30B5Y92"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
