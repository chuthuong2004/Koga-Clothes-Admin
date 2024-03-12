import React, { Fragment } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import * as config from '@/config';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import routes from './routes';
import { useAppSelector } from './types/commons';
import DefaultLayout from './layouts';
import { selectAuth } from './store/selectors';
import { ConfigProvider } from 'antd';

import locale from 'antd/es/locale/vi_VN';
import 'moment/locale/vi';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
const App: React.FC = () => {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#eb3d63' }, }} locale={locale}>
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
    </ConfigProvider>

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
