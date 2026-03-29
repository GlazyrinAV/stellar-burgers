import { useSelector } from 'react-redux';
import {
  getIsAuthChecked,
  getUserData
} from '../../services/slice/auth/auth-slice';
import { Preloader } from '@ui';
import { Navigate, useLocation } from 'react-router-dom';
import { routes } from '../app-routes/AppRoutes';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  children,
  onlyUnAuth
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(getIsAuthChecked);
  const user = useSelector(getUserData);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!user && !onlyUnAuth) {
    return <Navigate replace to={routes.login} state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};
