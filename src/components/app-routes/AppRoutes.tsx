import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route/ProtectedRoute';
import { IngredientDetails } from '../ingredient-details';
import { Modal } from '../modal';
import { OrderInfo } from '../order-info';

export const routes = {
  main: '/',
  currentIngredient: '/ingredients/:id',
  feed: '/feed',
  currentFeed: '/feed/:number',
  login: '/login',
  register: '/register',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  profile: '/profile',
  currentProfileOrder: '/profile/orders:number',
  profileOrders: 'orders'
};

export const AppRoutes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const backgroundLocation = location.state?.background;

  return (
    <>
      <Routes location={backgroundLocation || location}>
        <Route path={routes.main} element={<ConstructorPage />} />

        <Route path={routes.feed} element={<Feed />} />

        <Route
          path={routes.login}
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />

        <Route
          path={routes.register}
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />

        <Route
          path={routes.forgotPassword}
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />

        <Route
          path={routes.resetPassword}
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />

        <Route path={routes.profile}>
          <Route
            index
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path={routes.profileOrders}
            element={
              <ProtectedRoute>
                <ProfileOrders />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route
          path={routes.currentFeed}
          element={
            <Modal title='' onClose={() => navigate(routes.feed)}>
              <OrderInfo />
            </Modal>
          }
        />

        <Route
          path={routes.currentIngredient}
          element={<IngredientDetails />}
        />

        <Route
          path={routes.currentProfileOrder}
          element={
            <Modal title='' onClose={() => navigate(routes.profile)}>
              <ProtectedRoute>
                <OrderInfo />
              </ProtectedRoute>
            </Modal>
          }
        />

        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route
            path={routes.currentIngredient}
            element={
              <Modal
                title='Детали ингридиента'
                onClose={() => navigate(routes.main)}
              >
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}

      {/* <Routes>
      <Route
        path='/feed/:number'
        element={
          <Modal title='' onClose={() => {}}>
            <OrderInfo />
          </Modal>
        }
      />
    </Routes>

    <Routes>
      <Route
          path='/ingredients/:id'
          element={
            <Modal
              title='Детали ингридиента'
              onClose={() => {
                params.id;
              }}
            >
              <IngredientDetails />
            </Modal>
          }
        />
    </Routes>

    <Routes>
      <Route
        path='/profile/orders/:number'
        element={
          <Modal title='' onClose={() => {}}>
            <ProtectedRoute>
              <OrderInfo />
            </ProtectedRoute>
          </Modal>
        }
      />
    </Routes> */}
    </>
  );
};
