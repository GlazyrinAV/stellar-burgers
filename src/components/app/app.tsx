import '../../index.css';
import styles from './app.module.css';

import { AppHeader } from '@components';
import { Preloader } from '@ui';
import { AppRoutes } from '../app-routes/AppRoutes';
import {
  getIngredients,
  fetchIngredients
} from '../../services/slice/ingredients/ingredients-slice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { AppDispatch } from 'src/services/store';
import { Navigate } from 'react-router-dom';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { ingredients, isIngredientsLoading, error } =
    useSelector(getIngredients);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);

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
          <Navigate to='/' />
        ) : (
          <div className={`${styles.title} text text_type_main-medium pt-4`}>
            Нет игредиентов
          </div>
        )}

        <AppRoutes />
      </div>
    </>
  );
};

export default App;
