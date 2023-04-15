import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Input, PasswordInput, CheckBox } from '@common/fields';
import { Button } from '@common/buttons';

import styles from './LoginPage.module.css';

const validateIsEmpty = (value: string) => {
  if (!value) return 'field required';
  return null;
};

const validateUsername = (value: string) => {
  return validateIsEmpty(value);
};

const validatePassword = (value: string) => {
  return validateIsEmpty(value);
};

const loginFormValueSchema = {
  username: validateUsername,
  password: validatePassword,
};

const validateLloginForm = (
  name: keyof typeof loginFormValueSchema,
  value: string
) => {
  return loginFormValueSchema[name](value);
};

interface FormErrors {
  username: string | null;
  password: string | null;
}

export const LoginPage = () => {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
    notMyDevice: false,
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({
    username: null,
    password: null,
  });

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header_container}>DOGGEE</div>
        <div className={styles.form_container}>
          <div className={styles.input_container}>
            <Input
              value={formValues.username}
              label="username"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const username = event.target.value;
                setFormValues({ ...formValues, username });

                const error = validateLloginForm('username', username);
                setFormErrors({ ...formErrors, username: error });
              }}
              {...(!!formErrors.username && {
                isError: !!formErrors.username,
                helperText: formErrors.username,
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

                const error = validateLloginForm('password', password);
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
            <Button isLoading>Sign In</Button>
          </div>
        </div>

        <div
          className={styles.sign_up_container}
          onClick={() => navigate('/registration')}
        >
          Create new account
        </div>
      </div>
    </div>
  );
};
