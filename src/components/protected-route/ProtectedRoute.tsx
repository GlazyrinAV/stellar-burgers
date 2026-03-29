import { useSelector } from 'react-redux';
import {
  getAuthError,
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
  const { authRequest } = useSelector(getAuthError);
  const user = useSelector(getUserData);
  const location = useLocation();

  if (authRequest) {
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
