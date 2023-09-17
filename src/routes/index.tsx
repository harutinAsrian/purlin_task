import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route,
  RouterProvider,
  Routes,
} from 'react-router-dom';
import Header from 'src/components/Header';
import Filters from 'src/components/Filters';
import Sell from 'src/pages/Sell';
import PropertyDetail from 'src/pages/PropertyDetailPage';
import Client from 'src/pages/Client';

import { FC } from 'react';

const Layout: FC = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

const routes = createRoutesFromElements(
  <Route element={<Layout />}>
    <Route path="/" element={<Navigate to="/buy" />} />
    <Route
      path="/:offerType"
      element={
        <>
          <Filters />
          <Client />
        </>
      }
    />
    <Route path="/sell" element={<Sell />} />
    <Route
      path="/property/:id"
      element={
        <>
          <PropertyDetail />
        </>
      }
    />
  </Route>,
);

export const router = createBrowserRouter(routes);

const AppRouterProvider: React.FC = () => <RouterProvider router={router} />;

export default AppRouterProvider;
