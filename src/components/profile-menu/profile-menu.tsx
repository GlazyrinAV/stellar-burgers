import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../services/store';
import { getIsAuthChecked, logout } from '../../services/slice/auth/auth-slice';
import { routes } from '../app-routes/AppRoutes';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const IsAuthChecked = useSelector(getIsAuthChecked);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!IsAuthChecked) {
    navigate(routes.login);
  }

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
