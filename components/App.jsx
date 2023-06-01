/*
  Project Name: vite-solid-gun
  License: MIT
  Created by: Lightnet
*/

import { lazy } from 'solid-js';
import { useRoutes } from '@solidjs/router';

import Home from '../pages/index.jsx';
import GunProvider from "./auth/GunProvider.jsx";
import IndexMenus from "./IndexMenu";
import ThemeProvider from "./theme/ThemeProvider";
import BottomBar from './hotbars/BottomBar.jsx';

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/about',
    component: lazy(() => import('../pages/about')),
  },
  {
    path: '/account',
    component: lazy(() => import('./auth/Account')),
  },
  {
    path: '/contacts',
    component: lazy(() => import('./contacts/PageContacts')),
  },
  {
    path: '/login',
    component: lazy(() => import('./auth/Login')),
  },
  {
    path: '/signup',
    component: lazy(() => import('./auth/SignUp')),
  },
  {
    path: '/forgot',
    component: lazy(() => import('./auth/Forgot')),
  },
  {
    path: '/changepassphrase',
    component: lazy(() => import('./auth/PageChangePassphrase')),
  },
  {
    path: '/passphrasehint',
    component: lazy(() => import('./auth/PagePassphraseHint')),
  },
  {
    path: '/certs',
    component: lazy(() => import('./certs/PageCerts')),
  },
  {
    path: '/inbox',
    component: lazy(() => import('./inbox/PageInbox')),
  },
  {
    path: '/privatemessage',
    component: lazy(() => import('./privatemessages/PagePrivateMessages')),
  },
  {
    path: '/groupmessage',
    component: lazy(() => import('./groupmessage/PageGroupMessage')),
  },
  {
    path: '/notifications',
    component: lazy(() => import('./notifications/PageNotifications')),
  },
];

const App = () => {
  const Route = useRoutes(routes);
  return (
  <ThemeProvider>
    <GunProvider>
      <IndexMenus/>
      <Route />
      <BottomBar/>
    </GunProvider>
  </ThemeProvider>
  );
};

export default App;