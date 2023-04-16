import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';

import { User } from 'auth';

const firebaseConfig = {
  apiKey: 'AIzaSyA72-I07UP7OHyR1VdbZm6S2i_5H7EODYU',
  authDomain: 'doggee-auth.firebaseapp.com',
  projectId: 'doggee-auth',
  storageBucket: 'doggee-auth.appspot.com',
  messagingSenderId: '1044952698072',
  appId: '1:1044952698072:web:c80be94460d3036cd1dbad',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const createUser = async (obj: User) => {
  return createUserWithEmailAndPassword(auth, obj.email, obj.password);
};
