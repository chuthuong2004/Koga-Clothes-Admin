import React, { Fragment, ReactNode, useContext } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate,
  Outlet,
  useLocation,
} from 'react-router-dom';
import { selectAuth } from './features/authSlice';
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout';
import * as config from '@/config';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import routes from './routes';
import { useAppSelector } from './types/commons';
const App: React.FC = () => {
  return (
    <Router>
      <ToastContainer autoClose={3000} />
      <Routes>
        <Route path="/" element={<Navigate to={config.routes.dashboard} replace />} />
        {routes.map((route, index: number) => {
          const Page = route.component;
          let Layout: any = DefaultLayout;
          let PrivateRoute = RequireAuth;
          if (route.layout) {
            Layout = route.layout;
          } else if (route.layout === null) {
            Layout = Fragment;
            PrivateRoute = ({ children }: { children: any }) => {
              return children;
            };
          }
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <PrivateRoute>
                  <Layout>
                    <Page />
                  </Layout>
                </PrivateRoute>
              }
            />
          );
        })}
      </Routes>
    </Router>
  );
};
function RequireAuth({ children }: { children: any }): JSX.Element {
  const { user } = useAppSelector(selectAuth);
  let location = useLocation();
  if (!user) {
    return <Navigate to={config.routes.login} state={{ from: location }} replace={true} />;
  }
  return children;
}
export default App;
