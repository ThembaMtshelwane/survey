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

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore(app)
export { app, db }
