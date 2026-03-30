import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../services/store';
import { getAuthStatus, logout } from '../../services/slice/auth/auth-slice';
import { routes } from '../app-routes/AppRoutes';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthChecked } = useSelector(getAuthStatus);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!isAuthChecked) {
    navigate(routes.login);
  }

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
