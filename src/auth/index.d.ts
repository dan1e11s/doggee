import { AuthError, UserCredential } from 'firebase/auth';

interface User {
  email: string;
  password: string;
  notMyDevice: boolean;
}

type AuthActionHook<M> = [
  M,
  UserCredential | undefined,
  boolean,
  AuthError | undefined
];

type EmailAndPasswordActionHook = AuthActionHook<
  (obj: User) => Promise<UserCredential | undefined>
>;
