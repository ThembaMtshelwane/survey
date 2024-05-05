import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCLcMFfxaUt7N71fraJcG3lzB66lH7N_JM',
  authDomain: 'technical-assignments-49070.firebaseapp.com',
  projectId: 'technical-assignments-49070',
  storageBucket: 'technical-assignments-49070.appspot.com',
  messagingSenderId: '201516009874',
  appId: '1:201516009874:web:f8c29fd0ff849ee9ef594b',
  measurementId: 'G-FE6XL16BJP',
}

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore(app)
export { app, db }
