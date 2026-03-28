import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearConstructor,
  getConstructorItems
} from '../../services/slice/burger-constructor/burger-constructor-slice';
import {
  getNewOrder,
  makeOrder,
  resetOrder
} from '../../services/slice/order-burger/order-burger-slice';
import { AppDispatch } from 'src/services/store';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(getConstructorItems);
  const orderRequest = useSelector(getNewOrder).isLoading;
  const orderModalData = useSelector(getNewOrder).order;
  const dispatch = useDispatch<AppDispatch>();

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    dispatch(resetOrder());
    dispatch(makeOrder(constructorItems.ingredients.map((item) => item._id)));
  };
  const closeOrderModal = () => {
    dispatch(clearConstructor());
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
