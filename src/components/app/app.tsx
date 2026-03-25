import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Preloader } from '@ui';
import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route/ProtectedRoute';

const App = () => {
  /** TODO: взять переменные из стора */
  const isIngredientsLoading = false;
  const ingredients = [];
  const error = null;

  return (
    <>
      <div className={styles.app}>
        <AppHeader />
        {isIngredientsLoading ? (
          <Preloader />
        ) : error ? (
          <div className={`${styles.error} text text_type_main-medium pt-4`}>
            {error}
          </div>
        ) : ingredients.length > 0 ? (
          <ConstructorPage />
        ) : (
          <div className={`${styles.title} text text_type_main-medium pt-4`}>
            Нет игредиентов
          </div>
        )}
      </div>
      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute>
              <Feed />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route path='/profile'>
          <Route
            index
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path='orders'
            element={
              <ProtectedRoute>
                <ProfileOrders />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path='*' element={<NotFound404 />} />
      </Routes>
      <Routes>
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
            <Modal title='' onClose={() => {}}>
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
      </Routes>
    </>
  );
};

export default App;
