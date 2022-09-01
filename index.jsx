/*
  Project Name: vite-solid-gun
  License: MIT
  Created by: Lightnet
*/

// https://github.com/solidjs/solid-router
// https://www.solidjs.com/docs/latest/api#creatememo
//localStorage.clear();

import "./styles.css";

import { 
  createSignal
, lazy
, observable 
, from
, createMemo
, createResource
, createEffect 
, onCleanup
} from 'solid-js';
import { MetaProvider } from 'solid-meta';
import { createApp } from 'solid-utils';
import { Router, useRoutes, Link, useParams, useLocation } from '@solidjs/router';

import Home from './pages/index.jsx';
import GunProvider from "./components/auth/GunProvider.jsx";
import IndexMenus from "./components/IndexMenu";
import ThemeProvider from "./components/theme/ThemeProvider";

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/about',
    component: lazy(() => import('./pages/about')),
  },
  {
    path: '/account',
    component: lazy(() => import('./components/auth/Account')),
  },
  {
    path: '/login',
    component: lazy(() => import('./components/auth/Login')),
  },
  {
    path: '/signup',
    component: lazy(() => import('./components/auth/SignUp')),
  },
  {
    path: '/forgot',
    component: lazy(() => import('./components/auth/Forgot')),
  },
  {
    path: '/changepassphrase',
    component: lazy(() => import('./components/auth/PageChangePassphrase')),
  },
  {
    path: '/passphrasehint',
    component: lazy(() => import('./components/auth/PagePassphraseHint')),
  },
  {
    path: '/certs',
    component: lazy(() => import('./components/certs/PageCerts')),
  },
  {
    path: '/inbox',
    component: lazy(() => import('./components/inbox/PageInbox')),
  },
  {
    path: '/privatemessage',
    component: lazy(() => import('./components/privatemessages/PagePrivateMessages')),
  },
  {
    path: '/chatroom',
    component: lazy(() => import('./components/chat/PageChatRoom')),
  },
];

const App = () => {
  const Route = useRoutes(routes);
  return (
  <ThemeProvider>
    <GunProvider>
      <IndexMenus/>
      <Route />
    </GunProvider>
  </ThemeProvider>
  );
};

const dispose = createApp(App).use(MetaProvider).use(Router).mount('#app');

if (import.meta.hot) { //< module.hot
  //console.log(import.meta.hot)
  import.meta.hot.accept() //< module.hot.accept()
  import.meta.hot.dispose(dispose) //< module.hot.dispose(dispose)
  console.log("Hot Reload...")
}
/*

*/