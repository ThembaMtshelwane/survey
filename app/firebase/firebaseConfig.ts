import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyD3kr6_7hxuSSfTY2VyiFpw_LbwPVXBPOs',
  authDomain: 'examples-a0a80.firebaseapp.com',
  projectId: 'examples-a0a80',
  storageBucket: 'examples-a0a80.appspot.com',
  messagingSenderId: '617347255010',
  appId: '1:617347255010:web:d62b58d1821cbeb4946cbb',
  measurementId: 'G-VYLQLB5KT9',
}
// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
//   measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
// }

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore(app)
export { app, db }
