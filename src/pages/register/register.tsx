import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'src/services/store';
import {
  getAuthError,
  getUserData,
  registerUser
} from '../../services/slice/auth/auth-slice';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../components/app-routes/AppRoutes';
import { Preloader } from '@ui';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector(getUserData);
  const { authError, authRequest } = useSelector(getAuthError);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!email || !password || !userName) {
      return;
    }
    dispatch(
      registerUser({ name: userName, email: email, password: password })
    );
  };

  if (authRequest) {
    return <Preloader />;
  }

  if (!authError && !authRequest && user) {
    navigate(routes.login);
  }

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
