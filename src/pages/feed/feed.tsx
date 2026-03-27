import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { getFeeds } from '../../services/slice/feed-slice/feed-slice';
import { AppDispatch } from '../../services/store';
import { fetchFeed } from '../../services/slice/feed-slice/feed-slice';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(getFeeds).orders;

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchFeed());
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI orders={orders} handleGetFeeds={() => <Navigate to='/feed' />} />
  );
};
