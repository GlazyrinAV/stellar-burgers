import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthError, loginUser } from '../../services/slice/auth/auth-slice';
import { AppDispatch } from 'src/services/store';
import { Preloader } from '@ui';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const { authError, authRequest } = useSelector(getAuthError);
  let errorText = '';

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    dispatch(loginUser({ email: email, password: password }));
  };

  if (authRequest) {
    return <Preloader />;
  }

  if (authError) {
    errorText =
      'Ошибка индентификации! Проверьте правильность указания почты и пароля';
  }

  return (
    <LoginUI
      errorText={errorText}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
