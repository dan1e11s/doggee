import {
  Auth,
  AuthError,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  UserCredential,
} from 'firebase/auth';
import { useCallback, useState } from 'react';

import { startLocalStorage, startSessionStorage } from './storage/storage';

import { EmailAndPasswordActionHook, User } from 'auth';

export const useSignInEmailAndPassword = (
  auth: Auth
): EmailAndPasswordActionHook => {
  const [error, setError] = useState<AuthError>();
  const [loggedInUser, setLoggedInUser] = useState<UserCredential>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const signInWithEmailAndPassword = useCallback(
    async (obj: User) => {
      setIsLoading(true);
      setError(undefined);
      try {
        const user = await firebaseSignInWithEmailAndPassword(
          auth,
          obj.email,
          obj.password
        );

        setLoggedInUser(user);
        if (obj.notMyDevice) {
          startSessionStorage(user.user);
        } else {
          startLocalStorage(user.user);
        }

        return user;
      } catch (err) {
        console.log((err as AuthError).message);

        setError(err as AuthError);
      } finally {
        setIsLoading(false);
      }
    },
    [auth]
  );

  return [signInWithEmailAndPassword, loggedInUser, isLoading, error];
};
