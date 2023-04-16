import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Input, PasswordInput, CheckBox } from '@common/fields';
import { Button } from '@common/buttons';
import { IntlText } from '@features';

import { useSignInEmailAndPassword } from '../../auth/useSignInEmailAndPassword';
import { auth } from '../../auth/firebase/firebaseSetup';

import styles from './LoginPage.module.css';

const validateIsEmpty = (value: string) => {
  if (!value) return 'field required';
  return null;
};

const validateEmail = (value: string) => {
  return validateIsEmpty(value);
};

const validatePassword = (value: string) => {
  return validateIsEmpty(value);
};

const loginFormValueSchema = {
  email: validateEmail,
  password: validatePassword,
};

const validateLoginForm = (
  name: keyof typeof loginFormValueSchema,
  value: string
) => {
  return loginFormValueSchema[name](value);
};

interface FormErrors {
  email: string | null;
  password: string | null;
  message: string | null;
}

export const LoginPage = () => {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    notMyDevice: false,
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({
    email: null,
    password: null,
    message: null,
  });

  const [signInWithEmailAndPassword, loggedInUser, isLoading, error] =
    useSignInEmailAndPassword(auth);

  useEffect(() => {
    if (loggedInUser) {
      navigate('/home');
    }
  }, [navigate, loggedInUser]);

  const onSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    signInWithEmailAndPassword(formValues);
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header_container}>DOGGEE</div>
        <form className={styles.form_container} onSubmit={onSubmit}>
          <div className={styles.input_container}>
            <Input
              value={formValues.email}
              label="email"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const email = event.target.value;
                setFormValues({ ...formValues, email });

                const error = validateLoginForm('email', email);
                setFormErrors({ ...formErrors, email: error });
              }}
              {...(!!formErrors.email && {
                isError: !!formErrors.email,
                helperText: formErrors.email,
              })}
            />
          </div>
          <div className={styles.input_container}>
            <PasswordInput
              value={formValues.password}
              label="password"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const password = event.target.value;
                setFormValues({ ...formValues, password });

                const error = validateLoginForm('password', password);
                setFormErrors({ ...formErrors, password: error });
              }}
              {...(!!formErrors.password && {
                isError: !!formErrors.password,
                helperText: formErrors.password,
              })}
            />
          </div>
          <div className={styles.input_container}>
            <CheckBox
              checked={formValues.notMyDevice}
              label="This is not my device"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const notMyDevice = event.target.checked;
                setFormValues({ ...formValues, notMyDevice });
              }}
            />
          </div>
          <div>
            <Button isLoading={isLoading} type="submit">
              <IntlText path="button.signIn" />
            </Button>
          </div>
        </form>

        <div
          className={styles.sign_up_container}
          onClick={() => navigate('/registration')}
        >
          <IntlText path="page.login.CreateNewAccount" />
        </div>
      </div>
    </div>
  );
};
