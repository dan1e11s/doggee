import React, { useState } from 'react';
import { Input } from '../../common/fields';
import { Button } from '../../common/buttons';

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

const LoginPage = () => {
  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
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
              placeholder="username"
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
            <Input
              value={formValues.password}
              placeholder="password"
              type="password"
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
          <div>
            <Button>Sign In</Button>
          </div>
        </div>

        <div className={styles.sign_up_container}>Create new account</div>
      </div>
    </div>
  );
};

export default LoginPage;
