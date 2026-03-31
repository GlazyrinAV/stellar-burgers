import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from 'react-redux';
import { getUserData } from '../../services/slice/auth/auth-slice';

export const AppHeader: FC = () => {
  const userName = useSelector(getUserData)?.name;

  return <AppHeaderUI userName={userName} />;
};
