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
import styles from '../app/app.module.css';

export const routes = {
  main: '/',
  currentIngredient: '/ingredients/:id',
  feed: '/feed',
  currentFeed: ':number',
  currentFeedAbsolute: '/feed/:number',
  login: '/login',
  register: '/register',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  profile: '/profile',
  profileOrders: 'orders',
  profileOredersAbsolute: '/profile/orders',
  currentProfileOrder: ':number',
  currentProfileOrderAbsolute: '/profile/orders/:number'
};

export const AppRoutes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const backgroundLocation = location.state?.background;

  return (
    <>
      <Routes location={backgroundLocation || location}>
        <Route path={routes.main} element={<ConstructorPage />} />

        <Route path={routes.feed}>
          <Route index element={<Feed />} />

          <Route path={routes.currentFeed} element={<OrderInfo />} />
        </Route>

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

          <Route path={routes.profileOrders}>
            <Route
              index
              element={
                <div className={styles.detailPageWrap}>
                  <ProtectedRoute>
                    <ProfileOrders />
                  </ProtectedRoute>
                </div>
              }
            />

            <Route
              path={routes.currentProfileOrder}
              element={
                <div className={styles.detailPageWrap}>
                  <ProtectedRoute>
                    <OrderInfo />
                  </ProtectedRoute>
                </div>
              }
            />
          </Route>
        </Route>

        <Route
          path={routes.currentIngredient}
          element={
            <div className={styles.detailPageWrap}>
              <p className={`text text_type_main-large ${styles.detailHeader}`}>
                Детали ингредиента
              </p>
              <IngredientDetails />
            </div>
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

          <Route
            path={routes.currentProfileOrderAbsolute}
            element={
              <Modal title='' onClose={() => navigate(-1)}>
                <ProtectedRoute>
                  <OrderInfo />
                </ProtectedRoute>
              </Modal>
            }
          />

          <Route
            path={routes.currentFeedAbsolute}
            element={
              <Modal title='' onClose={() => navigate(-1)}>
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
};
