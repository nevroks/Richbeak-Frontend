import { FC, ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks/ReduxHooks';
import { APP_PAGES_PATHS_CONSTS } from '../../consts/appConsts';

type TProtectedProps = {
  element: ReactElement;
}

export const ProtectedRouteElement: FC<TProtectedProps> = ({ element }) => {
  const isAdmin = useAppSelector((store) => store.isAdmin.isAdmin);
  const {pathname} = useLocation();
  const url = window.location.href;
  return isAdmin ? element : <Navigate to={APP_PAGES_PATHS_CONSTS.SIGN_IN_PAGE} replace state={{path: pathname, url, title: 'destination'}}  />
}