import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from 'react-redux';
import { getConstructorItems } from '../../services/slice/burger-constructor/burger-constructor-slice';
import {
  getNewOrder,
  makeOrder,
  resetOrder
} from '../../services/slice/order-burger/order-burger-slice';
import { getUserData } from '../../services/slice/auth/auth-slice';
import { AppDispatch } from '../../services/store';
import { routes } from '../app-routes/AppRoutes';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(getConstructorItems);
  const orderRequest = useSelector(getNewOrder).isLoading;
  const orderModalData = useSelector(getNewOrder).order;
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(getUserData);
  const navigate = useNavigate();

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) {
      return navigate(routes.login);
    }
    const ingredientsId = [
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id,
      constructorItems.bun._id
    ];
    dispatch(makeOrder(ingredientsId));
  };

  const closeOrderModal = () => {
    dispatch(resetOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
