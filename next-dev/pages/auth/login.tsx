import React, { useRef } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN, LOGOUT } from '../../graphql/mutations/auth';

const Login = () => {
  const emailRef = useRef<null | HTMLInputElement>(null);
  const passwordRef = useRef<null | HTMLInputElement>(null);
  const [login, { data, error }] = useMutation(LOGIN);
  const [logout] = useMutation(LOGOUT);

  const submitHandler = () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    console.log(email, password);
    login({
      variables: {
        email,
        password,
      },
    }).catch((e) => console.log(e));
  };

  const logoutHandler = () => {
    logout().catch((e) => console.log(e));
  };

  return (
    <div>
      <input type='email' ref={emailRef} />
      <input type='password' ref={passwordRef} />
      <button type='button' onClick={submitHandler}>
        Login
      </button>
      <a href='http://localhost:5000/google-login'>Google</a>
      <button onClick={logoutHandler}>Logout</button>
    </div>
  );
};

export default Login;
