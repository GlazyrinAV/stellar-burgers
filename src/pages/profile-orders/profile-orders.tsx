import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, getFeeds } from '../../services/slice/feeds/feeds-slice';
import { AppDispatch } from 'src/services/store';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispath = useDispatch<AppDispatch>();
  const orders: TOrder[] = useSelector(getFeeds).orders;

  useEffect(() => {
    dispath(fetchOrders());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
