/*
  Project Name: solid-trois
  License: MIT
  Created by: Lightnet
*/

// https://github.com/solidjs/solid-router
// https://www.solidjs.com/docs/latest/api#creatememo

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
import { Router, useRoutes, Link, useParams, useLocation } from 'solid-app-router';

import Home from './pages/index.jsx';

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/about',
    component: lazy(() => import('./pages/about')),
  },
];

const App = () => {
  const Route = useRoutes(routes);
  const params = useParams();
  const location = useLocation();
  const pathname = createMemo(() => location.pathname);

  //watch variables
  createEffect(() => {
    //console.log("pathname =", pathname())
  });

  return (
    <>
      {pathname() === "/three" ? (
        <>
          <Link class="btnLink" href="/">Home</Link>
        </>
      ):(
        <>
        <Link class="btnLink" href="/">Home</Link><span> | </span>
        <Link class="btnLink" href="/about">About</Link><span> | </span>
        </>
      )}
      <Route />
    </>
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